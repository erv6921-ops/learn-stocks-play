// GameNav — top bar + slide-out sidebar.
//
// Layout: hamburger (left) opens a sidebar with every page link; the
// InvestiPlay wordmark sits dead-center; InvestiCoins, notifications and the
// profile avatar stay pinned top-right. Everything else (nav links, Find
// friends, streak, logout) lives in the sidebar so the top bar never crams.
//
// The Jeff tour spotlights nav links inside the sidebar: JeffTour dispatches an
// "investiplay:nav-menu" window event before each step, and we open/close the
// menu to match so the anchored element is actually on screen.

import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useNetWorth } from "@/hooks/useNetWorth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Wordmark } from "@/components/Wordmark";
import NotificationBell from "@/components/NotificationBell";
import { getInitials } from "@/lib/playerStats";
import { anchor } from "@/lib/tourAnchors";
import AnimatedNumber from "@/components/AnimatedNumber";
import {
  LayoutDashboard, BookOpen, LineChart, Coins, LogOut,
  Flame, Store, BarChart3, Trophy, FlaskConical, Landmark,
  Users, Swords, Menu, X } from
"lucide-react";

const MEANINGFUL_REASONS = ["lesson", "quiz", "mission", "assessment", "bought", "sold", "unit test"];

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
{ to: "/leaderboard", icon: Trophy, label: "Leaderboard", tour: "nav-leaderboard" },
{ to: "/challenges", icon: Swords, label: "Challenges", tour: "nav-challenges" },
{ to: "/partners", icon: Users, label: "Find Friends", tour: "nav-partners" }];


export default function GameNav() {
  const { jeffsHistory, logout, user } = useApp();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/auth", { replace: true });
  };
  const { netWorth } = useNetWorth();
  const location = useLocation();

  const streak = useMemo(() => getStreak(jeffsHistory), [jeffsHistory]);

  const isActive = (to: string) =>
  to === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(to);

  // Close the menu whenever we land on a new page.
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Let the Jeff tour open/close the sidebar so it can spotlight nav links.
  useEffect(() => {
    const onTour = (e: Event) => setMenuOpen(!!(e as CustomEvent).detail?.open);
    window.addEventListener("investiplay:nav-menu", onTour);
    return () => window.removeEventListener("investiplay:nav-menu", onTour);
  }, []);

  // Lock page scroll while the sidebar is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  return (
    <>
      {/* Top bar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-between h-16">
            {/* Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setMenuOpen(o => !o)}
              className="nav-bounce"
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Centered wordmark */}
            <Link
              to="/dashboard"
              className="absolute left-1/2 -translate-x-1/2 flex items-center group"
            >
              <Wordmark className="text-xl md:text-2xl transition-transform duration-200 group-hover:scale-[1.02]" />
            </Link>

            {/* Top-right: coins, notifications, profile */}
            <div className="flex items-center gap-2">
              <div ref={anchor("hud-coins")} className="flex items-center gap-1.5 bg-gold/10 text-gold px-2.5 py-1.5 rounded-xl text-xs font-bold border border-gold/15 shadow-sm nav-bounce cursor-default">
                <Coins className="w-3.5 h-3.5" />
                <span><AnimatedNumber value={Math.floor(netWorth)} /></span>
              </div>
              <NotificationBell />
              <Link to="/profile" aria-label="Your profile" title="Your profile" ref={anchor("hud-profile")}>
                <Avatar className="w-8 h-8 border border-border nav-bounce cursor-pointer ring-offset-background hover:ring-2 hover:ring-primary/40 transition-shadow">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {getInitials(user?.firstName, user?.lastName)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-[2px]"
            />
            {/* Panel */}
            <motion.aside
              key="nav-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-[60] w-72 max-w-[85vw] bg-background border-r border-border flex flex-col"
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-border">
                <Wordmark className="text-xl" />
                <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Streak */}
              {streak > 0 && (
                <div className="px-4 pt-4">
                  <div ref={anchor("hud-streak")} className="flex items-center gap-2 bg-orange-500/10 text-orange-500 px-3 py-2 rounded-xl text-sm font-bold border border-orange-500/15">
                    <Flame className="w-4 h-4" style={{ animation: 'streak-pulse 2s ease-in-out infinite' }} />
                    <span>{streak} day streak</span>
                  </div>
                </div>
              )}

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.to);
                  return (
                    <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
                      <div
                        ref={anchor(item.tour)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Logout */}
              <div className="p-3 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Log out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>);

}
