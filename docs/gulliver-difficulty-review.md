# Gulliver LO Difficulty — Human Review Table

> Generated 2026-09-04 for overnight-build Priority 2.

## ⚠️ Read this first — the spec premise was off

Priority 2 assumed these questions were **untagged** and asked for a 1–5 difficulty scale. In reality **every one of the 64 gulliver-lo-1-1…1-8 questions is already tagged** with a `difficulty` value — but on the **IRT b-parameter (logit) scale** that the adaptive engine actually consumes (see `src/lib/adaptiveEngine.ts` and the `difficulty` doc-comment in `src/types/index.ts`). On that scale negative = easier, 0 = medium, positive = harder.

**Do NOT add a separate 1–5 `difficulty` field.** `selectNextQuestion` reads `difficulty` as the IRT b-value; a 1–5 number in the same field would make every question look "very hard" (b=1…5) and break adaptive selection. The 1–5 column below is a **pedagogical read-out only**, for your review — not something to write back into the code.

Mapping used: b≤−1.5 → 1 (recall) · −1.0/−0.5 → 2 (basic application) · 0 → 3 (multi-step) · 0.5 → 4 (complex scenario) · ≥1.0 → 5 (synthesis).

### gulliver-lo-1-1 (4 questions)

| # | Question ID | IRT b (current) | Proposed 1–5 | Question |
|---|---|---|---|---|
| 1 | `glo11-aq1` | 0.5 | 4 | Why does the bank care about how much risk Maria is taking on with the second truck? |
| 2 | `glo11-mx-1` | -0.5 | 2 | What is the difference between revenue and profit? |
| 3 | `glo11-mx-2` | 0 | 3 | What is the difference between standard of living and quality of life? |
| 4 | `glo11-mx-3` | 0.5 | 4 | What is risk, and how is it related to profit? |

### gulliver-lo-1-2 (8 questions)

| # | Question ID | IRT b (current) | Proposed 1–5 | Question |
|---|---|---|---|---|
| 1 | `glo12-aq1` | 0.5 | 4 | In Ava's lawn-care business, what role is SHE playing among the five factors of production? |
| 2 | `glo12-mx-1` | -1.5 | 1 | Which factor of production refers to natural resources like water, soil, and oil? |
| 3 | `glo12-mx-2` | -1 | 2 | Which factor of production is 'the money, tools, equipment, and buildings needed to operate and grow a business'? |
| 4 | `glo12-mx-3` | 0.5 | 4 | Why are entrepreneurship and knowledge considered the most important factors of production today? |
| 5 | `glo12-mx-4` | -1 | 2 | What is the main advantage of working for someone else instead of starting your own business? |
| 6 | `glo12-mx-5` | -0.5 | 2 | What is the main advantage an entrepreneur gains by giving up those guaranteed benefits? |
| 7 | `glo12-mx-6` | 1.5 | 5 | Two countries have identical amounts of land, labor, and capital. What would most likely make one of them wealthier than the other? |
| 8 | `glo12-mx-7` | 1 | 5 | Why is entrepreneurship sometimes called the 'spark' factor of production? |

### gulliver-lo-1-3 (9 questions)

| # | Question ID | IRT b (current) | Proposed 1–5 | Question |
|---|---|---|---|---|
| 1 | `glo13-aq1` | 0.5 | 4 | Why might the entrepreneur choose Country A even though Country B has more potential customers? |
| 2 | `glo13-mx-1` | -1 | 2 | What does 'enforceable contracts' mean for a business owner? |
| 3 | `glo13-mx-2` | -1 | 2 | Why does a stable, tradable currency matter to a business? |
| 4 | `glo13-mx-3` | -0.5 | 2 | How does corruption in business and government generally affect entrepreneurs? |
| 5 | `glo13-mx-4` | 0 | 3 | What is the general relationship between tax/regulation levels and business risk? |
| 6 | `glo13-mx-5` | 1 | 5 | A country allows private ownership but has an unstable, hard-to-trade currency. What's the likely effect on entrepreneurs there? |
| 7 | `glo13-mx-6` | 1 | 5 | From a government's perspective, why might keeping taxes and regulations moderate benefit the country overall? |
| 8 | `glo13-mx-7` | 0 | 3 | Which combination describes an economic environment that LOWERS risk for entrepreneurs? |
| 9 | `glo13-mx-8` | -1.5 | 1 | What does it mean for a country to allow 'private ownership' of businesses? |

### gulliver-lo-1-4 (9 questions)

| # | Question ID | IRT b (current) | Proposed 1–5 | Question |
|---|---|---|---|---|
| 1 | `glo14-aq1` | 1 | 5 | Why did the new ordering system improve efficiency specifically, not just productivity? |
| 2 | `glo14-mx-1` | -0.5 | 2 | What is 'effectiveness'? |
| 3 | `glo14-mx-2` | 1 | 5 | A worker perfectly completes a task that didn't actually need to be done. What does this describe? |
| 4 | `glo14-mx-3` | -1 | 2 | Which best defines productivity? |
| 5 | `glo14-mx-4` | 0 | 3 | How do consumers typically benefit when a business becomes more productive? |
| 6 | `glo14-mx-5` | 0.5 | 4 | A company invests in expensive new equipment even though it costs a lot upfront. Why might this make sense? |
| 7 | `glo14-mx-6` | 1 | 5 | Which scenario is the BEST example of a technology improving efficiency specifically? |
| 8 | `glo14-mx-7` | 1.5 | 5 | Why does technology's 'real payoff' come from improving effectiveness, efficiency, AND productivity together, rather than just one? |
| 9 | `glo14-mx-8` | -1 | 2 | Which term means 'the amount of output produced for a given amount of input, such as units made per hour worked'? |

### gulliver-lo-1-5 (8 questions)

| # | Question ID | IRT b (current) | Proposed 1–5 | Question |
|---|---|---|---|---|
| 1 | `glo15-aq1` | 0.5 | 4 | Why does Store B have a competitive edge over Store A, even though they sell the exact same products? |
| 2 | `glo15-mx-1` | -1.5 | 1 | What is a 'competitive edge'? |
| 3 | `glo15-mx-2` | -1 | 2 | What does it mean to exceed customer expectations, rather than just meet them? |
| 4 | `glo15-mx-3` | 0.5 | 4 | Why would a business aim for 'zero defects' instead of just 'mostly good' products? |
| 5 | `glo15-mx-4` | -1 | 2 | What is a 'frontline worker'? |
| 6 | `glo15-mx-5` | -0.5 | 2 | Why might a business that empowers its frontline workers create a better customer experience? |
| 7 | `glo15-mx-6` | 1 | 5 | Two businesses sell identical products at the same price. How could one still gain a real competitive edge? |
| 8 | `glo15-mx-7` | 1 | 5 | What is the connection between empowering frontline workers and exceeding customer expectations? |

### gulliver-lo-1-6 (10 questions)

| # | Question ID | IRT b (current) | Proposed 1–5 | Question |
|---|---|---|---|---|
| 1 | `glo16-aq1` | 0 | 3 | Why was the first draft of the diversity policy incomplete? |
| 2 | `glo16-mx-1` | -1.5 | 1 | Which of these groups is part of the modern definition of workplace diversity? |
| 3 | `glo16-mx-2` | -0.5 | 2 | What does 'managing diversity' actually require from a business? |
| 4 | `glo16-mx-3` | 0.5 | 4 | Why is Social Security discussed so much in the media today? |
| 5 | `glo16-mx-4` | 0 | 3 | Which statement BEST reflects how diversity has changed as a concept over time? |
| 6 | `glo16-mx-5` | 1 | 5 | How does an aging population connect to businesses, not just government? |
| 7 | `glo16-mx-6` | 0.5 | 4 | A company assumes diversity only means hiring people of different races. What is this company most likely to overlook? |
| 8 | `glo16-mx-7` | 0.5 | 4 | Which of the following is an accurate description of Social Security's funding? |
| 9 | `glo16-mx-8` | 1 | 5 | A company operates in five countries with a workforce spanning four generations, several religions, and many first languages. Which approach best reflects managing diversity WELL? |
| 10 | `glo16-mx-9` | 1 | 5 | As the population ages, a large employer sees many workers nearing retirement and rising payroll contributions. Which combination of effects is it most likely planning around? |

### gulliver-lo-1-7 (8 questions)

| # | Question ID | IRT b (current) | Proposed 1–5 | Question |
|---|---|---|---|---|
| 1 | `glo17-aq1` | 0.5 | 4 | Why do the defense manufacturer and the travel company react so differently to the same conflict? |
| 2 | `glo17-mx-1` | -0.5 | 2 | Why are China and India specifically named as major competitive challenges for U.S. businesses? |
| 3 | `glo17-mx-2` | -1 | 2 | Which industry tends to PROSPER during periods of war, according to the chapter? |
| 4 | `glo17-mx-3` | -0.5 | 2 | What is one suggested way to help minimize world tensions? |
| 5 | `glo17-mx-4` | 1.5 | 5 | How does this lesson connect back to the economic environment factors from lesson 1.3 (enforceable contracts, stable currency, low corruption)? |
| 6 | `glo17-mx-5` | 0.5 | 4 | A U.S. airline's bookings to a region drop sharply after reports of instability there. What does this best illustrate? |
| 7 | `glo17-mx-6` | 0 | 3 | Why do businesses need to track global events, not just domestic ones? |
| 8 | `glo17-mx-7` | 0.5 | 4 | What is the key takeaway about how war and terrorism affect businesses overall? |

### gulliver-lo-1-8 (8 questions)

| # | Question ID | IRT b (current) | Proposed 1–5 | Question |
|---|---|---|---|---|
| 1 | `glo18-aq1` | 0 | 3 | What is the main lesson this family's history illustrates for someone heading into college and a career today? |
| 2 | `glo18-mx-1` | -0.5 | 2 | What is the general repeating pattern described in U.S. economic history? |
| 3 | `glo18-mx-2` | -1 | 2 | Why did many agricultural workers move into factory jobs historically? |
| 4 | `glo18-mx-3` | 0 | 3 | What combination of factors pushed many factory workers into service industries? |
| 5 | `glo18-mx-4` | 0.5 | 4 | How does the shift toward the information age relate to earlier economic shifts? |
| 6 | `glo18-mx-5` | -0.5 | 2 | What is the main takeaway from this repeating pattern for a student planning a future career? |
| 7 | `glo18-mx-6` | 0.5 | 4 | A worker in a shrinking industry retrains for a role in a growing, technology-driven field. What historical pattern does this best match? |
| 8 | `glo18-mx-7` | 1 | 5 | Which best summarizes what U.S. economic history shows about jobs over time? |


_Total: 64 questions across 8 learning objectives. No code changed — this is a review artifact only._
