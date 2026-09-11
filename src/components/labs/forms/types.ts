// Shared types for the IRS form-replica lab system.
//
// A lab of kind `irs_form` carries an IRSFormPayload that names which real form
// to render, an optional prefill (e.g. the employer side of a W-2 the student
// only reads), an `expected` answer key the student is graded against, and a
// short scenario that frames the exercise.

export type IRSFormType = "w4" | "w2" | "1099nec" | "1040"

// How a field's value is interpreted for masking, validation, and grading.
export type IRSFieldKind =
  | "text"
  | "currency"
  | "ssn"
  | "ein"
  | "checkbox"
  | "radio"

export interface IRSFormPayload {
  form: IRSFormType
  /** Employer/payer-side values shown read-only (student reads, doesn't fill). */
  prefill?: Record<string, string>
  /** Answer key: fieldId → expected value. Only listed fields are graded. */
  expected?: Record<string, string>
  /** One-line framing shown above the form. */
  scenario?: string
}

// One graded box on a form. Each form module exports its grading spec so the
// orchestrator can grade + anchor feedback to the real box number without the
// form component owning any grading logic.
export interface IRSGradeSpec {
  /** Box/label number as printed on the real form, e.g. "1", "2b", "1(a)". */
  boxLabel: string
  kind: IRSFieldKind
  /** Plain-English, box-anchored hint shown when the answer is wrong. */
  hint: string
}

export interface FieldFeedback {
  status: "correct" | "wrong"
  message: string
}

export type GradeResult = Record<string, FieldFeedback>

// Props every concrete form component receives from the orchestrator.
export interface IRSFormProps {
  values: Record<string, string>
  setValue: (id: string, value: string) => void
  /** Employer/payer-side read-only values. */
  prefill: Record<string, string>
  /** Per-field grading feedback once the student has hit "Check". */
  feedback: GradeResult
  /** True after a check so correct/wrong outlines show. */
  checked: boolean
}
