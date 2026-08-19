// Shared text helpers for keeping AI-generated copy from looking AI-generated.
//
// Language models overuse em/en dashes, which is a giveaway that text was
// machine-written. Every AI prose path in the app (Jeff lesson teaching, the
// Micro-Business AI, Lab feedback) runs its output through stripDashes, and
// where we control the prompt we also append NO_DASH_RULE.

// Drop into a system prompt to tell the model to avoid dashes up front.
export const NO_DASH_RULE =
  'PUNCTUATION: Write with normal punctuation only. Never use em dashes or en dashes (the "—" or "–" characters). Where you would pause or add an aside, use a comma, a period, or parentheses instead. Overusing dashes makes writing look AI-generated, so avoid them entirely.'

// Strip any em/en dashes the model still emits: an em dash used for a pause
// becomes a comma; an en dash (usually a numeric range) becomes a hyphen.
export function stripDashes(s: string): string {
  return (s || "")
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s*–\s*/g, "-")
}
