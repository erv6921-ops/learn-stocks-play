import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useNetWorth } from "@/hooks/useNetWorth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Wordmark } from "@/components/Wordmark";
import NotificationBell from "@/components/NotificationBell";
import { getInitials } from "@/lib/playerStats";
import { anchor } from "@/lib/tourAnchors";
import AnimatedNumber from "@/components/AnimatedNumber";
import { lessons, unitInfo, getLessonsByUnit } from "@/data/lessons";
import {
  LayoutDashboard, BookOpen, LineChart, Coins, LogOut,
  Star, Flame, Store, BarChart3, Trophy, FlaskConical, Landmark } from
"lucide-react";

const MEANINGFUL_REASONS = ["lesson", "quiz", "mission", "assessment", "bought", "sold", "unit test"];

function getCurriculumLevel(completedLessons: number, totalLessons: number, unitScores: { done: number; total: number }[]) {
  const completionPct = totalLessons > 0 ? completedLessons / totalLessons : 0;
  const unitsFullyComplete = unitScores.filter(u => u.total > 0 && u.done >= u.total).length;
  const totalUnits = unitScores.filter(u => u.total > 0).length;
  const unitMasteryPct = totalUnits > 0 ? unitsFullyComplete / totalUnits : 0;
  const score = completionPct * 0.6 + unitMasteryPct * 0.4;
  if (score >= 0.95) return 10;
  if (score >= 0.85) return 9;
  if (score >= 0.72) return 8;
  if (score >= 0.60) return 7;
  if (score >= 0.48) return 6;
  if (score >= 0.36) return 5;
  if (score >= 0.25) return 4;
  if (score >= 0.15) return 3;
  if (score >= 0.05) return 2;
  return 1;
}

function getStreak(history: { amount: number; reason: string; date: Date }[]) {
  if (history.length === 0) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates = new Set(
    history
      .filter((h) => MEANINGFUL_REASONS.some(r => h.reason.toLowerCase().includes(r)))
      .map((h) => {
        const d = new Date(h.date);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
  );
  let streak = 0;
  const day = new Date(today);
  if (dates.has(day.getTime())) streak++;
  else return 0;
  for (let i = 1; i < 365; i++) {
    day.setDate(day.getDate() - 1);
    if (dates.has(day.getTime())) streak++;
    else break;
  }
  return streak;
}

const NAV_ITEMS = [
{ to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", tour: "nav-dashboard" },
{ to: "/lessons", icon: BookOpen, label: "Missions", tour: "nav-lessons" },
{ to: "/lab", icon: FlaskConical, label: "Lab", tour: "nav-lab" },
{ to: "/stocks", icon: LineChart, label: "Stocks", tour: "nav-stocks" },
{ to: "/micro-business", icon: Store, label: "Business", tour: "nav-business" },
{ to: "/bank", icon: Landmark, label: "Bank", tour: "nav-bank" },
{ to: "/progress", icon: BarChart3, label: "Progress", tour: "nav-progress" },
{ to: "/leaderboard", icon: Trophy, label: "Leaderboard", tour: "nav-leaderboard" }];


export default function GameNav() {
  const { jeffsHistory, lessonProgress, logout, user } = useApp();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth", { replace: true });
  };
  const { netWorth } = useNetWorth();
  const location = useLocation();

  // Player level reflects the core (Florida) curriculum only, so the optional
  // AP Micro elective track never changes a student's level.
  const floridaUnits = useMemo(() => unitInfo.filter(u => (u.track ?? "florida") === "florida"), []);
  const floridaLessonIds = useMemo(
    () => new Set(floridaUnits.flatMap(u => getLessonsByUnit(u.id).map(l => l.id))),
    [floridaUnits]
  );
  const completedLessons = lessonProgress.filter(p => p.completed && floridaLessonIds.has(p.lessonId)).length;
  const totalLessons = floridaLessonIds.size;
  const unitScores = useMemo(() =>
    floridaUnits.map(u => {
      const ul = getLessonsByUnit(u.id);
      return { done: ul.filter(l => lessonProgress.find(p => p.lessonId === l.id && p.completed)).length, total: ul.length };
    }),
  [lessonProgress, floridaUnits]);
  const level = useMemo(() => getCurriculumLevel(completedLessons, totalLessons, unitScores), [completedLessons, totalLessons, unitScores]);
  const streak = useMemo(() => getStreak(jeffsHistory), [jeffsHistory]);

  const isActive = (to: string) =>
  to === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(to);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* InvestiPlay Wordmark */}
            <Link to="/dashboard" className="flex items-center group">
              <Wordmark className="text-xl md:text-2xl transition-transform duration-200 group-hover:scale-[1.02]" />
            </Link>

            {/* Nav items */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) =>
              <Link key={item.to} to={item.to}>
                  <Button
                  ref={anchor(item.tour)}
                  variant={isActive(item.to) ? "default" : "ghost"}
                  size="sm"
                  className={`gap-2 nav-bounce ${isActive(item.to) ? "shadow-glow" : "hover:bg-muted/70"}`}>

                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              )}
            </div>

            {/* HUD pills */}
            <div className="flex items-center gap-2">
              {streak > 0 &&
              <div ref={anchor("hud-streak")} className="flex items-center gap-1 bg-orange-500/10 text-orange-500 px-2.5 py-1.5 rounded-xl text-xs font-bold border border-orange-500/15 shadow-sm nav-bounce cursor-default">
                  <Flame className="w-3.5 h-3.5" style={{ animation: 'streak-pulse 2s ease-in-out infinite' }} />
                  <span>{streak}d</span>
                </div>
              }
              <div ref={anchor("hud-coins")} className="flex items-center gap-1.5 bg-gold/10 text-gold px-2.5 py-1.5 rounded-xl text-xs font-bold border border-gold/15 shadow-sm nav-bounce cursor-default">
                <Coins className="w-3.5 h-3.5" />
                <span><AnimatedNumber value={Math.floor(netWorth)} /></span>
              </div>
              <div ref={anchor("hud-level")} className="hidden sm:flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1.5 rounded-xl text-xs font-bold border border-primary/15 shadow-sm nav-bounce cursor-default">
                <Star className="w-3.5 h-3.5" />
                <span>Lv {level}</span>
              </div>
              <NotificationBell />
              <Link to="/profile" aria-label="Your profile" title="Your profile" ref={anchor("hud-profile")}>
                <Avatar className="w-8 h-8 border border-border nav-bounce cursor-pointer ring-offset-background hover:ring-2 hover:ring-primary/40 transition-shadow">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {getInitials(user?.firstName, user?.lastName)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground w-8 h-8 nav-bounce">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-around py-2.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.to);
            return (
              <Link key={item.to} to={item.to} className="flex flex-col items-center gap-0.5">
                <div ref={anchor(item.tour)} className={`p-2 rounded-xl nav-bounce ${active ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] ${active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </Link>);

          })}
        </div>
      </div>
    </>);

}