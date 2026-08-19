import React from "react"
import { Coins, Clock, Swords, Trophy, Check, X, Hourglass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { metricMeta, timeRemaining, type ClassChallenge } from "@/lib/challenges"

interface Props {
  duel: ClassChallenge
  role: "challenger" | "opponent"
  oppName: string
  myScore: number | null
  oppScore: number | null
  busy?: boolean
  onAccept: (d: ClassChallenge) => void
  onDecline: (d: ClassChallenge) => void
  onCancel: (d: ClassChallenge) => void
}

// A player's score column in the head-to-head layout.
function Side({ name, score, unit, leading, isMe }: { name: string; score: number | null; unit: string; leading: boolean; isMe: boolean }) {
  return (
    <div className={`flex-1 rounded-xl p-3 text-center ${leading ? "bg-gold/10 ring-1 ring-gold/30" : "bg-muted/50"}`}>
      <p className="text-xs font-semibold truncate mb-1">{isMe ? "You" : name}</p>
      <p className="text-2xl font-bold tabular-nums leading-none">{score == null ? "-" : score.toLocaleString()}</p>
      <p className="text-[10px] text-muted-foreground mt-1">{unit}</p>
    </div>
  )
}

export default function DuelCard({ duel, role, oppName, myScore, oppScore, busy, onAccept, onDecline, onCancel }: Props) {
  const meta = metricMeta(duel.metric)
  const isPending = duel.status === "pending"
  const incomingInvite = isPending && role === "opponent"
  const sentInvite = isPending && role === "challenger"

  const my = myScore ?? 0
  const opp = oppScore ?? 0
  const myLeads = duel.status === "active" && my > opp
  const oppLeads = duel.status === "active" && opp > my

  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Swords className="w-5 h-5 shrink-0" />
            <h3 className="font-display font-bold text-base leading-tight truncate">Duel vs {oppName}</h3>
          </div>
          <Badge className="bg-primary-foreground/15 text-primary-foreground border-0 shrink-0">{meta.tracking}</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1">
        {incomingInvite ? (
          <div className="text-center py-2">
            <p className="text-sm"><span className="font-bold">{oppName}</span> challenged you to a duel!</p>
            <p className="text-xs text-muted-foreground mt-1">{meta.tracking} · ends {timeRemaining(duel.ends_at).toLowerCase()}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 bg-gold/10 text-gold px-3 py-1.5 rounded-xl text-sm font-bold border border-gold/15">
              <Coins className="w-4 h-4" /> Stake {duel.entry_fee} to accept · win {duel.entry_fee * 2}
            </div>
          </div>
        ) : sentInvite ? (
          <div className="text-center py-3">
            <Hourglass className="w-6 h-6 text-muted-foreground/60 mx-auto mb-2" />
            <p className="text-sm">Waiting for <span className="font-bold">{oppName}</span> to accept…</p>
            <p className="text-xs text-muted-foreground mt-1">You staked {duel.entry_fee} coins. Refunded if they decline.</p>
          </div>
        ) : (
          <>
            {/* Head to head */}
            <div className="flex items-stretch gap-2">
              <Side name="You" score={myScore} unit={meta.unit} leading={myLeads} isMe />
              <div className="flex flex-col items-center justify-center px-1">
                <span className="text-xs font-black text-muted-foreground">VS</span>
              </div>
              <Side name={oppName} score={oppScore} unit={meta.unit} leading={oppLeads} isMe={false} />
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" /> {duel.pot} pot</span>
              <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {timeRemaining(duel.ends_at)}</span>
            </div>
          </>
        )}
      </div>

      {/* Footer actions */}
      <div className="p-4 pt-0 space-y-2">
        {incomingInvite ? (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 press-scale" disabled={busy} onClick={() => onDecline(duel)}>
              <X className="w-4 h-4 mr-1" /> Decline
            </Button>
            <Button className="flex-1 press-scale" disabled={busy} onClick={() => onAccept(duel)}>
              <Check className="w-4 h-4 mr-1" /> Accept · {duel.entry_fee}
            </Button>
          </div>
        ) : sentInvite ? (
          <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive press-scale" disabled={busy} onClick={() => onCancel(duel)}>
            <X className="w-4 h-4 mr-1" /> Cancel & refund
          </Button>
        ) : (
          <div className="w-full h-9 rounded-lg bg-muted text-muted-foreground text-sm font-semibold flex items-center justify-center gap-1.5">
            <Trophy className="w-4 h-4 text-gold" /> Duel in progress
          </div>
        )}
      </div>
    </div>
  )
}
