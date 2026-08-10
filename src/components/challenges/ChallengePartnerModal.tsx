import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Swords, Coins, Users } from "lucide-react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { CHALLENGE_METRICS, metricMeta, type ChallengeMetric } from "@/lib/challenges"

export interface PartnerOption {
  user_id: string
  name: string
}

export interface NewDuelPayload {
  opponent_user_id: string
  opponent_name: string
  title: string
  description: string
  metric: ChallengeMetric
  entry_fee: number
  starts_at: string
  ends_at: string
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  submitting?: boolean
  partners: PartnerOption[]
  balance: number
  onCreate: (payload: NewDuelPayload) => void
}

const todayStr = () => new Date().toISOString().slice(0, 10)
const addDaysStr = (base: string, days: number) => {
  const d = new Date(base + "T00:00:00")
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function ChallengePartnerModal({ open, onOpenChange, submitting, partners, balance, onCreate }: Props) {
  const [opponentId, setOpponentId] = useState("")
  const [metric, setMetric] = useState<ChallengeMetric>("lessons_completed")
  const [stake, setStake] = useState(25)
  const [startDate, setStartDate] = useState(todayStr())
  const [endDate, setEndDate] = useState(addDaysStr(todayStr(), 7))

  // Default to the first partner whenever the picker opens.
  useEffect(() => {
    if (open && !opponentId && partners.length) setOpponentId(partners[0].user_id)
  }, [open, partners, opponentId])

  const opponent = useMemo(() => partners.find(p => p.user_id === opponentId), [partners, opponentId])
  const applyPreset = (days: number) => setEndDate(addDaysStr(startDate, days))

  const submit = () => {
    if (!opponent) return toast.error("Pick a partner to challenge")
    const fee = Math.min(200, Math.max(10, Math.round(stake || 0)))
    if (balance < fee) return toast.error("Not enough InvestiCoins for that stake")
    const starts = new Date(startDate + "T00:00:00")
    const ends = new Date(endDate + "T23:59:59")
    if (ends.getTime() <= starts.getTime()) return toast.error("End date must be after the start date")
    const meta = metricMeta(metric)
    onCreate({
      opponent_user_id: opponent.user_id,
      opponent_name: opponent.name,
      title: `Duel vs ${opponent.name}`,
      description: `${meta.tracking} — head to head. Winner takes the pot.`,
      metric,
      entry_fee: fee,
      starts_at: starts.toISOString(),
      ends_at: ends.toISOString(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Swords className="w-5 h-5 text-primary" /> Challenge a partner</DialogTitle>
          <DialogDescription>Pick one partner for a 1v1 duel. You both stake coins — winner takes the pot.</DialogDescription>
        </DialogHeader>

        {partners.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <p className="font-semibold">You don't have any partners yet</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Add a partner first, then you can duel them.</p>
            <Link to="/partners"><Button variant="secondary" onClick={() => onOpenChange(false)}>Find partners</Button></Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label>Opponent</Label>
                <Select value={opponentId} onValueChange={setOpponentId}>
                  <SelectTrigger><SelectValue placeholder="Choose a partner" /></SelectTrigger>
                  <SelectContent>
                    {partners.map(p => <SelectItem key={p.user_id} value={p.user_id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>What decides the winner?</Label>
                <Select value={metric} onValueChange={v => setMetric(v as ChallengeMetric)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CHALLENGE_METRICS.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="duel-stake" className="flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" /> Your stake (coins)</Label>
                <Input id="duel-stake" type="number" min={10} max={200} value={stake} onChange={e => setStake(Number(e.target.value))} />
                <p className="text-xs text-muted-foreground">Your partner matches this to accept. Pot = {Math.min(200, Math.max(10, Math.round(stake || 0))) * 2} coins.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="duel-start">Start date</Label>
                  <Input id="duel-start" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="duel-end">End date</Label>
                  <Input id="duel-end" type="date" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)} />
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
              <Button onClick={submit} disabled={submitting}>
                {submitting ? "Sending…" : <><Swords className="w-4 h-4 mr-1.5" /> Send duel</>}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
