# Curriculum structure review: Units 1 to 4 (Personal Finance track)

Automated playtest, 2026-09-19. One test student (`qa-s2@investiplay.test`, real auth on the QA dev server) played all 50 lesson ids in Units 1 to 4 and recorded structure, repeats, contradictions, and ordering problems. Raw per-lesson transcripts are in the session scratchpad (`qa-s2/logs/*.log`); this is the reviewer's final report, lightly reformatted.

Caveat from the reviewer: it never gets bored and re-ran the same mastery check eight times without complaint. Anything called "long" or "repetitive" is a guess; watch a real student.

Result: Unit 1 9/9, Unit 2 14/15, Unit 3 13/16, Unit 4 10/10 completed. `psych-3` does not exist (Unit 1 ids are psych-1, 2, 4 to 10).

---

## A. Structure map

Every lesson uses the same 10-part skeleton regardless of topic:

Jeff chat (2 to 6 turns, 3 canned reply buttons each) → in-chat QUICK CHECK (1 activity) → chat recap + "Take the Quiz" → MICRO CHECK (2 or 3 timed MCQs) → APPLIED SCENARIO (narrative + 4 bullets) → APPLIED QUESTION (1 timed MCQ) → KEY TAKEAWAYS (5 bullets) → MASTERY CHECK (4 timed MCQs, must get 4/4) → MAKE IT STICK (free-text reflection, min 20 words, +15 coins) → results screen.

Every lesson is labelled "2 min lesson". Actual span is 11 to 12 graded questions plus a 20-word reflection; 6 to 10 minutes per lesson at machine speed.

Quick-check widget types: 3-option MCQ, True/False, fill-in-the-blank, 4-item categorise, 3-item ranking, "Which one is the money mistake?".

### Unit 1: The Psychology of Money (9 lessons)

| id | title | quick check | concepts taught |
|---|---|---|---|
| psych-1 (1.1) | Why People Mismanage Money | MCQ | dopamine from spending; present bias ($20 now vs $30 later); mental accounting; sunk-cost trap*; lifestyle creep*; avoiding statements (*quiz/scenario only, not chat) |
| psych-2 (1.2) | Delayed Gratification | categorise | 48-hour cooling-off rule, $40 threshold; concrete vs vague goals ("$600 laptop by December") |
| psych-4 (1.3) | Scarcity vs Abundance Mindset | 2-option scenario | scarcity narrows thinking; fear-hoarding + small splurges; undervaluing yourself; abundance = belief + action |
| psych-5 (1.4) | Money & Emotions | 2-option scenario | retail therapy; 24-hour cooling-off rule; name the feeling; free mood-lifters; "fun fund"* |
| psych-6 (1.5) | Social Influence & Spending | categorise | social proof; peer pressure; Malik's $120 vs $50 sneakers; name the real motive |
| psych-7 (1.6) | Advertising & Consumer Behavior | categorise | free-shipping threshold; loyalty points; A/B-tested checkouts; friction removal |
| psych-8 (1.7) | Behavioral Traps | True/False | loss aversion (2x pain); named only: confirmation bias, anchoring, framing, defaults, endowment effect, gambler's fallacy |
| psych-9 (1.8) | Identity & Money Habits | fill-in-blank x2 | identity drives habits; money scripts; "I am a saver"; every choice is a vote |
| psych-10 (1.9) | Healthy Financial Beliefs | ranking | balanced middle; "money is a tool, not a measure of worth"; test beliefs like claims; diminishing happiness returns |

### Unit 2: Income & Earning Power (15 lessons)

2.1 Active vs Passive Income · 2.2 Wages vs Salary (overtime 1.5x past 40h) · 2.3 Hourly vs Commission · 2.4 Gig Economy (contractor, set aside 25 to 30%, self-employment tax ~15.3%) · 2.5 Gross vs Net Pay (FICA 7.65% = 6.2% SS + 1.45% Medicare) · 2.6 Taxes (credits cut the bill dollar-for-dollar) · 2.7 Career ROI (Ben $80k degree vs Priya $8k training) · 2.8 Education as Investment · 2.9 Skill Stacking (1-in-10 x 3 = 1-in-1,000) · 2.10 Entrepreneurship Income · 2.11 College vs Trade School ROI · 2.12 How Labor Markets Set Your Pay · 2.13 Recessions & Unemployment (3 to 6 month emergency fund) · 2.14 Social Security (~40 credits, replaces ~40%, 62 vs 67) · 2.15 Local Taxes.

### Unit 3: Budgeting Mastery (16 lessons)

3.1 What is a Budget (every dollar a job) · 3.2 How to Make a Simple Budget (pay yourself first) · 3.3 Tracking Your Spending (underestimate by 20 to 40%; "$5 problem"*) · 3.4 The 50/30/20 Rule · 3.5 Monthly Budget · 3.6 Emergency Funds (teen target $300 to 500) · 3.7 Lifestyle Inflation ("save the raise") · 3.8 Goal Budgeting ($600 laptop = $50/month) · 3.9 Zero-Based Budgeting · 3.10 Digital Budget Tools · 3.11 Smart Buying (total cost of ownership; 24 to 48h waiting rule) · 3.12 Psychology of Pricing (charm pricing, anchoring, decoy, urgency) · 3.13 Giving Back · 3.14 Consumer Protection (FTC/CFPB) · 3.15 Reading Contracts · 3.16 Disputing Billing Errors (~60-day deadline).

### Unit 4: Investing Fundamentals (10 lessons)

4.1 Why Investing Beats Saving (7 to 10% vs <1%) · 4.2 Compound Interest & Rule of 72 · 4.3 Stocks · 4.4 Bonds · 4.5 Mutual Funds & ETFs · 4.6 Risk vs Return · 4.7 Diversification · 4.8 Bull vs Bear (dollar-cost averaging) · 4.9 Reading a Stock Chart · 4.10 Building Your First Portfolio (90/10 for teens).

---

## B. Repeats

1. **"Give every dollar a job" is the whole point of three lessons**: budget-1, budget-2, budget-9 (Zero-Based Budgeting). 3.1 and 3.2 could be one lesson; 3.9 adds only the irregular-income wrinkle.
2. **Lifestyle creep (psych-1) and lifestyle inflation (budget-7) are the same concept under two names**, and the app never says so.
3. **The cooling-off rule is taught three times with three different numbers** (see C.1).
4. **The $600 laptop appears in three lessons**: psych-2, budget-1 mastery Q3, budget-8.
5. **income-2 and income-3 both re-teach "hourly pay is unpredictable."** income-3's micro check Q3 is income-2's material. Merge candidate.
6. **income-7, income-8 and income-11 are three versions of the same ROI comparison** (degree vs training, borrowing without graduating, college vs trade school). Two lessons' worth of content in three.
7. **income-9 (Skill Stacking) and income-12 (Labor Markets) teach the same scarcity mechanism**, with the general principle arriving three lessons after its application.
8. **invfund-5 and invfund-7 overlap about 70%**: 4.5 already defines diversification and its quick check is a diversification fill-in; 4.7 re-teaches it. Diversification also closes 4.3. Three exposures, one idea.
9. **psych-9 and psych-10 are near-duplicates** ("the story you tell yourself drives behaviour; question the story"); psych-4 makes the same point a third time.
10. **psych-7 and budget-12 are the same lesson from two angles** (seller-side manipulation, ending on "name the tactic and slow down").
11. **Inside psych-1, the teaching example is reused verbatim as the mastery item** (present bias "$20 now or $30 in a month"; mental accounting "guard your paycheck but blow gift money").
12. **Jeff's opener is a rotating canned life update**: 9 variants across 34 lessons. "Just made myself a smoothie" opens six lessons; "just finished a pickup basketball game" opens six more.
13. **Distractor filler is recycled across the whole curriculum** so wrong answers are identifiable without knowing anything: "for the typical teenager", "in almost every situation", "in the majority of cases", "as a general rule", "according to most guides", "for most workers today", "in real practice". Sometimes stacked: invfund-8 has "according to most guides in the vast majority of situations."
14. **The unlabelled third micro-check.** Every non-first lesson in Units 2 to 4 shows 3 micro-check questions; the 3rd is a question from the previous lesson with no "review" label. Probably deliberate spaced review and good pedagogy, but unlabelled it reads as "testing something never taught". income-2 Q3 reviews compounding, which income-1 never taught. Confirmed 14 times across Units 2 to 4 (budget-10 Q3 reviews budget-9's Lucia example), so it is almost certainly deliberate spaced review. Recommendation: label it "Review from last lesson".

---

## C. Doesn't make sense

1. **The cooling-off rule has three durations.** psych-2: 48 hours. psych-5: 24 hours. budget-11: "Wait 24 to 48 hours" and renames it the "waiting rule".
2. **income-15 has a factually wrong answer and a self-arguing explanation.** Option "Buy Home A, it has a lower annual property tax bill" against Home A $200,000 x 2% and Home B $250,000 x 1.5%. Feedback verbatim: "Home A's tax is $4,000/year vs Home B's $3,750, wait, Home A is $4,000 and Home B is $3,750, so Home B saves you $250 yearly."
3. **budget-6 leaks a style instruction**: "A separate savings account is ideal - wait, no dashes! A separate savings account is perfect."
4. **psych-2 cites an invisible source**: "the source suggests $40 as a solid starting point."
5. **Fill-in-the-blank writes the student's WRONG word into the sentence as lesson text.** psych-9: "To question a money belief, you first have to ignore it it." and "acts like a loan for your new financial identity". invfund-5: "that's the power of debt."
6. **Emergency-fund size contradicts itself between units.** income-13: "3 to 6 months of expenses is your top protection." budget-6, later: the teen answer is "$300 to $500" and "the adult three to six months target is overkill". The earlier lesson is never corrected.
7. **The same payroll tax is two percentages.** income-4: self-employment tax "roughly 15.3%", save 25 to 30%. income-5: "FICA taxes of 7.65%". income-4 comes first and never explains it is the doubled rate.
8. **The same product pays three rates.** High-yield savings earns 4% (income-1), 0.5% (invfund-1), "like 1%" (invfund-6).
9. **budget-1 asks students to rank an emotion on a planned-ness scale**: "Impulse buying boba / Budgeting $40 for fun / Feeling guilty after spending". Feeling guilty isn't spending.
10. **psych-10 asks students to rank "based on what Jeff said"** items Jeff never mentioned (friendships) and never ranked.
11. **Two openers are non-sequiturs from a broken template.** invfund-2: "when you buy a stock, you literally own a slice of a real company. Which is exactly why compound interest & the rule of 72 matters." invfund-7: "$100 invested young can beat $1,000 invested later... Which is exactly why diversification matters."
12. **Lesson titles are pasted raw into sentences**: "We're on college vs trade school: what's the roi? today." "Here's a entrepreneurship income warm-up." "thinking about what is a budget & why it matters".
13. **invfund-9 is "Reading a Stock Chart" and contains no chart.** Jeff: "I can't show images, but picture your streaming bill history." Questions about axes, time frames, volume and moving averages are delivered as prose.
14. **Dangling references to examples never shown**: "Zoe in our example" (income-11), "the $6.50 popcorn trick" (budget-12), "sinking fund" undefined (budget-6), "the '$5 problem'" tested but never taught (budget-3 mastery Q1).
15. **Jeff offers a follow-up button and then refuses to answer it, eight times.** Examples: income-3 "What about salary" → "salary is a different lesson!" (it was the previous lesson); income-5 "What are FICA taxes" → declined right after using the term; income-11 "How do I calculate my own ROI" → "outside our lesson scope!" in a lesson titled "What's the ROI?"; budget-3 "Which budgeting apps do you recommend" → "outside my lane" (budget-10 is Digital Budget Tools); invfund-10 "How do I know which one to choose" → declined, the central question of the lesson.
16. **budget-14: Jeff answers the wrong question.** Tap "What is the FTC exactly", get the answer to the previous question, then the chat ends. FTC and CFPB are never explained, yet budget-15 reviews "Which agency handles complaints about banks?"
17. **A gendered nonsense distractor**: invfund-6 "Younger boys always earn higher returns according to most guides."
18. **The results screen claims adaptivity that doesn't exist.** "Questions adapted to your level", but a failed mastery check re-serves the identical four questions in the same order every attempt (8 consecutive attempts on psych-1; also invfund-1, budget-1, income-13).
19. **psych-4 tells a student who has never heard of investing that scarcity makes you avoid it.** Investing is Unit 4.
20. **income-12 example strains belief**: "A teen who repairs specialized medical equipment earns triple the one bagging groceries."

---

## D. Ordering and gaps

- **psych-8 tests four concepts it never teaches** (framing, confirmation bias, anchoring, endowment effect); the chat covers only loss aversion; pass bar is 4/4. Anchoring is actually taught 25 lessons later in budget-12.
- **Unit 1 teaches loss aversion entirely through a stock example** (psych-8) before stocks exist (invfund-3).
- **income-1 assumes dividends, shares, stock, high-yield savings** (Units 4 and 5). psych-2's mastery Q2 assumes compounding (invfund-2).
- **income-4 teaches self-employment tax, Social Security and Medicare before income-5 defines FICA** and before income-14 teaches Social Security.
- **income-13 teaches the emergency fund in full**, which is budget-6's entire subject, and assumes wants-vs-needs (budget-4) and credit-card debt (Unit 6).
- **income-12 is the principle behind income-9** but arrives three lessons later.
- **budget-1 tests "trade-off" and monthly goal amounts**, neither covered in its chat (the latter is budget-8's subject).
- **budget-3 points at budgeting apps and refuses to discuss them**, seven lessons before budget-10.
- **invfund-1 mastery Q4 tests fractional shares** (never taught). **invfund-2 micro check Q1 tests simple interest** (never taught). **invfund-3 takeaway 2 introduces IPOs and exchanges** (Unit 9). **invfund-4 introduces coupon, face value, maturity, portfolio in one recap sentence** and tests them; portfolio isn't defined until invfund-10.
- **budget-10 micro check Q2 tests two-factor login**, which the lesson never mentions (chat only says "choose a secure, reputable app").
- **Dollar-cost averaging is buried inside invfund-8 (Bull vs Bear)** rather than getting its own slot.
- **"Volatility" is used in 4.3 before it is explained in 4.6.**
- **Unit list ordering**: the sidebar shows Units 1 to 6, then Unit 35 (Insurance & Protection), then Unit 7.
- **`/lessons/psych-3` renders "Lesson not found."**

---

## E. Things that are actually broken

1. **Blocker: "Retake lesson" right after finishing dead-ends into a blank lesson shell** (title only, zero buttons). Reproduced 3x (psych-9, psych-2, budget-1). Does not happen when opening a completed lesson fresh by URL.
2. **Blocker: after failing the mastery check, "Reread the lesson with Jeff" opens a chat overlay containing only the final recap**, while underneath the mastery check has already restarted and its timer is running. Both layers live; Continue unclickable.
3. **Major: the app renders the student's wrong fill-in-the-blank word as a true statement** (psych-9, invfund-5), with a duplicated word ("ignore it it").
4. **Major: income-15 property-tax quick check has a wrong correct answer** and a self-contradicting explanation (see C.2).
5. **Major: invfund-6's in-chat QUICK CHECK renders empty** (heading, no question, no options) for ~20 seconds, then disappears; the +25 coins are lost.
6. **Major: a failed jeff-chat call (CORS preflight rejected on income-10) degrades into a generic line** with generic buttons and no error shown.
7. **Major: mastery check requires 4/4 and re-serves the identical four questions forever**, while the results screen says "Questions adapted to your level". 45 of 50 lessons produced at least one RETRY NEEDED screen.
8. **Major: questions run a hidden 13 to 22 second timer; timing out silently costs coins** ("-60 COINS LOST" is never explained).
9. **Minor: every lesson fires ~4 failed analytics writes** (`coins_spent` rejected by `analytics_events_event_check`, 172 times in one session).
10. **Minor: `/lessons/psych-3` returns "Lesson not found".**

Unconfirmed: the categorise ("Put each into the right group") widget stalled the reviewer's automation in five lessons but completed cleanly in six others; not reproducible by hand, so not reported as a bug. After such a stall, reloading dropped back to "Start Mission" with the chat gone, whereas a normally progressing lesson resumes.

---

## Where the reviewer got stuck as a user

1. psych-8: the chat taught only loss aversion, the takeaways slide named five more terms without definitions, the mastery check demanded 4/4 on those terms, and "Reread the lesson with Jeff" showed one recap message with nothing to reread. The honest next action was to guess until the shuffle landed right.
2. Six times Jeff offered a reply button he had written ("What is ROI exactly", "What are FICA taxes", "How do I know which one to choose") and then declined it as out of scope. By Unit 3 the reply buttons read as three ways to say "next". When Jeff does answer (the printer total-cost-of-ownership example in 3.11, the skill-stacking math in 2.9), it is the best writing in the product.
