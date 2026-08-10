// GameNav - top bar + slide-out sidebar.
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
import { NAV_ICON_COMPONENTS } from "@/components/nav/AnimatedNavIcons";

const MEANINGFUL_REASONS = ["lesson", "quiz", "mission", "assessment", "bought", "sold", "unit test"];

// Compact large balances (e.g. 12,300 → "12.3K") so the coin pill stays narrow
// on phones and never widens the top-right cluster into the centered wordmark.
const compactBalance = (n: number) =>
  Math.abs(n) >= 10_000
    ? Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n)
    : n.toLocaleString();

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

// Every page shares the app's themed accent tint, so the whole menu stays
// cohesive with the chosen color.
const NAV_ITEMS = [
{ to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", tour: "nav-dashboard", tint: "var(--brand)" },
{ to: "/lessons", icon: BookOpen, label: "Missions", tour: "nav-lessons", tint: "var(--brand)" },
{ to: "/lab", icon: FlaskConical, label: "Lab", tour: "nav-lab", tint: "var(--brand)" },
{ to: "/stocks", icon: LineChart, label: "Stocks", tour: "nav-stocks", tint: "var(--brand)" },
{ to: "/micro-business", icon: Store, label: "Business", tour: "nav-business", tint: "var(--brand)" },
{ to: "/bank", icon: Landmark, label: "Bank", tour: "nav-bank", tint: "var(--brand)" },
{ to: "/progress", icon: BarChart3, label: "Progress", tour: "nav-progress", tint: "var(--brand)" },
{ to: "/leaderboard", icon: Trophy, label: "Leaderboard", tour: "nav-leaderboard", tint: "var(--brand)" },
{ to: "/challenges", icon: Swords, label: "Challenges", tour: "nav-challenges", tint: "var(--brand)" },
{ to: "/partners", icon: Users, label: "Find Partners", tour: "nav-partners", tint: "var(--brand)" }];


export default function GameNav() {
  const { jeffsHistory, logout, user, jeffsBalance } = useApp();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/auth", { replace: true });
  };
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
              <Wordmark className="text-lg min-[400px]:text-xl md:text-2xl transition-transform duration-200 group-hover:scale-[1.02]" />
            </Link>

            {/* Top-right: coins, notifications, profile */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div ref={anchor("hud-coins")} className="flex items-center gap-1.5 bg-gold/10 text-gold px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold border border-gold/15 shadow-sm nav-bounce cursor-default">
                <Coins className="w-3.5 h-3.5 shrink-0" />
                {/* Compact on phones (keeps the pill narrow), full number on larger screens. */}
                <span className="sm:hidden tabular-nums"><AnimatedNumber value={Math.round(jeffsBalance)} format={compactBalance} /></span>
                <span className="hidden sm:inline tabular-nums"><AnimatedNumber value={Math.round(jeffsBalance)} /></span>
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
              exit={{ x: "-100%", transition: { type: "tween", duration: 0.18, ease: "easeIn" } }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="fixed inset-y-0 left-0 z-[60] w-72 max-w-[85vw] bg-background border-r border-border flex flex-col shadow-2xl"
            >
              {/* Sidebar header - deep brand gradient (follows theme) with the player's card */}
              <div
                className="relative px-4 pt-4 pb-4 overflow-hidden"
                style={{ background: "var(--brand-deep)" }}
              >
                <div className="flex items-center justify-between">
                  <Wordmark className="text-xl !text-white" />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                    className="nav-bounce text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <Avatar className="w-10 h-10 border-2 border-white/25 shadow-md">
                    <AvatarFallback className="bg-white/15 text-white text-sm font-extrabold">
                      {getInitials(user?.firstName, user?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-white truncate">
                      {[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Player"}
                    </p>
                    {streak > 0 ? (
                      <p ref={anchor("hud-streak")} className="text-xs font-bold text-orange-300 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" style={{ animation: 'streak-pulse 2s ease-in-out infinite' }} />
                        {streak} day streak
                      </p>
                    ) : (
                      <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.78)" }}>Ready to play</p>
                    )}
                  </div>
                </div>
                {/* soft glow flourish */}
                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              </div>

              {/* Nav links - staggered entrance, bouncy hover */}
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {NAV_ITEMS.map((item, idx) => {
                  const active = isActive(item.to);
                  const AnimIcon = NAV_ICON_COMPONENTS[item.to] ?? item.icon;
                  return (
                    <motion.div
                      key={item.to}
                      // hover propagates the "hover" variant down to the icon's
                      // moving parts (see AnimatedNavIcons); the entry animation
                      // rides the same variants (hidden → rest).
                      variants={{ hidden: { opacity: 0, x: -18 }, rest: { opacity: 1, x: 0 }, hover: {} }}
                      initial="hidden"
                      animate="rest"
                      whileHover="hover"
                      transition={{ delay: 0.04 + idx * 0.03, type: "spring", stiffness: 420, damping: 30 }}
                    >
                      <Link to={item.to} onClick={() => setMenuOpen(false)}>
                        <div
                          ref={anchor(item.tour)}
                          className={`nav-bounce flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                            active
                              ? "bg-primary text-primary-foreground shadow-glow"
                              : "text-foreground/80 hover:text-foreground hover:bg-muted/70"
                          }`}
                        >
                          <span
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform"
                            style={active
                              ? { background: "rgba(255,255,255,0.18)", color: "#fff" }
                              : { background: `${item.tint}1A`, color: item.tint }}
                          >
                            <AnimIcon className="w-[18px] h-[18px]" />
                          </span>
                          {item.label}
                          {active && (
                            <motion.span
                              layoutId="nav-active-dot"
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground"
                            />
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Logout */}
              <div className="p-3 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="nav-bounce w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-muted/60">
                    <LogOut className="w-[18px] h-[18px]" />
                  </span>
                  Log out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>);

}
