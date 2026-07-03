import React from "react";
import FullScreenCoaster, { CoasterStation } from "@/components/FullScreenCoaster";

/**
 * Standalone full-screen coaster preview at /coaster-journey (and the root of
 * the coaster-only dev server). Mock progress, no auth. The in-app version
 * feeds the same <FullScreenCoaster/> live curriculum data from the Missions tab.
 */

const TITLES = [
  "What Is Money?",
  "Budgeting Basics",
  "Saving Smart",
  "Credit & Debt",
  "Intro to Investing",
  "Stocks & Bonds",
  "Risk & Reward",
  "Your First Portfolio",
];
const CURRENT_IDX = 4; // stations 0–3 ridden, currently boarding #5

const stations: CoasterStation[] = TITLES.map((title, i) => ({
  id: `mock-${i}`,
  title,
  done: i < CURRENT_IDX,
  unlocked: i <= CURRENT_IDX,
}));

export default function CoasterJourney() {
  return (
    <div className="fixed inset-0">
      <FullScreenCoaster
        unitNumber={3}
        unitTitle="Money & Investing"
        unitReward={850}
        stations={stations}
        currentIdx={CURRENT_IDX}
        stats={{ streak: 12, points: 3450, level: 7 }}
        onSelectStation={(s) => alert(`Would open lesson: ${s.title}`)}
      />
    </div>
  );
}
