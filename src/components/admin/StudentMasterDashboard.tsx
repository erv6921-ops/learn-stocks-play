import React, { useEffect, useMemo, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  Loader2,
  AlertCircle,
  RefreshCw,
  Coins,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Target,
  Percent,
  ShoppingBag,
  Wallet,
  TrendingUp,
  CalendarDays,
  CalendarRange,
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

// One little stat block inside a student card: icon + value + label.
function StatBlock({
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
    <div className="rounded-lg border border-border bg-muted/30 p-2.5">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground truncate">{label}</span>
      </div>
      <p className="text-lg font-extrabold leading-none tabular-nums">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{sub}</p>}
    </div>
  )
}

// One student = one block, with every stat shown at once.
function StudentBlock({ s }: { s: StudentStatRow }) {
  const attempted = toNum(s.total_questions_attempted)
  const accuracy = attempted > 0 ? fmtPct(s.accuracy_percent) : "—"
  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardContent className="p-4">
        {/* Identity */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 grid place-items-center shrink-0">
            <span className="font-display font-extrabold text-primary text-sm">
              {displayName(s).trim().slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold truncate leading-tight">{displayName(s)}</p>
            <p className="text-xs text-muted-foreground truncate">{s.email}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <Badge variant="secondary" className="gap-1 text-[11px]">
            <GraduationCap className="w-3 h-3" />
            {s.mastery_tier || "Unranked"}
          </Badge>
          <Badge variant="outline" className="text-[11px]">Assessment {fmtInt(s.assessment_score)}</Badge>
          {s.school_name && (
            <Badge variant="outline" className="text-[11px] max-w-[140px] truncate">{s.school_name}</Badge>
          )}
        </div>

        {/* All the stats, as little blocks */}
        <div className="grid grid-cols-3 gap-2">
          <StatBlock icon={Coins} label="Coins" value={fmtInt(s.current_investocoins)} color="#EF9F27" />
          <StatBlock icon={Sparkles} label="Jeffs" value={fmtInt(s.current_jeffs)} color="#9B59B6" />
          <StatBlock
            icon={BookOpen}
            label="Lessons"
            value={fmtInt(s.lessons_completed)}
            sub={`${fmtInt(s.lessons_started)} started`}
            color="var(--brand)"
          />
          <StatBlock icon={Target} label="Questions" value={fmtInt(attempted)} color="#3B82C4" />
          <StatBlock
            icon={CheckCircle2}
            label="Correct"
            value={fmtInt(s.correct_answers)}
            color="#2FA36B"
          />
          <StatBlock icon={Percent} label="Accuracy" value={accuracy} color="#2FA36B" />
          <StatBlock
            icon={ShoppingBag}
            label="Purchases"
            value={fmtInt(s.total_purchases)}
            color="#E4572E"
          />
          <StatBlock icon={Wallet} label="Spent" value={fmtInt(s.total_spent_on_purchases)} color="#E4572E" />
          <StatBlock icon={TrendingUp} label="Today" value={fmtInt(s.earned_today)} color="#EF9F27" />
          <StatBlock icon={CalendarDays} label="7 days" value={fmtInt(s.earned_7days)} color="#EF9F27" />
          <StatBlock icon={CalendarRange} label="Month" value={fmtInt(s.earned_month)} color="#EF9F27" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function StudentMasterDashboard() {
  const [students, setStudents] = useState<StudentStatRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const load = async () => {
    setLoading(true)
    setError(null)
    // Aggregation lives in a teacher/admin-gated SECURITY DEFINER RPC — the
    // browser client can't run the underlying multi-table query directly. See
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
            {filtered.length}
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

      {/* Student blocks — every stat visible at a glance */}
      {filtered.length === 0 ? (
        <Card variant="elevated">
          <CardContent className="p-10 text-center text-muted-foreground">
            {search ? `No students match "${search}".` : "No students yet."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <StudentBlock key={s.id} s={s} />
          ))}
        </div>
      )}
    </div>
  )
}
