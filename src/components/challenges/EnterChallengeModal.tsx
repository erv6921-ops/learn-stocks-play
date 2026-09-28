import React from "react"
import { useTranslation, Trans } from "react-i18next"
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
  const { t } = useTranslation()
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
            <Trophy className="w-5 h-5 text-gold" /> {t("challenges.enterModal.title", { title: challenge.title })}
          </DialogTitle>
          <DialogDescription>{challenge.description}</DialogDescription>
        </DialogHeader>

        {canAfford ? (
          <div className="space-y-4 py-2">
            <div className="rounded-xl bg-muted/50 border border-border/60 p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("challenges.enterModal.entryFee")}</span>
                <span className="font-bold text-gold flex items-center gap-1"><Coins className="w-4 h-4" /> {fee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("challenges.enterModal.potIfYouJoin")}</span>
                <span className="font-bold text-gold flex items-center gap-1"><Coins className="w-4 h-4" /> {potAfter}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("challenges.enterModal.yourBalance")}</span>
                <span className="font-semibold">{balance.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <Trans
                i18nKey="challenges.enterModal.spendSummary"
                values={{ fee, potAfter }}
                components={{ b: <span className="font-semibold text-foreground" /> }}
              />
            </p>
          </div>
        ) : (
          <div className="py-2">
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm">
                <Trans
                  i18nKey="challenges.enterModal.needMore"
                  values={{ shortBy }}
                  components={{ b: <span className="font-bold" /> }}
                />
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={submitting}>{t("challenges.cancel")}</Button>
          <Button onClick={onConfirm} disabled={!canAfford || submitting}>
            {submitting ? t("challenges.enterModal.entering") : t("challenges.enterModal.spendAndEnter", { fee })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
