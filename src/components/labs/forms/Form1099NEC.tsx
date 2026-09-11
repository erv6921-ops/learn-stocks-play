// Form 1099-NEC — Nonemployee Compensation. Boxes 1–7, for the gig-work
// scenario. The payer side is prefilled (the student receives this form from a
// company they did gig work for). The graded part teaches the key lesson: no
// tax was withheld, so the worker owes self-employment tax themselves.
import React from "react"
import {
  IRSFormShell,
  FormSection,
  BoxRow,
  Box,
  ChoiceBox,
} from "./IRSFormShell"
import type { IRSFormProps, IRSGradeSpec } from "./types"

export const nec1099Grading: Record<string, IRSGradeSpec> = {
  nec_report_box1: { boxLabel: "1", kind: "currency", hint: "Box 1 — copy 'Nonemployee compensation'. This is everything the company paid you for gig work." },
  nec_report_box4: { boxLabel: "4", kind: "currency", hint: "Box 4 — 'Federal income tax withheld'. On most 1099-NEC forms this is $0: gig payers don't withhold tax for you." },
  nec_setAside: { boxLabel: "SE", kind: "radio", hint: "Because Box 4 is $0, no tax was taken out. You must set aside money yourself (~25–30%) for income + self-employment tax." },
}

export default function Form1099NEC({ values, setValue, prefill, feedback, checked }: IRSFormProps) {
  const p = (id: string) => prefill[id] ?? ""
  const v = (id: string) => values[id] ?? ""
  const set = (id: string) => (val: string) => setValue(id, val)
  const fb = (id: string) => (checked ? feedback[id] : undefined)

  return (
    <IRSFormShell
      formNumber="1099-NEC"
      formTitle="Nonemployee Compensation"
      year="2024"
      omb="1545-0116"
    >
      <FormSection title="Payer & Recipient">
        <BoxRow>
          <Box span={7} label="PAYER'S name, address, ZIP" readOnly value={p("nec_payer")}
            why="The business that hired you for gig work and is reporting what it paid you." />
          <Box span={5} label="PAYER'S TIN" readOnly value={p("nec_payerTin")} />
        </BoxRow>
        <BoxRow>
          <Box span={7} label="RECIPIENT'S name & address" readOnly value={p("nec_recipient")} />
          <Box span={5} label="RECIPIENT'S TIN" readOnly value={p("nec_recipientTin")}
            why="Your SSN or EIN — how the IRS knows this income is yours." />
        </BoxRow>
      </FormSection>

      <FormSection title="Boxes 1–7">
        <BoxRow>
          <Box span={8} boxLabel="1" label="Nonemployee compensation" readOnly value={p("nec_box1")}
            why="Total paid to you as a contractor. Unlike a W-2, no taxes were taken out of this." />
          <ChoiceBox span={4} boxLabel="2" label="Payer made direct sales of $5,000+"
            options={[{ value: "no", label: "Not checked" }, { value: "yes", label: "Checked" }]}
            value={p("nec_box2") || v("nec_box2")} onChange={set("nec_box2")} />
        </BoxRow>
        <BoxRow>
          <Box span={4} boxLabel="4" label="Federal income tax withheld" readOnly value={p("nec_box4")}
            why="Usually $0 on a 1099-NEC — the payer does NOT withhold tax for contractors." />
          <Box span={4} boxLabel="5" label="State tax withheld" readOnly value={p("nec_box5")} />
          <Box span={4} boxLabel="6/7" label="State no. / State income" readOnly value={p("nec_box67")} />
        </BoxRow>
      </FormSection>

      <FormSection title="Read &amp; Report">
        <BoxRow>
          <Box span={6} boxLabel="→1" label="Your gig income (from Box 1)" kind="currency"
            value={v("nec_report_box1")} onChange={set("nec_report_box1")} placeholder="0.00"
            why="You report this as self-employment income on Schedule C / Form 1040."
            feedback={fb("nec_report_box1")} />
          <Box span={6} boxLabel="→4" label="Tax already withheld (from Box 4)" kind="currency"
            value={v("nec_report_box4")} onChange={set("nec_report_box4")} placeholder="0.00"
            why="If this is $0, none of your tax has been paid yet — that's the trap of gig work."
            feedback={fb("nec_report_box4")} />
        </BoxRow>
        <BoxRow>
          <ChoiceBox span={12} boxLabel="SE" label="Because no tax was withheld, what should you do?"
            options={[
              { value: "yes", label: "Set aside ~25–30% of this income myself for taxes" },
              { value: "no", label: "Nothing — the company already handled my taxes" },
            ]}
            value={v("nec_setAside")} onChange={set("nec_setAside")}
            why="Contractors pay both income tax AND the full 15.3% self-employment tax. Saving as you go avoids a painful April bill."
            feedback={fb("nec_setAside")} />
        </BoxRow>
      </FormSection>
    </IRSFormShell>
  )
}
