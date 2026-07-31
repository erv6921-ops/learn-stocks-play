import React, { useState, useMemo, useEffect, useCallback, useRef } from "react"
import { Link } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { useNetWorth } from "@/hooks/useNetWorth"
import { supabase } from "@/integrations/supabase/client"
import GameNav from "@/components/GameNav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import {
  Trophy, Coins, Star, Flame, Crown, Medal, Users, UserPlus, Copy, Link2,
  TrendingUp, ChevronUp, Gem, Sparkles, Rocket, BookOpen, CalendarCheck, Target, Zap,
} from "lucide-react"
import { anchor } from "@/lib/tourAnchors"
// League ladder + levels are shared with the Partners directory (see lib/leagues).
import { LEAGUES, getLeagueIdx, getLevel } from "@/lib/leagues"

// Demo data - only shown when user explicitly toggles "Show Demo Data"
const DEMO_NATIONAL = [
  { name: "Alex M.", netWorth: 87500, level: 7, streak: 45 },
  { name: "Jordan L.", netWorth: 72300, level: 6, streak: 32 },
  { name: "Sam K.", netWorth: 65100, level: 6, streak: 28 },
  { name: "Casey T.", netWorth: 51200, level: 5, streak: 21 },
  { name: "Riley J.", netWorth: 48900, level: 5, streak: 19 },
  { name: "Morgan P.", netWorth: 41000, level: 4, streak: 15 },
  { name: "Taylor R.", netWorth: 35600, level: 4, streak: 12 },
  { name: "Jamie B.", netWorth: 28400, level: 3, streak: 10 },
  { name: "Quinn S.", netWorth: 21500, level: 3, streak: 8 },
  { name: "Drew W.", netWorth: 15200, level: 2, streak: 5 },
]

type Scope = "class" | "friends" | "national"

interface Entry {
  name: string
  score: number
  scoreLabel: string
  level: number
  streak: number
  isMe: boolean
}

// Actionable ways to climb - all link to real features, so the motivation is legit.
const EARN_ACTIONS = [
  { icon: BookOpen,      label: "Finish a lesson",     detail: "Biggest, steadiest coins", to: "/lessons",  tint: "var(--brand)" },
  { icon: CalendarCheck, label: "Daily missions",      detail: "Fresh coins every day",    to: "/daily",    tint: "#E3A008" },
  { icon: Flame,         label: "Keep your streak",    detail: "Don't break the chain", to: "/lessons",  tint: "#F97316" },
  { icon: Target,        label: "Ace a unit test",     detail: "Big coins for mastery",    to: "/progress", tint: "#8B5CF6" },
]

export default function Leaderboard() {
  const { jeffsBalance, jeffsHistory, lessonProgress } = useApp()
  const { netWorth: myNetWorth, portfolioValue } = useNetWorth()
  const { toast } = useToast()
  const [scope, setScope] = useState<Scope>("class")
  const [showDemo, setShowDemo] = useState(false)
  const [joinCode, setJoinCode] = useState("")
  const [joiningClass, setJoiningClass] = useState(false)
  const [myClasses, setMyClasses] = useState<{ id: string; name: string; joinCode: string }[]>([])
  const [classMembers, setClassMembers] = useState<{ name: string; userId: string; xp: number }[]>([])
  // Accepted partners from the Partners directory - powers the Friends tab.
  const [friendRows, setFriendRows] = useState<{ name: string; xp: number }[]>([])
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
  // Mirror of selectedClassId read inside loadMyClasses so that callback can stay
  // stable - depending on the state directly made it re-create itself every time
  // it set the selection, which re-fired the load effect and double-fetched.
  const selectedClassIdRef = useRef<string | null>(null)
  const [loadingClasses, setLoadingClasses] = useState(true)

  // Everyone's score is their CURRENT InvestiCoins balance - the same number
  // as the coin counter, so the leaderboard always matches what students see.
  const totalXp = jeffsBalance

  // Fetch one class's member rows (each member's live InvestiCoins via the RPC).
  const loadClassMembers = useCallback(async (classId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: lb } = await supabase.rpc("get_class_leaderboard", { _class_id: classId })
    if (lb) {
      setClassMembers(lb
        .filter(r => r.user_id !== user.id)
        .map(r => ({
          name: `${r.first_name || ''} ${(r.last_name || '').charAt(0)}.`.trim() || 'Student',
          userId: r.user_id,
          xp: Number(r.xp) || 0,
        })))
    }
  }, [])

  const loadMyClasses = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoadingClasses(false); return }

      const { data: memberships } = await supabase
        .from("class_members")
        .select("class_id")
        .eq("user_id", user.id)

      if (memberships && memberships.length > 0) {
        const classIds = memberships.map(m => m.class_id)
        const { data: classes } = await supabase
          .from("classes")
          .select("id, name, join_code")
          .in("id", classIds)

        if (classes && classes.length > 0) {
          setMyClasses(classes.map(c => ({ id: c.id, name: c.name, joinCode: c.join_code })))

          const current = selectedClassIdRef.current
          const activeId = (current && classes.some(c => c.id === current)) ? current : classes[0].id
          if (activeId !== selectedClassIdRef.current) {
            selectedClassIdRef.current = activeId
            setSelectedClassId(activeId)
          }
          await loadClassMembers(activeId)
        }
      }
    } catch (err) {
      console.error("Error loading classes:", err)
    } finally {
      setLoadingClasses(false)
    }
  }, [loadClassMembers])

  // Switch the active class from the tabs (updates ref, state, and its members).
  const switchClass = useCallback((id: string) => {
    selectedClassIdRef.current = id
    setSelectedClassId(id)
    loadClassMembers(id)
  }, [loadClassMembers])

  useEffect(() => {
    loadMyClasses()
  }, [lessonProgress, loadMyClasses])

  // Friends tab = accepted partners (get_partners returns their live
  // InvestiCoins balance in the xp field).
  const loadFriends = useCallback(async () => {
    const { data, error } = await (supabase as any).rpc("get_partners")
    if (!error && data) {
      setFriendRows((data as { first_name: string | null; last_name: string | null; xp: number }[]).map(r => ({
        name: `${r.first_name || ""} ${(r.last_name || "").charAt(0)}${r.last_name ? "." : ""}`.trim() || "Student",
        xp: Number(r.xp) || 0,
      })))
    }
  }, [])

  useEffect(() => { loadFriends() }, [loadFriends])

  // Near real-time: refresh classmate + friend scores on focus/visibility and
  // every 15s while the tab is visible, so ranks update without a manual reload.
  // (Your own score is already live - it reads jeffsBalance from context.)
  useEffect(() => {
    const refresh = () => {
      if (document.hidden) return
      loadMyClasses()
      loadFriends()
    }
    window.addEventListener("focus", refresh)
    document.addEventListener("visibilitychange", refresh)
    const interval = window.setInterval(refresh, 15000)
    return () => {
      window.removeEventListener("focus", refresh)
      document.removeEventListener("visibilitychange", refresh)
      window.clearInterval(interval)
    }
  }, [loadMyClasses, loadFriends])

  const handleJoinClass = async () => {
    if (!joinCode.trim()) return
    setJoiningClass(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data: classData, error: classError } = await supabase
        .rpc("lookup_class_by_join_code", { _code: joinCode.toUpperCase() })
        .single()

      if (classError || !classData) {
        toast({ title: "Invalid code", description: "No class found with this join code.", variant: "destructive" })
        return
      }

      const { error: joinError } = await supabase
        .from("class_members")
        .insert({ class_id: classData.id, user_id: user.id })

      if (joinError) {
        if (joinError.code === "23505") {
          toast({ title: "Already joined", description: "You're already in this class." })
        } else {
          throw joinError
        }
      } else {
        toast({ title: "Joined!", description: `You've joined ${classData.name}` })
        setJoinCode("")
        loadMyClasses()
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setJoiningClass(false)
    }
  }

  const copyInviteLink = () => {
    const url = `${window.location.origin}/onboarding`
    navigator.clipboard.writeText(url)
    toast({ title: "Link copied!", description: "Share this with partners to invite them." })
  }

  const allEntries = useMemo<Entry[]>(() => {
    if (scope === "class" && classMembers.length > 0) {
      const entries: Entry[] = [
        ...classMembers.map(m => ({
          name: m.name, score: m.xp, scoreLabel: "Coins", level: getLevel(m.xp), streak: 0, isMe: false,
        })),
        { name: "You", score: totalXp, scoreLabel: "Coins", level: getLevel(totalXp), streak: 0, isMe: true },
      ]
      entries.sort((a, b) => b.score - a.score)
      return entries
    }

    if (scope === "friends" && friendRows.length > 0) {
      const entries: Entry[] = [
        ...friendRows.map(f => ({
          name: f.name, score: f.xp, scoreLabel: "Coins", level: getLevel(f.xp), streak: 0, isMe: false,
        })),
        { name: "You", score: totalXp, scoreLabel: "Coins", level: getLevel(totalXp), streak: 0, isMe: true },
      ]
      entries.sort((a, b) => b.score - a.score)
      return entries
    }

    if (showDemo) {
      const demoData = scope === "national" ? DEMO_NATIONAL : DEMO_NATIONAL.slice(0, 5)
      const entries: Entry[] = [
        ...demoData.map(d => ({ name: d.name, score: d.netWorth, scoreLabel: "Coins", level: d.level, streak: d.streak, isMe: false })),
        { name: "You", score: totalXp, scoreLabel: "Coins", level: getLevel(totalXp), streak: 0, isMe: true },
      ]
      entries.sort((a, b) => b.score - a.score)
      return entries
    }

    return [{ name: "You", score: totalXp, scoreLabel: "Coins", level: getLevel(totalXp), streak: 0, isMe: true }]
  }, [scope, myNetWorth, showDemo, classMembers, friendRows, totalXp])

  const hasOtherUsers = allEntries.filter(e => !e.isMe).length > 0
  const myRank = allEntries.findIndex(e => e.isMe) + 1
  const scoreLabel = allEntries[0]?.scoreLabel ?? "Net Worth"
  const maxScore = allEntries[0]?.score || 1
  const myScore = allEntries.find(e => e.isMe)?.score ?? 0
  const leaderScore = allEntries[0]?.score ?? 0

  // Head-to-head: the player directly above you and the gap to pass them.
  const rivalAbove = myRank > 1 ? allEntries[myRank - 2] : null
  const gapToNext = rivalAbove ? rivalAbove.score - myScore : 0
  const gapToTop = myRank > 1 ? leaderScore - myScore : 0
  // Progress toward catching the rival: how close your score is to theirs.
  const catchPct = rivalAbove && rivalAbove.score > 0
    ? Math.min(100, Math.round((myScore / rivalAbove.score) * 100))
    : 100

  // League standing (XP-based, so it reflects real earning).
  const myLeagueIdx = getLeagueIdx(totalXp)
  const myLeague = LEAGUES[myLeagueIdx]
  const nextLeague = LEAGUES[myLeagueIdx + 1] ?? null
  const leagueProgress = nextLeague
    ? Math.min(100, Math.round(((totalXp - myLeague.min) / (nextLeague.min - myLeague.min)) * 100))
    : 100
  const xpToNextLeague = nextLeague ? Math.max(0, nextLeague.min - totalXp) : 0

  const activeClassName = myClasses.find(c => c.id === selectedClassId)?.name
  const barPct = (score: number) => `${Math.max(6, Math.round((score / maxScore) * 100))}%`

  // Top 3 = the promotion zone / podium; everyone else in the ranked list.
  const podium = hasOtherUsers ? allEntries.slice(0, 3) : []
  const restEntries = hasOtherUsers ? allEntries.slice(3) : allEntries
  const PROMO_ZONE = 3

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-warning" />
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />
    if (rank === 3) return <Medal className="w-5 h-5 text-warning/70" />
    return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>
  }

  const showLeaderboard = (hasOtherUsers || showDemo)

  // Motivational panels - reused by both the populated board and the empty
  // (no-classmates-yet) state, so climbing content is never missing.
  const climbFasterCard = (
    <div className="rounded-3xl border border-border/40 bg-card p-5">
      <p className="text-sm font-extrabold flex items-center gap-1.5 mb-1">
        <Zap className="w-4 h-4 text-warning" /> Climb faster
      </p>
      <p className="text-[12px] text-muted-foreground mb-3">Every action earns InvestiCoins and pushes you up the board.</p>
      <div className="space-y-2">
        {EARN_ACTIONS.map(a => (
          <Link
            key={a.label}
            to={a.to}
            className="flex items-center gap-3 p-2.5 rounded-xl border border-border/40 hover:border-primary/40 hover:bg-muted/30 transition-colors press-scale"
          >
            <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${a.tint}1a` }}>
              <a.icon className="w-4.5 h-4.5" style={{ color: a.tint }} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold truncate">{a.label}</p>
              <p className="text-[11px] text-muted-foreground truncate">{a.detail}</p>
            </div>
            <ChevronUp className="w-4 h-4 text-muted-foreground rotate-45 shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )

  const leagueLadderCard = (
    <div className="rounded-3xl border border-border/40 bg-card p-5">
      <p className="text-sm font-extrabold flex items-center gap-1.5 mb-1">
        <Gem className="w-4 h-4 text-primary" /> League ladder
      </p>
      <p className="text-[12px] text-muted-foreground mb-3">Earn InvestiCoins to rank up through every tier.</p>
      <div className="space-y-1.5">
        {LEAGUES.map((lg, i) => {
          const reached = totalXp >= lg.min
          const current = i === myLeagueIdx
          return (
            <div
              key={lg.name}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition-colors ${current ? "border-transparent" : "border-border/30"}`}
              style={current ? { background: lg.soft, borderColor: `${lg.color}55` } : undefined}
            >
              <span className={`text-lg leading-none ${reached ? "" : "grayscale opacity-40"}`}>{lg.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-bold ${reached ? "" : "text-muted-foreground"}`}>
                  {lg.name}
                  {current && <span className="ml-1.5 text-[10px] font-extrabold" style={{ color: lg.color }}>YOU</span>}
                </p>
                <p className="text-[11px] text-muted-foreground">{lg.min.toLocaleString()}+ coins</p>
              </div>
              {reached && <Sparkles className="w-3.5 h-3.5" style={{ color: lg.color }} />}
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 md:px-6 py-6 max-w-[1400px]">
        {/* ───────────────── HERO - your standing + the climb ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-hero text-primary-foreground p-6 md:p-8 mb-5 shadow-card"
        >
          <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-warning/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-10 w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-6 items-center">
            {/* Left - score + league */}
            <div>
              <div className="flex items-center gap-2 text-warning mb-2">
                <Trophy className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Leaderboard</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold border"
                  style={{ background: myLeague.soft, borderColor: `${myLeague.color}66`, color: "#fff" }}
                >
                  <span className="text-base leading-none">{myLeague.icon}</span> {myLeague.name} League
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-foreground/70">
                  <Star className="w-3.5 h-3.5 text-warning" /> Level {getLevel(totalXp)}
                </span>
              </div>

              <p className="text-xs text-primary-foreground/70 font-semibold uppercase tracking-wider mt-4">
                Your Coins
              </p>
              <p className="font-display text-5xl md:text-6xl font-extrabold flex items-center gap-2 mt-1 leading-none">
                <Coins className="w-8 h-8 md:w-9 md:h-9 text-warning" />
                {jeffsBalance.toLocaleString()}
              </p>
              <p className="text-[11px] text-primary-foreground/60 mt-2">
                {portfolioValue > 0
                  ? `Spendable InvestiCoins · ${Math.round(portfolioValue).toLocaleString()} more invested in stocks`
                  : "Spendable InvestiCoins - this is what the leaderboard ranks on"}
              </p>

              {/* League progress bar */}
              <div className="mt-5 max-w-md">
                <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
                  <span className="text-primary-foreground/70">{myLeague.icon} {myLeague.name}</span>
                  {nextLeague
                    ? <span className="text-primary-foreground/70">{nextLeague.name} {nextLeague.icon}</span>
                    : <span className="text-warning">Top league 👑</span>}
                </div>
                <div className="h-2.5 rounded-full bg-white/15 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${leagueProgress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${myLeague.color}, ${nextLeague?.color ?? myLeague.color})` }}
                  />
                </div>
                <p className="text-[11px] text-primary-foreground/70 mt-1.5">
                  {nextLeague
                    ? <><span className="font-bold text-warning">{xpToNextLeague.toLocaleString()} coins</span> to reach {nextLeague.name} League</>
                    : "You've maxed the league ladder - legendary!"}
                </p>
              </div>
            </div>

            {/* Right - rank + the chase */}
            {showLeaderboard ? (
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-primary-foreground/70 font-semibold">Your Rank</p>
                    <p className="font-display text-5xl font-extrabold leading-none mt-1">#{myRank}</p>
                    <p className="text-[11px] text-primary-foreground/60 mt-1">of {allEntries.length} climbers</p>
                  </div>
                  <div className="text-right">
                    {myRank <= PROMO_ZONE ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-warning/20 text-warning px-2.5 py-1 text-[11px] font-extrabold">
                        <Crown className="w-3.5 h-3.5" /> Podium!
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 text-primary-foreground/80 px-2.5 py-1 text-[11px] font-bold">
                        <ChevronUp className="w-3.5 h-3.5 text-warning" /> {myRank - PROMO_ZONE} {myRank - PROMO_ZONE === 1 ? "spot" : "spots"} to podium
                      </span>
                    )}
                  </div>
                </div>

                {/* The chase - catch the player above you */}
                {rivalAbove ? (
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="flex items-center gap-1.5 text-primary-foreground/85">
                        <Target className="w-3.5 h-3.5 text-warning" /> Catch {rivalAbove.name}
                      </span>
                      <span className="text-warning font-extrabold">{gapToNext.toLocaleString()} {scoreLabel} to go</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/15 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${catchPct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-warning to-accent"
                      />
                    </div>
                    <p className="text-[11px] text-primary-foreground/60 mt-1.5">
                      You're at {catchPct}% of their score - one good day could pass them.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-warning/15 border border-warning/25 px-3 py-2.5">
                    <Crown className="w-5 h-5 text-warning shrink-0" />
                    <p className="text-sm font-bold">You're #1 - defend your crown! Every lesson widens the lead.</p>
                  </div>
                )}

                {myRank > 1 && (
                  <p className="text-[11px] text-primary-foreground/60 mt-3">
                    <span className="font-bold text-primary-foreground/80">{gapToTop.toLocaleString()}</span> {scoreLabel} behind #1
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5 text-center">
                <Rocket className="w-8 h-8 mx-auto text-warning mb-2" />
                <p className="text-sm font-bold">Join a class to start climbing</p>
                <p className="text-[12px] text-primary-foreground/70 mt-1">
                  Rank up against classmates and race to the top league.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Scope toggle */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl w-full sm:w-fit mb-5" ref={anchor("lead-podium")}>
          {(["class", "friends", "national"] as Scope[]).map(s => (
            <Button
              key={s}
              variant={scope === s ? "default" : "ghost"}
              size="sm"
              onClick={() => setScope(s)}
              className="press-scale capitalize flex-1 sm:flex-none"
            >
              {s === "class" ? "My Class" : s === "friends" ? "Partners" : "National"}
            </Button>
          ))}
        </div>

        {/* Active class header */}
        {scope === "class" && myClasses.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-bold">
              <Users className="w-4 h-4 text-primary" />
              {activeClassName ?? "My Class"}
            </span>
            {hasOtherUsers && (
              <Badge variant="outline" className="text-[11px]">{allEntries.length} members</Badge>
            )}
            {myClasses.length > 1 && (
              <div className="flex flex-wrap gap-1.5 ml-auto">
                {myClasses.map(c => (
                  <button
                    key={c.id}
                    onClick={() => switchClass(c.id)}
                    className={`press-scale text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                      c.id === selectedClassId
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border/60 hover:border-primary/40"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Loading skeleton - Class waits on classes, Friends on partners */}
        {loadingClasses && scope === "class" && !hasOtherUsers && !showDemo ? (
          <div className="space-y-2 animate-pulse max-w-3xl">
            <div className="grid grid-cols-3 gap-3 items-end mb-6">
              <div className="h-28 rounded-2xl bg-muted/60 mt-4" />
              <div className="h-36 rounded-2xl bg-muted/60" />
              <div className="h-24 rounded-2xl bg-muted/60 mt-4" />
            </div>
            {[0, 1, 2, 3].map(i => <div key={i} className="h-16 rounded-2xl bg-muted/50" />)}
          </div>
        ) : (scope === "class" || scope === "friends") && !hasOtherUsers && !showDemo ? (
          /* ───────────── Empty state - join / invite + climb panels ───────────── */
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Left - join / invite */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-3xl border border-border/40 bg-gradient-to-b from-primary/[0.05] to-card p-6 text-center">
                <Users className="w-12 h-12 mx-auto text-primary/40 mb-3" />
                <h3 className="text-lg font-bold mb-1.5">
                  {scope === "class" ? "No classmates yet" : "No partners connected yet"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {scope === "class"
                    ? "Join a class to compete with your classmates and race up the leagues - but you can start earning InvestiCoins and climbing the ladder right now."
                    : "Add partners in the Find Partners directory and they'll show up here to race against - your stats are ready when they are."}
                </p>
                <Link to="/partners">
                  <Button size="sm" className="mt-4 gap-1.5 font-bold">
                    <UserPlus className="w-4 h-4" /> Find Partners
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {scope === "class" && (
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-primary" /> Join a Class
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Enter the class code your teacher gave you.</p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g., ABC123"
                          value={joinCode}
                          onChange={e => setJoinCode(e.target.value.toUpperCase())}
                          maxLength={6}
                          className="font-mono text-center tracking-widest"
                        />
                        <Button onClick={handleJoinClass} disabled={!joinCode.trim() || joiningClass}>
                          {joiningClass ? "Joining..." : "Join"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-primary" /> Invite Partners
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">Share this link with partners to invite them to InvestiPlay.</p>
                    <Button variant="outline" onClick={copyInviteLink} className="w-full gap-2">
                      <Copy className="w-4 h-4" /> Copy Invite Link
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {scope === "class" && myClasses.length > 0 && (
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-base">Your Classes</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-2">
                    {myClasses.map(c => (
                      <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                        <span className="text-sm font-semibold">{c.name}</span>
                        <Badge variant="outline" className="font-mono">{c.joinCode}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center justify-center gap-3 pt-1">
                <label htmlFor="demo-toggle" className="text-sm text-muted-foreground cursor-pointer">Preview with demo data</label>
                <Switch id="demo-toggle" checked={showDemo} onCheckedChange={setShowDemo} />
              </div>
            </div>

            {/* Right - climb content stays present even before you have rivals */}
            <aside className="space-y-5">
              {climbFasterCard}
              {leagueLadderCard}
            </aside>
          </div>
        ) : (
          /* ───────────── Populated leaderboard - full-width 2-col ───────────── */
          <>
            {showDemo && (
              <div className="flex items-center justify-between mb-4 px-3 py-2 rounded-xl bg-warning/5 border border-warning/10">
                <span className="text-xs text-warning font-medium flex items-center gap-1.5">
                  <Badge variant="outline" className="text-[10px] border-warning/20 text-warning">Demo Data</Badge>
                  Sample entries for preview only.
                </span>
                <div className="flex items-center gap-2">
                  <label htmlFor="demo-toggle-2" className="text-xs text-muted-foreground cursor-pointer">Demo</label>
                  <Switch id="demo-toggle-2" checked={showDemo} onCheckedChange={setShowDemo} />
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-5">
              {/* Main column - podium + rankings */}
              <div className="lg:col-span-2 space-y-5">
                {/* Podium */}
                {podium.length >= 3 && (
                  <div className="rounded-3xl border border-border/40 bg-gradient-to-b from-warning/[0.06] to-card p-4 sm:p-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-warning flex items-center gap-1.5 mb-4">
                      <Crown className="w-3.5 h-3.5" /> Promotion zone - top 3
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end">
                      {[podium[1], podium[0], podium[2]].map((entry, i) => {
                        const rank = i === 0 ? 2 : i === 1 ? 1 : 3
                        const isChampion = rank === 1
                        const accent =
                          rank === 1 ? "text-warning border-warning/40 from-warning/15"
                          : rank === 2 ? "text-muted-foreground border-border from-muted/60"
                          : "text-warning/70 border-warning/20 from-warning/5"
                        // Champion sits highest; runners-up dropped down for a real podium feel.
                        const lift = rank === 1 ? "pt-6 pb-5 sm:pt-7" : rank === 2 ? "mt-6 pt-4 pb-4" : "mt-10 pt-4 pb-4"
                        return (
                          <motion.div
                            key={`podium-${rank}`}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.05 * i }}
                            className={`relative flex flex-col items-center rounded-2xl border bg-gradient-to-b to-card px-3 ${lift} ${accent} ${
                              isChampion ? "shadow-card" : ""
                            } ${entry.isMe ? "ring-2 ring-primary/40" : ""}`}
                          >
                            {isChampion && <Crown className="absolute -top-3.5 w-7 h-7 text-warning drop-shadow" fill="currentColor" />}
                            <div className={`relative ${isChampion ? "w-16 h-16 text-lg" : "w-12 h-12"} rounded-full flex items-center justify-center font-bold ${
                              entry.isMe ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                            }`}>
                              {entry.name.charAt(0)}
                              <span className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-card border flex items-center justify-center text-[11px] font-extrabold ${accent}`}>
                                {rank}
                              </span>
                            </div>
                            <p className={`mt-3 text-xs sm:text-sm font-bold text-center truncate max-w-full ${entry.isMe ? "text-primary" : "text-foreground"}`}>
                              {entry.name}
                            </p>
                            <p className={`font-extrabold flex items-center gap-1 text-foreground mt-0.5 ${isChampion ? "text-sm sm:text-base" : "text-[11px] sm:text-sm"}`}>
                              <Coins className="w-3.5 h-3.5 text-warning" /> {entry.score.toLocaleString()}
                            </p>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Star className="w-2.5 h-2.5" /> Lv {entry.level}
                            </span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Ranked list */}
                {restEntries.length > 0 && (
                  <div className="space-y-2">
                    {podium.length >= 3 && (
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-1">
                        The pack - climb the ranks
                      </p>
                    )}
                    {restEntries.map((entry, idx) => {
                      const rank = (podium.length >= 3 ? 3 : 0) + idx + 1
                      return (
                        <motion.div
                          // Stable identity per person (not position) so rows glide
                          // to their new rank via `layout` instead of remounting and
                          // re-animating from scratch when scores update live.
                          key={entry.isMe ? "me" : entry.name}
                          layout
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ layout: { duration: 0.4, ease: "easeInOut" }, duration: 0.25 }}
                          className={`relative flex items-center gap-3 sm:gap-4 p-3.5 rounded-2xl overflow-hidden ${
                            entry.isMe
                              ? "bg-primary/10 border-2 border-primary/30 shadow-glow"
                              : "bg-card border border-border/40 hover:border-border"
                          }`}
                        >
                          <motion.div
                            initial={false}
                            animate={{ width: barPct(entry.score) }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className={`absolute inset-y-0 left-0 rounded-2xl pointer-events-none ${entry.isMe ? "bg-primary/10" : "bg-muted/40"}`}
                          />
                          <div className="relative w-7 flex justify-center shrink-0">{getRankIcon(rank)}</div>
                          <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                            entry.isMe ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            {entry.name.charAt(0)}
                          </div>
                          <div className="relative flex-1 min-w-0">
                            <p className={`text-sm font-bold truncate ${entry.isMe ? "text-primary" : ""}`}>
                              {entry.name}
                              {entry.isMe && <span className="ml-1.5 text-[10px] text-primary/60">(You)</span>}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <Star className="w-3 h-3" /> Lv {entry.level}
                              </span>
                              {entry.streak > 0 && (
                                <span className="text-[11px] text-orange-500 flex items-center gap-1">
                                  <Flame className="w-3 h-3" /> {entry.streak}d
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="relative text-right shrink-0">
                            <p className="font-bold text-sm flex items-center gap-1 justify-end">
                              <Coins className="w-3.5 h-3.5 text-warning" /> {entry.score.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-muted-foreground">{entry.scoreLabel}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Side rail - league ladder + fast ways to climb */}
              <aside className="space-y-5">
                {climbFasterCard}
                {leagueLadderCard}

                {/* Invite CTA - more rivals = more reasons to climb */}
                <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5 text-center">
                  <TrendingUp className="w-7 h-7 mx-auto text-primary mb-2" />
                  <p className="text-sm font-bold">More rivals, more glory</p>
                  <p className="text-[12px] text-muted-foreground mt-1 mb-3">Invite partners and battle for the crown.</p>
                  <Button variant="outline" size="sm" onClick={copyInviteLink} className="w-full gap-2">
                    <Copy className="w-4 h-4" /> Copy invite link
                  </Button>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
