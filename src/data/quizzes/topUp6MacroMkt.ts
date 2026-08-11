// Teaching-aligned top-up questions extending 6-question pools to ~10.
import { QuizQuestion } from "@/types"

export const topUp6MacroMkt: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "macro-1",
    questions: [
      { id: "macro-1-tu1", question: "A country where wheelbarrows of cash are needed to buy bread is experiencing…", options: ["Hyperinflation from unchecked money printing", "A healthy 2% inflation target", "Cost-push inflation from oil prices", "Demand-pull inflation from stimulus"], correctAnswer: 0, explanation: "Like 1920s Germany, hyperinflation destroys savings and society's trust in the currency itself." },
      { id: "macro-1-tu2", question: "When a jump in oil or labor costs forces producers to raise prices even without booming demand, that is…", options: ["Demand-pull inflation", "Cost-push inflation", "Deflation", "Hyperinflation"], correctAnswer: 1, explanation: "Rising input costs get passed along to buyers, pushing prices up from the supply side." },
      { id: "macro-1-tu3", question: "Central banks aim for roughly 2% inflation rather than 0% because…", options: ["Deflation makes people hoard cash and delay purchases", "Zero inflation doubles savings accounts", "Governments profit from the difference", "Higher targets always grow the economy faster"], correctAnswer: 0, explanation: "Mild, predictable inflation encourages spending, while deflation freezes activity and kills growth." },
      { id: "macro-1-tu4", question: "The 2021-22 mix of stimulus checks and supply shortages was a textbook case of…", options: ["A clearance sale", "Cost-push inflation", "Deflation", "Demand-pull inflation"], correctAnswer: 3, explanation: "Too much money chased too few goods, with eager buyers bidding up limited supply." },
    ],
  },
  {
    lessonId: "macro-2",
    questions: [
      { id: "macro-2-tu1", question: "The agency that tracks thousands of prices to build the CPI basket is the…", options: ["BLS (Bureau of Labor Statistics)", "SEC", "Federal Reserve", "Social Security Administration"], correctAnswer: 0, explanation: "The BLS rolls food, rent, gas, and healthcare prices into one inflation yardstick." },
      { id: "macro-2-tu2", question: "A renting college student may feel higher inflation than the CPI headline because…", options: ["The BLS tracks them individually", "Their spending mix differs from the average consumer's", "CPI applies only to businesses", "Personal prices are set by the government"], correctAnswer: 1, explanation: "Rent and food spikes hit renters harder than the imagined average urban consumer." },
      { id: "macro-2-tu3", question: "Core CPI removes food and energy mainly to…", options: ["Reveal the steadier underlying inflation trend", "Prove nobody buys food or energy", "Show prices that never change", "Hide numbers the government cannot measure"], correctAnswer: 0, explanation: "Oil shocks and crop failures swing monthly, so stripping them shows the calmer current." },
      { id: "macro-2-tu4", question: "A monthly CPI release can move stocks and bonds within minutes because the data drives…", options: ["Election year winners", "Corporate logo redesigns", "The Fed's interest rate decisions", "Public holiday schedules"], correctAnswer: 2, explanation: "Hot CPI raises expected rate hikes, and markets reprice almost instantly." },
    ],
  },
  {
    lessonId: "macro-3",
    questions: [
      { id: "macro-3-tu1", question: "The Fed's two official goals, stable prices and maximum employment, are called its…", options: ["Dual mandate", "Lender of last resort", "Federal funds rate", "Independence clause"], correctAnswer: 0, explanation: "The dual mandate asks the Fed to tame inflation while keeping people working, goals that often conflict." },
      { id: "macro-3-tu2", question: "When panicked depositors demand cash all at once, the Fed acts as…", options: ["A tax collector", "A stock exchange", "A personal lender to citizens", "Lender of last resort to solvent banks"], correctAnswer: 3, explanation: "Lending against good collateral stops bank runs from becoming full collapses." },
      { id: "macro-3-tu3", question: "The Fed is kept independent from politics primarily so it can…", options: ["Make unpopular but economically sound decisions", "Campaign for candidates it prefers", "Avoid explaining its choices", "Maximize government revenue"], correctAnswer: 0, explanation: "Raising rates to fight inflation is painful and vote-losing, so insulation lets the Fed act anyway." },
      { id: "macro-3-tu4", question: "The overnight rate that ripples out to mortgages, car loans, and credit cards is the…", options: ["Consumer Price Index", "Federal funds rate", "Bond duration", "Face value"], correctAnswer: 1, explanation: "The federal funds rate is the Fed's most famous tool, and it shapes the cost of borrowing everywhere." },
    ],
  },
  {
    lessonId: "macro-4",
    questions: [
      { id: "macro-4-tu1", question: "Congress taxing and spending to steer the economy is called…", options: ["Fiscal policy", "Monetary policy", "Quantitative easing", "Tight policy"], correctAnswer: 0, explanation: "Fiscal policy is Congress's toolkit, distinct from the Fed's monetary policy." },
      { id: "macro-4-tu2", question: "When short-term rates are already near zero, the Fed can still inject money by…", options: ["Mailing paper checks to every single household", "Buying bonds to push down long-term rates (QE)", "Sharply raising income taxes on the wealthy", "Minting a single trillion-dollar platinum coin"], correctAnswer: 1, explanation: "Quantitative easing purchases bonds to suppress long-term borrowing costs, as in 2008 and 2020." },
      { id: "macro-4-tu3", question: "Because policy works with a lag, a rate hike today mainly slows…", options: ["Hiring and activity many months later", "Every price instantly today", "Only foreign economies", "Nothing at all"], correctAnswer: 0, explanation: "The Fed steers a ship, not a go-kart, which is why overshoots happen." },
      { id: "macro-4-tu4", question: "Cutting rates to encourage borrowing, hiring, and investment is described as…", options: ["Tight or contractionary policy", "Fiscal policy", "Loose or expansionary policy", "A soft landing"], correctAnswer: 2, explanation: "Cheap money is the gas pedal for a sluggish economy." },
    ],
  },
  {
    lessonId: "macro-5",
    questions: [
      { id: "macro-5-tu1", question: "A savings account paying 4-5% typically appears when…", options: ["The Fed has pushed interest rates up", "The Fed has cut rates to zero", "Banks stop accepting deposits", "Inflation has been eliminated"], correctAnswer: 0, explanation: "Higher rates are the silver lining for savers, boosting yields on savings and CDs." },
      { id: "macro-5-tu2", question: "On Fed decision day the widely expected move often causes little reaction because…", options: ["The Fed leaks decisions illegally", "Traders already priced it in beforehand", "Exchanges close during meetings", "Rates change at random"], correctAnswer: 1, explanation: "Surprises relative to expectations, not the expected move itself, cause the fireworks." },
      { id: "macro-5-tu3", question: "Rate cuts tend to lift stock prices partly because weaker bond yields…", options: ["Force companies to expand by law", "Directly buy shares", "Make investors fear the cuts", "Push savers toward stocks instead"], correctAnswer: 3, explanation: "Lower discount rates raise valuations, cheap debt fuels growth, and 2% bonds nudge savers into stocks." },
      { id: "macro-5-tu4", question: "A teen saving for a car in a high-rate period should remember that…", options: ["Savings earn more, but loans also cost more", "Neither their savings nor their loans are affected", "The bank essentially gives the cars away", "Only home mortgages change in price"], correctAnswer: 0, explanation: "Rates cut both ways, so factor in both the faster-growing fund and the pricier financing." },
    ],
  },
  {
    lessonId: "macro-6",
    questions: [
      { id: "macro-6-tu1", question: "Utilities, groceries, and healthcare hold up better in downturns because…", options: ["People need food, power, and medicine regardless", "They are legally exempt from recessions", "Their stocks are frozen in crises", "They advertise more aggressively"], correctAnswer: 0, explanation: "These defensive sectors sell essentials that survive any budget cut." },
      { id: "macro-6-tu2", question: "Airlines, luxury goods, and homebuilders are examples of…", options: ["Defensive stocks immune to conditions", "Cyclical stocks that swing with the economy", "Bonds in disguise", "Seasonal-only trading stocks"], correctAnswer: 1, explanation: "Their products are first skipped in bad times and first splurged on in good times." },
      { id: "macro-6-tu3", question: "Since macro conditions are hard to predict, most long-term investors should…", options: ["Diversify and stay invested through cycles", "Trade aggressively on each GDP report", "Hold only one favorite sector", "Sell at the first bad headline"], correctAnswer: 0, explanation: "Even economists misforecast constantly, so a broad mix held through cycles beats guessing." },
      { id: "macro-6-tu4", question: "During high inflation, companies without pricing power tend to see…", options: ["Automatically higher profit margins", "Cheaper raw materials everywhere", "Margins compress as costs they cannot pass on rise", "Customers with extra money to burn"], correctAnswer: 2, explanation: "Wages, materials, and freight all cost more, squeezing firms that cannot raise prices enough." },
    ],
  },
  {
    lessonId: "macro-7",
    questions: [
      { id: "macro-7-tu1", question: "A measure of how much a bond's price moves when rates change is called…", options: ["Duration", "Face value", "The coupon", "The spread"], correctAnswer: 0, explanation: "Longer duration means bigger price swings, so a 30-year bond reacts far more than a 2-year." },
      { id: "macro-7-tu2", question: "Held to maturity, a quality bond's interim price swings…", options: ["Cancel the final payment", "Do not change the promised coupons and face value", "Double the interest income", "Convert the bond into stock"], correctAnswer: 1, explanation: "Price wiggles only matter if you sell early, otherwise you collect what was promised." },
      { id: "macro-7-tu3", question: "If market interest rates jump from 3% to 6%, a bond already issued at 3% will most likely…", options: ["Fall in price, since new bonds now pay more", "Rise in price, since old bonds become rare", "Stay at exactly the same price", "Double in value automatically"], correctAnswer: 0, explanation: "Buyers only take an older, lower-rate bond at a discount once new bonds pay more, so its price falls." },
      { id: "macro-7-tu4", question: "Investors keep bonds alongside stocks mainly because bonds offer…", options: ["Higher long-term returns than stocks", "Complete immunity from all losses", "Free conversion into gold", "Steadier income and smaller swings than stocks"], correctAnswer: 3, explanation: "Predictable coupons and lower volatility make bonds the portfolio's shock absorber." },
    ],
  },
  {
    lessonId: "market-6",
    questions: [
      { id: "market-6-tu1", question: "Regular US market hours run from…", options: ["9:30am to 4:00pm Eastern on weekdays", "24 hours a day, every day", "Noon to midnight on weekends", "6:00am to 6:00pm local time"], correctAnswer: 0, explanation: "The NYSE and Nasdaq trade 9:30-4:00 ET, and anything outside that is extended hours." },
      { id: "market-6-tu2", question: "The defining trait of after-hours trading is…", options: ["Higher volume than the regular day", "Thin volume with wider price swings", "Government-set fixed prices", "Free trades for everyone"], correctAnswer: 1, explanation: "With few participants, small trades move prices a lot and spreads widen." },
      { id: "market-6-tu3", question: "If you must trade during extended hours, the professional's safeguard is a…", options: ["Market order for maximum speed", "Faxed handwritten order", "Limit order to control the fill price", "Phone call to the CEO"], correctAnswer: 2, explanation: "In thin markets a limit order is your seatbelt, since a market order can fill far from the last price." },
      { id: "market-6-tu4", question: "Companies often release earnings at 4:05pm rather than mid-session because it…", options: ["Gives the market overnight to digest the news", "Lets the night-shift printers finish running", "Hides the bad results from everyone watching", "Costs the company less at the exchange"], correctAnswer: 0, explanation: "Releasing after the close avoids triggering mid-session chaos and lets investors process the news." },
    ],
  },
  {
    lessonId: "market-7",
    questions: [
      { id: "market-7-tu1", question: "A market-wide circuit breaker's Level 1 halt trips when the S&P 500 falls…", options: ["7% in one session", "1% in one session", "25% in one session", "50% in one session"], correctAnswer: 0, explanation: "Level 1 is 7% for a 15-minute halt, Level 2 is 13%, and Level 3 at 20% ends the trading day." },
      { id: "market-7-tu2", question: "Automatic market-wide circuit breakers were built after…", options: ["The invention of the telephone", "The 1987 Black Monday crash", "The 2021 meme-stock rally", "The first Super Bowl"], correctAnswer: 1, explanation: "After stocks fell 22% in a single day in October 1987, regulators added automatic brakes." },
      { id: "market-7-tu3", question: "The core purpose of pausing trading during a crash is to…", options: ["Let exchanges repair broken computers", "Protect only the largest investors", "Give investors time to think instead of panic", "Let the government set prices"], correctAnswer: 2, explanation: "Halts interrupt cascading fear so decisions come from brains, not adrenaline." },
      { id: "market-7-tu4", question: "An individual stock that moves too far too fast is paused by…", options: ["A personal timeout penalty", "Dividend suspension rules", "A weekend trading ban", "Limit up / limit down halts"], correctAnswer: 3, explanation: "The same cooling-off logic applies stock by stock through limit up / limit down halts." },
    ],
  },
  {
    lessonId: "market-8",
    questions: [
      { id: "market-8-tu1", question: "Insider trading is illegal chiefly because it…", options: ["Rigs the game against everyone else", "Creates too much paperwork", "Makes prices too stable", "Slows down the exchanges"], correctAnswer: 0, explanation: "Markets need trust that no one trades with an unfair information edge, or regular people stay away." },
      { id: "market-8-tu2", question: "An executive can legally sell shares of their own company by…", options: ["Selling fast before bad news drops", "Using a pre-scheduled 10b5-1 plan with public disclosure", "Using a relative's account", "Trading only on weekends"], correctAnswer: 1, explanation: "Pre-scheduled plans and public filings make insider sales transparent and legal." },
      { id: "market-8-tu3", question: "Penalties for illegal insider trading can include…", options: ["A warning letter at most", "Losing internet access", "Massive fines and years in prison", "Nothing if profits were small"], correctAnswer: 2, explanation: "The SEC and DOJ pursue it hard, and people have lost careers, fortunes, and freedom over tips." },
      { id: "market-8-tu4", question: "A stranger online offering guaranteed info about an upcoming announcement should be…", options: ["Acted on fast before others see it", "Paid for more details", "Shared with your group chat", "Ignored, since it is either fake or a crime"], correctAnswer: 3, explanation: "Either it is a scam or acting on it is illegal insider trading, so walk away." },
    ],
  },
  {
    lessonId: "market-9",
    questions: [
      { id: "market-9-tu1", question: "The free, searchable database where anyone can read company filings is…", options: ["The SEC's EDGAR", "A broker's paid portal", "SEC headquarters only", "A sealed government archive"], correctAnswer: 0, explanation: "EDGAR offers every filing free online, the same raw documents professionals read." },
      { id: "market-9-tu2", question: "The SEC was created in 1934 mainly in response to…", options: ["The invention of the computer", "The 1929 crash and rampant market fraud", "A shortage of stockbrokers", "Complaints about slow mail"], correctAnswer: 1, explanation: "After the crash exposed manipulation and lies, Congress built a referee to restore trust." },
      { id: "market-9-tu3", question: "The audited annual report public companies must file is the…", options: ["EDGAR filing waiver", "10b5-1 plan", "10-K", "S&P 500 listing"], correctAnswer: 2, explanation: "Annual 10-Ks and quarterly 10-Qs put audited numbers in public view for informed investing." },
      { id: "market-9-tu4", question: "Requiring public companies to disclose their finances mainly helps investors by…", options: ["Letting them make decisions based on real information", "Guaranteeing every stock goes up", "Eliminating all investment risk", "Setting the price of each stock daily"], correctAnswer: 0, explanation: "Mandatory disclosure gives investors accurate information to judge a company, which is the core of what the SEC protects." },
    ],
  },
  {
    lessonId: "market-10",
    questions: [
      { id: "market-10-tu1", question: "The index covering about 80% of US market value and used as the default US benchmark is the…", options: ["S&P 500", "Dow Jones Industrial Average", "Nasdaq Composite", "A lottery-based index"], correctAnswer: 0, explanation: "The S&P 500 tracks about 500 of the largest US companies and stands in for the whole market." },
      { id: "market-10-tu2", question: "The unusual thing about the Dow Jones Industrial Average is that it…", options: ["Includes every US public company", "Holds just 30 stocks weighted by share price", "Updates only once a year", "Tracks bonds instead of stocks"], correctAnswer: 1, explanation: "Its 30 blue-chips are weighted by price, making it famous but less representative than the S&P." },
      { id: "market-10-tu3", question: "The Nasdaq Composite is best known for being…", options: ["Focused only on oil producers", "A bond-market thermometer", "Heavy on tech and growth companies", "Limited to foreign companies"], correctAnswer: 2, explanation: "Dominated by tech, it swings harder than broader indexes." },
      { id: "market-10-tu4", question: "Indexes matter to everyday investors because…", options: ["You must memorize them to open accounts", "They decide which stocks are legal", "They set the price of groceries", "Index funds let you own the whole basket cheaply"], correctAnswer: 3, explanation: "Index funds mirror these baskets at minimal cost, the backbone of most smart portfolios." },
    ],
  },
]
