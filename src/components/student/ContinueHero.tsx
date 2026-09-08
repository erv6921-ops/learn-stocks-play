import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import {
  getNextAction,
  fetchAssignmentContext,
  actionButtonLabel,
  type NextAction,
} from "@/lib/getNextAction";

// "Continue" hero on the student home screen: one tap resumes exactly where the
// student should go next. Single source of truth is @/lib/getNextAction; this
// component only fetches assignments, computes the action, and renders it.
//
// Deliberately NO mount animation — it renders in final position so the page
// never jumps. Fixed min-height keeps the skeleton and the real card the same
// size. Uses semantic design tokens (bg-card / text-foreground / …) so it works
// in both light and dark themes (next-themes class strategy).

// Skeleton + card share this height so the layout doesn't shift on load.
const CARD_MIN_H = "min-h-[172px] md:min-h-[180px]";

// DEV-only: representative sample of each kind, so `?next=<kind>` can be used to
// eyeball how every card variant renders. Gated on import.meta.env.DEV, so it is
// stripped from production builds entirely (works under `npm run dev`).
const DEV_SAMPLE_ACTIONS: Record<string, NextAction> = {
  assignment: {
    kind: "assignment", eyebrow: "Assigned by your teacher", title: "Intro to Budgeting",
    subtitle: "Due tomorrow", progressPct: null, route: "/lessons", urgent: true,
  },
  resume_lesson: {
    kind: "resume_lesson", eyebrow: "Budgeting Mastery", title: "Building Your First Budget",
    subtitle: "Section 4 of 7", progressPct: 57, route: "/lessons", urgent: false,
  },
  next_lesson: {
    kind: "next_lesson", eyebrow: "Income & Earning Power", title: "What Your Time Is Worth",
    subtitle: "Lesson 2.1", progressPct: null, route: "/lessons", urgent: false,
  },
  review: {
    kind: "review", eyebrow: "Keep it sharp", title: "Review what you've learned",
    subtitle: "Revisit a lesson and lock it in", progressPct: null, route: "/lessons", urgent: false,
  },
};

// Read a DEV-only `?next=<kind>` override from the URL, if valid. Returns null in
// production or when absent/invalid.
function devKindOverride(): NextAction | null {
  if (!import.meta.env.DEV) return null;
  const kind = new URLSearchParams(window.location.search).get("next");
  return kind && kind in DEV_SAMPLE_ACTIONS ? DEV_SAMPLE_ACTIONS[kind] : null;
}

export const ContinueHero: React.FC = () => {
  const navigate = useNavigate();
  const { user, lessonProgress } = useApp();
  const [action, setAction] = useState<NextAction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // DEV-only forced kind (?next=…) short-circuits the real computation.
    const override = devKindOverride();
    if (override) {
      setAction(override);
      setLoading(false);
      return;
    }
    (async () => {
      if (!user?.id) return;
      // Fall back to the 'review' action (never an error state) if the one
      // network call fails — fetchAssignmentContext already resolves to empty.
      const { assignments, assignmentNames } = await fetchAssignmentContext(user.id);
      if (cancelled) return;
      const next = getNextAction({
        assignedTrack: user.assigned_track ?? user.track,
        lessonProgress,
        assignments,
        assignmentNames,
      });
      setAction(next);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
    // Recompute when the student's progress changes (e.g. finishing a lesson).
  }, [user?.id, user?.track, user?.assigned_track, lessonProgress]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading || !action) {
    return (
      <div
        className={`w-full ${CARD_MIN_H} rounded-3xl border border-border bg-card p-5 md:p-6 shadow-sm`}
        aria-hidden
      >
        <div className="skeleton-shimmer h-3 w-28 rounded-full" />
        <div className="skeleton-shimmer mt-3 h-6 w-3/5 rounded-lg" />
        <div className="skeleton-shimmer mt-2.5 h-3.5 w-40 rounded-full" />
        <div className="skeleton-shimmer mt-6 h-11 w-full rounded-xl" />
      </div>
    );
  }

  const label = actionButtonLabel(action);

  return (
    <section
      aria-label="Continue"
      className={`w-full ${CARD_MIN_H} rounded-3xl bg-card p-5 md:p-6 shadow-sm flex flex-col ${
        action.urgent ? "border-2 border-amber-400/70" : "border border-border"
      }`}
    >
      {/* eyebrow + optional urgent badge */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground truncate">
          {action.eyebrow}
        </p>
        {action.urgent && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-400/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-300">
            <Clock className="h-3 w-3" /> Due soon
          </span>
        )}
      </div>

      {/* title */}
      <h2 className="mt-1.5 font-display text-xl md:text-2xl font-extrabold leading-tight tracking-tight text-foreground line-clamp-2">
        {action.title}
      </h2>

      {/* subtitle */}
      <p className="mt-1 text-sm font-medium text-muted-foreground">{action.subtitle}</p>

      {/* progress bar — only when we have a percentage */}
      {action.progressPct != null && (
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${Math.max(0, Math.min(100, action.progressPct))}%` }}
          />
        </div>
      )}

      {/* exactly one full-width primary button, pinned to the bottom — big and
          attention-grabbing: tall, bold, brand gradient with a soft glow. */}
      <Button
        onClick={() => navigate(action.route)}
        className="mt-auto w-full h-14 md:h-16 rounded-2xl text-base md:text-lg font-extrabold gap-2 text-white press-scale hover:brightness-105 transition-[filter,transform]"
        style={{
          background: "linear-gradient(135deg,var(--brand-bright),var(--brand-strong))",
          boxShadow: "0 10px 26px rgba(var(--brand-rgb),0.42)",
        }}
      >
        {label}
        <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    </section>
  );
};

export default ContinueHero;
