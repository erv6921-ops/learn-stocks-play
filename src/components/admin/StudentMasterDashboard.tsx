import React, { useEffect, useMemo, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Search,
  Loader2,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Coins,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Target,
  Percent,
  ShoppingBag,
  TrendingUp,
  CalendarDays,
  GraduationCap,
  Users,
} from "lucide-react"

// ── Shape returned by the get_student_master_stats() RPC ──
// Postgres hands numeric/bigint back to supabase-js as strings once they exceed
// JS-safe ranges, and NULLIF can make accuracy_percent null, so every figure is
// coerced through toNum() before it's shown. Never render these raw.
interface StudentStatRow {
  id: string
  email: string
  name: string
  school_name: string | null
  current_investocoins: number | string | null
  current_jeffs: number | string | null
  mastery_tier: string | null
  assessment_score: number | string | null
  lessons_started: number | string | null
  lessons_completed: number | string | null
  total_questions_attempted: number | string | null
  correct_answers: number | string | null
  accuracy_percent: number | string | null
  earned_today: number | string | null
  earned_7days: number | string | null
  earned_month: number | string | null
  total_purchases: number | string | null
  total_spent_on_purchases: number | string | null
}

// Coerce a possibly-string / possibly-null numeric into a finite number.
const toNum = (v: number | string | null | undefined): number => {
  const n = typeof v === "string" ? parseFloat(v) : v ?? 0
  return Number.isFinite(n as number) ? (n as number) : 0
}

// Whole-number formatting with thousands separators (kills float artifacts like
// 1234.0000001 that COUNT/SUM can produce over the wire).
const fmtInt = (v: number | string | null | undefined): string =>
  Math.round(toNum(v)).toLocaleString()

// One-decimal percentage, trimmed of a trailing ".0" so "84.0%" reads "84%".
const fmtPct = (v: number | string | null | undefined): string => {
  const n = Math.round(toNum(v) * 10) / 10
  return `${Number.isInteger(n) ? n : n.toFixed(1)}%`
}

const displayName = (s: StudentStatRow) => s.name?.trim() || s.email?.split("@")[0] || "Student"

// Stat-card palette, kept in the app's teal / gold / green / blue family.
const STAT = {
  coins: "#EF9F27",
  jeffs: "#9B59B6",
  lessons: "var(--brand)",
  questions: "#3B82C4",
  accuracy: "#2FA36B",
  earnings: "#EF9F27",
  purchases: "#E4572E",
} as const

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  value: string
  sub?: string
  color: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}1a` }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <span className="text-xs text-muted-foreground truncate">{label}</span>
      </div>
      <p className="text-2xl font-extrabold leading-none tabular-nums">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1 truncate">{sub}</p>}
    </div>
  )
}

// Detailed grid shown when a student row is expanded.
function StudentDetail({ s }: { s: StudentStatRow }) {
  const attempted = toNum(s.total_questions_attempted)
  const accuracy = attempted > 0 ? fmtPct(s.accuracy_percent) : "—"
  return (
    <div className="border-t border-border bg-muted/20 p-4">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="secondary" className="gap-1">
          <GraduationCap className="w-3 h-3" />
          {s.mastery_tier || "Unranked"}
        </Badge>
        <Badge variant="outline">Assessment {fmtInt(s.assessment_score)}</Badge>
        {s.school_name && <Badge variant="outline">{s.school_name}</Badge>}
        <span className="text-xs text-muted-foreground">{s.email}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <StatCard icon={Coins} label="InvestiCoins" value={fmtInt(s.current_investocoins)} color={STAT.coins} />
        <StatCard icon={Sparkles} label="Jeffs" value={fmtInt(s.current_jeffs)} color={STAT.jeffs} />
        <StatCard
          icon={BookOpen}
          label="Lessons"
          value={fmtInt(s.lessons_completed)}
          sub={`${fmtInt(s.lessons_started)} started`}
          color={STAT.lessons}
        />
        <StatCard
          icon={CheckCircle2}
          label="Correct answers"
          value={fmtInt(s.correct_answers)}
          sub={`of ${fmtInt(attempted)} attempted`}
          color={STAT.accuracy}
        />
        <StatCard icon={Target} label="Questions" value={fmtInt(attempted)} color={STAT.questions} />
        <StatCard icon={Percent} label="Accuracy" value={accuracy} color={STAT.accuracy} />
        <StatCard
          icon={ShoppingBag}
          label="Purchases"
          value={fmtInt(s.total_purchases)}
          sub={`${fmtInt(s.total_spent_on_purchases)} coins spent`}
          color={STAT.purchases}
        />
        <StatCard
          icon={TrendingUp}
          label="Earned today"
          value={fmtInt(s.earned_today)}
          color={STAT.earnings}
        />
      </div>

      {/* Earnings breakdown across time windows. */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { label: "Today", value: s.earned_today },
          { label: "Last 7 days", value: s.earned_7days },
          { label: "This month", value: s.earned_month },
        ].map((w) => (
          <div key={w.label} className="rounded-xl border border-border bg-card p-3 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-lg font-bold leading-none tabular-nums">{fmtInt(w.value)}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{w.label} earned</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StudentMasterDashboard() {
  const [students, setStudents] = useState<StudentStatRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    // Aggregation lives in a teacher-gated SECURITY DEFINER RPC — the browser
    // client can't run the underlying multi-table query directly. See
    // supabase/migrations/..._student_master_stats_rpc.sql.
    const { data, error } = await supabase.rpc("get_student_master_stats")
    if (error) {
      setError(error.message)
      setStudents([])
    } else {
      setStudents((data as StudentStatRow[]) ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return students
    return students.filter(
      (s) => displayName(s).toLowerCase().includes(q) || s.email?.toLowerCase().includes(q)
    )
  }, [students, search])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <p className="font-semibold">Couldn't load student stats</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">{error}</p>
        </div>
        <Button variant="outline" onClick={load}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Try again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header + search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-bold">Student Master Dashboard</h2>
          <Badge variant="secondary" className="tabular-nums">
            {students.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="pl-9 w-64 max-w-[70vw]"
            />
          </div>
          <Button variant="outline" size="icon" onClick={load} title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Student list */}
      {filtered.length === 0 ? (
        <Card variant="elevated">
          <CardContent className="p-10 text-center text-muted-foreground">
            {search ? `No students match "${search}".` : "No students yet."}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((s) => {
            const expanded = expandedId === s.id
            return (
              <Card key={s.id} variant="elevated" className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : s.id)}
                  aria-expanded={expanded}
                  className={cn(
                    "w-full text-left p-4 flex items-center gap-3 transition-colors hover:bg-muted/40",
                    expanded && "bg-muted/30"
                  )}
                >
                  {expanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{displayName(s)}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.email}</p>
                  </div>
                  {/* Glanceable stats on the collapsed row. */}
                  <div className="hidden sm:flex items-center gap-5 shrink-0">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Sparkles className="w-4 h-4" style={{ color: STAT.jeffs }} />
                      <span className="font-bold tabular-nums">{fmtInt(s.current_jeffs)}</span>
                      <span className="text-muted-foreground">jeffs</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <BookOpen className="w-4 h-4" style={{ color: STAT.lessons }} />
                      <span className="font-bold tabular-nums">{fmtInt(s.lessons_completed)}</span>
                      <span className="text-muted-foreground">done</span>
                    </span>
                  </div>
                </button>
                {expanded && <StudentDetail s={s} />}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
