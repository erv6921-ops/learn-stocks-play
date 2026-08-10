import { StructuredLessonContent } from "@/types"

// Wave-2 deepened content (Mortgages-depth rebuild) for: income-earning
export const deepIncome: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // income-1: Active vs Passive Income
  // ─────────────────────────────────────────────
  {
    lessonId: "income-1",
    sections: [
      {
        type: "concept",
        title: "Trading Time for Money: Active Income",
        paragraphs: [
          "Active income is money you earn by showing up and doing work - your time is directly traded for dollars. A 16-year-old scooping ice cream for $12 an hour is earning active income: work a 4-hour shift, earn $48. Stop showing up and the money stops the same day. Almost everyone's first paycheck is active income, from babysitting to bagging groceries to a salaried desk job. It's reliable and easy to start, but it has a hard ceiling: there are only so many hours in a week, so you can only earn so much.",
          "Because active income depends on your presence, it disappears the moment you stop. If you get sick, take a vacation, or lose the job, the paycheck ends. That's the trap of trading time for money - your earning power is capped by the clock. A doctor earning $200 an hour still can't work 200 hours a day. This is why relying only on active income keeps many people stuck: to make more, they must work more hours or land a higher wage, and both have real limits.",
          "The upside of active income is that it's dependable and requires little money to begin - just your effort and time. It's how nearly everyone funds their early life and builds savings. The smart move is to use active income as a launchpad: cover your bills, then set aside a slice to build passive income streams. Think of active income as the engine that gets you started and passive income as cruise control you add later. There's nothing wrong with active income - a well-paid job is a powerful tool - but it works best when a slice of every paycheck is deliberately redirected toward building assets, so over time your money begins working for you instead of you carrying the whole load by yourself."
        ],
        bullets: [
          "Active income is money earned by directly trading your time and effort for pay.",
          "It's reliable and cheap to start, but capped by the hours you can physically work.",
          "When you stop working, active income stops the same day - no work, no pay.",
          "Wages, salaries, tips, and freelance gigs are all forms of active income.",
          "Most people fund their whole early life with active income before building anything else."
        ],
        realWorldExample: "Jordan works weekends at a movie theater for $13 an hour. A typical 8-hour Saturday earns $104. If Jordan skips a shift, that $104 simply never appears. To double the income, Jordan would have to work double the hours or find a job that pays more per hour - there's no way around the time-for-money trade."
      },
      {
        type: "concept",
        title: "Money That Works While You Sleep: Passive Income",
        paragraphs: [
          "Passive income keeps flowing whether or not you're actively working that day - it comes from an asset you built or bought once. Interest from a savings account, dividends from stocks, rent from a property, or royalties from a song you wrote all pay you again and again. The key word is 'built once': you usually do a lot of work or invest real money upfront, then the asset pays you over time. It's rarely truly effortless, but the effort happens before the money, not alongside it.",
          "The magic of passive income is that it breaks the time-for-money ceiling. If $2,000 in a high-yield savings account earns 4% a year, that's $80 without you lifting a finger - and it keeps coming while you sleep, study, or work your day job. Stack several small streams and they add up. Passive income won't make a teen rich overnight, and it takes patience, but it's how people eventually earn money without trading every hour for it. It's the difference between owning the vending machine and being the one restocking it.",
          "Most passive income requires seedmoney or serious upfront effort, so it's usually built on top of active income, not instead of it. A teen can start tiny: a savings account earning interest, or a few shares of a dividend-paying stock. The point isn't to quit your job today - it's to plant seeds early. Because of compounding, even small passive streams started young grow far larger over decades than the same amount started later in life."
        ],
        bullets: [
          "Passive income flows from an asset you built or bought, not from hours worked that day.",
          "Interest, dividends, rent, and royalties are common passive income sources.",
          "It usually needs upfront money or effort, then pays repeatedly over time.",
          "Passive income breaks the ceiling of only earning while you actively work.",
          "Starting small and young lets compounding grow tiny streams into large ones."
        ],
        realWorldExample: "Maria spends a summer writing and recording songs, then licenses them to a music library. Long after summer ends, she earns small royalty checks each time a company uses her music in an ad. The recording work is done, but the money keeps arriving - that's passive income built from a one-time effort."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income1-mc1",
            question: "What is the defining feature of active income?",
            options: [
              "It keeps paying after you stop working",
              "You trade your time directly for pay",
              "It always requires money to start in nearly every case",
              "It only comes from owning stocks"
            ],
            correctAnswer: 1,
            explanation: "Active income means trading your time and effort directly for money. When you stop working, the income stops - that's what separates it from passive income."
          },
          {
            id: "income1-mc2",
            question: "Which of these is an example of passive income?",
            options: [
              "Getting paid $50 for a babysitting shift",
              "Earning dividends from shares you own",
              "Being paid hourly at a coffee shop",
              "Receiving tips while waiting tables"
            ],
            correctAnswer: 1,
            explanation: "Dividends pay you for owning stock, whether or not you worked that day. Babysitting, hourly pay, and tips all require you to actively show up and work."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon Builds a Second Stream",
        narrative: "Devon, 17, earns $400 a month working part-time at a pet store - solid active income. But Devon notices that a coworker who quit still earns money from a photography print shop she set up online. Curious, Devon starts saving a portion of each paycheck to build something that pays even on days off.",
        details: [
          "Devon's $400 pet-store paycheck stops completely on any week Devon doesn't work a shift.",
          "The coworker's print shop keeps selling photos automatically, even while she sleeps - passive income.",
          "Devon puts $100 a month into a high-yield savings account earning 4%, planting a small passive seed.",
          "Devon's plan: keep the active job for now, but slowly grow assets that earn without constant work."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income1-aq1",
          question: "Why does Devon keep the pet-store job while building the savings account?",
          options: [
              "Passive income is always larger than active as a general rule",
              "Active income funds the seeds for passive income",
              "Savings accounts pay more than any job",
              "Passive income needs no money to start"
            ],
            correctAnswer: 1,
          explanation: "Active income is dependable and provides the cash Devon uses to build passive streams. Most passive income needs upfront money or effort, so it's usually built on top of active income, not instead of it."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Active income trades your time for money and stops when you stop working.",
          "Passive income flows from an asset you built or bought and keeps paying over time.",
          "Active income is capped by hours; passive income can break that ceiling.",
          "Passive income usually needs upfront money or effort before it pays.",
          "The smart path uses active income to fund passive streams started young."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income1-mastery1",
            question: "A teen earns $60 mowing lawns on Saturday. What type of income is this?",
            options: [
              "Passive, since it came from outdoors under normal conditions",
              "Active, because time was traded for pay",
              "Passive, because it was a one-time job",
              "Neither, because it was paid in cash"
            ],
            correctAnswer: 1,
            explanation: "Mowing lawns trades time and effort directly for money, so it's active income. Being outdoors, a one-time job, or cash payment don't change that."
          },
          {
            id: "income1-mastery2",
            question: "What is the main limitation of relying only on active income?",
            options: [
              "It is illegal for anyone under 18 in real practice",
              "There are only so many hours to work",
              "It can never be saved in a bank",
              "It is always taxed at 100 percent"
            ],
            correctAnswer: 1,
            explanation: "Active income is capped by the hours you can physically work. You can earn more only by working more hours or a higher wage, both of which have real limits."
          },
          {
            id: "income1-mastery3",
            question: "Which best describes how most passive income begins?",
            options: [
              "It appears instantly with zero effort",
              "It needs upfront money or work first",
              "It only comes from lottery winnings",
              "It replaces a job on the very first day"
            ],
            correctAnswer: 1,
            explanation: "Passive income usually requires real money or effort upfront - building an asset once - and then pays over time. It's rarely instant or effortless at the start."
          },
          {
            id: "income1-mastery4",
            question: "Why is starting passive income young especially powerful?",
            options: [
              "Young people pay no taxes at all",
              "Compounding grows small streams",
              "Banks only accept teen customers",
              "Passive income shrinks as you age"
            ],
            correctAnswer: 1,
            explanation: "Because of compounding, even tiny passive streams started young grow far larger over decades than the same amounts started later. Time is the biggest advantage."
          },
          {
            id: "income1-mastery5",
            question: "Which pairing correctly matches income to type?",
            options: [
              "Hourly cashier pay is passive income",
              "Rent from a property is passive income",
              "Waiting-table tips are passive income for most workers today",
              "A salaried job is passive income"
            ],
            correctAnswer: 1,
            explanation: "Rent from a property pays you for owning an asset, so it's passive. Cashier pay, tips, and salaries all require you to actively show up and work."
          },
          {
            id: "income1-mastery6",
            question: "A smart way to use active income is to…",
            options: [
              "Spend every dollar the day you earn it",
              "Set aside some to build passive streams",
              "Refuse all raises to stay flexible as a general rule",
              "Avoid saving until you turn thirty"
            ],
            correctAnswer: 1,
            explanation: "Active income is the launchpad: cover your bills, then set aside a slice to build passive income. Spending everything or waiting until thirty wastes the head start."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-2: Wages vs Salary
  // ─────────────────────────────────────────────
  {
    lessonId: "income-2",
    sections: [
      {
        type: "concept",
        title: "Getting Paid by the Hour: Wages",
        paragraphs: [
          "A wage means you're paid for each hour you work. If your wage is $15 an hour and you work 20 hours, you earn $300 that week - work 25 hours and you earn $375. Your pay rises and falls with your hours, which makes wage jobs flexible but unpredictable. Most first jobs teens take - retail, food service, lifeguarding - pay wages. Employers must track your hours, and in the U.S., federal law sets a minimum wage (though many states set higher ones) that hourly workers cannot legally be paid below.",
          "The biggest perk of hourly work is overtime. Under federal law, most hourly employees who work more than 40 hours in a week must be paid 'time and a half' - 1.5 times their normal wage - for the extra hours. So a $15-an-hour worker earns $22.50 for each hour past 40. That can add up fast during busy seasons. Salaried workers usually don't get this bonus, so a motivated hourly worker willing to grab extra shifts can sometimes out-earn expectations.",
          "The downside of wages is instability. If the store is slow and cuts your hours, your paycheck shrinks with no warning. Holidays you take, sick days, or a quiet week all mean less money. There's often no guaranteed weekly amount, so budgeting is harder. Hourly workers also may get fewer benefits like paid vacation or health insurance, though this varies. Wages reward showing up and are great for flexible schedules, but they put the risk of slow weeks squarely on the worker."
        ],
        bullets: [
          "A wage pays you a set amount for each hour worked, so pay changes with hours.",
          "Federal and state minimum-wage laws set a legal floor for hourly pay.",
          "Most hourly workers earn overtime - 1.5x pay - for hours beyond 40 in a week.",
          "Paychecks are unpredictable: fewer hours means less money, with little warning.",
          "Wage jobs are flexible but often offer fewer guaranteed benefits."
        ],
        realWorldExample: "Alex earns $16 an hour at a warehouse. In a normal 40-hour week, that's $640. During the December rush, Alex works 50 hours: 40 hours at $16 ($640) plus 10 overtime hours at $24 ($240) equals $880 that week. But in a slow January week with only 25 hours, Alex earns just $400."
      },
      {
        type: "concept",
        title: "A Fixed Yearly Amount: Salary",
        paragraphs: [
          "A salary is a fixed amount of money you earn per year, no matter how many hours you work. Someone with a $52,000 salary earns that whether a given week is 38 hours or 45. The yearly figure is split into regular paychecks - divide $52,000 by 26 biweekly paychecks and each is about $2,000 before taxes. Salaries are common in professional, office, and management jobs. They offer something wages can't: predictability. You know exactly what you'll be paid each period, which makes planning rent, bills, and savings far easier.",
          "Salaries usually come bundled with better benefits - paid vacation, health insurance, retirement contributions, and paid sick days. These 'extras' can be worth thousands of dollars a year on top of the salary itself, so two jobs with the same pay can differ hugely in real value. Salaried roles are also often seen as more stable and career-track, with clearer paths to promotions and raises. For many people, the steadiness of a salary is worth more than the chance to rack up overtime.",
          "The catch is that most salaried workers don't earn overtime. If a project demands 55-hour weeks, you're paid the same as a 40-hour week - so your effective hourly rate drops. A $52,000 salary is about $25 an hour at 40 hours, but only about $18 an hour if you're actually working 55. This is why it's smart to ask about typical hours before accepting a salaried job. Salary trades the upside of overtime for the comfort of a guaranteed, predictable paycheck. A useful habit is to convert any salary offer into an hourly figure based on the hours you'll really work, then compare it fairly against hourly roles - a $50,000 salary sounds impressive until you realize sixty-hour weeks quietly shrink it to roughly $16 an hour, less than some hourly jobs pay with overtime."
        ],
        bullets: [
          "A salary is a fixed yearly amount, split into equal paychecks regardless of exact hours.",
          "Salaries make budgeting easy because you know your pay in advance.",
          "They often include valuable benefits like paid vacation, insurance, and retirement.",
          "Most salaried workers don't earn overtime for extra hours.",
          "Long hours lower your effective hourly rate, so ask about typical workloads."
        ],
        realWorldExample: "Priya takes a $60,000 salary job paid biweekly, so each of 26 checks is about $2,308 before taxes - the same every time. Her benefits add roughly $8,000 of value (health insurance and retirement match). A coworker earning the same $60,000 as an hourly contractor with no benefits actually takes home far less overall value."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income2-mc1",
            question: "What is the key difference between a wage and a salary?",
            options: [
              "Wages are illegal for teens to earn under normal conditions",
              "Wages pay per hour; salary is a fixed yearly amount",
              "Salaries always pay overtime, wages never do in real practice",
              "Wages come with more paid vacation days across the board"
            ],
            correctAnswer: 1,
            explanation: "A wage pays a set amount per hour worked, while a salary is a fixed annual amount split into equal paychecks. Salaries actually pay overtime less often than wages."
          },
          {
            id: "income2-mc2",
            question: "An hourly worker works 46 hours in a week. How are the extra 6 hours usually paid?",
            options: [
              "At half the normal hourly wage",
              "At 1.5 times the normal wage",
              "At the exact same normal wage",
              "They are not paid at all"
            ],
            correctAnswer: 1,
            explanation: "Under federal law, most hourly workers earn overtime - 1.5 times their normal wage - for hours worked beyond 40 in a week. That's a major advantage of hourly work."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sam Weighs Two Job Offers",
        narrative: "Sam, 19, gets two offers. One is an hourly job at $18 an hour with unpredictable weekly hours and no benefits. The other is a salaried role at $40,000 a year with health insurance and two weeks paid vacation. Sam sits down to compare not just the pay, but the stability and the extras.",
        details: [
          "At the hourly job, a full 40-hour week earns $720, but slow weeks with 25 hours earn only $450.",
          "The $40,000 salary equals about $769 each week, paid the same no matter the exact hours.",
          "The salaried job adds health insurance and paid vacation worth thousands more per year.",
          "The hourly job could pay overtime in busy weeks, but offers no guaranteed minimum paycheck."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income2-aq1",
          question: "Beyond the base pay, why might Sam value the salaried offer more?",
          options: [
              "Salaries can never be reduced by law",
              "Steady pay plus benefits add real value",
              "Salaried jobs always pay overtime across the board",
              "Hourly work is illegal after age 18"
            ],
            correctAnswer: 1,
          explanation: "The salary gives a predictable paycheck plus benefits like insurance and paid vacation worth thousands. Salaries can be cut or lost, and they usually pay overtime less often, not more."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Wages pay per hour, so income rises and falls with the hours you work.",
          "Hourly workers usually earn 1.5x overtime for hours beyond 40 per week.",
          "A salary is a fixed yearly amount split into steady, predictable paychecks.",
          "Salaries often include valuable benefits like insurance and paid vacation.",
          "Most salaried workers skip overtime, so long hours lower their real hourly rate."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income2-mastery1",
            question: "A $15/hour worker puts in 44 hours one week. What is that week's gross pay?",
            options: [
              "$660, because all hours pay the same by that logic",
              "$690, with 4 hours at time and a half",
              "$600, since overtime is never counted in this example",
              "$720, doubling pay for the extra hours as it turns out"
            ],
            correctAnswer: 1,
            explanation: "40 hours at $15 is $600, plus 4 overtime hours at $22.50 (1.5x) is $90, totaling $690. Overtime is 1.5x, not double, and it does count."
          },
          {
            id: "income2-mastery2",
            question: "Why is budgeting often easier on a salary than on wages?",
            options: [
              "Salaries are always far larger amounts for most workers today",
              "The paycheck is the same each period",
              "Salaried workers pay no taxes at all",
              "Wages are paid only once a year"
            ],
            correctAnswer: 1,
            explanation: "A salary is a fixed yearly amount split into equal paychecks, so you know exactly what's coming. Wages swing with hours, making planning harder."
          },
          {
            id: "income2-mastery3",
            question: "A person on a $50,000 salary works 55-hour weeks. What happens to their real hourly rate?",
            options: [
              "It rises because they work more hours",
              "It falls because pay stays the same",
              "It is legally set at $25 per hour",
              "It becomes overtime automatically as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Salary pay doesn't change with hours, so working 55 hours instead of 40 spreads the same money over more hours, lowering the effective hourly rate."
          },
          {
            id: "income2-mastery4",
            question: "Which is typically an advantage of a salaried job over an hourly one?",
            options: [
              "Guaranteed overtime pay every week",
              "Benefits like insurance and paid vacation",
              "Freedom to skip work with full pay",
              "A legal ban on ever being fired"
            ],
            correctAnswer: 1,
            explanation: "Salaried roles often bundle in benefits worth thousands, like health insurance and paid vacation. They usually don't guarantee overtime, and no job bans firing."
          },
          {
            id: "income2-mastery5",
            question: "What is the main risk of an hourly wage job?",
            options: [
              "You can never earn any overtime pay",
              "Cut hours shrink your pay without warning",
              "You must work exactly 40 hours weekly",
              "Your wage rises automatically each month in real practice"
            ],
            correctAnswer: 1,
            explanation: "Hourly pay depends on hours worked, so if hours are cut your paycheck shrinks with little warning. That instability is the key downside of wages."
          },
          {
            id: "income2-mastery6",
            question: "Two jobs both pay $45,000. Why might one still be 'worth' more?",
            options: [
              "Higher numbers always mean more money across the board",
              "One may add benefits the other lacks",
              "Salaries can legally never be equal",
              "The older job always pays extra cash"
            ],
            correctAnswer: 1,
            explanation: "Two jobs with equal pay can differ hugely in real value if one includes benefits like insurance, retirement, and paid time off worth thousands more per year."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-3: Hourly vs Commission
  // ─────────────────────────────────────────────
  {
    lessonId: "income-3",
    sections: [
      {
        type: "concept",
        title: "Steady and Predictable: Hourly Pay",
        paragraphs: [
          "Hourly pay is the compensation structure most teens meet first: you earn a set rate for every hour you're on the clock. At $14 an hour, a 30-hour week reliably pays $420 before taxes - simple and easy to predict. Your effort matters for keeping the job, but your pay doesn't jump just because you work harder or faster than the person next to you. As long as you show up and do the work, the paycheck is dependable. That steadiness is exactly why hourly pay feels safe.",
          "The main appeal of hourly pay is low risk. You don't have to hit sales targets or convince anyone to buy something - you're paid for time, not results. A slow day at the store still pays the same as a busy one. This makes hourly work forgiving for beginners and anyone who wants a stable, predictable income. It also usually includes overtime protections, so extra hours in a busy week pay 1.5x. For people who value certainty over the chance of a big payday, hourly pay is the comfortable choice.",
          "The trade-off is a ceiling on earnings. Because you're paid only for hours, a hardworking hourly employee earns the same as a coasting one at the same rate. Your income can't spike when business booms unless you work more hours. Raises come slowly, usually tied to time on the job or promotions. So hourly pay rewards reliability and shields you from bad days, but it caps how high your income can climb no matter how talented or driven you are."
        ],
        bullets: [
          "Hourly pay gives a set rate for every hour worked, making income easy to predict.",
          "You're paid for time, not results, so slow days pay the same as busy ones.",
          "It carries low risk and usually includes overtime for hours beyond 40.",
          "Hardworking and coasting workers earn the same at equal hourly rates.",
          "Earnings hit a ceiling because income is tied strictly to hours."
        ],
        realWorldExample: "Riley earns $14 an hour at a bookstore. Whether the store is packed or empty, a 6-hour shift pays $84. Riley likes knowing that every Saturday shift adds a predictable $84 - but no matter how many books Riley personally sells, the pay never rises above the hourly rate."
      },
      {
        type: "concept",
        title: "Pay Tied to Results: Commission",
        paragraphs: [
          "Commission pay ties your income to results, usually sales. Instead of (or on top of) an hourly rate, you earn a percentage of what you sell. A car salesperson earning 25% commission on the dealership's profit, or a phone-store worker earning $30 per plan sold, is paid for outcomes, not clock time. Sell a lot and you can earn far more than any hourly job. Sell little and you can earn almost nothing. Commission puts your income directly in your own hands - which is thrilling for some people and terrifying for others.",
          "Many commission jobs use a 'base plus commission' structure: a small guaranteed hourly or salary base, plus commission on top. This softens the risk - you won't earn zero on a slow week - while still rewarding strong sellers. A worker might earn a $10-an-hour base plus 5% of sales, so a big sales month can double or triple their income. Pure commission with no base is the highest risk and highest reward: your entire paycheck depends on performance, which can swing wildly month to month.",
          "Commission rewards skill, drive, and people who love a challenge, but it demands consistency and resilience. Income can be feast or famine - a great month followed by a lean one - which makes budgeting harder. It works best for confident, motivated people in fields like real estate, cars, or sales, and poorly for those who need a steady, guaranteed paycheck. The core question is whether you'd rather have a safe, capped income or a variable one you can push much higher through effort and talent. Many people ease into commission by choosing a role with a solid base first, proving they can sell, and only then shifting toward heavier commission once they trust their own skills and have savings to cushion the slow stretches."
        ],
        bullets: [
          "Commission pays a percentage or set amount for each sale, tying income to results.",
          "Strong sellers can out-earn hourly workers; weak months can pay very little.",
          "'Base plus commission' adds a small guaranteed floor to reduce the risk.",
          "Pure commission is highest risk and reward - your whole check rides on performance.",
          "It rewards drive and skill but makes income and budgeting less predictable."
        ],
        realWorldExample: "Tobias sells phones at $10 an hour base plus $25 per premium plan he sells. In a strong month he sells 60 plans, adding $1,500 in commission to his base pay - far more than an hourly-only job. But in a slow month with only 10 plans, that commission drops to $250, and his income swings hard."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income3-mc1",
            question: "What is commission pay based on?",
            options: [
              "The number of hours you clock in",
              "The results or sales you produce",
              "Your age and years on the job",
              "A fixed yearly amount split evenly"
            ],
            correctAnswer: 1,
            explanation: "Commission ties your pay to results, usually sales. You earn a percentage or set amount per sale, so income depends on performance rather than hours worked."
          },
          {
            id: "income3-mc2",
            question: "What does a 'base plus commission' structure add?",
            options: [
              "A cap that limits how much you earn",
              "A small guaranteed floor under your pay",
              "Double pay for every hour worked for most workers today",
              "A ban on earning any commission"
            ],
            correctAnswer: 1,
            explanation: "Base plus commission gives a small guaranteed base (hourly or salary) plus commission on top. The base softens the risk so you won't earn zero in a slow stretch."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nina Chooses a Pay Structure",
        narrative: "Nina, 18, is offered two roles at an electronics store. Role A is straight hourly at $15 an hour. Role B is $9 an hour base plus 6% commission on her sales. Nina is outgoing and confident she can sell well, but she also has rent due on the first of every month and hates surprises in her budget.",
        details: [
          "Role A guarantees $600 for a steady 40-hour week, busy or slow, easy to budget around.",
          "Role B pays a $360 base for 40 hours, plus 6% of whatever she sells that week.",
          "If Nina sells $5,000 in a week, Role B adds $300 commission, beating Role A's $600.",
          "In a slow week selling only $1,500, Role B's commission is just $90, well under Role A."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income3-aq1",
          question: "Which factor should weigh MOST in Nina's choice between the two roles?",
          options: [
              "Commission jobs are always higher paying",
              "Her tolerance for income that swings",
              "Hourly pay is illegal over age 18",
              "Base pay always beats commission pay"
            ],
            correctAnswer: 1,
          explanation: "Commission can beat hourly in strong weeks but pays little in slow ones. With rent due monthly, Nina must weigh her tolerance for swinging income against the higher upside."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Hourly pay is predictable and low-risk but caps how much you can earn.",
          "Commission ties pay to results, offering higher upside and higher risk.",
          "Base plus commission adds a guaranteed floor to reduce the downside.",
          "Pure commission means your whole paycheck depends on performance.",
          "The right choice depends on your skill, drive, and need for steady income."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income3-mastery1",
            question: "A worker earns 5% commission and sells $8,000 in a week. What is the commission?",
            options: [
              "$800, since commission doubles sales by that logic",
              "$400, which is 5% of the sales",
              "$40, because commission is tiny as it turns out",
              "$8,000, the full amount they sold"
            ],
            correctAnswer: 1,
            explanation: "5% of $8,000 is $400. Commission is a percentage of sales, not the full amount and not double it."
          },
          {
            id: "income3-mastery2",
            question: "Why might a driven, confident seller prefer commission over hourly?",
            options: [
              "Commission guarantees the same check weekly in real practice",
              "Effort and skill can push income much higher",
              "Commission jobs never have any slow months",
              "Hourly pay is capped by law at minimum wage"
            ],
            correctAnswer: 1,
            explanation: "Commission rewards results, so strong sellers can earn far more than a fixed hourly rate. It's not guaranteed and does have slow months - that's the trade-off."
          },
          {
            id: "income3-mastery3",
            question: "What is the biggest downside of pure commission with no base?",
            options: [
              "You are forced to work over 60 hours",
              "Your entire paycheck rides on performance",
              "You can never earn above minimum wage",
              "You must repay the store for slow weeks"
            ],
            correctAnswer: 1,
            explanation: "With no base, your whole income depends on sales. A slow stretch can mean earning very little, which makes budgeting hard - the core risk of pure commission."
          },
          {
            id: "income3-mastery4",
            question: "Two workers earn $14/hour. One sells twice as much as the other. Their pay is…",
            options: [
              "Different, since selling more pays more in nearly every case",
              "The same, because pay is tied to hours",
              "Based on commission for the top seller",
              "Automatically doubled for the better one for most workers today"
            ],
            correctAnswer: 1,
            explanation: "Hourly pay is tied to time, not results. Both earn $14 an hour regardless of who sells more - that's the ceiling of hourly pay."
          },
          {
            id: "income3-mastery5",
            question: "Which person is the best fit for hourly pay?",
            options: [
              "Someone who wants steady, predictable income",
              "Someone chasing the highest possible payday",
              "Someone who hates any form of steady work",
              "Someone who refuses to ever show up on time"
            ],
            correctAnswer: 0,
            explanation: "Hourly pay suits people who value certainty and a predictable paycheck over the chance of a big commission windfall. It rewards reliable attendance."
          },
          {
            id: "income3-mastery6",
            question: "A '$10 base plus 4% commission' job means the worker…",
            options: [
              "Earns only 4% of sales, with no base",
              "Gets $10/hour plus 4% of their sales",
              "Loses the base if they make any sales",
              "Is paid $10 total for the whole week"
            ],
            correctAnswer: 1,
            explanation: "Base plus commission means a guaranteed $10-an-hour base plus 4% of sales on top. The base stays even in slow weeks, reducing the risk."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-4: Gig Economy
  // ─────────────────────────────────────────────
  {
    lessonId: "income-4",
    sections: [
      {
        type: "concept",
        title: "Work on Your Own Terms: The Gig Economy",
        paragraphs: [
          "The gig economy is made of short-term, flexible jobs instead of steady employment. Instead of one boss and a fixed schedule, gig workers take on 'gigs' - individual tasks or short projects - often through apps. Driving for a rideshare service, delivering food, walking dogs, doing freelance graphic design, or selling crafts online are all gig work. The huge appeal is flexibility: you choose when, where, and how much you work. A student can drive for two hours after class or design a logo on a weekend, fitting income around their life instead of the other way around.",
          "Gig work is often easy to start and low-barrier. Many platforms just need a sign-up, a background check, and basic equipment like a bike, car, or laptop. There's no interview grilling or years of experience required for many gigs, so teens and students can begin quickly. You can also stack multiple gigs - deliver food, tutor online, and sell art - to build income from several sources. This variety can be motivating and helps you discover skills and interests while earning. For many young people, gig work is the fastest on-ramp to earning real money.",
          "But flexibility comes with a major catch: gig workers are usually 'independent contractors,' not employees. That means no guaranteed hours, no minimum wage protection, no paid sick days, no health insurance, and no employer covering part of their taxes. Income can be unpredictable and you're responsible for your own expenses - gas, equipment, and repairs. When an app is 'slow,' you simply earn less. Gig work trades the safety net of a traditional job for freedom, so it works best as flexible extra income or a stepping stone rather than a guaranteed livelihood."
        ],
        bullets: [
          "The gig economy is built on short-term, flexible tasks instead of steady employment.",
          "Its biggest draw is choosing when, where, and how much you work.",
          "Many gigs are low-barrier and quick to start, ideal for teens and students.",
          "Gig workers are usually independent contractors with no benefits or guaranteed hours.",
          "Income can be unpredictable, and workers cover their own expenses and taxes."
        ],
        realWorldExample: "Kai, 18, delivers food on a bike through an app after school. On a busy Friday night, Kai earns $22 an hour in fees and tips; on a rainy Tuesday, orders are scarce and Kai earns just $8 an hour. There's no boss setting the schedule - but also no guaranteed paycheck, and Kai pays for the bike's upkeep."
      },
      {
        type: "concept",
        title: "The Hidden Costs and Smart Moves of Gig Work",
        paragraphs: [
          "Because gig workers are independent contractors, taxes work differently. A regular employer withholds taxes from each paycheck automatically, but gig platforms usually don't. Instead, you're responsible for setting aside money for taxes yourself and may owe 'self-employment tax' - covering both the worker's and employer's share of Social Security and Medicare, roughly 15.3%. If you earn $5,000 gig income and set nothing aside, you could face a surprise tax bill. Smart gig workers save around 25-30% of earnings for taxes so they aren't caught off guard.",
          "Gig income is also 'gross' before your own costs. A rideshare driver earning $200 in fares might spend $40 on gas and set aside more for car wear, insurance, and repairs - so real take-home is lower than the app shows. Tracking these expenses matters, because many are tax-deductible and lower what you owe. The key mindset shift is running your gig like a tiny business: know your true hourly profit after costs, not just the headline number the app flashes. A gig that looks like $25 an hour might really be $16 after expenses.",
          "The smartest gig workers treat it strategically. They compare their after-cost hourly rate across platforms, work during high-demand hours when pay surges, and use gigs to build skills or a client base that leads to bigger opportunities. Freelancing a few design projects can grow into a real business; tutoring can turn into a steady side income. Gig work shines as flexible extra income, a way to test a business idea cheaply, or a bridge between jobs - as long as you plan for the taxes and costs that a normal job would handle for you."
        ],
        bullets: [
          "Gig platforms usually don't withhold taxes, so you must set money aside yourself.",
          "Self-employment tax (about 15.3%) covers both shares of Social Security and Medicare.",
          "Real earnings are lower after gas, equipment, and repairs - track your true costs.",
          "Many gig expenses are tax-deductible, lowering what you actually owe.",
          "Used well, gigs build skills, test business ideas, and bridge between jobs."
        ],
        realWorldExample: "Elena freelances graphic design for $30 an hour on a gig site. But she pays the platform a 10% fee, buys design software, and must save 27% for taxes. After all that, her real take-home is closer to $18 an hour - still solid, but far from the $30 headline. Knowing this helps her price future jobs."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income4-mc1",
            question: "What is the biggest appeal of gig economy work?",
            options: [
              "Guaranteed health insurance and benefits under normal conditions",
              "Flexibility to choose when and how much you work",
              "A fixed salary paid every two weeks in real practice",
              "An employer who pays all your taxes across the board"
            ],
            correctAnswer: 1,
            explanation: "The main draw of gig work is flexibility - you choose when, where, and how much to work. Gig workers are contractors, so they usually lack benefits and pay their own taxes."
          },
          {
            id: "income4-mc2",
            question: "Because gig platforms usually don't withhold taxes, smart workers should…",
            options: [
              "Assume they will owe nothing at all",
              "Set aside a portion for taxes themselves",
              "Wait for the app to send a refund",
              "Only work jobs that pay in cash"
            ],
            correctAnswer: 1,
            explanation: "Gig income has no automatic withholding, and self-employment tax applies. Smart gig workers set aside roughly 25-30% of earnings so a tax bill doesn't catch them off guard."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Runs the Numbers on Delivery",
        narrative: "Marcus, 19, starts delivering groceries through an app to earn extra cash. The app shows he made $300 last week over 15 hours - about $20 an hour, which sounds great. But his mentor tells him to look closer at what he actually keeps after all his costs and taxes.",
        details: [
          "Marcus spent $45 on gas and estimates $30 more in car wear and maintenance for the week.",
          "As an independent contractor, no taxes were withheld, so he should save about 27% for taxes.",
          "After gas, upkeep, and setting aside taxes, his real take-home is closer to $12-13 an hour.",
          "He can deduct mileage and some costs at tax time, which lowers what he ultimately owes."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income4-aq1",
          question: "Why is Marcus's real hourly pay lower than the app's $20 figure?",
          options: [
              "The app secretly steals part of his pay",
              "Costs and taxes come out of gig earnings",
              "Gig work is capped at $13 an hour by law",
              "He worked fewer hours than he thought"
            ],
            correctAnswer: 1,
          explanation: "Gig income is gross before expenses. After gas, car wear, and setting aside self-employment taxes the app doesn't withhold, Marcus's true take-home is far below the headline $20."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The gig economy offers flexible, short-term work you can start quickly.",
          "Gig workers are usually contractors with no benefits or guaranteed hours.",
          "Platforms don't withhold taxes, so set aside 25-30% for self-employment tax.",
          "Real pay is lower after gas, equipment, and repairs - track your true costs.",
          "Used strategically, gigs build skills, test ideas, and bridge between jobs."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income4-mastery1",
            question: "Most gig workers are classified as…",
            options: [
              "Full employees with paid vacation",
              "Independent contractors without benefits",
              "Government workers with pensions",
              "Union members with fixed schedules"
            ],
            correctAnswer: 1,
            explanation: "Gig workers are usually independent contractors, meaning no guaranteed hours, benefits, or employer-paid taxes. That's the trade-off for flexibility."
          },
          {
            id: "income4-mastery2",
            question: "What is self-employment tax, roughly 15.3%, for?",
            options: [
              "A fine charged only to gig workers",
              "Both shares of Social Security and Medicare",
              "Extra income tax on top of normal rates",
              "A fee the app keeps from your pay"
            ],
            correctAnswer: 1,
            explanation: "Self-employment tax covers both the worker's and employer's share of Social Security and Medicare, since a gig worker acts as both. It's about 15.3% of net earnings."
          },
          {
            id: "income4-mastery3",
            question: "An app shows $24/hour, but you spend on gas and repairs. Your real rate is…",
            options: [
              "Higher, because tips add extra money",
              "Lower, once your costs are subtracted",
              "Exactly $24, since costs don't count",
              "Fixed at minimum wage by the app"
            ],
            correctAnswer: 1,
            explanation: "The app shows gross earnings before your expenses. After gas, wear, and repairs, your true hourly profit is lower - which is why you must track costs."
          },
          {
            id: "income4-mastery4",
            question: "Why should a gig worker save 25-30% of earnings?",
            options: [
              "The app requires that exact deposit",
              "No taxes are withheld from gig pay",
              "It is a legal maximum they can keep",
              "Banks pay bonus interest on gig cash"
            ],
            correctAnswer: 1,
            explanation: "Because platforms don't withhold taxes, gig workers owe income and self-employment tax later. Saving 25-30% prevents a surprise bill at tax time."
          },
          {
            id: "income4-mastery5",
            question: "Which is a smart, strategic use of gig work?",
            options: [
              "Ignoring costs and never tracking expenses across the board",
              "Building skills or a client base for bigger work",
              "Assuming benefits will appear automatically in real practice",
              "Refusing to ever work during busy hours in nearly every case"
            ],
            correctAnswer: 1,
            explanation: "Gigs shine when used to build skills, test business ideas, or grow a client base into steady work. Ignoring costs or avoiding busy hours wastes the opportunity."
          },
          {
            id: "income4-mastery6",
            question: "What makes many gig expenses valuable at tax time?",
            options: [
              "They are refunded fully by the platform",
              "Many are deductible, lowering taxes owed",
              "They double your income automatically",
              "They are always paid back by the IRS"
            ],
            correctAnswer: 1,
            explanation: "Business costs like mileage and equipment are often tax-deductible, reducing the income you're taxed on. Tracking them lowers what you ultimately owe."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-5: Gross vs Net Pay
  // ─────────────────────────────────────────────
  {
    lessonId: "income-5",
    sections: [
      {
        type: "concept",
        title: "The Big Number: Gross Pay",
        paragraphs: [
          "Gross pay is the full amount you earn before anything is taken out - the big, exciting number. If you're paid $18 an hour and work 40 hours, your gross pay for that week is $720. For a salaried worker, gross pay is the yearly salary divided into paychecks: a $52,000 salary paid biweekly is $2,000 gross per check. This is the figure people usually quote when they say what a job 'pays.' But here's the catch that surprises every first-time worker: you never actually receive your full gross pay in your bank account.",
          "Gross pay is important because it's the base everything else is calculated from. Taxes, insurance, and retirement contributions are all figured as amounts or percentages of your gross. It also matters when you apply for an apartment or a loan, because lenders and landlords often look at gross income to judge what you can afford. So the big number isn't fake - it's just not the money you get to spend. Understanding gross pay is step one to understanding why your first paycheck looks smaller than you expected.",
          "The gap between gross and what you take home is often bigger than teens expect - sometimes 20-30% or more vanishes before the money hits your account. That's why it's a rookie mistake to plan your spending around your gross pay. If you take a job 'paying $600 a week' and budget for $600, you'll come up short when the real deposit is closer to $470. Knowing your gross is just the starting point; the number that actually matters for your budget comes after the deductions."
        ],
        bullets: [
          "Gross pay is your total earnings before any deductions are taken out.",
          "For hourly work, it's your rate times hours; for salary, it's the yearly amount split per check.",
          "Taxes, insurance, and retirement are all calculated from your gross pay.",
          "Landlords and lenders often judge affordability using gross income.",
          "Never budget with gross pay - the real deposit is always smaller."
        ],
        realWorldExample: "Nadia lands a summer job posted as '$15 an hour.' She works 32 hours in her first week, so her gross pay is $480. Excited, she plans to spend $480 on a new phone. But when payday comes, her deposit is only about $400 - because taxes and other deductions came out of that gross number first."
      },
      {
        type: "concept",
        title: "The Real Number: Net Pay and Deductions",
        paragraphs: [
          "Net pay - often called 'take-home pay' - is what actually lands in your bank account after all deductions. It's your gross pay minus taxes and other withholdings. This is the number that matters for your budget, because it's the money you can actually spend, save, or invest. The difference between gross and net is all the things pulled out along the way, and every paycheck comes with a stub that lists them line by line. Learning to read that stub is one of the most useful money skills a teen can have.",
          "The biggest deductions are taxes. Federal income tax is withheld based on your earnings and the info on your W-4 form. Most workers also pay FICA taxes: 6.2% for Social Security and 1.45% for Medicare, totaling 7.65% of gross - these fund programs you'll benefit from later. Depending on where you live, state and even local income taxes may also come out. On top of taxes, employees often have deductions for health insurance premiums, retirement contributions like a 401(k), and sometimes union dues. Each one shrinks gross toward net.",
          "Not all deductions are bad news - some are money working for you. Taxes are required, but a 401(k) contribution is your own money moving into retirement savings, and health insurance buys real protection. Understanding your stub lets you make smart choices, like contributing enough to a 401(k) to grab a full employer match. The goal isn't to fear deductions but to know exactly where every dollar of your gross goes, so you can plan your real spending around your net and make sure the 'good' deductions are working in your favor. Reading a stub for two minutes each payday quickly turns a confusing list of numbers into a clear map of your money."
        ],
        bullets: [
          "Net pay is your take-home pay: gross minus all taxes and deductions.",
          "FICA taxes take 7.65% of gross for Social Security (6.2%) and Medicare (1.45%).",
          "Federal, state, and sometimes local income taxes are also withheld.",
          "Other deductions include health insurance, retirement, and union dues.",
          "Some deductions, like a 401(k), are your own money saved for later."
        ],
        realWorldExample: "Leo's paycheck shows $800 gross. His stub lists $88 federal income tax, $61.20 FICA (7.65%), $20 state tax, and $30 for health insurance. Those deductions total $199.20, so his net pay - the actual deposit - is $600.80. The $800 was never really his to spend; the $600.80 is."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income5-mc1",
            question: "What is net pay?",
            options: [
              "Your earnings before any deductions",
              "Your take-home pay after all deductions",
              "The tax your employer keeps for itself",
              "Only the Social Security portion of pay"
            ],
            correctAnswer: 1,
            explanation: "Net pay is your take-home pay - gross minus all taxes and deductions. It's the money that actually reaches your account and the number you should budget around."
          },
          {
            id: "income5-mc2",
            question: "FICA taxes of 7.65% of gross pay fund which programs?",
            options: [
              "State roads and public schools",
              "Social Security and Medicare",
              "Your personal retirement 401(k)",
              "Health insurance for your employer"
            ],
            correctAnswer: 1,
            explanation: "FICA is 6.2% for Social Security plus 1.45% for Medicare, totaling 7.65% of gross pay. These fund federal programs you'll benefit from later in life."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ava's First Paycheck Surprise",
        narrative: "Ava, 17, takes a job at a smoothie shop for $16 an hour and works 25 hours her first week. She calculates $400 and immediately plans to buy $400 worth of concert tickets. When her paycheck arrives, the deposit is only $332, and she's confused about where the rest went.",
        details: [
          "Ava's gross pay is $16 times 25 hours, which equals $400 before anything is removed.",
          "Federal income tax and 7.65% FICA were withheld, shrinking the amount she receives.",
          "Her actual net pay - the real deposit - is $332, about $68 less than her gross.",
          "Because she budgeted with gross pay, she now can't afford the full $400 in tickets."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income5-aq1",
          question: "What is Ava's core mistake in this scenario?",
          options: [
              "She worked too many hours that week",
              "She budgeted using gross instead of net",
              "She chose an hourly job over salary",
              "She paid too much for the smoothies"
            ],
            correctAnswer: 1,
          explanation: "Ava planned her spending around her $400 gross pay, but only $332 net actually reached her account. Always budget with net (take-home) pay, never the gross number."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Gross pay is your total earnings before any deductions are taken out.",
          "Net pay is your take-home amount after taxes and deductions.",
          "FICA takes 7.65% of gross for Social Security and Medicare.",
          "Income taxes and insurance or retirement deductions further shrink gross to net.",
          "Always budget around your net pay, since gross is never what you receive."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income5-mastery1",
            question: "A worker earns $20/hour for 30 hours. What is their gross pay?",
            options: [
              "$600, the rate times the hours worked",
              "$500, after estimated taxes are removed under this rule",
              "$450, which is their take-home pay",
              "$660, including overtime for the week"
            ],
            correctAnswer: 0,
            explanation: "Gross pay is rate times hours: $20 times 30 equals $600, before any deductions. Net pay would be lower, and 30 hours doesn't trigger overtime."
          },
          {
            id: "income5-mastery2",
            question: "Which number should you use to plan your monthly budget?",
            options: [
              "Gross pay, the largest listed amount in real practice",
              "Net pay, the money you actually receive",
              "The FICA total taken from each check",
              "The federal tax line on your stub"
            ],
            correctAnswer: 1,
            explanation: "Net pay is what actually reaches your account, so it's the real number for budgeting. Planning around gross leads to spending money you never receive."
          },
          {
            id: "income5-mastery3",
            question: "FICA takes 7.65% of a $1,000 gross check. How much is that?",
            options: [
              "$16.50, only the Medicare portion by that logic",
              "$76.50, for Social Security and Medicare",
              "$765, most of the whole check",
              "$7.65, a flat fee per paycheck"
            ],
            correctAnswer: 1,
            explanation: "7.65% of $1,000 is $76.50, combining 6.2% Social Security ($62) and 1.45% Medicare ($14.50). It's a percentage, not a flat fee."
          },
          {
            id: "income5-mastery4",
            question: "Which deduction is essentially your own money being saved?",
            options: [
              "Federal income tax withholding",
              "A 401(k) retirement contribution",
              "The Social Security portion of FICA",
              "State income tax withholding"
            ],
            correctAnswer: 1,
            explanation: "A 401(k) contribution moves your own money into retirement savings, so it's not lost like a tax - it's working for your future self."
          },
          {
            id: "income5-mastery5",
            question: "Why do landlords often look at gross income, not net?",
            options: [
              "Net pay is a secret they can't see",
              "Gross is a standard base to judge affordability",
              "Gross pay is always exactly double net for most workers today",
              "Net income is illegal to share with them"
            ],
            correctAnswer: 1,
            explanation: "Gross income is a consistent, standard figure lenders and landlords use to gauge what you can afford. Net varies with each person's deductions."
          },
          {
            id: "income5-mastery6",
            question: "A job is posted as '$700 a week.' Why will your deposit be smaller?",
            options: [
              "The employer always keeps a $50 fee",
              "Taxes and deductions come out of gross",
              "Banks charge a tax to receive pay",
              "Weekly pay is illegal, so it's reduced"
            ],
            correctAnswer: 1,
            explanation: "The $700 is gross pay. Federal tax, FICA, and any other deductions are pulled out first, so your net deposit is smaller - often by 20-30%."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-6: Taxes
  // ─────────────────────────────────────────────
  {
    lessonId: "income-6",
    sections: [
      {
        type: "concept",
        title: "How Income Tax Actually Works",
        paragraphs: [
          "Income tax is money the government collects from what you earn to fund public services - roads, schools, the military, and programs like Medicare. In the U.S., federal income tax is 'progressive,' meaning higher earnings are taxed at higher rates. But a huge point teens get wrong: the rate applies in brackets, not to your whole income. If the first $11,000 is taxed at 10% and the next chunk at 12%, earning a dollar into the 12% bracket doesn't tax all your money at 12% - only the dollars inside that bracket. Moving up a bracket never lowers your take-home pay.",
          "Before tax is even calculated, you subtract the 'standard deduction' - an amount everyone can shield from taxes (around $14,000 for a single filer in recent years). So someone earning $14,000 or less may owe zero federal income tax. What's left after the deduction is your 'taxable income,' and the brackets apply to that. This is why a teen with a small summer job often gets back everything that was withheld: their income was under the standard deduction, so they owed no income tax at all and the withheld money is refunded.",
          "There are two main kinds of federal tax on a paycheck. Income tax funds general government and depends on your earnings and bracket. FICA (payroll) taxes - 7.65% for Social Security and Medicare - are separate, flat, and fund those specific programs. Your W-4 form tells your employer how much income tax to withhold. Set it wrong and you'll either owe a lump sum in April or get a big refund (which just means you loaned the government your money interest-free all year). Understanding this puts you in control of your own paycheck."
        ],
        bullets: [
          "Income tax is progressive: higher earnings face higher rates, but only within each bracket.",
          "Moving into a higher bracket never lowers your overall take-home pay.",
          "The standard deduction shields a chunk of income - often the first ~$14,000 - from tax.",
          "FICA payroll taxes (7.65%) are separate from income tax and fund specific programs.",
          "Your W-4 controls how much income tax your employer withholds each paycheck."
        ],
        realWorldExample: "Jamal earns $12,000 from a part-time job in a year. Because that's below the standard deduction (about $14,000), he owes $0 in federal income tax. Any income tax withheld from his checks gets refunded when he files. He still paid FICA, but his income-tax bill was zero - a common surprise for first-time filers."
      },
      {
        type: "concept",
        title: "Filing, Refunds, and Being Tax-Smart",
        paragraphs: [
          "Each year you 'file' a tax return - a form comparing what you owe to what was already withheld from your paychecks. If too much was withheld, you get a refund; if too little, you owe the difference. Employers send you a W-2 by early February showing your gross pay and everything withheld. You use it to file, usually by mid-April. A refund feels like free money, but it isn't - it's your own overpaid money coming back with no interest. Ideally, you withhold close to what you actually owe so your money stays with you all year.",
          "The tax code rewards certain choices with 'deductions' and 'credits,' and knowing the difference matters. A deduction lowers your taxable income - if you're in the 12% bracket, a $1,000 deduction saves $120. A credit is far more powerful: it cuts your tax bill dollar-for-dollar, so a $1,000 credit saves the full $1,000. Some credits are even 'refundable,' paying you money beyond what you owe. This is why understanding credits like the Earned Income Tax Credit or education credits can put real money back in a working person's pocket.",
          "Being tax-smart isn't about tricks - it's about not overpaying or getting surprised. Keep your W-2s and records, file on time to avoid penalties, and adjust your W-4 after big life changes. Contributing to tax-advantaged accounts like a Roth IRA or 401(k) can lower your lifetime tax bill legally. Even teens benefit: filing a return when income was withheld often means a refund. The goal is simple - understand the system enough to pay exactly what you owe, claim what you've earned, and never leave your own money sitting with the government."
        ],
        bullets: [
          "Filing a tax return compares what you owe against what was already withheld.",
          "A refund is your own overpaid money returned - not a bonus or free cash.",
          "A deduction lowers taxable income; a credit cuts your tax bill dollar-for-dollar.",
          "Refundable credits can pay you beyond what you owe in tax.",
          "Filing on time and adjusting your W-4 keeps you from overpaying or getting fined."
        ],
        realWorldExample: "Sofia had $600 withheld for income tax over the year, but after her standard deduction she actually owes only $200. When she files her return, she gets a $400 refund - not a gift, just her own overpayment coming back. Next year she adjusts her W-4 so less is withheld and she keeps more each paycheck."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income6-mc1",
            question: "In a progressive tax system, moving into a higher bracket means…",
            options: [
              "All of your income is taxed at the higher rate",
              "Only income within that bracket is taxed higher",
              "Your take-home pay always goes down",
              "You stop paying any income tax at all"
            ],
            correctAnswer: 1,
            explanation: "Only the dollars that fall inside a higher bracket are taxed at that rate, not your entire income. That's why moving up a bracket never lowers your take-home pay."
          },
          {
            id: "income6-mc2",
            question: "How does a tax credit differ from a tax deduction?",
            options: [
              "A credit lowers only your gross pay",
              "A credit cuts your tax bill dollar-for-dollar",
              "A credit raises your taxable income",
              "A credit is the same as a refund exactly"
            ],
            correctAnswer: 1,
            explanation: "A deduction lowers taxable income, but a credit reduces the tax you owe dollar-for-dollar, making it more powerful. Some credits are even refundable beyond what you owe."
          }
        ]
      },
      {
        type: "scenario",
        title: "Diego Files His First Return",
        narrative: "Diego, 18, earned $9,000 at a summer job. Each paycheck had federal income tax withheld. His parents tell him to file a tax return even though he's nervous about owing money. He gathers his W-2 and sits down to file before the April deadline.",
        details: [
          "Diego's $9,000 income is below the standard deduction of about $14,000, so his taxable income is zero.",
          "Because he owed $0 in federal income tax, all the income tax withheld from his checks is refundable.",
          "His W-2 from the employer shows exactly how much was earned and how much was withheld.",
          "By filing on time, Diego gets his withheld income tax back instead of leaving it with the government."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income6-aq1",
          question: "Why does Diego get his withheld income tax back as a refund?",
          options: [
              "Everyone under 21 pays no taxes ever",
              "His income was below the standard deduction",
              "Refunds are free bonuses from the IRS",
              "He earned money only in the summer"
            ],
            correctAnswer: 1,
          explanation: "Diego's $9,000 was under the ~$14,000 standard deduction, so his taxable income and income-tax bill were $0. The tax withheld was overpayment, refunded when he files."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Income tax is progressive - only income within each bracket is taxed at that rate.",
          "The standard deduction shields early income, so low earners may owe no income tax.",
          "FICA payroll taxes are separate from income tax and fund Social Security and Medicare.",
          "A refund is your own overpaid money, not a bonus from the government.",
          "Credits cut your bill dollar-for-dollar, more powerfully than deductions."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income6-mastery1",
            question: "Why does a tax refund not really count as 'free money'?",
            options: [
              "It is taxed again the following year",
              "It is your own overpaid money returned",
              "It must be fully repaid within a month",
              "It only goes to people over age 30"
            ],
            correctAnswer: 1,
            explanation: "A refund means too much was withheld from your paychecks - it's your own money coming back with no interest, not a gift or bonus."
          },
          {
            id: "income6-mastery2",
            question: "The standard deduction does what to your income before tax?",
            options: [
              "Adds a bonus to your total earnings",
              "Shields a chunk from being taxed",
              "Doubles the tax rate you must pay",
              "Removes your FICA obligation entirely"
            ],
            correctAnswer: 1,
            explanation: "The standard deduction subtracts a set amount (about $14,000 for a single filer) from your income, so only what's left is taxable. It doesn't affect FICA."
          },
          {
            id: "income6-mastery3",
            question: "A $1,000 tax credit for someone in the 12% bracket saves them…",
            options: [
              "$120, since credits work like deductions",
              "$1,000, cutting the bill dollar-for-dollar",
              "$12, a small fraction of the credit",
              "Nothing, because credits aren't real"
            ],
            correctAnswer: 1,
            explanation: "A credit reduces the tax owed dollar-for-dollar, so a $1,000 credit saves the full $1,000. A deduction would only save 12% of $1,000, or $120."
          },
          {
            id: "income6-mastery4",
            question: "What form do you use each year to compare taxes owed with taxes withheld?",
            options: [
              "A tax return, filed by the deadline",
              "A W-4 given to a new employer",
              "A pay stub from a single check",
              "A credit report from a bureau under normal conditions"
            ],
            correctAnswer: 0,
            explanation: "You file a tax return each year to reconcile what you owe against what was withheld. A W-4 sets withholding; a pay stub just shows one check."
          },
          {
            id: "income6-mastery5",
            question: "How are FICA payroll taxes different from federal income tax?",
            options: [
              "FICA is optional and income tax is required",
              "FICA is flat and funds specific programs",
              "FICA only applies to salaried workers",
              "FICA replaces the need to file a return"
            ],
            correctAnswer: 1,
            explanation: "FICA is a flat 7.65% funding Social Security and Medicare specifically, separate from progressive income tax that funds general government."
          },
          {
            id: "income6-mastery6",
            question: "Getting a very large refund every year usually means you…",
            options: [
              "Earned extra money the government owes",
              "Loaned the government money interest-free",
              "Broke a tax law and were fined",
              "Paid no taxes throughout the year"
            ],
            correctAnswer: 1,
            explanation: "A big refund means too much was withheld all year - you effectively lent the government your money with no interest. Adjusting your W-4 keeps more each paycheck."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-7: Career ROI
  // ─────────────────────────────────────────────
  {
    lessonId: "income-7",
    sections: [
      {
        type: "concept",
        title: "Seeing a Career as an Investment",
        paragraphs: [
          "Return on investment, or ROI, measures what you get back compared to what you put in. Careers have an ROI too: the money and time you invest in training, school, or gaining skills versus the lifetime earnings that career produces. A smart career choice isn't just about which job sounds fun today - it's about weighing the cost of getting into a field against the pay and opportunities it opens over decades. Two paths might feel similar at 18 but lead to hugely different lifetime earnings, so thinking like an investor early pays off.",
          "The 'investment' in a career includes obvious costs like tuition and training, but also hidden ones. Time is huge: four years in college is four years not earning full-time, plus any student debt. Someone who trains for six months and starts earning at 19 has a head start over someone who studies until 26. Neither is automatically better - it depends on the payoff. The right question isn't 'which costs less?' but 'which gives the best return for the cost and time I'm putting in?'",
          "The 'return' is more than a starting salary. It includes how fast pay grows over a career, job stability, demand for the skill, and benefits. A field with a modest start but steep raises can beat one with a high start that plateaus. So does job security in a growing industry versus a shrinking one. Calculating career ROI means projecting total lifetime earnings minus total costs, then comparing paths. It turns a scary 'what should I do with my life?' into a clearer money question you can actually reason about."
        ],
        bullets: [
          "Career ROI compares what you invest - money and time - against lifetime earnings.",
          "Costs include tuition, training, debt, and years spent not earning full-time.",
          "A faster start can outweigh a higher-paying path that begins years later.",
          "Returns include raise potential, job stability, demand, and benefits, not just salary.",
          "Thinking like an investor turns a vague choice into a clearer money question."
        ],
        realWorldExample: "Two friends pick different paths. Ben spends $80,000 and four years on a degree, starting at 22 earning $60,000. Priya trains six months for $8,000 and starts at 19 earning $45,000. By 26, Priya has earned wages for seven years with little debt, while Ben started later with loans - the 'best' choice depends on how each career's pay grows over time."
      },
      {
        type: "concept",
        title: "Calculating and Comparing Career Paths",
        paragraphs: [
          "To compare careers, look past the first paycheck to the whole arc. Estimate total costs (tuition, tools, and lost earnings while training) and total lifetime income, including realistic raises. A path costing $100,000 that leads to $70,000-a-year work with steady 3% raises can vastly out-earn a cheaper path that tops out at $40,000. But the reverse can be true if the expensive path leads to a low-paying or oversupplied field. The key is comparing realistic numbers, not dream salaries or worst-case fears.",
          "Debt is where career ROI goes wrong for many people. Borrowing $120,000 for a degree that leads to a $38,000 job can trap someone in payments for decades - a negative ROI. The 'rule of thumb' many advisors suggest is to keep total student debt below your expected first-year salary, so repayment stays manageable. Cheaper paths - community college, trade certifications, apprenticeships that pay while you learn, or employer tuition programs - can dramatically improve ROI by cutting the 'investment' side without gutting the 'return.'",
          "Career ROI isn't purely about money, but money is the part you can measure, so measure it honestly. Research median salaries, growth projections, and typical debt for fields you're considering using real data, not vibes. Then weigh non-money factors - interest, work-life balance, and values - on top of a clear financial picture. The smartest approach chooses a career you can stick with AND that pays back its cost. Making this a deliberate calculation at 17 or 18, instead of drifting into debt, is one of the highest-return decisions of your life. A simple starting move is to look up the median salary and the typical debt load for two or three careers you're curious about, then sketch out how each would play out financially by the time you turn thirty."
        ],
        bullets: [
          "Compare total lifetime income and total costs, not just the first salary.",
          "Realistic raises can make a lower-starting path win over a higher-starting one.",
          "Keep student debt below your expected first-year salary to protect your ROI.",
          "Community college, trades, and apprenticeships can boost ROI by cutting costs.",
          "Use real salary and growth data, then layer in interest and lifestyle factors."
        ],
        realWorldExample: "Maya compares two nursing routes. A four-year degree costs $90,000 but leads to $75,000-a-year roles. A two-year associate program costs $20,000 and leads to $60,000 roles. The associate path has far less debt and starts earning two years sooner - often a stronger ROI unless the bachelor's unlocks much higher-paying specialties later."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income7-mc1",
            question: "What does career ROI compare?",
            options: [
              "Only the salary of your very first job",
              "Total career costs against lifetime earnings",
              "The fun level of two different jobs",
              "How many hours a job requires weekly"
            ],
            correctAnswer: 1,
            explanation: "Career ROI weighs everything you invest - money and time - against the lifetime earnings a career produces. It's about the whole arc, not just the first paycheck."
          },
          {
            id: "income7-mc2",
            question: "A common rule to protect your career ROI is to keep student debt…",
            options: [
              "Above your expected lifetime earnings",
              "Below your expected first-year salary",
              "Exactly equal to your tuition cost",
              "Higher than your parents' income"
            ],
            correctAnswer: 1,
            explanation: "Keeping total student debt below your expected first-year salary keeps repayment manageable, protecting your ROI from being dragged into negative territory."
          }
        ]
      },
      {
        type: "scenario",
        title: "Owen Compares Two Futures",
        narrative: "Owen, 18, loves technology and is deciding between two paths. Path A is a $100,000 computer science degree over four years, leading to jobs around $80,000 with strong raises. Path B is a $15,000 coding bootcamp taking one year, leading to jobs around $55,000. He wants to think like an investor, not just guess.",
        details: [
          "Path A costs far more and delays full-time earning by three extra years compared to Path B.",
          "Path B lets Owen start earning $55,000 at 19, with much smaller debt to repay.",
          "Path A's higher pay and stronger raises could overtake Path B's earnings within several years.",
          "Owen weighs total lifetime income minus total cost for each, not just the starting salary."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income7-aq1",
          question: "What is the smartest way for Owen to compare the two paths?",
          options: [
              "Pick whichever has the higher first salary",
              "Weigh lifetime earnings against total costs",
              "Choose the cheapest option no matter what",
              "Select the path his friends are taking"
            ],
            correctAnswer: 1,
          explanation: "Career ROI means projecting total lifetime earnings minus total costs for each path, including raises and debt. The first salary alone can be misleading over a full career."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A career is an investment: weigh its costs against lifetime earnings.",
          "Costs include tuition, tools, debt, and years spent not earning full-time.",
          "Returns include raise potential, stability, and demand, not just starting pay.",
          "Keep student debt below your expected first-year salary to protect ROI.",
          "Use real salary and growth data, then add lifestyle and interest factors."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income7-mastery1",
            question: "Besides tuition, what hidden cost does a long degree carry?",
            options: [
              "Free money paid to every student",
              "Years spent not earning full-time",
              "A guaranteed six-figure salary",
              "Lower taxes for the rest of life"
            ],
            correctAnswer: 1,
            explanation: "Years in school are years not earning a full-time income, plus any debt. This 'lost earnings' cost is a real part of a career's total investment."
          },
          {
            id: "income7-mastery2",
            question: "Why can a lower-starting career sometimes beat a higher-starting one?",
            options: [
              "Lower pay is always taxed less overall",
              "Strong raises can grow it past the other",
              "Higher-paying jobs are illegal to keep in real practice",
              "Starting salary is the only thing that matters"
            ],
            correctAnswer: 1,
            explanation: "A field with a modest start but steep raises can out-earn a high-start field that plateaus. ROI depends on the whole arc, not just the first salary."
          },
          {
            id: "income7-mastery3",
            question: "Borrowing $120,000 for a degree leading to a $38,000 job is an example of…",
            options: [
              "A guaranteed high return on investment",
              "A likely negative return on investment",
              "A risk-free path with no downside",
              "The best possible career decision across the board"
            ],
            correctAnswer: 1,
            explanation: "Debt far larger than the resulting salary traps you in payments for years, producing a negative ROI. Debt should stay below your expected first-year pay."
          },
          {
            id: "income7-mastery4",
            question: "Which option can improve career ROI by cutting costs?",
            options: [
              "Borrowing the maximum available loans",
              "Choosing a paid apprenticeship program",
              "Attending the most expensive school",
              "Ignoring salary data when deciding"
            ],
            correctAnswer: 1,
            explanation: "Apprenticeships pay you while you learn, community college, and trade certifications all cut the 'investment' side, boosting ROI without gutting the return."
          },
          {
            id: "income7-mastery5",
            question: "What data should you use to judge a career's likely return?",
            options: [
              "Guesses based on a single TV show",
              "Real median salaries and growth projections",
              "Only the salary of a famous celebrity",
              "Whatever number sounds most exciting"
            ],
            correctAnswer: 1,
            explanation: "Honest ROI uses real median salaries, job growth projections, and typical debt - not dream numbers or vibes. Then you layer in lifestyle and interest factors."
          },
          {
            id: "income7-mastery6",
            question: "The full 'return' of a career includes more than salary, such as…",
            options: [
              "The color of the company logo",
              "Raise potential, stability, and demand",
              "How close the office is to a mall",
              "The number of vowels in the job title"
            ],
            correctAnswer: 1,
            explanation: "Return includes how fast pay grows, job stability, demand for the skill, and benefits - all of which shape lifetime earnings beyond the starting salary."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-8: Education as Investment
  // ─────────────────────────────────────────────
  {
    lessonId: "income-8",
    sections: [
      {
        type: "concept",
        title: "The Data Behind College's Payoff",
        paragraphs: [
          "On average, more education correlates with higher lifetime earnings - that's the data behind treating college as an investment. U.S. figures consistently show bachelor's degree holders earn substantially more over a lifetime than those with only a high school diploma, often hundreds of thousands of dollars more, and they tend to face lower unemployment. This 'college wage premium' is real and is the main argument for the cost. But 'on average' hides huge variation: the payoff depends heavily on what you study, where, how much you borrow, and whether you finish.",
          "The cost side is steep and rising. Four years of tuition, fees, housing, and books can total $40,000 at an in-state public school or well over $200,000 at a private one. Add the 'opportunity cost' of four years not working full-time, and the investment is large. This is why the same degree can be a brilliant investment or a costly mistake depending on the price paid. Paying $200,000 for a degree that leads to a $40,000 job is very different from paying $40,000 for one that leads to a $70,000 career.",
          "Finishing matters enormously. Students who take on debt but don't graduate get much of the cost with little of the wage premium - often the worst outcome. Completion rates, the specific major, and the school's real graduate salaries (not glossy brochures) all shape whether the investment pays off. The mature way to view college isn't 'always worth it' or 'a scam,' but as a specific investment whose ROI you can research and improve by choosing an affordable school, a marketable field, and a realistic plan to actually finish."
        ],
        bullets: [
          "On average, degree holders earn far more over a lifetime and face lower unemployment.",
          "The 'college wage premium' is real but varies hugely by major, school, and cost.",
          "Costs range from ~$40,000 in-state to $200,000+ private, plus lost earnings.",
          "The same degree can be a great investment or a mistake depending on the price.",
          "Not finishing is often the worst outcome - much cost, little wage premium."
        ],
        realWorldExample: "Two students borrow for college. Ella spends $45,000 at a state school in nursing and lands a $70,000 job. Ryan spends $130,000 at a private school, changes majors, and leaves after three years with no degree. Ella's investment pays off strongly; Ryan carries heavy debt with little wage premium to show for it."
      },
      {
        type: "concept",
        title: "Making Education Pay Off",
        paragraphs: [
          "You can dramatically improve education's ROI with smart choices before you ever enroll. Starting at a community college for general credits, then transferring, can cut costs by tens of thousands with the same final degree. Choosing in-state public schools, applying aggressively for scholarships and grants (money you never repay), and picking fields with strong demand all tilt the math in your favor. Free money should always come before loans: every scholarship dollar is a dollar of debt you avoid, and grants don't have to be paid back like loans do.",
          "Not all valuable education is a four-year degree. Trade schools, apprenticeships, certifications, and associate degrees can lead to strong, in-demand careers - electricians, plumbers, technicians, and coders - often with far lower cost and faster entry. Apprenticeships even pay you while you learn, flipping the cost equation entirely. The point isn't that college is bad; it's that 'education as investment' includes many paths, and the best one depends on your goals, the field's demand, and the price. Blindly assuming a pricey four-year degree is the only smart path can wreck your ROI.",
          "Whatever path you choose, protect the investment by borrowing carefully and finishing what you start. Prefer federal student loans over private ones (better protections and rates), keep total borrowing below your expected first-year salary, and treat your major as part of the financial decision, not separate from it. Look up real graduate earnings for your intended field and school before committing. Education can be one of the highest-return investments of your life - but only when you match a realistic cost to a realistic payoff and follow through to completion. Treated carelessly, the same education can become one of the heaviest financial burdens instead."
        ],
        bullets: [
          "Community college transfers and in-state schools can slash costs for the same degree.",
          "Scholarships and grants are free money - always pursue them before taking loans.",
          "Trades, apprenticeships, and certifications can pay off strongly at lower cost.",
          "Prefer federal loans and keep total debt under your expected first-year salary.",
          "Research real graduate salaries for your field and school before committing."
        ],
        realWorldExample: "Tariq wants to be an electrician. Instead of a $100,000 degree, he joins a paid apprenticeship: he earns about $18 an hour while training and finishes debt-free with a licensed trade in high demand. His 'education investment' cost him nothing out of pocket and started paying immediately - a powerful ROI."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income8-mc1",
            question: "What does the 'college wage premium' refer to?",
            options: [
              "A fee colleges charge wealthy students",
              "Higher average earnings for degree holders",
              "A discount on tuition for good grades",
              "The interest rate on student loans"
            ],
            correctAnswer: 1,
            explanation: "The college wage premium is the higher average lifetime earnings degree holders tend to have over those with only a high school diploma. It varies by major, school, and cost."
          },
          {
            id: "income8-mc2",
            question: "Which should you always pursue before taking out student loans?",
            options: [
              "The most expensive private school in real practice",
              "Scholarships and grants you don't repay",
              "The maximum private loan available",
              "A credit card to cover tuition"
            ],
            correctAnswer: 1,
            explanation: "Scholarships and grants are free money you never repay, so every dollar of them is a dollar of debt avoided. Always pursue free money before borrowing."
          }
        ]
      },
      {
        type: "scenario",
        title: "Grace Plans an Affordable Degree",
        narrative: "Grace, 18, wants a business degree but is worried about debt. A private university would cost $160,000 over four years. Her counselor suggests a cheaper route that ends with the same bachelor's degree. Grace maps out a plan to protect her return on investment.",
        details: [
          "Grace starts at community college for two years, cutting her cost by roughly $50,000 for general credits.",
          "She applies for several scholarships and grants, which are free money she never has to repay.",
          "She then transfers to an in-state public university to finish the same bachelor's degree.",
          "Her total borrowing stays below her expected first-year salary, keeping repayment manageable."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income8-aq1",
          question: "How does Grace's plan most improve her education ROI?",
          options: [
              "It guarantees she will earn six figures across the board",
              "It cuts costs while earning the same degree",
              "It removes the need to ever get a job",
              "It makes tuition completely free for all"
            ],
            correctAnswer: 1,
          explanation: "By using community college, scholarships, and an in-state transfer, Grace slashes the cost side while earning the same degree - directly improving her return on investment."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Degree holders earn more on average, but the payoff varies by major, school, and cost.",
          "The same degree can be a great investment or a mistake depending on the price paid.",
          "Not finishing is often the worst outcome: much cost, little wage premium.",
          "Scholarships, grants, community college, and in-state schools cut costs sharply.",
          "Trades and apprenticeships are valid, often high-ROI education paths too."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income8-mastery1",
            question: "Why is 'on average, college pays off' an incomplete statement?",
            options: [
              "Averages are always completely wrong in nearly every case",
              "The payoff varies by major, school, and cost",
              "College is free for everyone regardless for most workers today",
              "No degree ever raises anyone's income"
            ],
            correctAnswer: 1,
            explanation: "The average hides huge variation. The actual payoff depends on what you study, where, how much you borrow, and whether you finish - so it isn't automatic."
          },
          {
            id: "income8-mastery2",
            question: "Why is borrowing for college but not graduating often the worst outcome?",
            options: [
              "You pay lower interest for leaving early",
              "You get the cost but little wage premium",
              "The school refunds all of your tuition",
              "You automatically earn a higher salary for most workers today"
            ],
            correctAnswer: 1,
            explanation: "Non-completers take on much of the cost and debt but miss most of the wage premium that comes with finishing a degree - a poor return."
          },
          {
            id: "income8-mastery3",
            question: "How do grants differ from student loans?",
            options: [
              "Grants must be repaid with interest as a general rule",
              "Grants are free money you don't repay",
              "Grants are only for graduate students",
              "Grants cost more than private loans"
            ],
            correctAnswer: 1,
            explanation: "Grants, like scholarships, are free money you never repay, unlike loans which must be paid back with interest. Pursue them before borrowing."
          },
          {
            id: "income8-mastery4",
            question: "What makes a paid apprenticeship attractive as an education path?",
            options: [
              "It costs more than a private college",
              "You earn while you learn a trade",
              "It bans you from ever earning raises",
              "It takes longer than a four-year degree"
            ],
            correctAnswer: 1,
            explanation: "Apprenticeships pay you while you train, often finishing debt-free with an in-demand trade. That flips the cost equation and can produce a strong ROI."
          },
          {
            id: "income8-mastery5",
            question: "A student can slash costs for the same degree by…",
            options: [
              "Choosing the priciest school available across the board",
              "Starting at community college, then transferring",
              "Borrowing the maximum private loans",
              "Skipping all scholarship applications in real practice"
            ],
            correctAnswer: 1,
            explanation: "Completing general credits at community college and transferring can cut costs by tens of thousands while ending with the same bachelor's degree."
          },
          {
            id: "income8-mastery6",
            question: "Before committing to a school and major, you should research…",
            options: [
              "The color of the graduation gowns",
              "Real graduate salaries for that field",
              "Which sports team the school has",
              "The age of the campus buildings"
            ],
            correctAnswer: 1,
            explanation: "Looking up real graduate earnings for your intended field and school - not brochures - lets you match a realistic cost to a realistic payoff before committing."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-9: Skill Stacking
  // ─────────────────────────────────────────────
  {
    lessonId: "income-9",
    sections: [
      {
        type: "concept",
        title: "Why Combining Skills Multiplies Your Value",
        paragraphs: [
          "Skill stacking means combining several 'good enough' skills instead of chasing one world-class talent. Being the single best coder or writer on Earth is nearly impossible, but being pretty good at coding AND design AND communication makes you rare and valuable. Each skill on its own might be common, but the combination is uncommon. A person who can code, understands marketing, and speaks confidently on camera can do jobs three separate people usually handle - and that rarity is what employers and clients pay a premium for.",
          "The math is powerful because rarity multiplies, not adds. Suppose 1 in 10 people are good at writing, 1 in 10 are good at data, and 1 in 10 are good at public speaking. Someone with all three isn't 3 in 10 - they're roughly 1 in 1,000, because the odds multiply. That scarcity is why skill stackers stand out. You don't need to be a genius at any single thing; you need a valuable combination that few others have. This is often more achievable than reaching the very top of one crowded field.",
          "Skill stacking also protects you. If one skill becomes outdated or automated, your other skills keep you employable. A graphic designer who also learns coding and project management has several doors open if design work dries up. Combined skills let you spot opportunities others miss - connecting ideas across fields - and often lead to leadership or entrepreneurial roles, because you understand how different pieces fit together. In a fast-changing economy, a well-chosen stack is more resilient than betting everything on one specialty."
        ],
        bullets: [
          "Skill stacking combines several 'good enough' skills instead of one world-class one.",
          "Rare combinations are more valuable than any single common skill.",
          "Rarity multiplies: three 1-in-10 skills together can make you 1 in 1,000.",
          "Multiple skills protect you if one becomes outdated or automated.",
          "Combined skills open leadership, entrepreneurial, and opportunity-spotting roles."
        ],
        realWorldExample: "Priya is a decent writer, a decent video editor, and comfortable on camera - none world-class. But almost no one has all three. She lands a content-creator role paying far more than a pure writer, because the company would otherwise need to hire three people. Her 'good enough' stack made her uniquely valuable."
      },
      {
        type: "concept",
        title: "Building a Valuable Skill Stack",
        paragraphs: [
          "The best stacks aren't random - they're built around complementary skills that amplify each other. Pairing a 'hard' technical skill (coding, accounting, design) with a 'soft' human skill (communication, sales, leadership) is especially powerful, because technical people who can also explain and persuade are rare and highly paid. Think about your core interest, then add skills that make it more valuable: a photographer who learns marketing can sell their own work; an engineer who learns writing can lead teams and win clients. The stack should point toward the money and impact you want.",
          "You build a stack over time, layer by layer, not all at once. Start with one solid skill, get genuinely useful at it, then add an adjacent skill that boosts it. Free and cheap resources - online courses, YouTube, library books, and real projects - make this affordable for teens. The goal for each skill is 'competent and useful,' not 'perfect,' because you're aiming for a rare combination, not one flawless talent. Consistent practice on real projects beats collecting certificates you never apply.",
          "Choose skills with an eye on demand and durability. Some pairings age well - communication, sales, and basic tech literacy stay useful for decades - while narrow trendy skills can fade. Ask which combinations solve real problems people pay for. A powerful modern stack might be coding plus AI tools plus clear writing, or a trade skill plus business basics plus customer service. Deliberately designing your stack, instead of drifting, means that by your twenties you can hold a mix of skills that few competitors have and many employers want. The teens who start this early, adding one useful skill at a time, often find that by graduation they already stand out from peers who focused on only a single thing."
        ],
        bullets: [
          "The best stacks combine complementary skills that amplify one another.",
          "Pairing a technical skill with a people skill is especially valuable and rare.",
          "Build a stack layer by layer, aiming for 'competent and useful,' not perfect.",
          "Free courses, videos, and real projects make building a stack affordable.",
          "Choose durable, in-demand pairings that solve problems people pay for."
        ],
        realWorldExample: "Marcus starts with strong coding skills, then adds public speaking and basic business knowledge over two years using free online courses. Now he can build software, pitch it to clients, and understand the finances. Companies pay him far more than a coder who can only code, because his stack lets him lead projects end to end."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income9-mc1",
            question: "What is the core idea of skill stacking?",
            options: [
              "Becoming the world's best at one thing",
              "Combining several good-enough skills",
              "Learning skills but never using them",
              "Avoiding technical skills entirely"
            ],
            correctAnswer: 1,
            explanation: "Skill stacking combines several 'good enough' skills into a rare, valuable mix, rather than chasing world-class mastery of a single talent that few can reach."
          },
          {
            id: "income9-mc2",
            question: "Why does a rare skill combination command higher pay?",
            options: [
              "Rarity multiplies, so few people have it",
              "Single common skills always pay more for most workers today",
              "Employers dislike people with one skill",
              "It requires no practice to develop"
            ],
            correctAnswer: 0,
            explanation: "Because odds multiply, combining three 1-in-10 skills can make you roughly 1 in 1,000. That scarcity is exactly what employers and clients pay a premium for."
          }
        ]
      },
      {
        type: "scenario",
        title: "Layla Designs Her Stack",
        narrative: "Layla, 17, is a solid but not exceptional photographer. She notices tons of good photographers competing for the same low-paying gigs. Instead of trying to become the single best photographer, she decides to add complementary skills over the next two years to stand out and earn more.",
        details: [
          "Layla keeps improving her photography to a genuinely competent, useful level, not world-class.",
          "She adds basic marketing so she can find clients and sell her own photo services directly.",
          "She learns simple video editing, letting her offer both photos and short videos to clients.",
          "This rare mix of photo, video, and marketing lets her charge more than photo-only competitors."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income9-aq1",
          question: "Why is Layla's approach smarter than becoming the single best photographer?",
          options: [
              "Being the best is easy for most people",
              "A rare skill mix is more achievable and valuable",
              "Marketing skills are useless for artists as a general rule",
              "Photography alone always pays the most under normal conditions"
            ],
            correctAnswer: 1,
          explanation: "Reaching the very top of a crowded field is nearly impossible, but a rare combination of good-enough skills is achievable and often more valuable, letting Layla charge more."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Skill stacking combines several good-enough skills into a rare, valuable mix.",
          "Rarity multiplies, so combinations beat single common skills for pay.",
          "Pairing a technical skill with a people skill is especially powerful.",
          "Build a stack layer by layer, aiming for competent and useful.",
          "Multiple skills protect you if one becomes outdated or automated."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income9-mastery1",
            question: "Three skills, each held by 1 in 10 people, combined make you roughly…",
            options: [
              "3 in 10, by adding the odds together",
              "1 in 1,000, because the odds multiply",
              "1 in 3, since you have three skills",
              "10 in 10, meaning everyone has them"
            ],
            correctAnswer: 1,
            explanation: "The odds multiply: 1/10 times 1/10 times 1/10 is 1 in 1,000. That rarity from combining skills is what makes a stack so valuable."
          },
          {
            id: "income9-mastery2",
            question: "Which pairing tends to be especially valuable in a skill stack?",
            options: [
              "Two nearly identical technical skills in real practice",
              "A technical skill plus a people skill",
              "Two skills you never actually use",
              "Skills that are all going out of demand"
            ],
            correctAnswer: 1,
            explanation: "Combining a technical skill with a human skill like communication or sales is powerful because technical people who can also explain and persuade are rare and highly paid."
          },
          {
            id: "income9-mastery3",
            question: "How does skill stacking protect your career?",
            options: [
              "It guarantees you can never be fired across the board",
              "Other skills keep you employable if one fades",
              "It removes the need to learn anything new",
              "It locks you into a single narrow field"
            ],
            correctAnswer: 1,
            explanation: "If one skill becomes outdated or automated, your other skills keep you employable and able to pivot - a resilience that betting on one specialty lacks."
          },
          {
            id: "income9-mastery4",
            question: "What is the right skill level to aim for in each stacked skill?",
            options: [
              "Perfect, world-class mastery in each",
              "Competent and genuinely useful",
              "Barely aware of what the skill is",
              "Enough to list it but not use it"
            ],
            correctAnswer: 1,
            explanation: "You aim for 'competent and useful' in each skill, since the value comes from the rare combination, not from being flawless at any single one."
          },
          {
            id: "income9-mastery5",
            question: "How should you build a skill stack over time?",
            options: [
              "Master every skill at once instantly",
              "Layer by layer, adding adjacent skills",
              "Collect certificates you never apply",
              "Randomly pick unrelated hobbies for most workers today"
            ],
            correctAnswer: 1,
            explanation: "You build a stack layer by layer: get useful at one skill, then add an adjacent skill that boosts it, practicing on real projects rather than collecting unused certificates."
          },
          {
            id: "income9-mastery6",
            question: "Which stack is likely to stay valuable over many years?",
            options: [
              "One narrow, trendy skill that may fade",
              "Communication, sales, and tech literacy",
              "Skills that solve no real problems",
              "A single hobby with no demand"
            ],
            correctAnswer: 1,
            explanation: "Durable skills like communication, sales, and basic tech literacy stay useful for decades and solve real problems, making them a resilient stack foundation."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-10: Entrepreneurship Income
  // ─────────────────────────────────────────────
  {
    lessonId: "income-10",
    sections: [
      {
        type: "concept",
        title: "How Entrepreneurs Actually Get Paid",
        paragraphs: [
          "Entrepreneurs don't earn a paycheck the way employees do - they earn profit, which is revenue minus expenses. If a teen's lawn-care business brings in $2,000 a month (revenue) but spends $600 on gas, equipment, and ads (expenses), the profit is $1,400 - and that's the owner's real income. This is a crucial shift in thinking: the money customers pay you is not the money you keep. Many new entrepreneurs feel rich seeing revenue roll in, then realize how much goes back out to keep the business running.",
          "Because income is profit, an entrepreneur's pay is uncapped but uncertain. Unlike an hourly worker who knows their rate, a business owner might earn nothing for months while building, then earn far more than any salary once things click. There's no guaranteed minimum - a slow month can mean zero income, and the owner still owes business expenses. This is the fundamental trade of entrepreneurship: you swap the safety of a steady paycheck for the potential of much higher, but riskier, earnings that you control.",
          "Entrepreneurs also carry costs and risks employees never see. They pay self-employment taxes (about 15.3% for Social Security and Medicare, both halves), buy their own health insurance, get no paid vacation, and often invest their own savings to start. If the business fails, they can lose that money. But the upside is ownership: a successful business can grow, be sold, or generate income even when the owner steps back - turning active hustle into an asset. That ownership potential is why people take the entrepreneurial risk despite the uncertainty."
        ],
        bullets: [
          "Entrepreneurs earn profit - revenue minus expenses - not a fixed paycheck.",
          "Revenue is not income: much of it goes back out to run the business.",
          "Earnings are uncapped but uncertain, with no guaranteed minimum.",
          "Owners pay self-employment tax and cover their own benefits and startup costs.",
          "The upside is ownership: a business can grow into a sellable, income-producing asset."
        ],
        realWorldExample: "Sofia runs a custom T-shirt business. In December she sells $4,000 worth of shirts (revenue), but blank shirts, printing, shipping, and ads cost her $2,500. Her actual income - profit - is $1,500. In a slow February, she sells only $800, and after $600 in costs she keeps just $200. Her income swings with the business."
      },
      {
        type: "concept",
        title: "Turning a Hustle Into Real Income",
        paragraphs: [
          "The difference between a hobby that loses money and a business that pays you is understanding your numbers. You need to know your revenue, your fixed costs (things you pay no matter what, like a subscription or rent) and variable costs (which rise with each sale, like materials). Pricing must cover all of it plus profit: if a bracelet costs $3 in materials and 20 minutes of labor, selling it for $4 is a losing game. Entrepreneurs who track these numbers price correctly and actually take home money; those who don't often work hard for nothing.",
          "Smart young entrepreneurs 'start small and reinvest.' Rather than borrowing heavily, they begin with low costs, use early profits to grow, and validate that people will actually pay before scaling up. Reinvesting profit - buying better equipment, more inventory, or ads that bring more customers - compounds a small business into a bigger one. This keeps risk low: you're growing with money the business already earned, not gambling borrowed cash on an unproven idea. Many huge companies began as tiny, self-funded side hustles run after school or work.",
          "Entrepreneurship income can also become partly passive over time, which is its long-term power. An owner who builds systems - hiring help, automating orders, or creating a product that sells itself online - can eventually earn even when not working every hour. A dog-walking hustle can grow into a service that employs other walkers, with the founder earning from the whole operation. This is how entrepreneurs escape the time-for-money trap: they build something that produces income beyond their own hours, and can even sell the business as an asset someday. That long-term payoff is exactly why many people accept the early uncertainty and hard work that starting a business demands."
        ],
        bullets: [
          "Know your revenue, fixed costs, and variable costs to price for real profit.",
          "Pricing must cover materials, labor, and overhead - then add profit on top.",
          "Start small, validate demand, and reinvest early profits to grow with low risk.",
          "Reinvesting profit compounds a tiny side hustle into a larger business.",
          "Building systems can make the income partly passive and the business sellable."
        ],
        realWorldExample: "Jayden starts a phone-repair side hustle with $150 of tools. He tracks that each repair costs him $8 in parts and he charges $40, netting $32 profit. He reinvests early profits into more tools and online ads, and within a year trains a friend to help - so the business earns even on days Jayden is busy with school."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income10-mc1",
            question: "An entrepreneur's actual income is best described as…",
            options: [
              "All the revenue customers pay them",
              "Revenue minus the business's expenses",
              "A fixed salary set by the government",
              "Only the taxes they collect on sales"
            ],
            correctAnswer: 1,
            explanation: "Entrepreneurs earn profit - revenue minus expenses - not the full amount customers pay. Much of the revenue goes back out to run the business."
          },
          {
            id: "income10-mc2",
            question: "What is a smart, low-risk way for a young entrepreneur to grow?",
            options: [
              "Borrow as much money as possible upfront",
              "Start small and reinvest early profits",
              "Spend all revenue before counting costs",
              "Avoid ever tracking their numbers"
            ],
            correctAnswer: 1,
            explanation: "Starting small, validating demand, and reinvesting early profits grows the business with money it already earned - far lower risk than gambling borrowed cash."
          }
        ]
      },
      {
        type: "scenario",
        title: "Noah Prices His Candles",
        narrative: "Noah, 18, starts a candle-making business. He's thrilled when he sells $1,500 of candles in his first month and assumes that's his income. His mentor asks him to subtract every cost before celebrating, and to make sure his prices actually leave profit.",
        details: [
          "Noah's $1,500 in sales is revenue, not income - he hasn't subtracted his costs yet.",
          "Wax, wicks, jars, and shipping cost him $700, and online ads cost another $200.",
          "After $900 in total expenses, Noah's real profit - his actual income - is $600.",
          "He realizes some candles priced at $8 barely cover their $6 material and labor cost."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income10-aq1",
          question: "What key lesson should Noah take from his first month?",
          options: [
              "Revenue and income are the same thing",
              "Profit is revenue minus all expenses",
              "He should stop tracking his costs",
              "Ads never affect a business's income"
            ],
            correctAnswer: 1,
          explanation: "Noah's real income is profit - the $600 left after subtracting his $900 in costs from $1,500 revenue. Revenue is not income, and mispricing candles eats into profit."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Entrepreneurs earn profit - revenue minus expenses - not the full sales amount.",
          "Income is uncapped but uncertain, with no guaranteed minimum paycheck.",
          "Owners pay self-employment tax and cover their own benefits and startup costs.",
          "Know your fixed and variable costs so you price for real profit.",
          "Start small, reinvest profits, and build systems that can make income passive."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income10-mastery1",
            question: "A business earns $3,000 revenue with $1,800 in expenses. The owner's income is…",
            options: [
              "$3,000, the full amount of revenue",
              "$1,200, the profit after expenses",
              "$1,800, the total spent on costs",
              "$4,800, revenue plus the expenses"
            ],
            correctAnswer: 1,
            explanation: "Income is profit: $3,000 revenue minus $1,800 expenses equals $1,200. Revenue alone is not what the owner keeps."
          },
          {
            id: "income10-mastery2",
            question: "How does an entrepreneur's income differ from an hourly wage?",
            options: [
              "It is guaranteed to be higher each week",
              "It is uncapped but uncertain, with no minimum",
              "It is always exactly minimum wage for most workers today",
              "It can never fall below a set amount"
            ],
            correctAnswer: 1,
            explanation: "Entrepreneurial income has no guaranteed minimum - a slow month can mean zero - but it's uncapped, so a strong business can pay far more than any wage."
          },
          {
            id: "income10-mastery3",
            question: "Why must an entrepreneur know both fixed and variable costs?",
            options: [
              "To avoid ever making any profit as a general rule",
              "To price products so they cover costs plus profit",
              "Because the law bans selling anything under normal conditions",
              "To pay their employees less than minimum wage"
            ],
            correctAnswer: 1,
            explanation: "Knowing all costs lets you price so each sale covers materials, labor, and overhead and still leaves profit. Ignoring costs means working hard for nothing."
          },
          {
            id: "income10-mastery4",
            question: "What extra tax do self-employed entrepreneurs typically owe?",
            options: [
              "A luxury tax on all their sales",
              "Self-employment tax of about 15.3%",
              "A refundable teen business credit",
              "Nothing, since they own the business"
            ],
            correctAnswer: 1,
            explanation: "Self-employed people pay self-employment tax, roughly 15.3%, covering both the employee and employer halves of Social Security and Medicare."
          },
          {
            id: "income10-mastery5",
            question: "Reinvesting early profits into a business mainly helps by…",
            options: [
              "Guaranteeing the business can never fail in real practice",
              "Growing it with money it already earned",
              "Removing all risk from every decision",
              "Letting the owner skip paying taxes"
            ],
            correctAnswer: 1,
            explanation: "Reinvesting profit compounds a small business using money it already earned, growing it with low risk instead of gambling borrowed cash on an unproven idea."
          },
          {
            id: "income10-mastery6",
            question: "How can entrepreneurship income become partly passive over time?",
            options: [
              "By working more hours every single day in nearly every case",
              "By building systems that earn beyond your hours",
              "By lowering prices until profit disappears across the board",
              "By refusing to ever hire any help"
            ],
            correctAnswer: 1,
            explanation: "Building systems - hiring help, automating, or creating products that sell themselves - lets a business earn even when the owner isn't working every hour, escaping the time-for-money trap."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-11: College vs Trade School: What's the ROI?
  // ─────────────────────────────────────────────
  {
    lessonId: "income-11",
    sections: [
      {
        type: "concept",
        title: "Two Very Different Paths, Two Different Costs",
        paragraphs: [
          "A four-year college and a trade school lead to work in very different ways, and their costs reflect that. A bachelor's degree typically takes four years and can cost anywhere from $40,000 at an in-state public school to over $200,000 private, plus four years of not working full-time. A trade school - training electricians, welders, HVAC technicians, dental hygienists, or plumbers - usually takes months to two years and costs far less, often $5,000 to $30,000. Some trades even use apprenticeships that pay you while you learn, flipping the cost to nearly zero.",
          "The time difference is money too. A trade graduate might start earning a real salary at 19 or 20, while a college graduate starts around 22 - and later still for advanced degrees. Those extra earning years, plus lower debt, give trades a real head start on ROI. But college can unlock fields with higher long-term ceilings and steeper raises - engineering, medicine, law, and many corporate careers. So the comparison isn't 'which is better' in the abstract; it's which fits the specific career and person, at what price.",
          "Debt is the deciding factor for many. Trade school's lower cost means graduates often carry little or no debt, so their earnings are theirs to keep and build wealth with quickly. College debt, if kept reasonable, can still pay off handsomely in high-earning fields - but oversized debt for a low-paying degree is a classic ROI trap. The mature framing rejects both 'college is always worth it' and 'trades are always cheaper and better.' Each is an investment whose return depends on the field, the cost, and finishing the program."
        ],
        bullets: [
          "College usually takes four years and costs far more than trade school.",
          "Trade school often takes months to two years and costs $5,000-$30,000.",
          "Some trades pay you through apprenticeships, cutting cost to near zero.",
          "Trades let you earn sooner with less debt; college can unlock higher ceilings.",
          "The best choice depends on the specific field, cost, and whether you finish."
        ],
        realWorldExample: "Zoe becomes an electrician through a paid apprenticeship, earning while she trains and finishing debt-free at 21 making $58,000. Her cousin Ben borrows $70,000 for a four-year degree, starting at 23 making $62,000 with loan payments. Ben earns slightly more but started two years later with debt - Zoe's ROI is very competitive."
      },
      {
        type: "concept",
        title: "Comparing the Real Return of Each Path",
        paragraphs: [
          "To compare fairly, project both paths over a full career, not just year one. Add up total cost (tuition plus lost earning years) and total lifetime income including realistic raises. Trades often win early because of lower cost and earlier earning, but some college fields catch up and pass them thanks to higher ceilings and faster raises. A welder earning $55,000 with steady work can out-earn a college grad in an oversupplied, low-paying field - and lose to an engineer whose pay climbs steeply. Real numbers, not stereotypes, decide it.",
          "Job demand and stability matter as much as pay. Many skilled trades face shortages, meaning strong job security and rising wages, and they generally can't be outsourced overseas - you can't wire a house from another country. College fields vary wildly: some are in high demand, others are crowded. Automation and offshoring hit different jobs differently. A smart comparison checks projected demand for the specific field, not just the credential type, because a booming trade can beat a shrinking profession and vice versa.",
          "Fit and follow-through often decide the real winner. The best-paying path is worthless if you drop out or hate the work. Some people thrive with hands-on trade work and would be miserable in an office; others are the reverse. Consider your interests, the physical demands of some trades, and whether you'll actually complete the program. The strongest approach: research real salaries and demand for a few specific careers you'd genuinely pursue, compare total cost and lifetime pay, and pick the path with a strong return that you'll actually stick with. Shadowing someone already doing the work, even for a single day, can reveal whether a well-paid path is one you'd genuinely enjoy for years."
        ],
        bullets: [
          "Project each path over a full career, comparing total cost and lifetime income.",
          "Trades often win early; some college fields catch up with higher ceilings.",
          "Skilled trades face shortages and can't be outsourced, aiding job security.",
          "Check demand for the specific field, not just the type of credential.",
          "Fit and finishing matter: the best path is one you'll actually complete."
        ],
        realWorldExample: "Diego compares plumbing and a business degree. Plumbing: $15,000 training, earning $52,000 by age 20 with high demand. Business degree: $60,000 cost, earning $58,000 by 23 with wider corporate options. Over ten years, plumbing's earlier start and low debt make its ROI strong - but the degree may open management roles that pay more later."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income11-mc1",
            question: "Why do trades often have a head start on ROI over four-year college?",
            options: [
              "Trades always pay more than any degree",
              "Lower cost and earning sooner with less debt",
              "College degrees are worthless everywhere in nearly every case",
              "Trade workers never face any competition for most workers today"
            ],
            correctAnswer: 1,
            explanation: "Trades typically cost far less and let you start earning years earlier with little debt, giving a head start on ROI. But some college fields catch up with higher ceilings."
          },
          {
            id: "income11-mc2",
            question: "What makes many skilled trades relatively secure jobs?",
            options: [
              "They can be done fully by robots now",
              "They face shortages and can't be outsourced",
              "They require no training whatsoever for most workers today",
              "They are guaranteed by the government"
            ],
            correctAnswer: 1,
            explanation: "Many trades face worker shortages and can't be outsourced overseas - you can't wire a house from another country - which supports job security and rising wages."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aisha Weighs College Against a Trade",
        narrative: "Aisha, 18, likes hands-on work and is deciding between a four-year business degree and an HVAC technician program. She wants to compare the real return of each, not just pick based on what sounds prestigious. She lays out the numbers and demand for both.",
        details: [
          "The HVAC program costs $18,000 and takes under two years; she'd start earning around age 20.",
          "The business degree costs $65,000 over four years; she'd start earning around age 22 with debt.",
          "HVAC technicians are in high demand locally and the work can't be outsourced overseas.",
          "The degree offers a higher long-term ceiling if she pursues management, but with more debt."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income11-aq1",
          question: "What is the best way for Aisha to compare her two options?",
          options: [
              "Pick whichever sounds more prestigious as a general rule",
              "Compare total cost and lifetime pay for each",
              "Always choose the cheaper option instantly under normal conditions",
              "Ignore demand and just guess the salaries"
            ],
            correctAnswer: 1,
          explanation: "A fair comparison projects total cost (including lost earning years and debt) against lifetime income and demand for each specific path - not prestige or guesses."
        }
      },
      {
        type: "recap",
        takeaways: [
          "College usually costs more and takes longer than trade school.",
          "Trades let you earn sooner with less debt, aiding early ROI.",
          "College can unlock fields with higher ceilings and steeper raises.",
          "Many trades face shortages and can't be outsourced, boosting security.",
          "Compare total cost and lifetime pay for specific fields you'd actually finish."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income11-mastery1",
            question: "A paid apprenticeship affects the cost of entering a trade by…",
            options: [
              "Doubling the total cost of training under normal conditions",
              "Cutting it near zero since you earn while learning",
              "Making it more expensive than college in real practice",
              "Requiring four years of unpaid study across the board"
            ],
            correctAnswer: 1,
            explanation: "Apprenticeships pay you while you train, flipping the cost toward zero and letting you finish debt-free - a major ROI advantage of some trades."
          },
          {
            id: "income11-mastery2",
            question: "Why can a college field still beat a trade over a full career?",
            options: [
              "College is free while trades cost money",
              "Higher ceilings and steeper raises",
              "Trades pay nothing after the first year",
              "College graduates never carry any debt"
            ],
            correctAnswer: 1,
            explanation: "Some college fields have higher long-term ceilings and faster raises, so they can catch up to and pass a trade's earlier start over a full career."
          },
          {
            id: "income11-mastery3",
            question: "The 'lost earning years' cost of college refers to…",
            options: [
              "Money the school pays you to attend",
              "Years spent studying instead of working",
              "A tax charged only to graduates",
              "The interest earned on tuition"
            ],
            correctAnswer: 1,
            explanation: "While in a four-year program you're not earning a full-time income, so those years of forgone wages are a real cost added to tuition."
          },
          {
            id: "income11-mastery4",
            question: "When comparing paths, you should check demand for…",
            options: [
              "The type of credential in general",
              "The specific field you'd actually enter",
              "Only the most famous celebrity jobs",
              "Whatever field sounds most exciting in nearly every case"
            ],
            correctAnswer: 1,
            explanation: "Demand varies by specific field, not credential type. A booming trade can beat a crowded profession and vice versa, so research the actual career."
          },
          {
            id: "income11-mastery5",
            question: "Why does 'fit and follow-through' matter in this choice?",
            options: [
              "The best path is worthless if you quit it",
              "Prestige alone guarantees high pay for most workers today",
              "Interests never affect earning at all as a general rule",
              "Finishing a program lowers your salary under normal conditions"
            ],
            correctAnswer: 0,
            explanation: "Even the highest-paying path fails if you drop out or hate the work. Choosing something you'll actually complete and stick with is essential to real ROI."
          },
          {
            id: "income11-mastery6",
            question: "Which statement reflects the mature view of this choice?",
            options: [
              "College is always worth it as a general rule",
              "Each is an investment judged by field and cost",
              "Trades are always cheaper and always better under normal conditions",
              "The decision never involves any real numbers in real practice"
            ],
            correctAnswer: 1,
            explanation: "Both paths are investments whose return depends on the specific field, cost, and finishing - rejecting the myths that either is automatically the better choice."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-12: How Labor Markets Set Your Pay
  // ─────────────────────────────────────────────
  {
    lessonId: "income-12",
    sections: [
      {
        type: "concept",
        title: "Supply and Demand for Workers",
        paragraphs: [
          "Your pay isn't set by how hard you work alone - it's largely set by supply and demand for your skills in the labor market. Demand is how badly employers need someone who can do a job; supply is how many people can do it. When lots of employers want a skill but few people have it, wages rise. When many people can do a job that few employers need, wages fall. This is why a surgeon earns far more than a cashier: not because surgery is 'harder' in effort, but because few people can do it and many patients need it.",
          "This explains pay gaps that otherwise seem unfair. A job requiring years of rare training and offering little competition among workers commands high pay, while an easy-to-learn job with a flood of available workers pays near minimum wage. A software engineer and a fast-food worker might both work hard, but the engineer's skills are scarcer and in higher demand. Understanding this frees you from thinking pay is purely about effort - it's about how rare and needed your specific abilities are in the market.",
          "The market shifts over time, and so does pay. A skill that's scarce today can become common as more people learn it, pushing wages down; a new technology can suddenly make certain skills hugely valuable. Nurses' pay rises when there's a shortage; some jobs shrink when automation reduces demand for them. Smart workers watch these trends and aim their skills toward areas of high demand and limited supply. You can't control the whole market, but you can position yourself where it pays well by choosing scarce, needed skills."
        ],
        bullets: [
          "Pay is largely set by supply of workers and demand from employers, not just effort.",
          "High demand plus low supply of a skill pushes wages up.",
          "Low demand plus a flood of available workers pushes wages down.",
          "This explains why rare, needed skills pay far more than common ones.",
          "Markets shift, so aim your skills toward high-demand, low-supply areas."
        ],
        realWorldExample: "Two hardworking teens: one bags groceries (a job almost anyone can quickly learn, with many applicants) and earns minimum wage. The other repairs specialized medical equipment (few people trained, hospitals desperate for them) and earns triple. The difference isn't effort - it's that scarce, in-demand skills command far higher pay in the market."
      },
      {
        type: "concept",
        title: "Boosting Your Own Earning Power",
        paragraphs: [
          "Since pay follows scarcity and demand, you raise your earning power by becoming more valuable and harder to replace. Building rare skills, credentials, or experience shifts you into the 'low supply, high demand' zone where wages are higher. This is why education, specialized training, and skill stacking pay off - they reduce how many people can do what you do. Gaining a certification, mastering an in-demand tool, or combining skills few others have all move you up the pay ladder by making your labor scarcer and more needed.",
          "Leverage and negotiation also matter because pay isn't purely automatic. Employers have a range they'll pay, and workers who understand their market value can negotiate toward the top of it. Knowing typical salaries for your role (through research) is real power: you can ask for fair pay confidently and recognize a lowball offer. Building a strong reputation, a network, and a track record of results gives you leverage - other employers wanting you is the strongest reason your current one will pay more to keep you.",
          "Where you work and geographic demand shape pay too. The same skill can pay very differently by industry, company, and location - a coder may earn more at a tech firm than a small nonprofit, and more in a high-demand city (though costs there may be higher). Being willing to move toward opportunity, switch industries, or change employers is one of the fastest ways people boost income, because a new employer often pays more than a small annual raise. Understanding the market lets you steer your career toward where your skills are worth the most. Pay is a moving target, so the people who track demand and stay flexible tend to earn more over time."
        ],
        bullets: [
          "Raise earning power by becoming scarcer and harder to replace.",
          "Education, credentials, and skill stacking reduce how many can do your job.",
          "Knowing your market value lets you negotiate toward fair, higher pay.",
          "A strong reputation and outside offers give you leverage with employers.",
          "Industry, company, and location change what the same skill pays."
        ],
        realWorldExample: "Maya, a graphic designer, learns she's paid $45,000 but market research shows her role averages $58,000 in her city. Armed with data and a portfolio of results, she negotiates a raise and, when refused, takes a competing offer at $57,000. Understanding her market value turned into a $12,000 pay jump."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income12-mc1",
            question: "When a skill is in high demand but few workers have it, wages tend to…",
            options: [
              "Fall toward minimum wage quickly under normal conditions",
              "Rise because the skill is scarce",
              "Stay frozen no matter what happens",
              "Disappear from the market entirely"
            ],
            correctAnswer: 1,
            explanation: "High demand plus low supply pushes wages up. Employers compete for the few workers who have the scarce, needed skill, so pay rises."
          },
          {
            id: "income12-mc2",
            question: "What is the most reliable way to raise your earning power?",
            options: [
              "Simply working more hours each day",
              "Becoming scarcer and harder to replace",
              "Refusing to learn any new skills",
              "Choosing jobs anyone can do quickly"
            ],
            correctAnswer: 1,
            explanation: "Building rare, in-demand skills makes you harder to replace, shifting you into the low-supply, high-demand zone where wages are higher. Effort alone doesn't do this."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ravi Understands His Pay",
        narrative: "Ravi, 17, is frustrated that his friend earns way more at a first job than he does, even though Ravi works just as hard stocking shelves. His mentor explains that pay is shaped by the labor market, not effort alone, and helps Ravi think about how to raise his own value over time.",
        details: [
          "Ravi's shelf-stocking job is easy to learn, and many people can do it, so it pays near minimum wage.",
          "His friend fixes computers - a scarcer skill that fewer people have and more employers need.",
          "Ravi decides to learn a specialized, in-demand skill to move into a low-supply, high-demand zone.",
          "He also plans to research typical pay for that skill so he can negotiate fairly later on."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income12-aq1",
          question: "Why does Ravi's friend earn more despite similar effort?",
          options: [
              "His friend is simply luckier than Ravi",
              "His skill is scarcer and more in demand",
              "Effort has no effect on any job at all",
              "Older workers always earn more money across the board"
            ],
            correctAnswer: 1,
          explanation: "Pay is shaped by supply and demand for skills. His friend's computer-repair skill is scarcer and more needed by employers, so it commands higher pay than easy-to-learn work."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Pay is largely set by supply of workers and demand from employers, not effort alone.",
          "Scarce, in-demand skills command far higher wages than common ones.",
          "You raise earning power by becoming rarer and harder to replace.",
          "Knowing your market value lets you negotiate for fair, higher pay.",
          "Industry, employer, and location all change what the same skill pays."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income12-mastery1",
            question: "Why does a surgeon typically earn more than a cashier?",
            options: [
              "Surgeons simply work harder every day in nearly every case",
              "Few can do surgery and many patients need it",
              "Cashiers are legally paid the least by rule",
              "The government sets both wages equally for most workers today"
            ],
            correctAnswer: 1,
            explanation: "Surgery requires rare training few people have while demand is high, so pay rises. It's about scarcity and demand, not raw effort."
          },
          {
            id: "income12-mastery2",
            question: "If many people learn a once-scarce skill, its wages tend to…",
            options: [
              "Rise even higher for most workers today",
              "Fall as the supply of workers grows",
              "Stay exactly the same forever as a general rule",
              "Become illegal for employers to pay"
            ],
            correctAnswer: 1,
            explanation: "As more people gain a skill, supply rises and, unless demand grows too, wages fall. Markets shift, so today's scarce skill can become common."
          },
          {
            id: "income12-mastery3",
            question: "How does earning a rare certification affect your earning power?",
            options: [
              "It floods the market with more workers as a general rule",
              "It makes you scarcer and harder to replace",
              "It lowers demand for your specific skill",
              "It has no effect on pay whatsoever"
            ],
            correctAnswer: 1,
            explanation: "A rare, in-demand credential reduces how many people can do your job, shifting you toward low supply and high demand, where wages are higher."
          },
          {
            id: "income12-mastery4",
            question: "Why is knowing typical salaries for your role useful?",
            options: [
              "It lets employers pay you far less",
              "It gives you power to negotiate fairly",
              "It is illegal information to look up",
              "It guarantees you a raise every month"
            ],
            correctAnswer: 1,
            explanation: "Knowing your market value lets you negotiate toward the top of an employer's range and recognize a lowball offer - real leverage in setting your pay."
          },
          {
            id: "income12-mastery5",
            question: "What often gives a worker the strongest leverage for higher pay?",
            options: [
              "Threatening to work fewer hours in real practice",
              "Other employers wanting to hire them",
              "Complaining loudly about the pay",
              "Having the longest job title possible"
            ],
            correctAnswer: 1,
            explanation: "When other employers want you, your current one has a strong reason to pay more to keep you. Outside demand is powerful leverage in negotiation."
          },
          {
            id: "income12-mastery6",
            question: "The same skill can pay differently depending on…",
            options: [
              "The worker's favorite color",
              "Industry, employer, and location",
              "The day of the week it's used",
              "Nothing; pay is always identical"
            ],
            correctAnswer: 1,
            explanation: "Industry, company, and geographic demand all shape pay for the same skill, which is why switching employers or moving toward opportunity can boost income."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-13: Recessions, Unemployment & Your Money
  // ─────────────────────────────────────────────
  {
    lessonId: "income-13",
    sections: [
      {
        type: "concept",
        title: "What a Recession Actually Does to Jobs",
        paragraphs: [
          "A recession is a period when the economy shrinks instead of grows - businesses sell less, so they earn less, and many cut costs by laying off workers. Economists often mark a recession by the economy contracting for two straight quarters (six months). When it hits, unemployment rises: more people are out of work and looking for jobs. Fewer companies are hiring, so it takes longer to find work, and even employed people may see hours cut, raises frozen, or bonuses canceled. Recessions are a normal, recurring part of the economy - they've happened many times and always eventually end.",
          "Recessions hit different workers unevenly. Jobs tied to 'wants' rather than 'needs' - luxury goods, travel, entertainment, and new construction - often suffer first, because people cut those purchases when money is tight. Newer and less-experienced workers are frequently laid off before senior staff ('last in, first out'). Meanwhile, some fields stay steadier: essentials like healthcare, groceries, utilities, and basic repairs are needed in any economy. Understanding which jobs are more recession-resistant helps you see why job security varies so much during a downturn.",
          "The ripple effects reach beyond jobs. As people lose income and spend less, other businesses earn less and may cut more jobs - a cycle that can deepen a downturn. Investments like stocks often fall during recessions, which scares people, though markets have historically recovered over time. For a young person, the key insight is that recessions are predictable events (not if, but when) that temporarily make jobs scarcer and money tighter. Knowing they're coming eventually lets you prepare instead of panic when one arrives."
        ],
        bullets: [
          "A recession is when the economy shrinks, often for two straight quarters.",
          "Unemployment rises: hiring slows and finding work takes longer.",
          "'Wants' jobs like luxury and travel are hit before 'needs' like healthcare.",
          "Newer, less-experienced workers are often laid off first.",
          "Recessions are normal and recurring, and they always eventually end."
        ],
        realWorldExample: "In a recession, a fancy restaurant sees diners cut back, so it lays off newer servers first and freezes raises. Down the street, a grocery store and a pharmacy stay busy because people still need food and medicine. Two workers with similar effort face very different job security based on whether their work is a 'want' or a 'need.'"
      },
      {
        type: "concept",
        title: "Protecting Yourself Before and During a Downturn",
        paragraphs: [
          "The single most important protection is an emergency fund - savings set aside to cover your basic expenses if income stops. A common guideline is three to six months of essential costs kept in a safe, accessible account. If you lose your job in a recession, this fund pays rent and food while you search, so you're not forced into debt or a desperate decision. Building it during good times, when income is steady, is exactly why 'save when things are fine' matters - the fund is there precisely for the moment things aren't.",
          "Reducing risk before trouble hits also helps. Avoiding heavy debt means lower required payments if your income drops - someone with big car and credit-card payments is far more fragile in a layoff than someone who kept borrowing modest. Living below your means builds a cushion and habits that survive lean times. Diversifying your income - a side gig alongside a main job - means one setback doesn't wipe out everything. These aren't glamorous, but they're what separate people who weather a recession from those crushed by it.",
          "Your career choices and skills are recession protection too. Staying valuable and hard to replace makes you less likely to be the one laid off, and in-demand, essential skills find work even in downturns. Keep learning and maintain a network, since referrals help most when hiring is slow. And for long-term investors, downturns can even be opportunities: falling stock prices let steady investors buy at a discount, and markets have historically recovered. The mindset shift is treating recessions as a normal risk you prepare for calmly, not a disaster you can only fear. Preparation, not panic, is what separates people who come through a downturn intact."
        ],
        bullets: [
          "An emergency fund of 3-6 months of expenses is your top protection.",
          "Build savings during good times, since that's when income is steady.",
          "Avoiding heavy debt keeps you flexible if your income drops.",
          "Multiple income streams mean one setback won't wipe you out.",
          "Staying skilled and networked keeps you employable in downturns."
        ],
        realWorldExample: "Before a recession, Sam builds a $6,000 emergency fund covering four months of essentials and keeps debt low. When Sam is laid off, that fund covers rent and food during a three-month job search, so Sam avoids credit-card debt and takes time to find a good role - while an unprepared coworker panics and takes the first low offer."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income13-mc1",
            question: "What generally happens to unemployment during a recession?",
            options: [
              "It falls as companies hire more workers for most workers today",
              "It rises as hiring slows and layoffs increase",
              "It stays exactly the same as before",
              "It disappears because everyone works in nearly every case"
            ],
            correctAnswer: 1,
            explanation: "In a recession the economy shrinks, so businesses cut costs and jobs. Unemployment rises, hiring slows, and finding work takes longer than in good times."
          },
          {
            id: "income13-mc2",
            question: "What is the single most important protection against losing income?",
            options: [
              "A brand-new car bought on credit as a general rule",
              "An emergency fund of 3-6 months' expenses",
              "A large amount of credit-card debt",
              "Spending every paycheck immediately for most workers today"
            ],
            correctAnswer: 1,
            explanation: "An emergency fund covering three to six months of essential expenses lets you pay rent and food if income stops, so a layoff doesn't force you into debt or desperation."
          }
        ]
      },
      {
        type: "scenario",
        title: "Elena Prepares for Hard Times",
        narrative: "Elena, 19, hears that economists expect a possible recession. Her job at an events company feels shaky since events are a 'want' people cut when money is tight. Instead of panicking, she uses the warning to strengthen her finances and reduce her risk before anything happens.",
        details: [
          "Elena starts building an emergency fund, aiming for three to six months of her essential expenses.",
          "She avoids taking on a big car loan, keeping her required monthly payments low and flexible.",
          "She picks up a small side gig, so losing her main job wouldn't wipe out all her income.",
          "She keeps learning in-demand skills to stay valuable and harder to lay off at her company."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income13-aq1",
          question: "Why is Elena's emergency fund her most powerful protection?",
          options: [
              "It guarantees she can never be laid off",
              "It covers expenses if her income stops",
              "It doubles her salary during recessions",
              "It forces her employer to keep her hired"
            ],
            correctAnswer: 1,
          explanation: "An emergency fund covers essential costs like rent and food if Elena loses her income, so a layoff won't push her into debt or a desperate choice - even if it can't prevent the layoff."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A recession is when the economy shrinks, raising unemployment.",
          "'Wants' jobs are hit before 'needs,' and newer workers are laid off first.",
          "Recessions are normal, recurring, and always eventually end.",
          "An emergency fund of 3-6 months of expenses is your top protection.",
          "Low debt, multiple income streams, and in-demand skills add resilience."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income13-mastery1",
            question: "Which type of job tends to be hit first in a recession?",
            options: [
              "Grocery stores selling everyday food",
              "Luxury travel and entertainment work",
              "Pharmacies filling needed medicine under normal conditions",
              "Utilities providing electricity to homes"
            ],
            correctAnswer: 1,
            explanation: "Jobs tied to 'wants' like luxury goods, travel, and entertainment suffer first, because people cut those purchases when money is tight. 'Needs' like food and medicine stay steadier."
          },
          {
            id: "income13-mastery2",
            question: "Why should you build an emergency fund during good times?",
            options: [
              "Because savings are illegal in a recession",
              "Because that's when income is steady to save",
              "Because banks only accept deposits then in real practice",
              "Because funds shrink automatically in booms across the board"
            ],
            correctAnswer: 1,
            explanation: "Good times, when income is steady, are exactly when you can build savings. The fund is then ready for the moment income stops, which is the whole point."
          },
          {
            id: "income13-mastery3",
            question: "How does keeping debt low help during a downturn?",
            options: [
              "It raises your salary automatically across the board",
              "It lowers required payments if income drops",
              "It prevents recessions from happening in nearly every case",
              "It forces employers to give you raises"
            ],
            correctAnswer: 1,
            explanation: "Lower debt means smaller required monthly payments, so a drop in income is far easier to survive. Heavy debt makes you fragile in a layoff."
          },
          {
            id: "income13-mastery4",
            question: "Why are newer workers often laid off first in a recession?",
            options: [
              "They always cost the company the most",
              "Companies often follow 'last in, first out'",
              "New workers are legally required to leave",
              "They never do any useful work at all"
            ],
            correctAnswer: 1,
            explanation: "Businesses frequently lay off less-experienced, newer staff before senior workers - the 'last in, first out' pattern - which is why job tenure affects security."
          },
          {
            id: "income13-mastery5",
            question: "How can a recession be an opportunity for a long-term investor?",
            options: [
              "Stocks are banned from ever recovering as a general rule",
              "Falling prices let them buy at a discount",
              "Investing becomes impossible in downturns for most workers today",
              "Prices only ever rise during recessions"
            ],
            correctAnswer: 1,
            explanation: "Falling stock prices let steady long-term investors buy at a discount, and markets have historically recovered over time - so downturns can be buying opportunities."
          },
          {
            id: "income13-mastery6",
            question: "What is the healthiest mindset about recessions?",
            options: [
              "They never happen to prepared people as a general rule",
              "They are a normal risk to prepare for calmly",
              "They are a disaster you can only fear",
              "They last forever once they begin under normal conditions"
            ],
            correctAnswer: 1,
            explanation: "Recessions are normal, recurring events that always eventually end. Treating them as a predictable risk to prepare for - not a disaster to fear - lets you plan instead of panic."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-14: Social Security: The Basics
  // ─────────────────────────────────────────────
  {
    lessonId: "income-14",
    sections: [
      {
        type: "concept",
        title: "What Social Security Is and How It's Funded",
        paragraphs: [
          "Social Security is a U.S. government program that provides income to people who are retired, disabled, or the survivors of workers who died. It's funded by a payroll tax you'll see on every paycheck: the FICA line. Workers pay 6.2% of wages for Social Security, and employers match another 6.2%, so 12.4% total goes toward it (self-employed people pay the full 12.4% themselves). This isn't optional - almost every worker contributes automatically. When you spot 'FICA' or 'OASDI' on a pay stub, that's the money funding Social Security.",
          "A key point many people misunderstand: Social Security is 'pay-as-you-go,' not a personal savings account. The taxes today's workers pay are used to fund today's retirees' benefits, not stored in an account with your name on it. When you retire, the workers of that future will fund your benefits. This is why the ratio of workers to retirees matters for the program's health - fewer workers per retiree strains the system. It's a social insurance program built on the idea that each generation supports the one before it.",
          "You earn access to benefits by working and paying in over time. The system uses 'credits': you earn up to four credits a year based on your earnings, and you generally need 40 credits (about 10 years of work) to qualify for retirement benefits. Your future benefit is based on your highest-earning years of work, so higher lifetime earnings generally mean a larger benefit, up to a cap. Even as a teen, the moment you start working and paying FICA, you begin building toward this future safety net."
        ],
        bullets: [
          "Social Security pays income to retired, disabled, and survivor beneficiaries.",
          "It's funded by FICA payroll tax: 6.2% from you, matched by your employer.",
          "Self-employed workers pay the full 12.4% themselves.",
          "It's pay-as-you-go: today's workers fund today's retirees, not personal accounts.",
          "You need about 40 credits (~10 years of work) to qualify for retirement benefits."
        ],
        realWorldExample: "On Priya's first paycheck of $500, she sees $31 taken out for Social Security (6.2%). Her employer quietly pays another $31 on her behalf, so $62 total goes toward the program. That money helps fund current retirees today, and Priya begins earning credits toward her own future benefits by working and paying in."
      },
      {
        type: "concept",
        title: "What Social Security Pays and Why It Isn't Enough Alone",
        paragraphs: [
          "Social Security retirement benefits depend on your lifetime earnings and the age you start claiming. You can begin as early as 62, but you'll get a permanently smaller monthly check; wait until your 'full retirement age' (67 for younger workers) and you get your full benefit; wait even longer, up to 70, and your monthly benefit grows further. This is a real trade-off: claim early for more years of smaller checks, or wait for fewer years of bigger ones. The program also pays disability benefits and survivor benefits to a worker's family.",
          "A crucial reality check: Social Security was designed to replace only part of your income - often around 40% for an average earner - not all of it. Living on Social Security alone usually means a very tight budget. It's meant to be a foundation or safety net, not a full retirement plan. This is exactly why financial experts stress saving on your own through accounts like a 401(k) or IRA. Relying only on Social Security is a common mistake that leaves people struggling in retirement.",
          "For today's teens, two takeaways matter most. First, Social Security is a valuable safety net you're already building toward, and understanding your pay stub demystifies where that FICA money goes. Second, because it replaces only part of your income and its future funding faces pressures, you should treat it as one piece of retirement, not the whole plan. Starting your own retirement savings young - even small amounts - lets compounding do the heavy lifting, so you're not depending on Social Security to fully support you decades from now. Think of it as a base layer of protection that you build your own savings on top of, rather than the entire structure you plan to stand on."
        ],
        bullets: [
          "Benefits depend on lifetime earnings and the age you start claiming.",
          "Claiming at 62 means smaller checks; waiting to 67 or 70 means larger ones.",
          "It also provides disability benefits and survivor benefits to families.",
          "It's designed to replace only part of income (~40% for average earners).",
          "Treat it as a foundation and save on your own through a 401(k) or IRA."
        ],
        realWorldExample: "At retirement, Marcus's Social Security replaces about 40% of his old paycheck - enough for basics but not his full lifestyle. Because he also saved in a 401(k) since his twenties, that account covers the rest comfortably. His neighbor who saved nothing must live on Social Security alone and struggles to cover more than essentials."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income14-mc1",
            question: "How is Social Security funded?",
            options: [
              "By voluntary donations from retirees under normal conditions",
              "By FICA payroll taxes on workers and employers",
              "By the sale of government buildings in real practice",
              "By interest from personal savings accounts across the board"
            ],
            correctAnswer: 1,
            explanation: "Social Security is funded by FICA payroll taxes: 6.2% from the worker and a matching 6.2% from the employer, totaling 12.4% of wages. Self-employed people pay the full amount."
          },
          {
            id: "income14-mc2",
            question: "Why is Social Security not meant to be your whole retirement plan?",
            options: [
              "It only pays people who never worked",
              "It replaces only part of your income",
              "It pays far more than any salary ever",
              "It is illegal to receive after age 62"
            ],
            correctAnswer: 1,
            explanation: "Social Security is designed to replace only part of your income - often around 40% for an average earner - so it's a foundation, not a full plan. You should also save on your own."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tariq Reads His Pay Stub",
        narrative: "Tariq, 18, notices a line labeled 'FICA' taking money out of his first paycheck and wonders where it goes. His older sister explains it's mostly Social Security, and that it's both a tax he pays now and a future benefit he's slowly earning. She encourages him to also start his own savings.",
        details: [
          "Tariq sees 6.2% of his wages go to Social Security, with his employer matching that amount.",
          "The money funds today's retirees; Tariq is earning credits toward his own future benefits.",
          "He learns he needs about 40 credits, roughly ten years of work, to qualify for retirement benefits.",
          "His sister warns that Social Security replaces only part of income, so he should also save separately."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income14-aq1",
          question: "What is the best conclusion for Tariq about Social Security?",
          options: [
              "It will fully fund his entire retirement",
              "It's a foundation, so he should also save",
              "He should stop working to avoid the tax",
              "It pays him money starting immediately across the board"
            ],
            correctAnswer: 1,
          explanation: "Social Security replaces only part of income and is a safety-net foundation, not a full plan. Tariq should treat it as one piece and start his own retirement savings young."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Social Security provides income to retired, disabled, and survivor beneficiaries.",
          "It's funded by FICA: 6.2% from you plus a matching 6.2% from your employer.",
          "It's pay-as-you-go: today's workers fund today's retirees.",
          "You need about 40 credits, roughly ten years of work, to qualify.",
          "It replaces only part of income, so save on your own through a 401(k) or IRA."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income14-mastery1",
            question: "On a paycheck, the money funding Social Security appears as…",
            options: [
              "A voluntary tip line you can skip",
              "The FICA payroll tax deduction",
              "A state sales tax on your wages",
              "A refundable bonus added to pay"
            ],
            correctAnswer: 1,
            explanation: "Social Security is funded through the FICA payroll tax on your stub - 6.2% from you plus a matching amount from your employer. It's automatic, not voluntary."
          },
          {
            id: "income14-mastery2",
            question: "What does 'pay-as-you-go' mean for Social Security?",
            options: [
              "Your taxes sit in a personal account",
              "Today's workers fund today's retirees",
              "You pay only after you retire",
              "Benefits are paid before you work"
            ],
            correctAnswer: 1,
            explanation: "Social Security uses today's workers' taxes to fund today's retirees' benefits, rather than storing money in a personal account with your name on it."
          },
          {
            id: "income14-mastery3",
            question: "Roughly how much work is needed to qualify for retirement benefits?",
            options: [
              "About 40 credits, near ten years of work",
              "Just a single year of any work",
              "Exactly thirty years, no exceptions as a general rule",
              "No work is required to qualify at all"
            ],
            correctAnswer: 0,
            explanation: "You generally need 40 credits, earned at up to four per year, which works out to about ten years of covered work to qualify for retirement benefits."
          },
          {
            id: "income14-mastery4",
            question: "What happens if you claim Social Security at 62 instead of 67?",
            options: [
              "You get a permanently smaller monthly check",
              "You receive double the monthly benefit",
              "You lose all benefits permanently under normal conditions",
              "Nothing changes about your benefit in real practice"
            ],
            correctAnswer: 0,
            explanation: "Claiming early at 62 gives you more years of payments but a permanently smaller monthly check. Waiting until full retirement age or 70 increases the monthly amount."
          },
          {
            id: "income14-mastery5",
            question: "Besides retirement, Social Security also provides…",
            options: [
              "Free college tuition for all workers",
              "Disability and survivor benefits",
              "A guaranteed high-paying job",
              "Interest-free loans to everyone"
            ],
            correctAnswer: 1,
            explanation: "Social Security also pays disability benefits to workers who can't work and survivor benefits to the families of workers who die - it's broad social insurance."
          },
          {
            id: "income14-mastery6",
            question: "Because Social Security replaces only part of income, teens should…",
            options: [
              "Rely on it as their entire retirement plan",
              "Also save on their own, starting young",
              "Refuse to pay any FICA taxes now",
              "Assume it will pay their full salary"
            ],
            correctAnswer: 1,
            explanation: "Since it's designed as a partial foundation, not a full plan, saving on your own through accounts like a 401(k) or IRA - starting young - lets compounding build the rest."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // income-15: Local Taxes: Property, Sales & Municipal
  // ─────────────────────────────────────────────
  {
    lessonId: "income-15",
    sections: [
      {
        type: "concept",
        title: "The Local Taxes You Pay Every Day",
        paragraphs: [
          "Beyond federal and state income taxes, local governments - cities, counties, and towns - raise money through their own taxes to pay for services you use daily. The two you'll meet most are sales tax and property tax. Sales tax is added at checkout: buy a $20 shirt where sales tax is 8%, and you actually pay $21.60. Rates vary widely by location, from 0% in a few states to over 9% in some cities, which is why the same item can cost more just by crossing a city or state line. It's a small percentage that quietly adds up across everything you buy.",
          "Property tax is charged to people who own real estate - land and buildings - based on the property's assessed value. If a home is assessed at $250,000 and the local property tax rate is 1.5%, the owner owes $3,750 a year. This is a major cost of owning a home that renters don't pay directly, though landlords build it into rent. Property taxes are the biggest funding source for local public schools in many areas, which is why school quality and home values are often linked. Even if you don't own property yet, you'll eventually pay this - directly or through rent.",
          "These local taxes fund the services closest to your daily life: public schools, local roads, police and fire departments, parks, libraries, and trash collection. That's the deal behind them - residents pool money to pay for shared local services. Because local governments set their own rates, two neighboring towns can tax quite differently, offering different levels of service. Understanding local taxes helps you see the true cost of living somewhere and why a 'cheaper' house in a high-tax area might not be cheaper overall once yearly property taxes are counted."
        ],
        bullets: [
          "Local governments levy their own taxes, mainly sales tax and property tax.",
          "Sales tax is added at checkout and varies widely by city and state.",
          "Property tax is charged to real-estate owners based on assessed value.",
          "Property taxes are a top funding source for local public schools.",
          "These taxes pay for schools, roads, police, fire, parks, and libraries."
        ],
        realWorldExample: "Maya buys a $60 pair of shoes in a city with 9% sales tax and pays $65.40 at the register. Her family also owns a home assessed at $200,000 with a 1.2% property tax, owing $2,400 a year. Both taxes fund her local schools, roads, and fire department - services she uses without always realizing she's paying for them."
      },
      {
        type: "concept",
        title: "Why Rates Differ and Why It Matters to You",
        paragraphs: [
          "Local tax rates differ because each community makes its own choices about services and funding. A town that wants excellent schools, well-kept parks, and quick emergency response needs more revenue, so it may set higher property or sales taxes. A town that offers fewer services can charge less. Some states have no income tax but higher sales or property taxes to make up for it - the money has to come from somewhere. This is why comparing just one tax is misleading; you have to look at the total tax picture of a place, not a single rate.",
          "These differences directly affect your cost of living and big decisions later. Two similar houses in different towns can have very different property-tax bills - one owner might pay $3,000 a year and another $7,000 for a comparable home - which changes what you can truly afford. High sales tax makes everyday purchases pricier, while high property tax raises the ongoing cost of owning. When people choose where to live, work, or open a business, these local taxes are a real factor, sometimes prompting moves to lower-tax areas (though services may be leaner there).",
          "The smart takeaway is to factor local taxes into real-life money decisions, not ignore them. When budgeting to buy a home someday, include annual property taxes as an ongoing cost like the mortgage itself. When comparing places to live, weigh the full tax burden against the services you'd get. And remember the trade-off: lower taxes can mean weaker schools, rougher roads, or slower emergency services, while higher taxes can buy better ones. Understanding this connection between what you pay locally and what you receive makes you a sharper decision-maker about where and how you live."
        ],
        bullets: [
          "Rates differ because communities choose different service and funding levels.",
          "Some states swap income tax for higher sales or property taxes.",
          "Comparable homes in different towns can have very different tax bills.",
          "High local taxes raise your cost of living and cost of owning a home.",
          "Lower taxes often mean fewer services - it's a real trade-off."
        ],
        realWorldExample: "Diego compares two towns for a future home. Town A has a 0.8% property tax but average schools; Town B has a 2.1% rate but top schools and fast emergency response. On a $300,000 home, that's $2,400 versus $6,300 a year. Diego weighs the $3,900 yearly difference against the services each town actually provides."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income15-mc1",
            question: "Property tax is charged based on what?",
            options: [
              "The number of people in a household",
              "The assessed value of owned real estate",
              "How much a person earns each year",
              "The price of items bought at checkout"
            ],
            correctAnswer: 1,
            explanation: "Property tax is charged to real-estate owners based on the assessed value of their land and buildings. It's separate from income tax and sales tax at checkout."
          },
          {
            id: "income15-mc2",
            question: "Why do local tax rates differ from one town to the next?",
            options: [
              "The federal government randomly assigns them for most workers today",
              "Communities choose different service and funding levels",
              "Rates are identical everywhere by law",
              "Only the richest towns are allowed to tax"
            ],
            correctAnswer: 1,
            explanation: "Local governments set their own rates based on the services they provide. A town wanting better schools and services needs more revenue, so it may tax more than a leaner one."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia Compares Two Neighborhoods",
        narrative: "Sofia, 19, is helping her family think about buying a home and notices the two towns they like have very different tax bills. One has cheaper homes but higher property taxes; the other is pricier but taxes less. She wants to understand the full cost, not just the sticker price of each house.",
        details: [
          "Town A's homes are cheaper, but its property tax rate is 2%, so a $250,000 home owes $5,000 a year.",
          "Town B's homes cost more, but its rate is 1%, so a $250,000 home owes only $2,500 a year.",
          "Town A's higher taxes fund stronger local schools and faster emergency services.",
          "Sofia realizes the 'cheaper' house isn't cheaper overall once yearly property taxes are counted."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income15-aq1",
          question: "What key insight should Sofia take from comparing the two towns?",
          options: [
              "Sticker price alone shows the true cost",
              "Yearly property taxes change the real cost",
              "Sales tax is the only tax that matters",
              "Higher home prices always mean lower taxes"
            ],
            correctAnswer: 1,
          explanation: "A cheaper home in a high-property-tax town can cost more overall once yearly taxes are counted. Sofia must weigh the full tax picture, not just the sticker price."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Local governments raise money mainly through sales tax and property tax.",
          "Sales tax is added at checkout and varies widely by location.",
          "Property tax is based on real-estate value and funds local schools heavily.",
          "Rates differ because communities choose different services and funding.",
          "Factor local taxes into where you live and the true cost of owning a home."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "income15-mastery1",
            question: "A $50 item in a city with 8% sales tax costs how much at checkout?",
            options: [
              "$54, adding 8% to the price",
              "$58, doubling the sales tax rate",
              "$50, since sales tax is refunded",
              "$46, subtracting the tax instead by that logic"
            ],
            correctAnswer: 0,
            explanation: "8% of $50 is $4, so the total is $54. Sales tax is added to the price at the register, not subtracted or refunded."
          },
          {
            id: "income15-mastery2",
            question: "A home assessed at $300,000 with a 1.5% property tax owes how much yearly?",
            options: [
              "$450, a tenth of the true amount",
              "$4,500, which is 1.5% of the value",
              "$45,000, most of the home's value as it turns out",
              "$300, a flat fee for all homes"
            ],
            correctAnswer: 1,
            explanation: "1.5% of $300,000 is $4,500 per year. Property tax is a percentage of assessed value, not a flat fee."
          },
          {
            id: "income15-mastery3",
            question: "Property taxes are especially important because they heavily fund…",
            options: [
              "The national military budget",
              "Local public schools",
              "Federal Social Security benefits",
              "Private company profits"
            ],
            correctAnswer: 1,
            explanation: "Property taxes are a top funding source for local public schools, which is why school quality and home values are often linked in a community."
          },
          {
            id: "income15-mastery4",
            question: "Why might a state with no income tax still collect plenty of revenue?",
            options: [
              "It secretly prints extra money each year",
              "It relies more on sales or property taxes",
              "It never provides any public services in nearly every case",
              "It borrows the money from other states"
            ],
            correctAnswer: 1,
            explanation: "The money has to come from somewhere, so states without income tax often have higher sales or property taxes to fund their services."
          },
          {
            id: "income15-mastery5",
            question: "When budgeting to buy a home, property taxes should be treated as…",
            options: [
              "A one-time fee paid only at purchase",
              "An ongoing yearly cost like the mortgage",
              "An optional payment you can skip for most workers today",
              "A refund you receive every year"
            ],
            correctAnswer: 1,
            explanation: "Property taxes recur every year for as long as you own, so they belong in your budget as an ongoing cost alongside the mortgage, not a one-time fee."
          },
          {
            id: "income15-mastery6",
            question: "What is the main trade-off of choosing a town with lower local taxes?",
            options: [
              "It always has the very best services",
              "Services like schools may be weaker",
              "It is illegal to live there long-term",
              "Home values there always rise fastest"
            ],
            correctAnswer: 1,
            explanation: "Lower taxes often mean fewer or leaner services, like weaker schools or slower emergency response. Higher taxes can buy better ones - a real trade-off to weigh."
          }
        ]
      }
    ]
  }
]
