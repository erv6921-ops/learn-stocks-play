// Teaching-aligned top-up questions extending 6-question pools to ~10.
import { QuizQuestion } from "@/types"

export const topUp6Credit: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "credit-2",
    questions: [
      { id: "credit-2-tu1", question: "Two people earn very different incomes. What does this tell you about their credit scores?", options: ["The higher earner automatically has the higher score", "Income alone does not determine the score", "The lower earner cannot have a good score", "Both must have identical scores by law"], correctAnswer: 1, explanation: "A score measures repayment reliability, not wealth - rich people can have bad scores and modest earners can have great ones." },
      { id: "credit-2-tu2", question: "You have a $1,000 credit limit and a $200 balance. What is your utilization?", options: ["2%", "20%", "50%", "200%"], correctAnswer: 1, explanation: "Utilization is the share of your limit you are using; $200 of $1,000 is 20%, comfortably under the ~30% guideline." },
      { id: "credit-2-tu3", question: "About what percentage of a FICO score comes from payment history?", options: ["Around 5%", "Around 15%", "Around 35%", "Around 75%"], correctAnswer: 2, explanation: "Payment history is roughly 35% of the score - the single biggest factor, so one skipped payment can undo years of good behavior." },
      { id: "credit-2-tu4", question: "You check your own credit score online each month. What effect does this have?", options: ["It seriously lowers your score", "It is a harmless soft pull", "It closes your oldest account", "It maxes out your utilization"], correctAnswer: 1, explanation: "Checking your own score is a soft pull and is totally harmless to your score." },
    ],
  },
  {
    lessonId: "credit-3",
    questions: [
      { id: "credit-3-tu1", question: "What does the name FICO come from?", options: ["A federal lending agency", "The Fair Isaac Corporation", "A national bank consortium", "A type of credit card"], correctAnswer: 1, explanation: "FICO is the scoring formula from the Fair Isaac Corporation, a private company, not a government body." },
      { id: "credit-3-tu2", question: "Which single factor carries the most weight in a FICO score?", options: ["Payment history at about 35%", "Credit mix at about 10%", "New credit at about 10%", "Length of history at about 15%"], correctAnswer: 0, explanation: "Payment history (~35%) is the heaviest ingredient, followed by amounts owed (~30%)." },
      { id: "credit-3-tu3", question: "Roughly how much of a FICO score does credit mix account for?", options: ["About 35%", "About 30%", "About 10%", "About 50%"], correctAnswer: 2, explanation: "Credit mix is a small factor at around 10%, rewarding people who handle different types of credit well." },
      { id: "credit-3-tu4", question: "A friend says their score differs by a few points across three websites. Why?", options: ["One site is committing fraud", "Multiple models and bureaus calculate scores", "Scores only update on birthdays", "Only one site shows the real score"], correctAnswer: 1, explanation: "FICO has versions, VantageScore exists, and three bureaus hold slightly different data, so small gaps between sites are normal." },
    ],
  },
  {
    lessonId: "credit-4",
    questions: [
      { id: "credit-4-tu1", question: "When you swipe a credit card at a store, who pays the store immediately?", options: ["Your checking account", "The bank that issued the card", "The rewards program", "The store waits until you pay"], correctAnswer: 1, explanation: "Every swipe is a mini-loan: the bank pays the store, and you then owe the bank." },
      { id: "credit-4-tu2", question: "You pay your full statement balance by the due date every month. When does the APR matter?", options: ["It essentially never applies to your purchases", "It applies to every purchase you make", "It doubles your rewards", "It applies only to the grace period"], correctAnswer: 0, explanation: "Pay in full within the grace period and most purchases never accrue interest, so the APR is irrelevant." },
      { id: "credit-4-tu3", question: "Someone's card is used fraudulently. Why is credit generally safer than debit here?", options: ["Debit fraud can never be reversed", "Credit fraud disputes the bank's money, not yours", "Debit cards have no fraud protection at all", "Credit cards refund you double the amount"], correctAnswer: 1, explanation: "Fraud on credit is the bank's money while disputed, whereas debit fraud is your own missing money while it is investigated." },
      { id: "credit-4-tu4", question: "Paying only the minimum on a $1,000 balance at 24% APR tends to mean you will…", options: ["Clear the debt in one month", "Pay hundreds extra over years as interest compounds", "Get the debt forgiven after a year", "Lower the price of future purchases"], correctAnswer: 1, explanation: "Minimums mostly cover interest, so a $1,000 balance at 24% APR can take years and hundreds of dollars extra to clear." },
    ],
  },
  {
    lessonId: "credit-5",
    questions: [
      { id: "credit-5-tu1", question: "Which measure includes the effect of compounding?", options: ["APR", "APY", "Neither includes it", "Both are identical"], correctAnswer: 1, explanation: "APY bakes in compound growth, while APR is the simple annual rate - same money, different lenses." },
      { id: "credit-5-tu2", question: "A bank advertises a savings account. Which number will it most likely feature?", options: ["The APY, because it looks bigger", "The APR, because it looks bigger", "Neither, by law", "The monthly fee"], correctAnswer: 0, explanation: "Banks quote the bigger-looking APY for what they pay you and the smaller-looking APR for what they charge you." },
      { id: "credit-5-tu3", question: "A card charges 2% per month. Its true annual cost is…", options: ["Exactly 24% and no more", "Slightly above 24% because of compounding", "Exactly 2% since rates do not stack", "Below 20% after fees"], correctAnswer: 1, explanation: "Compounding monthly, 2% times 12 ends up around 26.8% effective - worse than the simple math suggests." },
      { id: "credit-5-tu4", question: "To compare two loans fairly, you should line up their…", options: ["Monthly payments only", "APRs including any fees rolled in", "Brand reputations", "Application form lengths"], correctAnswer: 1, explanation: "A lower payment over more years can cost far more, so APR with fees is the apples-to-apples number." },
    ],
  },
  {
    lessonId: "credit-6",
    questions: [
      { id: "credit-6-tu1", question: "What makes compound interest on debt so dangerous?", options: ["You pay interest on unpaid interest too", "The rate drops as the balance grows", "Interest stops after year one", "Payments count double on weekends"], correctAnswer: 0, explanation: "Unpaid interest joins the balance and then earns interest itself, the same force that grows savings working against you." },
      { id: "credit-6-tu2", question: "From the bank's view, which customer is most profitable?", options: ["Someone who pays in full every month", "A revolver who carries a balance month after month", "Someone who never uses the card", "Someone who only pays with cash"], correctAnswer: 1, explanation: "Revolvers pay compounding interest month after month, making them the card industry's most profitable customers." },
      { id: "credit-6-tu3", question: "What is the fastest way to beat compounding debt?", options: ["Pay well above the minimum consistently", "Make cheerful minimum payments", "Ignore statements until they stop", "Open new cards to feel richer"], correctAnswer: 0, explanation: "Every extra dollar attacks the principal, which shrinks all future interest and dramatically accelerates payoff." },
      { id: "credit-6-tu4", question: "In which situation does compounding actually work in your favor?", options: ["When you borrow as much as possible", "When you are the saver or investor earning the interest", "When you carry a card balance", "When you keep cash in checking"], correctAnswer: 1, explanation: "It is the same math from the opposite seat: earn compound interest on investments and avoid paying it on debt." },
    ],
  },
  {
    lessonId: "credit-7",
    questions: [
      { id: "credit-7-tu1", question: "On a subsidized federal loan, what happens to interest while you are in school?", options: ["The government covers it", "It doubles every semester", "It is billed to your college", "You must prepay it upfront"], correctAnswer: 0, explanation: "Subsidized means no interest accrues during school, so the balance you borrow is the balance at graduation." },
      { id: "credit-7-tu2", question: "Which feature is typical of federal student loans but rare for private ones?", options: ["Income-driven repayment and forgiveness options", "Interest-free status while enrolled", "Repayment required within one year", "No credit check ever needed"], correctAnswer: 0, explanation: "Federal loans bring income-driven repayment, deferment, and forgiveness options that private lenders rarely match." },
      { id: "credit-7-tu3", question: "A student is deciding how much to borrow total. Which rule of thumb fits?", options: ["Borrow the maximum offered each year", "Keep total borrowing below expected first-year salary", "Borrow three times your expected salary", "Always borrow from private lenders first"], correctAnswer: 1, explanation: "Debt below starting salary is typically manageable in about 10 years, while debt at triple salary can reshape your whole life." },
      { id: "credit-7-tu4", question: "Which step best reduces how much you need to borrow?", options: ["Skipping the FAFSA to save time", "Pursuing grants, scholarships, and work-study first", "Choosing the longest repayment plan", "Paying tuition with a credit card"], correctAnswer: 1, explanation: "Free money comes first: the FAFSA unlocks grants and work-study, scholarships stack, and loans should be the last resort." },
    ],
  },
  {
    lessonId: "credit-8",
    questions: [
      { id: "credit-8-tu1", question: "If a borrower stops paying their mortgage, what can the lender do?", options: ["Foreclose and take the home", "Raise the borrower's income", "Cancel the property taxes", "Nothing, the loan is unsecured"], correctAnswer: 0, explanation: "A mortgage is secured by the home as collateral, so stopping payments lets the lender foreclose and take it." },
      { id: "credit-8-tu2", question: "On a $300,000 home with 20% down, how much do you finance?", options: ["$60,000", "$240,000", "$300,000", "$360,000"], correctAnswer: 1, explanation: "A 20% down payment is $60,000, so you finance the remaining $240,000." },
      { id: "credit-8-tu3", question: "Compared with a fixed-rate loan, an adjustable-rate mortgage (ARM)…", options: ["Keeps the same payment for the whole term", "Often starts cheaper but can jump when rates rise", "Can never change its rate", "Must be refinanced every year"], correctAnswer: 1, explanation: "ARMs start with a lower teaser rate but can jump painfully when rates rise, while a fixed loan stays predictable forever." },
      { id: "credit-8-tu4", question: "A buyer puts only 10% down. What extra cost commonly results?", options: ["PMI that protects the lender", "A government subsidy", "Free home repairs", "A shorter loan term"], correctAnswer: 0, explanation: "Putting down less than 20% usually triggers private mortgage insurance, which protects the lender but comes out of your pocket until you build about 20% equity." },
    ],
  },
  {
    lessonId: "credit-9",
    questions: [
      { id: "credit-9-tu1", question: "What is the biggest cost of owning a new car?", options: ["Depreciation as it loses value fast", "The color you choose", "The dealer's business card", "State sales tax refunds"], correctAnswer: 0, explanation: "A new car can shed about 20% of its value in the first year, making depreciation the biggest cost of ownership." },
      { id: "credit-9-tu2", question: "You owe $20,000 on a car now worth $15,000. This situation is called…", options: ["Being underwater on the loan", "Being pre-approved", "Following the 20/4/10 rule", "Depreciation immunity"], correctAnswer: 0, explanation: "Owing more than the car is worth is being underwater, and if you total it you still owe the gap." },
      { id: "credit-9-tu3", question: "Why is negotiating the car's price better than negotiating the monthly payment?", options: ["Payments can hide a worse total deal", "Prices are illegal to discuss", "Payments are set by the government", "Talking price skips the paperwork"], correctAnswer: 0, explanation: "Dealers can hit any monthly number by stretching the term, so you should focus on the out-the-door price first, then financing." },
      { id: "credit-9-tu4", question: "The 20/4/10 guideline recommends which combination?", options: ["20% down, a 4-year loan, car costs under 10% of your budget", "20 test drives, 4 dealers, 10 negotiations", "$20 down, 4 cosigners, a 10-year loan", "20% APR, 4 payments, 10 fees"], correctAnswer: 0, explanation: "The 20/4/10 rule (20% down, 4-year loan, costs under 10% of budget) keeps car spending from eating your budget." },
    ],
  },
  {
    lessonId: "credit-10",
    questions: [
      { id: "credit-10-tu1", question: "Which debt does the avalanche method attack first?", options: ["The highest-interest debt", "The smallest balance", "The newest debt", "The oldest debt"], correctAnswer: 0, explanation: "The avalanche targets the highest-interest debt first, which is mathematically optimal and keeps total cost lowest." },
      { id: "credit-10-tu2", question: "Which debt does the snowball method attack first?", options: ["The smallest balance", "The highest interest rate", "The largest balance", "Whichever lender calls most"], correctAnswer: 0, explanation: "The snowball pays off the smallest balance first for a quick win, then rolls that payment into the next debt." },
      { id: "credit-10-tu3", question: "Whichever payoff method you use, what must you keep doing on every other debt?", options: ["Keep paying the minimums", "Stop paying them entirely", "Borrow new money to cover them", "Switch strategies each week"], correctAnswer: 0, explanation: "Minimums on every other debt protect your credit, while the extra money goes to your target debt." },
      { id: "credit-10-tu4", question: "Someone chose the snowball method. Why does it tend to keep people going?", options: ["Early wins build motivation to continue", "It hides balances from the borrower", "Lenders forgive small debts", "It requires no payments at all"], correctAnswer: 0, explanation: "Debt payoff is a behavior challenge, and the snowball's early crossed-off debts feel like progress that keeps people from quitting." },
    ],
  },
]
