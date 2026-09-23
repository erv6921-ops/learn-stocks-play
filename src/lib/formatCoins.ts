// One rounding rule for InvestiCoins at DISPLAY time.
//
// The jeffs_history ledger is exact to the cent (stock buys spend fractional
// amounts) and jeffsBalance is the raw sum of it - deliberately unrounded, so
// repeated fractional trades never drift the real balance. The leaderboard RPCs
// ROUND() the same sum. Every surface that shows a coin number must therefore
// round the same way the server does, or "You" disagrees with the header by a
// coin and the leaderboard shows mixed decimals. Use these instead of ad-hoc
// Math.round / Math.floor / toLocaleString at each call site.

/** Whole-coin value, matching the server's ROUND(). Non-finite input reads as 0. */
export function roundCoins(n: number | string | null | undefined): number {
  const v = Number(n)
  return Math.round(Number.isFinite(v) ? v : 0)
}

/** Whole coins as a locale string, e.g. "1,235". */
export function formatCoins(n: number | string | null | undefined): string {
  return roundCoins(n).toLocaleString()
}
