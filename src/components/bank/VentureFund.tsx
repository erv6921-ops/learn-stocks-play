// The Venture Capitalist's living portfolio, shown under the weekly deal on
// the Careers desk. Two tabs:
//   • Portfolio - the startups you've funded. "Catch up" with a founder once a
//     week to build reputation and (for good bets) grow the company; "Exit" to
//     cash out at the current value.
//   • Invest - browse a fresh set of startups each week and put coins in.
// Coins move through AppContext (spendJeffs / awardJeffs); the holdings and
// reputation live in bankStore.

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useApp } from "@/contexts/AppContext"
import { useBankStore } from "@/stores/bankStore"
import type { Career } from "@/data/careers"
import {
  generateInvestOptions, adviseOutcome,
  type InvestOption, type PortfolioCompany,
} from "@/lib/careerSim"
import {
  Search, Coins, TrendingUp, TrendingDown, Minus, MessageSquare,
  LogOut, Sparkles, Building2, Wallet,
} from "lucide-react"

const NO_PORTFOLIO: PortfolioCompany[] = []

const STATUS_META = {
  growing: { label: "Growing", color: "#10b981", Icon: TrendingUp },
  steady: { label: "Steady", color: "#d97706", Icon: Minus },
  struggling: { label: "Struggling", color: "#ef4444", Icon: TrendingDown },
} as const

const SIGNAL_VARIANT = {
  "Strong signal": "success",
  "Mixed signal": "warning",
  "Weak signal": "destructive",
} as const

export default function VentureFund({ career, week }: { career: Career; week: number }) {
  const { jeffsBalance, spendJeffs, awardJeffs } = useApp()
  const portfolio = useBankStore(s => s.vcPortfolio) ?? NO_PORTFOLIO
  const investVC = useBankStore(s => s.investVC)
  const adviseVC = useBankStore(s => s.adviseVC)
  const exitVC = useBankStore(s => s.exitVC)

  const [tab, setTab] = useState<"portfolio" | "invest">("portfolio")
  const [advice, setAdvice] = useState<Record<string, string>>({})
  const [flash, setFlash] = useState<string | null>(null)

  const options = useMemo(() => generateInvestOptions(week), [week])
  const heldIds = useMemo(() => new Set(portfolio.map(c => c.id)), [portfolio])

  const totalInvested = portfolio.reduce((n, c) => n + c.invested, 0)
  const totalValue = portfolio.reduce((n, c) => n + Math.round(c.invested * c.multiple), 0)

  const invest = (opt: InvestOption) => {
    if (heldIds.has(opt.id)) return
    if (jeffsBalance < opt.ask) {
      setFlash(`You need ${opt.ask} coins to back ${opt.name} - you have ${Math.floor(jeffsBalance)}.`)
      return
    }
    if (!spendJeffs(opt.ask, `Invested in ${opt.name}`)) return
    investVC({
      id: opt.id, name: opt.name, founder: opt.founder, sector: opt.sector,
      pitch: opt.pitch, invested: opt.ask, ownership: opt.ownership,
      quality: opt.quality, multiple: 1, status: "steady",
      investedWeek: week, lastAdvisedWeek: 0,
    })
    setFlash(`You backed ${opt.name} for ${opt.ask} coins (${opt.ownership}% stake). It's in your portfolio.`)
    setTab("portfolio")
  }

  const advise = (c: PortfolioCompany) => {
    if (c.lastAdvisedWeek >= week) return
    const res = adviseOutcome(c, week)
    adviseVC(career.id, c.id, week, res.multiple, res.status, res.repDelta)
    setAdvice(m => ({ ...m, [c.id]: res.message }))
  }

  const exit = (c: PortfolioCompany) => {
    const payout = Math.round(c.invested * c.multiple)
    awardJeffs(payout, `Exited ${c.name} at ${c.multiple}×`)
    exitVC(c.id, payout)
    setAdvice(m => { const n = { ...m }; delete n[c.id]; return n })
    setFlash(
      payout >= c.invested
        ? `Exited ${c.name} for ${payout} coins - a ${(c.invested ? payout / c.invested : 0).toFixed(1)}× return! 🎉`
        : `Exited ${c.name} for ${payout} coins, taking a loss. Cutting losers is part of the job.`
    )
  }

  const TabButton = ({ id, label, icon: I }: { id: typeof tab; label: string; icon: typeof Search }) => (
    <button
      onClick={() => setTab(id)}
      className={cn(
        "flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors",
        tab === id ? "text-white shadow-sm" : "text-muted-foreground hover:bg-muted/60"
      )}
      style={tab === id ? { background: career.accent } : undefined}
    >
      <I className="h-3.5 w-3.5" /> {label}
      {id === "portfolio" && portfolio.length > 0 && (
        <span className={cn("ml-0.5 rounded-full px-1.5 text-[10px]", tab === id ? "bg-white/25" : "bg-muted")}>
          {portfolio.length}
        </span>
      )}
    </button>
  )

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" /> Your fund
        </h3>
        {portfolio.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold">
            <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Invested {totalInvested.toLocaleString()}</span>
            <span aria-hidden>·</span>
            <span style={{ color: totalValue >= totalInvested ? "#10b981" : "#ef4444" }}>
              Worth {totalValue.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <Card variant="elevated" className="overflow-hidden">
        <div className="p-1.5 flex gap-1.5 bg-muted/40">
          <TabButton id="portfolio" label="Portfolio" icon={Building2} />
          <TabButton id="invest" label="Invest" icon={Search} />
        </div>

        <CardContent className="p-3 sm:p-4">
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-3 rounded-lg border px-3 py-2 text-xs font-medium text-foreground/90"
                style={{ borderColor: `${career.accent}66`, background: `${career.accent}12` }}
              >
                {flash}
              </motion.div>
            )}
          </AnimatePresence>

          {tab === "portfolio" ? (
            portfolio.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <Sparkles className="h-7 w-7 mx-auto text-muted-foreground/60" />
                <p className="text-sm font-semibold">Your portfolio is empty</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Head to the <b>Invest</b> tab to back your first startup. Then catch up with the founder each week to grow it.
                </p>
                <Button size="sm" variant="outline" className="mt-1" onClick={() => setTab("invest")}>
                  Browse startups
                </Button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {portfolio.map(c => {
                  const meta = STATUS_META[c.status]
                  const value = Math.round(c.invested * c.multiple)
                  const up = value >= c.invested
                  const advisedThisWeek = c.lastAdvisedWeek >= week
                  return (
                    <div key={c.id} className="rounded-xl border border-border/60 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-extrabold text-sm">{c.name}</span>
                            <Badge variant="outline" className="text-[9px] capitalize">{c.sector}</Badge>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {c.founder} · {c.ownership}% stake · in since week {c.investedWeek}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1 justify-end text-xs font-bold" style={{ color: meta.color }}>
                            <meta.Icon className="h-3.5 w-3.5" /> {c.multiple}×
                          </div>
                          <p className="text-[10px] text-muted-foreground">{meta.label}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 text-[11px]">
                        <span className="text-muted-foreground">
                          In {c.invested.toLocaleString()} → now{" "}
                          <b style={{ color: up ? "#10b981" : "#ef4444" }}>{value.toLocaleString()}</b>
                        </span>
                      </div>

                      <AnimatePresence>
                        {advice[c.id] && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="mt-2 text-xs leading-relaxed text-foreground/80 rounded-lg bg-muted/50 px-2.5 py-2"
                          >
                            {advice[c.id]}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div className="flex gap-2 mt-2.5">
                        <Button
                          size="sm" variant="outline" className="flex-1 gap-1.5 press-scale"
                          disabled={advisedThisWeek} onClick={() => advise(c)}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          {advisedThisWeek ? "Caught up this week" : "Catch up (+2 rep)"}
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-1.5 press-scale" onClick={() => exit(c)}>
                          <LogOut className="h-3.5 w-3.5" /> Exit
                        </Button>
                      </div>
                    </div>
                  )
                })}
                <p className="text-[10px] text-muted-foreground text-center pt-1">
                  Tip: attention compounds great companies - and can't save weak ones. Feed winners, cut losers.
                </p>
              </div>
            )
          ) : (
            <div className="space-y-2.5">
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Coins className="h-3.5 w-3.5" /> You have <b className="text-foreground">{Math.floor(jeffsBalance).toLocaleString()}</b> coins · fresh startups each week
              </p>
              {options.map(opt => {
                const held = heldIds.has(opt.id)
                const afford = jeffsBalance >= opt.ask
                return (
                  <div key={opt.id} className="rounded-xl border border-border/60 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-extrabold text-sm">{opt.name}</span>
                          <Badge variant="outline" className="text-[9px] capitalize">{opt.sector}</Badge>
                          <Badge variant={SIGNAL_VARIANT[opt.signal]} className="text-[9px]">{opt.signal}</Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Founder: {opt.founder}</p>
                      </div>
                    </div>
                    <p className="text-xs text-foreground/85 leading-relaxed mt-1.5">{opt.pitch}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-[11px] font-semibold text-muted-foreground">
                        {opt.ask.toLocaleString()} coins for {opt.ownership}%
                      </span>
                      <Button
                        size="sm" className="press-scale gap-1.5"
                        disabled={held || !afford} onClick={() => invest(opt)}
                      >
                        <Coins className="h-3.5 w-3.5" />
                        {held ? "Invested ✓" : afford ? `Invest ${opt.ask}` : "Not enough"}
                      </Button>
                    </div>
                  </div>
                )
              })}
              <p className="text-[10px] text-muted-foreground text-center pt-1">
                Read the signal, not the hype. Strong traction beats a beautiful deck every time.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
