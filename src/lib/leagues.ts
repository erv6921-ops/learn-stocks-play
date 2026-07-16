// Shared rank ladder — used by the Leaderboard and the Partners directory so a
// student's league/level reads the same everywhere. Tiers are derived purely
// from InvestiCoins actually earned (XP), so they're honest, not cosmetic.

export const LEVEL_THRESHOLDS = [0, 1000, 3000, 7000, 15000, 30000, 60000, 100000]

export function getLevel(xp: number) {
  let level = 1
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1; else break
  }
  return level
}

export const LEAGUES = [
  { name: "Bronze",   min: 0,      color: "#B87333", soft: "rgba(184,115,51,0.12)",  icon: "🥉" },
  { name: "Silver",   min: 3000,   color: "#8A9BB0", soft: "rgba(138,155,176,0.14)", icon: "🥈" },
  { name: "Gold",     min: 15000,  color: "#E3A008", soft: "rgba(227,160,8,0.14)",   icon: "🥇" },
  { name: "Diamond",  min: 30000,  color: "#3BA7C4", soft: "rgba(59,167,196,0.14)",  icon: "💎" },
  { name: "Champion", min: 60000,  color: "#E0457B", soft: "rgba(224,69,123,0.14)",  icon: "🏆" },
  { name: "Legend",   min: 100000, color: "#8B5CF6", soft: "rgba(139,92,246,0.16)",  icon: "👑" },
]

export function getLeagueIdx(xp: number) {
  let idx = 0
  for (let i = 0; i < LEAGUES.length; i++) if (xp >= LEAGUES[i].min) idx = i
  return idx
}

export function getLeague(xp: number) {
  return LEAGUES[getLeagueIdx(xp)]
}
