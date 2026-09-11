// Visual primitives that reproduce the paper look of a real IRS form: black
// rules, boxed fields with a numbered label in the corner, the OMB number top
// right, the Treasury/IRS header, form name + year, and monospace field text.
//
// These are deliberately styled OUTSIDE the app's design system (raw black on
// white, serif/mono) so the form reads as the government document, not as the
// rest of the UI. The wrapping <IRSFormShell> is horizontally scrollable inside
// a bordered container on mobile rather than reflowing into a stack.
import React from "react"
import { Info, Check, X } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { maskField } from "./format"
import type { FieldFeedback, IRSFieldKind } from "./types"

// ── Document frame ────────────────────────────────────────────────────────

export function IRSFormShell({
  formNumber,
  formTitle,
  year,
  omb,
  children,
}: {
  formNumber: string
  formTitle: string
  year: string
  omb: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-1.5">
      {/* Horizontal scroll on narrow screens; the sheet keeps a fixed min width
          so it always reads as the paper document instead of collapsing. */}
      <div className="overflow-x-auto">
        <div className="mx-auto min-w-[640px] max-w-[820px] bg-white text-black font-serif shadow-sm">
          {/* Masthead */}
          <div className="flex items-stretch border-2 border-black">
            <div className="flex w-16 flex-col items-center justify-center border-r-2 border-black px-1 py-2 text-center">
              <div className="text-[10px] font-bold uppercase leading-tight">
                Form
              </div>
              <div className="font-mono text-xl font-extrabold leading-none">
                {formNumber}
              </div>
              <div className="text-[8px] leading-tight">({year})</div>
            </div>
            <div className="flex flex-1 flex-col justify-center px-3 py-2">
              <div className="text-[10px] uppercase tracking-wide">
                Department of the Treasury — Internal Revenue Service
              </div>
              <div className="text-lg font-bold leading-tight">{formTitle}</div>
            </div>
            <div className="flex w-40 flex-col justify-center border-l-2 border-black px-2 py-2 text-right">
              <div className="text-[9px] leading-tight">OMB No. {omb}</div>
              <div className="mt-1 text-[9px] leading-tight text-black/70">
                For simulation / education only — do not enter real SSNs.
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="border-x-2 border-b-2 border-black">{children}</div>
        </div>
      </div>
    </div>
  )
}

/** A titled section band inside the form (e.g. "Step 1", "Boxes 1–6"). */
export function FormSection({
  step,
  title,
  children,
}: {
  step?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-black first:border-t-0">
      <div className="flex items-center gap-2 bg-black/[0.06] px-2 py-1">
        {step && (
          <span className="font-mono text-[11px] font-bold">{step}</span>
        )}
        <span className="text-[11px] font-bold uppercase tracking-wide">
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

/** A grid row of boxes. Boxes lay out left→right like the real form. */
export function BoxRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-12">{children}</div>
}

// ── One numbered box ──────────────────────────────────────────────────────

function WhyTip({ text }: { text: string }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="Why does this box exist?"
            className="ml-1 inline-flex text-black/50 hover:text-black focus:outline-none"
          >
            <Info className="h-3 w-3" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px] text-xs">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function feedbackRing(fb?: FieldFeedback): string {
  if (!fb) return ""
  return fb.status === "correct"
    ? "ring-2 ring-green-600"
    : "ring-2 ring-red-600"
}

/**
 * A single fillable box: corner box number, label, a "why this box" tooltip,
 * a monospace input, and (after Check) a correct/wrong outline + hint.
 */
export function Box({
  boxLabel,
  label,
  value,
  onChange,
  kind = "text",
  why,
  placeholder,
  readOnly = false,
  span = 12,
  feedback,
}: {
  boxLabel?: string
  label: string
  value: string
  onChange?: (v: string) => void
  kind?: IRSFieldKind
  why?: string
  placeholder?: string
  readOnly?: boolean
  /** 1–12 column span within a BoxRow. */
  span?: number
  feedback?: FieldFeedback
}) {
  const colClass = spanClass(span)
  return (
    <div className={`${colClass} border-b border-r border-black last:border-r-0`}>
      <div className={`h-full p-1.5 ${feedbackRing(feedback)}`}>
        <div className="flex items-start gap-1">
          {boxLabel && (
            <span className="font-mono text-[10px] font-bold leading-tight text-black/80">
              {boxLabel}
            </span>
          )}
          <span className="text-[10px] leading-tight">{label}</span>
          {why && <WhyTip text={why} />}
        </div>
        <div className="mt-1 flex items-center gap-1">
          {readOnly ? (
            <div className="min-h-[24px] w-full whitespace-pre-wrap break-words border-b border-black/30 bg-black/[0.03] px-1 py-0.5 font-mono text-sm">
              {value || " "}
            </div>
          ) : (
            <input
              value={value}
              onChange={(e) => onChange?.(maskField(kind, e.target.value))}
              placeholder={placeholder}
              inputMode={
                kind === "currency" || kind === "ssn" || kind === "ein"
                  ? "numeric"
                  : "text"
              }
              className="min-h-[24px] w-full border-b border-black/40 bg-transparent px-1 py-0.5 font-mono text-sm outline-none focus:border-black focus:bg-yellow-50"
            />
          )}
          {feedback?.status === "correct" && (
            <Check className="h-4 w-4 shrink-0 text-green-600" />
          )}
          {feedback?.status === "wrong" && (
            <X className="h-4 w-4 shrink-0 text-red-600" />
          )}
        </div>
        {feedback?.status === "wrong" && (
          <div className="mt-1 text-[10px] leading-tight text-red-700">
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  )
}

/** A mutually-exclusive set of checkbox/radio choices rendered as boxed rows. */
export function ChoiceBox({
  boxLabel,
  label,
  options,
  value,
  onChange,
  why,
  span = 12,
  feedback,
}: {
  boxLabel?: string
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange?: (v: string) => void
  why?: string
  span?: number
  feedback?: FieldFeedback
}) {
  const colClass = spanClass(span)
  return (
    <div className={`${colClass} border-b border-r border-black last:border-r-0`}>
      <div className={`h-full p-1.5 ${feedbackRing(feedback)}`}>
        <div className="flex items-start gap-1">
          {boxLabel && (
            <span className="font-mono text-[10px] font-bold leading-tight text-black/80">
              {boxLabel}
            </span>
          )}
          <span className="text-[10px] leading-tight">{label}</span>
          {why && <WhyTip text={why} />}
          {feedback?.status === "correct" && (
            <Check className="ml-auto h-4 w-4 shrink-0 text-green-600" />
          )}
          {feedback?.status === "wrong" && (
            <X className="ml-auto h-4 w-4 shrink-0 text-red-600" />
          )}
        </div>
        <div className="mt-1 space-y-0.5">
          {options.map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-1.5 text-[11px]"
            >
              <span
                onClick={() => onChange?.(o.value)}
                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-black ${
                  value === o.value ? "bg-black" : "bg-white"
                }`}
              >
                {value === o.value && (
                  <Check className="h-2.5 w-2.5 text-white" />
                )}
              </span>
              <span>{o.label}</span>
            </label>
          ))}
        </div>
        {feedback?.status === "wrong" && (
          <div className="mt-1 text-[10px] leading-tight text-red-700">
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  )
}

// Tailwind can't see dynamically-built class names, so map span → a literal.
function spanClass(span: number): string {
  const map: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  }
  return map[span] ?? "col-span-12"
}
