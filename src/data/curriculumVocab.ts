// Per-unit glossary vocabulary for the regular (personal-finance / business)
// curriculum. These are the "key words" a student can hover over in a lesson to
// see a plain-language definition, exactly like the Gulliver Intro track's
// INTRO_VOCAB (src/data/introVocab). The difference is scope: each unit carries
// its own term list so a lesson only lights up the vocabulary that unit teaches,
// instead of one global list highlighting everything everywhere.
//
// How it renders: LessonDetail wraps the lesson in a <GlossaryProvider> built
// from getUnitVocab(unitId). Every <HighlightedText> below it (the concept
// reader, scenarios, recaps, and Jeff's chat) then auto-highlights the FIRST
// occurrence of each term in green and shows the definition on hover/tap. No
// **markers** are required - the terms are matched in plain prose on word
// boundaries (see src/lib/glossary buildGlossary + src/lib/highlightTerms).
//
// Every term below was drawn from the actual lesson prose for that unit, so the
// highlight has something to attach to. Definitions are 1-2 sentences, written
// for a high-school reader, matching how the lesson uses the term.
//
// Special tracks (Gulliver Intro, IB Economics, AP Micro) are intentionally NOT
// here: Gulliver already ships its own INTRO_VOCAB via Jeff's vocab flag, and
// the other tracks are handled separately. Unknown unitIds return null, which
// leaves those lessons' rendering exactly as it was.

import type { GlossaryEntry } from "@/lib/glossary"

export const UNIT_VOCAB: Record<string, GlossaryEntry[]> = {
  // Unit 1 - The Psychology of Money
  "unit-1": [
    { term: "present bias", definition: "The pull toward a reward now over a bigger reward later, which is why people spend fast and struggle to save for the future." },
    { term: "mental accounting", definition: "Treating identical dollars differently based on their label, like blowing gift money while carefully guarding an equal paycheck." },
    { term: "sunk-cost", definition: "Throwing good money after bad because you already spent some; the past spending is gone no matter what you do next." },
    { term: "lifestyle inflation", definition: "Spending quietly rising to match a higher income, so a raise disappears into habits and your savings never grow." },
    { term: "dopamine", definition: "The brain's reward chemical released when you spend, making purchases feel emotionally exciting rather than purely logical." },
    { term: "delayed gratification", definition: "The skill of choosing a bigger later reward over a smaller reward now, which lets money grow and goals get reached." },
    { term: "compound growth", definition: "The way money multiplies over time, so dollars saved early grow the longest and can beat saving more money later." },
    { term: "opportunity cost", definition: "What you give up by spending; every instant reward quietly costs whatever that money could have grown into." },
    { term: "cooling-off rule", definition: "Waiting a set time, like 24 hours, before buying, so an impulse urge fades and only purchases you truly want remain." },
    { term: "scarcity mindset", definition: "The feeling of never having enough that narrows your thinking to the urgent now, regardless of how much you actually have." },
    { term: "abundance mindset", definition: "The grounded belief that your income, skills, and opportunities can grow, paired with disciplined action to expand them." },
    { term: "social proof", definition: "Assuming a popular choice must be right or normal because many people are doing it, a tactic marketers use with crowds and reviews." },
    { term: "anchoring", definition: "When the first number you see sticks and warps your judgment, like a crossed-out high price making a sale price feel cheap." },
    { term: "loss aversion", definition: "A bias where losing money feels about twice as painful as gaining the same amount feels good, so fear can steer your decisions." },
    { term: "money scripts", definition: "Beliefs about money you absorbed young, usually without noticing, that silently shape the financial choices you think are your own." },
  ],

  // Unit 2 - Income & Earning Power
  "unit-2": [
    { term: "active income", definition: "Money you earn by directly trading your time and effort for pay; when you stop working, the income stops the same day." },
    { term: "passive income", definition: "Money that flows from an asset you built or bought once, paying you repeatedly whether or not you work that day." },
    { term: "wage", definition: "Pay given for each hour you work, so your paycheck rises and falls with the number of hours on the clock." },
    { term: "salary", definition: "A fixed yearly amount split into equal paychecks no matter how many hours you work, making pay predictable but usually without overtime." },
    { term: "overtime", definition: "Extra pay, usually 1.5 times the normal wage, that most hourly workers earn for hours worked beyond 40 in a week." },
    { term: "commission", definition: "Pay tied to results, usually a percentage of what you sell, so strong sellers earn more and slow months pay little." },
    { term: "gig economy", definition: "Work built on short-term, flexible tasks instead of steady employment, often through apps and usually as an independent contractor." },
    { term: "gross pay", definition: "Your full earnings before any deductions are taken out, which is the base everything else is calculated from." },
    { term: "net pay", definition: "Your take-home pay: gross pay minus all taxes and deductions, and the number that actually lands in your account to spend." },
    { term: "FICA", definition: "Payroll taxes taking 7.65% of gross pay for Social Security and Medicare, with employers matching an equal share." },
    { term: "standard deduction", definition: "An amount everyone can shield from taxes, so income below it (often the first ~$14,000) may owe zero federal income tax." },
    { term: "ROI", definition: "Return on investment: what you get back compared to what you put in, used to weigh a career's cost against its lifetime earnings." },
    { term: "skill stacking", definition: "Combining several 'good enough' skills instead of one world-class talent, making you rare and valuable because the combination is uncommon." },
    { term: "recession", definition: "A period when the economy shrinks instead of grows, often for two straight quarters, so hiring slows and unemployment rises." },
    { term: "Social Security", definition: "A government program paying income to retired, disabled, and survivor beneficiaries, funded pay-as-you-go by today's workers' FICA taxes." },
  ],

  // Unit 3 - Budgeting Mastery
  "unit-3": [
    { term: "leakage", definition: "The steady drip of small, forgotten purchases that quietly drains your account without you noticing where the money went." },
    { term: "pay yourself first", definition: "Setting aside your saving amount the moment income arrives, before planning any spending, so saving actually happens instead of being leftovers." },
    { term: "50/30/20 rule", definition: "A budgeting shortcut that splits after-tax income into 50% for needs, 30% for wants, and 20% for saving or paying off debt." },
    { term: "fixed expenses", definition: "Costs that stay the same every month, like a phone plan or subscription, which lock in your money before the month even starts." },
    { term: "variable expenses", definition: "Costs that change month to month, like food or fun, where you have the most room to adjust when money is tight." },
    { term: "emergency fund", definition: "Cash reserved only for true, unexpected, unavoidable costs, so a surprise doesn't force you into debt; teens start with $300 to $500." },
    { term: "sinking fund", definition: "Money saved toward a known, planned purchase like a laptop, kept separate from the emergency fund guarding against the unknown." },
    { term: "hedonic treadmill", definition: "The way people quickly get used to new upgrades so they crave the next one, meaning more spending rarely brings lasting happiness." },
    { term: "SMART", definition: "Goals that are Specific, Measurable, Achievable, Relevant, and Time-bound, so a vague wish becomes a concrete monthly savings number." },
    { term: "zero-based budgeting", definition: "Assigning every dollar of income a job (including saving) until zero is left unassigned, so no money leaks away undirected." },
    { term: "total cost of ownership", definition: "Everything an item will cost over its whole life, not just the sticker price, including subscriptions, refills, repairs, and accessories." },
    { term: "charm pricing", definition: "Ending a price in .99, like $9.99, so your brain anchors on the first digit and it feels closer to $9 than to $10." },
    { term: "decoy effect", definition: "Adding a middle option that exists only to make a pricier choice look like a bargain and push you to spend more." },
    { term: "warranty", definition: "A company's promise to repair or replace a product if it fails within a set period of time." },
    { term: "billing error", definition: "Any incorrect charge on an account, such as a double charge, a canceled subscription that keeps billing, or an unagreed fee." },
  ],

  // Unit 4 - Investing Fundamentals
  "unit-25": [
    { term: "compound interest", definition: "When your money earns returns, and then those returns start earning returns too, so your balance snowballs and grows faster over time." },
    { term: "Rule of 72", definition: "A shortcut for estimating how many years it takes money to double: just divide 72 by the yearly return rate." },
    { term: "diversification", definition: "Spreading your money across many different investments so that no single loss can sink you." },
    { term: "dividend", definition: "A share of a company's profits paid directly to its shareholders, often every few months." },
    { term: "capital gain", definition: "The profit you earn when you sell an investment for more than you paid for it." },
    { term: "volatility", definition: "How much an investment's price swings up and down; short-term swings are normal, not always a reason to panic." },
    { term: "index fund", definition: "A fund that tries to match a market index like the S&P 500 by buying the whole list, keeping costs very low." },
    { term: "expense ratio", definition: "A fund's yearly fee, shown as a percentage of your money; even small fees compound into big losses over decades." },
    { term: "risk tolerance", definition: "How much loss you can handle emotionally and financially, shaped by both your feelings and your time horizon." },
    { term: "dollar-cost averaging", definition: "Investing a fixed amount on a regular schedule no matter the price, so you buy more shares when prices are low." },
    { term: "bear market", definition: "A period when prices fall significantly, usually a drop of 20% or more from a recent high, driven by fear." },
    { term: "bull market", definition: "A long stretch when prices are rising and optimism is high, and money flows into the market." },
    { term: "IPO", definition: "An Initial Public Offering, when a company first sells its shares to the public; afterward shares trade on exchanges." },
    { term: "maturity", definition: "The date a bond ends and the issuer repays your face value; until then you collect the coupon interest." },
  ],

  // Unit 5 - Banking Systems
  "unit-4": [
    { term: "checking account", definition: "Your everyday spending account with a debit card and unlimited transactions, but it pays almost no interest." },
    { term: "savings account", definition: "An account for money you don't need right now that pays higher interest for leaving it parked, with no debit card." },
    { term: "APY", definition: "Annual percentage yield, the yearly interest rate you earn on savings, including compounding; higher is better." },
    { term: "FDIC", definition: "A U.S. government agency that guarantees your bank deposits up to a legal limit if an insured bank fails." },
    { term: "overdraft fee", definition: "A charge (often around $35) when you spend more than your checking balance and the bank covers the shortfall." },
    { term: "spread", definition: "The gap between the low interest a bank pays on deposits and the higher rate it charges borrowers; a core source of bank profit." },
    { term: "fractional reserve", definition: "Banking where the bank keeps only a fraction of deposits on hand and lends the rest, since not everyone withdraws at once." },
    { term: "interchange", definition: "A small fee (about 1%-3%) a merchant's bank pays each time you swipe a card, quietly funding 'free' checking and rewards." },
    { term: "certificate of deposit", definition: "A savings product that locks money for a set term at a higher fixed rate but charges a penalty for early withdrawal." },
    { term: "high-yield savings account", definition: "A savings account, often at an online bank, that pays much higher interest (like 4%-5%) than a big traditional bank." },
    { term: "NCUA", definition: "The agency that insures credit union deposits up to $250,000, giving equivalent coverage to the FDIC at banks." },
    { term: "overdraft protection", definition: "A feature that links checking to savings or a credit line to cover a shortfall, often for a smaller transfer fee." },
    { term: "direct deposit", definition: "Having your paycheck sent automatically into your account; it often waives monthly maintenance fees." },
  ],

  // Unit 6 - Credit & Debt
  "unit-5": [
    { term: "credit score", definition: "A number that summarizes how reliably you repay borrowed money, which lenders use to decide whether to lend to you and at what rate." },
    { term: "FICO", definition: "The most widely used credit-scoring model; it turns your credit history into a single score, weighting payment history most heavily and ignoring your income." },
    { term: "payment history", definition: "Whether you pay your bills on time; it is the single biggest factor in a credit score, about 35%, so one missed payment can hurt for years." },
    { term: "credit utilization", definition: "The share of your available credit you're using. Carrying $900 on a $1,000 limit is 90% utilization, which lenders view as risky." },
    { term: "APR", definition: "The annual percentage rate, or yearly cost of borrowing on a loan or credit card, expressed as a percentage of what you owe." },
    { term: "APY", definition: "The annual percentage yield, the yearly rate your money earns once compounding is included; the saving-side counterpart to APR." },
    { term: "compound interest", definition: "Interest charged (or earned) on both the original amount and previously accumulated interest, so unpaid debt can snowball quickly." },
    { term: "grace period", definition: "The window after a statement closes during which you can pay your full balance and owe zero interest; cash advances often have none." },
    { term: "revolving credit", definition: "Credit like a credit card that gives you a limit you can borrow against, repay, and borrow again, rather than a fixed one-time loan." },
    { term: "minimum payment", definition: "The smallest amount a lender lets you pay each month; paying only this keeps you in debt and racks up interest." },
    { term: "debt-to-income", definition: "The share of your monthly income that goes to debt payments; a rising ratio is an early warning sign of financial trouble." },
    { term: "collateral", definition: "An asset a borrower pledges on a secured loan that the lender can take if the loan isn't repaid." },
    { term: "credit report", definition: "A detailed record of your borrowing and repayment history that lenders and scoring models draw on to judge your creditworthiness." },
    { term: "bankruptcy", definition: "A legal process for people who can't repay their debts; it offers relief but severely damages credit for years." },
  ],

  // Unit 7 - Insurance & Protection
  "unit-35": [
    { term: "premium", definition: "The amount you pay regularly to keep insurance coverage active, whether or not you ever file a claim." },
    { term: "deductible", definition: "The amount you pay out of pocket before the insurer starts paying on a claim." },
    { term: "risk pooling", definition: "The core idea of insurance: many people pay small premiums into a shared pool that covers the large losses of the unlucky few." },
    { term: "coinsurance", definition: "A percentage of a bill you pay after meeting your deductible, with the insurer paying the rest (e.g., you 20%, insurer 80%)." },
    { term: "co-pay", definition: "A small fixed fee you pay for a specific service, like $25 to see a doctor, with insurance covering the rest." },
    { term: "out-of-pocket maximum", definition: "A yearly cap on your health spending; once you hit it, the insurer pays 100% of covered costs." },
    { term: "coverage limit", definition: "The most an insurer will pay for a claim; a too-low limit leaves you exposed on a big loss." },
    { term: "liability coverage", definition: "Insurance that pays for injuries and damage you cause to others; it's the legally required core of an auto policy." },
    { term: "collision", definition: "Auto coverage that pays to repair or replace your own car after a crash, regardless of fault." },
    { term: "comprehensive", definition: "Auto coverage for non-crash damage like theft, vandalism, hail, fire, or hitting an animal." },
    { term: "renters insurance", definition: "Cheap coverage that protects your belongings and you, the tenant, but not the building, which the landlord insures." },
    { term: "replacement cost", definition: "Coverage that pays what it takes to buy a new equivalent item, rather than actual cash value which subtracts depreciation." },
    { term: "term life insurance", definition: "Life insurance that covers you for a set period and pays out only if you die during that term; it's inexpensive." },
    { term: "death benefit", definition: "The lump sum a life insurance policy pays to your beneficiaries when you die, to replace income and cover debts." },
  ],

  // Unit 8 - Introduction to Investing
  "unit-6": [
    { term: "diversification", definition: "Spreading money across many investments so no single loss wrecks you; experts call it the closest thing to a free lunch in investing." },
    { term: "compounding", definition: "Growth stacking on earlier growth over time, so money left invested earns returns on its returns; more years and a higher rate both amplify it." },
    { term: "compound interest", definition: "Interest earned on both your original money and the interest it has already generated, driving long-term investment growth." },
    { term: "opportunity cost", definition: "What you give up by choosing one option over another; the true cost of spending $500 is whatever that money could have grown into if invested." },
    { term: "time value of money", definition: "The idea that money available now is worth more than the same amount later, because it can be invested and grow." },
    { term: "index fund", definition: "A low-cost fund that holds a broad basket of investments to track a market, giving beginners instant diversification cheaply." },
    { term: "expense ratio", definition: "The yearly fee a fund charges, shown as a percentage of your money; small differences compound into huge amounts over decades." },
    { term: "dollar-cost averaging", definition: "Investing a fixed amount on a regular schedule regardless of price, which removes emotion and buys more shares when prices are low." },
    { term: "real return", definition: "Your investment gain after subtracting inflation; it shows whether your buying power actually grew, unlike the raw nominal return." },
    { term: "nominal return", definition: "The raw percentage your money earns before accounting for inflation." },
    { term: "inflation", definition: "The gradual rise in prices that erodes the buying power of money, making 'safe' cash quietly lose value over time." },
    { term: "volatility", definition: "How much an investment's price swings up and down; higher volatility means bigger short-term ups and downs." },
    { term: "dividend", definition: "A share of a company's profits paid out to shareholders, one way stocks return money to investors." },
    { term: "portfolio", definition: "The overall collection of investments a person holds, such as a mix of stocks, bonds, and cash." },
  ],

  // Unit 9 - Stocks Explained
  "unit-7": [
    { term: "share", definition: "A unit of ownership in a company. Owning one makes you a partial owner entitled to a slice of its profits and growth." },
    { term: "shareholder", definition: "Someone who owns shares of a company, making them a partial owner with rights like voting and receiving dividends." },
    { term: "capital gain", definition: "The profit you make from selling a share for more than you paid for it." },
    { term: "dividend", definition: "A portion of a company's profits paid out to shareholders in cash, usually every three months." },
    { term: "dividend yield", definition: "The yearly dividend divided by the share price, shown as a percent, letting you compare income across stocks." },
    { term: "IPO", definition: "An Initial Public Offering, the first time a private company sells its shares to the public and becomes publicly traded." },
    { term: "market cap", definition: "A company's total value, found by multiplying its share price by the number of shares that exist." },
    { term: "liquidity", definition: "How quickly and easily an investment can be turned into cash at a fair price." },
    { term: "volatility", definition: "A measure of how much and how fast a stock's price swings up and down in either direction." },
    { term: "market order", definition: "An order to buy or sell right now at the best available price; it fills fast but you don't control the exact price." },
    { term: "limit order", definition: "An order that only fills at your chosen price or better, giving you price control but no guarantee it executes." },
    { term: "spread", definition: "The gap between the bid (highest price buyers offer) and the ask (lowest price sellers accept)." },
    { term: "P/E ratio", definition: "Price-to-earnings ratio: the share price divided by earnings per share, gauging how expensive a stock is relative to its profit." },
    { term: "buyback", definition: "When a company purchases its own shares off the market, shrinking supply and often lifting the price." },
  ],

  // Unit 10 - Stock Market System
  "unit-8": [
    { term: "stock exchange", definition: "An organized, regulated marketplace that matches share buyers with sellers, such as the NYSE or Nasdaq." },
    { term: "market maker", definition: "A firm that always stands ready to buy or sell a stock, quoting a bid and ask and earning the spread between them." },
    { term: "spread", definition: "The gap between a market maker's buy price (bid) and sell price (ask); it's a small cost you pay on every trade." },
    { term: "liquidity", definition: "How easily shares can be turned into cash quickly without moving the price much; high volume and narrow spreads signal it." },
    { term: "bull market", definition: "A sustained stretch of generally rising prices and investor optimism across the whole market." },
    { term: "bear market", definition: "A sustained stretch of falling prices, commonly defined as a drop of at least 20% from a recent high." },
    { term: "after-hours", definition: "Trading on electronic networks after the 4:00 p.m. close, with thin liquidity, wide spreads, and jumpy prices." },
    { term: "circuit breaker", definition: "An automatic, temporary halt in trading triggered when prices fall too far too fast, meant to slow a panic-driven crash." },
    { term: "insider trading", definition: "Buying or selling a stock based on material, nonpublic secret information; it is illegal and can bring fines or prison." },
    { term: "SEC", definition: "The Securities and Exchange Commission, the U.S. agency that regulates markets, forces company disclosure, and punishes fraud." },
    { term: "disclosure", definition: "The SEC requirement that public companies honestly report their earnings, debts, and risks so investors can decide informed." },
    { term: "market index", definition: "A single number that tracks how a group of stocks is doing, like a scoreboard for the market." },
    { term: "S&P 500", definition: "A market index tracking 500 of the largest U.S. companies; it's the benchmark professionals watch most." },
    { term: "trading volume", definition: "The number of shares that change hands in a period; high volume signals strong liquidity or important news." },
  ],

  // Unit 11 - Portfolio Construction
  "unit-9": [
    { term: "asset allocation", definition: "How you divide your money across categories like stocks and bonds. It's the single biggest driver of how much your portfolio grows and swings." },
    { term: "risk tolerance", definition: "How much loss you can handle emotionally and financially without panic-selling. It should shape your stock-vs-bond mix." },
    { term: "diversification", definition: "Spreading money across many companies and industries so one failure barely dents your portfolio." },
    { term: "dollar-cost averaging", definition: "Investing a fixed amount on a regular schedule regardless of price, which buys more shares when prices are low and fewer when high." },
    { term: "rebalancing", definition: "Periodically selling what has grown too large and buying what has shrunk to restore your target allocation." },
    { term: "index fund", definition: "A low-cost fund that holds all the companies in a market index, giving instant diversification and matching the market's return." },
    { term: "index investing", definition: "The strategy of buying broad index funds to match the market instead of trying to beat it by picking stocks." },
    { term: "risk management", definition: "Strategies like diversification, allocation, and bonds used to limit how badly big market losses can hurt you." },
    { term: "time horizon", definition: "How long until you need the money. A longer horizon lets you hold more stocks and ride out crashes." },
    { term: "benchmark", definition: "A market index like the S&P 500 used to judge whether your investments are actually performing well." },
    { term: "compounding", definition: "When your gains earn their own gains over time, so wealth snowballs faster the longer you stay invested." },
    { term: "net worth", definition: "The total value of what you own minus what you owe; growing it steadily is the goal of long-term wealth building." },
  ],

  // Unit 12 - ETFs & Mutual Funds
  "unit-10": [
    { term: "ETF", definition: "An exchange-traded fund: a basket of many investments that trades all day on an exchange like a single stock." },
    { term: "mutual fund", definition: "A pooled fund priced once per day after the close, rather than trading live on an exchange like an ETF." },
    { term: "expense ratio", definition: "The yearly percentage a fund charges to run itself. Even small differences compound into huge sums over decades." },
    { term: "index fund", definition: "A fund that simply holds every company in an index, offering broad diversification at rock-bottom cost." },
    { term: "net asset value", definition: "The total worth of a mutual fund's holdings divided by its shares; the once-a-day price at which mutual fund orders fill." },
    { term: "load", definition: "A sales commission of several percent charged just to buy or sell some mutual funds. Smart investors choose no-load funds." },
    { term: "diversification", definition: "Owning many companies at once through a fund so a single company's collapse barely affects you." },
    { term: "actively managed", definition: "A fund where managers pick investments trying to beat the market, usually charging higher fees for the effort." },
    { term: "tracking error", definition: "How far a fund's return drifts from the index it's supposed to mirror; lower is better for an index fund." },
    { term: "prospectus", definition: "The official document disclosing a fund's holdings, strategy, and fees so you can check them before buying." },
    { term: "dividend", definition: "A share of company profits paid out to fund holders, adding to the return you earn from owning the fund." },
  ],

  // Unit 13 - Bonds & Fixed Income
  "unit-11": [
    { term: "bond", definition: "A loan you make to a government or company that pays you fixed interest and returns your money at a set date." },
    { term: "fixed income", definition: "Investments like bonds whose payments and payback date are known in advance, unlike a stock's uncertain value." },
    { term: "coupon", definition: "The interest rate a bond pays. A $1,000 bond with a 5% coupon pays $50 a year." },
    { term: "face value", definition: "The amount, often $1,000, that a bond repays at maturity. Also called par." },
    { term: "maturity", definition: "The date when a bond returns your principal, which might be 2, 10, or 30 years out." },
    { term: "principal", definition: "The original amount you lent, returned to you in full when the bond matures." },
    { term: "yield", definition: "The return a bond gives at its current price. Rising yields usually mean bond prices have fallen." },
    { term: "yield to maturity", definition: "The fuller return measure combining all coupons plus any gain or loss versus face value if you hold to the end." },
    { term: "duration", definition: "A number in years measuring how sensitive a bond's price is to rate changes; a duration of 5 drops about 5% if rates rise 1%." },
    { term: "default", definition: "When a borrower can't pay you back. Riskier borrowers must offer higher coupons to compensate for this danger." },
    { term: "investment grade", definition: "A rating marking bonds from solid, reliable borrowers judged unlikely to default." },
    { term: "junk bond", definition: "A low-rated bond from a shaky borrower that pays a high coupon to compensate for its higher default risk." },
    { term: "treasury", definition: "A bond issued by the U.S. government, considered extremely safe because it almost never defaults." },
    { term: "corporate bond", definition: "A bond issued by a company, paying more than a treasury because companies carry more default risk." },
  ],

  // Unit 14 - Financial Statements
  "unit-12": [
    { term: "income statement", definition: "A statement covering a period that starts with revenue and subtracts costs down to net income, showing whether a company made money." },
    { term: "revenue", definition: "The total money a company brings in from selling its products or services, before any costs are subtracted - the 'top line.'" },
    { term: "net income", definition: "The final profit left after every cost - COGS, operating expenses, interest, and taxes - is subtracted from revenue. The 'bottom line.'" },
    { term: "COGS", definition: "Cost of goods sold: the direct cost of producing the goods actually sold, like materials and production labor, but not rent or marketing." },
    { term: "gross profit", definition: "What is left after subtracting COGS from revenue - the money remaining after covering the direct cost of making a product." },
    { term: "gross margin", definition: "Gross profit as a percentage of revenue, showing how many cents of each sales dollar survive after making the product." },
    { term: "operating expenses", definition: "The costs of running the business day to day - salaries, rent, marketing, and R&D - separate from the direct cost of making the product." },
    { term: "operating income", definition: "Gross profit minus operating expenses; it shows core business performance before the effects of interest and taxes." },
    { term: "profit margin", definition: "Profit divided by revenue, shown as a percentage, revealing how efficiently a company turns each dollar of sales into profit." },
    { term: "EPS", definition: "Earnings per share: net income divided by the number of shares outstanding, showing the profit belonging to each share of ownership." },
    { term: "balance sheet", definition: "A snapshot on one specific date of what a company owns (assets), owes (liabilities), and the owners' leftover value (equity)." },
    { term: "equity", definition: "The owners' leftover value in a company - assets minus liabilities - including money invested plus retained earnings." },
    { term: "liquidity", definition: "How quickly an asset can be turned into cash without losing value; cash is fully liquid, while a specialized factory is illiquid." },
    { term: "free cash flow", definition: "Operating cash flow minus capital expenditures - the cash left over after running and maintaining the business." },
  ],

  // Unit 15 - Financial Ratios
  "unit-13": [
    { term: "P/E", definition: "The price-to-earnings ratio: stock price divided by earnings per share, showing how many dollars you pay for each dollar of annual earnings." },
    { term: "EPS", definition: "Earnings per share: net income divided by shares outstanding, revealing how much profit belongs to each single share of ownership." },
    { term: "value trap", definition: "A stock that looks cheap by its P/E but keeps declining because the underlying business is genuinely weakening." },
    { term: "diluted EPS", definition: "An EPS figure that counts potential future shares like options and convertible bonds; it is usually lower and the more conservative measure." },
    { term: "debt-to-equity ratio", definition: "Total liabilities divided by total equity, measuring how much a company relies on borrowing versus owners' money." },
    { term: "leverage", definition: "Using borrowed money to do more than a company's own funds allow; it amplifies both gains and losses for shareholders." },
    { term: "profit margin", definition: "Profit divided by revenue, shown as a percentage, measuring how many cents of each sales dollar become profit." },
    { term: "net margin", definition: "The final bottom-line profit after everything - interest, taxes, and all costs - shown as a percentage of revenue." },
    { term: "ROE", definition: "Return on equity: net income divided by shareholders' equity, showing how much profit a company generates per dollar of owners' money." },
    { term: "price-to-sales", definition: "Market capitalization divided by annual revenue; it can value even unprofitable firms where the P/E fails." },
    { term: "market capitalization", definition: "A company's total market value, calculated as share price times the number of shares outstanding." },
    { term: "valuation multiple", definition: "A ratio relating a company's price to a measure like earnings, sales, book value, or cash flow, so companies of any size compare fairly." },
    { term: "price-to-book", definition: "A multiple comparing price to equity, popular for banks and asset-heavy businesses where the balance sheet drives value." },
    { term: "EV-to-EBITDA", definition: "A multiple favored for comparing firms with different debt levels, since it accounts for both equity and debt." },
  ],

  // Unit 16 - Valuation
  "unit-14": [
    { term: "free cash flow", definition: "The money left after a company pays to run and maintain itself - the real, hard-to-fake cash available to reward owners." },
    { term: "moat", definition: "A durable competitive advantage - like a strong brand, network effect, or patents - that protects a company's profits from competitors." },
    { term: "network effect", definition: "A moat where a product grows more valuable as more people use it, making a marketplace or app hard to leave." },
    { term: "switching costs", definition: "A moat that traps customers who would face hassle or expense to change, such as a business built around one software system." },
    { term: "growth investing", definition: "Buying companies expected to expand sales and profits much faster than average, and paying a high price today for that future." },
    { term: "value investing", definition: "Buying solid companies trading cheaply relative to their fundamentals, favoring low P/E stocks the market has overlooked." },
    { term: "margin of safety", definition: "Buying at a price well below your estimate of a company's true worth, giving a cushion in case your estimate is wrong." },
    { term: "P/E ratio", definition: "Share price divided by yearly profit per share; a high P/E reflects big expectations for future growth." },
    { term: "expectations", definition: "The future profits already baked into a stock's price; stocks move on whether results beat or miss these, not just on good or bad news." },
    { term: "DCF", definition: "Discounted cash flow: a method that estimates a company's value as all the future cash it will generate, discounted back to today." },
    { term: "intrinsic value", definition: "What a company is actually worth based on the cash it will generate over its lifetime, as opposed to its market price." },
    { term: "terminal value", definition: "In a DCF, the value capturing all cash beyond the detailed forecast period, treated as a steadily growing stream and discounted to today." },
    { term: "market price", definition: "What the last buyer and seller agreed on for a stock right now, which can drift above or below intrinsic value." },
    { term: "compounding", definition: "Earning returns on your past returns, so growth accelerates over time; at about 10% a year money roughly doubles every seven years." },
  ],

  // Unit 17 - Behavioral Economics
  "unit-15": [
    { term: "loss aversion", definition: "The tendency for losses to feel roughly twice as painful as equal-sized gains feel good, making people avoid 'realizing' a loss." },
    { term: "disposition effect", definition: "Loss aversion in action: selling winning stocks too early to lock in gains while clinging to losing stocks far too long." },
    { term: "endowment effect", definition: "Once something feels like yours, you overvalue it and hate giving it up, a close cousin of loss aversion." },
    { term: "anchoring", definition: "Relying too heavily on the first number you see as a reference point for later judgments, even when it is arbitrary." },
    { term: "confirmation bias", definition: "Favoring information that agrees with what you already believe while ignoring or dismissing evidence that challenges it." },
    { term: "echo chamber", definition: "A feed or group that reflects your own opinions back at you, filtering out disagreement and inflating your certainty." },
    { term: "overconfidence", definition: "Overrating your own knowledge, skill, or luck, which drives overtrading and oversized bets on single ideas." },
    { term: "hindsight bias", definition: "The illusion after an event that you 'knew it all along,' which makes the future feel more predictable than it is." },
    { term: "herd behavior", definition: "Copying what a large group is doing, especially under uncertainty, which can detach prices from a company's real value." },
    { term: "FOMO", definition: "The fear of missing out: anxiety that others are seizing an opportunity you're missing, pushing you to buy on emotion near the top." },
    { term: "survivorship bias", definition: "Seeing only the winners who post their gains while the many who lost stay silent, making risky bets look safer than they are." },
    { term: "dollar-cost averaging", definition: "Investing a fixed amount on a regular schedule regardless of headlines, which removes the urgency that FOMO feeds on." },
    { term: "emotional trading", definition: "Making buy and sell decisions based on feelings like fear, greed, or panic instead of facts and a plan." },
    { term: "diversification", definition: "Spreading money across many companies and assets so no single mistake or bias can ruin you." },
  ],

  // Unit 18 - Bubbles & Crashes
  "unit-16": [
    { term: "speculative bubble", definition: "A run-up where people stop caring what an asset is worth and buy only because they expect someone to pay more tomorrow, then it crashes." },
    { term: "Tulip Mania", definition: "The 1630s Dutch craze where rare tulip bulbs briefly traded for the price of a house, the first well-documented speculative bubble." },
    { term: "greater fool", definition: "Buying an overpriced asset with no interest in its real use, betting only that another buyer will pay even more later." },
    { term: "dot-com bubble", definition: "The late-1990s frenzy for internet stocks that soared on 'eyeballs' and hype; the Nasdaq then fell about 78% by late 2002." },
    { term: "this time is different", definition: "A classic, expensive bubble slogan claiming old valuation rules like profits no longer apply to a hot new market." },
    { term: "subprime", definition: "Mortgages given to borrowers with weak credit, often with no down payment and low teaser rates that later jumped." },
    { term: "leverage", definition: "Using borrowed money to invest, which magnifies gains on the way up but can wipe you out on the way down." },
    { term: "systemic risk", definition: "When the failure of one part of the financial system endangers the entire system, toppling institutions like dominoes." },
    { term: "K-shaped", definition: "A recovery pattern where some sectors boom while others collapse, as tech soared and travel cratered in 2020." },
    { term: "displacement", definition: "In Minsky's model, a real change like new technology or low rates that creates the genuine early opportunity a bubble later exaggerates." },
    { term: "euphoria", definition: "The bubble stage where caution disappears and 'this time is different' thinking rules as prices detach from value." },
    { term: "correction", definition: "A market decline of 10% or more from a recent high, occurring on average about once a year and usually lasting a few months." },
    { term: "pullback", definition: "An ordinary market dip of about 5% to 10% that happens several times a year." },
    { term: "bear market", definition: "A more serious market drop of 20% or more, arriving roughly every few years." },
  ],

  // Unit 19 - Inflation & Rates (Macro)
  "unit-17": [
    { term: "inflation", definition: "A broad, ongoing rise in the overall level of prices, which means each dollar you hold buys a little less over time." },
    { term: "deflation", definition: "A general fall in prices, which sounds nice but can be dangerous because people delay purchases and the economy can stall." },
    { term: "purchasing power", definition: "How much your money can actually buy; inflation steadily erodes it even though the dollar amount stays the same." },
    { term: "CPI", definition: "The Consumer Price Index, which tracks the cost of a fixed basket of goods a typical household buys to measure inflation." },
    { term: "core CPI", definition: "A version of CPI that strips out volatile food and energy prices to reveal the steadier underlying inflation trend." },
    { term: "Federal Reserve", definition: "The U.S. central bank, whose dual mandate is stable prices and maximum sustainable employment." },
    { term: "federal funds rate", definition: "The interest rate banks charge each other overnight; the Fed's main lever, which ripples through borrowing costs across the economy." },
    { term: "monetary policy", definition: "Actions a central bank takes to manage money and credit, mainly to control inflation and support jobs." },
    { term: "fiscal policy", definition: "Congress and the President's use of taxes and government spending to stimulate or slow the economy." },
    { term: "quantitative easing", definition: "A tool where the Fed creates money to buy bonds and hold long-term rates down during crises." },
    { term: "soft landing", definition: "Slowing the economy just enough to cool inflation without triggering a recession or mass layoffs." },
    { term: "recession", definition: "A significant, widespread decline in economic activity; high rates used to fight inflation can occasionally tip the economy into one." },
    { term: "yield curve", definition: "The relationship between short- and long-term bond yields; when it inverts it has preceded nearly every recent U.S. recession." },
    { term: "duration", definition: "Roughly how long until a bond returns your money; long-term bonds swing far more in price when rates change." },
  ],

  // Unit 20 - Economic Indicators
  "unit-18": [
    { term: "GDP", definition: "Gross Domestic Product, the total dollar value of all final goods and services a country produces, the broadest gauge of economic size." },
    { term: "real GDP", definition: "GDP adjusted to strip out inflation, so growth reflects actual increases in production rather than just higher prices." },
    { term: "GDP per capita", definition: "GDP divided by population, giving a rough sense of average output and income per person for comparing living standards." },
    { term: "unemployment rate", definition: "The share of people who want a job and are actively looking but cannot find one, out of the whole labor force." },
    { term: "labor force", definition: "Everyone who is either working or actively seeking work; you must be in it to count as unemployed." },
    { term: "full employment", definition: "A low unemployment rate near 4%, not literally zero, since some frictional job-switching always exists." },
    { term: "consumer confidence", definition: "A survey-based measure of how optimistic people feel about their finances and the economy, which drives spending." },
    { term: "leading indicator", definition: "An economic measure that changes before the economy does, offering a preview of where things are heading." },
    { term: "lagging indicator", definition: "An economic measure that changes after the economy has already turned, confirming what happened rather than predicting it." },
    { term: "coincident", definition: "An indicator that moves roughly in step with the economy, showing its current state." },
    { term: "retail sales", definition: "The total dollar value of goods sold by stores and online sellers, a direct window into consumer spending and economic health." },
    { term: "housing starts", definition: "The number of new homes builders begin, one of several rate-sensitive housing measures that lead the economy." },
    { term: "building permits", definition: "Approvals to build homes that hint at future construction, counted among the official leading economic indicators." },
    { term: "wealth effect", definition: "When rising home or asset values make people feel richer and spend more, and falling values make them cut back." },
  ],

  // Unit 21 - Starting a Business
  "unit-19": [
    { term: "revenue model", definition: "The plan for how a business turns what it does into money coming in, deciding who pays, how much, and how often." },
    { term: "recurring revenue", definition: "Income a business earns predictably on a schedule, such as monthly subscriptions, rather than hunting for a fresh sale each time." },
    { term: "freemium", definition: "A model that gives a basic version away free to attract users, then charges for premium upgrades." },
    { term: "churn", definition: "The percentage of subscription customers who cancel each period; high churn quietly drains the customer base." },
    { term: "conversion rate", definition: "The share of free users (or visitors) who upgrade to a paid plan or make a purchase." },
    { term: "fixed costs", definition: "Costs like rent, insurance, and salaries that stay the same no matter how much you sell." },
    { term: "variable costs", definition: "Costs like materials and shipping that rise and fall directly with how much you produce or sell." },
    { term: "contribution margin", definition: "The money left from each sale after paying its variable cost; it goes toward covering fixed costs, then becomes profit." },
    { term: "operating leverage", definition: "The effect where, once fixed costs are covered, each extra sale past break-even is mostly pure profit." },
    { term: "break-even point", definition: "The sales level where total revenue exactly equals total cost, with zero profit and zero loss." },
    { term: "gross margin", definition: "Revenue minus the direct cost of goods sold, divided by revenue; shows whether each sale makes money before overhead." },
    { term: "net margin", definition: "Profit left after every cost including rent, salaries, marketing, and taxes, divided by revenue; the true bottom line." },
    { term: "bootstrapping", definition: "Funding a business from personal savings and early sales rather than outside money, keeping full control but limiting growth speed." },
    { term: "value-based pricing", definition: "Setting price by how much the product is worth to the customer rather than by what it costs to make." },
    { term: "price elasticity", definition: "How much demand changes when price changes; elastic products lose buyers fast, inelastic ones keep selling." },
  ],

  // Unit 22 - Competitive Strategy
  "unit-20": [
    { term: "market share", definition: "One company's slice of total sales in a market, used as a scorecard for who is winning customers." },
    { term: "price war", definition: "When rivals repeatedly cut prices to grab customers, leaving everyone in the market earning less." },
    { term: "switching costs", definition: "The hassle or loss customers face to leave a product, which locks them in and helps defend market share." },
    { term: "pricing power", definition: "A company's ability to raise prices without losing many customers, a clear sign of a strong business." },
    { term: "inelastic", definition: "Demand that barely changes when price rises, so customers keep buying even as the product gets more expensive." },
    { term: "profit margins", definition: "Profit as a share of revenue; high, steady margins over time are a fingerprint of pricing power." },
    { term: "economies of scale", definition: "When the cost to make each unit falls as a company produces more, mainly by spreading fixed costs and buying in bulk." },
    { term: "diseconomies of scale", definition: "When a firm grows so large that bureaucracy, poor communication, and waste push per-unit costs back up." },
    { term: "network effect", definition: "When a product becomes more valuable to each user as more people use it, like a messaging app." },
    { term: "critical mass", definition: "The tipping point where a network is valuable enough that growth becomes self-sustaining and users recruit each other." },
    { term: "brand value", definition: "The extra worth a trusted name adds beyond the physical product, built from trust, emotion, and consistent quality." },
    { term: "premium pricing", definition: "Charging extra because customers will pay more for the trust and status a strong brand carries." },
    { term: "moat", definition: "A sustainable competitive advantage that protects a company's profits from rivals for a long time." },
    { term: "barriers to entry", definition: "Obstacles like high startup costs, patents, or licenses that keep new competitors out and protect existing profits." },
  ],

  // Unit 23 - Business Management & Strategy
  "unit-26": [
    { term: "efficiency", definition: "Doing things without wasting resources, getting the most output from the least input." },
    { term: "effectiveness", definition: "Doing the right things, pursuing goals that actually matter." },
    { term: "controlling", definition: "The management function of measuring actual results against the plan and adjusting; a feedback loop." },
    { term: "situational leadership", definition: "Adapting your leadership style to the task, deadline, and how skilled and motivated the team is." },
    { term: "span of control", definition: "How many people report directly to one manager; narrow spans mean close supervision, wide spans mean fewer managers." },
    { term: "chain of command", definition: "The path authority follows from the top of a company down to frontline workers, showing who answers to whom." },
    { term: "matrix structure", definition: "A structure where an employee reports to two bosses at once, often a functional manager and a project manager." },
    { term: "SWOT analysis", definition: "A grid of Strengths, Weaknesses, Opportunities, and Threats used to size up a decision before making it." },
    { term: "Porter's Five Forces", definition: "A framework judging how profitable an industry is based on five competitive pressures squeezing it." },
    { term: "barriers to entry", definition: "Obstacles like huge startup costs, patents, or licenses that keep new competitors out and protect existing profits." },
    { term: "KPI", definition: "A Key Performance Indicator, a specific number a business tracks to see whether it is hitting its goals." },
    { term: "vanity metric", definition: "A number like social-media likes that feels good but doesn't drive real results, so it isn't a true KPI." },
    { term: "retention", definition: "Keeping good employees so they stay, which avoids the high cost of turnover." },
    { term: "compensation", definition: "An employee's full pay package: wages or salary plus benefits like insurance, retirement, and paid time off." },
    { term: "stakeholder", definition: "Anyone affected by the business, including employees, customers, suppliers, the community, and the environment, not just owners." },
    { term: "reputational risk", definition: "The danger that unethical behavior destroys the hard-earned trust a company depends on, sometimes overnight." },
  ],

  // Unit 24 - Marketing
  "unit-27": [
    { term: "marketing concept", definition: "The approach of finding what customers want and delivering it better than rivals, instead of just making something and pushing hard to sell it." },
    { term: "target market", definition: "The specific group of people most likely to want and buy your product, so you can focus your money and message on them." },
    { term: "segmentation", definition: "Dividing a large market into smaller groups of people who share similar traits, so you can choose which group to serve." },
    { term: "demographics", definition: "Measurable facts about who people are, such as age, gender, income, education, and location." },
    { term: "psychographics", definition: "The values, interests, lifestyle, and attitudes that explain why people buy, going deeper than demographic facts." },
    { term: "buyer persona", definition: "A detailed, semi-fictional portrait of your ideal customer, giving them a name, habits, and worries to design products and messages around." },
    { term: "primary research", definition: "New information you collect yourself directly from your target audience through surveys, interviews, focus groups, or observation." },
    { term: "secondary research", definition: "Existing information others already gathered, such as government data, industry reports, or competitor websites; fast and often free." },
    { term: "leading question", definition: "A survey question worded to nudge people toward the answer you want, producing biased data instead of honest feedback." },
    { term: "differentiation", definition: "What makes your product meaningfully different from and better than rivals in the customer's eyes, so you avoid competing on price alone." },
    { term: "value-based pricing", definition: "Setting the price based on what the product is worth to the customer rather than what it cost to make, often earning the most profit." },
    { term: "penetration pricing", definition: "Launching a product cheap to grab market share fast, then raising the price later; good for entering a crowded market." },
    { term: "distribution channels", definition: "The path a product travels to reach buyers, whether directly from the maker or through wholesalers and retailers." },
    { term: "brand equity", definition: "The extra value a product gains simply because of its brand, letting a company charge more than for an identical unbranded item." },
  ],

  // Unit 25 - Consumer Behavior
  "unit-28": [
    { term: "consumer behavior", definition: "The study of how and why people choose, buy, use, and discard products, built on psychology, economics, and culture." },
    { term: "perceived value", definition: "How much worth a buyer feels they get for their money, which can be far higher than the actual cost and decides whether they buy." },
    { term: "buyer's remorse", definition: "The regret or worry a buyer feels after a purchase, strongest on expensive items; firms fight it with follow-ups and easy returns." },
    { term: "high-involvement", definition: "A purchase with high cost and risk, like a car or phone, that pushes buyers to research for weeks and compare many options." },
    { term: "heuristics", definition: "Mental shortcuts or rules of thumb buyers use to decide quickly, such as 'expensive means good quality.'" },
    { term: "social proof", definition: "The bias that eases doubt because people trust the crowd, as in 'everyone is buying this' or '18 people are viewing this.'" },
    { term: "scarcity", definition: "A tactic that creates urgency and fear of missing out by signaling limited supply, like 'Only 3 left in stock.'" },
    { term: "anchoring", definition: "Placing a higher price next to a lower one so the actual price feels cheap by comparison, like a crossed-out $260 beside $180." },
    { term: "loss aversion", definition: "The tendency to fear losing something more than valuing an equal gain, which is why 'Don't miss out' outperforms 'Come save.'" },
    { term: "reference groups", definition: "The people you compare yourself to, like your friend circle, whose choices pressure you to match them." },
    { term: "status symbols", definition: "Products bought mainly to signal success or social standing, like a luxury watch, beyond their pure function." },
    { term: "opinion leaders", definition: "Trusted people, such as influencers or reviewers, whose recommendations carry great weight because people trust people more than ads." },
    { term: "subculture", definition: "A smaller group within a culture united by age, region, interest, or belief, with its own tastes that reward authentic marketing." },
    { term: "behavioral segmentation", definition: "Grouping buyers by how they act toward a product: purchase frequency, loyalty, benefits sought, and timing." },
  ],

  // Unit 26 - The Marketing Mix (4 Ps)
  "unit-29": [
    { term: "marketing mix", definition: "The set of controllable choices a business makes to sell a product, organized as Product, Price, Place, and Promotion." },
    { term: "4 Ps", definition: "The four levers of the marketing mix - Product, Price, Place, and Promotion - that must stay consistent with each other and the customer." },
    { term: "core product", definition: "The basic benefit the buyer really wants, like the holes a drill delivers rather than the drill itself." },
    { term: "augmented product", definition: "The layer of extras around the physical item - warranty, support, delivery, returns - that often decides close purchase choices." },
    { term: "brand promise", definition: "What customers expect from a brand every time, such as safety from Volvo; keeping it consistently builds trust, breaking it erodes value." },
    { term: "product life cycle", definition: "The four stages a product ages through - Introduction, Growth, Maturity, and Decline - each needing a different marketing focus." },
    { term: "price skimming", definition: "Launching a product high to capture early adopters who pay a premium, then lowering the price over time, as new tech gadgets do." },
    { term: "charm pricing", definition: "Ending a price in .99, like $9.99 instead of $10, so it feels meaningfully cheaper because buyers anchor on the first digit." },
    { term: "elasticity", definition: "How much demand changes when price changes; necessities are inelastic while luxuries and easily-substituted goods are elastic." },
    { term: "distribution intensity", definition: "How widely a product is sold, ranging from intensive (everywhere) to selective (limited outlets) to exclusive (very few premium outlets)." },
    { term: "direct-to-consumer", definition: "A brand that sells straight to customers, usually online, skipping retailers to own the customer relationship and keep more margin." },
    { term: "omnichannel", definition: "Blending physical stores, websites, apps, and social media into one seamless experience so customers can research, buy, and pick up anywhere." },
    { term: "promotional mix", definition: "The set of promotion tools - advertising, PR, sales promotion, and personal selling - each doing a different communication job." },
    { term: "AIDA", definition: "A promotion model that guides a message to grab Attention, build Interest, create Desire, and prompt Action." },
  ],

  // Unit 27 - Market Research
  "unit-30": [
    { term: "market research", definition: "The work of gathering and studying facts about customers, competitors, and demand before spending money to build something." },
    { term: "primary research", definition: "Firsthand data you collect yourself for your exact question, such as surveys, interviews, focus groups, or observation." },
    { term: "secondary research", definition: "Information gathered by studying data someone else already collected and published, like government reports or industry statistics." },
    { term: "qualitative", definition: "Research that produces words and explanations about feelings and reasons, uncovering the 'why' behind behavior rather than countable numbers." },
    { term: "quantitative", definition: "Research that produces countable numbers, like percentages or totals, showing how many people think or do something across a large group." },
    { term: "survey", definition: "A primary research tool that asks many people the same questions to reach lots of people fast and produce countable results." },
    { term: "focus group", definition: "A small discussion of roughly six to ten people who react to ideas together, revealing shared frustrations, though one loud voice can sway the room." },
    { term: "observation", definition: "Watching what people actually do rather than what they say, which often reveals truths customers would never report about themselves." },
    { term: "sample", definition: "The group of people you study in research; it must be large enough and representative of your real customers or the results will mislead." },
    { term: "TAM", definition: "Total Addressable Market: the entire demand for a product if every possible buyer bought from you, the largest, most theoretical market figure." },
    { term: "SAM", definition: "Serviceable Addressable Market: the portion of the TAM you could actually serve given your product, location, and reach." },
    { term: "SOM", definition: "Serviceable Obtainable Market: the realistic slice you can truly win in the near term against competitors, the number you plan and budget around." },
  ],

  // Unit 28 - Leadership & Management
  "unit-31": [
    { term: "leadership", definition: "Setting direction and inspiring people toward a vision; the job of motivating a team and deciding where it should go, distinct from day-to-day management." },
    { term: "management", definition: "The job of organizing, planning, and controlling day-to-day work so that a team executes efficiently and things actually get done." },
    { term: "autocratic", definition: "A leadership style where the leader makes decisions alone and expects them followed; fast and clear in a crisis but can crush morale if overused." },
    { term: "democratic", definition: "A leadership style that shares decision-making by inviting input before choosing, boosting buy-in and better ideas but taking more time." },
    { term: "laissez-faire", definition: "A hands-off leadership style ('let it be') that gives people freedom to work as they see fit; great with skilled experts but risky with weak teams." },
    { term: "motivation", definition: "What drives people to work hard or keep trying; understanding it helps leaders inspire real effort rather than just paying people." },
    { term: "Maslow's hierarchy", definition: "Maslow's pyramid of human needs (physiological, safety, belonging, esteem, self-actualization), where people chase higher needs only once lower ones are met." },
    { term: "self-actualization", definition: "The top of Maslow's pyramid: growing into your fullest potential through challenging work that lets people do their best." },
    { term: "Herzberg", definition: "Herzberg's theory that hygiene factors (like pay and conditions) only remove dissatisfaction, while motivators (like recognition and growth) drive people to excel." },
    { term: "hygiene factors", definition: "In Herzberg's theory, things like pay, conditions, and job security that make people miserable when bad, but only get them to neutral when fixed." },
    { term: "organizational structure", definition: "How a company arranges its people and decides who reports to whom, including how many layers it has and how workers are grouped." },
    { term: "span of control", definition: "How many people one manager oversees; a narrow span means close supervision and a taller hierarchy, a wide span a flatter, more autonomous structure." },
  ],

  // Unit 29 - Strategic Analysis Tools
  "unit-32": [
    { term: "strategy", definition: "A company's deliberate plan for how it will win over the long run, including the choice of what NOT to do so it can focus and beat rivals." },
    { term: "competitive advantage", definition: "The reason customers choose you over everyone else, and why that edge is hard for rivals to copy; a durable advantage lasts, unlike a quick price cut." },
    { term: "KPI", definition: "A Key Performance Indicator: a specific, vital number a business tracks to see whether it is winning at what matters most toward its goals." },
    { term: "SWOT", definition: "A framework that sorts a business into four boxes, Strengths, Weaknesses, Opportunities, and Threats, splitting internal factors from external ones." },
    { term: "strengths", definition: "In SWOT, internal things a company controls and does well, like its skills, brand, cash, or team." },
    { term: "weaknesses", definition: "In SWOT, internal shortcomings inside a company, such as gaps in skills, weak brand, or limited resources." },
    { term: "opportunities", definition: "In SWOT, favorable external forces a company does not control, like market trends or gaps rivals leave open, that it could seize." },
    { term: "threats", definition: "In SWOT, harmful external forces a company does not control, like new competitors, changing laws, or shifting tastes." },
    { term: "Porter's Five Forces", definition: "Michael Porter's framework explaining why some industries are more profitable than others, based on five competitive forces that shape industry structure." },
    { term: "barriers to entry", definition: "Obstacles like huge startup costs, strong brands, or patents that make it hard for new competitors to join an industry, protecting existing players." },
    { term: "bargaining power", definition: "How much leverage suppliers or buyers hold; powerful suppliers can raise prices, and powerful buyers can push prices down and demand more." },
    { term: "substitutes", definition: "Different products that solve the same need as yours, like video calls replacing air travel; strong substitutes cap how much you can charge." },
  ],

  // Unit 30 - PESTEL Analysis
  "unit-33": [
    { term: "PESTEL", definition: "A tool for scanning six big external forces that shape a business but sit outside its control: Political, Economic, Social, Technological, Environmental, and Legal." },
    { term: "macro-environment", definition: "The outer ring of huge external forces no single company controls, which PESTEL maps, beyond a firm's internal and micro-environments." },
    { term: "political factors", definition: "Government-driven forces like taxes, trade policy, and political stability that shape the playing field every business operates on." },
    { term: "economic factors", definition: "Broad financial conditions, such as GDP, growth, and recession, that shape how much money people and businesses have to spend." },
    { term: "inflation", definition: "A general rise in prices that raises a business's costs and reduces what customers' money can buy, part of the economic environment." },
    { term: "interest rate", definition: "The cost of borrowing money; rising rates devastate some businesses like homebuilders while barely touching others, an economic PESTEL force." },
    { term: "social factors", definition: "Forces from society and culture, like changing tastes, values, and demographic shifts, that change what customers want and how they behave." },
    { term: "demographic", definition: "Population characteristics such as age, income, and location; shifts in demographics are a social force that can reshape demand for a business." },
    { term: "technological", definition: "The PESTEL force of new technology that can rebuild whole industries, creating opportunities for firms that adapt and threats for those that don't." },
    { term: "environmental", definition: "PESTEL forces from nature and sustainability, like climate threats to crops and pressure to reduce pollution, that increasingly shape business." },
    { term: "legal factors", definition: "The rules and regulations businesses must obey, such as employment, safety, or packaging laws, that constrain how a company can operate." },
    { term: "sustainability", definition: "Operating in ways that protect the environment for the long term; a growing environmental force businesses must respond to." },
  ],

  // Unit 31 - Business Ethics & Social Responsibility
  "unit-34": [
    { term: "business ethics", definition: "The moral principles guiding how a company behaves, the difference between what a business legally can do and what it should do." },
    { term: "ethical dilemma", definition: "A hard situation with conflicting duties and no clear formula, where a leader must weigh who is affected and how to decide what is right." },
    { term: "corporate social responsibility", definition: "A company's commitment (CSR) to operate in ways that benefit society and the environment, not just its own profit." },
    { term: "triple bottom line", definition: "Measuring a business's success by People, Planet, and Profit together, a wider scorecard than tracking money alone." },
    { term: "stakeholder", definition: "Anyone who affects or is affected by a company, including employees, customers, suppliers, the community, government, and the environment, not just owners." },
    { term: "stakeholder theory", definition: "The view that a business is responsible to all its stakeholders, and that lasting success comes from honoring those relationships, not just enriching owners." },
    { term: "shareholder", definition: "An owner of a company's stock; under 'shareholder primacy,' a company's only duty is to maximize profit for them, a view stakeholder theory broadens." },
    { term: "whistleblower", definition: "An insider who reports wrongdoing like fraud or safety cover-ups, often at great personal risk; protection laws exist to shield them." },
    { term: "greenwashing", definition: "Falsely marketing a company or product as environmentally friendly to look responsible without genuinely being so." },
    { term: "code of conduct", definition: "Written standards of expected behavior a business creates to give employees clear ethical guidance before pressure hits." },
  ],

  // Unit 32 - Options Basics
  "unit-21": [
    { term: "call option", definition: "A contract giving you the right, not the obligation, to buy 100 shares at a set price before a deadline. It's a bet the stock will rise." },
    { term: "put option", definition: "A contract giving you the right to sell 100 shares at a set price before a deadline. It's a bet the stock will fall." },
    { term: "strike price", definition: "The fixed price at which an option lets you buy or sell the shares." },
    { term: "expiration", definition: "The deadline by which an option must be acted on; after it, the option is worthless." },
    { term: "premium", definition: "The price you pay to buy an option, quoted per share so it costs 100 times that amount. For a buyer it is the most you can lose." },
    { term: "time decay", definition: "The way an option loses a little value every day as expiration nears, quietly hurting buyers and helping sellers." },
    { term: "intrinsic value", definition: "The real, in-the-money worth of an option based on how far the stock price is past the strike price." },
    { term: "in the money", definition: "When an option has intrinsic value because the stock has moved past the strike in the option holder's favor." },
    { term: "out of the money", definition: "When an option has no intrinsic value because the stock hasn't moved past the strike in the holder's favor." },
    { term: "covered call", definition: "Selling a call option on shares you already own to collect premium income while capping your upside." },
    { term: "hedging", definition: "Using options to protect a portfolio against losses, like insurance that pays off if prices move against you." },
    { term: "leverage", definition: "The way one option controls 100 shares, so small price moves get magnified into large percentage gains or losses." },
  ],

  // Unit 33 - Alternative Investments
  "unit-22": [
    { term: "REIT", definition: "A real estate investment trust: a company that owns income-producing property, letting you invest in real estate through shares like a stock." },
    { term: "real estate", definition: "Property such as buildings and land that can generate rental income and appreciate over time, often held via REITs." },
    { term: "commodities", definition: "Physical raw materials like gold, oil, or crops that trade on markets and often move differently from stocks." },
    { term: "private equity", definition: "Ownership stakes in companies that aren't traded on public stock exchanges, usually illiquid and open to large investors." },
    { term: "venture capital", definition: "Money invested in young, high-risk startups in exchange for equity, hoping a few big winners pay off." },
    { term: "cryptocurrency", definition: "Digital currency like Bitcoin that runs on decentralized networks and is known for extreme price swings." },
    { term: "gold", definition: "A precious metal often held as a store of value and hedge that tends to hold up when other assets fall." },
    { term: "liquidity", definition: "How easily an asset can be sold for cash quickly without losing value." },
    { term: "liquidity risk", definition: "The danger that you can't sell an investment quickly or at a fair price when you need the cash." },
    { term: "diversification", definition: "Spreading money across different, uncorrelated assets so a loss in one doesn't sink your whole portfolio." },
    { term: "collectibles", definition: "Tangible items like art or rare goods held as investments in hopes their value rises over time." },
  ],

  // Unit 34 - 10-Year Financial Plan
  "unit-23": [
    { term: "compounding", definition: "When your investment gains earn their own gains over time, causing money to grow faster and faster." },
    { term: "compound interest", definition: "Interest calculated on both your original savings and the interest already earned, snowballing your balance over years." },
    { term: "inflation", definition: "The gradual rise in prices that erodes the purchasing power of money, so a dollar buys less over time." },
    { term: "purchasing power", definition: "How much your money can actually buy; inflation slowly shrinks it over the years." },
    { term: "retirement account", definition: "A special savings account like a 401(k) or IRA that offers tax advantages for money set aside for retirement." },
    { term: "401(k)", definition: "An employer-sponsored retirement account that lets you invest pre-tax income, often with a company match." },
    { term: "IRA", definition: "An individual retirement account you open yourself to invest for retirement with tax advantages." },
    { term: "Roth", definition: "A retirement account type where you contribute after-tax money so qualified withdrawals in retirement are tax-free." },
    { term: "emergency fund", definition: "Cash savings set aside to cover unexpected costs so you don't have to sell investments or borrow." },
    { term: "time horizon", definition: "How long until you need the money, which shapes how much risk you can take." },
    { term: "savings rate", definition: "The share of your income you regularly set aside to invest toward your goals." },
    { term: "real return", definition: "Your investment return after subtracting inflation, showing how much your money actually grew in buying power." },
  ],

  // Unit 35 - Market Simulations
  "unit-24": [
    { term: "portfolio", definition: "The full collection of investments you own, held together to balance risk and return." },
    { term: "diversification", definition: "Spreading investments across many assets so a drop in one doesn't wreck the whole portfolio." },
    { term: "bear market", definition: "A prolonged period when prices fall broadly, often around 20% or more, testing investors' nerves." },
    { term: "bull market", definition: "A sustained period when prices rise broadly and optimism drives markets upward." },
    { term: "market crash", definition: "A sudden, steep drop in prices, often driven by panic, that can rattle even disciplined investors." },
    { term: "rebalancing", definition: "Periodically adjusting your holdings back to your target mix by selling what's grown and buying what's lagged." },
    { term: "sector rotation", definition: "The shifting of money between market sectors as economic conditions change, favoring different industries over time." },
    { term: "dollar-cost averaging", definition: "Investing a fixed amount at regular intervals so you buy more shares when prices are low and fewer when high." },
    { term: "asset allocation", definition: "How you divide a portfolio among stocks, bonds, and other assets to match your goals and risk tolerance." },
    { term: "panic selling", definition: "Dumping investments in fear during a downturn, which usually means selling at the worst possible time." },
  ],
}

/**
 * The hover-definition glossary entries for a lesson's unit, or null when the
 * unit has none (special tracks, or an unknown id). Feed the result straight
 * into <GlossaryProvider entries={...}> - null leaves rendering unchanged.
 */
export function getUnitVocab(unitId: string | undefined): GlossaryEntry[] | null {
  if (!unitId) return null
  return UNIT_VOCAB[unitId] ?? null
}
