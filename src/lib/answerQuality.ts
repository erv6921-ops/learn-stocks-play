// Low-effort answer detector. Catches lazy/gibberish free-text submissions -
// single-letter word spam ("a a b c"), keyboard mashing ("asdfgh"), repeated
// characters ("llll"), or spamming one word - so kids can't just click submit
// on junk. Heuristic and offline (no AI call); intentionally lenient so a real
// short answer never gets blocked.

export function looksLowEffort(text: string): boolean {
  const t = (text || "").trim();
  if (!t) return true;
  const words = t.split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;

  const letters = (w: string) => w.replace(/[^a-zA-Z]/g, "");

  // Mostly 1-2 letter "words" ("a a b c d").
  const tiny = words.filter((w) => letters(w).length <= 2).length;
  if (words.length >= 3 && tiny / words.length > 0.6) return true;

  // Average word length implausibly short.
  const avgLen = words.reduce((s, w) => s + w.length, 0) / words.length;
  if (words.length >= 4 && avgLen < 2.5) return true;

  // Keyboard mashing: longer tokens with no vowel or 3+ repeated chars.
  const mashed = words.filter((w) => {
    const l = letters(w);
    if (l.length < 4) return false;
    return !/[aeiou]/i.test(l) || /(.)\1{2,}/.test(l);
  }).length;
  if (mashed / words.length > 0.4) return true;

  // Spamming one word ("good good good good good").
  const uniq = new Set(words.map((w) => w.toLowerCase())).size;
  if (words.length >= 5 && uniq / words.length < 0.4) return true;

  return false;
}

/** Friendly nudge shown when an answer looks low-effort. */
export const LOW_EFFORT_MESSAGE = "Give it a real try! Write a proper answer - not just random letters.";
