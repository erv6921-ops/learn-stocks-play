import { motion } from "framer-motion"
import { CheckCircle2, Coins, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedNumber from "@/components/AnimatedNumber"
import { JeffMascot } from "@/components/JeffMascot"
import Confetti from "@/components/Confetti"
import { useDailyMissions } from "@/hooks/useDailyMissions"
import { DIFFICULTY_META } from "@/lib/dailyMissions"

// Dedicated second step after the lesson stats: its own celebratory screen for
// the daily missions. Jeff reacts, the mission bars fill in one at a time,
// completed ones flip to a green check, and if all three are done the whole
// thing confettis. Owns the coin awarding (award:true, idempotent - see hook).
export function DailyMissionScreen({ onContinue }: { onContinue: () => void }) {
  const { missions, completedCount, total } = useDailyMissions({ award: true })
  const allDone = total > 0 && completedCount === total
  const coinsEarned = missions.filter((m) => m.done).reduce((s, m) => s + m.reward, 0)

  return (
    <div className="relative">
      {allDone && <Confetti pieces={120} />}

      {/* Jeff, above the card. */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 16 }}
        className="flex justify-center relative z-10 -mb-3"
      >
        <JeffMascot size="xl" mood={allDone ? "celebrating" : "excited"} />
      </motion.div>

      <Card variant="elevated" className="relative overflow-hidden">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-1">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold"
            >
              {allDone ? "All missions cleared! 🎉" : "Daily missions"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              <span className="font-bold text-foreground tabular-nums">{completedCount}</span> of{" "}
              <span className="font-bold text-foreground tabular-nums">{total}</span> complete today
            </motion.p>
          </div>

          {/* Segmented progress: one pill per mission. */}
          <div className="flex gap-1.5 justify-center">
            {missions.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                className={`h-2 w-16 rounded-full origin-left ${m.done ? "bg-success" : "bg-muted"}`}
              />
            ))}
          </div>

          {/* Mission rows - each slides in, its bar fills, done ones pop a check. */}
          <div className="space-y-3 text-left">
            {missions.map((m, i) => {
              const Icon = m.icon
              const diff = DIFFICULTY_META[m.difficulty]
              const base = 0.45 + i * 0.18
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: base }}
                  className={`flex items-center gap-3 rounded-2xl p-3 ${m.done ? "bg-success/[0.08]" : "bg-black/[0.03]"}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${m.done ? "bg-success/15" : "bg-primary/10"}`}>
                    {m.done ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: base + 0.35, type: "spring", stiffness: 420, damping: 13 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      </motion.span>
                    ) : (
                      <Icon className="w-5 h-5 text-primary" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <p className={`text-[14px] font-semibold leading-tight truncate ${m.done ? "text-muted-foreground line-through" : ""}`}>
                          {m.blurb}
                        </p>
                        <span
                          className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full shrink-0"
                          style={{ color: diff.color, background: diff.bg }}
                        >
                          {diff.label}
                        </span>
                      </div>
                      {m.done ? (
                        <span className="text-[12px] font-bold text-success flex items-center gap-0.5 shrink-0">
                          <Coins className="w-3.5 h-3.5" />+{m.reward}
                        </span>
                      ) : (
                        <span className="text-[12px] font-bold tabular-nums text-muted-foreground shrink-0">
                          {m.progress}/{m.target}
                        </span>
                      )}
                    </div>
                    <div className="h-2 rounded-full overflow-hidden bg-black/[0.07] mt-2">
                      <motion.div
                        className={`h-full rounded-full ${m.done ? "bg-success" : "bg-primary"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${m.ratio * 100}%` }}
                        transition={{ delay: base + 0.15, duration: 0.7, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Coins banked from missions today. */}
          {coinsEarned > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + missions.length * 0.18 + 0.2, type: "spring", stiffness: 300, damping: 16 }}
              className="inline-flex items-center gap-2 rounded-full bg-gold/10 border border-gold/20 px-5 py-2"
            >
              <Coins className="w-5 h-5 text-gold" />
              <span className="text-lg font-bold text-gold tabular-nums">
                +<AnimatedNumber value={coinsEarned} countUp /> from missions
              </span>
            </motion.div>
          )}

          <Button size="lg" className="w-full" onClick={onContinue}>
            Continue Learning <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
