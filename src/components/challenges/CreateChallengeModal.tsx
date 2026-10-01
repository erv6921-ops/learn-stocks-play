import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Coins, Plus } from "lucide-react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { CHALLENGE_METRICS, type ChallengeMetric } from "@/lib/challenges"

export interface NewChallengePayload {
  title: string
  description: string
  metric: ChallengeMetric
  entry_fee: number
  teacher_bonus: number
  starts_at: string
  ends_at: string
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  submitting?: boolean
  isTeacher?: boolean
  onCreate: (payload: NewChallengePayload) => void
}

const todayStr = () => new Date().toISOString().slice(0, 10)
const addDaysStr = (base: string, days: number) => {
  const d = new Date(base + "T00:00:00")
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function CreateChallengeModal({ open, onOpenChange, submitting, isTeacher = false, onCreate }: Props) {
  const { t } = useTranslation()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [metric, setMetric] = useState<ChallengeMetric>("lessons_completed")
  const [entryFee, setEntryFee] = useState(25)
  const [teacherBonus, setTeacherBonus] = useState(0)
  const [startDate, setStartDate] = useState(todayStr())
  const [endDate, setEndDate] = useState(addDaysStr(todayStr(), 7))

  const applyPreset = (days: number) => setEndDate(addDaysStr(startDate, days))

  const submit = () => {
    const trimmedTitle = title.trim()
    const d = description.trim()
    if (!trimmedTitle) return toast.error(t("challenges.createModal.addTitle"))
    if (!d) return toast.error(t("challenges.createModal.addDescription"))
    const fee = Math.min(200, Math.max(10, Math.round(entryFee || 0)))
    const bonus = Math.max(0, Math.round(teacherBonus || 0))
    const starts = new Date(startDate + "T00:00:00")
    const ends = new Date(endDate + "T23:59:59")
    if (ends.getTime() <= starts.getTime()) return toast.error(t("challenges.endAfterStart"))
    onCreate({
      title: trimmedTitle,
      description: d,
      metric,
      entry_fee: fee,
      teacher_bonus: bonus,
      starts_at: starts.toISOString(),
      ends_at: ends.toISOString(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Plus className="w-5 h-5 text-primary" /> {t("challenges.createModal.title")}</DialogTitle>
          <DialogDescription>{t("challenges.createModal.description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="ch-title">{t("challenges.createModal.titleLabel")}</Label>
            <Input id="ch-title" value={title} maxLength={60} onChange={e => setTitle(e.target.value)} placeholder={t("challenges.createModal.titlePlaceholder")} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ch-desc">{t("challenges.createModal.descriptionLabel")}</Label>
            <Textarea id="ch-desc" value={description} maxLength={200} onChange={e => setDescription(e.target.value)} placeholder={t("challenges.createModal.descriptionPlaceholder")} rows={2} />
          </div>

          <div className="space-y-1.5">
            <Label>{t("challenges.createModal.metric")}</Label>
            <Select value={metric} onValueChange={v => setMetric(v as ChallengeMetric)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CHALLENGE_METRICS.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className={`grid gap-3 ${isTeacher ? "grid-cols-2" : "grid-cols-1"}`}>
            <div className="space-y-1.5">
              <Label htmlFor="ch-fee">{t("challenges.createModal.entryFee")}</Label>
              <Input id="ch-fee" type="number" min={10} max={200} value={entryFee} onChange={e => setEntryFee(Number(e.target.value))} />
            </div>
            {isTeacher && (
              <div className="space-y-1.5">
                <Label htmlFor="ch-bonus" className="flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" /> {t("challenges.createModal.bonusCoins")}</Label>
                <Input id="ch-bonus" type="number" min={0} value={teacherBonus} onChange={e => setTeacherBonus(Number(e.target.value))} placeholder={t("challenges.createModal.bonusPlaceholder")} />
              </div>
            )}
          </div>
          {isTeacher && <p className="text-xs text-muted-foreground -mt-2">{t("challenges.createModal.bonusHint")}</p>}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="ch-start">{t("challenges.startDate")}</Label>
              <Input id="ch-start" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ch-end">{t("challenges.endDate")}</Label>
              <Input id="ch-end" type="date" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[["challenges.preset.3days", 3], ["challenges.preset.1week", 7], ["challenges.preset.2weeks", 14]].map(([key, days]) => (
              <Button key={key as string} type="button" variant="outline" size="sm" className="press-scale" onClick={() => applyPreset(days as number)}>
                {t(key as string)}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={submitting}>{t("challenges.cancel")}</Button>
          <Button onClick={submit} disabled={submitting}>{submitting ? t("challenges.createModal.creating") : t("challenges.createModal.createButton")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
