// Form 1040 (simplified) — U.S. Individual Income Tax Return. Renders the core
// lines a single filer with one W-2 actually touches: 1a, 2b, 8, 9, 11, 12
// (standard deduction), 15, 16, 24, 25a, 33, and 34/37 (refund or amount owed).
import React from "react"
import {
  IRSFormShell,
  FormSection,
  BoxRow,
  Box,
  ChoiceBox,
} from "./IRSFormShell"
import type { IRSFormProps, IRSGradeSpec } from "./types"

export const f1040Grading: Record<string, IRSGradeSpec> = {
  f1040_line1a: { boxLabel: "1a", kind: "currency", hint: "Line 1a — total wages from your W-2 box 1." },
  f1040_line2b: { boxLabel: "2b", kind: "currency", hint: "Line 2b — taxable interest (from a 1099-INT). $0 if you earned no interest." },
  f1040_line9: { boxLabel: "9", kind: "currency", hint: "Line 9 — total income: add lines 1a, 2b, and 8." },
  f1040_line11: { boxLabel: "11", kind: "currency", hint: "Line 11 — adjusted gross income (AGI). With no adjustments (line 10 = 0), it equals line 9." },
  f1040_line12: { boxLabel: "12", kind: "currency", hint: "Line 12 — the standard deduction. For a Single filer in 2024 it's $14,600." },
  f1040_line15: { boxLabel: "15", kind: "currency", hint: "Line 15 — taxable income: line 11 minus line 12. If that's below zero, enter 0." },
  f1040_line16: { boxLabel: "16", kind: "currency", hint: "Line 16 — the tax on line 15, from the IRS tax tables (given in the scenario)." },
  f1040_line24: { boxLabel: "24", kind: "currency", hint: "Line 24 — total tax. In this simple return it equals line 16." },
  f1040_line25a: { boxLabel: "25a", kind: "currency", hint: "Line 25a — federal income tax withheld from your W-2 box 2." },
  f1040_line33: { boxLabel: "33", kind: "currency", hint: "Line 33 — total payments. Here it equals line 25a." },
  f1040_result: { boxLabel: "34/37", kind: "radio", hint: "Compare line 33 (paid) to line 24 (owed): if you paid MORE, line 34 is a refund; if LESS, line 37 is the amount you owe." },
  f1040_resultAmount: { boxLabel: "34/37", kind: "currency", hint: "The difference between line 33 and line 24 — your refund (34) or amount owed (37)." },
}

export default function Form1040({ values, setValue, prefill, feedback, checked }: IRSFormProps) {
  const p = (id: string) => prefill[id]
  const v = (id: string) => p(id) ?? values[id] ?? ""
  const ro = (id: string) => p(id) !== undefined
  const set = (id: string) => (val: string) => setValue(id, val)
  const fb = (id: string) => (checked ? feedback[id] : undefined)

  return (
    <IRSFormShell
      formNumber="1040"
      formTitle="U.S. Individual Income Tax Return"
      year="2024"
      omb="1545-0074"
    >
      <FormSection title="Filing Status">
        <BoxRow>
          <ChoiceBox span={12} label="Filing status"
            options={[
              { value: "single", label: "Single" },
              { value: "married_jointly", label: "Married filing jointly" },
              { value: "head_of_household", label: "Head of household" },
            ]}
            value={v("f1040_filingStatus")} onChange={set("f1040_filingStatus")}
            feedback={fb("f1040_filingStatus")} />
        </BoxRow>
      </FormSection>

      <FormSection title="Income">
        <BoxRow>
          <Box span={12} boxLabel="1a" label="Total amount from Form(s) W-2, box 1" kind="currency"
            value={v("f1040_line1a")} onChange={set("f1040_line1a")} readOnly={ro("f1040_line1a")} placeholder="0.00"
            why="Your wages — the largest piece of most people's income."
            feedback={fb("f1040_line1a")} />
        </BoxRow>
        <BoxRow>
          <Box span={12} boxLabel="2b" label="Taxable interest" kind="currency"
            value={v("f1040_line2b")} onChange={set("f1040_line2b")} readOnly={ro("f1040_line2b")} placeholder="0.00"
            why="Interest from savings/CDs is taxable income the bank also reports to the IRS."
            feedback={fb("f1040_line2b")} />
        </BoxRow>
        <BoxRow>
          <Box span={12} boxLabel="8" label="Additional income from Schedule 1" kind="currency"
            value={v("f1040_line8")} onChange={set("f1040_line8")} readOnly={ro("f1040_line8")} placeholder="0.00"
            why="Gig income, unemployment, etc. flows in here from Schedule 1."
            feedback={fb("f1040_line8")} />
        </BoxRow>
        <BoxRow>
          <Box span={12} boxLabel="9" label="Total income (add lines 1a, 2b, 8)" kind="currency"
            value={v("f1040_line9")} onChange={set("f1040_line9")} readOnly={ro("f1040_line9")} placeholder="0.00"
            why="Everything you earned this year before deductions."
            feedback={fb("f1040_line9")} />
        </BoxRow>
        <BoxRow>
          <Box span={12} boxLabel="11" label="Adjusted gross income (AGI)" kind="currency"
            value={v("f1040_line11")} onChange={set("f1040_line11")} readOnly={ro("f1040_line11")} placeholder="0.00"
            why="Income after 'above the line' adjustments. Many credits phase out based on AGI."
            feedback={fb("f1040_line11")} />
        </BoxRow>
      </FormSection>

      <FormSection title="Deduction & Tax">
        <BoxRow>
          <Box span={12} boxLabel="12" label="Standard deduction (Single 2024 = $14,600)" kind="currency"
            value={v("f1040_line12")} onChange={set("f1040_line12")} readOnly={ro("f1040_line12")} placeholder="14,600.00"
            why="The chunk of income that isn't taxed at all. For most students it wipes out most of their tax."
            feedback={fb("f1040_line12")} />
        </BoxRow>
        <BoxRow>
          <Box span={12} boxLabel="15" label="Taxable income (line 11 − line 12, not below 0)" kind="currency"
            value={v("f1040_line15")} onChange={set("f1040_line15")} readOnly={ro("f1040_line15")} placeholder="0.00"
            why="The number your tax is actually calculated on — not your full salary."
            feedback={fb("f1040_line15")} />
        </BoxRow>
        <BoxRow>
          <Box span={12} boxLabel="16" label="Tax (from the tax tables)" kind="currency"
            value={v("f1040_line16")} onChange={set("f1040_line16")} readOnly={ro("f1040_line16")} placeholder="0.00"
            why="Look up line 15 in the IRS tax tables to get the tax owed."
            feedback={fb("f1040_line16")} />
        </BoxRow>
        <BoxRow>
          <Box span={12} boxLabel="24" label="Total tax" kind="currency"
            value={v("f1040_line24")} onChange={set("f1040_line24")} readOnly={ro("f1040_line24")} placeholder="0.00"
            feedback={fb("f1040_line24")} />
        </BoxRow>
      </FormSection>

      <FormSection title="Payments, Refund or Amount You Owe">
        <BoxRow>
          <Box span={12} boxLabel="25a" label="Federal income tax withheld (W-2 box 2)" kind="currency"
            value={v("f1040_line25a")} onChange={set("f1040_line25a")} readOnly={ro("f1040_line25a")} placeholder="0.00"
            why="Tax your employer already sent in for you all year."
            feedback={fb("f1040_line25a")} />
        </BoxRow>
        <BoxRow>
          <Box span={12} boxLabel="33" label="Total payments" kind="currency"
            value={v("f1040_line33")} onChange={set("f1040_line33")} readOnly={ro("f1040_line33")} placeholder="0.00"
            feedback={fb("f1040_line33")} />
        </BoxRow>
        <BoxRow>
          <ChoiceBox span={7} boxLabel="34/37" label="Do you get a refund or owe?"
            options={[
              { value: "refund", label: "Line 34 — Refund (paid more than I owe)" },
              { value: "owe", label: "Line 37 — Amount I owe (paid less than I owe)" },
            ]}
            value={v("f1040_result")} onChange={set("f1040_result")}
            why="This is the payoff of filing — and your W-4 all year is what controls it."
            feedback={fb("f1040_result")} />
          <Box span={5} label="Amount ($)" kind="currency"
            value={v("f1040_resultAmount")} onChange={set("f1040_resultAmount")} placeholder="0.00"
            feedback={fb("f1040_resultAmount")} />
        </BoxRow>
      </FormSection>
    </IRSFormShell>
  )
}
