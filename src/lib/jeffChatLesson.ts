// jeffChatLesson - client wrapper + prompt assembly for the "Chat with Jeff"
// lesson experience (edge function: jeff-chat). Jeff teaches the lesson
// conversationally; the student replies via tappable options.
import { supabase } from "@/integrations/supabase/client"
import type { Lesson, LessonSection } from "@/types"
import { stripDashes, NO_DASH_RULE } from "@/lib/text"

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

// The lesson's zero-based position within its unit, parsed from lessonNumber
// ("10.3" -> 2). Used to index the opener pools so consecutive lessons in a
// unit walk through the pool in order - no two lessons in a unit up to the
// pool's size ever land on the same opener. Falls back to the id hash for any
// lesson without a clean numeric position.
function unitPos(lesson: Lesson): number {
  const minor = Number(lesson.lessonNumber?.split(".")[1])
  return Number.isFinite(minor) && minor > 0 ? minor - 1 : hashId(lesson.id)
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
    { question: "if waiting one year doubled your money, could you actually leave it alone?", answers: ["No chance", "Maybe", "Yeah, easily"] },
    { question: "what's your track record with 'I'll save the rest' - honestly?", answers: ["Terrible 😅", "Hit or miss", "Pretty solid"] },
    { question: "would you rather a small reward now or a bigger one you earn over time?", answers: ["Small now", "Bigger later", "Depends how much bigger"] },
    { question: "ever told yourself 'just this once' and then it became every day?", answers: ["Story of my life", "Sometimes", "Not really"] },
    { question: "does 'future you' end up paying for what 'today you' buys?", answers: ["All the time", "A little", "I plan ahead"] },
    { question: "if skipping one snack a day saved you $500 a year, could you do it?", answers: ["No chance", "Maybe", "Easily"] },
    { question: "would you rather $5 right now or $8 next week?", answers: ["$5 now", "$8 next week", "Depends"] },
    { question: "how long could you keep saved money before you'd 'accidentally' spend it?", answers: ["A day 😅", "A few weeks", "Months"] },
    { question: "is it harder to START saving or to KEEP saving?", answers: ["Starting", "Keeping going", "Both"] },
    { question: "would you delete a game that paid you $1 an hour NOT to play it?", answers: ["Never", "For a dollar? sure", "Depends"] },
    { question: "if future-you could text you, what would they beg you to stop buying?", answers: ["Snacks", "Random junk", "Nothing, I'm good"] },
    { question: "could you leave $100 untouched in a jar for a whole year?", answers: ["No way", "Maybe", "Easily"] },
    { question: "what wins for you - a treat today or a bigger goal later?", answers: ["Treat today", "Bigger goal", "Depends how big"] },
    { question: "do you buy faster when there's a countdown timer ticking?", answers: ["Way faster", "A little", "Nope"] },
    { question: "would you rather feel good for an hour or richer for a year?", answers: ["The hour 😅", "Richer", "Can't decide"] },
    { question: "if 'one-click buy' vanished, would you spend less?", answers: ["Definitely", "A bit", "No"] },
    { question: "is waiting for something part of the fun, or just torture?", answers: ["Torture", "Kind of fun", "Depends"] },
    { question: "could you save your birthday money for six whole months?", answers: ["No chance", "Maybe", "Yeah"] },
    { question: "what's your longest streak of NOT impulse buying?", answers: ["A day lol", "A week or two", "Ages"] },
    { question: "would a 24-hour 'wait rule' stop half your purchases?", answers: ["Probably yeah", "Maybe", "No"] },
    { question: "does 'treat yourself' show up a little too often for you?", answers: ["Way too often", "Sometimes", "Rarely"] },
    { question: "if patience literally paid interest, would you get rich?", answers: ["Broke 😅", "Maybe", "Rich"] },
    { question: "would you take $20 now or flip a coin for $60?", answers: ["Take the $20", "Flip it", "Depends"] },
    { question: "can you leave a store without buying the thing you came to look at?", answers: ["Never", "Sometimes", "Easily"] },
    { question: "is 'I'll start saving next month' something you actually say?", answers: ["Constantly 😬", "Sometimes", "Never"] },
  ]],
  [/psychology-of-money|behavioral/, [
    { question: "if you got $100 right now, what's the FIRST thing you'd do with it?", answers: ["Spend it on something fun 🛍️", "Save every penny", "Half spend, half save"] },
    { question: "do you spend more when you pay with a card instead of cash?", answers: ["Definitely card", "Never noticed", "Cash feels more real"] },
    { question: "what's one thing you ALWAYS talk yourself into buying?", answers: ["Snacks 🍟", "Clothes or shoes", "Games and apps"] },
    { question: "does a sale price make you buy stuff you didn't even want?", answers: ["Every single time", "Sometimes", "Nope, I resist"] },
    { question: "do your feelings ever decide how you spend money?", answers: ["Way more than I'd admit", "A little", "I keep it logical"] },
    { question: "do you spend differently when you're stressed or bored?", answers: ["Definitely", "A bit", "Nope"] },
    { question: "ever kept spending on something just because you'd already spent a lot on it?", answers: ["Yeah, oops", "Maybe once", "No, I cut losses"] },
    { question: "does seeing other people buy something make you want it too?", answers: ["Way too much", "Sometimes", "I don't care"] },
    { question: "would a '90% of people bought this' label make you more likely to buy?", answers: ["Honestly yes", "Maybe", "No"] },
    { question: "do you check the price before or after you've decided you want it?", answers: ["After 😅", "Before", "Depends"] },
    { question: "do you spend more right after getting paid?", answers: ["Definitely", "A little", "No"] },
    { question: "would 'only 2 left!' make you buy faster?", answers: ["Yes", "Maybe", "No"] },
    { question: "do free samples make you more likely to buy the whole thing?", answers: ["Every time", "Sometimes", "Nope"] },
    { question: "is 'buy 2 get 1 free' a deal or a trick to buy more?", answers: ["A deal!", "A trick", "Both"] },
    { question: "does $9.99 feel way cheaper than $10 to you?", answers: ["Weirdly yes", "No", "A little"] },
    { question: "would a fancy label make you pay more for the same thing?", answers: ["Honestly yes", "No", "Maybe"] },
    { question: "do you buy things to match who you want to be?", answers: ["Sometimes", "A lot", "Never noticed"] },
    { question: "does 'everyone has one' make you want it more?", answers: ["Yeah", "A bit", "No"] },
    { question: "is it easier to spend money that doesn't feel 'real,' like a card?", answers: ["Way easier", "A little", "No difference"] },
    { question: "do you keep paying for stuff just because you already started?", answers: ["Yeah 😅", "Sometimes", "No, I quit"] },
    { question: "would a 'members only' tag make something more tempting?", answers: ["Yes", "Maybe", "No"] },
    { question: "do you spend to celebrate AND to feel better when you're down?", answers: ["Both!", "One of them", "Neither"] },
    { question: "does '$200 → $120' make you feel like you saved money?", answers: ["Totally", "A little", "It's a trick"] },
    { question: "do you trust a product more just because it costs more?", answers: ["Kinda", "No", "Depends"] },
    { question: "would you buy something because it's almost sold out?", answers: ["Maybe 😬", "No", "Yeah"] },
    { question: "do you notice ads quietly changing what you want?", answers: ["Way too much", "Sometimes", "Never"] },
    { question: "is an empty cart something you feel you need to 'fix'?", answers: ["Kinda 😅", "No", "Sometimes"] },
    { question: "would a 'limited edition' label make you pay extra?", answers: ["Yeah", "Maybe", "No"] },
    { question: "do you round your bank balance up or down in your head?", answers: ["Up 😬", "Down", "I check the real number"] },
    { question: "is 'treat' just a word we use to justify spending?", answers: ["Ha, yeah", "Sometimes", "No"] },
  ]],
  [/budget/, [
    { question: "do you actually know where your money goes every month?", answers: ["Yeah, pretty much", "Not really 😅", "I don't track anything"] },
    { question: "if your money vanished tomorrow, could you say what you spent it on?", answers: ["Not a clue", "Roughly", "Yeah, all of it"] },
    { question: "what eats up most of your money right now?", answers: ["Food", "Fun stuff", "Honestly no idea"] },
    { question: "do you have a plan for your money, or does it just... disappear?", answers: ["It disappears 😅", "Kind of a plan", "Yeah, I've got a system"] },
    { question: "how much of last week's money could you get back if you tried?", answers: ["None of it", "Some of it", "Most of it"] },
    { question: "if I asked for a plan for your next $100, could you give me one?", answers: ["Not really", "Roughly", "Yeah, easily"] },
    { question: "does your money feel like it has a job, or does it just wander off?", answers: ["It wanders 😅", "Kinda", "Every dollar's assigned"] },
    { question: "what's the first thing you'd cut if money got tight?", answers: ["No idea", "Fun stuff", "I know exactly"] },
    { question: "do you know your 'needs' vs 'wants' split for last week?", answers: ["Nope", "Sort of", "Yeah"] },
    { question: "if your income doubled tomorrow, would your savings actually grow?", answers: ["Probably not", "Maybe", "Definitely"] },
    { question: "if I froze your account for a week, would you notice what you'd miss?", answers: ["Yeah", "Not really", "Depends"] },
    { question: "what share of your money should you save - 1%, 10%, or 50%?", answers: ["1%", "10%", "50%?"] },
    { question: "does a budget feel like freedom or a cage to you?", answers: ["A cage", "Freedom-ish", "No idea"] },
    { question: "could you split last week's spending into needs and wants?", answers: ["No way", "Kinda", "Yeah"] },
    { question: "do you plan your spending, or just react to it?", answers: ["React 😅", "Half and half", "Plan it"] },
    { question: "if you had to cut one expense today, would you know which?", answers: ["No clue", "The fun stuff", "Yeah, exactly"] },
    { question: "is 'whatever's left over' actually a savings plan?", answers: ["That's mine 😬", "Kind of", "No"] },
    { question: "would writing down every purchase change how you spend?", answers: ["Probably", "Maybe", "No"] },
    { question: "how many subscriptions are you paying for right now?", answers: ["No idea 😬", "Two or three", "I know exactly"] },
    { question: "what's a 'want' you secretly treat like a 'need'?", answers: ["Snacks", "My phone", "Nothing"] },
    { question: "if your allowance dropped by half, what's the first thing to go?", answers: ["No idea", "The fun stuff", "I'd know instantly"] },
    { question: "do you budget by the month, the week, or not at all?", answers: ["Not at all", "Sort of monthly", "Weekly"] },
    { question: "is it easier to earn more or to spend less?", answers: ["Earn more", "Spend less", "Neither 😅"] },
    { question: "do you know your single biggest expense this month?", answers: ["Nope", "Roughly", "Yeah"] },
    { question: "could you live one week on half your usual spending?", answers: ["No chance", "Maybe", "Easily"] },
    { question: "does checking your balance make you anxious or in control?", answers: ["Anxious", "In control", "I avoid it 😬"] },
    { question: "if you got a raise, would you save it or upgrade your life?", answers: ["Upgrade!", "Save it", "A bit of both"] },
    { question: "should your 'fun money' be planned or just whatever's left?", answers: ["Whatever's left", "Planned", "Fun needs planning?"] },
    { question: "would a spending limit make you more creative or just annoyed?", answers: ["Annoyed", "Creative", "Both"] },
    { question: "does your money have a plan, or does it just vanish?", answers: ["Vanishes", "Kind of a plan", "Full system"] },
  ]],
  [/banking/, [
    { question: "do you know how banks make money off your savings account?", answers: ["No idea honestly", "They charge fees, right?", "They invest it somehow?"] },
    { question: "what's the actual difference between checking and savings?", answers: ["Not sure", "One earns interest?", "I know this one"] },
    { question: "ever been surprised by a random bank fee?", answers: ["Ugh, yes", "Not yet", "Wait, what fees?"] },
    { question: "is your money safer in a bank or under your mattress?", answers: ["Bank, obviously", "Mattress lol", "Wait, are banks even safe?"] },
    { question: "why would a bank pay YOU to keep money there?", answers: ["No clue", "So they can lend it out?", "They don't, do they?"] },
    { question: "do you know what APY on a savings account even means?", answers: ["No clue", "Something about interest?", "Yeah I do"] },
    { question: "would you notice if a subscription quietly charged you every month?", answers: ["Probably not 😬", "Eventually", "Yeah, I check"] },
    { question: "which should hold money you won't touch for a while - checking or savings?", answers: ["Checking", "Savings", "Aren't they the same?"] },
    { question: "is there a real difference between a bank and a credit union?", answers: ["No idea", "Kind of?", "Yeah"] },
    { question: "what actually happens to your paycheck the second it's deposited?", answers: ["No clue", "It just sits there?", "The bank uses it?"] },
    { question: "should your emergency cash sit in checking or savings?", answers: ["Checking", "Savings", "Same thing?"] },
    { question: "would you notice a $3 fee sneaking out every month?", answers: ["Probably not", "Eventually", "Yeah"] },
    { question: "is your money actually 'in' the bank, or lent out to others?", answers: ["It's in there", "Lent out", "Wait, what?"] },
    { question: "what's an overdraft fee, and how do you dodge it?", answers: ["No idea", "Spending too much?", "I know this"] },
    { question: "would you keep $10,000 under your bed or in a bank?", answers: ["Under the bed", "Bank", "Split it"] },
    { question: "is a debit card basically the same as a credit card?", answers: ["Basically", "No", "Not sure"] },
    { question: "should you ever pay a monthly fee just to have an account?", answers: ["No way", "If it's worth it", "Do banks do that?"] },
    { question: "what happens to your money if a bank shuts down?", answers: ["I lose it 😬", "It's insured?", "No idea"] },
    { question: "why do online banks pay more interest than the big ones?", answers: ["No idea", "Lower costs?", "Do they?"] },
    { question: "would you spot a fake bank text from a real one?", answers: ["Definitely", "Maybe 😬", "No"] },
    { question: "is a 0.01% and a 4% savings rate really that different?", answers: ["Nah", "Huge difference", "Show me"] },
    { question: "should you keep all your money in one single account?", answers: ["Sure", "No", "Why not?"] },
    { question: "what's the point of savings if it barely earns anything?", answers: ["Exactly", "Safety?", "No idea"] },
    { question: "do ATM fees add up more than you'd think?", answers: ["Yeah 😅", "Not really", "Never noticed"] },
    { question: "is 'free checking' actually free?", answers: ["Probably not", "Yeah", "Depends"] },
    { question: "should your paycheck auto-split into 'save' and 'spend'?", answers: ["Ooh yeah", "Sounds complicated", "I do that"] },
    { question: "is it safe to check your bank on public wifi?", answers: ["Sure", "No way", "Never thought about it"] },
    { question: "does keeping money in the bank longer earn you more?", answers: ["No", "Sometimes yeah", "Not sure"] },
    { question: "could an app show you where every single dollar went?", answers: ["That'd help", "Maybe", "I use one"] },
    { question: "is a credit union different from a regular bank?", answers: ["No idea", "Kind of?", "Yeah"] },
  ]],
  [/credit|debt/, [
    { question: "did you know your credit score can affect your rent, job, and even phone plan?", answers: ["Wait, seriously?", "Yeah, I knew that", "What even is a credit score?"] },
    { question: "is a credit card free money or a trap?", answers: ["Kinda both?", "A trap", "Free money 😏"] },
    { question: "what happens if you only pay the minimum on a credit card?", answers: ["No idea", "It piles up?", "Nothing bad?"] },
    { question: "would you borrow $10 if paying it back cost you $13?", answers: ["No way", "If I really needed it", "Wait, why does it cost more?"] },
    { question: "does owing money always mean you messed up?", answers: ["Pretty much", "Not always", "I honestly don't know"] },
    { question: "would you know how to start building credit from zero?", answers: ["Nope", "Sort of", "Yeah"] },
    { question: "is all debt bad, or can some of it actually be smart?", answers: ["All bad", "Some is smart", "Not sure"] },
    { question: "what do you think 20% APR costs you on a $500 balance in a year?", answers: ["No idea", "Like $100?", "Depends"] },
    { question: "is a lower monthly payment always the better deal?", answers: ["Yeah, right?", "Not always", "Why wouldn't it be?"] },
    { question: "is a credit limit a budget to hit or a ceiling to avoid?", answers: ["A target 😬", "A ceiling to avoid", "Not sure"] },
    { question: "would you swipe a card for something you couldn't pay cash for?", answers: ["Sometimes 😬", "Never", "Depends"] },
    { question: "does a credit card make you feel richer than you actually are?", answers: ["Kinda", "No", "A little"] },
    { question: "how fast does a $1,000 balance grow if you just ignore it?", answers: ["Slowly", "Scary fast", "No idea"] },
    { question: "could one late payment really hurt your credit score?", answers: ["No way", "Yeah", "How much?"] },
    { question: "is it smarter to pay off debt or invest first?", answers: ["Pay debt", "Invest", "Depends on the rate"] },
    { question: "would you co-sign a loan for a friend?", answers: ["Sure", "No way 😬", "Maybe"] },
    { question: "does checking your OWN credit score hurt it?", answers: ["Yeah?", "No", "No idea"] },
    { question: "is a bigger credit limit a good thing or a dangerous one?", answers: ["Good!", "Dangerous", "Both"] },
    { question: "what's worse - no credit or bad credit?", answers: ["No credit", "Bad credit", "Same thing?"] },
    { question: "would you trust '0% interest for 12 months' at face value?", answers: ["Yeah", "Read the fine print", "No"] },
    { question: "is a payday loan ever a good idea?", answers: ["In a pinch", "Never", "Not sure"] },
    { question: "how much of your credit limit is safe to actually use?", answers: ["All of it 😬", "Under a third", "No idea"] },
    { question: "is buy-now-pay-later just debt with a nicer name?", answers: ["Basically", "No", "Hmm"] },
    { question: "would you rather owe $500 at 5% or $300 at 25%?", answers: ["$500 at 5%", "$300 at 25%", "Do the math?"] },
    { question: "can debt ever actually help you build wealth?", answers: ["No", "Sometimes", "How?"] },
    { question: "is a credit score something you're born with or you build?", answers: ["Born with?", "You build it", "Not sure"] },
    { question: "does carrying a small balance help your score? (careful…)", answers: ["Yeah, right?", "No, it doesn't", "I've heard both"] },
    { question: "would you notice interest quietly added to a card each month?", answers: ["Probably not", "Eventually", "Yeah"] },
    { question: "is 'minimum payment' a friendly option or a trap?", answers: ["Friendly", "A trap", "Not sure"] },
    { question: "does closing an old credit card help you or hurt you?", answers: ["Helps", "Hurts", "No idea"] },
  ]],
  [/invest|stock|portfolio|etf|bond|fund|valuation|ratio|financial-statement/, [
    { question: "if I told you $100 invested at 17 beats $1,000 invested at 30, would you believe me?", answers: ["No way, prove it", "I'd believe it", "How does that work?"] },
    { question: "is investing basically just gambling?", answers: ["Feels like it", "No, it's different", "Explain the difference"] },
    { question: "where does your money actually GO when you buy a stock?", answers: ["No clue", "You own part of a company?", "Somewhere magic ✨"] },
    { question: "could your money make money while you literally sleep?", answers: ["That sounds fake", "Yeah, I've heard that", "Show me how"] },
    { question: "would you rather own $100 of a company or lend it $100?", answers: ["Own it", "Lend it", "What's the difference?"] },
    { question: "would you rather double your money slowly or gamble it fast?", answers: ["Slow and steady", "Gamble it", "Depends"] },
    { question: "does the stock market feel more like saving or betting to you?", answers: ["Betting", "Saving-ish", "No idea"] },
    { question: "if a company you love jumps 50%, should you sell or hold?", answers: ["Sell, lock it in", "Hold", "How would I know?"] },
    { question: "can regular people actually make money in the market, or just the pros?", answers: ["Just the pros", "Regular people too", "Not sure"] },
    { question: "would you invest in something you don't understand if a friend swore by it?", answers: ["Probably 😅", "No way", "Depends on the friend"] },
    { question: "would you rather own 1 company or a tiny slice of 500?", answers: ["Just 1", "Slice of 500", "What's the difference?"] },
    { question: "is a stock that dropped 40% a disaster or a sale?", answers: ["Disaster", "A sale?", "Depends"] },
    { question: "does buying the same amount every month beat trying to time it?", answers: ["No", "Yeah?", "How?"] },
    { question: "is a bond basically just a loan you make to someone?", answers: ["No", "Yeah?", "Not sure"] },
    { question: "does more risk ALWAYS mean more reward?", answers: ["Yeah", "Not always", "Sometimes"] },
    { question: "would you check your investments every hour or every year?", answers: ["Every hour 😅", "Every year", "Somewhere between"] },
    { question: "can you lose money in a 'safe' investment?", answers: ["No", "Yeah", "How?"] },
    { question: "would you rather steady 8% a year or a wild shot at 80%?", answers: ["Steady 8%", "Shot at 80%", "Depends"] },
    { question: "does the biggest company always make the best investment?", answers: ["Yeah", "No", "Not sure"] },
    { question: "is holding through a crash brave or foolish?", answers: ["Foolish", "Brave", "Depends"] },
    { question: "would you invest in something just because it's trending?", answers: ["Maybe 😬", "No", "Yeah"] },
    { question: "is 'diversify' just a fancy word for 'don't bet it all'?", answers: ["Basically", "No", "Explain"] },
    { question: "should you invest money you'll need next month?", answers: ["Sure", "No way", "Depends"] },
    { question: "does a stock going up mean the company is doing great?", answers: ["Yeah", "Not always", "Not sure"] },
    { question: "would you rather pick your own stocks or let a fund do it?", answers: ["Pick my own", "Let a fund", "No idea"] },
    { question: "is the market more like a rollercoaster or an escalator?", answers: ["Rollercoaster", "Escalator", "Both?"] },
    { question: "should a teenager own any bonds at all?", answers: ["Probably not", "Sure", "No idea"] },
    { question: "is a hot tip from a friend a real reason to invest?", answers: ["Sometimes", "Never", "Depends"] },
    { question: "what pays you just for owning it - a stock or a savings account?", answers: ["Stock?", "Savings?", "Both can"] },
    { question: "would you rather invest $1,200 all at once or $100 a month?", answers: ["All at once", "$100 a month", "No idea"] },
  ]],
  [/tax/, [
    { question: "how much of a $15/hr paycheck do you actually take home?", answers: ["All of it… right?", "Like $12/hr maybe?", "No clue honestly"] },
    { question: "why does your paycheck come out smaller than you expected?", answers: ["Taxes?", "No idea", "Some kind of fees"] },
    { question: "ever wonder where the money taken out of a paycheck goes?", answers: ["Yeah, actually", "Not really", "Roads and stuff?"] },
    { question: "if you make $1,000, how much is actually yours to keep?", answers: ["All of it", "Like $850?", "No idea"] },
    { question: "do you know the difference between gross pay and net pay?", answers: ["Nope", "Kinda", "Yeah"] },
    { question: "why do two people with the same salary take home different amounts?", answers: ["No clue", "Different deductions?", "Taxes?"] },
    { question: "is a tax refund free money, or your own money coming back?", answers: ["Free money!", "My own money", "Wait, which?"] },
    { question: "could earning more ever leave you with less after taxes?", answers: ["No way", "Maybe?", "How?"] },
    { question: "besides income tax, do you know what else gets taken from a paycheck?", answers: ["No", "Some stuff?", "Yeah"] },
    { question: "when you start earning, should you keep any forms or receipts?", answers: ["Why would I?", "Probably", "Definitely"] },
    { question: "is a big tax refund a win, or a sign you overpaid all year?", answers: ["A win!", "I overpaid", "Wait, which?"] },
    { question: "do you pay tax when you BUY stuff too, not just when you earn?", answers: ["No", "Yeah, sales tax", "Really?"] },
    { question: "why doesn't the sticker price match what you pay at the register?", answers: ["Tax", "No idea", "Store error?"] },
    { question: "would you know how to read your own pay stub?", answers: ["Nope", "Kinda", "Yeah"] },
    { question: "does everyone pay the exact same tax rate?", answers: ["Yeah", "No", "Not sure"] },
    { question: "is cash income magically tax-free?", answers: ["Yeah 😏", "No", "Hmm"] },
    { question: "do you owe tax on money from a side hustle?", answers: ["No", "Yeah", "Depends?"] },
    { question: "could a summer job mean you have to file taxes?", answers: ["No way", "Maybe", "Yeah"] },
    { question: "is a tax deduction the same as a tax credit?", answers: ["Yeah", "No", "No idea"] },
    { question: "why do some people get money back and others owe?", answers: ["No idea", "Withholding?", "Luck"] },
    { question: "does the government take tax before you even see your pay?", answers: ["No", "Yeah", "How?"] },
    { question: "would you keep receipts if they lowered your taxes?", answers: ["Sure", "Meh", "Definitely"] },
    { question: "do you pay tax on the interest your savings earns?", answers: ["No", "Yeah?", "Really?"] },
    { question: "should you save part of a side-gig check for taxes?", answers: ["Nah", "Probably", "Definitely"] },
    { question: "what happens if you just… don't file?", answers: ["Nothing?", "Trouble", "No idea"] },
    { question: "does moving to a different state change your taxes?", answers: ["No", "Yeah", "Maybe"] },
    { question: "is tax on a $1 candy really just a penny or two?", answers: ["Yeah", "More?", "No idea"] },
    { question: "is 'tax season' a real deadline or more of a suggestion?", answers: ["A suggestion 😅", "A real deadline", "Not sure"] },
    { question: "what's that FICA line doing on a paycheck?", answers: ["No clue", "Some tax?", "I know"] },
    { question: "would a raise ever leave you with less per dollar earned?", answers: ["No", "On part of it, yeah", "How?"] },
  ]],
  [/insurance/, [
    { question: "what would happen if you crashed a car tomorrow with no insurance?", answers: ["I'd be in big trouble", "My parents would cover it?", "Never thought about it"] },
    { question: "is insurance a waste of money or a lifesaver?", answers: ["Waste", "Lifesaver", "No idea"] },
    { question: "would you pay $50 a month to avoid a surprise $5,000 bill?", answers: ["Yeah, worth it", "Seems like a lot", "Depends"] },
    { question: "why would you pay for something hoping you NEVER use it?", answers: ["That makes no sense", "For peace of mind?", "Huh, good question"] },
    { question: "who pays if you break something expensive that isn't yours?", answers: ["Me, I guess 😬", "Insurance?", "No idea"] },
    { question: "is it worth insuring stuff you'll probably never damage?", answers: ["No", "For big stuff, yeah", "Depends"] },
    { question: "what's a 'deductible,' and why should you care about it?", answers: ["No clue", "What I pay first?", "Yeah, I know"] },
    { question: "would you rather a low monthly cost or a low surprise bill later?", answers: ["Low monthly", "Low surprise", "Can't I have both?"] },
    { question: "does more coverage always mean a better deal?", answers: ["Yeah", "Not really", "Not sure"] },
    { question: "why do younger drivers usually pay more for car insurance?", answers: ["No idea", "More risk?", "That's unfair"] },
    { question: "if your phone screen shattered, who pays - you or a plan?", answers: ["Me 😬", "A plan?", "No idea"] },
    { question: "is renters insurance pointless if you don't own much?", answers: ["Yeah", "Not really", "Depends"] },
    { question: "does health insurance matter if you're young and healthy?", answers: ["Not really", "Yeah", "No idea"] },
    { question: "would you rather a cheap plan with big risk or a pricier safe one?", answers: ["Cheap", "Safe", "Middle"] },
    { question: "is a higher deductible good or bad for your monthly cost?", answers: ["Bad", "Lowers it", "Not sure"] },
    { question: "should you bother insuring a $20 item?", answers: ["Sure", "No way", "Depends"] },
    { question: "does insurance cover you if the accident was your own fault?", answers: ["No", "Sometimes", "No idea"] },
    { question: "would you skip insurance to save money each month?", answers: ["Tempting 😬", "No", "Depends"] },
    { question: "is 'full coverage' always worth it?", answers: ["Yeah", "Not always", "Not sure"] },
    { question: "what happens to your rate after one accident?", answers: ["Goes up", "Stays", "No idea"] },
    { question: "should you read the fine print before signing a policy?", answers: ["Who does?", "Definitely", "Skim it"] },
    { question: "is it cheaper to bundle car and home insurance?", answers: ["No idea", "Usually yeah", "Really?"] },
    { question: "does 'more coverage' always mean a better deal?", answers: ["Yeah", "No", "Not sure"] },
    { question: "is life insurance something a teenager needs?", answers: ["No", "Someday", "No idea"] },
    { question: "would you insure a trip you might end up cancelling?", answers: ["No", "Maybe", "Depends"] },
    { question: "should you insure stuff you truly couldn't afford to replace?", answers: ["Yeah", "Everything", "Only some"] },
    { question: "why does the same coverage cost different people different amounts?", answers: ["No idea", "Risk", "Feels unfair"] },
    { question: "what's a 'premium,' and is paying more one always better?", answers: ["No clue", "Not always", "I know this"] },
    { question: "would a low monthly cost or a low surprise bill matter more to you?", answers: ["Low monthly", "Low surprise", "Can't I have both?"] },
    { question: "is paying for insurance you never use a waste or worth it?", answers: ["Waste", "Worth it", "No idea"] },
  ]],
  [/entrepreneur|business|market|leadership|strategy|pestel|ethics|consumer/, [
    { question: "what's one problem at your school nobody's solved yet?", answers: ["Ooh, I've got ideas", "Let me think about that", "Why does that matter?"] },
    { question: "if you started a business tomorrow, what would you sell?", answers: ["I've got an idea", "No clue", "Something food-related 🍔"] },
    { question: "why do some businesses blow up while others flop?", answers: ["Luck?", "The product", "Marketing?"] },
    { question: "would you rather run the business or own a piece of it?", answers: ["Run it", "Own a piece", "Both?"] },
    { question: "what makes you pick one brand over another that's basically the same?", answers: ["The vibe", "The price", "Honestly no idea"] },
    { question: "would you rather invent something new or improve something that exists?", answers: ["Invent it", "Improve it", "Either one"] },
    { question: "what matters more for a business - a great product or great marketing?", answers: ["Product", "Marketing", "Both equally"] },
    { question: "if two shops sell the exact same thing, why does one win?", answers: ["Price", "The experience", "Luck?"] },
    { question: "could you name the actual customer for something you use every day?", answers: ["Easily", "Maybe", "Isn't it just me?"] },
    { question: "is it smarter to be first to an idea, or best at it?", answers: ["First", "Best", "Depends"] },
    { question: "would you rather a business that's fun or one that makes money?", answers: ["Fun", "Money", "Both please"] },
    { question: "is a great idea worth anything without action behind it?", answers: ["Yeah", "No", "Not sure"] },
    { question: "should a new business copy a winner or do its own thing?", answers: ["Copy", "Own thing", "Mix"] },
    { question: "would you rather 10 customers who love you or 1,000 who kinda like you?", answers: ["The 10", "The 1,000", "Depends"] },
    { question: "is it better to sell cheap to many or premium to a few?", answers: ["Cheap to many", "Premium to few", "Depends"] },
    { question: "what kills a small business first - no sales or bad money habits?", answers: ["No sales", "Bad money", "Both"] },
    { question: "would you launch fast and fix it, or perfect it first?", answers: ["Launch fast", "Perfect first", "Depends"] },
    { question: "is the customer always right?", answers: ["Yeah", "Not really", "Depends"] },
    { question: "should a business chase every customer or pick a niche?", answers: ["Everyone", "A niche", "Not sure"] },
    { question: "would you rather lead a team or work solo?", answers: ["Lead", "Solo", "Depends"] },
    { question: "does raising prices always lose you customers?", answers: ["Yeah", "Not always", "Not sure"] },
    { question: "is 'growth at any cost' smart or reckless?", answers: ["Smart", "Reckless", "Depends"] },
    { question: "should a founder do everything or hire for their weak spots?", answers: ["Do it all", "Hire", "Mix"] },
    { question: "would you own 100% of something small or 10% of something huge?", answers: ["100% small", "10% huge", "Hmm"] },
    { question: "what matters more - a big market or a great product?", answers: ["Market", "Product", "Both"] },
    { question: "is a competitor copying you a threat or a compliment?", answers: ["Threat", "Compliment", "Both"] },
    { question: "should you start a business alone or with a partner?", answers: ["Alone", "Partner", "Depends"] },
    { question: "does the best product always win the market?", answers: ["Yeah", "No", "Not sure"] },
    { question: "what makes you loyal to a brand you love?", answers: ["The quality", "The vibe", "The price"] },
    { question: "is 'move fast and break things' a good rule or a risky one?", answers: ["Good", "Risky", "Depends"] },
  ]],
  [/econ|macro|indicator|supply|demand|micro/, [
    { question: "why does the same candy bar cost more some years than others?", answers: ["Inflation?", "No idea", "Stores being greedy?"] },
    { question: "who decides the price of, like, everything?", answers: ["The government?", "Buyers and sellers?", "No clue"] },
    { question: "when everyone wants the new sneaker, what happens to the price?", answers: ["It goes up", "It stays put", "Wait, why?"] },
    { question: "if everyone suddenly had twice the money, would stuff get cheaper or pricier?", answers: ["Cheaper", "Pricier", "No change?"] },
    { question: "why do jobs seem easy to get some years and impossible in others?", answers: ["No idea", "The economy?", "Luck"] },
    { question: "when prices rise fast, who wins and who loses?", answers: ["No idea", "Savers lose?", "Everyone loses"] },
    { question: "does the government run the whole economy, or just parts of it?", answers: ["The whole thing", "Just parts", "Not sure"] },
    { question: "if a factory across the world closes, could it change your prices?", answers: ["No", "Yeah, actually", "How?"] },
    { question: "is a country doing well just because its prices keep going up?", answers: ["Yeah", "No", "Not sure"] },
    { question: "what actually makes one country richer than another?", answers: ["Its resources?", "No idea", "How it uses them?"] },
    { question: "when a hurricane hits, why does gas suddenly cost more?", answers: ["Supply drops", "Greed", "No idea"] },
    { question: "if everyone rushed to buy toilet paper, what happens to the price?", answers: ["Goes up", "Stays", "Drops"] },
    { question: "does printing more money make everyone richer?", answers: ["Yeah", "No", "Not sure"] },
    { question: "why is water $1 at a store but $5 at a concert?", answers: ["Demand", "Greed", "No idea"] },
    { question: "who really sets the price of gas - stores or the whole world?", answers: ["Stores", "The world", "Both"] },
    { question: "does a strong economy mean everyone is doing well?", answers: ["Yeah", "Not everyone", "Not sure"] },
    { question: "why do interest rates go up and down?", answers: ["No idea", "To fight inflation?", "Random"] },
    { question: "if a country makes less stuff, does everyone feel it?", answers: ["No", "Yeah", "Maybe"] },
    { question: "is inflation always a bad thing?", answers: ["Yeah", "Not always", "No idea"] },
    { question: "does a higher minimum wage help or hurt workers?", answers: ["Helps", "Hurts", "Both?"] },
    { question: "when jobs are everywhere, do wages go up or down?", answers: ["Up", "Down", "Not sure"] },
    { question: "why can the same phone cost different amounts in different countries?", answers: ["Taxes", "Currencies", "No idea"] },
    { question: "if a factory automates, is that good or bad for the economy?", answers: ["Good", "Bad", "Both"] },
    { question: "why do prices almost never go back down?", answers: ["No idea", "Sticky prices", "Greed"] },
    { question: "is a booming stock market the same as a booming economy?", answers: ["Yeah", "No", "Not sure"] },
    { question: "when the news says 'recession,' what does that even mean?", answers: ["No clue", "Shrinking economy?", "Bad times"] },
    { question: "does trade with other countries make us richer or poorer?", answers: ["Richer", "Poorer", "Depends"] },
    { question: "why does one dollar buy less than it did 20 years ago?", answers: ["Inflation", "No idea", "Greed?"] },
    { question: "if everyone suddenly saved instead of spent, what happens?", answers: ["Economy slows", "Nothing", "Not sure"] },
    { question: "does a country's debt work like a person's credit card?", answers: ["Yeah", "Not really", "No idea"] },
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

  // Unit 2 - Income & Earning Power (15 lessons).
  "income-1":  { question: "would you rather get paid for the hours you work, or earn money while you sleep?", answers: ["Paid for hours", "While I sleep 😴", "Wait, both exist?"] },
  "income-2":  { question: "is it better to get paid by the hour or a fixed amount every year?", answers: ["By the hour", "Fixed salary", "What's the difference?"] },
  "income-3":  { question: "would you take a steady paycheck, or get paid more the more you sell?", answers: ["Steady paycheck", "Commission 💰", "Depends on the job"] },
  "income-4":  { question: "could you make a real living stitching together side gigs like DoorDash or Uber?", answers: ["Yeah, easily", "Maybe part-time", "No way"] },
  "income-5":  { question: "if a job offers $20/hr, is that what actually lands in your bank account?", answers: ["Yeah, right?", "No, it's less", "Wait, why less?"] },
  "income-6":  { question: "why is the number on your offer letter bigger than what you actually take home?", answers: ["Taxes", "No idea", "Hidden fees?"] },
  "income-7":  { question: "is a job worth it just because it pays a lot right now?", answers: ["Yeah, obviously", "Not always", "Depends"] },
  "income-8":  { question: "is spending years and thousands on school actually a good investment?", answers: ["Definitely", "Not always", "Depends on the field"] },
  "income-9":  { question: "would you rather be elite at one skill, or solid at a few that combine?", answers: ["One skill", "A few combined", "Not sure"] },
  "income-10": { question: "would you rather a guaranteed paycheck, or a business with no income ceiling?", answers: ["Guaranteed paycheck", "Own the business", "A bit of both"] },
  "income-11": { question: "is a four-year degree always worth more than learning a trade?", answers: ["Yeah", "Not always", "Depends"] },
  "income-12": { question: "who actually decides how much a job is allowed to pay?", answers: ["The boss", "Supply and demand?", "No idea"] },
  "income-13": { question: "if the economy tanks, how safe is your job really?", answers: ["Depends on the job", "Not very", "Never thought about it"] },
  "income-14": { question: "will there actually be Social Security money left by the time you retire?", answers: ["I doubt it", "Probably some", "What even is it?"] },
  "income-15": { question: "besides income tax, what else quietly takes a cut of your money?", answers: ["No idea", "Sales tax?", "Property stuff?"] },

  // Unit 3 - Budgeting Mastery (16 lessons).
  "budget-1":  { question: "does a budget control your money, or just show you where it went?", answers: ["Controls it", "Shows me", "Both?"] },
  "budget-2":  { question: "could you build a basic budget in under five minutes right now?", answers: ["No chance", "Maybe", "Yeah, easy"] },
  "budget-3":  { question: "do you actually know what you spent money on this week?", answers: ["Not a clue", "Roughly", "Yeah, all of it"] },
  "budget-4":  { question: "ever heard you should split income 50/30/20 into needs, wants, and savings?", answers: ["Nope", "Kinda", "Yeah, I use it"] },
  "budget-5":  { question: "does planning a whole month of money at once sound smart or impossible?", answers: ["Impossible", "Smart", "Never tried it"] },
  "budget-6":  { question: "if a surprise $300 bill hit tomorrow, could you cover it?", answers: ["Not even close", "Barely", "Yeah, easily"] },
  "budget-7":  { question: "when you get more money, do you save it or just spend more?", answers: ["Spend more 😅", "Save some", "Save most"] },
  "budget-8":  { question: "do you save toward specific goals, or just hope money's left over?", answers: ["Just hope", "Sometimes", "Yeah, specific goals"] },
  "budget-9":  { question: "should every single dollar you earn get a job before you spend it?", answers: ["Sounds intense", "Kinda smart", "Yeah, I do that"] },
  "budget-10": { question: "would a budgeting app actually help you, or would you just ignore it?", answers: ["I'd ignore it", "Maybe help", "Definitely help"] },
  "budget-11": { question: "how do you decide if a big purchase is actually worth it?", answers: ["I just buy it", "I think it over", "I compare a lot"] },
  "budget-12": { question: "ever notice a price ending in .99 makes something feel way cheaper?", answers: ["Totally", "Never noticed", "It's a trick, right?"] },
  "budget-13": { question: "would you budget a little to give away, even when money's tight?", answers: ["No way", "Maybe a little", "Yeah, I would"] },
  "budget-14": { question: "if a company rips you off, do you know who you'd even call?", answers: ["No idea", "Kinda", "Yeah"] },
  "budget-15": { question: "do you actually read the fine print before you sign or tap 'agree'?", answers: ["Never 😅", "I skim it", "Every word"] },
  "budget-16": { question: "if you got charged for something you never bought, could you fight it?", answers: ["No idea how", "Maybe", "Yeah, I would"] },

  // Unit 6 (id unit-5) - Credit & Debt (18 lessons).
  "credit-1":  { question: "is credit basically borrowing money you promise to pay back later?", answers: ["Yeah", "Kind of?", "Not sure"] },
  "credit-2":  { question: "did you know one number can decide if you get an apartment or a loan?", answers: ["Wait, seriously?", "Yeah, knew that", "What number?"] },
  "credit-3":  { question: "do you know what actually goes into your credit score?", answers: ["No clue", "Paying on time?", "Kinda"] },
  "credit-4":  { question: "is a credit card free money, or a trap waiting to happen?", answers: ["Kinda both", "A trap", "Free money 😏"] },
  "credit-5":  { question: "APR and APY sound identical - do you know which one costs you?", answers: ["No idea", "APR?", "I know this one"] },
  "credit-6":  { question: "can a debt actually grow on its own while you ignore it?", answers: ["Unfortunately yes", "No?", "How?"] },
  "credit-7":  { question: "would you borrow $40k for a degree without knowing the monthly payback?", answers: ["No way", "Maybe", "People do it all the time"] },
  "credit-8":  { question: "why would anyone agree to pay for a house for 30 straight years?", answers: ["No idea", "To own it eventually?", "Seems wild"] },
  "credit-9":  { question: "is it smarter to buy a car in cash or finance it?", answers: ["Cash", "Finance it", "Depends"] },
  "credit-10": { question: "with five debts to pay, would you knock out the smallest or the priciest first?", answers: ["Smallest", "Priciest", "No idea"] },
  "credit-11": { question: "if debt piled up, could you actually negotiate it down or get help?", answers: ["Didn't know you could", "Maybe", "Yeah"] },
  "credit-12": { question: "is bankruptcy a genuine fresh start, or a life-ruiner?", answers: ["Life-ruiner", "Fresh start", "Not sure"] },
  "credit-13": { question: "what's the very first thing you'd need to actually buy a house?", answers: ["No idea", "A down payment?", "Good credit?"] },
  "credit-14": { question: "do you have legal rights if a lender treats you unfairly?", answers: ["Probably", "No idea", "Yeah, I think so"] },
  "credit-15": { question: "did you know you can check your credit report for free every year?", answers: ["Wait, free?", "Yeah", "How?"] },
  "credit-16": { question: "do you know the first step to getting money for college?", answers: ["No clue", "FAFSA?", "Kinda"] },
  "credit-17": { question: "would you know what a lender checks before saying yes to a loan?", answers: ["No idea", "Credit and income?", "Sort of"] },
  "credit-18": { question: "are all student loans basically the same deal?", answers: ["Yeah", "No", "Not sure"] },

  // Unit 7 (id unit-6) - Introduction to Investing (12 lessons).
  "invest-1":  { question: "if you just stash cash forever, does it grow or quietly shrink?", answers: ["Grows", "Shrinks", "Stays the same?"] },
  "invest-2":  { question: "why does the same $5 buy less candy than it did a few years ago?", answers: ["Inflation", "No idea", "Stores being greedy?"] },
  "invest-3":  { question: "would you rather earn interest on your money, or on your money AND its interest?", answers: ["Just my money", "Money + its interest", "What's the difference?"] },
  "invest-4":  { question: "is $100 in your hand today worth more than $100 five years from now?", answers: ["Yeah", "No, same", "Why would it be?"] },
  "invest-5":  { question: "to earn bigger returns, do you have to accept bigger risk?", answers: ["Usually yeah", "No", "Not sure"] },
  "invest-6":  { question: "every time you spend money, are you quietly giving something else up?", answers: ["Yeah, actually", "Not really", "Like what?"] },
  "invest-7":  { question: "is it safer to bet everything on one thing, or spread it around?", answers: ["Spread it around", "One thing", "Depends"] },
  "invest-8":  { question: "should you invest money you might actually need next month?", answers: ["Sure", "No way", "Not sure"] },
  "invest-9":  { question: "did you know there are special accounts made just for investing?", answers: ["No idea", "Like a 401k?", "Kinda"] },
  "invest-10": { question: "if someone handed you $500 to invest today, would you know where to start?", answers: ["Not at all", "Sort of", "Yeah"] },
  "invest-11": { question: "who stops companies from just lying to their investors?", answers: ["No one?", "The government?", "The SEC?"] },
  "invest-12": { question: "would you invest now if it meant paying way less in taxes later?", answers: ["Definitely", "Maybe", "How does that work?"] },
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
  const idx = unitPos(lesson)
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
  // Lean on questions (a rich 10-deep pool, indexed by unit position) and dives
  // (title-based, unique per lesson); keep facts as a lighter accent. Style is
  // still stable per lesson so tap options always match what was asked.
  switch (hashId2(lesson.id) % 5) {
    case 0:
    case 1:
    case 2:
      return "question"
    case 3:
      return "dive"
    default:
      return "fact"
  }
}

// Short title-woven tie-ins appended to a category fact, so two fact-style
// lessons in the same unit never render the identical opener (the title is
// unique per lesson) - and it ties the surprising claim to today's topic.
const FACT_TIES: ((title: string) => string)[] = [
  (t) => `That's the door into ${t.toLowerCase()}.`,
  (t) => `Which is exactly why ${t.toLowerCase()} matters.`,
  (t) => `Keep that in mind as we get into ${t.toLowerCase()}.`,
  (t) => `And ${t.toLowerCase()} is where it starts to click.`,
  (t) => `Let's see how ${t.toLowerCase()} plays into that.`,
]

function factOpener(lesson: Lesson): string {
  const hay = `${lesson.category} ${lesson.title.toLowerCase()}`
  const idx = unitPos(lesson)
  for (const [re, facts] of FACT_HOOKS) {
    if (re.test(hay)) {
      const fact = facts[idx % facts.length](lesson.title)
      const tie = FACT_TIES[idx % FACT_TIES.length](lesson.title)
      return `${fact} ${tie}`
    }
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
  return NEUTRAL_OPTION_SETS[unitPos(lesson) % NEUTRAL_OPTION_SETS.length]
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
      return `${lead}${DIVE_OPENERS[unitPos(lesson) % DIVE_OPENERS.length](lesson.title)}`
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

// IB Economics is a standalone academic course (like Gulliver Intro), so its
// lessons get the same deep, teach-every-concept chat mode rather than the
// snappy one-idea personal-finance mode.
export function isIbEconLesson(lesson: Lesson): boolean {
  return lesson.track === "ib-econ" || lesson.category === "ib-economics"
}

// Any lesson that should use the deep (thorough, multi-beat, teach-everything)
// Jeff teaching mode instead of the snappy one-concept mode. Both academic
// course tracks qualify.
export function isDeepLesson(lesson: Lesson): boolean {
  return isGulliverIntroLesson(lesson) || isIbEconLesson(lesson)
}

// The course descriptor woven into the deep teaching prompt, so Jeff frames the
// lesson as part of the right class (business vs. economics).
function deepCourseLabel(lesson: Lesson): string {
  return isIbEconLesson(lesson)
    ? "IB Economics course, a rigorous academic economics class"
    : "Gulliver Introduction to Business course, a rigorous 9th-grade (age ~14) academic business class"
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

Keep each message under 40 words. Never use bullet points or headers. Sound like a knowledgeable friend, not a textbook.

${NO_DASH_RULE}${material}`
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

  return `You are Jeff, the teacher for this lesson in the ${deepCourseLabel(lesson)}. You are teaching '${lesson.title}', which covers '${lesson.description}'.

This is a real course, not a quick tip. Your job is to actually TEACH the whole lesson - explain the mechanisms and the WHY behind each idea, and cover ALL of the key concepts in it (not just one). But you deliver it in SMALL, readable steps that build on each other.

CRITICAL - message length and pacing:
- Each message teaches exactly ONE small idea. One idea per message, no more.
- Keep every message SHORT: 1 to 2 sentences, and under 40 words. It must fit on a phone screen and be readable in a single glance. Never write a long paragraph or cram multiple ideas into one message - that is the most important rule.
- Then stop and let the student tap a reply before you continue.
- Build up in order, simplest idea first: teach it, make sure it lands, then add the next idea on top of it. (Teach the most basic idea first, then the one that builds directly on it, and so on.)
- Use MANY short messages rather than a few long ones - aim for around ${GULLIVER_DEEP_TURNS} short beats total so you can be thorough without any single message getting long.
- Never just restate the previous point - each message adds one new thing.
- Highlight key vocabulary: the FIRST time you say an important term or its definition, wrap just that word or short phrase in **double asterisks** (e.g. **revenue**, **a good**). Do this only for the genuinely important terms - a few per lesson - never for whole sentences.

Style: clear, precise, and genuinely interesting - like a great teacher, not a textbook and not a hype account. Occasionally use one vivid real-world example a 14-year-old knows (part-time jobs, phones, sneakers, food trucks, streaming, games) to make an idea concrete - but keep even the example to one short message. Plain language; do not dumb the content down. ${budgetNote}${coverage}

When you have taught the full lesson, give a one-sentence synthesis of how the ideas fit together, then end your final message with exactly: 'Ready to test what you learned? 🎯' - this is the signal to show the quiz button.

The student already knows you - never introduce yourself. Do not use bullet points or headers; teach in short prose messages.

${NO_DASH_RULE}${material}`
}

export function buildSystemPrompt(lesson: Lesson, sentCount = 0, source?: string, mustCover?: string[]): string {
  return isDeepLesson(lesson)
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
  return {
    text: stripDashes((data?.text as string) || ""),
    options: ((data?.options as string[]) || []).map(stripDashes),
  }
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

// Wipe a lesson's saved conversation so the next open starts Jeff's class from
// the top - used when a student chooses to retake a completed lesson.
export function clearChat(lessonId: string) {
  try { localStorage.removeItem(storeKey(lessonId)) } catch { /* ignore */ }
}
