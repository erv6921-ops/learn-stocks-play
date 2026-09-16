import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Moon, Smartphone, Sun } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { TowerView } from "@/components/tower-v2/TowerView";
import { FLOORS, MOCK_BALANCE, TOP_FLOOR, type Floor, type FloorState } from "@/components/tower-v2/towerData";

/* ═══════════════════════════════════════════════════════════════════════════
   TOWER PREVIEW V2 - standalone visual prototype of the 34-floor learning path.
   No data wiring: everything derives from a "current floor" number plus a
   couple of per-floor overrides (in-progress / skipped). Route: /tower-preview-v2
   For the same tower wired to real app data + nav chrome, see /lessons/tower
   (src/components/tower-v2/TowerInApp.tsx).
   ═══════════════════════════════════════════════════════════════════════════ */

type Override = "in-progress" | "skipped";

const clampFloor = (n: number) => Math.min(TOP_FLOOR, Math.max(1, Math.round(n)));

// Mock "lessons done" for an in-progress floor: a bit under halfway.
const mockLessonsDone = (lessons: number) => Math.max(1, Math.floor(lessons / 2));

export default function TowerPreviewV2() {
  const [params] = useSearchParams();
  const { resolvedTheme, setTheme } = useTheme();

  // ── Core state ──────────────────────────────────────────────────────────
  const [currentFloor, setCurrentFloor] = useState<number>(() => clampFloor(Number(params.get("floor")) || 1));
  const [overrides, setOverrides] = useState<Record<number, Override>>({});
  const [balance, setBalance] = useState(MOCK_BALANCE);
  // DEV: constrain to a phone-width frame.
  const [narrow, setNarrow] = useState(() => params.get("narrow") === "1");

  // DEV: ?theme=dark|light and ?force=in-progress seed the page for screenshots.
  useEffect(() => {
    const t = params.get("theme");
    if (t === "dark" || t === "light") setTheme(t);
    const f = params.get("force");
    if (f === "in-progress") setOverrides({ [clampFloor(Number(params.get("floor")) || 1)]: "in-progress" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Everything re-derives from currentFloor; overrides only bite where they make sense.
  const stateOf = useCallback(
    (n: number): FloorState => {
      const o = overrides[n];
      if (n < currentFloor) return o === "skipped" ? "skipped" : "complete";
      if (n === currentFloor) return o === "in-progress" ? "in-progress" : "available";
      return "locked";
    },
    [currentFloor, overrides],
  );

  const lessonsDoneOf = useCallback(
    (n: number) => {
      const s = stateOf(n);
      const f = FLOORS[n - 1];
      return s === "in-progress" ? mockLessonsDone(f.lessons) : s === "complete" ? f.lessons : 0;
    },
    [stateOf],
  );

  const goToFloor = useCallback((n: number) => setCurrentFloor(clampFloor(n)), []);

  // Mock sub-steps: N placeholder lessons per floor, done up to the mock progress.
  const floorsWithSteps = useMemo<Floor[]>(
    () =>
      FLOORS.map((f) => {
        const done = lessonsDoneOf(f.number);
        const locked = stateOf(f.number) === "locked";
        return {
          ...f,
          steps: Array.from({ length: f.lessons }, (_, i) => ({
            id: `${f.number}-${i + 1}`,
            label: `${f.number}.${i + 1}`,
            title: `${f.title} · part ${i + 1}`,
            done: i < done,
            unlocked: !locked && i <= done,
          })),
        };
      }),
    [lessonsDoneOf, stateOf],
  );

  // ── DEV controls ────────────────────────────────────────────────────────
  const forceInProgress = () => setOverrides((o) => ({ ...o, [currentFloor]: "in-progress" }));
  const forceSkipped = () => {
    if (currentFloor >= TOP_FLOOR) return;
    setOverrides((o) => ({ ...o, [currentFloor]: "skipped" }));
    goToFloor(currentFloor + 1);
  };
  const resetOverrides = () => { setOverrides({}); setBalance(MOCK_BALANCE); };
  const isDark = resolvedTheme === "dark";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── DEV CONTROLS (throwaway; delete when wiring real data) ─────────── */}
      <div className="bg-zinc-900 text-zinc-100 border-b border-zinc-700 px-4 py-2.5 text-xs">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-x-5 gap-y-2.5">
          <span className="font-mono font-bold text-[10px] tracking-[0.2em] text-zinc-400">DEV</span>
          <label className="flex items-center gap-3 min-w-[220px] flex-1">
            <span className="whitespace-nowrap">Floor <b className="tabular-nums text-white">{currentFloor}</b></span>
            <Slider
              min={1}
              max={TOP_FLOOR}
              step={1}
              value={[currentFloor]}
              onValueChange={(v) => goToFloor(v[0] ?? 1)}
              className="flex-1 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-zinc-200 [&_[role=slider]]:bg-zinc-900"
              aria-label="Current floor"
            />
          </label>
          <div className="flex items-center gap-1.5">
            <DevButton onClick={forceInProgress}>Force in-progress</DevButton>
            <DevButton onClick={forceSkipped} disabled={currentFloor >= TOP_FLOOR}>Force skipped</DevButton>
            <DevButton onClick={resetOverrides}>Reset</DevButton>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <Smartphone className="h-3.5 w-3.5 text-zinc-400" />
            <span>390px</span>
            <Switch checked={narrow} onCheckedChange={setNarrow} className="scale-90 data-[state=unchecked]:bg-zinc-600" aria-label="Constrain to phone width" />
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            {isDark ? <Moon className="h-3.5 w-3.5 text-zinc-400" /> : <Sun className="h-3.5 w-3.5 text-zinc-400" />}
            <span>Dark</span>
            <Switch checked={isDark} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} className="scale-90 data-[state=unchecked]:bg-zinc-600" aria-label="Dark mode" />
          </label>
        </div>
      </div>
      {/* ── /DEV CONTROLS ─────────────────────────────────────────────────── */}

      <div className={cn(narrow && "mx-auto w-[390px] max-w-full border-x border-dashed border-foreground/20 min-h-[calc(100vh-44px)]")}>
        <main className={cn("mx-auto px-4 py-4 sm:py-6", narrow ? "max-w-none" : "max-w-6xl md:px-6")}>
          <TowerView
            floors={floorsWithSteps}
            stateOf={stateOf}
            currentFloor={currentFloor}
            balance={balance}
            lessonsDoneOf={lessonsDoneOf}
            narrow={narrow}
            onEnter={(f) => toast(`Would open Unit ${f.number} · ${f.title}`)}
            onStep={(f, st) => toast(`Would open step ${st.label} · ${st.title}`)}
            onConfirmSkip={(f, cost) => {
              setOverrides((o) => ({ ...o, [f.number]: "skipped" }));
              setBalance((b) => b - cost);
              goToFloor(f.number + 1);
            }}
          />
        </main>
      </div>
    </div>
  );
}

const DevButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    type="button"
    className={cn("rounded-md border border-zinc-600 bg-zinc-800 px-2 py-1 text-[11px] font-semibold text-zinc-100 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed", className)}
    {...props}
  />
);
