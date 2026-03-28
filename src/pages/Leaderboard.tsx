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
import { Trophy, Coins, Star, Flame, Crown, Medal, Users, UserPlus, Copy, Link2 } from "lucide-react"

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

export default function Leaderboard() {
  const { jeffsBalance, portfolio, jeffsHistory } = useApp()
  const { netWorth: myNetWorth, portfolioValue } = useNetWorth()
  const { toast } = useToast()
  const [scope, setScope] = useState<Scope>("class")
  const [showDemo, setShowDemo] = useState(false)
  const [joinCode, setJoinCode] = useState("")
  const [joiningClass, setJoiningClass] = useState(false)
  const [myClasses, setMyClasses] = useState<{ id: string; name: string; joinCode: string }[]>([])
  const [classMembers, setClassMembers] = useState<{ name: string; userId: string }[]>([])
  const [loadingClasses, setLoadingClasses] = useState(true)

  const totalXp = useMemo(() =>
    jeffsHistory.filter(h => h.amount > 0).reduce((sum, h) => sum + h.amount, 0),
    [jeffsHistory]
  )

  // Load user's classes
  useEffect(() => {
    loadMyClasses()
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

        if (classes) {
          setMyClasses(classes.map(c => ({ id: c.id, name: c.name, joinCode: c.join_code })))

          // Load class members for the first class
          const firstClassId = classes[0]?.id
          if (firstClassId) {
            const { data: members } = await supabase
              .from("class_members")
              .select("user_id")
              .eq("class_id", firstClassId)

            if (members) {
              const memberIds = members.map(m => m.user_id)
              const { data: profiles } = await supabase
                .from("profiles")
                .select("id, first_name, last_name")
                .in("id", memberIds)

              if (profiles) {
                setClassMembers(profiles
                  .filter(p => p.id !== user.id)
                  .map(p => ({
                    name: `${p.first_name || ''} ${(p.last_name || '').charAt(0)}.`.trim() || 'Student',
                    userId: p.id
                  })))
              }
            }
          }
        }
      }
    } catch (err) {
      console.error("Error loading classes:", err)
    } finally {
      setLoadingClasses(false)
    }
  }, [])

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

  const myEntry = {
    name: "You",
    netWorth: myNetWorth,
    level: getLevel(totalXp),
    streak: 0,
    isMe: true
  }

  // Build entries based on scope
  const allEntries = useMemo(() => {
    if (scope === "class" && classMembers.length > 0) {
      // Real class members (net worth not available yet for others — show them with placeholder)
      const classMemberEntries = classMembers.map(m => ({
        name: m.name,
        netWorth: 0, // We don't have other users' real-time portfolio data yet
        level: 1,
        streak: 0,
        isMe: false
      }))
      const entries = [...classMemberEntries, myEntry]
      entries.sort((a, b) => b.netWorth - a.netWorth)
      return entries
    }

    if (showDemo) {
      const demoData = scope === "national" ? DEMO_NATIONAL : DEMO_NATIONAL.slice(0, 5)
      const entries = [...demoData.map(d => ({ ...d, isMe: false })), myEntry]
      entries.sort((a, b) => b.netWorth - a.netWorth)
      return entries
    }

    return [myEntry]
  }, [scope, myNetWorth, showDemo, classMembers])

  const hasOtherUsers = allEntries.filter(e => !e.isMe).length > 0

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-warning" />
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />
    if (rank === 3) return <Medal className="w-5 h-5 text-warning/70" />
    return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-[28px] md:text-[32px] font-bold tracking-tight flex items-center gap-3">
              <Trophy className="w-7 h-7 text-warning" />
              Leaderboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Compete by total Net Worth</p>
          </div>
        </div>

        {/* Scope toggle */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit mb-6">
          {(["class", "friends", "national"] as Scope[]).map(s => (
            <Button
              key={s}
              variant={scope === s ? "default" : "ghost"}
              size="sm"
              onClick={() => setScope(s)}
              className="press-scale capitalize"
            >
              {s === "class" ? "My Class" : s === "friends" ? "Friends" : "National"}
            </Button>
          ))}
        </div>

        {/* Net Worth formula */}
        <Card variant="glass" className="mb-6">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Your Net Worth</p>
            <p className="text-2xl font-extrabold flex items-center gap-2">
              <Coins className="w-5 h-5 text-warning" />
              {myNetWorth.toLocaleString()}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              = InvestiCoins ({jeffsBalance.toLocaleString()}) + Portfolio ({Math.round(portfolioValue).toLocaleString()})
            </p>
          </CardContent>
        </Card>

        {/* Class/Friends empty state with CTAs */}
        {(scope === "class" || scope === "friends") && !hasOtherUsers && !showDemo ? (
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

            {/* Leaderboard rows */}
            <div className="space-y-2">
              {allEntries.map((entry, idx) => {
                const rank = idx + 1
                const isTop3 = rank <= 3
                return (
                  <div
                    key={`${entry.name}-${idx}`}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      entry.isMe
                        ? "bg-primary/10 border-2 border-primary/30 shadow-glow"
                        : isTop3
                        ? "bg-gradient-to-r from-card to-muted/50 border border-warning/20"
                        : "bg-card border border-border/40"
                    }`}
                  >
                    <div className="w-8 flex justify-center shrink-0">
                      {getRankIcon(rank)}
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      entry.isMe ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {entry.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
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
                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm flex items-center gap-1 justify-end">
                        <Coins className="w-3.5 h-3.5 text-warning" />
                        {entry.netWorth.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-muted-foreground">Net Worth</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
