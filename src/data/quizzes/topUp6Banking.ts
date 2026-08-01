// Teaching-aligned top-up questions extending 6-question pools to ~10.
import { QuizQuestion } from "@/types"

export const topUp6Banking: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "banking-1",
    questions: [
      { id: "banking-1-tu1", question: "Which account is the better fit for money you'll need to spend this week?", options: ["A checking account", "A traditional savings account", "A 5-year certificate of deposit", "A stock brokerage account"], correctAnswer: 0, explanation: "Checking is built for frequent, instant access, so short-term spending money belongs there." },
      { id: "banking-1-tu2", question: "Your emergency fund and goal money are best kept in…", options: ["Checking, for the easy debit access", "A savings account, where it grows and stays put", "Cash spread around your home", "The same account you pay bills from"], correctAnswer: 1, explanation: "Savings is the place to store goals and emergency funds - it pays more and keeps that money separate from spending." },
      { id: "banking-1-tu3", question: "A common feature of traditional savings accounts is that they…", options: ["Pay less interest than checking on average", "May limit how many withdrawals you make each month", "Let you spend directly with a debit card everywhere", "Are meant for daily bill payments"], correctAnswer: 1, explanation: "Savings accounts often cap monthly withdrawals because they are designed for storing money, not spending it." },
      { id: "banking-1-tu4", question: "When you tap a debit card linked to checking, the money comes from…", options: ["A short-term loan the bank gives you", "Your own checking balance right away", "A credit line you repay next month", "A prepaid voucher separate from your account"], correctAnswer: 1, explanation: "Debit spends your own money straight from checking, so you cannot spend more than the balance holds." },
    ],
  },
  {
    lessonId: "banking-2",
    questions: [
      { id: "banking-2-tu1", question: "A bank's core profit comes from…", options: ["Paying more on deposits than it charges on loans", "Charging borrowers more than it pays depositors", "Printing extra money as needed", "Government payments for each open account"], correctAnswer: 1, explanation: "Banks pay depositors a low rate and lend at a higher rate, keeping the difference known as the spread." },
      { id: "banking-2-tu2", question: "If a bank pays 2% on deposits and charges 6% on loans, the spread is…", options: ["2%", "4%", "6%", "8%"], correctAnswer: 1, explanation: "The spread is the loan rate minus the deposit rate, so 6% minus 2% equals 4%." },
      { id: "banking-2-tu3", question: "Which of these is a fee-based way banks earn money?", options: ["Overdraft and ATM charges", "The spread on loans", "Selling customer data to anyone", "Renting out vault space"], correctAnswer: 0, explanation: "Beyond interest, banks collect large amounts from fees such as overdraft and ATM charges." },
      { id: "banking-2-tu4", question: "Since deposits fuel a bank's lending, what does that mean for you as a customer?", options: ["You should hold only cash and avoid banks", "You can shop around because banks compete for your deposits", "You should keep balances as low as possible", "You must pick the bank with the most branches"], correctAnswer: 1, explanation: "Because deposits are the raw material banks lend out, they compete for them, so comparing rates and fees pays off." },
    ],
  },
  {
    lessonId: "banking-3",
    questions: [
      { id: "banking-3-tu1", question: "If your FDIC-insured bank fails, what happens to your insured deposits?", options: ["They are lost along with the bank", "The government makes you whole up to the limit", "You must sue the bank to recover them", "They convert into shares of a new bank"], correctAnswer: 1, explanation: "FDIC insurance means depositors are repaid up to the coverage limit even if the bank collapses." },
      { id: "banking-3-tu2", question: "FDIC coverage applies per depositor at a level of…", options: ["$25,000 per bank", "$100,000 per bank", "$250,000 per bank", "$1 million per bank"], correctAnswer: 2, explanation: "The standard limit is $250,000 per depositor, per insured bank." },
      { id: "banking-3-tu3", question: "Which of these would FDIC insurance NOT cover?", options: ["An insured checking balance", "A certificate of deposit at an insured bank", "Mutual funds bought through the bank", "An insured savings balance"], correctAnswer: 2, explanation: "FDIC covers deposits only, so investments like mutual funds can lose value even when purchased at a bank." },
      { id: "banking-3-tu4", question: "Deposits at a credit union are insured to the same $250,000 by…", options: ["The FDIC", "The NCUA", "A private insurer the member buys", "No agency - credit unions are uninsured"], correctAnswer: 1, explanation: "The NCUA provides credit union deposit insurance at the same $250,000 level as the FDIC does for banks." },
    ],
  },
  {
    lessonId: "banking-4",
    questions: [
      { id: "banking-4-tu1", question: "The interest a bank pays on your savings is best thought of as…", options: ["A tax refund from the government", "Rent for the use of your money", "A penalty the bank owes you", "A reward for visiting a branch"], correctAnswer: 1, explanation: "The bank lends out your deposits, so the interest it pays is essentially rent for using your money." },
      { id: "banking-4-tu2", question: "APY is useful to compare because it…", options: ["Includes the effect of compounding", "Ignores fees and taxes entirely", "Is set the same at every bank", "Only counts the first month of interest"], correctAnswer: 0, explanation: "APY reflects your true yearly earnings with compounding included, making it the number to compare across banks." },
      { id: "banking-4-tu3", question: "Deposit $2,000 at 3% APY. Roughly how much interest after one year?", options: ["About $6", "About $60", "About $200", "About $600"], correctAnswer: 1, explanation: "3% of $2,000 is about $60 for the year." },
      { id: "banking-4-tu4", question: "Why does compounding make savings grow faster over time?", options: ["The bank raises your rate every month", "You earn interest on interest you already earned", "The government matches your deposits", "Inflation lifts all balances automatically"], correctAnswer: 1, explanation: "Compounding adds each interest payment to your balance so it too earns interest - growth on top of growth." },
    ],
  },
  {
    lessonId: "banking-5",
    questions: [
      { id: "banking-5-tu1", question: "The main reason online banks can offer higher rates is that they…", options: ["Skip federal regulation", "Avoid the overhead of physical branches", "Invest deposits in riskier assets", "Get subsidies for being digital"], correctAnswer: 1, explanation: "Without branches and tellers, online banks have lower overhead and pass those savings on as better rates." },
      { id: "banking-5-tu2", question: "A clear strength of a traditional brick-and-mortar bank is…", options: ["Always the highest savings rate", "In-person help and easy cash deposits", "Never charging any fees", "Faster app updates than online banks"], correctAnswer: 1, explanation: "Traditional banks let you deposit cash and get face-to-face help at a branch, which online-only banks cannot easily match." },
      { id: "banking-5-tu3", question: "Money at a legitimate online bank is…", options: ["Uninsured because there is no branch", "FDIC-insured just like a traditional bank", "Insured only up to $10,000", "Insured only if you also hold a loan there"], correctAnswer: 1, explanation: "Insurance depends on the bank's charter, not its buildings, so real online banks carry full FDIC coverage." },
      { id: "banking-5-tu4", question: "A popular hybrid setup pairs…", options: ["Local checking for cash with online high-yield savings", "Five checking accounts across five banks", "Online checking with savings hidden at home", "One shared account with a friend"], correctAnswer: 0, explanation: "Local checking handles cash and errands while online savings earns strong interest, combining both banks' strengths." },
    ],
  },
  {
    lessonId: "banking-6",
    questions: [
      { id: "banking-6-tu1", question: "With direct deposit, your pay…", options: ["Arrives as a mailed paper check", "Is held by your employer until you ask", "Moves electronically into your account on payday", "Comes loaded onto a gift card"], correctAnswer: 2, explanation: "Direct deposit sends pay straight from employer to your account electronically, with no paper check." },
      { id: "banking-6-tu2", question: "To set up direct deposit, an employer typically needs your…", options: ["Debit card and PIN", "Routing number and account number", "Online banking username and password", "A notarized birth certificate"], correctAnswer: 1, explanation: "Payroll needs your routing and account numbers, often via a void check - never your PIN or online password." },
      { id: "banking-6-tu3", question: "A split deposit helps you save by…", options: ["Routing part of each paycheck straight to savings", "Paying you twice for the same hours", "Splitting your paycheck with a coworker", "Delaying your taxes to next year"], correctAnswer: 0, explanation: "Splitting the deposit sends a slice of every paycheck into savings before you can spend it." },
      { id: "banking-6-tu4", question: "Automating savings works well for real people because it…", options: ["Triples the interest rate on deposits", "Removes willpower from the equation", "Legally locks the money for a year", "Guarantees an employer match"], correctAnswer: 1, explanation: "You cannot skip a transfer you never see, so automation beats relying on monthly motivation." },
    ],
  },
  {
    lessonId: "banking-7",
    questions: [
      { id: "banking-7-tu1", question: "You overdraft your checking account when you…", options: ["Spend more than the balance holds", "Deposit above a monthly cap", "Withdraw from savings too often", "Use an out-of-network ATM"], correctAnswer: 0, explanation: "An overdraft occurs when a purchase exceeds your balance and the bank covers the gap for a fee." },
      { id: "banking-7-tu2", question: "A typical US overdraft fee is around…", options: ["$1 to $3", "$25 to $35", "$100 to $150", "Always free"], correctAnswer: 1, explanation: "Overdraft fees run roughly $30 each, so a small purchase can become surprisingly expensive." },
      { id: "banking-7-tu3", question: "If you decline overdraft coverage, a card purchase you can't afford will…", options: ["Simply be declined with no fee", "Go through and cost double the fee", "Trigger a call from the bank", "Close your account that day"], correctAnswer: 0, explanation: "Opting out means the card is declined instead of creating surprise overdraft debt." },
      { id: "banking-7-tu4", question: "Linking a savings account as overdraft protection works by…", options: ["Auto-transferring your own savings to cover the shortfall", "Having the government cover the gap", "Freezing the account until payday", "Borrowing from other customers"], correctAnswer: 0, explanation: "Overdraft protection pulls from your linked savings, usually free or cheap, avoiding a large overdraft fee." },
    ],
  },
  {
    lessonId: "banking-8",
    questions: [
      { id: "banking-8-tu1", question: "A phishing attempt is designed to…", options: ["Trick you into handing over your credentials", "Hack a bank's vault computers directly", "Skim coins from public fountains", "Sell counterfeit gift cards"], correctAnswer: 0, explanation: "Phishing uses fake messages impersonating trusted sources to fish for your logins or codes." },
      { id: "banking-8-tu2", question: "Two-factor authentication keeps thieves out because…", options: ["It doubles your password's strength", "A stolen password alone is not enough to log in", "It alerts the police to each login", "It hides your account from search engines"], correctAnswer: 1, explanation: "With two-factor on, an attacker also needs your phone or code, so a stolen password alone fails." },
      { id: "banking-8-tu3", question: "Which password habit puts you most at risk?", options: ["Using a unique password per site", "Reusing one password across many accounts", "Storing passwords in a password manager", "Making passwords long and mixed"], correctAnswer: 1, explanation: "Reusing a password means one breach can unlock every account that shares it." },
      { id: "banking-8-tu4", question: "You spot a charge you never made. The right move is to…", options: ["Wait a month to see if it disappears", "Report it to your bank immediately", "Only dispute it with the merchant", "Close the account and move on"], correctAnswer: 1, explanation: "Reporting fast caps your liability and starts the process of recovering the money through the bank's fraud team." },
    ],
  },
]
