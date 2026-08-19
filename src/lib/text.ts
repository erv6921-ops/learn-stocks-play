// Shared text helpers for keeping AI-generated copy from looking AI-generated.
//
// Language models overuse em/en dashes, which is a giveaway that text was
// machine-written. Every AI prose path in the app (Jeff lesson teaching, the
// Micro-Business AI, Lab feedback) runs its output through stripDashes, and
// where we control the prompt we also append NO_DASH_RULE.

// Drop into a system prompt to tell the model to avoid dashes up front.
export const NO_DASH_RULE =
  'PUNCTUATION: Write with normal punctuation only. Never use em dashes or en dashes (the "—" or "–" characters), and do NOT substitute a spaced hyphen ( - ) as a stand-in dash. Where you would pause or add an aside, use a comma, a period, or parentheses instead. Overusing dashes makes writing look AI-generated, so avoid them entirely.'

// Strip the em/en dashes the model uses as a pause so text never looks
// AI-written. These characters are never math (math uses a hyphen/minus), so
// this is safe: an em/en dash pause becomes a comma, and a numeric range like
// "3–5" keeps a tight hyphen. Spaced-hyphen pauses are handled by NO_DASH_RULE
// in the prompt rather than here, so real math ("Revenue - Costs") is untouched.
export function stripDashes(s: string): string {
  return (s || "")
    .replace(/(\d)\s*[–—]\s*(\d)/g, "$1-$2")
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s*–\s*/g, ", ")
}
