import { StructuredLessonContent } from "@/types"

// Wave-2 deepened content (Mortgages-depth rebuild) for: credit-debt
export const deepCredit2: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // credit-1: What Is Credit
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-1",
    sections: [
      {
        type: "concept",
        title: "Borrowing Now, Paying Later",
        paragraphs: [
          "Credit is simply the ability to borrow money now and pay it back later, usually with an extra charge called interest. When a bank hands you a credit card or a car dealer finances your ride, they are trusting that you'll repay them. That trust is the heart of credit. Say a phone costs $600 but you only have $200 today. Credit lets you take the phone now and pay the other $400 over several months. The convenience is real, but so is the cost if you carry the balance too long.",
          "Every credit arrangement has the same core parts. The principal is the amount you borrow. The interest is the fee the lender charges for letting you use their money, usually shown as a yearly rate. The term is how long you have to repay. Imagine borrowing $1,000 at 12% interest for one year: you owe the $1,000 principal plus about $120 in interest. Understanding these three pieces lets you compare any loan or card and see what you're really paying, not just the sticker price.",
          "Credit is neither good nor bad by itself; it's a tool that magnifies your choices. Used wisely, it helps you buy a home, handle emergencies, or build a track record that unlocks better rates later. Used carelessly, it can trap you in payments that grow faster than you can pay them. A teen who borrows $50 from a friend and repays it on time is practicing the same skill a bank looks for. Think of credit as a promise backed by your reputation: the more reliably you keep small promises, the bigger promises lenders will let you make. Credit rewards people who borrow only what they can comfortably repay, and it quietly punishes those who borrow on impulse without a clear plan to pay it back."
        ],
        bullets: [
"Credit means borrowing money now and repaying it later, with interest.",
"Principal is the amount borrowed; interest is the fee for borrowing it.",
"The term is how long you have to pay the money back.",
"Credit works on trust that you will repay what you owe.",
"Used wisely it's a tool; used carelessly it becomes a trap."
        ],
        realWorldExample: "You buy a $600 laptop on a credit card at 20% interest. If you pay it off in one month, it costs $600. If you only pay $25 a month, it takes over two years and costs roughly $750 - the same laptop, $150 more, just for waiting."
      },
      {
        type: "concept",
        title: "Why Credit Matters So Much",
        paragraphs: [
          "Credit does far more than let you buy things early - it quietly shapes major parts of adult life. Landlords check it before renting you an apartment. Some employers glance at it during hiring. Utility and phone companies may waive deposits for people with solid credit. Insurance rates can even depend on it in many states. A young adult with no credit history isn't automatically 'safe' in lenders' eyes; they're an unknown, which can make that first apartment or car harder to get than it should be.",
          "There are two broad kinds of credit you'll meet. Revolving credit, like a credit card, gives you a limit you can borrow against again and again as you repay - the balance revolves. Installment credit, like a car loan or student loan, gives you a fixed amount you repay in equal scheduled payments until it's gone. A $300 credit-card limit and a $15,000 car loan behave very differently, and lenders like to see you handle both responsibly over time.",
          "The single most important habit with any credit is paying on time, every time. Payment history is the biggest factor lenders track, and one missed payment can linger on your record for years. Credit also builds slowly, then compounds: the longer you responsibly use it, the more doors open and the cheaper borrowing becomes. Starting early with something small, like a starter card you pay off monthly, plants seeds that pay off when you need a big loan later in life."
        ],
        bullets: [
"Credit affects apartments, jobs, insurance rates, and utility deposits, not just loans.",
"Revolving credit (cards) can be reused; installment credit (loans) is a fixed payoff.",
"Paying on time is the most important credit habit you can build.",
"No credit history makes you an unknown, which lenders treat cautiously.",
"Credit builds slowly, so starting early with small amounts pays off later."
        ],
        realWorldExample: "Two 22-year-olds apply for the same apartment. One has three years of on-time credit card payments; the other has never used credit. The landlord approves the first with no deposit and asks the second for an extra month's rent upfront as security."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit1-mc1",
            question: "What does 'principal' mean in a loan?",
            options: [
"The extra fee a lender charges you for borrowing",
"The amount of money you borrow",
"The number of years you have to repay it",
"The lender's total yearly profit on the deal"
            ],
            correctAnswer: 1,
            explanation: "Principal is the actual amount you borrow. Interest is the separate fee charged on top, and the term is how long you have to repay."
          },
          {
            id: "credit1-mc2",
            question: "How does revolving credit differ from installment credit?",
            options: [
"Revolving credit refreshes as you repay it",
"Revolving credit never charges any interest at all",
"Installment credit has no fixed scheduled payments",
"They are the exact same product"
            ],
            correctAnswer: 0,
            explanation: "Revolving credit, like a card, refreshes as you pay it down. Installment credit, like a car loan, is a set amount repaid in scheduled payments until gone."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Buys His First Phone on Credit",
        narrative: "Marcus, 18, wants a $720 phone but has only $120 saved. The store offers to finance it: $30 a month for 24 months. He's excited, but his older sister asks him to add up the real cost before he signs anything.",
        details: [
"The phone's cash price is $720, but Marcus can't pay that upfront right now.",
"The financing plan is $30 a month for 24 months, which totals $720 over the term.",
"Because interest is baked in, the plan actually costs more than $720 if he reads the fine print.",
"Paying on time each month would help Marcus start building a positive credit history."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit1-aq1",
          question: "What is the smartest reason for Marcus to add up the total cost before financing the phone?",
          options: [
"Financing offers are always a scam he should avoid in nearly all cases",
"The total paid can top the cash price after interest",
"Phones lose all their value the day you buy them",
"Stores almost never let people just pay with cash"
          ],
          correctAnswer: 1,
          explanation: "Financing spreads payments out but usually adds interest, so the total can top the cash price. Comparing the two lets Marcus decide if the convenience is worth the extra cost."
        }
      },
      {
        type: "recap",
        takeaways: [
"Credit lets you borrow now and repay later, almost always with interest.",
"Every loan has principal, interest, and a term - learn to spot all three.",
"Revolving credit is reusable; installment credit is a fixed payoff.",
"Credit affects apartments, jobs, insurance, and deposits, not just loans.",
"Paying on time and borrowing only what you can repay builds strong credit."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit1-mastery1",
            question: "What is the basic definition of credit?",
            options: [
"Money the government simply gives you for free",
"Borrowing money now and repaying it later",
"A type of savings account that earns interest",
"Cash you happen to already own outright"
            ],
            correctAnswer: 1,
            explanation: "Credit is the ability to borrow money now and pay it back later, usually with interest. It's built on a lender trusting you to repay."
          },
          {
            id: "credit1-mastery2",
            question: "In a loan, what is 'interest'?",
            options: [
"The original amount of money you borrowed according to most experts",
"The fee a lender charges you for borrowing",
"The total number of scheduled monthly payments",
"The calendar date the loan is finally due"
            ],
            correctAnswer: 1,
            explanation: "Interest is the fee the lender charges for the use of their money, usually shown as a yearly percentage rate on top of the principal."
          },
          {
            id: "credit1-mastery3",
            question: "Which is an example of installment credit?",
            options: [
"A credit card with a reusable revolving limit",
"A car loan repaid in equal payments",
"A store gift card that you preload yourself",
"Cash you simply keep in your own wallet"
            ],
            correctAnswer: 1,
            explanation: "Installment credit is a fixed amount repaid in scheduled equal payments, like a car or student loan. A credit card is revolving credit instead."
          },
          {
            id: "credit1-mastery4",
            question: "Why can having no credit history be a problem?",
            options: [
"It automatically means that you are quite rich",
"Lenders treat you as an unknown risk",
"It guarantees you the very lowest interest rates",
"It removes the need for any loans forever"
            ],
            correctAnswer: 1,
            explanation: "With no track record, lenders can't tell how you'll handle borrowing, so they treat you cautiously - which can make a first apartment or loan harder to get."
          },
          {
            id: "credit1-mastery5",
            question: "What is the most important habit for building good credit?",
            options: [
"Opening as many new cards as possible fast",
"Paying what you owe on time",
"Always borrowing right up to the maximum limit",
"Avoiding credit entirely for the rest of life"
            ],
            correctAnswer: 1,
            explanation: "Payment history is the biggest factor lenders track. Paying on time, every time, is the single most powerful habit for building strong credit."
          },
          {
            id: "credit1-mastery6",
            question: "Beyond loans, where else can your credit matter?",
            options: [
"Only when buying a house",
"Apartments, jobs, insurance, and deposits",
"Nowhere except at banks",
"Only for people over age 40"
            ],
            correctAnswer: 1,
            explanation: "Credit can influence renting an apartment, some hiring decisions, insurance rates, and whether you owe utility deposits - it reaches far beyond loans."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-2: Credit Scores
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-2",
    sections: [
      {
        type: "concept",
        title: "The Number That Follows You Around",
        paragraphs: [
          "A credit score is a three-digit number, usually from 300 to 850, that predicts how likely you are to repay borrowed money. Lenders use it as a quick summary of your credit history so they can decide whether to lend to you and at what interest rate. A higher score signals lower risk. Someone with a 780 looks like a safe bet; someone with a 540 looks risky, so lenders either charge them much more or turn them down entirely. The score doesn't judge you as a person - it just estimates repayment risk.",
          "Scores fall into rough bands that lenders think in. Roughly, 800 and up is exceptional, 740 to 799 is very good, 670 to 739 is good, 580 to 669 is fair, and below 580 is poor. These bands matter because they map to real money. A person with a 760 might get a car loan at 6%, while a person with a 610 pays 15% for the exact same car. Over a five-year loan, that gap can mean thousands of extra dollars for the lower-scored borrower.",
          "Your score isn't fixed - it moves as your behavior does. Pay bills on time and keep balances low, and it climbs over months. Miss payments or max out cards, and it drops fast. Because the score updates from your ongoing credit report, the habits you build as a teen and young adult set the trajectory. There's no shortcut or overnight fix; a strong score is earned steadily, which is exactly why lenders trust it in the first place."
        ],
        bullets: [
"A credit score is a 300-850 number predicting how likely you are to repay.",
"Higher scores signal lower risk and unlock lower interest rates.",
"Bands run from poor (under 580) to exceptional (800+).",
"The same loan costs far more for a low score than a high one.",
"Scores rise and fall with your ongoing behavior, not overnight."
        ],
        realWorldExample: "On a $25,000 five-year car loan, a borrower with a 760 score might pay about 6% and roughly $4,000 in total interest. A borrower with a 610 might pay 15% and over $10,700 in interest - about $6,700 more for the identical car."
      },
      {
        type: "concept",
        title: "What Moves Your Score Up or Down",
        paragraphs: [
          "Scores are built from your credit report, and a handful of factors do most of the work. Payment history - whether you pay on time - carries the most weight. After that comes how much of your available credit you're using, called credit utilization. If your card limit is $1,000 and you carry a $900 balance, you're using 90%, which looks risky. Keeping utilization under about 30% (under $300 on that card) helps your score. These two factors alone drive most of the movement.",
          "Other factors round out the picture. The length of your credit history matters: older accounts show a longer track record, which is why closing your oldest card can actually hurt you. Your credit mix - having both revolving cards and installment loans - can help modestly. And new credit matters: opening several accounts quickly, each triggering a hard inquiry, can ding your score temporarily because it looks like you suddenly need a lot of money. None of these outweigh paying on time and keeping balances low.",
          "It's worth knowing that checking your own score is a 'soft' inquiry and never hurts it, so there's no reason to avoid looking. Many banks and apps show your score for free. Also, a common myth is that carrying a balance and paying interest helps your score - it does not. Paying your statement in full each month is both cheaper and perfectly good for your score. Understanding these levers means you can nudge your number upward on purpose rather than by luck. A practical move is to pay your card down a few days before the statement closes, so the balance reported to the bureaus is low even if you use the card heavily during the month. Small, deliberate moves like this add up to a noticeably stronger score over time."
        ],
        bullets: [
"Payment history is the single biggest factor in your score.",
"Credit utilization matters; keep balances under about 30% of your limit.",
"Longer credit history helps, so keep old accounts open when you can.",
"Opening many new accounts fast can temporarily lower your score.",
"Checking your own score is a soft inquiry and never hurts it."
        ],
        realWorldExample: "Jordan has a $2,000 card limit and lets the balance sit at $1,800 (90% utilization). By paying it down to $400 (20%), her score jumps nearly 40 points in one cycle - without her income or anything else changing at all."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit2-mc1",
            question: "What does a credit score mainly predict?",
            options: [
"How wealthy a person is when you look closely",
"How likely you are to repay borrowed money",
"How much you earn each year",
"Which bank you should use if you check carefully"
            ],
            correctAnswer: 1,
            explanation: "A credit score estimates the likelihood you'll repay what you borrow. It's a risk measure, not a measure of wealth or income."
          },
          {
            id: "credit2-mc2",
            question: "What is credit utilization?",
            options: [
"The number of cards you own for the typical borrower",
"The share of your available credit you're using",
"How long you've had credit over the long run",
"The interest rate on your loan"
            ],
            correctAnswer: 1,
            explanation: "Utilization is how much of your available credit you're currently using. Keeping it under about 30% of your limit helps your score."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tanya's Score Surprise",
        narrative: "Tanya, 20, applies for a small loan and is surprised to be offered a high interest rate. She checks her free credit score and finds it's 610. She digs into why and spots two issues she can fix.",
        details: [
"Tanya has one credit card with a $500 limit and a $460 balance sitting month to month.",
"That means her utilization is about 92%, which is dragging her score down.",
"She also missed two payment due dates last year, hurting her payment history.",
"By paying the card down and never missing a due date, she can steadily raise her score."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit2-aq1",
          question: "Which change would most directly raise Tanya's credit score?",
          options: [
"Closing her only credit card entirely in real-world practice",
"Paying her card down and paying on time",
"Opening five new cards this week based on the numbers",
"Ignoring the score and hoping it rises"
          ],
          correctAnswer: 1,
          explanation: "Lowering her high utilization and building on-time payments hits the two biggest scoring factors. Closing her only card or opening many new ones would likely hurt, not help."
        }
      },
      {
        type: "recap",
        takeaways: [
"A credit score (300-850) predicts how likely you are to repay.",
"Higher scores unlock lower interest rates and save real money.",
"Payment history and utilization drive most of your score.",
"Keep balances under ~30% of your limit and keep old accounts open.",
"Checking your own score is a soft inquiry and never hurts it."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit2-mastery1",
            question: "What is the typical range of a credit score?",
            options: [
"0 to 100",
"300 to 850",
"1 to 10",
"500 to 5,000"
            ],
            correctAnswer: 1,
            explanation: "Most credit scores run from 300 to 850. Higher numbers signal lower risk to lenders and generally unlock better rates."
          },
          {
            id: "credit2-mastery2",
            question: "Which factor has the biggest impact on your score?",
            options: [
"The color of your credit card",
"Whether you pay bills on time",
"How many stores you shop at",
"Your yearly salary amount once you add it up"
            ],
            correctAnswer: 1,
            explanation: "Payment history - paying on time - is the single largest factor. Salary isn't part of your credit score at all."
          },
          {
            id: "credit2-mastery3",
            question: "Your card limit is $1,000 and you owe $700. What's your utilization?",
            options: [
"7%",
"70%",
"17%",
"100%"
            ],
            correctAnswer: 1,
            explanation: "Utilization is balance divided by limit: $700 / $1,000 = 70%. That's high; aiming for under 30% would help the score."
          },
          {
            id: "credit2-mastery4",
            question: "Why might closing your oldest credit card hurt your score?",
            options: [
"It cancels all your other cards too",
"It shortens your credit history length",
"It doubles your interest rates despite the marketing",
"It is against federal law"
            ],
            correctAnswer: 1,
            explanation: "Length of credit history helps your score, so closing your oldest account can shorten that history and lower your average account age."
          },
          {
            id: "credit2-mastery5",
            question: "Does checking your own credit score hurt it?",
            options: [
"Yes, it drops 50 points each time in the fine print",
"No, it's a soft inquiry with no effect",
"Yes, but only on weekends even for careful users",
"Only if you check twice a year"
            ],
            correctAnswer: 1,
            explanation: "Checking your own score is a soft inquiry that never affects your score. Only hard inquiries from applying for new credit can ding it slightly."
          },
          {
            id: "credit2-mastery6",
            question: "Does carrying a balance and paying interest help your score?",
            options: [
"Yes, it proves you can handle debt year after year",
"No, paying in full is fine and cheaper",
"Yes, it's required for a good score",
"Only if the balance is very large"
            ],
            correctAnswer: 1,
            explanation: "That's a myth. Paying your statement in full each month is cheaper and perfectly good for your score; you don't need to carry a balance."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-3: FICO
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-3",
    sections: [
      {
        type: "concept",
        title: "The Formula Behind the Number",
        paragraphs: [
          "FICO is the most widely used credit-scoring model, created by the Fair Isaac Corporation and used in the vast majority of lending decisions in the United States. When a bank says it 'pulled your score,' it usually means a FICO score. What makes FICO powerful is that it turns the messy details of your credit report into one number using a known recipe of five weighted categories. Because the weights are public, you can actually target the parts that matter most instead of guessing.",
          "The five FICO categories and their approximate weights are: payment history at about 35%, amounts owed (mostly utilization) at about 30%, length of credit history at about 15%, new credit at about 10%, and credit mix at about 10%. Notice that payment history and amounts owed together make up roughly 65% of the score. That means the two things most under your control - paying on time and keeping balances low - dominate the outcome. The other three categories fine-tune it.",
          "FICO scores also come in versions and flavors. There's a base FICO score most people know, but lenders sometimes use industry-specific versions, like a FICO Auto Score for car loans or a FICO Bankcard Score for credit cards, which weight things slightly differently. There's also VantageScore, a competing model built by the three credit bureaus that uses similar ideas with different math. You don't have one single 'true' score; you have several close cousins depending on who's looking and why. Most fall within a similar range, so if your habits are strong, every version tends to look good at once."
        ],
        bullets: [
"FICO is the dominant credit-scoring model used in most U.S. lending.",
"Payment history (~35%) is the largest of five weighted categories.",
"Amounts owed / utilization (~30%) is the second largest factor.",
"The remaining ~35% splits across history length, new credit, and mix.",
"You have several FICO versions plus VantageScore, not one single score."
        ],
        realWorldExample: "Because payment history is ~35% and utilization ~30%, a person who never misses a payment and keeps cards under 10% used can reach the high 700s even with only a few years of history - the two heavyweight categories are carrying the score."
      },
      {
        type: "concept",
        title: "Working the FICO Categories on Purpose",
        paragraphs: [
          "Knowing the weights lets you play offense. Since payment history is king, set up autopay for at least the minimum on every account so a busy week never costs you 35% of your score. Since amounts owed is second, keep utilization low - and remember it's measured per card and overall, so spreading a balance or paying before the statement closes can help. These two moves alone address roughly 65% of the formula and are the fastest way to a stronger number.",
          "The smaller categories reward patience and restraint. Length of history grows automatically if you keep accounts open, so resist closing your first card. New credit is about not opening too many accounts at once; each application adds a hard inquiry and lowers your average account age, so space out applications. Credit mix nudges up if you responsibly hold both revolving credit (cards) and installment loans (like a car or student loan), but you should never take a loan you don't need just to chase this small slice.",
          "It also helps to understand what FICO ignores. It does not look at your income, your bank balance, your race, your age, or your job - those aren't in the model. So a high earner with maxed-out cards and late payments can have a worse FICO score than a modest earner who pays on time. This is empowering: your score reflects your habits, not your paycheck. Build the habits FICO rewards, and the number follows regardless of how much money you make. Because the model is transparent, you are never guessing in the dark; you can watch which behaviors move your score and adjust, treating your credit report like a scoreboard you have real control over month to month."
        ],
        bullets: [
"Autopay protects payment history, the ~35% heavyweight category.",
"Low utilization, measured per card and overall, guards the ~30% category.",
"Keep old accounts open so length of history keeps growing.",
"Space out applications to limit hard inquiries under new credit.",
"FICO ignores income, savings, race, and age - only credit behavior counts."
        ],
        realWorldExample: "A $90,000 earner who maxes three cards and pays late can score in the 600s, while a $32,000 earner who pays on time and keeps utilization low can score in the 780s. FICO rewards habits, not the size of the paycheck."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit3-mc1",
            question: "Which FICO category carries the most weight?",
            options: [
"Credit mix",
"Payment history",
"New credit",
"Length of history"
            ],
            correctAnswer: 1,
            explanation: "Payment history is about 35% of a FICO score - the largest category. Paying on time is the most powerful thing you can do for it."
          },
          {
            id: "credit3-mc2",
            question: "Which of these does FICO NOT consider?",
            options: [
"Your payment history",
"Your annual income",
"Your credit utilization",
"Your length of credit history"
            ],
            correctAnswer: 1,
            explanation: "FICO ignores income entirely. It's built only from your credit report - things like payment history, utilization, and account age."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devin Targets His FICO Score",
        narrative: "Devin, 21, wants to raise his FICO score before applying for an apartment. He learns the five categories and their weights, then makes a plan focused on the pieces that matter most and that he can actually control.",
        details: [
"Devin sets up autopay so he never misses a due date, protecting payment history (~35%).",
"He pays his cards down to under 20% utilization, addressing amounts owed (~30%).",
"He decides not to close his oldest card so his length of history keeps growing.",
"He holds off on opening two new store cards to avoid stacking hard inquiries."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit3-aq1",
          question: "Which two actions target the largest share of Devin's FICO score?",
          options: [
"Opening new cards and closing old ones",
"Paying on time and lowering utilization",
"Raising his income and switching banks",
"Checking his score daily and ignoring bills"
          ],
          correctAnswer: 1,
          explanation: "Payment history (~35%) and amounts owed (~30%) are the two heavyweight categories, together about 65% of the score. Paying on time and cutting utilization hit both."
        }
      },
      {
        type: "recap",
        takeaways: [
"FICO is the dominant scoring model, built from five weighted categories.",
"Payment history (~35%) and amounts owed (~30%) dominate the score.",
"History length, new credit, and mix make up the remaining ~35%.",
"You have several FICO versions plus VantageScore, not one true score.",
"FICO ignores income, savings, race, and age - only credit habits count."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit3-mastery1",
            question: "What is FICO?",
            options: [
"A federal government banking agency for everyday consumers",
"The most widely used credit-scoring model",
"A type of high-interest credit card",
"A savings account with bonus interest"
            ],
            correctAnswer: 1,
            explanation: "FICO, from the Fair Isaac Corporation, is the credit-scoring model used in most U.S. lending decisions. It's not a bank, agency, or card."
          },
          {
            id: "credit3-mastery2",
            question: "About what percent of a FICO score is payment history?",
            options: [
"About 10%",
"About 35%",
"About 5%",
"About 90%"
            ],
            correctAnswer: 1,
            explanation: "Payment history is roughly 35% of a FICO score, making it the single largest category in the model."
          },
          {
            id: "credit3-mastery3",
            question: "Which two categories together make up most of a FICO score?",
            options: [
"Credit mix and new credit",
"Payment history and amounts owed",
"Length of history and mix",
"New credit and length of history"
            ],
            correctAnswer: 1,
            explanation: "Payment history (~35%) plus amounts owed (~30%) total about 65% of the score - the two factors most under your control."
          },
          {
            id: "credit3-mastery4",
            question: "Why space out new credit applications?",
            options: [
"Each one erases your old accounts when the bill arrives",
"They add hard inquiries and lower average age",
"Applications are banned by federal law",
"They instantly double your interest under the current rules"
            ],
            correctAnswer: 1,
            explanation: "Each application is a hard inquiry and can lower your average account age, both of which sit in the 'new credit' category and can ding your score temporarily."
          },
          {
            id: "credit3-mastery5",
            question: "How is VantageScore related to FICO?",
            options: [
"It is the exact same score renamed",
"It's a competing model with similar ideas",
"It is a government-only score in nearly all cases",
"It replaced FICO everywhere in 2020"
            ],
            correctAnswer: 1,
            explanation: "VantageScore is a competing model built by the three credit bureaus. It uses similar concepts but different math, so it isn't identical to FICO."
          },
          {
            id: "credit3-mastery6",
            question: "Can a high earner have a worse FICO score than a low earner?",
            options: [
"No, income directly sets the score according to most experts",
"Yes, because FICO scores habits, not income",
"No, scores are based only on salary",
"Only if they live in another state"
            ],
            correctAnswer: 1,
            explanation: "FICO ignores income. A high earner who pays late and maxes cards can score lower than a modest earner with disciplined, on-time habits."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-4: Credit Cards
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-4",
    sections: [
      {
        type: "concept",
        title: "How a Credit Card Actually Works",
        paragraphs: [
          "A credit card is a form of revolving credit: the bank sets a credit limit, and you can spend up to it, then repay and spend again. Each month you get a statement listing your purchases, your total balance, a due date, and a minimum payment. The key insight most teens miss is the grace period. If you pay your full statement balance by the due date, you pay zero interest - the card is essentially a free short-term loan. Interest only kicks in when you carry a balance past the due date.",
          "That's where the trap lives. Cards charge interest as an APR (annual percentage rate) that's often 20% or higher. If you only pay the minimum - often just 2-3% of the balance - the rest rolls over and starts accruing interest daily. A $2,000 balance at 24% APR paid only at the minimum can take over a decade to clear and cost more in interest than the original purchases. The minimum payment is designed to keep you in debt, not to get you out of it.",
          "Cards also carry fees to watch for: an annual fee on some cards, late fees if you miss the due date, and steep cash-advance fees plus immediate interest if you use the card to get cash. On the plus side, many cards offer rewards like cash back and, importantly, strong fraud protection - if your number is stolen, federal law caps your liability, often at $0 in practice. Used with discipline, a credit card is a powerful, safe tool; used carelessly, it's an expensive one."
        ],
        bullets: [
"A credit card is revolving credit with a limit you repay and reuse.",
"Pay the full statement balance by the due date and you owe zero interest.",
"Carrying a balance triggers interest at a high APR, 20%+.",
"Paying only the minimum keeps you in debt for years and costs a fortune.",
"Watch for annual, late, and cash-advance fees; enjoy rewards and fraud protection."
        ],
        realWorldExample: "You charge $1,000 and the card's APR is 24%. Pay it in full by the due date and it costs $1,000. Pay only the ~$25 minimum each month and it takes about five years and roughly $700 in interest - a $1,700 total for a $1,000 purchase."
      },
      {
        type: "concept",
        title: "Using a Card Wisely",
        paragraphs: [
          "The golden rule is simple: treat a credit card like a debit card by only charging what you can pay off in full that month. Do that, and you get the card's perks - rewards, fraud protection, and credit-building - without ever paying interest. Set up autopay for the full statement balance so a forgotten due date never costs you a late fee or a dent to your payment history. This one habit separates people who profit from cards from people who get buried by them.",
          "For someone with no credit history, a secured credit card is a smart starting point. You put down a deposit, say $200, which becomes your credit limit. You use the card normally and pay it off, and the issuer reports your good behavior to the bureaus, building your score. After several months of responsible use, many issuers upgrade you to a regular card and return your deposit. It's training wheels for credit, letting you prove yourself with limited risk to the bank.",
          "Keep utilization low even if you pay in full, because your balance can be reported to the bureaus on the statement date, before you pay. If your limit is $500, try to keep the reported balance under about $150. Never chase rewards by overspending - a 2% cash-back reward is worthless if you pay 24% interest on the balance. And never use a card for a cash advance unless it's a true emergency, since those start charging interest immediately with no grace period and often carry extra fees. Handled this way, a first card becomes a training ground for lifelong habits rather than an expensive early mistake. Master it now and every future loan you take will be easier and cheaper to get."
        ],
        bullets: [
"Only charge what you can pay in full each month - treat it like a debit card.",
"Set up autopay for the full balance to protect your payment history.",
"A secured card (with a deposit) is a great way to start building credit.",
"Keep the reported balance low, since utilization is tracked even if you pay in full.",
"Rewards never justify carrying a balance; avoid cash advances."
        ],
        realWorldExample: "Nina opens a secured card with a $200 deposit, buys gas and streaming on it, and pays it off every month. Nine months later, her issuer refunds the $200, upgrades her to a regular card, and her score has climbed from nothing to the mid-700s."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit4-mc1",
            question: "How do you avoid paying any interest on a credit card?",
            options: [
"Pay only the minimum each month if you check carefully",
"Pay the full statement balance by the due date",
"Use the card for cash advances over the long run",
"Never check your statement when you look closely"
            ],
            correctAnswer: 1,
            explanation: "Paying your full statement balance by the due date uses the grace period, so you owe zero interest. Carrying any balance starts the interest clock."
          },
          {
            id: "credit4-mc2",
            question: "What is a secured credit card?",
            options: [
"A card that comes with no spending limit at all",
"A card backed by a cash deposit you put down",
"A special card that never charges any interest ever for the typical borrower",
"A premium card offered only to very wealthy people"
            ],
            correctAnswer: 1,
            explanation: "A secured card requires a deposit that becomes your credit limit. It's a low-risk way to build credit when you have little or no history."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Gets His First Card",
        narrative: "Leo, 18, gets a credit card with a $1,000 limit and a 25% APR. In his first month he charges $400 on clothes and games. His statement offers a minimum payment of just $25, and he's tempted to pay only that so he can keep his cash.",
        details: [
"Leo's statement balance is $400, with a minimum payment option of only $25.",
"If he pays the full $400 by the due date, he owes zero interest thanks to the grace period.",
"If he pays only $25, the remaining $375 starts accruing interest at 25% APR.",
"Paying just the minimum would stretch the payoff for over a year and add real interest cost."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit4-aq1",
          question: "What's the smartest move for Leo this month?",
          options: [
"Pay only the $25 minimum to keep cash",
"Pay the full $400 balance by the due date",
"Take a cash advance to cover it in real-world practice",
"Skip the payment and pay double later based on the numbers"
          ],
          correctAnswer: 1,
          explanation: "Paying the full $400 by the due date means zero interest and a clean payment record. Paying the minimum would trigger 25% interest on the remaining balance."
        }
      },
      {
        type: "recap",
        takeaways: [
"A credit card is revolving credit; pay in full to owe zero interest.",
"Minimum payments keep you in debt and cost huge interest over time.",
"Watch for late, annual, and cash-advance fees.",
"Autopay the full balance and only charge what you can repay.",
"A secured card is a low-risk way to build credit from scratch."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit4-mastery1",
            question: "What kind of credit is a credit card?",
            options: [
"Installment credit with fixed payments",
"Revolving credit you can reuse",
"A one-time loan that can't be reused",
"A savings product that earns interest"
            ],
            correctAnswer: 1,
            explanation: "A credit card is revolving credit: you borrow up to a limit, repay, and borrow again. Car and student loans are installment credit instead."
          },
          {
            id: "credit4-mastery2",
            question: "What does paying only the minimum payment do?",
            options: [
"Clears your balance the fastest despite the marketing",
"Keeps you in debt and racks up interest",
"Removes all interest charges once you add it up",
"Instantly raises your credit limit even for careful users"
            ],
            correctAnswer: 1,
            explanation: "The minimum barely dents the balance, so the rest keeps accruing interest. It's designed to keep you paying for years, not to get you out of debt."
          },
          {
            id: "credit4-mastery3",
            question: "Why is a cash advance usually a bad idea?",
            options: [
"It earns you extra rewards points",
"It charges interest immediately with fees",
"It has the lowest possible APR",
"It always comes with a grace period"
            ],
            correctAnswer: 1,
            explanation: "Cash advances typically have no grace period, start charging interest right away, and add extra fees - making them one of the priciest ways to borrow."
          },
          {
            id: "credit4-mastery4",
            question: "What is one benefit of a secured credit card?",
            options: [
"It gives you an unlimited spending limit",
"It helps build credit with low risk",
"It pays you interest on the deposit",
"It never has to be repaid in the fine print"
            ],
            correctAnswer: 1,
            explanation: "A secured card uses your deposit as the limit, letting you build credit history responsibly with limited risk to the bank - ideal for beginners."
          },
          {
            id: "credit4-mastery5",
            question: "Why keep your reported balance low even if you pay in full?",
            options: [
"Because paying in full is against the rules",
"Utilization is reported on the statement date",
"It raises your APR to reward you",
"It cancels the card's rewards program"
            ],
            correctAnswer: 1,
            explanation: "Your balance is often reported to bureaus on the statement date, before you pay. A high reported balance hurts utilization even if you later pay it off."
          },
          {
            id: "credit4-mastery6",
            question: "Do rewards justify carrying a balance to earn them?",
            options: [
"Yes, rewards always beat interest year after year",
"No, interest costs far more than rewards",
"Yes, but only on weekends for everyday consumers",
"Only if the reward is airline miles"
            ],
            correctAnswer: 1,
            explanation: "A 2% reward is meaningless against 24% interest. Rewards only pay off if you avoid interest by paying the balance in full every month."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-5: APR vs APY
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-5",
    sections: [
      {
        type: "concept",
        title: "Two Rates That Look Alike but Aren't",
        paragraphs: [
          "APR and APY sound almost identical, but confusing them can cost or earn you real money. APR stands for Annual Percentage Rate, and it's the yearly cost of borrowing, often including certain fees, expressed as a percentage. When you take a loan or use a credit card, the APR tells you roughly what you'll pay per year to borrow. APY stands for Annual Percentage Yield, and it's the yearly return on money you save or invest. In short: you're charged an APR when you borrow, and you earn an APY when you save.",
          "The deeper difference is compounding. APY includes the effect of compounding - earning interest on your interest - while a basic APR typically does not. If a savings account pays 5% interest compounded monthly, its APY is slightly above 5% because each month's interest earns a little interest itself. That's why banks advertise APY on savings (it looks bigger) but APR on loans (it looks smaller). The direction of the marketing tells you which one benefits them.",
          "Knowing which rate you're looking at lets you compare honestly. Two savings accounts both saying '5%' might have different APYs if one compounds daily and the other yearly - the daily one earns slightly more. Two loans both saying '10%' might have different true costs if one bundles fees into its APR and the other hides them. Always ask: is this a borrowing rate or a saving rate, and does it include compounding and fees? That single question protects you from misleading numbers."
        ],
        bullets: [
"APR (Annual Percentage Rate) is the yearly cost of borrowing money.",
"APY (Annual Percentage Yield) is the yearly return on money you save.",
"APY includes compounding; a basic APR does not.",
"Banks advertise APY on savings and APR on loans to look better.",
"Always ask whether a rate is for borrowing or saving, and if it includes fees."
        ],
        realWorldExample: "A credit card shows a 22% APR - that's what you're charged to borrow. A high-yield savings account shows a 5% APY - that's what you earn to save. Same word 'rate,' opposite direction: one drains your wallet, the other fills it."
      },
      {
        type: "concept",
        title: "How Compounding Changes the Real Number",
        paragraphs: [
          "Compounding frequency is the hidden lever behind APY. The more often interest compounds - yearly, monthly, or daily - the higher the effective yield for the same stated rate. A 6% rate compounded once a year gives you exactly 6%. The same 6% compounded monthly yields about 6.17%, and compounded daily about 6.18%. The differences look tiny per year, but on large balances or over decades they add up. This is why APY is the fair way to compare savings accounts: it bakes the compounding in.",
          "On the borrowing side, compounding works against you. A credit card might state a 24% APR, but because it compounds daily, the amount you actually pay over a year - the effective rate - is a bit higher than 24%. Lenders quote the APR (the lower-looking number) even though your real cost creeps above it when a balance sits month after month. That's another reason paying your balance in full matters: you never let the compounding do its damage.",
          "The practical takeaway is to compare apples to apples. When choosing a savings account, compare APYs, not stated rates, so compounding is already accounted for. When choosing a loan or card, compare APRs and check what fees are included. If you only remember one thing, remember the direction: a high APY on savings is good for you, while a high APR on debt is bad for you. Matching the right rate to the right side of your money keeps you from being fooled by clever marketing. Whenever an offer highlights one rate but hides the other, that is your cue to dig deeper, because the number they leave out is usually the one that matters most to your wallet in the end. A minute of checking now can save you real money later."
        ],
        bullets: [
"More frequent compounding raises the effective yield for the same rate.",
"6% compounded monthly yields about 6.17%, versus 6% yearly.",
"Card APRs compound daily, so real cost creeps above the quoted APR.",
"Compare APYs when choosing savings so compounding is included.",
"High APY on savings is good; high APR on debt is bad."
        ],
        realWorldExample: "Put $10,000 in an account at 5% compounded daily and after one year you have about $10,513, versus $10,500 if it compounded only once. The extra $13 comes purely from compounding - small here, but meaningful on bigger sums over many years."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit5-mc1",
            question: "When do you pay an APR versus earn an APY?",
            options: [
"You earn an APR and separately pay an APY on savings",
"You pay APR to borrow, earn APY to save",
"They are the same rate under the current rules",
"Both only apply to mortgages when the bill arrives"
            ],
            correctAnswer: 1,
            explanation: "APR is the yearly cost of borrowing; APY is the yearly return on saving. You're charged an APR and you earn an APY."
          },
          {
            id: "credit5-mc2",
            question: "What key thing does APY include that a basic APR does not?",
            options: [
"The effect of compounding",
"The lender's home address",
"Your credit score according to most experts",
"The loan's due date"
            ],
            correctAnswer: 0,
            explanation: "APY factors in compounding - interest earning interest - which is why it's the fair number for comparing savings accounts."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Compares Two Accounts",
        narrative: "Priya, 19, is deciding where to park $5,000 in savings. Bank A advertises a '5% rate' and Bank B advertises a '5% APY.' She also has a credit card with a 21% APR that she's tempted to keep a balance on. She wants to make the smartest choices.",
        details: [
"Bank A's '5% rate' doesn't clearly state its compounding, so the true APY is unclear.",
"Bank B's '5% APY' already bakes in compounding, so Priya knows exactly what she'll earn.",
"Her credit card's 21% APR is far higher than any savings return she can earn.",
"Paying off the card beats earning 5%, because avoiding 21% is a bigger gain."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit5-aq1",
          question: "Given her 21% card APR and 5% savings APY, what's Priya's smartest first move?",
          options: [
"Keep the card balance and save the $5,000",
"Pay off the 21% card before chasing 5% savings",
"Ignore both rates entirely when you look closely",
"Move the money to a 5% rate account with unknown APY"
          ],
          correctAnswer: 1,
          explanation: "Avoiding a 21% APR is worth more than earning a 5% APY. Paying off high-interest debt is effectively a guaranteed 21% return - better than any safe savings account."
        }
      },
      {
        type: "recap",
        takeaways: [
"APR is the yearly cost to borrow; APY is the yearly return to save.",
"APY includes compounding; a basic APR does not.",
"More frequent compounding raises the effective yield or cost.",
"Compare APYs for savings and APRs (with fees) for loans.",
"Paying off high-APR debt beats earning a low APY."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit5-mastery1",
            question: "What does APR measure?",
            options: [
"The yearly return on your savings",
"The yearly cost of borrowing money",
"Your lifetime interest if you check carefully",
"The bank's monthly profit over the long run"
            ],
            correctAnswer: 1,
            explanation: "APR (Annual Percentage Rate) is the yearly cost of borrowing, often including certain fees. You're charged an APR when you take on debt."
          },
          {
            id: "credit5-mastery2",
            question: "What does APY measure?",
            options: [
"The yearly cost to borrow money for the typical borrower",
"The yearly return on money you save",
"The number of payments on a loan",
"The fees on a checking account"
            ],
            correctAnswer: 1,
            explanation: "APY (Annual Percentage Yield) is the yearly return on savings or investments, and it already includes the effect of compounding."
          },
          {
            id: "credit5-mastery3",
            question: "Why is APY usually a bit higher than the stated rate?",
            options: [
"Because it includes compounding",
"Because banks add a bonus by law",
"Because it ignores all interest",
"Because it subtracts taxes first"
            ],
            correctAnswer: 0,
            explanation: "APY accounts for compounding - interest earning interest - so it's slightly above the simple stated rate for the same account."
          },
          {
            id: "credit5-mastery4",
            question: "Which should you compare when shopping for a savings account?",
            options: [
"The APR of each account",
"The APY of each account",
"The bank's logo color in real-world practice",
"The loan term in years"
            ],
            correctAnswer: 1,
            explanation: "Compare APYs for savings, since APY includes compounding and lets you compare accounts fairly, even if they compound at different frequencies."
          },
          {
            id: "credit5-mastery5",
            question: "Why do card issuers advertise APR rather than the true effective rate?",
            options: [
"Because APR is illegal to hide",
"Because APR looks lower than the real cost",
"Because APR is always higher based on the numbers",
"Because APR includes your rewards once you add it up"
            ],
            correctAnswer: 1,
            explanation: "A card's APR looks lower than what you actually pay once daily compounding is added, so quoting the APR makes borrowing seem cheaper than it is."
          },
          {
            id: "credit5-mastery6",
            question: "If your card charges 20% APR and savings earn 5% APY, what's smartest?",
            options: [
"Always save before paying any debt despite the marketing",
"Pay off the card before chasing savings",
"Keep both and hope they cancel out",
"Move savings to a lower APY account"
            ],
            correctAnswer: 1,
            explanation: "Eliminating a 20% cost beats earning a 5% return. Paying off high-interest debt acts like a guaranteed 20% return - far better than the savings yield."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-6: Compound Interest on Debt
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-6",
    sections: [
      {
        type: "concept",
        title: "When Compounding Turns Against You",
        paragraphs: [
          "Compound interest is famous for growing savings, but on debt it runs in reverse and grows what you owe. With compounding, you're charged interest not just on the original amount you borrowed but also on the interest that has already piled up. Miss enough payments and you start paying interest on interest. Credit cards typically compound daily, so a balance left unpaid grows a little every single day. What feels like a manageable balance can quietly snowball into something much larger.",
          "Consider a $3,000 credit-card balance at 24% APR. If you make no payments, daily compounding adds roughly $2 a day at first, and because each day's interest joins the balance, the daily charge itself keeps growing. In a year, that $3,000 balloons to over $3,800 from interest alone - before any late fees. The cruel part is that the bigger the balance grows, the faster it grows, because there's more balance for the interest to compound on.",
          "This is exactly why high-interest debt is so dangerous and why paying it down fast matters so much. The longer a balance sits, the more compounding works against you, and the deeper the hole gets. It's the mirror image of saving: with savings, time and compounding are your friends; with debt, they're your enemies. Understanding this flips how you think about a balance - every extra dollar you throw at high-interest debt stops future compounding cold."
        ],
        bullets: [
"On debt, compounding charges interest on your interest, growing what you owe.",
"Credit cards compound daily, so balances grow every day.",
"The bigger the balance, the faster it compounds and grows.",
"A $3,000 balance at 24% can top $3,800 in a year from interest alone.",
"Paying debt down fast stops future compounding in its tracks."
        ],
        realWorldExample: "A $5,000 card balance at 22% APR, if ignored, grows by more than $1,100 in interest over a year. Left for three years untouched, compounding pushes it past $9,000 - nearly double the original, without a single new purchase."
      },
      {
        type: "concept",
        title: "The Minimum-Payment Trap and How to Escape",
        paragraphs: [
          "Credit-card minimum payments are engineered to keep compounding working against you. A minimum is often just 2-3% of the balance, and most of that small payment goes to interest, barely touching the principal. On a $2,000 balance at 24% APR, paying only the minimum can take over 15 years and cost more than $2,500 in interest - more than the original purchase. The minimum feels affordable precisely because it's designed to keep you paying for as long as possible. Card statements are even required to show a 'minimum payment warning' box that spells out how many years and how many dollars it will cost if you pay only the minimum, and the numbers are often shocking. Reading that box once is usually enough to convince someone to pay more than the bare minimum every month.",
          "The escape is to attack the principal. Any amount above the minimum goes straight to reducing the balance, which shrinks the base that interest compounds on, which shrinks next month's interest, and so on - a virtuous cycle. Paying $200 a month instead of the $50 minimum on that $2,000 balance clears it in about 11 months and cuts interest to a few hundred dollars. Even small extra payments make a big difference because they interrupt compounding early, when it does the most damage.",
          "Two habits keep compounding from ever getting started. First, pay your statement balance in full each month so no balance carries over and no interest compounds at all. Second, if you already carry a balance, throw every spare dollar at the highest-rate debt first while paying minimums on the rest. Compounding is a force of nature - neutral math that magnifies whatever you feed it. Feed it payments and it shrinks your debt fast; ignore it and it multiplies your debt just as fast. The lesson is simple but powerful: time is the ingredient compounding needs, so the sooner you act, the less it can hurt you."
        ],
        bullets: [
"Minimum payments are interest and barely reduce the principal.",
"Paying only the minimum can stretch a small balance over 15+ years.",
"Extra payments hit principal, shrinking the base interest compounds on.",
"Paying in full each month means interest never compounds at all.",
"Attack the highest-rate debt first to stop the worst compounding."
        ],
        realWorldExample: "On a $2,000 balance at 24% APR, paying the $50 minimum takes over 15 years and costs about $2,500 in interest. Paying $200 a month clears it in roughly 11 months for a few hundred dollars in interest - same debt, wildly different outcome."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit6-mc1",
            question: "How does compound interest behave on debt?",
            options: [
"It quietly shrinks your outstanding balance all on its own",
"It charges interest on your interest, growing the debt",
"It only ever applies to savings and investment accounts",
"It slowly removes all the fees and charges over time"
            ],
            correctAnswer: 1,
            explanation: "On debt, compounding adds interest to interest, so an unpaid balance grows faster over time - the opposite of how it helps savings."
          },
          {
            id: "credit6-mc2",
            question: "Why do minimum payments keep you in debt so long?",
            options: [
"They go toward paying off the principal balance first",
"Most of the payment goes to interest, not principal",
"They wipe out all the accrued interest right away",
"They quietly double your available credit limit each month"
            ],
            correctAnswer: 1,
            explanation: "A minimum payment is mostly interest and barely touches the principal, so the balance shrinks very slowly and compounding keeps working against you."
          }
        ]
      },
      {
        type: "scenario",
        title: "Andre's Snowballing Balance",
        narrative: "Andre, 22, has a $2,400 credit-card balance at 25% APR. He's been paying just the $60 minimum each month and can't understand why the balance barely moves. He decides to run the numbers and change his approach.",
        details: [
"At the $60 minimum, most of Andre's payment goes to interest, not the principal.",
"At 25% APR, the balance compounds daily, so it grows a little every day it sits.",
"Paying only the minimum could take well over a decade and cost more than the original balance.",
"Bumping his payment to $250 a month would clear the debt in about a year and slash interest."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit6-aq1",
          question: "Why does paying $250 a month instead of the $60 minimum save Andre so much?",
          options: [
"It lowers the card's APR to zero even for careful users",
"Extra payments cut the principal, shrinking future interest",
"It cancels the debt legally after a year",
"The bank forgives balances over $200 a month"
          ],
          correctAnswer: 1,
          explanation: "Payments above the minimum reduce the principal, which lowers the base that interest compounds on. That shrinks each future month's interest, clearing the debt far faster."
        }
      },
      {
        type: "recap",
        takeaways: [
"On debt, compounding charges interest on interest, growing what you owe.",
"Credit cards compound daily, so balances grow every day.",
"Minimum payments are interest and keep you in debt for years.",
"Extra payments hit the principal and stop future compounding.",
"Paying in full each month means interest never compounds at all."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit6-mastery1",
            question: "What makes compound interest dangerous on debt?",
            options: [
"It lowers your balance each month",
"You pay interest on your interest",
"It only applies once per decade",
"It replaces your minimum payment in the fine print"
            ],
            correctAnswer: 1,
            explanation: "Compounding on debt means you're charged interest on the interest that already accumulated, so an unpaid balance grows faster and faster."
          },
          {
            id: "credit6-mastery2",
            question: "How often do most credit cards compound interest?",
            options: [
"Once a year",
"Daily",
"Once every five years",
"Never"
            ],
            correctAnswer: 1,
            explanation: "Most credit cards compound daily, so a carried balance grows a little every single day it goes unpaid."
          },
          {
            id: "credit6-mastery3",
            question: "Where does most of a minimum payment go?",
            options: [
"Toward reducing the principal",
"Toward interest, not principal",
"Into your savings account",
"Back into your credit limit"
            ],
            correctAnswer: 1,
            explanation: "A minimum payment is mostly interest, so it barely reduces the principal. That's why balances shrink so slowly when you pay only the minimum."
          },
          {
            id: "credit6-mastery4",
            question: "What does paying extra above the minimum do?",
            options: [
"It slowly raises your interest rate as a penalty",
"It reduces the principal and future interest",
"It has no real effect on the balance at all",
"It cancels all the rewards you have earned"
            ],
            correctAnswer: 1,
            explanation: "Extra payments go straight to the principal, shrinking the base interest compounds on and cutting the total interest you'll pay."
          },
          {
            id: "credit6-mastery5",
            question: "How do you keep card interest from compounding at all?",
            options: [
"Pay the statement balance in full monthly",
"Pay only the minimum every month year after year",
"Take a cash advance each month",
"Close the account and reopen it"
            ],
            correctAnswer: 0,
            explanation: "If you pay the full statement balance each month, no balance carries over, so there's nothing for interest to compound on."
          },
          {
            id: "credit6-mastery6",
            question: "If you carry several debts, which should you attack first?",
            options: [
"The one with the lowest balance always",
"The one with the highest interest rate",
"The newest account you opened for everyday consumers",
"The one with the longest term"
            ],
            correctAnswer: 1,
            explanation: "To stop the worst compounding, put extra money toward the highest-rate debt first while paying minimums on the rest - it saves the most interest."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-7: Student Loans
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-7",
    sections: [
      {
        type: "concept",
        title: "Borrowing for an Education",
        paragraphs: [
          "A student loan is money borrowed to pay for college or trade school, repaid with interest after you leave school. Unlike a car, an education can't be repossessed, so lenders rely on your promise to repay - which is why these loans have special rules and, sometimes, special dangers. The big divide is between federal loans, made by the U.S. government, and private loans, made by banks and other lenders. Federal loans generally come first because they carry stronger protections and usually lower, fixed rates.",
          "Within federal loans, there are subsidized and unsubsidized versions. On a subsidized loan (for students with financial need), the government pays the interest while you're in school, so your balance doesn't grow until after you graduate. On an unsubsidized loan, interest starts adding up immediately, even while you're still studying, so the balance you owe at graduation is larger than what you borrowed. Choosing subsidized loans first, when you qualify, keeps your debt from quietly growing during your college years.",
          "The amount you borrow matters more than it feels like at 18. A common rule of thumb is to keep your total student debt below what you expect to earn in your first year of work, so the payments stay manageable. Borrowing $80,000 for a career that starts at $35,000 can mean a decade of tight budgets. The degree can be worth it, but only if the debt is sized to the income it's likely to produce."
        ],
        bullets: [
"A student loan funds education and is repaid with interest after school.",
"Federal loans beat private ones for rates and protections.",
"Subsidized loans: the government pays interest while you're in school.",
"Unsubsidized loans accrue interest immediately, growing the balance.",
"Try to keep total debt below your expected first-year salary."
        ],
        realWorldExample: "Two students each borrow $10,000. One takes a subsidized loan, so no interest builds during four years of school. The other takes unsubsidized, and by graduation owes about $12,000 - the extra $2,000 is interest that accrued while they were still in class."
      },
      {
        type: "concept",
        title: "Repayment, Grace Periods, and Staying Out of Trouble",
        paragraphs: [
          "After you graduate or drop below half-time, federal loans usually give you a grace period - often six months - before payments begin. That window lets you find a job and set up a budget, but interest may still accrue on unsubsidized loans during it. When repayment starts, the standard plan spreads payments over ten years. Federal loans also offer income-driven repayment plans that cap your monthly payment at a percentage of your income, which can be a lifeline if your salary starts low.",
          "The scariest words in student loans are delinquency and default. A loan is delinquent the day after you miss a payment; if you go long enough without paying (270 days for most federal loans), it goes into default. Default is severe: your credit is damaged, the entire balance can become due at once, and the government can garnish wages or seize tax refunds. The good news is that federal loans offer deferment and forbearance - ways to pause or reduce payments during hardship - so there's rarely a reason to let a loan default.",
          "Private loans are less forgiving. They often have variable interest rates that can climb, fewer hardship options, and no income-driven plans. That's why the smart order is federal first, private only as a last resort. Also beware of anyone charging fees to 'help' with federal loans - the government's own tools are free. Finally, some careers offer loan forgiveness (like Public Service Loan Forgiveness after ten years of qualifying payments in public-sector jobs), which can dramatically change the math for teachers, nurses, and public servants. Because these rules can shift over time, it pays to check the official federal student aid site rather than rely on rumors, and to keep records of every payment you make so you can prove your progress toward any forgiveness you qualify for. Good records today protect the benefits you have earned tomorrow."
        ],
        bullets: [
"Federal loans offer a ~6-month grace period after school.",
"Income-driven plans cap federal payments at a share of your income.",
"Default (270+ days late on federal loans) wrecks credit and can garnish wages.",
"Deferment and forbearance can pause payments during hardship.",
"Private loans have fewer protections; forgiveness programs exist for some careers."
        ],
        realWorldExample: "A new teacher earning $38,000 with $30,000 in federal loans switches to an income-driven plan, cutting her payment to a manageable amount. After ten years in public schools, Public Service Loan Forgiveness could erase her remaining balance entirely."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit7-mc1",
            question: "What's the difference between subsidized and unsubsidized federal loans?",
            options: [
"Subsidized loans are gifts that never have to be repaid at all",
"On subsidized loans, the government pays interest during school",
"Unsubsidized loans are always completely interest-free for students",
"There is honestly no real difference between the two loan types"
            ],
            correctAnswer: 1,
            explanation: "On subsidized loans, the government covers interest while you're enrolled, so the balance doesn't grow. Unsubsidized loans accrue interest from the start."
          },
          {
            id: "credit7-mc2",
            question: "What is a grace period on a federal student loan?",
            options: [
"A stretch of time when the loan is fully forgiven for you",
"A window after school before payments start, about six months",
"A period during which interest can never accrue on the loan",
"The exact calendar day the loan money is first issued to you"
            ],
            correctAnswer: 1,
            explanation: "A grace period, often around six months after you leave school, gives you time before repayment starts. Interest may still accrue on unsubsidized loans during it."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maria Plans Her Loan Repayment",
        narrative: "Maria graduates with $28,000 in federal student loans and lands a job paying $40,000. She's nervous about the payments and wants to avoid ever defaulting. She reviews her repayment options during her grace period.",
        details: [
"Maria has about six months of grace period before her first payment is due.",
"The standard 10-year plan gives a fixed monthly payment she can budget for.",
"An income-driven plan could lower her payment if money gets tight early on.",
"If she ever faces hardship, deferment or forbearance can pause payments and prevent default."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit7-aq1",
          question: "If Maria loses her job and can't pay, what should she do FIRST?",
          options: [
"Stop paying and ignore the loan servicer",
"Contact her servicer about deferment or forbearance",
"Immediately take out a private loan to cover it",
"Let the loan go into default to reset it"
          ],
          correctAnswer: 1,
          explanation: "Federal loans offer deferment and forbearance to pause payments during hardship. Contacting the servicer prevents delinquency and default, which would damage her credit."
        }
      },
      {
        type: "recap",
        takeaways: [
"Student loans fund education and are repaid with interest after school.",
"Federal loans beat private ones on rates and protections.",
"Subsidized loans don't accrue interest in school; unsubsidized ones do.",
"Default (270+ days late) wrecks credit and can garnish wages.",
"Deferment, forbearance, and income-driven plans help you avoid default."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit7-mastery1",
            question: "Why are federal student loans usually preferred over private ones?",
            options: [
"They are always completely free for every student",
"They offer better rates and stronger protections",
"They never charge any interest to the borrower",
"They can only ever be repaid using physical cash"
            ],
            correctAnswer: 1,
            explanation: "Federal loans typically have fixed, lower rates and protections like income-driven repayment, deferment, and forbearance that private loans often lack."
          },
          {
            id: "credit7-mastery2",
            question: "On an unsubsidized loan, when does interest start accruing?",
            options: [
"Only after you have finished and graduated",
"Immediately, even while you're in school",
"Never at all, as long as you stay enrolled",
"A full ten years after you first borrow it"
            ],
            correctAnswer: 1,
            explanation: "Unsubsidized loans accrue interest from the moment they're disbursed, so the balance grows while you're still studying."
          },
          {
            id: "credit7-mastery3",
            question: "What happens when a federal loan goes into default?",
            options: [
"The balance is quietly and automatically forgiven",
"Credit is damaged and wages can be garnished",
"Your interest rate suddenly drops all the way to zero",
"Nothing much changes at all for the average borrower"
            ],
            correctAnswer: 1,
            explanation: "Default (usually 270+ days late) severely damages credit, can make the full balance due, and lets the government garnish wages or seize tax refunds."
          },
          {
            id: "credit7-mastery4",
            question: "What does an income-driven repayment plan do?",
            options: [
"Forgives the whole loan after just one year",
"Caps your payment at a share of income",
"Raises your monthly payment steadily every month under the current rules",
"Converts the federal loan into a private loan"
            ],
            correctAnswer: 1,
            explanation: "Income-driven plans set your federal loan payment based on a percentage of your income, keeping payments manageable when your salary is low."
          },
          {
            id: "credit7-mastery5",
            question: "What's a good rule of thumb for how much to borrow?",
            options: [
"Borrow as much as the school will offer you",
"Keep total debt below your first-year salary",
"Borrow roughly double your expected starting salary",
"There is no borrowing limit worth considering"
            ],
            correctAnswer: 1,
            explanation: "Keeping total student debt under your expected first-year income helps keep payments manageable so the debt doesn't overwhelm your early career."
          },
          {
            id: "credit7-mastery6",
            question: "What can deferment or forbearance do during hardship?",
            options: [
"Permanently erase the entire loan",
"Temporarily pause or reduce your payments",
"Increase your interest rate as a penalty",
"Report you as in default immediately"
            ],
            correctAnswer: 1,
            explanation: "Deferment and forbearance let you temporarily pause or reduce federal loan payments during hardship, helping you avoid delinquency and default."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-9: Auto Loans
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-9",
    sections: [
      {
        type: "concept",
        title: "Financing a Car Without Getting Taken",
        paragraphs: [
          "An auto loan is an installment loan used to buy a vehicle, repaid in fixed monthly payments over a set term. The car itself is the collateral: because the loan is secured by the vehicle, if you stop paying, the lender can repossess it. That security is why auto loans usually have lower rates than credit cards. The four numbers that define your loan are the price, the down payment, the APR (interest rate), and the term (length in months). Change any one and the whole deal shifts.",
          "The most common trap is focusing only on the monthly payment. A salesperson can hit almost any monthly number you want by stretching the term - 72 or even 84 months. But a longer term means you pay far more interest overall, even if each payment feels smaller. On a $25,000 loan at 8%, a 48-month term might cost around $4,300 in total interest, while a 72-month term costs around $6,500 - over $2,000 more for the identical car, just for stretching it out.",
          "A down payment protects you. Cars depreciate fast - a new car can lose 20% of its value the moment you drive off the lot. If you borrow the full price with no money down, you can quickly owe more than the car is worth, a situation called being 'upside-down' or 'underwater.' A solid down payment (often 10-20%) keeps your loan balance closer to the car's real value, so you're not trapped if you need to sell. It also lowers your monthly payment and total interest."
        ],
        bullets: [
"An auto loan is secured by the car, which can be repossessed if you don't pay.",
"The deal is defined by price, down payment, APR, and term.",
"Longer terms lower the monthly payment but raise total interest sharply.",
"Cars depreciate fast, so a small down payment can leave you underwater.",
"A 10-20% down payment cuts interest and protects your equity."
        ],
        realWorldExample: "On a $25,000 car at 8% APR, a 48-month loan costs about $4,300 in total interest, while a 72-month loan costs about $6,500. The longer term drops the monthly payment by roughly $150 but adds more than $2,000 to the price of the car."
      },
      {
        type: "concept",
        title: "Getting the Best Deal Before You Sign",
        paragraphs: [
          "Smart buyers get pre-approved for financing at their own bank or credit union before visiting a dealer. Pre-approval tells you the rate you actually qualify for, so when the dealer offers financing, you can compare and pick the cheaper one. Dealers sometimes mark up the interest rate to earn extra profit, so having your own offer in hand is real leverage. Negotiate the car's price and the financing separately - bundling them lets the dealer hide a bad rate inside a 'good' monthly payment.",
          "Watch for add-ons that inflate the loan. In the finance office you'll be pitched extended warranties, gap insurance, paint protection, and other extras, often rolled into the loan so you pay interest on them for years. Some, like gap insurance (which covers the difference if the car is totaled while you're underwater), can be worth it; many are pure profit. Decide on extras with a clear head, and remember that rolling them into the loan means paying interest on them the whole term.",
          "Your credit score directly sets your APR, so it pays to know it before shopping. A buyer with a 760 score might get 6%, while a 620 score pays 15% on the same car - thousands of dollars apart over the loan. If your credit is weak, even a few months of on-time payments and lower card balances before buying can move you into a better rate tier. And never buy more car than you need: a reliable used car with a short loan beats a flashy new one that keeps you in debt for six years. Remember that a car is a depreciating asset, not an investment, so the goal is dependable transportation at the lowest total cost, not the biggest monthly payment you can technically afford."
        ],
        bullets: [
"Get pre-approved at your bank so you can compare the dealer's rate.",
"Negotiate the car price and the financing separately.",
"Beware add-ons rolled into the loan that you pay interest on for years.",
"Your credit score sets your APR; a better score saves thousands.",
"Buy only as much car as you need with as short a term as you can afford."
        ],
        realWorldExample: "A buyer walks in pre-approved at 6% from her credit union. The dealer offers 9% financing, but because she has her own offer, she uses the 6% instead - saving roughly $1,500 over a five-year, $22,000 loan without changing anything about the car."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit9-mc1",
            question: "What is the collateral on an auto loan?",
            options: [
"Your house when the bill arrives",
"The car itself",
"Your paycheck",
"Your credit card"
            ],
            correctAnswer: 1,
            explanation: "The car secures the loan, so it's the collateral. If you stop paying, the lender can repossess the vehicle to recover its money."
          },
          {
            id: "credit9-mc2",
            question: "What's the downside of choosing a longer loan term?",
            options: [
"The monthly payment goes up according to most experts",
"You pay more total interest over the loan",
"The car depreciates faster in nearly all cases",
"Your own credit score drops instantly when you look closely"
            ],
            correctAnswer: 1,
            explanation: "A longer term lowers the monthly payment but stretches interest over more years, so you pay far more in total for the same car."
          }
        ]
      },
      {
        type: "scenario",
        title: "Kevin at the Dealership",
        narrative: "Kevin, 20, wants a used car priced at $18,000. His credit union pre-approved him at 7% APR. At the dealer, the salesperson pushes a 75-month loan with a low monthly payment and dealer financing at 10%, plus a $2,000 extended warranty rolled into the loan.",
        details: [
"Kevin already has a 7% pre-approval, lower than the dealer's 10% offer.",
"The 75-month term makes the monthly payment look small but adds lots of interest.",
"The $2,000 warranty would be financed too, so he'd pay interest on it for years.",
"A larger down payment and shorter term would cut both his interest and his risk of going underwater."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit9-aq1",
          question: "Which move saves Kevin the most money on his car?",
          options: [
"Take the dealer's 10% financing for convenience if you check carefully",
"Use his 7% pre-approval and a shorter term",
"Choose the 75-month loan to lower payments",
"Roll the warranty in to spread the cost"
          ],
          correctAnswer: 1,
          explanation: "Using his lower 7% pre-approval and a shorter term cuts total interest the most. The dealer's higher rate, longer term, and financed warranty all add cost."
        }
      },
      {
        type: "recap",
        takeaways: [
"An auto loan is secured by the car, which can be repossessed.",
"Longer terms lower monthly payments but raise total interest.",
"A down payment protects you from going underwater as the car depreciates.",
"Get pre-approved to compare and beat the dealer's rate.",
"Your credit score sets your APR; beware add-ons rolled into the loan."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit9-mastery1",
            question: "Why do auto loans usually have lower rates than credit cards?",
            options: [
"Because cars are cheaper than shopping over the long run",
"Because the car secures the loan as collateral",
"Because the government pays part of the rate",
"Because dealers give everyone the same rate"
            ],
            correctAnswer: 1,
            explanation: "An auto loan is secured by the vehicle, so the lender can repossess it if you default. That lower risk usually means a lower interest rate than unsecured credit cards."
          },
          {
            id: "credit9-mastery2",
            question: "What does being 'upside-down' on a car loan mean?",
            options: [
"You owe more than the car is worth",
"You paid the loan off early for the typical borrower",
"The car is worth more than you owe",
"You never made a down payment errorlessly"
            ],
            correctAnswer: 0,
            explanation: "Being upside-down (underwater) means your loan balance is larger than the car's value, which can happen fast when a car depreciates and you put little down."
          },
          {
            id: "credit9-mastery3",
            question: "Why get pre-approved for a car loan before visiting a dealer?",
            options: [
"It forces the dealer to lower the price based on the numbers",
"It lets you compare and beat the dealer's rate",
"It removes the need for a down payment",
"It guarantees zero percent financing in real-world practice"
            ],
            correctAnswer: 1,
            explanation: "Pre-approval shows the rate you truly qualify for, so you can compare it against the dealer's offer and choose whichever is cheaper - real negotiating leverage."
          },
          {
            id: "credit9-mastery4",
            question: "How does a longer loan term affect total interest?",
            options: [
"It lowers total interest paid",
"It raises total interest paid",
"It has no effect on interest",
"It erases interest after a year"
            ],
            correctAnswer: 1,
            explanation: "A longer term spreads interest over more months, so even with a smaller monthly payment you pay more total interest over the life of the loan."
          },
          {
            id: "credit9-mastery5",
            question: "What mostly determines the APR you're offered on a car loan?",
            options: [
"The color of the car",
"Your credit score",
"The dealer's mood that day",
"The car's top speed"
            ],
            correctAnswer: 1,
            explanation: "Your credit score is the main driver of your APR. A higher score earns a lower rate, which can save thousands over the life of the loan."
          },
          {
            id: "credit9-mastery6",
            question: "Why be cautious about add-ons rolled into the loan?",
            options: [
"They are always required by law",
"You pay interest on them for years",
"They lower your monthly payment once you add it up",
"They improve your credit score"
            ],
            correctAnswer: 1,
            explanation: "Rolling extras like warranties into the loan means you finance them, paying interest on those add-ons over the full term - so decide on them carefully."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-10: Snowball vs Avalanche
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-10",
    sections: [
      {
        type: "concept",
        title: "Two Proven Ways to Kill Debt",
        paragraphs: [
          "When you owe several debts at once, the order you pay them off makes a big difference. Both popular strategies start the same way: pay the minimum on every debt so nothing goes delinquent, then throw all your extra money at one target debt. The difference is which debt you target first. The debt avalanche targets the highest interest rate first, while the debt snowball targets the smallest balance first. Both work; they just optimize for different things - one for math, one for motivation.",
          "The avalanche method is mathematically optimal. By attacking the highest-APR debt first, you kill the debt that's growing fastest, so you pay the least total interest and get out of debt soonest. Say you owe $500 at 26%, $3,000 at 22%, and $1,000 at 12%. Avalanche pays off the 26% card first, then the 22%, then the 12%. If you're driven by numbers and can stay disciplined without quick wins, avalanche saves you the most money overall.",
          "The snowball method is psychologically powerful. By knocking out the smallest balance first, you get a fast, satisfying win, then roll that freed-up payment into the next-smallest debt - the 'snowball' grows as it rolls. In the same example, snowball pays the $500 first, then the $1,000, then the $3,000, regardless of rates. You might pay a bit more interest than avalanche, but the early victories keep many people motivated enough to actually finish. The best method is the one you'll stick with. Debt payoff is as much about behavior as arithmetic, and a plan you abandon halfway saves nothing at all."
        ],
        bullets: [
"Both methods pay minimums on all debts, then attack one target debt.",
"Avalanche targets the highest interest rate first to save the most money.",
"Snowball targets the smallest balance first for fast motivating wins.",
"Avalanche is mathematically optimal; snowball is psychologically easier.",
"The best strategy is the one you'll actually stick with to the end."
        ],
        realWorldExample: "With debts of $500 at 26%, $1,000 at 12%, and $3,000 at 22%, avalanche pays the 26% card first (least total interest). Snowball pays the $500 card first for a quick win, then the $1,000, then the $3,000 - slightly more interest, but momentum that keeps you going."
      },
      {
        type: "concept",
        title: "Choosing and Sticking With a Plan",
        paragraphs: [
          "To choose between them, be honest about yourself. If you're the type who's motivated by spreadsheets and wants the cheapest path, avalanche is your method - just make sure you won't get discouraged if the first target takes a while. If you need to see progress to stay committed, snowball's early wins can be the difference between finishing and giving up. Studies of real people finding that quick wins boost follow-through are exactly why the snowball remains popular despite costing a little more interest.",
          "Whichever you pick, the mechanics are the same and matter a lot. List every debt with its balance, minimum payment, and interest rate. Always pay every minimum on time to avoid late fees and credit damage. Then send every spare dollar to your single target debt. When that debt is gone, roll its entire payment - minimum plus extra - onto the next target. This rolling effect is what accelerates payoff, whether the debts are ordered by rate or by size.",
          "A few habits supercharge either method. First, stop adding new debt while you pay off the old, or you're bailing a boat with a hole in it. Second, look for extra money to throw at the target: a side gig, a canceled subscription, or a tax refund. Third, consider whether a balance transfer or lower-rate consolidation loan could cut your interest while you execute the plan. The strategy is the map, but consistency is the engine - showing up every month is what actually gets you to zero. It also helps to track your shrinking balances somewhere visible, like a chart on the fridge or a simple app, so you can see the finish line getting closer and stay motivated through the long middle stretch."
        ],
        bullets: [
"Pick avalanche if numbers motivate you; snowball if wins motivate you.",
"List every debt's balance, minimum, and rate before you start.",
"Roll each paid-off debt's full payment onto the next target.",
"Stop adding new debt while you're paying off the old.",
"Find extra money and consider consolidation to speed things up."
        ],
        realWorldExample: "Dana lists four debts, pays all minimums, and puts $300 extra toward her target. When the first is gone, that $300 plus its old minimum - say $350 total - rolls to the next debt, then grows again for the third. The payment snowballs bigger with each payoff."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit10-mc1",
            question: "Which debt does the avalanche method target first?",
            options: [
"The smallest balance",
"The highest interest rate",
"The newest debt",
"The one with the longest term"
            ],
            correctAnswer: 1,
            explanation: "Avalanche attacks the highest-interest debt first, which minimizes total interest paid and is the mathematically optimal approach."
          },
          {
            id: "credit10-mc2",
            question: "Why do many people prefer the snowball method?",
            options: [
"It always costs the least interest",
"Early wins keep them motivated to continue",
"It requires no minimum payments despite the marketing",
"It's the only legal method even for careful users"
            ],
            correctAnswer: 1,
            explanation: "Snowball pays the smallest balance first, giving quick wins that build momentum and help people stay committed enough to finish paying off their debt."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia Picks a Payoff Plan",
        narrative: "Sofia, 24, has three debts: a $600 store card at 27% APR, a $4,000 credit card at 20% APR, and a $1,500 personal loan at 11% APR. She has $250 extra per month to attack her debt and wants to choose a strategy she'll actually follow.",
        details: [
"Avalanche would target the $600 store card first because it has the highest rate at 27%.",
"Snowball would also target the $600 card first here, since it's both smallest and highest-rate.",
"The methods diverge next: avalanche hits the $4,000 card at 20%, snowball hits the $1,500 loan.",
"Sofia pays all minimums on time and sends her $250 extra to a single target each month."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit10-aq1",
          question: "After the $600 card, which debt does the avalanche method target next?",
          options: [
"The $1,500 loan at 11%",
"The $4,000 card at 20%",
"Whichever has the smallest balance",
"None - she stops paying extra"
          ],
          correctAnswer: 1,
          explanation: "Avalanche always goes to the highest remaining rate. After the 27% card, the 20% card outranks the 11% loan, so the $4,000 card is next - saving the most interest."
        }
      },
      {
        type: "recap",
        takeaways: [
"Both methods pay all minimums, then attack one target debt with extra cash.",
"Avalanche targets the highest interest rate and saves the most money.",
"Snowball targets the smallest balance for motivating quick wins.",
"Roll each paid-off payment onto the next debt to accelerate payoff.",
"The best method is the one you'll consistently stick with."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit10-mastery1",
            question: "What do the snowball and avalanche methods have in common?",
            options: [
"Both ignore minimum payments in the fine print",
"Both pay minimums, then attack one target debt",
"Both target the newest debt first year after year",
"Both forgive part of your debt for everyday consumers"
            ],
            correctAnswer: 1,
            explanation: "Both strategies pay the minimum on every debt to stay current, then focus all extra money on a single target debt. They differ only in which debt is the target."
          },
          {
            id: "credit10-mastery2",
            question: "Which method minimizes total interest paid?",
            options: [
"The snowball method",
"The avalanche method",
"Neither method saves interest",
"Both save the exact same amount"
            ],
            correctAnswer: 1,
            explanation: "The avalanche method targets the highest interest rate first, killing the fastest-growing debt and minimizing the total interest you pay."
          },
          {
            id: "credit10-mastery3",
            question: "What's the main advantage of the snowball method?",
            options: [
"It always ends debt fastest under the current rules",
"Quick wins boost motivation to continue",
"It removes all interest charges",
"It requires no extra payments"
            ],
            correctAnswer: 1,
            explanation: "Snowball's early payoffs of small balances create satisfying wins that build momentum, helping many people stay motivated enough to finish."
          },
          {
            id: "credit10-mastery4",
            question: "What does 'rolling' a payment mean in these methods?",
            options: [
"Skipping a payment now and then in nearly all cases",
"Adding a paid-off debt's payment to the next target",
"Splitting extra cash evenly across all debts according to most experts",
"Refinancing every debt at once when the bill arrives"
            ],
            correctAnswer: 1,
            explanation: "When one debt is paid off, its entire payment rolls onto the next target debt, growing the amount attacking it - which accelerates the whole payoff."
          },
          {
            id: "credit10-mastery5",
            question: "Which habit supports either payoff method?",
            options: [
"Adding new debt as you go over the long run",
"Not taking on new debt while paying off old",
"Paying only some minimums when you look closely",
"Ignoring the interest rates entirely if you check carefully"
            ],
            correctAnswer: 1,
            explanation: "Avoiding new debt while you pay off the old keeps you from undoing your progress - otherwise you're bailing a boat that still has a hole in it."
          },
          {
            id: "credit10-mastery6",
            question: "How should you choose between the two methods?",
            options: [
"Always pick avalanche no matter what for the typical borrower",
"Pick the one you'll actually stick with",
"Pick whichever has a longer name",
"Flip a coin every single month"
            ],
            correctAnswer: 1,
            explanation: "Avalanche saves the most math-wise, but the best method is the one you'll consistently follow. Consistency matters more than shaving off a little interest."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-11: Getting Out of Debt: Counseling & Negotiation
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-11",
    sections: [
      {
        type: "concept",
        title: "You Have Options Long Before Bankruptcy",
        paragraphs: [
          "When debt grows faster than you can pay it, it can feel hopeless - but real help exists long before bankruptcy. The first warning sign is a rising debt-to-income ratio: the share of your monthly income eating up debt payments. When more than about a third of your income goes to debt, or you're only making minimum payments, it's time to act rather than wait. The earlier you reach out, the more options you have and the more damage you avoid.",
          "A strong first move is credit counseling from a nonprofit agency, ideally a member of the NFCC (National Foundation for Credit Counseling). A legitimate counselor reviews your whole budget, often for free or a small fee, and may set up a Debt Management Plan (DMP). Under a DMP, you make one monthly payment to the agency, which distributes it to your creditors - frequently at reduced interest rates the agency negotiates on your behalf. Instead of juggling five bills, you make one, often at a lower rate.",
          "You can also negotiate directly with creditors yourself. Many have hardship programs, and some will accept a lump-sum settlement for less than the full balance, especially on debt that's already past due. Just get any agreement in writing before you pay. The key is knowing your options: hardship plans, DMPs, and settlements are all ways to make debt manageable while treating creditors fairly - and they beat ignoring the problem until it spirals. Creditors would rather collect something than nothing, so many are surprisingly willing to work with a borrower who reaches out honestly and early instead of going silent. A calm, polite phone call explaining your situation often opens doors that avoiding the problem never will."
        ],
        bullets: [
"A rising debt-to-income ratio is the early warning sign to act.",
"Nonprofit credit counseling (look for NFCC members) reviews your budget.",
"A Debt Management Plan combines debts into one payment, at lower rates.",
"You can negotiate hardship plans or settlements directly with creditors.",
"Get any agreement in writing before you pay anything."
        ],
        realWorldExample: "Someone juggling five maxed cards at 24% can call a nonprofit counselor, get the rates dropped into single digits through a DMP, and make one manageable payment instead of five - all without paying a predatory company a quarter of their debt."
      },
      {
        type: "concept",
        title: "Spotting Debt-Relief Scams",
        paragraphs: [
          "Not every 'debt relief' offer is on your side. Predatory for-profit debt settlement companies advertise heavily and often charge huge fees - sometimes 15% to 25% of your total debt. Many tell you to stop paying your bills so they can 'negotiate,' but that tanks your credit, piles on late fees, and can even lead to lawsuits while you wait. You may pay them thousands and end up worse off. The contrast with nonprofit counseling is stark: one helps you repay responsibly, the other profits from your desperation.",
          "Learn to spot the red flags. Be wary of any company that guarantees it can erase your debt, demands large upfront fees before doing anything, tells you to cut off contact with your creditors, or pressures you to decide immediately. Legitimate nonprofit counselors won't promise miracles, won't charge steep upfront fees, and will explain the downsides honestly. If an offer sounds too good to be true - 'settle your debt for pennies!' - it almost certainly is.",
          "Protect yourself by checking credentials before signing anything. Look for NFCC membership or accreditation, read reviews, and confirm fees in writing. You can research a company through your state attorney general or the Consumer Financial Protection Bureau. And remember: for federal student loans, government repayment and forgiveness tools are free, so never pay a company for help you can get for nothing. A little verification up front can save you thousands and keep your credit from being wrecked by the very people claiming to help. When in doubt, slow down: a real counselor will never rush you into signing today."
        ],
        bullets: [
"For-profit debt settlement firms may charge 15%-25% of your debt in fees.",
"Telling you to stop paying bills damages credit and invites lawsuits.",
"Red flags: guarantees, big upfront fees, and pressure to decide fast.",
"Verify NFCC membership and check the CFPB or state attorney general.",
"Federal student-loan help is free; never pay a company for it."
        ],
        realWorldExample: "A firm promises to 'settle' a $10,000 debt and charges $2,500 in fees while telling the borrower to stop paying. Months later the borrower has late marks, collection calls, and a lawsuit - and still owes most of the debt. A nonprofit DMP would have cost almost nothing."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit11-mc1",
            question: "What is a Debt Management Plan (DMP)?",
            options: [
"A single loan that instantly erases all of your debt at once",
"One monthly payment to an agency that repays your creditors",
"A way to legally avoid paying anything you owe at all",
"A type of high-limit rewards credit card for big spenders"
            ],
            correctAnswer: 1,
            explanation: "A DMP, usually set up by a nonprofit counselor, consolidates your payments into one monthly amount and often secures lower interest rates from creditors."
          },
          {
            id: "credit11-mc2",
            question: "Which is a red flag of a debt-relief scam?",
            options: [
"Reviewing your budget for free even for careful users",
"Demanding a large upfront fee and guaranteeing results",
"Explaining the downsides honestly despite the marketing",
"Being a member of the NFCC in the fine print"
            ],
            correctAnswer: 1,
            explanation: "Big upfront fees and guarantees to erase debt are classic scam signs. Legitimate nonprofit counselors don't promise miracles or charge steep fees before helping."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aaliyah's $12,000 Decision",
        narrative: "Aaliyah, 23, has $12,000 in credit-card debt at 24% APR and can barely cover the minimums. A flashy online 'debt relief' company promises to make her debt disappear for a fee. Instead, she calls a nonprofit credit counselor recommended by the NFCC.",
        details: [
"The nonprofit counselor reviews Aaliyah's budget and negotiates her rate from 24% down to about 8%.",
"She's enrolled in a Debt Management Plan with a single payment of about $240 a month.",
"The for-profit company would have charged roughly 25% of her debt - about $3,000 - in fees.",
"That company also would have told her to stop paying, damaging her credit during the process."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit11-aq1",
          question: "Why was the nonprofit counselor a better choice than the for-profit company?",
          options: [
"The nonprofit was slower to work but far more famous year after year",
"It cut her rate and avoided huge fees and credit damage",
"The for-profit company would have done the whole thing for free",
"There is honestly no meaningful difference between the two options"
          ],
          correctAnswer: 1,
          explanation: "The nonprofit cut her interest and built a workable DMP at low cost. The for-profit firm would have charged about $3,000 and hurt her credit by telling her to stop paying."
        }
      },
      {
        type: "recap",
        takeaways: [
"A rising debt-to-income ratio is the signal to seek help early.",
"Nonprofit credit counseling (NFCC members) is a trustworthy first step.",
"A Debt Management Plan combines payments and lowers rates.",
"You can negotiate hardship plans or settlements directly with creditors.",
"Avoid for-profit scams with big fees that damage your credit."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit11-mastery1",
            question: "What should you do first when debt feels unmanageable?",
            options: [
"Ignore the bills until collectors call under the current rules",
"Seek help early, like nonprofit credit counseling",
"File for bankruptcy immediately for everyday consumers",
"Take out a new high-interest loan"
            ],
            correctAnswer: 1,
            explanation: "Acting early through nonprofit credit counseling gives you the most options. Ignoring the problem or jumping to bankruptcy or new debt tends to make things worse."
          },
          {
            id: "credit11-mastery2",
            question: "What does NFCC stand for?",
            options: [
"National Foundation for Credit Counseling",
"New Finance Credit Card Company",
"National Federal Cash Center when the bill arrives",
"Nonprofit Federal Credit Card"
            ],
            correctAnswer: 0,
            explanation: "NFCC is the National Foundation for Credit Counseling. Choosing a member agency signals a reputable nonprofit counselor rather than a predatory firm."
          },
          {
            id: "credit11-mastery3",
            question: "How do payments work under a Debt Management Plan?",
            options: [
"You yourself stop paying creditors entirely according to most experts",
"You make one monthly payment to the agency",
"Creditors forgive all debt instantly in nearly all cases",
"You yourself pay each creditor twice"
            ],
            correctAnswer: 1,
            explanation: "A DMP consolidates your debts into a single monthly payment to the counseling agency, which pays your creditors - frequently at reduced interest rates."
          },
          {
            id: "credit11-mastery4",
            question: "Why is being told to 'stop paying your bills' a warning sign?",
            options: [
"It always lowers your interest rate if you check carefully",
"It damages your credit and can invite lawsuits",
"It is required for every DMP",
"It instantly erases your debt when you look closely"
            ],
            correctAnswer: 1,
            explanation: "Stopping payments piles on late fees, tanks your credit, and can lead to lawsuits. Predatory settlement firms do this while charging big fees - a major red flag."
          },
          {
            id: "credit11-mastery5",
            question: "How can you verify a debt-relief company is legitimate?",
            options: [
"Trust whatever their ad promises over the long run",
"Check NFCC membership and the CFPB",
"Pay the fee first, then research",
"Assume all such firms are safe"
            ],
            correctAnswer: 1,
            explanation: "Verify accreditation like NFCC membership and research the company through the CFPB or your state attorney general before signing or paying anything."
          },
          {
            id: "credit11-mastery6",
            question: "For federal student-loan help, what should you know about fees?",
            options: [
"Government repayment tools are free",
"You must pay a company to access them",
"Only lawyers can request them",
"They cost a flat $500 fee"
            ],
            correctAnswer: 0,
            explanation: "Federal student-loan repayment and forgiveness tools are free through the government, so you should never pay a company for help you can get at no cost."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-12: Bankruptcy: Last Resort or Fresh Start?
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-12",
    sections: [
      {
        type: "concept",
        title: "A Legal Reset With a Real Cost",
        paragraphs: [
          "Bankruptcy is a legal process for people who truly cannot repay their debts. It offers a fresh start, but it comes with serious, long-lasting consequences, which is why it's usually a last resort. The two most common types for individuals are Chapter 7 and Chapter 13. Chapter 7 is 'liquidation': most unsecured debts, like credit cards and medical bills, are wiped out. In exchange, a court-appointed trustee may sell some of your non-exempt assets to pay creditors, and the filing stays on your credit report for ten years.",
          "Chapter 13 is a 'reorganization.' Instead of wiping debts immediately, you follow a court-approved repayment plan over three to five years, paying back part of what you owe from your income. When you complete the plan, remaining eligible debts are discharged, and it stays on your credit report for seven years. Chapter 13 often lets people keep assets - like a home or car - that Chapter 7 might force them to sell, which is why those with steady income and property they want to protect frequently choose it.",
          "Bankruptcy can't erase everything. Generally, student loans, child support, alimony, and most recent taxes survive bankruptcy and still must be paid. There's also a required credit-counseling step before filing and a means test that checks your income to see which chapter you qualify for. Florida has a notably strong homestead exemption that can protect the equity in your primary home from creditors. Bankruptcy is powerful, but because it hammers your credit for years, it's meant for when there's genuinely no other path."
        ],
        bullets: [
"Chapter 7 = liquidation: most debts wiped, some assets sold, stays 10 years.",
"Chapter 13 = a 3-5 year repayment plan, stays 7 years, keeps assets.",
"Student loans, child support, alimony, and recent taxes can't be discharged.",
"A means test and credit counseling are required before filing.",
"Florida's homestead exemption can protect your primary home's equity."
        ],
        realWorldExample: "After bankruptcy, getting approved for an apartment or car loan is harder for years, and any rates offered are higher. That's why people try counseling and Debt Management Plans first, reserving bankruptcy for when there's truly no other way out."
      },
      {
        type: "concept",
        title: "Life After Filing - and When It Makes Sense",
        paragraphs: [
          "Filing for bankruptcy is not the end of your financial life, but it does reshape it. The moment you file, an 'automatic stay' kicks in, legally stopping most collection calls, lawsuits, wage garnishments, and foreclosure actions - a real relief for someone drowning in creditor pressure. That breathing room is one of bankruptcy's genuine benefits. But the trade-off is steep: the filing damages your credit sharply and lingers for years, making borrowing expensive and sometimes limiting housing or job options.",
          "Rebuilding starts sooner than many expect. Even with a bankruptcy on record, people often qualify for a secured credit card within months and can rebuild by paying it on time and keeping balances low. Over a few years of disciplined habits, scores climb back up, and the bankruptcy's impact fades even before it drops off the report. The fresh start is real - the debts that overwhelmed you are gone, and you can build again on a clean foundation.",
          "The honest question is whether bankruptcy is the right tool. It makes sense when your debts are so large that no realistic repayment plan works, when you face garnishment or foreclosure you can't stop otherwise, or when the debts are the dischargeable kind (like credit cards) rather than student loans. It's the wrong tool if a Debt Management Plan or negotiation could handle the debt, or if most of what you owe can't be discharged anyway. Talking to a nonprofit counselor - and often a bankruptcy attorney - before deciding helps you weigh a faster reset against years of credit damage. Bankruptcy is a serious legal step, so gather your full list of debts and income first, and treat it as the tool of last resort it is meant to be. Used at the right moment, though, it really can offer a genuine fresh start."
        ],
        bullets: [
"Filing triggers an automatic stay that halts most collections and garnishment.",
"Bankruptcy sharply damages credit but doesn't end your financial life.",
"You can rebuild with a secured card within months of filing.",
"It fits when no realistic repayment plan can handle the debt.",
"It's the wrong tool if a DMP works or the debts can't be discharged."
        ],
        realWorldExample: "A single parent facing wage garnishment on $40,000 of credit-card debt files Chapter 7. The automatic stay stops the garnishment immediately, the cards are discharged, and within a year they're rebuilding with a secured card and on-time payments."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit12-mc1",
            question: "What is the main difference between Chapter 7 and Chapter 13?",
            options: [
"Chapter 7 wipes most debts; Chapter 13 is a repayment plan",
"Chapter 7 is only for businesses while Chapter 13 is strictly for teenagers",
"They are exactly the same legal process with no real differences at all",
"Chapter 13 erases every debt with no repayment required whatsoever"
            ],
            correctAnswer: 0,
            explanation: "Chapter 7 is liquidation - most debts wiped, some assets may be sold. Chapter 13 is a court-approved repayment plan over three to five years."
          },
          {
            id: "credit12-mc2",
            question: "Which debt generally CANNOT be discharged in bankruptcy?",
            options: [
"Credit card balances",
"Student loans and child support",
"Medical bills once you add it up",
"Personal loans despite the marketing"
            ],
            correctAnswer: 1,
            explanation: "Student loans, child support, alimony, and most recent taxes usually survive bankruptcy. Credit cards and medical bills are typically dischargeable."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Paths Out of Deep Debt",
        narrative: "Two people are both drowning in debt. One files for Chapter 7 bankruptcy. The other works with a nonprofit credit counselor and enters a Debt Management Plan. Five years later, their financial lives look quite different.",
        details: [
"The Chapter 7 filer had most debts wiped quickly but carries a bankruptcy on their report for 10 years.",
"The DMP user repaid their debts over several years and avoided any bankruptcy mark.",
"The Chapter 7 filer faced higher rates and tougher approvals while rebuilding credit.",
"Both got relief, but the DMP user's credit recovered faster while the filer got faster upfront relief."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit12-aq1",
          question: "Why might someone choose a DMP over Chapter 7 even though bankruptcy wipes debt faster?",
          options: [
"DMPs are required by law before you can get any debt relief",
"A DMP avoids the long-lasting credit damage of bankruptcy",
"Bankruptcy is completely illegal in the state of Florida",
"DMPs can quickly erase all of your student loans"
          ],
          correctAnswer: 1,
          explanation: "Chapter 7 gives faster relief but leaves a bankruptcy on your report for ten years. A DMP avoids that mark, letting credit recover sooner - a key trade-off."
        }
      },
      {
        type: "recap",
        takeaways: [
"Chapter 7 wipes most debts but may sell assets and stays on credit 10 years.",
"Chapter 13 is a 3-5 year repayment plan and stays on credit 7 years.",
"Student loans, child support, alimony, and recent taxes can't be discharged.",
"Filing triggers an automatic stay that halts most collections.",
"Bankruptcy is a last resort but can offer a genuine fresh start."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit12-mastery1",
            question: "Which best describes Chapter 7 bankruptcy?",
            options: [
"A 3-5 year court repayment plan for everyday consumers",
"Liquidation: most debts wiped, some assets may be sold",
"A way to refinance your mortgage under the current rules",
"A type of nonprofit credit counseling when the bill arrives"
            ],
            correctAnswer: 1,
            explanation: "Chapter 7 is liquidation - most unsecured debts are discharged, and a trustee may sell certain non-exempt assets to pay creditors."
          },
          {
            id: "credit12-mastery2",
            question: "How long does a Chapter 7 bankruptcy stay on your credit report?",
            options: [
"1 year",
"10 years",
"3 years",
"6 months"
            ],
            correctAnswer: 1,
            explanation: "Chapter 7 stays on your credit report for ten years. Chapter 13 stays for seven years, since it involves partial repayment."
          },
          {
            id: "credit12-mastery3",
            question: "What does the automatic stay do when you file?",
            options: [
"It erases your student loans in nearly all cases",
"It halts most collections and garnishment",
"It doubles your interest rates",
"It sells your home immediately"
            ],
            correctAnswer: 1,
            explanation: "Filing triggers an automatic stay that legally stops most collection calls, lawsuits, wage garnishment, and foreclosure - giving immediate breathing room."
          },
          {
            id: "credit12-mastery4",
            question: "What does Florida's homestead exemption do in bankruptcy?",
            options: [
"It forces you to sell your home",
"It can protect your primary home's equity",
"It eliminates your mortgage balance according to most experts",
"It applies only to vacation homes"
            ],
            correctAnswer: 1,
            explanation: "Florida's strong homestead exemption can shield the equity in your primary residence from creditors during bankruptcy."
          },
          {
            id: "credit12-mastery5",
            question: "Which situation best fits filing for bankruptcy?",
            options: [
"A small debt a DMP could handle if you check carefully",
"Debts too large for any realistic repayment plan",
"Mostly student loans that can't be discharged",
"A late credit-card payment when you look closely"
            ],
            correctAnswer: 1,
            explanation: "Bankruptcy fits when debts are so large no realistic plan works. It's the wrong tool if a DMP could manage it or if the debts can't be discharged anyway."
          },
          {
            id: "credit12-mastery6",
            question: "Can you rebuild credit after bankruptcy?",
            options: [
"No, your credit is ruined forever over the long run",
"Yes, with a secured card in months",
"Only after waiting the full ten years",
"No, borrowing is banned for life"
            ],
            correctAnswer: 1,
            explanation: "Rebuilding often starts within months, frequently with a secured card. With on-time payments and low balances, scores climb back well before the filing drops off."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-13: Mortgages: Buying a Home
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-13",
    sections: [
      {
        type: "concept",
        title: "The Journey From Renter to Owner",
        paragraphs: [
          "Buying a home is a multi-step journey, and understanding each stage keeps you from costly surprises. It usually starts with getting pre-approved: a lender checks your income, credit, and debts and tells you how much they'll lend, so you shop in a realistic range. Then you make an offer, and once it's accepted, the home is inspected (to find hidden problems) and appraised (to confirm it's worth the price). Finally comes closing, where you sign the paperwork, pay closing costs, and get the keys. Skipping steps, like waiving an inspection, can hide expensive defects.",
          "A mortgage is the loan that makes this possible, and the house is its collateral through a lien. Because the lender can foreclose if you stop paying, they care a lot about the down payment - the cash you put in upfront, usually 3% to 20% of the price. A bigger down payment shrinks your loan, lowers your monthly payment, and helps you avoid PMI (Private Mortgage Insurance), an extra monthly fee lenders charge when your down payment is under 20%. That PMI protects the lender, not you, so avoiding it saves real money.",
          "Your monthly payment is more than just the loan. The shorthand is PITI: Principal (the loan balance), Interest (the lender's charge), Taxes (property taxes to your city), and Insurance (homeowners insurance). Taxes and insurance are often collected into an escrow account and paid for you. Beyond PITI, budget for maintenance and repairs - a rule of thumb is about 1% of the home's value each year. A house can build wealth through equity, but only if you can comfortably carry the full cost, not just the loan."
        ],
        bullets: [
"The path: pre-approval, offer, inspection, appraisal, then closing.",
"A mortgage is secured by the home via a lien; missing payments risks foreclosure.",
"Down payments run 3%-20%; under 20% triggers PMI.",
"PITI = Principal + Interest + Taxes + Insurance, with escrow.",
"Budget for maintenance too - roughly 1% of the home's value yearly."
        ],
        realWorldExample: "On a $315,000 home, putting 20% down ($63,000) avoids PMI entirely. Putting just 5% down means borrowing more AND paying PMI - often $100 to $250 extra every month - until your equity reaches 20%. Same house, very different monthly cost."
      },
      {
        type: "concept",
        title: "Fixed vs. Adjustable, and the Cost of the Term",
        paragraphs: [
          "Mortgages come in different rate structures, and the choice shapes your risk. A fixed-rate mortgage locks your interest rate for the entire loan, so your principal-and-interest payment never changes - predictable and safe. An adjustable-rate mortgage (ARM) starts with a lower rate for a few years, then adjusts up or down with the market. An ARM can save money if rates fall, but if rates rise, your payment can jump by hundreds of dollars. Most first-time buyers pick fixed-rate loans precisely to avoid surprises on their biggest bill.",
          "The term - how many years you take to repay - has a huge effect on total cost. A 30-year loan has low monthly payments but stretches interest across three decades, so the total is enormous. A 15-year loan has higher monthly payments but saves a fortune in interest. Mortgages are also 'amortized,' meaning early payments are mostly interest and barely reduce the balance; on a new 30-year loan, your first payment might be 80% interest. That's why equity builds slowly at first and faster later.",
          "Two more concepts round out the picture. 'Points' are optional upfront fees you can pay to buy down your interest rate - useful if you'll keep the home a long time. And 'refinancing' means replacing your mortgage with a new one, often to grab a lower rate later; it can save money but has its own closing costs. Whatever you choose, the golden rule is affordability: many advisors suggest keeping your total housing payment under about 28% of your gross income, so the home enriches your life instead of straining it. Stretching past that line is how buyers end up 'house poor,' owning a home but with no money left for anything else."
        ],
        bullets: [
"Fixed-rate = the same payment for the whole loan; ARM can rise later.",
"30-year loans have lower payments but far more total interest than 15-year loans.",
"Amortization front-loads interest, so early equity builds slowly.",
"Points are upfront fees to lower your rate; refinancing swaps in a new loan.",
"Aim to keep housing costs under about 28% of your gross income."
        ],
        realWorldExample: "A $240,000 loan at 7%: a 30-year term runs about $1,600 a month and roughly $335,000 in total interest. A 15-year term is about $2,160 a month but only about $148,000 in interest - paying more monthly saves nearly $190,000 over the loan."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit13-mc1",
            question: "What does PITI stand for in a mortgage payment?",
            options: [
"Payment, Interest, Time, Income",
"Principal, Interest, Taxes, Insurance",
"Property, Income, Tax, Investment",
"Principal, Insurance, Total, Interest"
            ],
            correctAnswer: 1,
            explanation: "PITI = Principal, Interest, Taxes, and Insurance - the four components bundled into a typical monthly mortgage payment."
          },
          {
            id: "credit13-mc2",
            question: "What's the main difference between a fixed-rate mortgage and an ARM?",
            options: [
"Fixed-rate changes monthly; an ARM never changes in real-world practice",
"Fixed-rate stays steady; an ARM can rise or fall later",
"ARMs always cost less over the whole loan based on the numbers",
"There is no real difference for the typical borrower"
            ],
            correctAnswer: 1,
            explanation: "A fixed-rate loan keeps the same payment for the life of the loan, while an ARM starts lower but can adjust up or down with the market, adding risk."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Rodriguezes Buy in Hialeah",
        narrative: "The Rodriguez family is buying their first home in Hialeah for $320,000. They get pre-approved, make an offer, have the home inspected and appraised, and reach closing. They understand their monthly PITI payment but want to know what could go wrong if money gets tight.",
        details: [
"They get pre-approved before house hunting, so they shop within a realistic budget.",
"Their monthly payment bundles principal, interest, property taxes, and homeowners insurance (PITI).",
"Because their down payment is under 20%, their payment also includes PMI for now.",
"If they missed several payments, the lender could begin the foreclosure process on the home."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit13-aq1",
          question: "What happens if the Rodriguezes miss several mortgage payments?",
          options: [
"Nothing, since the home is already theirs",
"The lender can begin foreclosure",
"Their interest rate automatically drops",
"The city forgives their property taxes"
          ],
          correctAnswer: 1,
          explanation: "Because the home secures the mortgage through a lien, missing enough payments can trigger foreclosure, where the lender takes the home to recover the loan."
        }
      },
      {
        type: "recap",
        takeaways: [
"The buying path runs pre-approval, offer, inspection, appraisal, closing.",
"A mortgage is secured by the home; missing payments risks foreclosure.",
"A down payment under 20% means paying PMI.",
"PITI bundles principal, interest, taxes, and insurance into one payment.",
"Fixed rates are steady; 15-year terms cost far less interest than 30-year."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit13-mastery1",
            question: "What is PMI and when do you usually need it?",
            options: [
"A tax paid yearly on every home despite the marketing",
"Private Mortgage Insurance, required when you put under 20% down",
"A type of property tax on land even for careful users",
"Insurance only against hurricanes once you add it up"
            ],
            correctAnswer: 1,
            explanation: "PMI (Private Mortgage Insurance) is an extra monthly cost lenders require when your down payment is under 20%, protecting the lender if you default."
          },
          {
            id: "credit13-mastery2",
            question: "Why does a 15-year mortgage cost far less overall than a 30-year one?",
            options: [
"The government subsidizes shorter loans",
"You pay interest for fewer years",
"Short loans are capped at 2% by law",
"Banks waive principal on 15-year loans"
            ],
            correctAnswer: 1,
            explanation: "Fewer years of interest means far less total interest, even though the monthly payment is higher. The savings come purely from paying over less time."
          },
          {
            id: "credit13-mastery3",
            question: "On a brand-new 30-year mortgage, most of your first payment goes to…",
            options: [
"Interest, because the loan is amortized",
"Principal, shrinking the balance fast in the fine print",
"Property taxes for the whole year",
"The down payment on the home"
            ],
            correctAnswer: 0,
            explanation: "Amortization front-loads interest: early on, most of each payment is interest and little reduces the balance, which is why equity builds slowly at first."
          },
          {
            id: "credit13-mastery4",
            question: "Why get pre-approved before house hunting?",
            options: [
"It removes all your closing costs year after year",
"It tells you the price range you can afford",
"It locks a 0% rate for life for everyday consumers",
"It erases the need for a down payment"
            ],
            correctAnswer: 1,
            explanation: "Pre-approval shows how much a lender will actually lend, so you shop in a realistic range. It doesn't erase closing costs or the down payment."
          },
          {
            id: "credit13-mastery5",
            question: "What is the consequence of repeatedly missing mortgage payments?",
            options: [
"Your own loan is automatically forgiven",
"The lender can foreclose and take the home",
"Your own property taxes disappear under the current rules",
"Nothing happens for 30 years when the bill arrives"
            ],
            correctAnswer: 1,
            explanation: "Because the home is collateral, missing payments can lead to foreclosure, where the lender repossesses and sells the home to recover the loan."
          },
          {
            id: "credit13-mastery6",
            question: "Why should you budget for more than just the PITI payment?",
            options: [
"Homes never need any repairs in nearly all cases",
"Maintenance runs roughly 1% of value yearly",
"The bank pays for all upkeep",
"Repairs are always covered by PMI"
            ],
            correctAnswer: 1,
            explanation: "Owning means paying for maintenance and repairs - a rule of thumb is about 1% of the home's value each year - on top of your PITI payment."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-14: Your Rights as a Credit User
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-14",
    sections: [
      {
        type: "concept",
        title: "The Laws That Have Your Back",
        paragraphs: [
          "When you borrow money or use credit, federal laws protect you from being cheated or harassed. The Truth in Lending Act (TILA) requires lenders to clearly disclose the full cost of credit, including the APR (annual percentage rate) and total finance charges, so you can compare offers honestly instead of being tricked by hidden fees. This is why every loan and credit card must show its APR in plain language - without it, lenders could bury the real cost until the bills piled up.",
          "The Equal Credit Opportunity Act (ECOA) makes it illegal for lenders to discriminate based on race, color, religion, national origin, sex, marital status, or age. Your creditworthiness - not who you are - must drive lending decisions. The Fair Credit Billing Act (FCBA) lets you dispute billing errors and fraudulent charges on your credit card, capping your liability for unauthorized charges at $50 (and often $0 in practice). Together these laws mean you can shop for credit fairly and challenge mistakes without being stuck with them.",
          "The Fair Debt Collection Practices Act (FDCPA) governs how third-party debt collectors can behave. They can't call at unreasonable hours (like before 8 a.m. or after 9 p.m.), use threats or profanity, lie about what you owe, or harass you with constant calls. You also have the right to demand, in writing, that a collector stop contacting you, and to request written verification of a debt you don't recognize. Knowing these rules turns you from an easy target into an informed consumer who can push back."
        ],
        bullets: [
"TILA requires lenders to disclose the full cost of credit, including the APR.",
"ECOA bans discrimination by race, sex, religion, age, and more in lending.",
"The FCBA lets you dispute billing errors and caps fraud liability at $50.",
"The FDCPA stops collectors from calling at odd hours, threatening, or lying.",
"You can demand in writing that a collector stop contacting you."
        ],
        realWorldExample: "A card's fine print hides a 29% APR, but TILA forces it to be disclosed clearly, so you spot it and pick a better card. Meanwhile, if a thief runs up $2,000 on your stolen card, the FCBA caps your loss at $50 - and most issuers charge you nothing at all."
      },
      {
        type: "concept",
        title: "Enforcing Your Rights",
        paragraphs: [
          "Rights only help if you use them. The Consumer Financial Protection Bureau (CFPB) is a federal agency that oversees banks, lenders, and collectors, and you can file complaints there for free. The Federal Trade Commission (FTC) also handles reports about scams and unfair practices. If a debt collector breaks the rules - say, threatening you over a debt you don't even owe - you can send a written cease-and-desist letter demanding they stop, and you can report them. Keeping records of calls and letters strengthens any complaint you make.",
          "For disputes, there's a process. If you spot a wrong charge on your credit card, the FCBA gives you the right to dispute it in writing, usually within 60 days of the statement, and the issuer must investigate. If a debt collector contacts you about a debt you don't recognize, you can send a 'debt validation' request within 30 days, and they must prove the debt is yours before continuing to collect. These aren't favors - they're legal rights that shift the burden of proof onto the lender or collector.",
          "Watch for predatory lending, which these laws are designed to fight. Red flags include payday loans with triple-digit APRs, 'no credit check' loans that trap you in rollovers, and lenders who hide fees or pressure you to sign fast. If something feels designed to trap rather than help, it probably is. Being an informed borrower - reading the APR, knowing your dispute rights, and recognizing which agency to contact - is your best protection. The law is on your side, but you have to know it exists to use it. Keeping a simple folder of statements, letters, and call notes turns a vague complaint into solid evidence that regulators can actually act on. Documentation is quietly one of the most powerful tools a consumer has."
        ],
        bullets: [
"The CFPB and FTC take free complaints about lenders and collectors.",
"A written cease-and-desist can stop a collector's contact.",
"You can dispute card billing errors in writing, within 60 days.",
"A debt-validation request forces a collector to prove a debt is yours.",
"Watch for predatory lending: triple-digit APRs and hidden fees."
        ],
        realWorldExample: "A payday lender offers a $300 loan due in two weeks with a $45 fee - an APR near 400%. Knowing that's predatory, you avoid it. If a collector later harasses you over a debt that isn't yours, you file a free CFPB complaint and send a validation request."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit14-mc1",
            question: "What does the Truth in Lending Act (TILA) require?",
            options: [
"That lenders give everyone the same rate if you check carefully",
"That lenders clearly disclose the full cost of credit and APR",
"That all loans be interest-free according to most experts everywhere",
"That debt collectors can call anytime, day or night, when they want"
            ],
            correctAnswer: 1,
            explanation: "TILA requires lenders to disclose the true cost of borrowing, especially the APR, so consumers can compare offers fairly."
          },
          {
            id: "credit14-mc2",
            question: "Under the FDCPA, which action is a debt collector NOT allowed to do?",
            options: [
"Send you a letter about a debt",
"Call at 3 a.m. and threaten you",
"Verify the amount you owe over the long run",
"Offer you a payment plan"
            ],
            correctAnswer: 1,
            explanation: "The FDCPA prohibits calling at unreasonable hours, threats, lies, and harassment. Sending letters and offering payment plans are allowed."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon and the Late-Night Calls",
        narrative: "Devon keeps getting calls from a debt collector - sometimes late at night - claiming he owes $800 on an account he never opened. The collector is aggressive and threatening. Devon decides to learn his rights instead of panicking.",
        details: [
"The collector calls repeatedly after 9 p.m. and uses threatening language.",
"Devon never opened the account, so he doubts the debt is even his.",
"Under the FDCPA, the collector cannot harass, threaten, or lie about a debt.",
"Devon plans a written cease-and-desist and a debt-validation request, and can file a CFPB complaint."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit14-aq1",
          question: "Where can Devon file a complaint about an abusive debt collector?",
          options: [
"The local public library for the typical borrower",
"The CFPB (Consumer Financial Protection Bureau)",
"His cell phone provider",
"Nowhere - no agency handles this"
          ],
          correctAnswer: 1,
          explanation: "The CFPB handles complaints about lenders, banks, and collectors (the FTC also takes such reports). Devon can use these channels alongside a written cease-and-desist."
        }
      },
      {
        type: "recap",
        takeaways: [
"TILA forces lenders to disclose the full cost of credit, including APR.",
"ECOA bans discrimination in lending based on protected traits.",
"The FCBA lets you dispute billing errors and caps fraud liability.",
"The FDCPA limits how and when collectors can contact you.",
"The CFPB and FTC are where you report lenders and collectors."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit14-mastery1",
            question: "What must lenders disclose under the Truth in Lending Act?",
            options: [
"Their company's yearly profits in real-world practice",
"The cost of credit, including the APR",
"The names of their other borrowers",
"Nothing - disclosure is optional based on the numbers"
            ],
            correctAnswer: 1,
            explanation: "TILA requires lenders to clearly disclose the cost of borrowing, especially the APR, so you can compare offers honestly."
          },
          {
            id: "credit14-mastery2",
            question: "What does the Equal Credit Opportunity Act (ECOA) prohibit?",
            options: [
"Charging any interest at all once you add it up",
"Discriminating by race, sex, religion, or age",
"Offering credit cards to students despite the marketing",
"Disclosing the APR to borrowers"
            ],
            correctAnswer: 1,
            explanation: "ECOA makes it illegal to base lending decisions on protected traits; decisions must rest on your creditworthiness, not who you are."
          },
          {
            id: "credit14-mastery3",
            question: "Which behavior does the FDCPA prohibit for debt collectors?",
            options: [
"Sending a written notice of a debt",
"Calling at 3 a.m., threatening, or lying",
"Offering a repayment plan even for careful users",
"Verifying the debt amount owed in the fine print"
            ],
            correctAnswer: 1,
            explanation: "The FDCPA forbids calling at unreasonable hours, threats, lies, and harassment. Legitimate notices and payment-plan offers are allowed."
          },
          {
            id: "credit14-mastery4",
            question: "What does the Fair Credit Billing Act (FCBA) let you do?",
            options: [
"Cancel any loan without paying it",
"Dispute billing errors and cap fraud liability",
"Ignore your credit card statements year after year",
"Set your own interest rate for everyday consumers"
            ],
            correctAnswer: 1,
            explanation: "The FCBA lets you dispute billing errors and unauthorized charges, capping your liability for fraud at $50 - and often $0 in practice."
          },
          {
            id: "credit14-mastery5",
            question: "Which agency should you contact about a predatory lender or collector?",
            options: [
"The Department of Motor Vehicles",
"The CFPB (Consumer Financial Protection Bureau)",
"The local post office under the current rules",
"The neighborhood school board when the bill arrives"
            ],
            correctAnswer: 1,
            explanation: "The CFPB handles complaints about banks, lenders, and debt collectors. The FTC is another option for scams and unfair practices."
          },
          {
            id: "credit14-mastery6",
            question: "Which is a red flag of predatory lending?",
            options: [
"A clearly disclosed low APR in nearly all cases",
"A payday loan with a triple-digit APR",
"A written loan agreement to review",
"A lender who explains all the fees"
            ],
            correctAnswer: 1,
            explanation: "Payday loans with triple-digit APRs, hidden fees, and pressure to sign fast are classic predatory-lending red flags designed to trap borrowers."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-15: Your Free Annual Credit Report
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-15",
    sections: [
      {
        type: "concept",
        title: "The Free Report That Shapes Your Future",
        paragraphs: [
          "Federal law - the Fair Credit Reporting Act, or FCRA - gives every American free credit reports from each of the three major bureaus: Equifax, Experian, and TransUnion. The official site is AnnualCreditReport.com. This is different from the many 'free credit score' apps; the report is the detailed record lenders actually read, while a score is just a number derived from it. Checking your report costs nothing and is one of the smartest financial habits you can build.",
          "Your credit report lists several things: your personal info, your accounts and balances, your payment history (on-time or late), inquiries (who checked your credit), and public records like bankruptcies. Reading it teaches you exactly what lenders see. It's worth knowing that a soft inquiry (like checking your own credit) doesn't affect your score, while a hard inquiry (from applying for new credit) can ding it slightly. Understanding your report helps you spot both problems and progress.",
          "Errors are surprisingly common - an account that isn't yours, a payment marked late that you actually paid on time, or a debt you already settled still showing as owed. These mistakes can quietly lower your score, leading to higher interest rates or even denied credit. Checking regularly also catches identity theft early: if a stranger opened a card in your name, it'll show up here first. One review a year, spread across the three bureaus, can save you from expensive surprises."
        ],
        bullets: [
"The FCRA gives you free reports from all three major bureaus.",
"Get them at the official AnnualCreditReport.com, not 'free score' apps.",
"Reports show accounts, payment history, inquiries, and public records.",
"A soft inquiry doesn't hurt your score; a hard inquiry can ding it.",
"Checking regularly catches errors and identity theft early."
        ],
        realWorldExample: "A single wrongly reported collection can drop a score by 80+ points - enough to turn a low car-loan rate into a much higher one, costing thousands over the loan. Catching and disputing it restores both the score and the savings."
      },
      {
        type: "concept",
        title: "Disputing Errors and Freezing Your Credit",
        paragraphs: [
          "If you find an error, you have the right to dispute it, and the process favors you. You file a dispute with the credit bureau - online, by mail, or by phone - explaining what's wrong and including any proof. By law, the bureau must investigate, typically within about 30 days. If the information can't be verified, it must be corrected or removed. It's smart to dispute with all three bureaus if the error appears on each, and to keep copies of everything you send in case you need to follow up.",
          "For serious protection against identity theft, you can use a fraud alert or a credit freeze. A fraud alert tells lenders to take extra steps to verify your identity before opening new credit, and it's free to place. A credit freeze goes further, locking your report so no one - including a thief - can open new accounts in your name until you unfreeze it. Freezes are also free by law, and you can lift them temporarily when you actually want to apply for credit. These tools stop fraud before it starts.",
          "Building a habit around your report pays off for life. A good rhythm is to check one bureau's report every few months, rotating through all three across the year, so you're monitoring continuously at no cost. Look especially for accounts you don't recognize, addresses that aren't yours, and late marks you don't deserve. If you're about to apply for a big loan like a mortgage, pull all three at once to fix any errors first. A clean, accurate report is one of the cheapest ways to protect your borrowing power. Setting a recurring reminder on your phone every four months makes the habit automatic, so you catch problems while they are still small and easy to fix instead of discovering them at the worst possible moment. A few minutes three times a year is cheap insurance for your financial future."
        ],
        bullets: [
"Dispute errors with the bureau; it must investigate, within 30 days.",
"Unverifiable information must be corrected or removed.",
"A free fraud alert makes lenders verify your identity before opening credit.",
"A free credit freeze locks your report against new-account fraud.",
"Rotate through the three bureaus across the year to monitor for free."
        ],
        realWorldExample: "Before applying for a mortgage, Aisha pulls all three reports and finds a $1,200 medical collection that was actually paid. She disputes it with proof, the bureau removes it within a month, and her score rises enough to qualify for a better rate."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit15-mc1",
            question: "Where do you get your official free credit report?",
            options: [
"Any app advertising 'free credit scores'",
"AnnualCreditReport.com",
"Only at your local bank branch",
"You always have to pay for it"
            ],
            correctAnswer: 1,
            explanation: "AnnualCreditReport.com is the federally authorized site for your free reports. 'Free score' apps are different and aren't the official report lenders use."
          },
          {
            id: "credit15-mc2",
            question: "How long do bureaus generally have to investigate a dispute?",
            options: [
"About 30 days",
"Five full years",
"Just 24 hours",
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
        narrative: "Carlos, 19, checks his credit report for the first time at AnnualCreditReport.com. He's shocked to find a collection account from a medical bill he thought his insurance had covered two years ago. The unpaid item has dragged his score from 720 down to 640.",
        details: [
"Carlos finds a collection account he didn't know existed on his report.",
"The error pulled his score down from 720 to 640, a big drop.",
"He files a dispute with the bureau, explaining the bill should have been covered.",
"By law, the bureau must investigate, within about 30 days, and remove unverified items."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit15-aq1",
          question: "What should Carlos do about the erroneous collection account?",
          options: [
"Ignore it and hope it disappears according to most experts",
"File a dispute with the credit bureau",
"Pay the wrong amount right away",
"Open new accounts to offset it"
          ],
          correctAnswer: 1,
          explanation: "The right step is to dispute the error. The FCRA requires the bureau to investigate, usually within 30 days, and correct or remove information that can't be verified."
        }
      },
      {
        type: "recap",
        takeaways: [
"The FCRA gives you free reports from all three bureaus.",
"Use the official AnnualCreditReport.com, not 'free score' apps.",
"Reports show accounts, payment history, inquiries, and public records.",
"Dispute errors in writing; bureaus must investigate, within 30 days.",
"Free fraud alerts and credit freezes protect against identity theft."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit15-mastery1",
            question: "What is the official source for your free credit report?",
            options: [
"AnnualCreditReport.com",
"Any 'free credit score' app",
"A random search result page",
"Your employer's HR office"
            ],
            correctAnswer: 0,
            explanation: "AnnualCreditReport.com is the federally authorized site - the official source for your free reports from the three major bureaus."
          },
          {
            id: "credit15-mastery2",
            question: "Who are the three major credit bureaus?",
            options: [
"Equifax, Experian, and TransUnion",
"Visa, Mastercard, and Amex",
"The FDIC, SEC, and IRS",
"Chase, Wells Fargo, and Citi"
            ],
            correctAnswer: 0,
            explanation: "The three major bureaus that compile your credit reports are Equifax, Experian, and TransUnion."
          },
          {
            id: "credit15-mastery3",
            question: "By law, how long do bureaus generally have to investigate a dispute?",
            options: [
"About 30 days",
"A full 10 years",
"About one hour",
"They never must respond"
            ],
            correctAnswer: 0,
            explanation: "The FCRA generally requires a dispute investigation within about 30 days, after which unverifiable information must be corrected or removed."
          },
          {
            id: "credit15-mastery4",
            question: "Which is a common credit report error to watch for?",
            options: [
"Your name being spelled right",
"An account that isn't yours",
"An on-time payment listed correctly",
"A current balance that's accurate"
            ],
            correctAnswer: 1,
            explanation: "Common errors include accounts that don't belong to you and payments wrongly marked late - both can unfairly lower your score."
          },
          {
            id: "credit15-mastery5",
            question: "What does a credit freeze do?",
            options: [
"It raises your credit score fast",
"It locks your report against new-account fraud",
"It erases your payment history when you look closely",
"It charges a large yearly fee"
            ],
            correctAnswer: 1,
            explanation: "A credit freeze locks your report so no one can open new accounts in your name until you lift it. It's free by law and can be lifted temporarily."
          },
          {
            id: "credit15-mastery6",
            question: "Does checking your own credit report hurt your score?",
            options: [
"Yes, it drops it every time if you check carefully",
"No, it's a soft inquiry with no effect",
"Yes, but only once a year over the long run",
"Only if you check three bureaus"
            ],
            correctAnswer: 1,
            explanation: "Checking your own report is a soft inquiry that never affects your score. Only hard inquiries from applying for new credit can ding it slightly."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-16: Paying for College: FAFSA, Grants & Loans
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-16",
    sections: [
      {
        type: "concept",
        title: "Free Money First: The Smart Order",
        paragraphs: [
          "There's a smart order for funding college, and it starts with money you never repay. First come scholarships and grants (including Florida's Bright Futures), then work-study, then federal loans (subsidized before unsubsidized), then Parent PLUS loans, and finally - as a last resort - private loans. Following this hierarchy can save tens of thousands of dollars over a lifetime. The core idea is to exhaust every dollar of free and low-cost money before touching anything that has to be repaid with interest.",
          "It all begins with the FAFSA (Free Application for Federal Student Aid). Filing the FAFSA unlocks federal grants, loans, and work-study, and colleges use it to build your aid package. It's free to file, yet many families skip it, leaving money on the table. Florida's state aid deadline is often earlier than the federal one, so filing early matters - some aid runs out on a first-come basis. The FAFSA also calculates a number (the SAI, formerly the EFC) that estimates what your family can contribute, which drives your need-based aid.",
          "Know the difference between funding types. A grant is need-based free money; a scholarship is usually merit-based free money; and a loan must be repaid with interest. Work-study is a part-time job, tied to your aid, that helps you earn money for school. The goal is to maximize free money and minimize loans, especially private ones. A student who chases scholarships and files the FAFSA early can graduate with a fraction of the debt of a peer who leaned on private loans for the same degree."
        ],
        bullets: [
"Funding order: scholarships/grants → work-study → federal loans → PLUS → private.",
"The FAFSA unlocks federal grants, loans, and work-study - file it early.",
"Florida's state aid deadline is earlier than the federal one.",
"Grants are need-based; scholarships are merit-based; loans are repaid.",
"Maximize free money and minimize loans, especially private ones."
        ],
        realWorldExample: "Two students attend the same Florida university. One files the FAFSA early, wins Bright Futures plus grants, and graduates with $8,000 in loans. The other skips scholarships and leans on private loans, graduating with $60,000 in debt - same degree, very different start."
      },
      {
        type: "concept",
        title: "Bright Futures and Choosing Loans Wisely",
        paragraphs: [
          "Florida's Bright Futures scholarship rewards strong students. The top Academic Scholars award generally requires around a 3.5 weighted GPA, specific coursework and test scores, and 100 community service hours; the Medallion Scholars tier requires around a 3.0 GPA and 75 hours. These awards can cover a large share of tuition at Florida public colleges, which is why building the GPA, test scores, and service hours during high school pays off directly in dollars. Missing the community-service requirement is a common, avoidable way students lose the award.",
          "When you do need to borrow, choose federal loans before private ones, and subsidized before unsubsidized. On a subsidized loan (for students with financial need), the government pays the interest while you're in school, so the balance doesn't grow until after you graduate. On an unsubsidized loan, interest accrues from day one, so you owe more at graduation than you borrowed. Federal loans also carry protections private loans lack: fixed rates, income-driven repayment, deferment, forbearance, and sometimes forgiveness.",
          "Private loans are the last resort for good reasons. They often have variable interest rates that can climb, require a co-signer, and offer few hardship options if you lose income. Before signing any loan, think about the payoff: a rough rule is to keep total borrowing under your expected first-year salary so payments stay manageable. And review your award letter carefully - separate the grants and scholarships (free) from the loans (repaid), so you know your true out-of-pocket cost rather than just the headline 'aid' number. Colleges sometimes list loans alongside grants under one big 'aid' total, which can make an expensive school look cheaper than it really is until you read the fine print. Always compare offers by the loans you would owe, not the total aid advertised."
        ],
        bullets: [
"Bright Futures Academic Scholars: ~3.5 GPA + 100 service hours; Medallion ~3.0 + 75.",
"Choose federal loans before private, and subsidized before unsubsidized.",
"Subsidized loans don't accrue interest in school; unsubsidized ones do.",
"Private loans have variable rates and few protections - a last resort.",
"Read the award letter to separate free money from loans you must repay."
        ],
        realWorldExample: "Priya keeps a 3.6 GPA and logs 100 service hours, earning Bright Futures Academic Scholars, which covers most of her tuition. She then takes only subsidized federal loans, so no interest builds while she studies - graduating with far less debt than classmates who used private loans."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit16-mc1",
            question: "Which type of college funding should you pursue FIRST?",
            options: [
"Private loans from a bank in real-world practice",
"Scholarships and grants you don't repay",
"Parent PLUS loans for the typical borrower",
"A credit card cash advance"
            ],
            correctAnswer: 1,
            explanation: "Always start with free money - scholarships and grants - before any loans, since that money never has to be repaid."
          },
          {
            id: "credit16-mc2",
            question: "What does filing the FAFSA do?",
            options: [
"Guarantees you a full-ride scholarship based on the numbers",
"Unlocks federal grants, loans, and work-study",
"Pays your tuition bill directly",
"Is only for graduate students"
            ],
            correctAnswer: 1,
            explanation: "The FAFSA is the gateway to federal aid - grants, loans, and work-study - and colleges use it to build your financial aid package."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya's Path to UF",
        narrative: "Priya, 17, in Boca Raton wants to attend the University of Florida. She maps her aid journey carefully: filing the FAFSA early, qualifying for Bright Futures, reviewing her award letter, and comparing loan options before borrowing anything.",
        details: [
"Priya submits the FAFSA early to beat Florida's earlier state deadline.",
"She qualifies for Bright Futures with her GPA and 100 community service hours.",
"Her award letter shows grants plus both subsidized and unsubsidized loan options.",
"She chooses subsidized loans first because the government pays their interest while she's in school."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit16-aq1",
          question: "Why should Priya prefer subsidized loans over unsubsidized when she can?",
          options: [
"Subsidized loans never have to be repaid",
"The government pays interest on subsidized loans in school",
"Unsubsidized loans are illegal in Florida once you add it up",
"Subsidized loans carry much higher rates despite the marketing"
          ],
          correctAnswer: 1,
          explanation: "With subsidized loans, the government covers interest while she's enrolled, so the balance doesn't grow. Unsubsidized loans accrue interest from day one."
        }
      },
      {
        type: "recap",
        takeaways: [
"Pursue funding in order: scholarships/grants → work-study → federal → PLUS → private.",
"The FAFSA unlocks federal aid - file it early for Florida's earlier deadline.",
"Bright Futures: Academic Scholars ~3.5 GPA + 100 hours; Medallion ~3.0 + 75.",
"Grants and scholarships are free; loans must be repaid with interest.",
"Choose federal over private loans and subsidized over unsubsidized."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit16-mastery1",
            question: "What is the correct order of importance for college funding?",
            options: [
"Private loans first, then grants even for careful users",
"Free money, then work-study and federal loans, private last",
"Credit cards before any scholarships in the fine print",
"Parent PLUS loans taken out well before any scholarships at all"
            ],
            correctAnswer: 1,
            explanation: "Start with free money, then work-study and federal loans, and use private loans only as a last resort - it minimizes what you repay with interest."
          },
          {
            id: "credit16-mastery2",
            question: "What do Bright Futures Academic Scholars generally need?",
            options: [
"No requirements at all for everyday consumers",
"About a 3.5 GPA plus 100 service hours",
"A perfect 4.0 and 1,000 service hours",
"Only Florida residency and nothing else under the current rules"
            ],
            correctAnswer: 1,
            explanation: "The top Academic Scholars award generally requires roughly a 3.5 weighted GPA, specific coursework and test scores, and 100 community service hours."
          },
          {
            id: "credit16-mastery3",
            question: "What's the difference between a subsidized and unsubsidized loan?",
            options: [
"Subsidized: the government pays interest in school",
"They are completely identical when the bill arrives",
"Unsubsidized loans are always free in nearly all cases",
"Subsidized loans charge double interest"
            ],
            correctAnswer: 0,
            explanation: "On subsidized loans the government covers interest while you're enrolled; unsubsidized loans accrue interest immediately, growing the balance."
          },
          {
            id: "credit16-mastery4",
            question: "What's the difference between a grant and a loan?",
            options: [
"A grant is repaid; a loan is free if you check carefully",
"A grant is free money; a loan is repaid with interest",
"They are truly exactly the same thing according to most experts",
"A loan is always a form of need-based aid you never repay"
            ],
            correctAnswer: 1,
            explanation: "A grant is free money you don't repay, usually need-based. A loan must be repaid with interest, so grants should always come first."
          },
          {
            id: "credit16-mastery5",
            question: "Why are private loans considered a last resort?",
            options: [
"They are always interest-free over the long run",
"They have higher rates and fewer protections",
"They are illegal for students",
"They never require repayment for the typical borrower"
            ],
            correctAnswer: 1,
            explanation: "Private loans usually carry higher, sometimes variable rates and lack federal protections like income-driven repayment, so use them only after free money and federal loans."
          },
          {
            id: "credit16-mastery6",
            question: "Why file the FAFSA early?",
            options: [
"Late filers get bonus scholarships in real-world practice",
"Some aid runs out on a first-come basis",
"It's only accepted in the summer once you add it up",
"It raises your GPA automatically based on the numbers"
            ],
            correctAnswer: 1,
            explanation: "Some aid, including Florida's, is limited and awarded first-come. Filing early, before the earlier state deadline, gives you the best shot at all available funds."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-17: How to Apply for a Loan
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-17",
    sections: [
      {
        type: "concept",
        title: "What Happens When You Ask a Lender for Money",
        paragraphs: [
          "When you apply for a loan, the lender is really answering one question: how likely are you to pay it back? To decide, they look at your credit score, your debt-to-income ratio (DTI), your income and employment, and - for secured loans - any collateral (like the car on an auto loan). DTI is your monthly debt payments divided by your gross monthly income; lenders generally like to see it under about 36%. A strong score and a low DTI make you look like a safe bet and earn you a lower rate.",
          "You'll need documents to prove your situation: recent pay stubs, tax returns, bank statements, and a photo ID. When the lender checks your credit, it's usually a 'hard inquiry,' which can lower your score by a few points (about five). That's different from a 'soft inquiry' - like checking your own score or getting pre-qualified - which doesn't affect your score at all. Because hard inquiries add up, it's smart not to apply for many loans at once.",
          "After reviewing everything, you'll get one of three outcomes: approval, conditional approval (approved if you provide more info or meet a condition), or denial. If you're denied, the lender must tell you why through an 'adverse action notice,' which can point you to what to fix. A useful trick: for the same loan type, like auto or mortgage, multiple inquiries within a short shopping window (often 14-45 days) usually count as one, so you can rate-shop without extra damage to your score."
        ],
        bullets: [
"Lenders weigh credit score, debt-to-income ratio, income, and collateral.",
"DTI = monthly debt payments ÷ gross monthly income; aim under ~36%.",
"A hard inquiry can lower your score ~5 points; a soft inquiry does not.",
"Common documents: pay stubs, tax returns, bank statements, and ID.",
"Rate-shopping the same loan type in a short window counts as one inquiry."
        ],
        realWorldExample: "Two applicants want the same loan. One has a 770 score and a 20% DTI; the other has a 630 score and a 45% DTI. The first is approved at a low rate, while the second is either denied or offered a much higher rate for the identical loan."
      },
      {
        type: "concept",
        title: "Reading the Terms Before You Sign",
        paragraphs: [
          "Getting approved is only half the job; the terms decide what the loan really costs. Focus on the APR (which bundles the interest rate plus certain fees), the term (how many months you'll pay), and any origination fees or prepayment penalties. A car loan is the most common first loan for young adults, and its term matters enormously. A longer term means smaller monthly payments but far more total interest, while a shorter term costs more per month but saves you money overall. Don't let a low monthly payment hide a high total cost.",
          "Watch for fees and traps buried in the fine print. An origination fee is charged just for making the loan and can be rolled into what you borrow. A prepayment penalty charges you for paying the loan off early - avoid loans that have one, since paying early should save you money, not cost it. Variable-rate loans can start low and climb, so know whether your rate is fixed. Reading the full agreement, not just the monthly payment line, is what separates a good borrower from one who gets surprised later.",
          "Finally, protect yourself before and during the process. Check your own credit first (a soft inquiry) so you know what to expect and can fix errors that might raise your rate. Get pre-qualified or pre-approved to compare real offers. Never borrow more than you need or can comfortably repay, and be wary of lenders who rush you, hide the APR, or push add-ons. A loan is a contract that can shape your budget for years, so it's worth slowing down to understand every number before you sign. If a lender won't give you time to read the agreement or answer plain questions about the cost, treat that as a warning sign and walk away."
        ],
        bullets: [
"Compare the APR, term, and any fees - not just the monthly payment.",
"Longer terms lower payments but raise total interest sharply.",
"Avoid prepayment penalties; know whether your rate is fixed or variable.",
"Check your own credit first to catch errors that could raise your rate.",
"Never borrow more than you need or can comfortably repay."
        ],
        realWorldExample: "On a $20,000 car loan, stretching from a 48-month to a 72-month term drops the payment by about $100 a month, but you pay over $2,000 more interest by the end. The 'affordable' monthly payment quietly costs thousands more."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit17-mc1",
            question: "What is a debt-to-income (DTI) ratio?",
            options: [
"Your own savings divided by your debt even for careful users",
"Your monthly debt payments divided by gross monthly income",
"Your own credit score times your income",
"The interest rate on your loan despite the marketing"
            ],
            correctAnswer: 1,
            explanation: "DTI is monthly debt payments ÷ gross monthly income. Lenders generally prefer it under about 36%, signaling you can handle more debt responsibly."
          },
          {
            id: "credit17-mc2",
            question: "How does a hard inquiry differ from a soft inquiry?",
            options: [
"A hard inquiry lowers your score; a soft one does not",
"They both raise your credit score by the same equal amount",
"A soft inquiry lowers your score; a hard one doesn't for everyday consumers",
"There is honestly no real difference between the two at all"
            ],
            correctAnswer: 0,
            explanation: "A hard inquiry (from actually applying) can drop your score by about five points. A soft inquiry (checking your own score or pre-qualifying) has no effect."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jasmine's First Car Loan",
        narrative: "Jasmine, 18, applies for a $12,000 auto loan for a used car. The lender reviews her credit, income, and DTI, then offers two options: a 72-month loan at 9% APR with a low monthly payment, or a 48-month loan at 6.5% APR with a higher monthly payment.",
        details: [
"The lender checks Jasmine's credit score, income, and debt-to-income ratio.",
"She provides pay stubs and her ID to verify her income.",
"Option A: 72 months at 9% APR - lower monthly payment, but more interest overall.",
"Option B: 48 months at 6.5% APR - higher monthly payment, but about $1,800 less total interest."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit17-aq1",
          question: "Why does the 48-month loan save Jasmine about $1,800 despite higher payments?",
          options: [
"Because shorter terms charge no interest under the current rules",
"Fewer months and a lower APR mean less total interest",
"Because longer loans are illegal for teens in nearly all cases",
"Because the lender waives all interest when the bill arrives"
          ],
          correctAnswer: 1,
          explanation: "The 48-month loan has both a lower APR and fewer months of interest, so even with higher monthly payments the total interest is far lower than the 72-month option."
        }
      },
      {
        type: "recap",
        takeaways: [
"Lenders weigh credit score, DTI, income, and collateral.",
"A hard inquiry dings your score slightly; a soft inquiry doesn't.",
"Outcomes are approval, conditional approval, or denial with a reason.",
"Compare APR, term, and fees - not just the monthly payment.",
"Longer terms lower payments but raise total interest sharply."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit17-mastery1",
            question: "What do lenders mainly try to figure out when you apply?",
            options: [
"How much you like their bank",
"How likely you are to repay the loan",
"Which car color you prefer according to most experts",
"How many friends you have when you look closely"
            ],
            correctAnswer: 1,
            explanation: "Every loan decision comes down to repayment risk. Lenders use your score, DTI, income, and collateral to gauge how likely you are to pay it back."
          },
          {
            id: "credit17-mastery2",
            question: "What DTI do lenders generally like to see?",
            options: [
"Under about 36%",
"Over 80% is ideal",
"Exactly 100%",
"It doesn't matter to lenders"
            ],
            correctAnswer: 0,
            explanation: "Lenders generally prefer a debt-to-income ratio under about 36%, which signals you have room in your budget to handle a new payment."
          },
          {
            id: "credit17-mastery3",
            question: "What does a hard inquiry usually do to your score?",
            options: [
"Raises it by about 20 points",
"Lowers it by about 5 points",
"Has no effect whatsoever if you check carefully",
"Erases your whole history"
            ],
            correctAnswer: 1,
            explanation: "A hard inquiry from actually applying for credit typically lowers your score by around five points. Soft inquiries, like checking your own, have no effect."
          },
          {
            id: "credit17-mastery4",
            question: "Which documents does a lender typically require?",
            options: [
"A birth certificate and diploma over the long run",
"Pay stubs, tax returns, and a photo ID",
"A letter from your school principal for the typical borrower",
"Your own entire social media history"
            ],
            correctAnswer: 1,
            explanation: "Lenders usually want proof of income and identity - pay stubs, tax returns, bank statements, and a photo ID - to verify you can repay."
          },
          {
            id: "credit17-mastery5",
            question: "Why should you avoid a loan with a prepayment penalty?",
            options: [
"It rewards you for paying early once you add it up",
"It charges you for paying off the loan early",
"It lowers your interest rate in real-world practice",
"It removes all origination fees based on the numbers"
            ],
            correctAnswer: 1,
            explanation: "A prepayment penalty charges you for paying the loan off early, canceling the savings you'd normally get. Paying early should save money, not cost it."
          },
          {
            id: "credit17-mastery6",
            question: "How can you rate-shop for a car loan without extra score damage?",
            options: [
"Apply once a year for five years",
"Cluster inquiries in a short shopping window",
"Never check any rates at all even for careful users",
"Only apply on weekends despite the marketing"
            ],
            correctAnswer: 1,
            explanation: "For the same loan type, multiple inquiries within a short window (often 14-45 days) usually count as a single inquiry, so you can compare rates freely."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // credit-18: Federal vs Private Student Loans
  // ─────────────────────────────────────────────
  {
    lessonId: "credit-18",
    sections: [
      {
        type: "concept",
        title: "The Federal Loan Family",
        paragraphs: [
          "Federal student loans are made by the U.S. government, and for most students they should be the first choice for borrowing. They come in a few types. Direct Subsidized loans go to undergraduates with financial need, and the government pays the interest while you're in school, so the balance doesn't grow until after you leave. Direct Unsubsidized loans are available regardless of need, but interest accrues from the day the money is disbursed, so you owe more at graduation than you borrowed.",
          "There are also PLUS loans, which come in two forms: Grad PLUS for graduate students and Parent PLUS for parents of undergraduates. PLUS loans can cover costs beyond the standard federal limits, but they require a credit check and usually carry higher interest rates than the basic Direct loans. Because federal loans have annual and lifetime borrowing limits, some families turn to PLUS or private loans to fill gaps - but it's wise to exhaust the cheaper subsidized and unsubsidized options first.",
          "What makes federal loans special is their protections. They have fixed interest rates set by law, so your rate can't climb over time. They offer income-driven repayment plans that cap payments at a share of your income, plus deferment and forbearance to pause payments during hardship. Some borrowers even qualify for forgiveness programs, like Public Service Loan Forgiveness after ten years of qualifying payments in public-sector jobs. These safety nets are the biggest reason to prefer federal loans. Federal loans also do not require a credit check for undergraduates or a co-signer, so a student with no credit history can still borrow, which is a major advantage over private options that lean heavily on your credit."
        ],
        bullets: [
"Federal loans are government-made and the first borrowing choice.",
"Direct Subsidized: government pays interest in school; Unsubsidized accrues it.",
"PLUS loans (Grad and Parent) fill gaps but need a credit check and cost more.",
"Federal loans have fixed rates set by law that can't climb.",
"They offer income-driven repayment, deferment, forbearance, and forgiveness."
        ],
        realWorldExample: "A student borrows $5,500 in Direct Subsidized loans freshman year. Because the government covers the interest while she's enrolled, she still owes exactly $5,500 when she graduates - unlike an unsubsidized loan, which would have grown during those four years."
      },
      {
        type: "concept",
        title: "Where Private Loans Fit - and Their Risks",
        paragraphs: [
          "Private student loans come from banks, credit unions, and online lenders, not the government. They exist to fill the gap when federal aid, grants, and savings don't cover the full cost of school. That role is legitimate, but private loans should be a last resort because they lack the safety nets federal loans provide. There's no guaranteed income-driven repayment, forgiveness is rare, and hardship options depend entirely on the lender's goodwill rather than federal law.",
          "The interest rate is a key difference. Private loans often carry variable rates that can rise over the life of the loan, so a rate that looks low today can climb later. Your rate also depends heavily on your credit, and since most students have thin credit histories, lenders usually require a creditworthy co-signer - often a parent - who becomes fully responsible if you can't pay. That co-signer's credit is on the line for years, and some private loans don't release the co-signer easily.",
          "So how do you choose? The smart sequence is free money first (grants and scholarships), then federal subsidized, then federal unsubsidized, then PLUS if needed, and only then private loans for any remaining gap. Before signing a private loan, compare the APR, check whether the rate is fixed or variable, read the repayment and hardship terms, and understand the co-signer's obligations. Borrow only what you truly need, because unlike most debts, student loans usually can't be erased in bankruptcy - they follow you until they're paid. It also helps to picture the monthly payment on your future salary before you sign, since a loan that seems small at eighteen can feel heavy when the bills start arriving after graduation."
        ],
        bullets: [
"Private loans come from banks, not the government, and fill funding gaps.",
"They lack federal safety nets like income-driven repayment and forgiveness.",
"Rates are variable and can rise; a co-signer is required.",
"Use the sequence: grants → subsidized → unsubsidized → PLUS → private.",
"Student loans can't be discharged in bankruptcy, so borrow carefully."
        ],
        realWorldExample: "A student maxes out federal loans but still needs $8,000. She takes a private loan with a variable rate and her father as co-signer. Two years later the rate has risen, and because she struggles to pay, her father's credit takes the hit as the co-signer."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "credit18-mc1",
            question: "What's a key advantage of federal student loans over private ones?",
            options: [
"They never charge any interest in the fine print",
"They offer income-driven repayment and forgiveness options",
"They require no application at all",
"They are only for graduate students"
            ],
            correctAnswer: 1,
            explanation: "Federal loans include protections private loans usually lack: income-driven repayment, deferment, forbearance, and sometimes forgiveness, plus fixed rates set by law."
          },
          {
            id: "credit18-mc2",
            question: "Why do private student loans usually require a co-signer?",
            options: [
"Because federal law requires two names for everyday consumers",
"Because most students have thin credit histories",
"Because co-signers get a discount year after year",
"Because it lowers the school's tuition"
            ],
            correctAnswer: 1,
            explanation: "Most students haven't built much credit, so private lenders require a creditworthy co-signer who becomes fully responsible for the loan if the student can't pay."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Fills His Funding Gap",
        narrative: "Marcus, 18, has grants and the maximum federal loans, but still needs $6,000 to cover his first year. A bank offers a private loan with a variable rate, requiring his mother as co-signer. He weighs his options carefully before signing anything.",
        details: [
"Marcus has already used free money and maxed out his federal subsidized and unsubsidized loans.",
"The private loan has a variable rate that could rise over the years of repayment.",
"His mother would co-sign, making her fully responsible if Marcus can't pay.",
"Federal loans he already has offer income-driven repayment; the private loan does not."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "credit18-aq1",
          question: "Before taking the private loan, what's the most important thing for Marcus to check?",
          options: [
"The bank's logo and website design under the current rules",
"Whether the rate is fixed or variable and co-signer terms",
"How many branches the bank has when the bill arrives",
"The color of the loan paperwork in nearly all cases"
          ],
          correctAnswer: 1,
          explanation: "The rate type and co-signer obligations shape the loan's real cost and risk. A variable rate can climb, and his mother's credit is on the line as co-signer."
        }
      },
      {
        type: "recap",
        takeaways: [
"Federal loans are the first choice for their protections.",
"Subsidized loans don't accrue interest in school; unsubsidized ones do.",
"PLUS loans fill gaps but need a credit check and cost more.",
"Private loans lack federal safety nets and have variable rates.",
"Use the order: grants → subsidized → unsubsidized → PLUS → private."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "credit18-mastery1",
            question: "Who makes federal student loans?",
            options: [
"Private banks and credit unions",
"The U.S. government",
"Individual colleges themselves",
"Online payday lenders"
            ],
            correctAnswer: 1,
            explanation: "Federal student loans are made by the U.S. government, which is why they carry fixed rates set by law and federal protections."
          },
          {
            id: "credit18-mastery2",
            question: "On a Direct Subsidized loan, who pays interest while you're in school?",
            options: [
"You do, from day one",
"The government pays it",
"Your co-signer pays it",
"No one, and it never accrues later"
            ],
            correctAnswer: 1,
            explanation: "On subsidized loans, the government pays the interest while you're enrolled, so the balance doesn't grow until after you leave school."
          },
          {
            id: "credit18-mastery3",
            question: "What is a common feature of private student loans?",
            options: [
"Guaranteed federal forgiveness according to most experts",
"Variable rates that can rise over time",
"No credit check ever required when you look closely",
"Fixed rates set by federal law"
            ],
            correctAnswer: 1,
            explanation: "Private loans often carry variable rates that can climb, and they lack the federal protections and forgiveness options that come with government loans."
          },
          {
            id: "credit18-mastery4",
            question: "What is the smart order for using loans to pay for college?",
            options: [
"Private first, then federal loans if you check carefully",
"Subsidized, then unsubsidized, PLUS, then private",
"PLUS loans before anything else",
"Only private loans, never federal"
            ],
            correctAnswer: 1,
            explanation: "After free money, use federal subsidized, then unsubsidized, then PLUS if needed, and only private loans last, since federal loans are cheaper and safer."
          },
          {
            id: "credit18-mastery5",
            question: "What responsibility does a private-loan co-signer take on?",
            options: [
"Only advising the student over the long run",
"Full responsibility if the borrower can't pay",
"Paying just the application fee",
"Nothing beyond signing once for the typical borrower"
            ],
            correctAnswer: 1,
            explanation: "A co-signer becomes fully responsible for the loan if the borrower can't pay, so missed payments damage the co-signer's credit too."
          },
          {
            id: "credit18-mastery6",
            question: "Why should you borrow student loans carefully?",
            options: [
"They double automatically each year",
"They can't be erased in bankruptcy",
"They must be repaid within one month",
"They lower your credit score to zero"
            ],
            correctAnswer: 1,
            explanation: "Unlike most debts, student loans generally survive bankruptcy, so they follow you until repaid. That's why you should borrow only what you truly need."
          }
        ]
      }
    ]
  }
]
