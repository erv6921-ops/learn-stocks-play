import { QuizQuestion } from "@/types"

// Adaptive-difficulty pools: <lessonId>-hard and <lessonId>-remedial, 7 each.
export const diffBatch07: { lessonId: string; questions: QuizQuestion[] }[] = [
  // ── CREDIT-2: Credit Scores ──
  {
    lessonId: "credit-2-hard",
    questions: [
      { id: "credit-2-h1", question: "Maya has three cards: $500 of $1,000, $300 of $2,000, and $0 of $2,000. What is her overall utilization?", options: ["Around 40%", "Around 27%", "Around 16%", "Around 8%"], correctAnswer: 2, explanation: "Total owed is $800 against $5,000 in limits, so 800 divided by 5,000 is 16% overall utilization." },
      { id: "credit-2-h2", question: "If payment history is ~35% and utilization-driven amounts owed is ~30% of a FICO score, what share do those two together roughly cover?", options: ["About 45%", "About 55%", "About 65%", "About 90%"], correctAnswer: 2, explanation: "35% plus 30% equals about 65%, meaning those two categories dominate roughly two-thirds of the score." },
      { id: "credit-2-h3", question: "Ben's only card has a $2,000 limit and a $1,900 balance. Which single move most improves his score fastest?", options: ["Closing the card to remove the debt", "Paying it down to about $400 before the statement posts", "Opening two new cards to spread the balance", "Paying just the minimum on time each month"], correctAnswer: 1, explanation: "Cutting the reported balance to about $400 drops utilization from 95% to ~20%, which quickly lifts the score." },
      { id: "credit-2-h4", question: "Two applicants both earn $80,000. One scores 800, the other 610. What best explains the gap?", options: ["The lender mislabeled their incomes", "Income sets the score, so this is impossible", "Their repayment histories and utilization differ", "The 610 borrower simply has a smaller salary"], correctAnswer: 2, explanation: "Score reflects repayment behavior and utilization, not income, so equal earners can land far apart." },
      { id: "credit-2-h5", question: "A borrower keeps utilization at 5% but missed one payment 60 days late last month. What is the likely result?", options: ["The low utilization cancels the late payment out", "The late payment sharply lowers the score anyway", "The score is unaffected because usage is low", "The score rises due to the low balance"], correctAnswer: 1, explanation: "Payment history is the biggest factor at ~35%, so a serious late payment hurts even with low utilization." },
      { id: "credit-2-h6", question: "A score of 720 sits in which tier, and how does it compare to 850?", options: ["Excellent, and it is the maximum possible", "Good, but below the excellent 750-plus range", "Poor, near the bottom of the 300-850 scale", "Fair, roughly the midpoint of the scale"], correctAnswer: 1, explanation: "720 is good but sits under the 750-plus excellent tier, while 850 is the top of the 300-850 range." },
      { id: "credit-2-h7", question: "Rhea wants to lower utilization without spending less. Which action works AND avoids hurting her file?", options: ["Closing her oldest unused card", "Making several hard-pull applications", "Requesting a higher credit limit she does not use", "Paying only the minimum each month"], correctAnswer: 2, explanation: "A higher limit with the same spending lowers the utilization ratio, and keeping old accounts open protects history." },
    ],
  },
  {
    lessonId: "credit-2-remedial",
    questions: [
      { id: "credit-2-r1", question: "A credit score mainly measures…", options: ["How much cash is in your wallet", "How reliably you repay borrowed money", "How many stores you shop at", "How tall you are"], correctAnswer: 1, explanation: "A credit score predicts how reliably you repay borrowed money." },
      { id: "credit-2-r2", question: "What is the single biggest factor in a credit score?", options: ["The color of your card", "Where you were born", "Paying your bills on time", "Your favorite store"], correctAnswer: 2, explanation: "Payment history, about 35% of the score, is the single biggest factor." },
      { id: "credit-2-r3", question: "You have a $1,000 limit and use $100. What is your utilization?", options: ["10%", "50%", "100%", "1%"], correctAnswer: 0, explanation: "Using $100 of a $1,000 limit is 100 divided by 1,000, which equals 10%." },
      { id: "credit-2-r4", question: "Which score range is considered excellent?", options: ["300 to 400", "450 to 500", "500 to 550", "750 to 850"], correctAnswer: 3, explanation: "Scores run from 300 to 850, and 750 and up is the excellent range." },
      { id: "credit-2-r5", question: "A high credit score usually helps you get…", options: ["Free groceries every week", "Lower interest rates on loans", "A tax refund from the store", "A bigger paycheck at work"], correctAnswer: 1, explanation: "A high score earns lower interest rates because lenders see you as low risk." },
      { id: "credit-2-r6", question: "Which action would HURT your credit score?", options: ["Paying bills on time", "Keeping an old card open", "Missing a payment", "Checking your own score"], correctAnswer: 2, explanation: "Missing a payment hurts your score because payment history matters most." },
      { id: "credit-2-r7", question: "Checking your own credit score is…", options: ["A big drop every time", "Illegal in most places", "The same as a missed payment", "Harmless to your score"], correctAnswer: 3, explanation: "Checking your own score is a soft pull and is harmless." },
    ],
  },
  // ── CREDIT-3: FICO ──
  {
    lessonId: "credit-3-hard",
    questions: [
      { id: "credit-3-h1", question: "Given payment history ~35%, amounts owed ~30%, length ~15%, and new credit and mix ~10% each, which pair is heaviest?", options: ["Length of history and credit mix", "Payment history and amounts owed", "New credit and credit mix", "Amounts owed and new credit"], correctAnswer: 1, explanation: "Payment history (~35%) and amounts owed (~30%) are the two heaviest ingredients at about 65% combined." },
      { id: "credit-3-h2", question: "Tom closes his 12-year-old first card. Why might his FICO drop?", options: ["It instantly adds a late payment", "It shortens his average account age and history length", "It doubles his credit mix penalty", "Closing accounts is a hard inquiry"], correctAnswer: 1, explanation: "Length of history rewards older accounts, so closing his oldest card lowers average age and can ding the score." },
      { id: "credit-3-h3", question: "A shopper applies for five store cards in one week. Which FICO category takes the immediate hit?", options: ["Credit mix, which improves instantly", "Payment history, which is erased", "New credit, through several hard inquiries", "Amounts owed, which drops to zero"], correctAnswer: 2, explanation: "A burst of applications generates hard inquiries under the new-credit category, temporarily lowering the score." },
      { id: "credit-3-h4", question: "Someone has only credit cards. Adding a responsibly paid auto loan would most help which factor?", options: ["Credit mix, a small but real ~10% factor", "Payment history, which resets to zero", "Length of history, which shortens", "New credit, which becomes permanent"], correctAnswer: 0, explanation: "Handling different credit types, like a card plus an auto loan, improves the ~10% credit mix factor." },
      { id: "credit-3-h5", question: "Two lenders pull the same person and see 705 and 718. What is the most likely reason?", options: ["One lender invented the number", "The score changed on a birthday", "Only the 718 is a real score", "Different FICO versions and bureau data"], correctAnswer: 3, explanation: "Different FICO versions and slightly different bureau data produce small, normal gaps between pulls." },
      { id: "credit-3-h6", question: "FICO is created by, and used as, which of the following?", options: ["A federal agency; a government loan program", "A private company; the most common lender scoring model", "A bank; a type of high-limit card", "A bureau; the only credit report"], correctAnswer: 1, explanation: "FICO comes from the private Fair Isaac Corporation and is the scoring model most lenders check." },
      { id: "credit-3-h7", question: "A borrower with perfect payment history still has a mediocre FICO. Which factor most likely holds it back?", options: ["Credit mix, which is worth ~35%", "Checking the score too often", "High amounts owed and utilization at ~30% weight", "A birthday that has not passed"], correctAnswer: 2, explanation: "Amounts owed is the second-heaviest factor (~30%), so high balances can keep a score down despite on-time payments." },
    ],
  },
  {
    lessonId: "credit-3-remedial",
    questions: [
      { id: "credit-3-r1", question: "FICO is best described as…", options: ["A government bank", "A widely used credit scoring model", "A type of credit card", "A savings account"], correctAnswer: 1, explanation: "FICO is the credit scoring model most lenders use." },
      { id: "credit-3-r2", question: "Which factor weighs the most in a FICO score?", options: ["Your zip code", "Your job title", "Payment history", "Your age"], correctAnswer: 2, explanation: "Payment history, around 35%, is the heaviest FICO factor." },
      { id: "credit-3-r3", question: "Length of credit history rewards people who…", options: ["Keep old accounts open a long time", "Open new cards constantly", "Never use credit", "Switch banks often"], correctAnswer: 0, explanation: "A longer history means more track record, so keeping old accounts helps." },
      { id: "credit-3-r4", question: "Applying for lots of new credit at once can…", options: ["Double your limit forever", "Erase late payments", "Do nothing at all", "Temporarily lower your score"], correctAnswer: 3, explanation: "Each application is a hard inquiry, and a burst of them can temporarily lower your score." },
      { id: "credit-3-r5", question: "Credit mix means lenders like to see…", options: ["Only one credit card", "Different types of credit handled well", "Ten loans at once", "No credit at all"], correctAnswer: 1, explanation: "Credit mix rewards handling different types of credit responsibly." },
      { id: "credit-3-r6", question: "Why might two websites show slightly different scores?", options: ["One site is lying", "Scores change on holidays", "Different models and bureaus calculate them", "Only one score is real"], correctAnswer: 2, explanation: "Different scoring models and bureau data cause small, normal differences." },
      { id: "credit-3-r7", question: "The name FICO comes from…", options: ["A federal agency", "A national bank", "A credit union", "The Fair Isaac Corporation"], correctAnswer: 3, explanation: "FICO stands for the Fair Isaac Corporation, a private company." },
    ],
  },
  // ── CREDIT-4: Credit Cards ──
  {
    lessonId: "credit-4-hard",
    questions: [
      { id: "credit-4-h1", question: "Ana buys a $600 TV on a card with a 25-day grace period and pays the full statement by the due date. What interest does she owe?", options: ["25% of $600", "Zero, because she paid within the grace period", "A small daily interest charge", "Half the APR on $600"], correctAnswer: 1, explanation: "Paying the full statement within the grace period means most purchases accrue no interest at all." },
      { id: "credit-4-h2", question: "A $2,000 balance sits at 24% APR. Roughly how much interest accrues in one month if unpaid?", options: ["About $240", "About $480", "About $40", "About $4"], correctAnswer: 2, explanation: "24% per year is about 2% per month, and 2% of $2,000 is roughly $40 in monthly interest." },
      { id: "credit-4-h3", question: "Leo's card is fraudulently charged $900. Why is his exposure smaller than with a debit card?", options: ["The disputed amount is the bank's money, not his cash", "Credit fraud is always refunded double", "Debit cards have no protection at all", "He can never be charged on credit"], correctAnswer: 0, explanation: "On credit, the disputed charge is the bank's money while investigated, so his own cash is not missing meanwhile." },
      { id: "credit-4-h4", question: "Which routine best builds an 18-year-old's credit with the least risk?", options: ["Five premium cards opened at once", "Maxing a card to prove spending power", "One starter card, a small recurring charge, autopay in full", "Avoiding all credit until age 30"], correctAnswer: 2, explanation: "A single card with a tiny charge and autopay in full quietly builds strong credit while avoiding interest." },
      { id: "credit-4-h5", question: "Paying only the minimum on a card mostly covers what, and with what effect?", options: ["Mostly interest, so the balance barely shrinks", "Mostly principal, so it clears fast", "The full balance, ending the debt", "Nothing, since minimums are optional"], correctAnswer: 0, explanation: "Minimum payments mostly cover interest, so the principal barely shrinks and the debt drags on for years." },
      { id: "credit-4-h6", question: "Sam always pays his statement in full. For him, comparing cards on APR is…", options: ["The single most important factor", "Required to avoid the grace period", "Nearly pointless since he never carries a balance", "The way to double his rewards"], correctAnswer: 2, explanation: "APR only matters when you carry a balance, so a full-payer should weigh rewards and fees instead." },
      { id: "credit-4-h7", question: "Which is a genuine credit-over-debit advantage beyond rewards?", options: ["Purchases can never be declined", "Spending never needs repayment", "The bank pays you interest to spend", "Stronger fraud and dispute protection"], correctAnswer: 3, explanation: "Credit cards offer stronger fraud and dispute protection because the money in question is the bank's until resolved." },
    ],
  },
  {
    lessonId: "credit-4-remedial",
    questions: [
      { id: "credit-4-r1", question: "When you buy something with a credit card, you are…", options: ["Borrowing the bank's money", "Spending your savings", "Using prepaid money", "Getting it for free"], correctAnswer: 0, explanation: "A credit card swipe borrows the bank's money, which you repay later." },
      { id: "credit-4-r2", question: "The grace period lets you…", options: ["Skip a payment forever", "Pay in full before interest starts", "Get free items", "Double your rewards"], correctAnswer: 1, explanation: "Paying in full during the grace period means most purchases avoid interest." },
      { id: "credit-4-r3", question: "Paying only the minimum each month means…", options: ["The debt disappears", "Your score jumps up", "Interest keeps building on the balance", "Prices drop for you"], correctAnswer: 2, explanation: "Minimum payments mostly cover interest, so the balance keeps growing." },
      { id: "credit-4-r4", question: "What is a safe first step to build credit?", options: ["Open five cards at once", "Max out a card fast", "Never use credit", "Use one card for small buys, paid in full"], correctAnswer: 3, explanation: "One card with small purchases paid in full builds credit safely." },
      { id: "credit-4-r5", question: "One real advantage of credit cards over debit is…", options: ["Better fraud protection", "Free spending", "No repayment needed", "Guaranteed discounts"], correctAnswer: 0, explanation: "Credit cards offer stronger fraud protection than debit cards." },
      { id: "credit-4-r6", question: "A card's APR matters most when you…", options: ["Pay in full every month", "Carry a balance past the due date", "Check your balance often", "Redeem rewards"], correctAnswer: 1, explanation: "APR only matters when you carry a balance past the due date." },
      { id: "credit-4-r7", question: "When you swipe a card, who pays the store first?", options: ["Your savings account", "The rewards program", "The bank that issued the card", "Nobody pays"], correctAnswer: 2, explanation: "The bank pays the store immediately, and you then owe the bank." },
    ],
  },
  // ── CREDIT-5: APR vs APY ──
  {
    lessonId: "credit-5-hard",
    questions: [
      { id: "credit-5-h1", question: "A card lists a 2% monthly rate. What is the effective annual rate (APY) after compounding?", options: ["Exactly 24%", "About 26.8%", "Exactly 2%", "About 12%"], correctAnswer: 1, explanation: "Compounding 2% monthly gives (1.02)^12 minus 1, which is about 26.8%, higher than the 24% simple figure." },
      { id: "credit-5-h2", question: "Two savings accounts both quote 5%. One says APR, one says APY compounded monthly. Which pays more?", options: ["The APY account, because compounding is included", "The APR account, because it is simpler", "They pay exactly the same", "Neither pays any interest"], correctAnswer: 0, explanation: "A 5% APY already includes compounding, so it earns slightly more than a plain 5% APR." },
      { id: "credit-5-h3", question: "Loan A: 8% APR with $500 fees rolled in. Loan B: 8.2% APR, no fees. To compare fairly you should…", options: ["Pick Loan A because 8% is lower", "Compare only the monthly payments", "Compare the fee-inclusive APRs, not just the sticker rate", "Compare the lenders' ad budgets"], correctAnswer: 2, explanation: "APR should include fees, so rolling $500 into Loan A can push its true APR above Loan B despite the lower sticker rate." },
      { id: "credit-5-h4", question: "Why do banks advertise APY on savings but APR on loans?", options: ["Law forbids using APR on deposits", "APY looks bigger for what they pay, APR looks smaller for what they charge", "APY hides all the fees", "Customers cannot understand APR"], correctAnswer: 1, explanation: "They quote the bigger-looking APY for what they pay you and the smaller-looking APR for what they charge you." },
      { id: "credit-5-h5", question: "A saver wants the most growth and a borrower wants the least cost. The ideal pairing is…", options: ["Low APY to save, high APR to borrow", "High APR to save, high APY to borrow", "High APY to save, low APR to borrow", "APY and APR matter to neither"], correctAnswer: 2, explanation: "You want to earn at a high APY and borrow at a low APR to keep growth up and costs down." },
      { id: "credit-5-h6", question: "The gap between a stated APR and its APY grows larger when…", options: ["Interest compounds more frequently", "There is no compounding at all", "The loan term is exactly one year", "Fees are set to zero"], correctAnswer: 0, explanation: "More frequent compounding widens the gap between the simple APR and the effective APY." },
      { id: "credit-5-h7", question: "A card quotes 1.5% monthly. Its APR (simple) and APY (compounded) are roughly…", options: ["18% APR and exactly 18% APY", "18% APR and about 19.6% APY", "1.5% APR and 1.5% APY", "36% APR and 36% APY"], correctAnswer: 1, explanation: "1.5% times 12 is an 18% APR, while (1.015)^12 minus 1 is about 19.6% APY due to compounding." },
    ],
  },
  {
    lessonId: "credit-5-remedial",
    questions: [
      { id: "credit-5-r1", question: "APR on a loan tells you…", options: ["The yearly cost of borrowing", "Your monthly grocery bill", "How much you can borrow", "The bank's phone number"], correctAnswer: 0, explanation: "APR is the annual percentage rate, the yearly cost of borrowing." },
      { id: "credit-5-r2", question: "Which measure includes compounding?", options: ["APR", "APY", "Neither", "Both are the same"], correctAnswer: 1, explanation: "APY includes compounding, while APR is the simple annual rate." },
      { id: "credit-5-r3", question: "Banks advertise savings accounts using APY because…", options: ["It is required by law", "It hides fees", "It looks like a bigger number", "Customers prefer smaller numbers"], correctAnswer: 2, explanation: "APY looks bigger because it includes compounding, so banks feature it for savings." },
      { id: "credit-5-r4", question: "To compare two loans fairly, line up their…", options: ["Brand names", "Ad budgets", "Form lengths", "APRs"], correctAnswer: 3, explanation: "APR is the apples-to-apples number for comparing loan costs." },
      { id: "credit-5-r5", question: "A saver wants a high…", options: ["APY", "APR on debt", "monthly fee", "loan balance"], correctAnswer: 0, explanation: "Savers want a high APY to earn more interest." },
      { id: "credit-5-r6", question: "A borrower wants a low…", options: ["APY on savings", "APR", "credit score", "income"], correctAnswer: 1, explanation: "Borrowers want a low APR to pay less in interest." },
      { id: "credit-5-r7", question: "APR and APY are…", options: ["Exactly the same number", "Two different ways to state a rate", "Types of credit cards", "Government agencies"], correctAnswer: 1, explanation: "APR and APY are different lenses on a rate; APY adds compounding." },
    ],
  },
  // ── CREDIT-6: Compound Interest on Debt ──
  {
    lessonId: "credit-6-hard",
    questions: [
      { id: "credit-6-h1", question: "A $1,000 balance sits at 24% APR (~2% monthly) with no payments. After two months of compounding, it is about…", options: ["$1,024.00", "$1,040.00", "$1,040.40", "$1,200.00"], correctAnswer: 2, explanation: "Month one adds $20 to reach $1,020; month two adds 2% of $1,020, about $20.40, for roughly $1,040.40." },
      { id: "credit-6-h2", question: "Why does a $1,000 card balance at 24% APR paying $25 minimums cost far more than $1,000?", options: ["Interest compounds faster than the minimums shrink the principal", "The bank secretly doubles it yearly", "Stores add hidden monthly charges", "Minimums are rounded up each month"], correctAnswer: 0, explanation: "Minimums barely reduce principal while interest compounds, stretching payoff to 5-plus years and roughly $1,600 total." },
      { id: "credit-6-h3", question: "Which change most reduces total interest paid on a compounding debt?", options: ["Paying the minimum but more often", "Ignoring statements to avoid stress", "Opening a new card for the balance", "Paying well above the minimum each month"], correctAnswer: 3, explanation: "Paying above the minimum attacks principal, which shrinks every future interest charge and speeds payoff." },
      { id: "credit-6-h4", question: "The same compounding math that grows debt also…", options: ["Grows an investor's savings over time", "Shrinks a saver's balance", "Only applies to credit cards", "Stops working after one year"], correctAnswer: 0, explanation: "Compounding is neutral math; it grows investments for savers just as it grows balances for borrowers." },
      { id: "credit-6-h5", question: "Card debt snowballs faster than most other debt mainly because…", options: ["Cards are legally required to double yearly", "High APRs compound on a revolving balance", "It has no minimum payment", "It is always interest-free"], correctAnswer: 1, explanation: "A 20-plus percent APR compounding on a revolving balance makes card debt grow far faster than lower-rate loans." },
      { id: "credit-6-h6", question: "From a lender's view, the most profitable customer is a revolver because…", options: ["They never use the card", "They pay in full each month", "They pay compounding interest month after month", "They only pay with cash"], correctAnswer: 2, explanation: "Revolvers carry balances and pay compounding interest repeatedly, making them the most profitable customers." },
      { id: "credit-6-h7", question: "A $2,000 balance at 24% APR compounds monthly. Roughly how much interest accrues the FIRST month if unpaid?", options: ["About $480", "About $240", "About $20", "About $40"], correctAnswer: 3, explanation: "24% per year is about 2% monthly, and 2% of $2,000 is roughly $40 in the first month." },
    ],
  },
  {
    lessonId: "credit-6-remedial",
    questions: [
      { id: "credit-6-r1", question: "Compound interest on debt means you pay…", options: ["Interest on unpaid interest too", "Nothing after year one", "Half the balance", "Only the original amount"], correctAnswer: 0, explanation: "Unpaid interest is added to the balance and then earns more interest." },
      { id: "credit-6-r2", question: "Why does credit card debt grow so fast?", options: ["Banks forgive it", "High rates compound on the balance", "Stores lower prices", "It never charges interest"], correctAnswer: 1, explanation: "High APRs compounding on a revolving balance make card debt grow quickly." },
      { id: "credit-6-r3", question: "The fastest way to beat compounding debt is to…", options: ["Pay only the minimum", "Ignore the bill", "Pay more than the minimum", "Open new cards"], correctAnswer: 2, explanation: "Paying more than the minimum attacks the principal and speeds payoff." },
      { id: "credit-6-r4", question: "Compounding works FOR you when…", options: ["You borrow a lot", "You carry a balance", "You pay only cash", "You are the saver earning interest"], correctAnswer: 3, explanation: "As a saver or investor, compounding grows your money instead of your debt." },
      { id: "credit-6-r5", question: "Which customer is most profitable for a card company?", options: ["One who pays in full", "One who carries a balance", "One who never uses the card", "One who pays with cash"], correctAnswer: 1, explanation: "A customer who carries a balance pays compounding interest, making them profitable." },
      { id: "credit-6-r6", question: "If you leave interest unpaid, next month it…", options: ["Disappears", "Earns interest itself", "Is refunded", "Stays frozen"], correctAnswer: 1, explanation: "Unpaid interest joins the balance and earns interest itself the next month." },
      { id: "credit-6-r7", question: "Paying only minimums on a $1,000 card balance usually means you pay…", options: ["Exactly $1,000", "Less than $1,000", "More than $1,000 over time", "Nothing at all"], correctAnswer: 2, explanation: "Interest compounds while minimums barely shrink the balance, so you pay well over $1,000." },
    ],
  },
]
