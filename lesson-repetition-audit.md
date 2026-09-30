# InvestiPlay — Lesson Repetition Audit

**Scope:** every in-repo lesson-content and question-bank file — `src/data/**`,
`src/content/**`, and the root `gulliver-question-bank.md`. ~110 files, ~122,000
lines, **464 distinct lesson IDs** authored across them (973 total lesson-ID
authorings, i.e. ~500 duplicate authorings — see Category 1).

**Method:** the corpus was split into 4 thematic batches (Personal Finance ·
Investing/Markets · Business/Marketing/Strategy · Econ/Behavioral/Gulliver/quiz-
banks) and read in full by parallel agents, then cross-compared. This is a
read-only audit; **nothing was changed.**

> **Out of scope, by design:** the *live* curriculum also lives in Supabase
> curriculum tables (v2 pipeline). Those were not queried (no-SQL, read-only
> rule). The files below are the authoritative in-repo source that seeds and
> backs the hand-authored curriculum, so repetition here is real and shipping.

---

## Summary

| Category | What it is | Count of repeat groups found |
|---|---|---|
| 1. Exact duplicates | Same question/text word-for-word, or a whole lesson authored twice | **~18 files fully shadow-duplicated + 3 verbatim item/bank dupes** |
| 2. Near duplicates | Same question reworded / same worked example with only numbers or names changed | **~40 groups** (mostly renumbered arithmetic clones) |
| 3. Concept overlap | Same concept taught from scratch in multiple lessons as if new | **~35 concepts** re-taught 3–6× each |
| 4. Reused scenarios | Same character / company / dollar figure / story recurring (the "AI-generated" tell) | **Pervasive** — ~30-name character pool + ~15 recurring companies + ~20 recurring dollar scenarios |

### The 5 worst offenders

1. **Dual-authored "deep" vs. legacy content files (~18 files, tens of
   thousands of lines).** Every module has a newer `deep*.ts` file *and* an
   older standalone/expansion file authoring the **same lesson IDs**.
   `getStructuredContent` (`src/data/lessonContent.ts:1466`) concatenates the
   `deep*` arrays first and does `.find()`, so the deep copy wins and the older
   copy is **dead code that still ships in the bundle.** This is duplicate
   lesson content at the largest possible scale. → *Cut the shadowed files.*
2. **Character-name recycling across all 464 lessons.** A pool of ~30 first
   names (Priya, Maya, Marcus, Jordan, Leo, Sam, Sofia, Devon, Nina, Ava,
   Aisha, Diego, Elena, Kayla, Noah, Nadia, Tara…) is reused as *different
   people* in unrelated lessons in every batch. Priya alone appears in 30+
   lessons. This is the single biggest reason the content "feels AI-generated."
   → *Diversify the name pool or make recurring names intentional.*
3. **`gulliver-question-bank.md` is a verbatim dump of `ch1LOs.ts`** — all 84
   questions (prompt + options + explanation) are copied 1:1 from the Gulliver
   LO file. It is not independent content. → *Treat as one source; the .md is a
   generated artifact.*
4. **`topUp6*` / `topUp8*` quiz files re-test their own lesson with renumbered
   clones of the same arithmetic.** Gross-margin, free-cash-flow, current-yield,
   bond-duration, real-return, Rule-of-72 and P/E items appear in both the core
   pool and the top-up pool for the same lesson, differing only in the numbers —
   so one student can draw two versions of the identical math item.
5. **Cross-cutting investing concepts re-taught from scratch 5–6× each.**
   Diversification, dollar-cost averaging, emergency fund, "stay invested /
   markets recover," real return = nominal − inflation, leverage, and compound
   interest are each introduced as if new across the investing, behavioral,
   macro, planning, and AP-micro tracks, usually with the 2020 COVID crash as
   the go-to example.

**Factual inconsistencies surfaced by the duplication (worth fixing regardless):**
- VW 2015 emissions stock drop is **−40%** in `businessManagementContent.ts`
  (mgmt-8) but **−30%** in `pestelAnalysisContent.ts` (pestel-6).
- "Capital" is defined as **"NOT money, it's tools/equipment"** in
  `gullerIntro/block2.ts` (g21) but as **"money, tools, equipment, and
  buildings"** in `gullerIntro/ch1LOs.ts` (LO-1-2) — contradictory in the same track.
- Inflation "movie ticket" analogy: **$8→$12 (2010–2024)** in `deepBehavioralMacro.ts`
  (macro-1) vs **$5→$12 (1990–today)** in `deepOptionsAltPlanSim.ts` (plan-4).

---

## 1. Exact duplicates

### 1a. Whole-lesson double-authoring (STRUCTURAL — the big one)
Each older/standalone file below authors the **same lesson IDs** as a `deep*`
file. `lessonContent.ts:1466` orders `deep*` first, so the deep version is
served and the older file is dead-but-shipped duplicate content.

| Shadowed (dead) file | Lesson IDs | Winning (served) file |
|---|---|---|
| `investingFundamentalsContent.ts` | invfund-1..10 | `deepInvesting2.ts` |
| `businessManagementContent.ts` | mgmt-1..8 | `deepBizA.ts` |
| `marketingContent.ts` | mkt-1..8 | `deepBizA.ts` |
| `businessEthicsContent.ts` | ethics-1..6 | `deepBizA.ts` |
| `consumerBehaviorContent.ts` | cb-1..8 | `deepBizB.ts` |
| `marketingMixContent.ts` | mix-1..8 | `deepBizB.ts` |
| `pestelAnalysisContent.ts` | pestel-1..6 | `deepBizB.ts` |
| `marketResearchContent.ts` | mr-1..7 | `deepBizC.ts` |
| `leadershipManagementContent.ts` | lm-1..7 | `deepBizC.ts` |
| `strategicAnalysisContent.ts` | sa-1..8 | `deepBizC.ts` |
| `insuranceContent.ts` | ins-1..8 | `deepBankingInsurance.ts` |
| `savingsInvestExpansionContent.ts` | banking-9,10, … | `deepBankingInsurance.ts` |
| `creditExpansionContent.ts` | credit-8,11..18 | `deepCredit2.ts` |
| `incomeExpansionContent.ts` | income-11..15 | `deepIncome.ts` |
| `budgetExpansionContent.ts` | budget-11..16 | `deepBudget.ts` |
| `apMicroUnit1.ts` | apm-1-1..1-6 | `deepApMicro.ts` |
| `lessonContent.ts` (psych-1..10) | psych-1..10 | `deepEntreStrategyPsych.ts` |

Verified authoring examples: `deepBizA.ts` + `businessManagementContent.ts` both
define `mgmt-1`; `deepBizA.ts` + `marketingContent.ts` both define `mkt-1`;
`deepInvesting2.ts` + `investingFundamentalsContent.ts` both define `invfund-1`;
`deepApMicro.ts:799-1983` + `apMicroUnit1.ts:19-577` both define apm-1-1..1-6;
`deepEntreStrategyPsych.ts` + `lessonContent.ts` both define `psych-1`.

- **Suggestion:** **Cut** the shadowed files (or delete them from the
  `allContent` concat and keep only `deep*`). Keeping both doubles the
  maintenance surface and is why "the same lesson" often has two slightly
  different definitions. If any older file has a lesson the deep file lacks,
  migrate that one lesson before deleting.

### 1b. `gulliver-question-bank.md` == `ch1LOs.ts` (verbatim)
All 84 questions in the markdown bank are word-for-word twins of the
applied/mastery questions in `src/content/gullerIntro/ch1LOs.ts`.
- e.g. Bank LO1-1 Q3 "Why does the bank care about how much risk Maria…"
  (`gulliver-question-bank.md:20`) = `glo11-aq1` (`ch1LOs.ts:95`); Bank LO1-2 Q3
  "In Ava's lawn-care business…" (`:92`) = `glo12-aq1` (`ch1LOs.ts:252`); all of
  LO1-6/1-7/1-8 mastery items match 1:1.
- **Suggestion:** **Keep one source.** Treat the .md as a generated export of
  `ch1LOs.ts`; don't hand-edit or dedup against it as if independent.

### 1c. Verbatim item duplicates across two lessons
- **"Why is it said the entrepreneur 'gets paid last'?"** — identical prompt +
  all 4 options in `gullerIntro/block2.ts:286` (g21-p8) and
  `gullerIntro/block1.ts:468` (g13-cp2). → *Cut one; keep as an intentional
  callback in the later lesson at most.*
- **"What is the FIRST question to ask before choosing any fund?"** — identical
  question, options, and explanation in `quizzes/portfolioFundsBonds.ts:2210`
  (funds-10-q8) and `quizzes/topUp8Etfs.ts:302` (funds-10-tu2), same lesson
  pool. → *Cut the top-up copy.*
- **4 Ps of marketing** — "Product, Price, Place, Promotion" MCQ is near-verbatim
  in `deepBizA.ts:2262` (mkt-4) and `deepBizB.ts:1651` (mix-1). → *See §3.*

---

## 2. Near duplicates (reworded question / renumbered example, same answer)

### 2a. Cross-track: same worked example leaks between the benchmark and lesson quizzes
- **FDIC "$400,000 → split across two banks to stay insured"** —
  `assessmentQuestions.ts:141` (bm-8), `quizzes/diffBatch05.ts:60` & `:77`
  (banking-3), and `deepBankingInsurance.ts` banking-3 mastery + `quizzes/
  bankingCreditCore.ts:40`. → *Keep one canonical version per surface.*
- **HYSA "$10,000 at 4.5% vs 0.01% ≈ $449/yr"** — `assessmentQuestions.ts:127`
  (bm-7) and `quizzes/diffBatch05.ts:86` (banking-4-h3). → *Rewrite one.*
- **Rule of 72 "double at 8% = 9 years"** — `assessmentQuestions.ts:697` (bm-45),
  `quizzes/diffBatch09.ts:75` (invest-3-r7), `deepIncome`/`deepBankingInsurance`
  banking-4, `quizzes/topUp6Invest.ts`, `deepOptionsAltPlanSim.ts:2617` (plan-3).
  → *Vary the rate/amount per surface.*
- **Circuit breaker "halts at −7% for 15 min"** — `assessmentQuestions.ts:247`
  (bm-15) and `quizzes/topUp6MacroMkt.ts:80` (market-7-tu1). → *Rewrite one.*
- **Real return = nominal − inflation** — appears in ~7 places with swapped
  numbers: `assessmentQuestions.ts:517` (bm-33), `quizzes/diffBatch09.ts:29`
  (invest-2), `deepOptionsAltPlanSim.ts` plan-4, `quizzes/bubblesMacroIndicators.ts:179`
  (indicators-1), `quizzes/topUp6IndAlt.ts:6`, plus investing quizzes
  (invest-2-q4 1%/4%, invest-1-tu1 10%→7%, bonds-5 Leo 3%/5%). → *Consolidate.*
- **Bond seesaw "rates rise → existing lower-coupon bond price falls"** —
  `assessmentQuestions.ts:337` (bm-21, 3%→5%), `quizzes/bubblesMacroIndicators.ts:165`
  (macro-7), `quizzes/topUp6MacroMkt.ts:64` (3%→6%), `deepStatementsRatiosVal`/
  `deepPortfolioFundsBonds` bonds-6 (Diego / Nina) + `topUp8BondsMkt.ts:164`.
  → *One worked example, reused as an intentional recall.*
- **Loss aversion "a loss hurts ~2× an equal gain (Kahneman-Tversky)"** —
  `assessmentQuestions.ts:471` (bm-30) and `quizzes/behavioralMacro.ts:12`
  (behavior-1-q1). → *Rewrite one.*

### 2b. Renumbered-arithmetic clones inside one lesson's served pool (core vs. top-up)
These all land on the same answer with only the numbers changed, and both pools
feed the same lesson — so a student can get both:
- **Gross margin** (rev−COGS)/rev = 40/60/75%: `quizzes/statementsRatiosValuation.ts`
  fin-stmt-4-q2 `:353` ($100/$60), q3 `:366` (sneaker $500k/$200k), q8 `:431`
  (lemonade $2/$0.50) vs `quizzes/topUp8StmtComp.ts:102` (backpack $400k/$100k).
- **Free cash flow** (opCF−capex): five clones —
  `quizzes/statementsRatiosValuation.ts` fin-stmt-10-q2 `:903`, q5 `:942`, q8 `:981`
  vs `quizzes/topUp8StmtComp.ts:258` & `:271`.
- **Current yield** (coupon/price = 5-6%): `…portfolioFundsBonds.ts:2488` &
  `:2501` vs `quizzes/topUp8BondsMkt.ts:70`.
- **Bond duration × Δrate** (dur 5/6/8/10 × ±1%): `…portfolioFundsBonds.ts:2919`,
  `:2932` (Zoe), `:2958` (Mia) vs `quizzes/topUp8BondsMkt.ts:195`.
- **DCA total-share count**: `…portfolioFundsBonds.ts:381` ($10/$5/$100→30) vs
  `quizzes/topUp8Portfolio.ts:115` ($20/$10/$100→15).
- **P/E = 20**: `…marketsRatiosValuation.ts:69` ($60/$3) vs `topUp6Ratios.ts:8` ($80/$4).
- **EPS = $2.00**: ratios-2-q2 ($10M/5M) vs `topUp6Ratios.ts:17` ($8M/4M).
- **ROE = 20%**: ratios-5-q2 ($20M/$100M) vs `topUp6Ratios.ts:44` ($15M/$75M).
- **Dividend yield**: stocks-5-q2 ($2/$50=4%) vs `topUp6StkSim.ts:16` ($3/$60=5%).
- **Net-income waterfall / shareholder equity / total-return %** — same pattern
  (`statementsRatiosValuation.ts` vs `topUp8StmtComp.ts`; `portfolioFundsBonds.ts`
  vs `topUp8Portfolio.ts`).
- **Suggestion:** the `topUp6*/topUp8*` files were meant to *extend* a lesson,
  but they mostly **re-skin the core item's math.** Either rewrite the top-ups to
  test a genuinely different sub-skill, or drop them and widen the core pool.

### 2c. Business/marketing near-dupes (same concept, two lessons)
- **Penetration vs. skimming**, both using a **$1,200 phone** — `deepBizA.ts:2254`
  (mkt-4) and `deepBizB.ts:2043` (mix-3).
- **Value-based pricing** definition + options — `deepBizA.ts:2275` (mkt-4) and
  `deepBizB.ts:2050` (mix-3).
- **Exclusive distribution = a luxury watch** — `deepBizA.ts:2560` (mkt-5) and
  `deepBizB.ts:2264` (mix-4).
- **Buyer persona / segmentation / demographics-vs-psychographics** — `deepBizA.ts`
  mkt-2 (`:1873`, `:1929`, `:1971`) and `deepBizB.ts` cb-5/cb-6 (`:851`, `:920`, `:1064`).
- **SWOT "which two categories are internal?"** near-identical MCQ —
  `businessManagementContent.ts:465` (mgmt-4) and `strategicAnalysisContent.ts:257`
  (sa-3). **Porter's Five Forces** opens "Michael Porter, a Harvard professor"
  with the Boeing/Airbus airline example in both `businessManagementContent.ts:591`
  (mgmt-5) and `strategicAnalysisContent.ts:353` (sa-4). *(Both files are
  themselves shadowed per §1a, but the deep versions inherit the same overlap.)*
- **Suggestion:** these are structural overlaps between the 4-Ps mini-unit
  (mkt-4/5) and the full marketing-mix unit (mix-1..8), and between the
  management unit and the strategy unit — see §3.

### 2d. Personal-finance near-dupes
- **Passive-income "made once, keeps paying"** — Jaden e-book
  (`quizzes/incomeBankingCredit.ts:64`) ≈ Jaylen sticker pack (`deepIncome.ts:249`)
  ≈ "weekend online course" (`quizzes/topUp8Income.ts:22`). Same idea, renamed creator.
- **Credit-card minimum-payment trap "$1–2k @24% takes years + hundreds extra"**
  — `deepCredit2.ts:1037` (credit-6, $2,000), `deepCredit2.ts:629` (credit-4,
  $1,000), `quizzes/bankingCreditCore.ts:158`, `quizzes/topUp6Credit.ts:29`.
- **Auto-loan depreciation "$30k car −20% year one"** — `quizzes/diffBatch08.ts:59`,
  `:71`, `:77` (credit-9 hard+remedial restate the same fact three times).
- **"Latte factor" $5/day = $150/mo / $1,800/yr** — `deepBudget.ts:416` (budget-3)
  and `unitTestQuestions.ts:64` (ut-b-4).
- **Suggestion:** keep one worked instance per concept; make later appearances an
  explicit "remember when…" callback rather than a fresh teach.

---

## 3. Concept overlap (same concept taught from scratch as if new)

*Flagged where a concept is re-introduced as new, not deliberately reviewed.*

**Business / Strategy (heaviest cluster):**
- **The 4 Ps** — taught from first principles in the mkt-4 + mkt-5 mini-unit
  **and** re-taught across the entire mix-1..8 unit (`deepBizB.ts:1615+`; mix-2
  Product, mix-3 Price, mix-4 Place, mix-5 Promotion). *Massive redundancy.*
- **SWOT** — mgmt-4, sa-3, sa-5, sa-8 (`businessManagementContent.ts` /
  `strategicAnalysisContent.ts`, deep equivalents in `deepBizC.ts`).
- **Porter's Five Forces** — mgmt-5, sa-4, sa-6, sa-7.
- **KPIs / leading-vs-lagging** — mgmt-6 and sa-2 (both anchor on Netflix).
- **Org structure (flat/hierarchical, "How Companies Organize Themselves")** —
  mgmt-3 and lm-4, same Valve anchor.
- **Leadership styles / autocratic** — mgmt-2 and lm-2, both use a hospital-ER
  mastery question.
- **Segmentation & personas** — mkt-2, cb-5, cb-6. **Buyer journey vs. consumer
  decision process** — mkt-7 (4 stages) and cb-2 (5 stages), same phone/laptop framing.
- **Moat / competitive advantage / network effects / economies of scale /
  switching costs** — re-taught from scratch across `deepBizC.ts` sa-1 and
  `deepEntreStrategyPsych.ts` strategy-1..6 (network effects alone: sa-1,
  strategy-4, strategy-6). Severity HIGH.
- **Stakeholder theory** — `deepBizA.ts` mgmt-8 and ethics-3.

**Investing / Behavioral / Macro / Planning:**
- **Leverage** ("borrowed money magnifies gains & losses") — 5 lessons, each with
  its own worked example: `deepBehavioralMacro.ts:2051` (bubble-3),
  `deepOptionsAltPlanSim.ts:816` (options-5), `:1017` (alt-1), `:1576` (alt-3),
  `:1834` (alt-5).
- **Emergency fund** — 6+ lessons: `deepBudget.ts:1008` (budget-6),
  `deepIncome.ts:2875` (income-13), `deepBehavioralMacro.ts` bubble-6/indicators-6,
  `deepOptionsAltPlanSim.ts` alt-6/sim-1/sim-4, plus quizzes.
- **Diversification** — behavior-8, macro-6, invest-7, portfolio-3, sim-2/3/6.
- **Dollar-cost averaging** — behavior-6, bubble-6, sim-1, portfolio-4, stocks-9,
  plus `diffBatch11`/`bubblesMacroIndicators` quizzes.
- **"Stay invested / markets recover / missing the 10 best days"** — bubble-4,
  behavior-7, indicators-6, sim-1, sim-4, valuation-7. Severity HIGH.
- **Cyclical vs. defensive sectors** — fully taught in **both** macro-6
  (`deepBehavioralMacro.ts:4065`) and sim-3 (`deepOptionsAltPlanSim.ts:3617`),
  same 2008/2020 examples.
- **Inflation** — plan-4 (`deepOptionsAltPlanSim.ts:2809`) nearly re-teaches
  macro-1 (`deepBehavioralMacro.ts:3037`) wholesale.
- **Compound interest / Rule of 72 / start-early** — plan-2, plan-3, sim-5,
  banking-4, invest-1/3, plus benchmark and diffBatch pools.

**Personal Finance:**
- **FICA / payroll tax (7.65%)** — taught fresh in income-4, income-5, income-6,
  income-14 (`deepIncome.ts:1082`, `:1433`, `:1617`, `:3058`) + benchmark gb-tax-6.
- **FICO "payment history ~35% / utilization <30%"** — credit-2 and credit-3
  overlap heavily (`deepCredit2.ts:233`, `:418`) + `diffBatch07`.
- **APR vs. APY** — full in credit-5, re-explained in banking-4.
- **Deductible/premium tradeoff** — ins-2 and ins-5 both define from scratch.

**Economics (AP Micro & Gulliver/IB):**
- **Explicit/implicit cost + accounting-vs-economic profit** — apm-1-2, apm-1-5,
  apm-3-4 (compounded by the Unit-1 double-authoring → ~4-5 authorings).
- **Comparative advantage** — apm-1-4 and re-taught in apm-2-6.
- **Deadweight loss** introduced "fresh" in ~5 lessons (apm-2-5, apm-2-6, apm-4-1,
  apm-4-3, apm-5-4, apm-6-2).
- **Factors of production** — taught from scratch 3× in the Gulliver track:
  `block2.ts` (5 factors), `ch1LOs.ts` LO-1-2 (5 factors), `ibEcon/ch1Lessons.ts`
  1-1 (4 factors) — with the capital=money contradiction noted above.
- **Macro vs. micro / market vs. command economy** — `block4.ts`, `block5.ts`,
  and `ibEcon/ch1Lessons.ts` all teach it fresh.
- **Suggestion:** pick one "home" lesson per concept to teach it, and have the
  others reference it ("as you saw in budget-6…") instead of re-deriving. The
  investing cross-cutting set (diversification, DCA, stay-invested, real return)
  is the most in need of a single canonical teach + callbacks.

---

## 4. Reused scenarios (the "AI-generated" tell)

### 4a. Recycled character names (pervasive, all batches)
A pool of ~30 first names is reused for unrelated people across the whole
corpus. Approximate reuse counts:

| Name | Appears as different people in… |
|---|---|
| **Priya** | income-2/3/9/14, banking-1/4/9, budget-1/10/15, credit-5, ins-6, mgmt-8, mkt-6, cb-2, pestel-3, apm-1-1/2-2, behavior-2, indicators-3, options-2, macro-5, plan-5, sim-5, block2 job-offers, ibEcon "Priya's Saturday", + diffBatch pools (30+ lessons) |
| **Maya** | income-2/3/4/12/15, banking-5, budget-14/16, invfund-2, mgmt-5, cb (coffee), apm comparative-advantage, macro-1, alt-1, plan-1, sim-2, block2 bakery, batchB stocks-1, diffBatch (~15) |
| **Marcus** | income-4/9/14, banking-8, credit-1, ins-2/7, budget-2/11, mgmt-1, cb-3, pestel-4, biz-3, behavior-3, options-3, alt-4, funds-4, bonds-8, market-5, batchB stocks-10 |
| **Jordan** | income-1/2/4, banking-1, budget-1/12, ins-1, stocks-1 (sneaker co), portfolio-1, market-1, bonds-9, behavior-1, plan-1, sim-6, block1 hoodies, block2 sticker-shop, ch1LOs summer job |
| **Leo** | comparative-advantage apm-1-4/3-4, bubble-7, macro-4, options-5, block2 smoothie/Two-Towns, income/banking/budget diffBatch pools, mr-1, biz-5, psych |
| **Sam / Sofia / Devon / Nina / Ava / Aisha / Diego / Elena / Kayla / Noah / Nadia / Tara** | each reused across 4–9 unrelated lessons |

Name collisions that read badly: **three different "Leo"** all make risky bets;
**two "Marcus"** both over-believe a stock/coin; **two "Dana"** (`deepBizA` ethics-5
+ `deepBizB` pestel-5), **two "Priya"** in the Gulliver track alone.
- **Suggestion:** expand the name pool substantially, or deliberately keep a small
  recurring cast *with consistent identities* (a "Priya" who is always the same
  person) so recurrence feels like continuity, not filler.

### 4b. Recurring companies / brands
- **Apple / iPhone / Steve Jobs** — mkt-1/3, mix-2/3, cb-7, mgmt-2 (Jobs
  autocratic), lm-1, pestel-2, sa-4, options-1, `stocksData.ts`, `assessmentQuestions.ts`,
  `curatedTickers.ts` (8+ files).
- **Netflix** — mgmt-4 (SWOT), mr-4, cb-5, sa-2, mix-2/6, pestel-1/5, bubble-4.
- **Nike / Air Jordan / Kaepernick** — mkt-2, cb-8 (whole lesson), pestel-4,
  `stocksData.ts`.
- **Coca-Cola** — cb-5, mix-2/4/5, `stocksData.ts`.
- **Amazon** — cb-2, mix-4, mgmt-6, sa-7, bubble-2 (dot-com survivor).
- **Patagonia "Don't Buy This Jacket"** — mgmt-8, mkt-6, ethics-2, cb-5, `topUpMarketing.ts:388`.
- **Volkswagen $33B emissions** — mgmt-8, ethics-6, pestel-6, `topUpBusiness.ts:520`
  (with the −40%/−30% inconsistency).
- **GameStop 2021 / Lehman 2008 / Pets.com / Madoff / FTX** — recur across
  `deepBehavioralMacro.ts`, `bubblesMacroIndicators.ts`, `topUp6BubOpt.ts`,
  `topUp6IndAlt.ts` (bubble/crash examples).
- **Suggestion:** fine to reuse real brands as canonical examples, but reconcile
  the conflicting figures and vary which brand illustrates which concept.

### 4c. Recurring fictional-business motifs & dollar figures
- **Lemonade / sneaker / candle / bakery / food-truck small business** — the
  default scenario setting everywhere. "Mia & Jake lemonade stand $2/cup" is
  reused across mkt-1 and mix-1 (`marketingContent.ts:58`, `marketingMixContent.ts:58`);
  a "lemonade stand" also appears in fin-stmt-1/3/4/6. Sneaker/sneaker-resale
  recurs in stocks-1, fin-stmt statements set, block1, cb-1, ethics-3.
- **$52,000 salary** — income-2 (`deepIncome.ts:382`), income-5, `topUp8Income.ts:40`.
- **$300,000 home, 20% down = $60,000** / **$300k mortgage 3%→7%** — credit-8
  (`bankingCreditCore.ts:181`), income-15 property tax, macro-5
  (`deepBehavioralMacro.ts:3858`), alt-1 rental (`deepOptionsAltPlanSim.ts:1016`),
  `diffBatch08.ts` credit-8.
- **24% APR credit-card balance ($1–5k)** — credit-4/6, bm-9, bm-49,
  `diffBatch06/07`, plan-1 ("paid before investing").
- **$400,000 → two FDIC banks** and **$250,000 FDIC limit** — banking-3, bm-8,
  `diffBatch05`, `topUp6Banking.ts`.
- **$600 savings goal (laptop/phone/keyboard/bike)** — budget-1/8, credit-1,
  psych-2/4 (`deepEntreStrategyPsych.ts:1769+`), block-scenarios.
- **$1,200 phone → skimming** — mkt-4 and mix-3 (see §2c).
- **2020 COVID crash "−34% in ~33 days, recovered by August"** — the universal
  crash example, ~8 uses across bubble-4, behavior, indicators, sim-1/4,
  invfund-6, macro (`deepBehavioralMacro.ts:2235`, `deepOptionsAltPlanSim.ts:3218/3827`).
- **4% rule → $500k = $20,000/yr** — sim-5, plan pools, invest.
- **"$1,000 bond @ 4% coupon"** — the canonical bond throughout the bonds/funds pools.
- **Suggestion:** rotate the numeric setups and settings so the same dollar figure
  isn't the answer to a dozen different questions; it's the clearest signal that
  the items were generated from one template.

---

## Appendix — coverage & method notes

- **Files read in full** (per-item inventories with line numbers preserved in
  `/tmp/audit-batch*.md`): all `src/data/*.ts` content + quiz files, all
  `src/content/**` (gullerIntro blocks 1–6, ch1LOs, scenarios; ibEcon;
  stockPredictionDraft), and root `gulliver-question-bank.md`.
- **Not lesson prose (noted, not audited for teaching repeats):** `stocksData.ts`
  (mock ticker table), `higherOrLowerData.ts` (game data), `bankData.ts` /
  `benchmarkBankGenerated.ts` (virtual-bank catalog), `labDocuments.ts` (IRS/
  banking form-field simulation data with one recurring "Alex Rivera / Sunrise
  Café" persona), `careers.ts` (career scenarios). Flagged only where a name/
  figure leaks into taught content (e.g. "Alex Rivera" also = an unrelated
  founder in mgmt-2).
- **By-design repetition NOT flagged as defects:** `diffBatch*` `-hard`/
  `-remedial` pairs and `topUp*` files are intentional difficulty/extension
  variants of one lesson; within-family concept repetition there is expected.
  They are only flagged (§2b) where they re-skin the *identical arithmetic* of
  the core item, which lets one student draw two copies of the same question.
- **Nothing was modified.** This report is the only file written.
