// Print / "Save as PDF" for a class activity. Opens a print-styled window with
// the activity laid out for paper (teacher instructions, the activity itself,
// and an answer key where relevant), then triggers the browser print dialog -
// which offers "Save as PDF". No PDF dependency needed.

import type { ActivityContent } from "@/types/materials"

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

function section(title: string, inner: string): string {
  return `<section><h2>${esc(title)}</h2>${inner}</section>`
}

function bodyHtml(a: ActivityContent): string {
  const b = a.body
  if (b.format === "team-challenge") {
    return (
      section("Scenario", `<p>${esc(b.scenario)}</p>`) +
      section("Your tasks", `<ol>${b.tasks.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>`) +
      (b.shareOut ? section("Share-out", `<p>${esc(b.shareOut)}</p>`) : "")
    )
  }
  if (b.format === "decision-cards") {
    const cards = b.cards
      .map(
        (c, i) => `
        <div class="card">
          <p class="prompt">${i + 1}. ${esc(c.prompt)}</p>
          <p class="opt"><strong>A.</strong> ${esc(c.optionA)}</p>
          <p class="opt"><strong>B.</strong> ${esc(c.optionB)}</p>
          ${c.discussion.length ? `<ul>${c.discussion.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
        </div>`,
      )
      .join("")
    return section("Decision cards", cards)
  }
  // exit-ticket
  const letter = (i: number) => String.fromCharCode(65 + i)
  const qs = b.questions
    .map((q) => {
      const opts = (q.options ?? []).length
        ? `<ul class="options">${q.options
            .map((o, k) => `<li><strong>${letter(k)}.</strong> ${esc(o)}</li>`)
            .join("")}</ul>`
        : `<div class="blank"></div>`
      return `<li>${esc(q.question)}${opts}</li>`
    })
    .join("")
  const key = b.questions
    .map((q, i) => `<li><strong>${i + 1}.</strong> ${esc(q.answer)}</li>`)
    .join("")
  return (
    section("Exit ticket", `<ol class="questions">${qs}</ol>`) +
    `<section class="answer-key"><h2>Answer key (teacher)</h2><ol>${key}</ol></section>`
  )
}

export function printActivity(a: ActivityContent): void {
  const win = window.open("", "_blank", "noopener,noreferrer,width=900,height=1100")
  if (!win) {
    alert("Please allow pop-ups to print this activity.")
    return
  }
  const instructions = a.teacherInstructions.length
    ? section(
        "Teacher instructions",
        `<p class="timing">⏱ About ${a.timingMinutes} min</p><ul>${a.teacherInstructions
          .map((t) => `<li>${esc(t)}</li>`)
          .join("")}</ul>`,
      )
    : ""

  win.document.write(`<!doctype html><html><head><meta charset="utf-8">
<title>${esc(a.title)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #1f2937; margin: 40px; line-height: 1.5; }
  h1 { font-size: 24px; margin: 0 0 4px; }
  .subtitle { color: #6b7280; margin: 0 0 20px; font-size: 13px; }
  h2 { font-size: 16px; color: #0e7c7b; border-bottom: 2px solid #0e7c7b33; padding-bottom: 4px; margin-top: 24px; }
  section { break-inside: avoid; }
  ol, ul { margin: 8px 0 8px 22px; }
  li { margin: 6px 0; }
  .card { border: 1px solid #d1d5db; border-radius: 8px; padding: 10px 14px; margin: 10px 0; break-inside: avoid; }
  .card .prompt { font-weight: 600; margin: 0 0 6px; }
  .card .opt { margin: 2px 0; }
  .timing { color: #6b7280; font-weight: 600; margin: 0 0 8px; }
  .questions li { margin: 14px 0; }
  .options { list-style: none; margin: 6px 0 0 18px; padding: 0; }
  .options li { margin: 3px 0; }
  .blank { border-bottom: 1px solid #9ca3af; height: 28px; margin-top: 6px; }
  .answer-key { break-before: page; }
  @media print { body { margin: 0.6in; } }
</style></head><body>
  <h1>${esc(a.title)}</h1>
  <p class="subtitle">Class activity${a.format === "team-challenge" ? " · Team challenge" : a.format === "decision-cards" ? " · Decision cards" : " · Exit ticket"}</p>
  ${instructions}
  ${bodyHtml(a)}
  <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 200); };</script>
</body></html>`)
  win.document.close()
}
