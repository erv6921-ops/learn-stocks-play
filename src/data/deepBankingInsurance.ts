import { StructuredLessonContent } from "@/types"

// Wave-2 deepened content (Mortgages-depth rebuild) for: banking + insurance
export const deepBankingInsurance: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // banking-1: Checking vs Savings
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-1",
    sections: [
      {
        type: "concept",
        title: "Two Accounts, Two Jobs",
        paragraphs: [
          "A checking account is your spending account - the money you touch every day. It comes with a debit card, lets you swipe at stores, pay bills online, and send cash to friends. Because you move money in and out constantly, banks expect lots of transactions and set no limit on how often you withdraw. The tradeoff is that checking accounts pay almost no interest, often 0.01%. On a $500 balance that's about 5 cents a year. Checking is built for access and convenience, not for growing your money, so it is the wrong place to park cash you want to build over time.",
          "A savings account has a different job: to hold money you don't need right now and pay you a little for leaving it alone. Savings accounts pay higher interest - a good online savings account might pay 4% to 5% while a big traditional bank pays 0.4%. On $2,000 at 4.5%, that's about $90 a year for doing nothing. The catch is that savings is designed to discourage spending. There's no debit card attached, and historically banks limited certain withdrawals to about six per month, nudging you to keep the money parked.",
          "Most people use both accounts together as a team. Your paycheck lands in checking, you pay rent and buy groceries from there, and you move a set amount into savings each payday - a habit called 'paying yourself first.' Savings becomes your emergency fund and your goal money (a car, a trip, a laptop). The rule of thumb for teens: keep enough in checking to cover your regular spending plus a small cushion, and push everything else into savings where it earns real interest instead of sitting idle."
        ],
        bullets: [
          "Checking is for daily spending: debit card, bill pay, unlimited transactions, near-zero interest.",
          "Savings is for money you don't need now: higher interest, fewer withdrawals, no debit card.",
          "A good online savings account can pay 4%-5%; big traditional banks often pay far less.",
          "Use both together: paycheck to checking, then move a set amount to savings each payday.",
          "Keep spending money plus a cushion in checking; send the rest to savings to earn interest."
        ],
        realWorldExample: "Jordan keeps $400 in checking for gas, food, and small buys, and $1,600 in an online savings account paying 4.5%. The checking earns about 4 cents a year; the savings earns about $72. Same total money, but splitting it correctly puts real interest in Jordan's pocket."
      },
      {
        type: "concept",
        title: "Fees, Access, and Choosing an Account",
        paragraphs: [
          "Accounts aren't free unless you set them up right. Common charges include monthly maintenance fees ($5 to $15), which many banks waive if you keep a minimum balance or set up direct deposit. There are also overdraft fees (often about $35) if you spend more than you have, and out-of-network ATM fees ($3 to $5 per withdrawal) for using another bank's machine. Student and teen accounts usually skip most of these fees, so it pays to ask for one. Reading the fee schedule before you open an account can save you a hundred dollars a year.",
          "Access matters too. Checking gives you instant access through your debit card, ATM, and app. Savings money is available but slower to spend - you typically transfer it to checking first, which can take a day. This small friction is a feature, not a bug: it makes you pause before raiding your goal money. When comparing banks, look at the APY (annual percentage yield) on savings, the fee rules, the ATM network size, and how good the mobile app is, since you'll manage most of it from your phone.",
          "A smart setup for a teen is a checking account for spending plus a high-yield savings account for goals and emergencies. Automate a transfer - say $25 every payday - so saving happens without willpower. As your balance grows, you might add a CD (certificate of deposit), which locks money for a set term at a higher fixed rate but charges a penalty for early withdrawal. The core idea never changes: match the account to the job. Spending money goes where it's easy to reach; growth money goes where it earns the most."
        ],
        bullets: [
          "Watch for monthly maintenance, overdraft (~$35), and out-of-network ATM fees ($3-$5).",
          "Many fees are waived with a minimum balance, direct deposit, or a student/teen account.",
          "Checking gives instant access; savings adds a small delay that discourages impulse spending.",
          "Compare banks by APY on savings, fee rules, ATM network, and app quality.",
          "Automate a transfer to savings each payday so growth happens without willpower."
        ],
        realWorldExample: "Priya's bank charges $10 a month unless she keeps $300 in checking or sets up direct deposit. She sets up direct deposit from her part-time job, dropping the fee to zero - saving $120 a year that would have quietly leaked out of her account."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking1-mc1",
            question: "Which account is designed mainly for everyday spending?",
            options: [
              "A savings account with a high APY",
              "A checking account with a debit card",
              "A certificate of deposit locked for a year",
              "An emergency fund held in cash"
            ],
            correctAnswer: 1,
            explanation: "Checking is built for daily spending - it comes with a debit card and unlimited transactions but pays almost no interest. Savings and CDs are meant to grow money you don't need right away."
          },
          {
            id: "banking1-mc2",
            question: "Why do savings accounts pay more interest than checking accounts?",
            options: [
              "They reward you for leaving money parked",
              "They charge higher monthly maintenance fees in most cases",
              "They give you a faster debit card",
              "They are required to by federal law"
            ],
            correctAnswer: 0,
            explanation: "Savings accounts pay more because you agree to leave the money alone, letting the bank use it. Checking pays little because you move money in and out constantly and need instant access."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon Splits a Paycheck",
        narrative: "Devon, 17, earns $600 a month at a part-time job and currently keeps all of it in one checking account paying 0.01%. Devon wants to buy a $900 laptop in six months and also stop spending money so fast. A friend suggests opening a separate high-yield savings account paying 4.5% and moving part of each paycheck there.",
        details: [
          "In checking, Devon's full balance earns almost nothing - a few cents a year total.",
          "Moving $150 per payday into savings builds toward the laptop and earns about 4.5% along the way.",
          "Because savings has no debit card, Devon is less tempted to spend the laptop money on impulse.",
          "Devon keeps enough in checking for gas and food, so a slower transfer from savings is never a problem."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking1-aq1",
          question: "What is the BEST reason for Devon to move laptop money into a separate savings account?",
          options: [
            "Savings accounts never charge any fees at all",
            "It earns interest and curbs impulse spending",
            "Checking accounts are illegal for minors",
            "The money will be refunded if unspent"
          ],
          correctAnswer: 1,
          explanation: "A separate savings account earns real interest and the lack of a debit card makes it harder to spend the goal money on impulse. Savings can still have fees, and checking is legal for teens."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Checking is for spending: debit card, unlimited transactions, almost no interest.",
          "Savings is for parked money: higher APY, fewer withdrawals, no debit card.",
          "Use both together and automate a transfer to savings each payday.",
          "Fees like maintenance, overdraft, and out-of-network ATM charges can be avoided by choosing the right account.",
          "Match each account to its job: easy access for spending, high APY for growth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "banking1-mastery1",
            question: "You have $3,000 you won't need for a year. Where does it earn the most?",
            options: [
              "In your everyday checking account",
              "In a high-yield savings account",
              "Loose in a spending debit card",
              "In a fee-heavy maintenance account"
            ],
            correctAnswer: 1,
            explanation: "Money you don't need soon belongs in high-yield savings, which pays far more interest than checking. Checking pays almost nothing because it's built for spending, not growth."
          },
          {
            id: "banking1-mastery2",
            question: "What is the main tradeoff of a savings account versus checking?",
            options: [
              "Higher interest but less instant spending access",
              "Lower interest but a much better debit card",
              "More monthly fees but faster ATM cash",
              "No interest at all but unlimited swipes"
            ],
            correctAnswer: 0,
            explanation: "Savings pays higher interest but is slower to spend from, with no debit card. That small delay is a feature - it discourages impulse spending on money you're trying to grow."
          },
          {
            id: "banking1-mastery3",
            question: "Your bank waives its $10 monthly fee if you set up direct deposit. Doing so saves you…",
            options: [
              "About $120 over a full year",
              "About $10 total, one time only",
              "Nothing, since fees can't be waived",
              "About $500 in overdraft charges in most cases"
            ],
            correctAnswer: 0,
            explanation: "A $10 monthly fee is $120 a year. Setting up direct deposit to waive it saves that full amount - a simple move that keeps money from quietly leaking out."
          },
          {
            id: "banking1-mastery4",
            question: "What does APY tell you when comparing savings accounts?",
            options: [
              "How many free ATMs the bank owns",
              "The yearly interest rate you earn",
              "The monthly maintenance fee amount",
              "How fast the app loads each screen"
            ],
            correctAnswer: 1,
            explanation: "APY (annual percentage yield) is the yearly interest rate you earn, including compounding. A higher APY means more growth on the same balance, so it's a key number to compare."
          },
          {
            id: "banking1-mastery5",
            question: "'Paying yourself first' means…",
            options: [
              "Spending your paycheck before bills arrive in most cases",
              "Moving money to savings before you spend",
              "Buying whatever you want on payday",
              "Paying the bank a fee up front"
            ],
            correctAnswer: 1,
            explanation: "Paying yourself first means transferring a set amount to savings right when you get paid, before spending. It makes saving automatic instead of leaving whatever happens to be left over."
          },
          {
            id: "banking1-mastery6",
            question: "You keep too little in checking and overspend by $20. What likely happens?",
            options: [
              "The bank ignores it with no charge over the years",
              "You may be hit with an overdraft fee",
              "Your savings APY automatically rises in most cases",
              "Your debit card is upgraded for free"
            ],
            correctAnswer: 1,
            explanation: "Spending more than your checking balance can trigger an overdraft fee, often around $35 - far more than the $20 you overspent. Keeping a cushion in checking avoids this."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // banking-2: How Banks Make Money
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-2",
    sections: [
      {
        type: "concept",
        title: "The Spread: Borrow Low, Lend High",
        paragraphs: [
          "Banks are businesses, and their oldest way of making money is the 'spread.' They take your deposits and pay you a little interest - say 0.5% on savings. Then they lend that same money out to other customers at a much higher rate - maybe 7% on a car loan or 22% on a credit card. The gap between what they pay you and what they charge borrowers is their profit. If a bank pays 0.5% on $100 and lends it at 7%, it earns 6.5% - $6.50 - on money that was mostly yours to begin with.",
          "This works because of 'fractional reserve' banking. Banks don't keep all deposits in a vault; they keep a fraction on hand for withdrawals and lend the rest. Not everyone withdraws at once, so a bank can safely lend most of its deposits. This multiplies money through the economy: your deposit becomes someone's car loan, which becomes a dealership's deposit, which funds another loan. Banks earn interest at every step. The risk is that if too many people demand their cash at the same time - a 'bank run' - the bank can't pay everyone instantly, which is why deposit insurance exists.",
          "The spread explains why the rate you earn on savings is so low while loan rates feel high. It's not the bank being greedy for no reason - that gap is literally how they cover salaries, buildings, technology, loan losses, and profit. Understanding this helps you as a customer: shop for the highest savings APY you can find and the lowest loan rate you can qualify for, because you're on the opposite side of the bank's spread. Every basis point in your favor is money that stays with you instead of the bank."
        ],
        bullets: [
          "Banks pay you low interest on deposits and lend that money out at higher rates.",
          "The 'spread' - the gap between deposit and loan rates - is a core source of bank profit.",
          "Fractional reserve banking lets banks lend most deposits, multiplying money through the economy.",
          "A bank run happens when too many people withdraw at once; deposit insurance prevents panic.",
          "You're on the opposite side of the spread: seek high savings APYs and low loan rates."
        ],
        realWorldExample: "A bank pays depositors 0.5% and lends money out as auto loans at 7%. On $10 million in deposits, that 6.5% spread is $650,000 a year in interest income - before the bank collects a single account fee. The spread is the engine of traditional banking."
      },
      {
        type: "concept",
        title: "Fees and Interchange: The Other Revenue Streams",
        paragraphs: [
          "Beyond the spread, banks make serious money from fees. Overdraft fees (about $35 each), monthly maintenance fees ($5-$15), out-of-network ATM fees ($3-$5), wire transfer fees, and late payment fees all add up. U.S. banks collectively earn billions from overdraft fees alone every year. These fees are often avoidable if you keep a cushion, use in-network ATMs, and pay on time - which is exactly why banks bury the rules in fine print. Knowing which fees exist is the first step to never paying them.",
          "There's also a hidden stream most people never notice: interchange. Every time you swipe a debit or credit card, the merchant's bank pays a small fee (roughly 1% to 3% of the purchase) that gets split among the card network and your bank. You don't see it because the store absorbs it into prices, but it's a big deal - it's why banks offer 'free' checking and credit card rewards. The rewards are partly funded by the fees merchants pay when you swipe. Your spending literally generates income for your bank.",
          "Bigger banks add even more: they charge fees to manage investments, underwrite mortgages, run business accounts, and handle credit cards. The takeaway for a smart customer is that a bank has many ways to profit from you - some fair, some avoidable. You can't dodge interchange, but you can dodge overdraft, ATM, and maintenance fees entirely with a little care. Treat the bank as a business you're negotiating with: use its free services, avoid its penalty fees, and let its rewards work in your favor."
        ],
        bullets: [
          "Fees - overdraft, maintenance, ATM, wire, late - are a huge revenue source, often avoidable.",
          "U.S. banks earn billions yearly from overdraft fees alone.",
          "Interchange: merchants pay ~1%-3% per card swipe, quietly funding 'free' checking and rewards.",
          "Bigger banks also profit from mortgages, investments, business accounts, and credit cards.",
          "Avoid penalty fees with a cushion, in-network ATMs, and on-time payments; you can't avoid interchange."
        ],
        realWorldExample: "You buy $50 of groceries with a debit card. The store pays maybe $1 in interchange fees, split between the card network and your bank. Multiply that across millions of daily swipes, and it's why your 'free' checking account is actually quite profitable for the bank."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking2-mc1",
            question: "What is a bank's 'spread'?",
            options: [
              "The number of branches it operates in most cases",
              "The gap between deposit and loan rates",
              "The total cash kept in its vault",
              "The monthly fee on a checking account"
            ],
            correctAnswer: 1,
            explanation: "The spread is the difference between the low rate a bank pays depositors and the higher rate it charges borrowers. That gap is a core source of bank profit."
          },
          {
            id: "banking2-mc2",
            question: "How does 'interchange' earn a bank money?",
            options: [
              "The bank charges you a fee for saving",
              "Merchants pay a fee on each card swipe",
              "The government pays banks for deposits in most cases",
              "Customers pay to receive a debit card"
            ],
            correctAnswer: 1,
            explanation: "Interchange is a small fee (about 1%-3%) that a merchant's bank pays whenever you swipe a card. It's invisible to you but helps fund 'free' checking and card rewards."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sam Wonders Why Savings Pays So Little",
        narrative: "Sam notices the bank pays only 0.5% on his savings, yet advertises car loans at 7% and credit cards at 22%. He feels ripped off and asks his older sister, a finance major, whether the bank is cheating him. She explains how banks actually make money and how Sam can use that knowledge.",
        details: [
          "The low savings rate and high loan rates create the spread, the bank's main profit engine.",
          "Fractional reserve lending lets the bank loan out most of Sam's deposit, not lock it in a vault.",
          "Sam also generates interchange income every time he swipes his debit card at a store.",
          "Sam's best move: chase a higher-APY savings account and borrow only at the lowest rate he qualifies for."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking2-aq1",
          question: "Given how banks profit, what is Sam's smartest response as a customer?",
          options: [
            "Never use a bank or a debit card again",
            "Seek high savings APY and low loan rates",
            "Deposit only physical cash in a vault in most cases",
            "Overdraft often to use the bank's money"
          ],
          correctAnswer: 1,
          explanation: "Sam is on the opposite side of the spread, so his best move is to earn the highest savings APY and borrow at the lowest rate. Overdrafting just hands the bank fees; avoiding banks entirely is impractical."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The spread - paying low on deposits, charging high on loans - is a bank's main profit source.",
          "Fractional reserve banking lets banks lend most deposits, multiplying money and earning interest.",
          "Fees like overdraft, maintenance, and ATM charges are big revenue and mostly avoidable.",
          "Interchange fees on card swipes quietly fund 'free' checking and rewards.",
          "Use the bank's free services, avoid penalty fees, and shop for the best rates on both sides."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "banking2-mastery1",
            question: "A bank pays 0.5% on deposits and lends at 7%. Its spread is…",
            options: [
              "7.5%, adding the two rates together in most cases",
              "6.5%, the gap between the two rates",
              "0.5%, only the deposit rate counts",
              "3.75%, the average of the rates"
            ],
            correctAnswer: 1,
            explanation: "The spread is the difference between the loan rate and the deposit rate: 7% minus 0.5% equals 6.5%. That gap is the profit the bank keeps on money it borrowed cheaply from depositors."
          },
          {
            id: "banking2-mastery2",
            question: "Under fractional reserve banking, a bank…",
            options: [
              "Keeps every deposit locked in a vault",
              "Lends out most deposits, holding a fraction",
              "Is banned from making any loans in most cases",
              "Prints new money whenever it wants"
            ],
            correctAnswer: 1,
            explanation: "Banks keep only a fraction of deposits on hand and lend the rest, since not everyone withdraws at once. This lets them earn interest on money that was deposited by customers."
          },
          {
            id: "banking2-mastery3",
            question: "Why can a bank offer 'free' checking and still profit?",
            options: [
              "The government pays banks to be free over the years",
              "Interchange and other fees make up for it",
              "Free checking is actually a legal myth",
              "Customers secretly pay a hidden tax in most cases"
            ],
            correctAnswer: 1,
            explanation: "Even without a monthly fee, the bank earns interchange every time you swipe, plus overdraft and other fees and the spread on your balance. 'Free' checking is still profitable."
          },
          {
            id: "banking2-mastery4",
            question: "A 'bank run' is dangerous because…",
            options: [
              "The bank earns too much interest at once",
              "Too many people withdraw cash at once",
              "The bank's app crashes during updates in most cases",
              "Loan rates suddenly drop to zero"
            ],
            correctAnswer: 1,
            explanation: "Because banks lend out most deposits, they can't hand back everyone's cash at the same instant. A run - many withdrawals at once - can drain the reserves, which is why deposit insurance exists."
          },
          {
            id: "banking2-mastery5",
            question: "Which fee can you almost always avoid with good habits?",
            options: [
              "Interchange charged on your card swipe",
              "Overdraft fees on your checking account",
              "The spread the bank earns on loans",
              "The tax the government adds to deposits"
            ],
            correctAnswer: 1,
            explanation: "Overdraft fees are avoidable by keeping a cushion and tracking your balance. Interchange is baked into swipes, and the spread isn't a fee you're charged - it's how the bank profits overall."
          },
          {
            id: "banking2-mastery6",
            question: "The best customer strategy given the bank's spread is to…",
            options: [
              "Borrow as much as possible at any rate",
              "Earn top APY and borrow at low rates",
              "Keep all cash at home in a drawer",
              "Pay every optional fee to stay loyal in most cases"
            ],
            correctAnswer: 1,
            explanation: "Since the bank profits from the gap between what it pays and charges, your edge is to earn the highest savings APY and borrow at the lowest rate you qualify for, shrinking the bank's spread on you."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // banking-3: FDIC
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-3",
    sections: [
      {
        type: "concept",
        title: "What the FDIC Is and Why It Exists",
        paragraphs: [
          "The FDIC - Federal Deposit Insurance Corporation - is a U.S. government agency created in 1933 after the Great Depression, when thousands of banks failed and ordinary people lost their savings overnight. Its job is simple but powerful: if an FDIC-insured bank collapses, the government guarantees your deposits up to a legal limit. That promise is what makes modern banking safe. You can hand a bank your money without fearing that a bad year for the bank means your paycheck vanishes. The FDIC turned bank deposits from a gamble into one of the safest places to keep money.",
          "The standard coverage is $250,000 per depositor, per insured bank, per ownership category. That means if you have $250,000 or less at one insured bank, every cent is protected even if the bank fails. The 'per ownership category' part matters: money in a single account, a joint account, and a retirement account can each be insured separately, so a household can protect well over $250,000 at one bank by using different account types. For a teen with a few thousand dollars, though, you're fully covered many times over - your money is completely safe.",
          "FDIC insurance covers deposit accounts: checking, savings, money market deposit accounts, and CDs. It does NOT cover investments like stocks, bonds, mutual funds, or crypto, even if you bought them through a bank - those can lose value and carry no government guarantee. This distinction is one of the most important in personal finance. A savings account is insured and cannot lose value; a stock is not insured and can drop to zero. When someone promises high 'guaranteed' returns on an investment, remember that only actual bank deposits carry the FDIC guarantee."
        ],
        bullets: [
          "The FDIC is a government agency (since 1933) that insures deposits if an insured bank fails.",
          "Standard coverage is $250,000 per depositor, per bank, per ownership category.",
          "Different account types (single, joint, retirement) are insured separately at the same bank.",
          "Covered: checking, savings, money market deposit accounts, and CDs.",
          "NOT covered: stocks, bonds, mutual funds, and crypto - these can lose value with no guarantee."
        ],
        realWorldExample: "In 2023, several banks failed, yet insured depositors lost nothing on covered accounts up to the limits - the FDIC stepped in. Meanwhile, people who held stocks or crypto through those banks had no such protection, because the FDIC only insures deposits, not investments."
      },
      {
        type: "concept",
        title: "Staying Fully Covered and Spotting Real Protection",
        paragraphs: [
          "To make sure your money is protected, confirm the bank is 'FDIC-insured' - almost all real U.S. banks are, and you'll see the FDIC logo at branches and on websites. Credit unions get equivalent coverage from a different agency, the NCUA, up to the same $250,000. If you ever had more than $250,000 at one bank, you'd spread it across multiple insured banks or use different ownership categories to stay fully covered. You can even check exact coverage with the FDIC's free online 'EDIE' calculator, which tells you precisely how much of your money is insured.",
          "The insurance is automatic and free - you never sign up or pay a premium. Banks fund the FDIC through their own fees, not you. When a bank fails, the FDIC usually acts fast, often over a weekend, so customers can access insured money within days, sometimes by moving accounts to a healthy bank. This speed is deliberate: quick payouts prevent panic and bank runs. Because the guarantee is so reliable, chasing a slightly higher interest rate at a lesser-known but still FDIC-insured online bank is perfectly safe, since your covered deposits are backed the same way.",
          "The biggest practical lesson is to know what's insured before you move money. If a company offers an unusually high 'savings' rate, check whether it's actually an FDIC-insured bank account or an uninsured investment product dressed up to look safe. Fintech apps sometimes hold your cash at partner banks that carry FDIC coverage - but only if set up correctly, and only for the cash, not for any crypto or investments in the app. Reading that fine print protects you from assuming a guarantee that isn't really there."
        ],
        bullets: [
          "Look for the FDIC logo; credit unions get equal coverage from the NCUA up to $250,000.",
          "Spread large sums across banks or ownership categories to stay fully covered.",
          "Coverage is automatic and free - banks fund the FDIC, not depositors.",
          "The FDIC acts fast when a bank fails, usually restoring insured access within days.",
          "Verify a high-rate 'savings' product is a real insured account, not an uninsured investment."
        ],
        realWorldExample: "A fintech app advertises 5% on your cash. Reading the fine print, you see it holds deposits at an FDIC-insured partner bank, so your cash is covered to $250,000 - but any crypto you buy in the same app is not insured and could lose all its value."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking3-mc1",
            question: "What is the standard FDIC coverage limit?",
            options: [
              "$250,000 per depositor, per insured bank, per category",
              "$10,000 for every account you ever open over the years",
              "Unlimited coverage on all money you deposit",
              "$1,000,000 shared across all U.S. banks in most cases"
            ],
            correctAnswer: 0,
            explanation: "The standard FDIC limit is $250,000 per depositor, per insured bank, per ownership category. Different account types at the same bank can each be insured separately."
          },
          {
            id: "banking3-mc2",
            question: "Which of these does the FDIC NOT insure?",
            options: [
              "Money in an insured savings account",
              "A certificate of deposit (CD) in most cases",
              "Stocks you bought through the bank",
              "Cash in an insured checking account"
            ],
            correctAnswer: 2,
            explanation: "The FDIC insures deposit accounts like checking, savings, and CDs. It does not cover investments such as stocks, bonds, mutual funds, or crypto, even if bought through a bank - those can lose value."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aisha Worries After a Bank Fails",
        narrative: "Aisha, 18, has $4,000 in a savings account and $1,000 in a CD at a small online bank. She sees news that another bank collapsed and panics that her money could disappear. She checks whether her bank is FDIC-insured and learns what the coverage actually protects.",
        details: [
          "Her bank displays the FDIC logo, so her deposits are insured up to $250,000 - far above her balance.",
          "Both her savings account and her CD are covered deposit types, so all $5,000 is protected.",
          "If the bank ever failed, the FDIC would restore her insured money within days, not lose it.",
          "The app also offers crypto, but Aisha notes those holdings would not be FDIC-insured."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking3-aq1",
          question: "Based on FDIC rules, which statement about Aisha's money is correct?",
          options: [
            "Her crypto in the app is fully insured too",
            "All $5,000 in deposits is safely insured",
            "Only the first $1,000 is protected",
            "Nothing is covered at an online bank"
          ],
          correctAnswer: 1,
          explanation: "Her savings and CD are covered deposits, so all $5,000 is insured, well under the $250,000 limit. Crypto is not FDIC-insured, and online banks with the FDIC logo carry the same protection as branch banks."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The FDIC is a government agency that insures bank deposits if an insured bank fails.",
          "Coverage is $250,000 per depositor, per bank, per ownership category.",
          "Checking, savings, money market deposit accounts, and CDs are covered; investments are not.",
          "Coverage is automatic and free; look for the FDIC logo (or NCUA at credit unions).",
          "Verify that high-rate 'savings' offers are real insured accounts, not uninsured investments."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "banking3-mastery1",
            question: "Why was the FDIC created back in 1933?",
            options: [
              "To set the interest rates every bank must pay",
              "To protect deposits after Depression bank failures",
              "To hand out free loans to new businesses",
              "To print extra money for the government"
            ],
            correctAnswer: 1,
            explanation: "The FDIC was created during the Great Depression, when bank failures wiped out people's savings. It insures deposits so a bank's collapse no longer means customers lose their money."
          },
          {
            id: "banking3-mastery2",
            question: "You have $300,000 in one single checking account at an insured bank. How much is protected?",
            options: [
              "The full $300,000, no limit applies",
              "$250,000, the standard per-category limit",
              "Only $50,000 of the total balance",
              "Nothing, because it exceeds the limit"
            ],
            correctAnswer: 1,
            explanation: "Coverage is $250,000 per depositor, per bank, per ownership category. In one single account, $250,000 is insured; the extra $50,000 would need a different bank or ownership category to be covered."
          },
          {
            id: "banking3-mastery3",
            question: "A bank sells you a mutual fund. Is it FDIC-insured?",
            options: [
              "Yes, anything bought at a bank is insured",
              "No, investments are not FDIC-insured",
              "Yes, but only up to $1,000",
              "Only if the fund loses money that year"
            ],
            correctAnswer: 1,
            explanation: "The FDIC insures deposits, not investments. A mutual fund, stock, or bond bought through a bank can lose value and carries no FDIC guarantee, even though you bought it at the bank."
          },
          {
            id: "banking3-mastery4",
            question: "Credit unions get equivalent deposit insurance from which agency?",
            options: [
              "The FDIC, the very same one",
              "The NCUA, a separate agency",
              "The IRS, through your taxes",
              "No agency; they are uninsured"
            ],
            correctAnswer: 1,
            explanation: "Credit unions are insured by the NCUA, a separate agency that provides the same $250,000 coverage as the FDIC does for banks. Both protect your deposits if the institution fails."
          },
          {
            id: "banking3-mastery5",
            question: "How do you pay for FDIC coverage on your account?",
            options: [
              "A monthly premium taken from savings over the years",
              "You don't; banks fund it, it's free to you",
              "A one-time $250 signup fee in most cases as a rule",
              "A small percentage of every deposit for you"
            ],
            correctAnswer: 1,
            explanation: "FDIC coverage is automatic and free to depositors. Banks pay into the insurance fund themselves, so you get the protection without signing up or paying anything."
          },
          {
            id: "banking3-mastery6",
            question: "An app offers 6% on 'cash.' What should you verify first?",
            options: [
              "Whether the founders seem trustworthy online",
              "Whether it's a real FDIC-insured account",
              "Whether the app has a nice color scheme",
              "Whether your friends already use the app"
            ],
            correctAnswer: 1,
            explanation: "A high rate on 'cash' may be an uninsured investment dressed up as savings. Confirm it's held in a real FDIC-insured account so your money carries the government guarantee - not just marketing."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // banking-4: Interest
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-4",
    sections: [
      {
        type: "concept",
        title: "How Interest Pays You (and Compounds)",
        paragraphs: [
          "Interest is the price of money over time. When you keep money in a savings account, the bank pays you interest for letting it use your funds - it's like rent the bank pays you. The rate is usually shown as an annual percentage. At 4% on $1,000, you'd earn about $40 in a year. Simple interest would stop there, but banks usually pay compound interest, which is where the magic happens. Compounding means you earn interest on your interest, so your balance grows faster and faster the longer you leave it alone.",
          "Here's compounding in action. Put $1,000 in at 5%, compounded yearly. After year one you have $1,050. In year two you earn 5% on $1,050, not just the original $1,000, so you get $52.50, ending at $1,102.50. Each year the base grows, so each year's interest is bigger than the last. Over decades this snowballs dramatically. The key drivers are the rate, how often it compounds (daily beats yearly), and above all time. Starting early is the single biggest advantage a teen has - time turns small amounts into large ones.",
          "A handy shortcut is the Rule of 72: divide 72 by your interest rate to estimate how many years it takes your money to double. At 6%, money doubles in about 12 years (72 ÷ 6). At 8%, about 9 years. This shows why the rate matters so much: a few extra percent slices years off the doubling time. It also reveals why high-interest debt is so dangerous - the same compounding that grows your savings works against you when you owe money, ballooning a credit card balance if you only pay the minimum."
        ],
        bullets: [
          "Interest is what the bank pays you for keeping your money - like rent on your cash.",
          "Compound interest means earning interest on your interest, so growth accelerates over time.",
          "The drivers of growth are the rate, how often it compounds, and especially time.",
          "Rule of 72: divide 72 by the rate to estimate years for money to double (72 ÷ 6% ≈ 12 years).",
          "Compounding also works against you on debt - balances balloon if you pay only the minimum."
        ],
        realWorldExample: "Two teens each save $1,000 at 7%. Ava starts at 15 and leaves it 50 years; using the Rule of 72 it doubles about every 10 years, growing to roughly $32,000. Ben starts at 35 with the same $1,000, so it doubles fewer times and reaches only about $8,000. Same money - starting 20 years earlier quadrupled it."
      },
      {
        type: "concept",
        title: "APY, APR, and Reading the Fine Print",
        paragraphs: [
          "Two terms trip people up: APY and APR. APY - annual percentage yield - is what you EARN on savings, and it already includes the effect of compounding, so it's the honest, all-in rate for comparing accounts. APR - annual percentage rate - is what you PAY on loans and credit cards, and it's the rate before compounding, often shown without fees. When you're saving, look for the highest APY. When you're borrowing, look for the lowest APR. Mixing them up can cost you real money, so always check which one a product is quoting.",
          "Not all savings rates are equal. A big traditional bank might advertise 0.40% APY while an online high-yield savings account offers 4.50% APY for the exact same safety and FDIC coverage. On $5,000, that's the difference between about $20 and $225 a year - over $200 extra for simply choosing a better account. Rates on savings are 'variable,' meaning the bank can change them as the broader economy shifts. CDs, by contrast, lock a fixed rate for a set term, protecting you if rates fall but locking you out if rates rise.",
          "On the borrowing side, APR is the number to fear. A credit card at 24% APR compounds against you: carry a $1,000 balance and you're charged interest monthly, so the debt grows if you don't pay it off. This is why paying your full statement balance each month - avoiding interest entirely - is one of the most powerful money habits. The same force that grows your savings destroys your budget when it's working on debt. Master interest, and you'll instinctively chase high APY on savings while refusing to carry high-APR debt."
        ],
        bullets: [
          "APY is what you EARN (includes compounding) - seek the highest when saving.",
          "APR is what you PAY on loans/cards - seek the lowest when borrowing.",
          "Online high-yield savings can pay 4.5% APY vs 0.4% at big banks, for the same safety.",
          "Savings rates are variable; CDs lock a fixed rate for a set term.",
          "High-APR debt compounds against you - pay statements in full to avoid interest entirely."
        ],
        realWorldExample: "Leo keeps $5,000 in a big-bank account at 0.40% APY, earning about $20 a year. He moves it to an FDIC-insured online bank at 4.50% APY and earns about $225 - an extra $205 a year for a ten-minute switch, with identical safety."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking4-mc1",
            question: "What makes compound interest more powerful than simple interest?",
            options: [
              "It pays interest only on the original amount",
              "It pays interest on your interest too",
              "It is guaranteed by the government",
              "It never changes no matter the rate"
            ],
            correctAnswer: 1,
            explanation: "Compound interest pays you interest on your accumulated interest, not just the original deposit. That makes your balance grow faster and faster the longer you leave it alone."
          },
          {
            id: "banking4-mc2",
            question: "When shopping for a savings account, which number do you want highest?",
            options: [
              "The APR on the account",
              "The APY on the account",
              "The overdraft fee amount in most cases",
              "The number of branches nearby"
            ],
            correctAnswer: 1,
            explanation: "APY is what you earn on savings and includes compounding, so a higher APY means more growth. APR is what you pay on loans - you want that one low, not high."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nina Uses the Rule of 72",
        narrative: "Nina, 16, has $2,000 saved and is deciding between her current bank at 0.5% APY and an FDIC-insured online bank at 5% APY. She wants to understand roughly how her money could grow and uses the Rule of 72 to compare.",
        details: [
          "At 5% APY, the Rule of 72 (72 ÷ 5) says her money doubles in about 14 years.",
          "At 0.5% APY, doubling would take roughly 144 years - essentially never in her lifetime.",
          "Both accounts are FDIC-insured, so the higher-APY online bank is just as safe.",
          "Starting now at 16 gives compounding decades to work, her single biggest advantage."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking4-aq1",
          question: "Using the Rule of 72, which choice best helps Nina's money grow?",
          options: [
            "Keep it at 0.5% since it feels familiar",
            "Move it to the 5% APY insured account",
            "Wait until age 40 to start saving in most cases",
            "Split it evenly to avoid all interest"
          ],
          correctAnswer: 1,
          explanation: "At 5% APY her money doubles in about 14 years versus about 144 years at 0.5%, and both are equally FDIC-insured. Moving to the higher-APY account and starting young lets compounding do the heavy lifting."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Interest is what the bank pays you for keeping your money; compounding pays interest on interest.",
          "Growth depends on the rate, compounding frequency, and above all time - start early.",
          "Rule of 72: divide 72 by the rate to estimate years to double your money.",
          "APY is what you earn (seek high); APR is what you pay (seek low).",
          "The same compounding that grows savings balloons high-APR debt, so pay balances in full."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "banking4-mastery1",
            question: "$1,000 at 5% compounded yearly. After two years you have about…",
            options: [
              "$1,100, just simple interest twice",
              "$1,102.50, thanks to compounding",
              "$1,050, only one year of growth",
              "$1,010, a rounding of the rate"
            ],
            correctAnswer: 1,
            explanation: "Year one adds $50 for $1,050. Year two earns 5% on $1,050, which is $52.50, ending at $1,102.50. Compounding pays interest on the interest, so it beats simple interest of $1,100."
          },
          {
            id: "banking4-mastery2",
            question: "By the Rule of 72, money at 8% roughly doubles in…",
            options: [
              "About 9 years (72 ÷ 8)",
              "About 8 years, matching the rate",
              "About 72 years, always fixed in most cases",
              "About 40 years, half a lifetime"
            ],
            correctAnswer: 0,
            explanation: "The Rule of 72 divides 72 by the rate: 72 ÷ 8 = 9 years to double. A higher rate shortens the doubling time, which is why the rate matters so much over the long run."
          },
          {
            id: "banking4-mastery3",
            question: "Which factor most helps a teen's savings grow large?",
            options: [
              "A fancy debit card design",
              "Starting early to gain more time",
              "Withdrawing often for practice in most cases",
              "Choosing the closest branch over the years"
            ],
            correctAnswer: 1,
            explanation: "Time is the biggest driver of compound growth. Starting early gives interest many years to compound, turning small amounts into large ones - an advantage teens have over older savers."
          },
          {
            id: "banking4-mastery4",
            question: "APR is the number you care about most when…",
            options: [
              "Opening a high-yield savings account over the years",
              "Borrowing on a loan or credit card",
              "Checking your account balance in most cases",
              "Setting up direct deposit at work instead"
            ],
            correctAnswer: 1,
            explanation: "APR is what you PAY when borrowing, so you want it as low as possible on loans and cards. APY, which you want high, is what you EARN on savings - don't confuse the two."
          },
          {
            id: "banking4-mastery5",
            question: "A big bank offers 0.4% APY and an online bank offers 4.5% APY, both insured. On $5,000 the online bank earns roughly…",
            options: [
              "$20 versus $225 - about $205 more",
              "The exact same amount either way over the years",
              "Less, because online banks are riskier",
              "$5 more, a tiny difference in most cases"
            ],
            correctAnswer: 0,
            explanation: "0.4% of $5,000 is about $20; 4.5% is about $225. That's roughly $205 more a year for the same FDIC-insured safety - a strong reason to shop for a higher APY."
          },
          {
            id: "banking4-mastery6",
            question: "Why is carrying a 24% APR credit card balance dangerous?",
            options: [
              "The bank freezes your account for it",
              "Compounding makes the debt grow fast",
              "It raises your savings APY too high",
              "It doubles your paycheck each month"
            ],
            correctAnswer: 1,
            explanation: "At 24% APR, interest compounds against you monthly, so an unpaid balance grows quickly if you only pay the minimum. The same compounding that helps savings works against you on debt."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // banking-5: Online vs Traditional
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-5",
    sections: [
      {
        type: "concept",
        title: "Two Models: Branches vs Screens",
        paragraphs: [
          "A traditional bank runs physical branches with tellers, ATMs, and in-person service. You can walk in, deposit cash, get a cashier's check, or sit with someone to open an account. Big names like Chase, Bank of America, and Wells Fargo are traditional banks. All that real estate and staff costs money, so these banks tend to pay low interest on savings and charge more fees. Their strength is presence: if you handle cash a lot, want face-to-face help, or value a nearby branch and huge ATM network, a traditional bank delivers convenience you can touch and a person you can talk to when something goes wrong.",
          "An online bank has no branches at all - everything happens through an app or website. Because it doesn't pay for buildings and tellers, an online bank passes those savings to you as higher interest and lower fees. Online banks routinely offer 4% to 5% APY on savings when traditional banks offer under 0.5%, and many have no monthly maintenance fee and no minimum balance. The tradeoff: you can't walk into a branch, depositing physical cash is harder, and customer service happens by phone or chat instead of across a desk.",
          "Both types are equally safe if they're FDIC-insured - the government guarantee is identical whether the bank has a thousand branches or none. So the choice isn't about safety; it's about how you actually use money. If you rarely handle cash, are comfortable on your phone, and want the best rates, an online bank wins. If you deposit cash often or want in-person help, a traditional bank earns its keep. Many people use a hybrid: a traditional bank for cash and daily checking, plus an online high-yield savings account to grow their money."
        ],
        bullets: [
          "Traditional banks have branches and ATMs but pay low interest and charge more fees.",
          "Online banks have no branches, so they offer higher APY and lower (often zero) fees.",
          "Online banks make cash deposits harder and offer only phone/chat support.",
          "Both are equally safe if FDIC-insured - the guarantee doesn't depend on branches.",
          "A hybrid setup is common: traditional for cash, online high-yield for savings growth."
        ],
        realWorldExample: "Carlos keeps checking at a traditional bank so he can deposit cash tips from his job at a branch. But he parks his savings in an online bank at 4.5% APY instead of his traditional bank's 0.4%. On $3,000 of savings, that hybrid choice earns him about $123 more a year."
      },
      {
        type: "concept",
        title: "Choosing What Fits Your Life",
        paragraphs: [
          "To pick well, start with how you get and spend money. Do you receive lots of physical cash (tips, allowance, cash jobs)? Traditional branches make cash deposits easy; online banks may require you to first deposit cash somewhere else. Do you get paid by direct deposit and pay everything digitally? Then an online bank's higher rates and lower fees are pure upside. Also weigh the ATM network - many online banks reimburse out-of-network ATM fees, effectively giving you access to any machine, which can beat a traditional bank's own network.",
          "Look past the shiny APY to the full picture: minimum balance rules, monthly fees, mobile check deposit quality, how fast transfers clear, and customer service reputation. A great app matters because with an online bank the app IS the branch. Read reviews on how the bank handles problems - locked accounts, fraud, disputes - since you'll resolve those remotely. For teens, many online banks and fintech apps offer teen/student accounts with parental controls, no fees, and strong apps, making them a natural fit for a phone-first generation.",
          "There's no single right answer; there's a right answer for you. A cash-heavy small-business owner may lean traditional. A digital-native teen who never touches cash may go fully online and pocket the higher rates. The smartest move is often to stop being loyal to one bank: put your everyday checking wherever it's most convenient, and put your savings wherever the APY is highest and FDIC-insured. Money is mobile - transferring between banks is free and takes a day or two - so you can capture the best of both worlds."
        ],
        bullets: [
          "Match the bank to how you handle money: cash-heavy favors branches, digital favors online.",
          "Many online banks reimburse ATM fees, effectively expanding your cash access.",
          "Judge the full picture: fees, minimums, app quality, transfer speed, and service reputation.",
          "For online banks the app is the branch, so app quality and support matter most.",
          "Don't be loyal to one bank - split checking and savings to capture the best of both."
        ],
        realWorldExample: "Maya, 17, gets paid by direct deposit and pays for everything with her phone. She opens a no-fee online teen account at 4.75% APY with fee-free ATM reimbursements. She never needs a branch, and her savings grow far faster than at the big bank her parents use."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking5-mc1",
            question: "Why can online banks usually offer higher interest than traditional banks?",
            options: [
              "They take bigger risks with your money in most cases",
              "They save on branches and pass it to you",
              "They are not required to be FDIC-insured over the years",
              "They charge you a secret monthly fee"
            ],
            correctAnswer: 1,
            explanation: "Online banks have no physical branches or tellers to pay for, so they pass those savings to customers as higher APY and lower fees - not by taking extra risk."
          },
          {
            id: "banking5-mc2",
            question: "Which is a real advantage of a traditional bank?",
            options: [
              "It always pays the highest savings APY",
              "Easy in-person cash deposits and help",
              "It never charges any account fees",
              "It skips FDIC insurance to save money"
            ],
            correctAnswer: 1,
            explanation: "Traditional banks shine at in-person service and easy cash deposits at branches. They usually pay lower APY and charge more fees, and both bank types should be FDIC-insured."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tariq Handles Cash Tips",
        narrative: "Tariq, 18, works at a restaurant and earns most of his money in cash tips. He wants both easy cash deposits and the best possible interest on his savings. He's deciding between staying fully with his traditional bank or adding an online account.",
        details: [
          "His traditional bank lets him deposit cash tips easily at a nearby branch.",
          "That same bank pays only 0.4% APY, so his savings barely grow there.",
          "An FDIC-insured online bank offers 4.5% APY but makes depositing physical cash harder.",
          "A hybrid setup - traditional for cash checking, online for high-yield savings - fits his situation."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking5-aq1",
          question: "What setup best fits Tariq's cash tips and desire for high interest?",
          options: [
            "Keep everything at the low-rate traditional bank",
            "Use traditional for cash, online for savings",
            "Move all cash tips into crypto instead",
            "Avoid banks and keep tips under his bed"
          ],
          correctAnswer: 1,
          explanation: "A hybrid captures both strengths: the traditional branch handles his cash deposits, while the online bank grows his savings at a far higher APY. Both are FDIC-insured, so it's safe."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Traditional banks offer branches and cash deposits but lower APY and more fees.",
          "Online banks offer higher APY and lower fees but no branches and harder cash deposits.",
          "Both are equally safe when FDIC-insured; the choice is about how you use money.",
          "Judge banks on fees, minimums, app quality, ATM access, and service, not just APY.",
          "A hybrid - traditional checking plus online high-yield savings - often wins."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "banking5-mastery1",
            question: "Between an FDIC-insured online bank and traditional bank, which is safer?",
            options: [
              "The traditional bank, since it has branches",
              "They are equally safe when FDIC-insured",
              "The online bank, since it uses newer tech",
              "Neither one is safe for teen savings"
            ],
            correctAnswer: 1,
            explanation: "FDIC insurance is identical whether a bank has many branches or none. Safety doesn't depend on physical presence, so both are equally safe when insured - the choice is about convenience and rates."
          },
          {
            id: "banking5-mastery2",
            question: "You handle a lot of physical cash. Which bank type fits better?",
            options: [
              "An online bank with no branches at all",
              "A traditional bank with nearby branches",
              "Neither; cash cannot be banked today",
              "Only a crypto wallet on your phone"
            ],
            correctAnswer: 1,
            explanation: "Traditional banks make cash deposits easy at branches, while online banks often require depositing cash elsewhere first. If you handle lots of cash, a traditional bank is more convenient."
          },
          {
            id: "banking5-mastery3",
            question: "How do many online banks solve limited ATM access?",
            options: [
              "They ban all ATM withdrawals entirely",
              "They reimburse out-of-network ATM fees",
              "They mail you cash by request only",
              "They build thousands of new branches"
            ],
            correctAnswer: 1,
            explanation: "Many online banks reimburse out-of-network ATM fees, effectively letting you use any machine for free. This offsets their lack of a proprietary ATM network."
          },
          {
            id: "banking5-mastery4",
            question: "For an online bank, why does app quality matter so much?",
            options: [
              "The app is basically your only branch",
              "The app sets your FDIC coverage limit",
              "The app decides your interest rate daily",
              "The app replaces the need for a password"
            ],
            correctAnswer: 0,
            explanation: "With no physical branches, the app is where you do everything - deposits, transfers, disputes, support. A weak app makes an online bank frustrating, so app quality is a key factor."
          },
          {
            id: "banking5-mastery5",
            question: "A smart way to get the best of both bank types is to…",
            options: [
              "Stay fully loyal to one big bank forever",
              "Split checking and savings across both",
              "Keep all money as cash to stay flexible",
              "Open ten accounts at the same branch"
            ],
            correctAnswer: 1,
            explanation: "Putting everyday checking where it's convenient and savings where the APY is highest captures both strengths. Money transfers between banks are free and quick, so loyalty to one isn't necessary."
          },
          {
            id: "banking5-mastery6",
            question: "Besides APY, what else should you compare between banks?",
            options: [
              "Only the color of the debit card",
              "Fees, minimums, app quality, and service",
              "The age of the bank's founder",
              "How many TV ads the bank runs"
            ],
            correctAnswer: 1,
            explanation: "A high APY can be undercut by monthly fees, minimum balances, a clunky app, or poor service. Comparing the full picture - not just the headline rate - leads to a better choice."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // banking-6: Direct Deposit
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-6",
    sections: [
      {
        type: "concept",
        title: "What Direct Deposit Is and Why It Wins",
        paragraphs: [
          "Direct deposit means your employer sends your pay straight into your bank account electronically, instead of handing you a paper check. It runs on the ACH network, the system banks use to move money between accounts. To set it up, you give your employer a form with your bank's routing number (which identifies the bank) and your account number (which identifies you). On payday the money simply appears - no check to cash, no trip to the bank, no waiting in line. For most people it's the default way to get paid, and it's usually the fastest.",
          "The benefits stack up quickly. First, speed: direct deposit funds are typically available on payday morning, and some banks release them a day or two early, while a paper check can take days to clear. Second, no lost or stolen checks and no check-cashing fees - places that cash checks for the unbanked often charge 1% to 5%, which is pure waste. Third, convenience: it happens automatically every pay period without any effort from you. Many banks even waive their monthly maintenance fee if you set up direct deposit, saving another $10 to $15 a month.",
          "Direct deposit also unlocks a powerful habit: automation. Many employers and banks let you split your deposit, sending part to checking and part straight to savings. So you can route, say, $50 of every paycheck into savings before it ever hits your spending account. This is 'paying yourself first' on autopilot - you save without thinking about it or feeling the pinch, because the money never sits in checking tempting you to spend it. Automating savings is one of the most reliable ways to build wealth, and direct deposit makes it effortless."
        ],
        bullets: [
          "Direct deposit sends your pay electronically into your account via the ACH network.",
          "Setup needs your bank's routing number and your account number on an employer form.",
          "Benefits: faster access, no lost checks, no check-cashing fees, and often waived bank fees.",
          "Many banks let you split a deposit between checking and savings automatically.",
          "Splitting to savings automates 'paying yourself first' so you save without effort."
        ],
        realWorldExample: "Elena sets up direct deposit and tells her employer to route $40 of each biweekly paycheck to savings and the rest to checking. Over a year that's about $1,040 saved automatically, plus her bank drops its $12 monthly fee - roughly $144 more kept - all with zero ongoing effort."
      },
      {
        type: "concept",
        title: "Setting It Up Safely and Avoiding Pitfalls",
        paragraphs: [
          "Setting up direct deposit is straightforward but requires accuracy. You'll provide a voided check or a direct deposit form from your bank's app that lists the correct routing and account numbers. Double-check every digit: a wrong account number can send your pay to the wrong place and take time to recover. It usually takes one or two pay cycles to activate, so your first payment might still be a paper check while the setup processes. Keep an eye on your account to confirm the first electronic deposit lands correctly.",
          "Guard those numbers. Your routing and account numbers aren't as sensitive as a password, but they should still be shared only with trusted parties like a real employer or a legitimate biller. Scammers sometimes ask for bank details under fake job offers or 'overpayment' schemes, so never hand your account info to an unverified source. Real employers put direct deposit through HR or payroll, never through a random text or a request to buy gift cards. If a 'job' wants your bank login or asks you to move money for them, it's a scam.",
          "Direct deposit pairs perfectly with related automations. You can set up automatic bill pay so rent or a subscription is paid on time, and automatic transfers to savings or investments the day after payday, when the money is fresh. The goal is a system where good financial behavior happens by default. Just remember to keep enough in checking to cover automatic payments, so an auto bill-pay doesn't trigger an overdraft. Set up thoughtfully, direct deposit becomes the foundation of an automated, low-stress money system."
        ],
        bullets: [
          "Provide accurate routing and account numbers via a voided check or bank form; verify every digit.",
          "Setup takes one to two pay cycles, so your first payment may still be a paper check.",
          "Share bank numbers only with trusted employers or billers - scammers fake job offers to get them.",
          "Pair direct deposit with auto bill-pay and auto transfers to savings for a hands-off system.",
          "Keep a checking cushion so automatic payments don't accidentally cause an overdraft."
        ],
        realWorldExample: "A fake online 'job' texts Ravi asking for his bank account login to 'set up direct deposit' and to buy gift cards for supplies. Ravi recognizes the scam - real employers use payroll and never ask for logins or gift cards - and blocks the sender, protecting his money."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking6-mc1",
            question: "What two numbers do you give an employer to set up direct deposit?",
            options: [
              "Your PIN and your Social Security number",
              "Your routing number and account number",
              "Your debit card number and its expiry",
              "Your online password and username"
            ],
            correctAnswer: 1,
            explanation: "Direct deposit needs your bank's routing number (which identifies the bank) and your account number (which identifies your account). You never share your PIN or online password with an employer."
          },
          {
            id: "banking6-mc2",
            question: "How does splitting a direct deposit help you save?",
            options: [
              "It doubles your paycheck automatically in most cases",
              "It sends part to savings before you spend",
              "It removes all fees from your account over the years",
              "It pays you interest on future checks"
            ],
            correctAnswer: 1,
            explanation: "Splitting routes part of each paycheck straight to savings before it hits checking, so you save automatically without the temptation to spend it - 'paying yourself first' on autopilot."
          }
        ]
      },
      {
        type: "scenario",
        title: "Grace Automates Her First Job",
        narrative: "Grace, 16, just got her first part-time job and can be paid by paper check or direct deposit. She wants her pay fast, wants to avoid fees, and hopes to build a savings habit without much willpower. Her bank offers automatic split deposits.",
        details: [
          "Direct deposit makes her pay available on payday morning, versus days to cash a paper check.",
          "Her bank waives its $10 monthly fee when direct deposit is active, saving $120 a year.",
          "She splits her deposit so $30 of each paycheck goes to savings automatically.",
          "A fake text later asks for her bank login to 'set up pay' - she ignores it as a scam."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking6-aq1",
          question: "Which of Grace's choices best builds a savings habit with little effort?",
          options: [
            "Cashing paper checks and saving leftovers",
            "Splitting her deposit straight into savings",
            "Giving her bank login to the texter",
            "Waiting years before saving anything"
          ],
          correctAnswer: 1,
          explanation: "Splitting the deposit sends money to savings automatically before Grace can spend it, building the habit without willpower. Saving 'leftovers' rarely works, and sharing a login is a scam."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Direct deposit sends pay electronically to your account using routing and account numbers.",
          "It's faster than paper checks, avoids check-cashing fees, and often waives bank fees.",
          "Splitting a deposit into savings automates 'paying yourself first.'",
          "Verify the numbers carefully and share bank details only with trusted employers or billers.",
          "Pair it with auto bill-pay and transfers, keeping a checking cushion to avoid overdrafts."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "banking6-mastery1",
            question: "Direct deposit moves your pay using which system?",
            options: [
              "The stock exchange trading floor",
              "The ACH network between banks",
              "A physical armored delivery truck",
              "The postal service by mail"
            ],
            correctAnswer: 1,
            explanation: "Direct deposit runs on the ACH network, the electronic system banks use to move money between accounts. That's why the pay simply appears in your account on payday."
          },
          {
            id: "banking6-mastery2",
            question: "A key money benefit of direct deposit over paper checks is…",
            options: [
              "It guarantees you a bigger paycheck",
              "It avoids costly check-cashing fees",
              "It raises your credit score instantly",
              "It makes your account FDIC-insured"
            ],
            correctAnswer: 1,
            explanation: "Direct deposit lands electronically, so you skip check-cashing services that charge 1%-5%. It doesn't change your pay amount, credit score, or FDIC status - those are unrelated."
          },
          {
            id: "banking6-mastery3",
            question: "You set up direct deposit but your first pay is still a paper check. Why?",
            options: [
              "The setup usually takes a cycle or two",
              "Direct deposit is illegal on a first job",
              "Your bank secretly rejected the request in most cases",
              "You must pay a fee to activate it first"
            ],
            correctAnswer: 0,
            explanation: "Direct deposit typically takes one to two pay cycles to activate. During that time your employer may still issue a paper check while the electronic setup finishes processing."
          },
          {
            id: "banking6-mastery4",
            question: "A 'job' texts asking for your bank login to set up pay. You should…",
            options: [
              "Send it quickly so pay starts on time",
              "Refuse; real employers never ask that",
              "Share only your password, not username",
              "Give it if they promise a signing bonus"
            ],
            correctAnswer: 1,
            explanation: "Legitimate employers set up direct deposit through payroll and never ask for your bank login. A request like that is a scam, so refuse and don't share credentials no matter the promised reward."
          },
          {
            id: "banking6-mastery5",
            question: "Why keep a cushion in checking after automating bill-pay?",
            options: [
              "So automatic payments don't cause overdrafts",
              "So the bank raises your savings APY",
              "So your paycheck arrives a day early",
              "So you can skip paying the bills entirely"
            ],
            correctAnswer: 0,
            explanation: "Automatic payments pull money on schedule. If checking runs too low, a payment can overdraw the account and trigger a fee. A cushion ensures the auto-payments clear without penalties."
          },
          {
            id: "banking6-mastery6",
            question: "Which pairs best with direct deposit for a hands-off money system?",
            options: [
              "Cashing every check at a fee-charging store",
              "Auto bill-pay and auto transfers to savings",
              "Withdrawing all pay as cash each week",
              "Closing your account after each payday in most cases"
            ],
            correctAnswer: 1,
            explanation: "Combining direct deposit with automatic bill-pay and automatic savings transfers makes good behavior the default, so bills get paid on time and savings grow without ongoing effort."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // banking-7: Overdrafts
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-7",
    sections: [
      {
        type: "concept",
        title: "What an Overdraft Is and What It Costs",
        paragraphs: [
          "An overdraft happens when you spend more money than you have in your checking account. Say you have $30 and swipe your debit card for a $45 purchase. The account goes negative, and how the bank handles that moment decides whether it costs you nothing or a lot. If the bank pays the $45 anyway, it charges an overdraft fee - commonly about $35 - so a $15 shortfall can cost $50 total. If the bank instead declines the card, the purchase just fails, which is annoying but free. Understanding this choice is the key to never overpaying.",
          "The fees add up fast because banks can charge one per transaction. If you overdraw and then make three more small purchases before noticing, you could rack up four $35 fees - $140 - in a single afternoon on tiny buys. Some banks also add a daily 'extended overdraft' fee if the balance stays negative for days. This is why overdraft fees are one of the biggest and most avoidable costs in banking. The dollar amounts are wildly out of proportion to the tiny sums that trigger them, which is exactly why they're so profitable for banks.",
          "There's also 'overdraft protection,' which sounds friendly but isn't free. It links your checking to a savings account or credit line so that if you overdraw, money is automatically pulled to cover it. That prevents a declined card, but banks often charge a smaller transfer fee (say $10) for the move, and if it pulls from a credit line you may owe interest. The truly free option most banks offer is to simply decline transactions when you're short - no fee, the purchase just doesn't go through. For most teens, choosing to decline is the smartest default."
        ],
        bullets: [
          "An overdraft is spending more than your balance; the account goes negative.",
          "If the bank covers it, expect an overdraft fee around $35 - even on a small shortfall.",
          "Banks can charge one fee per transaction, so several small buys can mean multiple fees.",
          "'Overdraft protection' links accounts to cover shortfalls, often for a smaller transfer fee.",
          "Choosing to have transactions declined when you're short is usually free - and often smartest."
        ],
        realWorldExample: "Jaden has $20 but buys coffee ($6), a snack ($4), lunch ($9), and a bus pass ($3) - $22 total. With overdraft coverage on, the last two swipes each trigger a $35 fee, turning a $2 shortfall into $70 in fees. Had his card simply declined, he'd have paid nothing extra."
      },
      {
        type: "concept",
        title: "How to Avoid Overdraft Fees Entirely",
        paragraphs: [
          "Overdraft fees are almost 100% avoidable, and step one is opting out of overdraft coverage on debit-card and ATM transactions. By law, banks must ask before enrolling you, and if you say no, a purchase that would overdraw simply gets declined - free. Many banks and fintech apps built for young people don't charge overdraft fees at all, or offer a small fee-free buffer (like $50). Choosing one of those accounts removes the risk entirely. When opening any account, ask directly: 'What happens if I try to spend more than I have?'",
          "Step two is awareness. Check your balance in the app before big purchases, and remember that pending transactions and scheduled bills may not show yet, so your 'available' balance can be lower than it looks. Setting up low-balance alerts - a text when you drop below, say, $25 - gives you a heads-up before trouble. Keeping a small cushion, like always leaving $50 untouched in checking, absorbs surprises. These habits cost nothing and prevent the exact situations that trigger fees.",
          "If you do get hit with an overdraft fee, don't just accept it - call the bank and politely ask them to waive it, especially if it's your first time or a rare slip. Banks frequently reverse a fee to keep a good customer, so a two-minute phone call can save you $35. Going forward, the combination of opting out of coverage, watching your balance, setting alerts, and keeping a cushion means overdraft fees basically disappear from your life. That's real money kept in your pocket instead of the bank's."
        ],
        bullets: [
          "Opt out of overdraft coverage so risky purchases are declined for free instead of fee-charged.",
          "Choose accounts (often teen/fintech ones) with no overdraft fees or a fee-free buffer.",
          "Watch your available balance; pending charges and bills can make it lower than it appears.",
          "Set low-balance alerts and keep a small cushion (like $50) to absorb surprises.",
          "If charged, call and politely request a waiver - banks often reverse a first or rare fee."
        ],
        realWorldExample: "After one $35 overdraft, Sofia calls her bank and politely asks them to waive it since it's her first. They reverse the charge. She then opts out of overdraft coverage and sets a $25 low-balance alert, so it never happens again - a two-minute call plus two settings that end the problem for good."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking7-mc1",
            question: "What triggers an overdraft fee?",
            options: [
              "Earning too much interest on savings",
              "Spending more than your account balance",
              "Setting up a direct deposit at work",
              "Keeping a large cushion in checking"
            ],
            correctAnswer: 1,
            explanation: "An overdraft fee is charged when you spend more than you have and the bank covers the shortfall. The account goes negative, and the bank adds a fee (often about $35)."
          },
          {
            id: "banking7-mc2",
            question: "What's the free way to avoid overdraft fees on debit purchases?",
            options: [
              "Opt out so short purchases are declined",
              "Enroll in paid overdraft protection in most cases",
              "Overdraw only on small amounts over the years",
              "Close your account each month"
            ],
            correctAnswer: 0,
            explanation: "If you opt out of overdraft coverage, a purchase that would overdraw simply gets declined for free instead of going through and triggering a ~$35 fee. It's the safest default for most teens."
          }
        ]
      },
      {
        type: "scenario",
        title: "Malik's Costly Afternoon",
        narrative: "Malik, 17, has $18 in checking and overdraft coverage turned on. Over an afternoon he makes four small debit purchases without checking his balance, and his account slips negative partway through. He later sees the damage and wants to make sure it never happens again.",
        details: [
          "His account went negative on the third purchase, and coverage let the last two go through.",
          "Each of those two transactions triggered a $35 fee - $70 total on tiny buys.",
          "Had he opted out of coverage, the third and fourth cards would have simply declined for free.",
          "He plans to call the bank for a first-time waiver, then opt out and set a low-balance alert."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking7-aq1",
          question: "What's Malik's best plan to prevent future overdraft fees?",
          options: [
            "Keep coverage on and hope he remembers",
            "Opt out of coverage and set balance alerts",
            "Only shop with a credit card from now on",
            "Overdraw on purpose to earn rewards in most cases"
          ],
          correctAnswer: 1,
          explanation: "Opting out means risky purchases decline for free instead of racking up $35 fees, and low-balance alerts warn him early. Hoping to remember isn't reliable, and overdrafts never earn rewards."
        }
      },
      {
        type: "recap",
        takeaways: [
          "An overdraft is spending more than your balance; covered overdrafts trigger fees around $35.",
          "Banks can charge one fee per transaction, so several small buys can mean multiple fees.",
          "Opting out of overdraft coverage makes short purchases decline for free.",
          "Watch your available balance, set low-balance alerts, and keep a small cushion.",
          "If charged a fee, politely ask the bank to waive it - they often reverse a first offense."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "banking7-mastery1",
            question: "You have $10 and swipe for $25 with coverage on. What likely happens?",
            options: [
              "The purchase is free and rewarded over the years",
              "It clears but adds a ~$35 overdraft fee",
              "The bank pays you $15 in interest",
              "Your account is closed immediately in most cases"
            ],
            correctAnswer: 1,
            explanation: "With coverage on, the bank pays the $25 and charges an overdraft fee around $35, so a $15 shortfall costs about $50 total. That's why overdrafts are such an expensive, avoidable trap."
          },
          {
            id: "banking7-mastery2",
            question: "Why can one low-balance afternoon cost multiple fees?",
            options: [
              "Fees stack once per calendar year",
              "Banks can charge a fee per transaction",
              "Interest compounds every single hour in most cases",
              "The bank fines you for using the app"
            ],
            correctAnswer: 1,
            explanation: "Banks may charge an overdraft fee on each transaction that overdraws the account. A few small purchases after going negative can each add ~$35, so fees pile up fast."
          },
          {
            id: "banking7-mastery3",
            question: "Opting OUT of overdraft coverage means a too-large purchase will…",
            options: [
              "Go through with a discounted fee",
              "Be declined for free at checkout",
              "Trigger an automatic loan you repay",
              "Freeze your account for 30 days"
            ],
            correctAnswer: 1,
            explanation: "If you opt out, the bank simply declines a purchase you can't afford, with no fee. The transaction fails - mildly inconvenient but far better than paying ~$35 to overdraw."
          },
          {
            id: "banking7-mastery4",
            question: "Which habit best warns you before an overdraft?",
            options: [
              "Ignoring your balance until payday",
              "Setting a low-balance text alert",
              "Turning off your banking app",
              "Making only large purchases in most cases"
            ],
            correctAnswer: 1,
            explanation: "A low-balance alert texts you when you drop below a set amount, giving you a chance to stop before overdrawing. Ignoring your balance is exactly what leads to surprise fees."
          },
          {
            id: "banking7-mastery5",
            question: "Your 'available' balance can be lower than expected because…",
            options: [
              "The bank hides money to earn interest",
              "Pending charges and bills aren't shown yet",
              "Savings interest is deducted daily in most cases",
              "ATMs randomly reduce your total over the years"
            ],
            correctAnswer: 1,
            explanation: "Pending transactions and scheduled bills may not appear immediately, so your true available balance is often lower than the displayed number. Assuming the higher figure can cause an overdraft."
          },
          {
            id: "banking7-mastery6",
            question: "You got your first-ever overdraft fee. A smart first step is to…",
            options: [
              "Accept it silently and move on over the years",
              "Politely ask the bank to waive it",
              "Close the account out of anger",
              "Overdraw again to feel even in most cases"
            ],
            correctAnswer: 1,
            explanation: "Banks frequently reverse a first or rare overdraft fee for a good customer if you simply call and ask politely. A two-minute call can recover the ~$35 before you fix your settings."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // banking-8: Fraud & Security
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-8",
    sections: [
      {
        type: "concept",
        title: "How Scammers Try to Steal Your Money",
        paragraphs: [
          "Most bank fraud today doesn't involve a mask and a getaway car - it involves tricking YOU into handing over access. The most common attack is phishing: a fake email, text, or call that pretends to be your bank and creates urgency, like 'Suspicious login detected - verify your account now' with a link to a fake login page. If you type your username and password there, the scammer captures them. A close cousin is 'smishing' (phishing by text) and 'vishing' (by phone), where a caller impersonates your bank's fraud department and pressures you to 'confirm' your details or read back a code.",
          "Scammers also exploit real features. A big one is the payment-app scam: a fake buyer or 'bank agent' asks you to send money on Zelle, Venmo, or Cash App to 'verify' your account or claim a prize. These transfers are instant and irreversible, so once you send, the money is gone - unlike a fraudulent charge on your card, which can be reversed. Another trick is the 'verification code' scam: they text you a real code your bank just sent, then call pretending to be the bank and ask you to read it back, using it to break into your account. Your bank will NEVER ask you to share a code.",
          "The golden rules protect you from almost all of it. Your bank will never ask for your password, PIN, full card number, or a one-time code by phone, text, or email. Never click links in unexpected messages - go to the app or type the website yourself. Treat urgency as a red flag, not a reason to hurry; scammers manufacture panic so you act before thinking. And remember the money-flow rule: reversing a card charge is possible, but sending money via Zelle, Venmo, wire, or gift cards is usually permanent, which is exactly why scammers demand those methods."
        ],
        bullets: [
          "Phishing/smishing/vishing: fake bank messages create urgency to steal your login or codes.",
          "Your bank will NEVER ask for your password, PIN, full card number, or a one-time code.",
          "Payment-app and wire transfers (Zelle, Venmo, gift cards) are instant and usually irreversible.",
          "Never click links in unexpected messages - open the real app or type the site yourself.",
          "Manufactured urgency is a red flag; slow down and verify before acting."
        ],
        realWorldExample: "Kayla gets a text: 'CHASE ALERT: $499 charge. Reply NO or call this number.' She calls, and a 'fraud agent' asks her to read back the code her bank just texted her. She stops - real banks never ask for codes - hangs up, and checks her account directly through the official app, where nothing is wrong."
      },
      {
        type: "concept",
        title: "Building Strong Defenses and Recovering Fast",
        paragraphs: [
          "Good defense starts with strong logins. Use a long, unique password for your bank - never reuse the one from your email or games, because if one site is breached, reused passwords let thieves in everywhere. A password manager makes this easy. Then turn on two-factor authentication (2FA), which requires a second step (a code or app approval) to log in, so a stolen password alone isn't enough. Enable your bank's alerts for logins, large purchases, and low balances, so you spot anything wrong within minutes instead of weeks.",
          "Daily habits matter too. Avoid logging into your bank on public Wi-Fi without protection, since open networks can be snooped; use your phone's data or a trusted network instead. Keep your phone and apps updated, because updates patch security holes. Set a lock screen and enable biometric login (fingerprint or face) so a lost phone doesn't equal a drained account. Never save your full card details in random shopping sites you don't trust, and review your statements regularly - catching a small unfamiliar charge early can stop a bigger theft.",
          "If fraud happens, speed is everything. Contact your bank immediately to freeze the card or account and dispute the charges - federal rules limit your liability on debit and credit fraud, but only if you report promptly (often within a couple of days for the strongest protection). Change your password and any reused ones, and turn on 2FA if you hadn't. For identity theft, report it and consider freezing your credit. The mindset to keep: you can't stop scammers from trying, but strong logins, alerts, and fast reporting mean their attempts rarely succeed and are quickly reversed."
        ],
        bullets: [
          "Use a long, unique password for banking and never reuse it across sites.",
          "Turn on two-factor authentication so a stolen password alone can't log in.",
          "Enable transaction and login alerts to catch problems within minutes.",
          "Avoid banking on unsecured public Wi-Fi; keep devices updated and screen-locked.",
          "If fraud hits, report to your bank immediately to freeze and dispute - fast reporting limits liability."
        ],
        realWorldExample: "Marcus notices a $60 charge he didn't make. He calls his bank that same day, they freeze the card and refund the charge, and he turns on 2FA and transaction alerts. Because he reported within a day, his liability was zero - fast action turned a theft into a minor hassle."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking8-mc1",
            question: "Your 'bank' texts a link asking you to verify your login now. You should…",
            options: [
              "Click the link and enter your password in most cases",
              "Ignore the link and open the real app",
              "Reply with your PIN to confirm identity",
              "Read back any code they text you"
            ],
            correctAnswer: 1,
            explanation: "Unexpected links are a classic phishing trick. Never click them or share passwords, PINs, or codes. Instead, open your bank's official app or type the website yourself to check your account safely."
          },
          {
            id: "banking8-mc2",
            question: "Why do scammers prefer Zelle, wires, or gift cards?",
            options: [
              "Those transfers earn them loyalty points",
              "Those transfers are fast and irreversible",
              "Banks reward customers for using them",
              "They are the only ways to send money"
            ],
            correctAnswer: 1,
            explanation: "Payment-app transfers, wires, and gift cards move money instantly and usually can't be reversed. Card charges can be disputed, so scammers push the irreversible methods to keep the stolen money."
          }
        ]
      },
      {
        type: "scenario",
        title: "Zoe Gets a Panic Call",
        narrative: "Zoe, 18, gets a call from someone claiming to be her bank's fraud team. They say her account is compromised and to 'secure' it she must read back the verification code they're texting her and move her balance to a 'safe account' via Zelle. The caller is friendly but insistent that she act right now.",
        details: [
          "The urgency and pressure to act immediately are classic scam signals.",
          "Real banks never ask you to share a one-time verification code.",
          "Moving money by Zelle would be instant and irreversible if it's a scam.",
          "The safe move is to hang up and call the bank using the number on her card."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking8-aq1",
          question: "What should Zoe do when the caller asks for the code and a Zelle transfer?",
          options: [
            "Read the code but refuse the transfer in most cases",
            "Hang up and call the number on her card",
            "Send the Zelle to stay on the safe side",
            "Give the code since the caller sounds real"
          ],
          correctAnswer: 1,
          explanation: "Banks never ask you to share a code or move money to a 'safe account.' Zoe should hang up and call the official number on her card to verify - sharing the code or sending Zelle would hand over her money."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Most fraud tricks you into giving access; phishing texts, calls, and emails use fake urgency.",
          "Your bank never asks for your password, PIN, full card number, or a one-time code.",
          "Zelle, wire, and gift-card transfers are irreversible - scammers demand them for that reason.",
          "Defend with a unique password, two-factor authentication, and transaction alerts.",
          "If fraud hits, report to your bank immediately to freeze and dispute; fast reporting limits liability."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "banking8-mastery1",
            question: "A caller claiming to be your bank asks you to read back a texted code. This is…",
            options: [
              "Normal bank verification you should allow over the years",
              "A scam; banks never ask for your code",
              "Required by federal banking law in most cases",
              "Fine as long as the number looks local"
            ],
            correctAnswer: 1,
            explanation: "Banks never ask you to share a one-time code - scammers use it to break into your account. Caller ID can be faked, so a 'local' number means nothing. Hang up and call the official number."
          },
          {
            id: "banking8-mastery2",
            question: "The single best defense against a stolen password is…",
            options: [
              "Writing the password on a sticky note",
              "Turning on two-factor authentication",
              "Reusing one password everywhere",
              "Sharing it only with close friends"
            ],
            correctAnswer: 1,
            explanation: "Two-factor authentication adds a second step, so a thief with just your password still can't log in. Reusing passwords or writing them down publicly makes you far more vulnerable, not safer."
          },
          {
            id: "banking8-mastery3",
            question: "Why is reusing your email password on your bank risky?",
            options: [
              "It makes logins slower each time",
              "One breach can unlock every account",
              "Banks charge a fee for reused passwords",
              "It lowers the interest you earn"
            ],
            correctAnswer: 1,
            explanation: "If any site you reuse the password on is breached, thieves try that same password on your bank and email. A unique password per account contains the damage to just one site."
          },
          {
            id: "banking8-mastery4",
            question: "You spot a $40 charge you didn't make. The best first step is to…",
            options: [
              "Wait a month to see if it repeats",
              "Contact your bank right away to dispute",
              "Post about it on social media in most cases",
              "Close and reopen the account yourself"
            ],
            correctAnswer: 1,
            explanation: "Reporting fraud immediately lets the bank freeze the card and dispute the charge, and fast reporting limits your liability under federal rules. Waiting can weaken your protection and let losses grow."
          },
          {
            id: "banking8-mastery5",
            question: "Which sign most strongly suggests a message is a scam?",
            options: [
              "It uses your bank's real logo image",
              "It pressures you to act immediately",
              "It arrives during business hours",
              "It is written in complete sentences"
            ],
            correctAnswer: 1,
            explanation: "Manufactured urgency - 'act now or lose your account' - is a hallmark of scams designed to make you skip thinking. Logos are easily copied, so a real-looking logo proves nothing."
          },
          {
            id: "banking8-mastery6",
            question: "Logging into your bank on open public Wi-Fi is risky because…",
            options: [
              "It uses up your monthly data plan",
              "Others may snoop the unsecured network",
              "Banks ban Wi-Fi logins entirely in most cases",
              "It resets your password automatically"
            ],
            correctAnswer: 1,
            explanation: "Unsecured public Wi-Fi can let attackers intercept data. It's safer to use your phone's cellular data or a trusted network when accessing your bank, along with 2FA for extra protection."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // banking-9: IRAs, Roth IRAs & 529 Plans
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-9",
    sections: [
      {
        type: "concept",
        title: "Why Tax-Advantaged Accounts Are Powerful",
        paragraphs: [
          "A regular savings or brokerage account is fine, but the government offers special accounts that grow your money faster by cutting the taxes you'd normally owe. These 'tax-advantaged' accounts come in two main flavors. With a traditional account, you contribute pre-tax money - you get a tax break now - and pay taxes later when you withdraw in retirement. With a Roth account, you contribute money you've already paid taxes on, get no break today, but then withdraw everything - including all the growth - completely tax-free later. Choosing between 'tax break now' and 'tax-free later' is the central decision.",
          "For a teenager or young adult, the Roth is usually the winner, and the reason is powerful. You're likely in a low tax bracket now, so the upfront deduction of a traditional account is nearly worthless to you. Meanwhile, decades of compound growth in a Roth come out entirely tax-free. Imagine investing $1,000 at 15 that grows to $30,000 by retirement: in a Roth, all $30,000 is yours; in a taxable account you'd owe taxes on the $29,000 gain. Paying a little tax now on a small amount to shield a huge future gain is a fantastic trade.",
          "To open an IRA (Individual Retirement Account), you need earned income - money from a job. A teen with a summer or part-time job can contribute up to what they earned, capped at an annual limit (a few thousand dollars). The catch is that this money is meant for retirement: withdrawing the earnings before age 59½ generally triggers taxes and a 10% penalty. But there's a teen-friendly perk: with a Roth IRA you can always take out your own contributions (not the growth) without tax or penalty, which makes it a bit flexible if you truly need it - though the whole point is to leave it growing for decades."
        ],
        bullets: [
          "Tax-advantaged accounts grow money faster by reducing the taxes you'd normally owe.",
          "Traditional = tax break now, taxed later; Roth = taxed now, tax-free withdrawals later.",
          "For teens in a low tax bracket, a Roth is usually best - decades of growth come out tax-free.",
          "You need earned income to fund an IRA, up to your earnings and an annual cap.",
          "IRA earnings are for retirement; Roth lets you withdraw your own contributions penalty-free."
        ],
        realWorldExample: "At 16, Priya puts $500 of summer-job earnings into a Roth IRA invested in an index fund. Over 45 years at about 7%, it could grow to roughly $10,000 - and because it's a Roth, every dollar comes out tax-free in retirement. Her small early contribution does enormous work thanks to time."
      },
      {
        type: "concept",
        title: "529 Plans and Choosing the Right Account",
        paragraphs: [
          "A 529 plan is a different tax-advantaged account built specifically for education. You contribute after-tax money, it grows tax-free, and withdrawals are tax-free as long as they're spent on qualified education costs - college tuition, fees, books, room and board, and even up to $10,000 per year for K-12 tuition. Many states add a bonus state tax deduction for contributing. Parents and grandparents often open 529s for a child, but the money is flexible: if one child doesn't need it, the beneficiary can be changed to another family member. Using 529 money on non-education expenses means taxes plus a 10% penalty on the growth.",
          "So how do you choose? Match the account to the goal. Saving for retirement and want maximum long-term, tax-free growth? A Roth IRA is the classic teen choice. Saving specifically for college? A 529 keeps growth and withdrawals tax-free for school costs and may earn a state deduction. Want a tax break today because you're in a high bracket (more relevant later in your career)? A traditional IRA or 401(k) fits. Many people eventually use several accounts at once - each optimized for a different goal - rather than picking just one forever.",
          "The most important lesson isn't which account is 'best' in the abstract - it's that using ANY of them beats leaving long-term money in a low-interest savings account. Tax-advantaged accounts combine two superpowers: compound growth and tax savings, over decades. Starting as a teen with even small amounts gives that combo the longest possible runway. Open the account that matches your goal, invest it (don't leave it as idle cash), contribute regularly, and let time do the heavy lifting. That single habit, started early, can be worth hundreds of thousands of dollars by retirement."
        ],
        bullets: [
          "A 529 plan grows tax-free and withdrawals are tax-free for qualified education costs.",
          "Many states add a tax deduction for 529 contributions; the beneficiary can be changed.",
          "Non-education 529 withdrawals owe taxes plus a 10% penalty on the growth.",
          "Match the account to the goal: Roth IRA for retirement, 529 for college, traditional for a tax break now.",
          "Using any tax-advantaged account beats idle savings; start early and invest, don't leave it as cash."
        ],
        realWorldExample: "The Nguyen family opens a 529 for their daughter and contributes $100 a month from birth. By college, tax-free growth turns their contributions into a much larger sum, and their state gives them a yearly tax deduction for contributing - a double benefit over an ordinary savings account."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking9-mc1",
            question: "What's the key difference between a traditional and a Roth IRA?",
            options: [
              "Roth is only for people over age 60",
              "Traditional taxes you later; Roth is tax-free",
              "Traditional is illegal for teenagers in most cases",
              "Roth requires no earned income at all"
            ],
            correctAnswer: 1,
            explanation: "A traditional IRA gives a tax break now and is taxed at withdrawal; a Roth is funded with after-tax money and grows tax-free, so qualified withdrawals in retirement owe no tax."
          },
          {
            id: "banking9-mc2",
            question: "A 529 plan's tax-free withdrawals apply to…",
            options: [
              "Any purchase you want to make",
              "Qualified education expenses",
              "New cars and vacations",
              "Retirement living costs at 65"
            ],
            correctAnswer: 1,
            explanation: "A 529 grows tax-free and withdrawals are tax-free when used for qualified education costs like tuition, books, and room and board. Spending it elsewhere triggers taxes and a penalty on the growth."
          }
        ]
      },
      {
        type: "scenario",
        title: "Isaiah Invests His First Paycheck",
        narrative: "Isaiah, 16, earned $2,000 from a summer job and wants to start investing for the long term. He's in a very low tax bracket and won't touch this money for decades. He's comparing leaving it in a regular savings account, a traditional IRA, and a Roth IRA.",
        details: [
          "Because he's in a low tax bracket, the upfront deduction of a traditional IRA barely helps him.",
          "A Roth IRA lets decades of growth come out completely tax-free in retirement.",
          "His earned income of $2,000 lets him contribute up to that amount to an IRA.",
          "With a Roth, he could withdraw his own contributions penalty-free if he ever truly needed to."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking9-aq1",
          question: "Which account best fits Isaiah's low tax bracket and decades-long horizon?",
          options: [
            "A regular low-interest savings account in most cases",
            "A Roth IRA invested for long-term growth",
            "A traditional IRA for the tax break now",
            "A 529 plan for his future retirement"
          ],
          correctAnswer: 1,
          explanation: "A Roth IRA is ideal: his low bracket makes the traditional tax break nearly worthless, while decades of Roth growth come out tax-free. A 529 is for education, and idle savings wastes the growth."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Tax-advantaged accounts combine compound growth with tax savings over decades.",
          "Traditional = tax break now, taxed later; Roth = taxed now, tax-free withdrawals later.",
          "For low-bracket teens, a Roth IRA is usually the best choice for long-term growth.",
          "A 529 plan grows tax-free for qualified education costs and may earn a state deduction.",
          "Match the account to the goal, invest the money, start early, and let time compound it."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "banking9-mastery1",
            question: "Why is a Roth IRA usually best for a low-income teen?",
            options: [
              "It hands out free money each year",
              "Its future growth comes out tax-free",
              "It requires no earned income to open",
              "It is the only account teens can use"
            ],
            correctAnswer: 1,
            explanation: "In a low bracket, the traditional tax break is nearly worthless, but a Roth's decades of growth come out entirely tax-free. Paying a little tax now shields a large future gain - a great trade."
          },
          {
            id: "banking9-mastery2",
            question: "What is required to contribute to an IRA?",
            options: [
              "A minimum age of forty years",
              "Earned income from a job",
              "A parent's full retirement savings",
              "At least $50,000 saved already"
            ],
            correctAnswer: 1,
            explanation: "You need earned income to fund an IRA, and you can contribute up to what you earned (capped at an annual limit). A teen with a summer job qualifies to open and fund one."
          },
          {
            id: "banking9-mastery3",
            question: "Using 529 money on a non-education expense results in…",
            options: [
              "A bonus tax refund from the state",
              "Taxes plus a 10% penalty on growth",
              "No consequences of any kind in most cases",
              "The account converting to a Roth IRA"
            ],
            correctAnswer: 1,
            explanation: "529 plans are tax-free only for qualified education costs. Spending the money elsewhere means owing income tax plus a 10% penalty on the earnings portion - so keep it for school."
          },
          {
            id: "banking9-mastery4",
            question: "A special flexibility of a Roth IRA is that you can…",
            options: [
              "Withdraw all growth anytime tax-free in most cases",
              "Take out your own contributions penalty-free",
              "Contribute unlimited amounts each year",
              "Skip having any earned income"
            ],
            correctAnswer: 1,
            explanation: "With a Roth IRA you can withdraw your own contributions (not the earnings) anytime without tax or penalty. The growth is meant to stay until retirement, but this adds some flexibility."
          },
          {
            id: "banking9-mastery5",
            question: "You're saving specifically for a child's college. Which account fits best?",
            options: [
              "A traditional IRA for the tax break",
              "A 529 education savings plan",
              "A regular checking account",
              "A Roth IRA for retirement income"
            ],
            correctAnswer: 1,
            explanation: "A 529 is built for education: tax-free growth and withdrawals for qualified school costs, often with a state deduction. IRAs are for retirement, and checking earns almost nothing."
          },
          {
            id: "banking9-mastery6",
            question: "The biggest takeaway about these accounts is that…",
            options: [
              "Only wealthy adults are allowed to use them",
              "Using any of them beats idle savings",
              "They all guarantee you will never lose money",
              "You must pick one account for your whole life"
            ],
            correctAnswer: 1,
            explanation: "The key point is that tax-advantaged accounts combine compounding and tax savings, so using any of them beats leaving long-term money in low-interest savings. Start early, invest it, and let time work."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // banking-10: Your Employer's 401k & Benefits
  // ─────────────────────────────────────────────
  {
    lessonId: "banking-10",
    sections: [
      {
        type: "concept",
        title: "The 401(k) and the Free-Money Match",
        paragraphs: [
          "A 401(k) is a retirement account offered through your job. Money is taken straight from your paycheck - before you ever see it - and invested for the future. Because contributions come out automatically and pre-tax (in a traditional 401k), you lower your taxable income today and the money grows without yearly taxes until you withdraw it in retirement. Many employers also offer a Roth 401(k), where you contribute after-tax dollars and withdraw tax-free later. The magic of a 401k is that saving becomes automatic and invisible, so it happens whether or not you feel like it.",
          "The single most important 401k feature is the employer match. Many companies promise to match your contributions up to a limit - a common formula is '100% up to 6% of your salary.' That means if you contribute 6% of your pay, your employer adds an equal 6%, doubling your contribution. On a $40,000 salary, contributing 6% ($2,400) earns you another $2,400 from your employer - free money, an instant 100% return before the market does anything. Not contributing enough to get the full match is like turning down a raise. The universal rule is: always contribute at least enough to capture the full match.",
          "There's a catch called vesting. Some employers require you to stay a certain number of years before their matching contributions are fully yours - a 'vesting schedule.' Your own contributions are always 100% yours immediately, but the match might vest gradually (say 20% per year) or all at once after a few years. If you leave before you're fully vested, you forfeit the unvested match. This matters when deciding whether to switch jobs. When you do change jobs, you can 'roll over' your 401k into a new employer's plan or an IRA to keep it growing without taxes or penalties."
        ],
        bullets: [
          "A 401(k) invests money straight from your paycheck for retirement, often pre-tax.",
          "The employer match adds free money - e.g., 100% up to 6% of salary doubles your contribution.",
          "Always contribute at least enough to capture the full match; skipping it forfeits free money.",
          "Vesting may require staying a few years before the employer's match is fully yours.",
          "When you change jobs, roll over your 401k to a new plan or IRA to keep it tax-advantaged."
        ],
        realWorldExample: "Dana earns $45,000 and her employer matches 100% up to 5%. She contributes 5% ($2,250) and her employer adds $2,250 - free money that instantly doubles her savings that year. Over decades of compounding, capturing that match is worth hundreds of thousands of dollars more than skipping it."
      },
      {
        type: "concept",
        title: "The Rest of Your Benefits Package",
        paragraphs: [
          "A paycheck is only part of what a job pays you; benefits can be worth thousands more. Health insurance is often the biggest: employers usually pay a large share of the premium, so getting coverage through work is far cheaper than buying it yourself. Related accounts include an FSA (Flexible Spending Account) or HSA (Health Savings Account), which let you set aside pre-tax money for medical costs - the HSA is especially powerful because it grows and rolls over year to year. Reading which health plan and savings account to choose during 'open enrollment' can save real money.",
          "Beyond health and retirement, benefits often include paid time off (vacation and sick days), which is paid salary for not working - real value. Some employers offer life and disability insurance, tuition reimbursement (they help pay for school), commuter benefits, wellness stipends, and employee discounts. There may also be an EAP (Employee Assistance Program) for free counseling or legal help. Each of these has a dollar value, so when comparing two job offers, you compare the total package - salary plus benefits - not just the headline pay. A slightly lower salary with a great match and benefits can beat a higher salary with none.",
          "The smart approach is to actually use what you're offered, because unused benefits are money left on the table. Enroll in the 401k up to the match on day one. Pick the health plan that fits your needs and fund an HSA/FSA if you have predictable costs. Take your paid time off - it's part of your pay. Use tuition help if you're studying. During onboarding and each open-enrollment period, read the benefits guide carefully and ask HR questions. Treating benefits as real compensation, not fine print, can add up to thousands of dollars a year in value you already earned."
        ],
        bullets: [
          "Employer health insurance is usually far cheaper than buying your own, since they pay part of the premium.",
          "FSAs and HSAs let you use pre-tax money for medical costs; HSAs grow and roll over.",
          "Paid time off is paid salary for not working - real value you should use.",
          "Compare job offers by total package (salary plus benefits), not just the headline pay.",
          "Use what you're offered - unused benefits are earned money left on the table."
        ],
        realWorldExample: "Two jobs both pay $50,000. Job A offers no benefits; Job B adds a $2,500 401k match, subsidized health insurance worth $6,000, and three weeks of paid vacation. Job B's real compensation is far higher, even though the salaries look identical on paper."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "banking10-mc1",
            question: "Why is capturing your full 401(k) employer match so important?",
            options: [
              "It lowers your health insurance premium in most cases",
              "It's free money and an instant return",
              "It removes all taxes from your paycheck",
              "It guarantees the stock market rises"
            ],
            correctAnswer: 1,
            explanation: "The match adds employer money on top of your contribution - often doubling it - which is free money and an instant return. Not contributing enough to get the full match forfeits that free money."
          },
          {
            id: "banking10-mc2",
            question: "What does 'vesting' affect in a 401(k)?",
            options: [
              "When the employer's match is fully yours",
              "How much interest the bank pays you",
              "Whether your own contributions are yours in most cases",
              "The color of your benefits enrollment form"
            ],
            correctAnswer: 0,
            explanation: "Vesting determines when the employer's matching contributions become fully yours. Your own contributions are always 100% yours immediately, but leaving early can forfeit an unvested match."
          }
        ]
      },
      {
        type: "scenario",
        title: "Renee Reads Her First Benefits Package",
        narrative: "Renee, 22, starts a job paying $48,000. Her employer matches 100% of 401k contributions up to 6% of salary, offers subsidized health insurance, an HSA option, and two weeks of paid vacation. She's tempted to skip the 401k to have a bigger paycheck now.",
        details: [
          "Contributing 6% ($2,880) earns a matching $2,880 from her employer - free money.",
          "Skipping the 401k to boost take-home pay would forfeit that entire match.",
          "Her subsidized health plan costs far less than buying insurance on her own.",
          "Her two weeks of paid vacation are salary paid for time not worked - real value."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "banking10-aq1",
          question: "What should Renee do about her 401(k) to avoid leaving money behind?",
          options: [
            "Skip it entirely for a bigger paycheck over the years",
            "Contribute at least enough to get the full match",
            "Contribute only 1% to be safe in most cases",
            "Wait ten years before joining the plan for you"
          ],
          correctAnswer: 1,
          explanation: "Contributing at least 6% captures her employer's full match - free money that instantly doubles that portion of her savings. Skipping it or contributing too little forfeits money she's entitled to."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A 401(k) invests paycheck money for retirement, often pre-tax and automatically.",
          "Always contribute enough to capture the full employer match - it's free money.",
          "Vesting may require staying a few years before the match is fully yours; roll it over when you leave.",
          "Benefits like health insurance, HSAs, and paid time off add thousands in real value.",
          "Compare job offers by total package and use every benefit you're offered."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "banking10-mastery1",
            question: "Your employer matches 100% up to 5% of pay. Contributing 5% means…",
            options: [
              "You lose 5% of your paycheck for nothing",
              "The employer adds an equal 5%, doubling it",
              "You owe the employer money in most cases",
              "Your salary is permanently cut by 5% over the years"
            ],
            correctAnswer: 1,
            explanation: "A 100% match up to 5% means the employer contributes an amount equal to your 5%, effectively doubling that portion of your savings. It's free money, so contributing enough to earn the full match is essential."
          },
          {
            id: "banking10-mastery2",
            question: "You leave a job before you're fully vested. What happens to the match?",
            options: [
              "You keep every dollar of it anyway",
              "You may forfeit the unvested portion",
              "The employer pays you a bonus for leaving",
              "Your own contributions are taken away too"
            ],
            correctAnswer: 1,
            explanation: "Unvested employer matching contributions can be forfeited if you leave too soon. Your own contributions are always yours, but the match may vest over time, so timing a job change matters."
          },
          {
            id: "banking10-mastery3",
            question: "Why is employer health insurance usually cheaper than buying your own?",
            options: [
              "It offers worse coverage to save money over the years",
              "The employer pays a large share of the premium",
              "The government bans individual plans in most cases",
              "It only covers you for one month a year"
            ],
            correctAnswer: 1,
            explanation: "Employers typically cover a big portion of the premium, so your share is much smaller than buying an equivalent plan yourself. That subsidy is a valuable, often overlooked, part of your pay."
          },
          {
            id: "banking10-mastery4",
            question: "When comparing two job offers, you should compare…",
            options: [
              "Only the headline salary number in most cases",
              "The total package of salary plus benefits",
              "Just the office location's zip code",
              "Only which job has a nicer title"
            ],
            correctAnswer: 1,
            explanation: "Benefits like a 401k match, subsidized health insurance, and paid time off have real dollar value. A lower salary with strong benefits can beat a higher salary with none, so compare the full package."
          },
          {
            id: "banking10-mastery5",
            question: "What can you do with a 401(k) when you change jobs?",
            options: [
              "Nothing; it's frozen forever in place in most cases",
              "Roll it into a new plan or an IRA",
              "Withdraw it with no taxes or penalty over the years",
              "Give it back to the old employer for you"
            ],
            correctAnswer: 1,
            explanation: "You can roll a 401k into your new employer's plan or an IRA, keeping it tax-advantaged and growing. Cashing it out early usually means taxes and a 10% penalty, so a rollover is smarter."
          },
          {
            id: "banking10-mastery6",
            question: "A key advantage of an HSA within your benefits is that it…",
            options: [
              "Must be spent fully before year end",
              "Uses pre-tax money and rolls over yearly",
              "Can only pay for dental cleanings",
              "Replaces your 401k retirement account in most cases"
            ],
            correctAnswer: 1,
            explanation: "An HSA lets you set aside pre-tax money for medical costs, and unlike an FSA the balance rolls over year to year and can even grow. That makes it a powerful, tax-friendly benefit to use."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // ins-1: What Is Insurance & Why You Need It
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-1",
    sections: [
      {
        type: "concept",
        title: "Insurance Is Shared Risk",
        paragraphs: [
          "Insurance is a way to protect yourself from financial disasters you couldn't afford on your own. The core idea is 'risk pooling': many people each pay a small, predictable amount (a premium) into a shared pool, and when disaster strikes one of them - a car crash, a house fire, a hospital stay - the pool pays the huge bill. Most people never face the disaster, so their premiums cover the unlucky few. In exchange for that small, certain cost, you swap the terrifying possibility of a catastrophic, unaffordable loss. You trade a little money now for peace of mind and protection later.",
          "This works because of how probability spreads across a large group. Any one person has a small chance of a house fire, but across a million homeowners, the insurer can predict roughly how many fires will happen and set premiums to cover them plus expenses. No single family could save enough to rebuild after a $300,000 fire, but everyone chipping in $1,200 a year makes the rebuild possible for whoever needs it. That's the quiet genius of insurance: it turns a rare, ruinous event into a manageable monthly bill for everyone.",
          "The key question is what to insure and what to skip. Insurance is for big, unaffordable losses - the ones that could wipe you out - not small, routine costs you can pay yourself. It makes sense to insure your health, your car (which can cause huge liability), your home or apartment, and your income if others depend on it. It rarely makes sense to insure a cheap phone or buy the 'extended warranty' on a $30 gadget, because you could just replace it. The rule: insure what you can't afford to lose, self-pay what you can."
        ],
        bullets: [
          "Insurance pools many people's small premiums to pay the few who suffer big losses.",
          "You trade a small, certain cost (the premium) to avoid a rare, catastrophic one.",
          "Risk pooling works because losses are predictable across a large group.",
          "Insure big, unaffordable risks: health, car liability, home, and income others rely on.",
          "Skip insurance on small, replaceable items - self-pay what you can afford to lose."
        ],
        realWorldExample: "A neighborhood of 1,000 families each pays $1,000 a year for home insurance - $1 million pooled. In a bad year, three homes burn and need $300,000 each to rebuild ($900,000). The pool covers it. No single family could have saved $300,000 alone, but together the small premiums make each rebuild possible."
      },
      {
        type: "concept",
        title: "Why You Actually Need It",
        paragraphs: [
          "Skipping insurance to save on premiums is a gamble that can end in ruin. A single serious car accident can create tens of thousands in medical bills and liability if you injure someone. One unexpected illness or ER visit can cost thousands - or far more without coverage. A house fire or a burst pipe can destroy years of savings. The whole point of insurance is that these events are rare enough to be cheap to insure but severe enough to be devastating if uninsured. Going without doesn't remove the risk; it just leaves you fully exposed to it.",
          "Some insurance isn't optional. Auto liability insurance is legally required to drive in almost every state, and mortgage lenders require homeowners insurance before they'll finance a house. Health insurance, while no longer federally mandated, protects you from bills that can bankrupt families. Even when it's not required, going without means one bad event can undo years of careful budgeting and saving. Insurance is the safety net that lets the rest of your financial plan survive a shock instead of collapsing.",
          "The mature way to think about insurance is as risk management, not as a bet you 'lose' when nothing bad happens. If you pay premiums for years and never file a claim, that's a good outcome - it means you stayed safe AND had protection the whole time. You're not buying a payout; you're buying the guarantee that a disaster won't destroy you financially. The goal is to carry enough coverage on the big risks, avoid over-insuring trivial things, and build an emergency fund alongside it for the smaller bumps insurance doesn't cover."
        ],
        bullets: [
          "One accident, illness, or fire can cost tens of thousands - insurance shields you from ruin.",
          "Auto liability is legally required to drive; lenders require homeowners insurance.",
          "Going without doesn't remove risk; it leaves you fully exposed to catastrophic bills.",
          "Paying premiums and never claiming is a good outcome - you stayed safe and protected.",
          "Insure the big risks, skip over-insuring trivial ones, and keep an emergency fund too."
        ],
        realWorldExample: "Jordan skips renters insurance to save $15 a month. A kitchen fire in the building destroys his laptop, clothes, and furniture - about $6,000 to replace. He pays it all himself. His neighbor, who paid $180 a year for renters insurance, files a claim and is reimbursed, coming out thousands ahead."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins1-mc1",
            question: "What is the core idea behind how insurance works?",
            options: [
              "One person pays for everyone else's luxuries in most cases as a rule",
              "Many pay small premiums so the few with losses are covered",
              "The government pays all medical and car bills over the years",
              "You always get back more than you paid in for you"
            ],
            correctAnswer: 1,
            explanation: "Insurance is risk pooling: many people pay small premiums into a shared pool, and that pool pays the large bills of the unlucky few. You trade a small certain cost to avoid a rare catastrophic one."
          },
          {
            id: "ins1-mc2",
            question: "Which risk is worth insuring?",
            options: [
              "A $30 pair of headphones",
              "A serious car accident's liability",
              "A single week of groceries",
              "A $10 phone screen protector"
            ],
            correctAnswer: 1,
            explanation: "Insure big, unaffordable losses like the liability from a serious car accident, which can run tens of thousands. Small, replaceable items you can simply pay for yourself don't need insurance."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tessa Decides What to Insure",
        narrative: "Tessa, 19, just started driving and rents an apartment. She's on a tight budget and wonders which insurance is worth paying for. She's considering auto insurance, renters insurance, and an extended warranty on a $40 pair of earbuds.",
        details: [
          "Auto liability is legally required to drive and protects her from huge accident costs.",
          "Renters insurance (often about $15/month) covers her belongings if the apartment floods or burns.",
          "The $40 earbuds are cheap enough that she could simply replace them herself.",
          "Insuring big, unaffordable risks while self-paying small ones is the smart approach."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins1-aq1",
          question: "Which spending choice reflects smart insurance thinking for Tessa?",
          options: [
            "Buy the earbud warranty, skip auto insurance in most cases",
            "Carry auto and renters, skip the earbud warranty",
            "Insure only the earbuds to save money",
            "Skip all insurance since claims are rare"
          ],
          correctAnswer: 1,
          explanation: "Auto liability is required and covers catastrophic costs, and renters insurance protects belongings she couldn't easily replace. The $40 earbuds are cheap to replace, so an extended warranty isn't worth it."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Insurance pools many small premiums to cover the few who suffer large losses.",
          "You trade a small, certain cost to avoid a rare, catastrophic one.",
          "Insure big, unaffordable risks: health, car liability, home, and income.",
          "Auto liability is legally required; lenders require homeowners insurance.",
          "Paying premiums and never claiming is a good outcome - you were protected the whole time."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ins1-mastery1",
            question: "Insurance turns a rare, ruinous event into…",
            options: [
              "A guaranteed profit for the customer",
              "A predictable, affordable premium",
              "A payout you always collect yearly",
              "A tax the government charges everyone"
            ],
            correctAnswer: 1,
            explanation: "By pooling risk, insurance converts the tiny chance of a huge, unaffordable loss into a small, predictable premium. You pay a manageable amount so a disaster won't wipe out your finances."
          },
          {
            id: "ins1-mastery2",
            question: "Why does risk pooling work across many people?",
            options: [
              "Everyone files a claim every single year",
              "Losses are predictable across a large group",
              "The insurer never has to pay anyone",
              "Premiums are refunded at year end in most cases"
            ],
            correctAnswer: 1,
            explanation: "Across a large group, insurers can predict roughly how many losses will occur and set premiums to cover them. Most people don't file claims, so their premiums fund payouts for the unlucky few."
          },
          {
            id: "ins1-mastery3",
            question: "Which is generally NOT worth insuring?",
            options: [
              "Your health against a major illness",
              "A cheap, easily replaceable gadget",
              "Your car's liability in a crash",
              "Your apartment's contents from fire"
            ],
            correctAnswer: 1,
            explanation: "Insure big, unaffordable risks like health, car liability, and home contents. A cheap gadget you could just replace isn't worth insuring - self-pay small losses you can afford."
          },
          {
            id: "ins1-mastery4",
            question: "Which type of insurance is legally required to drive?",
            options: [
              "Renters insurance for your apartment",
              "Auto liability insurance",
              "Extended electronics warranties",
              "Life insurance on yourself"
            ],
            correctAnswer: 1,
            explanation: "Almost every state legally requires auto liability insurance to drive, because a crash can injure others and create huge costs. Renters and life insurance are important but not driving requirements."
          },
          {
            id: "ins1-mastery5",
            question: "You pay premiums for years and never file a claim. This means…",
            options: [
              "You wasted all that money for nothing over the years",
              "You stayed safe and were protected the whole time",
              "The insurer owes you a full refund for you",
              "You should immediately cancel all coverage in most cases"
            ],
            correctAnswer: 1,
            explanation: "Never claiming is a good outcome: you avoided disaster AND had protection the entire time. Insurance buys the guarantee that a rare catastrophe won't ruin you, not a payout you're owed."
          },
          {
            id: "ins1-mastery6",
            question: "Going without insurance to save on premiums mainly…",
            options: [
              "Removes the underlying risk entirely in most cases",
              "Leaves you fully exposed to big losses",
              "Guarantees you extra savings each year over the years",
              "Makes accidents less likely to happen"
            ],
            correctAnswer: 1,
            explanation: "Skipping insurance doesn't make accidents or illness any less likely - it just means you'd pay the full, potentially ruinous bill yourself. The risk stays; only your protection disappears."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // ins-2: How Insurance Works: Premiums & Payouts
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-2",
    sections: [
      {
        type: "concept",
        title: "Premiums, Deductibles, and the Trade-Off",
        paragraphs: [
          "Every insurance policy runs on a few key numbers. The premium is what you pay regularly - monthly or yearly - to keep the coverage active, whether or not you ever file a claim. The deductible is the amount YOU pay out of pocket before the insurer starts paying. If your car policy has a $500 deductible and you cause $3,000 of damage, you pay the first $500 and the insurer covers the remaining $2,500. The deductible exists to make you share the cost, which keeps you careful and keeps premiums lower than they'd be otherwise.",
          "Premiums and deductibles trade off against each other. Choose a HIGH deductible and your premium is LOWER, because you're agreeing to shoulder more of any loss yourself. Choose a LOW deductible and your premium is HIGHER, because the insurer pays sooner. Which is smarter depends on your situation. If you have a solid emergency fund and rarely file claims, a high deductible saves money on premiums over time. If a surprise $1,000 bill would wreck you, a lower deductible (higher premium) buys more predictability. There's no universally right answer - it's about matching the policy to your budget and risk.",
          "Health insurance adds a couple more terms. A co-pay is a small fixed amount you pay for a specific service, like $25 to see a doctor, with insurance covering the rest. Coinsurance is a percentage you pay after meeting your deductible - for example, you pay 20% and insurance pays 80% of a bill. These features spread costs so you're not stuck with the full price of every visit, while still sharing enough that you use care thoughtfully. Knowing these terms lets you actually predict what a doctor visit or procedure will cost you."
        ],
        bullets: [
          "Premium: what you pay regularly to keep coverage, claim or not.",
          "Deductible: what you pay out of pocket before the insurer starts paying.",
          "Higher deductible = lower premium; lower deductible = higher premium.",
          "Co-pay: a small fixed fee for a service (e.g., $25 per doctor visit).",
          "Coinsurance: a percentage you pay after the deductible (e.g., you 20%, insurer 80%)."
        ],
        realWorldExample: "Priya's car policy has a $1,000 deductible and a lower premium; her friend chose a $250 deductible with a higher premium. After a $2,000 fender-bender, Priya pays $1,000 and insurance covers $1,000, while her friend pays $250. Priya saved on premiums all year but pays more when a claim hits."
      },
      {
        type: "concept",
        title: "Coverage Limits, Claims, and Out-of-Pocket Maximums",
        paragraphs: [
          "Insurance doesn't pay unlimited amounts. A coverage limit is the maximum the insurer will pay for a claim or over a policy period. If your renters policy limits contents coverage to $20,000 and you lose $30,000 of belongings, you get $20,000 and eat the rest. This is why choosing adequate limits matters - too low, and a big loss leaves you exposed anyway. On the flip side, health plans include an out-of-pocket maximum: once your combined deductibles, co-pays, and coinsurance hit that cap in a year, the insurer pays 100% of covered costs, protecting you from unlimited medical bills.",
          "Filing a claim is how you actually collect. You report the loss to the insurer, provide documentation (photos, receipts, a police or medical report), and they review it, subtract your deductible, and pay up to your limit. Being organized helps: keep records, act promptly, and be honest, because insurance fraud is a crime and can void your policy. For small losses just above your deductible, it's sometimes smarter NOT to file, since claims can raise your future premiums - paying a minor repair yourself may cost less over time than a rate increase.",
          "Putting it together, a smart insurance buyer looks at the whole picture, not just the premium. Compare the premium, deductible, coverage limits, and out-of-pocket max together to see the real protection and real cost. A cheap premium with a sky-high deductible and low limits may leave you badly exposed. The goal is coverage that actually protects you from a worst-case loss at a premium you can afford, backed by an emergency fund to handle the deductible when a claim happens. That combination - right coverage plus cash cushion - is what real financial protection looks like."
        ],
        bullets: [
          "Coverage limit: the maximum the insurer pays; too-low limits leave you exposed on big losses.",
          "Out-of-pocket maximum: a yearly cap on health costs, after which the insurer pays 100%.",
          "Filing a claim: report the loss, provide documentation, and the insurer pays minus your deductible.",
          "For small losses, filing can raise future premiums - sometimes self-paying is cheaper.",
          "Compare premium, deductible, limits, and max together, and keep an emergency fund for the deductible."
        ],
        realWorldExample: "Marcus has a health plan with a $2,000 deductible, 20% coinsurance, and a $6,000 out-of-pocket max. After a costly surgery, he pays the $2,000 deductible plus 20% of the next bills - but once his total spending hits $6,000, insurance pays 100% for the rest of the year, capping his exposure."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins2-mc1",
            question: "What is a deductible?",
            options: [
              "The monthly fee to keep coverage active",
              "The amount you pay before insurance pays",
              "A percentage the insurer always pays",
              "A bonus the insurer sends you each year"
            ],
            correctAnswer: 1,
            explanation: "A deductible is the amount you pay out of pocket before the insurer starts covering a loss. The premium is the regular fee to keep coverage; the deductible applies when you actually file a claim."
          },
          {
            id: "ins2-mc2",
            question: "If you choose a higher deductible, your premium usually…",
            options: [
              "Goes up because coverage improves in most cases",
              "Goes down because you share more risk",
              "Stays exactly the same either way",
              "Disappears entirely for the year over the years"
            ],
            correctAnswer: 1,
            explanation: "A higher deductible means you shoulder more of any loss yourself, so the insurer charges a lower premium. A lower deductible raises the premium because the insurer starts paying sooner."
          }
        ]
      },
      {
        type: "scenario",
        title: "Lena Picks a Car Policy",
        narrative: "Lena, 20, is choosing between two auto policies. Option A has a $1,000 deductible and a $90/month premium. Option B has a $250 deductible and a $130/month premium. She has a $1,500 emergency fund and drives carefully with a clean record.",
        details: [
          "Option A saves her $40 a month - about $480 a year - on premiums.",
          "Option B pays sooner in a claim but costs more every month whether or not she crashes.",
          "Her $1,500 emergency fund could comfortably cover Option A's $1,000 deductible.",
          "With a clean record and rare claims, the lower premium adds up over time."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins2-aq1",
          question: "Given her emergency fund and clean record, which policy likely fits Lena best?",
          options: [
            "Option B, to avoid ever paying a deductible",
            "Option A, since she can cover the deductible",
            "Neither, because deductibles are a scam in most cases",
            "Both at once for double the coverage"
          ],
          correctAnswer: 1,
          explanation: "Because Lena rarely files claims and her emergency fund covers the $1,000 deductible, Option A's lower premium saves about $480 a year. The higher-premium Option B mainly benefits frequent claimers."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Premium is the ongoing cost of coverage; deductible is what you pay before insurance kicks in.",
          "Higher deductible lowers your premium; lower deductible raises it - match it to your budget.",
          "Co-pays are fixed fees; coinsurance is a percentage you pay after the deductible.",
          "Coverage limits cap payouts; an out-of-pocket max caps your yearly health spending.",
          "Compare premium, deductible, limits, and max together, and keep cash for the deductible."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ins2-mastery1",
            question: "You cause $3,000 of damage with a $500 deductible. Who pays what?",
            options: [
              "You pay $3,000; the insurer pays nothing",
              "You pay $500; the insurer pays $2,500",
              "The insurer pays $3,000; you pay nothing",
              "You each split it evenly at $1,500"
            ],
            correctAnswer: 1,
            explanation: "You pay the deductible first ($500), then the insurer covers the rest up to your limit ($2,500). The deductible is your share before coverage begins."
          },
          {
            id: "ins2-mastery2",
            question: "What does a co-pay refer to in health insurance?",
            options: [
              "A percentage you pay after the deductible in most cases",
              "A small fixed fee for a specific service",
              "The yearly cap on your total spending",
              "The monthly cost to keep the plan"
            ],
            correctAnswer: 1,
            explanation: "A co-pay is a small fixed amount for a service, like $25 to see a doctor, with insurance paying the rest. Coinsurance is the percentage version, and the premium is the monthly cost."
          },
          {
            id: "ins2-mastery3",
            question: "Your health plan's out-of-pocket maximum means that once you hit it…",
            options: [
              "Your premium instantly drops to zero in most cases",
              "The insurer pays 100% of covered costs",
              "You must switch to a new plan",
              "Your deductible doubles for next year"
            ],
            correctAnswer: 1,
            explanation: "The out-of-pocket max caps your yearly spending on deductibles, co-pays, and coinsurance. After you reach it, the insurer covers 100% of covered costs, protecting you from unlimited bills."
          },
          {
            id: "ins2-mastery4",
            question: "Your policy's coverage limit is $20,000 but you lose $30,000. You receive…",
            options: [
              "The full $30,000 you actually lost in most cases",
              "$20,000, and you cover the remaining $10,000",
              "Nothing, since you exceeded the limit",
              "$10,000, only the amount over the limit"
            ],
            correctAnswer: 1,
            explanation: "The coverage limit is the most the insurer pays. With a $20,000 limit, you get $20,000 and must cover the extra $10,000 yourself - which is why choosing adequate limits matters."
          },
          {
            id: "ins2-mastery5",
            question: "Why might you NOT file a claim for a small loss just above your deductible?",
            options: [
              "Filing is illegal for small amounts in most cases",
              "A claim can raise your future premiums",
              "The insurer would refund your premium",
              "Small claims are always denied anyway"
            ],
            correctAnswer: 1,
            explanation: "Filing claims can push up your future premiums. For a minor loss barely over the deductible, paying it yourself may cost less overall than a rate increase - though big losses are worth claiming."
          },
          {
            id: "ins2-mastery6",
            question: "When comparing policies, a cheap premium can be misleading if…",
            options: [
              "The deductible and limits are unfavorable",
              "The insurer has a friendly mobile app",
              "It includes a small doctor co-pay",
              "It offers automatic monthly billing"
            ],
            correctAnswer: 0,
            explanation: "A low premium paired with a sky-high deductible or low coverage limits can leave you badly exposed. Always compare premium, deductible, limits, and out-of-pocket max together to judge real value."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // ins-3: Auto Insurance
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-3",
    sections: [
      {
        type: "concept",
        title: "The Coverages Inside an Auto Policy",
        paragraphs: [
          "An auto policy isn't one thing - it's a bundle of separate coverages, and understanding each is how you avoid overpaying or being underinsured. Liability coverage is the core: it pays for injuries and damage YOU cause to others. It splits into bodily injury liability (others' medical bills) and property damage liability (others' cars and property). This is the coverage states require, because a crash you cause can create huge costs for other people. Liability does NOT pay for your own car or injuries - it protects everyone else from you, which is exactly why the law mandates it.",
          "To cover your OWN car, you add collision and comprehensive. Collision pays to repair or replace your car after a crash, regardless of fault. Comprehensive pays for non-crash damage - theft, vandalism, hail, fire, or hitting a deer. Both come with a deductible you choose. If you have a car loan or lease, the lender usually requires collision and comprehensive to protect their investment. If you own an old car outright that's worth little, you might drop these to save money, since the most they'd pay is the car's low value.",
          "Florida is a special case worth knowing. It's a 'no-fault' state, which means it requires Personal Injury Protection (PIP) - your own coverage pays your medical bills after an accident regardless of who caused it. Florida requires PIP (typically $10,000) and property damage liability, but notably does NOT require bodily injury liability, unlike most states. Because those minimums are low, experts strongly recommend buying more bodily injury liability anyway - if you seriously injure someone and carry only the minimums, you could be sued personally for the rest. The legal minimum is rarely enough real protection."
        ],
        bullets: [
          "Liability pays for injury and damage YOU cause others; it's the legally required core.",
          "Collision covers your car in a crash; comprehensive covers theft, weather, fire, and animals.",
          "Lenders require collision and comprehensive on financed cars; you might drop them on an old, cheap car.",
          "Florida is 'no-fault': it requires PIP (your own medical coverage) and property damage liability.",
          "Florida's low minimums skip required bodily injury liability - buy more to avoid being sued personally."
        ],
        realWorldExample: "In Florida, Sara carries only the required PIP and property damage liability. She causes a crash that seriously injures another driver, whose medical bills far exceed her coverage. Because she skipped bodily injury liability, she's personally sued for the difference - a costly lesson that legal minimums aren't enough."
      },
      {
        type: "concept",
        title: "What Drives Your Premium and How to Lower It",
        paragraphs: [
          "Insurers set your premium based on how risky they think you are to insure. Big factors include your age and experience (teen drivers pay the most because they crash more often), your driving record (tickets and at-fault accidents raise rates for years), the car itself (expensive or high-performance cars cost more), where you live, how much you drive, and often your credit history. This is why a 17-year-old in a sports car pays dramatically more than a 40-year-old with a clean record in a modest sedan - the insurer is pricing real statistical risk.",
          "The good news is that many of these factors are in your control. Keep a clean record: one speeding ticket or at-fault crash can raise your premium for three to five years, so safe driving literally pays. Good grades can earn a student discount, and taking a defensive-driving course can lower rates. Raising your deductible cuts your premium if you can cover more yourself. Bundling auto with renters or homeowners insurance at the same company usually earns a discount, and driving a modest, safe car costs far less to insure than a flashy one.",
          "When shopping, compare quotes from several insurers for the SAME coverage, because prices for identical protection vary widely between companies. Don't just chase the lowest premium - check that the liability limits are high enough to actually protect you and that the deductible fits your emergency fund. After an accident, decide whether to file: for minor damage near your deductible, paying out of pocket may keep your premium from rising. The smart driver balances adequate coverage, a sensible deductible, and every discount they qualify for."
        ],
        bullets: [
          "Premiums reflect risk: age, driving record, car type, location, mileage, and often credit.",
          "Teen drivers pay the most; a clean record lowers rates over time.",
          "Cut costs with good-student and defensive-driving discounts and a higher deductible.",
          "Bundling auto with renters/home and driving a modest car earns discounts.",
          "Compare quotes for identical coverage, and keep liability limits high enough to protect you."
        ],
        realWorldExample: "Diego, 18, gets quotes for the same coverage from three insurers: $310, $255, and $340 a month. By choosing the $255 quote, keeping a clean record, and adding a good-student discount that drops it to $220, he saves over $1,400 a year compared to the most expensive option - for identical protection."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins3-mc1",
            question: "What does liability coverage pay for?",
            options: [
              "Repairs to your own car after a crash",
              "Injury and damage you cause to others",
              "Theft of your car from a parking lot",
              "Your own hospital bills after any wreck"
            ],
            correctAnswer: 1,
            explanation: "Liability covers injury and damage YOU cause to other people - it's the legally required core. Your own car damage needs collision/comprehensive, and your own injuries need PIP or health coverage."
          },
          {
            id: "ins3-mc2",
            question: "Which factor most raises a young driver's premium?",
            options: [
              "Being a teen with little experience",
              "Bundling auto with renters insurance over the years",
              "Having good grades in school",
              "Choosing a higher deductible in most cases"
            ],
            correctAnswer: 0,
            explanation: "Teen drivers pay the most because they statistically crash more often. Good grades, bundling, and higher deductibles all lower premiums, not raise them."
          }
        ]
      },
      {
        type: "scenario",
        title: "Amara Buys Her First Policy in Florida",
        narrative: "Amara, 18, just bought a used car in Florida with a small loan. She's choosing coverage and wants to meet the law, protect herself, and keep costs reasonable. Florida requires PIP and property damage liability but not bodily injury liability.",
        details: [
          "Her lender requires collision and comprehensive to protect the financed car.",
          "Florida law requires PIP for her own medical bills and property damage liability.",
          "Bodily injury liability isn't required in Florida, but skipping it risks a personal lawsuit.",
          "A good-student discount and a modest car help keep her teen premium down."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins3-aq1",
          question: "What's the smartest coverage choice for Amara beyond the bare legal minimum?",
          options: [
            "Drop collision to save on the loan",
            "Add bodily injury liability for real protection",
            "Skip PIP since she has health insurance",
            "Buy only the state minimum and nothing more"
          ],
          correctAnswer: 1,
          explanation: "Florida's minimums skip bodily injury liability, so adding it protects Amara from being personally sued if she injures someone. She also needs collision (lender-required) and PIP (state-required)."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Liability covers injury and damage you cause others and is legally required.",
          "Collision covers your car in a crash; comprehensive covers theft, weather, and animals.",
          "Florida is no-fault: it requires PIP and property damage liability, not bodily injury liability.",
          "State minimums are rarely enough - add bodily injury liability to avoid personal lawsuits.",
          "Lower premiums with a clean record, discounts, a higher deductible, and comparison shopping."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ins3-mastery1",
            question: "Which coverage pays to repair YOUR car after a crash you caused?",
            options: [
              "Bodily injury liability coverage",
              "Collision coverage",
              "Property damage liability",
              "Personal injury protection"
            ],
            correctAnswer: 1,
            explanation: "Collision pays to repair or replace your own car after a crash, regardless of fault. Liability coverages pay for others' injuries and property, not your vehicle."
          },
          {
            id: "ins3-mastery2",
            question: "Comprehensive coverage would pay for which event?",
            options: [
              "You rear-end another car at a light",
              "Your parked car is stolen overnight",
              "You injure a pedestrian while driving",
              "You damage a fence you crashed into"
            ],
            correctAnswer: 1,
            explanation: "Comprehensive covers non-crash losses like theft, vandalism, fire, hail, and hitting an animal. Crash damage is collision, and injuring others or their property is liability."
          },
          {
            id: "ins3-mastery3",
            question: "As a 'no-fault' state, Florida requires drivers to carry…",
            options: [
              "Only bodily injury liability coverage",
              "PIP and property damage liability",
              "Full collision and comprehensive",
              "No insurance of any kind at all"
            ],
            correctAnswer: 1,
            explanation: "Florida's no-fault system requires Personal Injury Protection (PIP) for your own medical bills plus property damage liability. It notably does not require bodily injury liability, unlike most states."
          },
          {
            id: "ins3-mastery4",
            question: "Why should you buy more than Florida's minimum bodily injury coverage?",
            options: [
              "The state secretly fines minimum buyers in most cases",
              "You could be sued personally if you hurt someone",
              "It makes your car worth more to sell for you",
              "Minimum coverage voids your driver's license over the years"
            ],
            correctAnswer: 1,
            explanation: "If you seriously injure someone and carry little or no bodily injury liability, you can be personally sued for costs beyond your coverage. Extra liability protects your finances from that risk."
          },
          {
            id: "ins3-mastery5",
            question: "Which action would most likely LOWER your auto premium?",
            options: [
              "Getting a speeding ticket this year",
              "Adding a good-student discount",
              "Buying a high-performance sports car",
              "Filing many small claims"
            ],
            correctAnswer: 1,
            explanation: "A good-student discount lowers premiums. Tickets, flashy high-performance cars, and frequent claims all raise your rates because they signal more risk to the insurer."
          },
          {
            id: "ins3-mastery6",
            question: "When shopping for auto insurance, you should compare quotes that…",
            options: [
              "Have the lowest premium no matter what",
              "Offer the same coverage across insurers",
              "Come only from the biggest company",
              "Include the fanciest mobile app design"
            ],
            correctAnswer: 1,
            explanation: "Prices for identical coverage vary widely, so compare quotes for the SAME coverage across insurers. Chasing the lowest premium alone can leave you with dangerously low limits or a huge deductible."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // ins-4: Renters & Homeowners Insurance
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-4",
    sections: [
      {
        type: "concept",
        title: "Renters Insurance: Cheap and Underrated",
        paragraphs: [
          "Renters insurance protects the stuff inside a rental and you, the tenant - not the building, which the landlord insures. It's shockingly affordable, often $10 to $20 a month, yet many renters skip it, wrongly assuming the landlord covers their belongings (the landlord does not). It has three main parts. Personal property coverage replaces your things - clothes, electronics, furniture - if they're stolen or destroyed by a covered event like fire, smoke, or certain water damage. For most young renters, that's already worth far more than they realize once they add it all up.",
          "The second part is liability coverage, which protects you if you accidentally injure someone or damage their property. If a guest slips in your apartment and is hurt, or you leave a faucet running and flood the unit below, liability can pay the medical or repair bills and even your legal defense. The third part is 'additional living expenses' (also called loss of use): if a fire makes your apartment unlivable, this pays for a hotel and meals while you're displaced. Together these three parts turn a small monthly premium into serious protection.",
          "Two coverage details matter a lot. First, choose 'replacement cost' over 'actual cash value.' Replacement cost pays what it takes to buy a NEW equivalent item; actual cash value subtracts depreciation, so a five-year-old laptop might reimburse only a fraction of a new one. Replacement cost costs a bit more but pays far better. Second, standard policies exclude floods and earthquakes - those need separate coverage. And take a quick phone-video inventory of your belongings; it makes filing a claim faster and proves what you owned if disaster strikes."
        ],
        bullets: [
          "Renters insurance covers your belongings and you - not the building (the landlord insures that).",
          "It's cheap ($10-$20/month) yet many renters wrongly assume the landlord covers their stuff.",
          "Three parts: personal property, liability, and additional living expenses if displaced.",
          "Choose 'replacement cost' over 'actual cash value' so you're paid for new equivalents.",
          "Standard policies exclude floods and earthquakes; keep a video inventory of your things."
        ],
        realWorldExample: "A pipe bursts above Kayla's apartment and ruins her laptop, TV, and clothes - about $4,500 to replace. Her $15/month renters policy with replacement-cost coverage reimburses her for new items and even covers a hotel while repairs happen. The $180 a year she paid returns many times over."
      },
      {
        type: "concept",
        title: "Homeowners Insurance and Choosing Coverage",
        paragraphs: [
          "Homeowners insurance is bigger because it also covers the structure itself. It typically includes dwelling coverage (rebuilding the house if it's damaged by fire, wind, or other covered perils), personal property (your belongings), liability (injuries or damage you're responsible for), and additional living expenses. Mortgage lenders require it, since the house is their collateral. The most important number is that dwelling coverage should equal the cost to REBUILD your home, not its market price - rebuilding costs can differ from what the house would sell for, and being underinsured after a total loss is devastating.",
          "Just like renters coverage, homeowners policies have deductibles and exclusions. Standard policies do NOT cover floods - that requires separate flood insurance, which matters enormously in places like Florida with hurricane and storm-surge risk. Many coastal areas also have separate, higher hurricane or wind deductibles. Reviewing what perils are and aren't covered before disaster strikes is essential; discovering a flood exclusion after a hurricane is too late. High-value items like jewelry or expensive electronics may exceed standard limits and need a special add-on called a 'rider' or 'floater.'",
          "Choosing coverage well means matching limits and deductibles to your real risk and budget. Insure the dwelling for full rebuild cost, carry enough liability to protect your assets, pick a deductible your emergency fund can cover, and add flood coverage if you're in a flood-prone area. Lower your premium by bundling with auto, installing security and smoke systems, and maintaining a good claims history. As with all insurance, don't just buy the cheapest policy - buy the one that would actually make you whole after a worst-case loss, at a price you can sustain."
        ],
        bullets: [
          "Homeowners insurance adds dwelling coverage to rebuild the structure; lenders require it.",
          "Insure the dwelling for REBUILD cost, not market price, to avoid being underinsured.",
          "Standard policies exclude floods; flood insurance is separate and vital in places like Florida.",
          "High-value items may need a special 'rider' or 'floater' beyond standard limits.",
          "Match limits and deductibles to your risk; bundle and add safety systems to lower premiums."
        ],
        realWorldExample: "The Reyes family in Florida has homeowners insurance but assumes it covers everything. A hurricane brings storm-surge flooding, and they learn floods are excluded from a standard policy. Because they hadn't bought separate flood insurance, they pay for the water damage themselves - a costly gap they could have closed cheaply beforehand."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins4-mc1",
            question: "What does renters insurance NOT cover?",
            options: [
              "Your belongings damaged by a fire",
              "The building structure itself",
              "A guest injured in your apartment",
              "A hotel after your unit is unlivable"
            ],
            correctAnswer: 1,
            explanation: "Renters insurance covers your belongings, your liability, and living expenses if displaced - but not the building itself, which the landlord insures. Renters wrongly assume the landlord covers their stuff too."
          },
          {
            id: "ins4-mc2",
            question: "Why choose 'replacement cost' over 'actual cash value'?",
            options: [
              "It pays for a new equivalent item",
              "It has no deductible ever over the years",
              "It covers floods automatically in most cases",
              "It costs nothing extra each month"
            ],
            correctAnswer: 0,
            explanation: "Replacement cost pays what it takes to buy a new equivalent item, while actual cash value subtracts depreciation and pays far less for older belongings. Replacement cost costs a bit more but pays better."
          }
        ]
      },
      {
        type: "scenario",
        title: "Noah Skips a Small Premium",
        narrative: "Noah, 19, rents an apartment and figures his landlord's insurance covers his belongings, so he skips renters insurance to save $15 a month. A fire in a neighboring unit fills his apartment with smoke, ruining his laptop, clothes, and furniture worth about $5,000, and he has to stay in a hotel for a week.",
        details: [
          "The landlord's policy covers the building, not Noah's personal belongings.",
          "Renters insurance at $15/month would have replaced his ruined items.",
          "It also would have paid for his hotel stay under additional living expenses.",
          "Skipping $180 a year in premiums left him thousands of dollars out of pocket."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins4-aq1",
          question: "What key mistake did Noah make about renters insurance?",
          options: [
            "He bought coverage he didn't actually need",
            "He assumed the landlord covered his belongings",
            "He chose replacement cost over cash value",
            "He added too much liability coverage in most cases"
          ],
          correctAnswer: 1,
          explanation: "Noah wrongly assumed the landlord's policy covered his personal belongings - it only covers the building. Cheap renters insurance would have replaced his items and paid for the hotel."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Renters insurance covers your belongings, liability, and living expenses - not the building.",
          "It's cheap ($10-$20/month); the landlord's policy does not cover your stuff.",
          "Choose replacement cost over actual cash value for better payouts.",
          "Homeowners insurance adds dwelling coverage; insure for rebuild cost, not market price.",
          "Standard policies exclude floods - buy separate flood coverage in places like Florida."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ins4-mastery1",
            question: "Who insures the building your rented apartment is in?",
            options: [
              "You, through renters insurance in most cases",
              "The landlord, through their own policy",
              "The city government where you live",
              "No one; buildings can't be insured"
            ],
            correctAnswer: 1,
            explanation: "The landlord insures the building itself. Renters insurance covers your personal belongings, liability, and living expenses - which is why assuming the landlord covers your stuff is a costly mistake."
          },
          {
            id: "ins4-mastery2",
            question: "A guest slips and is injured in your apartment. Which coverage helps?",
            options: [
              "Additional living expenses coverage in most cases",
              "The liability part of your policy",
              "Dwelling coverage on the structure over the years",
              "Flood insurance you added separately"
            ],
            correctAnswer: 1,
            explanation: "Liability coverage pays for injuries to others in your home and can cover legal defense. Living expenses cover your displacement, and dwelling coverage applies to the structure - neither fits an injured guest."
          },
          {
            id: "ins4-mastery3",
            question: "Homeowners dwelling coverage should be set to…",
            options: [
              "The home's current market sale price",
              "The cost to rebuild the home",
              "The amount left on your mortgage",
              "The value of your belongings in most cases"
            ],
            correctAnswer: 1,
            explanation: "Dwelling coverage should equal the cost to rebuild the house, which can differ from its market price. Insuring for less risks being underinsured and unable to fully rebuild after a total loss."
          },
          {
            id: "ins4-mastery4",
            question: "Which is typically EXCLUDED from a standard home or renters policy?",
            options: [
              "Fire and smoke damage",
              "Flood damage",
              "Theft of your belongings",
              "A guest's injury liability"
            ],
            correctAnswer: 1,
            explanation: "Floods are excluded from standard policies and require separate flood insurance - critical in flood-prone places like Florida. Fire, theft, and liability are typically covered."
          },
          {
            id: "ins4-mastery5",
            question: "A $5,000 diamond ring may need a 'rider' because…",
            options: [
              "Rings can never be insured normally",
              "It may exceed standard coverage limits",
              "Riders make the ring appreciate faster",
              "Jewelry is required to be uninsured"
            ],
            correctAnswer: 1,
            explanation: "High-value items like jewelry often exceed a standard policy's limits, so a rider or floater adds specific coverage for them. Without it, a lost or stolen ring might only be partly reimbursed."
          },
          {
            id: "ins4-mastery6",
            question: "Which step best lowers a homeowners premium?",
            options: [
              "Filing many small claims each year",
              "Bundling it with your auto policy",
              "Removing all smoke detectors in most cases",
              "Choosing the lowest possible deductible"
            ],
            correctAnswer: 1,
            explanation: "Bundling home and auto with one insurer usually earns a discount, and safety systems help too. Frequent claims raise premiums, and a lower deductible raises the premium rather than cutting it."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // ins-5: Health Insurance
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-5",
    sections: [
      {
        type: "concept",
        title: "How Health Plans Split the Cost",
        paragraphs: [
          "Health insurance protects you from medical bills that can reach tens of thousands of dollars. It shares costs through several moving parts. You pay a monthly premium to keep the plan. When you get care, you first pay your deductible - the amount you cover before insurance starts paying. After that, you pay coinsurance, a percentage of each bill (say 20%, with the insurer paying 80%), or a co-pay, a flat fee for certain visits like $30 to see a doctor. All these payments count toward your out-of-pocket maximum, a yearly cap after which the insurer pays 100% of covered care.",
          "Here's how it flows in practice. Imagine a plan with a $2,000 deductible, 20% coinsurance, and a $7,000 out-of-pocket max. Early in the year you pay full price until you've spent $2,000. After that, you pay 20% of bills and insurance pays 80%. Once your total spending (deductible plus coinsurance plus co-pays) reaches $7,000, you pay nothing more for covered care that year. This structure means a bad health year has a known ceiling - you can't be bankrupted by unlimited bills, which is the entire point of having coverage.",
          "Plans trade off premium against out-of-pocket costs. A high-deductible plan has a low monthly premium but you pay more before coverage kicks in - good if you're young, healthy, and rarely need care. A low-deductible plan has a higher premium but pays sooner - better if you have ongoing medical needs. High-deductible plans often pair with an HSA (Health Savings Account), which lets you save pre-tax money for medical costs that rolls over and even grows. Matching the plan type to your expected health needs is how you avoid overpaying."
        ],
        bullets: [
          "Premium (monthly) + deductible (you pay first) + coinsurance/co-pays = how costs are split.",
          "Coinsurance is a percentage (e.g., you 20%, insurer 80%); a co-pay is a flat visit fee.",
          "The out-of-pocket maximum caps your yearly spending; after it, the insurer pays 100%.",
          "High-deductible = low premium (good if healthy); low-deductible = high premium (good if you need care).",
          "High-deductible plans pair with an HSA: pre-tax medical savings that roll over and grow."
        ],
        realWorldExample: "Tomas has a plan with a $2,500 deductible, 20% coinsurance, and a $6,500 out-of-pocket max. He breaks his arm; the bill is $10,000. He pays the $2,500 deductible, then 20% of the remaining $7,500 ($1,500) - but that would exceed his cap, so he pays only up to $6,500 total. Insurance covers the rest."
      },
      {
        type: "concept",
        title: "Networks, Coverage Rules, and Getting Covered",
        paragraphs: [
          "A crucial and often painful detail is the network - the doctors and hospitals that have agreed to your insurer's rates. Staying 'in-network' means lower, negotiated prices; going 'out-of-network' can cost far more or not be covered at all. Plans are labeled by how strict they are: an HMO usually requires you to stay in-network and get referrals from a primary doctor, while a PPO costs more but lets you see specialists and some out-of-network providers more freely. Always check that a doctor or hospital is in-network before a non-emergency visit - a surprise out-of-network bill can be huge.",
          "Health plans also have coverage rules. Thanks to the Affordable Care Act, plans must cover 'essential health benefits' and preventive care - annual checkups, vaccines, and many screenings - at no extra cost, and they can't deny you for pre-existing conditions. But plans differ on what drugs they cover (the 'formulary') and may require prior authorization for certain treatments. Reading these rules matters: the cheapest premium is a bad deal if it doesn't cover the medications or doctors you actually need.",
          "For getting covered, young adults have good options. You can usually stay on a parent's health plan until age 26, which is often the cheapest route. Otherwise, coverage comes from a job (employers subsidize much of the premium), the government marketplace (where you may qualify for subsidies based on income), or programs like Medicaid for lower incomes. There's an annual 'open enrollment' window to pick or change plans, with special windows after events like leaving a job or turning 26. The goal is to always have some coverage, because one uninsured emergency can undo years of financial progress."
        ],
        bullets: [
          "In-network care uses negotiated lower prices; out-of-network can cost far more or not be covered.",
          "HMOs require staying in-network with referrals; PPOs cost more but allow more flexibility.",
          "The ACA requires covering preventive care free and bars denial for pre-existing conditions.",
          "Check the drug formulary and coverage rules - the cheapest premium isn't always the best deal.",
          "Young adults can stay on a parent's plan until 26, or use a job, the marketplace, or Medicaid."
        ],
        realWorldExample: "Elena needs surgery and picks a hospital without checking her HMO's network. It's out-of-network, so her insurer covers little and she faces a bill thousands of dollars higher than if she'd used an in-network hospital. A two-minute network check beforehand would have saved her a fortune."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins5-mc1",
            question: "What does the out-of-pocket maximum do?",
            options: [
              "Sets your monthly premium amount in most cases",
              "Caps your yearly spending on covered care",
              "Decides which doctors you can see",
              "Refunds your deductible each January over the years"
            ],
            correctAnswer: 1,
            explanation: "The out-of-pocket maximum caps how much you pay in a year for covered care. Once you hit it, the insurer pays 100%, protecting you from unlimited bills - the core purpose of health insurance."
          },
          {
            id: "ins5-mc2",
            question: "Why does staying 'in-network' matter?",
            options: [
              "In-network care uses lower negotiated prices",
              "In-network doctors are always closer to home",
              "Out-of-network care is always free in most cases",
              "Networks decide your monthly premium"
            ],
            correctAnswer: 0,
            explanation: "In-network providers agreed to your insurer's negotiated rates, so you pay far less. Going out-of-network can cost much more or not be covered, so checking network status before care is wise."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya Picks a Health Plan",
        narrative: "Maya, 24, aged off her parent's plan and must choose her own. She's healthy, rarely visits the doctor, and has a solid emergency fund. Her job offers a high-deductible plan with a low premium and an HSA, and a low-deductible plan with a higher premium.",
        details: [
          "The high-deductible plan has a low monthly premium but she pays more before coverage starts.",
          "Because she's healthy and rarely needs care, she'd likely spend little on medical bills.",
          "The HSA lets her save pre-tax money that rolls over and even grows for future health costs.",
          "Her emergency fund could cover the higher deductible if something unexpected happened."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins5-aq1",
          question: "Given her health and emergency fund, which plan likely fits Maya best?",
          options: [
            "The low-deductible, higher-premium plan in most cases",
            "The high-deductible plan paired with an HSA",
            "No plan at all to save the premium",
            "Two plans at once for extra coverage"
          ],
          correctAnswer: 1,
          explanation: "A healthy young adult who rarely needs care usually saves with a low-premium, high-deductible plan, and the HSA adds pre-tax medical savings. Her emergency fund covers the deductible if needed."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Health plans split costs via premium, deductible, coinsurance/co-pays, and an out-of-pocket max.",
          "The out-of-pocket maximum caps yearly spending, then the insurer pays 100%.",
          "High-deductible plans (low premium) suit the healthy; low-deductible plans suit frequent care.",
          "Stay in-network for lower prices; out-of-network can be far costlier or uncovered.",
          "Young adults can stay on a parent's plan until 26, or use a job, marketplace, or Medicaid."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ins5-mastery1",
            question: "Your plan has a $2,000 deductible. This means you…",
            options: [
              "Never pay anything for medical care",
              "Pay the first $2,000 before insurance pays",
              "Pay $2,000 every single month in most cases",
              "Get $2,000 back from the insurer yearly"
            ],
            correctAnswer: 1,
            explanation: "The deductible is what you pay out of pocket before insurance starts covering costs. After you've paid $2,000 in covered care, the insurer begins paying its share (via coinsurance)."
          },
          {
            id: "ins5-mastery2",
            question: "Coinsurance of 20% means that after your deductible, you pay…",
            options: [
              "A flat $20 for every visit over the years",
              "20% of each bill, insurer pays 80%",
              "Nothing at all for any care",
              "20% of your yearly premium in most cases"
            ],
            correctAnswer: 1,
            explanation: "Coinsurance is a percentage split after the deductible. At 20%, you pay 20% of each covered bill and the insurer pays 80%, until you hit your out-of-pocket maximum."
          },
          {
            id: "ins5-mastery3",
            question: "A high-deductible health plan is usually best for someone who is…",
            options: [
              "Chronically ill and sees many specialists",
              "Young, healthy, and rarely needs care",
              "Unable to afford any monthly premium",
              "Looking to avoid all medical costs"
            ],
            correctAnswer: 1,
            explanation: "High-deductible plans have low premiums but you pay more before coverage kicks in, so they suit healthy people who rarely need care. Those with ongoing needs usually prefer a low-deductible plan."
          },
          {
            id: "ins5-mastery4",
            question: "Going out-of-network for a non-emergency usually means…",
            options: [
              "The care is completely free to you",
              "Much higher costs or no coverage",
              "Your premium drops for the year",
              "The insurer pays a bigger share"
            ],
            correctAnswer: 1,
            explanation: "Out-of-network providers haven't agreed to your insurer's rates, so you pay far more or the care isn't covered. Checking network status before non-emergency care prevents surprise bills."
          },
          {
            id: "ins5-mastery5",
            question: "Under the Affordable Care Act, plans must…",
            options: [
              "Charge everyone the exact same premium",
              "Cover preventive care and pre-existing conditions",
              "Cover any doctor anywhere for free",
              "Refund unused premiums each December in most cases"
            ],
            correctAnswer: 1,
            explanation: "The ACA requires plans to cover preventive care at no extra cost and bars denying coverage for pre-existing conditions. It doesn't make all doctors free or force identical premiums for everyone."
          },
          {
            id: "ins5-mastery6",
            question: "A common way for a 23-year-old to get affordable coverage is to…",
            options: [
              "Wait until they turn 30 to enroll",
              "Stay on a parent's plan until age 26",
              "Rely only on emergency room visits in most cases",
              "Buy several plans for more coverage over the years"
            ],
            correctAnswer: 1,
            explanation: "Young adults can typically stay on a parent's health plan until age 26, often the cheapest option. Other routes include a job, the marketplace, or Medicaid - but always have some coverage."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // ins-6: Life & Disability Insurance
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-6",
    sections: [
      {
        type: "concept",
        title: "Life Insurance: Protecting the People Who Depend on You",
        paragraphs: [
          "Life insurance pays a lump sum (the 'death benefit') to people you choose (your 'beneficiaries') if you die. Its real purpose is simple: to replace your income and cover obligations for people who depend on you financially. If a parent with kids and a mortgage dies, life insurance can pay off the house and support the family for years. The key question isn't your age - it's whether anyone would suffer financially without your income. A single teen with no dependents usually needs little or no life insurance, while a parent or someone supporting others needs it most.",
          "There are two main types, and the difference is huge. Term life insurance covers you for a set period - say 20 or 30 years - and pays out only if you die during that term. It's cheap because most people outlive the term, and it's the right choice for the vast majority of families: buy coverage during the years your kids are growing and the mortgage is unpaid. Whole (or permanent) life insurance lasts your entire life and builds a small 'cash value' savings component, but it costs many times more. For most people, term life plus investing the difference beats whole life.",
          "How much coverage? A common rule of thumb is 10 to 12 times your annual income, adjusted for debts and goals like paying off a mortgage or funding kids' college. The best time to buy term life is when you're young and healthy, because premiums are based on your age and health - lock in a low rate early. A crucial habit: name and update your beneficiaries, and keep them current after life events like marriage or a new child, so the money goes exactly where you intend without delay."
        ],
        bullets: [
          "Life insurance pays a death benefit to your beneficiaries to replace income and cover debts.",
          "You need it when others depend on your income; a single teen with no dependents usually doesn't.",
          "Term life covers a set period and is cheap; whole life lasts forever and costs far more.",
          "Most families are best served by term life, often 10-12x income, buying young while healthy.",
          "Name and update your beneficiaries so the payout goes exactly where you intend."
        ],
        realWorldExample: "Maria, 34, has two kids and a mortgage. She buys a 30-year term life policy with a $600,000 death benefit for about $35 a month. If she dies, the payout can clear the mortgage and support her kids for years. A comparable whole life policy would cost several times more for the same protection."
      },
      {
        type: "concept",
        title: "Disability Insurance: Protecting Your Paycheck",
        paragraphs: [
          "People buy life insurance readily but overlook a more likely risk: becoming unable to work due to injury or illness. Disability insurance replaces a portion of your income - typically 50% to 70% - if you can't work. For most working people, their ability to earn is their single biggest asset; a career of income can total millions of dollars. An injury or serious illness that stops your paycheck for months or years can be more financially devastating than death, because your bills continue while your income vanishes. Yet far fewer people protect against it.",
          "There are two flavors. Short-term disability covers a few months (useful for recovery from surgery or childbirth), while long-term disability kicks in for extended or permanent conditions and can pay until retirement age. Many employers offer group disability coverage cheaply or free, which is often the easiest way to get it - check your benefits. Key details to compare include the 'elimination period' (the waiting time before benefits start, like 90 days), how long benefits last, and the definition of 'disabled' (whether you can't do your OWN job versus any job at all).",
          "Together, life and disability insurance protect the human side of your finances: your income and the people who rely on it. The priority order for most young workers is to first make sure you have health insurance, then disability insurance to protect your paycheck, and life insurance once others depend on you. Employer coverage is a great start but may not be enough, so consider supplementing it. Don't over-insure by buying life insurance you don't need, and don't under-insure by ignoring disability, which is statistically more likely to affect you during your working years."
        ],
        bullets: [
          "Disability insurance replaces 50%-70% of income if you can't work due to injury or illness.",
          "Your ability to earn is your biggest asset; losing your paycheck can be more devastating than death.",
          "Short-term covers months; long-term can pay until retirement age.",
          "Compare the elimination period, benefit length, and whether 'disabled' means your own job or any job.",
          "Priority for young workers: health first, then disability, then life once others depend on you."
        ],
        realWorldExample: "Dev, 28, breaks his back in a fall and can't work for a year. His long-term disability insurance replaces 60% of his salary, so he keeps paying rent and bills during recovery. Without it, a single accident would have drained his savings and forced him into debt while unable to earn."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins6-mc1",
            question: "Who most needs life insurance?",
            options: [
              "A single teen with no dependents in most cases",
              "A parent whose income supports a family",
              "Anyone under age 18, by law",
              "People who never plan to have debt"
            ],
            correctAnswer: 1,
            explanation: "Life insurance replaces your income for people who depend on it, so a parent supporting a family needs it most. A single teen with no dependents usually needs little or none."
          },
          {
            id: "ins6-mc2",
            question: "What does disability insurance protect?",
            options: [
              "Your ability to earn income",
              "Your car against theft in most cases",
              "Your home from fire damage",
              "Your credit score from drops"
            ],
            correctAnswer: 0,
            explanation: "Disability insurance replaces part of your income if injury or illness stops you from working. Your earning ability is often your biggest asset, making this coverage important during your working years."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Reviews Her Coverage",
        narrative: "Priya, 30, has a young child, a mortgage, and a good salary. She wonders whether to buy expensive whole life insurance a salesperson recommended, and whether she needs disability insurance her employer offers cheaply. Her income supports her family, and her savings are modest.",
        details: [
          "Because her family depends on her income, she needs meaningful life coverage.",
          "Term life would give her a large death benefit for a fraction of whole life's cost.",
          "Her employer's disability coverage would replace part of her income if she couldn't work.",
          "An injury stopping her paycheck is statistically more likely than death during her working years."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins6-aq1",
          question: "What's the most cost-effective, well-rounded choice for Priya?",
          options: [
            "Buy whole life and skip disability coverage in most cases",
            "Buy term life and add the disability coverage",
            "Skip both to keep her premiums low",
            "Buy only disability and no life insurance"
          ],
          correctAnswer: 1,
          explanation: "Term life gives her family a large death benefit far cheaper than whole life, and the affordable employer disability coverage protects her paycheck against the more likely risk of being unable to work."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Life insurance replaces income for people who depend on you; a single teen usually needs little.",
          "Term life is cheap and right for most families; whole life costs far more for the same protection.",
          "Buy life coverage young and healthy, and keep beneficiaries updated.",
          "Disability insurance protects your paycheck - often more likely to matter than death while working.",
          "Priority for young workers: health first, then disability, then life once others depend on you."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ins6-mastery1",
            question: "The main purpose of life insurance is to…",
            options: [
              "Grow your retirement savings in most cases",
              "Replace your income for dependents if you die",
              "Pay your medical bills while alive over the years",
              "Cover repairs to your home or car for you"
            ],
            correctAnswer: 1,
            explanation: "Life insurance pays a death benefit to replace your income and cover obligations for people who depend on you financially. It's about protecting dependents, not growing savings or paying medical bills."
          },
          {
            id: "ins6-mastery2",
            question: "Why is term life usually better than whole life for most families?",
            options: [
              "It lasts your entire life no matter what",
              "It gives large coverage at a low cost",
              "It doubles as a high-return investment in most cases",
              "It requires no health information at all"
            ],
            correctAnswer: 1,
            explanation: "Term life provides a large death benefit cheaply during the years you need it. Whole life costs many times more; most people are better off buying term and investing the difference."
          },
          {
            id: "ins6-mastery3",
            question: "When is the best time to buy term life insurance?",
            options: [
              "After you retire and stop working",
              "While you're young and healthy",
              "Only once you develop a serious illness",
              "After your children move out"
            ],
            correctAnswer: 1,
            explanation: "Premiums are based on age and health, so buying young and healthy locks in a low rate for the term. Waiting until you're older or ill makes coverage far more expensive."
          },
          {
            id: "ins6-mastery4",
            question: "Disability insurance typically replaces about…",
            options: [
              "100% of your salary indefinitely in most cases",
              "50% to 70% of your income",
              "Only a one-time $1,000 payment",
              "Your full income for just one week"
            ],
            correctAnswer: 1,
            explanation: "Disability insurance usually replaces 50%-70% of your income if you can't work, helping you keep paying bills during recovery. It doesn't fully replace your salary, but it prevents financial collapse."
          },
          {
            id: "ins6-mastery5",
            question: "Why do experts say disability insurance is often overlooked but important?",
            options: [
              "Disability is impossible to ever recover from in most cases",
              "Being unable to work is a very real risk",
              "It costs more than any other coverage over the years",
              "It replaces the need for health insurance"
            ],
            correctAnswer: 1,
            explanation: "Injury or illness that stops your paycheck is statistically likely during working years and can be devastating since bills continue. Many people insure their life but forget to protect their income."
          },
          {
            id: "ins6-mastery6",
            question: "A key detail to name and keep updated on a life policy is the…",
            options: [
              "Color scheme of the policy documents",
              "Beneficiary who receives the payout",
              "Brand of the insurance company logo",
              "Time of day the premium is billed"
            ],
            correctAnswer: 1,
            explanation: "The beneficiary is who receives the death benefit. Keeping it current after events like marriage or a new child ensures the money goes exactly where you intend, without delay or dispute."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // ins-7: Identity Theft: Prevention & Recovery
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-7",
    sections: [
      {
        type: "concept",
        title: "What Identity Theft Is and How to Prevent It",
        paragraphs: [
          "Identity theft happens when someone steals your personal information - Social Security number, birth date, card numbers, or logins - and uses it to pretend to be you. With it, thieves can open credit cards in your name, drain accounts, take out loans, file fake tax returns to steal your refund, or even get medical care on your insurance. The damage isn't just money; it can wreck your credit score and take months to untangle. Because your identity unlocks everything financial, protecting a few key pieces of information is one of the highest-value habits in personal finance.",
          "Prevention starts with guarding your most sensitive data, especially your Social Security number - never share it unless truly required (a real employer, bank, or government agency), and never in response to an unsolicited call or text. Use strong, unique passwords with two-factor authentication on financial accounts, so a leaked password isn't enough to get in. Be alert to phishing: fake messages that impersonate your bank or a company to trick you into revealing info. Shred documents with personal data, avoid oversharing on social media (birthdays, addresses, pet names double as security answers), and be careful on public Wi-Fi.",
          "A powerful and free protection is a credit freeze. Freezing your credit at the three major bureaus (Equifax, Experian, TransUnion) blocks anyone - including thieves - from opening new credit in your name until you unfreeze it. It's free, doesn't hurt your score, and you can lift it temporarily when you actually apply for credit. Also monitor your accounts and credit report regularly; you're entitled to free credit reports, and many apps alert you to new activity. Catching a fraudulent account early, before it grows, is far easier than cleaning up months of damage later."
        ],
        bullets: [
          "Identity theft is using your stolen personal info to open accounts, take loans, or drain money.",
          "Guard your Social Security number; share it only when truly required, never to unsolicited requests.",
          "Use unique passwords with two-factor authentication, and watch for phishing messages.",
          "A free credit freeze blocks new credit in your name and doesn't hurt your score.",
          "Monitor accounts and your credit report to catch fraudulent activity early."
        ],
        realWorldExample: "After a data breach exposes his info, Andre places a free credit freeze at all three bureaus. Weeks later, a thief tries to open a credit card in his name and is blocked because the freeze stops the lender from pulling his credit. When Andre applies for his own card later, he simply lifts the freeze for a day."
      },
      {
        type: "concept",
        title: "Spotting Theft and Recovering Fast",
        paragraphs: [
          "The sooner you catch identity theft, the easier the fix. Warning signs include unfamiliar charges or accounts on your statements or credit report, bills for things you didn't buy, calls from debt collectors about debts that aren't yours, being denied credit unexpectedly, or the IRS rejecting your tax return because one was already filed. Missing mail (like statements) can also signal that someone redirected it. Treat any of these as a red flag and investigate immediately rather than hoping it's a mistake - fraud tends to grow the longer it goes unnoticed.",
          "If you're hit, act in a clear order. First, contact the companies where fraud occurred to close or freeze those accounts and dispute the charges. Second, place a fraud alert or freeze on your credit with the bureaus. Third, report it to the FTC at IdentityTheft.gov, which generates an official recovery plan and an identity-theft report you can use as proof. Consider filing a police report for serious cases. Then change passwords, enable two-factor authentication everywhere, and keep detailed records of every call and letter, since recovery can involve disputing items repeatedly.",
          "Federal law is on your side, which limits your losses if you act promptly - fraudulent credit card charges generally cost you nothing, and debit fraud liability is capped when reported quickly. Some people also buy identity-theft protection services that monitor and help with recovery, though the free tools (freezes, alerts, IdentityTheft.gov) already cover the essentials. The mindset to keep: you can't guarantee you'll never be targeted, but strong prevention plus fast, organized recovery means an attempted theft becomes a manageable hassle instead of a financial catastrophe."
        ],
        bullets: [
          "Warning signs: unfamiliar charges or accounts, collector calls for debts you don't owe, a rejected tax return.",
          "Recovery order: close/dispute affected accounts, then freeze credit, then report at IdentityTheft.gov.",
          "Consider a police report for serious cases; change passwords and enable two-factor authentication.",
          "Keep detailed records of every call and dispute during recovery.",
          "Federal law limits your liability when you report promptly, so speed protects your money."
        ],
        realWorldExample: "Lena notices a credit card she never opened on her credit report. She disputes it with the issuer, freezes her credit, and files a report at IdentityTheft.gov to get an official recovery plan. Because she acted within days, the fraudulent account is removed and she owes nothing for the charges."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins7-mc1",
            question: "What is a free, effective way to prevent new-credit identity theft?",
            options: [
              "Sharing your SSN to verify accounts over the years",
              "Placing a credit freeze at the bureaus",
              "Posting your birthday on social media",
              "Reusing the same password on every site"
            ],
            correctAnswer: 1,
            explanation: "A credit freeze is free, doesn't hurt your score, and blocks anyone from opening new credit in your name until you lift it. Sharing your SSN or reusing passwords makes theft easier, not harder."
          },
          {
            id: "ins7-mc2",
            question: "Which is a warning sign of identity theft?",
            options: [
              "Your credit report shows accounts you never opened",
              "Your savings account earns some interest over the years",
              "You receive a real bill you expected",
              "Your password requires two-factor login in most cases"
            ],
            correctAnswer: 0,
            explanation: "Unfamiliar accounts on your credit report are a classic sign someone is using your identity. Expected bills, earned interest, and two-factor login are normal, not warning signs."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Spots a Strange Account",
        narrative: "Marcus, 19, checks his free credit report and sees a credit card he never opened, plus a collection notice for a debt that isn't his. His information was likely exposed in a recent data breach. He wants to stop the damage and clean up his record quickly.",
        details: [
          "The unfamiliar account and unknown debt are clear signs of identity theft.",
          "Contacting the card issuer to dispute and close the fraudulent account comes first.",
          "Freezing his credit at the bureaus blocks any further new accounts.",
          "Reporting at IdentityTheft.gov gives him an official recovery plan and proof."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins7-aq1",
          question: "What is Marcus's best first step after finding the fraudulent account?",
          options: [
            "Wait a few months to see if it disappears",
            "Dispute and close it, then freeze his credit",
            "Post the details publicly on social media",
            "Pay the unknown debt to make it go away"
          ],
          correctAnswer: 1,
          explanation: "Acting fast, Marcus should dispute and close the fraudulent account and freeze his credit to stop further damage, then report at IdentityTheft.gov. Waiting lets fraud grow; paying a fake debt wastes money."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Identity theft is using your stolen personal info to open accounts or drain money.",
          "Prevent it by guarding your SSN, using unique passwords with two-factor authentication, and freezing credit.",
          "A credit freeze is free, doesn't hurt your score, and blocks new accounts in your name.",
          "Warning signs include unfamiliar accounts, collector calls, and a rejected tax return.",
          "Recover fast: dispute affected accounts, freeze credit, and report at IdentityTheft.gov."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ins7-mastery1",
            question: "Identity theft can harm you by allowing thieves to…",
            options: [
              "Raise the interest on your savings over the years",
              "Open new accounts and loans in your name",
              "Improve your credit score for free for you",
              "Lower your monthly insurance premium in most cases"
            ],
            correctAnswer: 1,
            explanation: "With your stolen information, thieves can open credit cards, take loans, drain accounts, and file fake tax returns in your name - damaging your credit and finances until you fix it."
          },
          {
            id: "ins7-mastery2",
            question: "A credit freeze mainly protects you by…",
            options: [
              "Erasing all your existing debt over the years",
              "Blocking new credit opened in your name",
              "Boosting your credit score instantly for you",
              "Refunding fraudulent charges automatically in most cases"
            ],
            correctAnswer: 1,
            explanation: "A freeze stops lenders from pulling your credit, so no one can open new accounts in your name until you lift it. It's free and doesn't affect your score, but it doesn't erase debt or refund charges."
          },
          {
            id: "ins7-mastery3",
            question: "Which habit best reduces your risk of identity theft?",
            options: [
              "Reusing the same password on every site",
              "Using unique passwords with two-factor login",
              "Sharing your SSN whenever asked in most cases",
              "Posting your full address online"
            ],
            correctAnswer: 1,
            explanation: "Unique passwords plus two-factor authentication keep a single leaked password from unlocking your accounts. Reusing passwords, oversharing your SSN, and posting personal details all increase your risk."
          },
          {
            id: "ins7-mastery4",
            question: "Which official site helps you report and recover from identity theft?",
            options: [
              "A random link texted by an unknown number",
              "IdentityTheft.gov, run by the FTC",
              "Any social media help forum",
              "The website of the thief's bank"
            ],
            correctAnswer: 1,
            explanation: "IdentityTheft.gov is the FTC's official site that generates a recovery plan and an identity-theft report you can use as proof. Never trust random links texted to you claiming to help."
          },
          {
            id: "ins7-mastery5",
            question: "Why does reporting identity theft quickly matter?",
            options: [
              "It doubles your bank's interest rate in most cases",
              "Federal law limits your liability if prompt",
              "It automatically raises your credit score",
              "It cancels your need for insurance"
            ],
            correctAnswer: 1,
            explanation: "Reporting promptly limits your financial liability under federal law - fraudulent credit charges generally cost you nothing, and debit fraud losses are capped when reported quickly. Speed protects your money."
          },
          {
            id: "ins7-mastery6",
            question: "After discovering fraud, the correct first action is to…",
            options: [
              "Delete all your bank apps immediately in most cases",
              "Contact the affected companies to close accounts",
              "Ignore it and hope it resolves itself",
              "Announce it publicly on social media"
            ],
            correctAnswer: 1,
            explanation: "Start by contacting the companies where fraud occurred to close or dispute those accounts, then freeze your credit and report at IdentityTheft.gov. Ignoring it lets the damage grow."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // ins-8: Wills, Inheritance & Financial Planning
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-8",
    sections: [
      {
        type: "concept",
        title: "Estate Planning Basics: Wills and Beyond",
        paragraphs: [
          "Estate planning is deciding what happens to your money, belongings, and responsibilities after you die - and it's not just for the wealthy. The foundation is a will, a legal document that says who gets your assets and, crucially for parents, who becomes guardian of your children. If you die without a will (called dying 'intestate'), the state decides using default laws, which may not match your wishes and can tie up your assets in a slow court process called probate. A clear will spares your family confusion and conflict during an already painful time.",
          "A will is the start, but a few other tools do heavy lifting. Beneficiary designations on accounts like life insurance, IRAs, and 401(k)s pass directly to the named person and actually override your will - so keeping them updated is essential. A power of attorney lets someone you trust manage your finances if you become unable to (say, from illness), and a healthcare directive (living will) states your medical wishes if you can't speak for yourself. For larger or more complex estates, a trust can control how and when assets are distributed and can avoid probate. These documents also protect you while you're alive, not just after death.",
          "A key concept is how wealth passes between generations. When you inherit assets, you may benefit from a 'step-up in basis,' which resets the asset's value for tax purposes to its worth on the date of death - reducing capital-gains taxes if you later sell. Very large estates may face estate taxes, but the exemption is high enough that most families never owe them. The practical takeaway for a young person: even a simple will and up-to-date beneficiary designations prevent big problems, and these documents should be reviewed after major life events like marriage, kids, or buying a home."
        ],
        bullets: [
          "Estate planning decides who gets your assets and who cares for your kids - not just for the rich.",
          "A will directs your assets and names guardians; dying without one lets the state decide via probate.",
          "Beneficiary designations on life insurance and retirement accounts override your will - keep them current.",
          "A power of attorney and healthcare directive protect you while alive if you can't act for yourself.",
          "A 'step-up in basis' can cut capital-gains tax on inherited assets; most estates owe no estate tax."
        ],
        realWorldExample: "When Grandpa dies, he leaves stock he bought for $10,000 that's now worth $60,000. Thanks to the step-up in basis, its value resets to $60,000 for his heir. If the heir sells at $62,000, they owe capital-gains tax only on the $2,000 gain, not the full $52,000 - a major tax saving built into inheritance rules."
      },
      {
        type: "concept",
        title: "Building a Long-Term Financial Plan",
        paragraphs: [
          "A financial plan ties everything you've learned into a roadmap for your whole life. It starts with clear goals - short-term (an emergency fund, a car), medium-term (college, a home down payment), and long-term (retirement, financial independence) - each with a target amount and timeline. From there, you budget so spending is less than income, build an emergency fund of three to six months of expenses, pay off high-interest debt, and then invest steadily for the future. The magic ingredient is time: starting young lets compound growth turn modest, consistent contributions into large sums over decades.",
          "A solid plan also manages risk and protects what you've built - which is where everything in this unit connects. Insurance (health, auto, renters, disability, and life once others depend on you) shields your plan from disasters that would otherwise wipe out your savings. Tax-advantaged accounts like a Roth IRA and a 401(k) with employer match accelerate your investing. Protecting your identity keeps thieves from undoing your progress. And basic estate documents ensure your wishes are honored. A plan isn't just about growing money; it's about defending it against the shocks life throws at you.",
          "Finally, a financial plan is a living document, not a one-time task. Life changes - a new job, marriage, kids, a move - so you revisit and adjust your goals, budget, insurance, and beneficiaries periodically, ideally once a year and after big events. The habits matter more than perfection: spend less than you earn, automate saving and investing, insure the big risks, avoid high-interest debt, and give compounding decades to work. A teenager who starts these habits now has an enormous advantage, because the single biggest driver of long-term wealth is simply starting early and staying consistent."
        ],
        bullets: [
          "A financial plan sets short-, medium-, and long-term goals with targets and timelines.",
          "Core steps: budget, build an emergency fund, kill high-interest debt, then invest steadily.",
          "Insurance and identity protection defend your plan from disasters and theft.",
          "Tax-advantaged accounts (Roth IRA, 401k match) and starting young accelerate growth.",
          "Revisit the plan yearly and after big life events; consistent habits beat perfection."
        ],
        realWorldExample: "At 16, Aisha sets goals, automates $50 a month into a Roth IRA index fund, keeps renters insurance, and freezes her credit. By starting early and staying consistent, her small contributions compound for 50 years - potentially into hundreds of thousands of dollars - while insurance protects her from setbacks along the way."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins8-mc1",
            question: "What happens if you die without a will?",
            options: [
              "Your assets vanish and go to no one",
              "The state decides who gets your assets",
              "Your bank keeps all of your money",
              "Nothing needs to be decided at all"
            ],
            correctAnswer: 1,
            explanation: "Dying without a will ('intestate') means state default laws decide who inherits, which may not match your wishes and can tie up assets in probate. A will lets you direct your assets and name guardians."
          },
          {
            id: "ins8-mc2",
            question: "Which document overrides your will for that account?",
            options: [
              "A beneficiary designation on a 401(k)",
              "A grocery receipt from last year",
              "A social media privacy setting",
              "A monthly bank statement in most cases"
            ],
            correctAnswer: 0,
            explanation: "Beneficiary designations on accounts like life insurance and retirement plans pass directly to the named person and override your will, which is why keeping them updated is so important."
          }
        ]
      },
      {
        type: "scenario",
        title: "Owen Maps Out His Future",
        narrative: "Owen, 17, wants to get his financial life on track. He has a part-time job, no dependents, and decades ahead of him. He's thinking about goals, saving, investing, protecting himself, and what basic planning documents make sense at his age.",
        details: [
          "Starting young means compound growth has decades to turn small contributions into large sums.",
          "He builds an emergency fund and automates money into a Roth IRA each month.",
          "Insurance and a credit freeze protect his plan from disasters and identity theft.",
          "With no dependents yet, he needs little life insurance but will revisit that after major life events."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins8-aq1",
          question: "What gives Owen the single biggest long-term financial advantage?",
          options: [
            "Buying large life insurance right now in most cases",
            "Starting to save and invest early and consistently",
            "Waiting until age 40 to begin planning",
            "Spending his whole paycheck each month over the years"
          ],
          correctAnswer: 1,
          explanation: "Starting young lets compound growth work for decades, the biggest driver of long-term wealth. He needs little life insurance now, waiting to plan wastes time, and overspending undermines everything."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Estate planning decides who gets your assets and who cares for your kids - not just for the wealthy.",
          "A will directs assets and names guardians; beneficiary designations override the will, so keep them current.",
          "Power of attorney and healthcare directives protect you while you're alive.",
          "A financial plan sets goals, budgets, builds an emergency fund, kills debt, and invests early.",
          "Insurance, tax-advantaged accounts, and starting young defend and accelerate your plan."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ins8-mastery1",
            question: "Besides directing assets, a will is crucial for parents because it…",
            options: [
              "Guarantees their kids inherit millions in most cases",
              "Names who becomes guardian of their children",
              "Erases all of the family's debts over the years",
              "Doubles the value of their estate"
            ],
            correctAnswer: 1,
            explanation: "A will lets parents name a guardian for their children if they die - a decision the state would otherwise make. It also directs assets, but the guardianship choice is uniquely important for parents."
          },
          {
            id: "ins8-mastery2",
            question: "A power of attorney is useful because it lets someone…",
            options: [
              "Inherit your estate before you die",
              "Manage your finances if you can't",
              "Change your beneficiary designations secretly in most cases",
              "Collect your life insurance early"
            ],
            correctAnswer: 1,
            explanation: "A power of attorney authorizes a trusted person to handle your finances if illness or injury leaves you unable to. It protects you while alive, unlike a will, which takes effect after death."
          },
          {
            id: "ins8-mastery3",
            question: "The 'step-up in basis' on inherited assets mainly…",
            options: [
              "Increases the estate tax you owe",
              "Reduces capital-gains tax if you sell",
              "Forces you to sell the asset immediately",
              "Removes the asset from your inheritance"
            ],
            correctAnswer: 1,
            explanation: "A step-up in basis resets an inherited asset's value to its worth at the date of death, so selling it later triggers capital-gains tax only on gains beyond that point - a significant tax benefit."
          },
          {
            id: "ins8-mastery4",
            question: "Which is the correct early order in a financial plan?",
            options: [
              "Invest first, then never save any cash",
              "Budget, build an emergency fund, then invest",
              "Take on high-interest debt to invest more",
              "Spend everything, then borrow to save in most cases"
            ],
            correctAnswer: 1,
            explanation: "A sound plan budgets so spending is below income, builds an emergency fund, pays off high-interest debt, then invests steadily. Skipping the safety net or borrowing to invest is risky and backwards."
          },
          {
            id: "ins8-mastery5",
            question: "How does insurance fit into a long-term financial plan?",
            options: [
              "It replaces the need to save or invest",
              "It defends your plan from costly disasters",
              "It guarantees your investments will grow",
              "It is only useful after you retire"
            ],
            correctAnswer: 1,
            explanation: "Insurance protects the plan you build - health, auto, renters, disability, and life coverage keep a disaster from wiping out your savings. It defends wealth rather than replacing saving and investing."
          },
          {
            id: "ins8-mastery6",
            question: "The single biggest driver of long-term wealth for a teen is…",
            options: [
              "Picking one perfect hot stock",
              "Starting early and staying consistent",
              "Timing the market's ups and downs",
              "Avoiding banks and holding cash"
            ],
            correctAnswer: 1,
            explanation: "Starting young gives compound growth decades to work, turning modest, consistent contributions into large sums. Consistency beats chasing hot stocks or trying to time the market."
          }
        ]
      }
    ]
  },
]
