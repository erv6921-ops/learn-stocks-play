export interface LabCategory {
  id: string
  title: string
  icon: string
  description: string
  documents: LabDocument[]
}

export interface LabDocument {
  id: string
  title: string
  subtitle: string
  difficulty: "beginner" | "intermediate" | "advanced"
  reward: number
  estimatedMinutes: number
  available: boolean
  /** Rich education intro shown before the form */
  education?: DocumentEducation
}

export interface DocumentEducation {
  whatItIs: string
  whenYouFillItOut: string
  whyItMatters: string
  whatHappensIfWrong: string
}

export interface FormField {
  id: string
  label: string
  type: "text" | "number" | "select" | "radio" | "checkbox"
  placeholder?: string
  helpText?: string
  /** Deeper explanation shown in guided mode */
  whyItMatters?: string
  options?: { value: string; label: string }[]
  required: boolean
  section: string
  sectionNumber: number
  validation?: {
    pattern?: string
    min?: number
    max?: number
    maxLength?: number
  }
}

// ═══════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════

export const labCategories: LabCategory[] = [
  {
    id: "taxes",
    title: "Taxes",
    icon: "📋",
    description: "Understand tax forms and filing basics",
    documents: [
      {
        id: "w4",
        title: "W-4 Form",
        subtitle: "Employee Withholding Certificate",
        difficulty: "beginner",
        reward: 500,
        estimatedMinutes: 15,
        available: true,
        education: {
          whatItIs: "The W-4 is a federal tax form you give to your employer when you start a new job. It tells your employer how much federal income tax to withhold from each paycheck.",
          whenYouFillItOut: "You fill out a W-4 on your first day at a new job, and you can update it anytime - after getting married, having a child, or if you owed a lot at tax time.",
          whyItMatters: "If you fill it out incorrectly, too much or too little tax gets taken from your paycheck. Too little means you'll owe money at tax time. Too much means you're giving the government an interest-free loan.",
          whatHappensIfWrong: "Incorrect withholding can lead to a surprise tax bill, underpayment penalties, or months of unnecessarily reduced paychecks. Getting it right puts you in control of your money.",
        },
      },
      {
        id: "w2",
        title: "W-2 Form",
        subtitle: "Wage & Tax Statement",
        difficulty: "beginner",
        reward: 500,
        estimatedMinutes: 12,
        available: true,
        education: {
          whatItIs: "The W-2 is a form your employer sends you every January. It summarizes how much you earned last year and how much tax was already withheld from your paychecks.",
          whenYouFillItOut: "You don't fill out a W-2 - your employer does. But you read it carefully every year to file your tax return. Here you'll practice reading and transcribing its boxes.",
          whyItMatters: "Every number on your tax return comes from this form. Box 1 (wages) and Box 2 (federal tax withheld) decide whether you get a refund or owe money.",
          whatHappensIfWrong: "Typing a box wrong onto your tax return can trigger an IRS mismatch notice, delay your refund, or make you underpay and owe penalties.",
        },
      },
      {
        id: "1040ez",
        title: "1040-EZ",
        subtitle: "Simple Tax Return",
        difficulty: "intermediate",
        reward: 800,
        estimatedMinutes: 20,
        available: true,
        education: {
          whatItIs: "A simplified federal income tax return for people with straightforward finances - a single job, no dependents, and income under the limit. It's how you officially settle up with the IRS.",
          whenYouFillItOut: "Once a year, between January and the April deadline, using the numbers from your W-2. You compare tax already withheld against tax actually owed.",
          whyItMatters: "This is where you find out if you get money back (a refund) or have to pay more. Doing it right means you keep every dollar you're owed and avoid penalties.",
          whatHappensIfWrong: "Math errors or wrong entries can shrink your refund, create a balance due with interest, or flag your return for review.",
        },
      },
    ],
  },
  {
    id: "employment",
    title: "Employment",
    icon: "💼",
    description: "Job applications and payroll documents",
    documents: [
      {
        id: "i9",
        title: "I-9 Form",
        subtitle: "Employment Eligibility",
        difficulty: "beginner",
        reward: 400,
        estimatedMinutes: 10,
        available: true,
        education: {
          whatItIs: "The I-9 verifies that you're legally allowed to work in the United States. Every employee fills one out, no exceptions.",
          whenYouFillItOut: "On or before your first day of work. You'll also show ID documents (like a passport or a driver's license plus Social Security card) to prove your identity.",
          whyItMatters: "Without a completed I-9, an employer legally cannot pay you. Getting it right is the difference between starting work on time and being sent home.",
          whatHappensIfWrong: "Errors or missing information can delay your start date, and false statements on an I-9 are a federal offense.",
        },
      },
      {
        id: "paystub",
        title: "Pay Stub",
        subtitle: "Reading Your Paycheck",
        difficulty: "beginner",
        reward: 350,
        estimatedMinutes: 8,
        available: true,
        education: {
          whatItIs: "A pay stub is the breakdown attached to your paycheck. It shows what you earned (gross pay), what was taken out (deductions), and what actually lands in your account (net pay).",
          whenYouFillItOut: "You receive one every payday. Here you'll practice reading it so you understand exactly where your money goes.",
          whyItMatters: "The gap between gross and net pay surprises most first-time workers. Knowing how to read a stub helps you budget, catch payroll errors, and understand your taxes.",
          whatHappensIfWrong: "Not checking your stub means payroll mistakes - wrong hours, missing overtime, over-withheld taxes - can go unnoticed for months.",
        },
      },
    ],
  },
  {
    id: "banking",
    title: "Banking",
    icon: "🏦",
    description: "Bank account applications and statements",
    documents: [
      {
        id: "bank-app",
        title: "Bank Account App",
        subtitle: "Opening a Checking Account",
        difficulty: "beginner",
        reward: 400,
        estimatedMinutes: 10,
        available: true,
        education: {
          whatItIs: "This is the application you complete to open your first checking or savings account. The bank collects your identity details and how you'll fund the account.",
          whenYouFillItOut: "When you're ready to stop using cash and start using a debit card, direct deposit, and online payments - usually your first real bank account.",
          whyItMatters: "A checking account is the hub of your financial life. Choosing the right account type and understanding overdraft options saves you from surprise fees.",
          whatHappensIfWrong: "Opting into overdraft coverage without understanding it can cost you $35 per overdrawn purchase. Wrong info can get an application denied.",
        },
      },
      {
        id: "bank-statement",
        title: "Bank Statement",
        subtitle: "Reading Your Statement",
        difficulty: "beginner",
        reward: 350,
        estimatedMinutes: 8,
        available: true,
        education: {
          whatItIs: "A monthly summary of everything that happened in your account: your starting balance, money in, money out, fees, and your ending balance.",
          whenYouFillItOut: "You get one every month. Reading it - and reconciling it against your own records - is a core money habit. Here you'll practice pulling the key numbers.",
          whyItMatters: "Statements are how you catch fraud, unexpected fees, and subscriptions you forgot about. Reconciling keeps your real balance and your bank's balance in sync.",
          whatHappensIfWrong: "Ignoring your statement lets fraudulent charges and junk fees slip by - and you usually have a limited window to dispute them.",
        },
      },
    ],
  },
  {
    id: "credit-loans",
    title: "Credit & Loans",
    icon: "💳",
    description: "Credit applications and loan documents",
    documents: [
      {
        id: "credit-app",
        title: "Credit Card App",
        subtitle: "Applying for Credit",
        difficulty: "intermediate",
        reward: 600,
        estimatedMinutes: 15,
        available: true,
        education: {
          whatItIs: "A credit card application asks for your identity and financial details so the issuer can decide whether to lend to you and at what limit.",
          whenYouFillItOut: "When you're building credit - often your first card as a young adult. The issuer runs a credit check based on what you submit.",
          whyItMatters: "The income and housing costs you report help set your credit limit and APR. A card, used responsibly, builds the credit history you'll need for a car or apartment.",
          whatHappensIfWrong: "Overstating income is fraud. And accepting a card without understanding its APR and fees can lead to expensive debt if you carry a balance.",
        },
      },
    ],
  },
  {
    id: "insurance",
    title: "Insurance",
    icon: "🛡️",
    description: "Insurance policies and claims",
    documents: [
      {
        id: "auto-insurance",
        title: "Auto Insurance",
        subtitle: "Policy Application",
        difficulty: "intermediate",
        reward: 600,
        estimatedMinutes: 15,
        available: true,
        education: {
          whatItIs: "An auto insurance application collects details about you and your car so the insurer can price a policy that pays for accidents, theft, or damage.",
          whenYouFillItOut: "Before you drive a car you own - it's legally required in almost every state. You'll pick coverage levels and a deductible.",
          whyItMatters: "Your choices here decide your monthly premium and how much you'd pay out of pocket after a crash. Too little coverage can be financially devastating.",
          whatHappensIfWrong: "Underreporting mileage or drivers can void a claim. Picking a deductible you can't afford means you can't actually use the insurance when you need it.",
        },
      },
    ],
  },
  {
    id: "investing",
    title: "Investing",
    icon: "📈",
    description: "Brokerage accounts and investment forms",
    documents: [
      {
        id: "brokerage-app",
        title: "Brokerage Account",
        subtitle: "Opening an Account",
        difficulty: "intermediate",
        reward: 700,
        estimatedMinutes: 15,
        available: true,
        education: {
          whatItIs: "A brokerage application opens the account you use to buy stocks, ETFs, and funds. It gathers your identity plus a financial profile required by regulators.",
          whenYouFillItOut: "When you're ready to start investing for long-term goals. Firms must ask about your income, experience, and risk tolerance before letting you trade.",
          whyItMatters: "Your risk tolerance and goals shape what you should invest in. An account opened thoughtfully is the foundation of building wealth over decades.",
          whatHappensIfWrong: "Misstating your experience or risk tolerance can put you in investments that are too aggressive - and you may panic-sell at the worst time.",
        },
      },
    ],
  },
  {
    id: "retirement",
    title: "Retirement",
    icon: "🏖️",
    description: "401(k), IRA, and retirement planning",
    documents: [
      {
        id: "401k-enrollment",
        title: "401(k) Enrollment",
        subtitle: "Retirement Plan Setup",
        difficulty: "intermediate",
        reward: 700,
        estimatedMinutes: 15,
        available: true,
        education: {
          whatItIs: "A 401(k) enrollment form sets up automatic retirement savings through your employer. You choose how much of each paycheck to invest and where.",
          whenYouFillItOut: "When you start a job that offers a 401(k). Many employers match part of what you contribute - free money you don't want to leave behind.",
          whyItMatters: "Because of compound growth, money invested in your 20s can grow many times over by retirement. Capturing the full employer match is one of the best financial moves you can make.",
          whatHappensIfWrong: "Contributing too little to get the full match leaves free money on the table. Not naming a beneficiary can tangle your savings in probate.",
        },
      },
    ],
  },
  {
    id: "estate",
    title: "Estate Planning",
    icon: "📜",
    description: "Wills, trusts, and beneficiary forms",
    documents: [
      {
        id: "beneficiary",
        title: "Beneficiary Form",
        subtitle: "Designating Beneficiaries",
        difficulty: "advanced",
        reward: 800,
        estimatedMinutes: 12,
        available: true,
        education: {
          whatItIs: "A beneficiary form names who receives an account - like a 401(k), IRA, or life insurance policy - if you pass away.",
          whenYouFillItOut: "Whenever you open a retirement or insurance account, and you update it after big life events like marriage, divorce, or a new child.",
          whyItMatters: "Beneficiary forms override your will. Whoever is named here gets the money, full stop - so keeping them current is critical.",
          whatHappensIfWrong: "Outdated forms are how ex-spouses accidentally inherit accounts. Naming no one can force the money through slow, expensive probate court.",
        },
      },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    icon: "🏠",
    description: "Leases, mortgages, and property documents",
    documents: [
      {
        id: "lease",
        title: "Lease Agreement",
        subtitle: "Renting an Apartment",
        difficulty: "intermediate",
        reward: 700,
        estimatedMinutes: 18,
        available: true,
        education: {
          whatItIs: "A lease is the legal contract between you and a landlord. It locks in your rent, how long you'll stay, and the rules for the property.",
          whenYouFillItOut: "Before you move into a rental. Once you sign, you're legally bound to the terms - so you read every line first.",
          whyItMatters: "The lease decides your monthly cost, your deposit, and what you're on the hook for. Understanding it protects your money and your credit.",
          whatHappensIfWrong: "Missing a clause about pets, utilities, or early termination can cost you your security deposit or hundreds in unexpected charges.",
        },
      },
    ],
  },
  {
    id: "government",
    title: "Government Benefits",
    icon: "🏛️",
    description: "FAFSA, social security, and public programs",
    documents: [
      {
        id: "fafsa",
        title: "FAFSA",
        subtitle: "Financial Aid Application",
        difficulty: "intermediate",
        reward: 800,
        estimatedMinutes: 20,
        available: true,
        education: {
          whatItIs: "The Free Application for Federal Student Aid determines how much financial aid - grants, work-study, and low-interest loans - you can get for college.",
          whenYouFillItOut: "Every year you're in (or heading to) college, as early as possible after it opens, because some aid is first-come, first-served.",
          whyItMatters: "The FAFSA is the single gateway to billions in aid. Filling it out - even if you think you won't qualify - can unlock free grant money you never have to repay.",
          whatHappensIfWrong: "Wrong income figures or missing the deadline can cost you thousands in aid. It's the most expensive form most students never learn to fill out.",
        },
      },
    ],
  },
  {
    id: "small-business",
    title: "Small Business",
    icon: "🏪",
    description: "Business registration and licensing",
    documents: [
      {
        id: "llc",
        title: "LLC Formation",
        subtitle: "Starting a Business",
        difficulty: "advanced",
        reward: 900,
        estimatedMinutes: 20,
        available: true,
        education: {
          whatItIs: "Articles of Organization are the document that officially creates a Limited Liability Company (LLC) with your state, turning your side hustle into a real legal business.",
          whenYouFillItOut: "When you want to separate your personal finances from your business and protect your personal assets - often once a business starts making real money.",
          whyItMatters: "An LLC shields your personal savings if the business is ever sued or owes debt. It also makes your business look legitimate to banks and customers.",
          whatHappensIfWrong: "A wrong registered agent or missing details can get your filing rejected, and skipping formation entirely leaves your personal assets exposed.",
        },
      },
    ],
  },
  {
    id: "advanced-wealth",
    title: "Advanced Wealth",
    icon: "💎",
    description: "Trust documents and complex financial planning",
    documents: [
      {
        id: "trust",
        title: "Revocable Trust",
        subtitle: "Trust Document Basics",
        difficulty: "advanced",
        reward: 1000,
        estimatedMinutes: 25,
        available: true,
        education: {
          whatItIs: "A revocable living trust is a legal container for your assets. You control it while you're alive and can change it anytime, and it passes assets to your heirs without probate.",
          whenYouFillItOut: "As your wealth grows - a home, investments, savings - and you want to control exactly how and when your heirs receive it.",
          whyItMatters: "Trusts avoid the slow, public, and costly probate process, keep your affairs private, and let you set conditions on inheritances.",
          whatHappensIfWrong: "An unfunded trust (one you never move assets into) does nothing. Naming the wrong successor trustee can hand control to someone you didn't intend.",
        },
      },
    ],
  },
]

// ═══════════════════════════════════════════════
// W-4 FORM FIELDS - enriched with whyItMatters
// ═══════════════════════════════════════════════

export const w4FormFields: FormField[] = [
  // Step 1: Personal Information
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "e.g., Alex",
    helpText: "Your legal first name as it appears on your Social Security card.",
    whyItMatters: "Your employer uses this to match your tax withholdings to your IRS records. A mismatch can delay your tax refund or create IRS notices.",
    required: true,
    section: "Step 1: Personal Information",
    sectionNumber: 1,
    validation: { maxLength: 50 },
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "e.g., Johnson",
    helpText: "Your legal last name.",
    whyItMatters: "Must match your Social Security card exactly. If you recently changed your name (e.g., marriage), update your SSA records first.",
    required: true,
    section: "Step 1: Personal Information",
    sectionNumber: 1,
    validation: { maxLength: 50 },
  },
  {
    id: "ssn",
    label: "Social Security Number",
    type: "text",
    placeholder: "XXX-XX-XXXX",
    helpText: "For this simulation, enter any 9-digit number (e.g., 123-45-6789). NEVER share your real SSN in practice exercises.",
    whyItMatters: "Your SSN is the IRS's primary identifier for you. Every dollar you earn and every tax payment gets tracked under this number. Protecting it is critical to preventing identity theft.",
    required: true,
    section: "Step 1: Personal Information",
    sectionNumber: 1,
    validation: { pattern: "^\\d{3}-?\\d{2}-?\\d{4}$" },
  },
  {
    id: "address",
    label: "Home Address",
    type: "text",
    placeholder: "e.g., 123 Main St, Miami, FL 33101",
    helpText: "Your current mailing address where you'd receive tax documents.",
    whyItMatters: "Your address determines your state tax obligations. Some states have no income tax (like Florida), while others tax heavily. It also affects where your W-2 gets mailed.",
    required: true,
    section: "Step 1: Personal Information",
    sectionNumber: 1,
    validation: { maxLength: 100 },
  },
  {
    id: "filingStatus",
    label: "Filing Status",
    type: "radio",
    helpText: "This determines your tax bracket and standard deduction amount. Most students select 'Single.'",
    whyItMatters: "Your filing status is one of the biggest factors in how much tax you pay. 'Single' and 'Married filing jointly' have very different tax brackets. Choosing wrong means your withholding will be off all year.",
    required: true,
    section: "Step 1: Personal Information",
    sectionNumber: 1,
    options: [
      { value: "single", label: "Single or Married filing separately" },
      { value: "married-jointly", label: "Married filing jointly" },
      { value: "head-of-household", label: "Head of household" },
    ],
  },
  // Step 2: Multiple Jobs
  {
    id: "multipleJobs",
    label: "Do you have more than one job at the same time?",
    type: "radio",
    helpText: "If you work two part-time jobs simultaneously, select 'Yes.' This affects how much tax is withheld from each paycheck.",
    whyItMatters: "If you have two jobs and don't indicate it here, each employer withholds as if it's your only income - meaning too little total tax is withheld. You could owe a big bill in April.",
    required: true,
    section: "Step 2: Multiple Jobs or Spouse Works",
    sectionNumber: 2,
    options: [
      { value: "no", label: "No - I have only one job" },
      { value: "yes", label: "Yes - I work multiple jobs" },
    ],
  },
  // Step 3: Claim Dependents
  {
    id: "dependents",
    label: "Number of qualifying dependents",
    type: "number",
    placeholder: "0",
    helpText: "Most students have 0 dependents. A 'dependent' is someone who relies on you financially, like a child you support.",
    whyItMatters: "Each dependent reduces your tax liability through the Child Tax Credit ($2,000/child) or other credits. Claiming dependents you don't qualify for can trigger an IRS audit.",
    required: true,
    section: "Step 3: Claim Dependents",
    sectionNumber: 3,
    validation: { min: 0, max: 10 },
  },
  // Step 4: Other Adjustments
  {
    id: "otherIncome",
    label: "Other income (not from jobs)",
    type: "number",
    placeholder: "0",
    helpText: "Income from investments, freelance work, or side hustles that isn't already being taxed. If none, enter 0.",
    whyItMatters: "Side income (Etsy, tutoring, crypto gains) is taxable. If you don't account for it here, you'll owe that tax plus possible penalties when you file. This field helps you avoid surprises.",
    required: false,
    section: "Step 4: Other Adjustments",
    sectionNumber: 4,
    validation: { min: 0 },
  },
  {
    id: "deductions",
    label: "Deductions (other than standard)",
    type: "number",
    placeholder: "0",
    helpText: "Most people take the standard deduction ($14,600 for single filers in 2024). Only enter a number if you plan to itemize.",
    whyItMatters: "Itemized deductions (mortgage interest, large charitable gifts) can reduce your taxable income beyond the standard deduction. But most young earners benefit more from the standard deduction.",
    required: false,
    section: "Step 4: Other Adjustments",
    sectionNumber: 4,
    validation: { min: 0 },
  },
  {
    id: "extraWithholding",
    label: "Extra withholding per paycheck",
    type: "number",
    placeholder: "0",
    helpText: "Want extra tax taken from each paycheck? Useful if you owed money last tax season. Most students enter 0.",
    whyItMatters: "This is a safety net. If your tax situation is complex (freelance + job, investments), adding extra withholding prevents a surprise bill. Think of it as pre-paying your taxes in small amounts.",
    required: false,
    section: "Step 4: Other Adjustments",
    sectionNumber: 4,
    validation: { min: 0 },
  },
]

// ═══════════════════════════════════════════════
// W-2 FORM FIELDS
// ═══════════════════════════════════════════════

export const w2FormFields: FormField[] = [
  {
    id: "employerEin",
    label: "Employer Identification Number (Box b)",
    type: "text",
    placeholder: "XX-XXXXXXX",
    helpText: "The employer's federal tax ID. For this simulation, enter any 9 digits (e.g., 12-3456789).",
    whyItMatters: "The EIN is how the IRS knows which employer reported your wages. It must match the W-2 exactly when you file, or your return can be flagged.",
    required: true,
    section: "Boxes a-f: Identification",
    sectionNumber: 1,
    validation: { pattern: "^\\d{2}-?\\d{7}$" },
  },
  {
    id: "employerName",
    label: "Employer Name & Address (Box c)",
    type: "text",
    placeholder: "e.g., Sunrise Cafe, 40 Ocean Dr, Miami, FL",
    helpText: "The legal name and address of the company that paid you.",
    whyItMatters: "This confirms who you worked for. If you had multiple jobs, each sends its own W-2 - you need all of them to file correctly.",
    required: true,
    section: "Boxes a-f: Identification",
    sectionNumber: 1,
    validation: { maxLength: 120 },
  },
  {
    id: "employeeSsn",
    label: "Your Social Security Number (Box a)",
    type: "text",
    placeholder: "XXX-XX-XXXX",
    helpText: "For this simulation, enter any 9-digit number. Never use your real SSN in practice.",
    whyItMatters: "Your wages are reported to the IRS under this number. A typo here means the IRS can't match your income to you.",
    required: true,
    section: "Boxes a-f: Identification",
    sectionNumber: 1,
    validation: { pattern: "^\\d{3}-?\\d{2}-?\\d{4}$" },
  },
  {
    id: "box1Wages",
    label: "Box 1 - Wages, tips, other compensation",
    type: "number",
    placeholder: "e.g., 18500",
    helpText: "The total taxable income you earned this year. This is the headline number on your W-2.",
    whyItMatters: "Box 1 is the starting point of your entire tax return. Every calculation - your tax bracket, your refund - builds from this number.",
    required: true,
    section: "Boxes 1-6: Federal Wages & Taxes",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "box2FedTax",
    label: "Box 2 - Federal income tax withheld",
    type: "number",
    placeholder: "e.g., 1200",
    helpText: "The total federal income tax your employer already sent to the IRS on your behalf.",
    whyItMatters: "This is money you've already paid. If it's more than you owe, you get a refund; if less, you pay the difference. Your W-4 choices set this amount.",
    required: true,
    section: "Boxes 1-6: Federal Wages & Taxes",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "box4SocialSecurity",
    label: "Box 4 - Social Security tax withheld",
    type: "number",
    placeholder: "e.g., 1147",
    helpText: "6.2% of your wages, withheld for Social Security. Usually a fixed percentage.",
    whyItMatters: "This funds Social Security, which you'll draw from in retirement. Unlike income tax, you don't get this back as a refund.",
    required: true,
    section: "Boxes 1-6: Federal Wages & Taxes",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "box6Medicare",
    label: "Box 6 - Medicare tax withheld",
    type: "number",
    placeholder: "e.g., 268",
    helpText: "1.45% of your wages, withheld for Medicare (healthcare for seniors).",
    whyItMatters: "Together with Social Security, this makes up 'FICA' taxes. Understanding it explains why your take-home pay is less than your salary.",
    required: true,
    section: "Boxes 1-6: Federal Wages & Taxes",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "box15State",
    label: "Box 15 - State",
    type: "text",
    placeholder: "e.g., FL",
    helpText: "The two-letter state where you earned the income.",
    whyItMatters: "Some states (like Florida and Texas) have no income tax, so these boxes may be blank. Others require a separate state return.",
    required: false,
    section: "Boxes 15-17: State Taxes",
    sectionNumber: 3,
    validation: { maxLength: 2 },
  },
  {
    id: "box17StateTax",
    label: "Box 17 - State income tax withheld",
    type: "number",
    placeholder: "0",
    helpText: "State income tax already withheld. Enter 0 if your state has no income tax.",
    whyItMatters: "This feeds your state tax return, separate from federal. Missing it can mean a surprise state bill or an unclaimed state refund.",
    required: false,
    section: "Boxes 15-17: State Taxes",
    sectionNumber: 3,
    validation: { min: 0 },
  },
]

// ═══════════════════════════════════════════════
// 1040-EZ FORM FIELDS
// ═══════════════════════════════════════════════

export const form1040ezFields: FormField[] = [
  {
    id: "filingStatus",
    label: "Filing Status",
    type: "radio",
    helpText: "How you file. Most students filing a simple return select 'Single.'",
    whyItMatters: "Your filing status sets your standard deduction and tax brackets - the two things that decide how much tax you owe.",
    required: true,
    section: "Income",
    sectionNumber: 1,
    options: [
      { value: "single", label: "Single" },
      { value: "married-jointly", label: "Married filing jointly" },
    ],
  },
  {
    id: "wages",
    label: "Wages, salaries, and tips (from W-2 Box 1)",
    type: "number",
    placeholder: "e.g., 18500",
    helpText: "Copy this straight from Box 1 of your W-2.",
    whyItMatters: "This is the bulk of your taxable income. Every later number on the return depends on getting this right.",
    required: true,
    section: "Income",
    sectionNumber: 1,
    validation: { min: 0 },
  },
  {
    id: "taxableInterest",
    label: "Taxable interest",
    type: "number",
    placeholder: "0",
    helpText: "Interest earned on savings accounts or CDs (shown on a form called a 1099-INT). Enter 0 if none.",
    whyItMatters: "Even small interest is taxable income. Banks report it to the IRS, so leaving it off can cause a mismatch.",
    required: false,
    section: "Income",
    sectionNumber: 1,
    validation: { min: 0 },
  },
  {
    id: "standardDeduction",
    label: "Standard deduction",
    type: "number",
    placeholder: "14600",
    helpText: "The amount of income that isn't taxed at all. For a single filer in 2024 it's $14,600.",
    whyItMatters: "The standard deduction shrinks your taxable income dollar-for-dollar. For most students it wipes out most or all of their tax.",
    required: true,
    section: "Payments & Tax",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "taxableIncome",
    label: "Taxable income (wages minus deduction)",
    type: "number",
    placeholder: "e.g., 3900",
    helpText: "Subtract your standard deduction from your total income. If it's negative, enter 0.",
    whyItMatters: "This is the number your tax is actually calculated on - not your full salary. Understanding this is the 'aha' of how taxes work.",
    required: true,
    section: "Payments & Tax",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "federalTaxWithheld",
    label: "Federal tax withheld (from W-2 Box 2)",
    type: "number",
    placeholder: "e.g., 1200",
    helpText: "Copy this from Box 2 of your W-2 - it's what you already paid during the year.",
    whyItMatters: "Comparing what you paid against what you owe is the whole point of the return - it decides your refund or balance due.",
    required: true,
    section: "Payments & Tax",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "result",
    label: "Refund or amount owed?",
    type: "radio",
    helpText: "If your withholding was more than your tax, you get a refund. If less, you owe.",
    whyItMatters: "This is the payoff of filing. A big refund means you over-withheld all year; owing a lot means you under-withheld. Either way, your W-4 controls it.",
    required: true,
    section: "Refund or Amount You Owe",
    sectionNumber: 3,
    options: [
      { value: "refund", label: "I get a refund (withheld more than I owe)" },
      { value: "owe", label: "I owe money (withheld less than I owe)" },
    ],
  },
]

// ═══════════════════════════════════════════════
// I-9 FORM FIELDS
// ═══════════════════════════════════════════════

export const i9FormFields: FormField[] = [
  {
    id: "lastName",
    label: "Last Name (Family Name)",
    type: "text",
    placeholder: "e.g., Johnson",
    helpText: "Your legal last name, exactly as on your ID documents.",
    whyItMatters: "The I-9 must match the documents you present. Any mismatch can hold up your ability to legally start work.",
    required: true,
    section: "Section 1: Employee Information and Attestation",
    sectionNumber: 1,
    validation: { maxLength: 50 },
  },
  {
    id: "firstName",
    label: "First Name (Given Name)",
    type: "text",
    placeholder: "e.g., Alex",
    helpText: "Your legal first name.",
    whyItMatters: "Employers are legally required to verify your identity against this exactly before your first paycheck.",
    required: true,
    section: "Section 1: Employee Information and Attestation",
    sectionNumber: 1,
    validation: { maxLength: 50 },
  },
  {
    id: "address",
    label: "Home Address (Street, City, State, ZIP)",
    type: "text",
    placeholder: "e.g., 123 Main St, Miami, FL 33101",
    helpText: "The address where you currently live.",
    whyItMatters: "This confirms your residence for employment records and where official notices are sent.",
    required: true,
    section: "Section 1: Employee Information and Attestation",
    sectionNumber: 1,
    validation: { maxLength: 120 },
  },
  {
    id: "dob",
    label: "Date of Birth (MM/DD/YYYY)",
    type: "text",
    placeholder: "e.g., 05/14/2007",
    helpText: "Your date of birth. Some jobs have minimum-age requirements.",
    whyItMatters: "Age verification matters for certain roles and for labor-law protections that apply to workers under 18.",
    required: true,
    section: "Section 1: Employee Information and Attestation",
    sectionNumber: 1,
    validation: { maxLength: 10 },
  },
  {
    id: "email",
    label: "Email Address",
    type: "text",
    placeholder: "e.g., alex@email.com",
    helpText: "A current email the employer can reach you at.",
    whyItMatters: "Onboarding, scheduling, and pay information often arrive by email - so accuracy keeps you in the loop.",
    required: false,
    section: "Section 1: Employee Information and Attestation",
    sectionNumber: 1,
    validation: { maxLength: 100 },
  },
  {
    id: "citizenshipStatus",
    label: "Citizenship / Immigration Status",
    type: "radio",
    helpText: "Attest to your work-authorization status. Select the one that applies to you.",
    whyItMatters: "This is the legal heart of the I-9. You'll back it up with documents, and making a false attestation is a federal crime.",
    required: true,
    section: "Section 1: Employee Information and Attestation",
    sectionNumber: 1,
    options: [
      { value: "citizen", label: "A citizen of the United States" },
      { value: "noncitizen-national", label: "A noncitizen national of the United States" },
      { value: "permanent-resident", label: "A lawful permanent resident" },
      { value: "authorized-alien", label: "A noncitizen authorized to work" },
    ],
  },
  {
    id: "documentType",
    label: "Which document(s) will you present?",
    type: "select",
    helpText: "You show either one 'List A' document (like a passport) or a combination (like a driver's license + Social Security card).",
    whyItMatters: "You can't complete an I-9 without acceptable ID. Knowing what counts saves you a trip home on your first day.",
    required: true,
    section: "Section 1: Employee Information and Attestation",
    sectionNumber: 1,
    options: [
      { value: "passport", label: "U.S. Passport (List A - proves both)" },
      { value: "license-ssn", label: "Driver's License + Social Security card (List B + C)" },
      { value: "license-birth", label: "Driver's License + Birth Certificate (List B + C)" },
    ],
  },
]

// ═══════════════════════════════════════════════
// PAY STUB FIELDS
// ═══════════════════════════════════════════════

export const payStubFields: FormField[] = [
  {
    id: "hoursWorked",
    label: "Hours worked this period",
    type: "number",
    placeholder: "e.g., 80",
    helpText: "Total hours in this pay period (a two-week period is often around 80 hours).",
    whyItMatters: "Always check this matches the hours you actually worked - payroll errors here directly shrink your pay.",
    required: true,
    section: "Earnings",
    sectionNumber: 1,
    validation: { min: 0 },
  },
  {
    id: "hourlyRate",
    label: "Hourly rate",
    type: "number",
    placeholder: "e.g., 15",
    helpText: "Your pay per hour before any deductions.",
    whyItMatters: "Hours times rate should equal your gross pay. If it doesn't, you may be owed overtime or missing pay.",
    required: true,
    section: "Earnings",
    sectionNumber: 1,
    validation: { min: 0 },
  },
  {
    id: "grossPay",
    label: "Gross pay",
    type: "number",
    placeholder: "e.g., 1200",
    helpText: "Your total earnings before anything is taken out.",
    whyItMatters: "Gross pay is the 'big number,' but it's not what you take home. The gap between this and net pay is what surprises new workers.",
    required: true,
    section: "Earnings",
    sectionNumber: 1,
    validation: { min: 0 },
  },
  {
    id: "federalTax",
    label: "Federal income tax withheld",
    type: "number",
    placeholder: "e.g., 96",
    helpText: "Federal tax taken out this paycheck, based on your W-4.",
    whyItMatters: "This is your W-4 in action. If it's way off from what you'll owe, you can adjust your W-4 to fix your paychecks.",
    required: true,
    section: "Deductions",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "socialSecurity",
    label: "Social Security (6.2%)",
    type: "number",
    placeholder: "e.g., 74",
    helpText: "6.2% of your gross pay, withheld for Social Security.",
    whyItMatters: "This funds your future retirement benefits. It's mandatory and not refundable at tax time.",
    required: true,
    section: "Deductions",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "medicare",
    label: "Medicare (1.45%)",
    type: "number",
    placeholder: "e.g., 17",
    helpText: "1.45% of your gross pay, withheld for Medicare.",
    whyItMatters: "Together with Social Security these are 'FICA' taxes - a fixed slice of every paycheck you'll see your whole working life.",
    required: true,
    section: "Deductions",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "netPay",
    label: "Net pay (take-home)",
    type: "number",
    placeholder: "e.g., 1013",
    helpText: "Gross pay minus all deductions - the amount that actually hits your bank account.",
    whyItMatters: "This is the number to budget around. Learning to plan on net pay, not gross, is the foundation of not overspending.",
    required: true,
    section: "Net Pay",
    sectionNumber: 3,
    validation: { min: 0 },
  },
]

// ═══════════════════════════════════════════════
// BANK ACCOUNT APPLICATION FIELDS
// ═══════════════════════════════════════════════

export const bankAppFields: FormField[] = [
  {
    id: "fullName",
    label: "Full Legal Name",
    type: "text",
    placeholder: "e.g., Alex Johnson",
    helpText: "Your name exactly as it appears on your government ID.",
    whyItMatters: "Banks must verify your identity by law ('Know Your Customer' rules). A mismatch with your ID stops the application.",
    required: true,
    section: "Personal Information",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "dob",
    label: "Date of Birth (MM/DD/YYYY)",
    type: "text",
    placeholder: "e.g., 05/14/2007",
    helpText: "Minors may need a parent as a joint owner to open an account.",
    whyItMatters: "Your age determines whether you can open the account solo or need a co-owner, and which account types you qualify for.",
    required: true,
    section: "Personal Information",
    sectionNumber: 1,
    validation: { maxLength: 10 },
  },
  {
    id: "ssn",
    label: "Social Security Number",
    type: "text",
    placeholder: "XXX-XX-XXXX",
    helpText: "For this simulation, enter any 9-digit number. Never use your real SSN here.",
    whyItMatters: "Banks report the interest you earn to the IRS under your SSN. It's also part of verifying you're really you.",
    required: true,
    section: "Identification",
    sectionNumber: 2,
    validation: { pattern: "^\\d{3}-?\\d{2}-?\\d{4}$" },
  },
  {
    id: "idType",
    label: "Government ID type",
    type: "select",
    helpText: "The photo ID you'll present to prove your identity.",
    whyItMatters: "No valid ID, no account. Knowing what's accepted means you show up prepared.",
    required: true,
    section: "Identification",
    sectionNumber: 2,
    options: [
      { value: "license", label: "Driver's License / State ID" },
      { value: "passport", label: "U.S. Passport" },
      { value: "school-id", label: "School ID (with a second document)" },
    ],
  },
  {
    id: "accountType",
    label: "Account type",
    type: "radio",
    helpText: "Checking is for everyday spending; savings is for setting money aside and earning a little interest.",
    whyItMatters: "Picking the right account (or both) shapes how you spend and save. Many people open a checking + savings pair.",
    required: true,
    section: "Account Setup",
    sectionNumber: 3,
    options: [
      { value: "checking", label: "Checking (everyday spending & debit card)" },
      { value: "savings", label: "Savings (set money aside, earn interest)" },
    ],
  },
  {
    id: "initialDeposit",
    label: "Initial deposit amount",
    type: "number",
    placeholder: "e.g., 25",
    helpText: "Many accounts require a small opening deposit (often $25).",
    whyItMatters: "Some accounts waive monthly fees if you keep a minimum balance - so your opening deposit can save you money later.",
    required: true,
    section: "Account Setup",
    sectionNumber: 3,
    validation: { min: 0 },
  },
  {
    id: "overdraft",
    label: "Overdraft coverage",
    type: "radio",
    helpText: "Overdraft coverage lets purchases go through when your balance hits zero - but usually charges ~$35 each time.",
    whyItMatters: "Opting out means a card gets declined instead of hitting you with a $35 fee on a $4 coffee. Most experts suggest declining it.",
    required: true,
    section: "Account Setup",
    sectionNumber: 3,
    options: [
      { value: "decline", label: "Decline - just decline my card if I'm out of money" },
      { value: "opt-in", label: "Opt in - cover purchases (fees may apply)" },
    ],
  },
]

// ═══════════════════════════════════════════════
// BANK STATEMENT FIELDS
// ═══════════════════════════════════════════════

export const bankStatementFields: FormField[] = [
  {
    id: "beginningBalance",
    label: "Beginning balance",
    type: "number",
    placeholder: "e.g., 540",
    helpText: "The balance in your account at the start of the statement period.",
    whyItMatters: "This is your starting point. Beginning balance + deposits - withdrawals should equal your ending balance.",
    required: true,
    section: "Account Summary",
    sectionNumber: 1,
    validation: { min: 0 },
  },
  {
    id: "totalDeposits",
    label: "Total deposits / credits",
    type: "number",
    placeholder: "e.g., 1200",
    helpText: "All money that came into the account this period (paychecks, transfers).",
    whyItMatters: "Confirming deposits landed - like your paycheck - is the first thing to check every month.",
    required: true,
    section: "Activity",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "totalWithdrawals",
    label: "Total withdrawals / debits",
    type: "number",
    placeholder: "e.g., 980",
    helpText: "All money that left the account (purchases, bills, ATM withdrawals).",
    whyItMatters: "Scanning withdrawals is how you spot fraud or forgotten subscriptions before they add up.",
    required: true,
    section: "Activity",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "feesCharged",
    label: "Fees charged",
    type: "number",
    placeholder: "0",
    helpText: "Any fees the bank took - monthly maintenance, overdraft, ATM. Enter 0 if none.",
    whyItMatters: "Fees are silent money leaks. Spotting a monthly fee is the first step to calling the bank and getting it waived.",
    required: true,
    section: "Activity",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "endingBalance",
    label: "Ending balance",
    type: "number",
    placeholder: "e.g., 760",
    helpText: "The balance at the end of the period. Check it equals beginning + deposits - withdrawals - fees.",
    whyItMatters: "'Reconciling' - making your math match the bank's - is how you confirm no errors or fraud slipped through.",
    required: true,
    section: "Account Summary",
    sectionNumber: 1,
    validation: { min: 0 },
  },
  {
    id: "reconciles",
    label: "Does the statement reconcile?",
    type: "radio",
    helpText: "Check: beginning balance + deposits - withdrawals - fees. Does it match the ending balance?",
    whyItMatters: "If the numbers don't line up, something is wrong - a missing transaction or an error worth a phone call to the bank.",
    required: true,
    section: "Fees & Review",
    sectionNumber: 3,
    options: [
      { value: "yes", label: "Yes - the math matches" },
      { value: "no", label: "No - there's a discrepancy to investigate" },
    ],
  },
]

// ═══════════════════════════════════════════════
// CREDIT CARD APPLICATION FIELDS
// ═══════════════════════════════════════════════

export const creditAppFields: FormField[] = [
  {
    id: "fullName",
    label: "Full Legal Name",
    type: "text",
    placeholder: "e.g., Alex Johnson",
    helpText: "As it appears on your government ID.",
    whyItMatters: "The issuer pulls your credit report under your name and SSN - accuracy avoids a failed identity check.",
    required: true,
    section: "Personal Information",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "dob",
    label: "Date of Birth (MM/DD/YYYY)",
    type: "text",
    placeholder: "e.g., 05/14/2005",
    helpText: "You generally must be 18 (or have a co-signer) to get a card.",
    whyItMatters: "Age is a legal requirement for credit. Under-21 applicants must show independent income or have a co-signer.",
    required: true,
    section: "Personal Information",
    sectionNumber: 1,
    validation: { maxLength: 10 },
  },
  {
    id: "ssn",
    label: "Social Security Number",
    type: "text",
    placeholder: "XXX-XX-XXXX",
    helpText: "For this simulation, enter any 9-digit number. Never share your real SSN.",
    whyItMatters: "Your SSN links the application to your credit history - the record issuers use to decide yes or no and at what rate.",
    required: true,
    section: "Personal Information",
    sectionNumber: 1,
    validation: { pattern: "^\\d{3}-?\\d{2}-?\\d{4}$" },
  },
  {
    id: "annualIncome",
    label: "Total annual income",
    type: "number",
    placeholder: "e.g., 18000",
    helpText: "Your realistic yearly income, including part-time jobs. Report honestly.",
    whyItMatters: "Income helps set your credit limit and shows you can repay. Overstating it is fraud - understating it can mean a lower limit.",
    required: true,
    section: "Financial Information",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "employmentStatus",
    label: "Employment status",
    type: "select",
    helpText: "Your current work situation.",
    whyItMatters: "Steady income reassures the issuer you can pay your bill each month, which affects approval and your limit.",
    required: true,
    section: "Financial Information",
    sectionNumber: 2,
    options: [
      { value: "full-time", label: "Employed full-time" },
      { value: "part-time", label: "Employed part-time" },
      { value: "student", label: "Student" },
      { value: "unemployed", label: "Not currently employed" },
    ],
  },
  {
    id: "monthlyHousing",
    label: "Monthly rent or mortgage payment",
    type: "number",
    placeholder: "e.g., 0",
    helpText: "Your share of housing costs each month. Enter 0 if you live with family for free.",
    whyItMatters: "Issuers compare your housing cost to your income to judge how much new debt you can handle.",
    required: true,
    section: "Financial Information",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "requestedLimit",
    label: "Requested credit limit",
    type: "number",
    placeholder: "e.g., 500",
    helpText: "How much credit you're asking for. Starter cards often begin around $300-$1,000.",
    whyItMatters: "A limit you use responsibly (staying under 30% of it) builds strong credit. Maxing out a card hurts your score.",
    required: true,
    section: "Financial Information",
    sectionNumber: 2,
    validation: { min: 0 },
  },
]

// ═══════════════════════════════════════════════
// AUTO INSURANCE APPLICATION FIELDS
// ═══════════════════════════════════════════════

export const autoInsuranceFields: FormField[] = [
  {
    id: "driverName",
    label: "Driver's Full Name",
    type: "text",
    placeholder: "e.g., Alex Johnson",
    helpText: "The primary driver on the policy.",
    whyItMatters: "The policy only covers listed drivers. Leaving someone off who regularly drives the car can void a claim.",
    required: true,
    section: "Driver Information",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "licenseNumber",
    label: "Driver's License Number",
    type: "text",
    placeholder: "e.g., J512-8890-2201",
    helpText: "For this simulation, enter any sample license number.",
    whyItMatters: "Your driving record is tied to your license. A clean record earns lower premiums; tickets and accidents raise them.",
    required: true,
    section: "Driver Information",
    sectionNumber: 1,
    validation: { maxLength: 30 },
  },
  {
    id: "vehicle",
    label: "Vehicle Year / Make / Model",
    type: "text",
    placeholder: "e.g., 2015 Honda Civic",
    helpText: "The car you're insuring.",
    whyItMatters: "Safer, cheaper-to-repair cars cost less to insure. A flashy sports car can double your premium.",
    required: true,
    section: "Vehicle Information",
    sectionNumber: 2,
    validation: { maxLength: 60 },
  },
  {
    id: "annualMileage",
    label: "Estimated annual mileage",
    type: "number",
    placeholder: "e.g., 8000",
    helpText: "Roughly how many miles you drive per year.",
    whyItMatters: "The more you drive, the higher your accident risk - and premium. Underreporting to save money can void a claim.",
    required: true,
    section: "Vehicle Information",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "coverageType",
    label: "Coverage type",
    type: "radio",
    helpText: "Liability covers damage you cause to others; full coverage also repairs your own car.",
    whyItMatters: "Liability is cheaper but leaves your own car unprotected. For a financed or newer car, full coverage is usually required.",
    required: true,
    section: "Coverage",
    sectionNumber: 3,
    options: [
      { value: "liability", label: "Liability only (state minimum)" },
      { value: "full", label: "Full coverage (collision + comprehensive)" },
    ],
  },
  {
    id: "deductible",
    label: "Deductible",
    type: "select",
    helpText: "The amount you pay out of pocket before insurance kicks in on a claim.",
    whyItMatters: "A higher deductible lowers your monthly premium but means more cash upfront after a crash. Pick one you could actually afford.",
    required: true,
    section: "Coverage",
    sectionNumber: 3,
    options: [
      { value: "250", label: "$250 (higher premium, less out of pocket)" },
      { value: "500", label: "$500 (balanced)" },
      { value: "1000", label: "$1,000 (lower premium, more out of pocket)" },
    ],
  },
]

// ═══════════════════════════════════════════════
// BROKERAGE ACCOUNT APPLICATION FIELDS
// ═══════════════════════════════════════════════

export const brokerageAppFields: FormField[] = [
  {
    id: "fullName",
    label: "Full Legal Name",
    type: "text",
    placeholder: "e.g., Alex Johnson",
    helpText: "As it appears on your government ID.",
    whyItMatters: "Brokerages must verify your identity by law before you can trade. Accuracy prevents your account from being frozen.",
    required: true,
    section: "Personal Information",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "ssn",
    label: "Social Security Number",
    type: "text",
    placeholder: "XXX-XX-XXXX",
    helpText: "For this simulation, enter any 9-digit number. Never share your real SSN.",
    whyItMatters: "Your investment gains and dividends are reported to the IRS under your SSN. It's also part of identity verification.",
    required: true,
    section: "Personal Information",
    sectionNumber: 1,
    validation: { pattern: "^\\d{3}-?\\d{2}-?\\d{4}$" },
  },
  {
    id: "annualIncome",
    label: "Annual income",
    type: "number",
    placeholder: "e.g., 18000",
    helpText: "Your realistic yearly income.",
    whyItMatters: "Regulators require brokers to check that your investing fits your finances - this protects you from over-committing money you need.",
    required: true,
    section: "Financial Profile",
    sectionNumber: 2,
    validation: { min: 0 },
  },
  {
    id: "investmentExperience",
    label: "Investment experience",
    type: "select",
    helpText: "How familiar you are with investing.",
    whyItMatters: "Your stated experience limits access to riskier products (like options). Being honest keeps you from tools you don't understand yet.",
    required: true,
    section: "Financial Profile",
    sectionNumber: 2,
    options: [
      { value: "none", label: "None - I'm just starting" },
      { value: "some", label: "Some - I've invested a little" },
      { value: "experienced", label: "Experienced" },
    ],
  },
  {
    id: "riskTolerance",
    label: "Risk tolerance",
    type: "radio",
    helpText: "How comfortable you are with your account value going up and down.",
    whyItMatters: "Your risk tolerance should match your timeline. Young investors can often accept more ups and downs for higher long-term growth.",
    required: true,
    section: "Financial Profile",
    sectionNumber: 2,
    options: [
      { value: "conservative", label: "Conservative - protect my money" },
      { value: "moderate", label: "Moderate - balance growth and safety" },
      { value: "aggressive", label: "Aggressive - maximize long-term growth" },
    ],
  },
  {
    id: "accountType",
    label: "Account type",
    type: "select",
    helpText: "The kind of brokerage account to open.",
    whyItMatters: "A Roth IRA grows tax-free for retirement, while a regular (taxable) account is flexible. The right choice depends on your goal.",
    required: true,
    section: "Account Type",
    sectionNumber: 3,
    options: [
      { value: "individual", label: "Individual taxable (flexible, any goal)" },
      { value: "roth-ira", label: "Roth IRA (tax-free growth for retirement)" },
      { value: "traditional-ira", label: "Traditional IRA (tax-deferred retirement)" },
    ],
  },
]

// ═══════════════════════════════════════════════
// 401(k) ENROLLMENT FIELDS
// ═══════════════════════════════════════════════

export const enrollment401kFields: FormField[] = [
  {
    id: "employeeName",
    label: "Employee Full Name",
    type: "text",
    placeholder: "e.g., Alex Johnson",
    helpText: "Your name as it appears in payroll.",
    whyItMatters: "This ties your retirement contributions to you. Errors can misroute money that's meant for your future.",
    required: true,
    section: "Employee Information",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "dateOfHire",
    label: "Date of Hire (MM/DD/YYYY)",
    type: "text",
    placeholder: "e.g., 06/01/2026",
    helpText: "When you started the job. Some plans require a waiting period before you can enroll.",
    whyItMatters: "Your hire date can affect when you're eligible and when employer contributions 'vest' (become fully yours).",
    required: true,
    section: "Employee Information",
    sectionNumber: 1,
    validation: { maxLength: 10 },
  },
  {
    id: "contributionPercent",
    label: "Contribution percentage of each paycheck",
    type: "number",
    placeholder: "e.g., 6",
    helpText: "What percent of your pay to invest. A common starting point is enough to get the full employer match (often 6%).",
    whyItMatters: "This one number, thanks to compound growth over decades, can be the difference of hundreds of thousands of dollars at retirement.",
    required: true,
    section: "Contribution Elections",
    sectionNumber: 2,
    validation: { min: 0, max: 100 },
  },
  {
    id: "contributionType",
    label: "Contribution type",
    type: "radio",
    helpText: "Traditional lowers your taxes now; Roth is taxed now but grows tax-free for retirement.",
    whyItMatters: "For young workers in a low tax bracket, Roth is often powerful - you pay a little tax now and never again on decades of growth.",
    required: true,
    section: "Contribution Elections",
    sectionNumber: 2,
    options: [
      { value: "traditional", label: "Traditional (pre-tax now, taxed in retirement)" },
      { value: "roth", label: "Roth (after-tax now, tax-free in retirement)" },
    ],
  },
  {
    id: "investmentChoice",
    label: "Investment choice",
    type: "select",
    helpText: "Where your contributions get invested. A target-date fund auto-adjusts as you age and is a common default.",
    whyItMatters: "Leaving money in cash means it barely grows. A diversified fund is how your contributions actually build wealth.",
    required: true,
    section: "Contribution Elections",
    sectionNumber: 2,
    options: [
      { value: "target-date", label: "Target-date fund (auto-adjusts, hands-off)" },
      { value: "index-fund", label: "Total market index fund" },
      { value: "mix", label: "Mix of stock & bond funds" },
    ],
  },
  {
    id: "beneficiaryName",
    label: "Beneficiary name",
    type: "text",
    placeholder: "e.g., Jordan Johnson (parent)",
    helpText: "Who inherits this account if something happens to you.",
    whyItMatters: "Naming a beneficiary keeps your savings out of slow probate court and sends it straight to the person you choose.",
    required: true,
    section: "Beneficiary",
    sectionNumber: 3,
    validation: { maxLength: 80 },
  },
]

// ═══════════════════════════════════════════════
// BENEFICIARY DESIGNATION FIELDS
// ═══════════════════════════════════════════════

export const beneficiaryFields: FormField[] = [
  {
    id: "accountHolder",
    label: "Account Holder Name",
    type: "text",
    placeholder: "e.g., Alex Johnson",
    helpText: "The owner of the account (you).",
    whyItMatters: "This confirms which account the designation applies to. Each account you own needs its own beneficiary form.",
    required: true,
    section: "Account Holder",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "primaryName",
    label: "Primary beneficiary name",
    type: "text",
    placeholder: "e.g., Jordan Johnson",
    helpText: "The first person in line to inherit the account.",
    whyItMatters: "The primary beneficiary gets the money first. This designation legally overrides whatever your will says.",
    required: true,
    section: "Primary Beneficiary",
    sectionNumber: 2,
    validation: { maxLength: 80 },
  },
  {
    id: "primaryRelationship",
    label: "Relationship to you",
    type: "select",
    helpText: "How the beneficiary is related to you.",
    whyItMatters: "Relationship affects tax treatment - a spouse, for example, often has more options for inherited retirement accounts.",
    required: true,
    section: "Primary Beneficiary",
    sectionNumber: 2,
    options: [
      { value: "spouse", label: "Spouse" },
      { value: "child", label: "Child" },
      { value: "parent", label: "Parent" },
      { value: "sibling", label: "Sibling" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "primaryPercent",
    label: "Percentage to primary beneficiary",
    type: "number",
    placeholder: "e.g., 100",
    helpText: "What share this person receives. If you list only one, it's usually 100%.",
    whyItMatters: "Percentages must add up to 100%. Getting the split right avoids family disputes and legal delays.",
    required: true,
    section: "Primary Beneficiary",
    sectionNumber: 2,
    validation: { min: 0, max: 100 },
  },
  {
    id: "contingentName",
    label: "Contingent (backup) beneficiary name",
    type: "text",
    placeholder: "e.g., Sam Johnson",
    helpText: "Who inherits if your primary beneficiary has already passed away. Optional but smart.",
    whyItMatters: "A backup prevents the account from falling into probate if your primary beneficiary is no longer living.",
    required: false,
    section: "Contingent Beneficiary",
    sectionNumber: 3,
    validation: { maxLength: 80 },
  },
]

// ═══════════════════════════════════════════════
// LEASE AGREEMENT FIELDS
// ═══════════════════════════════════════════════

export const leaseFields: FormField[] = [
  {
    id: "tenantName",
    label: "Tenant Full Name",
    type: "text",
    placeholder: "e.g., Alex Johnson",
    helpText: "The person legally responsible for the lease (you).",
    whyItMatters: "Whoever signs is on the hook for the rent. Adding a roommate as a co-tenant shares that legal responsibility.",
    required: true,
    section: "Tenant Information",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "propertyAddress",
    label: "Property Address",
    type: "text",
    placeholder: "e.g., 88 Palm Ave, Apt 4B, Miami, FL",
    helpText: "The full address of the apartment you're renting.",
    whyItMatters: "The lease applies to this exact unit. Confirm it matches what you toured before signing.",
    required: true,
    section: "Tenant Information",
    sectionNumber: 1,
    validation: { maxLength: 120 },
  },
  {
    id: "leaseTerm",
    label: "Lease term (months)",
    type: "number",
    placeholder: "e.g., 12",
    helpText: "How long the lease lasts. 12 months is standard.",
    whyItMatters: "Breaking a lease early often costs 1-2 months' rent. Know the term before you commit.",
    required: true,
    section: "Property & Term",
    sectionNumber: 2,
    validation: { min: 1, max: 60 },
  },
  {
    id: "monthlyRent",
    label: "Monthly rent",
    type: "number",
    placeholder: "e.g., 1400",
    helpText: "The amount due each month. A common rule is to keep rent under ~30% of your income.",
    whyItMatters: "Rent is usually your biggest bill. Committing to too much leaves nothing for savings or emergencies.",
    required: true,
    section: "Financial Terms",
    sectionNumber: 3,
    validation: { min: 0 },
  },
  {
    id: "securityDeposit",
    label: "Security deposit",
    type: "number",
    placeholder: "e.g., 1400",
    helpText: "An upfront deposit (often one month's rent) the landlord holds against damage.",
    whyItMatters: "You get this back if you leave the place in good shape. Document the unit's condition at move-in to protect it.",
    required: true,
    section: "Financial Terms",
    sectionNumber: 3,
    validation: { min: 0 },
  },
  {
    id: "pets",
    label: "Pets?",
    type: "radio",
    helpText: "Many leases restrict pets or charge a pet deposit or monthly pet rent.",
    whyItMatters: "Bringing a pet against the lease can mean losing your deposit or eviction. Always get pet permission in writing.",
    required: true,
    section: "Financial Terms",
    sectionNumber: 3,
    options: [
      { value: "no", label: "No pets" },
      { value: "yes", label: "Yes - with landlord approval / pet fee" },
    ],
  },
]

// ═══════════════════════════════════════════════
// FAFSA FIELDS
// ═══════════════════════════════════════════════

export const fafsaFields: FormField[] = [
  {
    id: "studentName",
    label: "Student Full Name",
    type: "text",
    placeholder: "e.g., Alex Johnson",
    helpText: "Your legal name, exactly as on your Social Security card.",
    whyItMatters: "The FAFSA matches your name and SSN to federal records. A mismatch can freeze your whole application.",
    required: true,
    section: "Student Information",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "ssn",
    label: "Student Social Security Number",
    type: "text",
    placeholder: "XXX-XX-XXXX",
    helpText: "For this simulation, enter any 9-digit number. Never share your real SSN.",
    whyItMatters: "The FAFSA uses your SSN to verify identity and pull tax data. It must be exact or your aid is delayed.",
    required: true,
    section: "Student Information",
    sectionNumber: 1,
    validation: { pattern: "^\\d{3}-?\\d{2}-?\\d{4}$" },
  },
  {
    id: "stateOfResidence",
    label: "State of legal residence",
    type: "text",
    placeholder: "e.g., FL",
    helpText: "The state you legally live in. Two-letter abbreviation.",
    whyItMatters: "Many states offer their own grants and scholarships through the FAFSA - your state determines which you can get.",
    required: true,
    section: "Student Information",
    sectionNumber: 1,
    validation: { maxLength: 2 },
  },
  {
    id: "dependencyStatus",
    label: "Dependency status",
    type: "radio",
    helpText: "Most students under 24 are 'dependent' and must include parent income.",
    whyItMatters: "Dependency status decides whose income counts. Getting it wrong can massively change - or invalidate - your aid.",
    required: true,
    section: "Dependency",
    sectionNumber: 2,
    options: [
      { value: "dependent", label: "Dependent (report parent income)" },
      { value: "independent", label: "Independent (only my income)" },
    ],
  },
  {
    id: "parentIncome",
    label: "Parent annual income (if dependent)",
    type: "number",
    placeholder: "e.g., 62000",
    helpText: "Your parents' total yearly income from their tax return. Enter 0 if you're independent.",
    whyItMatters: "This is the single biggest driver of your aid amount. Lower reported income generally means more grant money.",
    required: true,
    section: "Financial Information",
    sectionNumber: 3,
    validation: { min: 0 },
  },
  {
    id: "studentIncome",
    label: "Your (student) annual income",
    type: "number",
    placeholder: "e.g., 4000",
    helpText: "What you earned from part-time or summer jobs. Enter 0 if none.",
    whyItMatters: "Students get a large income protection allowance, so a summer job usually won't hurt your aid much - but you still report it.",
    required: true,
    section: "Financial Information",
    sectionNumber: 3,
    validation: { min: 0 },
  },
  {
    id: "familySize",
    label: "Number of people in your household",
    type: "number",
    placeholder: "e.g., 4",
    helpText: "How many people your family supports, including you.",
    whyItMatters: "A bigger household spreads income further, which can increase the aid you qualify for.",
    required: true,
    section: "Financial Information",
    sectionNumber: 3,
    validation: { min: 1, max: 20 },
  },
]

// ═══════════════════════════════════════════════
// LLC FORMATION FIELDS
// ═══════════════════════════════════════════════

export const llcFields: FormField[] = [
  {
    id: "businessName",
    label: "LLC Name",
    type: "text",
    placeholder: "e.g., Sunrise Detailing LLC",
    helpText: "Your business name - it must be unique in your state and usually end in 'LLC.'",
    whyItMatters: "If the name is already taken, your filing is rejected. Most states have a free online name-availability search.",
    required: true,
    section: "Business Information",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "businessPurpose",
    label: "Business purpose",
    type: "text",
    placeholder: "e.g., Mobile car detailing services",
    helpText: "A short description of what your business does.",
    whyItMatters: "States want to know what you'll do. A clear purpose keeps your filing clean and helps with licensing later.",
    required: true,
    section: "Business Information",
    sectionNumber: 1,
    validation: { maxLength: 120 },
  },
  {
    id: "principalAddress",
    label: "Principal business address",
    type: "text",
    placeholder: "e.g., 123 Main St, Miami, FL 33101",
    helpText: "The main address of your business.",
    whyItMatters: "This becomes public record and determines which state and local rules apply to you.",
    required: true,
    section: "Business Information",
    sectionNumber: 1,
    validation: { maxLength: 120 },
  },
  {
    id: "registeredAgent",
    label: "Registered agent name",
    type: "text",
    placeholder: "e.g., Alex Johnson",
    helpText: "The person or service that receives legal mail for the business. Can be you.",
    whyItMatters: "If your LLC gets sued or served, papers go to the registered agent. No valid agent means your filing is rejected.",
    required: true,
    section: "Registered Agent",
    sectionNumber: 2,
    validation: { maxLength: 80 },
  },
  {
    id: "management",
    label: "Management structure",
    type: "radio",
    helpText: "Member-managed means the owners run it; manager-managed means you appoint a manager.",
    whyItMatters: "This sets who has authority to make decisions and sign contracts. Most small LLCs are member-managed.",
    required: true,
    section: "Management",
    sectionNumber: 3,
    options: [
      { value: "member-managed", label: "Member-managed (owners run it)" },
      { value: "manager-managed", label: "Manager-managed (appointed manager)" },
    ],
  },
  {
    id: "needsEin",
    label: "Will you get an EIN?",
    type: "radio",
    helpText: "An EIN is a free federal tax ID for your business - needed to open a business bank account or hire employees.",
    whyItMatters: "Getting an EIN keeps business and personal finances separate, which is the whole point of forming an LLC.",
    required: true,
    section: "Management",
    sectionNumber: 3,
    options: [
      { value: "yes", label: "Yes - apply for a free EIN" },
      { value: "no", label: "No - not yet" },
    ],
  },
]

// ═══════════════════════════════════════════════
// REVOCABLE TRUST FIELDS
// ═══════════════════════════════════════════════

export const trustFields: FormField[] = [
  {
    id: "grantorName",
    label: "Grantor (your) name",
    type: "text",
    placeholder: "e.g., Alex Johnson",
    helpText: "The person creating the trust and putting assets into it - you.",
    whyItMatters: "As grantor, you keep full control while alive and can change or cancel the trust anytime ('revocable').",
    required: true,
    section: "Grantor & Trustee",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "trustName",
    label: "Trust name",
    type: "text",
    placeholder: "e.g., The Alex Johnson Living Trust",
    helpText: "The formal name of the trust, often your name plus 'Living Trust.'",
    whyItMatters: "Assets get retitled into this name. A clear name keeps ownership organized and legally clean.",
    required: true,
    section: "Grantor & Trustee",
    sectionNumber: 1,
    validation: { maxLength: 100 },
  },
  {
    id: "trustee",
    label: "Trustee name",
    type: "text",
    placeholder: "e.g., Alex Johnson (yourself)",
    helpText: "Who manages the trust. For a revocable trust, this is usually you while you're alive.",
    whyItMatters: "The trustee controls the assets. Being your own trustee means nothing changes in how you use your money day to day.",
    required: true,
    section: "Grantor & Trustee",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "successorTrustee",
    label: "Successor trustee name",
    type: "text",
    placeholder: "e.g., Jordan Johnson",
    helpText: "Who takes over managing the trust if you can't - due to death or incapacity.",
    whyItMatters: "This is the key to avoiding probate: your successor can step in immediately, no court needed. Choose someone you fully trust.",
    required: true,
    section: "Grantor & Trustee",
    sectionNumber: 1,
    validation: { maxLength: 80 },
  },
  {
    id: "beneficiaries",
    label: "Beneficiaries",
    type: "text",
    placeholder: "e.g., My two children, equally",
    helpText: "Who ultimately receives the trust's assets, and in what shares.",
    whyItMatters: "Trusts let you set conditions (like 'at age 25') instead of handing over everything at once - control a plain will can't match.",
    required: true,
    section: "Beneficiaries",
    sectionNumber: 2,
    validation: { maxLength: 120 },
  },
  {
    id: "assets",
    label: "Assets to place in the trust",
    type: "text",
    placeholder: "e.g., Home, brokerage account, savings",
    helpText: "What you'll move into the trust ('funding' it).",
    whyItMatters: "An unfunded trust does nothing. Actually retitling assets into it is what lets them skip probate.",
    required: true,
    section: "Trust Terms",
    sectionNumber: 3,
    validation: { maxLength: 120 },
  },
  {
    id: "revocableAck",
    label: "This trust is revocable",
    type: "radio",
    helpText: "Confirm you understand you can change or revoke this trust anytime while you're alive and competent.",
    whyItMatters: "Revocable means flexible: you're not locked in. This flexibility is why living trusts are so popular for everyday planning.",
    required: true,
    section: "Trust Terms",
    sectionNumber: 3,
    options: [
      { value: "yes", label: "Yes - I understand I can change it anytime" },
    ],
  },
]

// ═══════════════════════════════════════════════
// FORM REGISTRY - maps a document id to its fields
// ═══════════════════════════════════════════════

export const labFormFields: Record<string, FormField[]> = {
  w4: w4FormFields,
  w2: w2FormFields,
  "1040ez": form1040ezFields,
  i9: i9FormFields,
  paystub: payStubFields,
  "bank-app": bankAppFields,
  "bank-statement": bankStatementFields,
  "credit-app": creditAppFields,
  "auto-insurance": autoInsuranceFields,
  "brokerage-app": brokerageAppFields,
  "401k-enrollment": enrollment401kFields,
  beneficiary: beneficiaryFields,
  lease: leaseFields,
  fafsa: fafsaFields,
  llc: llcFields,
  trust: trustFields,
}

// ── Completion flags (localStorage, same pattern as challenge flags) ──
export const labDoneKey = (docId: string) => `ip_lab_done_${docId}`
export function isLabDocDone(docId: string): boolean {
  try { return localStorage.getItem(labDoneKey(docId)) === "1" } catch { return false }
}
export function markLabDocDone(docId: string) {
  try { localStorage.setItem(labDoneKey(docId), "1") } catch { /* ignore */ }
}

export function getLabCategory(id: string) {
  return labCategories.find(c => c.id === id)
}

export function getLabDocument(docId: string) {
  for (const cat of labCategories) {
    const doc = cat.documents.find(d => d.id === docId)
    if (doc) return { document: doc, category: cat }
  }
  return null
}
