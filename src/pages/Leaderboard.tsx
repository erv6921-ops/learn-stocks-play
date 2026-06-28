import React, { useState, useMemo, useEffect, useCallback } from "react"
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
import { Trophy, Coins, Star, Flame, Crown, Medal, Users, UserPlus, Copy, Link2 } from "lucide-react"
import { anchor } from "@/lib/tourAnchors"

const LEVEL_THRESHOLDS = [0, 1000, 3000, 7000, 15000, 30000, 60000, 100000]
function getLevel(xp: number) {
  let level = 1
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1; else break
  }
  return level
}

// Demo data — only shown when user explicitly toggles "Show Demo Data"
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

export default function Leaderboard() {
  const { jeffsBalance, portfolio, jeffsHistory, lessonProgress } = useApp()
  const { netWorth: myNetWorth, portfolioValue } = useNetWorth()
  const { toast } = useToast()
  const [scope, setScope] = useState<Scope>("class")
  const [showDemo, setShowDemo] = useState(false)
  const [joinCode, setJoinCode] = useState("")
  const [joiningClass, setJoiningClass] = useState(false)
  const [myClasses, setMyClasses] = useState<{ id: string; name: string; joinCode: string }[]>([])
  const [classMembers, setClassMembers] = useState<{ name: string; userId: string; xp: number }[]>([])
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
  const [loadingClasses, setLoadingClasses] = useState(true)

  const totalXp = useMemo(() =>
    jeffsHistory.filter(h => h.amount > 0).reduce((sum, h) => sum + h.amount, 0),
    [jeffsHistory]
  )

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

        if (classes) {
          setMyClasses(classes.map(c => ({ id: c.id, name: c.name, joinCode: c.join_code })))

          // Load members + real XP for the active class (current selection if it's
          // still valid, otherwise the first). Classmates' profiles/jeffs_history
          // aren't readable under RLS, so this goes through the get_class_leaderboard
          // security-definer RPC.
          const activeId = (selectedClassId && classes.some(c => c.id === selectedClassId))
            ? selectedClassId
            : classes[0]?.id
          if (activeId && activeId !== selectedClassId) setSelectedClassId(activeId)
          if (activeId) {
            const { data: lb } = await supabase.rpc("get_class_leaderboard", { _class_id: activeId })
            if (lb) {
              setClassMembers(lb
                .filter(r => r.user_id !== user.id)
                .map(r => ({
                  name: `${r.first_name || ''} ${(r.last_name || '').charAt(0)}.`.trim() || 'Student',
                  userId: r.user_id,
                  xp: Number(r.xp) || 0,
                })))
            }
          }
        }
      }
    } catch (err) {
      console.error("Error loading classes:", err)
    } finally {
      setLoadingClasses(false)
    }
  }, [selectedClassId])

  // Load on mount, and refetch from the database whenever a lesson is completed
  // (lessonProgress changes) so leaderboard rankings reflect newly earned XP.
  useEffect(() => {
    loadMyClasses()
  }, [lessonProgress, loadMyClasses])

  // Always pull a fresh roster when the tab/window regains focus, so classmates
  // who joined elsewhere appear instead of stale cached state.
  useEffect(() => {
    const refresh = () => { if (!document.hidden) loadMyClasses() }
    window.addEventListener("focus", refresh)
    document.addEventListener("visibilitychange", refresh)
    return () => {
      window.removeEventListener("focus", refresh)
      document.removeEventListener("visibilitychange", refresh)
    }
  }, [loadMyClasses])

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
    toast({ title: "Link copied!", description: "Share this with friends to invite them." })
  }

  // Build entries based on scope. The class leaderboard ranks by real XP
  // (total InvestiCoins earned, fetched per member); demo/national rank by net worth.
  const allEntries = useMemo<Entry[]>(() => {
    if (scope === "class" && classMembers.length > 0) {
      const entries: Entry[] = [
        ...classMembers.map(m => ({
          name: m.name, score: m.xp, scoreLabel: "XP", level: getLevel(m.xp), streak: 0, isMe: false,
        })),
        { name: "You", score: totalXp, scoreLabel: "XP", level: getLevel(totalXp), streak: 0, isMe: true },
      ]
      entries.sort((a, b) => b.score - a.score)
      return entries
    }

    if (showDemo) {
      const demoData = scope === "national" ? DEMO_NATIONAL : DEMO_NATIONAL.slice(0, 5)
      const entries: Entry[] = [
        ...demoData.map(d => ({ name: d.name, score: d.netWorth, scoreLabel: "Net Worth", level: d.level, streak: d.streak, isMe: false })),
        { name: "You", score: myNetWorth, scoreLabel: "Net Worth", level: getLevel(totalXp), streak: 0, isMe: true },
      ]
      entries.sort((a, b) => b.score - a.score)
      return entries
    }

    return [{ name: "You", score: myNetWorth, scoreLabel: "Net Worth", level: getLevel(totalXp), streak: 0, isMe: true }]
  }, [scope, myNetWorth, showDemo, classMembers, totalXp])

  const hasOtherUsers = allEntries.filter(e => !e.isMe).length > 0
  const myRank = allEntries.findIndex(e => e.isMe) + 1
  const scoreLabel = allEntries[0]?.scoreLabel ?? "Net Worth"
  const maxScore = allEntries[0]?.score || 1

  // How far behind the person directly above you — drives the motivational chip.
  const gapToNext = myRank > 1 ? allEntries[myRank - 2].score - allEntries[myRank - 1].score : 0

  const activeClassName = myClasses.find(c => c.id === selectedClassId)?.name

  // Relative bar width (6–100%) for the score fill behind each entry.
  const barPct = (score: number) => `${Math.max(6, Math.round((score / maxScore) * 100))}%`

  // Top 3 get a podium; everyone else falls into the ranked list below it.
  const podium = hasOtherUsers ? allEntries.slice(0, 3) : []
  const restEntries = hasOtherUsers ? allEntries.slice(3) : allEntries

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-warning" />
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />
    if (rank === 3) return <Medal className="w-5 h-5 text-warning/70" />
    return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Hero header — your standing at a glance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-hero text-primary-foreground p-6 md:p-8 mb-6 shadow-card"
        >
          {/* decorative glow */}
          <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-warning/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-8 w-48 h-48 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-warning mb-2">
                <Trophy className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Leaderboard</span>
              </div>
              <p className="text-xs text-primary-foreground/70 font-semibold uppercase tracking-wider">Your Net Worth</p>
              <p className="font-display text-4xl md:text-5xl font-extrabold flex items-center gap-2 mt-1">
                <Coins className="w-7 h-7 md:w-8 md:h-8 text-warning" />
                {myNetWorth.toLocaleString()}
              </p>
              <p className="text-[11px] text-primary-foreground/60 mt-1.5">
                InvestiCoins {jeffsBalance.toLocaleString()} + Portfolio {Math.round(portfolioValue).toLocaleString()}
              </p>
            </div>

            {/* Rank badge */}
            {(hasOtherUsers || showDemo) && (
              <div className="text-center shrink-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/70 font-semibold">Rank</p>
                <p className="font-display text-3xl md:text-4xl font-extrabold leading-none mt-1">#{myRank}</p>
                <p className="text-[10px] text-primary-foreground/60 mt-1">of {allEntries.length}</p>
              </div>
            )}
          </div>

          {/* Motivational standing chip */}
          {(hasOtherUsers || showDemo) && (
            <div className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-medium">
              {myRank === 1 ? (
                <><Crown className="w-3.5 h-3.5 text-warning" /> You're in the lead — keep it up!</>
              ) : (
                <><Flame className="w-3.5 h-3.5 text-warning" /> {gapToNext.toLocaleString()} {scoreLabel} to reach #{myRank - 1}</>
              )}
            </div>
          )}
        </motion.div>

        {/* Scope toggle */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl w-full sm:w-fit mb-6" ref={anchor("lead-podium")}>
          {(["class", "friends", "national"] as Scope[]).map(s => (
            <Button
              key={s}
              variant={scope === s ? "default" : "ghost"}
              size="sm"
              onClick={() => setScope(s)}
              className="press-scale capitalize flex-1 sm:flex-none"
            >
              {s === "class" ? "My Class" : s === "friends" ? "Friends" : "National"}
            </Button>
          ))}
        </div>

        {/* Active class header — name, member count, and switcher for multiple classes */}
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
                    onClick={() => setSelectedClassId(c.id)}
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

        {/* Loading skeleton — avoids flashing the empty state before the roster loads */}
        {loadingClasses && scope === "class" && !hasOtherUsers && !showDemo ? (
          <div className="space-y-2 animate-pulse">
            <div className="grid grid-cols-3 gap-3 items-end mb-6">
              <div className="h-28 rounded-2xl bg-muted/60 mt-4" />
              <div className="h-36 rounded-2xl bg-muted/60" />
              <div className="h-24 rounded-2xl bg-muted/60 mt-4" />
            </div>
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="h-16 rounded-2xl bg-muted/50" />
            ))}
          </div>
        ) : (scope === "class" || scope === "friends") && !hasOtherUsers && !showDemo ? (
          <div className="space-y-4">
            <div className="text-center py-10 px-6">
              <Users className="w-14 h-14 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-bold mb-2">
                {scope === "class" ? "No classmates yet" : "No friends connected yet"}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                {scope === "class"
                  ? "Join a class to compete with your classmates on the leaderboard."
                  : "Invite friends to InvestiPlay to compete together."}
              </p>
            </div>

            {/* Join Class Card */}
            <Card variant="elevated" className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-primary" />
                  Join a Class
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

            {/* Invite Friends Card */}
            <Card variant="elevated" className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-primary" />
                  Invite Friends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Share this link with friends to invite them to InvestiPlay.</p>
                <Button variant="outline" onClick={copyInviteLink} className="w-full gap-2">
                  <Copy className="w-4 h-4" /> Copy Invite Link
                </Button>
              </CardContent>
            </Card>

            {/* My Classes */}
            {myClasses.length > 0 && (
              <Card variant="elevated" className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-base">Your Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  {myClasses.map(c => (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 mb-2 last:mb-0">
                      <span className="text-sm font-semibold">{c.name}</span>
                      <Badge variant="outline" className="font-mono">{c.joinCode}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <div className="flex items-center justify-center gap-3 mt-4">
              <label htmlFor="demo-toggle" className="text-sm text-muted-foreground cursor-pointer">Show Demo Data</label>
              <Switch id="demo-toggle" checked={showDemo} onCheckedChange={setShowDemo} />
            </div>
          </div>
        ) : (
          <>
            {/* Demo data indicator + toggle */}
            {showDemo && (
              <div className="flex items-center justify-between mb-4 px-3 py-2 rounded-xl bg-warning/5 border border-warning/10">
                <span className="text-xs text-warning font-medium flex items-center gap-1.5">
                  <Badge variant="outline" className="text-[10px] border-warning/20 text-warning">Demo Data</Badge>
                  These are sample entries for preview purposes only.
                </span>
                <div className="flex items-center gap-2">
                  <label htmlFor="demo-toggle-2" className="text-xs text-muted-foreground cursor-pointer">Demo</label>
                  <Switch id="demo-toggle-2" checked={showDemo} onCheckedChange={setShowDemo} />
                </div>
              </div>
            )}

            {/* Podium — top 3, arranged 2 · 1 · 3 with the champion centered */}
            {podium.length >= 3 && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 items-end mb-6">
                {[podium[1], podium[0], podium[2]].map((entry, i) => {
                  // Render order is 2nd, 1st, 3rd — map back to real rank.
                  const rank = i === 0 ? 2 : i === 1 ? 1 : 3
                  const isChampion = rank === 1
                  const accent =
                    rank === 1 ? "text-warning border-warning/40 from-warning/15"
                    : rank === 2 ? "text-muted-foreground border-border from-muted/60"
                    : "text-warning/70 border-warning/20 from-warning/5"
                  return (
                    <motion.div
                      key={`podium-${rank}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 * i }}
                      className={`relative flex flex-col items-center rounded-2xl border bg-gradient-to-b to-card p-3 sm:p-4 ${accent} ${
                        isChampion ? "pt-5 shadow-card" : "mt-4"
                      } ${entry.isMe ? "ring-2 ring-primary/40" : ""}`}
                    >
                      {isChampion && (
                        <Crown className="absolute -top-3 w-6 h-6 text-warning drop-shadow" fill="currentColor" />
                      )}
                      <div className={`relative ${isChampion ? "w-16 h-16" : "w-12 h-12"} rounded-full flex items-center justify-center font-bold ${
                        entry.isMe ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}>
                        {entry.name.charAt(0)}
                        <span className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-card border flex items-center justify-center text-[11px] font-extrabold ${accent}`}>
                          {rank}
                        </span>
                      </div>
                      <p className={`mt-3 text-xs sm:text-sm font-bold text-center truncate max-w-full text-foreground ${entry.isMe ? "text-primary" : ""}`}>
                        {entry.name}
                      </p>
                      <p className="text-[11px] sm:text-xs font-extrabold flex items-center gap-1 text-foreground mt-0.5">
                        <Coins className="w-3 h-3 text-warning" />
                        {entry.score.toLocaleString()}
                      </p>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Star className="w-2.5 h-2.5" /> Lv {entry.level}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* Ranked list */}
            {restEntries.length > 0 && (
              <div className="space-y-2">
                {podium.length >= 3 && (
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-1">
                    Rankings
                  </p>
                )}
                {restEntries.map((entry, idx) => {
                  const rank = (podium.length >= 3 ? 3 : 0) + idx + 1
                  return (
                    <motion.div
                      key={`${entry.name}-${idx}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.3) }}
                      className={`relative flex items-center gap-3 sm:gap-4 p-3.5 rounded-2xl transition-all overflow-hidden ${
                        entry.isMe
                          ? "bg-primary/10 border-2 border-primary/30 shadow-glow"
                          : "bg-card border border-border/40 hover:border-border"
                      }`}
                    >
                      {/* Relative score fill */}
                      <div
                        className={`absolute inset-y-0 left-0 rounded-2xl pointer-events-none ${
                          entry.isMe ? "bg-primary/10" : "bg-muted/40"
                        }`}
                        style={{ width: barPct(entry.score) }}
                      />
                      <div className="relative w-7 flex justify-center shrink-0">
                        {getRankIcon(rank)}
                      </div>
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
                          <Coins className="w-3.5 h-3.5 text-warning" />
                          {entry.score.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{entry.scoreLabel}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
