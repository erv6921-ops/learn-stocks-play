import { Target, CheckCircle2, Coins } from "lucide-react"
import { useDailyMissions } from "@/hooks/useDailyMissions"
import { DIFFICULTY_META } from "@/lib/dailyMissions"

interface DailyMissionsProps {
  /** When true, awards missions but renders no UI (the hero banner shows them,
   *  so we avoid a duplicate list). This instance owns the awarding. */
  headless?: boolean
}

// Thin renderer over useDailyMissions. Missions, their rotation, progress, and
// coin awards all live in the hook / lib now, so this stays presentational.
export default function DailyMissions({ headless }: DailyMissionsProps) {
  const { missions, completedCount, total } = useDailyMissions({ award: true })

  if (headless) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-primary" />
          Daily missions
        </p>
        <span className="text-[11px] font-bold tabular-nums text-muted-foreground">
          {completedCount}/{total} done
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {missions.map((mission) => {
          const isDone = mission.done
          return (
            <div
              key={mission.id}
              className={`flex items-center gap-2.5 rounded-2xl px-3 py-2.5 transition-colors ${
                isDone ? "bg-success/[0.07]" : "bg-foreground/[0.03]"
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isDone ? "bg-success/15" : "bg-primary/10"
              }`}>
                {isDone
                  ? <CheckCircle2 className="w-4 h-4 text-success" />
                  : <mission.icon className="w-4 h-4 text-primary" />
                }
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <p className={`text-[13px] font-semibold leading-tight truncate ${isDone ? "line-through text-muted-foreground" : ""}`}>
                    {mission.blurb}
                  </p>
                  <span className="text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ color: DIFFICULTY_META[mission.difficulty].color, background: DIFFICULTY_META[mission.difficulty].bg }}>
                    {DIFFICULTY_META[mission.difficulty].label}
                  </span>
                </div>
                <span className="text-[11px] text-warning font-bold flex items-center gap-0.5 mt-0.5">
                  <Coins className="w-3 h-3" />{isDone ? "Earned" : `+${mission.reward}`}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
