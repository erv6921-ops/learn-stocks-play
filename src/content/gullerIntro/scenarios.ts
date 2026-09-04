// ═══════════════════════════════════════════════════════════════
// GULLIVER SCENARIO FREE-RESPONSE PROMPTS  (overnight-build P4)
// ───────────────────────────────────────────────────────────────
// Open-ended, applied prompts a student answers in their own words AFTER
// finishing a lesson. These are deliberately UNGRADED and teacher-review-only:
//   • they never touch mastery score or ability theta
//   • the student just writes, submits, and gets a "your teacher will read this"
//     confirmation — there is no auto-scoring
// Responses are stored in the `scenario_responses` table (see BUILD-SUMMARY.md
// for the migration) and surfaced in the Teacher Dashboard → Scenarios tab.
//
// Authoring rule: each prompt should force APPLICATION of the LO's key terms to
// a concrete, relatable situation — not a definition. A short answer (25+ words)
// should require naming specific stakeholders / trade-offs, not just one word.
// ═══════════════════════════════════════════════════════════════

export interface ScenarioPrompt {
  id: string
  prompt: string
  /** Optional nudge shown under the box; never a full answer. */
  hint?: string
}

export interface ScenarioSet {
  title: string
  subtitle: string
  /** Minimum words before the student can submit (ungraded, just a floor). */
  minWords: number
  prompts: ScenarioPrompt[]
}

const SETS: Record<string, ScenarioSet> = {
  "gulliver-lo-1-1": {
    title: "Scenario Challenge",
    subtitle: "Optional — your teacher reads these, they don't affect your score.",
    minWords: 25,
    prompts: [
      {
        id: "sc-glo11-1",
        prompt:
          "Your friend wants to start a tutoring business at your school. Name at least three different stakeholders they should think about, and explain what each one would care about.",
        hint: "Think beyond just customers — who else is affected?",
      },
      {
        id: "sc-glo11-2",
        prompt:
          "A new boba tea shop is deciding whether to run its own delivery drivers (insourcing) or pay DoorDash to deliver (outsourcing). Explain two trade-offs the owner should weigh before deciding.",
        hint: "Consider cost, control, and quality on each side.",
      },
      {
        id: "sc-glo11-3",
        prompt:
          "Describe a real business you know well. Identify at least three of its stakeholders, then describe one decision where two stakeholders' interests might pull in opposite directions.",
      },
      {
        id: "sc-glo11-4",
        prompt:
          "An entrepreneur can open a safe vending-machine route with small, steady profit, or a risky food truck that could earn a lot more or fail. Explain how risk and profit are related, then say which you'd choose and why.",
        hint: "Tie your choice back to the risk↔profit relationship.",
      },
      {
        id: "sc-glo11-5",
        prompt:
          "A clothing brand could boost this year's profit by switching to a cheaper factory with poor working conditions. Using the idea of stakeholders, explain why this 'profit' could actually raise the company's risk.",
      },
      {
        id: "sc-glo11-6",
        prompt:
          "A nonprofit animal shelter says, \"We're not a business, so we don't need to worry about money.\" Explain why the shelter still has to follow business principles to keep helping animals.",
        hint: "What happens to the mission if revenue can't cover costs?",
      },
    ],
  },

  // LO 1-2: Entrepreneurship & the five factors of production
  "gulliver-lo-1-2": {
    title: "Scenario Challenge",
    subtitle: "Optional — your teacher reads these, they don't affect your score.",
    minWords: 25,
    prompts: [
      {
        id: "sc-glo12-1",
        prompt:
          "A student starts a custom-sticker business from their bedroom. Identify at least three of the five factors of production they'd use, and explain what each one contributes.",
        hint: "The five: land, labor, capital, entrepreneurship, knowledge.",
      },
      {
        id: "sc-glo12-2",
        prompt:
          "Some people say the safest choice is always to work for someone else. Give one real advantage of entrepreneurship and one real advantage of being an employee, and explain the trade-off.",
      },
      {
        id: "sc-glo12-3",
        prompt:
          "Two countries have the same land and labor, but one is far wealthier. Using the factors of production, explain how entrepreneurship and knowledge could account for the difference.",
      },
      {
        id: "sc-glo12-4",
        prompt:
          "Pick something you'd love to make or sell. Describe how you'd combine at least four of the five factors of production to actually create and deliver it to customers.",
      },
      {
        id: "sc-glo12-5",
        prompt:
          "Explain why economists often call entrepreneurship and knowledge the most important factors of production today, and give an example that shows why.",
        hint: "What do those two add that land and capital alone can't?",
      },
    ],
  },

  // LO 1-3: Government, taxes, regulation, and the economic environment
  "gulliver-lo-1-3": {
    title: "Scenario Challenge",
    subtitle: "Optional — your teacher reads these, they don't affect your score.",
    minWords: 25,
    prompts: [
      {
        id: "sc-glo13-1",
        prompt:
          "Two friends want to open a business — one in a country with strong contract laws and low corruption, one where neither exists. Explain how the economic environment changes the risk each faces.",
      },
      {
        id: "sc-glo13-2",
        prompt:
          "A city raises business taxes and adds new safety regulations. Explain one way this could lower a business's risk to society and one way it could raise the business's own costs or risk.",
      },
      {
        id: "sc-glo13-3",
        prompt:
          "Explain why being able to own property privately and enforce contracts makes people more willing to start businesses. Use a concrete example.",
        hint: "What would you fear if contracts couldn't be enforced?",
      },
      {
        id: "sc-glo13-4",
        prompt:
          "Some regulations protect customers or workers; some just add cost. Describe one regulation you think is worth it and one you'd question, and explain your reasoning.",
      },
      {
        id: "sc-glo13-5",
        prompt:
          "A country's currency suddenly becomes unstable. Explain how that makes it harder for an entrepreneur to plan, set prices, and get paid.",
      },
    ],
  },

  // LO 1-4: Effectiveness, efficiency, productivity, and technology
  "gulliver-lo-1-4": {
    title: "Scenario Challenge",
    subtitle: "Optional — your teacher reads these, they don't affect your score.",
    minWords: 25,
    prompts: [
      {
        id: "sc-glo14-1",
        prompt:
          "Explain the difference between being effective and being efficient, then give an example of a business that is clearly one but not the other.",
      },
      {
        id: "sc-glo14-2",
        prompt:
          "A coffee shop buys a machine that makes drinks twice as fast. Explain how this could raise productivity, and who benefits: the worker, the business, and the customer.",
      },
      {
        id: "sc-glo14-3",
        prompt:
          "Productivity means getting more output from the same input. Describe one change you could make in a job or chore to be more productive, and how you'd measure the improvement.",
      },
      {
        id: "sc-glo14-4",
        prompt:
          "New technology sometimes replaces tasks workers used to do. Explain one way technology can benefit workers rather than just replace them.",
        hint: "Think about the kinds of work it frees people up to do.",
      },
      {
        id: "sc-glo14-5",
        prompt:
          "A factory produces a lot of products (efficient) but many are defective, so customers return them. Explain why being efficient isn't enough if you're not also effective.",
      },
    ],
  },

  // LO 1-5: Competitive edge, zero defects, exceeding expectations, empowerment
  "gulliver-lo-1-5": {
    title: "Scenario Challenge",
    subtitle: "Optional — your teacher reads these, they don't affect your score.",
    minWords: 25,
    prompts: [
      {
        id: "sc-glo15-1",
        prompt:
          "Pick a business you use often. Describe its competitive edge — one specific thing it does better than rivals — and explain why that keeps you coming back.",
      },
      {
        id: "sc-glo15-2",
        prompt:
          "Explain what 'zero defects' means and why aiming for it can actually save a business money, using an example.",
      },
      {
        id: "sc-glo15-3",
        prompt:
          "A hotel lets front-desk workers fix guest problems on the spot without asking a manager. Explain how empowering frontline workers can help the business exceed customer expectations.",
      },
      {
        id: "sc-glo15-4",
        prompt:
          "Describe a time a business exceeded your expectations, or failed to. Explain what they did, and how it affected whether you'd return or recommend them.",
      },
      {
        id: "sc-glo15-5",
        prompt:
          "Two stores sell the same product at the same price. Explain two things one store could do to build a competitive edge without lowering the price.",
        hint: "Service, speed, and experience are all part of the edge.",
      },
    ],
  },

  // LO 1-6: The broader definition of diversity; aging population & Social Security
  "gulliver-lo-1-6": {
    title: "Scenario Challenge",
    subtitle: "Optional — your teacher reads these, they don't affect your score.",
    minWords: 25,
    prompts: [
      {
        id: "sc-glo16-1",
        prompt:
          "The modern definition of diversity goes beyond race and gender. Explain what else it can include, and give one way a more diverse team could help a business make better decisions.",
      },
      {
        id: "sc-glo16-2",
        prompt:
          "As the population ages, more people retire and fewer workers pay into Social Security. Explain one challenge and one opportunity this creates for businesses.",
      },
      {
        id: "sc-glo16-3",
        prompt:
          "Describe a product or service that would sell well to an aging population. Identify who its stakeholders are and explain why demand for it is growing.",
      },
      {
        id: "sc-glo16-4",
        prompt:
          "Explain how a business that ignores diversity — in its hiring OR in the customers it serves — could be taking on a risk it doesn't realize.",
      },
      {
        id: "sc-glo16-5",
        prompt:
          "Social Security is funded by current workers to pay current retirees. Explain why a shrinking ratio of workers to retirees matters to businesses and to young workers today.",
        hint: "Who pays, and what happens as that group shrinks?",
      },
    ],
  },

  // LO 1-7: China & India as competitive challenges; war/terrorism and industries
  "gulliver-lo-1-7": {
    title: "Scenario Challenge",
    subtitle: "Optional — your teacher reads these, they don't affect your score.",
    minWords: 25,
    prompts: [
      {
        id: "sc-glo17-1",
        prompt:
          "China and India have huge, fast-growing workforces. Explain one way this is a challenge and one way it's an opportunity for a U.S. business.",
      },
      {
        id: "sc-glo17-2",
        prompt:
          "War and terrorism don't affect every industry the same way. Explain why the defense industry and the tourism industry often move in opposite directions during a conflict.",
      },
      {
        id: "sc-glo17-3",
        prompt:
          "A U.S. company can make a product much more cheaply in a less-developed country. Using the idea of stakeholders, explain two trade-offs it should weigh before doing so.",
      },
      {
        id: "sc-glo17-4",
        prompt:
          "Explain how a fast-growing middle class in China or India could turn a 'competitive threat' into a business opportunity for an American company.",
        hint: "More workers there also means more customers there.",
      },
      {
        id: "sc-glo17-5",
        prompt:
          "Pick an industry you know. Describe how a major world event — a war, a pandemic, a terrorist attack — could raise its risk or its demand, and explain why.",
      },
    ],
  },

  // LO 1-8: How economic trends repeat, and what they mean for graduates
  "gulliver-lo-1-8": {
    title: "Scenario Challenge",
    subtitle: "Optional — your teacher reads these, they don't affect your score.",
    minWords: 25,
    prompts: [
      {
        id: "sc-glo18-1",
        prompt:
          "History shows economic booms and busts tend to repeat. Explain why understanding past trends could help you make smarter career or money decisions in the future.",
      },
      {
        id: "sc-glo18-2",
        prompt:
          "Explain one economic trend from the past — for example the rise of the internet, or a recession — and what a student today could learn from how businesses responded to it.",
      },
      {
        id: "sc-glo18-3",
        prompt:
          "Some careers grow while others shrink as the economy changes. Describe a field you think will grow in the next ten years and explain your reasoning using trends.",
      },
      {
        id: "sc-glo18-4",
        prompt:
          "Explain why 'the economy is always changing' is actually a reason to keep learning throughout your career, not just while you're in school.",
      },
      {
        id: "sc-glo18-5",
        prompt:
          "Imagine advising a graduate entering a weak job market. Using what you know about how trends repeat, explain what you'd tell them and why.",
        hint: "What has happened after past downturns?",
      },
    ],
  },
}

export function getScenarioSet(lessonId: string): ScenarioSet | null {
  return SETS[lessonId] ?? null
}

/** Look up a single prompt's text by id across all sets (for teacher review). */
export function getScenarioPromptText(scenarioId: string): string | null {
  for (const set of Object.values(SETS)) {
    const p = set.prompts.find((x) => x.id === scenarioId)
    if (p) return p.prompt
  }
  return null
}
