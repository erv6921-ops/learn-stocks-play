// Tiny profanity filter for student-to-student notes. Intentionally basic — a
// last-line-of-defence for the ≤140-char note that rides along with a shared
// card, not a full moderation system (reports + teacher visibility cover the
// rest). Matches whole words and common leet spellings, case-insensitively.

const BAD_WORDS = [
  "anal", "arse", "ass", "asshole", "bastard", "bitch", "bollocks", "boner",
  "boob", "cock", "cnut", "crap", "cum", "cunt", "damn", "dick", "dildo",
  "douche", "dyke", "fag", "faggot", "fuck", "fucker", "fuk", "goddamn",
  "handjob", "hoe", "horny", "jerk", "jizz", "kike", "nigga", "nigger",
  "nutsack", "penis", "piss", "prick", "pussy", "queer", "retard", "rimjob",
  "shit", "slut", "spic", "tit", "titties", "twat", "vagina", "wank", "whore",
]

// Map leet characters back to letters so "sh1t" / "f@ck" are still caught.
const LEET: Record<string, string> = {
  "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "@": "a", "$": "s",
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[013457@$]/g, (c) => LEET[c] ?? c)
    // collapse repeated letters ("fuuuck" -> "fuck") for whole-word matching
    .replace(/(.)\1{2,}/g, "$1$1")
}

const WORD_RE = new RegExp(`\\b(${BAD_WORDS.join("|")})\\b`, "i")

/** True when the note contains a blocked word. */
export function containsProfanity(text: string): boolean {
  if (!text) return false
  return WORD_RE.test(normalize(text))
}

/** Replaces any blocked word with asterisks (kept for optional soft-filtering). */
export function cleanProfanity(text: string): string {
  if (!text) return text
  // Work on the original text but test each token against its normalized form so
  // the visible characters are preserved except for the mask.
  return text.replace(/[^\s]+/g, (token) => {
    const bare = token.replace(/^[^\p{L}\p{N}@$]+|[^\p{L}\p{N}@$]+$/gu, "")
    if (bare && containsProfanity(bare)) {
      return token.replace(bare, "*".repeat(bare.length))
    }
    return token
  })
}

export const NOTE_MAX_LENGTH = 140
