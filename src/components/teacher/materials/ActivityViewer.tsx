// Class-activity viewer/editor. Renders and edits the three formats
// (team challenge, decision cards, exit ticket), including teacher
// instructions and (for exit tickets) the answer key. "Print / PDF" opens a
// print-styled window.

import React from "react"
import { useTranslation } from "react-i18next"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type {
  ActivityContent,
  DecisionCard,
  ExitTicketQuestion,
} from "@/types/materials"
import { printActivity } from "@/lib/materials/print"
import { Printer, Save, Plus, Trash2, Loader2 } from "lucide-react"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  activity: ActivityContent
  onActivityChange: (a: ActivityContent) => void
  onSave: () => void
  saving?: boolean
}

const FORMAT_LABEL: Record<ActivityContent["format"], string> = {
  "team-challenge": "Team challenge",
  "decision-cards": "Decision cards",
  "exit-ticket": "Exit ticket",
}

export function ActivityViewer({ open, onOpenChange, activity, onActivityChange, onSave, saving }: Props) {
  const { t } = useTranslation()
  const set = (patch: Partial<ActivityContent>) => onActivityChange({ ...activity, ...patch })
  const setBody = (patch: Record<string, unknown>) =>
    onActivityChange({ ...activity, body: { ...activity.body, ...patch } as ActivityContent["body"] })

  const b = activity.body

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] h-[85vh] p-0 flex flex-col gap-0">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <Input value={activity.title} onChange={(e) => set({ title: e.target.value })} className="font-semibold max-w-sm" />
          <span className="text-xs text-muted-foreground">{FORMAT_LABEL[activity.format]}</span>
          <div className="flex-1" />
          <Button size="sm" variant="outline" onClick={() => printActivity(activity)}>
            <Printer className="h-4 w-4 mr-1.5" />
            {t("materials.printPdf")}
          </Button>
          <Button size="sm" onClick={onSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Save className="h-4 w-4 mr-1.5" />}
            {t("common.save")}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Teacher instructions */}
          <section>
            <div className="flex items-center gap-3">
              <Label className="text-xs">{t("materials.timingMinutes")}</Label>
              <Input
                type="number"
                min={5}
                max={120}
                value={activity.timingMinutes}
                onChange={(e) => set({ timingMinutes: Number(e.target.value) || 0 })}
                className="w-24"
              />
            </div>
            <Label className="text-xs mt-3 block">{t("materials.teacherInstructions")}</Label>
            <Textarea
              value={activity.teacherInstructions.join("\n")}
              onChange={(e) => set({ teacherInstructions: e.target.value.split("\n") })}
              rows={4}
            />
            <p className="text-[11px] text-muted-foreground mt-1">{t("materials.onePerLine")}</p>
          </section>

          <hr className="border-border" />

          {/* Team challenge */}
          {b.format === "team-challenge" && (
            <section className="space-y-3">
              <div>
                <Label className="text-xs">{t("materials.scenario")}</Label>
                <Textarea value={b.scenario} onChange={(e) => setBody({ scenario: e.target.value })} rows={4} />
              </div>
              <div>
                <Label className="text-xs">{t("materials.tasks")}</Label>
                <Textarea
                  value={b.tasks.join("\n")}
                  onChange={(e) => setBody({ tasks: e.target.value.split("\n").filter(Boolean) })}
                  rows={5}
                />
                <p className="text-[11px] text-muted-foreground mt-1">{t("materials.onePerLine")}</p>
              </div>
              <div>
                <Label className="text-xs">{t("materials.shareOut")}</Label>
                <Textarea value={b.shareOut} onChange={(e) => setBody({ shareOut: e.target.value })} rows={2} />
              </div>
            </section>
          )}

          {/* Decision cards */}
          {b.format === "decision-cards" && (
            <section className="space-y-3">
              {b.cards.map((c, i) => {
                const update = (patch: Partial<DecisionCard>) => {
                  const cards = b.cards.map((cc, j) => (j === i ? { ...cc, ...patch } : cc))
                  setBody({ cards })
                }
                return (
                  <div key={i} className="rounded-lg border p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">#{i + 1}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-destructive"
                        onClick={() => setBody({ cards: b.cards.filter((_, j) => j !== i) })}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <Textarea value={c.prompt} onChange={(e) => update({ prompt: e.target.value })} rows={2} placeholder="Would you rather…" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input value={c.optionA} onChange={(e) => update({ optionA: e.target.value })} placeholder="Option A" />
                      <Input value={c.optionB} onChange={(e) => update({ optionB: e.target.value })} placeholder="Option B" />
                    </div>
                    <Textarea
                      value={c.discussion.join("\n")}
                      onChange={(e) => update({ discussion: e.target.value.split("\n").filter(Boolean) })}
                      rows={2}
                      placeholder={t("materials.discussionPrompts")}
                    />
                  </div>
                )
              })}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setBody({ cards: [...b.cards, { prompt: "", optionA: "", optionB: "", discussion: [] }] })}
              >
                <Plus className="h-4 w-4 mr-1.5" />
                {t("materials.addCard")}
              </Button>
            </section>
          )}

          {/* Exit ticket */}
          {b.format === "exit-ticket" && (
            <section className="space-y-3">
              {b.questions.map((q, i) => {
                const update = (patch: Partial<ExitTicketQuestion>) => {
                  const questions = b.questions.map((qq, j) => (j === i ? { ...qq, ...patch } : qq))
                  setBody({ questions })
                }
                return (
                  <div key={i} className="rounded-lg border p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">{t("materials.question")} {i + 1}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-destructive"
                        onClick={() => setBody({ questions: b.questions.filter((_, j) => j !== i) })}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <Textarea value={q.question} onChange={(e) => update({ question: e.target.value })} rows={2} />
                    {(q.options?.length ?? 0) > 0 && (
                      <div>
                        <Label className="text-[11px] text-muted-foreground">{t("materials.options")}</Label>
                        <Textarea
                          value={(q.options ?? []).join("\n")}
                          onChange={(e) => update({ options: e.target.value.split("\n").filter(Boolean) })}
                          rows={4}
                        />
                        <p className="text-[11px] text-muted-foreground mt-1">{t("materials.onePerLine")}</p>
                      </div>
                    )}
                    <div>
                      <Label className="text-[11px] text-muted-foreground">{t("materials.answerKey")}</Label>
                      <Input value={q.answer} onChange={(e) => update({ answer: e.target.value })} />
                    </div>
                  </div>
                )
              })}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setBody({ questions: [...b.questions, { question: "", options: [], answer: "" }] })}
              >
                <Plus className="h-4 w-4 mr-1.5" />
                {t("materials.addQuestion")}
              </Button>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ActivityViewer
