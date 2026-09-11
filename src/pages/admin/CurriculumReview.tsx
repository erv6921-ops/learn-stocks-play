// /admin/curriculum-review — human review queue for GENERATED benchmark items.
//
// Everything here is unapproved by default: the generated SS.912.FL benchmark
// bank ships `status: "pending"` and is NEVER imported into the live benchmark.
// A reviewer approves or rejects each item; decisions persist via
// src/lib/benchmarkReview.ts (localStorage). Promotion of approved items into
// the live `benchmarkQuestions` is a deliberate, separate manual step — nothing
// on this page auto-publishes.
import React, { useMemo, useState } from "react"
import { Loader2, Check, X, RotateCcw, ClipboardList } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  generatedBenchmarkBank,
  BENCHMARK_DOMAINS,
  DOMAIN_LABELS,
  type GeneratedBenchmarkQuestion,
} from "@/data/benchmarkBankGenerated"
import {
  getAllDecisions,
  setDecision,
  clearDecision,
  type ReviewDecision,
} from "@/lib/benchmarkReview"

function difficultyLabel(d: number): string {
  if (d <= 0.34) return "easy"
  if (d <= 0.6) return "medium"
  return "hard"
}

function QuestionCard({
  q,
  decision,
  onDecide,
  onReset,
}: {
  q: GeneratedBenchmarkQuestion
  decision: ReviewDecision | null
  onDecide: (d: ReviewDecision) => void
  onReset: () => void
}) {
  const ring =
    decision === "approved"
      ? "border-success/40 bg-success/[0.03]"
      : decision === "rejected"
        ? "border-destructive/40 bg-destructive/[0.03]"
        : "border-border"
  return (
    <div className={`rounded-xl border p-4 ${ring}`}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="text-[10px] uppercase">{q.standard}</Badge>
        <Badge variant="muted" className="text-[10px]">{difficultyLabel(q.difficulty)}</Badge>
        <span className="text-[10px] text-muted-foreground">{q.id}</span>
        {decision === "approved" && <Badge className="ml-auto bg-success text-white">Approved</Badge>}
        {decision === "rejected" && <Badge className="ml-auto bg-destructive text-white">Rejected</Badge>}
        {!decision && <Badge variant="outline" className="ml-auto">Pending</Badge>}
      </div>
      <p className="text-sm font-semibold">{q.question}</p>
      <ul className="mt-2 space-y-1">
        {q.options.map((o, i) => (
          <li
            key={i}
            className={`flex items-start gap-2 text-xs ${i === q.correctAnswer ? "font-semibold text-success" : "text-muted-foreground"}`}
          >
            <span className="font-mono">{String.fromCharCode(65 + i)}.</span>
            <span>{o}</span>
            {i === q.correctAnswer && <Check className="mt-0.5 h-3 w-3 shrink-0" />}
          </li>
        ))}
      </ul>
      <p className="mt-2 rounded-lg bg-muted/40 p-2 text-xs text-muted-foreground">
        <strong>Why:</strong> {q.explanation}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <Button size="sm" variant={decision === "approved" ? "default" : "outline"} className="gap-1.5" onClick={() => onDecide("approved")}>
          <Check className="h-3.5 w-3.5" /> Approve
        </Button>
        <Button size="sm" variant={decision === "rejected" ? "destructive" : "outline"} className="gap-1.5" onClick={() => onDecide("rejected")}>
          <X className="h-3.5 w-3.5" /> Reject
        </Button>
        {decision && (
          <Button size="sm" variant="ghost" className="gap-1.5 text-muted-foreground" onClick={onReset}>
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        )}
      </div>
    </div>
  )
}

export default function CurriculumReview() {
  const { user, loading } = useAuth()
  const [decisions, setDecisions] = useState<Record<string, ReviewDecision>>(() => getAllDecisions())

  const decide = (id: string, d: ReviewDecision) => {
    setDecision(id, d)
    setDecisions(getAllDecisions())
  }
  const reset = (id: string) => {
    clearDecision(id)
    setDecisions(getAllDecisions())
  }

  const counts = useMemo(() => {
    let approved = 0, rejected = 0
    for (const q of generatedBenchmarkBank) {
      if (decisions[q.id] === "approved") approved++
      else if (decisions[q.id] === "rejected") rejected++
    }
    return { approved, rejected, pending: generatedBenchmarkBank.length - approved - rejected, total: generatedBenchmarkBank.length }
  }, [decisions])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
      </div>
    )
  }
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-background text-center">
        <h1 className="text-2xl font-bold">Sign in required</h1>
        <p className="text-muted-foreground">Log in to review the generated question queue.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold">Curriculum Review — Generated Benchmark Bank</h1>
            <p className="text-sm text-muted-foreground">
              SS.912.FL personal-finance items, generated for review. <strong>Nothing here is live</strong> —
              approving an item only records that a human vetted it.
            </p>
          </div>
          <div className="flex gap-2 text-xs">
            <Badge variant="outline">Pending {counts.pending}</Badge>
            <Badge className="bg-success text-white">Approved {counts.approved}</Badge>
            <Badge className="bg-destructive text-white">Rejected {counts.rejected}</Badge>
            <Badge variant="muted">Total {counts.total}</Badge>
          </div>
        </div>

        <div className="space-y-8">
          {BENCHMARK_DOMAINS.map((domain) => {
            const items = generatedBenchmarkBank.filter((q) => q.domain === domain)
            if (items.length === 0) return null
            return (
              <section key={domain}>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {DOMAIN_LABELS[domain]} · {items.length} items
                </h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {items.map((q) => (
                    <QuestionCard
                      key={q.id}
                      q={q}
                      decision={decisions[q.id] ?? null}
                      onDecide={(d) => decide(q.id, d)}
                      onReset={() => reset(q.id)}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
