// Topic search over the assignable lesson list. A teacher types what they
// want to teach ("how compound interest grows savings", "reading a paycheck")
// and the list narrows to the lessons about that topic, ranked. Nothing has
// to match the lesson title word for word: title, description, category and
// unit are all searched, and a small synonym table maps everyday phrasing
// onto the vocabulary the curriculum uses.

export interface SearchableLesson {
  id: string
  title: string
  description?: string
  category?: string
  unitTitle?: string
  /** Extra searchable text (e.g. a generated lesson's learning objectives). */
  keywords?: string[]
  /** True for a lesson Jeff built for this teacher (public.lessons row). */
  generated?: boolean
}

export interface RankedLesson<T extends SearchableLesson = SearchableLesson> {
  lesson: T
  score: number
}

const STOPWORDS = new Set([
  "a", "an", "the", "of", "to", "and", "or", "for", "in", "on", "at", "by", "with", "from", "into",
  "how", "what", "why", "when", "is", "are", "be", "do", "does", "can", "about", "my", "our", "i",
  "we", "you", "they", "it", "this", "that", "these", "those", "want", "need", "like", "would",
  "lesson", "lessons", "teach", "teaching", "learn", "learning", "students", "student", "class",
  "intro", "introduction", "basics", "basic", "explain", "understand", "understanding", "something",
  "some", "any", "more", "less", "vs", "versus", "their", "them", "his", "her", "kids", "should",
])

// Everyday phrasing -> curriculum vocabulary. Keys and values are stemmed.
const SYNONYMS: Record<string, string[]> = {
  interest: ["apr", "apy", "compound", "loan", "save"],
  compound: ["interest", "save", "grow"],
  apr: ["interest", "credit", "loan"],
  apy: ["interest", "save"],
  save: ["bank", "emergency", "fund", "account", "interest"],
  saving: ["bank", "emergency", "fund", "account", "interest"],
  emergency: ["save", "fund"],
  bank: ["check", "save", "account", "deposit"],
  account: ["bank", "check", "save"],
  budget: ["spend", "expense", "income", "plan", "money"],
  spend: ["budget", "money", "expense"],
  expense: ["budget", "spend"],
  money: ["psychology", "spend", "budget"],
  psychology: ["money", "behavior", "bias", "mindset"],
  mindset: ["psychology", "money"],
  bias: ["behavior", "psychology"],
  behavior: ["bias", "psychology", "consumer"],
  credit: ["debt", "loan", "score", "card", "borrow"],
  debt: ["credit", "loan", "borrow"],
  loan: ["borrow", "debt", "credit", "interest", "mortgage"],
  borrow: ["loan", "debt", "credit"],
  card: ["credit"],
  score: ["credit"],
  mortgage: ["loan", "home", "house"],
  home: ["mortgage", "rent", "house"],
  house: ["mortgage", "rent", "home"],
  rent: ["house", "budget"],
  tax: ["income", "paycheck", "withhold"],
  paycheck: ["income", "salary", "wage", "tax", "earn"],
  salary: ["income", "paycheck", "earn"],
  wage: ["income", "paycheck", "earn"],
  income: ["earn", "paycheck", "salary", "tax"],
  earn: ["income", "job", "career"],
  job: ["career", "earn", "income"],
  career: ["job", "earn", "income"],
  invest: ["stock", "portfolio", "fund", "etf", "bond", "return", "market"],
  stock: ["share", "equity", "market", "invest", "company"],
  share: ["stock", "equity"],
  equity: ["stock", "share"],
  market: ["stock", "exchange", "trade"],
  trade: ["market", "stock"],
  portfolio: ["diversif", "risk", "invest", "asset"],
  diversif: ["portfolio", "risk", "etf"],
  risk: ["diversif", "portfolio", "insur", "return"],
  return: ["invest", "risk", "growth"],
  bond: ["fix", "income", "yield", "treasury"],
  yield: ["bond", "interest"],
  fund: ["etf", "mutual", "index", "invest"],
  etf: ["fund", "index"],
  index: ["fund", "etf"],
  retire: ["401k", "ira", "invest", "save"],
  "401k": ["retire", "invest"],
  ira: ["retire", "invest"],
  inflation: ["price", "cpi", "macro", "rate"],
  rate: ["interest", "inflation", "fed"],
  fed: ["rate", "macro", "inflation"],
  macro: ["econom", "inflation", "gdp", "indicator"],
  gdp: ["indicator", "econom", "macro"],
  indicator: ["econom", "gdp", "unemploy"],
  unemploy: ["indicator", "econom", "job"],
  econom: ["supply", "demand", "macro", "market"],
  supply: ["demand", "econom", "price"],
  demand: ["supply", "econom", "price"],
  price: ["supply", "demand", "inflation", "valuation"],
  insur: ["risk", "premium", "deductible", "protect"],
  premium: ["insur"],
  deductible: ["insur"],
  protect: ["insur", "risk"],
  entrepreneur: ["business", "startup", "start"],
  startup: ["entrepreneur", "business"],
  business: ["entrepreneur", "company", "manag", "strateg"],
  company: ["business", "stock", "statement"],
  manag: ["business", "leadership"],
  leadership: ["manag", "business"],
  strateg: ["competit", "business", "analysis"],
  competit: ["strateg", "business"],
  marketing: ["customer", "product", "brand", "consumer"],
  brand: ["marketing", "product"],
  customer: ["marketing", "consumer"],
  consumer: ["customer", "behavior", "marketing"],
  ethic: ["responsib", "business"],
  statement: ["balance", "sheet", "income", "cash", "financial"],
  balance: ["sheet", "statement"],
  sheet: ["balance", "statement"],
  ratio: ["financial", "statement", "analysis"],
  valuation: ["value", "price", "earn", "pe"],
  value: ["valuation"],
  bubble: ["crash", "behavior", "market"],
  crash: ["bubble", "market"],
  college: ["student", "loan", "tuition"],
  tuition: ["college", "loan"],
  car: ["auto", "loan", "insur"],
  auto: ["car", "loan", "insur"],
  scam: ["fraud", "identity", "protect"],
  fraud: ["scam", "identity"],
  identity: ["fraud", "scam", "protect"],
  crypto: ["bitcoin", "alternativ", "asset"],
  bitcoin: ["crypto", "alternativ"],
  alternativ: ["crypto", "option", "real", "estate"],
  option: ["deriv", "alternativ"],
  plan: ["budget", "goal", "financial"],
  goal: ["plan", "save"],
}

// Words whose "-ing" form is its own topic, not a verb.
const NO_STEM = new Set(["marketing", "banking"])

/**
 * Light stemmer: lowercase, strip common suffixes (up to two passes) so
 * "investing" ~ "invest", "savings" ~ "saving" ~ "sav" ~ "save", "expenses" ~
 * "expense". Never shortens a word below three characters.
 */
export function stem(word: string): string {
  let w = word.toLowerCase()
  if (NO_STEM.has(w)) return w
  const RULES: [string, string, number][] = [
    ["ations", "", 6], ["ation", "", 6], ["ities", "ity", 7], ["ying", "y", 6], ["ies", "y", 5], ["ing", "", 5],
    ["ed", "", 5], ["es", "", 5], ["ly", "", 5], ["s", "", 4], ["e", "", 6],
  ]
  for (let pass = 0; pass < 2; pass++) {
    let changed = false
    for (const [suffix, replacement, min] of RULES) {
      if (w.length >= min && w.endsWith(suffix)) {
        const next = w.slice(0, -suffix.length) + replacement
        if (next.length < 3) break
        w = next
        changed = true
        break
      }
    }
    if (!changed) break
  }
  return w
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem)
}

/** Query tokens plus their synonym expansions (expansions score lower). */
export function expandQuery(query: string): { direct: string[]; related: string[] } {
  const direct = Array.from(new Set(tokenize(query)))
  const related = new Set<string>()
  for (const t of direct) {
    for (const key of Object.keys(SYNONYMS)) {
      // Exact stem, a longer word that starts with a (5+ char) key, or a
      // short stem that a key starts with ("sav" -> "save").
      if (t === key || (key.length >= 5 && t.startsWith(key)) || (t.length >= 3 && key.startsWith(t))) {
        for (const s of SYNONYMS[key]) if (!direct.includes(s)) related.add(s)
      }
    }
  }
  return { direct, related: Array.from(related) }
}

const FIELD_WEIGHTS = { title: 3, keywords: 2, category: 2, unitTitle: 1.5, description: 1.5 } as const

type Field = keyof typeof FIELD_WEIGHTS

function fieldTokens(lesson: SearchableLesson): Record<Field, string[]> {
  return {
    title: tokenize(lesson.title),
    keywords: tokenize((lesson.keywords ?? []).join(" ")),
    category: tokenize((lesson.category ?? "").replace(/-/g, " ")),
    unitTitle: tokenize(lesson.unitTitle ?? ""),
    description: tokenize(lesson.description ?? ""),
  }
}

/** 1 for an exact token match, 0.7 for a prefix match either way, else 0. */
function tokenMatch(q: string, t: string): number {
  if (q === t) return 1
  if (q.length >= 3 && t.length >= 3 && (t.startsWith(q) || q.startsWith(t))) return 0.7
  return 0
}

/**
 * Ranks lessons by how well they match a topic description. Returns only
 * lessons with some evidence of a match, best first. An empty query returns
 * every lesson in its original order with score 0, so the picker still works
 * as a plain list.
 */
export function rankLessons<T extends SearchableLesson>(lessons: T[], query: string): RankedLesson<T>[] {
  const q = query.trim()
  if (!q) return lessons.map((lesson) => ({ lesson, score: 0 }))
  const { direct, related } = expandQuery(q)
  if (direct.length === 0) return lessons.map((lesson) => ({ lesson, score: 0 }))
  const phrase = q.toLowerCase()

  const ranked: RankedLesson<T>[] = []
  lessons.forEach((lesson, index) => {
    const fields = fieldTokens(lesson)
    let score = 0
    let directHits = 0
    for (const qt of direct) {
      let best = 0
      for (const f of Object.keys(fields) as Field[]) {
        for (const t of fields[f]) {
          const m = tokenMatch(qt, t) * FIELD_WEIGHTS[f]
          if (m > best) best = m
        }
      }
      if (best > 0) directHits++
      score += best
    }
    for (const rt of related) {
      let best = 0
      for (const f of Object.keys(fields) as Field[]) {
        for (const t of fields[f]) {
          const m = tokenMatch(rt, t) * FIELD_WEIGHTS[f] * 0.35
          if (m > best) best = m
        }
      }
      score += best
    }
    if (score <= 0) return
    // Coverage: matching most of what the teacher typed beats matching one word many ways.
    score += (directHits / direct.length) * 3
    if (phrase.length >= 4 && lesson.title.toLowerCase().includes(phrase)) score += 4
    // Stable tiebreak on curriculum order.
    ranked.push({ lesson, score: score - index * 1e-6 })
  })
  ranked.sort((a, b) => b.score - a.score)
  return ranked
}

/** True when the query is specific enough that "no results" means the topic is missing. */
export function isMeaningfulQuery(query: string): boolean {
  return tokenize(query).length > 0
}
