import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Activity,
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Clock,
  Coins,
  Loader2,
  Sparkles,
  Users,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Admin behavioral-analytics dashboard for InvestiPlay.
//
// Reads the append-only analytics_events firehose (see
// src/lib/analyticsEvents.ts + supabase/migrations/..._analytics_events.sql)
// and the profiles table to render aggregate KPIs, a searchable/sortable
// student table, and a per-student event drill-down.
//
// Access is gated to teachers/admins (app_role has no "admin" today, so the
// email allowlist below is the practical admin escape hatch). Reads still run
// under RLS — a teacher only sees events RLS lets them read.
// ---------------------------------------------------------------------------

// Admin allowlist. Only these emails may view the dashboard.
const ADMIN_EMAILS = ["erv6921@gmail.com"]

const DAY_MS = 24 * 60 * 60 * 1000

/** Midnight (local) at the start of `daysAgo` days before today. */
function startOfDay(daysAgo = 0): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setTime(d.getTime() - daysAgo * DAY_MS)
  return d
}

function fmtWhen(iso: string | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  const diff = Date.now() - d.getTime()
  if (diff < 60_000) return "just now"
  if (diff < DAY_MS) {
    const h = Math.floor(diff / 3_600_000)
    if (h >= 1) return `${h}h ago`
    return `${Math.floor(diff / 60_000)}m ago`
  }
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

// Rows we read from analytics_events. event_data is a flexible jsonb bag.
interface EventRow {
  id?: string
  student_id: string
  event: string
  event_data: Record<string, unknown> | null
  session_id: string | null
  created_at: string
}

interface ProfileRow {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  role: string | null
}

// Per-student rollup over the last 7 days, shown in the table.
interface StudentStat {
  id: string
  name: string
  email: string
  sessions: number
  events: number
  coins: number
  lastActive: string | null
}

type SortKey = "name" | "sessions" | "events" | "coins" | "lastActive"

function displayName(p: ProfileRow): string {
  const full = [p.first_name, p.last_name].filter(Boolean).join(" ").trim()
  return full || p.email || "Unknown"
}

function numAmount(v: unknown): number {
  return typeof v === "number" ? v : 0
}

export default function AdminAnalytics() {
  const { user, loading: authLoading } = useAuth()

  const allowed =
    !!user && ADMIN_EMAILS.includes((user.email ?? "").toLowerCase())

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [todayRows, setTodayRows] = useState<EventRow[]>([])
  const [yesterdayIds, setYesterdayIds] = useState<Set<string>>(new Set())
  const [weekRows, setWeekRows] = useState<EventRow[]>([])
  const [profiles, setProfiles] = useState<ProfileRow[]>([])

  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("lastActive")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const [selected, setSelected] = useState<StudentStat | null>(null)

  // ---- Load everything the page needs, once, on mount. -------------------
  useEffect(() => {
    if (!allowed) return
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const todayStart = startOfDay(0).toISOString()
        const yesterdayStart = startOfDay(1).toISOString()
        const weekStart = startOfDay(7).toISOString()

        // analytics_events isn't in the generated Supabase types, so this
        // table is queried through an `any` client (matches analyticsEvents.ts).
        const db = supabase as any
        const [today, yesterday, week, profs] = await Promise.all([
          db
            .from("analytics_events")
            .select("student_id, event, event_data, created_at")
            .gte("created_at", todayStart),
          db
            .from("analytics_events")
            .select("student_id")
            .gte("created_at", yesterdayStart)
            .lt("created_at", todayStart),
          db
            .from("analytics_events")
            .select("student_id, event, event_data, session_id, created_at")
            .gte("created_at", weekStart),
          supabase
            .from("profiles")
            .select("id, email, first_name, last_name, role"),
        ])

        const firstErr =
          today.error || yesterday.error || week.error || profs.error
        if (firstErr) throw firstErr
        if (cancelled) return

        setTodayRows((today.data as EventRow[]) ?? [])
        setYesterdayIds(
          new Set(((yesterday.data as EventRow[]) ?? []).map(r => r.student_id)),
        )
        setWeekRows((week.data as EventRow[]) ?? [])
        setProfiles((profs.data as ProfileRow[]) ?? [])
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Failed to load analytics data.",
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [allowed])

  // ---- Aggregate KPIs (all derived from the fetched rows). ---------------
  const stats = useMemo(() => {
    const todayUsers = new Set(todayRows.map(r => r.student_id))

    const eventCounts = new Map<string, number>()
    let sessionMsTotal = 0
    let sessionMsCount = 0
    for (const r of todayRows) {
      eventCounts.set(r.event, (eventCounts.get(r.event) ?? 0) + 1)
      if (r.event === "session_end") {
        const ms = numAmount(r.event_data?.["duration_ms"])
        if (ms > 0) {
          sessionMsTotal += ms
          sessionMsCount += 1
        }
      }
    }

    let topFeature = "—"
    let topCount = 0
    for (const [ev, c] of eventCounts) {
      if (c > topCount) {
        topFeature = ev
        topCount = c
      }
    }

    // Retention: of users active yesterday, how many came back today.
    let returned = 0
    for (const id of yesterdayIds) if (todayUsers.has(id)) returned += 1
    const retention =
      yesterdayIds.size > 0 ? (returned / yesterdayIds.size) * 100 : 0

    return {
      dau: todayUsers.size,
      totalEvents: todayRows.length,
      avgSessionMin:
        sessionMsCount > 0 ? sessionMsTotal / sessionMsCount / 60_000 : 0,
      topFeature,
      topCount,
      retention,
      hasYesterday: yesterdayIds.size > 0,
    }
  }, [todayRows, yesterdayIds])

  // ---- Per-student rollup for the table (last 7 days). -------------------
  const studentStats = useMemo<StudentStat[]>(() => {
    const byStudent = new Map<
      string,
      { sessions: Set<string>; events: number; coins: number; last: string | null }
    >()

    for (const r of weekRows) {
      let agg = byStudent.get(r.student_id)
      if (!agg) {
        agg = { sessions: new Set(), events: 0, coins: 0, last: null }
        byStudent.set(r.student_id, agg)
      }
      agg.events += 1
      if (r.session_id) agg.sessions.add(r.session_id)
      if (r.event === "coins_earned") agg.coins += numAmount(r.event_data?.["amount"])
      if (!agg.last || r.created_at > agg.last) agg.last = r.created_at
    }

    // Build the roster from analytics_events (which admins can read in full)
    // rather than from profiles, whose RLS may only expose the current user's
    // own row and would otherwise collapse the table to a single student.
    // profiles is used only to enrich a row with a name/email when available.
    const profileById = new Map(profiles.map(p => [p.id, p]))

    const roster = Array.from(byStudent.entries())
      .map(([id, agg]) => {
        const p = profileById.get(id)
        return {
          id,
          name: p ? displayName(p) : "Unknown student",
          email: p?.email ?? "",
          sessions: agg.sessions.size,
          events: agg.events,
          coins: agg.coins,
          lastActive: agg.last,
        }
      })

    return roster
  }, [weekRows, profiles])

  // ---- Search + sort applied to the table. -------------------------------
  const visibleStudents = useMemo(() => {
    const q = search.trim().toLowerCase()
    const filtered = q
      ? studentStats.filter(
          s =>
            s.name.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q),
        )
      : studentStats

    const dir = sortDir === "asc" ? 1 : -1
    return [...filtered].sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name)
          break
        case "lastActive":
          cmp = (a.lastActive ?? "").localeCompare(b.lastActive ?? "")
          break
        default:
          cmp = a[sortKey] - b[sortKey]
      }
      return cmp * dir
    })
  }, [studentStats, search, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir(key === "name" ? "asc" : "desc")
    }
  }

  // ---- Access gates ------------------------------------------------------
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
      </div>
    )
  }

  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-background text-center">
        <h1 className="text-2xl font-bold">Access denied</h1>
        <p className="text-muted-foreground">
          This dashboard is for administrators only.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Analytics
            </h1>
            <p className="text-sm text-muted-foreground">
              Behavioral analytics across InvestiPlay — refreshed on load.
            </p>
          </div>
        </header>

        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="py-4 text-sm text-destructive">
              Couldn’t load analytics: {error}
            </CardContent>
          </Card>
        )}

        {/* --- Aggregate KPI cards --- */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <StatCard
            icon={<Users className="h-4 w-4" />}
            label="Daily active users"
            value={loading ? "…" : String(stats.dau)}
            hint="distinct students today"
          />
          <StatCard
            icon={<Activity className="h-4 w-4" />}
            label="Events today"
            value={loading ? "…" : stats.totalEvents.toLocaleString()}
            hint="total tracked actions"
          />
          <StatCard
            icon={<Clock className="h-4 w-4" />}
            label="Avg session"
            value={loading ? "…" : `${stats.avgSessionMin.toFixed(1)}m`}
            hint="from session_end pairs"
          />
          <StatCard
            icon={<Sparkles className="h-4 w-4" />}
            label="Top feature"
            value={loading ? "…" : stats.topFeature}
            hint={loading ? "" : `${stats.topCount.toLocaleString()} events`}
            small
          />
          <StatCard
            icon={<ArrowUp className="h-4 w-4" />}
            label="Retention"
            value={
              loading
                ? "…"
                : stats.hasYesterday
                  ? `${stats.retention.toFixed(0)}%`
                  : "n/a"
            }
            hint="yesterday → today"
          />
        </section>

        {/* --- Student table --- */}
        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold">
              Students{" "}
              <span className="text-sm font-normal text-muted-foreground">
                (last 7 days)
              </span>
            </h2>
            <Input
              placeholder="Search name or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="sm:max-w-xs"
            />
          </div>

          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-16 text-muted-foreground">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading
                  students…
                </div>
              ) : visibleStudents.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  {studentStats.length === 0
                    ? "No events yet."
                    : "No students match your search."}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <SortHead
                        label="Student"
                        col="name"
                        sortKey={sortKey}
                        sortDir={sortDir}
                        onClick={toggleSort}
                      />
                      <SortHead
                        label="Sessions"
                        col="sessions"
                        sortKey={sortKey}
                        sortDir={sortDir}
                        onClick={toggleSort}
                        numeric
                      />
                      <SortHead
                        label="Events"
                        col="events"
                        sortKey={sortKey}
                        sortDir={sortDir}
                        onClick={toggleSort}
                        numeric
                      />
                      <SortHead
                        label="Coins"
                        col="coins"
                        sortKey={sortKey}
                        sortDir={sortDir}
                        onClick={toggleSort}
                        numeric
                      />
                      <SortHead
                        label="Last active"
                        col="lastActive"
                        sortKey={sortKey}
                        sortDir={sortDir}
                        onClick={toggleSort}
                        numeric
                      />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleStudents.map(s => (
                      <TableRow
                        key={s.id}
                        onClick={() => setSelected(s)}
                        className="cursor-pointer odd:bg-muted/30"
                      >
                        <TableCell>
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {s.email}
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {s.sessions}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {s.events}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          <span className="inline-flex items-center gap-1">
                            <Coins className="h-3 w-3 text-amber-500" />
                            {s.coins.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {fmtWhen(s.lastActive)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </section>
      </div>

      <StudentDrawer
        student={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------

function StatCard({
  icon,
  label,
  value,
  hint,
  small,
}: {
  icon: React.ReactNode
  label: string
  value: string
  hint?: string
  small?: boolean
}) {
  return (
    <Card className="bg-muted/40">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {icon}
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={
            small
              ? "truncate text-lg font-bold"
              : "text-3xl font-bold tabular-nums"
          }
          title={value}
        >
          {value}
        </div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  )
}

function SortHead({
  label,
  col,
  sortKey,
  sortDir,
  onClick,
  numeric,
}: {
  label: string
  col: SortKey
  sortKey: SortKey
  sortDir: "asc" | "desc"
  onClick: (k: SortKey) => void
  numeric?: boolean
}) {
  const active = sortKey === col
  return (
    <TableHead className={numeric ? "text-right" : undefined}>
      <button
        type="button"
        onClick={() => onClick(col)}
        className={`inline-flex items-center gap-1 hover:text-foreground ${
          active ? "text-foreground" : "text-muted-foreground"
        } ${numeric ? "flex-row-reverse" : ""}`}
      >
        {label}
        {active ? (
          sortDir === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )
        ) : (
          <ChevronsUpDown className="h-3 w-3 opacity-40" />
        )}
      </button>
    </TableHead>
  )
}

// ---------------------------------------------------------------------------
// Per-student event drill-down. Fetches the student's last 100 events lazily,
// only when opened, and lets you filter by event type.
// ---------------------------------------------------------------------------
function StudentDrawer({
  student,
  onClose,
}: {
  student: StudentStat | null
  onClose: () => void
}) {
  const [rows, setRows] = useState<EventRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    if (!student) return
    let cancelled = false
    setFilter("all")

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const { data, error } = await (supabase as any)
          .from("analytics_events")
          .select("id, student_id, event, event_data, session_id, created_at")
          .eq("student_id", student!.id)
          .order("created_at", { ascending: false })
          .limit(100)
        if (error) throw error
        if (!cancelled) setRows((data as EventRow[]) ?? [])
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load events.")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [student])

  const eventTypes = useMemo(() => {
    const set = new Set(rows.map(r => r.event))
    return Array.from(set).sort()
  }, [rows])

  const visible = useMemo(
    () => (filter === "all" ? rows : rows.filter(r => r.event === filter)),
    [rows, filter],
  )

  return (
    <Dialog open={!!student} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {student?.name}
            <span className="text-sm font-normal text-muted-foreground">
              {student?.email}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading…" : `${visible.length} of ${rows.length} events`}
          </p>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filter events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All events</SelectItem>
              {eventTypes.map(ev => (
                <SelectItem key={ev} value={ev}>
                  {ev}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!loading && !error && rows.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md bg-blue-500/10 p-3">
              <div className="text-xs text-muted-foreground">Time spent</div>
              <div className="text-xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                {Math.round(
                  rows
                    .filter(e => e.event === "session_end")
                    .reduce(
                      (sum, e) => sum + numAmount(e.event_data?.["duration_ms"]),
                      0,
                    ) / 60000,
                )}{" "}
                min
              </div>
            </div>

            <div className="rounded-md bg-emerald-500/10 p-3">
              <div className="text-xs text-muted-foreground">Coins earned</div>
              <div className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                {rows
                  .filter(e => e.event === "coins_earned")
                  .reduce(
                    (sum, e) => sum + numAmount(e.event_data?.["amount"]),
                    0,
                  )
                  .toLocaleString()}
              </div>
            </div>

            <div className="rounded-md bg-purple-500/10 p-3">
              <div className="text-xs text-muted-foreground">Lessons done</div>
              <div className="text-xl font-bold tabular-nums text-purple-600 dark:text-purple-400">
                {rows.filter(e => e.event === "lesson_completed").length}
              </div>
            </div>
          </div>
        )}

        {error ? (
          <div className="py-10 text-center text-sm text-destructive">
            {error}
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading events…
          </div>
        ) : visible.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            No events yet.
          </div>
        ) : (
          <ScrollArea className="h-[60vh] rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="w-40">Timestamp</TableHead>
                  <TableHead className="w-44">Event</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((r, i) => (
                  <TableRow key={r.id ?? i} className="odd:bg-muted/30">
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {r.event}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {r.event_data ? (
                        <code className="block max-w-md truncate text-xs text-muted-foreground">
                          {JSON.stringify(r.event_data)}
                        </code>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
