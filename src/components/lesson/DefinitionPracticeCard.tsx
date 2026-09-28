import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import type { DefinitionPractice } from "@/data/definitionPractice"

const MIN_CHARS = 20

/**
 * Mandatory "Define These Key Terms" practice card shown in place of the
 * post-mastery reflection for lessons that define one. The student writes a
 * definition for each term, checks it against the reference answer in a modal,
 * and then — right there beside the correct definitions — clicks a button that
 * finishes the lesson. Purely practice: onComplete just ends the lesson;
 * nothing here touches the mastery score or theta.
 */
export function DefinitionPracticeCard({
  definition,
  onComplete,
}: {
  definition: DefinitionPractice
  onComplete: () => void
}) {
  const { t } = useTranslation()
  const { title, subtitle, terms } = definition
  const [answers, setAnswers] = useState<string[]>(() => terms.map(() => ""))
  const [modalOpen, setModalOpen] = useState(false)

  const allFilled = answers.every((a) => a.trim().length >= MIN_CHARS)

  const updateAnswer = (idx: number, value: string) => {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? value : a)))
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-muted/60 p-6 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {terms.map((t, idx) => {
          const filled = answers[idx].trim().length >= MIN_CHARS
          return (
            <div key={t.term} className="flex flex-col">
              <label htmlFor={`def-${idx}`} className="font-bold text-base md:text-lg mb-2">
                {t.term}
              </label>
              <Textarea
                id={`def-${idx}`}
                value={answers[idx]}
                onChange={(e) => updateAnswer(idx, e.target.value)}
                placeholder={t("lessonPlayer.writeDefinition")}
                className="min-h-[100px] resize-none bg-background/70 border-border focus-visible:ring-2 focus-visible:ring-ring text-[15px] leading-relaxed"
              />
              <span
                className={`text-[11px] mt-1 ${filled ? "text-success font-semibold" : "text-muted-foreground"}`}
              >
                {filled ? t("lessonPlayer.ready") : t("lessonPlayer.moreCharacters", { count: Math.max(0, MIN_CHARS - answers[idx].trim().length) })}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <Button
          size="lg"
          className="w-full font-bold"
          disabled={!allFilled}
          onClick={() => setModalOpen(true)}
        >
          {t("lessonPlayer.checkDefinitions")}
        </Button>
      </div>

      {/* Answer review: each term shows the student's attempt next to the
          reference definition, with a button to finish the lesson right here.
          Closing (X) returns to the card so they can edit and re-check. */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("lessonPlayer.howDidCompare")}</DialogTitle>
            <DialogDescription>
              {t("lessonPlayer.readReference")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            {terms.map((t, idx) => (
              <div key={t.term}>
                <p className="font-bold text-base">{t.term}</p>
                <div className="mt-2 space-y-2">
                  <div className="rounded-lg border border-border bg-muted/50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                      {t("lessonPlayer.yourAnswer")}
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{answers[idx].trim() || "—"}</p>
                  </div>
                  <div className="rounded-lg border border-success/30 bg-success/10 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-success mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t("lessonPlayer.correctDefinition")}
                    </p>
                    <p className="text-sm text-foreground">{t.correctDefinition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button size="lg" className="w-full font-bold" onClick={onComplete}>
            {t("lessonPlayer.finishLesson")} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
