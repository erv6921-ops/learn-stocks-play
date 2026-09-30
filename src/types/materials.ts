// Shapes for teacher-generated presentations ("deck") and class activities
// ("activity"). The edge functions (generate-deck / generate-activity) return
// these; the client renders, edits, saves (public.teacher_materials.content),
// and exports them. Kept deliberately plain (strings + string[]) so a teacher
// can freely edit every field in the viewer.

export type MaterialType = "deck" | "activity"

// ── Presentation ("deck") ────────────────────────────────────────────────

export type SlideKind =
  | "agenda"
  | "title"
  | "content"
  | "example"
  | "check"
  | "recap"

export interface Slide {
  /** Stable id so edits/reorders don't lose their place. */
  id: string
  kind: SlideKind
  heading: string
  /** Body bullet points (each rendered as its own line). */
  bullets: string[]
  /** Presenter-only notes; shown under the slide in the editor + present mode. */
  notes: string
  /** Which selected lesson this slide came from (title), for grouping. */
  lessonTitle?: string
}

export interface DeckContent {
  version: 1
  kind: "deck"
  title: string
  slides: Slide[]
}

// ── Class activity ("activity") ──────────────────────────────────────────

export type ActivityFormat = "team-challenge" | "decision-cards" | "exit-ticket"

/** Team challenge: groups work a realistic scenario, then share out. */
export interface TeamChallengeContent {
  format: "team-challenge"
  scenario: string
  /** Numbered tasks each group completes. */
  tasks: string[]
  shareOut: string
}

/** Decision cards: "would you rather" money dilemmas for debate. */
export interface DecisionCard {
  prompt: string
  optionA: string
  optionB: string
  discussion: string[]
}
export interface DecisionCardsContent {
  format: "decision-cards"
  cards: DecisionCard[]
}

/** Exit ticket: questions + answer key. Multiple-choice when `options` is set. */
export interface ExitTicketQuestion {
  question: string
  /** Multiple-choice options; empty/omitted means a short-answer question. */
  options: string[]
  /** The correct answer text (for the answer key). */
  answer: string
}
export interface ExitTicketContent {
  format: "exit-ticket"
  questions: ExitTicketQuestion[]
}

export interface ActivityContent {
  version: 1
  kind: "activity"
  format: ActivityFormat
  title: string
  /** Timing, grouping, and how to run it. */
  teacherInstructions: string[]
  /** Estimated minutes to run. */
  timingMinutes: number
  body: TeamChallengeContent | DecisionCardsContent | ExitTicketContent
}

export type MaterialContent = DeckContent | ActivityContent

export interface TeacherMaterialRow {
  id: string
  teacher_id: string
  type: MaterialType
  title: string
  lesson_ids: string[]
  content: MaterialContent
  created_at: string
  updated_at: string
}

// ── Request payload sent to the edge functions ───────────────────────────

/** One lesson's grounding material, assembled client-side. */
export interface LessonPayload {
  id: string
  title: string
  unitTitle?: string
  /** Built-in lessons ship their teaching text; generated ones are read server-side. */
  source: "builtin" | "generated"
  /** Serialized lesson content (built-in only; empty for generated). */
  text?: string
}
