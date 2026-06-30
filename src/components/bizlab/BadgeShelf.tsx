import React from "react"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import { BIZ_BADGES } from "@/data/bizLab"
import { bizIcon } from "./icons"

/**
 * Milestone badges. Earned badges glow gold; locked ones are greyed with a
 * lock overlay and a hint of how to unlock them.
 */
export default function BadgeShelf({ earned }: { earned: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {BIZ_BADGES.map((b, i) => {
        const got = earned.includes(b.id)
        const Icon = bizIcon(b.icon)
        return (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`relative rounded-2xl border p-3 text-center ${
              got
                ? "border-gold/40 bg-gold/10 shadow-sm"
                : "border-border/50 bg-muted/30"
            }`}
            title={b.description}
          >
            <div
              className={`mx-auto w-11 h-11 rounded-xl flex items-center justify-center mb-2 ${
                got ? "bg-gold/20 text-gold" : "bg-muted text-muted-foreground/50"
              }`}
            >
              {got ? <Icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
            </div>
            <p className={`text-xs font-bold leading-tight ${got ? "" : "text-muted-foreground"}`}>
              {b.name}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1 leading-snug line-clamp-2">
              {b.description}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}
