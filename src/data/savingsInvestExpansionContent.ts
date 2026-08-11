import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// UNIT 4 (BANKING) + UNIT 6 (INVESTING) EXPANSION
// Florida SS.912.FL.4.x and FL.6.x
// banking-9, banking-10, invest-11, invest-12
// ═══════════════════════════════════════════════

export const savingsInvestExpansionContent: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // banking-9: IRAs, Roth IRAs & 529 Plans (FL.4.9)
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-9",
    sections: [
      {
        type: "concept",
        title: "Accounts the Government Pays You to Use",
        paragraphs: [
          "Tax-advantaged accounts are special accounts the government created to encourage saving by giving you a tax break. The two main retirement versions are the Traditional IRA and the Roth IRA. With a Traditional IRA, you contribute pre-tax dollars (lowering your taxes now) but pay taxes when you withdraw in retirement. With a Roth IRA, you contribute after-tax dollars now, and then ALL the growth and withdrawals in retirement are completely tax-free.",
          "For teens and young workers, the Roth IRA is usually the winner. Why? You're in a low tax bracket now, so paying tax on contributions costs little - and in exchange, decades of growth come out tax-free later. The 2024 contribution limit is $7,000 per year (as long as you have earned income). There's also the 529 plan, designed for education: the money grows tax-free and withdrawals are tax-free when used for qualified education expenses.",
          "The real magic is compound growth over time. If you invest $2,000 a year in a Roth IRA from age 18 to 65 at an 8% average return, you could end up with roughly $1,000,000 - and because it's a Roth, you wouldn't owe taxes on that million when you withdraw it. Starting young is the single biggest advantage you have, because time does most of the work."
        ],
        bullets: [
          "Tax-advantaged accounts give you tax breaks to reward saving.",
          "Traditional IRA: pre-tax contributions now, taxed on withdrawal in retirement.",
          "Roth IRA: after-tax contributions now, tax-free growth and withdrawals later.",
          "Roth is usually best for young, low-income savers (low tax now, tax-free later).",
          "The 2024 IRA contribution limit is $7,000/year; 529 plans cover education tax-free."
        ],
        realWorldExample: "A teen who puts summer-job earnings into a Roth IRA gets decades of tax-free compounding. Because they're taxed at a low rate now, paying tax upfront is cheap - and the eventual tax-free withdrawal can be worth a fortune."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking9-mc1",
            question: "What is the key tax difference between a Roth IRA and a Traditional IRA?",
            options: [
              "Roth contributions are after-tax with tax-free withdrawals; Traditional contributions are pre-tax and taxed on withdrawal",
              "They are taxed identically",
              "Roth IRAs are never taxed at all, including contributions",
              "Traditional IRAs are completely tax-free"
            ],
            correctAnswer: 0,
            explanation: "With a Roth you pay tax now and withdraw tax-free later; with a Traditional you skip tax now but pay it on withdrawals in retirement."
          },
          {
            id: "banking9-mc2",
            question: "Why is a Roth IRA usually better for a teenager with a part-time job?",
            options: [
              "Because teens pay the highest tax rates",
              "Because they're in a low tax bracket now",
              "Because Roth IRAs require no contributions",
              "Because teens can't use Traditional IRAs"
            ],
            correctAnswer: 1,
            explanation: "Young, low-income earners pay little tax now, so paying upfront on Roth contributions is cheap - and they lock in decades of tax-free growth."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Summer Paychecks, Two Futures",
        narrative: "Two 18-year-olds each earn $15,000 from summer jobs. Aria opens a Roth IRA and contributes $3,000, investing it for the long term. Bryce spends his entire $15,000. Decades later, at age 65, they compare what those choices became.",
        details: [
          "Aria's $3,000 grows for decades inside a tax-free Roth IRA.",
          "At an average 8% return, that single contribution could grow many times over by age 65.",
          "Because it's a Roth, Aria pays no taxes on the withdrawals in retirement.",
          "Bryce spent his money and has nothing from that summer to show decades later."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking9-aq1",
          question: "Why will Aria's Roth IRA contribution be especially powerful by age 65?",
          options: [
            "Because she'll pay high taxes on it later",
            "Because decades of compound growth happen tax-free inside the Roth",
            "Because the government doubles every contribution",
            "Because Roth IRAs guarantee a fixed $1 million"
          ],
          correctAnswer: 1,
          explanation: "Starting young gives compound growth decades to work, and the Roth structure means all that growth comes out tax-free in retirement."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Tax-advantaged accounts reward saving with tax breaks.",
          "Traditional IRA = pre-tax now, taxed later; Roth IRA = taxed now, tax-free later.",
          "Roth is usually best for young, low-income savers.",
          "The 2024 IRA contribution limit is $7,000/year.",
          "529 plans grow tax-free for qualified education expenses; starting young maximizes compounding."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "banking9-mastery1",
            question: "How are Roth IRA withdrawals in retirement taxed?",
            options: [
              "They are completely tax-free",
              "They are taxed at the highest rate",
              "They are taxed twice",
              "They are taxed only above $1 million"
            ],
            correctAnswer: 0,
            explanation: "Because you already paid tax on Roth contributions, qualified withdrawals in retirement - including all the growth - are tax-free."
          },
          {
            id: "banking9-mastery2",
            question: "Why is a Roth IRA generally better for young or low-income people?",
            options: [
              "They pay tax at a low rate now and get tax-free growth later",
              "Roth IRAs have no contribution limits",
              "Young people can't open Traditional IRAs",
              "Roth IRAs are insured against losses"
            ],
            correctAnswer: 0,
            explanation: "Low earners pay little tax now, so paying upfront on Roth contributions is cheap, and they lock in decades of tax-free growth."
          },
          {
            id: "banking9-mastery3",
            question: "What does a 529 plan cover tax-free?",
            options: [
              "Any purchase at all",
              "Qualified education expenses",
              "Car payments",
              "Vacations"
            ],
            correctAnswer: 1,
            explanation: "A 529 plan grows tax-free and allows tax-free withdrawals when used for qualified education expenses."
          },
          {
            id: "banking9-mastery4",
            question: "What is the 2024 annual IRA contribution limit?",
            options: [
              "$1,000",
              "$7,000",
              "$25,000",
              "Unlimited"
            ],
            correctAnswer: 1,
            explanation: "The 2024 IRA contribution limit is $7,000 per year (provided you have earned income)."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // banking-10: Your Employer's 401k & Benefits (FL.4.10)
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-10",
    sections: [
      {
        type: "concept",
        title: "The Free Money Most People Leave on the Table",
        paragraphs: [
          "A 401(k) is a retirement plan offered by your employer. You contribute money straight from your paycheck (pre-tax), and it's invested, usually in mutual funds, to grow for retirement. The single most important feature is the employer match - when your company adds money to your account based on what you contribute. A very common match is '50% of your contributions up to 6% of your salary.'",
          "Here's why the match is a big deal: it's literally free money. If you earn $50,000 and contribute 6% ($3,000), a 50%-up-to-6% match means your employer adds $1,500 on top. If you contribute nothing, you get nothing. Not contributing enough to capture the full match is like turning down a guaranteed raise. There's also a vesting schedule to know about: you may have to stay with the company for a few years before the employer's contributions are fully yours to keep.",
          "Behavior matters too. Companies that automatically enroll employees in their 401(k) see roughly three times higher participation, because most people never change the default - inertia keeps them saving. You can use that same psychology on yourself: enroll, contribute at least enough to get the full match, and let automatic payroll deductions and compound growth do the heavy lifting over decades."
        ],
        bullets: [
          "A 401(k) is an employer-sponsored retirement plan funded from your paycheck.",
          "Employer match = free money added based on what you contribute.",
          "A common match is 50% of contributions up to 6% of salary.",
          "Not contributing enough to get the full match leaves free money behind.",
          "Vesting schedules may require you to stay a few years to keep employer contributions."
        ],
        realWorldExample: "If your employer offers a match and you don't contribute enough to get it, you're declining part of your total pay. Few people would refuse a raise - but skipping the 401(k) match does exactly that."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking10-mc1",
            question: "What is an employer 401(k) match?",
            options: [
              "A fee the employer charges you",
              "Money your employer adds to your 401(k) based on your own contributions",
              "A loan you must repay",
              "A tax on your paycheck"
            ],
            correctAnswer: 1,
            explanation: "An employer match is extra money your company contributes to your retirement account based on how much you contribute - essentially free money."
          },
          {
            id: "banking10-mc2",
            question: "What happens if you contribute nothing to a 401(k) that offers a match?",
            options: [
              "You still get the full match",
              "You get $0 in matching funds - leaving free money behind",
              "Your employer doubles your salary",
              "You're automatically enrolled at 10%"
            ],
            correctAnswer: 1,
            explanation: "Matches are based on your contributions. Contribute nothing and you receive no match, forfeiting free money."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus's First Job Benefits",
        narrative: "Marcus starts his first job earning $48,000/year. His employer matches 50% of his contributions up to 6% of his salary. He's deciding how much to contribute and doesn't realize how much is at stake over time.",
        details: [
          "If Marcus contributes 6% ($2,880/year), his employer adds $1,440 in free matching funds.",
          "If Marcus contributes 0%, his employer adds $0.",
          "Over 30 years at a 7% return, that $1,440/year match could compound to roughly $135,000.",
          "By skipping the match, Marcus would be walking away from $135,000 of future wealth."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking10-aq1",
          question: "Why is it a costly mistake for Marcus to skip contributing enough to get the full match?",
          options: [
            "Because contributions are illegal otherwise",
            "Because he forfeits free employer money that could compound to about $135,000 over 30 years",
            "Because his salary would drop",
            "Because the match must be repaid"
          ],
          correctAnswer: 1,
          explanation: "The match is free money. Skipping it means giving up $1,440/year of employer contributions that, compounded over 30 years, could grow to roughly $135,000."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A 401(k) is an employer-sponsored retirement plan funded from your paycheck.",
          "The employer match is free money - always contribute enough to get the full match.",
          "Failing to capture the match leaves significant money (and future growth) behind.",
          "Vesting schedules may require you to stay a few years to keep employer contributions.",
          "Auto-enrollment boosts participation because inertia keeps people saving."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "banking10-mastery1",
            question: "What does an employer 401(k) match mean for you?",
            options: [
              "Your employer adds money to your retirement account based on your contributions - free money",
              "You must match your coworkers' contributions",
              "You pay a penalty for contributing",
              "It's a loan against your salary"
            ],
            correctAnswer: 0,
            explanation: "An employer match is additional money your company contributes based on what you put in - effectively free retirement savings."
          },
          {
            id: "banking10-mastery2",
            question: "Why is not maximizing the match like 'leaving free money behind'?",
            options: [
              "Because contributions are taxed twice",
              "Because you forfeit employer dollars you could have received for free",
              "Because the match lowers your salary",
              "Because it raises your tax bracket"
            ],
            correctAnswer: 1,
            explanation: "If you don't contribute enough to earn the full match, you simply don't receive those free employer dollars - money gone for good."
          },
          {
            id: "banking10-mastery3",
            question: "What is a vesting schedule?",
            options: [
              "The time you may need to stay with an employer before their contributions are fully yours",
              "The schedule of your paychecks",
              "A list of investment options",
              "A penalty for early withdrawal"
            ],
            correctAnswer: 0,
            explanation: "A vesting schedule sets how long you must stay before the employer's matching contributions become fully yours to keep."
          },
          {
            id: "banking10-mastery4",
            question: "Why does automatic enrollment increase retirement savings?",
            options: [
              "Because it forces people to contribute 50% of pay",
              "Because most people stick with the default",
              "Because it's required by law for everyone",
              "Because it pays a guaranteed bonus"
            ],
            correctAnswer: 1,
            explanation: "Auto-enrollment makes saving the default, and since most people don't change defaults, far more end up participating."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // invest-11: Why Markets Need Regulators (FL.6.11, FL.6.12)
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-11",
    sections: [
      {
        type: "concept",
        title: "The Referees That Keep Markets Fair",
        paragraphs: [
          "Without rules, financial markets break down. The core problem is information asymmetry - a company knows far more about itself than an outside investor does. That gap invites fraud, manipulation, and insider trading. Regulators exist to level the playing field so ordinary people can invest with some confidence that they're not being cheated.",
          "Several agencies share the job. The SEC (Securities and Exchange Commission) requires public companies to disclose their finances through reports like the 10-K (annual) and 10-Q (quarterly), investigates fraud, and oversees brokers. The Federal Reserve (the Fed) sets interest rates, controls the money supply, and acts as the 'lender of last resort' to banks in a crisis. FINRA regulates broker-dealers. And SIPC protects your brokerage account (up to $500,000) if your brokerage firm goes bankrupt.",
          "History shows why these protections matter. The 1929 crash, the Enron scandal, and the 2008 financial crisis all revealed what happens when oversight is weak: investors lose everything while insiders walk away. After Enron, Congress passed the Sarbanes-Oxley Act to tighten corporate financial reporting and accountability. Regulation isn't red tape for its own sake - it's the foundation that makes investing safe enough for regular people to participate."
        ],
        bullets: [
          "Markets fail without rules due to information asymmetry, fraud, and manipulation.",
          "The SEC requires disclosure (10-K, 10-Q), investigates fraud, and oversees brokers.",
          "The Federal Reserve sets interest rates and is the banks' lender of last resort.",
          "FINRA regulates broker-dealers; SIPC protects brokerage accounts up to $500,000.",
          "Sarbanes-Oxley tightened corporate reporting after the Enron scandal."
        ],
        realWorldExample: "When you open a brokerage app and can read a company's audited financials before buying its stock, that's the SEC's disclosure rules at work - protecting you from investing blind in a company that's secretly failing."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest11-mc1",
            question: "What is the SEC's primary role?",
            options: [
              "Setting interest rates",
              "Requiring company disclosure, investigating fraud",
              "Printing money",
              "Insuring bank deposits"
            ],
            correctAnswer: 1,
            explanation: "The SEC protects investors by requiring public companies to disclose financials, investigating fraud, and regulating brokers and markets."
          },
          {
            id: "invest11-mc2",
            question: "What does the Federal Reserve control?",
            options: [
              "Company earnings reports",
              "Interest rates and the money supply",
              "Stock prices directly",
              "Brokerage account insurance"
            ],
            correctAnswer: 1,
            explanation: "The Federal Reserve sets interest rates, manages the money supply, and serves as the lender of last resort to banks."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Enron Collapse",
        narrative: "At Enron, employees held much of their retirement savings in company stock. Executives knew the company was failing but hid it from the public and their own workers. When the truth came out, the stock collapsed and employees lost their savings - while the lack of honest disclosure was at the heart of the disaster.",
        details: [
          "Employees' retirement savings were concentrated in Enron stock.",
          "Executives concealed the company's true, failing financial condition.",
          "When the fraud was exposed, the stock crashed and employees lost everything.",
          "In response, Congress passed the Sarbanes-Oxley Act to require stronger financial disclosure and accountability."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest11-aq1",
          question: "What did the Sarbanes-Oxley Act require after the Enron scandal?",
          options: [
            "That companies stop selling stock",
            "Stronger, more accurate corporate financial reporting and accountability",
            "That employees never own company stock",
            "That the Federal Reserve set stock prices"
          ],
          correctAnswer: 1,
          explanation: "Sarbanes-Oxley tightened corporate financial reporting and accountability so executives can't hide a company's true condition from investors and employees."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Regulation exists because information asymmetry and fraud break unregulated markets.",
          "The SEC enforces disclosure, fights fraud, and oversees brokers.",
          "The Federal Reserve controls interest rates and the money supply.",
          "SIPC protects brokerage accounts up to $500,000 if the firm fails.",
          "Sarbanes-Oxley strengthened corporate reporting after Enron."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invest11-mastery1",
            question: "What is the SEC's main job?",
            options: [
              "Protecting investors through disclosure rules, fraud investigation",
              "Setting the federal interest rate",
              "Printing currency",
              "Running the stock exchanges directly"
            ],
            correctAnswer: 0,
            explanation: "The SEC safeguards investors by enforcing disclosure, investigating fraud, and overseeing brokers and markets."
          },
          {
            id: "invest11-mastery2",
            question: "When the Federal Reserve lowers interest rates, it is usually trying to…",
            options: [
              "Encourage borrowing and spending to support a slowing economy",
              "Guarantee that stock prices will rise",
              "Insure the cash held in brokerage accounts",
              "Set the maximum profit companies are allowed to earn"
            ],
            correctAnswer: 0,
            explanation: "Cheaper borrowing encourages spending and investment, so the Fed cuts rates to support a slow economy and raises them to cool inflation. It doesn't control stock prices, insure brokerages, or cap company profits."
          },
          {
            id: "invest11-mastery3",
            question: "How much does SIPC protect in a brokerage account if the firm goes bankrupt?",
            options: [
              "$1,000",
              "Up to $500,000",
              "Unlimited",
              "Nothing"
            ],
            correctAnswer: 1,
            explanation: "SIPC protects brokerage customers up to $500,000 if the brokerage firm fails."
          },
          {
            id: "invest11-mastery4",
            question: "What did Sarbanes-Oxley require after Enron?",
            options: [
              "Stronger corporate financial reporting and accountability",
              "An end to all stock trading",
              "Lower interest rates",
              "Free brokerage accounts"
            ],
            correctAnswer: 0,
            explanation: "Sarbanes-Oxley was passed to require more accurate corporate reporting and hold executives accountable for it."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // invest-12: Retirement & Education Accounts Deep Dive (FL.6.13)
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-12",
    sections: [
      {
        type: "concept",
        title: "Your Complete Map of Retirement & Education Accounts",
        paragraphs: [
          "There's a whole landscape of accounts designed to help you save, each with its own rules. The 401(k) is an employer-sponsored plan with pre-tax contributions and a $23,000/year limit (2024). The 403(b) works almost identically but is offered to employees of schools, nonprofits, and hospitals - which means many InvestiPlay students who become teachers or healthcare workers will encounter a 403(b) instead of a 401(k). On the individual side, the Traditional IRA ($7,000/year limit) and Roth IRA (post-tax contributions, tax-free growth) let you save on your own.",
          "Other accounts serve specific needs. A pension (a 'defined benefit' plan) is where an employer pays you a fixed monthly amount in retirement - once common, now increasingly rare. For education, the 529 plan grows tax-free for qualified education expenses, and unused funds can now be rolled into a Roth IRA (up to $35,000) under newer rules. The Coverdell ESA is another education account with a $2,000/year limit that's more flexible than a 529 for some K-12 expenses.",
          "With so many options, use a simple decision tree to prioritize. First, contribute enough to your 401(k)/403(b) to get the full employer match (free money). Next, fund a Roth IRA for tax-free growth. Then go back and contribute more to your 401(k)/403(b) up to its limits. Finally, use a regular taxable brokerage account for anything beyond that. Match first, then IRA, then max the workplace plan, then taxable - that order squeezes the most value from the system."
        ],
        bullets: [
          "401(k): employer plan, pre-tax, $23,000/year limit (2024).",
          "403(b): like a 401(k) but for teachers, nonprofits, and hospital workers.",
          "Traditional IRA ($7,000/year) and Roth IRA (post-tax, tax-free growth) are individual accounts.",
          "Pension = employer-paid fixed retirement income (now rare); 529 and Coverdell are for education.",
          "Priority order: match first → Roth IRA → max 401(k)/403(b) → taxable account."
        ],
        realWorldExample: "A new teacher in Florida gets a 403(b) instead of a 401(k) - same idea, different name. If their school district offers a match, grabbing that match first is the highest-value move before funding any other account."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest12-mc1",
            question: "Who typically uses a 403(b) instead of a 401(k)?",
            options: [
              "Only company CEOs",
              "Employees of schools, nonprofits, and hospitals (like teachers and nurses)",
              "Only self-employed people",
              "Nobody - it's an old account that no longer exists"
            ],
            correctAnswer: 1,
            explanation: "A 403(b) works like a 401(k) but is offered to employees of schools, nonprofits, and hospitals - common for teachers and healthcare workers."
          },
          {
            id: "invest12-mc2",
            question: "In the recommended order, which account should you fund FIRST?",
            options: [
              "A taxable brokerage account",
              "Your 401(k)/403(b) up to the full employer match",
              "A Coverdell ESA",
              "A pension"
            ],
            correctAnswer: 1,
            explanation: "Capture the full employer match first - it's free money and the highest-value starting point before other accounts."
          }
        ]
      },
      {
        type: "scenario",
        title: "Teachers and Private-Sector Workers",
        narrative: "Two teachers contribute to 403(b) plans (relevant to many future InvestiPlay students), while two private-sector workers contribute to 401(k) plans. Across 35 years, their account choices, employer matches, and consistency lead to dramatically different retirement outcomes.",
        details: [
          "The teachers use 403(b) plans; the private-sector workers use 401(k) plans - similar structures, different names.",
          "Those who capture their full employer match start with an immediate boost.",
          "Consistent contributions plus compound growth widen the gap over 35 years.",
          "Those who skip the match or contribute inconsistently end up with far less."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest12-aq1",
          question: "Why do the teachers' 403(b) plans work so similarly to the workers' 401(k) plans?",
          options: [
            "They are completely unrelated accounts",
            "Both are employer-sponsored retirement plans with pre-tax contributions; the 403(b) just serves schools/nonprofits/hospitals",
            "403(b) plans can't be invested",
            "401(k) plans are only for teachers"
          ],
          correctAnswer: 1,
          explanation: "A 403(b) and a 401(k) are both employer-sponsored, pre-tax retirement plans that function almost identically - the 403(b) is simply the version offered to schools, nonprofits, and hospitals."
        }
      },
      {
        type: "recap",
        takeaways: [
          "401(k) and 403(b) are employer plans; the 403(b) serves schools, nonprofits, and hospitals.",
          "Traditional and Roth IRAs are individual accounts with a $7,000/year limit (2024).",
          "A pension pays fixed retirement income from an employer but is now rare.",
          "529 and Coverdell ESA are education accounts; 529s can roll up to $35K into a Roth IRA.",
          "Priority order: match → Roth IRA → max workplace plan → taxable account."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invest12-mastery1",
            question: "What is the main difference between a 403(b) and a 401(k)?",
            options: [
              "A 403(b) is for schools, nonprofits",
              "A 403(b) can't grow in value",
              "A 401(k) is only for teachers",
              "They have nothing in common"
            ],
            correctAnswer: 0,
            explanation: "Both are employer-sponsored, pre-tax retirement plans; the 403(b) is offered to schools, nonprofits, and hospitals, while 401(k)s are typical at private companies."
          },
          {
            id: "invest12-mastery2",
            question: "What is the key difference between a pension and a 401(k)?",
            options: [
              "A pension pays a fixed employer-funded benefit in retirement; a 401(k) depends on your contributions and investment growth",
              "They are identical",
              "A 401(k) guarantees a fixed monthly check",
              "A pension is an education account"
            ],
            correctAnswer: 0,
            explanation: "A pension (defined benefit) promises a set retirement income from the employer, while a 401(k) (defined contribution) depends on what you contribute and how investments perform."
          },
          {
            id: "invest12-mastery3",
            question: "What distinguishes a Coverdell ESA from a 529 plan?",
            options: [
              "A Coverdell has a $2,000/year limit and more flexibility for some K-12 expenses; a 529 has higher limits for education",
              "They are the same account",
              "A 529 is only for cars",
              "A Coverdell is a retirement account"
            ],
            correctAnswer: 0,
            explanation: "Both are education accounts, but the Coverdell ESA caps at $2,000/year and can be more flexible for certain K-12 costs, while 529s allow larger contributions."
          },
          {
            id: "invest12-mastery4",
            question: "What is the recommended order to fund accounts?",
            options: [
              "Taxable account first, then everything else",
              "Employer match first → Roth IRA → max 401(k)/403(b) → taxable account",
              "Pension first → Coverdell → match",
              "Roth IRA only, never anything else"
            ],
            correctAnswer: 1,
            explanation: "Grab the free employer match first, then fund a Roth IRA, then max your workplace plan, and finally use a taxable account - maximizing tax advantages and free money."
          }
        ]
      }
    ]
  }
]
