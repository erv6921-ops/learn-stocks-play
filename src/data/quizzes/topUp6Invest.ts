// Teaching-aligned top-up questions extending 6-question pools to ~10.
import { QuizQuestion } from "@/types"

export const topUp6Invest: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "invest-1",
    questions: [
      { id: "invest-1-tu1", question: "After adjusting for inflation, the US stock market's long-run return is closer to…", options: ["Around 7% per year", "Around 1% per year", "Around 20% per year", "Around 40% per year"], correctAnswer: 0, explanation: "The market has averaged about 10% before inflation, which is roughly 7% after inflation is subtracted." },
      { id: "invest-1-tu2", question: "Two teens invest the same amount, but one starts a decade earlier. That head start tends to…", options: ["Roughly double the final outcome", "Make no difference at all", "Only matter after age 50", "Guarantee a fixed yearly return"], correctAnswer: 0, explanation: "Each decade of a head start can roughly double the ending balance because compounding has more time to work." },
      { id: "invest-1-tu3", question: "Which statement about stock ownership is accurate?", options: ["A shareholder owns a small slice of the company's profits and growth", "A shareholder has loaned money the company must repay", "A share is a coupon for the company's products", "A share expires after one year"], correctAnswer: 0, explanation: "Buying a stock makes you a part-owner of the business, betting on its profits and growth." },
      { id: "invest-1-tu4", question: "The lesson's view of idle cash held for decades is that it is…", options: ["Not truly safe, because inflation shrinks its buying power", "Perfectly safe and always keeps its value", "The fastest-growing asset available", "Guaranteed to earn market returns"], correctAnswer: 0, explanation: "Money that quietly buys less every year is not actually safe, even though the dollar amount stays the same." },
    ],
  },
  {
    lessonId: "invest-2",
    questions: [
      { id: "invest-2-tu1", question: "Using the Rule of 72, prices growing at 4% inflation would roughly double in about…", options: ["18 years", "4 years", "40 years", "72 years"], correctAnswer: 0, explanation: "72 divided by the 4% rate gives about 18 years for prices to double." },
      { id: "invest-2-tu2", question: "If your savings earn 2% while inflation runs 5%, your real return is about…", options: ["-3%, so you lose buying power", "+7%, since the rates add up", "+2%, exactly the quoted rate", "0%, because they cancel out"], correctAnswer: 0, explanation: "Real return is earnings minus inflation, so 2% minus 5% leaves you down about 3%." },
      { id: "invest-2-tu3", question: "The single sentence that best defines inflation is…", options: ["A general rise in the overall price level over time", "The interest a bank pays on savings", "A tax added to expensive purchases", "A price increase at one particular store"], correctAnswer: 0, explanation: "Inflation is the overall price level climbing, so each dollar buys a little less than before." },
      { id: "invest-2-tu4", question: "Inflation feels neutral to a household only when…", options: ["Wages keep pace with rising prices", "Prices rise faster than income", "All spending is on luxury goods", "Cash is kept in a drawer"], correctAnswer: 0, explanation: "If pay lags behind prices, every paycheck stretches thinner, so income must keep up for inflation to feel neutral." },
    ],
  },
  {
    lessonId: "invest-3",
    questions: [
      { id: "invest-3-tu1", question: "$1,000 earning 5% simple interest pays you…", options: ["A flat $50 every year on the original amount", "A growing amount as interest earns interest", "Nothing until the account is closed", "Whatever the bank decides each month"], correctAnswer: 0, explanation: "Simple interest is calculated only on the original amount, so it pays $50 every year without stacking." },
      { id: "invest-3-tu2", question: "The 'snowball' idea of compounding refers to…", options: ["Past interest itself starting to earn interest", "The interest rate rising automatically", "Banks doubling your money on holidays", "Interest being exempt from tax"], correctAnswer: 0, explanation: "Compounding means growth builds on growth as earned interest begins earning interest of its own." },
      { id: "invest-3-tu3", question: "At an 8% rate, the Rule of 72 says money doubles in roughly…", options: ["9 years", "3 years", "18 years", "36 years"], correctAnswer: 0, explanation: "72 divided by 8 is about 9, so money doubles roughly every nine years at that rate." },
      { id: "invest-3-tu4", question: "Compounding turns against you most clearly with…", options: ["An unpaid credit card balance", "A purchase paid in full with a debit card", "Money in a no-fee checking account", "A prepaid subscription"], correctAnswer: 0, explanation: "Debt compounds by the same math, which is why unpaid card balances balloon over time." },
    ],
  },
  {
    lessonId: "invest-4",
    questions: [
      { id: "invest-4-tu1", question: "If you can earn 10%, would you rather have $100 today or $108 in a year?", options: ["$100 today, because it grows to $110", "$108 later, since the bigger number wins", "They are exactly equal", "Neither, the difference is meaningless"], correctAnswer: 0, explanation: "Invested at 10%, today's $100 becomes $110, which beats the $108 offered later." },
      { id: "invest-4-tu2", question: "The term 'present value' describes…", options: ["What a future payment is worth in today's dollars", "What your paycheck was worth last year", "The cash in a store's register", "Tomorrow's price of a stock"], correctAnswer: 0, explanation: "Present value discounts future money back to today so offers across time can be compared fairly." },
      { id: "invest-4-tu3", question: "A lottery winner taking the smaller lump sum now instead of larger yearly payments is using…", options: ["Time value of money reasoning", "A tax evasion trick", "Pure superstition", "The rule of scarcity pricing"], correctAnswer: 0, explanation: "Money received now can be invested, so a smaller amount today can rationally beat larger sums paid out slowly." },
      { id: "invest-4-tu4", question: "Time value of money explains why lenders charge interest, because…", options: ["Interest is the price of waiting to be repaid", "They prefer repayment as late as possible", "Loans must always be under a month", "Slower repayment earns a discount"], correctAnswer: 0, explanation: "Interest compensates a lender for delaying the use of their own money, making it the price of time." },
    ],
  },
  {
    lessonId: "invest-5",
    questions: [
      { id: "invest-5-tu1", question: "Ordered from higher to lower typical risk, the correct sequence is…", options: ["Stocks, bonds, savings account", "Savings account, bonds, stocks", "Bonds, stocks, savings account", "All three are equally risky"], correctAnswer: 0, explanation: "Stocks swing hardest, bonds wobble less, and insured savings barely move." },
      { id: "invest-5-tu2", question: "A pitch promising a guaranteed 20% monthly return is best treated as…", options: ["Almost certainly a scam", "A rare deal to act on quickly", "Normal for licensed brokers", "Safe if a friend suggests it"], correctAnswer: 0, explanation: "Guaranteed plus extraordinary returns is fraud math, since real high returns always carry visible risk." },
      { id: "invest-5-tu3", question: "Why can a teenager investing for retirement accept more risk?", options: ["Decades of runway let them recover from downturns", "Losses before 18 are refunded by law", "Young accounts are insured against drops", "Risk vanishes after five years"], correctAnswer: 0, explanation: "With no need for the money for decades, crashes hurt less and time smooths the ride." },
      { id: "invest-5-tu4", question: "The reason investors are paid extra for taking risk is that…", options: ["No one pays a premium for outcomes that are certain", "Safe assets legally must pay the most", "Research can remove all risk", "Returns are the same on every asset"], correctAnswer: 0, explanation: "The extra return exists precisely because the outcome is uncertain, so no one rewards risk-free choices." },
    ],
  },
  {
    lessonId: "invest-7",
    questions: [
      { id: "invest-7-tu1", question: "Holding 25 stocks that are all tech companies is…", options: ["Still concentrated in one industry", "Fully diversified by every measure", "Against trading regulations", "Risk-free because 25 is many"], correctAnswer: 0, explanation: "True diversification spreads across industries, sizes, and geographies, not just a large ticker count." },
      { id: "invest-7-tu2", question: "The risk diversification best protects against is…", options: ["A single company collapsing unexpectedly", "The whole world economy shrinking", "Inflation eroding your cash", "Your own impulse spending"], correctAnswer: 0, explanation: "Diversification cannot dodge a market-wide crash, but it turns any single company's failure into a scratch." },
      { id: "invest-7-tu3", question: "Putting most of your wealth in your own employer's stock is risky because…", options: ["A company failure could hit your job and savings at once", "Insiders always know their firm best", "Loyalty bonuses cap any losses", "Over-ownership carries legal penalties"], correctAnswer: 0, explanation: "Your paycheck and portfolio share one basket, so a company crisis strikes both income and savings together." },
      { id: "invest-7-tu4", question: "Mixing stocks, bonds, and cash helps a portfolio because these asset types…", options: ["Often move differently in the same conditions", "Always rise at exactly the same time", "Are all guaranteed to grow", "Triple the number of accounts you hold"], correctAnswer: 0, explanation: "When stocks sink, bonds often hold or rise, so mixing behaviors smooths the overall ride." },
    ],
  },
  {
    lessonId: "invest-8",
    questions: [
      { id: "invest-8-tu1", question: "Long time horizons make stock investing safer mainly because…", options: ["Markets have historically recovered given enough years", "Stocks cannot legally fall two years in a row", "Brokers refund long-term losses", "Old shares gain antique value"], correctAnswer: 0, explanation: "Any single year is a coin flip, but 20-year stretches of the US market have historically been positive." },
      { id: "invest-8-tu2", question: "For a car you plan to buy in one year and retirement 40 years away, a sensible split is…", options: ["Car fund in savings, retirement mostly in stocks", "Both entirely in speculative stocks", "Both entirely in checking", "Car fund in stocks, retirement in cash"], correctAnswer: 0, explanation: "Timeline dictates the vehicle: short-term money stays stable while long-term money can chase growth." },
      { id: "invest-8-tu3", question: "Checking a 40-year retirement portfolio every day tends to…", options: ["Breed anxiety and tempt panic decisions", "Boost long-run returns meaningfully", "Earn bonus interest from the broker", "Improve sleep and calm nerves"], correctAnswer: 0, explanation: "Daily price noise is meaningless over decades, and watching it invites exactly the wrong moves." },
      { id: "invest-8-tu4", question: "Selling an investment held for more than a year often results in…", options: ["Lower long-term capital gains tax rates", "An automatic penalty for waiting", "No difference in tax treatment", "Double taxation as punishment"], correctAnswer: 0, explanation: "The tax code rewards patience by taxing long-term gains more gently than quick flips." },
    ],
  },
  {
    lessonId: "invest-9",
    questions: [
      { id: "invest-9-tu1", question: "A 401(k) is best described as…", options: ["An employer-sponsored retirement account", "A series of government savings bonds", "A high-interest checking account", "A credit score tier"], correctAnswer: 0, explanation: "A 401(k) is offered through work and funded straight from your paycheck before you see the money." },
      { id: "invest-9-tu2", question: "The defining feature of a Roth IRA is…", options: ["Tax-free growth and tax-free withdrawals", "Unlimited contributions at any income", "Returns guaranteed by Congress", "Cash back on every deposit"], correctAnswer: 0, explanation: "You pay tax on the way in and never on the way out, so decades of growth stay entirely yours." },
      { id: "invest-9-tu3", question: "The one-line difference between Traditional and Roth accounts is…", options: ["Traditional taxes you later; Roth taxes you now", "Roth taxes you later; Traditional taxes you now", "Both are always fully tax-free", "Both tax you at deposit and withdrawal"], correctAnswer: 0, explanation: "Traditional defers tax to retirement while Roth pays it upfront, which often favors young, low-bracket earners." },
      { id: "invest-9-tu4", question: "Compared with retirement accounts, a regular brokerage account's main advantage is…", options: ["You can withdraw anytime with no age penalties", "It grows completely untaxed forever", "It is insured against market losses", "Employers must match your deposits"], correctAnswer: 0, explanation: "The trade-off is flexibility: no tax perks, but the money is not locked until age 59 and a half." },
    ],
  },
  {
    lessonId: "invest-10",
    questions: [
      { id: "invest-10-tu1", question: "Dollar-cost averaging is best described as…", options: ["Investing a fixed amount on a regular schedule", "Buying only at the year's lowest prices", "Averaging the prices of two brokers", "Splitting purchases with a friend"], correctAnswer: 0, explanation: "A steady fixed amount buys more shares when prices are low and fewer when high, removing timing anxiety." },
      { id: "invest-10-tu2", question: "If the market drops 20% right after your first investment, the seasoned move is to…", options: ["Keep contributing on schedule as planned", "Sell everything and wait for safety", "Check prices every hour until recovery", "Vow never to invest again"], correctAnswer: 0, explanation: "For long-term buyers a drop is a clearance sale, and the plan only fails if you abandon it." },
      { id: "invest-10-tu3", question: "A 1% annual fee held over 40 years can…", options: ["Eat roughly a quarter of your final wealth", "Cost only a few dollars total", "Be refunded to you at retirement", "Improve returns through better service"], correctAnswer: 0, explanation: "Fees compound too, so low-cost funds leave that money compounding for you instead." },
      { id: "invest-10-tu4", question: "What is the main advantage of automating your investing?", options: ["You invest consistently without relying on willpower or market timing", "It guarantees your investments will never lose value", "It lets you skip building an emergency fund", "It removes all fees from your account"], correctAnswer: 0, explanation: "Automatic contributions make investing happen on schedule no matter your mood or the headlines, which is how steady long-term wealth gets built." },
    ],
  },
]
