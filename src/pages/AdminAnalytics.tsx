import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import StudentMasterDashboard from "@/components/admin/StudentMasterDashboard"

// ---------------------------------------------------------------------------
// /admin/analytics — the admin dashboard for InvestiPlay.
//
// This page now renders the StudentMasterDashboard (per-student coins, jeffs,
// lesson/quiz progress, earnings and marketplace spend, sourced from the
// teacher-gated get_student_master_stats RPC). It replaced the earlier
// analytics_events behavioral view.
//
// The route keeps its admin email allowlist: StudentMasterDashboard has no
// access control of its own, and it exposes every student's financials, so the
// gate must live here. The RPC additionally enforces teacher-only access at the
// database layer, so an allowlisted admin must also have the teacher role to see
// any rows.
// ---------------------------------------------------------------------------

// Admin allowlist. Only these emails may view the dashboard.
const ADMIN_EMAILS = ["erv6921@gmail.com"]

export default function AdminAnalytics() {
  const { user, loading: authLoading } = useAuth()

  const allowed =
    !!user && ADMIN_EMAILS.includes((user.email ?? "").toLowerCase())

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
      <div className="mx-auto max-w-7xl">
        <StudentMasterDashboard />
      </div>
    </div>
  )
}
