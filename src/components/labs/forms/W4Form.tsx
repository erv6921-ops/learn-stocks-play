// Form W-4 (2024) — Employee's Withholding Certificate. Steps 1–5, including
// the multiple-jobs (Step 2) and dependents (Step 3) sections. Field ids are
// stable so a lab's `expected`/`prefill` can target them.
import React from "react"
import {
  IRSFormShell,
  FormSection,
  BoxRow,
  Box,
  ChoiceBox,
} from "./IRSFormShell"
import type { IRSFormProps, IRSGradeSpec } from "./types"

export const w4Grading: Record<string, IRSGradeSpec> = {
  w4_firstName: { boxLabel: "1(a)", kind: "text", hint: "Step 1(a) — your legal first name, exactly as on your Social Security card." },
  w4_lastName: { boxLabel: "1(a)", kind: "text", hint: "Step 1(a) — your legal last name." },
  w4_ssn: { boxLabel: "1(b)", kind: "ssn", hint: "Step 1(b) — your 9-digit Social Security number (use the simulation SSN, not a real one)." },
  w4_filingStatus: { boxLabel: "1(c)", kind: "radio", hint: "Step 1(c) — check the filing status that matches the scenario. A single person with one job checks 'Single or Married filing separately'." },
  w4_multipleJobs: { boxLabel: "2(c)", kind: "checkbox", hint: "Step 2(c) — only check this if you hold more than one job at a time (or are married filing jointly and your spouse works). One single job → leave it 'No'." },
  w4_qualifyingChildren: { boxLabel: "3", kind: "currency", hint: "Step 3 — multiply the number of qualifying children under 17 by $2,000. No children → $0." },
  w4_otherDependents: { boxLabel: "3", kind: "currency", hint: "Step 3 — multiply other dependents by $500. None → $0." },
  w4_dependentsTotal: { boxLabel: "3", kind: "currency", hint: "Step 3 — add the children ($2,000 each) and other dependents ($500 each) amounts and put the total here." },
  w4_otherIncome: { boxLabel: "4(a)", kind: "currency", hint: "Step 4(a) — other income not from jobs (interest, dividends, side gigs). None → $0." },
  w4_deductions: { boxLabel: "4(b)", kind: "currency", hint: "Step 4(b) — deductions beyond the standard deduction. Most first-job filers leave this $0." },
  w4_extraWithholding: { boxLabel: "4(c)", kind: "currency", hint: "Step 4(c) — any extra dollar amount to withhold from each paycheck. Usually $0." },
  w4_signature: { boxLabel: "5", kind: "text", hint: "Step 5 — the form is invalid unless you sign it. Type your name to 'sign'." },
}

export default function W4Form({ values, setValue, prefill, feedback, checked }: IRSFormProps) {
  const v = (id: string) => prefill[id] ?? values[id] ?? ""
  const set = (id: string) => (val: string) => setValue(id, val)
  const fb = (id: string) => (checked ? feedback[id] : undefined)

  return (
    <IRSFormShell
      formNumber="W-4"
      formTitle="Employee's Withholding Certificate"
      year="2024"
      omb="1545-0074"
    >
      <FormSection step="Step 1" title="Enter Personal Information">
        <BoxRow>
          <Box span={5} boxLabel="1(a)" label="First name and middle initial"
            value={v("w4_firstName")} onChange={set("w4_firstName")}
            why="Your employer matches your withholding to your IRS record by name + SSN. A mismatch delays refunds."
            feedback={fb("w4_firstName")} />
          <Box span={5} label="Last name"
            value={v("w4_lastName")} onChange={set("w4_lastName")}
            why="Must match your Social Security card exactly."
            feedback={fb("w4_lastName")} />
          <Box span={2} boxLabel="1(b)" label="Social security number" kind="ssn"
            value={v("w4_ssn")} onChange={set("w4_ssn")} placeholder="XXX-XX-XXXX"
            why="Your SSN is the IRS's identifier for every dollar you earn and every tax you pay."
            feedback={fb("w4_ssn")} />
        </BoxRow>
        <BoxRow>
          <Box span={12} label="Address (number, street, city, state, ZIP)"
            value={v("w4_address")} onChange={set("w4_address")}
            why="Determines your state tax obligations and where your W-2 is mailed."
            feedback={fb("w4_address")} />
        </BoxRow>
        <BoxRow>
          <ChoiceBox span={12} boxLabel="1(c)" label="Filing status — check ONE box"
            options={[
              { value: "single", label: "Single or Married filing separately" },
              { value: "married_jointly", label: "Married filing jointly (or Qualifying surviving spouse)" },
              { value: "head_of_household", label: "Head of household" },
            ]}
            value={v("w4_filingStatus")} onChange={set("w4_filingStatus")}
            why="Filing status sets your standard deduction and tax brackets — the biggest factor in how much is withheld."
            feedback={fb("w4_filingStatus")} />
        </BoxRow>
      </FormSection>

      <FormSection step="Step 2" title="Multiple Jobs or Spouse Works">
        <BoxRow>
          <ChoiceBox span={12} boxLabel="2(c)" label="Do you (or your spouse) hold more than one job at a time?"
            options={[
              { value: "no", label: "No — I hold only one job (leave 2(c) unchecked)" },
              { value: "yes", label: "Yes — check box 2(c) so enough tax is withheld" },
            ]}
            value={v("w4_multipleJobs")} onChange={set("w4_multipleJobs")}
            why="With two jobs, each employer withholds as if it's your only income, so too little is withheld overall unless you flag it here."
            feedback={fb("w4_multipleJobs")} />
        </BoxRow>
      </FormSection>

      <FormSection step="Step 3" title="Claim Dependent and Other Credits">
        <BoxRow>
          <Box span={6} boxLabel="3" label="Qualifying children under 17 × $2,000" kind="currency"
            value={v("w4_qualifyingChildren")} onChange={set("w4_qualifyingChildren")} placeholder="0"
            why="Each qualifying child under 17 is worth a $2,000 Child Tax Credit that lowers your withholding."
            feedback={fb("w4_qualifyingChildren")} />
          <Box span={6} label="Other dependents × $500" kind="currency"
            value={v("w4_otherDependents")} onChange={set("w4_otherDependents")} placeholder="0"
            why="Other dependents (e.g. an older relative you support) are worth a $500 credit."
            feedback={fb("w4_otherDependents")} />
        </BoxRow>
        <BoxRow>
          <Box span={12} boxLabel="3" label="Add the amounts above and enter the total" kind="currency"
            value={v("w4_dependentsTotal")} onChange={set("w4_dependentsTotal")} placeholder="0"
            why="This total flows into the withholding math; claiming dependents you don't qualify for can trigger a bill or audit."
            feedback={fb("w4_dependentsTotal")} />
        </BoxRow>
      </FormSection>

      <FormSection step="Step 4" title="(Optional) Other Adjustments">
        <BoxRow>
          <Box span={4} boxLabel="4(a)" label="Other income (not from jobs)" kind="currency"
            value={v("w4_otherIncome")} onChange={set("w4_otherIncome")} placeholder="0"
            why="Side income (interest, tutoring, crypto) isn't withheld elsewhere — declaring it here avoids an April surprise."
            feedback={fb("w4_otherIncome")} />
          <Box span={4} boxLabel="4(b)" label="Deductions (beyond standard)" kind="currency"
            value={v("w4_deductions")} onChange={set("w4_deductions")} placeholder="0"
            why="Only if you itemize more than the standard deduction; most young earners leave this blank."
            feedback={fb("w4_deductions")} />
          <Box span={4} boxLabel="4(c)" label="Extra withholding per paycheck" kind="currency"
            value={v("w4_extraWithholding")} onChange={set("w4_extraWithholding")} placeholder="0"
            why="A voluntary buffer — pre-paying tax in small amounts if you owed money last year."
            feedback={fb("w4_extraWithholding")} />
        </BoxRow>
      </FormSection>

      <FormSection step="Step 5" title="Sign Here">
        <BoxRow>
          <Box span={8} boxLabel="5" label="Employee's signature (type to sign)"
            value={v("w4_signature")} onChange={set("w4_signature")}
            why="A W-4 is not valid unless signed — an unsigned form can't be processed by payroll."
            feedback={fb("w4_signature")} />
          <Box span={4} label="Date"
            value={v("w4_date")} onChange={set("w4_date")} placeholder="MM/DD/YYYY"
            feedback={fb("w4_date")} />
        </BoxRow>
      </FormSection>
    </IRSFormShell>
  )
}
