import React from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import GameNav from "@/components/GameNav";
import LessonPath from "@/components/student/LessonPath";
import StudentHeroBanner from "@/components/student/StudentHeroBanner";

// Main student tab. The vertical lesson path is the hero content (top); the
// full greeting banner (daily missions / lessons toggle, stats, CTA) sits at
// the BOTTOM — "ground level" beneath the climb.
export default function LessonPathHome() {
  const { user, authReady } = useApp();

  if (!authReady) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background">
      <GameNav />
      <main className="p-4 pb-28 md:pb-6">
        {/* ═══ The path (climb) ═══ */}
        <LessonPath />

        {/* ═══ Greeting banner — ground level, beneath the climb ═══ */}
        <div className="mt-3">
          <StudentHeroBanner />
        </div>
      </main>
    </div>
  );
}
