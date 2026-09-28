import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { BookHeart, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { looksLowEffort, LOW_EFFORT_MESSAGE } from "@/lib/answerQuality"
import { ReflectionPrompt } from "@/data/bizLab"
import { useBizLabStore } from "@/stores/bizLabStore"
import { useApp } from "@/contexts/AppContext"

const JOURNAL_XP = 20 // coins per part's reflection set, paid once

/**
 * The reflection journal at the end of each part. Answers persist to the
 * Zustand store; saving a complete set of reflections pays a small one-time
 * InvestiCoin reward.
 */
export default function ReflectionJournal({
  partId,
  prompts,
}: {
  partId: string
  prompts: ReflectionPrompt[]
}) {
  const { t } = useTranslation()
  const journals = useBizLabStore(s => s.journals)
  const saveJournal = useBizLabStore(s => s.saveJournal)
  const hasAwarded = useBizLabStore(s => s.hasAwarded)
  const markAwarded = useBizLabStore(s => s.markAwarded)
  const touchStreak = useBizLabStore(s => s.touchStreak)
  const { earnJeffs } = useApp()
  const { toast } = useToast()

  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(prompts.map(p => [p.id, journals[p.id] ?? ""])),
  )

  const awardKey = `journal:${partId}`
  const alreadyPaid = hasAwarded(awardKey)
  const allAnswered = prompts.every(p => (drafts[p.id] ?? "").trim().length > 0)

  const handleSave = () => {
    if (Object.values(drafts).some(v => v.trim() && looksLowEffort(v))) {
      toast({ title: LOW_EFFORT_MESSAGE, variant: "destructive" })
      return
    }
    prompts.forEach(p => saveJournal(p.id, drafts[p.id] ?? ""))
    touchStreak()
    if (allAnswered && !alreadyPaid) {
      earnJeffs(JOURNAL_XP, t("bizlab.reflection.reason"))
      markAwarded(awardKey)
      toast({ title: t("bizlab.reflection.paidToastTitle"), description: t("bizlab.reflection.paidToastDescription", { xp: JOURNAL_XP }) })
    } else {
      toast({ title: t("bizlab.reflection.savedToastTitle"), description: t("bizlab.reflection.savedToastDescription") })
    }
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-muted/30 p-5">
      <div className="flex items-center gap-2 mb-4">
        <BookHeart className="w-5 h-5 text-pink-500" />
        <h4 className="font-display font-bold text-lg">{t("bizlab.reflection.title")}</h4>
        {alreadyPaid && (
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-success">
            <Check className="w-3.5 h-3.5" /> {t("bizlab.reflection.completed")}
          </span>
        )}
      </div>
      <div className="space-y-4">
        {prompts.map((p, i) => (
          <div key={p.id}>
            <label className="text-sm font-medium block mb-1.5">
              {i + 1}. {p.prompt}
            </label>
            <Textarea
              value={drafts[p.id] ?? ""}
              onChange={e => setDrafts(d => ({ ...d, [p.id]: e.target.value }))}
              placeholder={t("bizlab.reflection.placeholder")}
              rows={3}
            />
          </div>
        ))}
      </div>
      <Button onClick={handleSave} className="mt-4" variant="hero">
        {t("bizlab.reflection.saveButton")}
      </Button>
    </div>
  )
}
