import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { lessons, categoryInfo, getLessonsByUnit, getUnitRewardTotal, unitInfo } from "@/data/lessons";
import { getUnitTestByCategory } from "@/data/unitTestQuestions";
import { getAdaptiveCurriculum, AdaptiveLessonInfo } from "@/lib/curriculumEngine";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import GameNav from "@/components/GameNav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import jeffCharacter from "@/assets/jeff-character.png";
import investiplayLogo from "@/assets/investiplay-logo-full.png";
import {
  BookOpen, CheckCircle, ChevronRight,
  Coins, Trophy, ArrowRight, ShieldCheck, Lock } from
"lucide-react";
import { LessonCategory, LEVEL_TITLES } from "@/types";
import APModeToggle from "@/components/APModeToggle";
import APModeSections from "@/components/APModeSections";

const DEPTH_COLORS: Record<string, string> = {
  "Foundational": "bg-success/10 text-success border-success/20",
  "Applied": "bg-primary/10 text-primary border-primary/20",
  "Strategic": "bg-accent/10 text-accent border-accent/20",
  "Advanced": "bg-gold/10 text-gold border-gold/20"
};

const UNIT_ACCENT: Record<number, string> = {
  1: "border-l-success/60", 2: "border-l-success/60",
  3: "border-l-primary/60", 4: "border-l-primary/60",
  5: "border-l-accent/60", 6: "border-l-accent/60",
  7: "border-l-gold/60", 8: "border-l-gold/60",
  9: "border-l-gold/60", 10: "border-l-gold/60"
};

export default function Lessons() {
  const { user, lessonProgress, unitTestProgress, getRewardMultiplier } = useApp();
  const navigate = useNavigate();
  const multiplier = getRewardMultiplier();

  const isLessonCompleted = (lessonId: string) => lessonProgress.find((p) => p.lessonId === lessonId && p.completed);
  const unitTestPassed = (category: LessonCategory) => unitTestProgress.find((p) => p.category === category && p.completed);

  // Adaptive curriculum
  const adaptiveCurriculum = useMemo(() => {
    return getAdaptiveCurriculum(
      user?.benchmarkCategoryScores || null,
      user?.benchmarkScores || null,
      user?.assessmentScore ?? null,
      50
    );
  }, [user?.benchmarkCategoryScores, user?.benchmarkScores, user?.assessmentScore]);

  const levels = [...new Set(unitInfo.map((u) => u.level))].sort((a, b) => a - b);

  /**
   * PREREQUISITE GATING LOGIC:
   * - A unit is "unlocked" if all required lessons in all previous units of the same or lower level are complete.
   * - Within a unit, lessons unlock sequentially (lesson N requires lesson N-1 to be complete).
   * - Benchmark-validated lessons count as "complete" for gating purposes.
   * - If benchmark skipped, standard sequential progression applies.
   */
  const unlockedUnits = useMemo(() => {
    const unlocked = new Set<string>();
    
    for (const unit of unitInfo) {
      // First unit is always unlocked
      if (unit.orderIndex === 1) {
        unlocked.add(unit.id);
        continue;
      }

      // Check all previous units (by orderIndex)
      const previousUnits = unitInfo.filter(u => u.orderIndex < unit.orderIndex);
      const allPreviousComplete = previousUnits.every(prevUnit => {
        const adaptive = adaptiveCurriculum.get(prevUnit.id);
        if (!adaptive) return false;
        const requiredLessons = adaptive.lessons.filter(l => l.status === "required");
        // A unit is "done" if at least 60% of required lessons are completed
        // This prevents hard gating while still encouraging completion
        const completedCount = requiredLessons.filter(l => isLessonCompleted(l.lesson.id)).length;
        if (requiredLessons.length === 0) return true;
        return completedCount / requiredLessons.length >= 0.6;
      });

      if (allPreviousComplete) {
        unlocked.add(unit.id);
      }
    }

    return unlocked;
  }, [adaptiveCurriculum, lessonProgress]);

  /**
   * Within a unit, check if a specific lesson is unlocked.
   * First required lesson is always unlocked. Each subsequent one requires the previous to be done.
   * Validated lessons are always accessible.
   */
  const isLessonUnlocked = (unitId: string, lessonId: string): boolean => {
    if (!unlockedUnits.has(unitId)) return false;
    
    const adaptive = adaptiveCurriculum.get(unitId);
    if (!adaptive) return false;

    const requiredLessons = adaptive.lessons.filter(l => l.status === "required");
    const lessonIndex = requiredLessons.findIndex(l => l.lesson.id === lessonId);
    
    // If it's a validated lesson, always accessible
    if (lessonIndex === -1) {
      const isValidated = adaptive.lessons.find(l => l.lesson.id === lessonId && l.status === "validated");
      return !!isValidated;
    }

    // First required lesson is always unlocked
    if (lessonIndex === 0) return true;

    // Check if previous required lesson is completed
    const prevLesson = requiredLessons[lessonIndex - 1];
    return !!isLessonCompleted(prevLesson.lesson.id);
  };

  // Find next recommended lesson (skip validated ones, respect unlock order)
  const nextLesson = useMemo(() => {
    for (const unit of unitInfo) {
      if (!unlockedUnits.has(unit.id)) continue;
      const adaptive = adaptiveCurriculum.get(unit.id);
      if (!adaptive) continue;
      for (const al of adaptive.lessons) {
        if (al.status === "required" && !isLessonCompleted(al.lesson.id) && isLessonUnlocked(unit.id, al.lesson.id)) {
          return al.lesson;
        }
      }
    }
    return null;
  }, [adaptiveCurriculum, lessonProgress, unlockedUnits]);

  if (!user) {
    navigate("/onboarding");
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="flex-1">
            <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">Financial Missions</h1>
            <p className="text-muted-foreground text-[15px]">
              Your curriculum adapts to your knowledge level. Complete earlier missions to unlock advanced content.
            </p>
          </div>
          <div className="hidden md:block">
            <img src={investiplayLogo} alt="InvestiPlay" className="h-10 object-contain" />
          </div>
        </div>

        {/* Recommended Next Mission */}
        {nextLesson &&
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-primary/8 to-accent/5 border border-primary/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img alt="InvestiPlay" className="w-8 h-8 object-contain shrink-0" src={investiplayLogo} />
              <div>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-0.5">Recommended Next</p>
                <p className="text-sm font-bold text-foreground">{nextLesson.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                  <span className="text-gold font-bold flex items-center gap-0.5"><Coins className="w-3 h-3" />+{Math.round(nextLesson.reward * multiplier)}</span>
                </p>
              </div>
            </div>
            <Link to={`/lessons/${nextLesson.id}`}>
              <Button size="sm" className="press-scale gap-1.5">
                Start <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        }

        {/* Levels with Units */}
        <div className="space-y-12">
          {levels.map((level) => {
            const levelUnits = unitInfo.filter((u) => u.level === level);
            const levelTitle = LEVEL_TITLES[level] || `Level ${level}`;

            return (
              <section key={level}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-extrabold text-base border border-primary/15">
                    {level}
                  </div>
                  <div>
                    <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight">{levelTitle}</h2>
                    <p className="text-xs text-muted-foreground">{levelUnits.length} unit{levelUnits.length > 1 ? 's' : ''}</p>
                  </div>
                </div>

                <Accordion type="multiple" className="space-y-4">
                  {levelUnits.map((unit) => {
                    const adaptive = adaptiveCurriculum.get(unit.id)!;
                    const unitLessons = adaptive.lessons;
                    const requiredLessons = unitLessons.filter((l) => l.status === "required");
                    const validatedLessons = unitLessons.filter((l) => l.status === "validated");
                    const completedCount = unitLessons.filter((l) =>
                    l.status === "validated" || isLessonCompleted(l.lesson.id)
                    ).length;
                    const totalForProgress = unitLessons.length;
                    const progress = totalForProgress > 0 ? Math.round(completedCount / totalForProgress * 100) : 0;

                    const totalReward = getUnitRewardTotal(unit.id);
                    const cat = unit.categories[0];
                    const unitTest = getUnitTestByCategory(cat);
                    const passed = unitTestPassed(cat);
                    const depthCls = DEPTH_COLORS[adaptive.entryDepth] || DEPTH_COLORS["Foundational"];
                    const tintClass = UNIT_ACCENT[unit.level] || "";

                    const allRequired = requiredLessons.every((l) => isLessonCompleted(l.lesson.id));
                    const allCompleted = allRequired && validatedLessons.length + requiredLessons.length === unitLessons.length;
                    const unitIsLocked = !unlockedUnits.has(unit.id);

                    return (
                      <AccordionItem
                        key={unit.id}
                        value={unit.id}
                        className={`border rounded-2xl overflow-hidden bg-card shadow-card border-l-4 ${tintClass} ${unitIsLocked ? 'opacity-60' : ''}`}>

                        <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-muted/20 transition-colors">
                          <div className="flex items-center gap-4 flex-1 min-w-0 text-left">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Unit {unit.unitNumber}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${depthCls}`}>
                                  Depth: {adaptive.entryDepth}
                                </span>
                                {unitIsLocked && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg border bg-muted text-muted-foreground border-border flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Locked
                                  </span>
                                )}
                                {validatedLessons.length > 0 &&
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg border bg-success/10 text-success border-success/20 flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" />
                                    {validatedLessons.length} validated
                                  </span>
                                }
                                {passed && <Badge variant="success" className="text-[10px]">✓ Passed</Badge>}
                              </div>
                              <h3 className="font-display font-bold text-lg leading-snug tracking-tight">{unit.title}</h3>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-xs text-muted-foreground">{requiredLessons.length} lessons</span>
                                {validatedLessons.length > 0 &&
                                <span className="text-xs text-success">{validatedLessons.length} validated</span>
                                }
                                <span className="text-xs text-gold font-bold flex items-center gap-1">
                                  <Coins className="w-3.5 h-3.5" />
                                  {totalReward.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="w-20 shrink-0">
                              <Progress value={progress} variant="success" className="h-2.5" />
                              <p className="text-[10px] text-muted-foreground text-right mt-1 font-semibold">{progress}%</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-0">
                          <div className="border-t divide-y divide-border/40">
                            {/* Unit locked message */}
                            {unitIsLocked && (
                              <div className="bg-muted/30 px-8 py-4 flex items-center gap-3">
                                <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <span className="text-[13px] font-semibold text-muted-foreground">
                                    Complete earlier units to unlock
                                  </span>
                                  <p className="text-xs text-muted-foreground/70 mt-0.5">
                                    Finish at least 60% of previous unit lessons to continue
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Validated lessons grouped */}
                            {validatedLessons.length > 0 &&
                            <div className="bg-success/3 px-8 py-3 flex items-center gap-3">
                                <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <span className="text-[13px] font-semibold text-success">
                                    {validatedLessons.length} foundational lesson{validatedLessons.length > 1 ? 's' : ''} validated by Benchmark
                                  </span>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    Your assessment demonstrated mastery of these concepts
                                  </p>
                                </div>
                              </div>
                            }

                            {/* Required lessons */}
                            {requiredLessons.map((al) => {
                              const lesson = al.lesson;
                              const completed = isLessonCompleted(lesson.id);
                              const unlocked = isLessonUnlocked(unit.id, lesson.id);

                              if (!unlocked && !completed) {
                                return (
                                  <div
                                    key={lesson.id}
                                    className="flex items-center gap-3 pl-8 pr-6 py-3.5 opacity-40 cursor-not-allowed"
                                  >
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-muted/60 text-muted-foreground">
                                      <Lock className="w-3 h-3" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="font-semibold text-[14px] text-foreground/50 truncate">{lesson.title}</span>
                                      <p className="text-xs text-muted-foreground/60 mt-0.5">Complete previous lesson to unlock</p>
                                    </div>
                                    <span className="text-muted-foreground/40 font-bold text-sm flex items-center gap-1 shrink-0">
                                      <Coins className="w-3.5 h-3.5" />
                                      +{Math.round(lesson.reward * multiplier).toLocaleString()}
                                    </span>
                                  </div>
                                );
                              }

                              return (
                                <Link
                                  key={lesson.id}
                                  to={`/lessons/${lesson.id}`}
                                  className={`flex items-center gap-3 pl-8 pr-6 py-3.5 transition-all group press-scale ${
                                  completed ? "bg-success/3 hover:bg-success/5" : "hover:bg-muted/20"}`
                                  }>

                                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                                  completed ?
                                  "bg-success/10 text-success" :
                                  "bg-muted/60 text-muted-foreground"}`
                                  }>
                                    {completed ? <CheckCircle className="w-3.5 h-3.5" /> : lesson.lessonNumber}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="font-semibold text-[14px] text-foreground/80 group-hover:text-foreground truncate transition-colors">{lesson.title}</span>
                                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{lesson.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-gold font-bold text-sm flex items-center gap-1">
                                      <Coins className="w-3.5 h-3.5" />
                                      +{Math.round(lesson.reward * multiplier).toLocaleString()}
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
                                  </div>
                                </Link>);

                            })}

                            {/* Unit Test row */}
                            {unitTest &&
                            <Link
                              to={allCompleted ? `/unit-test/${cat}` : "#"}
                              className={`flex items-center gap-3 pl-8 pr-6 py-3.5 transition-all press-scale ${
                              allCompleted ?
                              "hover:bg-gold/5 bg-gold/3" :
                              "opacity-40 cursor-not-allowed"}`
                              }>

                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              passed ? "bg-success/10 text-success" :
                              allCompleted ? "bg-gold/10 text-gold" :
                              "bg-muted/60 text-muted-foreground"}`
                              }>
                                  {passed ? <CheckCircle className="w-3.5 h-3.5" /> : <Trophy className="w-3.5 h-3.5" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="font-bold text-[14px]">Unit Test</span>
                                  <p className="text-xs text-muted-foreground">
                                    {allCompleted ?
                                  `${unitTest.questions.length} questions — prove your mastery` :
                                  `Complete all required lessons to unlock`}
                                  </p>
                                </div>
                                <span className="text-gold font-bold text-sm flex items-center gap-1 shrink-0">
                                  <Coins className="w-3.5 h-3.5" />
                                  +{unitTest.reward.toLocaleString()}
                                </span>
                              </Link>
                            }
                          </div>
                        </AccordionContent>
                      </AccordionItem>);

                  })}
                </Accordion>
              </section>);

          })}
        </div>
      </main>
    </div>);

}
