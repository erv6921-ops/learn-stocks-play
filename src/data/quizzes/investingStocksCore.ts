// Authored question banks for the Investing Intro and Stocks units.
// Six distinct questions per lesson, each testing a different facet.
import type { LessonQuiz } from "../lessonQuizzes"

export const investingStocksCoreQuizzes: LessonQuiz[] = [
  // ── INVEST-1: Why Investing Matters ──
  {
    lessonId: "invest-1",
    questions: [
      { id: "invest-1-q1", question: "The core reason investing beats only saving is…", options: ["Invested money can grow faster than inflation", "Banks refuse to hold large balances", "Saving is illegal past a certain amount", "Investments never lose any value"], correctAnswer: 0, explanation: "Savings rates rarely beat inflation long-term; ownership assets like stocks historically do." },
      { id: "invest-1-q2", question: "Historically, the US stock market's long-run average return is roughly…", options: ["Around 1% per year", "Around 10% per year", "Around 30% per year", "Around 75% per year"], correctAnswer: 1, explanation: "About 10% annually before inflation (~7% after) across a century - with plenty of wild years in between." },
      { id: "invest-1-q3", question: "Why is starting at 16 so much more powerful than at 30?", options: ["Extra years let compounding multiply your money", "Teenagers get legally guaranteed returns", "Markets only rise while you're young", "Brokers waive all risk for minors"], correctAnswer: 0, explanation: "Each decade of head start can roughly double the final outcome - time is the ingredient you can't buy back." },
      { id: "invest-1-q4", question: "When you buy a stock, you're really buying…", options: ["A small ownership slice of a company", "A loan the company must repay you", "A coupon for that company's products", "A ticket that expires in a year"], correctAnswer: 0, explanation: "Shareholders own a piece of the business - its profits and growth are what you're betting on." },
      { id: "invest-1-q5", question: "Leaving $10,000 in cash for 30 years while prices rise 3% yearly means…", options: ["Its buying power shrinks to less than half", "It secretly earns market returns anyway", "It doubles thanks to bank loyalty bonuses", "Nothing changes about what it can buy"], correctAnswer: 0, explanation: "Inflation quietly eats idle cash - 'safe' money that buys less every year isn't truly safe." },
      { id: "invest-1-q6", question: "Investing is best treated as…", options: ["A long-term habit of buying and holding", "A weekend hobby of rapid trading", "A lottery for picking one hot stock", "Something to start only after age 50"], correctAnswer: 0, explanation: "Consistent contributions over decades - not hot picks - is how ordinary incomes build real wealth." },
    ],
  },
  // ── INVEST-2: Inflation ──
  {
    lessonId: "invest-2",
    questions: [
      { id: "invest-2-q1", question: "Inflation is best defined as…", options: ["A general rise in prices over time", "A rise in one store's prices only", "The interest banks pay on savings", "A tax charged on large purchases"], correctAnswer: 0, explanation: "When the overall price level climbs, each dollar buys a little less than before." },
      { id: "invest-2-q2", question: "At 3% yearly inflation, prices roughly double about every…", options: ["4 years", "24 years", "50 years", "100 years"], correctAnswer: 1, explanation: "Rule of 72: 72 ÷ 3 ≈ 24 years - today's $5 burrito is tomorrow's $10 burrito." },
      { id: "invest-2-q3", question: "Who gets hurt most by high inflation?", options: ["People holding lots of idle cash", "People who owe fixed-rate debts", "People owning productive assets", "People with rising market incomes"], correctAnswer: 0, explanation: "Cash loses buying power the fastest; asset owners and fixed-rate borrowers actually fare comparatively better." },
      { id: "invest-2-q4", question: "Your savings earn 1% while inflation runs 4%. Your REAL return is…", options: ["About -3% - you're losing buying power", "Exactly +1% - the rate you were quoted", "About +5% - the two rates combine", "Zero - rates and inflation always cancel"], correctAnswer: 0, explanation: "Real return = earnings minus inflation. Positive-looking accounts can still quietly shrink your wealth." },
      { id: "invest-2-q5", question: "Which purchase best protects long-term buying power?", options: ["Assets that historically outpace inflation", "A bigger stack of cash in a drawer", "Prepaid gift cards for many stores", "A checking account with a debit card"], correctAnswer: 0, explanation: "Ownership of growing businesses has historically beaten inflation; cash and near-cash have not." },
      { id: "invest-2-q6", question: "Why do wages matter in the inflation story?", options: ["If pay lags prices, your lifestyle shrinks", "Wages legally rise faster than prices", "Inflation only affects luxury goods", "Salaries are immune to price changes"], correctAnswer: 0, explanation: "Inflation only 'feels' neutral if income keeps pace - when it doesn't, every paycheck stretches thinner." },
    ],
  },
  // ── INVEST-3: Simple vs Compound ──
  {
    lessonId: "invest-3",
    questions: [
      { id: "invest-3-q1", question: "Simple interest pays you on…", options: ["Only the original amount you put in", "Your original amount plus past interest", "Whatever the bank feels like monthly", "The average of all your accounts"], correctAnswer: 0, explanation: "Simple interest never stacks - $1,000 at 5% simple pays $50 every year, forever." },
      { id: "invest-3-q2", question: "Compound interest is more powerful because…", options: ["Past interest starts earning interest too", "The rate automatically rises yearly", "It is exempt from all taxes", "Banks double it on holidays"], correctAnswer: 0, explanation: "Growth builds on growth - the snowball that makes long-term investing extraordinary." },
      { id: "invest-3-q3", question: "$1,000 at 10% for 3 years: compound vs simple gives you…", options: ["$1,331 vs $1,300 - compounding wins", "$1,300 vs $1,331 - simple wins", "$1,300 vs $1,300 - identical always", "$2,000 vs $1,100 - compounding doubles"], correctAnswer: 0, explanation: "Compound: 1,000→1,100→1,210→1,331. Simple: +$100 flat each year. Small gap now, enormous gap over decades." },
      { id: "invest-3-q4", question: "The Rule of 72 estimates…", options: ["Years for money to double at a given rate", "The ideal retirement age for savers", "Maximum safe withdrawals per year", "How many stocks a portfolio needs"], correctAnswer: 0, explanation: "72 ÷ rate ≈ doubling time. At 8%, money doubles roughly every 9 years." },
      { id: "invest-3-q5", question: "Compounding rewards which behavior most?", options: ["Starting early and leaving money alone", "Moving money between banks weekly", "Withdrawing gains as soon as they appear", "Waiting for the perfect entry moment"], correctAnswer: 0, explanation: "Time in the market matters more than timing - interrupting compounding resets the snowball." },
      { id: "invest-3-q6", question: "Where does compounding work AGAINST you?", options: ["Unpaid credit card balances", "A paid-in-full debit purchase", "Money in a no-fee checking account", "Prepaid subscription plans"], correctAnswer: 0, explanation: "Debt compounds by the same math - which is why card balances balloon and investments bloom." },
    ],
  },
  // ── INVEST-4: Time Value of Money ──
  {
    lessonId: "invest-4",
    questions: [
      { id: "invest-4-q1", question: "'A dollar today is worth more than a dollar tomorrow' because…", options: ["Today's dollar can be invested to grow", "Old dollars are collector's items", "Cash physically wears out over time", "Stores discount morning purchases"], correctAnswer: 0, explanation: "Money in hand can start compounding now - delay costs you the growth it would have earned." },
      { id: "invest-4-q2", question: "Would you rather have $100 now or $105 in a year, if you can earn 10% investing?", options: ["$100 now - it grows to $110", "$105 later - bigger number wins", "They are exactly equivalent", "Neither has any value difference"], correctAnswer: 0, explanation: "Invested at 10%, today's $100 becomes $110 - beating the $105. That comparison IS time value of money." },
      { id: "invest-4-q3", question: "'Present value' answers the question…", options: ["What a future payment is worth today", "What your paycheck was last year", "How much cash a store register holds", "What a stock will cost tomorrow"], correctAnswer: 0, explanation: "Discounting future money back to today lets you compare offers across time fairly." },
      { id: "invest-4-q4", question: "Waiting 10 years to start investing $200/month mostly costs you…", options: ["The compounding on your earliest contributions", "Nothing - later deposits catch up fully", "Only the 10 years of deposits themselves", "A small paperwork penalty"], correctAnswer: 0, explanation: "The first dollars have the longest runway - losing them costs far more than their face value." },
      { id: "invest-4-q5", question: "Lottery winners choosing 'lump sum now' over bigger 'annual payments' are applying…", options: ["Time value of money reasoning", "Pure superstition about banks", "A tax evasion technique", "The rule of scarcity pricing"], correctAnswer: 0, explanation: "Money now can be invested - a smaller amount today can rationally beat larger totals dribbled out later." },
      { id: "invest-4-q6", question: "Time value of money explains why lenders…", options: ["Charge interest for waiting to be repaid", "Prefer being repaid as late as possible", "Never lend for more than a month", "Give discounts for slower repayment"], correctAnswer: 0, explanation: "Interest is the price of time - compensation for delaying the lender's use of their own money." },
    ],
  },
  // ── INVEST-5: Risk vs Return ──
  {
    lessonId: "invest-5",
    questions: [
      { id: "invest-5-q1", question: "The fundamental trade-off in investing is…", options: ["Higher potential returns demand more risk", "Safe investments always earn the most", "Risk can be eliminated with research", "Returns are identical across all assets"], correctAnswer: 0, explanation: "Nobody pays you extra for taking no risk - the premium exists because outcomes are uncertain." },
      { id: "invest-5-q2", question: "Rank these from lower to higher typical risk:", options: ["Savings account → bonds → stocks", "Stocks → bonds → savings account", "Bonds → savings account → stocks", "All three carry identical risk"], correctAnswer: 0, explanation: "Insured savings barely move; bonds wobble; stocks swing hardest - and pay the most over long periods." },
      { id: "invest-5-q3", question: "An investment promising '20% monthly returns, guaranteed' is…", options: ["Almost certainly a scam to avoid", "A rare deal worth acting on fast", "Standard for licensed brokerages", "Low-risk if a friend recommends it"], correctAnswer: 0, explanation: "Guaranteed + extraordinary = fraud math. Real high returns always carry visible risk." },
      { id: "invest-5-q4", question: "Your 'risk tolerance' should mostly depend on…", options: ["Your time horizon and nerve for drops", "What your loudest friend is buying", "The weather on the day you invest", "Whether markets rose yesterday"], correctAnswer: 0, explanation: "Decades of runway and steady nerves justify more stock exposure; short timelines and panic-selling don't." },
      { id: "invest-5-q5", question: "A teen investing for retirement can accept more risk because…", options: ["There are decades to recover from downturns", "Losses under 18 are refunded by law", "Young accounts are insured against drops", "Risk disappears after five years"], correctAnswer: 0, explanation: "Crashes hurt less when you won't need the money for 40 years - time smooths the ride." },
      { id: "invest-5-q6", question: "Which move REDUCES risk without abandoning returns?", options: ["Spreading money across many investments", "Concentrating everything in one hot stock", "Trading in and out every single day", "Borrowing money to double the bet"], correctAnswer: 0, explanation: "Diversification trims the damage any single failure can do - the closest thing to a free lunch in investing." },
    ],
  },
  // ── INVEST-7: Diversification ──
  {
    lessonId: "invest-7",
    questions: [
      { id: "invest-7-q1", question: "'Don't put all your eggs in one basket' translates to…", options: ["Spread investments so one failure can't sink you", "Buy only companies that sell eggs", "Keep all your money in one strong stock", "Avoid investing in anything breakable"], correctAnswer: 0, explanation: "Diversification limits how much any single company, industry, or country can hurt your total." },
      { id: "invest-7-q2", question: "Owning 25 stocks that are ALL tech companies is…", options: ["Still concentrated in a single industry", "Perfectly diversified by any measure", "Illegal under trading regulations", "Riskless because 25 is a large number"], correctAnswer: 0, explanation: "True diversification crosses industries, sizes, and geographies - not just ticker count." },
      { id: "invest-7-q3", question: "The easiest one-purchase route to diversification is…", options: ["A broad index fund of hundreds of firms", "The single largest company on Earth", "A collection of rare sneakers", "Ten shares of your favorite brand"], correctAnswer: 0, explanation: "One S&P 500 or total-market fund instantly spreads you across the whole economy." },
      { id: "invest-7-q4", question: "Diversification protects you MOST against…", options: ["A single company collapsing unexpectedly", "The entire world economy shrinking", "Inflation eroding cash savings", "Your own impulse spending"], correctAnswer: 0, explanation: "It can't dodge whole-market crashes, but it makes any one Enron-style implosion a scratch instead of a wound." },
      { id: "invest-7-q5", question: "An employee holding most wealth in their employer's stock risks…", options: ["Losing job AND savings if the company fails", "Nothing - insiders know their firm best", "Only small losses due to loyalty bonuses", "Legal penalties for over-ownership"], correctAnswer: 0, explanation: "Same basket for paycheck and portfolio - a company crisis then hits your income and savings simultaneously." },
      { id: "invest-7-q6", question: "Diversifying across asset TYPES (stocks, bonds, cash) helps because…", options: ["They often move differently in the same conditions", "It triples the number of accounts you own", "Bonds always outperform everything", "Cash grows fastest during booms"], correctAnswer: 0, explanation: "When stocks sink, bonds often hold or rise - mixing behaviors smooths the overall ride." },
    ],
  },
  // ── INVEST-8: Long vs Short Term ──
  {
    lessonId: "invest-8",
    questions: [
      { id: "invest-8-q1", question: "Money you'll need within 2 years belongs in…", options: ["Safe, liquid places like high-yield savings", "Aggressive individual growth stocks", "A locked 10-year retirement account", "Collectible trading cards"], correctAnswer: 0, explanation: "Short timelines can't absorb a crash - next year's tuition shouldn't ride the market." },
      { id: "invest-8-q2", question: "Long horizons make stock investing safer because…", options: ["Markets have historically recovered given enough years", "Stocks legally can't fall two years straight", "Brokers refund long-term losses", "Old shares gain antique value"], correctAnswer: 0, explanation: "Any single year is a coin flip; 20-year stretches of the US market have historically been positive." },
      { id: "invest-8-q3", question: "Checking your retirement portfolio daily mostly causes…", options: ["Anxiety and tempting panic decisions", "Meaningfully higher long-run returns", "Bonus interest from your broker", "Better sleep and calmer nerves"], correctAnswer: 0, explanation: "Daily noise means nothing on a 40-year timeline - watching it invites exactly the wrong moves." },
      { id: "invest-8-q4", question: "Matching money to timeline: car in 1 year, retirement in 40. Sensible split?", options: ["Car fund in savings, retirement mostly in stocks", "Both entirely in speculative stocks", "Both entirely in a checking account", "Car fund in stocks, retirement in cash"], correctAnswer: 0, explanation: "Timeline dictates vehicle: short = stable and boring, long = growth-oriented and patient." },
      { id: "invest-8-q5", question: "Short-term trading is hard to win at because…", options: ["Prices short-term are mostly unpredictable noise", "Trades take months to be processed", "It's reserved for licensed professionals", "Markets are only open one day a week"], correctAnswer: 0, explanation: "Even professionals rarely out-guess weekly wiggles consistently - the long game is the reliable edge." },
      { id: "invest-8-q6", question: "Selling investments held over a year often gets…", options: ["Lower long-term capital gains tax rates", "An automatic penalty for waiting", "No tax treatment difference at all", "Double taxation as punishment"], correctAnswer: 0, explanation: "Tax code rewards patience - long-term gains are typically taxed more gently than quick flips." },
    ],
  },
  // ── INVEST-9: Accounts Overview ──
  {
    lessonId: "invest-9",
    questions: [
      { id: "invest-9-q1", question: "A 401(k) is…", options: ["An employer-sponsored retirement account", "A government savings bond series", "A type of high-interest checking", "A credit score above excellent"], correctAnswer: 0, explanation: "Offered through work, funded from your paycheck before you ever see the money." },
      { id: "invest-9-q2", question: "An employer 401(k) 'match' means…", options: ["Free money added when you contribute", "Your employer copies your stock picks", "Two employees share one account", "The company matches your job title"], correctAnswer: 0, explanation: "A 100% match on 4% of salary is an instant, guaranteed doubling - always grab the full match first." },
      { id: "invest-9-q3", question: "The Roth IRA's superpower is…", options: ["Tax-free growth and tax-free withdrawals", "Unlimited contributions at any income", "Guaranteed returns set by Congress", "Cash back on every deposit"], correctAnswer: 0, explanation: "Pay tax on the way in, never on the way out - decades of growth, all yours." },
      { id: "invest-9-q4", question: "Traditional vs Roth in one line:", options: ["Traditional taxes later; Roth taxes now", "Roth taxes later; Traditional taxes now", "Both are always completely tax-free", "Both tax you at deposit and withdrawal"], correctAnswer: 0, explanation: "Traditional defers tax to retirement; Roth pays upfront. Young, low-tax-bracket earners often favor Roth." },
      { id: "invest-9-q5", question: "A regular brokerage account's advantage over retirement accounts is…", options: ["Withdraw anytime with no age penalties", "It grows completely untaxed forever", "It's insured against market losses", "Employers must match deposits"], correctAnswer: 0, explanation: "Flexibility is the trade: no tax perks, but the money isn't locked until age 59½." },
      { id: "invest-9-q6", question: "For a 17-year-old with summer job income, the classic account move is…", options: ["A custodial Roth IRA opened with a parent", "A 30-year fixed mortgage", "A margin account for options trading", "Nothing - minors can't invest legally"], correctAnswer: 0, explanation: "Earned income + decades of tax-free compounding = a custodial Roth is the ultimate teenage cheat code." },
    ],
  },
  // ── INVEST-10: First Portfolio ──
  {
    lessonId: "invest-10",
    questions: [
      { id: "invest-10-q1", question: "The best FIRST step before buying any investment is…", options: ["An emergency fund and a clear goal", "Borrowing money to invest bigger", "Picking a favorite meme stock", "Waiting for a market crash"], correctAnswer: 0, explanation: "Cash cushion first, so a surprise bill never forces you to sell investments at the worst moment." },
      { id: "invest-10-q2", question: "A solid, simple starter portfolio for a long horizon is…", options: ["Broad index funds bought consistently", "One trendy stock and pure hope", "Daily rotations between hot sectors", "All cash until conditions feel perfect"], correctAnswer: 0, explanation: "Boring wins: total-market funds plus automatic contributions beat most stock-pickers over time." },
      { id: "invest-10-q3", question: "Dollar-cost averaging means…", options: ["Investing a fixed amount on a regular schedule", "Buying only when prices hit yearly lows", "Averaging the prices of two brokerages", "Splitting purchases with a friend"], correctAnswer: 0, explanation: "Same amount every month buys more shares when cheap, fewer when pricey - and removes timing anxiety." },
      { id: "invest-10-q4", question: "Fees deserve attention because a 1% annual fee over 40 years can…", options: ["Eat roughly a quarter of final wealth", "Cost only a few dollars in total", "Be refunded when you retire", "Improve returns via better service"], correctAnswer: 0, explanation: "Fees compound too - low-cost funds (expense ratios near 0.05%) leave that money compounding for YOU." },
      { id: "invest-10-q5", question: "The market drops 20% right after your first investment. The seasoned move is…", options: ["Keep contributing on schedule as planned", "Sell everything and wait for safety", "Check prices hourly until it recovers", "Never invest again"], correctAnswer: 0, explanation: "Drops are the market's clearance sale for long-term buyers - the plan only fails if you abandon it." },
      { id: "invest-10-q6", question: "'Pay yourself first' as an investor means…", options: ["Automate investing before spending the rest", "Buy personal treats before any saving", "Collect your dividends in cash monthly", "Pay off your broker's fees upfront"], correctAnswer: 0, explanation: "Route money to investments the day you're paid - what you never see, you never spend." },
    ],
  },
  // ── STOCKS-4: Market Cap ──
  {
    lessonId: "stocks-4",
    questions: [
      { id: "stocks-4-q1", question: "Market capitalization equals…", options: ["Share price times total shares outstanding", "Yearly revenue times profit margin", "Total assets minus total debts", "The CEO's estimate of company worth"], correctAnswer: 0, explanation: "A $50 stock with 1 billion shares = $50B market cap - the market's price tag for the whole company." },
      { id: "stocks-4-q2", question: "A $200 stock versus a $20 stock tells you…", options: ["Nothing about which company is bigger", "The $200 company is ten times larger", "The $20 stock is the better bargain", "The $200 company earns more profit"], correctAnswer: 0, explanation: "Price per share is meaningless alone - share COUNT differs wildly. Market cap is the real size measure." },
      { id: "stocks-4-q3", question: "'Large-cap' companies are generally…", options: ["Established giants, steadier but slower-growing", "Brand-new startups with huge potential", "Companies under $50 million in value", "Firms that only sell physical goods"], correctAnswer: 0, explanation: "$10B+ titans like Apple - less likely to double quickly, less likely to vanish." },
      { id: "stocks-4-q4", question: "Small-cap stocks typically offer…", options: ["Higher growth potential with higher risk", "Guaranteed dividends every quarter", "The same risk profile as large-caps", "Protection from market downturns"], correctAnswer: 0, explanation: "Smaller companies have room to multiply - and less cushion when things go wrong." },
      { id: "stocks-4-q5", question: "A company at $2B market cap doubles its share price. Its new cap is…", options: ["$4 billion", "$2 billion still", "$1 billion", "Impossible to know"], correctAnswer: 0, explanation: "Cap moves with price (share count unchanged) - double the price, double the company's market value." },
      { id: "stocks-4-q6", question: "Investors track market cap mainly to…", options: ["Judge size, risk profile, and index fit", "Predict tomorrow's exact share price", "Count a company's employees", "Measure customer satisfaction"], correctAnswer: 0, explanation: "Cap buckets (large/mid/small) shape risk expectations and determine which indexes a stock joins." },
    ],
  },
  // ── STOCKS-5: Dividends ──
  {
    lessonId: "stocks-5",
    questions: [
      { id: "stocks-5-q1", question: "A dividend is…", options: ["A cash share of profits paid to shareholders", "A fee charged for owning a stock", "The yearly change in a stock's price", "A loan from the company to you"], correctAnswer: 0, explanation: "Profitable companies can mail owners a slice of earnings - typically every quarter." },
      { id: "stocks-5-q2", question: "Dividend yield is calculated as…", options: ["Annual dividend divided by share price", "Share price divided by annual profit", "Total dividends since the company began", "The CEO's bonus as a percentage"], correctAnswer: 0, explanation: "$2 yearly dividend on a $50 stock = 4% yield - your cash income per dollar invested." },
      { id: "stocks-5-q3", question: "Fast-growing tech companies often pay NO dividend because…", options: ["They reinvest profits into more growth", "Paying dividends is illegal for tech", "They have no shareholders to pay", "Dividends require paper checks"], correctAnswer: 0, explanation: "Every dollar paid out is a dollar not funding expansion - growth firms let the share price do the rewarding." },
      { id: "stocks-5-q4", question: "Reinvesting dividends (DRIP) supercharges returns because…", options: ["Reinvested shares earn dividends too", "Brokers pay double for loyalty", "It locks the share price in place", "Taxes disappear on reinvested cash"], correctAnswer: 0, explanation: "Dividends buying shares that generate more dividends - compounding stacked on compounding." },
      { id: "stocks-5-q5", question: "A suspiciously high 15% dividend yield often signals…", options: ["A falling price or an unsustainable payout", "A guaranteed income opportunity", "Government backing of the dividend", "That the company just went public"], correctAnswer: 0, explanation: "Yield spikes when prices crash or payouts exceed earnings - chase yield blindly and catch a falling knife." },
      { id: "stocks-5-q6", question: "'Dividend aristocrats' are companies that have…", options: ["Raised dividends for 25+ consecutive years", "The single highest yield each year", "Never once paid any dividend", "Royal family members on the board"], correctAnswer: 0, explanation: "Decades of uninterrupted raises - a track record signaling durable, disciplined businesses." },
    ],
  },
  // ── STOCKS-6: Why Prices Move ──
  {
    lessonId: "stocks-6",
    questions: [
      { id: "stocks-6-q1", question: "Minute to minute, a stock's price is set by…", options: ["Supply and demand between buyers and sellers", "The company's CEO each morning", "A government pricing committee", "The stock exchange's computers randomly"], correctAnswer: 0, explanation: "More eager buyers than sellers pushes price up; the reverse pushes it down. That's the whole auction." },
      { id: "stocks-6-q2", question: "A company beats earnings expectations. Its stock often…", options: ["Rises as investors update their outlook", "Falls because profits are now spent", "Freezes until the next quarter", "Splits automatically into two shares"], correctAnswer: 0, explanation: "Prices bake in EXPECTATIONS - beating them means the future looks better than priced, so buyers step in." },
      { id: "stocks-6-q3", question: "A stock can FALL after reporting record profits when…", options: ["Investors expected even bigger results", "Profits always cause price drops", "Exchanges penalize success", "Accountants round numbers down"], correctAnswer: 0, explanation: "Great-but-below-expectations disappoints the price already paid - expectations are the real benchmark." },
      { id: "stocks-6-q4", question: "Which is a company-SPECIFIC price driver?", options: ["A recall of the company's main product", "A change in national interest rates", "A rise in overall unemployment", "A new tax on all imports"], correctAnswer: 0, explanation: "News about the business itself - products, lawsuits, leadership - moves that stock alone; macro news moves everything." },
      { id: "stocks-6-q5", question: "Rising interest rates often pressure stock prices because…", options: ["Safer bonds become rival competition", "Companies stop selling products", "Exchanges shorten trading hours", "Investors forget about stocks"], correctAnswer: 0, explanation: "When 'safe' yields rise, risky stocks must offer better value to compete - prices adjust downward." },
      { id: "stocks-6-q6", question: "Short-term price moves versus long-term moves are driven by…", options: ["Sentiment short-term; business results long-term", "Fundamentals short-term; luck long-term", "Both purely by government policy", "Neither - prices are pre-scheduled"], correctAnswer: 0, explanation: "Day-to-day is mood and news flow; over years, earnings growth does the heavy lifting. Invest for the second." },
    ],
  },
  // ── STOCKS-8: Order Types ──
  {
    lessonId: "stocks-8",
    questions: [
      { id: "stocks-8-q1", question: "A market order tells your broker…", options: ["Trade now at the best available price", "Wait for your exact target price", "Cancel all your other open orders", "Trade only after markets close"], correctAnswer: 0, explanation: "Speed over precision - you'll get filled fast, at whatever the market currently offers." },
      { id: "stocks-8-q2", question: "A limit order lets you…", options: ["Set the exact worst price you'll accept", "Trade unlimited shares without cash", "Skip all brokerage fees", "Freeze a stock's price for a day"], correctAnswer: 0, explanation: "Buy limit $50 = pay $50 or less, or nothing happens. Precision over speed." },
      { id: "stocks-8-q3", question: "The risk of a market order on a thinly traded stock is…", options: ["Filling at a much worse price", "The order being illegal to place", "Waiting weeks for any execution", "Owing extra tax on the trade"], correctAnswer: 0, explanation: "With few shares available, 'best available price' can be ugly - limit orders protect you in thin markets." },
      { id: "stocks-8-q4", question: "A stop-loss order is designed to…", options: ["Sell automatically at your trigger price", "Buy more shares every time price drops", "Prevent your broker from charging fees", "Stop dividends from being paid"], correctAnswer: 0, explanation: "Set a stop at $45 on a $50 stock and a slide triggers an automatic exit - capping the damage." },
      { id: "stocks-8-q5", question: "The trade-off with stop-losses is…", options: ["A quick dip can eject you pre-rebound", "They never actually execute", "They cost half your position value", "They lock you in for ten years"], correctAnswer: 0, explanation: "Volatile stocks whipsaw - a momentary dip can eject you right before recovery. Placement matters." },
      { id: "stocks-8-q6", question: "For a patient long-term buyer, the usual best default is…", options: ["A limit order at a price you're happy with", "A market order at 9:30 sharp daily", "Fifty stop orders stacked together", "Whatever order type is trending"], correctAnswer: 0, explanation: "You control cost, and if it doesn't fill today, there's always tomorrow - patience is the retail investor's edge." },
    ],
  },
  // ── STOCKS-9: Volatility ──
  {
    lessonId: "stocks-9",
    questions: [
      { id: "stocks-9-q1", question: "Volatility measures…", options: ["How much and how fast a price swings", "How profitable a company is", "How many people own the stock", "How long a company has existed"], correctAnswer: 0, explanation: "Big, rapid moves in either direction = high volatility. It's about the ride, not the direction." },
      { id: "stocks-9-q2", question: "High volatility means an investment is…", options: ["Riskier short-term, not automatically bad", "Guaranteed to lose you money", "Guaranteed to gain more than average", "Broken and untradeable"], correctAnswer: 0, explanation: "Volatility is the price of admission for higher potential returns - dangerous only when your timeline is short." },
      { id: "stocks-9-q3", question: "Which typically shows the LOWEST volatility?", options: ["A broad index fund of 500 companies", "A single small biotech startup", "A meme stock trending on social media", "A cryptocurrency launched last month"], correctAnswer: 0, explanation: "Hundreds of businesses moving differently average into a smoother line than any single lottery-ticket stock." },
      { id: "stocks-9-q4", question: "A stock 'down 30% from its high' while the business is healthy may represent…", options: ["A potential buy for patient buyers", "Proof the company is bankrupt", "A legal requirement to sell", "An error in the stock exchange"], correctAnswer: 0, explanation: "Volatility regularly marks quality companies down - that's when patient investors go shopping." },
      { id: "stocks-9-q5", question: "The biggest danger volatility poses to ordinary investors is…", options: ["Panic-selling at the bottom of a swing", "The swings themselves taking money", "Brokers closing during big moves", "Prices becoming permanently stuck"], correctAnswer: 0, explanation: "Paper losses only become real when you sell - volatility's main casualty is investor behavior, not portfolios." },
      { id: "stocks-9-q6", question: "The VIX index is nicknamed the…", options: ["Fear gauge - expected market volatility", "Profit meter for tech stocks", "Dividend calendar for the year", "List of banned traders"], correctAnswer: 0, explanation: "The VIX tracks expected S&P 500 volatility - spiking when investors brace for turbulence." },
    ],
  },
  // ── STOCKS-10: Reading a Stock Page ──
  {
    lessonId: "stocks-10",
    questions: [
      { id: "stocks-10-q1", question: "The 'bid' and 'ask' prices represent…", options: ["What buyers offer and sellers demand", "Yesterday's high and low prices", "The yearly dividend and its tax", "The CEO's and CFO's salary"], correctAnswer: 0, explanation: "Bid = highest current buyer, ask = lowest current seller - trades happen when they meet." },
      { id: "stocks-10-q2", question: "The '52-week range' tells you…", options: ["The stock's highest and lowest price this year", "How many weeks the company operated", "The average employee's work schedule", "When dividends will be paid"], correctAnswer: 0, explanation: "Where today's price sits inside its yearly range gives instant context - near highs, near lows, or midstream." },
      { id: "stocks-10-q3", question: "'Volume' on a stock page means…", options: ["Shares traded during the period", "How loud the trading floor is", "Total products the company shipped", "The thickness of the annual report"], correctAnswer: 0, explanation: "Heavy volume = lots of conviction behind a move; feather-light volume = don't read too much into it." },
      { id: "stocks-10-q4", question: "The P/E ratio shown on the page compares…", options: ["Price to the company's per-share earnings", "Price to the number of employees", "Profits to executive pay", "Purchases to expenses monthly"], correctAnswer: 0, explanation: "P/E ≈ years of current earnings you're paying for - a quick gauge of how expensive expectations are." },
      { id: "stocks-10-q5", question: "'After-hours price' differs from the close because…", options: ["Trading continues thinly after the market closes", "The exchange edits prices overnight", "It reflects tomorrow's guaranteed open", "Printers need time to update"], correctAnswer: 0, explanation: "Extended-hours sessions react to late news with low volume - moves can be sharp and misleading." },
      { id: "stocks-10-q6", question: "A red daily change number simply means…", options: ["The price is below yesterday's close", "The company lost money this year", "The stock is being delisted", "Selling it is currently prohibited"], correctAnswer: 0, explanation: "Red/green is just today vs yesterday - one day's color says nothing about the business or the long term." },
    ],
  },
]
