// Generated benchmark question bank — SS.912.FL personal-finance domains.
//
// These items were generated to give the benchmark enough coverage to produce a
// per-domain estimate across the major SS.912.FL strands. They are STAGED FOR
// HUMAN REVIEW ONLY: every item ships `status: "pending"` and nothing here is
// imported into the live `benchmarkQuestions`. They surface in the review queue
// at /admin/curriculum-review; a reviewer approves/rejects (persisted via
// src/lib/benchmarkReview.ts). Promotion into the live benchmark is a separate,
// deliberate manual step.
//
// Shape mirrors the existing generated_questions conventions (question text,
// full-text options, an explanation, a numeric difficulty in 0..1, and a
// `status` of "pending"), with domain + SS.912.FL standard added because these
// are benchmark items rather than upload/concept-scoped items. See the
// OUTPUT-ONLY migration ..._generated_benchmark_questions.sql for the DB schema.

export type BenchmarkDomain =
  | "earning-income"
  | "taxes"
  | "budgeting"
  | "saving-investing"
  | "credit-debt"
  | "risk-insurance"
  | "consumer-skills"

export interface GeneratedBenchmarkQuestion {
  id: string
  domain: BenchmarkDomain
  /** SS.912.FL strand this item is written to. */
  standard: string
  question: string
  options: string[]
  correctAnswer: number // 0-3
  explanation: string
  /** 0..1 (easy 0.25 / medium 0.5 / hard 0.75), matching generated_questions. */
  difficulty: number
  status: "pending" | "approved" | "rejected"
  generatedAt: string
}

export const DOMAIN_LABELS: Record<BenchmarkDomain, string> = {
  "earning-income": "Earning Income",
  taxes: "Taxes",
  budgeting: "Budgeting",
  "saving-investing": "Saving & Investing",
  "credit-debt": "Credit & Debt",
  "risk-insurance": "Risk & Insurance",
  "consumer-skills": "Consumer Skills",
}

const GEN_AT = "2026-09-08T00:00:00.000Z"

// Terse constructor to keep the bank readable. difficulty label → numeric.
const D: Record<"easy" | "medium" | "hard", number> = { easy: 0.25, medium: 0.5, hard: 0.75 }
function q(
  id: string,
  domain: BenchmarkDomain,
  standard: string,
  difficulty: "easy" | "medium" | "hard",
  question: string,
  options: [string, string, string, string],
  correctAnswer: number,
  explanation: string,
): GeneratedBenchmarkQuestion {
  return { id, domain, standard, question, options, correctAnswer, explanation, difficulty: D[difficulty], status: "pending", generatedAt: GEN_AT }
}

export const generatedBenchmarkBank: GeneratedBenchmarkQuestion[] = [
  // ── EARNING INCOME (SS.912.FL.1) ──
  q("gb-ei-1", "earning-income", "SS.912.FL.1.1", "easy",
    "Which of these is an example of earned income?",
    ["Interest paid by a savings account", "Wages from a part-time job", "A birthday cash gift", "A tax refund from the IRS"],
    1,
    "Earned income is money you receive for work you perform, such as wages, salary, or tips. The others are unearned income or transfers."),
  q("gb-ei-2", "earning-income", "SS.912.FL.1.3", "medium",
    "A job pays $16/hour for 30 hours a week. Roughly what is the gross weekly pay before deductions?",
    ["$160", "$320", "$480", "$640"],
    2,
    "Gross pay = hours × rate = 30 × $16 = $480, before any taxes or deductions are taken out."),
  q("gb-ei-3", "earning-income", "SS.912.FL.1.2", "medium",
    "Why does more education or training generally raise lifetime earning potential?",
    ["It guarantees a high salary at the first job", "It reduces the taxes you must pay", "It builds skills employers pay more for", "It eliminates the need to negotiate pay"],
    2,
    "Human capital — skills, knowledge, and credentials — makes a worker more productive and valuable, which tends to raise pay over a career."),
  q("gb-ei-4", "earning-income", "SS.912.FL.1.4", "hard",
    "A salaried job pays $45,000 with health insurance worth $6,000 and a $2,000 retirement match. A gig role pays $52,000 with no benefits. Which has higher total compensation?",
    ["The gig role, because $52,000 is the larger number", "The salaried job, at about $53,000 in total value", "They are exactly equal", "Cannot be compared without the tax rate"],
    1,
    "Total compensation includes benefits: $45,000 + $6,000 + $2,000 = $53,000 for the salaried job, edging out the $52,000 gig role (which also carries extra self-employment tax)."),
  q("gb-ei-5", "earning-income", "SS.912.FL.1.5", "easy",
    "What does 'net pay' mean on a paycheck?",
    ["Pay before any deductions", "Pay after taxes and deductions are removed", "Only the overtime portion of pay", "The employer's cost of hiring you"],
    1,
    "Net pay (take-home pay) is what remains after taxes, insurance, and other deductions are subtracted from gross pay."),
  q("gb-ei-6", "earning-income", "SS.912.FL.1.6", "medium",
    "An employer offers a 100% match on 401(k) contributions up to 5% of salary. What should an employee prioritize to avoid leaving money behind?",
    ["Contribute at least 5% to capture the full match", "Contribute nothing until age 40", "Contribute 1% to be safe", "Opt out and invest elsewhere"],
    0,
    "An employer match is essentially free money and an immediate 100% return. Contributing at least enough to get the full match is a top priority."),

  // ── TAXES (SS.912.FL.1 / taxation) ──
  q("gb-tax-1", "taxes", "SS.912.FL.1.4", "easy",
    "What is the main purpose of a W-4 form?",
    ["To report your yearly earnings to you", "To tell your employer how much tax to withhold", "To apply for a tax refund", "To open a retirement account"],
    1,
    "You give a W-4 to your employer so they know how much federal income tax to withhold from each paycheck."),
  q("gb-tax-2", "taxes", "SS.912.FL.1.4", "easy",
    "Which form does an employer send in January summarizing your wages and taxes withheld?",
    ["W-4", "W-2", "1099-NEC", "1040"],
    1,
    "A W-2 (Wage and Tax Statement) reports your annual wages and the taxes withheld; you use it to file your return."),
  q("gb-tax-3", "taxes", "SS.912.FL.1.4", "medium",
    "You earned $600 doing gig work and received a 1099-NEC with $0 withheld. What is true about the taxes?",
    ["Taxes were already paid for you", "You owe no tax on gig income", "You are responsible for paying the tax yourself", "The income is not taxable"],
    2,
    "On a 1099-NEC no tax is withheld, so the contractor must pay income tax plus self-employment tax themselves — often by setting money aside."),
  q("gb-tax-4", "taxes", "SS.912.FL.1.4", "medium",
    "The 2024 standard deduction for a single filer is $14,600. If a single filer earns $18,600 in wages, what is their taxable income (no other items)?",
    ["$18,600", "$14,600", "$4,000", "$0"],
    2,
    "Taxable income = income − standard deduction = $18,600 − $14,600 = $4,000."),
  q("gb-tax-5", "taxes", "SS.912.FL.1.4", "hard",
    "A filer had $1,200 withheld but owes $900 in total tax. What happens when they file?",
    ["They owe an extra $900", "They receive a $300 refund", "They owe an extra $300", "Nothing changes"],
    1,
    "Withholding ($1,200) exceeds tax owed ($900), so the $300 overpayment comes back as a refund."),
  q("gb-tax-6", "taxes", "SS.912.FL.1.4", "medium",
    "What are FICA taxes (Social Security and Medicare) on a paycheck?",
    ["Optional retirement savings", "Mandatory payroll taxes that fund federal programs", "A refundable state tax", "A one-time signing fee"],
    1,
    "FICA taxes are mandatory payroll deductions (6.2% Social Security + 1.45% Medicare) that fund those federal programs."),

  // ── BUDGETING (SS.912.FL.2) ──
  q("gb-bud-1", "budgeting", "SS.912.FL.2.1", "easy",
    "What is the first step in making a monthly budget?",
    ["Apply for a credit card", "Track your income and expenses", "Invest in the stock market", "Take out a loan"],
    1,
    "A budget starts with knowing how much money comes in and where it goes — tracking income and expenses."),
  q("gb-bud-2", "budgeting", "SS.912.FL.2.2", "easy",
    "In the 50/30/20 rule, what does the 20% represent?",
    ["Wants", "Needs", "Savings and debt payoff", "Taxes"],
    2,
    "The 50/30/20 guideline allocates 50% to needs, 30% to wants, and 20% to saving and paying down debt."),
  q("gb-bud-3", "budgeting", "SS.912.FL.2.3", "medium",
    "On a $2,000 monthly take-home budget using 50/30/20, how much goes to needs?",
    ["$400", "$600", "$1,000", "$1,400"],
    2,
    "Needs = 50% of $2,000 = $1,000."),
  q("gb-bud-4", "budgeting", "SS.912.FL.2.4", "medium",
    "Why is an emergency fund an important part of a budget?",
    ["It earns the highest possible return", "It covers unexpected costs without new debt", "It is required by law", "It replaces the need to save for retirement"],
    1,
    "An emergency fund (often 3–6 months of expenses) lets you handle surprises — car repairs, job loss — without borrowing at high interest."),
  q("gb-bud-5", "budgeting", "SS.912.FL.2.5", "hard",
    "A person spends $2,300 a month but takes home $2,100. What is the most sustainable fix?",
    ["Ignore it since it is close", "Cut spending or raise income to close the $200 gap", "Pay the gap with a payday loan each month", "Stop tracking the budget"],
    1,
    "Spending more than income ($200/month deficit) is unsustainable; the durable fix is reducing expenses or increasing income, not borrowing."),
  q("gb-bud-6", "budgeting", "SS.912.FL.2.6", "easy",
    "What is a 'fixed expense'?",
    ["A cost that changes every month", "A cost that stays the same, like rent", "Money you save each month", "A one-time purchase"],
    1,
    "Fixed expenses stay roughly constant month to month (rent, car payment), unlike variable expenses such as groceries."),

  // ── SAVING & INVESTING (SS.912.FL.4 / FL.5) ──
  q("gb-si-1", "saving-investing", "SS.912.FL.4.1", "easy",
    "What is compound interest?",
    ["Interest paid only on the original amount", "Interest earned on both principal and prior interest", "A fee charged on savings", "A tax on investment gains"],
    1,
    "Compound interest earns returns on your principal AND on the interest already earned, which accelerates growth over time."),
  q("gb-si-2", "saving-investing", "SS.912.FL.5.2", "medium",
    "Why does diversification reduce investment risk?",
    ["It guarantees a profit", "Different assets don't all fall at the same time", "It removes all market risk", "It increases fees"],
    1,
    "Spreading money across assets that respond differently to events reduces how much any single loss hurts the whole portfolio."),
  q("gb-si-3", "saving-investing", "SS.912.FL.5.1", "easy",
    "Which typically has the highest long-term growth potential but also the most short-term ups and downs?",
    ["A savings account", "Stocks", "A checking account", "Cash under a mattress"],
    1,
    "Stocks historically offer higher long-term returns than cash or savings, but with more short-term volatility."),
  q("gb-si-4", "saving-investing", "SS.912.FL.4.3", "medium",
    "Using the Rule of 72, about how long does money take to double at an 8% annual return?",
    ["About 4 years", "About 9 years", "About 18 years", "About 30 years"],
    1,
    "Rule of 72: 72 ÷ 8 = 9 years to double."),
  q("gb-si-5", "saving-investing", "SS.912.FL.5.4", "hard",
    "Investor A invests $200/month starting at age 20; Investor B invests $200/month starting at age 35. Both earn 7% until age 65. Who likely ends with more, and why?",
    ["B, because they invest later at higher prices", "A, because more years of compounding dominate", "They tie, since the monthly amount is equal", "Impossible to tell"],
    1,
    "Starting 15 years earlier gives compounding far more time to work, so Investor A ends with substantially more despite equal contributions."),
  q("gb-si-6", "saving-investing", "SS.912.FL.4.2", "easy",
    "What advantage does a high-yield savings account have over a regular checking account?",
    ["It pays a higher interest rate", "It has no FDIC insurance", "It cannot be withdrawn", "It charges more fees"],
    0,
    "High-yield savings accounts pay meaningfully more interest than typical checking accounts while remaining FDIC-insured and safe."),

  // ── CREDIT & DEBT (SS.912.FL.3) ──
  q("gb-cd-1", "credit-debt", "SS.912.FL.3.1", "easy",
    "What does APR measure on a loan or credit card?",
    ["The yearly cost of borrowing, including interest", "The credit limit", "The minimum payment", "The rewards rate"],
    0,
    "APR (annual percentage rate) expresses the yearly cost of borrowing, so it lets you compare loans and cards."),
  q("gb-cd-2", "credit-debt", "SS.912.FL.3.2", "medium",
    "Which factor has the LARGEST impact on a FICO credit score?",
    ["Payment history", "Number of credit cards", "Your income", "Your age"],
    0,
    "Payment history (paying on time) is the single largest factor, about 35% of a FICO score."),
  q("gb-cd-3", "credit-debt", "SS.912.FL.3.3", "medium",
    "Why is paying only the minimum on a high-APR credit card costly?",
    ["It lowers your credit limit", "Most of the balance keeps accruing interest for years", "It cancels the card", "It raises your income tax"],
    1,
    "Minimum payments barely reduce the principal, so interest keeps compounding and the balance can take years and hundreds in interest to clear."),
  q("gb-cd-4", "credit-debt", "SS.912.FL.3.4", "easy",
    "What is 'credit utilization'?",
    ["The share of your credit limit you're using", "Your total yearly income", "The number of loans you have", "The interest rate on a mortgage"],
    0,
    "Credit utilization is the percentage of available credit you're using; keeping it low (under ~30%) helps your score."),
  q("gb-cd-5", "credit-debt", "SS.912.FL.3.5", "hard",
    "You have a $2,000 balance at 24% APR. Paying it off in 3 months vs. 3 years mainly changes what?",
    ["Your credit limit", "The total interest you pay", "The APR itself", "Your income"],
    1,
    "Paying faster means less time for interest to accrue, dramatically lowering total interest paid at a high 24% APR."),
  q("gb-cd-6", "credit-debt", "SS.912.FL.3.6", "medium",
    "A friend offers $5,000 gift: pay off a $2,000 balance at 22% APR, or invest all $5,000 at an expected 8%. What's optimal?",
    ["Invest all $5,000", "Pay off the 22% debt first, then invest the rest", "Keep it all as cash", "Split evenly regardless of rates"],
    1,
    "Eliminating 22% debt is a guaranteed 22% return, which beats an expected 8% investment — pay the high-interest debt first."),

  // ── RISK & INSURANCE (SS.912.FL.6) ──
  q("gb-ri-1", "risk-insurance", "SS.912.FL.6.1", "easy",
    "What is the main purpose of insurance?",
    ["To guarantee investment profits", "To transfer the risk of large losses to an insurer", "To avoid paying any taxes", "To increase your monthly income"],
    1,
    "Insurance transfers the financial risk of costly, uncertain events (accidents, illness) to an insurer in exchange for premiums."),
  q("gb-ri-2", "risk-insurance", "SS.912.FL.6.2", "easy",
    "What is a 'deductible'?",
    ["The amount you pay out of pocket before insurance pays", "The monthly cost of the policy", "The maximum the insurer will ever pay", "A tax on the policy"],
    0,
    "A deductible is what you pay yourself on a claim before the insurer starts covering costs. Higher deductibles usually mean lower premiums."),
  q("gb-ri-3", "risk-insurance", "SS.912.FL.6.3", "medium",
    "Why do younger, healthier people usually pay lower health or life insurance premiums?",
    ["They are legally required to", "They represent lower expected risk to the insurer", "They earn more money", "They file more claims"],
    1,
    "Premiums reflect expected risk; lower-risk groups (younger, healthier) cost insurers less and are charged less."),
  q("gb-ri-4", "risk-insurance", "SS.912.FL.6.4", "medium",
    "Choosing a higher insurance deductible generally does what to your premium?",
    ["Raises the premium", "Lowers the premium", "Has no effect", "Cancels the coverage"],
    1,
    "Taking on more out-of-pocket risk (higher deductible) lowers the premium — but you must be able to afford the deductible if a claim happens."),
  q("gb-ri-5", "risk-insurance", "SS.912.FL.6.5", "hard",
    "A driver reports far fewer miles than they actually drive to lower their premium, then has a crash. What is the likely result?",
    ["A larger payout", "The claim may be denied for misrepresentation", "A lower deductible", "A tax credit"],
    1,
    "Misstating facts on an application (like mileage) is misrepresentation and can void coverage or lead to a denied claim."),
  q("gb-ri-6", "risk-insurance", "SS.912.FL.6.6", "easy",
    "Which is an example of managing risk by avoiding it?",
    ["Buying more insurance", "Not texting while driving", "Raising your deductible", "Paying a higher premium"],
    1,
    "Risk avoidance means not engaging in the risky behavior at all — like not texting while driving — versus transferring or retaining risk."),

  // ── CONSUMER SKILLS (SS.912.FL.7) ──
  q("gb-cs-1", "consumer-skills", "SS.912.FL.7.1", "easy",
    "What is the best first step before a large purchase like a laptop?",
    ["Buy the first one you see", "Compare prices and features across sellers", "Borrow money regardless of cost", "Ignore reviews"],
    1,
    "Comparison shopping — checking prices, features, and reviews — helps you get the best value and avoid overpaying."),
  q("gb-cs-2", "consumer-skills", "SS.912.FL.7.2", "medium",
    "A 'unit price' on a store shelf helps you do what?",
    ["Compare cost per ounce or item across sizes", "Calculate sales tax", "Find the store's profit", "Check the warranty"],
    0,
    "Unit price (cost per ounce/count) lets you compare value across different package sizes and brands."),
  q("gb-cs-3", "consumer-skills", "SS.912.FL.7.3", "medium",
    "An ad says 'Only $1/day!' for a subscription. What is the true yearly cost?",
    ["$12", "$100", "About $365", "$1"],
    2,
    "Framing a price per day hides the total: $1 × 365 ≈ $365 per year. Convert to a full-period cost before deciding."),
  q("gb-cs-4", "consumer-skills", "SS.912.FL.7.4", "easy",
    "Which is a warning sign of a scam?",
    ["A clear return policy", "Pressure to pay immediately with gift cards", "A verified customer service line", "A detailed receipt"],
    1,
    "Urgency plus untraceable payment (gift cards, wire transfers) is a classic scam signal. Legitimate sellers don't demand it."),
  q("gb-cs-5", "consumer-skills", "SS.912.FL.7.5", "hard",
    "Two phones: Phone A is $600 outright; Phone B is '$25/month for 30 months.' Which costs more and by how much?",
    ["Phone A, by $150", "Phone B, by $150", "They cost the same", "Phone B, by $25"],
    1,
    "Phone B totals $25 × 30 = $750, which is $150 more than Phone A's $600 — installment plans often cost more overall."),
  q("gb-cs-6", "consumer-skills", "SS.912.FL.7.6", "medium",
    "Why review a bank or credit card statement each month?",
    ["To increase your credit limit", "To catch errors, fraud, and forgotten subscriptions", "To lower your taxes", "It is legally required"],
    1,
    "Regularly checking statements is how you spot unauthorized charges, billing errors, and subscriptions you no longer use — usually within a limited dispute window."),
]

/** All domains present in the generated bank. */
export const BENCHMARK_DOMAINS: BenchmarkDomain[] = [
  "earning-income", "taxes", "budgeting", "saving-investing",
  "credit-debt", "risk-insurance", "consumer-skills",
]

/** Count of generated items per domain (for the review queue header). */
export function countByDomain(): Record<BenchmarkDomain, number> {
  const out = Object.fromEntries(BENCHMARK_DOMAINS.map((d) => [d, 0])) as Record<BenchmarkDomain, number>
  for (const item of generatedBenchmarkBank) out[item.domain]++
  return out
}
