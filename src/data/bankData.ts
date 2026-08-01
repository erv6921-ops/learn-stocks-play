// Static product catalog for the Virtual Bank page (/bank).
//
// Time is accelerated so kids see compounding without waiting weeks:
// savings interest accrues daily, bonds mature in days, loans come due in
// days. All amounts are InvestiCoins.

import { Shield, Building2, Rocket, PiggyBank, Landmark, Factory } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// ── Savings ──────────────────────────────────────────────────────────────
/** Daily interest rate on vault savings (2%/day, compounding). */
export const SAVINGS_DAILY_RATE = 0.02

// ── Loans ────────────────────────────────────────────────────────────────
export interface LoanProduct {
  id: string
  name: string
  icon: LucideIcon
  amount: number
  /** Total interest owed on top of principal (flat, not APR - simpler for kids). */
  interestRate: number
  termDays: number
  /** Minimum credit score to qualify. */
  minCredit: number
  blurb: string
}

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: "starter",
    name: "Starter Loan",
    icon: PiggyBank,
    amount: 500,
    interestRate: 0.05,
    termDays: 7,
    minCredit: 0,
    blurb: "A small loan to get you going. Pay it back on time to build your credit score!",
  },
  {
    id: "builder",
    name: "Builder Loan",
    icon: Building2,
    amount: 2_000,
    interestRate: 0.08,
    termDays: 14,
    minCredit: 620,
    blurb: "Bigger money, bigger responsibility. Banks trust borrowers with good credit.",
  },
  {
    id: "dream",
    name: "Big Dream Loan",
    icon: Rocket,
    amount: 10_000,
    interestRate: 0.12,
    termDays: 30,
    minCredit: 720,
    blurb: "Serious capital for serious investors. Only top credit scores qualify.",
  },
]

/** Max simultaneous active loans. */
export const MAX_ACTIVE_LOANS = 2
export const CREDIT_START = 650
export const CREDIT_MIN = 300
export const CREDIT_MAX = 850
/** Credit change for paying a loan on time / letting it go overdue. */
export const CREDIT_ON_TIME = 25
export const CREDIT_LATE = -50

// ── Bonds ────────────────────────────────────────────────────────────────
export interface BondProduct {
  id: string
  name: string
  issuer: string
  icon: LucideIcon
  /** Total coupon paid at maturity (e.g. 0.03 = 3%). */
  couponRate: number
  /**
   * Chance the issuer defaults at maturity and pays nothing (e.g. 0.13 = 13%).
   * The flip side, 1 - defaultRate, is the chance you collect in full. Higher-
   * yield bonds carry a bigger default chance - that's the risk/reward tradeoff.
   */
  defaultRate: number
  termDays: number
  minInvestment: number
  risk: "Very Low" | "Low" | "Medium"
  blurb: string
}

export const BOND_PRODUCTS: BondProduct[] = [
  {
    id: "treasury",
    name: "Mini T-Bond",
    issuer: "U.S. Treasury (Jr.)",
    icon: Shield,
    couponRate: 0.03,
    defaultRate: 0.01,
    termDays: 3,
    minInvestment: 100,
    risk: "Very Low",
    blurb: "Backed by the government - the safest investment there is. Small but sure.",
  },
  {
    id: "muni",
    name: "City Builder Bond",
    issuer: "Investiville City Hall",
    icon: Landmark,
    couponRate: 0.08,
    defaultRate: 0.05,
    termDays: 7,
    minInvestment: 250,
    risk: "Low",
    blurb: "Lend money to the city to build parks and schools. Solid, steady returns.",
  },
  {
    id: "corporate",
    name: "MegaCorp Bond",
    issuer: "MegaCorp Industries",
    icon: Factory,
    couponRate: 0.2,
    defaultRate: 0.13,
    termDays: 14,
    minInvestment: 500,
    risk: "Medium",
    blurb: "Companies pay more interest than governments because lending to them is riskier.",
  },
]

// ── Shared time helpers ──────────────────────────────────────────────────
export const DAY_MS = 86_400_000

export function daysUntil(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / DAY_MS)
}

export function isPast(iso: string): boolean {
  return new Date(iso).getTime() <= Date.now()
}
