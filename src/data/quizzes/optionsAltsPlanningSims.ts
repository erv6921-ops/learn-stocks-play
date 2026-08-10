// Authored question banks: Options, Alternatives, Financial Planning, Simulations.
import type { LessonQuiz } from "../lessonQuizzes"

export const optionsAltsPlanningSimsQuizzes: LessonQuiz[] = [
  // ── OPTIONS-1: Calls vs Puts ──
  {
    lessonId: "options-1",
    questions: [
      { id: "options-1-q1", question: "A CALL option gives its buyer the right to…", options: ["Buy a stock at a set price by a set date", "Sell a stock at any future price", "Receive the company's dividends", "Vote at shareholder meetings"], correctAnswer: 0, explanation: "Calls = the right (not obligation) to BUY at the strike price - a bet the stock will rise." },
      { id: "options-1-q2", question: "A PUT option gives its buyer the right to…", options: ["Sell a stock at a set price by a set date", "Buy stock with borrowed money", "Double their shares automatically", "Cancel a previous stock purchase"], correctAnswer: 0, explanation: "Puts = the right to SELL at the strike - valuable when prices fall, like insurance on a position." },
      { id: "options-1-q3", question: "The 'premium' of an option is…", options: ["The price you pay to own the contract", "The stock's dividend that month", "A bonus paid for winning trades", "The broker's annual fee"], correctAnswer: 0, explanation: "Options aren't free - the premium is the upfront cost, and the most a BUYER can lose." },
      { id: "options-1-q4", question: "Expecting a stock to RISE sharply, an options trader might buy…", options: ["A call option on that stock", "A put option on that stock", "Neither - options only profit on drops", "Both, guaranteeing a profit"], correctAnswer: 0, explanation: "Calls gain value as the stock climbs past the strike - the classic bullish options position." },
      { id: "options-1-q5", question: "One contract typically controls…", options: ["100 shares of the underlying stock", "1 share of the underlying stock", "1,000,000 shares minimum", "A random number of shares"], correctAnswer: 0, explanation: "The 100-share multiplier means small premium moves translate into big percentage swings - leverage in both directions." },
      { id: "options-1-q6", question: "Unlike owning shares, options can expire worthless, meaning buyers can lose…", options: ["The entire premium they paid", "More than everything they own", "Nothing under any scenario", "Only the broker's commission"], correctAnswer: 0, explanation: "If the bet doesn't land by expiration, the contract dies at zero - a 100% loss on that premium is routine, not rare." },
    ],
  },
  // ── OPTIONS-2: Strike Price ──
  {
    lessonId: "options-2",
    questions: [
      { id: "options-2-q1", question: "The strike price is…", options: ["The locked-in buy-or-sell price", "The stock's current market price", "The highest price ever recorded", "The broker's suggested price"], correctAnswer: 0, explanation: "Every contract locks a transaction price in advance - that anchor is the strike." },
      { id: "options-2-q2", question: "A call with a $50 strike is 'in the money' when the stock trades at…", options: ["$60 - above the strike", "$40 - below the strike", "Exactly $0", "Any price at all"], correctAnswer: 0, explanation: "Buying at $50 what sells for $60 has $10 of real value - that's in-the-money for a call." },
      { id: "options-2-q3", question: "An 'out of the money' option still costs a premium because…", options: ["Time remains for the stock to move", "Regulators require a minimum option price", "It pays out dividends in the meantime", "Premiums are fully refundable at expiry"], correctAnswer: 0, explanation: "Time value: the CHANCE of finishing in-the-money before expiry is worth something - and decays daily." },
      { id: "options-2-q4", question: "Choosing a far out-of-the-money strike makes the option…", options: ["Cheaper but much less likely to win", "More expensive but ultimately much safer", "Completely free of any expiration date", "Basically identical to just owning the stock"], correctAnswer: 0, explanation: "Lottery-ticket economics: tiny premium, long odds - most expire worthless." },
      { id: "options-2-q5", question: "For a put with a $30 strike, profit potential grows as the stock…", options: ["Falls further below $30", "Rises further above $30", "Stays exactly at $30", "Stops trading entirely"], correctAnswer: 0, explanation: "Selling at $30 what the market prices at $20 is a $10 win - puts pay in proportion to the plunge." },
      { id: "options-2-q6", question: "'Intrinsic value' of an option equals…", options: ["How far it's in the money right now", "The premium originally paid for it", "The stock's book value per share", "Whatever the seller demands"], correctAnswer: 0, explanation: "Intrinsic = immediate exercise value; everything above that in the premium is time value melting away." },
    ],
  },
  // ── OPTIONS-3: Expiration ──
  {
    lessonId: "options-3",
    questions: [
      { id: "options-3-q1", question: "Every options contract has an expiration date, after which it…", options: ["Ceases to exist entirely", "Converts into company stock", "Renews for another year", "Doubles in value"], correctAnswer: 0, explanation: "Options are melting ice cubes with deadlines - stocks can wait out a slump; options cannot." },
      { id: "options-3-q2", question: "'Theta decay' describes how options…", options: ["Lose time value a little every day", "Grow more valuable as expiry nears", "Change strike prices weekly", "Earn interest while held"], correctAnswer: 0, explanation: "Each passing day burns time value - and the burn accelerates in the final weeks." },
      { id: "options-3-q3", question: "Being RIGHT about direction but WRONG about timing means an option buyer…", options: ["Can still lose everything on that trade", "Will always profit eventually on it", "Gets the full premium refunded back", "Receives extra time on it automatically"], correctAnswer: 0, explanation: "The stock rising a month AFTER expiration pays you nothing - options demand being right on schedule." },
      { id: "options-3-q4", question: "Weekly options versus one-year options (LEAPS) differ mainly in…", options: ["Time to be right - and its price", "Which stocks they can be traded on", "Who is legally allowed to buy them", "Nothing but the paperwork"], correctAnswer: 0, explanation: "More runway costs more premium - weeklies are cheap, brutal sprints; LEAPS are pricier marathons." },
      { id: "options-3-q5", question: "An in-the-money option at expiration is typically…", options: ["Exercised or settled for value", "Discarded with no value", "Extended by thirty days free", "Converted into a bond"], correctAnswer: 0, explanation: "Value doesn't vanish if you're in the money - brokers usually auto-exercise or the contract settles in cash." },
      { id: "options-3-q6", question: "The practical takeaway about expiration for beginners is…", options: ["Time works against option buyers", "Longer trades always lose more", "Expiration dates rarely matter", "Deadlines only affect sellers"], correctAnswer: 0, explanation: "Owning options means paying rent on time itself - every flat day quietly costs you money." },
    ],
  },
  // ── OPTIONS-4: Hedging ──
  {
    lessonId: "options-4",
    questions: [
      { id: "options-4-q1", question: "Hedging with options means using them to…", options: ["Protect existing positions from losses", "Double your bet on one stock", "Avoid paying capital gains tax", "Guarantee profits every month"], correctAnswer: 0, explanation: "Hedges are insurance, not lottery tickets - paying a premium to cap the damage a decline could do." },
      { id: "options-4-q2", question: "A 'protective put' works by…", options: ["Locking a floor price for your shares", "Selling your shares immediately", "Promising to buy more at highs", "Removing all cost from investing"], correctAnswer: 0, explanation: "Own the stock + own a put = your downside stops at the strike, minus the premium paid. Portfolio insurance, literally." },
      { id: "options-4-q3", question: "The cost of hedging is that premiums…", options: ["Drag returns when protection idles", "Are refunded in calm markets", "Get paid by the government", "Only apply to losing trades"], correctAnswer: 0, explanation: "Like car insurance in a crash-free year - the certainty costs real money whether or not disaster shows up." },
      { id: "options-4-q4", question: "A 'covered call' means owning the stock and…", options: ["Selling a call to collect premium", "Buying every available call", "Hiding shares from your broker", "Insuring the stock with the SEC"], correctAnswer: 0, explanation: "You pocket income now but agree to sell if the stock rockets past the strike - trading upside for cash flow." },
      { id: "options-4-q5", question: "Airlines hedging fuel prices with options shows hedging is…", options: ["A real risk tool beyond stock trading", "Only used by gamblers", "Illegal for corporations", "A trick to inflate ticket prices"], correctAnswer: 0, explanation: "Locking fuel costs months ahead protects budgets from oil spikes - the same logic investors apply to portfolios." },
      { id: "options-4-q6", question: "For most long-horizon teen investors, the honest truth about hedging is…", options: ["Diversification and time usually suffice", "Every position needs constant hedges", "Hedging guarantees higher returns", "Only hedged portfolios survive"], correctAnswer: 0, explanation: "With decades ahead, riding out dips is cheaper than paying endless premiums - hedging shines for concentrated, short-term risks." },
    ],
  },
  // ── OPTIONS-5: Risk ──
  {
    lessonId: "options-5",
    questions: [
      { id: "options-5-q1", question: "Most options bought by beginners…", options: ["Expire worthless or lose money", "Multiply into large fortunes", "Convert safely into shares", "Get refunded by brokers"], correctAnswer: 0, explanation: "Studies consistently show the majority of bought options lose - the leverage cuts against inexperience." },
      { id: "options-5-q2", question: "Options amplify BOTH gains and losses because of…", options: ["Leverage - one contract, 100 shares", "Government subsidies on trades", "Their unlimited lifespans", "Fixed prices that never move"], correctAnswer: 0, explanation: "Small stock moves become huge percentage swings on the premium - thrilling upward, devastating downward." },
      { id: "options-5-q3", question: "SELLING 'naked' calls is uniquely dangerous because losses are…", options: ["Theoretically unlimited as it rises", "Capped at the premium collected", "Impossible under any scenario", "Paid by the exchange"], correctAnswer: 0, explanation: "Sell a call without owning shares and a stock that triples can owe you multiples of what you collected - max risk: infinite." },
      { id: "options-5-q4", question: "0DTE (same-day expiry) options trading most closely resembles…", options: ["Fast gambling with financial instruments", "Long-term retirement investing", "Insured savings deposits", "Collecting dividend income"], correctAnswer: 0, explanation: "Hours until expiration leaves no room to be early or late - it's coin-flipping with theta burning the stake." },
      { id: "options-5-q5", question: "Before trading options with real money, the responsible sequence is…", options: ["Learn, paper trade, risk spare cash", "Start with your entire savings", "Copy a stranger's trade alerts", "Skip learning - apps make it easy"], correctAnswer: 0, explanation: "Simple app buttons hide complex risks - practice runs and strict position sizing keep tuition costs survivable." },
      { id: "options-5-q6", question: "The healthiest frame for options in a young investor's world is…", options: ["Tools to understand, not a wealth shortcut", "The fastest legitimate path to riches", "A replacement for boring index funds", "Something to master before basics"], correctAnswer: 0, explanation: "Understand them to be financially literate - but compounding boring index funds is what actually builds the fortune." },
    ],
  },
  // ── ALT-1: Real Estate ──
  {
    lessonId: "alt-1",
    questions: [
      { id: "alt-1-q1", question: "Real estate investors earn returns from…", options: ["Rental income plus property appreciation", "Government checks for owning land", "Interest paid by home builders", "Lottery allocations of houses"], correctAnswer: 0, explanation: "Two engines: tenants paying monthly rent, and the property (hopefully) gaining value over the years." },
      { id: "alt-1-q2", question: "Leverage is central to real estate because buyers typically…", options: ["Control a big asset with less down", "Pay entirely in physical cash", "Borrow nothing whatsoever", "Split homes with strangers"], correctAnswer: 0, explanation: "20% down controls 100% of the house - appreciation on the WHOLE value multiplies your equity fast (and losses too)." },
      { id: "alt-1-q3", question: "The hidden costs new landlords underestimate include…", options: ["Repairs, taxes, and empty months", "Free maintenance from tenants", "Rent that arrives automatically", "Guaranteed yearly appreciation"], correctAnswer: 0, explanation: "The roof leaks, the furnace dies, tenants leave - the 'passive income' brochure skips these chapters." },
      { id: "alt-1-q4", question: "Compared to stocks, real estate is much less…", options: ["Liquid - selling takes months, not seconds", "Physical and tangible as an asset", "Dependent on financing costs", "Connected to local economies"], correctAnswer: 0, explanation: "You can't sell a duplex with a tap on your phone - illiquidity is the price of the tangible asset." },
      { id: "alt-1-q5", question: "Location dominates property value because…", options: ["You can fix a house, not its location", "Paint colors matter more than cities", "All locations appreciate identically", "Land is the same price everywhere"], correctAnswer: 0, explanation: "Jobs, schools, and safety drive demand - the classic rule 'location, location, location' survives every market cycle." },
      { id: "alt-1-q6", question: "For a teenager, the realistic first step toward real estate exposure is…", options: ["Learn the numbers now; maybe REITs first", "A mortgage on a rental at sixteen", "Buying land sight-unseen online", "Waiting until 50 to think about it"], correctAnswer: 0, explanation: "Understand cap rates and cash flow young; REITs let you own property markets for the price of one share." },
    ],
  },
  // ── ALT-2: REITs ──
  {
    lessonId: "alt-2",
    questions: [
      { id: "alt-2-q1", question: "A REIT is…", options: ["A property firm traded like stock", "A government housing voucher", "A type of home mortgage", "A private club for landlords"], correctAnswer: 0, explanation: "Real Estate Investment Trusts pool investor money into malls, warehouses, towers - and trade on exchanges like any stock." },
      { id: "alt-2-q2", question: "By law, REITs must pay shareholders at least…", options: ["90% of taxable income as dividends", "10% of revenue as dividends", "Nothing - dividends are optional", "Half their properties yearly"], correctAnswer: 0, explanation: "That 90% payout rule is why REITs are income machines with above-average dividend yields." },
      { id: "alt-2-q3", question: "The core advantage of REITs over direct ownership is…", options: ["Liquidity plus cheap diversification", "Guaranteed higher total returns", "Zero exposure to property markets", "Free houses for shareholders"], correctAnswer: 0, explanation: "$100 buys a slice of hundreds of buildings, sellable in seconds - no tenants, toilets, or title paperwork." },
      { id: "alt-2-q4", question: "REIT 'sectors' mean you can invest specifically in…", options: ["Warehouses, data centers, or hospitals", "Only single-family suburban homes", "Properties in one zip code", "Buildings without any tenants"], correctAnswer: 0, explanation: "From e-commerce logistics hubs to cell towers - REITs slice real estate into investable themes." },
      { id: "alt-2-q5", question: "Rising interest rates often pressure REIT prices because…", options: ["Costlier debt and rival bond yields", "Buildings physically shrink", "Rent becomes illegal to raise", "Dividends stop being paid"], correctAnswer: 0, explanation: "Property empires run on debt, and when safe bonds pay 5%, REIT yields must compete - both squeeze prices." },
      { id: "alt-2-q6", question: "In a diversified portfolio, REITs mainly contribute…", options: ["Income plus real-estate exposure", "A replacement for all bonds", "Protection from every downturn", "Guaranteed monthly profits"], correctAnswer: 0, explanation: "A 5-10% REIT slice adds property returns and dividend flow - different fuel for the same long-term engine." },
    ],
  },
  // ── ALT-3: Commodities ──
  {
    lessonId: "alt-3",
    questions: [
      { id: "alt-3-q1", question: "Commodities are…", options: ["Raw materials like gold, oil, and wheat", "Finished products in retail stores", "Shares of mining companies", "Collectible luxury goods"], correctAnswer: 0, explanation: "The physical inputs of civilization - energy, metals, and crops, each traded on global markets." },
      { id: "alt-3-q2", question: "Unlike stocks, commodities generate…", options: ["No earnings - returns come from price only", "Detailed quarterly profit and earnings reports", "Interest payments made twice every year", "Voting rights at working commodity farms"], correctAnswer: 0, explanation: "A bar of gold never innovates or pays you - you profit only if someone later pays more for it." },
      { id: "alt-3-q3", question: "Gold's traditional role in portfolios is…", options: ["A refuge during fear and inflation", "The fastest-growing asset class", "A source of steady income", "A replacement for all savings"], correctAnswer: 0, explanation: "For millennia, gold has been where scared money hides - it often shines exactly when paper assets stumble." },
      { id: "alt-3-q4", question: "Oil prices swing dramatically because…", options: ["Supply shocks meet inflexible demand", "Oil companies set prices by vote", "Demand never changes at all", "Barrels expire like milk"], correctAnswer: 0, explanation: "Wars, OPEC decisions, and pipeline outages meet demand that can't adjust quickly - the recipe for wild swings." },
      { id: "alt-3-q5", question: "Most investors get commodity exposure through…", options: ["ETFs and futures, never delivery", "Barrels stored in their garage", "Buying farms outright", "Collecting copper pennies"], correctAnswer: 0, explanation: "Funds track prices without anyone renting a warehouse - nobody actually wants 1,000 barrels on the driveway." },
      { id: "alt-3-q6", question: "Long-term, broad commodity returns have historically…", options: ["Lagged stocks - hedges, not growers", "Crushed every other asset class", "Matched stocks exactly each year", "Never moved in either direction"], correctAnswer: 0, explanation: "Materials don't compound like businesses do - commodities are seasoning for a portfolio, not the main course." },
    ],
  },
  // ── ALT-4: Crypto (Educational) ──
  {
    lessonId: "alt-4",
    questions: [
      { id: "alt-4-q1", question: "A blockchain is essentially…", options: ["A public ledger nobody controls", "A private company's database", "A type of computer virus", "A government currency printer"], correctAnswer: 0, explanation: "Transactions recorded across thousands of computers simultaneously - the innovation underneath every cryptocurrency." },
      { id: "alt-4-q2", question: "Bitcoin's supply is notable because it's…", options: ["Capped at 21 million coins by its code", "Unlimited and growing daily", "Controlled by a central bank", "Backed by physical silver"], correctAnswer: 0, explanation: "Programmed scarcity is the core of the 'digital gold' argument - no authority can print more." },
      { id: "alt-4-q3", question: "Crypto's defining risk characteristic is…", options: ["Extreme swings - routine 50% drops", "Guaranteed steady appreciation", "Complete price stability", "Government insurance on losses"], correctAnswer: 0, explanation: "Bitcoin has lost half its value multiple times on the way up - a rollercoaster stocks rarely match." },
      { id: "alt-4-q4", question: "'Not your keys, not your coins' warns that…", options: ["Exchange crypto dies with the exchange", "Passwords are optional for wallets", "Only physical keys unlock crypto", "Coins expire without daily logins"], correctAnswer: 0, explanation: "FTX's collapse taught millions: assets on a failed exchange can vanish - custody matters in an uninsured world." },
      { id: "alt-4-q5", question: "Unlike bank deposits, crypto holdings are generally…", options: ["Not FDIC-insured against loss or theft", "Insured twice over by governments", "Refundable through customer service", "Backed by the Federal Reserve"], correctAnswer: 0, explanation: "No deposit insurance, and stolen coins rarely return - self-custody means self-responsibility." },
      { id: "alt-4-q6", question: "A rational rule for crypto in a young portfolio is…", options: ["Only money you can afford to lose", "Your entire emergency fund", "Everything - it always recovers", "Borrowed money for extra upside"], correctAnswer: 0, explanation: "Treat it as a speculative satellite, not the core - position sizing is the difference between a lesson and a disaster." },
    ],
  },
  // ── ALT-5: Private Equity ──
  {
    lessonId: "alt-5",
    questions: [
      { id: "alt-5-q1", question: "Private equity means investing in…", options: ["Companies not traded on public markets", "Only government-owned businesses", "Private islands and yachts", "Personal loans to friends"], correctAnswer: 0, explanation: "From local businesses to pre-IPO giants - ownership stakes bought outside the public markets." },
      { id: "alt-5-q2", question: "Venture capital, a slice of private equity, funds…", options: ["Early-stage startups hoping for huge growth", "Companies about to shut down", "Government infrastructure only", "Established utilities exclusively"], correctAnswer: 0, explanation: "VCs write checks to young companies - most fail, but one Uber or Airbnb pays for the graveyard." },
      { id: "alt-5-q3", question: "The 'lockup' reality of private equity means money is…", options: ["Committed for years with no easy exit", "Withdrawable on any normal business day", "Fully insured against all possible losses", "Returned to you monthly with interest"], correctAnswer: 0, explanation: "Funds typically run 7-10 years - no sell button exists, which is why only patient capital belongs there." },
      { id: "alt-5-q4", question: "'Accredited investor' rules exist because private markets…", options: ["Less disclosure and higher risk", "Are reserved for celebrities", "Guarantee losses to newcomers", "Require physical attendance"], correctAnswer: 0, explanation: "Without SEC-mandated transparency, regulators restrict access to those who can absorb a total loss." },
      { id: "alt-5-q5", question: "A buyout firm's classic playbook is…", options: ["Acquire, improve, then sell higher", "Buy companies to close them all", "Hold shares for two weeks", "Collect logos for prestige"], correctAnswer: 0, explanation: "Take control, cut waste, grow profits, exit years later - operational surgery is where the returns hide." },
      { id: "alt-5-q6", question: "Ordinary investors touch private equity returns mostly through…", options: ["Public PE firms or related funds", "Direct billion-dollar buyouts", "Cold-calling startup founders", "They legally never can"], correctAnswer: 0, explanation: "Blackstone and KKR trade publicly, and some funds carry PE exposure - the accessible side doors into a gated market." },
    ],
  },
  // ── ALT-6: Liquidity Risk ──
  {
    lessonId: "alt-6",
    questions: [
      { id: "alt-6-q1", question: "Liquidity measures how quickly an asset can be…", options: ["Sold at a fair price when needed", "Melted into physical form", "Insured by the government", "Duplicated for resale"], correctAnswer: 0, explanation: "Cash is perfectly liquid; a house or rare card may take months to sell without slashing the price." },
      { id: "alt-6-q2", question: "Which ranks MOST liquid?", options: ["Shares of a major S&P 500 company", "A rental duplex downtown", "A stake in a private startup", "A vintage baseball card collection"], correctAnswer: 0, explanation: "Blue-chip stocks sell in milliseconds at posted prices - everything else on that list takes days to years." },
      { id: "alt-6-q3", question: "Liquidity risk BITES hardest when…", options: ["You're forced to sell during a crisis", "Markets are calm and rising", "You never need the money", "Prices are at record highs"], correctAnswer: 0, explanation: "Emergencies and panics arrive together - illiquid assets then sell only at fire-sale discounts, if at all." },
      { id: "alt-6-q4", question: "The 'liquidity premium' means illiquid investments should offer…", options: ["Higher returns to pay for the lockup", "Lower returns for their safety", "Identical returns to cash", "Government-set interest rates"], correctAnswer: 0, explanation: "Tying up money demands extra pay - if a private deal doesn't beat liquid alternatives, the lockup isn't worth it." },
      { id: "alt-6-q5", question: "An 'emergency fund in NFTs and collectibles' fails because emergencies require…", options: ["Fast access to full value", "Assets that appreciate slowly", "Objects that are fun to own", "Long negotiation windows"], correctAnswer: 0, explanation: "The ER doesn't take trading cards - emergency money must convert to spendable cash within hours, at full value." },
      { id: "alt-6-q6", question: "A sound portfolio handles liquidity by…", options: ["Matching liquidity to when it's needed", "Holding only instant-sale assets", "Locking everything up for decades", "Ignoring the concept entirely"], correctAnswer: 0, explanation: "Layers: liquid cash for surprises, stocks for mid-term, illiquid bets only with money that can sleep for years." },
    ],
  },
  // ── PLAN-1: Goal Setting ──
  {
    lessonId: "plan-1",
    questions: [
      { id: "plan-1-q1", question: "Financial goals work best when they are…", options: ["Specific, measurable, and dated", "Vague wishes about being rich", "Kept secret from everyone", "Changed every single week"], correctAnswer: 0, explanation: "'Save $3,000 for a car by June 2027' beats 'save more' - precision creates a plan you can track and hit." },
      { id: "plan-1-q2", question: "Sorting goals by TIME HORIZON matters because…", options: ["It picks where each goal's money lives", "Long goals deserve less attention", "Banks require sorted lists", "Short goals don't need funding"], correctAnswer: 0, explanation: "Next year's laptop fund belongs in savings; 2060's retirement belongs in stocks - timeline picks the vehicle." },
      { id: "plan-1-q3", question: "Working BACKWARD from a goal means calculating…", options: ["The monthly amount needed on time", "Whether the goal sounds impressive", "How others achieved similar goals", "The maximum you could ever save"], correctAnswer: 0, explanation: "$2,400 in 24 months = $100/month - reverse math turns dreams into a monthly to-do item." },
      { id: "plan-1-q4", question: "When goals compete (car vs college vs fun), the winning approach is…", options: ["Rank and fund top priorities first", "Fund whichever feels exciting today", "Split evenly regardless of importance", "Postpone all goals indefinitely"], correctAnswer: 0, explanation: "Money is finite; priorities are the budget's steering wheel - deliberate ranking beats accidental drift." },
      { id: "plan-1-q5", question: "Writing goals down (versus keeping them in your head)…", options: ["Measurably boosts your odds of success", "Jinxes them according to research", "Only helps professional planners", "Makes no documented difference"], correctAnswer: 0, explanation: "Written goals with progress tracking dramatically outperform intentions - visibility drives follow-through." },
      { id: "plan-1-q6", question: "A goal like 'a $400 concert trip in 8 months' is best funded by…", options: ["Auto-transferring $50 monthly to a dedicated fund", "One desperate saving spree in month eight", "A credit card and future worry", "Hoping birthday money covers it"], correctAnswer: 0, explanation: "Automatic small slices make big goals painless - the system saves so willpower doesn't have to." },
    ],
  },
  // ── PLAN-2: Retirement Accounts ──
  {
    lessonId: "plan-2",
    questions: [
      { id: "plan-2-q1", question: "Retirement accounts beat regular accounts for long-term saving because of…", options: ["Decades of compounding tax breaks", "Prettier account statements", "Government-guaranteed returns", "Unlimited free withdrawals"], correctAnswer: 0, explanation: "Skipping taxes on decades of growth can add hundreds of thousands versus a taxable account - the rules are the reward." },
      { id: "plan-2-q2", question: "The FIRST retirement dollar should almost always go to…", options: ["A 401(k) up to the full employer match", "Any account with a cool name", "A savings account earning 0.01%", "Lottery tickets as a backup plan"], correctAnswer: 0, explanation: "A match is a 50-100% instant return - no investment on Earth reliably beats free money." },
      { id: "plan-2-q3", question: "Roth accounts especially favor YOUNG savers because…", options: ["They pay tax now at low rates and never again", "Youth exempts them from contribution limits", "Roths are only legal under 25", "Withdrawals happen at graduation"], correctAnswer: 0, explanation: "A teen in a ~0-12% bracket locks in today's tiny tax rate - then decades of growth come out tax-free." },
      { id: "plan-2-q4", question: "Withdrawing retirement money early typically triggers…", options: ["A 10% penalty plus income taxes", "A congratulations letter", "Bonus interest for the boldness", "Automatic loan forgiveness"], correctAnswer: 0, explanation: "The walls that protect the money also lock it - early raids cost dearly, so retirement money stays retirement money." },
      { id: "plan-2-q5", question: "2024-era annual IRA contribution limits are roughly…", options: ["$7,000 for those under 50", "$500 maximum per lifetime", "$70,000 for any earner", "Unlimited for students"], correctAnswer: 0, explanation: "IRAs cap around $7k/year (401(k)s much higher) - limits that make starting EARLY the only way to maximize the vehicle." },
      { id: "plan-2-q6", question: "A summer job at 16 unlocks retirement investing because IRAs require…", options: ["Earned income - a paycheck counts", "A college diploma first", "Parental employment history", "A minimum age of thirty"], correctAnswer: 0, explanation: "Any legit earned income qualifies - a custodial Roth turns lifeguard wages into potentially six figures by retirement." },
    ],
  },
  // ── PLAN-3: Compounding ──
  {
    lessonId: "plan-3",
    questions: [
      { id: "plan-3-q1", question: "Compounding over DECADES is dramatic because growth becomes…", options: ["Exponential - later years dwarf early ones", "Linear - the same gain every year", "Random - unrelated to time", "Reversed - shrinking over time"], correctAnswer: 0, explanation: "The curve starts flat and ends vertical - most of a 40-year portfolio's value arrives in the final decade." },
      { id: "plan-3-q2", question: "$5,000 invested at 8% for 40 years grows to roughly…", options: ["$108,000", "$21,000", "$9,000", "$5,400"], correctAnswer: 0, explanation: "One deposit, no additions - 21x growth purely from time. That's the argument for starting NOW in a single number." },
      { id: "plan-3-q3", question: "Starting at 18 versus 28, with identical monthly investing until 65, roughly…", options: ["Doubles the early starter's final sum", "Makes no meaningful difference", "Favors the late starter slightly", "Depends only on luck"], correctAnswer: 0, explanation: "Ten extra YEARS of compounding at the front end - the decade money works longest - can double the outcome." },
      { id: "plan-3-q4", question: "The 'flat part' of the compounding curve discourages beginners because…", options: ["Early progress looks tiny before the explosion", "Compounding fails for small amounts", "Banks hide early growth", "The math stops working under $10,000"], correctAnswer: 0, explanation: "Year three looks unimpressive; year thirty looks unbelievable - quitting during the flat part is the classic mistake." },
      { id: "plan-3-q5", question: "Compounding's biggest enemy in YOUR control is…", options: ["Interrupting it with withdrawals", "The direction of interest rates", "Which broker app you chose", "The color of your debit card"], correctAnswer: 0, explanation: "Every raid on the snowball restarts a smaller one - continuity, not brilliance, builds the mountain." },
      { id: "plan-3-q6", question: "Einstein-attributed or not, 'compound interest is the eighth wonder' endures because…", options: ["Ordinary savers truly get wealthy", "It sounds impressive at parties", "Wonders require no evidence", "Interest rates never change"], correctAnswer: 0, explanation: "No inheritance or genius required - modest money, decent returns, and relentless time mint most millionaires." },
    ],
  },
  // ── PLAN-4: Inflation Adjustments ──
  {
    lessonId: "plan-4",
    questions: [
      { id: "plan-4-q1", question: "Long-term plans must account for inflation because future dollars…", options: ["Buy less than today's dollars", "Buy more than today's dollars", "Never change in value", "Are a different currency"], correctAnswer: 0, explanation: "At 3% inflation, $1 million in 40 years buys what ~$300k buys today - plans ignoring this miss by two-thirds." },
      { id: "plan-4-q2", question: "'Real return' means your investment return…", options: ["After subtracting inflation", "Before any fees or taxes", "As reported on television", "Rounded to whole numbers"], correctAnswer: 0, explanation: "10% nominal minus 3% inflation = 7% real - the only number that measures actual buying-power growth." },
      { id: "plan-4-q3", question: "A retirement 'number' calculated in today's dollars must be…", options: ["Inflated into future dollars", "Cut in half for safety", "Used exactly as calculated", "Converted into gold ounces"], correctAnswer: 0, explanation: "Needing '$60k/year' in 2065 means needing ~$180k nominal - future-you shops at future prices." },
      { id: "plan-4-q4", question: "Which asset has historically FAILED to keep pace with inflation?", options: ["Cash sitting in low-yield accounts", "Broad stock market indexes", "Productive real estate", "Businesses with pricing power"], correctAnswer: 0, explanation: "Idle cash loses the race by design - assets tied to growing economies and rising prices keep up." },
      { id: "plan-4-q5", question: "TIPS are government bonds that…", options: ["Adjust principal along with inflation", "Pay tips to generous investors", "Only exist during high inflation", "Guarantee stock-like returns"], correctAnswer: 0, explanation: "Treasury Inflation-Protected Securities rise with CPI - purpose-built shields for purchasing power." },
      { id: "plan-4-q6", question: "Salary decisions should weigh inflation because a 2% raise during 5% inflation is…", options: ["Effectively a 3% pay cut", "A genuine 2% improvement", "A 7% total windfall", "Impossible to evaluate"], correctAnswer: 0, explanation: "Nominal raises can hide real losses - negotiating with inflation data is negotiating with reality." },
    ],
  },
  // ── PLAN-5: Lifestyle Planning ──
  {
    lessonId: "plan-5",
    questions: [
      { id: "plan-5-q1", question: "Lifestyle planning starts by asking…", options: ["What life do I want money to build?", "What new car impresses other people most?", "How much do the top influencers earn?", "Which stocks are trending online today?"], correctAnswer: 0, explanation: "Money is the tool, not the goal - travel, family, freedom, craft: the vision determines every financial number beneath it." },
      { id: "plan-5-q2", question: "'Lifestyle creep' is the pattern where…", options: ["Spending rising with every raise", "Living costs fall as income grows", "Budgets improve without effort", "Salaries shrink over careers"], correctAnswer: 0, explanation: "New income silently becomes new spending - earning double while saving nothing extra is the default outcome without a plan." },
      { id: "plan-5-q3", question: "The antidote to lifestyle creep is…", options: ["Auto-saving a fixed share of each raise", "Refusing all future promotions at work", "Upgrading your lifestyle immediately upon each raise", "Hiding your income from your own self"], correctAnswer: 0, explanation: "Bank half of each raise before touching it - lifestyle still improves while wealth compounds in the background." },
      { id: "plan-5-q4", question: "Your savings rate matters more than your salary because…", options: ["The earn-spend gap is what builds freedom", "Salaries are taxed and savings aren't", "High earners can't invest legally", "Spending fuels wealth directly"], correctAnswer: 0, explanation: "A $60k earner saving 30% builds wealth faster than a $200k earner saving 2% - the gap IS the plan." },
      { id: "plan-5-q5", question: "The 'FIRE' movement demonstrates that…", options: ["Heavy saving can buy freedom decades early", "Retirement requires reaching seventy", "Financial independence is impossible", "Only tech workers can save money"], correctAnswer: 0, explanation: "Financial Independence, Retire Early: extreme savings rates (40-70%) compress a 45-year career into 15 - extreme, but proof the levers work." },
      { id: "plan-5-q6", question: "Research on money and happiness shows spending satisfies most when it buys…", options: ["Experiences, time, and security", "The largest possible logos", "Whatever costs the most", "Exact copies of others' purchases"], correctAnswer: 0, explanation: "Trips, freed-up time, and safety nets beat status treadmills - aligning spending with values is the actual life hack." },
    ],
  },
  // ── SIM-1: Bear Market Survival ──
  {
    lessonId: "sim-1",
    questions: [
      { id: "sim-1-q1", question: "A bear market is officially a decline of…", options: ["20% or more from recent highs", "5% over any single week", "50% in a single session", "Any red day in October"], correctAnswer: 0, explanation: "20%+ down = bear territory. The US has weathered dozens - every one so far has ended." },
      { id: "sim-1-q2", question: "The WORST typical response to a bear market is…", options: ["Panic-selling near the bottom", "Reviewing your plan calmly", "Continuing scheduled investments", "Ignoring daily price checks"], correctAnswer: 0, explanation: "Selling after a 30% drop converts temporary pain into permanent loss - the market's cruelest trap." },
      { id: "sim-1-q3", question: "Continuing to invest DURING a bear market means…", options: ["More shares per dollar at low prices", "Wasting money on falling assets", "Violating standard broker rules", "Guaranteeing further losses"], correctAnswer: 0, explanation: "Bear markets are accumulation season - the shares bought in gloom drive outsized gains in the recovery." },
      { id: "sim-1-q4", question: "Bear markets historically last, on average…", options: ["About 9-18 months on average", "A full generation each time", "Under one trading week", "Forever once they begin"], correctAnswer: 0, explanation: "Bears are sharp but brief; bulls run for years - the asymmetry is why patient investors win." },
      { id: "sim-1-q5", question: "An emergency fund is a bear-market weapon because it…", options: ["Prevents forced selling at the lows", "Earns more during declines", "Predicts when bears begin", "Doubles as investment capital"], correctAnswer: 0, explanation: "Cash for surprises means your portfolio never becomes the ATM at the worst possible moment." },
      { id: "sim-1-q6", question: "'Time in the market' survives bears because missing the recovery's best days…", options: ["Devastates long-term returns", "Barely affects final outcomes", "Is impossible for anyone", "Only hurts professionals"], correctAnswer: 0, explanation: "The market's best days cluster inside its worst stretches - exiting during fear usually means missing the violent rebounds." },
    ],
  },
  // ── SIM-2: Bull Run Strategy ──
  {
    lessonId: "sim-2",
    questions: [
      { id: "sim-2-q1", question: "A bull market is a period of…", options: ["Sustained rising prices and optimism", "Falling prices and widespread fear", "Zero market movement for years", "Trading only farm animals"], correctAnswer: 0, explanation: "Rising tides and rising confidence - bulls historically run far longer than bears." },
      { id: "sim-2-q2", question: "The sneaky danger inside long bull markets is…", options: ["Overconfidence and abandoning discipline", "Too much fear of buying", "Excessive diversification habits", "Saving too large a share"], correctAnswer: 0, explanation: "Years of gains convince people they're geniuses - leverage, concentration, and speculation creep in right before the turn." },
      { id: "sim-2-q3", question: "'Everyone's a genius in a bull market' warns that…", options: ["Rising tides lift bad decisions, briefly", "Intelligence rises with stock prices", "Bull markets create real geniuses", "Skill is measurable in booms"], correctAnswer: 0, explanation: "When everything goes up, recklessness looks like brilliance - the tide going out reveals who was swimming naked." },
      { id: "sim-2-q4", question: "Rebalancing during a bull run means…", options: ["Trimming winners back to your target mix", "Selling everything at the top", "Doubling down on the hottest sector", "Stopping all contributions"], correctAnswer: 0, explanation: "Stocks ballooning from 70% to 85% of your mix means more risk than you chose - trimming locks gains and restores the plan." },
      { id: "sim-2-q5", question: "Chasing last year's hottest stock or sector usually ends with…", options: ["Buying high right before reversion", "Repeating the same huge gains", "Guaranteed index-beating returns", "Lower risk than diversifying"], correctAnswer: 0, explanation: "Performance-chasing buys yesterday's story at today's premium - winners rotate, and crowds arrive late." },
      { id: "sim-2-q6", question: "The bull-market move that pays best in the NEXT bear is…", options: ["Diversification plus some dry powder", "Maximum leverage at the peak", "Quitting your job to day-trade", "Assuming the run never ends"], correctAnswer: 0, explanation: "Discipline during euphoria - sane allocation, cash reserves, no leverage - is what lets you buy the next crash instead of being crushed by it." },
    ],
  },
  // ── SIM-3: Sector Rotation ──
  {
    lessonId: "sim-3",
    questions: [
      { id: "sim-3-q1", question: "'Sectors' divide the market into groups like…", options: ["Tech, healthcare, energy, financials", "Large stocks versus small stocks", "American versus foreign only", "Winners versus losers"], correctAnswer: 0, explanation: "Eleven standard sectors slice the economy by business type - each dancing to its own economic music." },
      { id: "sim-3-q2", question: "Sector rotation is the strategy of…", options: ["Chasing the cycle's favored sectors", "Buying every sector equally forever", "Trading a single stock repeatedly", "Avoiding all sector funds"], correctAnswer: 0, explanation: "Banks in early recovery, tech in expansion, utilities in downturns - rotating chases the cycle's leaders." },
      { id: "sim-3-q3", question: "In early recessions, investors historically rotate INTO…", options: ["Defensives like utilities and staples", "Speculative startups and luxury goods", "Highly leveraged homebuilders", "Vacation and cruise companies"], correctAnswer: 0, explanation: "Toothpaste and electricity get bought in any economy - defensives are where money hides in storms." },
      { id: "sim-3-q4", question: "Rising interest rates traditionally pressure which sector hardest?", options: ["Growth tech valued on far-future profits", "Banks that earn on lending spreads", "Discount grocery retailers", "Electric utility monopolies"], correctAnswer: 0, explanation: "Distant earnings discount hardest when rates climb - 2022 hammered growth tech precisely this way." },
      { id: "sim-3-q5", question: "The catch with rotation strategies is that…", options: ["Timing cycle phases is notoriously hard", "Sectors are illegal to trade", "They only work in textbooks", "Cycles announce themselves clearly"], correctAnswer: 0, explanation: "Phases are obvious only in hindsight - mistimed rotation happily underperforms simply owning everything." },
      { id: "sim-3-q6", question: "For most investors, sector KNOWLEDGE is best used to…", options: ["Understand tilts, don't day-trade cycles", "Replace diversified funds entirely", "Predict recessions to the month", "Impress friends at dinner"], correctAnswer: 0, explanation: "Knowing WHY parts of your portfolio zig while others zag builds conviction - a broad index already owns every rotation." },
    ],
  },
  // ── SIM-4: Crisis Response ──
  {
    lessonId: "sim-4",
    questions: [
      { id: "sim-4-q1", question: "When shocking news hits markets, the FIRST smart move is…", options: ["Pause - no decisions inside the panic", "Sell everything within minutes", "Borrow money to trade the swings", "Refresh prices every ten seconds"], correctAnswer: 0, explanation: "The worst trades are made in the first hours of fear - deliberate delay is a professional discipline." },
      { id: "sim-4-q2", question: "Historically, markets respond to wars, disasters, and shocks by…", options: ["Falling hard, then recovering later", "Never recovering their prior levels", "Ignoring events entirely", "Closing permanently"], correctAnswer: 0, explanation: "From Pearl Harbor to 9/11 to COVID - sharp drops, then recovery as uncertainty resolves. Panic priced worse than reality." },
      { id: "sim-4-q3", question: "A written 'crisis playbook' beats improvisation because…", options: ["Calm rules beat terrified choices", "Paper documents impress advisors", "Playbooks predict specific crises", "Improvisation is always illegal"], correctAnswer: 0, explanation: "'If markets fall 30%, I will…' - pre-commitment is the seatbelt fastened before the crash, not during it." },
      { id: "sim-4-q4", question: "During a crisis, checking your portfolio hourly mostly produces…", options: ["Stress and pressure to act badly", "Better returns through vigilance", "Useful information each refresh", "Calmer long-term thinking"], correctAnswer: 0, explanation: "Loss-aversion makes each red refresh scream 'do something' - and 'something' in a panic is usually selling low." },
      { id: "sim-4-q5", question: "Investors with cash reserves experience crises as…", options: ["Opportunity - quality at rare discounts", "Identical panic to everyone else", "A reason to hold more cash forever", "Proof investing never works"], correctAnswer: 0, explanation: "Buffett's line: be greedy when others are fearful - dry powder converts other people's panic into your entry price." },
      { id: "sim-4-q6", question: "The single best predictor of surviving a market crisis is…", options: ["Your behavior, not your stock picks", "The exact funds you owned", "Your broker's app design", "Luck and nothing else"], correctAnswer: 0, explanation: "Ordinary portfolios held with discipline beat brilliant portfolios abandoned in fear - temperament is the edge." },
    ],
  },
  // ── SIM-5: Retirement Simulation ──
  {
    lessonId: "sim-5",
    questions: [
      { id: "sim-5-q1", question: "The classic '4% rule' suggests retirees…", options: ["Take ~4% yearly, inflation-adjusted", "Spend 4% of each paycheck", "Save exactly 4% while working", "Earn 4% guaranteed forever"], correctAnswer: 0, explanation: "Historically, 4% initial withdrawals (inflation-adjusted) survived 30-year retirements - the standard planning benchmark." },
      { id: "sim-5-q2", question: "Under the 4% rule, retiring on $40,000/year requires roughly…", options: ["$1 million saved", "$100,000 saved", "$4 million saved", "$40,000 saved"], correctAnswer: 0, explanation: "Desired income × 25 = the target. It turns a fuzzy dream into one concrete number to chase." },
      { id: "sim-5-q3", question: "'Sequence of returns risk' means retirees are hurt most by…", options: ["Bad market years early in retirement", "Any volatility after age 80", "Steady returns of any size", "Markets rising too quickly"], correctAnswer: 0, explanation: "Withdrawing during early crashes digs a hole the portfolio may never escape - WHEN returns arrive matters as much as their average." },
      { id: "sim-5-q4", question: "Retirees keep SOME stocks even at 70 because…", options: ["Long retirements still need growth", "Rules require stock ownership", "Bonds are illegal after 65", "Stocks stop being risky with age"], correctAnswer: 0, explanation: "All-cash at 65 nearly guarantees running short by 90 - inflation is the retiree's stalker, growth is the bodyguard." },
      { id: "sim-5-q5", question: "Flexible spending (cutting withdrawals in bad years) does what for a retirement plan?", options: ["Dramatically improves the odds money lasts", "Makes no measurable difference", "Violates the rules of the 4% study", "Only helps in bull markets"], correctAnswer: 0, explanation: "Skipping inflation raises or trimming 10% during crashes rescues borderline plans - flexibility is a superpower." },
      { id: "sim-5-q6", question: "Simulating retirement decades early teaches students that…", options: ["Today's small deposits decide that future", "Retirement is unknowable until 60", "Planning young is pointless", "Withdrawals matter more than savings"], correctAnswer: 0, explanation: "The 4% math flows backward: every $100/month invested at 16 shrinks the mountain future-you must climb." },
    ],
  },
  // ── SIM-6: Balanced Portfolio Build ──
  {
    lessonId: "sim-6",
    questions: [
      { id: "sim-6-q1", question: "A 'balanced portfolio' blends assets so that…", options: ["No single failure can wreck the plan", "Every holding moves identically", "Returns are legally guaranteed", "Only winners are ever owned"], correctAnswer: 0, explanation: "Stocks, bonds, and cash weighting risk against goals - built to survive surprises, not to win any single year." },
      { id: "sim-6-q2", question: "A classic aggressive-but-sane mix for a young investor is…", options: ["Mostly broad stock funds, a bond slice", "100% one meme stock", "90% cash and 10% lottery tickets", "Equal parts crypto and collectibles"], correctAnswer: 0, explanation: "Decades of runway justify 80-90% diversified stocks - the bond sliver dampens the wildest swings." },
      { id: "sim-6-q3", question: "'Rebalancing' a portfolio means…", options: ["Restoring your target mix after drift", "Selling everything each January", "Adding new asset types monthly", "Copying a celebrity's holdings"], correctAnswer: 0, explanation: "Winners outgrow their share; rebalancing trims them and tops up laggards - systematically selling high, buying low." },
      { id: "sim-6-q4", question: "Owning international stocks alongside US stocks adds…", options: ["A hedge against single-country risk", "Automatic currency losses", "Double taxation on all gains", "Nothing - markets move as one"], correctAnswer: 0, explanation: "Decades exist where foreign markets led and the US lagged - geography is one more egg-basket worth splitting." },
      { id: "sim-6-q5", question: "The right stock/bond split for YOU depends mostly on…", options: ["Your timeline and tolerance for drops", "Your favorite company's logo", "This morning's market direction", "What worked for your grandparents"], correctAnswer: 0, explanation: "Allocation is personal engineering: years until the money's needed × your honest panic threshold." },
      { id: "sim-6-q6", question: "Once built, a good portfolio mostly needs…", options: ["Steady deposits, yearly rebalancing", "Daily trades to stay optimal", "Complete rebuilds every quarter", "Constant reaction to headlines"], correctAnswer: 0, explanation: "The best maintenance is boring: automate deposits, rebalance yearly, ignore noise - activity is the enemy of returns." },
    ],
  },
]
