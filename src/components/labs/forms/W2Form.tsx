// Form W-2 — Wage and Tax Statement. The employer side (boxes a–f) and the
// numbered boxes 1–20 are PREFILLED and read-only: the student reads this as a
// source document. A "Read & Report" section at the bottom is the graded part —
// the student proves they can locate the right box and transcribe its value.
import React from "react"
import {
  IRSFormShell,
  FormSection,
  BoxRow,
  Box,
} from "./IRSFormShell"
import type { IRSFormProps, IRSGradeSpec } from "./types"

export const w2Grading: Record<string, IRSGradeSpec> = {
  w2_report_box1: { boxLabel: "1", kind: "currency", hint: "Box 1 — copy 'Wages, tips, other compensation'. It's the headline number your whole tax return builds on." },
  w2_report_box2: { boxLabel: "2", kind: "currency", hint: "Box 2 — copy 'Federal income tax withheld'. This is tax you've already paid; it decides your refund or balance due." },
  w2_report_box4: { boxLabel: "4", kind: "currency", hint: "Box 4 — copy 'Social security tax withheld' (usually 6.2% of Box 3 wages)." },
  w2_report_box6: { boxLabel: "6", kind: "currency", hint: "Box 6 — copy 'Medicare tax withheld' (usually 1.45% of Box 5 wages)." },
}

export default function W2Form({ values, setValue, prefill, feedback, checked }: IRSFormProps) {
  const p = (id: string) => prefill[id] ?? ""
  const v = (id: string) => values[id] ?? ""
  const set = (id: string) => (val: string) => setValue(id, val)
  const fb = (id: string) => (checked ? feedback[id] : undefined)

  return (
    <IRSFormShell
      formNumber="W-2"
      formTitle="Wage and Tax Statement"
      year="2024"
      omb="1545-0008"
    >
      {/* Employer / employee identification — all read-only source data */}
      <FormSection title="Identification (boxes a–f)">
        <BoxRow>
          <Box span={6} boxLabel="a" label="Employee's social security number" readOnly value={p("w2_a_ssn")}
            why="Your wages are reported to the IRS under this number." />
          <Box span={6} boxLabel="b" label="Employer identification number (EIN)" readOnly value={p("w2_b_ein")}
            why="Identifies which employer reported these wages." />
        </BoxRow>
        <BoxRow>
          <Box span={12} boxLabel="c" label="Employer's name, address, and ZIP code" readOnly value={p("w2_c_employer")}
            why="Confirms who paid you. Each employer sends its own W-2." />
        </BoxRow>
        <BoxRow>
          <Box span={6} boxLabel="e" label="Employee's name" readOnly value={p("w2_e_employee")} />
          <Box span={6} boxLabel="f" label="Employee's address and ZIP code" readOnly value={p("w2_f_address")} />
        </BoxRow>
      </FormSection>

      {/* Federal wage + tax boxes 1–6 (read-only) */}
      <FormSection title="Federal Wages & Taxes (boxes 1–6)">
        <BoxRow>
          <Box span={6} boxLabel="1" label="Wages, tips, other compensation" readOnly value={p("w2_box1")}
            why="Total taxable income — the starting point of your entire return." />
          <Box span={6} boxLabel="2" label="Federal income tax withheld" readOnly value={p("w2_box2")}
            why="Tax already sent to the IRS on your behalf; sets up your refund or balance due." />
        </BoxRow>
        <BoxRow>
          <Box span={6} boxLabel="3" label="Social security wages" readOnly value={p("w2_box3")} />
          <Box span={6} boxLabel="4" label="Social security tax withheld" readOnly value={p("w2_box4")}
            why="6.2% of Box 3 — funds Social Security; not refundable." />
        </BoxRow>
        <BoxRow>
          <Box span={6} boxLabel="5" label="Medicare wages and tips" readOnly value={p("w2_box5")} />
          <Box span={6} boxLabel="6" label="Medicare tax withheld" readOnly value={p("w2_box6")}
            why="1.45% of Box 5 — funds Medicare." />
        </BoxRow>
      </FormSection>

      {/* Remaining boxes 7–20 (read-only, condensed) */}
      <FormSection title="Boxes 7–20">
        <BoxRow>
          <Box span={3} boxLabel="7" label="Social security tips" readOnly value={p("w2_box7")} />
          <Box span={3} boxLabel="8" label="Allocated tips" readOnly value={p("w2_box8")} />
          <Box span={3} boxLabel="10" label="Dependent care benefits" readOnly value={p("w2_box10")} />
          <Box span={3} boxLabel="11" label="Nonqualified plans" readOnly value={p("w2_box11")} />
        </BoxRow>
        <BoxRow>
          <Box span={3} boxLabel="12a" label="Code / amount" readOnly value={p("w2_box12a")}
            why="Codes like D (401k) or DD (health coverage) report special items." />
          <Box span={3} boxLabel="13" label="Statutory / Retirement / Sick" readOnly value={p("w2_box13")} />
          <Box span={6} boxLabel="14" label="Other" readOnly value={p("w2_box14")} />
        </BoxRow>
        <BoxRow>
          <Box span={4} boxLabel="15" label="State / Employer's state ID no." readOnly value={p("w2_box15")}
            why="Some states (FL, TX) have no income tax, so 16–17 may be blank." />
          <Box span={4} boxLabel="16" label="State wages, tips, etc." readOnly value={p("w2_box16")} />
          <Box span={4} boxLabel="17" label="State income tax" readOnly value={p("w2_box17")} />
        </BoxRow>
        <BoxRow>
          <Box span={4} boxLabel="18" label="Local wages, tips, etc." readOnly value={p("w2_box18")} />
          <Box span={4} boxLabel="19" label="Local income tax" readOnly value={p("w2_box19")} />
          <Box span={4} boxLabel="20" label="Locality name" readOnly value={p("w2_box20")} />
        </BoxRow>
      </FormSection>

      {/* The graded part — read the W-2 above and report the key figures */}
      <FormSection title="Read &amp; Report — copy these figures from the W-2 above">
        <BoxRow>
          <Box span={6} boxLabel="→1" label="Wages you'll report (from Box 1)" kind="currency"
            value={v("w2_report_box1")} onChange={set("w2_report_box1")} placeholder="0.00"
            why="This is the number that lands on line 1a of your Form 1040."
            feedback={fb("w2_report_box1")} />
          <Box span={6} boxLabel="→2" label="Federal tax withheld (from Box 2)" kind="currency"
            value={v("w2_report_box2")} onChange={set("w2_report_box2")} placeholder="0.00"
            why="This lands on line 25a of your 1040 as tax already paid."
            feedback={fb("w2_report_box2")} />
        </BoxRow>
        <BoxRow>
          <Box span={6} boxLabel="→4" label="Social security tax withheld (from Box 4)" kind="currency"
            value={v("w2_report_box4")} onChange={set("w2_report_box4")} placeholder="0.00"
            feedback={fb("w2_report_box4")} />
          <Box span={6} boxLabel="→6" label="Medicare tax withheld (from Box 6)" kind="currency"
            value={v("w2_report_box6")} onChange={set("w2_report_box6")} placeholder="0.00"
            feedback={fb("w2_report_box6")} />
        </BoxRow>
      </FormSection>
    </IRSFormShell>
  )
}
