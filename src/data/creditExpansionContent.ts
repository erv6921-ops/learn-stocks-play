import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// UNIT 6 EXPANSION: CREDIT & DEBT (Florida SS.912.FL.5.x)
// credit-11 .. credit-18
// ═══════════════════════════════════════════════

export const creditExpansionContent: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // credit-11: Getting Out of Debt - Counseling & Negotiation (FL.5.9)
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-11",
    sections: [
      {
        type: "concept",
        title: "When Debt Feels Impossible, You Still Have Options",
        paragraphs: [
          "When debt grows faster than you can pay it, it can feel hopeless - but there are real options long before bankruptcy. The first warning signal is your debt-to-income ratio: how much of your monthly income goes toward debt payments. When that climbs too high, it's time to act instead of ignoring the problem.",
          "A powerful first move is credit counseling from a nonprofit agency, especially one that's a member of the NFCC (National Foundation for Credit Counseling). A legitimate counselor reviews your budget for free or cheap and may set up a Debt Management Plan (DMP) - a single monthly payment to the agency, which distributes it to your creditors, often at a lower interest rate they negotiate on your behalf. You can also negotiate directly with creditors yourself, asking about hardship programs or settlement offers.",
          "Beware of predatory 'debt settlement' companies that charge huge fees (sometimes 15-25% of your debt), tell you to stop paying your bills, and can wreck your credit while charging you for the privilege. The difference matters: nonprofit credit counseling helps you repay responsibly; many for-profit debt settlement firms profit off your desperation. Know the difference before you sign anything."
        ],
        bullets: [
          "Debt-to-income ratio is the early warning signal that debt is becoming unmanageable.",
          "Nonprofit credit counseling (look for NFCC members) reviews your budget and can set up a DMP.",
          "A Debt Management Plan combines your debts into one payment, often at a lower negotiated rate.",
          "You can negotiate directly with creditors about hardship or settlement options.",
          "Avoid for-profit debt settlement scams with huge fees that damage your credit."
        ],
        realWorldExample: "Someone with five maxed-out cards at 24% interest can call a nonprofit counselor, get those rates dropped into single digits through a DMP, and make one manageable monthly payment instead of juggling five - without paying a predatory company a quarter of their debt."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit11-mc1",
            question: "What is a Debt Management Plan (DMP)?",
            options: [
              "A loan that pays off all your debt instantly",
              "A plan where you make one monthly payment to an agency that pays your creditors, often at lower rates",
              "A way to legally erase debt without paying",
              "A type of credit card"
            ],
            correctAnswer: 1,
            explanation: "A DMP, usually set up by a nonprofit credit counselor, consolidates your payments into one monthly amount and often secures lower interest rates from creditors."
          },
          {
            id: "credit11-mc2",
            question: "What does NFCC stand for, and why does it matter?",
            options: [
              "National Fund for Credit Cards - it issues cards",
              "National Foundation for Credit Counseling - it signals a reputable nonprofit counselor",
              "New Federal Credit Commission - it's a government bank",
              "It doesn't stand for anything real"
            ],
            correctAnswer: 1,
            explanation: "The NFCC (National Foundation for Credit Counseling) is a network of reputable nonprofit agencies. Choosing an NFCC member helps you avoid predatory for-profit operators."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aaliyah's $12,000 Decision",
        narrative: "Aaliyah, 23, has racked up $12,000 in credit card debt at 24% APR and can barely cover the minimum payments. A flashy 'debt relief' company online promises to make her debt 'disappear' for a fee. Instead, she calls a nonprofit credit counselor recommended by the NFCC.",
        details: [
          "The nonprofit counselor reviews Aaliyah's budget and negotiates her interest rate down from 24% to about 8%.",
          "She's enrolled in a Debt Management Plan with a single payment of about $240/month.",
          "The for-profit company would have charged her roughly 25% of her debt ($3,000) in fees.",
          "The for-profit plan also would have told her to stop paying, damaging her credit during the process."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit11-aq1",
          question: "Why was the nonprofit credit counselor a better choice for Aaliyah than the for-profit debt settlement company?",
          options: [
            "Nonprofits are slower but more famous",
            "The nonprofit lowered her rate and set up a manageable repayment plan without huge fees or wrecking her credit",
            "The for-profit company was free",
            "There is no real difference between them"
          ],
          correctAnswer: 1,
          explanation: "The nonprofit reduced her interest and built a workable DMP at low cost. The for-profit firm would have charged ~$3,000 in fees and damaged her credit by telling her to stop paying."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A rising debt-to-income ratio is the warning sign to seek help.",
          "Nonprofit credit counseling (NFCC members) is a trustworthy first step.",
          "A Debt Management Plan combines payments and often lowers interest rates.",
          "You can also negotiate hardship or settlement options directly with creditors.",
          "Avoid for-profit debt settlement scams with high fees that harm your credit."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "credit11-mastery1",
            question: "What is the first thing you should do when debt starts to feel unmanageable?",
            options: [
              "Ignore the bills until collectors call",
              "Seek help, such as nonprofit credit counseling, before the situation worsens",
              "Immediately file for bankruptcy",
              "Take out a new high-interest loan"
            ],
            correctAnswer: 1,
            explanation: "Acting early - through nonprofit credit counseling - gives you the most options. Ignoring it or jumping straight to bankruptcy or new debt makes things worse."
          },
          {
            id: "credit11-mastery2",
            question: "What's the difference between nonprofit credit counseling and for-profit debt settlement?",
            options: [
              "There is no difference",
              "Nonprofit counseling helps you repay responsibly at low cost; many for-profit settlement firms charge huge fees and can damage your credit",
              "For-profit settlement is always free",
              "Nonprofit counseling is illegal"
            ],
            correctAnswer: 1,
            explanation: "Nonprofit counselors aim to help you repay affordably; predatory for-profit settlement companies often charge large fees and tell you to stop paying, hurting your credit."
          },
          {
            id: "credit11-mastery3",
            question: "What does NFCC stand for?",
            options: [
              "National Foundation for Credit Counseling",
              "New Finance Credit Card Company",
              "National Federal Cash Center",
              "Nonprofit Federal Credit Card"
            ],
            correctAnswer: 0,
            explanation: "NFCC is the National Foundation for Credit Counseling - choosing a member agency signals a reputable nonprofit counselor."
          },
          {
            id: "credit11-mastery4",
            question: "In a Debt Management Plan, how do your payments work?",
            options: [
              "You stop paying entirely",
              "You make one monthly payment to the agency, which distributes it to your creditors, often at lower interest",
              "Creditors forgive all your debt instantly",
              "You pay each creditor double"
            ],
            correctAnswer: 1,
            explanation: "A DMP consolidates your debts into a single monthly payment to the counseling agency, which pays creditors - frequently at reduced interest rates."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-12: Bankruptcy (FL.5.10)
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-12",
    sections: [
      {
        type: "concept",
        title: "Bankruptcy: A Legal Reset Button With a Real Cost",
        paragraphs: [
          "Bankruptcy is a legal process for people who truly cannot repay their debts. It offers a fresh start, but it comes with serious, long-lasting consequences. The two most common types for individuals are Chapter 7 and Chapter 13. Chapter 7 is 'liquidation': most unsecured debts (like credit cards) are wiped out, but some of your assets may be sold to pay creditors, and it stays on your credit report for 10 years.",
          "Chapter 13 is a 'reorganization': instead of wiping debts immediately, you follow a court-approved repayment plan over 3 to 5 years, then remaining eligible debts are discharged. It stays on your credit report for 7 years. Chapter 13 often lets people keep assets (like a home) that Chapter 7 might force them to sell.",
          "Bankruptcy can't erase everything. Generally, student loans, child support, alimony, and most recent taxes cannot be discharged. Florida also has a notably strong homestead exemption, which can protect the equity in your primary home from creditors. Because bankruptcy damages your credit for years, it's usually a last resort after counseling and negotiation have failed - but for the right situation, it provides a genuine fresh start."
        ],
        bullets: [
          "Chapter 7 = liquidation: most debts wiped, some assets may be sold, stays on credit 10 years.",
          "Chapter 13 = repayment plan over 3-5 years, stays on credit 7 years, often lets you keep assets.",
          "Student loans, child support, alimony, and most recent taxes usually CANNOT be discharged.",
          "Florida's homestead exemption can protect equity in your primary residence.",
          "Bankruptcy is a last resort because it damages credit for years."
        ],
        realWorldExample: "After bankruptcy, getting approved for a car loan or apartment can be much harder for years, and interest rates offered will be higher - which is why people try counseling and DMPs first and reserve bankruptcy for when there's truly no other path."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit12-mc1",
            question: "What is the main difference between Chapter 7 and Chapter 13 bankruptcy?",
            options: [
              "Chapter 7 liquidates assets and wipes most debts; Chapter 13 sets up a 3-5 year repayment plan",
              "Chapter 7 is for businesses only; Chapter 13 is for teenagers",
              "They are exactly the same",
              "Chapter 13 erases all debt instantly with no repayment"
            ],
            correctAnswer: 0,
            explanation: "Chapter 7 is liquidation (most debts wiped, assets may be sold). Chapter 13 is a court-approved repayment plan over 3-5 years."
          },
          {
            id: "credit12-mc2",
            question: "Which of these generally CANNOT be discharged in bankruptcy?",
            options: [
              "Credit card debt",
              "Medical bills",
              "Student loans and child support",
              "Personal loans"
            ],
            correctAnswer: 2,
            explanation: "Student loans, child support, alimony, and most recent taxes usually survive bankruptcy. Credit cards and medical bills are typically dischargeable."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Paths Out of Deep Debt",
        narrative: "Two people are both drowning in debt. One files for Chapter 7 bankruptcy. The other works with a nonprofit credit counselor and enters a Debt Management Plan. Five years later, their financial lives look very different.",
        details: [
          "The Chapter 7 filer had most debts wiped quickly but carries a bankruptcy on their credit report for 10 years.",
          "The DMP user repaid their debts over several years and avoided a bankruptcy mark.",
          "The Chapter 7 filer faced higher interest rates and tougher approvals while rebuilding credit.",
          "Both got a fresh start, but the DMP user's credit recovered faster while the Chapter 7 filer got faster debt relief upfront."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit12-aq1",
          question: "Why might someone choose a Debt Management Plan over Chapter 7 bankruptcy even though bankruptcy wipes debt faster?",
          options: [
            "DMPs are required by law before any debt relief",
            "A DMP avoids the long-lasting credit damage of a bankruptcy on your report",
            "Bankruptcy is illegal in Florida",
            "DMPs erase student loans"
          ],
          correctAnswer: 1,
          explanation: "Chapter 7 provides faster relief but leaves a bankruptcy on your credit report for 10 years. A DMP avoids that mark, helping credit recover sooner - a key trade-off."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Chapter 7 wipes most debts but may sell assets and stays on credit 10 years.",
          "Chapter 13 is a 3-5 year repayment plan and stays on credit 7 years.",
          "Student loans, child support, alimony, and most recent taxes can't be discharged.",
          "Florida's homestead exemption can protect your primary home's equity.",
          "Bankruptcy is a last resort because of its long credit impact."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "credit12-mastery1",
            question: "Which best describes Chapter 7 bankruptcy?",
            options: [
              "A 3-5 year repayment plan",
              "Liquidation: most unsecured debts are wiped and some assets may be sold",
              "A way to refinance your mortgage",
              "A type of credit counseling"
            ],
            correctAnswer: 1,
            explanation: "Chapter 7 is liquidation - most unsecured debts are discharged and certain assets may be sold to pay creditors."
          },
          {
            id: "credit12-mastery2",
            question: "How long does a Chapter 7 bankruptcy typically stay on your credit report?",
            options: [
              "1 year",
              "3 years",
              "7 years",
              "10 years"
            ],
            correctAnswer: 3,
            explanation: "Chapter 7 stays on your credit report for 10 years; Chapter 13 stays for 7 years."
          },
          {
            id: "credit12-mastery3",
            question: "Which debt usually CANNOT be discharged in bankruptcy?",
            options: [
              "Credit card balances",
              "Student loans",
              "Medical bills",
              "Department store cards"
            ],
            correctAnswer: 1,
            explanation: "Student loans (along with child support, alimony, and most recent taxes) generally survive bankruptcy and cannot be wiped out."
          },
          {
            id: "credit12-mastery4",
            question: "What does Florida's homestead exemption do in bankruptcy?",
            options: [
              "It forces you to sell your home",
              "It can protect the equity in your primary residence from creditors",
              "It eliminates your mortgage",
              "It applies only to vacation homes"
            ],
            correctAnswer: 1,
            explanation: "Florida's strong homestead exemption can shield equity in your primary home from creditors during bankruptcy."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-13: Mortgages - Buying a Home (FL.5.11)
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-13",
    sections: [
      {
        type: "concept",
        title: "How a Mortgage Turns a House Into Home (and Debt)",
        paragraphs: [
          "A mortgage is a loan used to buy a home. Because the loan is so large, the lender holds a lien on the house - meaning the home is collateral. If you stop paying, the lender can take the home through foreclosure. The down payment is the cash you pay upfront, usually 3% to 20% of the price. A bigger down payment lowers your monthly payment and helps you avoid PMI (Private Mortgage Insurance), an extra monthly charge lenders require when your down payment is under 20%.",
          "Mortgages come in flavors. A fixed-rate loan keeps the same interest rate for the whole loan, so your payment is predictable. An ARM (adjustable-rate mortgage) starts lower but can rise later, adding risk. You'll also choose a term: a 15-year loan has higher monthly payments but far less total interest, while a 30-year loan has lower payments but costs much more over time. Buying also involves closing costs (typically 2% to 5% of the price) paid at the finish line.",
          "Your monthly payment is more than just the loan. The common shorthand is PITI: Principal (the loan balance), Interest (the lender's charge), Taxes (property taxes), and Insurance (homeowners insurance). For example, a $350,000 Florida home with 10% down on a 30-year fixed loan at 7% has a payment that bundles all four of these together. Miss enough payments and the foreclosure process begins - which is why understanding the full cost before buying is critical."
        ],
        bullets: [
          "A mortgage is a home loan; the house is collateral via a lien.",
          "Down payments run 3%-20%; under 20% usually triggers PMI.",
          "Fixed-rate = stable payments; ARM = lower at first but can rise.",
          "15-year loans cost less interest but more per month; 30-year loans cost more total but less per month.",
          "PITI = Principal + Interest + Taxes + Insurance, the four parts of your payment."
        ],
        realWorldExample: "On a $315,000 home, putting down 20% ($63,000) avoids PMI entirely, while putting down 5% means paying PMI for years until you build enough equity - sometimes $100-$250 extra every month for nothing but the privilege of a small down payment."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit13-mc1",
            question: "What does PITI stand for in a mortgage payment?",
            options: [
              "Principal, Interest, Taxes, Insurance",
              "Payment, Interest, Time, Income",
              "Property, Income, Tax, Investment",
              "Principal, Insurance, Total, Interest"
            ],
            correctAnswer: 0,
            explanation: "PITI = Principal + Interest + Taxes + Insurance - the four components bundled into a typical monthly mortgage payment."
          },
          {
            id: "credit13-mc2",
            question: "When do lenders usually require PMI (Private Mortgage Insurance)?",
            options: [
              "When your down payment is 20% or more",
              "When your down payment is less than 20%",
              "Only on 15-year loans",
              "Never in Florida"
            ],
            correctAnswer: 1,
            explanation: "PMI is typically required when your down payment is under 20%, because the lender takes on more risk with less equity in the home."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Rodriguezes Buy in Hialeah",
        narrative: "The Rodriguez family is buying their first home in Hialeah for $320,000. They save for a down payment, get pre-approved by a lender, make an offer, the home is appraised, and they reach closing. They understand their monthly PITI payment - but they also want to know what happens if money gets tight.",
        details: [
          "They save a down payment and get pre-approved before house hunting, so they know their budget.",
          "Their monthly payment bundles principal, interest, property taxes, and homeowners insurance (PITI).",
          "If they were to miss several mortgage payments, the lender could begin the foreclosure process.",
          "A larger down payment would have lowered their payment and helped them avoid PMI."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit13-aq1",
          question: "What happens if the Rodriguezes miss several mortgage payments?",
          options: [
            "Nothing, since the home is already theirs",
            "The lender can begin foreclosure because the home is collateral for the loan",
            "Their interest rate automatically drops",
            "The government pays the missed payments"
          ],
          correctAnswer: 1,
          explanation: "Because the home secures the mortgage (the lender holds a lien), missing enough payments can trigger foreclosure, where the lender takes the home to recover the loan."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A mortgage is a home loan secured by the house itself (collateral via a lien).",
          "A down payment under 20% usually means paying PMI.",
          "Fixed-rate loans are predictable; ARMs can rise over time.",
          "15-year terms save interest; 30-year terms lower monthly payments but cost more overall.",
          "Your payment is PITI, and missing payments can lead to foreclosure."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "credit13-mastery1",
            question: "What is PMI and when do you typically need it?",
            options: [
              "A tax you pay yearly on all homes",
              "Private Mortgage Insurance, usually required when your down payment is under 20%",
              "A type of property tax",
              "Insurance against hurricanes only"
            ],
            correctAnswer: 1,
            explanation: "PMI (Private Mortgage Insurance) is an added cost lenders require when you put down less than 20%, protecting the lender if you default."
          },
          {
            id: "credit13-mastery2",
            question: "What is the trade-off between a fixed-rate mortgage and an ARM?",
            options: [
              "Fixed-rate payments stay stable; an ARM may start lower but can rise later",
              "ARMs always cost less over the full loan",
              "Fixed-rate loans change every month",
              "There is no difference"
            ],
            correctAnswer: 0,
            explanation: "A fixed rate keeps payments predictable for the life of the loan; an ARM can start cheaper but carries the risk of rising payments."
          },
          {
            id: "credit13-mastery3",
            question: "What do the four letters in PITI represent?",
            options: [
              "Principal, Interest, Taxes, Insurance",
              "Price, Income, Term, Interest",
              "Payment, Investment, Tax, Insurance",
              "Principal, Income, Time, Interest"
            ],
            correctAnswer: 0,
            explanation: "PITI = Principal + Interest + Taxes + Insurance, the components bundled into a typical mortgage payment."
          },
          {
            id: "credit13-mastery4",
            question: "What is the consequence of repeatedly missing mortgage payments?",
            options: [
              "Your loan is automatically forgiven",
              "The lender can foreclose and take the home, since it is collateral",
              "Your property taxes disappear",
              "Nothing happens for 30 years"
            ],
            correctAnswer: 1,
            explanation: "Because the home secures the loan, missing payments can lead to foreclosure, where the lender repossesses and sells the home."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-14: Your Rights as a Credit User (FL.5.12)
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-14",
    sections: [
      {
        type: "concept",
        title: "The Laws That Have Your Back",
        paragraphs: [
          "When you borrow money or use credit, federal laws protect you from being cheated or harassed. The Truth in Lending Act (TILA) requires lenders to clearly disclose the full cost of credit, including the APR (annual percentage rate), so you can compare offers honestly instead of being tricked by hidden fees. This is why every loan and credit card must show its APR plainly.",
          "The Equal Credit Opportunity Act (ECOA) makes it illegal for lenders to discriminate based on race, color, religion, national origin, sex, marital status, or age. Your creditworthiness - not who you are - must drive lending decisions. The Fair Debt Collection Practices Act (FDCPA) restricts how debt collectors can behave: they can't call at unreasonable hours (like 3 a.m.), use threats, lie about what you owe, or harass you.",
          "Overseeing much of this is the CFPB (Consumer Financial Protection Bureau), a federal agency where you can file complaints about banks, lenders, and collectors. If a collector breaks the rules - say, threatening you over a debt you don't even owe - you have the right to demand they stop in writing and to report them. Knowing these laws turns you from a target into an informed consumer."
        ],
        bullets: [
          "TILA requires lenders to disclose the full cost of credit, including the APR.",
          "ECOA bans discrimination by race, sex, religion, age, and more in lending.",
          "FDCPA stops debt collectors from calling at odd hours, threatening, or lying.",
          "The CFPB is the federal agency for complaints about lenders and collectors.",
          "You can demand a collector stop contacting you in writing (cease-and-desist)."
        ],
        realWorldExample: "If a credit card's tiny print hides a 29% APR but TILA forces it to be disclosed clearly, you can spot it and choose a better card. Without TILA, lenders could bury the real cost and you'd never know until the bills piled up."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit14-mc1",
            question: "What does the Truth in Lending Act (TILA) require?",
            options: [
              "That lenders give everyone the same interest rate",
              "That lenders clearly disclose the full cost of credit, including the APR",
              "That all loans be interest-free",
              "That debt collectors can call anytime"
            ],
            correctAnswer: 1,
            explanation: "TILA requires lenders to disclose the true cost of borrowing - especially the APR - so consumers can compare offers fairly."
          },
          {
            id: "credit14-mc2",
            question: "Under the FDCPA, which of these is a debt collector NOT allowed to do?",
            options: [
              "Send you a letter about a debt",
              "Call you at 3 a.m. and threaten you",
              "Verify the amount you owe",
              "Offer a payment plan"
            ],
            correctAnswer: 1,
            explanation: "The FDCPA prohibits collectors from calling at unreasonable hours, using threats, lying, or harassing you. Sending letters and offering plans are allowed."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon and the 9 p.m. Calls",
        narrative: "Devon keeps getting calls from a debt collector - sometimes late at night - claiming he owes $800 on an account he never opened. The collector is aggressive and threatening. Devon decides to learn his rights instead of panicking.",
        details: [
          "The collector calls repeatedly at 9 p.m. and uses threatening language.",
          "Devon never opened the account, so he disputes that the debt is even his.",
          "Under the FDCPA, the collector cannot harass, threaten, or lie about the debt.",
          "Devon sends a written request for the collector to stop and prepares to file complaints if needed."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit14-aq1",
          question: "Where can Devon file a complaint about a debt collector or predatory lender?",
          options: [
            "The local library",
            "The CFPB (Consumer Financial Protection Bureau), and he can also report to the FTC",
            "His cell phone provider",
            "Nowhere - there's no agency for this"
          ],
          correctAnswer: 1,
          explanation: "The CFPB handles complaints about lenders, banks, and debt collectors (the FTC also takes such reports). Devon can use these channels alongside a written cease-and-desist."
        }
      },
      {
        type: "recap",
        takeaways: [
          "TILA forces lenders to disclose the full cost of credit, including APR.",
          "ECOA bans discrimination in lending based on protected traits.",
          "FDCPA limits how and when debt collectors can contact you.",
          "The CFPB is where you file complaints about lenders and collectors.",
          "You can send a written cease-and-desist to stop a collector's contact."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "credit14-mastery1",
            question: "What must lenders disclose under the Truth in Lending Act?",
            options: [
              "Their company's profits",
              "The full cost of credit, including the APR",
              "The names of all other borrowers",
              "Nothing - disclosure is optional"
            ],
            correctAnswer: 1,
            explanation: "TILA requires lenders to clearly disclose the cost of borrowing, especially the APR, so you can compare offers."
          },
          {
            id: "credit14-mastery2",
            question: "Which behavior does the FDCPA prohibit for debt collectors?",
            options: [
              "Sending a written notice of a debt",
              "Calling at 3 a.m., threatening, or lying about the debt",
              "Offering a repayment plan",
              "Verifying the debt amount"
            ],
            correctAnswer: 1,
            explanation: "The FDCPA forbids calling at unreasonable hours, threats, lies, and harassment. Legitimate notices and payment plans are allowed."
          },
          {
            id: "credit14-mastery3",
            question: "What does the Equal Credit Opportunity Act (ECOA) prohibit?",
            options: [
              "Charging any interest at all",
              "Discriminating in lending based on race, sex, religion, age, and other protected traits",
              "Offering credit cards to students",
              "Disclosing the APR"
            ],
            correctAnswer: 1,
            explanation: "ECOA makes it illegal to base lending decisions on protected characteristics; decisions must rest on creditworthiness."
          },
          {
            id: "credit14-mastery4",
            question: "Which agency should you contact to complain about a predatory lender or collector?",
            options: [
              "The CFPB (Consumer Financial Protection Bureau)",
              "The Department of Motor Vehicles",
              "The Post Office",
              "The local school board"
            ],
            correctAnswer: 0,
            explanation: "The CFPB handles complaints about banks, lenders, and debt collectors (the FTC is another option)."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-15: Your Free Annual Credit Report (FL.5.13)
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-15",
    sections: [
      {
        type: "concept",
        title: "The Free Report That Can Make or Break Your Future",
        paragraphs: [
          "Federal law (the Fair Credit Reporting Act, or FCRA) gives every American one free credit report per year from each of the three major credit bureaus - Equifax, Experian, and TransUnion. The official site is AnnualCreditReport.com. This is different from the 'free credit score' apps; the official report is the detailed record lenders actually use.",
          "Your credit report lists your personal info, your accounts and balances, your payment history (on-time or late), inquiries (who checked your credit), and public records like bankruptcies. Errors are surprisingly common - an account that isn't yours, a payment marked late that you actually paid, or a debt you already settled. These mistakes can quietly lower your score, leading to higher interest rates or even denied credit.",
          "If you find an error, you have the right to dispute it. You file a written dispute with the credit bureau, which by law must investigate - typically within 30 days. If the information can't be verified, it must be corrected or removed. Checking your report regularly is one of the easiest, most powerful financial habits: it catches both honest mistakes and identity theft early, before they do real damage."
        ],
        bullets: [
          "The FCRA guarantees one free report per year from each of the three bureaus.",
          "Get it at the official AnnualCreditReport.com - not random 'free score' sites.",
          "Reports show personal info, accounts, payment history, inquiries, and public records.",
          "Common errors include accounts that aren't yours and wrongly reported late payments.",
          "You can dispute errors in writing; bureaus must investigate, usually within 30 days."
        ],
        realWorldExample: "A single wrongly reported collection account can drop a credit score by 80+ points - enough to turn a low car-loan rate into a much higher one, costing thousands over the loan. Catching and disputing it restores both the score and the savings."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit15-mc1",
            question: "Where do you get your official free annual credit report?",
            options: [
              "Any app advertising 'free credit scores'",
              "AnnualCreditReport.com",
              "Your local bank branch only",
              "You have to pay for it"
            ],
            correctAnswer: 1,
            explanation: "AnnualCreditReport.com is the federally authorized site for your free yearly reports. 'Free score' apps are different and aren't the official report lenders use."
          },
          {
            id: "credit15-mc2",
            question: "How long do credit bureaus typically have to investigate a dispute by law?",
            options: [
              "About 30 days",
              "5 years",
              "24 hours",
              "They never have to investigate"
            ],
            correctAnswer: 0,
            explanation: "Under the FCRA, bureaus generally must investigate a dispute within about 30 days and correct or remove information that can't be verified."
          }
        ]
      },
      {
        type: "scenario",
        title: "Carlos Checks His Report",
        narrative: "Carlos, 19, checks his credit report for the very first time at AnnualCreditReport.com. He's shocked to find a collection account from a medical bill he thought his insurance had covered two years ago. The unpaid item has dragged his score down from 720 to 640.",
        details: [
          "Carlos finds a collection account he didn't know existed on his report.",
          "The error pulled his score down from 720 to 640.",
          "He files a written dispute with the credit bureau explaining the bill should have been covered.",
          "By law, the bureau must investigate, usually within about 30 days, and correct or remove unverified items."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit15-aq1",
          question: "What should Carlos do about the erroneous collection account?",
          options: [
            "Ignore it and hope it disappears",
            "File a written dispute with the credit bureau, which must investigate within about 30 days",
            "Immediately pay the disputed amount even if it's wrong",
            "Open new accounts to raise his score instead"
          ],
          correctAnswer: 1,
          explanation: "The right step is to dispute the error in writing. The FCRA requires the bureau to investigate (typically within 30 days) and correct or remove information that can't be verified."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The FCRA gives you one free report yearly from each of the three bureaus.",
          "Use the official AnnualCreditReport.com, not 'free score' apps.",
          "Reports include accounts, payment history, inquiries, and public records.",
          "Errors are common and can lower your score, raising your borrowing costs.",
          "You can dispute errors in writing; bureaus must investigate, usually within 30 days."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "credit15-mastery1",
            question: "What is the official source for your free annual credit report?",
            options: [
              "AnnualCreditReport.com",
              "Any 'free credit score' app",
              "A random search result",
              "Your employer's HR department"
            ],
            correctAnswer: 0,
            explanation: "AnnualCreditReport.com is the federally authorized site - the only official source for your free yearly reports."
          },
          {
            id: "credit15-mastery2",
            question: "Who are the three major credit bureaus?",
            options: [
              "Equifax, Experian, and TransUnion",
              "Visa, Mastercard, and Amex",
              "FDIC, SEC, and IRS",
              "Chase, Wells Fargo, and Bank of America"
            ],
            correctAnswer: 0,
            explanation: "The three major credit bureaus that compile your reports are Equifax, Experian, and TransUnion."
          },
          {
            id: "credit15-mastery3",
            question: "By law, how long do bureaus generally have to investigate a dispute?",
            options: [
              "About 30 days",
              "10 years",
              "1 hour",
              "They are never required to respond"
            ],
            correctAnswer: 0,
            explanation: "The FCRA generally requires a dispute investigation within about 30 days."
          },
          {
            id: "credit15-mastery4",
            question: "Which is a common credit report error to watch for?",
            options: [
              "Your name being spelled correctly",
              "An account that isn't yours or a payment wrongly marked late",
              "An on-time payment listed accurately",
              "A correct current balance"
            ],
            correctAnswer: 1,
            explanation: "Common errors include accounts that don't belong to you and payments incorrectly reported as late - both can unfairly lower your score."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-16: Paying for College - FAFSA, Bright Futures & Loans (FL.5.14)
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-16",
    sections: [
      {
        type: "concept",
        title: "Free Money First: The Smart Order of Paying for College",
        paragraphs: [
          "There's a smart order for funding college, and it starts with money you never have to pay back. First come scholarships and grants (including Florida's Bright Futures), then work-study, then federal loans (subsidized before unsubsidized), then Parent PLUS loans, and finally - as a last resort - private loans. Following this hierarchy can save you tens of thousands of dollars over your lifetime.",
          "It all begins with the FAFSA (Free Application for Federal Student Aid). Filing the FAFSA unlocks federal grants, loans, and work-study, and it's used by colleges to build your aid package. Florida's state aid deadline is often earlier than the federal one, so filing early matters. The FAFSA calculates a number (formerly the EFC, now the SAI) that estimates what your family can contribute, which determines your need-based aid.",
          "Florida's Bright Futures scholarship rewards strong students. The top Academic Scholars award generally requires around a 3.5 weighted GPA (with specific course and test requirements) plus 100 community service hours; the Medallion Scholars tier requires around a 3.0 GPA and 75 hours. Know the difference between your funding types: a grant is need-based free money, a scholarship is usually merit-based free money, and a loan must be repaid with interest. The goal is to maximize free money and minimize loans - especially private ones."
        ],
        bullets: [
          "Funding order: scholarships/grants → work-study → federal loans → PLUS loans → private loans.",
          "The FAFSA unlocks federal grants, loans, and work-study - file it early.",
          "Florida's state aid deadline is often earlier than the federal deadline.",
          "Bright Futures: Academic Scholars need ~3.5 GPA + 100 service hours; Medallion Scholars ~3.0 GPA + 75 hours.",
          "Grants/scholarships are free money; loans must be repaid with interest."
        ],
        realWorldExample: "Two students attend the same Florida university. One files FAFSA early and wins Bright Futures plus grants, graduating with $8,000 in loans. The other skips scholarships and leans on private loans, graduating with $60,000 in debt - same degree, wildly different financial start."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit16-mc1",
            question: "Which type of college funding should you pursue FIRST?",
            options: [
              "Private loans",
              "Scholarships and grants (free money you don't repay)",
              "Parent PLUS loans",
              "Credit cards"
            ],
            correctAnswer: 1,
            explanation: "Always start with free money - scholarships and grants - before any loans, since they never have to be repaid."
          },
          {
            id: "credit16-mc2",
            question: "What does filing the FAFSA do?",
            options: [
              "Guarantees you a full scholarship",
              "Unlocks federal grants, loans, and work-study and helps colleges build your aid package",
              "Pays your tuition directly",
              "Is only for graduate students"
            ],
            correctAnswer: 1,
            explanation: "The FAFSA is the gateway to federal aid (grants, loans, work-study) and is used by schools to determine your financial aid package."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya's Path to UF",
        narrative: "Priya, 17, in Boca Raton wants to attend the University of Florida. She maps out her financial aid journey carefully: filing the FAFSA early, qualifying for Bright Futures, reviewing her award letter, and comparing loan offers before borrowing anything.",
        details: [
          "Priya submits the FAFSA early to beat Florida's earlier state deadline.",
          "She qualifies for Bright Futures with her GPA and 100 community service hours.",
          "Her award letter shows grants and both subsidized and unsubsidized loan options.",
          "She chooses subsidized loans first because the government pays the interest while she's in school."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit16-aq1",
          question: "Why should Priya prefer subsidized loans over unsubsidized loans when she has the choice?",
          options: [
            "Subsidized loans never have to be repaid",
            "The government pays the interest on subsidized loans while she's in school, so less debt builds up",
            "Unsubsidized loans are illegal for Florida students",
            "Subsidized loans have higher interest rates"
          ],
          correctAnswer: 1,
          explanation: "With subsidized loans, the government covers the interest while you're in school, so the balance doesn't grow. Unsubsidized loans accrue interest from day one, increasing what you owe."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Pursue funding in order: scholarships/grants → work-study → federal loans → PLUS → private.",
          "The FAFSA unlocks federal aid - file it early, especially for Florida's earlier state deadline.",
          "Bright Futures: Academic Scholars need ~3.5 GPA + 100 service hours; Medallion Scholars ~3.0 GPA + 75 hours.",
          "Grants and scholarships are free; loans must be repaid with interest.",
          "Private loans are the last resort due to higher rates and fewer protections."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "credit16-mastery1",
            question: "What is the correct order of importance when seeking college funding?",
            options: [
              "Private loans first, then grants",
              "Free money (scholarships/grants), then work-study and federal loans, with private loans last",
              "Credit cards first",
              "Parent PLUS loans before any scholarships"
            ],
            correctAnswer: 1,
            explanation: "Start with free money, then work-study and federal loans, and use private loans only as a last resort."
          },
          {
            id: "credit16-mastery2",
            question: "What do Bright Futures Academic Scholars generally need?",
            options: [
              "No requirements at all",
              "Around a 3.5 GPA plus 100 community service hours (with course/test requirements)",
              "A perfect 4.0 and 1,000 service hours",
              "Only Florida residency"
            ],
            correctAnswer: 1,
            explanation: "The top Academic Scholars award generally requires roughly a 3.5 weighted GPA, specific coursework/test scores, and 100 community service hours. The Medallion Scholars tier is ~3.0 GPA and 75 hours."
          },
          {
            id: "credit16-mastery3",
            question: "What is the difference between a subsidized and unsubsidized federal loan?",
            options: [
              "Subsidized loans: the government pays interest while you're in school; unsubsidized loans accrue interest from day one",
              "They are identical",
              "Unsubsidized loans are free",
              "Subsidized loans charge double interest"
            ],
            correctAnswer: 0,
            explanation: "On subsidized loans the government covers interest while you're enrolled; unsubsidized loans accrue interest immediately, increasing the balance."
          },
          {
            id: "credit16-mastery4",
            question: "Why are private loans considered a last resort?",
            options: [
              "They are always interest-free",
              "They typically carry higher interest rates and fewer borrower protections than federal loans",
              "They are illegal",
              "They never require repayment"
            ],
            correctAnswer: 1,
            explanation: "Private loans usually have higher rates and lack federal protections like income-driven repayment, so they should be used only after free money and federal loans."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-17: How to Apply for a Loan (FL.5.16)
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-17",
    sections: [
      {
        type: "concept",
        title: "What Happens When You Ask a Lender for Money",
        paragraphs: [
          "When you apply for a loan, the lender is deciding one thing: how likely are you to pay it back? They evaluate your credit score, your debt-to-income ratio (DTI), your income and employment, and - for secured loans - any collateral (like the car itself on an auto loan). DTI is your monthly debt payments divided by your gross monthly income; lenders generally like to see it below 36%.",
          "You'll need documents to prove your situation: pay stubs, tax returns, bank statements, and a photo ID. When the lender checks your credit, it's usually a 'hard inquiry,' which can lower your score by a few points (about 5). That's different from a 'soft inquiry' (like checking your own score or a pre-qualification), which doesn't affect your score at all.",
          "After review, you'll get one of three outcomes: approval, conditional approval (approved if you provide more info or meet a condition), or denial. A car loan is the most common first loan for young adults, and the terms matter enormously. A longer term means smaller monthly payments but far more interest paid overall, while a shorter term costs more per month but saves you money in total."
        ],
        bullets: [
          "Lenders evaluate credit score, debt-to-income ratio, income/employment, and collateral.",
          "DTI = monthly debt payments ÷ gross monthly income; aim for under ~36%.",
          "A hard inquiry can lower your score ~5 points; a soft inquiry does not.",
          "Common documents: pay stubs, tax returns, bank statements, and ID.",
          "Longer loan terms = lower payments but more total interest; shorter terms = the opposite."
        ],
        realWorldExample: "On a $20,000 car loan, stretching from a 48-month to a 72-month term might drop your payment by $100/month - but you could pay over $2,000 more in interest by the end. The 'affordable' monthly payment quietly costs you thousands."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit17-mc1",
            question: "What is a debt-to-income (DTI) ratio?",
            options: [
              "Your total savings divided by your debt",
              "Your monthly debt payments divided by your gross monthly income",
              "Your credit score multiplied by your income",
              "The interest rate on your loan"
            ],
            correctAnswer: 1,
            explanation: "DTI is monthly debt payments ÷ gross monthly income. Lenders generally prefer it below about 36%, signaling you can handle more debt responsibly."
          },
          {
            id: "credit17-mc2",
            question: "What is the difference between a hard inquiry and a soft inquiry?",
            options: [
              "A hard inquiry can lower your score a few points; a soft inquiry does not affect your score",
              "They both raise your score",
              "A soft inquiry lowers your score; a hard inquiry doesn't",
              "There is no difference"
            ],
            correctAnswer: 0,
            explanation: "A hard inquiry (from actually applying for credit) can drop your score by around 5 points. A soft inquiry (checking your own score, pre-qualification) has no effect."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jasmine's First Car Loan",
        narrative: "Jasmine, 18, applies for a $12,000 auto loan for a used car. The lender reviews her credit, income, and DTI, then offers her two options: a 72-month loan at 9% APR with a low monthly payment, or a 48-month loan at 6.5% APR with a higher monthly payment.",
        details: [
          "The lender checks Jasmine's credit score, income, and debt-to-income ratio.",
          "She provides pay stubs and her ID to verify her income.",
          "Option A: 72 months at 9% APR - lower monthly payment, but more interest overall.",
          "Option B: 48 months at 6.5% APR - higher monthly payment, but about $1,800 less interest in total."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit17-aq1",
          question: "Why does the 48-month loan save Jasmine about $1,800 even though its monthly payment is higher?",
          options: [
            "Because shorter terms have no interest",
            "Because she pays off the balance faster and at a lower rate, so less total interest accumulates",
            "Because the lender made an error",
            "Because longer loans are always cheaper"
          ],
          correctAnswer: 1,
          explanation: "A shorter term at a lower APR means the loan is paid off faster with less time for interest to accumulate - saving money overall despite the higher monthly payment."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Lenders judge credit score, DTI, income/employment, and collateral.",
          "Keep your debt-to-income ratio below about 36% to look creditworthy.",
          "Hard inquiries can ding your score; soft inquiries don't.",
          "Have pay stubs, tax returns, bank statements, and ID ready.",
          "Longer terms lower monthly payments but cost more in total interest."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "credit17-mastery1",
            question: "What does the debt-to-income ratio measure, and what's a good target?",
            options: [
              "Total assets ÷ debt; aim above 100%",
              "Monthly debt payments ÷ gross monthly income; aim below about 36%",
              "Credit score ÷ income; aim for 50%",
              "Income ÷ savings; aim for 0%"
            ],
            correctAnswer: 1,
            explanation: "DTI is monthly debt payments divided by gross monthly income; lenders generally like to see it under ~36%."
          },
          {
            id: "credit17-mastery2",
            question: "Which type of credit check can lower your score by a few points?",
            options: [
              "A soft inquiry",
              "A hard inquiry",
              "Checking your own credit score",
              "A pre-qualification offer"
            ],
            correctAnswer: 1,
            explanation: "A hard inquiry - triggered when you actually apply for credit - can lower your score by around 5 points. Soft inquiries do not."
          },
          {
            id: "credit17-mastery3",
            question: "Which documents do lenders typically require for a loan application?",
            options: [
              "Pay stubs, tax returns, bank statements, and ID",
              "Only a phone number",
              "Your social media passwords",
              "A letter from a friend"
            ],
            correctAnswer: 0,
            explanation: "Lenders verify your finances with pay stubs, tax returns, bank statements, and a photo ID."
          },
          {
            id: "credit17-mastery4",
            question: "Why do longer loan terms cost more in total?",
            options: [
              "They don't - they always cost less",
              "Because you pay interest over a longer period, so more interest accumulates even if monthly payments are lower",
              "Because lenders charge a flat penalty",
              "Because the principal doubles"
            ],
            correctAnswer: 1,
            explanation: "A longer term stretches payments over more months, giving interest more time to accumulate - raising the total cost despite lower monthly payments."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-18: Federal vs Private Student Loans (FL.5.17)
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-18",
    sections: [
      {
        type: "concept",
        title: "Not All Student Loans Are Created Equal",
        paragraphs: [
          "Student loans split into two big families: federal and private. Federal loans come from the government and offer strong borrower protections. Subsidized federal loans are need-based, and the government pays the interest while you're in school. Unsubsidized federal loans aren't need-based, and interest accrues from day one. PLUS loans are for parents or grad students and require a credit check.",
          "Private loans come from banks and credit unions. They usually carry higher interest rates and - crucially - lack the safety nets federal loans provide. Federal loans offer income-driven repayment (IDR), which caps your monthly payment based on what you earn, and programs like Public Service Loan Forgiveness (PSLF), which can forgive remaining federal debt after about 10 years of qualifying payments while working in public service.",
          "The repayment terms also differ in a crisis. Federal loans allow deferment and forbearance (temporary pauses) and have defined paths if you struggle. Defaulting on federal loans is serious - it can lead to wage garnishment and tax refund seizure - but income-driven options usually let you avoid that. Private loans have far fewer options, which is exactly why private loans should always be a last resort, taken only after maxing out federal aid."
        ],
        bullets: [
          "Subsidized federal loans: need-based, government pays interest while you're in school.",
          "Unsubsidized federal loans: not need-based, interest accrues from day one.",
          "PLUS loans: for parents/grad students and require a credit check.",
          "Federal loans offer income-driven repayment and forgiveness programs like PSLF.",
          "Private loans have higher rates and fewer protections - use them last."
        ],
        realWorldExample: "Two graduates lose their jobs in a downturn. The one with only federal loans switches to income-driven repayment and pays almost nothing until they're working again. The one with private loans gets no such break - the bank still demands the full payment every month."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit18-mc1",
            question: "What is the key difference between subsidized and unsubsidized federal loans?",
            options: [
              "Subsidized loans never have to be repaid",
              "On subsidized loans the government pays interest while you're in school; unsubsidized loans accrue interest from day one",
              "Unsubsidized loans are interest-free",
              "They are identical"
            ],
            correctAnswer: 1,
            explanation: "Subsidized loans are need-based and the government covers interest during school; unsubsidized loans accrue interest immediately, so the balance grows from the start."
          },
          {
            id: "credit18-mc2",
            question: "Which feature is available on FEDERAL loans but generally NOT on private loans?",
            options: [
              "Income-driven repayment (IDR)",
              "Any interest at all",
              "A repayment schedule",
              "A loan amount"
            ],
            correctAnswer: 0,
            explanation: "Income-driven repayment caps your payment based on income and is a federal loan protection. Private loans typically don't offer it, which is a major reason to prefer federal loans."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Roommates at Florida State",
        narrative: "Two roommates graduate from Florida State. One borrowed only federal loans ($27,000, subsidized and unsubsidized). The other borrowed $27,000 in federal loans plus $15,000 in private loans at 11% APR. After graduation, the economy slumps and both struggle to find jobs.",
        details: [
          "The federal-only borrower enrolls in income-driven repayment, lowering payments to what they can afford.",
          "The borrower with private loans gets income-driven relief only on the federal portion.",
          "The private lender still requires the full payment on the $15,000 at 11% APR.",
          "The federal-only borrower weathers the downturn far more comfortably."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit18-aq1",
          question: "Why did income-driven repayment help one borrower but not fully protect the other?",
          options: [
            "Income-driven repayment applies to federal loans, not private loans",
            "The second borrower didn't fill out a form",
            "Private loans have lower interest",
            "Income-driven repayment is illegal in Florida"
          ],
          correctAnswer: 0,
          explanation: "Income-driven repayment is a federal protection. It covered the first borrower's loans entirely, but only the federal portion of the second borrower's debt - the $15,000 private loan had no such option."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Subsidized federal loans are need-based with interest paid by the government during school.",
          "Unsubsidized federal loans accrue interest from day one.",
          "PLUS loans are for parents/grad students and require a credit check.",
          "Federal loans offer income-driven repayment and forgiveness (PSLF); private loans don't.",
          "Use private loans last because of higher rates and fewer protections."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "credit18-mastery1",
            question: "What distinguishes a subsidized federal loan from an unsubsidized one?",
            options: [
              "The government pays interest on subsidized loans while you're in school; unsubsidized loans accrue interest immediately",
              "Subsidized loans are free forever",
              "Unsubsidized loans require no repayment",
              "They are the same"
            ],
            correctAnswer: 0,
            explanation: "Subsidized loans are need-based and the government covers interest during school; unsubsidized loans build interest from the start."
          },
          {
            id: "credit18-mastery2",
            question: "What does Public Service Loan Forgiveness (PSLF) require?",
            options: [
              "Nothing - it's automatic for everyone",
              "About 10 years of qualifying payments while working in public service, on federal loans",
              "Repaying private loans for 5 years",
              "A perfect credit score"
            ],
            correctAnswer: 1,
            explanation: "PSLF can forgive remaining federal student debt after roughly 10 years of qualifying payments while working in eligible public service jobs."
          },
          {
            id: "credit18-mastery3",
            question: "Why should private loans be a last resort?",
            options: [
              "They have higher rates and lack federal protections like income-driven repayment",
              "They are always interest-free",
              "They are forgiven automatically",
              "They have lower interest than federal loans"
            ],
            correctAnswer: 0,
            explanation: "Private loans typically cost more and don't offer income-driven repayment, forgiveness, or flexible relief, so they should be used only after federal options."
          },
          {
            id: "credit18-mastery4",
            question: "What can happen if you default on federal student loans?",
            options: [
              "Nothing ever happens",
              "Serious consequences like wage garnishment and seizure of tax refunds (though income-driven options can help you avoid default)",
              "Your loans are automatically forgiven",
              "Your interest rate drops to zero"
            ],
            correctAnswer: 1,
            explanation: "Defaulting on federal loans can trigger wage garnishment and tax refund seizure - but income-driven repayment usually lets borrowers avoid default."
          }
        ]
      }
    ]
  }
]
