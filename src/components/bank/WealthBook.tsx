// The Wealth Manager's book of business, shown under the weekly deal on the
// Careers desk. Two tabs: Book (households you manage) and Prospects (people
// looking for an advisor this week). Tap any to open their full page
// (ClientDetail) - build a suitable plan and sign them, or run the weekly
// review. Advisory fees flow to coins through AppContext; the book lives in
// bankStore. No coins are spent to win clients - you earn by keeping them.

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
  generateProspects, householdFromProspect, scoreAllocation, totalReturnPct,
  regimeForWeek,
  type ProspectClient, type ClientHousehold, type AllocPreset, type ReviewResult,
} from "@/lib/wealthBook"
import {
  Search, Users, Wallet, ChevronRight, Smile, Meh, Frown, CalendarClock,
  Briefcase, TrendingUp, TrendingDown,
} from "lucide-react"
import ClientDetail from "./ClientDetail"

const NO_BOOK: ClientHousehold[] = []

const STATUS_META = {
  happy: { labelKey: "bankCareers.wealth.status.happy", color: "#10b981", Icon: Smile },
  content: { labelKey: "bankCareers.wealth.status.content", color: "#d97706", Icon: Meh },
  worried: { labelKey: "bankCareers.wealth.status.worried", color: "#ef4444", Icon: Frown },
} as const

type Selected = { mode: "prospect" | "client"; id: string } | null

export default function WealthBook({ career, week }: { career: Career; week: number }) {
  const { t } = useTranslation()
  const { earnJeffs } = useApp()
  const book = useBankStore(s => s.wmBook) ?? NO_BOOK
  const signClient = useBankStore(s => s.signClient)
  const reviewClient = useBankStore(s => s.reviewClient)
  const addMemo = useBankStore(s => s.addMemo)

  const [tab, setTab] = useState<"book" | "prospects">("book")
  const [selected, setSelected] = useState<Selected>(null)
  const [flash, setFlash] = useState<string | null>(null)

  const prospects = useMemo(() => generateProspects(week), [week])
  const regime = useMemo(() => regimeForWeek(week), [week])
  const signedIds = useMemo(() => new Set(book.map(c => c.id)), [book])
  const totalAUM = book.reduce((n, c) => n + c.assets, 0)
  const needsReview = book.filter(c => c.lastReviewWeek < week).length

  const sign = (p: ProspectClient, alloc: AllocPreset["alloc"], plan: string) => {
    if (signedIds.has(p.id)) return
    const suit = scoreAllocation(p, alloc)
    signClient(householdFromProspect(p, alloc, week, plan, suit))
    addMemo({ careerId: career.id, week, dealTitle: t("bankCareers.wealth.memo.planTitle", { name: p.name }), prompt: t("bankCareers.wealth.memo.planPrompt", { name: p.name }), text: plan })
    const fit = suit.score === 2 ? t("bankCareers.wealth.flash.fitGreat") : suit.score === 1 ? t("bankCareers.wealth.flash.fitOk") : t("bankCareers.wealth.flash.fitUnsure")
    setFlash(t("bankCareers.wealth.flash.signed", { name: p.name.split(" ")[0], amount: p.assets.toLocaleString(), fit }))
    setSelected(null)
    setTab("book")
  }

  const review = (client: ClientHousehold, result: ReviewResult, writeUp: { headline: string; question: string; text: string }) => {
    if (result.fee > 0) earnJeffs(result.fee, `Advisory fee · ${client.name}`)
    reviewClient(career.id, client.id, result.patch, result.repDelta, result.left)
    addMemo({ careerId: career.id, week, dealTitle: t("bankCareers.wealth.memo.letterTitle", { name: client.name, headline: writeUp.headline }), prompt: writeUp.question, text: writeUp.text })
  }

  // ── detail screen ──
  if (selected) {
    if (selected.mode === "prospect") {
      const p = prospects.find(o => o.id === selected.id)
      if (!p) { setSelected(null); return null }
      return <ClientDetail mode="prospect" week={week} accent={career.accent} onBack={() => setSelected(null)} prospect={p} signed={signedIds.has(p.id)} onSign={sign} />
    }
    const client = book.find(c => c.id === selected.id)
    if (!client) { setSelected(null); return null }
    return <ClientDetail mode="client" week={week} accent={career.accent} onBack={() => setSelected(null)} client={client} onReview={(result, w) => review(client, result, w)} />
  }

  const TabButton = ({ id, label, icon: I }: { id: "book" | "prospects"; label: string; icon: typeof Search }) => (
    <button onClick={() => setTab(id)} className={cn("flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors", tab === id ? "text-white shadow-sm" : "text-muted-foreground hover:bg-muted/60")} style={tab === id ? { background: career.accent } : undefined}>
      <I className="h-3.5 w-3.5" /> {label}
      {id === "book" && book.length > 0 && <span className={cn("ml-0.5 rounded-full px-1.5 text-[10px]", tab === id ? "bg-white/25" : "bg-muted")}>{book.length}</span>}
    </button>
  )

  const avgTrust = book.length ? Math.round(book.reduce((n, c) => n + c.satisfaction, 0) / book.length) : 0
  const Tick = ({ label, val }: { label: string; val: number }) => (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      <span className="text-white/60">{label}</span>
      <span className="font-bold tabular-nums" style={{ color: val > 0.005 ? "#4ade80" : val < -0.005 ? "#f87171" : "rgba(255,255,255,0.85)" }}>
        {val >= 0 ? "▲" : "▼"} {val >= 0 ? "+" : ""}{Math.round(val * 100)}%
      </span>
    </span>
  )

  return (
    <div className="space-y-3">
      {/* ── WM hero: the market tape + the book ── */}
      <div className="rounded-2xl overflow-hidden shadow-card">
        {/* ticker tape */}
        <div className="bg-slate-900 text-white px-3 py-1.5 flex items-center gap-3 text-[11px] overflow-x-auto">
          <span className="font-extrabold uppercase tracking-wider shrink-0 flex items-center gap-1" style={{ color: career.accent }}>{regime.emoji} {regime.label}</span>
          <span className="h-3 w-px bg-white/20 shrink-0" />
          <Tick label={t("bankCareers.wealth.ticker.stocks")} val={regime.stocks} />
          <Tick label={t("bankCareers.wealth.ticker.bonds")} val={regime.bonds} />
          <Tick label={t("bankCareers.wealth.ticker.cash")} val={regime.cash} />
        </div>
        <div className={`bg-gradient-to-br ${career.gradient} text-white p-4 sm:p-5`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/70 flex items-center gap-1"><Briefcase className="h-3 w-3" /> {t("bankCareers.wealth.officeName")}</p>
              <p className="font-display text-xl font-extrabold leading-tight">{book.length === 1 ? t("bankCareers.wealth.households_one", { count: book.length }) : t("bankCareers.wealth.households_other", { count: book.length })}</p>
              <p className="text-[11px] text-white/70">{regime.note}</p>
            </div>
            <div className="flex gap-2 shrink-0 text-center">
              <div><p className="text-lg font-extrabold tabular-nums">{(totalAUM / 1000).toFixed(totalAUM >= 10000 ? 0 : 1)}k</p><p className="text-[9px] text-white/70 uppercase">{t("bankCareers.wealth.aum")}</p></div>
              <div><p className="text-lg font-extrabold tabular-nums">{book.length ? avgTrust : "-"}</p><p className="text-[9px] text-white/70 uppercase">{t("bankCareers.wealth.trust")}</p></div>
            </div>
          </div>
          {needsReview > 0 && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> {needsReview === 1 ? t("bankCareers.wealth.needsReview_one", { count: needsReview }) : t("bankCareers.wealth.needsReview_other", { count: needsReview })}
            </div>
          )}
        </div>
      </div>

      <Card variant="elevated" className="overflow-hidden">
        <div className="p-1.5 flex gap-1.5 bg-muted/40">
          <TabButton id="book" label={t("bankCareers.wealth.tabs.book")} icon={Users} />
          <TabButton id="prospects" label={t("bankCareers.wealth.tabs.prospects")} icon={Search} />
        </div>

        <CardContent className="p-3 sm:p-4">
          <AnimatePresence>
            {flash && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-3 rounded-lg border px-3 py-2 text-xs font-medium text-foreground/90" style={{ borderColor: `${career.accent}66`, background: `${career.accent}12` }}>
                {flash}
              </motion.div>
            )}
          </AnimatePresence>

          {tab === "book" ? (
            book.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <Users className="h-7 w-7 mx-auto text-muted-foreground/60" />
                <p className="text-sm font-semibold">{t("bankCareers.wealth.empty.title")}</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto"><Trans i18nKey="bankCareers.wealth.empty.body" components={{ b: <b /> }} /></p>
                <Button size="sm" variant="outline" className="mt-1" onClick={() => setTab("prospects")}>{t("bankCareers.wealth.empty.cta")}</Button>
              </div>
            ) : (
              <div className="space-y-2">
                {book.map(c => {
                  const meta = STATUS_META[c.status]
                  const ret = totalReturnPct(c)
                  const needsYou = c.lastReviewWeek < week
                  return (
                    <button key={c.id} onClick={() => setSelected({ mode: "client", id: c.id })} className="w-full text-left rounded-xl border border-border/60 p-3 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-extrabold text-sm">{c.name}</span>
                            <span className="text-[11px]">{c.goal.icon}</span>
                            {needsYou && <Badge className="text-[9px]" style={{ background: career.accent }}>{t("bankCareers.wealth.needsYou")}</Badge>}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                            <span className="flex items-center gap-0.5"><CalendarClock className="h-3 w-3" />{t("bankCareers.wealth.yearGoal", { count: c.goal.horizon })}</span>
                            <span style={{ color: meta.color }} className="flex items-center gap-0.5 font-semibold"><meta.Icon className="h-3 w-3" />{t(meta.labelKey)}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right">
                            <p className="text-sm font-extrabold">{c.assets.toLocaleString()}</p>
                            <p className="text-[10px] font-semibold" style={{ color: ret >= 0 ? "#10b981" : "#ef4444" }}>{ret >= 0 ? "+" : ""}{ret}%</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </button>
                  )
                })}
                <p className="text-[10px] text-muted-foreground text-center pt-1">{t("bankCareers.wealth.bookTip")}</p>
              </div>
            )
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span>{regime.emoji}</span> <Trans i18nKey="bankCareers.wealth.marketThisWeek" values={{ label: regime.label, note: regime.note }} components={{ b: <b className="text-foreground" /> }} />
              </p>
              {prospects.map(p => {
                const signed = signedIds.has(p.id)
                return (
                  <button key={p.id} onClick={() => setSelected({ mode: "prospect", id: p.id })} className="w-full text-left rounded-xl border border-border/60 p-3 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-extrabold text-sm">{p.name}</span>
                          <span className="text-[11px]">{p.goal.icon}</span>
                          <Badge variant="outline" className="text-[9px] capitalize">{p.risk}</Badge>
                          {signed && <Badge variant="secondary" className="text-[9px]">{t("bankCareers.wealth.client")}</Badge>}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span>{p.age} · {p.job}</span>
                          <span className="flex items-center gap-0.5"><CalendarClock className="h-3 w-3" />{t("bankCareers.wealth.years", { count: p.goal.horizon })}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right">
                          <p className="text-xs font-bold">{p.assets.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">{t("bankCareers.wealth.toManage")}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                )
              })}
              <p className="text-[10px] text-muted-foreground text-center pt-1">{t("bankCareers.wealth.prospectsTip")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
