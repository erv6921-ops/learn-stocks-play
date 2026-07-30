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
      { id: "w2", title: "W-2 Form", subtitle: "Wage & Tax Statement", difficulty: "beginner", reward: 500, estimatedMinutes: 12, available: false },
      { id: "1040ez", title: "1040-EZ", subtitle: "Simple Tax Return", difficulty: "intermediate", reward: 800, estimatedMinutes: 20, available: false },
    ],
  },
  {
    id: "employment",
    title: "Employment",
    icon: "💼",
    description: "Job applications and payroll documents",
    documents: [
      { id: "i9", title: "I-9 Form", subtitle: "Employment Eligibility", difficulty: "beginner", reward: 400, estimatedMinutes: 10, available: false },
      { id: "paystub", title: "Pay Stub", subtitle: "Reading Your Paycheck", difficulty: "beginner", reward: 350, estimatedMinutes: 8, available: false },
    ],
  },
  {
    id: "banking",
    title: "Banking",
    icon: "🏦",
    description: "Bank account applications and statements",
    documents: [
      { id: "bank-app", title: "Bank Account App", subtitle: "Opening a Checking Account", difficulty: "beginner", reward: 400, estimatedMinutes: 10, available: false },
      { id: "bank-statement", title: "Bank Statement", subtitle: "Reading Your Statement", difficulty: "beginner", reward: 350, estimatedMinutes: 8, available: false },
    ],
  },
  {
    id: "credit-loans",
    title: "Credit & Loans",
    icon: "💳",
    description: "Credit applications and loan documents",
    documents: [
      { id: "credit-app", title: "Credit Card App", subtitle: "Applying for Credit", difficulty: "intermediate", reward: 600, estimatedMinutes: 15, available: false },
    ],
  },
  {
    id: "insurance",
    title: "Insurance",
    icon: "🛡️",
    description: "Insurance policies and claims",
    documents: [
      { id: "auto-insurance", title: "Auto Insurance", subtitle: "Policy Application", difficulty: "intermediate", reward: 600, estimatedMinutes: 15, available: false },
    ],
  },
  {
    id: "investing",
    title: "Investing",
    icon: "📈",
    description: "Brokerage accounts and investment forms",
    documents: [
      { id: "brokerage-app", title: "Brokerage Account", subtitle: "Opening an Account", difficulty: "intermediate", reward: 700, estimatedMinutes: 15, available: false },
    ],
  },
  {
    id: "retirement",
    title: "Retirement",
    icon: "🏖️",
    description: "401(k), IRA, and retirement planning",
    documents: [
      { id: "401k-enrollment", title: "401(k) Enrollment", subtitle: "Retirement Plan Setup", difficulty: "intermediate", reward: 700, estimatedMinutes: 15, available: false },
    ],
  },
  {
    id: "estate",
    title: "Estate Planning",
    icon: "📜",
    description: "Wills, trusts, and beneficiary forms",
    documents: [
      { id: "beneficiary", title: "Beneficiary Form", subtitle: "Designating Beneficiaries", difficulty: "advanced", reward: 800, estimatedMinutes: 12, available: false },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    icon: "🏠",
    description: "Leases, mortgages, and property documents",
    documents: [
      { id: "lease", title: "Lease Agreement", subtitle: "Renting an Apartment", difficulty: "intermediate", reward: 700, estimatedMinutes: 18, available: false },
    ],
  },
  {
    id: "government",
    title: "Government Benefits",
    icon: "🏛️",
    description: "FAFSA, social security, and public programs",
    documents: [
      { id: "fafsa", title: "FAFSA", subtitle: "Financial Aid Application", difficulty: "intermediate", reward: 800, estimatedMinutes: 20, available: false },
    ],
  },
  {
    id: "small-business",
    title: "Small Business",
    icon: "🏪",
    description: "Business registration and licensing",
    documents: [
      { id: "llc", title: "LLC Formation", subtitle: "Starting a Business", difficulty: "advanced", reward: 900, estimatedMinutes: 20, available: false },
    ],
  },
  {
    id: "advanced-wealth",
    title: "Advanced Wealth",
    icon: "💎",
    description: "Trust documents and complex financial planning",
    documents: [
      { id: "trust", title: "Revocable Trust", subtitle: "Trust Document Basics", difficulty: "advanced", reward: 1000, estimatedMinutes: 25, available: false },
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
