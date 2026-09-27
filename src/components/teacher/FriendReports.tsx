// Teacher view of student abuse reports from the Friends feature. Reads
// friends_list_reports() (SECURITY DEFINER, scoped to the teacher's own
// classes) and shows a simple reverse-chronological list.
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { formatDistanceToNow } from "date-fns"
import { Flag, Loader2, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { listReports, type TeacherReportRow } from "@/lib/friends"

export function FriendReports() {
  const { t } = useTranslation()
  const [reports, setReports] = useState<TeacherReportRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    listReports()
      .then((r) => { if (!cancelled) setReports(r) })
      .catch(() => { /* leave empty on error */ })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-6 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> {t("friends.loading")}
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <Card variant="elevated">
        <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
          <ShieldCheck className="h-10 w-10 text-muted-foreground/50" />
          <p className="font-semibold">{t("teacherReports.emptyTitle")}</p>
          <p className="text-sm text-muted-foreground">{t("teacherReports.emptyBody")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{t("teacherReports.intro")}</p>
      {reports.map((r) => (
        <Card key={r.id} variant="elevated">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Flag className="h-4 w-4 text-destructive" />
              <span className="font-bold">{r.reported_name || t("common.student")}</span>
              <Badge variant="outline" className="text-xs">{t(`friends.reportReason.${r.reason}`, r.reason)}</Badge>
              <span className="ml-auto text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("teacherReports.reportedBy", { name: r.reporter_name || t("common.student") })}
            </p>
            {r.note && (
              <p className="mt-1 rounded-lg bg-muted/40 px-3 py-2 text-sm">"{r.note}"</p>
            )}
            {r.message_id && (
              <p className="mt-2 text-xs text-muted-foreground">
                {t("teacherReports.messageContext", {
                  type: t(`friends.cardType.${r.message_type ?? "note"}`),
                })}
                {r.message_note ? ` — "${r.message_note}"` : ""}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default FriendReports
