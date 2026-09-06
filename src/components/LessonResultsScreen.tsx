import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trophy, Target, ArrowRight, LayoutDashboard } from "lucide-react";

interface LessonResultsScreenProps {
  score: number;
  total: number;
  /** Whether the student reached the mastery streak. */
  passed: boolean;
  /** e.g. "7/7 correct in sequence" (from check-mastery). */
  masteryProgress?: string;
  /** Change in ability estimate over this session (theta). */
  thetaDelta?: number | null;
  onBackToDashboard: () => void;
  onNextLesson?: () => void;
}

export const LessonResultsScreen: React.FC<LessonResultsScreenProps> = ({
  score,
  total,
  passed,
  masteryProgress,
  thetaDelta,
  onBackToDashboard,
  onNextLesson,
}) => {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="border-emerald-100 shadow-sm">
        <CardContent className="flex flex-col items-center gap-5 p-8 text-center">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg",
              passed
                ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/25"
                : "bg-gradient-to-br from-slate-400 to-slate-500 shadow-slate-400/25",
            )}
          >
            {passed ? (
              <Trophy className="h-8 w-8 text-white" />
            ) : (
              <Target className="h-8 w-8 text-white" />
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">
              {passed ? "🎉 Lesson complete!" : "Lesson complete"}
            </h2>
            <p className="text-sm text-slate-500">
              You answered <span className="font-semibold text-slate-700">{score}/{total}</span>{" "}
              correct ({pct}%).
            </p>
          </div>

          {/* Mastery status */}
          <div
            className={cn(
              "w-full rounded-xl border p-4",
              passed
                ? "border-emerald-200 bg-emerald-50"
                : "border-slate-200 bg-slate-50",
            )}
          >
            {passed ? (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-emerald-800">
                  You&apos;ve mastered this lesson!
                </p>
                {typeof thetaDelta === "number" && (
                  <p className="text-xs text-emerald-700">
                    Ability {thetaDelta >= 0 ? "+" : ""}
                    {thetaDelta.toFixed(2)} theta points
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-700">
                  Keep going to reach mastery.
                </p>
                {masteryProgress && (
                  <p className="text-xs text-slate-500">{masteryProgress}</p>
                )}
              </div>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 pt-1">
            {onNextLesson && (
              <Button
                onClick={onNextLesson}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
              >
                Next lesson
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            )}
            <Button
              variant={onNextLesson ? "outline" : "default"}
              onClick={onBackToDashboard}
              className={cn(
                "w-full",
                !onNextLesson &&
                  "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700",
              )}
            >
              <LayoutDashboard className="mr-1.5 h-4 w-4" />
              Back to dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonResultsScreen;
