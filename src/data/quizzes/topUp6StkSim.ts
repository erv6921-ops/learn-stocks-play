import { QuizQuestion } from "@/types"

export const topUp6StkSim: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "stocks-4",
    questions: [
      { id: "stocks-4-tu1", question: "A company trades at $10 with 500 million shares outstanding. Its market cap is…", options: ["$5 billion", "$500 million", "$10 billion", "$50 million"], correctAnswer: 0, explanation: "Market cap = share price times shares outstanding, so $10 times 500 million equals $5 billion." },
      { id: "stocks-4-tu2", question: "Compared to large-caps, small-cap stocks are generally…", options: ["Steadier and slower to grow", "More likely to pay guaranteed dividends", "Higher growth potential but higher risk", "Protected from downturns"], correctAnswer: 2, explanation: "Smaller companies have more room to multiply but less cushion when things go wrong." },
      { id: "stocks-4-tu3", question: "Two companies both trade at $80 per share. This tells you…", options: ["They earn identical profits", "Nothing about which is bigger", "They have the same share count", "The bigger one is safer"], correctAnswer: 1, explanation: "Price per share alone says nothing about size because share counts differ; only market cap measures size." },
      { id: "stocks-4-tu4", question: "A $10B+ 'large-cap' company is best described as…", options: ["A brand-new startup with huge upside", "A firm worth under $50 million", "A company that only sells services", "An established giant, steadier but slower-growing"], correctAnswer: 3, explanation: "Large-caps are established titans, less likely to double quickly and less likely to vanish." },
    ],
  },
  {
    lessonId: "stocks-5",
    questions: [
      { id: "stocks-5-tu1", question: "A stock pays a $3 annual dividend and trades at $60. Its dividend yield is…", options: ["5%", "20%", "3%", "0.5%"], correctAnswer: 0, explanation: "Yield equals annual dividend divided by share price, so $3 divided by $60 equals 5%." },
      { id: "stocks-5-tu2", question: "A company that has raised its dividend for 25+ consecutive years is called a…", options: ["Growth reinvestor", "Dividend aristocrat", "Yield trap", "Small-cap leader"], correctAnswer: 1, explanation: "Dividend aristocrats have decades of uninterrupted raises, signaling durable, disciplined businesses." },
      { id: "stocks-5-tu3", question: "A DRIP boosts long-term returns because…", options: ["It eliminates all taxes on gains", "It freezes the share price in place", "Reinvested dividends buy shares that earn more dividends", "Brokers pay a loyalty bonus"], correctAnswer: 2, explanation: "Reinvested dividends buy shares that generate further dividends, stacking compounding on compounding." },
      { id: "stocks-5-tu4", question: "A fast-growing tech company that pays no dividend most likely…", options: ["Reinvests profits into more growth", "Is legally barred from paying", "Has no shareholders", "Cannot print paper checks"], correctAnswer: 0, explanation: "Growth firms keep profits to fund expansion and let the rising share price reward owners instead." },
    ],
  },
  {
    lessonId: "stocks-6",
    questions: [
      { id: "stocks-6-tu1", question: "In the very short run, moment to moment, a stock's price is set by…", options: ["A government pricing committee", "The company's quarterly earnings", "Supply and demand between buyers and sellers", "Random exchange computers"], correctAnswer: 2, explanation: "More eager buyers than sellers pushes price up and the reverse pushes it down, the whole auction." },
      { id: "stocks-6-tu2", question: "Which of these is a MACRO price driver that moves nearly all stocks at once?", options: ["A recall of one firm's product", "A rise in national interest rates", "A single company's lawsuit", "One CEO resigning"], correctAnswer: 1, explanation: "Interest-rate changes are economy-wide news that move everything, unlike company-specific events." },
      { id: "stocks-6-tu3", question: "A company reports record profits but its stock falls. The likely reason is…", options: ["Exchanges penalize success", "Profits always cause drops", "Investors had expected even bigger results", "Accountants rounded down"], correctAnswer: 2, explanation: "Prices bake in expectations, so great-but-below-expectations results disappoint the price already paid." },
      { id: "stocks-6-tu4", question: "Over many years, the main driver of a stock's price is…", options: ["Daily investor sentiment", "News headlines each morning", "Government scheduling", "The company's business results and earnings growth"], correctAnswer: 3, explanation: "Short-term moves are mood and news, but over years earnings growth does the heavy lifting." },
    ],
  },
  {
    lessonId: "stocks-8",
    questions: [
      { id: "stocks-8-tu1", question: "You place a buy limit order at $30. You will…", options: ["Pay $30 or less, or nothing happens", "Always buy at the market price", "Pay whatever the stock hits next", "Be forced to buy above $30"], correctAnswer: 0, explanation: "A buy limit sets the worst price you will accept, filling at $30 or better or not at all." },
      { id: "stocks-8-tu2", question: "Placing a market order on a thinly traded stock risks…", options: ["The order being illegal", "Waiting weeks to execute", "Filling at a much worse price", "Extra taxes owed"], correctAnswer: 2, explanation: "With few shares available, the best available price can be ugly, so limit orders protect you in thin markets." },
      { id: "stocks-8-tu3", question: "You own a $60 stock and set a stop-loss at $54. It is designed to…", options: ["Buy more shares as the price drops", "Freeze the price at $60", "Stop dividends from being paid", "Sell automatically if the price falls to $54"], correctAnswer: 3, explanation: "A stop-loss triggers an automatic exit at your trigger price, capping the damage from a slide." },
      { id: "stocks-8-tu4", question: "A market order prioritizes…", options: ["Speed of execution over price precision", "Precision over speed", "Skipping all brokerage fees", "Trading only after the close"], correctAnswer: 0, explanation: "A market order fills fast at whatever the market currently offers, trading precision for speed." },
    ],
  },
  {
    lessonId: "stocks-9",
    questions: [
      { id: "stocks-9-tu1", question: "In investing, 'volatility' refers to…", options: ["How much and how fast a price swings up and down", "How many shares a company has issued", "The dividend a stock pays each year", "A company's total debt load"], correctAnswer: 0, explanation: "Volatility describes the size and speed of price swings, high volatility means bigger, faster moves." },
      { id: "stocks-9-tu2", question: "High volatility mainly means an investment is…", options: ["Riskier short-term, not automatically bad", "Guaranteed to lose money", "Guaranteed to beat the average", "Broken and untradeable"], correctAnswer: 0, explanation: "Volatility is the price of admission for higher potential returns and is dangerous mainly on short timelines." },
      { id: "stocks-9-tu3", question: "A sharp spike in the VIX usually signals that investors are…", options: ["Calm and expecting steady prices", "Fearful and bracing for big swings", "Guaranteed to earn a profit", "Legally required to sell"], correctAnswer: 1, explanation: "The VIX (the 'fear gauge') rises when investors expect turbulence, so a spike signals rising fear." },
      { id: "stocks-9-tu4", question: "Which investment would you expect to show the HIGHEST volatility?", options: ["A broad 500-company index fund", "A diversified bond fund", "A basket of large-cap staples", "A single meme stock trending online"], correctAnswer: 3, explanation: "A single lottery-ticket stock swings far more than a diversified basket that averages into a smoother line." },
    ],
  },
  {
    lessonId: "stocks-10",
    questions: [
      { id: "stocks-10-tu1", question: "On a stock page, the 'ask' price is…", options: ["The lowest price a seller will accept", "The highest price a buyer offers", "Yesterday's closing price", "The annual dividend"], correctAnswer: 0, explanation: "The ask is the lowest current seller's price and the bid is the highest buyer's; trades happen when they meet." },
      { id: "stocks-10-tu2", question: "Unusually heavy trading volume on a move suggests…", options: ["The trading floor is loud", "Strong conviction behind the move", "The company shipped more products", "A thicker annual report"], correctAnswer: 1, explanation: "Heavy volume signals lots of conviction behind a move, while light volume means read little into it." },
      { id: "stocks-10-tu3", question: "A P/E ratio of about 20 roughly means you are paying…", options: ["20 years of the company's revenue", "20% of the share price in fees", "20 dollars per employee", "About 20 years of current earnings"], correctAnswer: 3, explanation: "P/E approximates the years of current earnings you are paying for, a quick gauge of how expensive expectations are." },
      { id: "stocks-10-tu4", question: "A stock's daily change number showing red means…", options: ["The price is below yesterday's close", "The company lost money this year", "The stock is being delisted", "Selling is prohibited"], correctAnswer: 0, explanation: "Red versus green is just today versus yesterday and says nothing about the business or the long term." },
    ],
  },
  {
    lessonId: "sim-1",
    questions: [
      { id: "sim-1-tu1", question: "A market is officially in 'bear' territory once it falls…", options: ["5% in a week", "20% or more from recent highs", "50% in one session", "Any red day"], correctAnswer: 1, explanation: "A decline of 20% or more from recent highs marks a bear market, and every US bear so far has ended." },
      { id: "sim-1-tu2", question: "An emergency fund helps in a bear market because it…", options: ["Prevents forced selling at the lows", "Earns more during declines", "Predicts when bears begin", "Doubles your investing capital"], correctAnswer: 0, explanation: "Cash for surprises means your portfolio never becomes the ATM at the worst possible moment." },
      { id: "sim-1-tu3", question: "Continuing scheduled investing during a bear market lets you…", options: ["Violate broker rules", "Guarantee further losses", "Buy more shares per dollar at low prices", "Predict the exact bottom"], correctAnswer: 2, explanation: "Bear markets are accumulation season, and shares bought in the gloom drive outsized gains in the recovery." },
      { id: "sim-1-tu4", question: "Missing just the recovery's best days by selling in fear tends to…", options: ["Devastate long-term returns", "Barely affect outcomes", "Help most investors", "Only matter for professionals"], correctAnswer: 0, explanation: "The market's best days cluster inside its worst stretches, so exiting during fear usually means missing the rebounds." },
    ],
  },
  {
    lessonId: "sim-2",
    questions: [
      { id: "sim-2-tu1", question: "A bull market is best described as…", options: ["Falling prices and fear", "Years of no movement", "Sustained rising prices and optimism", "Trading livestock"], correctAnswer: 2, explanation: "Bulls are periods of rising prices and rising confidence, and they historically run far longer than bears." },
      { id: "sim-2-tu2", question: "Rebalancing during a strong bull run means…", options: ["Trimming winners back to your target mix", "Selling everything at the top", "Doubling down on the hottest sector", "Halting all contributions"], correctAnswer: 0, explanation: "When stocks balloon past your target weight, trimming locks gains and restores the plan you chose." },
      { id: "sim-2-tu3", question: "The saying 'everyone's a genius in a bull market' warns that…", options: ["Intelligence rises with prices", "Bull markets create real geniuses", "Rising tides briefly lift bad decisions", "Skill is easy to measure in booms"], correctAnswer: 2, explanation: "When everything goes up, recklessness looks like brilliance until the tide goes out." },
      { id: "sim-2-tu4", question: "The sneaky danger inside a long bull market is…", options: ["Too much fear of buying", "Overconfidence and abandoning discipline", "Saving too large a share", "Over-diversifying"], correctAnswer: 1, explanation: "Years of gains convince people they are geniuses, and leverage and speculation creep in right before the turn." },
    ],
  },
  {
    lessonId: "sim-3",
    questions: [
      { id: "sim-3-tu1", question: "The economy's 'sectors' are broad industry groups such as…", options: ["Technology, healthcare, energy, and financials", "Small, medium, and large fonts", "Red, blue, and green stocks", "Monday, Tuesday, and Wednesday shares"], correctAnswer: 0, explanation: "Sectors group companies by industry (tech, healthcare, energy, financials), which is how rotation strategies view the market." },
      { id: "sim-3-tu2", question: "In early recessions, money historically rotates INTO…", options: ["Defensives like utilities and staples", "Speculative startups", "Leveraged homebuilders", "Cruise and vacation firms"], correctAnswer: 0, explanation: "Toothpaste and electricity get bought in any economy, so defensives are where money hides in storms." },
      { id: "sim-3-tu3", question: "The main catch with sector rotation strategies is that…", options: ["Sectors cannot legally be traded", "They work only in textbooks", "Timing cycle phases is notoriously hard", "Cycles announce themselves clearly"], correctAnswer: 2, explanation: "Cycle phases are obvious only in hindsight, so mistimed rotation easily underperforms owning everything." },
      { id: "sim-3-tu4", question: "Rising interest rates traditionally hit which sector hardest?", options: ["Discount grocery retailers", "Electric utility monopolies", "Lending-spread banks", "Growth tech valued on far-future profits"], correctAnswer: 3, explanation: "Distant earnings discount hardest when rates climb, which is why growth tech gets hammered." },
    ],
  },
  {
    lessonId: "sim-4",
    questions: [
      { id: "sim-4-tu1", question: "When shocking news hits markets, the first smart move is to…", options: ["Pause and make no decisions inside the panic", "Sell everything within minutes", "Borrow to trade the swings", "Refresh prices every ten seconds"], correctAnswer: 0, explanation: "The worst trades are made in the first hours of fear, so a deliberate delay is a professional discipline." },
      { id: "sim-4-tu2", question: "Historically, markets have responded to wars and disasters by…", options: ["Never recovering prior levels", "Falling hard, then recovering later", "Ignoring the events entirely", "Closing permanently"], correctAnswer: 1, explanation: "From Pearl Harbor to 9/11 to COVID, markets dropped sharply then recovered as uncertainty resolved." },
      { id: "sim-4-tu3", question: "Checking your portfolio every hour during a crisis mostly produces…", options: ["Better returns through vigilance", "Useful new information", "Stress and pressure to act badly", "Calmer long-term thinking"], correctAnswer: 2, explanation: "Loss-aversion makes each red refresh scream 'do something,' and 'something' in a panic is usually selling low." },
      { id: "sim-4-tu4", question: "Why does having a written crisis plan beat improvising during a crash?", options: ["Because decisions made in panic are usually worse than a calm plan", "Because it guarantees you will make money", "Because it lets you predict the exact bottom", "Because it removes all risk from investing"], correctAnswer: 0, explanation: "A plan made calmly in advance prevents fear-driven mistakes, panic decisions during a crash are usually bad ones." },
    ],
  },
  {
    lessonId: "sim-5",
    questions: [
      { id: "sim-5-tu1", question: "Under the 4% rule, retiring on $60,000 per year requires roughly…", options: ["$600,000 saved", "$1.5 million saved", "$6 million saved", "$60,000 saved"], correctAnswer: 1, explanation: "Desired income times 25 gives the target, and $60,000 times 25 equals $1.5 million." },
      { id: "sim-5-tu2", question: "The 4% rule is a guideline that says retirees can safely…", options: ["Withdraw about 4% of savings the first year, then adjust for inflation", "Spend their entire savings within 4 years", "Count on earning a guaranteed 4% return every year", "Pay only 4% of their income in taxes"], correctAnswer: 0, explanation: "The 4% rule suggests starting withdrawals near 4% of savings so the money is likely to last about 30 years." },
      { id: "sim-5-tu3", question: "Cutting withdrawals in bad years (flexible spending) tends to…", options: ["Make no measurable difference", "Violate the 4% study rules", "Dramatically improve the odds the money lasts", "Help only in bull markets"], correctAnswer: 2, explanation: "Skipping inflation raises or trimming during crashes rescues borderline plans, making flexibility a superpower." },
      { id: "sim-5-tu4", question: "Retirees keep some stocks even at age 70 because…", options: ["Rules require stock ownership", "Bonds become illegal after 65", "Stocks stop being risky with age", "Long retirements still need growth to outpace inflation"], correctAnswer: 3, explanation: "Going all-cash at 65 nearly guarantees running short by 90, since inflation stalks retirees and growth guards them." },
    ],
  },
  {
    lessonId: "sim-6",
    questions: [
      { id: "sim-6-tu1", question: "The core idea of a balanced portfolio is that…", options: ["No single failure can wreck the plan", "Every holding moves identically", "Returns are guaranteed", "Only winners are owned"], correctAnswer: 0, explanation: "Blending stocks, bonds, and cash weights risk against goals and is built to survive surprises." },
      { id: "sim-6-tu2", question: "Adding international stocks alongside US stocks provides…", options: ["Automatic currency losses", "A hedge against single-country risk", "Double taxation on gains", "Nothing, since markets move as one"], correctAnswer: 1, explanation: "There are long stretches where foreign markets led and the US lagged, so geography is another basket worth splitting." },
      { id: "sim-6-tu3", question: "The right stock/bond split for a given person depends mostly on…", options: ["Their favorite company's logo", "This morning's market direction", "Their timeline and tolerance for drops", "What worked for their grandparents"], correctAnswer: 2, explanation: "Allocation is personal engineering: years until the money is needed times your honest panic threshold." },
      { id: "sim-6-tu4", question: "Once a good portfolio is built, its best ongoing maintenance is…", options: ["Daily trades to stay optimal", "Complete rebuilds each quarter", "Constant reaction to headlines", "Steady deposits and yearly rebalancing"], correctAnswer: 3, explanation: "The best maintenance is boring: automate deposits, rebalance yearly, and ignore the noise." },
    ],
  },
]
