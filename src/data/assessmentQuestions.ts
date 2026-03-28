import { MasteryTier } from "@/types"

// Extended assessment question type with curriculum category mapping
export interface BenchmarkQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number // 0-3
  category: string // maps to curriculum unit categories
  explanation: string
  difficulty: "foundational" | "applied" | "strategic"
}

// Legacy type alias
export interface AssessmentQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  topic: string
  explanation: string
}

// ═══════════════════════════════════════════════════════════════
// 50 HIGH-QUALITY, SCENARIO-BASED BENCHMARK QUESTIONS
// All answer choices are LENGTH-NORMALIZED:
//   - Similar word count across A/B/C/D
//   - Parallel grammatical structure
//   - Equal detail and specificity
//   - No "longest = correct" bias
// ═══════════════════════════════════════════════════════════════

export const benchmarkQuestions: BenchmarkQuestion[] = [
  // ── UNIT 1: Psychology of Money ──
  {
    id: "bm-1",
    question: "Maria earns $3,000/month and saves $600. Her friend Jake earns $8,000/month but saves $200. Who is demonstrating better financial behavior and why?",
    options: [
      "Jake, because higher income provides more long-term spending flexibility",
      "Maria, because her 20% savings rate far exceeds Jake's 2.5% rate",
      "Both are equal because absolute savings amounts matter most here",
      "Neither, because savings behavior depends on total living expenses"
    ],
    correctAnswer: 1,
    category: "psychology-of-money",
    explanation: "Savings rate as a percentage of income is a better indicator of financial discipline than absolute amounts. Maria saves 20% vs Jake's 2.5%.",
    difficulty: "applied"
  },
  {
    id: "bm-2",
    question: "A study shows people who receive a windfall of $10,000 are more likely to spend it than people who save $10,000 over time. This behavior is best explained by:",
    options: [
      "Mental accounting — windfall money feels different from earned savings",
      "Inflation expectations — holding cash means losing purchasing power",
      "Opportunity cost logic — spending unexpected money now is rational",
      "Loss aversion bias — people fear losing unearned money quickly"
    ],
    correctAnswer: 0,
    category: "psychology-of-money",
    explanation: "Mental accounting is a cognitive bias where people treat money differently based on its source, even though all dollars are fungible.",
    difficulty: "strategic"
  },

  // ── UNIT 2: Income & Earning Power ──
  {
    id: "bm-3",
    question: "Alex has a job offering $50,000/year salary with full benefits (health insurance worth $8,000/year, 401k match worth $3,000/year). A freelance opportunity offers $65,000/year with no benefits. Which provides better total compensation?",
    options: [
      "Freelance, because the $65,000 base pay exceeds the salary offer",
      "Salary, because total comp is $61,000 plus employer-paid payroll taxes",
      "They are essentially equal when accounting for all benefit costs",
      "Salary, because $61,000 plus freelancer self-employment tax closes the gap"
    ],
    correctAnswer: 3,
    category: "income-earning",
    explanation: "The salaried position provides $61,000 in total compensation. The freelancer earning $65,000 must pay self-employment tax (~15.3% = ~$9,945), reducing net to ~$55,055, plus must buy their own insurance.",
    difficulty: "strategic"
  },
  {
    id: "bm-4",
    question: "Which factor typically has the LARGEST impact on lifetime earning potential?",
    options: [
      "The starting salary negotiated at your very first position",
      "Geographic location and regional cost of living adjustments",
      "Continuous skill growth and career pivots based on demand",
      "Company brand recognition and organizational size or prestige"
    ],
    correctAnswer: 2,
    category: "income-earning",
    explanation: "While starting salary matters, continuous skill development and strategic career pivots aligned with market demand have the largest compounding effect on lifetime earnings.",
    difficulty: "applied"
  },

  // ── UNIT 3: Budgeting Mastery ──
  {
    id: "bm-5",
    question: "Jordan uses the 50/30/20 budgeting rule on a $4,000 monthly take-home. After tracking expenses, they find housing costs $1,800/month, groceries $400, and car payment $350. What should Jordan conclude?",
    options: [
      "Everything is fine because total monthly expenses stay under $4,000",
      "Needs total $2,550 or 63.75%, exceeding the 50% guideline significantly",
      "The budget is adequately balanced because $2,550 is close enough",
      "Jordan should prioritize increasing income rather than adjusting spending"
    ],
    correctAnswer: 1,
    category: "budgeting",
    explanation: "Needs ($1,800 + $400 + $350 = $2,550) represent 63.75% of take-home pay, significantly exceeding the 50% guideline. Housing at 45% alone is the primary issue.",
    difficulty: "applied"
  },
  {
    id: "bm-6",
    question: "A zero-based budget requires that every dollar of income is assigned a purpose. Why might this approach be MORE effective than simply tracking spending after the fact?",
    options: [
      "It is fundamentally simpler to set up than expense tracking apps",
      "It removes the need for maintaining a separate emergency fund",
      "It forces intentional allocation decisions before any spending occurs",
      "It automatically blocks overspending in every individual category"
    ],
    correctAnswer: 2,
    category: "budgeting",
    explanation: "Zero-based budgeting is proactive — it assigns purpose to every dollar upfront, which psychologically reduces impulse spending compared to reactive tracking.",
    difficulty: "foundational"
  },

  // ── UNIT 4: Banking Systems ──
  {
    id: "bm-7",
    question: "A high-yield savings account offers 4.5% APY while a checking account offers 0.01% APY. If you keep $10,000 in each for one year, what is the approximate difference in interest earned?",
    options: [
      "About $45 in total interest difference between the two accounts",
      "About $449 in total interest difference between the two accounts",
      "About $4,500 in total interest difference between the two accounts",
      "About $4.50 in total interest difference between the two accounts"
    ],
    correctAnswer: 1,
    category: "banking",
    explanation: "HYSA: $10,000 × 4.5% = $450. Checking: $10,000 × 0.01% = $1. Difference ≈ $449.",
    difficulty: "applied"
  },
  {
    id: "bm-8",
    question: "The FDIC insures bank deposits up to $250,000 per depositor, per institution. If you have $400,000 to deposit safely, what strategy should you use?",
    options: [
      "Deposit all $400,000 in one bank since FDIC covers total balances",
      "Split deposits across two FDIC-insured banks to stay under limits",
      "Invest all funds in Treasury bonds which have much higher limits",
      "Keep the entire balance in cash at home to avoid any bank risk"
    ],
    correctAnswer: 1,
    category: "banking",
    explanation: "FDIC insurance covers $250,000 per depositor, per institution. Splitting across two banks ensures full coverage of $400,000.",
    difficulty: "foundational"
  },

  // ── UNIT 5: Credit & Debt ──
  {
    id: "bm-9",
    question: "You have a credit card with a $5,000 balance at 22% APR. You make only the minimum payment of $100/month. Approximately how long will it take to pay off, and how much total interest will you pay?",
    options: [
      "About 2 years with roughly $1,000 in total interest charges",
      "About 9 years with roughly $6,000 or more in interest charges",
      "About 4 years with roughly $2,500 in total interest charges",
      "About 50 months with roughly $3,000 in total interest charges"
    ],
    correctAnswer: 1,
    category: "credit-debt",
    explanation: "At 22% APR with only minimum payments, it takes roughly 9+ years to pay off $5,000, with total interest exceeding the original balance.",
    difficulty: "strategic"
  },
  {
    id: "bm-10",
    question: "Which factor has the LARGEST weight in calculating a FICO credit score?",
    options: [
      "Credit utilization ratio measuring total amounts currently owed",
      "Payment history tracking whether bills are paid on time",
      "Length of credit history showing how long accounts are open",
      "Number of recent hard inquiries from new credit applications"
    ],
    correctAnswer: 1,
    category: "credit-debt",
    explanation: "Payment history accounts for approximately 35% of a FICO score — the single largest factor. Amounts owed (utilization) is second at 30%.",
    difficulty: "foundational"
  },

  // ── UNIT 6: Introduction to Investing ──
  {
    id: "bm-11",
    question: "An investor puts $500/month into an index fund averaging 8% annual returns for 30 years. Another investor saves $1,000/month in a savings account at 2% for 15 years. Who ends up with more?",
    options: [
      "The savings investor, because double the monthly contribution wins",
      "They end up roughly equal when adjusting for risk differences",
      "The index fund investor, because compound growth over 30 years dominates",
      "It depends entirely on the inflation rate during those periods"
    ],
    correctAnswer: 2,
    category: "investing-intro",
    explanation: "The index fund investor accumulates ~$680,000+. The savings investor accumulates ~$210,000. Time in the market and compound returns are more powerful than saving rate alone.",
    difficulty: "applied"
  },
  {
    id: "bm-12",
    question: "What is the PRIMARY reason diversification reduces portfolio risk?",
    options: [
      "It guarantees that the portfolio will produce positive returns",
      "Different assets respond differently to the same economic events",
      "It completely eliminates all systematic or market-wide risk factors",
      "It mathematically increases the portfolio's expected return level"
    ],
    correctAnswer: 1,
    category: "investing-intro",
    explanation: "Diversification reduces unsystematic risk because assets with low correlation don't all decline simultaneously. However, it cannot eliminate systematic (market-wide) risk.",
    difficulty: "strategic"
  },

  // ── UNIT 7: Stocks Explained ──
  {
    id: "bm-13",
    question: "Company A has earnings per share (EPS) of $5.00 and trades at $150/share. Company B has EPS of $2.00 and trades at $80/share. Based on P/E ratio alone, which stock appears more 'expensive'?",
    options: [
      "Company A, because its absolute share price is noticeably higher",
      "Company B, because it generates lower total earnings per share",
      "Company B, with a P/E of 40 compared to Company A's P/E of 30",
      "They are equally valued because P/E does not consider share price"
    ],
    correctAnswer: 2,
    category: "stocks",
    explanation: "Company A P/E = $150/$5 = 30. Company B P/E = $80/$2 = 40. A higher P/E means investors are paying more per dollar of earnings, making Company B relatively more expensive.",
    difficulty: "applied"
  },
  {
    id: "bm-14",
    question: "A stock drops 50% from $100 to $50. What percentage gain is needed to return to $100?",
    options: [
      "A 50% gain from $50 would bring the stock back to $100",
      "A 100% gain from $50 would bring the stock back to $100",
      "A 75% gain from $50 would bring the stock back to $100",
      "A 200% gain from $50 would bring the stock back to $100"
    ],
    correctAnswer: 1,
    category: "stocks",
    explanation: "From $50 back to $100 requires a $50 gain, which is 100% of $50. Losses are harder to recover from than most people assume.",
    difficulty: "strategic"
  },

  // ── UNIT 8: Stock Market System ──
  {
    id: "bm-15",
    question: "During a market-wide sell-off, a circuit breaker halts trading for 15 minutes after the S&P 500 drops 7%. What is the PRIMARY purpose of this mechanism?",
    options: [
      "To give the federal government time to intervene with policy",
      "To prevent panic selling by providing a cooling-off period for all",
      "To protect institutional market makers from accumulating losses",
      "To allow algorithmic trading systems time to adjust their models"
    ],
    correctAnswer: 1,
    category: "stock-market",
    explanation: "Circuit breakers are designed to prevent panic-driven cascading sell-offs by giving all market participants time to process information and make more rational decisions.",
    difficulty: "strategic"
  },
  {
    id: "bm-16",
    question: "What is the difference between a 'market order' and a 'limit order'?",
    options: [
      "Market orders execute immediately; limit orders guarantee a specific price",
      "Limit orders execute faster; market orders require broker approval first",
      "Market orders work only during hours; limit orders function around the clock",
      "There is no meaningful practical difference for typical retail investors"
    ],
    correctAnswer: 0,
    category: "stock-market",
    explanation: "A market order executes immediately at the best available price. A limit order only executes at your specified price or better, providing price control but risking non-execution.",
    difficulty: "foundational"
  },

  // ── UNIT 9: Portfolio Construction ──
  {
    id: "bm-17",
    question: "A 22-year-old investor has 40+ years until retirement. Which portfolio allocation is MOST appropriate according to modern portfolio theory?",
    options: [
      "100% bonds to maximize capital safety and preserve the principal",
      "50% stocks and 50% bonds for a balanced risk-return profile",
      "80-90% stocks with 10-20% bonds, shifting gradually over time",
      "100% cash equivalents held safely until the investor gains experience"
    ],
    correctAnswer: 2,
    category: "portfolio",
    explanation: "With a 40+ year time horizon, a young investor can tolerate higher volatility for higher expected returns. The allocation should gradually shift toward bonds as retirement approaches.",
    difficulty: "applied"
  },
  {
    id: "bm-18",
    question: "Portfolio A: 100% S&P 500 index fund. Portfolio B: 60% S&P 500, 25% international stocks, 15% bonds. Over a 20-year period, which statement is MOST accurate?",
    options: [
      "Portfolio A will always outperform because domestic stocks lead globally",
      "Portfolio B will always outperform because diversification guarantees gains",
      "Portfolio B likely has lower volatility with similar risk-adjusted returns",
      "Both perform identically since all global markets are highly correlated"
    ],
    correctAnswer: 2,
    category: "portfolio",
    explanation: "Diversification across asset classes and geographies typically reduces volatility without proportionally reducing returns, improving risk-adjusted performance (Sharpe ratio).",
    difficulty: "strategic"
  },

  // ── UNIT 10: ETFs & Mutual Funds ──
  {
    id: "bm-19",
    question: "An S&P 500 index ETF charges 0.03% expense ratio. An actively managed large-cap fund charges 1.2%. If both start with $100,000 and earn 8% gross annual returns over 30 years, approximately how much more does the ETF investor end up with?",
    options: [
      "About $50,000 more due to lower management fee compounding",
      "About $200,000 or more due to decades of compounding fee savings",
      "About $25,000 more since fee differences are relatively minor",
      "The difference is negligible because fees matter less over time"
    ],
    correctAnswer: 1,
    category: "etfs-funds",
    explanation: "ETF: $100K at 7.97% for 30 years ≈ $995K. Active fund: $100K at 6.8% for 30 years ≈ $719K. Difference: ~$276K. Even small fee differences compound enormously over decades.",
    difficulty: "strategic"
  },
  {
    id: "bm-20",
    question: "What is a key structural difference between an ETF and a mutual fund?",
    options: [
      "ETFs trade on exchanges throughout the day; mutual funds price once daily",
      "Mutual funds consistently outperform ETFs across all market conditions",
      "ETFs can only hold stocks while mutual funds also hold bonds",
      "Mutual funds have no expense ratios while ETFs always charge fees"
    ],
    correctAnswer: 0,
    category: "etfs-funds",
    explanation: "ETFs trade like stocks on exchanges with real-time pricing. Mutual funds are priced once daily at their Net Asset Value (NAV) after market close.",
    difficulty: "foundational"
  },

  // ── UNIT 11: Bonds & Fixed Income ──
  {
    id: "bm-21",
    question: "Interest rates rise from 3% to 5%. What happens to the market price of existing bonds with a 3% coupon?",
    options: [
      "Price increases because the existing bond coupon becomes more valuable",
      "Price stays the same since the coupon rate was fixed at issuance",
      "Price decreases because new bonds now offer higher competing yields",
      "Nothing changes because bond prices are locked in after issuance"
    ],
    correctAnswer: 2,
    category: "bonds",
    explanation: "Bond prices and interest rates have an inverse relationship. When new bonds offer 5%, existing 3% bonds must drop in price to offer equivalent yield to maturity.",
    difficulty: "applied"
  },
  {
    id: "bm-22",
    question: "A corporate bond rated BBB offers 5.5% yield while a Treasury bond of similar maturity offers 4.0%. The 1.5% difference represents:",
    options: [
      "The credit spread compensating for higher corporate default risk",
      "A pricing error that the bond market will eventually correct",
      "The tax advantage that corporate bonds provide over Treasuries",
      "The liquidity premium that Treasury bonds command from investors"
    ],
    correctAnswer: 0,
    category: "bonds",
    explanation: "The credit spread (1.5%) compensates investors for the additional default risk of corporate bonds compared to risk-free Treasury securities.",
    difficulty: "strategic"
  },

  // ── UNIT 12: Financial Statements ──
  {
    id: "bm-23",
    question: "A company reports $10M revenue, $6M cost of goods sold, $2M operating expenses, and $500K interest expense. What is the operating income (EBIT)?",
    options: [
      "$1.5M after subtracting all expenses including interest charges",
      "$2M because operating income excludes the interest expense line",
      "$4M which represents the gross profit before operating costs",
      "$10M since revenue is the same as total operating income here"
    ],
    correctAnswer: 1,
    category: "financial-statements",
    explanation: "Operating Income (EBIT) = Revenue - COGS - Operating Expenses = $10M - $6M - $2M = $2M. Interest expense is below the operating income line.",
    difficulty: "applied"
  },
  {
    id: "bm-24",
    question: "A company shows positive net income but negative operating cash flow for three consecutive quarters. This discrepancy MOST likely indicates:",
    options: [
      "Strong financial performance since reported profit is what matters",
      "Normal seasonal fluctuations that naturally correct each fiscal year",
      "Potential earnings quality issues with aggressive revenue recognition",
      "The company is reinvesting heavily into long-term growth initiatives"
    ],
    correctAnswer: 2,
    category: "financial-statements",
    explanation: "Persistent divergence between net income and operating cash flow is a red flag for earnings quality. It may indicate aggressive revenue recognition, rising receivables, or other accounting concerns.",
    difficulty: "strategic"
  },

  // ── UNIT 13: Financial Ratios ──
  {
    id: "bm-25",
    question: "Company X has a current ratio of 0.8. What does this indicate?",
    options: [
      "The company holds more current assets than current liabilities overall",
      "Short-term liabilities exceed short-term assets, signaling liquidity risk",
      "The company is highly profitable based on its revenue generation",
      "The company carries no significant debt on its balance sheet"
    ],
    correctAnswer: 1,
    category: "financial-ratios",
    explanation: "A current ratio below 1.0 means current liabilities exceed current assets, suggesting the company may struggle to meet short-term obligations without additional financing.",
    difficulty: "applied"
  },
  {
    id: "bm-26",
    question: "A company has ROE of 25% but debt-to-equity ratio of 4.0. Another has ROE of 15% with debt-to-equity of 0.5. Which is the BETTER investment assessment?",
    options: [
      "Company 1 because higher ROE always signals superior business performance",
      "Company 2 because lower debt levels are universally safer for investors",
      "Company 1's ROE may be inflated by excessive leverage, making Company 2 less risky",
      "Neither can be properly assessed without knowing the current stock price"
    ],
    correctAnswer: 2,
    category: "financial-ratios",
    explanation: "High ROE driven by high leverage (DuPont decomposition) is riskier than moderate ROE with conservative leverage. Company 1's ROE is magnified by 4x debt, not necessarily operational excellence.",
    difficulty: "strategic"
  },

  // ── UNIT 14: Valuation ──
  {
    id: "bm-27",
    question: "A company with $2 billion in annual free cash flow is valued at $40 billion market cap. Its FCF yield is:",
    options: [
      "20%, indicating the company generates strong cash relative to value",
      "2%, indicating modest cash generation relative to market value",
      "5%, indicating moderate cash generation relative to market value",
      "0.5%, indicating very low cash generation relative to market value"
    ],
    correctAnswer: 2,
    category: "valuation",
    explanation: "FCF Yield = Free Cash Flow / Market Cap = $2B / $40B = 5%.",
    difficulty: "applied"
  },
  {
    id: "bm-28",
    question: "A DCF (discounted cash flow) model is most sensitive to which input?",
    options: [
      "Last year's reported revenue figures from annual financial statements",
      "The current effective corporate tax rate applied to earnings",
      "The terminal growth rate and discount rate assumptions used",
      "The company's current dividend payout ratio to shareholders"
    ],
    correctAnswer: 2,
    category: "valuation",
    explanation: "In most DCF models, the terminal value (driven by terminal growth rate) represents 60-80% of total value. Small changes in the discount rate or terminal growth rate dramatically change the output.",
    difficulty: "strategic"
  },

  // ── UNIT 15: Behavioral Economics ──
  {
    id: "bm-29",
    question: "An investor bought a stock at $100 that has fallen to $60. Despite negative fundamentals, they refuse to sell, saying 'I'll sell when I break even.' This behavior is an example of:",
    options: [
      "Anchoring bias — fixating on the purchase price as a reference",
      "Confirmation bias — only seeking information that supports holding",
      "Herding behavior — following what other investors are also doing",
      "Recency bias — overweighting the most recent price movements"
    ],
    correctAnswer: 0,
    category: "behavioral-finance",
    explanation: "Anchoring bias causes investors to fixate on their purchase price as a reference point, making irrational hold/sell decisions based on their cost basis rather than current fundamentals.",
    difficulty: "applied"
  },
  {
    id: "bm-30",
    question: "Research shows that investors feel the pain of a $1,000 loss approximately 2x more intensely than the pleasure of a $1,000 gain. This phenomenon is called:",
    options: [
      "Diminishing marginal utility of wealth as income increases",
      "The endowment effect of overvaluing currently owned assets",
      "Loss aversion as described in Kahneman and Tversky's research",
      "The disposition effect of selling winners and holding losers"
    ],
    correctAnswer: 2,
    category: "behavioral-finance",
    explanation: "Loss aversion, a cornerstone of Prospect Theory, shows that losses are psychologically weighted roughly 2x more than equivalent gains.",
    difficulty: "strategic"
  },

  // ── UNIT 16: Bubbles & Crashes ──
  {
    id: "bm-31",
    question: "During the 2008 financial crisis, the primary cause of systemic risk was:",
    options: [
      "Broad stock market overvaluation driven by retail investor speculation",
      "Excessive federal government spending creating unsustainable fiscal deficits",
      "Excessive leverage in mortgage-backed securities with interconnected counterparty risk",
      "Rapidly rising oil prices that disrupted global economic supply chains"
    ],
    correctAnswer: 2,
    category: "bubbles-crashes",
    explanation: "The 2008 crisis was driven by excessive leverage in mortgage-backed securities (MBS) and derivatives (CDOs, CDS) that created systemic counterparty risk throughout the financial system.",
    difficulty: "strategic"
  },
  {
    id: "bm-32",
    question: "Which of the following is a characteristic shared by most historical market bubbles?",
    options: [
      "Government intervention always successfully prevents bubbles from forming",
      "Bubbles only occur in equity stock markets, never in other assets",
      "A 'this time is different' narrative justifying extreme valuations with easy credit",
      "All bubbles are fundamentally caused by widespread financial fraud schemes"
    ],
    correctAnswer: 2,
    category: "bubbles-crashes",
    explanation: "From tulip mania to dot-com to housing, bubbles share common features: a compelling new narrative, belief that traditional valuation doesn't apply, and easy access to leverage.",
    difficulty: "applied"
  },

  // ── UNIT 17: Inflation & Rates ──
  {
    id: "bm-33",
    question: "If inflation is 6% and your savings account earns 3% interest, what is your real (inflation-adjusted) return?",
    options: [
      "Positive 3% because interest adds to your nominal account balance",
      "Positive 9% because inflation and interest compound together",
      "Approximately negative 3% because purchasing power is declining",
      "Exactly 0% because the inflation and interest cancel each other"
    ],
    correctAnswer: 2,
    category: "macro-economics",
    explanation: "Real return ≈ Nominal return - Inflation = 3% - 6% = -3%. Even though your account balance grows, your purchasing power declines when inflation exceeds your return.",
    difficulty: "foundational"
  },
  {
    id: "bm-34",
    question: "The Federal Reserve raises the federal funds rate by 0.75%. Which of the following is the MOST likely immediate effect?",
    options: [
      "Stock prices immediately increase as investors gain more confidence",
      "Borrowing costs rise across the economy, slowing spending and inflation",
      "The government collects significantly less total tax revenue annually",
      "Unemployment immediately decreases as businesses accelerate hiring plans"
    ],
    correctAnswer: 1,
    category: "macro-economics",
    explanation: "Rate hikes increase borrowing costs across the economy, which slows spending and investment, helping to reduce inflation — though with a lag.",
    difficulty: "applied"
  },

  // ── UNIT 18: Economic Indicators ──
  {
    id: "bm-35",
    question: "GDP growth has been negative for two consecutive quarters. Employment is declining and consumer spending is contracting. This economic condition is called:",
    options: [
      "Stagflation, which combines stagnant growth with rising price inflation",
      "A recession, defined by sustained negative GDP with rising unemployment",
      "Deflation, which refers to a broad decline in consumer price levels",
      "A depression, which represents a severe and prolonged economic downturn"
    ],
    correctAnswer: 1,
    category: "economic-indicators",
    explanation: "Two consecutive quarters of negative GDP growth is the traditional definition of a recession, typically accompanied by rising unemployment and falling consumer spending.",
    difficulty: "foundational"
  },
  {
    id: "bm-36",
    question: "The yield curve inverts (short-term rates exceed long-term rates). Historically, this has been:",
    options: [
      "A strong signal of coming economic expansion and stock market gains",
      "Meaningless noise with no predictive value for future economic activity",
      "A reliable leading indicator that a recession may occur within two years",
      "An indicator that the stock market will immediately crash the next day"
    ],
    correctAnswer: 2,
    category: "economic-indicators",
    explanation: "An inverted yield curve has preceded every US recession since the 1960s. It signals that bond markets expect economic weakness ahead.",
    difficulty: "strategic"
  },

  // ── UNIT 19: Starting a Business ──
  {
    id: "bm-37",
    question: "A startup has $50,000 in monthly expenses and $200,000 in cash reserves. What is the company's 'runway'?",
    options: [
      "12 months of operating time before the cash reserves run out",
      "4 months of operating time before the cash reserves run out",
      "8 months of operating time before the cash reserves run out",
      "Indefinite runway as long as the company generates some revenue"
    ],
    correctAnswer: 1,
    category: "entrepreneurship",
    explanation: "Runway = Cash / Monthly Burn Rate = $200,000 / $50,000 = 4 months.",
    difficulty: "applied"
  },
  {
    id: "bm-38",
    question: "An entrepreneur is deciding between an LLC and a C-Corp for their new venture. Which is the PRIMARY advantage of a C-Corp for a startup seeking venture capital?",
    options: [
      "C-Corps always pay lower taxes than LLCs in every jurisdiction",
      "C-Corps can issue multiple stock classes required by most VC investors",
      "C-Corps have no legal liability exposure for founders or officers",
      "C-Corps are exempt from holding regular board meetings or minutes"
    ],
    correctAnswer: 1,
    category: "entrepreneurship",
    explanation: "VCs require preferred stock with specific rights (liquidation preference, anti-dilution). Only C-Corps can issue multiple stock classes.",
    difficulty: "strategic"
  },

  // ── UNIT 20: Competitive Strategy ──
  {
    id: "bm-39",
    question: "Apple charges premium prices for iPhones despite competitors offering similar hardware at lower prices. This pricing power is primarily due to:",
    options: [
      "Apple's manufacturing costs being significantly higher than competitors",
      "Brand moat and ecosystem lock-in creating high customer switching costs",
      "Government regulations that restrict price competition in the market",
      "Consumer inability to compare prices when shopping for smartphones"
    ],
    correctAnswer: 1,
    category: "competitive-strategy",
    explanation: "Apple's pricing power comes from its brand moat and ecosystem (iMessage, AirDrop, iCloud, App Store) which create high switching costs.",
    difficulty: "applied"
  },
  {
    id: "bm-40",
    question: "According to Porter's Five Forces, which scenario represents the HIGHEST threat to an industry's profitability?",
    options: [
      "High entry barriers, few substitute products, and weak buyer leverage",
      "Low entry barriers, many substitutes, strong buyers and strong suppliers",
      "Moderate rivalry among the existing group of industry competitors",
      "Strong brand loyalty among customers with high repeat purchase rates"
    ],
    correctAnswer: 1,
    category: "competitive-strategy",
    explanation: "Porter's Five Forces identifies threats from new entrants, substitutes, buyer power, supplier power, and rivalry. When all forces are unfavorable, industry profitability is severely compressed.",
    difficulty: "strategic"
  },

  // ── UNIT 21: Options Trading ──
  {
    id: "bm-41",
    question: "You buy a call option on Stock XYZ with a strike price of $50, paying a $3 premium. The stock rises to $58 at expiration. What is your profit per share?",
    options: [
      "$8 per share from the intrinsic value at the expiration date",
      "$5 per share after subtracting the $3 premium from the gain",
      "$3 per share which equals the original premium amount paid",
      "$11 per share from combining the premium with intrinsic value"
    ],
    correctAnswer: 1,
    category: "options",
    explanation: "Profit = (Stock Price - Strike Price) - Premium = ($58 - $50) - $3 = $5 per share.",
    difficulty: "applied"
  },
  {
    id: "bm-42",
    question: "An investor who is bullish on a stock but wants to limit downside risk should consider which strategy?",
    options: [
      "Selling naked call options to collect premium income on the stock",
      "Buying a protective put option while continuing to hold the stock",
      "Selling put options on the stock to generate additional income",
      "Short selling the stock to profit from any potential price decline"
    ],
    correctAnswer: 1,
    category: "options",
    explanation: "A protective put (owning stock + buying a put) limits downside to the put's strike price minus the premium paid, while maintaining unlimited upside potential.",
    difficulty: "strategic"
  },

  // ── UNIT 22: Alternative Investments ──
  {
    id: "bm-43",
    question: "Real estate as an investment differs from stocks primarily because:",
    options: [
      "Real estate values always appreciate regardless of economic conditions",
      "Real estate is illiquid, requires management, but offers leverage benefits",
      "Stocks are universally riskier than real estate in all time periods",
      "Real estate has no measurable correlation with broader economic trends"
    ],
    correctAnswer: 1,
    category: "alternatives",
    explanation: "Real estate is illiquid (can't sell instantly), requires management, but offers unique advantages: leverage (mortgages), tax benefits (depreciation), and cash flow (rent).",
    difficulty: "applied"
  },
  {
    id: "bm-44",
    question: "An investor allocates 5% of their portfolio to gold. The PRIMARY role of gold in a diversified portfolio is:",
    options: [
      "To generate consistently high returns that outperform equities over time",
      "To provide regular dividend income similar to stocks or bonds",
      "To hedge against inflation and currency devaluation with low correlation",
      "Gold serves no useful purpose in any modern diversified portfolio"
    ],
    correctAnswer: 2,
    category: "alternatives",
    explanation: "Gold typically serves as an inflation hedge and store of value with low correlation to equities, providing diversification benefits during periods of economic uncertainty.",
    difficulty: "foundational"
  },

  // ── UNIT 23: Financial Planning ──
  {
    id: "bm-45",
    question: "The 'Rule of 72' estimates how long it takes for an investment to double. At 8% annual return, approximately how many years to double your money?",
    options: [
      "About 12 years based on the Rule of 72 division calculation",
      "About 9 years based on the Rule of 72 division calculation",
      "About 6 years based on the Rule of 72 division calculation",
      "About 15 years based on the Rule of 72 division calculation"
    ],
    correctAnswer: 1,
    category: "financial-planning",
    explanation: "Rule of 72: Years to double = 72 / Return Rate = 72 / 8 = 9 years.",
    difficulty: "foundational"
  },
  {
    id: "bm-46",
    question: "A 30-year-old wants to retire at 65 with $2 million. Assuming 7% average annual returns, approximately how much should they invest per month?",
    options: [
      "About $4,760 per month to reach the two million dollar target",
      "About $1,200 per month to reach the two million dollar target",
      "About $500 per month to reach the two million dollar target",
      "About $2,500 per month to reach the two million dollar target"
    ],
    correctAnswer: 1,
    category: "financial-planning",
    explanation: "Using future value of annuity calculations, ~$1,200/month invested at 7% for 35 years grows to approximately $2 million.",
    difficulty: "applied"
  },

  // ── UNIT 24: Simulations ──
  {
    id: "bm-47",
    question: "In a Monte Carlo simulation for retirement planning, 10,000 scenarios are run with varying market returns. If 85% of scenarios result in the retiree not running out of money, this means:",
    options: [
      "The retirement plan is fully guaranteed to succeed in all cases",
      "There is an 85% probability of success based on historical distributions",
      "The plan will definitely fail exactly 15% of the time going forward",
      "Monte Carlo simulations provide no useful information for planning"
    ],
    correctAnswer: 1,
    category: "simulations",
    explanation: "An 85% success rate means that under 10,000 randomized scenarios based on historical data, 8,500 resulted in sufficient funds. It's probabilistic, not deterministic.",
    difficulty: "strategic"
  },
  {
    id: "bm-48",
    question: "When backtesting a trading strategy using historical data, the biggest risk is:",
    options: [
      "The computer hardware might introduce random calculation errors",
      "Historical market data is always fundamentally inaccurate and unreliable",
      "Overfitting — the strategy works on past data but fails on new data",
      "Backtesting is explicitly prohibited by current financial market regulations"
    ],
    correctAnswer: 2,
    category: "simulations",
    explanation: "Overfitting occurs when a model is so finely tuned to historical data that it captures noise rather than signal. Such strategies often fail on live, out-of-sample data.",
    difficulty: "strategic"
  },

  // ── BONUS QUESTIONS (49–50) ──
  {
    id: "bm-49",
    question: "A teenager receives $5,000 as a gift and must choose between paying off a $2,000 credit card balance at 24% APR or investing all $5,000 in an index fund averaging 10% annually. What is the financially optimal decision?",
    options: [
      "Invest the full $5,000 because markets average higher long-term returns",
      "Pay the $2,000 debt first, invest the remaining $3,000 afterward",
      "Split it evenly with $2,500 toward debt and $2,500 into markets",
      "Keep the entire $5,000 in a savings account until gaining experience"
    ],
    correctAnswer: 1,
    category: "credit-debt",
    explanation: "Paying off 24% APR debt is equivalent to earning a guaranteed 24% return, which far exceeds the expected 10% from investing. Always eliminate high-interest debt before investing.",
    difficulty: "applied"
  },
  {
    id: "bm-50",
    question: "Two employees start new jobs at age 25. Employee A contributes 6% of salary with a 100% employer match up to 6%. Employee B contributes 10% with no employer match. Both earn $60,000. After one year, who has contributed more to retirement?",
    options: [
      "Employee B, because a 10% personal contribution rate is larger",
      "Employee A, because 6% plus 6% match equals 12% total contributions",
      "They contribute exactly the same total amount to retirement annually",
      "Employee B, because personal contributions matter more than matches"
    ],
    correctAnswer: 1,
    category: "income-earning",
    explanation: "Employee A contributes $3,600 (6%) and receives $3,600 employer match = $7,200 total. Employee B contributes $6,000 (10%) with no match. Free employer match is essentially guaranteed 100% return.",
    difficulty: "foundational"
  },
]

// Legacy compatibility: convert to old format
export const assessmentQuestions: AssessmentQuestion[] = benchmarkQuestions.map(q => ({
  id: q.id,
  question: q.question,
  options: q.options,
  correctAnswer: q.correctAnswer,
  topic: q.category,
  explanation: q.explanation,
}))

// All unique categories covered by the benchmark
export const BENCHMARK_CATEGORIES = [
  "psychology-of-money", "income-earning", "budgeting", "banking", "credit-debt",
  "investing-intro", "stocks", "stock-market", "portfolio", "etfs-funds",
  "bonds", "financial-statements", "financial-ratios", "valuation",
  "behavioral-finance", "bubbles-crashes", "macro-economics", "economic-indicators",
  "entrepreneurship", "competitive-strategy", "options", "alternatives",
  "financial-planning", "simulations",
] as const

export type BenchmarkCategory = typeof BENCHMARK_CATEGORIES[number]

// Compute per-category scores: { category: { correct, total, percent } }
export interface CategoryScore {
  correct: number
  total: number
  percent: number
}

export function computeCategoryScores(
  questions: BenchmarkQuestion[],
  answers: number[]
): Record<string, CategoryScore> {
  const scores: Record<string, CategoryScore> = {}

  // Initialize all categories
  for (const cat of BENCHMARK_CATEGORIES) {
    scores[cat] = { correct: 0, total: 0, percent: 0 }
  }

  questions.forEach((q, i) => {
    if (i >= answers.length) return
    if (!scores[q.category]) {
      scores[q.category] = { correct: 0, total: 0, percent: 0 }
    }
    scores[q.category].total++
    if (answers[i] === q.correctAnswer) {
      scores[q.category].correct++
    }
  })

  // Compute percentages
  for (const cat of Object.keys(scores)) {
    const s = scores[cat]
    s.percent = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
  }

  return scores
}

export function calculateLiteracyLevel(score: number): MasteryTier {
  const totalQuestions = benchmarkQuestions.length
  const percent = (score / totalQuestions) * 100
  if (percent >= 85) return "capital-architect"
  if (percent >= 70) return "investor"
  if (percent >= 55) return "strategist"
  if (percent >= 35) return "builder"
  return "explorer"
}

export function getLevelDescription(level: MasteryTier): string {
  switch (level) {
    case "explorer":
      return "You're starting your financial journey! Your curriculum will build strong foundations across all topics with extra scaffolding and practice."
    case "builder":
      return "You have solid basic knowledge. Some foundational content will be compressed so you can move faster to applied scenarios."
    case "strategist":
      return "Strong financial awareness! Foundational lessons in your strong areas are validated — you'll jump into strategic-level challenges."
    case "investor":
      return "Impressive skills! Many foundational and applied lessons are validated. You'll start with advanced case studies and deeper analysis."
    case "capital-architect":
      return "Exceptional knowledge! Most introductory content is validated. Your curriculum focuses on expert-level modeling, simulation, and real-world application."
    default:
      return "Let's personalize your learning journey!"
  }
}
