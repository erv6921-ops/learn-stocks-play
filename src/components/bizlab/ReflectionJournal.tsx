import React, { useState } from "react"
import { BookHeart, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
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
    prompts.forEach(p => saveJournal(p.id, drafts[p.id] ?? ""))
    touchStreak()
    if (allAnswered && !alreadyPaid) {
      earnJeffs(JOURNAL_XP, "Biz Lab reflection journal")
      markAwarded(awardKey)
      toast({ title: "Reflections saved!", description: `+${JOURNAL_XP} InvestiCoins for your thoughtful answers.` })
    } else {
      toast({ title: "Saved", description: "Your reflections are stored." })
    }
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-muted/30 p-5">
      <div className="flex items-center gap-2 mb-4">
        <BookHeart className="w-5 h-5 text-pink-500" />
        <h4 className="font-display font-bold text-lg">Reflection Journal</h4>
        {alreadyPaid && (
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-success">
            <Check className="w-3.5 h-3.5" /> Completed
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
              placeholder="Write your reflection..."
              rows={3}
            />
          </div>
        ))}
      </div>
      <Button onClick={handleSave} className="mt-4" variant="hero">
        Save Reflections
      </Button>
    </div>
  )
}
