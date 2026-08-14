// The Wealth Manager's book of business, shown under the weekly deal on the
// Careers desk. Two tabs: Book (households you manage) and Prospects (people
// looking for an advisor this week). Tap any to open their full page
// (ClientDetail) - build a suitable plan and sign them, or run the weekly
// review. Advisory fees flow to coins through AppContext; the book lives in
// bankStore. No coins are spent to win clients - you earn by keeping them.

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
  happy: { label: "Happy", color: "#10b981", Icon: Smile },
  content: { label: "Content", color: "#d97706", Icon: Meh },
  worried: { label: "Worried", color: "#ef4444", Icon: Frown },
} as const

type Selected = { mode: "prospect" | "client"; id: string } | null

export default function WealthBook({ career, week }: { career: Career; week: number }) {
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
    addMemo({ careerId: career.id, week, dealTitle: `Client plan · ${p.name}`, prompt: `Why does this mix fit ${p.name}?`, text: plan })
    setFlash(`${p.name.split(" ")[0]} signed on with ${p.assets.toLocaleString()} coins to manage. ${suit.score === 2 ? "A great fit - they feel understood." : suit.score === 1 ? "A workable start." : "They're a little unsure about the mix."}`)
    setSelected(null)
    setTab("book")
  }

  const review = (client: ClientHousehold, result: ReviewResult, writeUp: { headline: string; question: string; text: string }) => {
    if (result.fee > 0) earnJeffs(result.fee, `Advisory fee · ${client.name}`)
    reviewClient(career.id, client.id, result.patch, result.repDelta, result.left)
    addMemo({ careerId: career.id, week, dealTitle: `Client letter · ${client.name}: ${writeUp.headline}`, prompt: writeUp.question, text: writeUp.text })
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
          <Tick label="STOCKS" val={regime.stocks} />
          <Tick label="BONDS" val={regime.bonds} />
          <Tick label="CASH" val={regime.cash} />
        </div>
        <div className={`bg-gradient-to-br ${career.gradient} text-white p-4 sm:p-5`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/70 flex items-center gap-1"><Briefcase className="h-3 w-3" /> Private Wealth Office</p>
              <p className="font-display text-xl font-extrabold leading-tight">{book.length} {book.length === 1 ? "household" : "households"}</p>
              <p className="text-[11px] text-white/70">{regime.note}</p>
            </div>
            <div className="flex gap-2 shrink-0 text-center">
              <div><p className="text-lg font-extrabold tabular-nums">{(totalAUM / 1000).toFixed(totalAUM >= 10000 ? 0 : 1)}k</p><p className="text-[9px] text-white/70 uppercase">AUM</p></div>
              <div><p className="text-lg font-extrabold tabular-nums">{book.length ? avgTrust : "—"}</p><p className="text-[9px] text-white/70 uppercase">trust</p></div>
            </div>
          </div>
          {needsReview > 0 && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> {needsReview} {needsReview === 1 ? "client needs" : "clients need"} a review this week
            </div>
          )}
        </div>
      </div>

      <Card variant="elevated" className="overflow-hidden">
        <div className="p-1.5 flex gap-1.5 bg-muted/40">
          <TabButton id="book" label="Book" icon={Users} />
          <TabButton id="prospects" label="Prospects" icon={Search} />
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
                <p className="text-sm font-semibold">Your book is empty</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">Open the <b>Prospects</b> tab to meet people looking for an advisor. Build each a suitable plan, sign them, and earn fees as their money grows.</p>
                <Button size="sm" variant="outline" className="mt-1" onClick={() => setTab("prospects")}>Meet prospects</Button>
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
                            {needsYou && <Badge className="text-[9px]" style={{ background: career.accent }}>Needs you</Badge>}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                            <span className="flex items-center gap-0.5"><CalendarClock className="h-3 w-3" />{c.goal.horizon}y goal</span>
                            <span style={{ color: meta.color }} className="flex items-center gap-0.5 font-semibold"><meta.Icon className="h-3 w-3" />{meta.label}</span>
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
                <p className="text-[10px] text-muted-foreground text-center pt-1">Tap a client to run their review. Keep them calm and suited, and their money - and your fee - grows.</p>
              </div>
            )
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span>{regime.emoji}</span> Market this week: <b className="text-foreground">{regime.label}</b> · {regime.note} New prospects each week.
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
                          {signed && <Badge variant="secondary" className="text-[9px]">Client</Badge>}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span>{p.age} · {p.job}</span>
                          <span className="flex items-center gap-0.5"><CalendarClock className="h-3 w-3" />{p.goal.horizon}y</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right">
                          <p className="text-xs font-bold">{p.assets.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">to manage</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                )
              })}
              <p className="text-[10px] text-muted-foreground text-center pt-1">Tap a prospect to learn their goals and build a mix that fits. The right plan wins the client.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
