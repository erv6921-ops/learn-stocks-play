import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { unitInfo, getLessonsByUnit } from "@/data/lessons";
import { JeffChatAvatar } from "@/components/lessons/JeffChat";
import { Check, Lock, Play } from "lucide-react";
import {
  getNextAction,
  fetchAssignmentContext,
  actionButtonLabel,
  type NextAction,
} from "@/lib/getNextAction";
import { EnvironmentBackdrop } from "@/components/student/pathScenes";
import { tierForNode, tierPalette, stageName, clampTier, TIER_COUNT } from "@/lib/pathEnvironments";
import { devProgressOverride, devTrackOverride } from "@/lib/devPathOverride";
import type { CourseTrack } from "@/types";

// Duolingo-style UPWARD lesson path — Unit 1 / Lesson 1 at the BOTTOM, the
// final lesson at the TOP (flex-col-reverse over ascending order). It renders
// the student's ENTIRE assigned track in one scroll and is the main student
// tab. As the student completes lessons, Jeff climbs from an underground sewer
// up to deep space (environment tiers live in pathScenes/pathEnvironments —
// this file owns node/progress logic only, never scene internals).
//
// getNextAction stays the source of truth for the current node's route + CTA
// label; completion state drives everything else.

type NodeMeta = {
  id: string;
  title: string;
  unitId: string;
  unitIndex: number;
  globalIndex: number;
  tier: number;
};

// A measured node position within the list container, for the connecting track
// and the scroll→tier interpolation.
type Measured = { id: string; x: number; y: number; tier: number; done: boolean };

const SPINE = 46; // px each node hangs off the central rail (zigzag amplitude)
const NODE = 56; // base node diameter
const CURRENT_NODE = 78; // current node diameter (largest / most prominent)

function trackFor(userTrack?: string): CourseTrack {
  return userTrack === "gulliver_intro" ? "gulliver-intro" : "regular";
}

// hex → rgba() with alpha, for the per-stage accent tints on unit dividers.
function hexA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return `rgba(${parseInt(v.slice(0, 2), 16)},${parseInt(v.slice(2, 4), 16)},${parseInt(v.slice(4, 6), 16)},${a})`;
}

// Pull the lesson id out of a getNextAction route so we can confirm it matches
// the node we think is current before trusting its refined route.
function lessonIdFromRoute(route: string | undefined): string | null {
  if (!route) return null;
  const seg = route.split("?")[0].split("/").filter(Boolean).pop();
  return seg && seg !== "lessons" ? seg : null;
}

export const LessonPath: React.FC = () => {
  const navigate = useNavigate();
  const { user, lessonProgress, unitTestProgress } = useApp();
  const reduce = useReducedMotion();

  const [action, setAction] = useState<NextAction | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef<HTMLDivElement | null>(null);
  const nodeEls = useRef<Map<string, HTMLDivElement>>(new Map());

  const completedSet = useMemo(
    () => new Set(lessonProgress.filter((p) => p.completed).map((p) => p.lessonId)),
    [lessonProgress],
  );

  // Which curriculum to render (DEV ?track= override wins, else enrollment).
  const enrollTrack = devTrackOverride() ?? user?.track;

  // Ordered units for the student's track, and a flat, tier-annotated node list.
  const units = useMemo(() => {
    const track = trackFor(enrollTrack);
    return unitInfo
      .filter((u) => (u.track ?? "regular") === track)
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((u) => ({ unit: u, lessons: getLessonsByUnit(u.id) }));
  }, [enrollTrack]);

  const nodes = useMemo<NodeMeta[]>(() => {
    const total = units.reduce((s, g) => s + g.lessons.length, 0);
    const out: NodeMeta[] = [];
    let gi = 0;
    units.forEach(({ unit, lessons }, unitIndex) => {
      for (const l of lessons) {
        out.push({
          id: l.id,
          title: l.title,
          unitId: unit.id,
          unitIndex,
          globalIndex: gi,
          tier: tierForNode({ unitIndex, unitCount: units.length, globalLessonIndex: gi, totalLessons: total }),
        });
        gi++;
      }
    });
    return out;
  }, [units]);

  const orderedIds = useMemo(() => nodes.map((n) => n.id), [nodes]);

  // Current node = first not-completed lesson (kept synchronous for a stable
  // pre-paint scroll target). DEV ?progress=N overrides it.
  const realCurrentIndex = useMemo(() => {
    const idx = orderedIds.findIndex((id) => !completedSet.has(id));
    return idx === -1 ? orderedIds.length : idx;
  }, [orderedIds, completedSet]);
  const override = devProgressOverride(orderedIds.length);
  const currentIndex = override ?? realCurrentIndex;
  const currentId = currentIndex < orderedIds.length ? orderedIds[currentIndex] : null;

  // Resolve the exact route + CTA label for the current node (getNextAction).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user?.id) return;
      const { assignments, assignmentNames } = await fetchAssignmentContext(user.id);
      if (cancelled) return;
      setAction(
        getNextAction({
          assignedTrack: (enrollTrack as NonNullable<typeof user.track>) ?? undefined,
          lessonProgress,
          assignments,
          assignmentNames,
          // Aims the `review` fallback at the student's weakest benchmark domain.
          benchmarkCategoryScores: user.benchmarkCategoryScores ?? null,
        }),
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id, enrollTrack, lessonProgress]);

  // Rows in ascending order (unit's lessons, then that unit's header). Reversed
  // by flex-col-reverse so Lesson 1 lands at the bottom and each header caps the
  // top of its block.
  type Row =
    | { type: "node"; node: NodeMeta; state: "completed" | "current" | "locked"; side: "left" | "right" }
    | { type: "header"; unitId: string; label: string; stage: string; tier: number; done: number; total: number };
  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [];
    units.forEach(({ unit, lessons }, unitIndex) => {
      let done = 0;
      const tier = nodes.find((n) => n.unitId === unit.id)?.tier ?? 0;
      lessons.forEach((l) => {
        const meta = nodes.find((n) => n.id === l.id)!;
        const state =
          meta.globalIndex < currentIndex ? "completed" : meta.globalIndex === currentIndex ? "current" : "locked";
        if (state === "completed") done++;
        out.push({ type: "node", node: meta, state, side: meta.globalIndex % 2 === 0 ? "left" : "right" });
      });
      out.push({
        type: "header",
        unitId: unit.id,
        label: `Unit ${unit.unitNumber} · ${unit.title}`,
        stage: stageName(tier),
        tier,
        done,
        total: lessons.length,
      });
    });
    return out;
  }, [units, nodes, currentIndex]);

  // ── Measurement: node positions (for the connecting track + scroll→tier) ──
  const [measured, setMeasured] = useState<Measured[]>([]);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const remeasure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const w = list.clientWidth;
    // getBoundingClientRect (relative to the list) is robust to the node
    // wrappers' nearest positioned ancestor — offsetTop would be measured
    // against each row, not the whole list.
    const listRect = list.getBoundingClientRect();
    const next: Measured[] = [];
    for (const n of nodes) {
      const el = nodeEls.current.get(n.id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next.push({
        id: n.id,
        x: r.left - listRect.left + r.width / 2,
        y: r.top - listRect.top + r.height / 2,
        tier: n.tier,
        done: n.globalIndex < currentIndex,
      });
    }
    next.sort((a, b) => a.y - b.y);
    setMeasured(next);
    setSize({ w, h: list.scrollHeight });
  }, [nodes, currentIndex]);

  useLayoutEffect(() => {
    remeasure();
  }, [remeasure, rows.length]);

  useEffect(() => {
    if (!listRef.current) return;
    const ro = new ResizeObserver(() => remeasure());
    ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [remeasure]);

  // ── Scroll → continuous tier fraction (0 = bottom/sewer, 1 = top/space) +
  //    parallax offset. Interpolates between measured node tiers so the ambient
  //    palette tracks REAL units and blends at unit boundaries. rAF-throttled. ──
  const [fraction, setFraction] = useState(0);
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    if (measured.length === 0) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const sec = sectionRef.current;
      const list = listRef.current;
      if (!sec || !list) return;
      const listTopDoc = window.scrollY + list.getBoundingClientRect().top;
      // Sample a touch below viewport-center: the current node auto-scrolls to
      // ~center, and at the extremes (first/last node) it sits slightly off, so
      // biasing toward where Jeff actually is keeps the sewer dark at the bottom
      // and space dark at the top.
      const centerInList = window.scrollY + window.innerHeight * 0.6 - listTopDoc;
      // find bracketing measured nodes by y (measured is sorted ascending y)
      let tier = measured[0].tier;
      if (centerInList <= measured[0].y) tier = measured[0].tier;
      else if (centerInList >= measured[measured.length - 1].y) tier = measured[measured.length - 1].tier;
      else {
        for (let i = 0; i < measured.length - 1; i++) {
          const a = measured[i];
          const b = measured[i + 1];
          if (centerInList >= a.y && centerInList <= b.y) {
            const t = (centerInList - a.y) / Math.max(1, b.y - a.y);
            tier = a.tier + (b.tier - a.tier) * t;
            break;
          }
        }
      }
      // y grows downward but the DOM is flex-col-reverse, so smaller y = higher
      // tier already (tiers were assigned by globalIndex, and reverse layout puts
      // high-index nodes at small y). measured[].tier already reflects that.
      setFraction(Math.max(0, Math.min(1, tier / (TIER_COUNT - 1))));
      setParallax(reduce ? 0 : Math.max(-40, Math.min(40, (centerInList - size.h / 2) * -0.02)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [measured, size.h, reduce]);

  // ── Jeff's Y (pinned beside the current node). Measured pre-paint; animates
  //    (a spring "climb") only when the current node CHANGES — i.e. the reward
  //    moment after a lesson is completed. First placement is instant. ──
  const [jeffY, setJeffY] = useState<number | null>(null);
  const [jeffSide, setJeffSide] = useState<"left" | "right">("left");
  const firstJeff = useRef(true);
  const [landed, setLanded] = useState(true); // false while climbing; gates the "unlock"
  useLayoutEffect(() => {
    const el = currentRef.current;
    if (!el || !listRef.current) {
      setJeffY(null);
      return;
    }
    const listRect = listRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const y = r.top - listRect.top + r.height / 2;
    setJeffSide(currentIndex % 2 === 0 ? "left" : "right");
    if (firstJeff.current) {
      firstJeff.current = false;
      setJeffY(y);
      setLanded(true);
    } else {
      setLanded(false);
      setJeffY(y); // motion animates from previous → this = the climb
    }
  }, [currentIndex, rows.length]);

  // ── Pre-paint auto-scroll: center the current node (and Jeff) in the viewport
  //    with no smooth animation so there's no visible jump on load. ──
  useLayoutEffect(() => {
    const el = currentRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const target = window.scrollY + rect.top - (window.innerHeight / 2 - rect.height / 2);
    window.scrollTo({ top: Math.max(0, target), behavior: "auto" });
    // run once after first measure
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, measured.length > 0]);

  // Skeleton with a stable height so nothing jumps as the path hydrates.
  if (!user) {
    return (
      <div className="relative mx-auto min-h-[70vh] max-w-md" aria-hidden>
        <div className="flex flex-col-reverse items-center gap-8 py-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`skeleton-shimmer h-14 w-14 rounded-full ${i % 2 === 0 ? "-translate-x-11" : "translate-x-11"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  const currentLabel = action ? actionButtonLabel(action) : completedSet.size > 0 ? "Continue" : "Start";
  const currentRoute =
    (action && lessonIdFromRoute(action.route) === currentId ? action.route : null) ??
    (currentId ? `/lessons/${currentId}` : "/lessons");

  const springClimb = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 200, damping: 24, mass: 0.9 };

  // Connecting-track path data (measured node centers). Split at the current
  // node so completed track reads solid/bright and upcoming reads muted.
  const buildPath = (pts: Measured[]) =>
    pts.length < 2 ? "" : pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const doneTrack = buildPath(measured.filter((m) => m.done || m.id === currentId));
  const upcomingTrack = buildPath(measured.filter((m) => !m.done));

  return (
    <section ref={sectionRef} aria-label="Your lesson path" className="relative rounded-3xl">
      {/* ── Environment backdrop: a sticky 100vh layer pinned behind the path
             while the nodes scroll over it (classic sticky-background pattern —
             the node list below uses a -100vh margin to overlay it). Owns no
             progress logic — just a fraction + parallax in. ── */}
      <div className="sticky top-0 z-0 h-screen overflow-hidden rounded-3xl">
        <EnvironmentBackdrop fraction={fraction} parallax={parallax} />
      </div>

      {/* ── The path itself (overlaid on the sticky backdrop) ── */}
      <div ref={listRef} className="relative z-10 mx-auto -mt-[100vh] max-w-md px-3">
        {/* connecting track (under the nodes) */}
        {size.w > 0 && (
          <svg className="pointer-events-none absolute inset-0 h-full w-full" width={size.w} height={size.h} aria-hidden>
            {upcomingTrack && (
              <path d={upcomingTrack} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth={6} strokeLinecap="round" strokeDasharray="1 14" />
            )}
            {doneTrack && (
              <path d={doneTrack} fill="none" stroke="var(--brand-bright)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        )}

        {/* Jeff — absolutely positioned, springs up on completion */}
        {jeffY != null && (
          <motion.div
            className="pointer-events-none absolute z-30"
            style={{ left: "50%", top: 0 }}
            initial={false}
            animate={{ y: jeffY - 22, x: (jeffSide === "left" ? 1 : -1) * (SPINE + 40) }}
            transition={springClimb}
            onAnimationComplete={() => setLanded(true)}
          >
            <motion.div
              animate={reduce || landed ? { rotate: 0 } : { rotate: [0, -8, 6, 0] }}
              transition={reduce ? { duration: 0 } : { duration: 0.5 }}
            >
              <div className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]">
                <JeffChatAvatar size={44} />
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="relative flex flex-col-reverse gap-8 py-10">
          {rows.map((row) => {
            if (row.type === "header") {
              const complete = row.total > 0 && row.done >= row.total;
              const accent = tierPalette(clampTier(row.tier)).glow;
              return (
                <div key={`h-${row.unitId}`} className="relative z-20 my-3 flex flex-col items-center gap-2">
                  {/* stage marker — names the biome this unit climbs into */}
                  <div className="flex w-full items-center gap-3">
                    <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${hexA(accent, 0.6)})` }} />
                    <span
                      className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-sm"
                      style={{ background: "rgba(0,0,0,0.45)", color: accent, border: `1px solid ${hexA(accent, 0.5)}` }}
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
                      {row.stage}
                    </span>
                    <span className="h-px flex-1" style={{ background: `linear-gradient(270deg, transparent, ${hexA(accent, 0.6)})` }} />
                  </div>
                  {/* unit title + progress */}
                  <span
                    className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-extrabold backdrop-blur-sm"
                    style={{
                      background: complete ? "rgba(var(--brand-rgb),0.92)" : "rgba(0,0,0,0.5)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.28)",
                      boxShadow: "0 6px 18px -8px rgba(0,0,0,0.6)",
                    }}
                  >
                    {row.label}
                    <span className="ml-2 font-bold text-white/55">{row.done} of {row.total}</span>
                    {complete && <span className="ml-1.5">✓</span>}
                  </span>
                </div>
              );
            }

            const { node, state, side } = row;
            const isCurrent = state === "current";
            const isCompleted = state === "completed";
            const isLocked = state === "locked";
            const clickable = isCurrent || isCompleted;
            const offset = side === "left" ? -SPINE : SPINE;

            return (
              <div key={node.id} className="relative z-20 flex justify-center">
                <div
                  ref={(el) => {
                    if (el) nodeEls.current.set(node.id, el);
                    else nodeEls.current.delete(node.id);
                    if (isCurrent) currentRef.current = el;
                  }}
                  className="relative flex flex-col items-center"
                  style={{ transform: `translateX(${offset}px)` }}
                >
                  <motion.button
                    type="button"
                    disabled={!clickable}
                    onClick={() => {
                      if (isCurrent) navigate(currentRoute);
                      else if (isCompleted) navigate(`/lessons/${node.id}`);
                    }}
                    aria-current={isCurrent ? "step" : undefined}
                    aria-label={`${node.title}${isLocked ? " (locked)" : isCompleted ? " (completed)" : ""}`}
                    // The current node "unlocks" ~200ms after Jeff lands: a small
                    // confirm pulse, not a decorative loop.
                    animate={
                      isCurrent && !reduce
                        ? { scale: landed ? 1 : 0.92, opacity: landed ? 1 : 0.85 }
                        : { scale: 1, opacity: isLocked ? 0.55 : 1 }
                    }
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 18, delay: landed ? 0 : 0.2 }}
                    className={[
                      "press-scale flex items-center justify-center rounded-full",
                      clickable ? "cursor-pointer" : "cursor-default",
                    ].join(" ")}
                    style={{
                      height: isCurrent ? CURRENT_NODE : NODE,
                      width: isCurrent ? CURRENT_NODE : NODE,
                      transition: "background 260ms ease",
                      ...(isCurrent
                        ? {
                            background: "linear-gradient(135deg,var(--brand-bright),var(--brand-strong))",
                            boxShadow: "0 0 0 6px rgba(var(--brand-rgb),0.22), 0 16px 34px -8px rgba(0,0,0,0.6)",
                            color: "#fff",
                          }
                        : isCompleted
                          ? { background: "var(--brand)", color: "#fff", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.55)" }
                          : {
                              background: "rgba(255,255,255,0.16)",
                              color: "rgba(255,255,255,0.75)",
                              border: "1px solid rgba(255,255,255,0.28)",
                              backdropFilter: "blur(2px)",
                            }),
                    }}
                  >
                    {isCompleted ? (
                      <Check className="h-6 w-6" strokeWidth={3} />
                    ) : isCurrent ? (
                      <Play className="h-7 w-7 fill-current" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </motion.button>

                  {isCurrent && (
                    <span
                      className="mt-2 rounded-full px-3 py-1 text-xs font-extrabold text-white shadow-md"
                      style={{ background: "var(--brand-strong)", border: "1px solid rgba(255,255,255,0.25)" }}
                    >
                      {currentLabel}
                    </span>
                  )}

                  <span
                    className="mt-1.5 max-w-[140px] truncate rounded px-1 text-center text-[11px] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
                    style={{ opacity: isLocked ? 0.7 : 1 }}
                  >
                    {node.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LessonPath;
