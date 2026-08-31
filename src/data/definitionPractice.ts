// Per-lesson "Define These Key Terms" practice cards. When a lesson has an
// entry here, the post-mastery "Make It Stick" step is replaced by a mandatory
// definition-practice card (see DefinitionPracticeCard + LessonDetail). It is
// purely practice: the student writes definitions, compares them against the
// reference answer, then confirms to continue. It never affects mastery/theta.

export interface DefinitionTerm {
  term: string
  /** The reference answer shown next to the student's attempt after checking. */
  correctDefinition: string
}

export interface DefinitionPractice {
  title: string
  subtitle: string
  terms: DefinitionTerm[]
}

const OVERRIDES: Record<string, DefinitionPractice> = {
  "gulliver-lo-1-1": {
    title: "Define These Key Terms",
    subtitle: "Complete these definitions to continue",
    terms: [
      {
        term: "Stakeholders",
        correctDefinition:
          "People or groups who have an interest in or are affected by a business's decisions",
      },
      {
        term: "Outsourcing",
        correctDefinition:
          "Hiring an external company or contractor to do work instead of doing it in-house",
      },
      {
        term: "Insourcing",
        correctDefinition:
          "Bringing work in-house that was previously done by an external company",
      },
    ],
  },
}

export function getDefinitionPractice(lessonId: string): DefinitionPractice | null {
  return OVERRIDES[lessonId] ?? null
}
