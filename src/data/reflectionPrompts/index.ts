import { batch1_personal } from "./batch1_personal"
import { batch2_income_banking } from "./batch2_income_banking"
import { batch3_investing_basics } from "./batch3_investing_basics"
import { batch4_investing_adv } from "./batch4_investing_adv"
import { batch5_business } from "./batch5_business"
import { batch6_strategy } from "./batch6_strategy"
import { batch7_statements_econ } from "./batch7_statements_econ"
import { batch8_micro } from "./batch8_micro"

// Every lesson id maps to its own written-reflection prompt (no two alike).
export const REFLECTION_PROMPTS_BY_LESSON: Record<string, string> = {
  ...batch1_personal,
  ...batch2_income_banking,
  ...batch3_investing_basics,
  ...batch4_investing_adv,
  ...batch5_business,
  ...batch6_strategy,
  ...batch7_statements_econ,
  ...batch8_micro,
}
