import React from "react";
import MissionsWorldMap, { UnitMeta } from "@/components/MissionsWorldMap";
import { unitInfo } from "@/data/lessons";

/**
 * No-auth preview of the new Missions world-bank map, at /missions-preview.
 * Uses mock progress so you can see the map without logging in. The real
 * Missions tab (/lessons) wires the same component to live curriculum data.
 */
export default function MissionsPreview() {
  const floridaUnits = unitInfo
    .filter(u => (u.track ?? "florida") === "florida")
    .sort((a, b) => a.orderIndex - b.orderIndex);

  // First 7 banks cleared, 8th is Jeff's current stop, next few unlocked, rest locked.
  const ACTIVE_INDEX = 7;
  const unitsMeta: UnitMeta[] = floridaUnits.map((unit, i) => {
    const complete = i < ACTIVE_INDEX;
    const unlocked = i <= ACTIVE_INDEX + 1;
    const total = 4;
    return {
      unit,
      total,
      done: complete ? total : i === ACTIVE_INDEX ? 1 : 0,
      complete,
      unlocked,
    };
  });
  const activeUnitId = floridaUnits[ACTIVE_INDEX].id;

  const rewardTotals: Record<string, number> = {};
  floridaUnits.forEach((u, i) => { rewardTotals[u.id] = 250 + i * 50; });

  return (
    <div className="fixed inset-0">
      <MissionsWorldMap
        unitsMeta={unitsMeta}
        activeUnitId={activeUnitId}
        onOpenUnit={(id) => alert(`Would open unit: ${id}`)}
        rewardTotals={rewardTotals}
      />
    </div>
  );
}
