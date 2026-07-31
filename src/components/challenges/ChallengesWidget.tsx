// Compact class-challenges card for the Dashboard's "Today" section.
//
// Replaces the dedicated Challenges nav tab: shows whichever class
// challenges are live right now (title, what's being tracked, pot, time
// left, whether you're in), plus a Create button. Tapping through goes to
// /challenges, which stays the full arena page; "?create=1" opens its
// create modal directly.

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"
import { metricMeta, timeRemaining, isExpired, type ClassChallenge } from "@/lib/challenges"
import { Swords, Plus, ChevronRight, Coins, Users } from "lucide-react"

export default function ChallengesWidget() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<ClassChallenge[]>([])
  const [enteredIds, setEnteredIds] = useState<Set<string>>(new Set())
  const [entryCounts, setEntryCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      if (!user?.id) { setLoading(false); return }
      // Classes I'm in (as student or teacher) → their live challenges.
      const [memRes, teachRes] = await Promise.all([
        supabase.from("class_members").select("class_id").eq("user_id", user.id),
        supabase.from("classes").select("id").eq("teacher_id", user.id),
      ])
      const classIds = [...new Set([
        ...(memRes.data ?? []).map(r => r.class_id),
        ...(teachRes.data ?? []).map(r => r.id),
      ])].filter(Boolean) as string[]
      if (classIds.length === 0) { if (!cancelled) setLoading(false); return }

      const { data: chData } = await supabase
        .from("class_challenges").select("*").in("class_id", classIds)
        .eq("status", "active")
      const live = ((chData ?? []) as ClassChallenge[]).filter(ch => !isExpired(ch.ends_at))

      if (live.length > 0) {
        const { data: enData } = await supabase
          .from("challenge_entries").select("challenge_id, user_id")
          .in("challenge_id", live.map(c => c.id))
        const counts: Record<string, number> = {}
        const mine = new Set<string>()
        for (const e of enData ?? []) {
          counts[e.challenge_id as string] = (counts[e.challenge_id as string] ?? 0) + 1
          if (e.user_id === user.id) mine.add(e.challenge_id as string)
        }
        if (!cancelled) { setEntryCounts(counts); setEnteredIds(mine) }
      }
      if (!cancelled) { setActive(live); setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [user?.id])

  return (
    <Card className="border-0 overflow-hidden" style={{ background: "linear-gradient(135deg,hsl(var(--primary)),#06291f)" }}>
      <CardContent className="p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(43,182,115,0.18)" }}>
              <Swords className="w-5 h-5 text-success" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-base md:text-lg font-extrabold text-white">Class Challenges</p>
              <p className="text-sm text-white/70 truncate">
                {loading
                  ? "Checking for live challenges…"
                  : active.length > 0
                    ? `${active.length} challenge${active.length === 1 ? "" : "s"} live - winner takes the pot`
                    : "Nothing running - start one and challenge your class!"}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="press-scale gap-1.5 shrink-0"
            onClick={() => navigate("/challenges?create=1")}
          >
            <Plus className="w-4 h-4" /> Create
          </Button>
        </div>

        {active.length > 0 && (
          <div className="mt-3 space-y-2">
            {active.slice(0, 3).map(ch => (
              <Link
                key={ch.id}
                to="/challenges"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors bg-white/5 hover:bg-white/10 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white truncate">{ch.title}</span>
                    {enteredIds.has(ch.id) ? (
                      <Badge className="bg-success/20 text-success border border-success/30 text-[10px] shrink-0">You're in</Badge>
                    ) : (
                      <Badge className="bg-white/10 text-white/80 border-0 text-[10px] shrink-0">Join for {ch.entry_fee} 🪙</Badge>
                    )}
                  </div>
                  <p className="text-xs text-white/60 truncate">
                    {metricMeta(ch.metric).tracking} · {timeRemaining(ch.ends_at)}
                  </p>
                </div>
                <span className="hidden sm:flex items-center gap-1 text-xs font-bold text-gold shrink-0">
                  <Coins className="w-3.5 h-3.5" /> {ch.pot.toLocaleString()} pot
                </span>
                <span className="hidden sm:flex items-center gap-1 text-xs text-white/50 shrink-0">
                  <Users className="w-3.5 h-3.5" /> {entryCounts[ch.id] ?? 0}
                </span>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:translate-x-0.5 group-hover:text-white/70 transition-all shrink-0" />
              </Link>
            ))}
            {active.length > 3 && (
              <Link to="/challenges" className="block text-center text-xs font-bold text-white/60 hover:text-white pt-1">
                View all {active.length} challenges →
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
