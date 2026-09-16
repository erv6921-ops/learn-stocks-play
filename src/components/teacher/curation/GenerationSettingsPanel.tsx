import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AlertTriangle, Minus, Plus, SlidersHorizontal } from "lucide-react";
import { SETTINGS_LIMITS, type DifficultyLevel, type GenerationSettings } from "./api";

/**
 * Teacher-set generation settings for one upload: how many questions go in
 * the bank, how hard they are, how many quick checks sit between the slides,
 * and how many correct answers pass the mastery check. The parent owns the
 * value and saves it; this is presentational.
 */
export interface GenerationSettingsPanelProps {
  value: GenerationSettings;
  onChange: (next: GenerationSettings) => void;
  disabled?: boolean;
  /** True once questions exist, to warn that bank/difficulty changes need a regenerate. */
  hasQuestions?: boolean;
  /** Starred questions on this upload. Must not exceed masteryRequired; the panel warns when it does. */
  starredCount?: number;
  className?: string;
}

const DIFFICULTY_OPTIONS: { value: DifficultyLevel; label: string; hint: string }[] = [
  { value: "easier", label: "Easier", hint: "Mostly recall of definitions and facts" },
  { value: "balanced", label: "Balanced", hint: "Mostly medium, a few easy and hard" },
  { value: "harder", label: "Harder", hint: "Mostly application and comparison" },
  { value: "mixed", label: "Mixed", hint: "An even spread of easy, medium and hard" },
];

function Stepper({
  id,
  label,
  hint,
  value,
  min,
  max,
  onChange,
  disabled,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  const set = (n: number) => onChange(Math.max(min, Math.min(max, n)));
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-slate-700 dark:text-slate-200">
        {label}
      </Label>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => set(value - 1)}
          disabled={disabled || value <= min}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isFinite(n)) set(n);
          }}
          className="h-8 w-16 rounded-md border border-slate-200 bg-white text-center text-sm text-slate-900 focus:border-emerald-400 focus:outline-none disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <button
          type="button"
          onClick={() => set(value + 1)}
          disabled={disabled || value >= max}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">{hint}</p>
    </div>
  );
}

export const GenerationSettingsPanel: React.FC<GenerationSettingsPanelProps> = ({ value, onChange, disabled, hasQuestions, starredCount = 0, className }) => {
  const masteryMax = Math.min(SETTINGS_LIMITS.masteryRequired.max, value.bankSize);
  const starredOver = Math.max(0, starredCount - value.masteryRequired);
  return (
    <div className={cn("space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-900/40", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
          <SlidersHorizontal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Lesson settings
        </h4>
        <span className="text-xs text-slate-500 dark:text-slate-400">Saved as you change them.</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Stepper
          id="setting-bank-size"
          label="Questions in the bank"
          hint={`${SETTINGS_LIMITS.bankSize.min} to ${SETTINGS_LIMITS.bankSize.max}. More questions means more variety on retries.`}
          value={value.bankSize}
          min={SETTINGS_LIMITS.bankSize.min}
          max={SETTINGS_LIMITS.bankSize.max}
          disabled={disabled}
          onChange={(bankSize) => onChange({ ...value, bankSize, masteryRequired: Math.min(value.masteryRequired, Math.min(SETTINGS_LIMITS.masteryRequired.max, bankSize)) })}
        />

        <div className="space-y-1.5">
          <Label htmlFor="setting-difficulty" className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Question difficulty
          </Label>
          <Select value={value.difficulty} onValueChange={(v) => onChange({ ...value, difficulty: v as DifficultyLevel })} disabled={disabled}>
            <SelectTrigger id="setting-difficulty" className="h-8 bg-white text-sm dark:bg-slate-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTY_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{DIFFICULTY_OPTIONS.find((o) => o.value === value.difficulty)?.hint}</p>
        </div>

        <Stepper
          id="setting-micro-checks"
          label="Quick checks during the lesson"
          hint="One-question check-ins placed between Jeff's slides."
          value={value.microChecks}
          min={SETTINGS_LIMITS.microChecks.min}
          max={SETTINGS_LIMITS.microChecks.max}
          disabled={disabled}
          onChange={(microChecks) => onChange({ ...value, microChecks })}
        />

        <Stepper
          id="setting-mastery-required"
          label="Correct answers to pass the mastery check"
          hint={`Up to ${masteryMax}. Students keep drawing fresh questions from the bank until they reach it. Also the most questions you can star.`}
          value={value.masteryRequired}
          min={SETTINGS_LIMITS.masteryRequired.min}
          max={masteryMax}
          disabled={disabled}
          onChange={(masteryRequired) => onChange({ ...value, masteryRequired })}
        />
      </div>

      {starredOver > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p>
            <span className="font-semibold">{starredCount} questions are starred but the pass mark is now {value.masteryRequired}.</span>{" "}
            {starredOver} too many. Nothing was unstarred for you: unstar {starredOver} question{starredOver === 1 ? "" : "s"} on the Questions tab, or raise the pass mark, before generating or building.
          </p>
        </div>
      )}

      {hasQuestions && (
        <p className="text-[11px] text-amber-700 dark:text-amber-300">
          Bank size and difficulty apply when you regenerate the questions. Quick checks and the pass mark apply when you build Jeff's lesson.
        </p>
      )}
    </div>
  );
};

export default GenerationSettingsPanel;
