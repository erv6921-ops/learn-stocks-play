// Gamification level derived from the student's InvestiCoins balance.
//
// This is deliberately DISTINCT from getCurriculumLevel() in playerStats.ts:
// that level tracks how much of the curriculum a student has completed (used
// in the HUD), whereas this one is purely coin-based so we can fire the
// celebratory "LEVEL UP!" moment whenever the balance crosses the next
// boundary (e.g. after a good quiz streak).

// Coins needed to advance one level. Roughly one level per lesson's worth of
// correct answers - frequent enough to feel rewarding, rare enough that the
// full-screen celebration never interrupts every few questions.
export const COINS_PER_LEVEL = 2500

// Level 1 starts at 0 coins. Each additional COINS_PER_LEVEL bumps the level by
// one. Never returns below 1.
export function xpLevelForCoins(coins: number): number {
  const safe = Number.isFinite(coins) && coins > 0 ? coins : 0
  return Math.floor(safe / COINS_PER_LEVEL) + 1
}

// Coins still needed to reach the next level (for optional progress UI).
export function coinsToNextLevel(coins: number): number {
  const safe = Number.isFinite(coins) && coins > 0 ? coins : 0
  return COINS_PER_LEVEL - (safe % COINS_PER_LEVEL)
}
