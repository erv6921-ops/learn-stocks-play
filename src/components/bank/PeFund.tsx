// The Private Equity fund, shown under the weekly deal on the Careers desk.
// Two tabs: Portfolio (companies you own and are improving) and Market (this
// week's businesses for sale). Tap any one to open its full page (BuyoutDetail),
// where you structure the debt and buy it, run the value-creation playbook, or
// exit for a MOIC. Coins flow through AppContext; holdings live in bankStore.

import { useMemo, useState } from "react"
import { useTranslation, Trans } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useApp } from "@/contexts/AppContext"
import { useBankStore } from "@/stores/bankStore"
import type { Career } from "@/data/careers"
import {
  generateBuyoutTargets, structureDeal, holdingFromTarget, equityValue,
  buyoutMOIC, buyoutEV, annualInterest,
  type BuyoutTarget, type PortfolioBuyout, type LeveragePlan, type ExitRoute,
} from "@/lib/peFund"
import {
  Search, Coins, TrendingUp, Minus, TrendingDown, Building2, Wallet,
  ChevronRight, Landmark, Gauge,
} from "lucide-react"
import BuyoutDetail from "./BuyoutDetail"

const NO_PORTFOLIO: PortfolioBuyout[] = []

const STATUS_META = {
  thriving: { labelKey: "bankCareers.pe.status.thriving", color: "#10b981", Icon: TrendingUp },
  steady: { labelKey: "bankCareers.pe.status.steady", color: "#d97706", Icon: Minus },
  distressed: { labelKey: "bankCareers.pe.status.distressed", color: "#ef4444", Icon: TrendingDown },
} as const

const SIGNAL_VARIANT = { Strong: "success", Fair: "warning", Risky: "destructive" } as const

type Selected = { mode: "buy" | "holding"; id: string } | null

export default function PeFund({ career, week }: { career: Career; week: number }) {
  const { t } = useTranslation()
  const { jeffsBalance, spendJeffs, awardJeffs } = useApp()
  const portfolio = useBankStore(s => s.pePortfolio) ?? NO_PORTFOLIO
  const buyPE = useBankStore(s => s.buyPE)
  const runPE = useBankStore(s => s.runPE)
  const exitPE = useBankStore(s => s.exitPE)
  const addMemo = useBankStore(s => s.addMemo)

  const [tab, setTab] = useState<"portfolio" | "market">("portfolio")
  const [selected, setSelected] = useState<Selected>(null)
  const [flash, setFlash] = useState<string | null>(null)

  const targets = useMemo(() => generateBuyoutTargets(week), [week])
  const ownedIds = useMemo(() => new Set(portfolio.map(c => c.id)), [portfolio])

  const totalEquityIn = portfolio.reduce((n, c) => n + c.equityIn, 0)
  const totalEquityValue = portfolio.reduce((n, c) => n + equityValue(c), 0)

  const buy = (target: BuyoutTarget, plan: LeveragePlan, thesis: string) => {
    if (ownedIds.has(target.id)) return
    const s = structureDeal(target, plan)
    if (jeffsBalance < s.equityIn) {
      setFlash(t("bankCareers.pe.flash.needEquity", { amount: s.equityIn.toLocaleString(), name: target.name, balance: Math.floor(jeffsBalance).toLocaleString() }))
      return
    }
    if (!spendJeffs(s.equityIn, `Bought ${target.name} (equity check)`)) return
    buyPE(holdingFromTarget(target, s, week, thesis))
    addMemo({ careerId: career.id, week, dealTitle: t("bankCareers.pe.memo.buyTitle", { name: target.name }), prompt: t("bankCareers.pe.memo.buyPrompt", { name: target.name }), text: thesis })
    setFlash(t("bankCareers.pe.flash.bought", { name: target.name, equity: s.equityIn.toLocaleString(), debt: s.debt.toLocaleString() }))
    setSelected(null)
    setTab("portfolio")
  }

  const run = (holding: PortfolioBuyout, patch: Partial<PortfolioBuyout>, repDelta: number, writeUp: { headline: string; question: string; text: string }) => {
    runPE(career.id, holding.id, patch, repDelta)
    addMemo({ careerId: career.id, week, dealTitle: t("bankCareers.pe.memo.updateTitle", { name: holding.name, headline: writeUp.headline }), prompt: writeUp.question, text: writeUp.text })
  }

  const exit = (c: PortfolioBuyout, route: ExitRoute, payout: number) => {
    awardJeffs(payout, `Exited ${c.name} (${route.label})`)
    exitPE(c.id, payout)
    setSelected(null)
    const mult = (payout / Math.max(1, c.equityIn)).toFixed(1)
    setFlash(payout >= c.equityIn
      ? t("bankCareers.pe.flash.exitWin", { name: c.name, payout: payout.toLocaleString(), mult })
      : t("bankCareers.pe.flash.exitLoss", { name: c.name, payout: payout.toLocaleString(), mult }))
  }

  // ── detail screen ──
  if (selected) {
    if (selected.mode === "buy") {
      const target = targets.find(o => o.id === selected.id)
      if (!target) { setSelected(null); return null }
      return <BuyoutDetail mode="buy" week={week} accent={career.accent} onBack={() => setSelected(null)} target={target} owned={ownedIds.has(target.id)} balance={jeffsBalance} onBuy={buy} />
    }
    const holding = portfolio.find(c => c.id === selected.id)
    if (!holding) { setSelected(null); return null }
    return <BuyoutDetail mode="holding" week={week} accent={career.accent} onBack={() => setSelected(null)} holding={holding} onRun={(patch, rep, w) => run(holding, patch, rep, w)} onExit={exit} />
  }

  const TabButton = ({ id, label, icon: I }: { id: "portfolio" | "market"; label: string; icon: typeof Search }) => (
    <button onClick={() => setTab(id)} className={cn("flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors", tab === id ? "text-white shadow-sm" : "text-muted-foreground hover:bg-muted/60")} style={tab === id ? { background: career.accent } : undefined}>
      <I className="h-3.5 w-3.5" /> {label}
      {id === "portfolio" && portfolio.length > 0 && <span className={cn("ml-0.5 rounded-full px-1.5 text-[10px]", tab === id ? "bg-white/25" : "bg-muted")}>{portfolio.length}</span>}
    </button>
  )

  // Fund-level KPIs for the hero.
  const totalDebt = portfolio.reduce((n, c) => n + c.debt, 0)
  const fundMoic = totalEquityIn > 0 ? Math.round((totalEquityValue / totalEquityIn) * 100) / 100 : 0
  const stackTotal = Math.max(1, totalEquityIn + totalDebt)

  return (
    <div className="space-y-3">
      {/* ── PE hero: the capital stack ── */}
      <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${career.gradient} text-white shadow-card`}>
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/70 flex items-center gap-1"><Landmark className="h-3 w-3" /> {t("bankCareers.pe.fundName")}</p>
              <p className="font-display text-xl font-extrabold leading-tight">{portfolio.length === 1 ? t("bankCareers.pe.companiesOwned_one", { count: portfolio.length }) : t("bankCareers.pe.companiesOwned_other", { count: portfolio.length })}</p>
              <p className="text-[11px] text-white/70">{t("bankCareers.pe.heroTagline")}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-extrabold tabular-nums">{fundMoic ? `${fundMoic}×` : "-"}</p>
              <p className="text-[10px] text-white/70 uppercase tracking-wide">{t("bankCareers.pe.fundMoic")}</p>
            </div>
          </div>
          {portfolio.length > 0 && (
            <div className="mt-3.5">
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-black/20">
                <div style={{ width: `${(totalEquityIn / stackTotal) * 100}%`, background: "rgba(255,255,255,0.9)" }} title={t("bankCareers.pe.yourEquity")} />
                <div style={{ width: `${(totalDebt / stackTotal) * 100}%`, background: "rgba(0,0,0,0.35)" }} title={t("bankCareers.pe.debtLeverage")} />
              </div>
              <div className="flex items-center justify-between mt-1.5 text-[10px] font-semibold text-white/85">
                <span>◻ {t("bankCareers.pe.equityIn", { amount: totalEquityIn.toLocaleString() })}</span>
                <span>◼ {t("bankCareers.pe.debt", { amount: totalDebt.toLocaleString() })}</span>
                <span className="font-extrabold">{t("bankCareers.pe.worth", { amount: totalEquityValue.toLocaleString() })}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Card variant="elevated" className="overflow-hidden">
        <div className="p-1.5 flex gap-1.5 bg-muted/40">
          <TabButton id="portfolio" label={t("bankCareers.pe.tabs.portfolio")} icon={Building2} />
          <TabButton id="market" label={t("bankCareers.pe.tabs.forSale")} icon={Search} />
        </div>

        <CardContent className="p-3 sm:p-4">
          <AnimatePresence>
            {flash && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-3 rounded-lg border px-3 py-2 text-xs font-medium text-foreground/90" style={{ borderColor: `${career.accent}66`, background: `${career.accent}12` }}>
                {flash}
              </motion.div>
            )}
          </AnimatePresence>

          {tab === "portfolio" ? (
            portfolio.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <Building2 className="h-7 w-7 mx-auto text-muted-foreground/60" />
                <p className="text-sm font-semibold">{t("bankCareers.pe.empty.title")}</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto"><Trans i18nKey="bankCareers.pe.empty.body" components={{ b: <b /> }} /></p>
                <Button size="sm" variant="outline" className="mt-1" onClick={() => setTab("market")}>{t("bankCareers.pe.empty.cta")}</Button>
              </div>
            ) : (
              <div className="space-y-2">
                {portfolio.map(c => {
                  const meta = STATUS_META[c.status]
                  const moic = buyoutMOIC(c)
                  const eq = equityValue(c)
                  const needsYou = c.lastRunWeek < week
                  return (
                    <button key={c.id} onClick={() => setSelected({ mode: "holding", id: c.id })} className="w-full text-left rounded-xl border border-border/60 p-3 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-extrabold text-sm">{c.name}</span>
                            <Badge variant="outline" className="text-[9px] capitalize">{c.sector}</Badge>
                            {needsYou && <Badge className="text-[9px]" style={{ background: career.accent }}>{t("bankCareers.pe.needsYou")}</Badge>}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                            <span className="flex items-center gap-0.5"><Coins className="h-3 w-3" />{t("bankCareers.pe.profitAmount", { amount: c.ebitda.toLocaleString() })}</span>
                            <span className="flex items-center gap-0.5"><Landmark className="h-3 w-3" />{t("bankCareers.pe.debtAmount", { amount: c.debt.toLocaleString() })}</span>
                            <span style={{ color: meta.color }} className="flex items-center gap-0.5 font-semibold"><meta.Icon className="h-3 w-3" />{t(meta.labelKey)}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right">
                            <p className="text-sm font-extrabold" style={{ color: eq >= c.equityIn ? "#10b981" : "#ef4444" }}>{moic}×</p>
                            <p className="text-[10px] text-muted-foreground">{eq.toLocaleString()}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </button>
                  )
                })}
                <p className="text-[10px] text-muted-foreground text-center pt-1">{t("bankCareers.pe.portfolioTip")}</p>
              </div>
            )
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5"><Coins className="h-3.5 w-3.5" /> <Trans i18nKey="bankCareers.pe.balanceLine" values={{ balance: Math.floor(jeffsBalance).toLocaleString() }} components={{ b: <b className="text-foreground" /> }} /></p>
              {targets.map(target => {
                const owned = ownedIds.has(target.id)
                const p = target.profile
                return (
                  <button key={target.id} onClick={() => setSelected({ mode: "buy", id: target.id })} className="w-full text-left rounded-xl border border-border/60 p-3 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-extrabold text-sm">{target.name}</span>
                          <Badge variant="outline" className="text-[9px] capitalize">{target.sector}</Badge>
                          <Badge variant={SIGNAL_VARIANT[target.signal]} className="text-[9px]">{target.signal}</Badge>
                          {owned && <Badge variant="secondary" className="text-[9px]">{t("bankCareers.pe.owned")}</Badge>}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span className="flex items-center gap-0.5"><Coins className="h-3 w-3" />{t("bankCareers.pe.profitAmount", { amount: p.ebitda.toLocaleString() })}</span>
                          <span className="flex items-center gap-0.5"><Gauge className="h-3 w-3" />{target.entryMultiple}×</span>
                          <span className={cn("flex items-center gap-0.5 font-semibold")} style={{ color: p.growthPct >= 6 ? "#10b981" : p.growthPct < 0 ? "#ef4444" : undefined }}>{p.growthPct >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{p.growthPct >= 0 ? "+" : ""}{p.growthPct}%</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right">
                          <p className="text-xs font-bold">{target.price.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">{t("bankCareers.pe.price")}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                )
              })}
              <p className="text-[10px] text-muted-foreground text-center pt-1">{t("bankCareers.pe.marketTip")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
