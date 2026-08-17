// InvestiBank - the Virtual Bank page (/bank).
//
// Styled as an old-money private bank (deep green, mint trim, pinstripes).
// Every visit opens in the LOBBY - a drawn bank façade where Jeff greets you
// and points to four floors; each floor then takes over the full page, with a
// "Lobby" button top-right to switch. Four floors:
//   01 The Vault       - savings with 2%/day compound interest
//   02 Lending Desk    - loans against your credit score
//   03 Bond Market     - fixed-term bonds, certificate style
//   04 Executive Floor - a long-running finance career
//
// Coins move through AppContext (earnJeffs/awardJeffs/spendJeffs) so the
// jeffs_history ledger stays the source of truth; bank-internal state
// (savings, loans, bonds, credit, career weeks) lives in useBankStore.

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GameNav from "@/components/GameNav"
import CareersDesk from "@/components/bank/CareersDesk"
import { ComingSoon } from "@/components/LockScreen"
import AnimatedNumber from "@/components/AnimatedNumber"
import { BankPanel, Engraving, ACCENT, ACCENT_SOFT } from "@/components/bank/theme"
import { JeffMascot } from "@/components/Jeff/JeffMascot"
import { getCareer } from "@/data/careers"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useApp } from "@/contexts/AppContext"
import { useBankStore } from "@/stores/bankStore"
import { cn } from "@/lib/utils"
import {
  LOAN_PRODUCTS, BOND_PRODUCTS, SAVINGS_DAILY_RATE, MAX_ACTIVE_LOANS,
  CREDIT_MIN, CREDIT_MAX, DAY_MS, daysUntil, isPast,
} from "@/data/bankData"
import {
  AlertTriangle, ArrowDownToLine, ArrowUpFromLine, Briefcase, ChevronRight,
  CircleDollarSign, Clock, Coins, Gauge, HandCoins, Landmark, PiggyBank,
  ReceiptText, ScrollText, Sparkles, Vault, Wallet, type LucideIcon,
} from "lucide-react"

const money = (n: number) => Math.floor(n).toLocaleString()

// Human label + color for a 300-850 credit score.
const creditRating = (s: number): { label: string; color: string } =>
  s >= 800 ? { label: "Exceptional", color: "#34d399" }
  : s >= 740 ? { label: "Very good", color: "#4ade80" }
  : s >= 670 ? { label: "Good", color: "#facc15" }
  : s >= 580 ? { label: "Fair", color: "#fb923c" }
  : { label: "Poor", color: "#f87171" }

/* ── shared bits ─────────────────────────────────────────────────────── */

function DeskLabel({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5" style={{ color: ACCENT }} /> {children}
    </h3>
  )
}

function LearnCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground flex gap-3" style={{ borderColor: `rgba(var(--brand-rgb),0.333)` }}>
      <div className="h-9 w-9 rounded-full flex items-center justify-center shrink-0 border" style={{ borderColor: `rgba(var(--brand-rgb),0.333)`, background: `rgba(var(--brand-rgb),0.078)` }}>
        <Icon className="h-4 w-4" style={{ color: ACCENT }} />
      </div>
      <p className="leading-relaxed">
        <span className="font-bold text-foreground">{title}</span> {children}
      </p>
    </div>
  )
}

/* ── Vault desk (Floor 01) ───────────────────────────────────────────── */

function VaultDesk() {
  const { jeffsBalance, awardJeffs, spendJeffs } = useApp()
  const { toast } = useToast()
  const savings = useBankStore(s => s.savings)
  const lifetimeInterest = useBankStore(s => s.lifetimeInterest)
  const deposit = useBankStore(s => s.deposit)
  const withdraw = useBankStore(s => s.withdraw)
  const [amount, setAmount] = useState("")

  const parsed = Math.floor(Number(amount))
  const valid = Number.isFinite(parsed) && parsed > 0

  const doDeposit = (n: number) => {
    if (n <= 0) return
    if (!spendJeffs(n, "Deposited into InvestiBank vault")) {
      toast({ title: "Not enough coins", description: "You can't deposit more than you have in your wallet.", variant: "destructive" })
      return
    }
    deposit(n)
    setAmount("")
    toast({ title: `Deposited ${money(n)} coins 🏦`, description: `Your vault earns ${SAVINGS_DAILY_RATE * 100}% compound interest every day.` })
  }

  const doWithdraw = (n: number) => {
    if (n <= 0) return
    if (!withdraw(n)) {
      toast({ title: "Not enough in the vault", description: "You can't withdraw more than your vault balance.", variant: "destructive" })
      return
    }
    awardJeffs(n, "Withdrew from InvestiBank vault")
    setAmount("")
    toast({ title: `Withdrew ${money(n)} coins` })
  }

  const dailyInterest = Math.floor(savings * SAVINGS_DAILY_RATE)
  const wallet = Math.floor(jeffsBalance)
  const projection = [7, 30, 90].map(days => ({
    days,
    value: Math.floor(savings * Math.pow(1 + SAVINGS_DAILY_RATE, days)),
  }))

  return (
    <div className="space-y-4">
      {/* vault door - balance + compounding forecast in one wide panel */}
      <BankPanel className="p-5 sm:p-6">
        <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-[11px] uppercase font-bold tracking-[0.14em] text-white/40">Your balance</p>
            <p className="font-display text-5xl sm:text-6xl font-extrabold mt-1" style={{ color: ACCENT_SOFT }}>
              <AnimatedNumber value={savings} />
            </p>
            <p className="text-xs text-white/40 mt-1">coins, locked behind 3 feet of steel</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge className="bg-white/5 hover:bg-white/5 border gap-1" style={{ borderColor: `rgba(var(--brand-rgb),0.267)`, color: ACCENT_SOFT }}>
                <Sparkles className="h-3 w-3" /> {SAVINGS_DAILY_RATE * 100}% / day, compounding
              </Badge>
              {savings > 0 && (
                <span className="text-xs font-bold text-primary">≈ +{money(dailyInterest)} tomorrow</span>
              )}
            </div>
          </div>
          <div>
            <Engraving className="mb-3">If you leave it alone…</Engraving>
            <div className="grid grid-cols-3 gap-2">
              {projection.map(({ days, value }) => (
                <div key={days} className="rounded-lg border px-2.5 py-2.5 text-center" style={{ borderColor: `rgba(var(--brand-rgb),0.188)`, background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-[10px] uppercase font-bold tracking-wide text-white/40">{days} days</p>
                  <p className="text-sm sm:text-base font-extrabold tabular-nums text-white mt-0.5">{savings > 0 ? money(value) : "-"}</p>
                  <p className="text-[11px] font-bold text-primary">{savings > 0 ? `+${money(value - savings)}` : " "}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/35 mt-2 text-center">
              {savings > 0
                ? lifetimeInterest > 0 ? `Lifetime interest earned: ${money(lifetimeInterest)} coins` : "Compound interest: interest earning interest."
                : "Deposit some coins to see compounding do its magic."}
            </p>
          </div>
        </div>
      </BankPanel>

      {/* teller window + explainer */}
      <div className="grid lg:grid-cols-5 gap-4 items-stretch">
        <Card variant="elevated" className="lg:col-span-3">
          <CardContent className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <DeskLabel icon={Wallet}>Teller window</DeskLabel>
              <span className="text-xs text-muted-foreground">Wallet: <span className="font-bold text-foreground">{money(wallet)}</span></span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[100, 500, 1000].map(n => (
                <Button key={n} variant="outline" size="sm" className="press-scale text-xs" disabled={wallet < n} onClick={() => setAmount(String(n))}>
                  {n.toLocaleString()}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="press-scale text-xs" disabled={wallet <= 0} onClick={() => setAmount(String(Math.floor(wallet / 2)))}>
                Half wallet
              </Button>
              <Button variant="outline" size="sm" className="press-scale text-xs" disabled={savings <= 0} onClick={() => setAmount(String(savings))}>
                Whole vault
              </Button>
            </div>
            <Input
              type="number" min={1} placeholder="Amount of coins…"
              value={amount} onChange={e => setAmount(e.target.value)}
              className="h-11 text-base font-semibold"
            />
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => valid && doDeposit(parsed)} disabled={!valid} size="lg" className="press-scale gap-1.5">
                <ArrowDownToLine className="h-4 w-4" /> Deposit
              </Button>
              <Button onClick={() => valid && doWithdraw(parsed)} disabled={!valid} size="lg" variant="outline" className="press-scale gap-1.5">
                <ArrowUpFromLine className="h-4 w-4" /> Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <LearnCard icon={PiggyBank} title="How savings work:">
            money in the vault earns compound interest - interest on your interest. Banks pay you to keep
            money with them because they lend it out to others. Come back each day and watch it grow.
          </LearnCard>
        </div>
      </div>
    </div>
  )
}

/* ── Lending desk (Floor 02) ─────────────────────────────────────────── */

function creditTier(score: number): { label: string; color: string } {
  if (score >= 760) return { label: "Excellent", color: "#34d399" }
  if (score >= 700) return { label: "Great", color: "#4ade80" }
  if (score >= 620) return { label: "Good", color: "#facc15" }
  if (score >= 500) return { label: "Fair", color: "#fb923c" }
  return { label: "Needs work", color: "#f87171" }
}

/** Semicircular brass gauge for the credit score. */
function CreditGauge({ score }: { score: number }) {
  const pct = (score - CREDIT_MIN) / (CREDIT_MAX - CREDIT_MIN)
  const angle = -90 + pct * 180
  const tier = creditTier(score)
  return (
    <div className="relative w-52 mx-auto">
      <svg viewBox="0 0 200 110" className="w-full">
        <defs>
          <linearGradient id="creditArc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <path d="M 15 105 A 85 85 0 0 1 185 105" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M 15 105 A 85 85 0 0 1 185 105"
          fill="none" stroke="url(#creditArc)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${pct * 267} 267`}
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
        {/* needle */}
        <g transform={`rotate(${angle} 100 105)`} style={{ transition: "transform 0.8s ease" }}>
          <line x1="100" y1="105" x2="100" y2="34" stroke={ACCENT_SOFT} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="105" r="6" fill={ACCENT} />
        </g>
      </svg>
      <div className="absolute inset-x-0 -bottom-1 text-center">
        <span className="font-display text-3xl font-extrabold" style={{ color: tier.color }}>
          <AnimatedNumber value={score} />
        </span>
        <span className="ml-2 text-xs font-bold" style={{ color: tier.color }}>{tier.label}</span>
      </div>
    </div>
  )
}

function LoansDesk() {
  const { jeffsBalance, awardJeffs, spendJeffs } = useApp()
  const { toast } = useToast()
  const creditScore = useBankStore(s => s.creditScore)
  const loans = useBankStore(s => s.loans)
  const loansRepaid = useBankStore(s => s.loansRepaid)
  const takeLoan = useBankStore(s => s.takeLoan)
  const repayLoan = useBankStore(s => s.repayLoan)

  const borrow = (productId: string) => {
    const product = LOAN_PRODUCTS.find(p => p.id === productId)!
    const totalDue = Math.round(product.amount * (1 + product.interestRate))
    takeLoan({
      productId,
      principal: product.amount,
      totalDue,
      takenAt: new Date().toISOString(),
      dueAt: new Date(Date.now() + product.termDays * DAY_MS).toISOString(),
    })
    awardJeffs(product.amount, `Borrowed: ${product.name}`)
    toast({
      title: `Borrowed ${money(product.amount)} coins 💸`,
      description: `Repay ${money(totalDue)} within ${product.termDays} days to boost your credit score.`,
    })
  }

  const repay = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId)
    if (!loan) return
    if (!spendJeffs(loan.totalDue, `Repaid loan (${loan.productId})`)) {
      toast({ title: "Not enough coins", description: `You need ${money(loan.totalDue)} coins to repay this loan.`, variant: "destructive" })
      return
    }
    const onTime = !isPast(loan.dueAt)
    repayLoan(loanId)
    toast({
      title: onTime ? "Loan repaid on time! 🎉" : "Loan repaid",
      description: onTime ? "Credit score +25. Banks love reliable borrowers." : "Repaid late - debt cleared, but no credit boost this time.",
    })
  }

  return (
    <div className="space-y-4">
      {/* credit desk - gauge + how the score moves, one wide panel */}
      <BankPanel className="p-5 sm:p-6">
        <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
          <CreditGauge score={creditScore} />
          <div className="space-y-2">
            <Engraving className="mb-3">How your score moves</Engraving>
            {[
              { label: "Repay a loan on time", value: "+25", color: "#6ee7b7" },
              { label: "Miss a due date", value: "-50", color: "#fca5a5" },
              { label: "Loans repaid so far", value: String(loansRepaid), color: ACCENT_SOFT },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between rounded-lg border px-3 py-2" style={{ borderColor: `rgba(var(--brand-rgb),0.188)`, background: "rgba(255,255,255,0.04)" }}>
                <span className="text-xs font-semibold text-white/60">{r.label}</span>
                <span className="font-mono text-sm font-extrabold tabular-nums" style={{ color: r.color }}>{r.value}</span>
              </div>
            ))}
            <p className="text-[11px] text-white/35 pt-1">
              Higher scores unlock bigger loans - 620+ for the Builder, 720+ for the Big Dream.
            </p>
          </div>
        </div>
      </BankPanel>

      <div className="grid lg:grid-cols-2 gap-4 items-start">
      <div className="space-y-4">
        <LearnCard icon={ScrollText} title="How credit works:">
          your credit score is your money reputation. Borrow only what you can pay back, repay on time,
          and banks will trust you with bigger loans at better rates - in this game and in real life.
        </LearnCard>

        {/* active loans */}
        {loans.length > 0 && (
          <div className="space-y-2">
            <DeskLabel icon={ReceiptText}>Your active loans</DeskLabel>
            {loans.map(loan => {
              const product = LOAN_PRODUCTS.find(p => p.id === loan.productId)
              const days = daysUntil(loan.dueAt)
              const overdue = isPast(loan.dueAt)
              return (
                <Card key={loan.id} variant="elevated" className={cn(overdue && "border-red-500/60")}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-extrabold text-sm">{product?.name ?? loan.productId}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Owe <span className="font-bold text-foreground">{money(loan.totalDue)}</span> coins ·{" "}
                        {overdue ? (
                          <span className="text-red-500 font-bold inline-flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> OVERDUE - credit hit!</span>
                        ) : (
                          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> due in {days} day{days === 1 ? "" : "s"}</span>
                        )}
                      </p>
                    </div>
                    <Button size="sm" onClick={() => repay(loan.id)} disabled={jeffsBalance < loan.totalDue} className="shrink-0 press-scale">
                      Repay {money(loan.totalDue)}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* loan products */}
      <div className="space-y-2">
        <DeskLabel icon={HandCoins}>Available loans</DeskLabel>
        {LOAN_PRODUCTS.map(product => {
          const Icon = product.icon
          const qualifies = creditScore >= product.minCredit
          const alreadyHave = loans.some(l => l.productId === product.id)
          const atMax = loans.length >= MAX_ACTIVE_LOANS
          const disabled = !qualifies || alreadyHave || atMax
          return (
            <Card key={product.id} variant="elevated" className={cn(!qualifies && "opacity-55")}>
              <CardContent className="p-4 flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-full flex items-center justify-center shrink-0 border" style={{ borderColor: `rgba(var(--brand-rgb),0.267)`, background: `rgba(var(--brand-rgb),0.078)` }}>
                  <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-extrabold text-sm">{product.name}</span>
                    <Badge variant="secondary" className="text-[10px] font-bold">{money(product.amount)} coins</Badge>
                    <Badge variant="outline" className="text-[10px]">{product.interestRate * 100}% · {product.termDays} days</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{product.blurb}</p>
                  {!qualifies && (
                    <p className="text-[11px] text-red-500 font-bold mt-1">🔒 Needs {product.minCredit}+ credit score</p>
                  )}
                </div>
                <Button size="sm" disabled={disabled} onClick={() => borrow(product.id)} className="shrink-0 press-scale">
                  {alreadyHave ? "Active" : atMax && qualifies ? "Max loans" : "Borrow"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
      </div>
    </div>
  )
}

/* ── Bond market (Floor 03) ──────────────────────────────────────────── */

function BondsDesk() {
  const { jeffsBalance, awardJeffs, spendJeffs } = useApp()
  const { toast } = useToast()
  const bonds = useBankStore(s => s.bonds)
  const buyBond = useBankStore(s => s.buyBond)
  const collectBond = useBankStore(s => s.collectBond)
  const [amounts, setAmounts] = useState<Record<string, string>>({})

  const buy = (productId: string) => {
    const product = BOND_PRODUCTS.find(p => p.id === productId)!
    const invested = Math.floor(Number(amounts[productId]))
    if (!Number.isFinite(invested) || invested < product.minInvestment) {
      toast({ title: `Minimum is ${product.minInvestment} coins`, variant: "destructive" })
      return
    }
    if (!spendJeffs(invested, `Bought ${product.name}`)) {
      toast({ title: "Not enough coins", variant: "destructive" })
      return
    }
    const payout = Math.round(invested * (1 + product.couponRate))
    buyBond({
      productId,
      invested,
      payout,
      boughtAt: new Date().toISOString(),
      maturesAt: new Date(Date.now() + product.termDays * DAY_MS).toISOString(),
    })
    setAmounts(a => ({ ...a, [productId]: "" }))
    toast({
      title: `Bought a ${product.name}! 📜`,
      description: `In ${product.termDays} days you'll collect ${money(payout)} coins (+${money(payout - invested)} profit).`,
    })
  }

  const collect = (bondId: string) => {
    const bond = bonds.find(b => b.id === bondId)
    if (!bond) return
    const product = BOND_PRODUCTS.find(p => p.id === bond.productId)
    // Roll the issuer's default chance once, at collection. The principal was
    // already spent on purchase, so a default simply means nothing comes back.
    const defaulted = Math.random() < (product?.defaultRate ?? 0)
    collectBond(bondId)
    if (defaulted) {
      toast({
        title: "Bond defaulted 💥",
        description: `${product?.name ?? "The issuer"} couldn't repay - you lost your ${money(bond.invested)} coins. That's the risk of chasing higher yields.`,
        variant: "destructive",
      })
      return
    }
    awardJeffs(bond.payout, `Bond matured (+${money(bond.payout - bond.invested)} interest)`)
    toast({ title: `Collected ${money(bond.payout)} coins! 💰`, description: `That's ${money(bond.payout - bond.invested)} coins of pure interest.` })
  }

  const riskColor = { "Very Low": "#34d399", Low: "#facc15", Medium: "#fb923c" } as const

  return (
    <div className="grid lg:grid-cols-2 gap-4 items-start">
      <div className="space-y-4">
        {/* certificates */}
        {bonds.length > 0 ? (
          <div className="space-y-3">
            <DeskLabel icon={ScrollText}>Your certificates</DeskLabel>
            {bonds.map(bond => {
              const product = BOND_PRODUCTS.find(p => p.id === bond.productId)
              const mature = isPast(bond.maturesAt)
              const days = daysUntil(bond.maturesAt)
              const total = new Date(bond.maturesAt).getTime() - new Date(bond.boughtAt).getTime()
              const elapsed = Date.now() - new Date(bond.boughtAt).getTime()
              const pct = Math.min(100, (elapsed / total) * 100)
              const serial = bond.id.replace(/\D/g, "").slice(-6).padStart(6, "0")
              return (
                <div
                  key={bond.id}
                  className="rounded-xl border-2 bg-card p-1.5"
                  style={{ borderColor: mature ? "#34d39988" : `rgba(var(--brand-rgb),0.333)` }}
                >
                  <div className="rounded-lg border border-dashed p-3.5 space-y-2.5" style={{ borderColor: `rgba(var(--brand-rgb),0.267)` }}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                        InvestiBank Bond · Nº {serial}
                      </span>
                      {mature && <Badge variant="success" className="text-[10px]">Matured</Badge>}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-extrabold text-sm">{product?.name ?? bond.productId}</p>
                        <p className="text-xs text-muted-foreground">
                          {money(bond.invested)} → <span className="font-bold text-primary dark:text-primary">{money(bond.payout)}</span> coins
                        </p>
                      </div>
                      <Button size="sm" disabled={!mature} onClick={() => collect(bond.id)} className="shrink-0 press-scale gap-1">
                        <Coins className="h-3.5 w-3.5" /> {mature ? "Collect!" : `${days}d left`}
                      </Button>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: mature ? "#34d399" : ACCENT }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed p-6 text-center" style={{ borderColor: `rgba(var(--brand-rgb),0.267)` }}>
            <ScrollText className="h-8 w-8 mx-auto mb-2" style={{ color: `rgba(var(--brand-rgb),0.533)` }} />
            <p className="font-display font-extrabold text-sm">No certificates yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Buy a bond from the market and your certificates will live here, each with a countdown to payday.
            </p>
          </div>
        )}

        <LearnCard icon={CircleDollarSign} title="How bonds work:">
          a bond is a loan <em>you</em> give to a government or company, and they pay you interest for it.
          Safer issuers pay less; riskier issuers pay more - but the higher the yield, the bigger the
          <em> default</em> chance that they can't repay and you lose what you put in. Your money stays locked until it matures.
        </LearnCard>
      </div>

      {/* bond market */}
      <div className="space-y-2">
        <DeskLabel icon={Landmark}>Today's market</DeskLabel>
        {BOND_PRODUCTS.map(product => {
          const Icon = product.icon
          return (
            <Card key={product.id} variant="elevated" className="overflow-hidden">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="h-11 w-11 rounded-full flex items-center justify-center shrink-0 border" style={{ borderColor: `rgba(var(--brand-rgb),0.267)`, background: `rgba(var(--brand-rgb),0.078)` }}>
                    <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-extrabold text-sm">{product.name}</span>
                      <Badge variant="secondary" className="text-[10px] font-bold">+{product.couponRate * 100}% in {product.termDays}d</Badge>
                      <span className="text-[10px] font-extrabold uppercase tracking-wide" style={{ color: riskColor[product.risk] }}>
                        ● {product.risk} risk
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold">
                      <span style={{ color: "#f87171" }}>{Math.round(product.defaultRate * 100)}% default</span>
                      <span className="text-muted-foreground">·</span>
                      <span style={{ color: "#34d399" }}>{Math.round((1 - product.defaultRate) * 100)}% pays out</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      <span className="font-semibold">{product.issuer}</span> - {product.blurb}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number" min={product.minInvestment}
                    placeholder={`Min ${product.minInvestment} coins`}
                    value={amounts[product.id] ?? ""}
                    onChange={e => setAmounts(a => ({ ...a, [product.id]: e.target.value }))}
                    className="h-9"
                  />
                  <Button
                    size="sm" className="h-9 shrink-0 press-scale"
                    disabled={jeffsBalance < product.minInvestment}
                    onClick={() => buy(product.id)}
                  >
                    Buy bond
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────────── */

type Floor = "vault" | "lending" | "bonds" | "careers"

const FLOORS: { id: Floor; num: string; name: string; desc: string; blurb: string; icon: LucideIcon }[] = [
  { id: "vault", num: "01", name: "The Vault", desc: "Savings & interest", blurb: "Park your coins and let compound interest do the heavy lifting.", icon: Vault },
  { id: "lending", num: "02", name: "Lending Desk", desc: "Loans & credit", blurb: "Borrow against your credit score - and build it by paying on time.", icon: HandCoins },
  { id: "bonds", num: "03", name: "Bond Market", desc: "Fixed income", blurb: "Lend your money out for a fixed term and collect the interest at maturity.", icon: ScrollText },
  { id: "careers", num: "04", name: "Executive Floor", desc: "Your career", blurb: "Work a real finance job, week after week.", icon: Briefcase },
]

/* ── Bank building illustration ──────────────────────────────────────── */

function BankBuilding({ className }: { className?: string }) {
  const stroke = ACCENT_SOFT
  const fill = `rgba(var(--brand-rgb),0.149)`
  return (
    <svg viewBox="0 0 340 210" className={className} aria-hidden>
      {/* ground */}
      <line x1="12" y1="196" x2="328" y2="196" stroke={`rgba(var(--brand-rgb),0.333)`} strokeWidth="2.5" strokeLinecap="round" />
      {/* steps */}
      <rect x="52" y="186" width="236" height="10" rx="2" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <rect x="64" y="176" width="212" height="10" rx="2" fill={fill} stroke={stroke} strokeWidth="2.5" />
      {/* columns */}
      {[86, 138, 190, 242].map(x => (
        <g key={x}>
          <rect x={x} y="98" width="14" height="78" rx="2" fill={fill} stroke={stroke} strokeWidth="2.5" />
          <rect x={x - 4} y="92" width="22" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="2.5" />
          <rect x={x - 4} y="170" width="22" height="6" rx="2" fill={fill} stroke={stroke} strokeWidth="2.5" />
        </g>
      ))}
      {/* door between middle columns */}
      <path d="M 158 176 v-32 a 13 13 0 0 1 26 0 v 32 z" fill={`rgba(var(--brand-rgb),0.251)`} stroke={stroke} strokeWidth="2.5" />
      {/* entablature */}
      <rect x="66" y="78" width="208" height="14" rx="3" fill={fill} stroke={stroke} strokeWidth="2.5" />
      {/* pediment */}
      <path d="M 170 26 L 62 78 L 278 78 Z" fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      {/* coin emblem in the pediment */}
      <circle cx="170" cy="60" r="11" fill={`rgba(var(--brand-rgb),0.251)`} stroke={stroke} strokeWidth="2.5" />
      <text x="170" y="65" textAnchor="middle" fontSize="13" fontWeight="800" fill={stroke}>¢</text>
      {/* flag */}
      <line x1="170" y1="26" x2="170" y2="10" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 170 10 h 20 l -5 5 5 5 h -20 z" fill={`rgba(var(--brand-rgb),0.4)`} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      {/* bushes */}
      <circle cx="40" cy="188" r="9" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <circle cx="302" cy="188" r="9" fill={fill} stroke={stroke} strokeWidth="2.5" />
      {/* floating coins */}
      <circle cx="46" cy="70" r="8" fill={`rgba(var(--brand-rgb),0.2)`} stroke={stroke} strokeWidth="2" />
      <text x="46" y="74.5" textAnchor="middle" fontSize="10" fontWeight="800" fill={stroke}>¢</text>
      <circle cx="298" cy="52" r="6.5" fill={`rgba(var(--brand-rgb),0.2)`} stroke={stroke} strokeWidth="2" />
      <text x="298" y="56" textAnchor="middle" fontSize="8" fontWeight="800" fill={stroke}>¢</text>
    </svg>
  )
}

/* ── Page ────────────────────────────────────────────────────────────── */

export default function Bank() {
  const { toast } = useToast()
  const { jeffsBalance, user } = useApp()
  const accrueInterest = useBankStore(s => s.accrueInterest)
  const checkOverdueLoans = useBankStore(s => s.checkOverdueLoans)
  const savings = useBankStore(s => s.savings)
  const lifetimeInterest = useBankStore(s => s.lifetimeInterest)
  const creditScore = useBankStore(s => s.creditScore)
  const loans = useBankStore(s => s.loans)
  const bonds = useBankStore(s => s.bonds)
  const careerEarnings = useBankStore(s => s.careerEarnings)
  const activeCareer = useBankStore(s => s.activeCareer)
  const careerWeek = useBankStore(s => s.careerWeek)
  // Every visit starts in the lobby, where Jeff points you to a floor.
  const [floor, setFloor] = useState<Floor | null>(null)

  // On visit: pay out any savings interest earned since last time and apply
  // late penalties for loans that went overdue.
  useEffect(() => {
    const interest = accrueInterest()
    if (interest > 0) {
      toast({ title: `Your savings earned ${interest.toLocaleString()} coins of interest! ✨`, description: "That's compound interest working while you were away." })
    }
    const late = checkOverdueLoans()
    if (late > 0) {
      toast({
        title: "A loan went overdue 😬",
        description: "Your credit score dropped 50 points. Repay it to clear the debt, then pay on time to rebuild.",
        variant: "destructive",
      })
    }
    // Run once per visit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const matureBonds = useMemo(() => bonds.filter(b => isPast(b.maturesAt)).length, [bonds])
  const bondsValue = useMemo(() => bonds.reduce((sum, b) => sum + b.invested, 0), [bonds])
  const overdueLoans = loans.some(l => isPast(l.dueAt))

  const dot = (f: Floor) =>
    (f === "lending" && overdueLoans) ? "#f87171" : (f === "bonds" && matureBonds > 0) ? "#34d399" : null

  // Live one-liner shown on each lobby door.
  const floorStat = (f: Floor): string => {
    switch (f) {
      case "vault": return savings > 0 ? `${money(savings)} coins growing` : "Start saving today"
      case "lending": return overdueLoans ? "A loan is overdue!" : loans.length > 0 ? `${loans.length} active loan${loans.length === 1 ? "" : "s"}` : `Credit score ${creditScore}`
      case "bonds": return matureBonds > 0 ? `${matureBonds} bond${matureBonds === 1 ? "" : "s"} ready to collect!` : bonds.length > 0 ? `${bonds.length} certificate${bonds.length === 1 ? "" : "s"} maturing` : "3 bonds on the market"
      case "careers": {
        if (!activeCareer) return "Get hired today"
        const c = getCareer(activeCareer)
        return c ? `${c.name} · week ${careerWeek[activeCareer] ?? 1}` : "Get hired today"
      }
    }
  }

  const renderFloor = () => {
    switch (floor) {
      case "vault": return <VaultDesk />
      case "lending": return <LoansDesk />
      case "bonds": return <BondsDesk />
      case "careers": return <ComingSoon title="Executive Floor" bare />
      default: return null
    }
  }

  const meta = floor ? FLOORS.find(f => f.id === floor)! : null
  const firstName = user?.firstName

  // A living greeting: Jeff calls out whatever's most relevant right now instead
  // of the same canned hello every visit.
  const rating = creditRating(creditScore)
  const bankerLine = overdueLoans
    ? `Heads up${firstName ? `, ${firstName}` : ""} - a loan's gone overdue. Clear it and we'll rebuild that credit together.`
    : matureBonds > 0
    ? `${matureBonds} bond${matureBonds === 1 ? "" : "s"} just matured${firstName ? `, ${firstName}` : ""} - let's collect your payday! 💰`
    : lifetimeInterest > 0
    ? `Your vault's earned ${money(lifetimeInterest)} coins in interest while you were away${firstName ? `, ${firstName}` : ""}. Compound interest never sleeps. ✨`
    : `Let's put your ${money(jeffsBalance)} coins to work${firstName ? `, ${firstName}` : ""}. Where to first?`

  // Live lobby stats - each number rolls up on load and re-tweens when it changes.
  const bankStats: { label: string; value: number; hint: string; color: string }[] = [
    { label: "In the vault", value: savings, hint: `Growing ${(SAVINGS_DAILY_RATE * 100).toFixed(0)}%/day`, color: "hsl(var(--accent))" },
    { label: "Compounded", value: lifetimeInterest, hint: "Interest earned", color: "#34d399" },
    { label: "Credit score", value: creditScore, hint: rating.label, color: rating.color },
    { label: bonds.length > 0 ? "In bonds" : "Earned working", value: bonds.length > 0 ? bondsValue : careerEarnings, hint: bonds.length > 0 ? "Working for you" : "From finance jobs", color: "#facc15" },
  ]

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          {!floor ? (
            /* ══════════════ THE LOBBY ══════════════ */
            <motion.div
              key="lobby"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* façade: the building + Jeff at the door */}
              <BankPanel className="p-6 sm:p-8 overflow-visible">
                <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
                      Main lobby · est. 2026
                    </p>
                    <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mt-1">
                      Welcome to Investi<span style={{ color: ACCENT_SOFT }}>Bank</span>
                    </h1>
                    <div className="flex items-end gap-1 mt-5">
                      <div className="h-28 w-28 sm:h-32 sm:w-32 shrink-0 -mb-2">
                        <JeffMascot mood="encourage" />
                      </div>
                      {/* Jeff's greeting */}
                      <div
                        className="relative rounded-2xl border px-4 py-3 text-sm text-white/90 leading-relaxed mb-6"
                        style={{ borderColor: `rgba(var(--brand-rgb),0.267)`, background: "rgba(255,255,255,0.07)" }}
                      >
                        <span
                          className="absolute -left-1.5 bottom-4 w-3 h-3 rotate-45 border-l border-b"
                          style={{ borderColor: `rgba(var(--brand-rgb),0.267)`, background: "hsl(var(--primary))" }}
                        />
                        {bankerLine}
                      </div>
                    </div>
                  </div>
                  <BankBuilding className="w-full max-w-md mx-auto drop-shadow-lg" />
                </div>

                {/* Live stats strip - Jeff's readout of your bank at a glance,
                    numbers rolling instead of a static hello. */}
                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
                  {bankStats.map((st, i) => (
                    <motion.div
                      key={st.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      className="rounded-xl border px-3 py-2.5"
                      style={{ borderColor: "rgba(var(--brand-rgb),0.25)", background: "rgba(255,255,255,0.06)" }}
                    >
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/55">{st.label}</p>
                      <p className="font-display text-xl sm:text-2xl font-extrabold tabular-nums leading-none mt-1" style={{ color: st.color }}>
                        <AnimatedNumber value={st.value} countUp />
                      </p>
                      <p className="text-[10px] text-white/50 mt-0.5">{st.hint}</p>
                    </motion.div>
                  ))}
                </div>
              </BankPanel>

              {/* the four doors */}
              <div className="grid sm:grid-cols-2 gap-4">
                {FLOORS.map((f, i) => {
                  const Icon = f.icon
                  const d = dot(f.id)
                  return (
                    <motion.button
                      key={f.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.06 }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFloor(f.id)}
                      className="text-left group"
                    >
                      <div className="relative h-full rounded-2xl border border-border/60 bg-card shadow-card p-5 transition-shadow group-hover:shadow-lg overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
                        <div className="flex items-center gap-4">
                          <div
                            className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-transform group-hover:scale-105"
                            style={{ borderColor: `rgba(var(--brand-rgb),0.333)`, background: `rgba(var(--brand-rgb),0.078)` }}
                          >
                            <Icon className="h-7 w-7" style={{ color: ACCENT }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">Floor {f.num}</p>
                            <p className="font-display text-xl font-extrabold leading-tight">{f.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{f.blurb}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-1" />
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <Badge variant="secondary" className="text-[11px] font-bold gap-1.5">
                            {d && <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: d }} />}
                            {floorStat(f.id)}
                          </Badge>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            /* ══════════════ A FLOOR ══════════════ */
            <motion.div
              key={floor}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* floor bar: title left, money + lobby button right */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
                    InvestiBank · Floor {meta!.num}
                  </p>
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight">{meta!.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden md:grid grid-cols-2 gap-1.5">
                    <div className="rounded-lg border border-border bg-card px-3 py-1 text-center">
                      <p className="text-[9px] uppercase font-bold tracking-wide text-muted-foreground">Wallet</p>
                      <p className="text-sm font-extrabold tabular-nums"><AnimatedNumber value={Math.floor(jeffsBalance)} /></p>
                    </div>
                    <div className="rounded-lg border border-border bg-card px-3 py-1 text-center">
                      <p className="text-[9px] uppercase font-bold tracking-wide text-muted-foreground">Vault</p>
                      <p className="text-sm font-extrabold tabular-nums"><AnimatedNumber value={savings} /></p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setFloor(null)} className="gap-1.5 press-scale">
                    <Landmark className="h-4 w-4" style={{ color: ACCENT }} /> Lobby
                  </Button>
                </div>
              </div>

              {renderFloor()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
