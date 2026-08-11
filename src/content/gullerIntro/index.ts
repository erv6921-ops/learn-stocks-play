import { StructuredLessonContent } from "@/types"
import { block1 } from "./block1"
import { block2 } from "./block2"
import { block3 } from "./block3"
import { block4 } from "./block4"
import { block5 } from "./block5"
import { block6 } from "./block6"

// ═══════════════════════════════════════════════
// GULLIVER INTRODUCTION TO BUSINESS
// Byrnes Ch. 1–2, six 85-minute blocks. Audience: 9th grade.
// Content only — not yet wired into routing or the track selector.
// ═══════════════════════════════════════════════

export { block1, block2, block3, block4, block5, block6 }

// Spreadable array matching the insuranceContent / creditExpansionContent export pattern.
export const gullerIntroContent: StructuredLessonContent[] = [
  block1,
  block2,
  block3,
  block4,
  block5,
  block6
]
