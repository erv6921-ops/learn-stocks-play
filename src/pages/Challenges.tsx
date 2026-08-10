import React, { useCallback, useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Trophy, Plus, Coins, Users, Sparkles, Swords } from "lucide-react"
import GameNav from "@/components/GameNav"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/AppContext"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/integrations/supabase/client"
import { lessons } from "@/data/lessons"
import { getStreak } from "@/lib/playerStats"
import {
  computeMyScore, isExpired, type ChallengeMetric, type ClassChallenge,
  type ChallengeEntry, type RankedEntry,
} from "@/lib/challenges"
import ChallengeCard from "@/components/challenges/ChallengeCard"
import EnterChallengeModal from "@/components/challenges/EnterChallengeModal"
import CreateChallengeModal, { type NewChallengePayload } from "@/components/challenges/CreateChallengeModal"
import ChallengePartnerModal, { type NewDuelPayload, type PartnerOption } from "@/components/challenges/ChallengePartnerModal"
import DuelCard from "@/components/challenges/DuelCard"
import ChallengePodium, { type WinnerBanner } from "@/components/challenges/ChallengePodium"
import { toast } from "sonner"
import { anchor } from "@/lib/tourAnchors"

// localStorage idempotency flags so client-side payouts/refunds happen once.
const flag = (kind: string, id: string) => `ip_ch_${kind}_${id}`
const hasFlag = (kind: string, id: string) => { try { return localStorage.getItem(flag(kind, id)) === "1" } catch { return false } }
const setFlag = (kind: string, id: string) => { try { localStorage.setItem(flag(kind, id), "1") } catch { /* ignore */ } }

export default function Challenges() {
  const { user, jeffsBalance, spendJeffs, awardJeffs, lessonProgress, jeffsHistory } = useApp()
  const { isTeacher } = useAuth()

  const [loading, setLoading] = useState(true)
  const [hasClass, setHasClass] = useState(true)
  const [myClassIds, setMyClassIds] = useState<string[]>([])
  const [challenges, setChallenges] = useState<ClassChallenge[]>([])
  const [entriesByChallenge, setEntriesByChallenge] = useState<Record<string, RankedEntry[]>>({})
  const [enteredIds, setEnteredIds] = useState<Set<string>>(new Set())
  const [banners, setBanners] = useState<WinnerBanner[]>([])

  const [enterTarget, setEnterTarget] = useState<ClassChallenge | null>(null)
  const [enterOpen, setEnterOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  // Partner duels (1v1).
  const [partners, setPartners] = useState<PartnerOption[]>([])
  const [duelOpen, setDuelOpen] = useState(false)
  const [creatingDuel, setCreatingDuel] = useState(false)
  const [duelBusyId, setDuelBusyId] = useState<string | null>(null)
  const partnerNameOf = (id: string | null) => partners.find(p => p.user_id === id)?.name ?? "Partner"

  // Latest context values without churning the reload callback identity.
  const ctx = useRef({ user, lessonProgress, jeffsHistory, awardJeffs })
  ctx.current = { user, lessonProgress, jeffsHistory, awardJeffs }

  const reload = useCallback(async () => {
    const { user, lessonProgress, jeffsHistory, awardJeffs } = ctx.current
    if (!user?.id) { setLoading(false); return }
    const myId = user.id
    try {

    // 1. Classes the user belongs to (enrolled student) or owns (teacher).
    const [memRes, teachRes] = await Promise.all([
      supabase.from("class_members").select("class_id").eq("user_id", myId),
      supabase.from("classes").select("id").eq("teacher_id", myId),
    ])
    const classIds = [...new Set([
      ...(memRes.data ?? []).map(m => m.class_id).filter(Boolean) as string[],
      ...(teachRes.data ?? []).map(c => c.id),
    ])]
    setMyClassIds(classIds)
    setHasClass(classIds.length > 0)

    // 2. Names for standings (classmate profiles aren't directly readable).
    const nameMap = new Map<string, string>()
    for (const cid of classIds) {
      const { data: lb } = await supabase.rpc("get_class_leaderboard", { _class_id: cid })
      for (const r of (lb ?? [])) {
        const name = `${r.first_name || ""} ${(r.last_name || "").charAt(0)}`.trim()
        nameMap.set(r.user_id, name || "Student")
      }
    }

    // 2b. Partners power the duel picker and supply names for cross-class duels.
    const { data: pData } = await (supabase as any).rpc("get_partners")
    const partnerOpts: PartnerOption[] = (pData ?? []).map((p: { user_id: string; first_name: string | null; last_name: string | null }) => ({
      user_id: p.user_id,
      name: `${p.first_name || ""} ${(p.last_name || "").charAt(0)}`.trim() || "Partner",
    }))
    setPartners(partnerOpts)
    for (const p of partnerOpts) nameMap.set(p.user_id, p.name)

    // 3. Challenges + entries: class challenges (if any) plus my 1v1 duels.
    let list: ClassChallenge[] = []
    if (classIds.length) {
      const { data: chData } = await supabase
        .from("class_challenges").select("*").in("class_id", classIds)
        .order("created_at", { ascending: false })
      list = (chData ?? []) as ClassChallenge[]
    }
    const { data: duelData } = await supabase
      .from("class_challenges").select("*")
      .or(`created_by.eq.${myId},opponent_user_id.eq.${myId}`)
      .not("opponent_user_id", "is", null)
      .order("created_at", { ascending: false })
    const seen = new Set(list.map(c => c.id))
    for (const d of (duelData ?? []) as ClassChallenge[]) if (!seen.has(d.id)) list.push(d)

    const challengeIds = list.map(c => c.id)
    let entries: ChallengeEntry[] = []
    if (challengeIds.length) {
      const { data: enData } = await supabase.from("challenge_entries").select("*").in("challenge_id", challengeIds)
      entries = (enData ?? []) as ChallengeEntry[]
    }

    // 4. Recompute my score for active challenges I'm entered in.
    const streak = getStreak(jeffsHistory)
    for (const ch of list) {
      if (ch.status !== "active") continue
      const mine = entries.find(e => e.challenge_id === ch.id && e.user_id === myId)
      if (!mine) continue
      const score = computeMyScore(ch.metric as ChallengeMetric, {
        lessonProgress, lessons, startsAt: new Date(ch.starts_at), endsAt: new Date(ch.ends_at), streak,
      })
      if (score !== mine.score) {
        mine.score = score
        await supabase.from("challenge_entries").update({ score }).eq("challenge_id", ch.id).eq("user_id", myId)
      }
    }

    // 5. Resolve expired challenges → mark completed and record the winner.
    for (const ch of list) {
      if (ch.status !== "active" || !isExpired(ch.ends_at)) continue
      const chEntries = entries.filter(e => e.challenge_id === ch.id)
      if (chEntries.length === 0) {
        await supabase.from("class_challenges").update({ status: "completed" }).eq("id", ch.id)
        ch.status = "completed"
        continue
      }
      const max = Math.max(...chEntries.map(e => e.score))
      const winnerId = chEntries.filter(e => e.score === max)[0].user_id as string
      await supabase.from("class_challenges").update({ status: "completed", winner_user_id: winnerId }).eq("id", ch.id)
      ch.status = "completed"; ch.winner_user_id = winnerId
    }

    // 5a. A duel invite that expired before the partner accepted → cancel it so
    // the challenger's stake is refunded by the cancellation path below.
    for (const ch of list) {
      if (ch.opponent_user_id && ch.status === "pending" && isExpired(ch.ends_at)) {
        await supabase.from("class_challenges").update({ status: "cancelled" }).eq("id", ch.id)
        ch.status = "cancelled"
      }
    }

    // 5b. Pay myself the pot for any completed challenge I won (once). Runs
    // independently of who closed the challenge, so the winner always gets paid
    // when they next open the page, even if a classmate triggered the close.
    for (const ch of list) {
      if (ch.status !== "completed" || hasFlag("award", ch.id)) continue
      const chEntries = entries.filter(e => e.challenge_id === ch.id)
      if (chEntries.length === 0) continue
      const max = Math.max(...chEntries.map(e => e.score))
      const winners = chEntries.filter(e => e.score === max)
      if (!winners.some(w => w.user_id === myId)) continue
      const share = Math.floor(ch.pot / winners.length)
      if (share > 0) awardJeffs(share, `Won challenge: ${ch.title}`)
      setFlag("award", ch.id)
    }

    // 6. Self-service refund for challenges I entered that got cancelled.
    for (const ch of list) {
      if (ch.status !== "cancelled") continue
      const mine = entries.find(e => e.challenge_id === ch.id && e.user_id === myId)
      if (mine && !hasFlag("refund", ch.id)) {
        awardJeffs(mine.coins_contributed, `Challenge refund: ${ch.title}`)
        setFlag("refund", ch.id)
        await supabase.from("challenge_entries").delete().eq("challenge_id", ch.id).eq("user_id", myId)
        entries = entries.filter(e => !(e.challenge_id === ch.id && e.user_id === myId))
      }
    }

    // 7. Shape view state.
    const byChallenge: Record<string, RankedEntry[]> = {}
    for (const ch of list) {
      byChallenge[ch.id] = entries
        .filter(e => e.challenge_id === ch.id)
        .map(e => ({ userId: e.user_id as string, name: nameMap.get(e.user_id as string) ?? "Student", score: e.score, isMe: e.user_id === myId }))
        .sort((a, b) => b.score - a.score)
    }
    const entered = new Set(entries.filter(e => e.user_id === myId).map(e => e.challenge_id as string))
    const newBanners: WinnerBanner[] = list
      .filter(ch => ch.status === "completed" && ch.winner_user_id && !hasFlag("dismiss", ch.id))
      .map(ch => {
        const chEntries = entries.filter(e => e.challenge_id === ch.id)
        const max = chEntries.length ? Math.max(...chEntries.map(e => e.score)) : 0
        const winners = chEntries.filter(e => e.score === max)
        return {
          challengeId: ch.id, title: ch.title,
          name: nameMap.get(ch.winner_user_id as string) ?? "A classmate",
          amount: winners.length ? Math.floor(ch.pot / winners.length) : ch.pot,
          iWon: ch.winner_user_id === myId || winners.some(w => w.user_id === myId),
          tie: winners.length > 1,
        }
      })

    setChallenges(list)
    setEntriesByChallenge(byChallenge)
    setEnteredIds(entered)
    setBanners(newBanners)
    } catch (err) {
      console.error("[challenges] failed to load", err)
      toast.error("Couldn't load challenges. Please refresh.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { reload() }, [reload, user?.id, lessonProgress])
  useEffect(() => {
    const refresh = () => { if (!document.hidden) reload() }
    window.addEventListener("focus", refresh)
    return () => window.removeEventListener("focus", refresh)
  }, [reload])

  // Deep link from the dashboard widget: /challenges?create=1 opens the
  // create modal straight away (param consumed so refresh doesn't re-open).
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    if (searchParams.get("create") === "1") {
      setCreateOpen(true)
      searchParams.delete("create")
      setSearchParams(searchParams, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const confirmEnter = async () => {
    const ch = enterTarget
    if (!ch || !user?.id) return
    if (jeffsBalance < ch.entry_fee) { toast.error("Not enough InvestiCoins."); return }
    setSubmitting(true)
    const { error: insErr } = await supabase.from("challenge_entries")
      .insert({ challenge_id: ch.id, user_id: user.id, coins_contributed: ch.entry_fee, score: 0 })
    if (insErr) {
      setSubmitting(false)
      toast.error(insErr.code === "23505" ? "You're already in this challenge." : "Couldn't enter. Try again.")
      return
    }
    spendJeffs(ch.entry_fee, `Entered challenge: ${ch.title}`)
    await supabase.from("class_challenges").update({ pot: ch.pot + ch.entry_fee }).eq("id", ch.id)
    setSubmitting(false)
    setEnterOpen(false)
    toast.success("You're in! Good luck 🏆")
    reload()
  }

  const handleCreate = async (payload: NewChallengePayload) => {
    if (!user?.id) return
    const classId = myClassIds[0]
    if (!classId) { toast.error("No class found to post to."); return }
    setCreating(true)
    const bonus = isTeacher ? payload.teacher_bonus : 0
    const { error } = await supabase.from("class_challenges").insert({
      class_id: classId, created_by: user.id, created_by_role: isTeacher ? "teacher" : "student",
      title: payload.title, description: payload.description, metric: payload.metric,
      entry_fee: payload.entry_fee, teacher_bonus: bonus,
      pot: bonus > 0 ? bonus : 0,
      starts_at: payload.starts_at, ends_at: payload.ends_at, status: "active",
    })
    setCreating(false)
    if (error) {
      console.error("[challenges] create failed", error)
      toast.error(`Couldn't create challenge: ${error.message}`)
      return
    }
    setCreateOpen(false)
    toast.success("Challenge created! Students can now enter.")
    reload()
  }

  // Create a 1v1 duel: post it as pending and stake the challenger's coins now.
  const handleCreateDuel = async (payload: NewDuelPayload) => {
    if (!user?.id) return
    if (jeffsBalance < payload.entry_fee) { toast.error("Not enough InvestiCoins."); return }
    setCreatingDuel(true)
    const { data, error } = await supabase.from("class_challenges").insert({
      class_id: null, created_by: user.id, created_by_role: isTeacher ? "teacher" : "student",
      opponent_user_id: payload.opponent_user_id,
      title: payload.title, description: payload.description, metric: payload.metric,
      entry_fee: payload.entry_fee, teacher_bonus: 0, pot: 0,
      starts_at: payload.starts_at, ends_at: payload.ends_at, status: "pending",
    }).select("id").single()
    if (error || !data) {
      setCreatingDuel(false)
      console.error("[duel] create failed", error)
      toast.error("Couldn't send the duel. Try again.")
      return
    }
    // Stake the challenger's coins immediately (refunded if declined or expired).
    const { error: entryErr } = await supabase.from("challenge_entries")
      .insert({ challenge_id: data.id, user_id: user.id, coins_contributed: payload.entry_fee, score: 0 })
    if (entryErr) {
      await supabase.from("class_challenges").delete().eq("id", data.id)
      setCreatingDuel(false)
      toast.error("Couldn't send the duel. Try again.")
      return
    }
    spendJeffs(payload.entry_fee, `Duel stake: ${payload.title}`)
    await supabase.from("class_challenges").update({ pot: payload.entry_fee }).eq("id", data.id)
    setCreatingDuel(false)
    setDuelOpen(false)
    toast.success(`Duel sent to ${payload.opponent_name}! ⚔️`)
    reload()
  }

  // Opponent accepts a duel invite: match the stake and flip it to active.
  const acceptDuel = async (duel: ClassChallenge) => {
    if (!user?.id) return
    if (jeffsBalance < duel.entry_fee) { toast.error("Not enough InvestiCoins."); return }
    setDuelBusyId(duel.id)
    const { error: insErr } = await supabase.from("challenge_entries")
      .insert({ challenge_id: duel.id, user_id: user.id, coins_contributed: duel.entry_fee, score: 0 })
    if (insErr) {
      setDuelBusyId(null)
      toast.error(insErr.code === "23505" ? "You already joined this duel." : "Couldn't accept. Try again.")
      return
    }
    spendJeffs(duel.entry_fee, `Duel stake: ${duel.title}`)
    await supabase.from("class_challenges").update({ pot: duel.pot + duel.entry_fee, status: "active" }).eq("id", duel.id)
    setDuelBusyId(null)
    toast.success("Duel on! Good luck 🏆")
    reload()
  }

  // Opponent declines: cancel the duel so the challenger is refunded on load.
  const declineDuel = async (duel: ClassChallenge) => {
    setDuelBusyId(duel.id)
    const { error } = await supabase.from("class_challenges").update({ status: "cancelled" }).eq("id", duel.id)
    setDuelBusyId(null)
    if (error) { toast.error("Couldn't decline the duel."); return }
    toast("Duel declined.")
    reload()
  }

  const handleCancel = async (ch: ClassChallenge) => {
    const { error } = await supabase.from("class_challenges").update({ status: "cancelled" }).eq("id", ch.id)
    if (error) { toast.error("Couldn't cancel the challenge."); return }
    toast.success("Challenge cancelled. Entry fees will be refunded.")
    reload()
  }

  const dismissBanner = (id: string) => {
    setFlag("dismiss", id)
    setBanners(prev => prev.filter(b => b.challengeId !== id))
  }

  const activeChallenges = challenges.filter(c => c.status === "active" && !c.opponent_user_id)

  // Duels I'm part of that are live or awaiting a response. Incoming invites
  // (I'm the opponent and it's still pending) surface first.
  const myDuels = challenges.filter(c => c.opponent_user_id && (c.status === "active" || c.status === "pending"))
  const duelInvites = myDuels.filter(c => c.status === "pending" && c.opponent_user_id === user?.id)
  const orderedDuels = [...duelInvites, ...myDuels.filter(c => !duelInvites.includes(c))]

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-2">
              <Trophy className="w-7 h-7 text-gold" /> Class Challenges
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Spend InvestiCoins to compete. Winner takes the pot.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-gold/10 text-gold px-3 py-1.5 rounded-xl text-sm font-bold border border-gold/15">
              <Coins className="w-4 h-4" /> {Math.floor(jeffsBalance).toLocaleString()}
            </span>
            <Button variant="secondary" className="press-scale" onClick={() => setDuelOpen(true)}>
              <Swords className="w-4 h-4 mr-1" /> Challenge a partner
            </Button>
            {hasClass && (
              <Button className="press-scale" onClick={() => setCreateOpen(true)}>
                <Plus className="w-4 h-4 mr-1" /> Create Challenge
              </Button>
            )}
          </div>
        </motion.div>

        {banners.length > 0 && <ChallengePodium banners={banners} onDismiss={dismissBanner} />}

        {/* Partner duels (1v1) — shown regardless of class membership. */}
        {!loading && orderedDuels.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-display font-bold flex items-center gap-2 mb-4">
              <Swords className="w-5 h-5 text-primary" /> Partner Duels
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {orderedDuels.map(ch => {
                const role = ch.created_by === user?.id ? "challenger" : "opponent"
                const oppId = role === "challenger" ? ch.opponent_user_id : ch.created_by
                const es = entriesByChallenge[ch.id] ?? []
                const mine = es.find(e => e.isMe)
                const theirs = es.find(e => !e.isMe)
                return (
                  <DuelCard
                    key={ch.id}
                    duel={ch}
                    role={role}
                    oppName={partnerNameOf(oppId)}
                    myScore={mine ? mine.score : null}
                    oppScore={theirs ? theirs.score : null}
                    busy={duelBusyId === ch.id}
                    onAccept={acceptDuel}
                    onDecline={declineDuel}
                    onCancel={handleCancel}
                  />
                )
              })}
            </div>
          </section>
        )}

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading challenges…</div>
        ) : !hasClass ? (
          <div className="text-center py-16 rounded-2xl border border-border/60 bg-card">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <p className="font-semibold">Join a class to participate in challenges</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Ask your teacher for a class code.</p>
            <Link to="/leaderboard"><Button variant="secondary">Enter a class code</Button></Link>
          </div>
        ) : activeChallenges.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-border/60 bg-card">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-7 h-7 text-gold" />
            </div>
            <p className="font-semibold">No active challenges right now</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              {isTeacher ? "Create one to get your class competing!" : "Start one and challenge your class!"}
            </p>
            <Button ref={anchor("challenge-enter")} onClick={() => setCreateOpen(true)}><Plus className="w-4 h-4 mr-1" /> Create Challenge</Button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2" ref={anchor("challenge-enter")}>
            {activeChallenges.map(ch => (
              <ChallengeCard
                key={ch.id}
                challenge={ch}
                entries={entriesByChallenge[ch.id] ?? []}
                entered={enteredIds.has(ch.id)}
                canManage={isTeacher || ch.created_by === user?.id}
                onEnter={(c) => { setEnterTarget(c); setEnterOpen(true) }}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </main>

      <EnterChallengeModal
        open={enterOpen}
        onOpenChange={setEnterOpen}
        challenge={enterTarget}
        balance={jeffsBalance}
        submitting={submitting}
        onConfirm={confirmEnter}
      />
      <CreateChallengeModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        submitting={creating}
        isTeacher={isTeacher}
        onCreate={handleCreate}
      />
      <ChallengePartnerModal
        open={duelOpen}
        onOpenChange={setDuelOpen}
        submitting={creatingDuel}
        partners={partners}
        balance={jeffsBalance}
        onCreate={handleCreateDuel}
      />
    </div>
  )
}
