import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, type TargetAndTransition } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useNetWorth } from "@/hooks/useNetWorth";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/Wordmark";
import NotificationBell from "@/components/NotificationBell";
import { lessons, unitInfo, getLessonsByUnit } from "@/data/lessons";
import {
  LayoutDashboard, BookOpen, LineChart, Coins, LogOut,
  Star, Flame, Store, BarChart3, Trophy, FlaskConical } from
"lucide-react";
import type { LucideIcon } from "lucide-react";

const MEANINGFUL_REASONS = ["lesson", "quiz", "mission", "assessment", "bought", "sold", "unit test"];

// Per-icon hover motion, Resend-style. Maps a lucide icon to its whileHover
// animation; everything not specially handled gets a subtle scale-up.
function getIconHover(Icon: LucideIcon): { whileHover: TargetAndTransition; transformOrigin: string } {
  const name = (Icon as { displayName?: string }).displayName ?? "";
  if (name === "Globe") return { whileHover: { rotate: 360 }, transformOrigin: "center" };
  if (/Bar/.test(name)) return { whileHover: { scaleY: 1.25 }, transformOrigin: "bottom" }; // bars grow up
  if (name === "Mail" || name === "Inbox") return { whileHover: { rotate: [0, -15, 0] }, transformOrigin: "center" }; // tilt & back
  if (name === "Settings") return { whileHover: { rotate: 90 }, transformOrigin: "center" };
  return { whileHover: { scale: 1.15 }, transformOrigin: "center" }; // default
}

function NavIcon({ Icon, className, wrapperClassName }: { Icon: LucideIcon; className?: string; wrapperClassName?: string }) {
  const { whileHover, transformOrigin } = getIconHover(Icon);
  return (
    <motion.div
      className={`inline-flex ${wrapperClassName ?? ""}`}
      style={{ transformOrigin }}
      whileHover={whileHover}
      transition={{ duration: 0.3, ease: "easeInOut" }}>
      <Icon className={className} />
    </motion.div>
  );
}

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
{ to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
{ to: "/lessons", icon: BookOpen, label: "Missions" },
{ to: "/lab", icon: FlaskConical, label: "Lab" },
{ to: "/stocks", icon: LineChart, label: "Stocks" },
{ to: "/micro-business", icon: Store, label: "Business" },
{ to: "/progress", icon: BarChart3, label: "Progress" },
{ to: "/leaderboard", icon: Trophy, label: "Leaderboard" }];


export default function GameNav() {
  const { jeffsHistory, lessonProgress, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth", { replace: true });
  };
  const { netWorth } = useNetWorth();
  const location = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);

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

            {/* Nav items — Resend-style sliding highlight */}
            <div
              className="hidden md:flex items-center gap-1"
              onMouseLeave={() => setHovered(null)}>

              {NAV_ITEMS.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onMouseEnter={() => setHovered(item.to)}
                    className="relative px-3 py-1.5 rounded-lg press-scale">

                    {/* Hover pill slides between non-active tabs */}
                    {hovered === item.to && !active &&
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-lg bg-muted/70"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />
                    }
                    {/* Active pill slides to the current tab on navigation */}
                    {active &&
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-primary shadow-glow"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                    }
                    <span
                      className={`relative z-10 flex items-center gap-2 text-sm font-medium transition-colors ${
                      active ? "text-primary-foreground" : "text-foreground/80"}`
                      }>

                      <NavIcon Icon={item.icon} className="w-4 h-4" />
                      {item.label}
                    </span>
                  </Link>);

              })}
            </div>

            {/* HUD pills */}
            <div className="flex items-center gap-2">
              {streak > 0 &&
              <div className="flex items-center gap-1 bg-orange-500/10 text-orange-500 px-2.5 py-1.5 rounded-xl text-xs font-bold border border-orange-500/15 shadow-sm press-scale cursor-default">
                  <Flame className="w-3.5 h-3.5" style={{ animation: 'streak-pulse 2s ease-in-out infinite' }} />
                  <span>{streak}d</span>
                </div>
              }
              <div className="flex items-center gap-1.5 bg-gold/10 text-gold px-2.5 py-1.5 rounded-xl text-xs font-bold border border-gold/15 shadow-sm press-scale cursor-default">
                <Coins className="w-3.5 h-3.5" />
                <span>{Math.floor(netWorth).toLocaleString()}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1.5 rounded-xl text-xs font-bold border border-primary/15 shadow-sm press-scale cursor-default">
                <Star className="w-3.5 h-3.5" />
                <span>Lv {level}</span>
              </div>
              <NotificationBell />
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground w-8 h-8 press-scale">
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
                <div className={`relative p-2 rounded-xl press-scale transition-colors ${active ? "text-primary-foreground" : "text-muted-foreground"}`}>
                  {active &&
                  <motion.span
                    layoutId="mobile-nav-pill"
                    className="absolute inset-0 rounded-xl bg-primary shadow-glow"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                  }
                  <NavIcon Icon={item.icon} className="w-5 h-5" wrapperClassName="relative z-10" />
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