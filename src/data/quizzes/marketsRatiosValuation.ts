// Authored question banks: Stock Market mechanics, Financial Ratios, Valuation.
import type { LessonQuiz } from "../lessonQuizzes"

export const marketsRatiosValuationQuizzes: LessonQuiz[] = [
  // ── MARKET-6: After-Hours ──
  {
    lessonId: "market-6",
    questions: [
      { id: "market-6-q1", question: "Regular US stock market hours are…", options: ["9:30am to 4:00pm Eastern, weekdays", "24 hours a day, every day", "Noon to midnight on weekends", "6:00am to 6:00pm local time"], correctAnswer: 0, explanation: "The NYSE and Nasdaq run 9:30-4:00 ET - everything outside that is 'extended hours' trading." },
      { id: "market-6-q2", question: "Why do many companies release earnings AFTER the close?", options: ["To give investors overnight to digest news", "Because printers only run at night", "To hide bad results from everyone", "Exchanges charge less for evening news"], correctAnswer: 0, explanation: "Releasing at 4:05pm gives the market overnight to process instead of triggering mid-session chaos." },
      { id: "market-6-q3", question: "The main characteristic of after-hours trading is…", options: ["Thin volume with wider price swings", "Higher volume than the regular day", "Government-set fixed prices", "Free trades for all participants"], correctAnswer: 0, explanation: "Fewer participants means small trades move prices a lot - spreads widen and fills get unpredictable." },
      { id: "market-6-q4", question: "A stock jumps 8% after-hours on good news. At tomorrow's open it…", options: ["May open near it - or somewhere else", "Must open exactly 8% higher by rule", "Resets to yesterday's closing price", "Cannot trade until noon"], correctAnswer: 0, explanation: "Overnight reactions are a preview, not a promise - full-market participation can confirm or reverse the move." },
      { id: "market-6-q5", question: "For beginners, the sensible after-hours policy is…", options: ["Watch the news, trade during regular hours", "Do all trading at 3am for quiet", "Use market orders after hours only", "Never read news outside 9:30-4:00"], correctAnswer: 0, explanation: "Let the volatility settle - regular sessions give fairer prices and tighter spreads." },
      { id: "market-6-q6", question: "If you MUST trade extended hours, professionals use…", options: ["Limit orders to control the fill price", "Market orders for maximum speed", "Handwritten orders faxed to the exchange", "Voice calls to the company's CEO"], correctAnswer: 0, explanation: "In thin markets, a limit order is your seatbelt - a market order can fill embarrassingly far from the last price." },
    ],
  },
  // ── MARKET-7: Circuit Breakers ──
  {
    lessonId: "market-7",
    questions: [
      { id: "market-7-q1", question: "A market-wide circuit breaker does what?", options: ["Pauses all trading after an extreme drop", "Cuts electricity to the exchange floor", "Caps how high stocks can rise daily", "Bans selling for an entire week"], correctAnswer: 0, explanation: "Big S&P 500 plunges (7%, 13%, 20%) trigger temporary halts so panic can cool." },
      { id: "market-7-q2", question: "The first market-wide circuit breaker trips when the S&P 500 falls…", options: ["7% in one session", "1% in one session", "25% in one session", "50% in one session"], correctAnswer: 0, explanation: "Level 1 = 7% (15-minute halt), level 2 = 13%, level 3 = 20% ends trading for the day." },
      { id: "market-7-q3", question: "The purpose of pausing trading during a crash is to…", options: ["Give investors time to think, not panic", "Let exchanges fix broken computers", "Protect only the largest investors", "Allow the government to set prices"], correctAnswer: 0, explanation: "Halts interrupt cascading fear - a forced breather so decisions come from brains, not adrenaline." },
      { id: "market-7-q4", question: "Circuit breakers were introduced after which event?", options: ["The 1987 'Black Monday' crash", "The invention of the telephone", "The 2021 meme-stock rally", "The first Super Bowl"], correctAnswer: 0, explanation: "After stocks fell 22% in ONE day in October 1987, regulators built automatic brakes into the system." },
      { id: "market-7-q5", question: "Single stocks also have their own version, called…", options: ["Limit up / limit down halts", "Personal timeout penalties", "Dividend suspension rules", "Weekend-only trading bans"], correctAnswer: 0, explanation: "Individual stocks pause briefly when they move too far too fast - the same cooling-off logic, stock by stock." },
      { id: "market-7-q6", question: "In March 2020, circuit breakers tripped four times. For long-term investors this was…", options: ["A dramatic moment, not a reason to abandon plans", "The signal that markets were permanently over", "A ban on ever buying stocks again", "Proof that only cash is safe"], correctAnswer: 0, explanation: "Markets halted, resumed, and later fully recovered - investors who held their plan came out ahead." },
    ],
  },
  // ── MARKET-8: Insider Trading ──
  {
    lessonId: "market-8",
    questions: [
      { id: "market-8-q1", question: "Illegal insider trading means trading based on…", options: ["Important company information not yet public", "Your own research from public filings", "A hunch after using the product", "News published in the morning paper"], correctAnswer: 0, explanation: "The crime is using material NON-public info - trading ahead of everyone who can't know yet." },
      { id: "market-8-q2", question: "Why is insider trading illegal?", options: ["It rigs the game against everyone else", "It creates too much paperwork", "It makes stock prices too stable", "It slows down the exchanges"], correctAnswer: 0, explanation: "Markets need trust that no one trades with an unfair information edge - otherwise regular people rationally stay away." },
      { id: "market-8-q3", question: "An executive's friend hears about a secret merger and buys the stock. Who broke the law?", options: ["Potentially both the tipper and the trader", "No one - friendship makes it legal", "Only the company being merged", "The stock exchange itself"], correctAnswer: 0, explanation: "Passing the tip AND trading on it can both be illegal - 'I heard it from a friend' is not a defense." },
      { id: "market-8-q4", question: "Executives CAN legally sell their own company's stock by…", options: ["Using pre-scheduled plans and public disclosure", "Selling quickly before bad news drops", "Using a relative's account instead", "Trading only on weekends"], correctAnswer: 0, explanation: "10b5-1 plans schedule trades in advance, and insider sales are publicly filed - transparency makes it legal." },
      { id: "market-8-q5", question: "Penalties for insider trading can include…", options: ["Massive fines and years in prison", "A warning letter at most", "Losing internet privileges", "Nothing if profits were small"], correctAnswer: 0, explanation: "The SEC and DOJ pursue it hard - careers, fortunes, and freedom have all been lost over 'sure thing' tips." },
      { id: "market-8-q6", question: "A stranger online claims 'guaranteed info' about an upcoming announcement. You should…", options: ["Ignore it - it's either fake or a crime", "Trade fast before others see it", "Pay them for more details", "Share it with your group chat"], correctAnswer: 0, explanation: "Either it's a scam, or acting on it is illegal insider trading. Both paths end badly - walk away." },
    ],
  },
  // ── MARKET-9: SEC Basics ──
  {
    lessonId: "market-9",
    questions: [
      { id: "market-9-q1", question: "The SEC is…", options: ["The US agency regulating securities markets", "A private stock-picking newsletter", "The exchange where all stocks trade", "A bank that insures stock losses"], correctAnswer: 0, explanation: "The Securities and Exchange Commission writes and enforces the rules that keep US markets fair." },
      { id: "market-9-q2", question: "The SEC's core mission is to…", options: ["Protect investors and keep markets fair", "Guarantee every investor a profit", "Set the daily price of each stock", "Collect taxes on trading gains"], correctAnswer: 0, explanation: "Protect investors; maintain fair, orderly markets; help companies raise capital - protection, not profit promises." },
      { id: "market-9-q3", question: "Public companies must regularly file…", options: ["Audited financial reports like the 10-K", "Their employees' personal diaries", "Predictions guaranteed to come true", "Customer lists with home addresses"], correctAnswer: 0, explanation: "Annual 10-Ks and quarterly 10-Qs put audited numbers in public view - the foundation of informed investing." },
      { id: "market-9-q4", question: "Where can anyone read those filings for free?", options: ["The SEC's EDGAR database online", "Only inside SEC headquarters", "By purchasing them from brokers", "They're sealed from the public"], correctAnswer: 0, explanation: "EDGAR makes every filing free and searchable - the same raw documents professionals read." },
      { id: "market-9-q5", question: "The SEC was created in 1934 in response to…", options: ["The 1929 crash and rampant market fraud", "The invention of the computer", "A shortage of stockbrokers", "Complaints about slow mail"], correctAnswer: 0, explanation: "After the crash exposed manipulation and lies, Congress built a referee to restore public trust." },
      { id: "market-9-q6", question: "If a company lies in its filings, the SEC can…", options: ["Sue, fine, and ban the executives", "Only send a strongly worded letter", "Raise the company's stock price", "Do nothing - filings are optional"], correctAnswer: 0, explanation: "Enforcement has real teeth: fraud charges, disgorgement, officer bans - Enron-era cases ended in prison terms." },
    ],
  },
  // ── MARKET-10: Market Indexes ──
  {
    lessonId: "market-10",
    questions: [
      { id: "market-10-q1", question: "A stock market index is…", options: ["A measuring stick tracking a group of stocks", "A fee charged to enter the market", "The building where trading happens", "A list of banned companies"], correctAnswer: 0, explanation: "Indexes bundle many stocks into one number so you can see how 'the market' moved at a glance." },
      { id: "market-10-q2", question: "The S&P 500 tracks…", options: ["About 500 of the largest US companies", "The 500 newest startups in America", "500 stocks chosen by lottery", "Only technology companies"], correctAnswer: 0, explanation: "It covers ~80% of US market value - the default benchmark for 'the US stock market'." },
      { id: "market-10-q3", question: "The Dow Jones Industrial Average is quirky because it…", options: ["Contains just 30 stocks, weighted by price", "Includes every US public company", "Updates only once per year", "Tracks bonds instead of stocks"], correctAnswer: 0, explanation: "30 blue-chips, weighted by share PRICE (not size) - famous and historic, but less representative than the S&P." },
      { id: "market-10-q4", question: "The Nasdaq Composite is known for being…", options: ["Heavy on tech and growth companies", "Focused only on oil producers", "A bond-market thermometer", "Limited to foreign companies"], correctAnswer: 0, explanation: "Thousands of Nasdaq-listed names, dominated by tech - it swings harder than broader indexes." },
      { id: "market-10-q5", question: "'The market rose 2% today' usually refers to…", options: ["A major index like the S&P 500", "Every single stock rising exactly 2%", "The number of trades executed", "The exchange's own profits"], correctAnswer: 0, explanation: "Index moves are shorthand - inside a +2% day, plenty of individual stocks still fell." },
      { id: "market-10-q6", question: "Why do indexes matter to everyday investors?", options: ["Index funds let you own the whole basket cheaply", "You must memorize them to open accounts", "They decide which stocks are legal", "They set the price of groceries"], correctAnswer: 0, explanation: "Can't beat the market? Own it: index funds mirror these baskets at minimal cost - the backbone of most smart portfolios." },
    ],
  },
  // ── RATIOS-1: P/E ──
  {
    lessonId: "ratios-1",
    questions: [
      { id: "ratios-1-q1", question: "The P/E ratio divides…", options: ["Share price by earnings per share", "Profit by employee count", "Price by total company assets", "Earnings by the dividend paid"], correctAnswer: 0, explanation: "A $60 stock earning $3/share has a P/E of 20 - you pay $20 for each $1 of annual profit." },
      { id: "ratios-1-q2", question: "A high P/E generally signals that investors…", options: ["Expect strong future growth from the company", "Believe the company is nearly bankrupt", "Have stopped trading the stock", "Receive larger guaranteed dividends"], correctAnswer: 0, explanation: "Paying a premium for today's earnings only makes sense if tomorrow's earnings should be much bigger." },
      { id: "ratios-1-q3", question: "A very low P/E can mean the stock is cheap OR that…", options: ["The market doubts those earnings will last", "The company is growing too quickly", "The exchange mispriced the shares", "Dividends are about to double"], correctAnswer: 0, explanation: "'Cheap' and 'in trouble' look identical in this ratio - low P/E is a starting question, not an answer." },
      { id: "ratios-1-q4", question: "P/E comparisons are most meaningful between…", options: ["Companies in the same industry", "Any two companies on Earth", "A stock and a savings account", "Companies of different countries only"], correctAnswer: 0, explanation: "Software firms and steel mills naturally trade at different multiples - compare like with like." },
      { id: "ratios-1-q5", question: "A company with NO profits has a P/E that is…", options: ["Meaningless without any earnings", "Exactly 100 by convention", "Negative one hundred always", "Equal to its share price"], correctAnswer: 0, explanation: "No E, no P/E - unprofitable companies need other tools, like price-to-sales." },
      { id: "ratios-1-q6", question: "Stock A: P/E 15. Stock B: P/E 45, growing twice as fast. The lesson is…", options: ["P/E must be weighed against growth", "Stock A is automatically the better buy", "Stock B is automatically the better buy", "Both stocks are identical investments"], correctAnswer: 0, explanation: "A fair price for fast growth can beat a 'cheap' price for stagnation - context turns the number into insight." },
    ],
  },
  // ── RATIOS-2: EPS ──
  {
    lessonId: "ratios-2",
    questions: [
      { id: "ratios-2-q1", question: "EPS stands for and measures…", options: ["Earnings per share - profit per share", "Estimated price of stock next year", "Employees per store nationwide", "Expenses paid by shareholders"], correctAnswer: 0, explanation: "Net profit divided by shares outstanding - how much of the year's profit 'belongs' to each share." },
      { id: "ratios-2-q2", question: "A company earns $10 million with 5 million shares. EPS is…", options: ["$2.00 per share", "$0.50 per share", "$5.00 per share", "$50.00 per share"], correctAnswer: 0, explanation: "$10M ÷ 5M shares = $2 per share of profit." },
      { id: "ratios-2-q3", question: "Rising EPS year after year usually indicates…", options: ["A business growing its profitability", "The stock price must be falling", "The company is issuing more shares", "Dividends have been eliminated"], correctAnswer: 0, explanation: "Consistent EPS growth is the classic footprint of a compounding business - exactly what long-term investors hunt for." },
      { id: "ratios-2-q4", question: "Share buybacks raise EPS because…", options: ["The same profit is split across fewer shares", "Buybacks directly boost total profits", "Regulators add bonus earnings", "Customers buy more products"], correctAnswer: 0, explanation: "Shrinking the share count concentrates ownership - each remaining share claims a bigger slice." },
      { id: "ratios-2-q5", question: "'Beating EPS estimates' means the company…", options: ["Earned more per share than analysts predicted", "Paid a larger dividend than promised", "Hired more analysts than rivals", "Grew faster than the S&P 500"], correctAnswer: 0, explanation: "Wall Street forecasts EPS each quarter - beating the forecast often lifts the stock, missing often sinks it." },
      { id: "ratios-2-q6", question: "Why check EPS QUALITY, not just the number?", options: ["One-time gains can inflate EPS temporarily", "Bigger EPS always means better business", "EPS includes competitors' profits", "Auditors round EPS to whole dollars"], correctAnswer: 0, explanation: "Selling a building spikes EPS once; selling more product raises it durably - dig into WHERE the earnings came from." },
    ],
  },
  // ── RATIOS-3: Debt-to-Equity ──
  {
    lessonId: "ratios-3",
    questions: [
      { id: "ratios-3-q1", question: "The debt-to-equity ratio compares…", options: ["Borrowed money against owners' money", "Monthly sales against yearly sales", "Employee pay against executive pay", "Old debts against new debts"], correctAnswer: 0, explanation: "Total liabilities ÷ shareholder equity - how much of the company is built on borrowing." },
      { id: "ratios-3-q2", question: "A D/E ratio of 2.0 means the company has…", options: ["$2 of debt for every $1 of equity", "$2 of equity for every $1 of debt", "Exactly $2 million in loans", "Twice the profits of its rivals"], correctAnswer: 0, explanation: "Leverage of 2:1 - creditors have twice the claim that owners do." },
      { id: "ratios-3-q3", question: "High leverage is dangerous in downturns because…", options: ["Debt payments continue even when sales fall", "Lenders forgive loans during recessions", "Equity automatically converts to debt", "Interest rates drop to zero"], correctAnswer: 0, explanation: "Revenue is optional; interest is not. Heavy debt turns a bad year into a survival crisis." },
      { id: "ratios-3-q4", question: "Why do utilities carry high D/E comfortably while tech firms don't?", options: ["Steady revenue supports steady debt payments", "Utilities are exempt from repaying loans", "Tech companies are barred from borrowing", "Utility debt carries no interest"], correctAnswer: 0, explanation: "Boring, regulated cash flows can service big debt loads - volatile businesses need flexibility instead." },
      { id: "ratios-3-q5", question: "Debt isn't automatically bad because borrowing can…", options: ["Fund growth that out-earns the interest", "Be ignored on financial statements", "Replace the need for any revenue", "Only be used for office parties"], correctAnswer: 0, explanation: "Borrow at 5%, earn 15% on the expansion - that spread builds shareholder wealth. Leverage amplifies BOTH directions." },
      { id: "ratios-3-q6", question: "Comparing two similar retailers, the one with much higher D/E is…", options: ["Riskier if conditions worsen, all else equal", "Automatically the better investment", "Certain to grow faster forever", "Owned mostly by its employees"], correctAnswer: 0, explanation: "Same business, more borrowed fuel - brighter in booms, far more fragile in busts." },
    ],
  },
  // ── RATIOS-4: Profit Margin ──
  {
    lessonId: "ratios-4",
    questions: [
      { id: "ratios-4-q1", question: "Net profit margin tells you…", options: ["The percent of sales that becomes profit", "How many products the company sells", "The company's total yearly revenue", "How much executives are paid"], correctAnswer: 0, explanation: "$100 in sales, $10 kept after ALL costs = 10% net margin - efficiency in one number." },
      { id: "ratios-4-q2", question: "A company with $50M revenue and $5M net income has a margin of…", options: ["10 percent", "50 percent", "5 percent", "1 percent"], correctAnswer: 0, explanation: "5 ÷ 50 = 10% - a dime of profit per dollar sold." },
      { id: "ratios-4-q3", question: "Gross margin differs from net margin by excluding…", options: ["Overhead, interest, and taxes", "The cost of making the product", "All revenue from repeat customers", "Any sales made online"], correctAnswer: 0, explanation: "Gross = revenue minus direct production costs. Net = what survives EVERYTHING. The gap between them is the overhead story." },
      { id: "ratios-4-q4", question: "Software companies often enjoy far higher margins than grocery stores because…", options: ["Each extra copy costs nearly nothing", "Regulators cap grocery profits at 1%", "Software firms pay no salaries", "Food is legally sold at cost"], correctAnswer: 0, explanation: "Digital goods scale nearly free; groceries fight for pennies per dollar. Industry context defines a 'good' margin." },
      { id: "ratios-4-q5", question: "Shrinking margins over several years often warn of…", options: ["Rising costs or mounting price competition", "A business becoming more efficient", "Guaranteed dividend increases ahead", "Nothing - margins never change"], correctAnswer: 0, explanation: "The margin trendline is a health monitor - steady erosion means someone (costs or competitors) is squeezing the business." },
      { id: "ratios-4-q6", question: "High, stable margins over a decade usually point to…", options: ["Pricing power and a durable advantage", "An accounting error left uncorrected", "A company about to fail", "Random luck repeated yearly"], correctAnswer: 0, explanation: "Competitors attack fat margins constantly - defending them for years is evidence of a real moat." },
    ],
  },
  // ── RATIOS-5: ROE ──
  {
    lessonId: "ratios-5",
    questions: [
      { id: "ratios-5-q1", question: "Return on equity measures…", options: ["Profit per dollar shareholders invested", "The stock's price change this year", "Revenue growth versus last quarter", "Dividends divided by share price"], correctAnswer: 0, explanation: "Net income ÷ shareholder equity - how hard the owners' money is working inside the business." },
      { id: "ratios-5-q2", question: "A company with $20M profit on $100M equity has an ROE of…", options: ["20 percent", "2 percent", "80 percent", "5 percent"], correctAnswer: 0, explanation: "20 ÷ 100 = 20% - each equity dollar produced twenty cents of annual profit." },
      { id: "ratios-5-q3", question: "Consistently high ROE (15%+) over many years suggests…", options: ["A quality business compounding owner wealth", "The company is running out of ideas", "Shareholders are being overcharged", "An imminent stock split"], correctAnswer: 0, explanation: "Durable high returns on owners' capital is a hallmark Buffett-style investors screen for first." },
      { id: "ratios-5-q4", question: "ROE can be artificially inflated by…", options: ["Piling on debt to shrink the equity", "Hiring too many employees", "Paying suppliers early", "Splitting the stock two-for-one"], correctAnswer: 0, explanation: "Less equity in the denominator = higher ROE, courtesy of leverage - always check D/E alongside ROE." },
      { id: "ratios-5-q5", question: "ROE differs from profit margin because it measures returns on…", options: ["Invested capital rather than on sales", "Sales rather than customer count", "Employees rather than machines", "Taxes rather than revenue"], correctAnswer: 0, explanation: "Margin asks 'profit per sale'; ROE asks 'profit per dollar of ownership' - capital efficiency, not sales efficiency." },
      { id: "ratios-5-q6", question: "Two firms earn identical profits; one used half the equity. The leaner one has…", options: ["Double the ROE - leaner capital use", "Half the ROE - less total equity", "The same ROE - profits match", "No calculable ROE at all"], correctAnswer: 0, explanation: "Same output from less invested capital is the definition of efficiency - and the market rewards it." },
    ],
  },
  // ── RATIOS-6: Price-to-Sales ──
  {
    lessonId: "ratios-6",
    questions: [
      { id: "ratios-6-q1", question: "The price-to-sales ratio compares market cap to…", options: ["Total annual revenue", "Total annual profit", "The number of stores", "Cash in the bank"], correctAnswer: 0, explanation: "P/S = company price tag ÷ yearly sales - how many dollars you pay per dollar of revenue." },
      { id: "ratios-6-q2", question: "P/S is especially useful for companies that…", options: ["Have revenue but no profits yet", "Have been profitable for decades", "Pay very large dividends", "Own mostly real estate"], correctAnswer: 0, explanation: "No earnings means no P/E - P/S steps in to value growth-stage companies still in the red." },
      { id: "ratios-6-q3", question: "A $1B market cap company with $500M in sales trades at a P/S of…", options: ["2.0", "0.5", "5.0", "500"], correctAnswer: 0, explanation: "1,000 ÷ 500 = 2 - two dollars of price per dollar of annual revenue." },
      { id: "ratios-6-q4", question: "The blind spot of P/S is that revenue…", options: ["Says nothing about profitability", "Is impossible to measure accurately", "Includes the CEO's personal income", "Never changes between years"], correctAnswer: 0, explanation: "Selling dollars for ninety cents grows revenue beautifully - P/S can't see the losses underneath." },
      { id: "ratios-6-q5", question: "A software firm at P/S 10 vs a grocery chain at P/S 0.5 mostly reflects…", options: ["Different margins and growth expectations", "An obvious pricing mistake to exploit", "The grocery chain's superior business", "Identical prospects, different names"], correctAnswer: 0, explanation: "High-margin recurring revenue deserves a higher multiple than razor-thin retail sales - the ratio speaks industry dialects." },
      { id: "ratios-6-q6", question: "P/S works best when used…", options: ["With margins, growth, and close peers", "As the single deciding number", "Only on companies with no sales", "Once a decade at most"], correctAnswer: 0, explanation: "Revenue multiple + margin trajectory + peer comparison - together they tell you if the price makes sense." },
    ],
  },
  // ── RATIOS-7: Valuation Multiples ──
  {
    lessonId: "ratios-7",
    questions: [
      { id: "ratios-7-q1", question: "A 'valuation multiple' expresses price relative to…", options: ["A fundamental such as earnings", "The founder's personal wealth", "Last year's stock price alone", "The number of news articles"], correctAnswer: 0, explanation: "P/E, P/S, EV/EBITDA - all answer 'how many units of X am I paying for?' Price alone is noise; multiples add meaning." },
      { id: "ratios-7-q2", question: "Comparing a stock's multiple to its own HISTORY reveals…", options: ["Whether it's cheap or rich versus its past", "Exactly what price it hits next year", "The CEO's confidence level", "Nothing useful whatsoever"], correctAnswer: 0, explanation: "A company at P/E 30 that averaged 20 for a decade demands the question: what changed - the business or just the mood?" },
      { id: "ratios-7-q3", question: "Why use SEVERAL multiples instead of one?", options: ["Each has blind spots the others can catch", "Regulations require exactly five ratios", "More numbers impress other investors", "One ratio is illegal to use alone"], correctAnswer: 0, explanation: "P/E misses debt; P/S misses profitability - triangulating multiples builds a fuller, harder-to-fool picture." },
      { id: "ratios-7-q4", question: "EV/EBITDA improves on P/E partly because enterprise value includes…", options: ["Debt, giving a whole-business price", "Employee vacation balances", "Future products not yet invented", "Only the largest shareholder's stake"], correctAnswer: 0, explanation: "EV = market cap + debt - cash: the true takeover price. It compares fairly across different debt loads." },
      { id: "ratios-7-q5", question: "Growth companies command higher multiples because buyers pay for…", options: ["Tomorrow's much larger expected earnings", "The comfort of familiar brand names", "Guaranteed protection from losses", "Larger annual shareholder meetings"], correctAnswer: 0, explanation: "A multiple is a bet on the future - faster compounding justifies paying more per current dollar." },
      { id: "ratios-7-q6", question: "'Multiple compression' happens when…", options: ["Paying less per dollar of earnings", "A company splits its stock repeatedly", "Ratios are rounded to whole numbers", "Earnings grow while price doubles"], correctAnswer: 0, explanation: "Same earnings, lower price tag on them - often when rates rise or optimism fades. A stock can fall while its business grows." },
    ],
  },
  // ── RATIOS-8: Ratio Interpretation ──
  {
    lessonId: "ratios-8",
    questions: [
      { id: "ratios-8-q1", question: "The golden rule of ratio analysis is…", options: ["No single ratio tells the whole story", "The lowest P/E always wins", "Ratios replace reading actual reports", "Only ROE matters in the end"], correctAnswer: 0, explanation: "Each ratio is one instrument on the dashboard - flying by a single gauge crashes portfolios." },
      { id: "ratios-8-q2", question: "Ratios become meaningful when compared against…", options: ["Industry peers and the company's own history", "Companies from unrelated industries", "The investor's personal lucky numbers", "The weather during earnings week"], correctAnswer: 0, explanation: "Context is everything: a 20% margin is spectacular for retail, mediocre for software." },
      { id: "ratios-8-q3", question: "Low P/E + huge debt + shrinking margins together suggest…", options: ["A possible value trap, not a bargain", "The perfect stock to buy heavily", "A guaranteed dividend increase", "A company with no competitors"], correctAnswer: 0, explanation: "Cheap for a reason - combining ratios exposes what any single 'attractive' number conceals." },
      { id: "ratios-8-q4", question: "High ROE + low debt + stable margins is the profile of…", options: ["A quality compounder worth studying", "An obvious accounting fraud", "A dying business model", "A company impossible to value"], correctAnswer: 0, explanation: "Efficient, self-funded profitability that persists - the pattern behind most great long-term holdings." },
      { id: "ratios-8-q5", question: "TRENDS in ratios matter more than snapshots because…", options: ["Direction shows whether things improve", "Old numbers are always wrong", "Snapshots are illegal to publish", "Trends are easier to memorize"], correctAnswer: 0, explanation: "Margins climbing from 8% to 12% beats a static 15% headed downhill - invest in trajectories." },
      { id: "ratios-8-q6", question: "After the ratios look good, a real investor still checks…", options: ["The real business - products and rivals", "Nothing; ratios are conclusive proof", "Their horoscope for confirmation", "Whether the ticker sounds cool"], correctAnswer: 0, explanation: "Numbers describe the past; understanding the business predicts whether they'll continue. Ratios screen - thinking decides." },
    ],
  },
  // ── VALUATION-1: Company Value Drivers ──
  {
    lessonId: "valuation-1",
    questions: [
      { id: "valuation-1-q1", question: "Fundamentally, a company's value comes from…", options: ["The cash it can generate over its lifetime", "The height of its headquarters building", "How famous its logo has become", "The number of tweets about it"], correctAnswer: 0, explanation: "Every valuation method ultimately estimates future cash - profits are the engine, everything else is decoration." },
      { id: "valuation-1-q2", question: "Which is a genuine long-term value DRIVER?", options: ["Growing revenue with strong profit margins", "A viral marketing stunt last week", "An expensive office renovation", "The CEO's social media following"], correctAnswer: 0, explanation: "Durable growth × healthy margins × efficient capital use - the trio that compounds intrinsic value." },
      { id: "valuation-1-q3", question: "Two firms have equal profits today, but one is growing 20% yearly. It deserves…", options: ["A higher valuation for its bigger future", "Exactly the same price tag", "A lower valuation for the risk", "No valuation until it stops growing"], correctAnswer: 0, explanation: "Value is the future discounted to today - faster growth means a bigger future stream to pay for." },
      { id: "valuation-1-q4", question: "Predictable, recurring revenue (like subscriptions) earns higher valuations because…", options: ["Reliable cash beats uncertain cash", "Subscriptions are exempt from taxes", "Customers can never cancel them", "Regulators mandate premium pricing"], correctAnswer: 0, explanation: "Certainty is valuable - investors pay up for cash flows they can count on versus one-off, lumpy sales." },
      { id: "valuation-1-q5", question: "Management quality affects value because leaders decide…", options: ["How profits get reinvested or wasted", "The daily stock price directly", "Which investors may buy shares", "The national interest rate"], correctAnswer: 0, explanation: "Capital allocation - build, acquire, buy back, or squander - compounds into enormous differences over decades." },
      { id: "valuation-1-q6", question: "Price and value differ in that…", options: ["Price is what you pay; value is what you get", "They are always exactly equal", "Value changes daily; price never moves", "Price is set by accountants yearly"], correctAnswer: 0, explanation: "Buffett's classic line - markets constantly quote prices that drift above and below underlying value. The gap is opportunity." },
    ],
  },
  // ── VALUATION-2: Growth vs Value ──
  {
    lessonId: "valuation-2",
    questions: [
      { id: "valuation-2-q1", question: "Growth investing focuses on companies that are…", options: ["Expanding fast, even at expensive prices", "Cheap regardless of their prospects", "About to declare bankruptcy", "Older than fifty years"], correctAnswer: 0, explanation: "Growth investors pay premium multiples betting the expansion will outrun the price." },
      { id: "valuation-2-q2", question: "Value investing hunts for stocks that are…", options: ["Priced below their estimated true worth", "The most talked about online", "Rising the fastest this month", "Owned by celebrity investors"], correctAnswer: 0, explanation: "Buy dollars for seventy cents: solid businesses the market has mispriced or forgotten." },
      { id: "valuation-2-q3", question: "The classic risk of growth investing is…", options: ["Paying for growth that never materializes", "Owning companies that expand too well", "Earning dividends that are too large", "Holding stocks that never move"], correctAnswer: 0, explanation: "High multiples price in perfection - when hypergrowth stalls, the multiple AND the earnings estimate collapse together." },
      { id: "valuation-2-q4", question: "The classic risk of value investing is the 'value trap', meaning…", options: ["A stock cheap because the business is dying", "A discount store with limited inventory", "Paying too much for a growth stock", "A fund that charges hidden fees"], correctAnswer: 0, explanation: "Some things are cheap like bargains; others are cheap like expired milk - telling them apart is the craft." },
      { id: "valuation-2-q5", question: "Amazon in 2005 looked 'expensive' by P/E yet became a legend, showing…", options: ["Great growth can justify seemingly high prices", "P/E ratios are always meaningless", "Every expensive stock wins eventually", "Value investing never works"], correctAnswer: 0, explanation: "When growth actually delivers for decades, yesterday's 'crazy multiple' becomes a footnote - the trick is judging WHICH growth is real." },
      { id: "valuation-2-q6", question: "For most investors, the practical takeaway is…", options: ["Great businesses at reasonable prices beat labels", "Pick one camp and never consider the other", "Buy whatever fell the most yesterday", "Avoid both growth and value stocks"], correctAnswer: 0, explanation: "The best investors blend the schools: quality + growth + a price that leaves room to be wrong." },
    ],
  },
  // ── VALUATION-3: Moats ──
  {
    lessonId: "valuation-3",
    questions: [
      { id: "valuation-3-q1", question: "A company's 'moat' refers to…", options: ["A durable advantage protecting its profits", "The pond outside its headquarters", "Its total cash reserves", "The gap between offices"], correctAnswer: 0, explanation: "Like a castle moat, it keeps competitor armies from storming in and competing away the profits." },
      { id: "valuation-3-q2", question: "Which is a NETWORK-EFFECT moat?", options: ["A platform that grows with each user", "A factory with modern machinery", "A one-time viral advertisement", "A large downtown office lease"], correctAnswer: 0, explanation: "Each new user makes the product better for every other user - latecomers can't replicate the crowd." },
      { id: "valuation-3-q3", question: "High SWITCHING COSTS protect companies because customers…", options: ["Find leaving painful, expensive, or risky", "Are legally forbidden from leaving", "Forget other options exist", "Receive punishment for loyalty"], correctAnswer: 0, explanation: "Migrating your company's software or your bank's autopayments hurts - so customers stay, and pricing power follows." },
      { id: "valuation-3-q4", question: "Brand power counts as a moat when it lets a company…", options: ["Charge more than identical generic rivals", "Skip paying its own taxes", "Copy competitor products freely", "Hire employees without paying"], correctAnswer: 0, explanation: "People pay extra for the swoosh and the apple - decades of trust converted directly into margin." },
      { id: "valuation-3-q5", question: "A cost-advantage moat means a company can…", options: ["Profit at prices that would sink rivals", "Avoid publishing financial statements", "Force suppliers to work for free", "Sell products above market price only"], correctAnswer: 0, explanation: "Scale and efficiency let Costco or Walmart smile at price wars that kill everyone else." },
      { id: "valuation-3-q6", question: "Investors test a moat's REAL strength by checking whether…", options: ["High returns on capital persist for many years", "The company claims a moat in ads", "The CEO mentions moats in interviews", "The logo appears on merchandise"], correctAnswer: 0, explanation: "Talk is cheap; a genuine moat shows up as margins and returns competitors keep failing to erode." },
    ],
  },
  // ── VALUATION-4: Market Expectations ──
  {
    lessonId: "valuation-4",
    questions: [
      { id: "valuation-4-q1", question: "A stock's current price mainly reflects…", options: ["The crowd's bet about the future", "Only last year's audited profits", "The founder's asking price", "A fixed government valuation"], correctAnswer: 0, explanation: "Prices are forward-looking - millions of investors handicapping what comes next, not grading what already happened." },
      { id: "valuation-4-q2", question: "'Priced in' means a piece of news…", options: ["Is already reflected in the current price", "Has been censored from investors", "Will affect the price next quarter", "Only matters to employees"], correctAnswer: 0, explanation: "If everyone expects the iPhone launch, the launch itself moves nothing - only SURPRISES move prices." },
      { id: "valuation-4-q3", question: "A company grows 25% but the stock drops. Most likely, investors…", options: ["Expected growth even above 25%", "Dislike growth of any kind", "Misread the report entirely", "Were forbidden from buying"], correctAnswer: 0, explanation: "The bar was set at 30 - clearing 25 is a miss. Stocks trade on results VERSUS expectations, not results alone." },
      { id: "valuation-4-q4", question: "High-multiple stocks are 'priced for perfection', meaning…", options: ["Small disappointments trigger big drops", "They are guaranteed to keep rising", "Their businesses cannot make mistakes", "Regulators certify their quality"], correctAnswer: 0, explanation: "When flawless execution is the assumption, 'merely good' lands like bad news - expectations are embedded risk." },
      { id: "valuation-4-q5", question: "The investor's edge from understanding expectations is asking…", options: ["'What must be true for this price?'", "'What did the price do last Tuesday?'", "'Which stock has the coolest name?'", "'What does everyone already believe?'"], correctAnswer: 0, explanation: "Reverse-engineer the assumptions inside the price, then judge if they're too optimistic or too gloomy - that gap is your opportunity." },
      { id: "valuation-4-q6", question: "Low expectations can be an ally because…", options: ["Modest good news can rerate a written-off stock", "Nothing can disappoint anyone further", "Cheap stocks legally must recover", "Pessimism attracts subsidies"], correctAnswer: 0, explanation: "When the market prices in disaster, 'less bad than feared' becomes a catalyst - expectations set the hurdle height." },
    ],
  },
  // ── VALUATION-5: Simplified DCF ──
  {
    lessonId: "valuation-5",
    questions: [
      { id: "valuation-5-q1", question: "A DCF (discounted cash flow) model estimates value by…", options: ["Projecting future cash and discounting it to today", "Averaging the last month of stock prices", "Counting the company's total employees", "Multiplying revenue by a lucky number"], correctAnswer: 0, explanation: "Forecast the cash the business will produce, then translate future dollars into today's dollars - that sum is intrinsic value." },
      { id: "valuation-5-q2", question: "Future cash gets 'discounted' because…", options: ["Money later is worth less than now", "Banks charge fees for waiting", "Inflation makes math illegal", "Companies hide future profits"], correctAnswer: 0, explanation: "Time value of money strikes again - $100 arriving in 2035 is worth well under $100 today." },
      { id: "valuation-5-q3", question: "The discount rate in a DCF represents…", options: ["The return you require for the risk taken", "The company's coupon-code policy", "The sales-tax rate in its state", "The CEO's target bonus"], correctAnswer: 0, explanation: "Riskier cash flows get discounted harder - a startup's projections shrink faster than a utility's." },
      { id: "valuation-5-q4", question: "DCF outputs should be treated cautiously because…", options: ["Tiny assumption tweaks swing results", "The math involved is unsolvable", "They are accurate to the penny", "Only regulators may run them"], correctAnswer: 0, explanation: "Garbage in, gospel out: nudge growth by 2% and 'fair value' can double. It's an estimating tool, not an oracle." },
      { id: "valuation-5-q5", question: "If your conservative DCF says $80 and the stock trades at $50, the stock may be…", options: ["Undervalued - with a margin of safety", "Overvalued - sell immediately", "Fairly priced to perfection", "Impossible to analyze further"], correctAnswer: 0, explanation: "Buying below conservative estimates builds in room for error - the margin-of-safety principle." },
      { id: "valuation-5-q6", question: "The real benefit of building even a rough DCF is…", options: ["It forces you to study the business drivers", "It removes all uncertainty from investing", "It predicts next week's price exactly", "It impresses people at parties"], correctAnswer: 0, explanation: "The discipline of estimating growth, margins, and risk teaches you the business - the thinking matters more than the number." },
    ],
  },
  // ── VALUATION-6: Intrinsic vs Market ──
  {
    lessonId: "valuation-6",
    questions: [
      { id: "valuation-6-q1", question: "Intrinsic value is…", options: ["A business's true fundamental worth", "Whatever the stock traded at today", "The founding price of the shares", "The company's total revenue figure"], correctAnswer: 0, explanation: "The underlying worth of the cash-generating machine - independent of the market's daily mood." },
      { id: "valuation-6-q2", question: "Ben Graham's 'Mr. Market' parable teaches that market prices are…", options: ["Offers from a moody partner you can ignore", "Always perfectly rational and correct", "Set by government officials daily", "Fixed and unchangeable by law"], correctAnswer: 0, explanation: "Mr. Market shows up manic or depressed with daily offers - you're free to take advantage or ignore him entirely." },
      { id: "valuation-6-q3", question: "When market price sits far BELOW intrinsic value, disciplined investors…", options: ["See a buying opportunity with a safety margin", "Panic and sell everything they own", "Assume intrinsic value is meaningless", "Wait for the price to rise first"], correctAnswer: 0, explanation: "The bigger the discount to your conservative estimate, the more mistakes the purchase can survive." },
      { id: "valuation-6-q4", question: "Prices can detach from value for long stretches because…", options: ["Fear, hype, and crowd psychology drive trading", "Exchanges frequently misplace decimal points", "Companies change their value hourly", "Regulators schedule the mispricings"], correctAnswer: 0, explanation: "Bubbles and panics are recurring features, not bugs - humans price assets, and humans are emotional." },
      { id: "valuation-6-q5", question: "'In the short run a voting machine, in the long run a weighing machine' means…", options: ["Popularity rules now; fundamentals later", "Shareholders vote on prices weekly", "Markets literally weigh companies", "Voting rights determine all returns"], correctAnswer: 0, explanation: "Graham's line: hype decides today's price, but earnings power decides where price ends up." },
      { id: "valuation-6-q6", question: "Since intrinsic value is an ESTIMATE, smart investors…", options: ["Use ranges and demand a margin of safety", "Calculate it to four decimal places", "Skip valuation and follow influencers", "Trust whichever number is highest"], correctAnswer: 0, explanation: "Precision is fake; conservatism is real. A rough range plus a discount beats a confident exact figure." },
    ],
  },
  // ── VALUATION-7: Long-Term Investing ──
  {
    lessonId: "valuation-7",
    questions: [
      { id: "valuation-7-q1", question: "The single biggest advantage of long-term investing is…", options: ["Uninterrupted compounding for decades", "Avoiding the need to ever research", "Guaranteed protection from losses", "Access to secret institutional funds"], correctAnswer: 0, explanation: "Time turns modest, repeatable returns into fortunes - the eighth wonder needs runway, not brilliance." },
      { id: "valuation-7-q2", question: "Missing just the 10 BEST market days over decades…", options: ["Can cut your total returns dramatically", "Improves returns by avoiding volatility", "Has no measurable effect at all", "Is impossible if you watch the news"], correctAnswer: 0, explanation: "The best days cluster near the worst ones - market timers who dodge crashes usually miss the rebounds too." },
      { id: "valuation-7-q3", question: "Frequent trading drags down returns mostly through…", options: ["Taxes, costs, and badly timed emotions", "Exchanges losing your paperwork", "Stocks resenting disloyal owners", "Mandatory trading penalties"], correctAnswer: 0, explanation: "Every trade invites taxes, spreads, and the chance to be wrong twice - once selling, once rebuying." },
      { id: "valuation-7-q4", question: "The best preparation for a market crash is…", options: ["A written plan made before it happens", "A promise to improvise in the moment", "Selling everything at the first dip", "Avoiding stocks your entire life"], correctAnswer: 0, explanation: "Decide NOW what you'll do at -30% - investors with pre-commitments keep buying while improvisers capitulate." },
      { id: "valuation-7-q5", question: "'Time in the market beats timing the market' because…", options: ["Staying in captures unschedulable growth", "Clocks are more accurate than calendars", "Markets reward the oldest investors most", "Timing is illegal for individuals"], correctAnswer: 0, explanation: "Nobody rings a bell at bottoms - consistent presence captures the unpredictable best days that drive most returns." },
      { id: "valuation-7-q6", question: "A great business bought at a fair price should generally be held…", options: ["As long as the business stays great", "Exactly ninety days by rule", "Until the first 10% gain", "Until a TV pundit says sell"], correctAnswer: 0, explanation: "Sell when the thesis breaks - not when the calendar or the crowd says so. Great compounders reward stubborn owners." },
    ],
  },
]
