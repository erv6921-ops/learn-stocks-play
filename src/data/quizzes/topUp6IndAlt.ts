import { QuizQuestion } from "@/types"

export const topUp6IndAlt: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "indicators-1",
    questions: [
      { id: "indicators-1-tu1", question: "If a country's GDP grew 4% nominally while inflation ran 4%, its real GDP growth was about…", options: ["8 percent combined", "0 percent - the gain was purely prices", "4 percent regardless of inflation", "Negative 4 percent"], correctAnswer: 1, explanation: "Real GDP strips out inflation, so 4% nominal minus 4% inflation leaves zero true growth." },
      { id: "indicators-1-tu2", question: "Because consumer spending is roughly two-thirds of US GDP, the American consumer is best described as…", options: ["A minor rounding error", "Irrelevant next to exports", "The economy's main engine", "Only important in wartime"], correctAnswer: 2, explanation: "With about 68% of GDP coming from people buying things, consumer spending drives the whole economy." },
      { id: "indicators-1-tu3", question: "To fairly compare average living standards between a huge country and a small one, you should use…", options: ["Raw total GDP", "Number of factories", "Total gold reserves", "GDP per capita"], correctAnswer: 3, explanation: "Dividing GDP by population reveals prosperity per person, so a small rich nation can outrank a large middling one." },
      { id: "indicators-1-tu4", question: "A mature economy suddenly posting 15% annual real GDP growth would most likely signal…", options: ["Overheating or unusual catch-up, not the normal cruising speed", "A healthy, sustainable long-run pace", "A measurement that removed inflation twice", "That the country stopped consumer spending"], correctAnswer: 0, explanation: "Mature economies typically cruise at 2-3% real growth, so numbers far above that usually signal overheating or catch-up." }
    ]
  },
  {
    lessonId: "indicators-2",
    questions: [
      { id: "indicators-2-tu1", question: "A retiree who is not looking for work is counted in the unemployment rate as…", options: ["Unemployed like anyone jobless", "Not counted - you must be actively job-hunting", "Employed by default", "Double-counted for accuracy"], correctAnswer: 1, explanation: "The headline rate only counts people who are jobless AND actively searching, so retirees are excluded." },
      { id: "indicators-2-tu2", question: "The official monthly report investors watch for jobs numbers is released on…", options: ["The last day of each quarter", "A random unscheduled date", "The first Friday of each month", "Only once per year in January"], correctAnswer: 2, explanation: "The nonfarm payrolls release lands the first Friday of each month, a major scheduled market-mover." },
      { id: "indicators-2-tu3", question: "When many discouraged workers stop searching for jobs, the headline unemployment rate tends to…", options: ["Rise sharply and overstate the pain", "Stay perfectly accurate", "Become mathematically impossible", "Fall, looking better than conditions actually feel"], correctAnswer: 3, explanation: "Leaving the labor force removes people from the calculation, so a falling rate can mask surrender rather than success." },
      { id: "indicators-2-tu4", question: "For a student entering the job market, a falling unemployment rate generally brings…", options: ["More openings and stronger negotiating power", "Fewer jobs and weaker offers", "Automatic pay cuts everywhere", "Hiring freezes across the board"], correctAnswer: 0, explanation: "Tight labor markets favor workers with more offers, faster raises, and easier job-hopping." }
    ]
  },
  {
    lessonId: "indicators-3",
    questions: [
      { id: "indicators-3-tu1", question: "Consumer confidence surveys are best understood as a gauge of…", options: ["The exact dollars families have banked", "How optimistic households feel about jobs and finances", "The build quality of consumer goods", "How clean local stores are"], correctAnswer: 1, explanation: "The surveys measure mood about job prospects and finances, the feeling that precedes the spending." },
      { id: "indicators-3-tu2", question: "A sudden, sharp DROP in consumer confidence most often foreshadows…", options: ["An immediate stock market boom", "Falling prices on every good", "Slower spending and a possible economic cooling", "Higher payouts on savings accounts"], correctAnswer: 2, explanation: "Scared consumers postpone big purchases first, so confidence dips can front-run the hard data by months." },
      { id: "indicators-3-tu3", question: "Confidence can be 'self-fulfilling' because widespread fear of a recession…", options: ["Is legally required to be ignored", "Guarantees the opposite outcome", "Has no effect on spending", "Helps cause the very downturn people feared"], correctAnswer: 3, explanation: "When everyone braces and cuts back at once, the collective caution manufactures the slowdown they dreaded." },
      { id: "indicators-3-tu4", question: "The smartest way to use confidence data is to…", options: ["Pair it with hard data like actual retail sales", "Treat it as a precise GDP forecast", "Use it as a full substitute for all other data", "Dismiss it as meaningless entertainment"], correctAnswer: 0, explanation: "Feelings sometimes diverge from behavior, so confidence combined with actual spending beats either signal alone." }
    ]
  },
  {
    lessonId: "indicators-4",
    questions: [
      { id: "indicators-4-tu1", question: "Unlike a confidence survey, the monthly retail sales report captures…", options: ["How shoppers say they feel", "Actual dollars people spent at stores", "The count of new store openings", "National advertising budgets"], correctAnswer: 1, explanation: "Retail sales are receipts showing what people actually did with their money, not how they feel." },
      { id: "indicators-4-tu2", question: "Retail sales rising 5% while inflation runs 6% most likely means consumers actually bought…", options: ["Far more stuff than before", "Exactly the same volume", "Less stuff than before", "Nothing measurable at all"], correctAnswer: 2, explanation: "When price growth outpaces sales growth, the higher dollar total hides a drop in real purchase volume." },
      { id: "indicators-4-tu3", question: "Analysts often strip auto sales out of the headline retail number because car sales…", options: ["Are never made by regular consumers", "Are only reported once a year", "Cannot legally be counted", "Swing wildly and distort the underlying trend"], correctAnswer: 3, explanation: "One fleet order or incentive blitz can swing the total, so 'ex-autos' reveals the everyday spending current." },
      { id: "indicators-4-tu4", question: "A strong retail sales report tends to lift which stocks most directly?", options: ["Consumer names like retailers", "Foreign mining companies", "Electric utilities only", "None - spending never moves stocks"], correctAnswer: 0, explanation: "Retail data is essentially these companies' revenue, so consumer names react first and hardest to surprises." }
    ]
  },
  {
    lessonId: "indicators-5",
    questions: [
      { id: "indicators-5-tu1", question: "Housing carries outsized economic weight because a single home purchase…", options: ["Involves no other industry", "Sets off spending across construction, mortgages, furniture, and moving", "Is among the smallest buys people make", "Happens only once per decade nationally"], correctAnswer: 1, explanation: "One sale employs a whole chain of industries, from builders and lenders to furniture and movers." },
      { id: "indicators-5-tu2", question: "A jump in mortgage rates from 3% to 7% on a $300k loan typically…", options: ["Physically removes rooms from houses", "Makes banks stop offering all mortgages", "Adds hundreds to the monthly payment and prices many buyers out", "Forces sellers to reject higher offers"], correctAnswer: 2, explanation: "The higher rate adds roughly $800 a month, pricing out millions of buyers so demand follows rates down." },
      { id: "indicators-5-tu3", question: "'Housing starts' are considered forward-looking because breaking ground reflects…", options: ["Families just beginning to browse listings", "Renters filing their first applications", "Projects already abandoned", "Builder confidence about buyers 6-12 months ahead"], correctAnswer: 3, explanation: "Shovels in the ground are a real-money bet on demand roughly six to twelve months out." },
      { id: "indicators-5-tu4", question: "For the median US household, home equity is best described as…", options: ["Their single largest store of wealth", "A trivial slice of net worth", "An asset owned by the government", "Money that can never be accessed"], correctAnswer: 0, explanation: "For most families the home dwarfs all other assets, so housing prices largely ARE household wealth." }
    ]
  },
  {
    lessonId: "indicators-6",
    questions: [
      { id: "indicators-6-tu1", question: "A common shorthand definition of a recession is…", options: ["One bad day for the stock market", "Two straight quarters of shrinking GDP", "A single factory shutting down", "Any month of rainy weather"], correctAnswer: 1, explanation: "The rule of thumb is two consecutive quarters of falling GDP, though the NBER weighs depth, breadth, and duration." },
      { id: "indicators-6-tu2", question: "The self-reinforcing 'doom loop' of a recession runs roughly as…", options: ["Wages rise, prices fall, everyone benefits", "Exports double and factories expand", "Spending falls, then profits fall, then layoffs, then repeat", "Banks lend more and demand soars"], correctAnswer: 2, explanation: "Each household's cutback is another business's lost revenue, so the contraction feeds on itself." },
      { id: "indicators-6-tu3", question: "Waiting for an official 'all clear' before investing is risky because the stock market usually bottoms…", options: ["Years after the recovery is complete", "The exact day recovery is declared", "Never, since it stays down forever", "Before the recession officially ends"], correctAnswer: 3, explanation: "Markets front-run the recovery, so waiting for the good-news headline historically means missing the biggest rebound gains." },
      { id: "indicators-6-tu4", question: "Historically, US recessions have tended to last…", options: ["Under a year on average, while expansions run for years", "At least a full decade each", "Only two or three weeks", "Exactly one calendar year every time"], correctAnswer: 0, explanation: "Since WWII recessions average under a year, painful but temporary compared with the long expansions that follow." }
    ]
  },
  {
    lessonId: "indicators-7",
    questions: [
      { id: "indicators-7-tu1", question: "New building permits are treated as a LEADING indicator because they…", options: ["Confirm construction that already finished", "Precede actual construction by months", "Measure only past government spending", "Never change from year to year"], correctAnswer: 1, explanation: "Permits are paperwork filed before the hammering starts, pointing at activity months in the future." },
      { id: "indicators-7-tu2", question: "The current unemployment rate is usually classified as a LAGGING indicator because it…", options: ["Reliably predicts next year's economy", "Sets tomorrow's stock prices", "Keeps rising even after a recovery has begun, confirming the trend", "Replaces the need for all other data"], correctAnswer: 2, explanation: "Unemployment verifies rather than forecasts, often still climbing after recovery starts, like a rearview mirror." },
      { id: "indicators-7-tu3", question: "An inverted yield curve, where short-term rates sit above long-term rates, is famous for…", options: ["Guaranteeing an immediate boom", "Affecting only foreign markets", "Having no historical track record", "Preceding most modern US recessions"], correctAnswer: 3, explanation: "When investors accept lower long-term yields, they are betting on trouble ahead, a historically eerie recession signal." },
      { id: "indicators-7-tu4", question: "Because every economic gauge fails sometimes, the wisest approach is to…", options: ["Combine several indicators while staying humble", "Trust one signal absolutely", "Ignore all data and rely on instinct", "React instantly to every twitch"], correctAnswer: 0, explanation: "Dashboards beat single dials, and humility beats certainty since each indicator is imperfect on its own." }
    ]
  },
  {
    lessonId: "alt-1",
    questions: [
      { id: "alt-1-tu1", question: "The two main ways real estate investors earn returns are…", options: ["Government checks and lottery homes", "Rental income and property appreciation", "Interest paid by builders and dividends", "Voting fees and membership dues"], correctAnswer: 1, explanation: "Real estate pays through tenants' monthly rent plus the property hopefully gaining value over time." },
      { id: "alt-1-tu2", question: "Putting 20% down to buy a whole property illustrates leverage because it lets a buyer…", options: ["Pay for the home entirely in cash", "Borrow nothing at all", "Control a large asset with less money down", "Share the house with strangers"], correctAnswer: 2, explanation: "A small down payment controls 100% of the asset, so appreciation on the full value multiplies equity and losses alike." },
      { id: "alt-1-tu3", question: "Compared with a stock, a big drawback of owning a rental property is that it is far less…", options: ["Tangible as a physical asset", "Affected by financing costs", "Tied to the local economy", "Liquid, since selling takes months not seconds"], correctAnswer: 3, explanation: "You cannot sell a duplex with a tap on your phone, so illiquidity is the price of the tangible asset." },
      { id: "alt-1-tu4", question: "For a teenager, the most realistic first step toward real estate exposure is to…", options: ["Learn the numbers now and consider REITs first", "Take out a rental mortgage at sixteen", "Buy land sight-unseen online", "Wait until age 50 to think about it"], correctAnswer: 0, explanation: "Understanding cash flow young and using REITs lets you own property markets for the price of one share." }
    ]
  },
  {
    lessonId: "alt-2",
    questions: [
      { id: "alt-2-tu1", question: "A REIT is best described as…", options: ["A government housing voucher", "A property company that trades like a stock", "A specific type of home mortgage", "A private club for landlords"], correctAnswer: 1, explanation: "Real Estate Investment Trusts pool money into properties and trade on exchanges like any stock." },
      { id: "alt-2-tu2", question: "REITs are known as income machines mainly because the law requires them to pay out at least…", options: ["10% of revenue as dividends", "Nothing, since dividends are optional", "90% of taxable income as dividends", "Half their buildings each year"], correctAnswer: 2, explanation: "The 90% payout rule is what gives REITs their above-average dividend yields." },
      { id: "alt-2-tu3", question: "REIT 'sectors' let an investor target a specific kind of property, such as…", options: ["Apartments, warehouses, data centers, or malls", "Only U.S. Treasury bonds", "Individual tech stocks like Apple", "Foreign currency pairs"], correctAnswer: 0, explanation: "REITs specialize by property type (residential, industrial, retail, data centers), so you can invest in the sector you believe in." },
      { id: "alt-2-tu4", question: "The core advantage of a REIT over directly owning a building is…", options: ["Liquidity plus cheap diversification with no tenants to manage", "A guarantee of higher total returns", "Zero exposure to property markets", "Receiving a free house as a shareholder"], correctAnswer: 0, explanation: "A small sum buys a slice of many buildings, sellable in seconds, with no toilets or title paperwork." }
    ]
  },
  {
    lessonId: "alt-3",
    questions: [
      { id: "alt-3-tu1", question: "Commodities are best defined as…", options: ["Finished products sold in retail stores", "Raw materials like gold, oil, and wheat", "Shares of mining companies", "Collectible luxury goods"], correctAnswer: 1, explanation: "Commodities are the physical inputs of civilization, energy, metals, and crops traded on global markets." },
      { id: "alt-3-tu2", question: "A key difference between a bar of gold and a share of stock is that gold…", options: ["Pays a quarterly profit report", "Sends interest twice a year", "Produces no earnings, so returns come only from price changes", "Grants voting rights at farms"], correctAnswer: 2, explanation: "Gold never innovates or pays you, so you profit only if someone later pays more for it." },
      { id: "alt-3-tu3", question: "Most everyday investors gain commodity exposure through…", options: ["Barrels stored in their garage", "Buying farms outright", "Collecting copper pennies", "ETFs and futures rather than physical delivery"], correctAnswer: 3, explanation: "Funds track commodity prices without anyone warehousing barrels, which nobody actually wants on the driveway." },
      { id: "alt-3-tu4", question: "Over the long run, broad commodity returns have historically…", options: ["Lagged stocks, working as hedges rather than growth engines", "Crushed every other asset class", "Matched stocks exactly each year", "Never moved in either direction"], correctAnswer: 0, explanation: "Materials do not compound like businesses, so commodities are seasoning for a portfolio, not the main course." }
    ]
  },
  {
    lessonId: "alt-4",
    questions: [
      { id: "alt-4-tu1", question: "Unlike money kept in a bank, crypto held in your own wallet is generally…", options: ["Protected by FDIC up to 250,000 dollars", "Not insured, so a hack or mistake is your loss alone", "Guaranteed to never lose value", "Automatically refunded by the government"], correctAnswer: 1, explanation: "Bank deposits carry FDIC insurance, self-custodied crypto does not, so theft or errors aren't reimbursed." },
      { id: "alt-4-tu2", question: "The 'digital gold' argument for Bitcoin rests on the fact that its supply is…", options: ["Unlimited and growing every day", "Controlled by a central bank", "Capped at 21 million coins by its code", "Backed by physical silver"], correctAnswer: 2, explanation: "Programmed scarcity means no authority can print more, the core of the digital gold case." },
      { id: "alt-4-tu3", question: "The warning 'not your keys, not your coins' teaches that…", options: ["Wallet passwords are optional", "Only physical keys can unlock crypto", "Coins expire without daily logins", "Crypto left on a failed exchange can vanish"], correctAnswer: 3, explanation: "FTX's collapse showed that assets on a failed exchange can disappear, so custody matters in an uninsured world." },
      { id: "alt-4-tu4", question: "A sensible rule for holding crypto in a young person's portfolio is to use…", options: ["Only money you can afford to lose", "Your entire emergency fund", "Everything, since it always recovers", "Borrowed money for extra upside"], correctAnswer: 0, explanation: "Crypto belongs as a small speculative satellite, and position sizing separates a lesson from a disaster." }
    ]
  },
  {
    lessonId: "alt-5",
    questions: [
      { id: "alt-5-tu1", question: "Private equity refers to investing in…", options: ["Only government-owned businesses", "Companies not traded on public markets", "Private islands and yachts", "Personal loans made to friends"], correctAnswer: 1, explanation: "Private equity means buying ownership stakes in companies outside the public markets." },
      { id: "alt-5-tu2", question: "Venture capital, a branch of private equity, primarily funds…", options: ["Companies about to shut down", "Government infrastructure only", "Early-stage startups chasing huge growth", "Established utilities exclusively"], correctAnswer: 2, explanation: "VCs back young companies where most fail but one breakout can pay for the whole graveyard." },
      { id: "alt-5-tu3", question: "'Accredited investor' rules restrict private markets mainly because those markets have…", options: ["Seating reserved for celebrities", "A guarantee of losses for newcomers", "A requirement to attend in person", "Less disclosure and higher risk than public ones"], correctAnswer: 3, explanation: "Without SEC-mandated transparency, regulators limit access to those who can absorb a total loss." },
      { id: "alt-5-tu4", question: "The 'lockup' reality of private equity means an investor's money is typically…", options: ["Committed for years with no easy exit", "Withdrawable on any business day", "Insured against every loss", "Returned monthly with interest"], correctAnswer: 0, explanation: "Funds often run 7-10 years with no sell button, which is why only patient capital belongs there." }
    ]
  },
  {
    lessonId: "alt-6",
    questions: [
      { id: "alt-6-tu1", question: "Why is holding your emergency fund in collectibles or NFTs a bad idea?", options: ["Collectibles are guaranteed to lose value", "Emergencies need cash fast, but those can take weeks to sell", "The government bans owning collectibles", "They always sell instantly at full price"], correctAnswer: 1, explanation: "Emergencies demand quick cash, illiquid items like NFTs or collectibles can take weeks and a discount to sell." },
      { id: "alt-6-tu2", question: "Among these, the MOST liquid holding is…", options: ["A downtown rental duplex", "A stake in a private startup", "Shares of a major S&P 500 company", "A vintage baseball card collection"], correctAnswer: 2, explanation: "Blue-chip stocks sell in milliseconds at posted prices, while the others take days to years." },
      { id: "alt-6-tu3", question: "Liquidity risk hurts most when…", options: ["Markets are calm and rising", "You never need the money", "Prices are already at record highs", "You are forced to sell during a crisis"], correctAnswer: 3, explanation: "Emergencies and panics arrive together, and illiquid assets then sell only at fire-sale discounts, if at all." },
      { id: "alt-6-tu4", question: "The 'liquidity premium' means an illiquid investment should offer…", options: ["Higher returns to compensate for the lockup", "Lower returns in exchange for safety", "Returns identical to cash", "Government-set interest rates"], correctAnswer: 0, explanation: "Tying up money demands extra pay, so if a private deal cannot beat liquid options, the lockup is not worth it." }
    ]
  }
]
