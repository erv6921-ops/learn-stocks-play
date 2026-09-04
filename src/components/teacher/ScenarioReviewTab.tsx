import { useCallback, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, MessageSquareText, Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { getScenarioPromptText } from "@/content/gullerIntro/scenarios"

// ═══════════════════════════════════════════════════════════════
// TEACHER SCENARIO REVIEW  (overnight-build P4) — teacher side
// ───────────────────────────────────────────────────────────────
// Reads the ungraded scenario_responses written by this class's students and
// lets the teacher read them and mark each reviewed. Self-contained: does its
// own queries so it drops into TeacherDashboard with a single <TabsContent>.
//
// Defensive: if the scenario_responses table isn't there yet (migration not
// run), it shows a clear "not set up" note instead of throwing.
// ═══════════════════════════════════════════════════════════════

interface Member {
  user_id: string
  profile?: { first_name?: string | null; last_name?: string | null; email?: string | null } | null
}

interface ResponseRow {
  id: string
  user_id: string
  lesson_id: string
  scenario_id: string
  response_text: string
  created_at: string
  reviewed_by: string | null
}

export function ScenarioReviewTab({ members }: { members: Member[] }) {
  const [rows, setRows] = useState<ResponseRow[]>([])
  const [loading, setLoading] = useState(true)
  const [unavailable, setUnavailable] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [showReviewed, setShowReviewed] = useState(false)

  const nameFor = useCallback(
    (uid: string) => {
      const m = members.find((x) => x.user_id === uid)
      const p = m?.profile
      const full = [p?.first_name, p?.last_name].filter(Boolean).join(" ").trim()
      return full || p?.email || "Unknown student"
    },
    [members],
  )

  const load = useCallback(async () => {
    const ids = members.map((m) => m.user_id)
    if (ids.length === 0) {
      setRows([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const { data, error } = await (supabase as any).from("scenario_responses")
        .select("id, user_id, lesson_id, scenario_id, response_text, created_at, reviewed_by")
        .in("user_id", ids)
        .order("created_at", { ascending: false })
      if (error) {
        setUnavailable(true)
        setRows([])
      } else {
        setRows((data || []) as ResponseRow[])
        setUnavailable(false)
      }
    } catch {
      setUnavailable(true)
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [members])

  useEffect(() => { void load() }, [load])

  const markReviewed = async (row: ResponseRow) => {
    setBusyId(row.id)
    try {
      const { data: userData } = await supabase.auth.getUser()
      const teacherId = userData.user?.id ?? null
      const { error } = await (supabase as any).from("scenario_responses")
        .update({ reviewed_by: teacherId })
        .eq("id", row.id)
      if (error) throw error
      setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, reviewed_by: teacherId } : r)))
    } catch {
      // no-op: leave it unreviewed, teacher can retry
    } finally {
      setBusyId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading responses…
      </div>
    )
  }

  if (unavailable) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Scenario review isn't set up yet</p>
          <p>
            The <code>scenario_responses</code> table hasn't been created in Supabase. Run the
            migration in <code>BUILD-SUMMARY.md</code>, then refresh — student responses will
            appear here.
          </p>
        </CardContent>
      </Card>
    )
  }

  const visible = rows.filter((r) => (showReviewed ? true : !r.reviewed_by))
  const pendingCount = rows.filter((r) => !r.reviewed_by).length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{pendingCount}</span> awaiting review
          {rows.length > 0 && <> · {rows.length} total</>}
        </p>
        <Button variant="ghost" size="sm" onClick={() => setShowReviewed((s) => !s)}>
          {showReviewed ? "Hide reviewed" : "Show reviewed"}
        </Button>
      </div>

      {visible.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <MessageSquareText className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">
              {rows.length === 0
                ? "No scenario responses yet. They'll show up once students finish a lesson that has scenarios."
                : "All caught up — every response has been reviewed. 🎉"}
            </p>
          </CardContent>
        </Card>
      ) : (
        visible.map((r) => (
          <Card key={r.id} className={r.reviewed_by ? "opacity-70" : ""}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{nameFor(r.user_id)}</span>
                  <Badge variant="secondary" className="text-[10px]">{r.lesson_id}</Badge>
                  {r.reviewed_by && (
                    <Badge className="text-[10px] bg-success/15 text-success border-0">
                      Reviewed
                    </Badge>
                  )}
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs font-medium text-primary">
                {getScenarioPromptText(r.scenario_id) || r.scenario_id}
              </p>

              <p className="text-sm leading-relaxed whitespace-pre-wrap bg-muted/40 rounded-xl p-3">
                {r.response_text}
              </p>

              {!r.reviewed_by && (
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busyId === r.id}
                    onClick={() => markReviewed(r)}
                  >
                    {busyId === r.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Mark reviewed
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
