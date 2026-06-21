import React, { useState } from "react"
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
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [metric, setMetric] = useState<ChallengeMetric>("lessons_completed")
  const [entryFee, setEntryFee] = useState(25)
  const [teacherBonus, setTeacherBonus] = useState(0)
  const [startDate, setStartDate] = useState(todayStr())
  const [endDate, setEndDate] = useState(addDaysStr(todayStr(), 7))

  const applyPreset = (days: number) => setEndDate(addDaysStr(startDate, days))

  const submit = () => {
    const t = title.trim()
    const d = description.trim()
    if (!t) return toast.error("Add a title")
    if (!d) return toast.error("Add a description")
    const fee = Math.min(200, Math.max(10, Math.round(entryFee || 0)))
    const bonus = Math.max(0, Math.round(teacherBonus || 0))
    const starts = new Date(startDate + "T00:00:00")
    const ends = new Date(endDate + "T23:59:59")
    if (ends.getTime() <= starts.getTime()) return toast.error("End date must be after the start date")
    onCreate({
      title: t,
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
          <DialogTitle className="flex items-center gap-2"><Plus className="w-5 h-5 text-primary" /> Create a challenge</DialogTitle>
          <DialogDescription>Post a competition for your class. Students spend coins to enter; the winner takes the pot.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="ch-title">Title</Label>
            <Input id="ch-title" value={title} maxLength={60} onChange={e => setTitle(e.target.value)} placeholder="Friday Lesson Sprint" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ch-desc">Description</Label>
            <Textarea id="ch-desc" value={description} maxLength={200} onChange={e => setDescription(e.target.value)} placeholder="Who can complete the most lessons before Friday?" rows={2} />
          </div>

          <div className="space-y-1.5">
            <Label>Metric</Label>
            <Select value={metric} onValueChange={v => setMetric(v as ChallengeMetric)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CHALLENGE_METRICS.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className={`grid gap-3 ${isTeacher ? "grid-cols-2" : "grid-cols-1"}`}>
            <div className="space-y-1.5">
              <Label htmlFor="ch-fee">Entry fee (coins)</Label>
              <Input id="ch-fee" type="number" min={10} max={200} value={entryFee} onChange={e => setEntryFee(Number(e.target.value))} />
            </div>
            {isTeacher && (
              <div className="space-y-1.5">
                <Label htmlFor="ch-bonus" className="flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" /> Bonus coins</Label>
                <Input id="ch-bonus" type="number" min={0} value={teacherBonus} onChange={e => setTeacherBonus(Number(e.target.value))} placeholder="0 (optional)" />
              </div>
            )}
          </div>
          {isTeacher && <p className="text-xs text-muted-foreground -mt-2">Add bonus coins to the pot (optional) — seeds it on top of student entries.</p>}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="ch-start">Start date</Label>
              <Input id="ch-start" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ch-end">End date</Label>
              <Input id="ch-end" type="date" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[["3 days", 3], ["1 week", 7], ["2 weeks", 14]].map(([label, days]) => (
              <Button key={label as string} type="button" variant="outline" size="sm" className="press-scale" onClick={() => applyPreset(days as number)}>
                {label}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={submitting}>Cancel</Button>
          <Button onClick={submit} disabled={submitting}>{submitting ? "Creating…" : "Create challenge"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
