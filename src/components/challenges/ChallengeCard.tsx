import React from "react"
import { Coins, Clock, Users, Trophy, Check, Target, Crown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { metricMeta, timeRemaining, type ClassChallenge, type RankedEntry } from "@/lib/challenges"

interface Props {
  challenge: ClassChallenge
  entries: RankedEntry[]   // already sorted desc by score
  entered: boolean
  canManage: boolean       // teacher, or the challenge's creator
  onEnter: (challenge: ClassChallenge) => void
  onCancel: (challenge: ClassChallenge) => void
}

export default function ChallengeCard({ challenge, entries, entered, canManage, onEnter, onCancel }: Props) {
  const meta = metricMeta(challenge.metric)
  const top5 = entries.slice(0, 5)

  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden flex flex-col">
      {/* Dark header */}
      <div className="bg-primary text-primary-foreground p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-bold text-lg leading-tight">{challenge.title}</h3>
          <Badge className="bg-primary-foreground/15 text-primary-foreground border-0 shrink-0 gap-1">
            <Target className="w-3 h-3" /> {meta.tracking}
          </Badge>
        </div>
        <p className="text-sm text-primary-foreground/80 mt-1.5">{challenge.description}</p>
      </div>

      {/* Pot / time / entrants */}
      <div className="p-5 grid grid-cols-3 gap-2 border-b border-border/60">
        <div className="text-center">
          <div className="text-2xl font-bold text-gold flex items-center justify-center gap-1 leading-none">
            <Coins className="w-5 h-5" /> {challenge.pot}
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">pot</div>
        </div>
        <div className="text-center border-x border-border/60">
          <div className="text-sm font-semibold flex items-center justify-center gap-1 leading-none mt-1">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div className="text-[11px] text-muted-foreground mt-1.5 px-1">{timeRemaining(challenge.ends_at)}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold flex items-center justify-center gap-1 leading-none">
            <Users className="w-5 h-5 text-primary" /> {entries.length}
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">entered</div>
        </div>
      </div>

      {/* Live standings */}
      <div className="p-5 flex-1">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2.5">
          <Trophy className="w-3.5 h-3.5 text-gold" /> Standings
        </div>
        {top5.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">No one's entered yet — be the first!</p>
        ) : (
          <div className="space-y-1.5">
            {top5.map((e, i) => (
              <div key={e.userId} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg ${e.isMe ? "bg-primary/10" : ""}`}>
                <span className={`w-5 text-center text-sm font-bold ${i === 0 ? "text-gold" : "text-muted-foreground"}`}>
                  {i === 0 ? <Crown className="w-4 h-4 text-gold inline" /> : i + 1}
                </span>
                <span className="flex-1 text-sm font-medium truncate">{e.isMe ? "You" : e.name}</span>
                <span className="text-sm font-bold tabular-nums">{e.score.toLocaleString()}<span className="text-[11px] text-muted-foreground ml-1">{meta.unit}</span></span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer action */}
      <div className="p-4 pt-0 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span className="flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" /> {challenge.entry_fee} to enter</span>
          {challenge.teacher_bonus > 0 && <span>+{challenge.teacher_bonus} bonus from teacher</span>}
        </div>
        {entered ? (
          <div className="w-full h-9 rounded-lg bg-muted text-muted-foreground text-sm font-semibold flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" /> You're in
          </div>
        ) : (
          <Button className="w-full press-scale" onClick={() => onEnter(challenge)}>
            Enter Challenge · {challenge.entry_fee} <Coins className="w-4 h-4 ml-1" />
          </Button>
        )}
        {canManage && (
          <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive press-scale" onClick={() => onCancel(challenge)}>
            <X className="w-4 h-4 mr-1" /> Cancel & refund
          </Button>
        )}
      </div>
    </div>
  )
}
