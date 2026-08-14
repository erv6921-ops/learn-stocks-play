// Zustand store for the Virtual Bank page (/bank).
//
// Holds everything bank-side: vault savings (with lazy daily interest),
// active loans, owned bonds, the credit score, and career-sim progress.
// Persists to localStorage like bizLabStore. InvestiCoins themselves live in
// AppContext - this store only tracks bank-internal state; the page moves
// coins in/out via earnJeffs/awardJeffs/spendJeffs and records amounts here.

import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  SAVINGS_DAILY_RATE, CREDIT_START, CREDIT_MIN, CREDIT_MAX,
  CREDIT_ON_TIME, CREDIT_LATE, DAY_MS, isPast,
} from "@/data/bankData"
import type { PortfolioCompany } from "@/lib/careerSim"
import type { PortfolioBuyout } from "@/lib/peFund"
import type { ClientHousehold } from "@/lib/wealthBook"
import type { Engagement } from "@/lib/dealPipeline"
import type { PeVars } from "@/lib/peDealRoom"
import { INITIAL_VARS as PE_DEAL_INITIAL } from "@/lib/peDealRoom"

export interface ActiveLoan {
  id: string // unique instance id
  productId: string
  principal: number
  /** Principal + interest - what must be repaid. */
  totalDue: number
  takenAt: string // ISO
  dueAt: string // ISO
  /** Set once the late penalty has been applied so it's never applied twice. */
  penalized: boolean
}

export interface OwnedBond {
  id: string
  productId: string
  invested: number
  /** Principal + coupon paid at maturity. */
  payout: number
  boughtAt: string // ISO
  maturesAt: string // ISO
}

export interface DealResult {
  /** Points earned (0..stages*2). */
  points: number
  completedAt: string
}

/** A written deliverable (deal memo / client letter) from a career week. */
export interface WorkMemo {
  careerId: string
  week: number
  dealTitle: string
  prompt: string
  text: string
  savedAt: string
}

/** Work-file cap - keeps localStorage bounded over a long career. */
const MAX_MEMOS = 40

interface BankState {
  // Vault
  savings: number
  /** ISO timestamp interest was last accrued to. */
  lastAccrual: string | null
  lifetimeInterest: number

  // Credit
  creditScore: number
  loans: ActiveLoan[]
  loansRepaid: number

  // Bonds
  bonds: OwnedBond[]
  bondsCollected: number

  // Careers
  activeCareer: string | null
  /** careerId -> total XP (points across completed deals). */
  careerXp: Record<string, number>
  /** careerId -> current work week (1-based). Advances when the week's deal closes. */
  careerWeek: Record<string, number>
  /** careerId -> reputation 0-100. Moved by office moments + deal performance. */
  careerRep: Record<string, number>
  /** careerId -> weeks whose office moment was already answered. */
  momentsDone: Record<string, number[]>
  /** dealId -> best result. Replaying is allowed but only pays/credits XP once. */
  dealResults: Record<string, DealResult>
  /** Lifetime coins earned from career work (for the résumé). */
  careerEarnings: number
  /** Written deliverables, newest first (capped at MAX_MEMOS). */
  memos: WorkMemo[]
  /** Venture Capitalist career: startups the student has invested coins in. */
  vcPortfolio: PortfolioCompany[]
  /** Private Equity career: whole companies the student has bought. */
  pePortfolio: PortfolioBuyout[]
  /** Wealth Manager career: the book of client households under management. */
  wmBook: ClientHousehold[]
  /** Investment Banker career: live deals in the pipeline. */
  ibPipeline: Engagement[]
  /** Investment Banker career: total success fees earned (for the league table). */
  ibFeesYtd: number
  /** Private Equity career: the immersive deal-room campaign. */
  /** Which case study is active (null = at the deal picker). */
  peDealId: string | null
  peDealStep: number
  peDealVars: PeVars
  /** dealId -> best MOIC achieved, for the picker's "completed" badges. */
  peDealsDone: Record<string, number>
  /** Accrue daily compound interest on savings; returns coins of interest added. */
  accrueInterest: () => number
  deposit: (amount: number) => void
  withdraw: (amount: number) => boolean

  takeLoan: (loan: Omit<ActiveLoan, "id" | "penalized">) => void
  /** Remove a loan after repayment; bumps credit if on time. */
  repayLoan: (loanId: string) => void
  /** Apply late penalties for any overdue, unpenalized loans. Returns # penalized. */
  checkOverdueLoans: () => number

  buyBond: (bond: Omit<OwnedBond, "id">) => void
  /** Remove a matured bond (page pays out via awardJeffs). */
  collectBond: (bondId: string) => void

  chooseCareer: (careerId: string) => void
  /** Record a finished deal. Returns XP newly credited (0 on replays that didn't improve). */
  recordDeal: (careerId: string, dealId: string, points: number, coinsPaid: number) => number
  /** Advance a career's work week and nudge reputation by deal performance. */
  advanceWeek: (careerId: string, repDelta: number) => void
  /** Answer this week's office moment (records it + applies the rep change). */
  resolveMoment: (careerId: string, week: number, repDelta: number) => void
  /** File a written deliverable into the work file. */
  addMemo: (memo: Omit<WorkMemo, "savedAt">) => void

  /** VC: buy a stake in a startup (coins are spent by the page via spendJeffs). */
  investVC: (company: PortfolioCompany) => void
  /** VC: apply a weekly catch-up's outcome - patches the company + bumps rep. */
  catchUpVC: (careerId: string, id: string, patch: Partial<PortfolioCompany>, repDelta: number) => void
  /** VC: exit a holding (coins are paid out by the page via awardJeffs). */
  exitVC: (id: string, payout: number) => void

  /** PE: buy a company (equity check spent by the page via spendJeffs). */
  buyPE: (company: PortfolioBuyout) => void
  /** PE: apply a weekly operating decision - patches the company + bumps rep. */
  runPE: (careerId: string, id: string, patch: Partial<PortfolioBuyout>, repDelta: number) => void
  /** PE: exit a buyout (coins paid out by the page via awardJeffs). */
  exitPE: (id: string, payout: number) => void

  /** WM: sign a new client household into the book. */
  signClient: (client: ClientHousehold) => void
  /** WM: apply a weekly review - patches the client, bumps rep; drops them if they left. */
  reviewClient: (careerId: string, id: string, patch: Partial<ClientHousehold>, repDelta: number, left: boolean) => void

  /** IB: win a mandate, adding a live engagement to the pipeline. */
  winMandate: (engagement: Engagement) => void
  /** IB: work a deal a stage - patches it, bumps rep, banks any success fee. The
   * engagement stays (its status shows closed/dead) until dismissed. */
  workDeal: (careerId: string, id: string, patch: Partial<Engagement>, repDelta: number, fee: number) => void
  /** IB: remove a finished (closed/dead) engagement from the pipeline. */
  dismissDeal: (id: string) => void

  /** PE deal room: begin (or replay) a case study from the top. */
  peDealStart: (dealId: string, initVars: Partial<PeVars>) => void
  /** PE deal room: advance to a step, merging any changes into the deal vars. */
  peDealAdvance: (nextStep: number, patch?: Partial<PeVars>) => void
  /** PE deal room: leave the active deal, back to the picker. */
  peDealExit: () => void
  /** PE deal room: finish a deal, recording its best MOIC, back to the picker. */
  peDealFinish: (dealId: string, moic: number) => void
}

function clampRep(rep: number): number {
  return Math.min(100, Math.max(0, Math.round(rep)))
}

function clampCredit(score: number): number {
  return Math.min(CREDIT_MAX, Math.max(CREDIT_MIN, score))
}

export const useBankStore = create<BankState>()(
  persist(
    (set, get) => ({
      savings: 0,
      lastAccrual: null,
      lifetimeInterest: 0,
      creditScore: CREDIT_START,
      loans: [],
      loansRepaid: 0,
      bonds: [],
      bondsCollected: 0,
      activeCareer: null,
      careerXp: {},
      careerWeek: {},
      careerRep: {},
      momentsDone: {},
      dealResults: {},
      careerEarnings: 0,
      memos: [],
      vcPortfolio: [],
      pePortfolio: [],
      wmBook: [],
      ibPipeline: [],
      ibFeesYtd: 0,
      peDealId: null,
      peDealStep: 0,
      peDealVars: { ...PE_DEAL_INITIAL },
      peDealsDone: {},

      accrueInterest: () => {
        const { savings, lastAccrual } = get()
        const now = Date.now()
        if (!lastAccrual) {
          set({ lastAccrual: new Date(now).toISOString() })
          return 0
        }
        const days = Math.floor((now - new Date(lastAccrual).getTime()) / DAY_MS)
        if (days <= 0 || savings <= 0) return 0
        const grown = savings * Math.pow(1 + SAVINGS_DAILY_RATE, days)
        const interest = Math.floor(grown - savings)
        set(s => ({
          savings: s.savings + interest,
          lifetimeInterest: s.lifetimeInterest + interest,
          // Advance by whole days so partial-day interest isn't lost.
          lastAccrual: new Date(new Date(lastAccrual).getTime() + days * DAY_MS).toISOString(),
        }))
        return interest
      },

      deposit: amount =>
        set(s => ({
          savings: s.savings + amount,
          // Start the interest clock on first deposit.
          lastAccrual: s.lastAccrual ?? new Date().toISOString(),
        })),

      withdraw: amount => {
        if (amount <= 0 || amount > get().savings) return false
        set(s => ({ savings: s.savings - amount }))
        return true
      },

      takeLoan: loan =>
        set(s => ({
          loans: [...s.loans, { ...loan, id: `${loan.productId}-${Date.now()}`, penalized: false }],
        })),

      repayLoan: loanId =>
        set(s => {
          const loan = s.loans.find(l => l.id === loanId)
          if (!loan) return s
          const onTime = !isPast(loan.dueAt)
          return {
            loans: s.loans.filter(l => l.id !== loanId),
            loansRepaid: s.loansRepaid + 1,
            // Late loans already took the penalty in checkOverdueLoans; repaying
            // late still clears the debt but earns no credit bump.
            creditScore: onTime ? clampCredit(s.creditScore + CREDIT_ON_TIME) : s.creditScore,
          }
        }),

      checkOverdueLoans: () => {
        const overdue = get().loans.filter(l => !l.penalized && isPast(l.dueAt))
        if (overdue.length === 0) return 0
        set(s => ({
          loans: s.loans.map(l =>
            !l.penalized && isPast(l.dueAt) ? { ...l, penalized: true } : l
          ),
          creditScore: clampCredit(s.creditScore + CREDIT_LATE * overdue.length),
        }))
        return overdue.length
      },

      buyBond: bond =>
        set(s => ({
          bonds: [...s.bonds, { ...bond, id: `${bond.productId}-${Date.now()}` }],
        })),

      collectBond: bondId =>
        set(s => ({
          bonds: s.bonds.filter(b => b.id !== bondId),
          bondsCollected: s.bondsCollected + 1,
        })),

      chooseCareer: careerId => set({ activeCareer: careerId }),

      recordDeal: (careerId, dealId, points, coinsPaid) => {
        const prev = get().dealResults[dealId]
        const gained = Math.max(0, points - (prev?.points ?? 0))
        set(s => ({
          dealResults: {
            ...s.dealResults,
            [dealId]: {
              points: Math.max(points, prev?.points ?? 0),
              completedAt: new Date().toISOString(),
            },
          },
          careerXp: {
            ...s.careerXp,
            [careerId]: (s.careerXp[careerId] ?? 0) + gained,
          },
          careerEarnings: s.careerEarnings + coinsPaid,
        }))
        return gained
      },

      advanceWeek: (careerId, repDelta) =>
        set(s => ({
          careerWeek: { ...s.careerWeek, [careerId]: (s.careerWeek[careerId] ?? 1) + 1 },
          careerRep: { ...s.careerRep, [careerId]: clampRep((s.careerRep[careerId] ?? 50) + repDelta) },
        })),

      resolveMoment: (careerId, week, repDelta) =>
        set(s => ({
          momentsDone: { ...s.momentsDone, [careerId]: [...(s.momentsDone[careerId] ?? []), week] },
          careerRep: { ...s.careerRep, [careerId]: clampRep((s.careerRep[careerId] ?? 50) + repDelta) },
        })),

      addMemo: memo =>
        set(s => ({
          memos: [{ ...memo, savedAt: new Date().toISOString() }, ...s.memos].slice(0, MAX_MEMOS),
        })),

      investVC: company =>
        set(s =>
          s.vcPortfolio.some(c => c.id === company.id)
            ? s // already holding this stake - ignore double-invest
            : { vcPortfolio: [...s.vcPortfolio, company] }
        ),

      catchUpVC: (careerId, id, patch, repDelta) =>
        set(s => ({
          vcPortfolio: s.vcPortfolio.map(c => (c.id === id ? { ...c, ...patch } : c)),
          careerRep: {
            ...s.careerRep,
            [careerId]: clampRep((s.careerRep[careerId] ?? 50) + repDelta),
          },
        })),

      exitVC: (id, payout) =>
        set(s => ({
          vcPortfolio: s.vcPortfolio.filter(c => c.id !== id),
          careerEarnings: s.careerEarnings + payout,
        })),

      buyPE: company =>
        set(s =>
          s.pePortfolio.some(c => c.id === company.id)
            ? s
            : { pePortfolio: [...s.pePortfolio, company] }
        ),

      runPE: (careerId, id, patch, repDelta) =>
        set(s => ({
          pePortfolio: s.pePortfolio.map(c => (c.id === id ? { ...c, ...patch } : c)),
          careerRep: {
            ...s.careerRep,
            [careerId]: clampRep((s.careerRep[careerId] ?? 50) + repDelta),
          },
        })),

      exitPE: (id, payout) =>
        set(s => ({
          pePortfolio: s.pePortfolio.filter(c => c.id !== id),
          careerEarnings: s.careerEarnings + payout,
        })),

      signClient: client =>
        set(s =>
          s.wmBook.some(c => c.id === client.id) ? s : { wmBook: [...s.wmBook, client] }
        ),

      reviewClient: (careerId, id, patch, repDelta, left) =>
        set(s => ({
          wmBook: left
            ? s.wmBook.filter(c => c.id !== id)
            : s.wmBook.map(c => (c.id === id ? { ...c, ...patch } : c)),
          careerRep: {
            ...s.careerRep,
            [careerId]: clampRep((s.careerRep[careerId] ?? 50) + repDelta),
          },
        })),

      winMandate: engagement =>
        set(s =>
          s.ibPipeline.some(e => e.id === engagement.id) ? s : { ibPipeline: [...s.ibPipeline, engagement] }
        ),

      workDeal: (careerId, id, patch, repDelta, fee) =>
        set(s => ({
          ibPipeline: s.ibPipeline.map(e => (e.id === id ? { ...e, ...patch } : e)),
          ibFeesYtd: s.ibFeesYtd + fee,
          careerEarnings: s.careerEarnings + fee,
          careerRep: {
            ...s.careerRep,
            [careerId]: clampRep((s.careerRep[careerId] ?? 50) + repDelta),
          },
        })),

      dismissDeal: id =>
        set(s => ({ ibPipeline: s.ibPipeline.filter(e => e.id !== id) })),

      peDealStart: (dealId, initVars) =>
        set({ peDealId: dealId, peDealStep: 0, peDealVars: { ...PE_DEAL_INITIAL, ...initVars } }),

      peDealAdvance: (nextStep, patch) =>
        set(s => ({
          peDealStep: nextStep,
          peDealVars: patch ? { ...s.peDealVars, ...patch } : s.peDealVars,
        })),

      peDealExit: () => set({ peDealId: null, peDealStep: 0 }),

      peDealFinish: (dealId, moic) =>
        set(s => ({
          peDealId: null,
          peDealStep: 0,
          peDealsDone: { ...s.peDealsDone, [dealId]: Math.max(moic, s.peDealsDone[dealId] ?? moic) },
        })),
    }),
    {
      name: "investiplay-bank",
      version: 4,
      // v1: the VC portfolio gained full company profiles. Drop any holdings
      // saved under the earlier shape (no `profile`) so they can't crash the UI.
      // v2: added the PE buyout portfolio (default []); guard its shape too.
      migrate: (persisted: unknown) => {
        const s = persisted as Partial<BankState> | undefined
        if (s && Array.isArray(s.vcPortfolio)) {
          s.vcPortfolio = s.vcPortfolio.filter(
            c => c && typeof c === "object" && "profile" in c && typeof (c as PortfolioCompany).entryValuation === "number"
          )
        }
        if (!s || !Array.isArray(s.pePortfolio)) {
          if (s) s.pePortfolio = []
        } else {
          s.pePortfolio = s.pePortfolio.filter(
            c => c && typeof c === "object" && typeof (c as PortfolioBuyout).equityIn === "number" && "profile" in c
          )
        }
        if (s && !Array.isArray(s.wmBook)) s.wmBook = []
        if (s && !Array.isArray(s.ibPipeline)) s.ibPipeline = []
        if (s && typeof s.ibFeesYtd !== "number") s.ibFeesYtd = 0
        // v3: the immersive PE deal room.
        if (s && typeof s.peDealStep !== "number") s.peDealStep = 0
        if (s && (!s.peDealVars || typeof s.peDealVars !== "object")) s.peDealVars = { ...PE_DEAL_INITIAL }
        // v4: multiple case studies + a picker.
        if (s && s.peDealId === undefined) s.peDealId = null
        if (s && (!s.peDealsDone || typeof s.peDealsDone !== "object")) s.peDealsDone = {}
        return s as BankState
      },
    }
  )
)
