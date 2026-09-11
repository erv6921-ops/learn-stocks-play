// Orchestrator page for an `irs_form` lab. Renders the real-form replica for the
// payload, grades the student's entries against the lab's `expected` answer key
// with per-box feedback anchored to the box number, awards coins on a perfect
// submission, and records the attempt (localStorage, same pattern as other labs).
import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import GameNav from "@/components/GameNav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, Coins, ClipboardCheck, RotateCcw } from "lucide-react"
import type { LabDocument } from "@/data/labDocuments"
import { markLabDocDone } from "@/data/labDocuments"
import { valuesMatch } from "./format"
import { recordIrsAttempt } from "./attempts"
import type { GradeResult, IRSFormPayload, IRSGradeSpec } from "./types"
import W4Form, { w4Grading } from "./W4Form"
import W2Form, { w2Grading } from "./W2Form"
import Form1099NEC, { nec1099Grading } from "./Form1099NEC"
import Form1040, { f1040Grading } from "./Form1040"

const FORMS = {
  w4: { Comp: W4Form, grading: w4Grading },
  w2: { Comp: W2Form, grading: w2Grading },
  "1099nec": { Comp: Form1099NEC, grading: nec1099Grading },
  "1040": { Comp: Form1040, grading: f1040Grading },
} as const

export default function IRSFormLab({ doc, payload }: { doc: LabDocument; payload: IRSFormPayload }) {
  const navigate = useNavigate()
  const { earnJeffs, getRewardMultiplier } = useApp()

  const entry = FORMS[payload.form]
  const Comp = entry.Comp
  const grading = entry.grading
  const prefill = payload.prefill ?? {}
  const expected = payload.expected ?? {}
  const expectedIds = useMemo(() => Object.keys(expected), [expected])

  const [values, setValues] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState<GradeResult>({})
  const [checked, setChecked] = useState(false)
  const [completed, setCompleted] = useState(false)

  const setValue = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }))
    // A change after a check clears that field's stale feedback.
    if (checked) setFeedback((prev) => { const n = { ...prev }; delete n[id]; return n })
  }

  const grade = () => {
    const result: GradeResult = {}
    let correct = 0
    for (const id of expectedIds) {
      const spec: IRSGradeSpec | undefined = grading[id]
      const kind = spec?.kind ?? "text"
      const ok = valuesMatch(kind, values[id] ?? "", expected[id] ?? "")
      result[id] = ok
        ? { status: "correct", message: "" }
        : { status: "wrong", message: spec?.hint ?? "Check this box against the scenario." }
      if (ok) correct++
    }
    setFeedback(result)
    setChecked(true)
    const rec = recordIrsAttempt(doc.id, correct, expectedIds.length)
    if (correct === expectedIds.length && expectedIds.length > 0) {
      markLabDocDone(doc.id)
      earnJeffs(doc.reward, `Completed IRS form lab: ${doc.title}`)
      setCompleted(true)
    }
    return rec
  }

  const reset = () => { setFeedback({}); setChecked(false) }

  const correctCount = Object.values(feedback).filter((f) => f.status === "correct").length
  const totalGraded = expectedIds.length

  if (completed) {
    return (
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <GameNav />
        <main className="container mx-auto max-w-2xl px-4 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card variant="elevated">
              <CardContent className="space-y-5 p-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
                  <CheckCircle className="h-10 w-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold">Form filed correctly! 🧾</h2>
                <p className="text-muted-foreground">
                  Every box on the {doc.title} checked out. You read the real form and got the numbers in the right places.
                </p>
                <div className="rounded-xl border border-gold/20 bg-gold/10 p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Coins className="h-5 w-5 text-gold" />
                    <span className="text-2xl font-semibold text-gold">
                      +{Math.round(doc.reward * getRewardMultiplier()).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">InvestiCoins earned!</p>
                </div>
                <Button onClick={() => navigate("/lab")} className="min-h-[44px]">
                  Back to Lab <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-8">
      <GameNav />

      {/* Sticky header */}
      <div className="sticky top-16 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/lab")} className="min-h-[44px] min-w-[44px]">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{doc.title}</p>
              <p className="truncate text-[11px] text-muted-foreground">Real IRS form · fill the boxes, then check</p>
            </div>
            {checked && (
              <span className="text-xs font-semibold text-muted-foreground">
                {correctCount}/{totalGraded} boxes correct
              </span>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 py-6">
        {payload.scenario && (
          <div className="mb-4 rounded-xl border border-primary/15 bg-primary/[0.04] p-4">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <ClipboardCheck className="h-3.5 w-3.5" /> Your task
            </p>
            <p className="text-sm text-foreground">{payload.scenario}</p>
          </div>
        )}

        <Comp values={values} setValue={setValue} prefill={prefill} feedback={feedback} checked={checked} />

        {checked && correctCount < totalGraded && (
          <div className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm">
            <p className="font-semibold text-amber-700">
              {totalGraded - correctCount} box{totalGraded - correctCount === 1 ? "" : "es"} need another look.
            </p>
            <p className="mt-1 text-muted-foreground">
              Red boxes have a hint pinned to the box number. Fix them and check again.
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button onClick={grade} className="min-h-[48px] gap-2 font-semibold">
            <ClipboardCheck className="h-4 w-4" /> {checked ? "Check again" : "Check my answers"}
          </Button>
          {checked && (
            <Button variant="outline" onClick={reset} className="min-h-[48px] gap-2">
              <RotateCcw className="h-4 w-4" /> Clear feedback
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
