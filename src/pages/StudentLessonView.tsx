import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass";
import {
  ConceptRenderer,
  MicroCheckRenderer,
  ScenarioRenderer,
  AppliedQuestionRenderer,
  RecapRenderer,
  MasteryCheckRenderer,
} from "@/components/lesson/SectionRenderer";
import { ActivityCheckRenderer } from "@/components/lesson/ActivityCheckRenderer";
import { DiagramRenderer } from "@/components/lesson/DiagramRenderer";
import { HintProvider } from "@/components/lesson/HintContext";
import { QuizSessionProvider } from "@/components/lesson/QuizSessionContext";
import JeffChat from "@/components/lessons/JeffChat";
import { buildScript, isDeepLesson } from "@/lib/jeffChatLesson";
import LessonResultsScreen from "@/components/LessonResultsScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import type { Lesson, LessonSection, MasteryCheckSection } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

interface JeffContext {
  learningObjectives?: string[];
  concepts?: { name: string; definition: string }[];
  vocabulary?: { term: string; definition: string }[];
  excerpt?: string;
}
interface LessonContent {
  version?: number;
  sections?: LessonSection[];
  jeffContext?: JeffContext;
}

const slugify = (s: string): string =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "lesson";

type Phase = "loading" | "error" | "intro" | "sections" | "done";

const StudentLessonView: React.FC = () => {
  const { lessonId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();

  const [phase, setPhase] = useState<Phase>("loading");
  const [error, setError] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [content, setContent] = useState<LessonContent | null>(null);

  // Section stepper + mastery state (mirrors LessonDetail's ownership so a
  // fail-and-retry remounts the mastery renderer with a fresh attempt number).
  const [sectionIdx, setSectionIdx] = useState(0);
  const [masteryAttempt, setMasteryAttempt] = useState({ sessionId: crypto.randomUUID(), attemptNumber: 1 });
  const [regen, setRegen] = useState(0);
  const [result, setResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);

  const concept = useMemo(() => (lessonName ? `curriculum:${slugify(lessonName)}` : "curriculum"), [lessonName]);
  const sections = content?.sections ?? [];
  const finalizedRef = useRef(false);

  // --- Load lesson content -------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error: e } = await db
          .from("lessons")
          .select("name, content")
          .eq("id", lessonId)
          .single();
        if (cancelled) return;
        if (e) throw new Error(e.message);
        setLessonName(data?.name ?? "Lesson");
        const c = (data?.content ?? null) as LessonContent | null;
        setContent(c);
        setPhase(c?.sections?.length ? "intro" : "sections"); // no content → mastery-only fallback
      } catch (err) {
        if (cancelled) return;
        console.error("Load lesson failed:", err);
        setError(err instanceof Error ? err.message : "Could not load this lesson.");
        setPhase("error");
      }
    })();
    return () => { cancelled = true; };
  }, [lessonId]);

  // --- Fallback: no synthesized content → build a mastery-only section ------
  const [fallbackMastery, setFallbackMastery] = useState<MasteryCheckSection | null>(null);
  useEffect(() => {
    if (phase !== "sections" || content?.sections?.length) return;
    (async () => {
      const { data } = await db
        .from("generated_questions")
        .select("id, question_text, options, correct_answer, explanation, difficulty")
        .eq("lesson_id", lessonId)
        .order("created_at", { ascending: true });
      const LETTERS = ["A", "B", "C", "D", "E", "F"];
      const idxOf = (opts: string[], ca: string) => {
        const t = opts.indexOf((ca ?? "").trim());
        if (t >= 0) return t;
        const m = (ca ?? "").trim().match(/^([A-Fa-f])[).:\s]?$/);
        return m ? LETTERS.indexOf(m[1].toUpperCase()) : 0;
      };
      const qs = (data ?? []).map((g: any) => ({
        id: g.id,
        question: g.question_text,
        options: g.options,
        correctAnswer: idxOf(g.options, g.correct_answer),
        explanation: g.explanation ?? "",
        difficulty: g.difficulty ?? 0.5,
      }));
      // Match synthesize-lesson: 4 correct to pass, full pool rotates on retry.
      const required = qs.length > 0 ? Math.min(qs.length, 4) : 0;
      setFallbackMastery({ type: "mastery-check", questions: qs, requiredCorrect: required });
    })();
  }, [phase, content, lessonId]);

  // Synthetic Lesson object so JeffChat + buildScript work exactly as for
  // hand-built lessons. Category is a generic (non-gulliver/ib) value so Jeff
  // uses the default teaching behavior.
  const syntheticLesson: Lesson = useMemo(
    () => ({
      id: lessonId,
      title: lessonName || "Lesson",
      description: "",
      category: "entrepreneurship",
      level: "explorer",
      unitId: "generated",
      lessonNumber: "",
      reward: 0,
      content: "",
      duration: 5,
      completed: false,
    }),
    [lessonId, lessonName],
  );

  const jeffScript = useMemo(
    () => (sections.length ? buildScript(sections, isDeepLesson(syntheticLesson)) : []),
    [sections, syntheticLesson],
  );
  const mustCover = useMemo(() => {
    const jc = content?.jeffContext;
    const c = (jc?.concepts ?? []).map((x) => `${x.name}: ${x.definition}`);
    return c.length ? c.slice(0, 8) : undefined;
  }, [content]);
  const jeffSource = content?.jeffContext?.excerpt || undefined;

  // --- Finalization --------------------------------------------------------
  const finalize = useCallback(
    async (correct: number, totalQuestions: number, passed: boolean) => {
      if (finalizedRef.current) return;
      finalizedRef.current = true;
      if (!DEV_LOCAL_BYPASS && user?.id) {
        await db.from("student_lesson_progress").upsert(
          {
            student_id: user.id,
            lesson_id: lessonId,
            status: "completed",
            num_correct: correct,
            num_answered: totalQuestions,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "student_id,lesson_id" },
        );
      }
      setResult({ score: correct, total: totalQuestions, passed });
      setPhase("done");
    },
    [user?.id, lessonId],
  );

  const handleSectionContinue = useCallback(() => setSectionIdx((i) => i + 1), []);

  const renderMastery = (section: MasteryCheckSection) => (
    <MasteryCheckRenderer
      key={`mastery-${regen}`}
      section={section}
      topicId={concept}
      lessonId={lessonId}
      attemptSessionId={masteryAttempt.sessionId}
      sessionAttemptNumber={masteryAttempt.attemptNumber}
      onComplete={(correct, _attempts) => {
        const total = Math.min(section.requiredCorrect, section.questions.length);
        finalize(correct, total, correct >= section.requiredCorrect);
      }}
      onFail={() => {
        // Fresh attempt: bump attempt number + remount the renderer.
        setMasteryAttempt((a) => ({ sessionId: crypto.randomUUID(), attemptNumber: a.attemptNumber + 1 }));
        setRegen((r) => r + 1);
      }}
    />
  );

  const renderSection = (section: LessonSection, idx: number) => {
    switch (section.type) {
      case "concept": return <ConceptRenderer key={idx} section={section} onContinue={handleSectionContinue} />;
      case "micro-check": return <MicroCheckRenderer key={idx} section={section} onContinue={handleSectionContinue} />;
      case "activity-check": return <ActivityCheckRenderer key={idx} section={section} onContinue={handleSectionContinue} />;
      case "interactive-diagram": return <DiagramRenderer key={idx} section={section} onContinue={handleSectionContinue} />;
      case "scenario": return <ScenarioRenderer key={idx} section={section} onContinue={handleSectionContinue} />;
      case "applied-question": return <AppliedQuestionRenderer key={idx} section={section} onContinue={handleSectionContinue} />;
      case "recap": return <RecapRenderer key={idx} section={section} onContinue={handleSectionContinue} />;
      case "mastery-check": return renderMastery(section);
      default: return null;
    }
  };

  // --- Render --------------------------------------------------------------
  if (phase === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-600" /> Loading lesson…
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="min-h-screen bg-background p-6">
        <Card className="mx-auto max-w-md border-red-200 bg-red-50/60">
          <CardContent className="flex items-start gap-2 pt-6">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === "done" && result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 px-4 py-10">
        <LessonResultsScreen
          score={result.score}
          total={result.total}
          passed={result.passed}
          onBackToDashboard={() => navigate("/dashboard")}
        />
      </div>
    );
  }

  // Jeff teaches first (only when we have synthesized content to script from).
  if (phase === "intro") {
    return (
      <JeffChat
        lesson={syntheticLesson}
        script={jeffScript}
        source={jeffSource}
        mustCover={mustCover}
        onQuizReady={() => setPhase("sections")}
        onClose={() => navigate("/dashboard")}
      />
    );
  }

  // Sections + mastery, wrapped in the same providers regular lessons use so
  // scoring flows through the real IRT engine (QuizSessionProvider → useAbility)
  // and question_attempts (MasteryCheckRenderer).
  const activeSections: LessonSection[] = sections.length
    ? sections
    : fallbackMastery
      ? [fallbackMastery]
      : [];
  const currentSection = activeSections[sectionIdx];

  return (
    <HintProvider key={lessonId} total={2}>
      <QuizSessionProvider key={`quiz-${lessonId}-${regen}`} lessonId={lessonId} concept={concept}>
        <div className="min-h-screen bg-background px-4 py-6">
          <div className="mx-auto w-full max-w-2xl space-y-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </button>
            {!currentSection && !fallbackMastery && (
              <Card>
                <CardContent className="py-12 text-center text-sm text-muted-foreground">
                  <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin text-emerald-600" />
                  Preparing your lesson…
                </CardContent>
              </Card>
            )}
            {currentSection && renderSection(currentSection, sectionIdx)}
          </div>
        </div>
      </QuizSessionProvider>
    </HintProvider>
  );
};

export default StudentLessonView;
