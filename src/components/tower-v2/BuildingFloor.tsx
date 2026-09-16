import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { zoneColor, type FloorState, type Zone, type ZoneId } from "./towerData";

/* ═══════════════════════════════════════════════════════════════════════════
   BUILDING FLOOR - one cutaway room of the tower, drawn beside the trail.
   Every zone has its own finish, and it gets nicer the higher you climb:
   concrete + bars + a safe in the Vault, marble + reception in the Lobby, grey
   partitions in the Cubicles, dark walls + a ticker on the Trading Floor,
   wood + shelves in Research, mahogany + a painting in the Exec suite, glass,
   gold and a skyline in the Penthouse. Lit floors have people at work; locked
   floors are shuttered.
   ═══════════════════════════════════════════════════════════════════════════ */

const SHIRTS = ["hsl(210 60% 45%)", "hsl(350 55% 50%)", "hsl(152 45% 38%)", "hsl(265 45% 50%)", "hsl(30 70% 50%)", "hsl(190 50% 40%)"];
const SKIN = ["hsl(28 45% 62%)", "hsl(25 40% 45%)", "hsl(30 35% 30%)", "hsl(32 50% 75%)"];
const hash = (a: number, b: number) => ((a * 73856093) ^ (b * 19349663)) >>> 0;

interface Finish {
  wall: string;
  wallDark: string;
  floor: string;
  floorPattern?: string;
  windows: { count: number; tall: boolean; glass?: boolean; blinds?: boolean };
  desks: number;
  chandelier?: boolean;
  plants: number;
  painting?: boolean;
  shelf?: boolean;
  safe?: boolean;
  bars?: boolean;
  ticker?: boolean;
  reception?: boolean;
  partitions?: number;
  sofa?: boolean;
  skyline?: boolean;
}

export const FINISH: Record<ZoneId, Finish> = {
  vault:     { wall: "hsl(220 10% 62%)", wallDark: "hsl(220 10% 46%)", floor: "hsl(220 10% 38%)", windows: { count: 0, tall: false }, desks: 2, plants: 0, safe: true, bars: true },
  lobby:     { wall: "hsl(38 45% 90%)", wallDark: "hsl(36 35% 78%)", floor: "hsl(36 25% 62%)", floorPattern: "repeating-linear-gradient(90deg, transparent 0 22px, rgba(255,255,255,0.35) 22px 24px)", windows: { count: 1, tall: false }, desks: 2, plants: 1, reception: true },
  cubicles:  { wall: "hsl(205 25% 84%)", wallDark: "hsl(205 22% 70%)", floor: "hsl(205 15% 48%)", windows: { count: 2, tall: false }, desks: 3, plants: 1, partitions: 3 },
  trading:   { wall: "hsl(210 30% 24%)", wallDark: "hsl(210 30% 16%)", floor: "hsl(210 20% 18%)", windows: { count: 3, tall: false }, desks: 3, plants: 0, ticker: true },
  research:  { wall: "hsl(30 35% 78%)", wallDark: "hsl(28 30% 62%)", floor: "hsl(28 40% 38%)", floorPattern: "repeating-linear-gradient(90deg, transparent 0 16px, rgba(0,0,0,0.12) 16px 18px)", windows: { count: 2, tall: true }, desks: 2, plants: 1, shelf: true, painting: false },
  exec:      { wall: "hsl(345 20% 30%)", wallDark: "hsl(345 20% 20%)", floor: "hsl(20 45% 26%)", floorPattern: "repeating-linear-gradient(90deg, transparent 0 20px, rgba(255,255,255,0.06) 20px 22px)", windows: { count: 3, tall: true, blinds: true }, desks: 1, plants: 2, painting: true, chandelier: true },
  penthouse: { wall: "hsl(42 40% 94%)", wallDark: "hsl(42 35% 82%)", floor: "hsl(42 30% 70%)", floorPattern: "repeating-linear-gradient(90deg, transparent 0 26px, rgba(255,255,255,0.5) 26px 28px)", windows: { count: 1, tall: true, glass: true }, desks: 1, plants: 3, chandelier: true, sofa: true, skyline: true },
};

export const BuildingFloor: React.FC<{ zone: Zone; floor: number; state: FloorState; reduce: boolean; className?: string }> = ({ zone, floor, state, reduce, className }) => {
  const f = FINISH[zone.id];
  const locked = state === "locked";
  const skipped = state === "skipped";
  const lit = !locked;
  const busy = lit && !skipped;
  const h = hash(floor, 5);

  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden style={{ background: `linear-gradient(180deg, ${f.wall}, ${f.wallDark})` }}>
      {/* structural side wall */}
      <span className="absolute inset-y-0 left-0 w-[8px]" style={{ background: `linear-gradient(90deg, ${zoneColor(zone, 30)}, ${zoneColor(zone, 40)})` }} />
      {/* ceiling */}
      <span className="absolute inset-x-0 top-0 h-[8px]" style={{ background: zoneColor(zone, 32, 0.9), boxShadow: "0 2px 4px rgba(0,0,0,0.25)" }} />
      {/* ceiling light strip / chandelier */}
      {lit && !f.chandelier && <span className="absolute left-[15%] right-[15%] top-[10px] h-[3px] rounded-full" style={{ background: "hsl(46 95% 70%)", boxShadow: "0 0 12px hsl(46 95% 60% / 0.8)" }} />}
      {lit && f.chandelier && (
        <span className="absolute left-1/2 top-[8px] -translate-x-1/2 flex flex-col items-center">
          <span className="w-[2px] h-[14px] bg-[hsl(42_60%_55%)]" />
          <span className="h-[10px] w-[34px] rounded-b-full" style={{ background: "hsl(42 70% 60%)", boxShadow: "0 6px 18px hsl(46 95% 60% / 0.7)" }} />
          <span className="mt-[2px] flex gap-[5px]">{[0, 1, 2].map((i) => <span key={i} className="h-[5px] w-[5px] rounded-full" style={{ background: "hsl(46 95% 75%)", boxShadow: "0 0 6px hsl(46 95% 60%)" }} />)}</span>
        </span>
      )}

      {/* skyline through the glass (penthouse) */}
      {f.skyline && (
        <span className="absolute left-[12%] right-[10%] top-[30px] bottom-[38%] rounded-[6px] overflow-hidden" style={{ background: locked ? "hsl(225 30% 18%)" : "linear-gradient(180deg, hsl(205 70% 80%), hsl(205 60% 92%))", boxShadow: `inset 0 0 0 4px ${lit ? "hsl(42 60% 60%)" : "hsl(220 10% 30%)"}` }}>
          {[18, 30, 12, 40, 22, 34, 16].map((hh, i) => (
            <span key={i} className="absolute bottom-0" style={{ left: `${4 + i * 13}%`, width: "10%", height: `${hh + 20}%`, background: locked ? "hsl(225 25% 25%)" : "hsl(210 25% 55% / 0.8)" }} />
          ))}
          {!locked && <span className="absolute right-[10%] top-[10%] h-[16px] w-[16px] rounded-full" style={{ background: "hsl(46 95% 65%)", boxShadow: "0 0 14px hsl(46 95% 60% / 0.8)" }} />}
        </span>
      )}

      {/* windows */}
      {!f.skyline && f.windows.count > 0 && (
        <span className="absolute left-[14%] right-[12%] top-[26px] flex justify-around gap-2">
          {Array.from({ length: f.windows.count }, (_, i) => (
            <span
              key={i}
              className="relative flex-1 max-w-[64px] rounded-[4px] overflow-hidden"
              style={{
                height: f.windows.tall ? 78 : 46,
                background: locked ? "hsl(225 25% 18%)" : f.ticker ? "hsl(210 40% 12%)" : "linear-gradient(180deg, hsl(205 70% 82%), hsl(205 60% 92%))",
                boxShadow: `inset 0 0 0 3px ${f.ticker ? "hsl(210 20% 30%)" : "hsl(28 30% 45% / 0.7)"}`,
              }}
            >
              {f.windows.blinds && <span className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(180deg, rgba(0,0,0,0.18) 0 3px, transparent 3px 8px)" }} />}
              {f.ticker && lit && (
                <span className="absolute inset-[6px] flex flex-col gap-[3px]">
                  {[0, 1, 2, 3].map((r) => <span key={r} className="h-[3px] rounded-full" style={{ width: `${40 + ((h + r * 13) % 55)}%`, background: (h + r) % 3 === 0 ? "hsl(0 70% 55%)" : "hsl(152 60% 50%)" }} />)}
                </span>
              )}
            </span>
          ))}
        </span>
      )}

      {/* vault bars over the back wall */}
      {f.bars && <span className="absolute left-[14%] right-[12%] top-[26px] h-[60px]" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(220 10% 30%) 0 4px, transparent 4px 16px)", opacity: lit ? 0.7 : 0.35 }} />}

      {/* painting */}
      {f.painting && <span className="absolute right-[10%] top-[36px] h-[36px] w-[46px] rounded-[3px]" style={{ background: "linear-gradient(135deg, hsl(200 50% 55%), hsl(30 60% 55%))", boxShadow: "0 0 0 4px hsl(42 60% 45%)", opacity: lit ? 1 : 0.35 }} />}

      {/* ticker strip */}
      {f.ticker && lit && (
        <span className="absolute inset-x-[8px] top-[14px] h-[6px] overflow-hidden" style={{ background: "hsl(210 40% 10%)" }}>
          <motion.span className="absolute inset-y-0 left-0 w-[200%]" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(152 60% 50%) 0 10px, transparent 10px 16px, hsl(0 70% 55%) 16px 22px, transparent 22px 34px)" }} animate={reduce ? undefined : { x: ["0%", "-50%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
        </span>
      )}

      {/* shelves */}
      {f.shelf && (
        <span className="absolute right-[8%] top-[24px] h-[86px] w-[44px] rounded-[3px]" style={{ background: "hsl(28 45% 35%)", opacity: lit ? 1 : 0.4 }}>
          {[0, 1, 2, 3].map((r) => (
            <span key={r} className="absolute inset-x-[4px] flex gap-[2px] items-end" style={{ top: 6 + r * 20, height: 14 }}>
              {[0, 1, 2, 3, 4].map((b) => <span key={b} className="flex-1 rounded-[1px]" style={{ height: 8 + ((h + r * 3 + b) % 6), background: ["hsl(200 50% 50%)", "hsl(350 55% 50%)", "hsl(152 45% 42%)", "hsl(42 70% 55%)", "hsl(265 45% 55%)"][(h + r + b) % 5] }} />)}
              <span className="absolute inset-x-0 bottom-[-2px] h-[2px] bg-black/30" />
            </span>
          ))}
        </span>
      )}

      {/* floor */}
      <span className="absolute inset-x-0 bottom-0 h-[26%] min-h-[40px]" style={{ background: f.floor, backgroundImage: f.floorPattern }} />
      <span className="absolute inset-x-0 bottom-[26%] h-[3px] bg-black/25" />

      {/* partitions (cubicles) */}
      {f.partitions && Array.from({ length: f.partitions }, (_, i) => (
        <span key={i} className="absolute bottom-[26%] h-[44px] w-[4px] rounded-t-[2px]" style={{ left: `${18 + i * 24}%`, background: "hsl(205 15% 60%)", opacity: lit ? 1 : 0.4 }} />
      ))}

      {/* reception desk */}
      {f.reception && <span className="absolute left-[14%] bottom-[26%] h-[22px] w-[34%] rounded-t-[6px]" style={{ background: "hsl(28 40% 42%)", boxShadow: "inset 0 3px 0 hsl(28 45% 55%)", opacity: lit ? 1 : 0.4 }} />}

      {/* desks + workers */}
      {Array.from({ length: f.desks }, (_, i) => {
        const left = f.reception ? 56 + i * 20 : f.desks === 1 ? 40 : 14 + i * (68 / f.desks);
        const seed = hash(floor, i + 21);
        const big = f.desks === 1;
        return (
          <span key={i} className="absolute bottom-[26%]" style={{ left: `${left}%` }}>
            <span className="absolute bottom-0 rounded-[3px]" style={{ width: big ? 74 : 40, height: big ? 14 : 10, background: f.desks === 1 ? "hsl(20 45% 30%)" : lit ? "hsl(28 40% 40%)" : "hsl(220 12% 26%)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.2)" }} />
            <span className="absolute rounded-[2px]" style={{ left: big ? 26 : 6, bottom: big ? 14 : 10, width: big ? 18 : 12, height: big ? 12 : 9, background: lit ? "hsl(200 90% 62%)" : "hsl(220 12% 28%)", boxShadow: lit ? "0 0 8px hsl(200 90% 62%)" : "none" }} />
            {f.ticker && <span className="absolute rounded-[2px]" style={{ left: 22, bottom: 10, width: 12, height: 9, background: lit ? "hsl(152 80% 55%)" : "hsl(220 12% 28%)", boxShadow: lit ? "0 0 8px hsl(152 80% 55%)" : "none" }} />}
            {busy && (
              <motion.span
                className="absolute flex flex-col items-center"
                style={{ left: big ? 44 : 22, bottom: big ? 8 : 6 }}
                animate={reduce ? undefined : { y: [0, -1.5, 0] }}
                transition={{ duration: 0.9 + (seed % 10) / 10, repeat: Infinity, delay: (seed % 20) / 10, ease: "easeInOut" }}
              >
                <span className="rounded-full" style={{ width: big ? 12 : 9, height: big ? 12 : 9, background: SKIN[seed % SKIN.length] }} />
                <span className="rounded-t-[3px]" style={{ width: big ? 18 : 14, height: big ? 14 : 11, background: f.desks === 1 ? "hsl(220 25% 20%)" : SHIRTS[seed % SHIRTS.length], marginTop: 1 }} />
              </motion.span>
            )}
          </span>
        );
      })}

      {/* sofa (penthouse) */}
      {f.sofa && <span className="absolute left-[12%] bottom-[26%] h-[18px] w-[30%] rounded-t-[8px]" style={{ background: "hsl(345 45% 45%)", boxShadow: "inset 0 4px 0 hsl(345 45% 55%)", opacity: lit ? 1 : 0.4 }} />}

      {/* plants */}
      {Array.from({ length: f.plants }, (_, i) => (
        <span key={i} className="absolute bottom-[26%]" style={{ right: `${6 + i * 9}%`, opacity: lit ? 1 : 0.4 }}>
          <span className="absolute bottom-0 left-[3px] h-[8px] w-[10px] rounded-[2px]" style={{ background: "hsl(20 40% 40%)" }} />
          <span className="absolute bottom-[6px] -left-[2px] h-[18px] w-[20px] rounded-full" style={{ background: "hsl(140 45% 38%)" }} />
          <span className="absolute bottom-[14px] left-[4px] h-[12px] w-[12px] rounded-full" style={{ background: "hsl(140 50% 45%)" }} />
        </span>
      ))}

      {/* safe (vault) */}
      {f.safe && (
        <span className="absolute right-[8%] bottom-[26%] h-[40px] w-[36px] rounded-[3px]" style={{ background: "hsl(220 12% 40%)", boxShadow: "inset 0 0 0 3px hsl(220 12% 30%)", opacity: lit ? 1 : 0.4 }}>
          <span className="absolute left-1/2 top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px]" style={{ borderColor: "hsl(46 60% 60%)" }} />
        </span>
      )}

      {/* locked: shutters + padlock; skipped: amber tape */}
      {locked && (
        <>
          <span className="absolute inset-0" style={{ background: "repeating-linear-gradient(180deg, hsl(220 12% 30% / 0.6) 0 4px, hsl(220 12% 20% / 0.6) 4px 8px)" }} />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[26px] w-[22px] rounded-[3px]" style={{ background: "hsl(46 60% 55%)" }}>
            <span className="absolute -top-[12px] left-[4px] h-[14px] w-[14px] rounded-t-full border-[3px] border-b-0" style={{ borderColor: "hsl(46 60% 55%)" }} />
          </span>
        </>
      )}
      {skipped && <span className="absolute inset-0" style={{ background: "repeating-linear-gradient(135deg, hsl(38 92% 60% / 0.22) 0 8px, transparent 8px 22px)" }} />}
    </div>
  );
};

export default BuildingFloor;
