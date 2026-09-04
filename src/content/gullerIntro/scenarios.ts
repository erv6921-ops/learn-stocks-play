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
