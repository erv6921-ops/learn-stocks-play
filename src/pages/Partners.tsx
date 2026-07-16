// Partners — the student directory (/partners).
//
// Styled as a "trading floor directory": search any student by name, see their
// school + grade instantly, and add them as a partner. Clicking a student opens
// their public snapshot — league rank, stock portfolio (live prices) and
// micro-business stats — served by SECURITY DEFINER RPCs (search_students,
// get_partners, get_partner_snapshot) since the underlying tables are RLS
// own-row-only. Visual identity: mint "ID badge" cards, distinct from the
// leaderboard's trophy styling and the bank's engraved panels.

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GameNav from "@/components/GameNav"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { getInitials } from "@/lib/playerStats"
import { LEAGUES, getLeagueIdx, getLevel } from "@/lib/leagues"
import {
  Search, UserPlus, UserCheck, UserMinus, Users, School, GraduationCap,
  LineChart, Store, Trophy, Coins, Star, TrendingUp, TrendingDown, Loader2,
  BadgeCheck, Handshake, Sparkles,
} from "lucide-react"

const ACCENT = "hsl(152 62% 46%)"
const ACCENT_SOFT = "hsl(152 62% 46% / 0.10)"

interface StudentRow {
  user_id: string
  first_name: string | null
  last_name: string | null
  school_name: string | null
  grade: number | null
  xp: number
  is_partner: boolean
}

interface Snapshot {
  profile: {
    user_id: string
    first_name: string | null
    last_name: string | null
    school_name: string | null
    grade: number | null
  } | null
  xp: number
  holdings: { symbol: string; shares: number; purchase_price: number }[]
  business: {
    week: number | null
    revenue: number | null
    credit_score: number | null
    star_rating: number | null
    employees: number | null
    investor_funded: boolean | null
    plan_approved: boolean | null
  } | null
}

const fullName = (s: { first_name: string | null; last_name: string | null }) =>
  [s.first_name, s.last_name].filter(Boolean).join(" ") || "Student"

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 })

// ── Small league chip shown next to names everywhere on this page ────────
function LeagueChip({ xp }: { xp: number }) {
  const lg = LEAGUES[getLeagueIdx(xp)]
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold"
      style={{ color: lg.color, background: lg.soft }}
    >
      {lg.icon} {lg.name}
    </span>
  )
}

// ── One student row (search results + partner roster share this) ─────────
function StudentCard({
  s, selected, onSelect, onAdd, onRemove, busy,
}: {
  s: StudentRow
  selected: boolean
  onSelect: () => void
  onAdd?: () => void
  onRemove?: () => void
  busy: boolean
}) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
      <button
        onClick={onSelect}
        className={`w-full text-left rounded-xl border p-3 flex items-center gap-3 transition-all hover:shadow-md ${
          selected ? "shadow-md" : "bg-card"
        }`}
        style={selected ? { borderColor: ACCENT, background: ACCENT_SOFT } : undefined}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 text-white"
          style={{ background: ACCENT }}
        >
          {getInitials(s.first_name ?? undefined, s.last_name ?? undefined)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm truncate">{fullName(s)}</p>
            <LeagueChip xp={s.xp} />
          </div>
          <p className="text-xs text-muted-foreground truncate flex items-center gap-2">
            {s.school_name && (
              <span className="inline-flex items-center gap-1"><School className="w-3 h-3" />{s.school_name}</span>
            )}
            {s.grade != null && (
              <span className="inline-flex items-center gap-1"><GraduationCap className="w-3 h-3" />Grade {s.grade}</span>
            )}
            {!s.school_name && s.grade == null && <span>InvestiPlay student</span>}
          </p>
        </div>
        {onAdd && !s.is_partner && (
          <Button
            size="sm"
            className="shrink-0 gap-1 text-white"
            style={{ background: ACCENT }}
            disabled={busy}
            onClick={(e) => { e.stopPropagation(); onAdd() }}
          >
            {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />} Add
          </Button>
        )}
        {onAdd && s.is_partner && (
          <Badge variant="outline" className="shrink-0 gap-1" style={{ color: ACCENT, borderColor: ACCENT }}>
            <UserCheck className="w-3 h-3" /> Partner
          </Badge>
        )}
        {onRemove && (
          <Button
            size="sm"
            variant="ghost"
            className="shrink-0 text-muted-foreground hover:text-destructive"
            disabled={busy}
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            title="Remove partner"
          >
            <UserMinus className="w-4 h-4" />
          </Button>
        )}
      </button>
    </motion.div>
  )
}

export default function Partners() {
  const { user } = useApp()
  const { toast } = useToast()

  // search
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<StudentRow[]>([])
  const [searching, setSearching] = useState(false)
  const searchSeq = useRef(0)

  // roster
  const [partners, setPartners] = useState<StudentRow[]>([])
  const [loadingPartners, setLoadingPartners] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)

  // detail
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [loadingSnapshot, setLoadingSnapshot] = useState(false)
  const [livePrices, setLivePrices] = useState<Map<string, number>>(new Map())

  const loadPartners = useCallback(async () => {
    const { data, error } = await (supabase as any).rpc("get_partners")
    if (!error && data) setPartners(data as StudentRow[])
    setLoadingPartners(false)
  }, [])

  useEffect(() => { loadPartners() }, [loadPartners])

  // Debounced live search-as-you-type.
  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) { setResults([]); setSearching(false); return }
    setSearching(true)
    const seq = ++searchSeq.current
    const t = setTimeout(async () => {
      const { data, error } = await (supabase as any).rpc("search_students", { _query: q })
      if (seq !== searchSeq.current) return // stale response
      if (!error && data) setResults(data as StudentRow[])
      setSearching(false)
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  const addPartner = async (s: StudentRow) => {
    if (!user?.id) return
    setBusyId(s.user_id)
    const { error } = await (supabase as any)
      .from("partners")
      .insert({ user_id: user.id, partner_id: s.user_id })
    setBusyId(null)
    if (error) {
      toast({ title: "Couldn't add partner", description: error.message, variant: "destructive" })
      return
    }
    toast({ title: "Partner added! 🤝", description: `${fullName(s)} is now on your team.` })
    setResults(r => r.map(x => x.user_id === s.user_id ? { ...x, is_partner: true } : x))
    loadPartners()
  }

  const removePartner = async (s: StudentRow) => {
    if (!user?.id) return
    setBusyId(s.user_id)
    const { error } = await (supabase as any)
      .from("partners")
      .delete()
      .eq("user_id", user.id)
      .eq("partner_id", s.user_id)
    setBusyId(null)
    if (error) {
      toast({ title: "Couldn't remove partner", description: error.message, variant: "destructive" })
      return
    }
    setPartners(p => p.filter(x => x.user_id !== s.user_id))
    setResults(r => r.map(x => x.user_id === s.user_id ? { ...x, is_partner: false } : x))
  }

  // Load the selected student's public snapshot, then live prices for holdings.
  useEffect(() => {
    if (!selectedId) { setSnapshot(null); return }
    let cancelled = false
    setLoadingSnapshot(true)
    setLivePrices(new Map())
    ;(async () => {
      const { data, error } = await (supabase as any).rpc("get_partner_snapshot", { _user_id: selectedId })
      if (cancelled) return
      setLoadingSnapshot(false)
      if (error || !data?.profile) { setSnapshot(null); return }
      const snap = data as Snapshot
      setSnapshot(snap)
      if (snap.holdings.length > 0) {
        const symbols = snap.holdings.map(h => h.symbol)
        const { data: quote, error: qErr } = await supabase.functions.invoke("get-stock-quote", { body: { symbols } })
        if (cancelled || qErr || !quote?.stocks) return
        const map = new Map<string, number>()
        for (const st of quote.stocks) {
          if (typeof st.price === "number" && st.price > 0) map.set(st.symbol, st.price)
        }
        setLivePrices(map)
      }
    })()
    return () => { cancelled = true }
  }, [selectedId])

  const selectedRow =
    results.find(r => r.user_id === selectedId) ?? partners.find(p => p.user_id === selectedId) ?? null

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Header — directory identity */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-6 border relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, hsl(158 45% 15%), hsl(152 50% 24%))`, borderColor: "hsl(152 40% 30%)" }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <Handshake className="w-7 h-7" style={{ color: "hsl(152 70% 70%)" }} />
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">Partners</h1>
            </div>
            <p className="text-sm md:text-base" style={{ color: "hsl(152 40% 80%)" }}>
              Search any student by name, see their school and grade, and add them to your team.
              Tap a partner to peek at their stocks, business and rank.
            </p>
          </div>
          <Sparkles className="absolute right-6 top-6 w-16 h-16 opacity-10 text-white" />
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* ── Left: search + roster ── */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-2" style={{ borderColor: ACCENT_SOFT }}>
              <CardContent className="p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search students by name…"
                    className="pl-9"
                  />
                </div>
                {query.trim().length >= 2 && (
                  <div className="space-y-2">
                    {searching && (
                      <p className="text-xs text-muted-foreground flex items-center gap-2 px-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Searching…
                      </p>
                    )}
                    {!searching && results.length === 0 && (
                      <p className="text-xs text-muted-foreground px-1">
                        No students found for "{query.trim()}". Check the spelling!
                      </p>
                    )}
                    <AnimatePresence>
                      {results.map(s => (
                        <StudentCard
                          key={s.user_id}
                          s={s}
                          selected={selectedId === s.user_id}
                          onSelect={() => setSelectedId(s.user_id)}
                          onAdd={() => addPartner(s)}
                          busy={busyId === s.user_id}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
                {query.trim().length < 2 && (
                  <p className="text-xs text-muted-foreground px-1">
                    Type at least 2 letters of a first or last name.
                  </p>
                )}
              </CardContent>
            </Card>

            <div>
              <h2 className="font-extrabold text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: ACCENT }} /> My Partners ({partners.length})
              </h2>
              {loadingPartners ? (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading…
                </p>
              ) : partners.length === 0 ? (
                <Card>
                  <CardContent className="p-5 text-center">
                    <Handshake className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="text-sm font-semibold">No partners yet</p>
                    <p className="text-xs text-muted-foreground">Search a classmate's name above to add your first one.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  <AnimatePresence>
                    {partners.map(s => (
                      <StudentCard
                        key={s.user_id}
                        s={s}
                        selected={selectedId === s.user_id}
                        onSelect={() => setSelectedId(s.user_id)}
                        onRemove={() => removePartner(s)}
                        busy={busyId === s.user_id}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: partner snapshot ── */}
          <div className="md:col-span-3">
            {!selectedId ? (
              <Card className="border-dashed">
                <CardContent className="p-10 text-center">
                  <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
                  <p className="font-bold">Pick a student</p>
                  <p className="text-sm text-muted-foreground">
                    Select someone from the search results or your partner list to see their stocks,
                    micro-business and rank.
                  </p>
                </CardContent>
              </Card>
            ) : loadingSnapshot ? (
              <Card>
                <CardContent className="p-10 flex items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" /> Loading profile…
                </CardContent>
              </Card>
            ) : !snapshot?.profile ? (
              <Card>
                <CardContent className="p-10 text-center text-sm text-muted-foreground">
                  Couldn't load this student's profile.
                </CardContent>
              </Card>
            ) : (
              <SnapshotView snap={snapshot} livePrices={livePrices} fallbackRow={selectedRow} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

// ── Partner detail: rank + stocks + micro-business ───────────────────────
function SnapshotView({
  snap, livePrices, fallbackRow,
}: {
  snap: Snapshot
  livePrices: Map<string, number>
  fallbackRow: StudentRow | null
}) {
  const p = snap.profile!
  const xp = Number(snap.xp ?? fallbackRow?.xp ?? 0)
  const leagueIdx = getLeagueIdx(xp)
  const league = LEAGUES[leagueIdx]
  const nextLeague = LEAGUES[leagueIdx + 1] ?? null
  const level = getLevel(xp)
  const biz = snap.business

  const holdingsValue = snap.holdings.reduce((sum, h) => {
    const price = livePrices.get(h.symbol) ?? h.purchase_price
    return sum + h.shares * price
  }, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* ID-badge header */}
      <Card className="overflow-hidden">
        <div className="h-2" style={{ background: `linear-gradient(90deg, ${league.color}, ${ACCENT})` }} />
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold text-white shrink-0"
              style={{ background: ACCENT }}
            >
              {getInitials(p.first_name ?? undefined, p.last_name ?? undefined)}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-extrabold truncate flex items-center gap-2">
                {fullName(p)} <BadgeCheck className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                {p.school_name && (
                  <span className="flex items-center gap-1.5"><School className="w-4 h-4" />{p.school_name}</span>
                )}
                {p.grade != null && (
                  <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" />Grade {p.grade}</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-extrabold"
                  style={{ color: league.color, background: league.soft }}
                >
                  {league.icon} {league.name} League
                </span>
                <Badge variant="outline" className="gap-1"><Star className="w-3 h-3 text-warning" /> Level {level}</Badge>
                <Badge variant="outline" className="gap-1"><Coins className="w-3 h-3 text-warning" /> {Math.round(xp).toLocaleString()} coins earned</Badge>
              </div>
              {nextLeague && (
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.max(0, nextLeague.min - xp).toLocaleString()} coins to {nextLeague.icon} {nextLeague.name}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stocks */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold flex items-center gap-2">
              <LineChart className="w-4 h-4" style={{ color: ACCENT }} /> Stock Portfolio
            </h3>
            {snap.holdings.length > 0 && (
              <Badge variant="outline" className="gap-1 font-bold">
                <Trophy className="w-3 h-3" style={{ color: ACCENT }} /> {fmtMoney(holdingsValue)}
              </Badge>
            )}
          </div>
          {snap.holdings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No stocks yet — their portfolio is empty.</p>
          ) : (
            <div className="divide-y divide-border">
              {snap.holdings.map(h => {
                const live = livePrices.get(h.symbol)
                const price = live ?? h.purchase_price
                const value = h.shares * price
                const gainPct = h.purchase_price > 0 ? ((price - h.purchase_price) / h.purchase_price) * 100 : 0
                const up = gainPct >= 0
                return (
                  <div key={h.symbol} className="py-2.5 flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-extrabold shrink-0"
                      style={{ background: ACCENT_SOFT, color: ACCENT }}
                    >
                      {h.symbol.slice(0, 4)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm">{h.symbol}</p>
                      <p className="text-xs text-muted-foreground">{h.shares.toLocaleString()} shares</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{fmtMoney(value)}</p>
                      {live != null && (
                        <p className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${up ? "text-success" : "text-destructive"}`}>
                          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {up ? "+" : ""}{gainPct.toFixed(1)}%
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Micro-business */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-extrabold flex items-center gap-2 mb-3">
            <Store className="w-4 h-4" style={{ color: ACCENT }} /> Micro-Business
          </h3>
          {!biz || biz.week == null ? (
            <p className="text-sm text-muted-foreground">They haven't started a micro-business yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <BizStat label="Week" value={`${biz.week}`} />
                <BizStat label="Revenue" value={fmtMoney(Number(biz.revenue ?? 0))} />
                <BizStat label="Credit Score" value={`${biz.credit_score ?? "—"}`} />
                <BizStat label="Rating" value={`${Number(biz.star_rating ?? 0).toFixed(1)} ★`} />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="gap-1"><Users className="w-3 h-3" /> {biz.employees ?? 0} employees</Badge>
                {biz.plan_approved && <Badge variant="outline" className="gap-1" style={{ color: ACCENT, borderColor: ACCENT }}><BadgeCheck className="w-3 h-3" /> Plan approved</Badge>}
                {biz.investor_funded && <Badge variant="outline" className="gap-1 text-warning border-warning"><Sparkles className="w-3 h-3" /> Investor funded</Badge>}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function BizStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ background: ACCENT_SOFT }}>
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-extrabold text-foreground">{value}</p>
    </div>
  )
}
