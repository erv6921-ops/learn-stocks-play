import React from "react";
import { ChevronsUp, Coins } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ElevatorGlyph } from "./FloorCard";
import { zoneColor, type Floor, type Zone } from "./towerData";

interface ElevatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  floor: Floor;
  zone: Zone;
  nextFloor: Floor | null;
  cost: number;
  balance: number;
  onConfirm: () => void;
}

/**
 * The in-world "skip a floor" flow. Mock only: shows the fake cost / balance and
 * exactly what gets skipped, then flips local state on confirm.
 */
export const ElevatorDialog: React.FC<ElevatorDialogProps> = ({ open, onOpenChange, floor, zone, nextFloor, cost, balance, onConfirm }) => {
  const after = balance - cost;
  const canAfford = after >= 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-3xl p-0 overflow-hidden border-border [&>button]:text-white [&>button]:opacity-80">
        {/* Elevator car header: brushed dark panel with the floor indicator */}
        <div className="hud-panel !rounded-none px-5 pt-5 pb-4">
          <DialogHeader className="text-left space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/60 flex items-center gap-1.5">
              <ElevatorGlyph className="h-3.5 w-3.5" /> Elevator
            </p>
            <DialogTitle className="font-display text-xl font-extrabold text-white leading-tight">
              Skip Floor {floor.number}?
            </DialogTitle>
            <DialogDescription className="text-white/70 text-[13px]">
              You'll ride straight up to{" "}
              {nextFloor ? (
                <span className="text-white font-semibold">Floor {nextFloor.number} · {nextFloor.room}</span>
              ) : (
                "the roof"
              )}
              .
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-5 pt-4 pb-5 space-y-4">
          {/* What's being skipped */}
          <div className="rounded-2xl border-2 border-dashed border-warning/70 bg-warning/5 px-4 py-3 flex items-center gap-3">
            <div
              className="h-11 w-11 shrink-0 rounded-xl flex items-center justify-center font-display font-extrabold text-white text-lg tabular-nums"
              style={{ background: `linear-gradient(160deg, ${zoneColor(zone, 42)}, ${zoneColor(zone, 30)})` }}
            >
              {floor.number}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{floor.room} · {zone.short}</p>
              <p className="text-[15px] font-semibold text-foreground truncate">{floor.title}</p>
              <p className="text-xs text-muted-foreground">{floor.lessons} lessons skipped</p>
            </div>
          </div>

          {/* Cost sheet */}
          <dl className="rounded-2xl bg-muted/50 border border-border/60 divide-y divide-border/60 text-sm">
            <Row label="Elevator fare" value={cost} strong />
            <Row label="Your InvestiCoins" value={balance} />
            <Row label="After the ride" value={after} negative={!canAfford} />
          </dl>

          <p className="text-xs text-muted-foreground leading-relaxed flex gap-2">
            <ChevronsUp className="h-4 w-4 text-warning shrink-0 mt-px" />
            <span>
              Skipped floors are marked <span className="font-bold text-warning">Skipped</span>, not Complete.
              Your teacher can see the difference, and you can always come back and finish it.
            </span>
          </p>

          <div className="flex flex-col-reverse gap-2 pt-1">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Take the stairs
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={!canAfford}
              className={cn(
                "inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 text-sm font-bold shadow-md transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                "bg-gradient-primary text-primary-foreground",
              )}
            >
              {canAfford ? (
                <>
                  Pay <Coins className="h-4 w-4 text-gold" /> {cost.toLocaleString()} and ride up
                </>
              ) : (
                "Not enough InvestiCoins"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Row: React.FC<{ label: string; value: number; strong?: boolean; negative?: boolean }> = ({ label, value, strong, negative }) => (
  <div className="flex items-center justify-between px-4 py-2.5">
    <dt className="text-muted-foreground">{label}</dt>
    <dd
      className={cn(
        "inline-flex items-center gap-1 tabular-nums font-bold",
        negative ? "text-destructive" : strong ? "text-gold" : "text-foreground",
      )}
    >
      <Coins className={cn("h-3.5 w-3.5", negative ? "text-destructive" : "text-gold")} />
      {value.toLocaleString()}
    </dd>
  </div>
);

export default ElevatorDialog;
