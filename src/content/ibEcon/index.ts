import { StructuredLessonContent } from "@/types"
import { ibEcon1_1, ibEcon1_2, ibEcon1_3 } from "./ch1Lessons"

// ═══════════════════════════════════════════════
// IB ECONOMICS — standalone content track (Unit 1: Introduction to Economics)
// Separate from src/content/gullerIntro. Content only; wired into the lesson
// content map (src/data/lessonContent.ts) and lesson metadata registry
// (src/data/lessons.ts) following the same pattern as the Gulliver track.
// ═══════════════════════════════════════════════

export { ibEcon1_1, ibEcon1_2, ibEcon1_3 }

// Spreadable array matching the gullerIntroContent / insuranceContent export pattern.
export const ibEconContent: StructuredLessonContent[] = [
  ibEcon1_1,
  ibEcon1_2,
  ibEcon1_3,
]
