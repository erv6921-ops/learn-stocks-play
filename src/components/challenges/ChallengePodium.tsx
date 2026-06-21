import React from "react"
import { motion } from "framer-motion"
import { Trophy, Coins, X } from "lucide-react"

export interface WinnerBanner {
  challengeId: string
  title: string
  name: string
  amount: number
  iWon: boolean
  tie?: boolean
}

interface Props {
  banners: WinnerBanner[]
  onDismiss: (challengeId: string) => void
}

export default function ChallengePodium({ banners, onDismiss }: Props) {
  if (banners.length === 0) return null
  return (
    <div className="space-y-3 mb-6">
      {banners.map(b => (
        <motion.div
          key={b.challengeId}
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/15 via-gold/10 to-transparent p-4 pr-10"
        >
          <button
            onClick={() => onDismiss(b.challengeId)}
            aria-label="Dismiss"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg text-muted-foreground hover:bg-muted/60 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-gold" />
            </div>
            <div className="min-w-0">
              <p className="font-bold leading-tight">
                {b.iWon ? "🏆 You won" : `🏆 ${b.name} won`} the “{b.title}” challenge{b.tie ? " (tie)" : ""}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                {b.iWon ? "You earned" : "They earned"}
                <span className="font-bold text-gold inline-flex items-center gap-0.5"><Coins className="w-3.5 h-3.5" /> {b.amount.toLocaleString()}</span>
                InvestiCoins!
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
