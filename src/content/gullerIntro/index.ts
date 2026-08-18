import { StructuredLessonContent } from "@/types"
import { block1a, block1b, block1c, block1d, block1e } from "./block1"
import { block2a, block2b, block2c, block2d, block2e } from "./block2"
import { block3 } from "./block3"
import { block4 } from "./block4"
import { block5 } from "./block5"
import { block6 } from "./block6"
import { gulliverLO1_1, gulliverLO1_2, gulliverLO1_3, gulliverLO1_4, gulliverLO1_5, gulliverLO1_6, gulliverLO1_7, gulliverLO1_8 } from "./ch1LOs"

// ═══════════════════════════════════════════════
// GULLIVER INTRODUCTION TO BUSINESS
// Byrnes Ch. 1-2. Audience: 9th grade.
// Unit 1 is split into two short lessons (1.1, 1.2); Units 2-6 are single
// lessons for now and will be split + deepened the same way.
// Content only — not wired into routing beyond the lesson lookup.
// ═══════════════════════════════════════════════

export { block1a, block1b, block1c, block1d, block1e, block2a, block2b, block2c, block2d, block2e, block3, block4, block5, block6 }
export { gulliverLO1_1, gulliverLO1_2, gulliverLO1_3, gulliverLO1_4, gulliverLO1_5, gulliverLO1_6, gulliverLO1_7, gulliverLO1_8 }

// Spreadable array matching the insuranceContent / creditExpansionContent export pattern.
export const gullerIntroContent: StructuredLessonContent[] = [
  block1a,
  block1b,
  block1c,
  block1d,
  block1e,
  block2a,
  block2b,
  block2c,
  block2d,
  block2e,
  block3,
  block4,
  block5,
  block6,
  gulliverLO1_1,
  gulliverLO1_2,
  gulliverLO1_3,
  gulliverLO1_4,
  gulliverLO1_5,
  gulliverLO1_6,
  gulliverLO1_7,
  gulliverLO1_8
]
