import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, PenLine, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { getScenarioSet } from "@/content/gullerIntro/scenarios"

// ═══════════════════════════════════════════════════════════════
// SCENARIO FREE-RESPONSE  (overnight-build P4) — student side
// ───────────────────────────────────────────────────────────────
// Optional, ungraded, applied writing shown AFTER a lesson is finished. It
// never affects mastery score or theta — it just saves the student's words to
// `scenario_responses` for the teacher to read later.
//
// Fully additive + defensive: if the scenario_responses table doesn't exist yet
// (migration not run), reads/writes fail gracefully and the panel simply hides
// its already-submitted state / shows a soft error toast — it can never break
// the lesson-completion screen it renders under.
// ═══════════════════════════════════════════════════════════════

function wordCount(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length
}

export function ScenarioResponse({ lessonId }: { lessonId: string }) {
  const set = getScenarioSet(lessonId)
  const [openId, setOpenId] = useState<string | null>(null)
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState<string | null>(null)

  // Pull any responses this student already wrote so revisiting the screen
  // shows them as done instead of prompting a duplicate.
  useEffect(() => {
    if (!set) return
    let cancelled = false
    ;(async () => {
      try {
        const { data: userData } = await supabase.auth.getUser()
        const uid = userData.user?.id
        if (!uid || cancelled) return
        const { data, error } = await (supabase as any).from("scenario_responses")
          .select("scenario_id")
          .eq("user_id", uid)
          .eq("lesson_id", lessonId)
        if (error || cancelled || !data) return
        const done: Record<string, boolean> = {}
        data.forEach((r: any) => { done[r.scenario_id] = true })
        setSubmitted(done)
      } catch {
        // table missing / offline — leave everything as un-submitted
      }
    })()
    return () => { cancelled = true }
  }, [lessonId, set])

  if (!set) return null

  const handleSubmit = async (scenarioId: string) => {
    const text = (drafts[scenarioId] ?? "").trim()
    if (wordCount(text) < set.minWords) return
    setSaving(scenarioId)
    try {
      const { data: userData } = await supabase.auth.getUser()
      const uid = userData.user?.id
      if (!uid) throw new Error("Not signed in")
      const { error } = await (supabase as any).from("scenario_responses").insert({
        user_id: uid,
        lesson_id: lessonId,
        scenario_id: scenarioId,
        response_text: text,
      })
      if (error) throw error
      setSubmitted((s) => ({ ...s, [scenarioId]: true }))
      setOpenId(null)
      toast.success("Sent to your teacher 📨", {
        description: "Nice thinking — this won't change your score.",
      })
    } catch (e: any) {
      toast.error("Couldn't save that response", {
        description: e?.message || "Please try again in a bit.",
      })
    } finally {
      setSaving(null)
    }
  }

  return (
    <Card variant="elevated" className="mt-4 border-primary/15">
      <CardContent className="p-5 md:p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
              {set.title}
            </p>
            <h3 className="text-lg font-bold mt-0.5">Put it to work</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{set.subtitle}</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {set.prompts.map((p, i) => {
            const isOpen = openId === p.id
            const isDone = submitted[p.id]
            const draft = drafts[p.id] ?? ""
            const words = wordCount(draft)
            const enough = words >= set.minWords
            return (
              <div key={p.id} className="rounded-2xl border border-border bg-card/50">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : p.id)}
                  className="w-full flex items-center gap-3 p-3.5 text-left"
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isDone ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <PenLine className="w-4 h-4" />}
                  </div>
                  <span className="flex-1 text-sm font-medium leading-snug">
                    {p.prompt}
                  </span>
                  {isDone && (
                    <span className="text-[11px] font-bold text-success shrink-0">Sent ✓</span>
                  )}
                </button>

                {isOpen && !isDone && (
                  <div className="px-3.5 pb-3.5 space-y-2">
                    <Textarea
                      value={draft}
                      onChange={(e) => setDrafts((d) => ({ ...d, [p.id]: e.target.value }))}
                      placeholder="Write your answer in your own words…"
                      rows={4}
                      className="resize-none text-[15px]"
                      autoFocus
                    />
                    {p.hint && (
                      <p className="text-xs text-muted-foreground italic">💡 {p.hint}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold ${
                          enough ? "text-success" : "text-muted-foreground"
                        }`}
                      >
                        {words} / {set.minWords} words {enough && "✓"}
                      </span>
                      <Button
                        size="sm"
                        className="font-bold"
                        disabled={!enough || saving === p.id}
                        onClick={() => handleSubmit(p.id)}
                      >
                        {saving === p.id
                          ? "Sending…"
                          : enough
                            ? "Send to teacher"
                            : `Write ${set.minWords - words} more`}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
