import { QuizQuestion } from "@/types"

export const topUp6ValPlan: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "valuation-1",
    questions: [
      { id: "valuation-1-tu1", question: "A company spends heavily on a fancy new headquarters. For its intrinsic value, this is…", options: ["Mostly decoration, not a real value driver", "The single biggest driver of value", "A guarantee of higher future profits", "More important than its cash generation"], correctAnswer: 0, explanation: "Value comes from cash the business can generate - buildings and logos are decoration, not the engine." },
      { id: "valuation-1-tu2", question: "Efficient use of capital raises a company's value because it means the firm…", options: ["Spends as much money as possible", "Turns each invested dollar into more profit", "Avoids ever reinvesting in itself", "Keeps all cash idle in the bank"], correctAnswer: 1, explanation: "Efficient capital use is part of the value trio - getting more profit per dollar invested compounds intrinsic value." },
      { id: "valuation-1-tu3", question: "Why do lumpy, one-off sales usually earn a LOWER valuation than subscription revenue?", options: ["They are always larger in dollar terms", "Regulators forbid pricing them", "They are less certain and harder to count on", "Customers legally cannot cancel them"], correctAnswer: 2, explanation: "Investors pay up for reliable cash - uncertain, one-off revenue is worth less than predictable recurring cash." },
      { id: "valuation-1-tu4", question: "A skilled management team adds value chiefly by deciding…", options: ["The daily quote of the stock", "Which customers are allowed to buy", "The country's interest rate", "How profits are reinvested rather than wasted"], correctAnswer: 3, explanation: "Capital allocation - reinvest, acquire, buy back, or squander - compounds into huge differences over decades." },
    ],
  },
  {
    lessonId: "valuation-2",
    questions: [
      { id: "valuation-2-tu1", question: "An investor who buys a fast-expanding company at a premium multiple is practicing…", options: ["Growth investing", "Value investing", "Dividend harvesting", "Index tracking"], correctAnswer: 0, explanation: "Growth investors pay premium prices betting the expansion will outrun the price." },
      { id: "valuation-2-tu2", question: "A stock trades far below what the underlying business is worth. A value investor sees…", options: ["A stock to avoid at all costs", "A potential bargain to buy", "Proof the business is dying", "A guaranteed growth story"], correctAnswer: 1, explanation: "Value investing hunts for solid businesses priced below their true worth - buying dollars for seventy cents." },
      { id: "valuation-2-tu3", question: "A stock is cheap only because its business is quietly dying. That is best called…", options: ["A growth story", "A margin of safety", "A value trap", "A network effect"], correctAnswer: 2, explanation: "A value trap is cheap like expired milk, not like a bargain - the craft is telling them apart." },
      { id: "valuation-2-tu4", question: "For most investors, the practical lesson from growth versus value is to…", options: ["Only ever buy the cheapest stocks", "Only ever buy the fastest growers", "Avoid stocks that grow at all", "Seek great businesses at reasonable prices, ignoring labels"], correctAnswer: 3, explanation: "The best investors blend both schools - quality plus growth at a price that leaves room to be wrong." },
    ],
  },
  {
    lessonId: "valuation-3",
    questions: [
      { id: "valuation-3-tu1", question: "A ride-hailing app gets better for everyone as more drivers and riders join. This moat is…", options: ["A network effect", "A brand-power moat", "A cost advantage", "High switching costs"], correctAnswer: 0, explanation: "Each new user makes the product better for every other user - the defining feature of a network-effect moat." },
      { id: "valuation-3-tu2", question: "A business runs so efficiently it stays profitable at prices that would bankrupt rivals. Its moat is…", options: ["A network effect", "A cost advantage", "High switching costs", "A brand premium"], correctAnswer: 1, explanation: "Scale and efficiency let cost-advantage firms smile at price wars that kill everyone else." },
      { id: "valuation-3-tu3", question: "Ripping out an installed enterprise software system is painful and expensive, so customers stay. That moat is…", options: ["A network effect", "A cost advantage", "High switching costs", "Brand power"], correctAnswer: 2, explanation: "When leaving is painful, expensive, or risky, customers stay and pricing power follows." },
      { id: "valuation-3-tu4", question: "The most reliable evidence that a moat is real, not just marketing, is…", options: ["The company saying it has a moat in ads", "A memorable logo on merchandise", "The CEO mentioning moats in interviews", "High returns on capital that persist for years"], correctAnswer: 3, explanation: "Talk is cheap - a genuine moat shows up as margins and returns competitors keep failing to erode." },
    ],
  },
  {
    lessonId: "valuation-4",
    questions: [
      { id: "valuation-4-tu1", question: "A stock's price today is set mainly by…", options: ["The crowd's collective bet about the future", "Only last year's audited earnings", "The founder's original asking price", "A fixed number set by regulators"], correctAnswer: 0, explanation: "Prices are forward-looking - investors handicapping what comes next, not grading what already happened." },
      { id: "valuation-4-tu2", question: "A company reports exactly the earnings everyone anticipated, and the stock barely moves. This is because…", options: ["Investors misread the report", "The result was already priced in", "Good news is always ignored", "Trading was suspended that day"], correctAnswer: 1, explanation: "Only surprises move prices - fully expected news is already reflected in the current price." },
      { id: "valuation-4-tu3", question: "A stock everyone has written off jumps on news that is merely 'less bad than feared'. This shows…", options: ["Cheap stocks are legally required to recover", "Pessimism attracts government subsidies", "Low expectations can turn modest news into a catalyst", "Bad news never affects prices"], correctAnswer: 2, explanation: "When the market prices in disaster, less-bad-than-feared becomes a catalyst - expectations set the hurdle height." },
      { id: "valuation-4-tu4", question: "The sharpest question to ask about any richly-priced stock is…", options: ["What did the price do last Tuesday?", "Which ticker sounds the coolest?", "What does everyone already believe?", "What must be true for this price to make sense?"], correctAnswer: 3, explanation: "Reverse-engineer the assumptions baked into the price, then judge whether they are too optimistic or too gloomy." },
    ],
  },
  {
    lessonId: "valuation-5",
    questions: [
      { id: "valuation-5-tu1", question: "The core idea of a DCF is to…", options: ["Project future cash and discount it back to today", "Average the last month of prices", "Count the company's employees", "Multiply revenue by a lucky number"], correctAnswer: 0, explanation: "A DCF forecasts the cash a business will produce, then translates those future dollars into today's dollars." },
      { id: "valuation-5-tu2", question: "In a DCF, cash flows from a risky startup should be discounted…", options: ["Less heavily than a stable utility's", "More heavily than a stable utility's", "At exactly the sales-tax rate", "Not at all, since risk is ignored"], correctAnswer: 1, explanation: "The discount rate reflects required return for risk - riskier cash flows get discounted harder." },
      { id: "valuation-5-tu3", question: "Nudging a DCF's growth assumption up by a couple percent can double the 'fair value'. This teaches that DCF outputs are…", options: ["Accurate to the penny", "Legally binding once calculated", "Estimates sensitive to their assumptions", "Impossible to change once set"], correctAnswer: 2, explanation: "Garbage in, gospel out - tiny assumption tweaks swing results, so a DCF is an estimating tool, not an oracle." },
      { id: "valuation-5-tu4", question: "The most valuable byproduct of building even a rough DCF is that it…", options: ["Removes all uncertainty from investing", "Predicts next week's price precisely", "Guarantees a profitable trade", "Forces you to study the business's real drivers"], correctAnswer: 3, explanation: "The discipline of estimating growth, margins, and risk teaches you the business - the thinking beats the number." },
    ],
  },
  {
    lessonId: "valuation-6",
    questions: [
      { id: "valuation-6-tu1", question: "A business's true underlying worth, independent of the market's daily mood, is its…", options: ["Intrinsic value", "Opening price", "Founding share price", "Total annual revenue"], correctAnswer: 0, explanation: "Intrinsic value is the underlying worth of the cash-generating machine, separate from today's quote." },
      { id: "valuation-6-tu2", question: "In Graham's parable, when Mr. Market shows up wildly optimistic and offers a high price, you should…", options: ["Always accept because he is rational", "Feel free to sell to him or simply ignore him", "Assume the price is the true value", "Report him to regulators"], correctAnswer: 1, explanation: "Mr. Market's manic or depressed daily offers are yours to take advantage of or ignore entirely." },
      { id: "valuation-6-tu3", question: "'In the short run a voting machine, in the long run a weighing machine' means that over time…", options: ["Shareholders literally vote on the price", "Markets physically weigh companies", "Fundamentals, not hype, decide where price lands", "Voting rights set all returns"], correctAnswer: 2, explanation: "Popularity rules today's price, but earnings power decides where price ends up in the long run." },
      { id: "valuation-6-tu4", question: "Because intrinsic value is only an estimate, the wise approach is to…", options: ["Calculate it to four decimal places", "Follow influencers instead of valuing", "Always trust the highest figure you find", "Use a range and demand a margin of safety"], correctAnswer: 3, explanation: "Precision is fake and conservatism is real - a rough range plus a discount beats a confident exact figure." },
    ],
  },
  {
    lessonId: "valuation-7",
    questions: [
      { id: "valuation-7-tu1", question: "The primary edge of holding investments for decades is…", options: ["Letting compounding run uninterrupted", "Never having to research anything", "A guarantee against all losses", "Access to secret institutional funds"], correctAnswer: 0, explanation: "Time turns modest, repeatable returns into fortunes - compounding needs runway, not brilliance." },
      { id: "valuation-7-tu2", question: "Why is trying to dodge crashes by jumping in and out so dangerous for returns?", options: ["Exchanges lose your paperwork", "The best days cluster near the worst, so you miss rebounds", "Stocks resent disloyal owners", "There are mandatory timing penalties"], correctAnswer: 1, explanation: "Missing just the ten best days can slash returns because the best days sit right beside the worst ones." },
      { id: "valuation-7-tu3", question: "Frequent trading tends to erode returns primarily through…", options: ["Companies punishing active traders", "A special tax on long holdings", "Taxes, transaction costs, and badly timed emotions", "Losing your original share certificates"], correctAnswer: 2, explanation: "Every trade invites taxes, spreads, and the chance to be wrong twice - once selling, once rebuying." },
      { id: "valuation-7-tu4", question: "The right reason to finally sell a great business bought at a fair price is when…", options: ["Exactly ninety days have passed", "It posts its first 10% gain", "A TV pundit recommends selling", "The original thesis breaks and it is no longer great"], correctAnswer: 3, explanation: "Sell when the thesis breaks, not when the calendar or the crowd says so - great compounders reward patient owners." },
    ],
  },
  {
    lessonId: "plan-1",
    questions: [
      { id: "plan-1-tu1", question: "Which goal is written well enough to actually plan around?", options: ["Save $2,000 for a laptop by August 2027", "Save more money soon", "Get rich eventually", "Be better with money someday"], correctAnswer: 0, explanation: "Goals work best when specific, measurable, and dated - precision creates a plan you can track and hit." },
      { id: "plan-1-tu2", question: "You want $3,600 for a trip in 36 months. Working backward, you need to save…", options: ["$360 per month", "$100 per month", "$36 per month", "$1,200 per month"], correctAnswer: 1, explanation: "Reverse math: $3,600 divided by 36 months equals $100 a month - turning a dream into a monthly to-do." },
      { id: "plan-1-tu3", question: "You want a near-term laptop AND far-off retirement. Sorting by time horizon mainly decides…", options: ["Which goal is more admirable", "Whether to abandon one goal", "Where each goal's money should live", "Which bank you must use"], correctAnswer: 2, explanation: "Next year's laptop fund belongs in savings; distant retirement belongs in stocks - the timeline picks the vehicle." },
      { id: "plan-1-tu4", question: "When a car, college fund, and a fun trip all compete for limited money, the winning move is to…", options: ["Fund whichever feels exciting today", "Split evenly no matter their importance", "Postpone every goal indefinitely", "Rank them and fund top priorities first"], correctAnswer: 3, explanation: "Money is finite, so deliberate ranking of priorities beats accidental drift." },
    ],
  },
  {
    lessonId: "plan-2",
    questions: [
      { id: "plan-2-tu1", question: "Your employer matches 401(k) contributions dollar-for-dollar. The first retirement dollar should go there because the match is…", options: ["An instant guaranteed return you cannot beat elsewhere", "A small perk not worth the paperwork", "Taxed away before you see it", "Only available after age fifty"], correctAnswer: 0, explanation: "A match is a 50-100% instant return - no investment reliably beats free money." },
      { id: "plan-2-tu2", question: "A 16-year-old wants to open a Roth IRA. The key thing they must have is…", options: ["A college diploma", "Earned income, such as a paycheck", "A parent who is employed", "To be at least thirty years old"], correctAnswer: 1, explanation: "IRAs require earned income - any legit paycheck qualifies, so a summer job unlocks retirement investing." },
      { id: "plan-2-tu3", question: "Roth accounts especially favor young savers because they…", options: ["Exempt the young from all contribution limits", "Are only legal for people under 25", "Pay tax now at a low rate, then grow tax-free", "Must be withdrawn at graduation"], correctAnswer: 2, explanation: "A teen in a very low bracket locks in today's tiny tax rate, then decades of growth come out tax-free." },
      { id: "plan-2-tu4", question: "Pulling money out of a retirement account years before retirement typically means…", options: ["A bonus for bold decisions", "Automatic forgiveness of the taxes", "No consequences whatsoever", "A 10% penalty plus income taxes"], correctAnswer: 3, explanation: "The walls that protect the money also lock it - early raids cost a 10% penalty plus income taxes." },
    ],
  },
  {
    lessonId: "plan-3",
    questions: [
      { id: "plan-3-tu1", question: "Over many decades, compound growth is described as exponential because…", options: ["Later years add far more than early ones", "Each year adds the exact same amount", "Gains shrink steadily over time", "Growth is random and timeless"], correctAnswer: 0, explanation: "The curve starts flat and ends vertical - most of a long portfolio's value arrives in the final decade." },
      { id: "plan-3-tu2", question: "Beginners often quit during compounding's 'flat part' because…", options: ["Compounding fails on small amounts", "Early progress looks tiny before the later explosion", "Banks secretly hide the early gains", "The math stops working below $10,000"], correctAnswer: 1, explanation: "Year three looks unimpressive while year thirty looks unbelievable - quitting during the flat part is the classic mistake." },
      { id: "plan-3-tu3", question: "The factor most within your control that can wreck compounding is…", options: ["The direction of interest rates", "Which broker app you picked", "Interrupting it by pulling money out", "The color of your debit card"], correctAnswer: 2, explanation: "Every withdrawal restarts a smaller snowball - continuity, not brilliance, builds the mountain." },
      { id: "plan-3-tu4", question: "Two savers invest the same monthly amount until 65, but one starts at 18 and the other at 28. The early starter's final sum is roughly…", options: ["Identical to the late starter's", "Slightly smaller", "Impossible to compare", "Double the late starter's"], correctAnswer: 3, explanation: "Ten extra years of compounding at the front end - where money works longest - can double the outcome." },
    ],
  },
  {
    lessonId: "plan-4",
    questions: [
      { id: "plan-4-tu1", question: "Your investment earns 9% while inflation runs 3%. Your real return is…", options: ["6%", "12%", "3%", "9%"], correctAnswer: 0, explanation: "Real return is nominal minus inflation: 9% minus 3% equals 6%, the only measure of actual buying-power growth." },
      { id: "plan-4-tu2", question: "A retirement 'number' worked out in today's dollars must be…", options: ["Cut in half for safety", "Inflated up into future dollars", "Used exactly as first calculated", "Converted into ounces of gold"], correctAnswer: 1, explanation: "Future-you shops at future prices, so a today's-dollars target must be inflated into the higher nominal amount." },
      { id: "plan-4-tu3", question: "Government bonds whose principal rises with the CPI to shield purchasing power are called…", options: ["Junk bonds", "Zero-coupon bonds", "TIPS", "Municipal bonds"], correctAnswer: 2, explanation: "Treasury Inflation-Protected Securities adjust with inflation - purpose-built shields for purchasing power." },
      { id: "plan-4-tu4", question: "You get a 3% raise in a year when inflation is 5%. In real terms this is…", options: ["A genuine 3% gain", "An 8% windfall", "Exactly break-even", "Roughly a 2% pay cut"], correctAnswer: 3, explanation: "Nominal raises can hide real losses - a 3% raise against 5% inflation is effectively about a 2% cut in buying power." },
    ],
  },
  {
    lessonId: "plan-5",
    questions: [
      { id: "plan-5-tu1", question: "The right starting point for lifestyle planning is asking…", options: ["What life do I actually want money to build?", "What car would impress my neighbors?", "How much do famous influencers earn?", "Which stock is trending right now?"], correctAnswer: 0, explanation: "Money is the tool, not the goal - the vision for your life determines every financial number beneath it." },
      { id: "plan-5-tu2", question: "A worker whose spending rises to match every raise, saving nothing extra, is experiencing…", options: ["A margin of safety", "Lifestyle creep", "Financial independence", "A real return"], correctAnswer: 1, explanation: "Lifestyle creep is when new income silently becomes new spending - the default without a plan." },
      { id: "plan-5-tu3", question: "Compared to a $200k earner who saves 2%, a $60k earner who saves 30% will generally…", options: ["Never catch up regardless of saving", "Build wealth only if they get promoted", "Build wealth faster, because the earn-spend gap is bigger", "Fall behind because salary rules everything"], correctAnswer: 2, explanation: "Savings rate matters more than salary - the gap between earning and spending is what builds freedom." },
      { id: "plan-5-tu4", question: "Research on money and happiness suggests spending brings the most lasting satisfaction when it buys…", options: ["The biggest possible brand logos", "Whatever happens to cost the most", "Exact copies of what others bought", "Experiences, time, and security"], correctAnswer: 3, explanation: "Trips, freed-up time, and safety nets beat status treadmills - aligning spending with values is the real life hack." },
    ],
  },
]
