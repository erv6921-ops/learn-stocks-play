// jeffChatLesson - client wrapper + prompt assembly for the "Chat with Jeff"
// lesson experience (edge function: jeff-chat). Jeff teaches the lesson
// conversationally; the student replies via tappable options.
import { supabase } from "@/integrations/supabase/client"
import type { Lesson, LessonSection } from "@/types"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export const END_SIGNAL = "Ready to test what you learned?"

// Opening hook questions per lesson topic, each with reply options that
// actually ANSWER that question (so the first tap never feels irrelevant).
// Matched against the lesson's category (specific ids first, then keyword
// families).
interface Hook { question: string; answers: string[] }

// Small stable hash so each lesson deterministically lands on one option.
function hashId(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

// A second, independent hash so we can make several independent-but-stable
// choices per lesson (style, hook, framing) without them all lining up.
function hashId2(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

// Many hooks per topic so lessons in the same category don't all open with the
// identical question. Every hook's answers actually answer its question. The
// one shown is chosen deterministically from the lesson id (see openingHook) -
// varied across lessons, but stable for a given lesson so its question and
// tappable answers always match. Uniqueness across the ~330 lessons is then
// guaranteed by weaving lesson-specific detail into the framing (see below).
const CATEGORY_HOOKS: [RegExp, Hook[]][] = [
  [/delayed|gratification|instant/, [
    { question: "would you rather have $50 today or $100 in a month?", answers: ["$50 today, easy", "$100 in a month", "Hmm, depends"] },
    { question: "ever bought something instantly and regretted it an hour later?", answers: ["Way too often 😅", "Once or twice", "Nope, I'm disciplined"] },
    { question: "could you wait a whole week to buy something you really want?", answers: ["No chance", "Maybe", "Easily"] },
    { question: "what's harder for you - saving money or waiting for it to grow?", answers: ["Saving it", "Waiting", "Both, honestly"] },
    { question: "if a snooze button gave you $20 each morning, would you skip it?", answers: ["No way, I'd snooze", "Yeah, take the $20", "Depends on the day"] },
  ]],
  [/psychology-of-money|behavioral/, [
    { question: "if you got $100 right now, what's the FIRST thing you'd do with it?", answers: ["Spend it on something fun 🛍️", "Save every penny", "Half spend, half save"] },
    { question: "do you spend more when you pay with a card instead of cash?", answers: ["Definitely card", "Never noticed", "Cash feels more real"] },
    { question: "what's one thing you ALWAYS talk yourself into buying?", answers: ["Snacks 🍟", "Clothes or shoes", "Games and apps"] },
    { question: "does a sale price make you buy stuff you didn't even want?", answers: ["Every single time", "Sometimes", "Nope, I resist"] },
    { question: "do your feelings ever decide how you spend money?", answers: ["Way more than I'd admit", "A little", "I keep it logical"] },
  ]],
  [/budget/, [
    { question: "do you actually know where your money goes every month?", answers: ["Yeah, pretty much", "Not really 😅", "I don't track anything"] },
    { question: "if your money vanished tomorrow, could you say what you spent it on?", answers: ["Not a clue", "Roughly", "Yeah, all of it"] },
    { question: "what eats up most of your money right now?", answers: ["Food", "Fun stuff", "Honestly no idea"] },
    { question: "do you have a plan for your money, or does it just... disappear?", answers: ["It disappears 😅", "Kind of a plan", "Yeah, I've got a system"] },
    { question: "how much of last week's money could you get back if you tried?", answers: ["None of it", "Some of it", "Most of it"] },
  ]],
  [/banking/, [
    { question: "do you know how banks make money off your savings account?", answers: ["No idea honestly", "They charge fees, right?", "They invest it somehow?"] },
    { question: "what's the actual difference between checking and savings?", answers: ["Not sure", "One earns interest?", "I know this one"] },
    { question: "ever been surprised by a random bank fee?", answers: ["Ugh, yes", "Not yet", "Wait, what fees?"] },
    { question: "is your money safer in a bank or under your mattress?", answers: ["Bank, obviously", "Mattress lol", "Wait, are banks even safe?"] },
    { question: "why would a bank pay YOU to keep money there?", answers: ["No clue", "So they can lend it out?", "They don't, do they?"] },
  ]],
  [/credit|debt/, [
    { question: "did you know your credit score can affect your rent, job, and even phone plan?", answers: ["Wait, seriously?", "Yeah, I knew that", "What even is a credit score?"] },
    { question: "is a credit card free money or a trap?", answers: ["Kinda both?", "A trap", "Free money 😏"] },
    { question: "what happens if you only pay the minimum on a credit card?", answers: ["No idea", "It piles up?", "Nothing bad?"] },
    { question: "would you borrow $10 if paying it back cost you $13?", answers: ["No way", "If I really needed it", "Wait, why does it cost more?"] },
    { question: "does owing money always mean you messed up?", answers: ["Pretty much", "Not always", "I honestly don't know"] },
  ]],
  [/invest|stock|portfolio|etf|bond|fund|valuation|ratio|financial-statement/, [
    { question: "if I told you $100 invested at 17 beats $1,000 invested at 30, would you believe me?", answers: ["No way, prove it", "I'd believe it", "How does that work?"] },
    { question: "is investing basically just gambling?", answers: ["Feels like it", "No, it's different", "Explain the difference"] },
    { question: "where does your money actually GO when you buy a stock?", answers: ["No clue", "You own part of a company?", "Somewhere magic ✨"] },
    { question: "could your money make money while you literally sleep?", answers: ["That sounds fake", "Yeah, I've heard that", "Show me how"] },
    { question: "would you rather own $100 of a company or lend it $100?", answers: ["Own it", "Lend it", "What's the difference?"] },
  ]],
  [/tax/, [
    { question: "how much of a $15/hr paycheck do you actually take home?", answers: ["All of it… right?", "Like $12/hr maybe?", "No clue honestly"] },
    { question: "why does your paycheck come out smaller than you expected?", answers: ["Taxes?", "No idea", "Some kind of fees"] },
    { question: "ever wonder where the money taken out of a paycheck goes?", answers: ["Yeah, actually", "Not really", "Roads and stuff?"] },
  ]],
  [/insurance/, [
    { question: "what would happen if you crashed a car tomorrow with no insurance?", answers: ["I'd be in big trouble", "My parents would cover it?", "Never thought about it"] },
    { question: "is insurance a waste of money or a lifesaver?", answers: ["Waste", "Lifesaver", "No idea"] },
    { question: "would you pay $50 a month to avoid a surprise $5,000 bill?", answers: ["Yeah, worth it", "Seems like a lot", "Depends"] },
    { question: "why would you pay for something hoping you NEVER use it?", answers: ["That makes no sense", "For peace of mind?", "Huh, good question"] },
  ]],
  [/entrepreneur|business|market|leadership|strategy|pestel|ethics|consumer/, [
    { question: "what's one problem at your school nobody's solved yet?", answers: ["Ooh, I've got ideas", "Let me think about that", "Why does that matter?"] },
    { question: "if you started a business tomorrow, what would you sell?", answers: ["I've got an idea", "No clue", "Something food-related 🍔"] },
    { question: "why do some businesses blow up while others flop?", answers: ["Luck?", "The product", "Marketing?"] },
    { question: "would you rather run the business or own a piece of it?", answers: ["Run it", "Own a piece", "Both?"] },
    { question: "what makes you pick one brand over another that's basically the same?", answers: ["The vibe", "The price", "Honestly no idea"] },
  ]],
  [/econ|macro|indicator|supply|demand|micro/, [
    { question: "why does the same candy bar cost more some years than others?", answers: ["Inflation?", "No idea", "Stores being greedy?"] },
    { question: "who decides the price of, like, everything?", answers: ["The government?", "Buyers and sellers?", "No clue"] },
    { question: "when everyone wants the new sneaker, what happens to the price?", answers: ["It goes up", "It stays put", "Wait, why?"] },
  ]],
]

// Dedicated, hand-written opening hooks for specific lessons. The shared category
// pools are small, so units with many lessons (e.g. Portfolio Construction has
// 10) kept reusing the same handful of questions. When a lesson id appears here
// it ALWAYS opens with this exact hook (see rawHook + openerStyle), so every
// lesson in the unit gets a distinct opener. Each unit's set must be internally
// unique. Answers must actually answer the question (first tap never irrelevant).
const LESSON_HOOKS: Record<string, Hook> = {
  // Unit 10 - Portfolio Construction: one unique hook per lesson.
  "portfolio-1":  { question: "if you had $1,000 to invest, would you dump it all into one stock or spread it around?", answers: ["All in one 🎯", "Spread it around", "Depends on the stock"] },
  "portfolio-2":  { question: "if your investments dropped 30% overnight, would you sell, hold, or buy more?", answers: ["Sell, I'd panic", "Hold and wait", "Buy the dip 😤"] },
  "portfolio-3":  { question: "does \"don't put all your eggs in one basket\" actually apply to money?", answers: ["Totally", "Kinda cliché", "Explain how"] },
  "portfolio-4":  { question: "smarter to invest $1,200 all at once, or $100 every month for a year?", answers: ["All at once", "$100 monthly", "No idea honestly"] },
  "portfolio-5":  { question: "if one investment grew way bigger than the rest, would you leave it or trim it back?", answers: ["Leave it, it's winning", "Trim it back", "Why trim a winner?"] },
  "portfolio-6":  { question: "could buying a tiny slice of 500 companies at once beat picking your own?", answers: ["No way", "Probably yeah", "How's that possible?"] },
  "portfolio-7":  { question: "do you think a pro stock-picker can reliably beat the whole market?", answers: ["Definitely", "Probably not", "Isn't that their job?"] },
  "portfolio-8":  { question: "how would you even know if your investing is actually working?", answers: ["Check if it's up", "Compare it to something", "No clue"] },
  "portfolio-9":  { question: "what's your plan if the market crashes right when you need the money?", answers: ["Don't have one 😬", "Keep some cash safe", "Panic, probably"] },
  "portfolio-10": { question: "think you could actually become a millionaire on a normal salary?", answers: ["No chance", "Maybe, slowly", "Show me the math"] },
}

// Topic-agnostic fallbacks when a lesson matches no category above. These use
// the lesson title so they're already tailored per lesson.
const GENERIC_HOOKS: ((title: string) => Hook)[] = [
  (t) => ({ question: `what do you already know about ${t.toLowerCase()}?`, answers: ["Basically nothing", "A little bit", "Quite a bit actually"] }),
  () => ({ question: "be honest - how confident are you with money stuff?", answers: ["Not at all 😅", "Kinda", "Pretty confident"] }),
  (t) => ({ question: `on a scale of "huh?" to "got it," where are you with ${t.toLowerCase()}?`, answers: ["Total huh?", "Somewhere in the middle", "Pretty solid"] }),
  () => ({ question: "want the quick version or the full breakdown?", answers: ["Quick version", "Full breakdown", "Surprise me"] }),
]

// Ways to frame a question so the SAME underlying hook reads differently across
// lessons. Each keeps the answer options valid - they only change the wording
// that leads into the question, never the question's actual ask.
// Every framing includes the lesson title, and titles are unique across the
// curriculum - so the framed question is guaranteed unique per lesson even when
// two lessons happen to share the same underlying hook.
const QUESTION_FRAMINGS: ((title: string, q: string) => string)[] = [
  (t, q) => `Before we get into ${t.toLowerCase()} - ${q}`,
  (t, q) => `Real quick, thinking about ${t.toLowerCase()}: ${q}`,
  (t, q) => `Okay, ${t.toLowerCase()} gut check - ${q}`,
  (t, q) => `Here's a ${t.toLowerCase()} warm-up: ${q}`,
  (t, q) => `We're on ${t.toLowerCase()} today. First though: ${q}`,
  (t, q) => `To kick off ${t.toLowerCase()}, tell me - ${q}`,
  (t, q) => `${t.toLowerCase()} is up next, but real talk first - ${q}`,
]

// The raw (unframed) hook for a lesson - stable per id. Exposed so callers that
// only need the answers can get them without the lesson-specific framing.
function rawHook(lesson: Lesson): Hook {
  const dedicated = LESSON_HOOKS[lesson.id]
  if (dedicated) return dedicated
  const hay = `${lesson.category} ${lesson.title.toLowerCase()}`
  const idx = hashId(lesson.id)
  for (const [re, hooks] of CATEGORY_HOOKS) {
    if (re.test(hay)) return hooks[idx % hooks.length]
  }
  return GENERIC_HOOKS[idx % GENERIC_HOOKS.length](lesson.title)
}

// The opening hook shown to a lesson: the raw hook's answers, plus a question
// framed with lesson-specific detail so no two lessons pose the identical
// question. Deterministic per id, so the question and its answers always match.
export function openingHook(lesson: Lesson): Hook {
  const { question, answers } = rawHook(lesson)
  const framing = QUESTION_FRAMINGS[hashId2(lesson.id) % QUESTION_FRAMINGS.length]
  return { question: framing(lesson.title, question), answers }
}

// Jeff already introduced himself in onboarding, so lessons skip the "I'm Jeff"
// every time. Instead he rolls in casually - sometimes fresh off some random
// activity. This flavor line is purely cosmetic (carries no answer dependency),
// so it's fine to pick at random. It does NOT announce the topic - whatever
// follows (a question, a fact, or a straight dive) handles that.
const LESSON_OPENERS: string[] = [
  "Just got back from a run 🏃",
  "Phew, just finished a pickup basketball game 🏀",
  "Was out on a walk, but I'm back 🚶",
  "Just grabbed a snack 🍎",
  "Fresh off beating my high score 🎮",
  "Just wrapped up a quick nap 😴",
  "Back from the gym 💪",
  "Just made myself a smoothie 🥤",
  "Okay, I'm all yours.",
  "Alright, ready when you are.",
  "",
]

// "Dive straight in" openers - no question, just start teaching the topic.
const DIVE_OPENERS: ((title: string) => string)[] = [
  (t) => `Today we're doing ${t} - and I promise it's more useful than it sounds.`,
  (t) => `Let's get into ${t}. I'll keep it quick and actually make it click.`,
  (t) => `${t}. This is one of those things that seems boring until it saves you money.`,
  (t) => `Alright - ${t}. Stick with me, this one's genuinely worth knowing.`,
  (t) => `Time for ${t}. By the end of this you'll get why it matters.`,
]

// "Surprising fact/statement" openers keyed by topic. These make a bold claim
// instead of asking anything, so their options are neutral (continue-style).
const FACT_HOOKS: [RegExp, ((title: string) => string)[]][] = [
  [/delayed|gratification|instant|psychology-of-money|behavioral/, [
    () => `Wild fact: most people spend more the second money hits their account - and never notice.`,
    () => `Here's the truth - your brain is basically wired to want stuff NOW, even when waiting pays way more.`,
  ]],
  [/budget/, [
    () => `Most people underestimate their spending by like 30%. A budget just... shows you the truth.`,
    () => `Fun fact: writing down where your money goes changes how you spend it - before you even try.`,
  ]],
  [/banking/, [
    () => `Here's something banks don't advertise: they lend out YOUR deposited money and keep most of the profit.`,
    () => `Wild one - the average person loses hundreds a year to fees they didn't even know existed.`,
  ]],
  [/credit|debt/, [
    () => `Here's the scary part: a single number - your credit score - can decide your rent, your job, even your phone plan.`,
    () => `Fun fact: minimum payments are designed so you stay in debt as long as possible.`,
  ]],
  [/invest|stock|portfolio|etf|bond|fund|valuation|ratio|financial-statement/, [
    () => `Here's the crazy part: $100 invested young can beat $1,000 invested later. Time does the heavy lifting.`,
    () => `Wild truth - when you buy a stock, you literally own a slice of a real company.`,
  ]],
  [/tax/, [
    () => `Here's the surprise in your first paycheck: the number on the offer letter is NOT what lands in your account.`,
  ]],
  [/insurance/, [
    () => `Weird truth about insurance: you pay hoping to never use it - and that's exactly the point.`,
  ]],
  [/entrepreneur|business|market|leadership|strategy|pestel|ethics|consumer/, [
    () => `Here's the thing - most businesses don't fail from bad ideas. They fail from problems nobody actually had.`,
    () => `Fun fact: the brand you "just prefer" was probably engineered to feel that way.`,
  ]],
  [/econ|macro|indicator|supply|demand|micro/, [
    () => `Here's a mind-bender: nobody sets most prices. Millions of tiny buyer-and-seller decisions do.`,
  ]],
]

const GENERIC_FACTS: ((title: string) => string)[] = [
  (t) => `Quick heads up on ${t.toLowerCase()}: it's one of those skills that quietly separates people who stress about money from people who don't.`,
  (t) => `Here's why ${t.toLowerCase()} matters - small money habits now snowball into huge differences later.`,
]

type OpenerStyle = "question" | "fact" | "dive"

// Deterministic opener style per lesson - so the same lesson always opens the
// same way and (crucially) its tap options always match what was asked.
// Weighted toward questions but with a healthy mix of facts and dives so the
// experience never feels like the same script every time.
function openerStyle(lesson: Lesson): OpenerStyle {
  // A lesson with a dedicated hook always opens with that question (so its
  // unique, hand-written opener wins over the fact/dive rotation).
  if (LESSON_HOOKS[lesson.id]) return "question"
  switch (hashId2(lesson.id) % 5) {
    case 0:
    case 1:
      return "question"
    case 2:
    case 3:
      return "fact"
    default:
      return "dive"
  }
}

function factOpener(lesson: Lesson): string {
  const hay = `${lesson.category} ${lesson.title.toLowerCase()}`
  const idx = hashId(lesson.id)
  for (const [re, facts] of FACT_HOOKS) {
    if (re.test(hay)) return facts[idx % facts.length](lesson.title)
  }
  return GENERIC_FACTS[idx % GENERIC_FACTS.length](lesson.title)
}

// Neutral continue-style options for openers that don't ask a question.
const NEUTRAL_OPTION_SETS: string[][] = [
  ["Let's go", "Tell me more", "Okay 👍"],
  ["Go on", "Wait, really?", "Alright"],
  ["Hit me", "Interesting 🤔", "Keep going"],
  ["Okay, explain", "Sounds good", "Let's do it"],
]

function neutralOptions(lesson: Lesson): string[] {
  return NEUTRAL_OPTION_SETS[hashId(lesson.id) % NEUTRAL_OPTION_SETS.length]
}

/** Whether a lesson's opener poses a question the student answers via options. */
export function opensWithQuestion(lesson: Lesson): boolean {
  return openerStyle(lesson) === "question"
}

/** Jeff's opener - no API call needed for the first message. */
export function initialJeffMessage(lesson: Lesson): string {
  const flavor = LESSON_OPENERS[Math.floor(Math.random() * LESSON_OPENERS.length)]
  const lead = flavor ? `${flavor} ` : ""
  switch (openerStyle(lesson)) {
    case "question":
      return `${lead}${openingHook(lesson).question}`
    case "fact":
      return `${lead}${factOpener(lesson)}`
    default:
      return `${lead}${DIVE_OPENERS[hashId(lesson.id) % DIVE_OPENERS.length](lesson.title)}`
  }
}

/**
 * Reply options for the opener. Answer-style options when the opener asks a
 * question; neutral continue-style options when it just dives in or drops a
 * fact - so a tap never "answers" a question that was never asked.
 */
export function initialOptions(lesson: Lesson): string[] {
  return opensWithQuestion(lesson) ? openingHook(lesson).answers : neutralOptions(lesson)
}

// The Gulliver Introduction to Business track is a rigorous 9th-grade academic
// course, not the snappy gamified personal-finance track. Its lessons get a
// deeper, longer teaching mode (see buildDeepPrompt / GULLIVER_DEEP_TURNS).
export function isGulliverIntroLesson(lesson: Lesson): boolean {
  return (
    lesson.track === "gulliver-intro" ||
    lesson.category === "gulliver-business" ||
    lesson.category === "gulliver-economics"
  )
}

// How many teaching beats a deep (Gulliver) lesson gets before it must wrap up.
// Lessons are split into short halves (e.g. 1.1, 1.2), so each one is a small,
// digestible session: a handful of short messages that build on each other.
export const GULLIVER_DEEP_TURNS = 8

// ── Snappy default prompt (the gamified personal-finance track) ──
// When `source` is provided (the lesson's authored concept content), Jeff is
// grounded in it and told to cover the ideas the quiz is written from - so the
// questions never test something the chat didn't teach. Without a source it
// behaves exactly as before (improvise one core idea from the title).
function buildSnappyPrompt(lesson: Lesson, sentCount: number, source?: string): string {
  // Hard length budget - lessons were ballooning to 15+ messages. Jeff gets at
  // most 6 total messages; the prompt counts down and forces the wrap-up.
  const remaining = Math.max(1, 6 - sentCount)
  const budgetNote = sentCount >= 5
    ? `You have already sent ${sentCount} messages. Your NEXT message MUST be your final one: give the single key takeaway in one or two sentences, then end with the exact signal phrase. Do not introduce any new concepts.`
    : sentCount >= 3
      ? `You have already sent ${sentCount} messages and have at most ${remaining} left - start converging on the key takeaway now. Do not open new subtopics.`
      : `You have sent ${sentCount} messages so far and may use at most ${remaining} more in total.`

  // Grounded vs. improvised job description. Grounded still stays snappy (short
  // messages, <=6 total) but must cover the tested ideas rather than just one.
  const job = source
    ? `Your job: teach this lesson through a snappy back-and-forth conversation - 4 to 6 short exchanges. Teach the KEY ideas from the SOURCE MATERIAL below, because the quiz is written straight from it - so cover every idea it emphasizes and do NOT test-drift into outside facts. Stay snappy: one small idea per message, simplest first, building up. End by summarizing the key takeaway in one sentence and telling the student they're ready for the quiz.`
    : `Your job: teach ONE core concept of this lesson through a snappy back-and-forth conversation - 4 to 5 short exchanges total, never more than 6. Depth beats breadth: pick the single most important idea and land it, skip everything secondary. End by summarizing the key takeaway in one sentence and telling the student they're ready for the quiz.`

  // Placed LAST so a system-prompt clamp trims only the tail of the source,
  // never the teaching rules or the required end signal above it.
  const material = source
    ? `\n\nSOURCE MATERIAL - the authoritative content for this lesson; the quiz is written from it. Teach the ideas it contains and do not contradict it or introduce facts it doesn't cover:\n"""\n${source.slice(0, 3500)}\n"""`
    : ""

  return `You are Jeff, the friendly mascot and financial literacy guide for InvestiPlay, an app that teaches high school students personal finance through gamification. You are teaching a lesson called '${lesson.title}' which covers '${lesson.description}'.

Your personality: enthusiastic, encouraging, uses casual teen-friendly language, occasional light humor, never condescending. You explain concepts in 1-3 short sentences max per message - never long paragraphs. You use real-world examples that resonate with teenagers (jobs, sneakers, streaming services, gaming, college).

${job} ${budgetNote}

Always end your final message with exactly: 'Ready to test what you learned? 🎯' - this is the signal to show the quiz button.

The student already knows you - never introduce yourself or say "I'm Jeff." Just dive into teaching.

Keep each message under 40 words. Never use bullet points or headers. Sound like a knowledgeable friend, not a textbook.${material}`
}

// ── Deep prompt (Gulliver Intro): a real, rigorous mini-lecture ──
// Teaches thoroughly from the authored curriculum, covers every key idea in the
// lesson, and goes into the "why"/mechanisms instead of landing one point.
function buildDeepPrompt(lesson: Lesson, sentCount: number, source?: string, mustCover?: string[]): string {
  const remaining = Math.max(1, GULLIVER_DEEP_TURNS - sentCount)
  const budgetNote = sentCount >= GULLIVER_DEEP_TURNS - 2
    ? `You have sent ${sentCount} messages - you are near the end. If any required topic below is still untaught, teach it now (briefly is fine), then give a short synthesis and end with the exact signal phrase.`
    : sentCount >= Math.floor(GULLIVER_DEEP_TURNS / 2)
      ? `You have sent ${sentCount} messages (about ${remaining} left). Check the required-topics list - make sure you still have time to cover every one before you run out, and speed up if needed.`
      : `You have sent ${sentCount} messages so far and have room for about ${remaining} more. Take your time and build the ideas up properly.`

  // The exact topics the student will be quizzed on (from the lesson's question
  // concept tags). Every one MUST be taught - never test what wasn't covered.
  const coverage = mustCover && mustCover.length
    ? `\n\nREQUIRED TOPICS - the student will be quizzed on EVERY one of these, so you MUST teach each of them clearly at least once before the lesson ends. Do not end while any is untaught; if beats run short, cover the remaining ones more briefly rather than skipping:\n- ${mustCover.join("\n- ")}`
    : ""

  // The source material goes LAST so that if the edge function clamps the
  // system prompt (MAX_SYSTEM), only the tail of the source is trimmed - never
  // the teaching instructions or the required end signal above it.
  const material = source
    ? `\n\nSOURCE MATERIAL - this is the authoritative curriculum for this lesson. Teach from it, cover every key idea in it in a sensible order, and do not contradict it:\n"""\n${source.slice(0, 4000)}\n"""`
    : ""

  return `You are Jeff, the teacher for this lesson in the Gulliver Introduction to Business course - a rigorous 9th-grade (age ~14) academic business class. You are teaching '${lesson.title}', which covers '${lesson.description}'.

This is a real course, not a quick tip. Your job is to actually TEACH the whole lesson - explain the mechanisms and the WHY behind each idea, and cover ALL of the key concepts in it (not just one). But you deliver it in SMALL, readable steps that build on each other.

CRITICAL - message length and pacing:
- Each message teaches exactly ONE small idea. One idea per message, no more.
- Keep every message SHORT: 1 to 2 sentences, and under 40 words. It must fit on a phone screen and be readable in a single glance. Never write a long paragraph or cram multiple ideas into one message - that is the most important rule.
- Then stop and let the student tap a reply before you continue.
- Build up in order, simplest idea first: teach it, make sure it lands, then add the next idea on top of it. (For example, first WHAT a business is, then goods vs. services, then how each next idea follows.)
- Use MANY short messages rather than a few long ones - aim for around ${GULLIVER_DEEP_TURNS} short beats total so you can be thorough without any single message getting long.
- Never just restate the previous point - each message adds one new thing.
- Highlight key vocabulary: the FIRST time you say an important term or its definition, wrap just that word or short phrase in **double asterisks** (e.g. **revenue**, **a good**). Do this only for the genuinely important terms - a few per lesson - never for whole sentences.

Style: clear, precise, and genuinely interesting - like a great teacher, not a textbook and not a hype account. Occasionally use one vivid real-world example a 14-year-old knows (part-time jobs, phones, sneakers, food trucks, streaming, games) to make an idea concrete - but keep even the example to one short message. Plain language; do not dumb the content down. ${budgetNote}${coverage}

When you have taught the full lesson, give a one-sentence synthesis of how the ideas fit together, then end your final message with exactly: 'Ready to test what you learned? 🎯' - this is the signal to show the quiz button.

The student already knows you - never introduce yourself. Do not use bullet points or headers; teach in short prose messages.${material}`
}

export function buildSystemPrompt(lesson: Lesson, sentCount = 0, source?: string, mustCover?: string[]): string {
  return isGulliverIntroLesson(lesson)
    ? buildDeepPrompt(lesson, sentCount, source, mustCover)
    : buildSnappyPrompt(lesson, sentCount, source)
}

/** One chat turn: full history in, Jeff's reply + next tap options out. */
export async function jeffChatTurn(
  lesson: Lesson,
  messages: ChatMessage[],
  source?: string,
  mustCover?: string[],
): Promise<{ text: string; options: string[] }> {
  const sentCount = messages.filter(m => m.role === "assistant").length
  const { data, error } = await supabase.functions.invoke("jeff-chat", {
    body: { system: buildSystemPrompt(lesson, sentCount, source, mustCover), messages },
  })
  if (error) throw new Error(error.message || "AI request failed")
  if (data?.error) throw new Error(data.error)
  return { text: (data?.text as string) || "", options: (data?.options as string[]) || [] }
}

// ── Scripted fallback ──────────────────────────────────────────────
// When the AI is unavailable (no API credits, offline, rate-limited), Jeff
// teaches from the lesson's own written content instead of erroring out.
// Chunks concept paragraphs into chat-sized messages (<~45 words each).

const CHUNK_WORDS = 42
// Deep (Gulliver) fallback beats are kept shorter so no single message fills
// the screen - matching the short-message rule the live AI is given.
const DEEP_CHUNK_WORDS = 28

function chunkText(text: string, maxWords: number = CHUNK_WORDS): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean)
  const chunks: string[] = []
  let current = ""
  for (const s of sentences) {
    const candidate = current ? `${current} ${s}` : s
    if (candidate.split(/\s+/).length > maxWords && current) {
      chunks.push(current)
      current = s
    } else {
      current = candidate
    }
  }
  if (current) chunks.push(current)
  return chunks
}

/**
 * Jeff's teaching script from the lesson's concept sections (used when the AI
 * is unavailable). `deep` (Gulliver Intro) walks the full authored curriculum -
 * every concept section, in order - instead of the snappy 7-beat summary.
 */
export function buildScript(sections: LessonSection[], deep = false): string[] {
  const w = deep ? DEEP_CHUNK_WORDS : CHUNK_WORDS
  const out: string[] = []
  for (const s of sections) {
    if (s.type !== "concept") continue
    if (deep && s.title) out.push(chunkText(s.title, w)[0])
    for (const p of s.paragraphs) out.push(...chunkText(p, w))
    if (s.realWorldExample) out.push(...chunkText(`${deep ? "For example:" : "Real talk:"} ${s.realWorldExample}`, w))
  }
  const script = out.slice(0, deep ? 12 : 7)
  if (script.length === 0) return []
  script[script.length - 1] += deep ? ` ${END_SIGNAL} 🎯` : ` That's the big idea! ${END_SIGNAL} 🎯`
  return script
}

/** Rotating tap options while Jeff works through the script. */
export function scriptOptions(idx: number): string[] {
  const sets = [
    ["Tell me more", "Give me an example", "Got it 👍"],
    ["Makes sense", "Wait, explain that again", "Keep going"],
    ["Interesting 🤔", "Okay, then what", "Got it 👍"],
  ]
  return sets[idx % sets.length]
}

// ── Resume support: conversation persists per-lesson in localStorage ──
const storeKey = (lessonId: string) => `ip_jeffchat_${lessonId}`

export interface SavedChat {
  messages: ChatMessage[]
  options: string[]
  done: boolean
  /** Position in the scripted fallback (0 = AI-only so far). */
  scriptIdx?: number
}

export function loadChat(lessonId: string): SavedChat | null {
  try {
    const raw = localStorage.getItem(storeKey(lessonId))
    return raw ? (JSON.parse(raw) as SavedChat) : null
  } catch { return null }
}

export function saveChat(lessonId: string, chat: SavedChat) {
  try { localStorage.setItem(storeKey(lessonId), JSON.stringify(chat)) } catch { /* ignore */ }
}
