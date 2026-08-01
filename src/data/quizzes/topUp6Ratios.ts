// Teaching-aligned top-up questions extending 6-question pools to ~10.
import { QuizQuestion } from "@/types"

export const topUp6Ratios: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "ratios-1",
    questions: [
      { id: "ratios-1-tu1", question: "A stock trades at $80 and earns $4 per share. Its P/E is…", options: ["20", "40", "10", "320"], correctAnswer: 0, explanation: "Price divided by earnings per share: $80 / $4 = 20, so you pay $20 for each $1 of annual profit." },
      { id: "ratios-1-tu2", question: "A P/E of 20 means investors are paying…", options: ["$20 for every $1 of annual earnings", "$20 for the entire company", "20 percent of the share price in dividends", "$1 for every $20 of assets"], correctAnswer: 0, explanation: "P/E tells you the price paid per dollar of yearly profit, so a P/E of 20 is $20 per $1 of earnings." },
      { id: "ratios-1-tu3", question: "Why can comparing the P/E of a software firm to a steel mill mislead you?", options: ["Different industries naturally trade at different multiples", "Software firms have no earnings to divide", "Steel mills are legally barred from having a P/E", "P/E only works for foreign companies"], correctAnswer: 0, explanation: "The lesson stresses comparing like with like, since industries carry different normal multiples." },
      { id: "ratios-1-tu4", question: "An unprofitable startup with rising sales but no earnings is best valued using…", options: ["Price-to-sales, since P/E is meaningless with no earnings", "A P/E of exactly zero", "A negative P/E of 100", "The share price alone"], correctAnswer: 0, explanation: "With no E there is no meaningful P/E, so the lesson points to price-to-sales instead." },
    ],
  },
  {
    lessonId: "ratios-2",
    questions: [
      { id: "ratios-2-tu1", question: "A company earns $8 million in profit with 4 million shares outstanding. EPS is…", options: ["$2.00", "$0.50", "$4.00", "$32.00"], correctAnswer: 0, explanation: "Net profit divided by shares outstanding: $8M / 4M = $2.00 per share." },
      { id: "ratios-2-tu2", question: "If a company buys back shares while profit stays the same, EPS will…", options: ["Rise, because profit is split across fewer shares", "Fall, because buybacks cost money", "Stay identical, since profit is unchanged", "Drop to zero"], correctAnswer: 0, explanation: "Fewer shares means the same profit is concentrated, so each remaining share claims a bigger slice." },
      { id: "ratios-2-tu3", question: "A one-time gain from selling a building can make EPS look strong. This is why investors check…", options: ["The quality of earnings, not just the number", "Only the headline EPS figure", "How many analysts follow the stock", "The competitors' dividends"], correctAnswer: 0, explanation: "The lesson warns that one-time gains inflate EPS temporarily, so you dig into where earnings came from." },
      { id: "ratios-2-tu4", question: "A company reports EPS higher than analysts predicted. This is called…", options: ["Beating EPS estimates", "A stock split", "A share buyback", "Multiple compression"], correctAnswer: 0, explanation: "Earning more per share than Wall Street forecast is 'beating estimates,' which often lifts the stock." },
    ],
  },
  {
    lessonId: "ratios-3",
    questions: [
      { id: "ratios-3-tu1", question: "A company has $30M in total liabilities and $10M in shareholder equity. Its D/E ratio is…", options: ["3.0", "0.33", "20", "40"], correctAnswer: 0, explanation: "Total liabilities divided by equity: $30M / $10M = 3.0, meaning $3 of debt per $1 of equity." },
      { id: "ratios-3-tu2", question: "The debt-to-equity ratio is calculated as…", options: ["Total liabilities divided by shareholder equity", "Equity divided by total liabilities", "Debt divided by annual revenue", "Interest paid divided by profit"], correctAnswer: 0, explanation: "D/E compares borrowed money to owners' money: total liabilities over shareholder equity." },
      { id: "ratios-3-tu3", question: "A company borrows at 5% and earns 15% on the expansion it funded. This shows debt can…", options: ["Build shareholder wealth when returns beat the interest", "Never help a business grow", "Only be used during recessions", "Replace the need for revenue"], correctAnswer: 0, explanation: "The lesson notes borrowing to fund growth that out-earns the interest creates a wealth-building spread." },
      { id: "ratios-3-tu4", question: "Why is heavy debt especially dangerous during a downturn?", options: ["Interest payments continue even when sales fall", "Lenders forgive loans in recessions", "Debt turns into equity automatically", "Interest rates always drop to zero"], correctAnswer: 0, explanation: "Revenue is optional but interest is not, so heavy debt turns a bad year into a survival crisis." },
    ],
  },
  {
    lessonId: "ratios-4",
    questions: [
      { id: "ratios-4-tu1", question: "A company has $200M in revenue and $30M in net income. Its net profit margin is…", options: ["15 percent", "30 percent", "6.7 percent", "1.5 percent"], correctAnswer: 0, explanation: "Net income divided by revenue: $30M / $200M = 15 percent kept as profit." },
      { id: "ratios-4-tu2", question: "Gross margin differs from net margin because gross margin excludes…", options: ["Overhead, interest, and taxes", "The direct cost of making the product", "All sales revenue", "Only online sales"], correctAnswer: 0, explanation: "Gross margin subtracts only direct production costs, while net margin subtracts everything else too." },
      { id: "ratios-4-tu3", question: "Net profit margin measures…", options: ["The percent of each sales dollar that becomes profit", "The total number of units sold", "The company's total revenue", "How much executives are paid"], correctAnswer: 0, explanation: "Margin captures efficiency: how much of every sales dollar survives all costs as profit." },
      { id: "ratios-4-tu4", question: "High, stable margins defended over a decade usually signal…", options: ["Pricing power and a durable competitive advantage", "An uncorrected accounting error", "A company about to fail", "Pure luck repeated yearly"], correctAnswer: 0, explanation: "Rivals constantly attack fat margins, so defending them for years is evidence of a real moat." },
    ],
  },
  {
    lessonId: "ratios-5",
    questions: [
      { id: "ratios-5-tu1", question: "A company earns $15M in profit on $75M of shareholder equity. Its ROE is…", options: ["20 percent", "5 percent", "60 percent", "15 percent"], correctAnswer: 0, explanation: "Net income divided by equity: $15M / $75M = 20 percent return on owners' money." },
      { id: "ratios-5-tu2", question: "Return on equity is calculated as…", options: ["Net income divided by shareholder equity", "Share price divided by earnings", "Revenue divided by employees", "Dividends divided by share price"], correctAnswer: 0, explanation: "ROE measures profit per dollar shareholders invested: net income over equity." },
      { id: "ratios-5-tu3", question: "A company piles on debt, shrinking its equity. Its ROE can rise because…", options: ["Less equity in the denominator inflates the ratio", "Debt directly adds to profit", "Regulators award bonus earnings", "Revenue automatically doubles"], correctAnswer: 0, explanation: "Leverage shrinks the equity denominator, so the lesson says to check D/E alongside ROE." },
      { id: "ratios-5-tu4", question: "ROE differs from profit margin because ROE measures returns on…", options: ["Invested capital rather than on sales", "Sales rather than assets", "Employees rather than profit", "Taxes rather than revenue"], correctAnswer: 0, explanation: "Margin asks profit per sale, while ROE asks profit per dollar of ownership - capital efficiency." },
    ],
  },
  {
    lessonId: "ratios-6",
    questions: [
      { id: "ratios-6-tu1", question: "A company has a $2B market cap and $400M in annual sales. Its P/S ratio is…", options: ["5.0", "0.2", "2.0", "50"], correctAnswer: 0, explanation: "Market cap divided by revenue: $2B / $400M = 5.0, so $5 of price per $1 of sales." },
      { id: "ratios-6-tu2", question: "The price-to-sales ratio compares a company's market cap to its…", options: ["Total annual revenue", "Total annual profit", "Cash in the bank", "Number of employees"], correctAnswer: 0, explanation: "P/S measures dollars paid per dollar of yearly revenue, using sales rather than earnings." },
      { id: "ratios-6-tu3", question: "The main blind spot of price-to-sales is that revenue…", options: ["Says nothing about whether the company is profitable", "Cannot be measured accurately", "Includes competitors' sales", "Never changes year to year"], correctAnswer: 0, explanation: "A company can grow sales while losing money, and P/S can't see the losses underneath." },
      { id: "ratios-6-tu4", question: "P/S is especially handy for valuing companies that…", options: ["Have revenue but no profits yet", "Have paid dividends for decades", "Own mostly real estate", "Have stopped selling entirely"], correctAnswer: 0, explanation: "With no earnings there is no P/E, so P/S steps in to value growth-stage companies still in the red." },
    ],
  },
  {
    lessonId: "ratios-7",
    questions: [
      { id: "ratios-7-tu1", question: "Enterprise value in EV/EBITDA is calculated as…", options: ["Market cap plus debt minus cash", "Market cap minus all revenue", "Share price times earnings", "Sales divided by shares"], correctAnswer: 0, explanation: "EV = market cap + debt - cash, the true takeover price, which makes comparisons fair across debt loads." },
      { id: "ratios-7-tu2", question: "A valuation multiple expresses a company's price relative to…", options: ["A fundamental such as earnings or sales", "The founder's personal wealth", "Last year's price alone", "The number of news articles"], correctAnswer: 0, explanation: "Multiples like P/E and P/S state how many units of a fundamental you pay for, adding meaning to raw price." },
      { id: "ratios-7-tu3", question: "A stock trades at P/E 30 but has averaged 20 for a decade. This mainly tells you…", options: ["It is richly valued versus its own history", "Its exact price next year", "The CEO is confident", "Nothing useful at all"], correctAnswer: 0, explanation: "Comparing a multiple to its own history flags whether it's cheap or rich versus the past." },
      { id: "ratios-7-tu4", question: "'Multiple compression' describes a situation where investors…", options: ["Pay less per dollar of earnings than before", "See a company split its stock", "Watch earnings and price both double", "Round ratios to whole numbers"], correctAnswer: 0, explanation: "Compression means the same earnings carry a lower price tag, often as rates rise or optimism fades." },
    ],
  },
  {
    lessonId: "ratios-8",
    questions: [
      { id: "ratios-8-tu1", question: "Ratios only become meaningful when compared against…", options: ["Industry peers and the company's own history", "Firms from unrelated industries", "The investor's lucky numbers", "The weather that quarter"], correctAnswer: 0, explanation: "Context is everything: a 20 percent margin is great for retail but mediocre for software." },
      { id: "ratios-8-tu2", question: "A stock with a low P/E, huge debt, and shrinking margins is likely…", options: ["A possible value trap rather than a bargain", "The perfect stock to buy heavily", "Guaranteed to raise its dividend", "A company with no competitors"], correctAnswer: 0, explanation: "Combining ratios reveals it may be cheap for a reason, exposing what one number hides." },
      { id: "ratios-8-tu3", question: "Why do trends in ratios often matter more than a single snapshot?", options: ["Direction shows whether the business is improving or declining", "Old numbers are always wrong", "Snapshots cannot be published", "Trends are easier to memorize"], correctAnswer: 0, explanation: "Margins climbing from 8 to 12 percent beat a static 15 percent that is heading downhill." },
      { id: "ratios-8-tu4", question: "A company showing high ROE, low debt, and stable margins fits the profile of…", options: ["A quality compounder worth studying", "An obvious accounting fraud", "A dying business model", "A company impossible to value"], correctAnswer: 0, explanation: "Efficient, self-funded profitability that persists is the pattern behind most great long-term holdings." },
    ],
  },
]
