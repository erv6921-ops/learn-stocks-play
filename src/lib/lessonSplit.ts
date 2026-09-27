/**
 * lessonSplit — pure, UI-free logic for splitting one teacher-built lesson into
 * two. Kept out of the dialog so it can be reasoned about and tested on its own.
 *
 * A lesson's content is `{ sections: [...] }` (see src/types/index.ts). Splitting
 * cuts the array at a SECTION BOUNDARY only, so no concept / worked example /
 * scenario is ever cut in half. The single mastery-check pool (its questions are
 * embedded in the content JSON — that's what the player reads, MasteryCheck-
 * Renderer uses `section.questions`) is divided across the two parts BY TOPIC.
 *
 * Mastery question ids equal the generated_questions row ids
 * (synthesize-lesson-v2), so `part2QuestionIds` is exactly the bank rows that
 * must move to Part 2 for the fallback / question-bank views to stay coherent.
 */

import type { QuizQuestion } from "@/types";

/** A lesson-content section. Loosely typed: the JSON carries extra fields the
 *  strict interfaces in src/types omit (coversKeys, narrative, …). */
export interface AnySection {
  type: string;
  title?: string;
  questions?: QuizQuestion[];
  requiredCorrect?: number;
  pinnedQuestionIds?: string[];
  [k: string]: unknown;
}

export interface LessonContentLike {
  sections?: AnySection[];
  [k: string]: unknown;
}

/** Pass mark to aim for in each part when the original didn't specify one. */
export const DEFAULT_MASTERY_REQUIRED = 4;

export interface PartPlan {
  name: string;
  /** Full section array for this part (teaching sections + its own mastery check). */
  sections: AnySection[];
  /** Human labels for the teaching sections, in order (for the preview columns). */
  teachingLabels: string[];
  masteryCount: number;
  requiredCorrect: number;
}

export interface TopicAssignment {
  topic: string;
  toPart1: number;
  toPart2: number;
  reason: string;
}

export interface SplitPlan {
  /** Number of teaching sections that land in Part 1 (the cut point). */
  splitIndex: number;
  /** splitIndex can range over [1, maxSplitIndex]; both parts keep ≥1 section. */
  maxSplitIndex: number;
  splittable: boolean;
  reason?: string;
  part1: PartPlan;
  part2: PartPlan;
  topicAssignments: TopicAssignment[];
  /** generated_questions ids to move to the new Part 2 lesson. */
  part2QuestionIds: string[];
  warnings: string[];
}

/** A short, teacher-friendly label for a section shown in the preview columns. */
export function sectionLabel(s: AnySection): string {
  switch (s.type) {
    case "concept":
      return s.title || "Concept";
    case "micro-check":
      return `Quick check (${s.questions?.length ?? 0})`;
    case "scenario":
      return s.title ? `Scenario: ${s.title}` : "Scenario";
    case "applied-question":
      return "Applied question";
    case "recap":
      return "Recap";
    case "activity-check":
      return s.title ? `Activity: ${s.title}` : "Activity";
    case "interactive-diagram":
      return s.title ? `Diagram: ${s.title}` : "Interactive diagram";
    case "mastery-check":
      return `Mastery check (${s.questions?.length ?? 0})`;
    default:
      return s.title || s.type;
  }
}

/** Concatenated lowercase text of a section (no questions) for topic matching. */
function sectionText(s: AnySection): string {
  const { questions: _q, ...rest } = s;
  return JSON.stringify(rest).toLowerCase();
}

/** Build a mastery-check section for a part, trimming pins/required to what fits. */
function buildMastery(questions: QuizQuestion[], required: number, pinned: string[]): AnySection {
  const ids = new Set(questions.map((q) => q.id));
  const pins = pinned.filter((id) => ids.has(id));
  return {
    type: "mastery-check",
    questions,
    requiredCorrect: Math.min(required, questions.length),
    ...(pins.length ? { pinnedQuestionIds: pins } : {}),
  };
}

/**
 * Divide the mastery pool between the two parts BY TOPIC (QuizQuestion.concept).
 * Whole topic groups stay together and go to the part that teaches them; ties
 * and untagged questions are balanced toward each part's proportional share so
 * both parts end up with enough to run a mastery check.
 */
function splitByTopic(
  pool: QuizQuestion[],
  part1Text: string,
  part2Text: string,
  p1Ratio: number,
): { p1: QuizQuestion[]; p2: QuizQuestion[]; assignments: TopicAssignment[] } {
  const p1: QuizQuestion[] = [];
  const p2: QuizQuestion[] = [];
  const assignments: TopicAssignment[] = [];
  const p1Target = Math.round(pool.length * p1Ratio);
  const deficit1 = () => p1Target - p1.length;
  const deficit2 = () => pool.length - p1Target - p2.length;

  // Group by topic; untagged questions handled last, one at a time.
  const groups = new Map<string, QuizQuestion[]>();
  const untagged: QuizQuestion[] = [];
  for (const q of pool) {
    const topic = q.concept?.trim();
    if (!topic) {
      untagged.push(q);
      continue;
    }
    const arr = groups.get(topic) ?? [];
    arr.push(q);
    groups.set(topic, arr);
  }

  // Largest topics first so the balancer has room to even things out.
  const entries = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
  for (const [topic, qs] of entries) {
    const key = topic.toLowerCase();
    const inP1 = part1Text.includes(key);
    const inP2 = part2Text.includes(key);
    let toPart1: boolean;
    let reason: string;
    if (inP1 && !inP2) {
      toPart1 = true;
      reason = "taught in Part 1";
    } else if (inP2 && !inP1) {
      toPart1 = false;
      reason = "taught in Part 2";
    } else {
      toPart1 = deficit1() >= deficit2();
      reason = inP1 && inP2 ? "taught in both — balanced" : "balanced by count";
    }
    (toPart1 ? p1 : p2).push(...qs);
    assignments.push({ topic, toPart1: toPart1 ? qs.length : 0, toPart2: toPart1 ? 0 : qs.length, reason });
  }

  // Untagged: place each where the shortfall is larger, to hit the target split.
  let uP1 = 0;
  let uP2 = 0;
  for (const q of untagged) {
    if (deficit1() >= deficit2()) {
      p1.push(q);
      uP1++;
    } else {
      p2.push(q);
      uP2++;
    }
  }
  if (untagged.length) {
    assignments.push({ topic: "Untagged questions", toPart1: uP1, toPart2: uP2, reason: "split proportionally" });
  }

  return { p1, p2, assignments };
}

/**
 * Produce a full split plan. `splitIndex` (1-based count of teaching sections in
 * Part 1) defaults to the boundary closest to the midpoint; the caller nudges it
 * ±1 for the preview.
 */
export function planSplit(
  content: LessonContentLike | null | undefined,
  baseName: string,
  splitIndex?: number,
): SplitPlan {
  const sections = (content?.sections ?? []) as AnySection[];
  const teaching = sections.filter((s) => s.type !== "mastery-check");
  const masterySections = sections.filter((s) => s.type === "mastery-check");
  const pool: QuizQuestion[] = masterySections.flatMap((s) => s.questions ?? []);
  const required = Math.max(
    DEFAULT_MASTERY_REQUIRED,
    ...masterySections.map((s) => s.requiredCorrect ?? 0),
    0,
  );
  const pinned = masterySections.flatMap((s) => s.pinnedQuestionIds ?? []);

  const maxSplitIndex = teaching.length - 1;
  const empty: PartPlan = { name: baseName, sections: [], teachingLabels: [], masteryCount: 0, requiredCorrect: 0 };

  if (teaching.length < 2) {
    return {
      splitIndex: 0,
      maxSplitIndex: 0,
      splittable: false,
      reason: "This lesson has too few sections to split into two.",
      part1: empty,
      part2: empty,
      topicAssignments: [],
      part2QuestionIds: [],
      warnings: [],
    };
  }

  const mid = Math.round(teaching.length / 2);
  const idx = Math.min(Math.max(splitIndex ?? mid, 1), maxSplitIndex);

  const part1Teaching = teaching.slice(0, idx);
  const part2Teaching = teaching.slice(idx);
  const p1Text = part1Teaching.map(sectionText).join(" ");
  const p2Text = part2Teaching.map(sectionText).join(" ");
  const p1Ratio = part1Teaching.length / teaching.length;

  const { p1, p2, assignments } = splitByTopic(pool, p1Text, p2Text, p1Ratio);

  const part1Mastery = buildMastery(p1, required, pinned);
  const part2Mastery = buildMastery(p2, required, pinned);

  const warnings: string[] = [];
  if (p1.length < required) {
    warnings.push(
      `Part 1 would have only ${p1.length} mastery question${p1.length === 1 ? "" : "s"} (a mastery check normally needs ${required} to pass).`,
    );
  }
  if (p2.length < required) {
    warnings.push(
      `Part 2 would have only ${p2.length} mastery question${p2.length === 1 ? "" : "s"} (a mastery check normally needs ${required} to pass).`,
    );
  }

  return {
    splitIndex: idx,
    maxSplitIndex,
    splittable: true,
    part1: {
      name: `${baseName} (Part 1)`,
      sections: [...part1Teaching, part1Mastery],
      teachingLabels: part1Teaching.map(sectionLabel),
      masteryCount: p1.length,
      requiredCorrect: part1Mastery.requiredCorrect as number,
    },
    part2: {
      name: `${baseName} (Part 2)`,
      sections: [...part2Teaching, part2Mastery],
      teachingLabels: part2Teaching.map(sectionLabel),
      masteryCount: p2.length,
      requiredCorrect: part2Mastery.requiredCorrect as number,
    },
    topicAssignments: assignments,
    part2QuestionIds: p2.map((q) => q.id),
    warnings,
  };
}
