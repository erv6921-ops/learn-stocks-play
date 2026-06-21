import React from "react"
import { Coins, Trophy, AlertCircle } from "lucide-react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { ClassChallenge } from "@/lib/challenges"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  challenge: ClassChallenge | null
  balance: number
  submitting?: boolean
  onConfirm: () => void
}

export default function EnterChallengeModal({ open, onOpenChange, challenge, balance, submitting, onConfirm }: Props) {
  if (!challenge) return null
  const fee = challenge.entry_fee
  const potAfter = challenge.pot + fee
  const canAfford = balance >= fee
  const shortBy = fee - balance

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold" /> Enter “{challenge.title}”
          </DialogTitle>
          <DialogDescription>{challenge.description}</DialogDescription>
        </DialogHeader>

        {canAfford ? (
          <div className="space-y-4 py-2">
            <div className="rounded-xl bg-muted/50 border border-border/60 p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Entry fee</span>
                <span className="font-bold text-gold flex items-center gap-1"><Coins className="w-4 h-4" /> {fee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pot if you join</span>
                <span className="font-bold text-gold flex items-center gap-1"><Coins className="w-4 h-4" /> {potAfter}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Your balance</span>
                <span className="font-semibold">{balance.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Spend <span className="font-semibold text-foreground">{fee} InvestiCoins</span> to enter. The winner takes the full pot of <span className="font-semibold text-foreground">{potAfter}</span> coins.
            </p>
          </div>
        ) : (
          <div className="py-2">
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm">
                You need <span className="font-bold">{shortBy} more InvestiCoins</span> to enter. Complete lessons to earn more.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={submitting}>Cancel</Button>
          <Button onClick={onConfirm} disabled={!canAfford || submitting}>
            {submitting ? "Entering…" : `Spend ${fee} & Enter`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
