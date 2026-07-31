export interface LessonScenario { title: string; narrative: string; details: string[] }
import { batchA_core } from "./batchA_core"
import { batchB_stocks } from "./batchB_stocks"
export const LESSON_SCENARIOS: Record<string, LessonScenario> = {
  ...batchA_core,
  ...batchB_stocks,
}
