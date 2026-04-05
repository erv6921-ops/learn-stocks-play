import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GameNav from "@/components/GameNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/BackButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Briefcase, Users, Lightbulb, Megaphone, Heart, DollarSign,
  Box, Cog, Handshake, Receipt, ArrowRight, ArrowLeft,
  CheckCircle, FileText, Send, RotateCcw, HelpCircle
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";

/* ── Vocab tooltips for difficult terms (used in titles + inline in prompts) ── */
const VOCAB_TIPS: Record<string, string> = {
  "value proposition": "The unique benefit or solution your business promises to deliver to customers — why they should choose you.",
  "customer segments": "The specific groups of people or organizations your business aims to serve.",
  "revenue stream": "A way your business earns money from customers (e.g., sales, subscriptions, ads).",
  "revenue streams": "The different ways your business earns money from customers.",
  "key resources": "The most important assets (physical, intellectual, human, financial) your business needs to operate.",
  "key activities": "The most critical things your business must do to make its model work.",
  "key partnerships": "The network of suppliers and partners that help your business succeed.",
  "cost structure": "All the costs and expenses your business incurs to operate.",
  "intellectual property": "Creations of the mind (inventions, brand names, designs) that are legally protected.",
  "fixed costs": "Expenses that stay the same no matter how much you sell (e.g., rent, salaries).",
  "variable costs": "Expenses that go up or down depending on how much you produce or sell.",
  "cost-driven": "A business model focused on minimizing costs wherever possible to offer lower prices.",
  "value-driven": "A business model focused on creating premium value, even if costs are higher.",
  "strategic alliances": "Partnerships between companies that combine strengths for mutual benefit.",
  "competitive edge": "Something that makes your business better than competitors in a way that's hard to copy.",
  "loyalty programs": "Reward systems that encourage customers to keep buying from the same business.",
  "freemium": "A pricing model where the basic version is free, but premium features cost money.",
  "outsource": "Hiring an outside company or person to handle tasks instead of doing them in-house.",
  "starting capital": "The money needed to launch a business before it starts earning revenue.",
  "channels": "The ways a business reaches, communicates with, and delivers products to its customers.",
};

/* ── Canvas block definitions ── */
interface CanvasBlock {
  id: string;
  title: string;
  number: number;
  icon: React.ReactNode;
  description: string;
  guidePrompts: string[];
  reflectionPrompt: string;
}

const CANVAS_BLOCKS: CanvasBlock[] = [
  {
    id: "customer-segments",
    title: "Customer Segments",
    number: 1,
    icon: <Users className="w-5 h-5" />,
    description: "Who are your customers? Every business exists to serve a specific group of people. Defining your customer segments means identifying who you're creating value for — their demographics, needs, behaviors, and pain points.",
    guidePrompts: [
      "Who is your ideal customer? Describe them in detail (age, location, lifestyle).",
      "What problem or need do they have that your business addresses?",
      "Are there different groups of customers you serve? How do they differ?",
      "Where do your customers currently go to solve this problem?"
    ],
    reflectionPrompt: "Think about a business you love. Who do you think their primary customer segment is? How can you tell?"
  },
  {
    id: "value-proposition",
    title: "Value Proposition",
    number: 2,
    icon: <Lightbulb className="w-5 h-5" />,
    description: "What problem do you solve? Your value proposition is the unique benefit your business offers. It's the reason customers choose you over alternatives — the specific value you create that makes their lives better.",
    guidePrompts: [
      "What specific problem does your product or service solve?",
      "What makes your solution different from what already exists?",
      "What benefits do customers get from choosing you?",
      "Can you describe your value proposition in one sentence?"
    ],
    reflectionPrompt: "Why would a customer pick your business over a competitor? What's your 'unfair advantage'?"
  },
  {
    id: "channels",
    title: "Channels",
    number: 3,
    icon: <Megaphone className="w-5 h-5" />,
    description: "How do you reach customers? Channels are the touchpoints through which you communicate with and deliver value to your customer segments — from marketing and sales to distribution and support.",
    guidePrompts: [
      "How will customers first hear about your business?",
      "Where will customers buy your product or service (online, in-store, app)?",
      "How will you deliver your product or service to them?",
      "What social media or marketing channels will you use?"
    ],
    reflectionPrompt: "Think about the last product you bought. How did you first discover it? What channel brought you to the purchase?"
  },
  {
    id: "customer-relationships",
    title: "Customer Relationships",
    number: 4,
    icon: <Heart className="w-5 h-5" />,
    description: "How do you interact with customers? This block defines the type of relationship you establish with each customer segment — from personal assistance to self-service, communities, or automated systems.",
    guidePrompts: [
      "Will you interact with customers personally or through automated systems?",
      "How will you keep customers coming back (loyalty programs, subscriptions, community)?",
      "How will you handle customer complaints or feedback?",
      "What kind of experience do you want customers to have with your brand?"
    ],
    reflectionPrompt: "Compare how a local coffee shop and Amazon handle customer relationships. What are the trade-offs of each approach?"
  },
  {
    id: "revenue-streams",
    title: "Revenue Streams",
    number: 5,
    icon: <DollarSign className="w-5 h-5" />,
    description: "How do you make money? Revenue streams represent the cash your business generates from each customer segment. Consider pricing strategies, payment models, and what customers are truly willing to pay for.",
    guidePrompts: [
      "What will customers pay for? Is it a product, service, or subscription?",
      "How much will you charge? How did you decide on that price?",
      "Will you have one revenue stream or multiple (e.g., ads + subscriptions)?",
      "How will customers pay (one-time, recurring, freemium)?"
    ],
    reflectionPrompt: "How does Spotify make money differently than a traditional music store? Which model do you think is more sustainable?"
  },
  {
    id: "key-resources",
    title: "Key Resources",
    number: 6,
    icon: <Box className="w-5 h-5" />,
    description: "What assets do you need? Key resources are the most important assets required to make your business model work — physical (equipment, inventory), intellectual (patents, brand), human (team), or financial (cash, credit).",
    guidePrompts: [
      "What physical items or equipment do you need to operate?",
      "Do you need specialized knowledge, technology, or intellectual property?",
      "What people or skills are essential to run your business?",
      "How much starting capital do you need?"
    ],
    reflectionPrompt: "What's the most important resource for your business — and what would happen if you lost it?"
  },
  {
    id: "key-activities",
    title: "Key Activities",
    number: 7,
    icon: <Cog className="w-5 h-5" />,
    description: "What do you do every day to run the business? Key activities are the most critical actions your company must take to operate successfully — production, problem-solving, platform management, or service delivery.",
    guidePrompts: [
      "What are the daily tasks needed to deliver your product or service?",
      "What activities are critical to maintaining quality?",
      "How will you market and sell on an ongoing basis?",
      "What processes need to happen behind the scenes?"
    ],
    reflectionPrompt: "If you could only do three things each day for your business, what would they be and why?"
  },
  {
    id: "key-partnerships",
    title: "Key Partnerships",
    number: 8,
    icon: <Handshake className="w-5 h-5" />,
    description: "Who do you work with? Key partnerships are the network of suppliers, allies, and collaborators that help your business model work. Partnerships can reduce risk, acquire resources, or optimize operations.",
    guidePrompts: [
      "Who are your key suppliers or vendors?",
      "Are there businesses you could partner with for mutual benefit?",
      "What activities could you outsource to a partner?",
      "Are there any strategic alliances that would give you a competitive edge?"
    ],
    reflectionPrompt: "Think about a food truck. Who are its key partners? How would the business suffer without them?"
  },
  {
    id: "cost-structure",
    title: "Cost Structure",
    number: 9,
    icon: <Receipt className="w-5 h-5" />,
    description: "What are your main expenses? The cost structure describes all costs incurred to operate your business model. Understanding whether you're cost-driven or value-driven shapes every financial decision.",
    guidePrompts: [
      "What are your biggest fixed costs (rent, salaries, software)?",
      "What variable costs change based on how much you sell?",
      "Which key resources and activities are most expensive?",
      "Is your business more cost-driven (lean) or value-driven (premium)?"
    ],
    reflectionPrompt: "If you had to cut costs by 30%, where would you cut first without hurting your value proposition?"
  }
];

const STORAGE_KEY = "investiplay_business_canvas";

interface CanvasData {
  businessName: string;
  blocks: Record<string, { answers: string[]; reflection: string }>;
  submitted: boolean;
  submittedAt?: string;
}

function getEmptyCanvas(): CanvasData {
  const blocks: CanvasData["blocks"] = {};
  CANVAS_BLOCKS.forEach((b) => {
    blocks[b.id] = { answers: b.guidePrompts.map(() => ""), reflection: "" };
  });
  return { businessName: "", blocks, submitted: false };
}

function loadCanvas(): CanvasData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getEmptyCanvas();
}

function saveCanvas(data: CanvasData) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function VocabTitle({ title, className = "" }: { title: string; className?: string }) {
  const tip = VOCAB_TIPS[title];
  if (!tip) return <span className={className}>{title}</span>;
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {title}
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-primary cursor-help shrink-0" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px] text-xs">
          {tip}
        </TooltipContent>
      </Tooltip>
    </span>
  );
}

  export default function BusinessCanvas() {
  const { earnJeffs } = useApp();
  const [canvas, setCanvas] = useState<CanvasData>(loadCanvas);
  const [step, setStep] = useState(0); // 0 = intro, 1-9 = blocks, 10 = review

  useEffect(() => { saveCanvas(canvas); }, [canvas]);

  const totalSteps = CANVAS_BLOCKS.length + 2; // intro + 9 blocks + review
  const progress = Math.round((step / (totalSteps - 1)) * 100);

  const blockCompletion = useMemo(() => {
    return CANVAS_BLOCKS.map((b) => {
      const data = canvas.blocks[b.id];
      if (!data) return false;
      const hasAnswer = data.answers.some((a) => a.trim().length > 0);
      return hasAnswer;
    });
  }, [canvas]);

  const completedBlocks = blockCompletion.filter(Boolean).length;

  const updateAnswer = (blockId: string, promptIdx: number, value: string) => {
    setCanvas((prev) => {
      const next = { ...prev, blocks: { ...prev.blocks } };
      next.blocks[blockId] = {
        ...next.blocks[blockId],
        answers: next.blocks[blockId].answers.map((a, i) => (i === promptIdx ? value : a)),
      };
      return next;
    });
  };

  const updateReflection = (blockId: string, value: string) => {
    setCanvas((prev) => {
      const next = { ...prev, blocks: { ...prev.blocks } };
      next.blocks[blockId] = { ...next.blocks[blockId], reflection: value };
      return next;
    });
  };

  const handleSubmit = () => {
    if (canvas.submitted) return;
    setCanvas((prev) => ({ ...prev, submitted: true, submittedAt: new Date().toISOString() }));
    earnJeffs(2500, "Business Canvas Project completed");
  };

  const handleReset = () => {
    if (!window.confirm("Are you sure you want to reset your entire canvas? This cannot be undone.")) return;
    const fresh = getEmptyCanvas();
    setCanvas(fresh);
    setStep(0);
  };

  // ── Render: Intro ──
  if (step === 0) {
    return (
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <GameNav />
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          <BackButton fallback="/lessons" label="Back to Missions" />

          <div className="mt-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Briefcase className="w-8 h-8" />
            </div>
            <Badge variant="outline" className="text-xs font-bold border-primary/30 text-primary">
              AP Required Project
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
              Business Canvas Project
            </h1>
            <p className="text-muted-foreground text-[15px] max-w-xl mx-auto leading-relaxed">
              Build a complete Business Model Canvas for your own business idea. You'll work through 9 essential blocks that define how a business creates, delivers, and captures value.
            </p>
          </div>

          {/* Business Name */}
          <Card className="mt-8 p-6 rounded-2xl border shadow-card">
            <label className="text-sm font-bold text-foreground block mb-2">
              What's your business called?
            </label>
            <Input
              placeholder="Enter your business name…"
              value={canvas.businessName}
              onChange={(e) => setCanvas((p) => ({ ...p, businessName: e.target.value }))}
              className="text-base"
            />
          </Card>

          {/* Block overview */}
          <div className="mt-8 space-y-3">
            {CANVAS_BLOCKS.map((block, idx) => (
              <button
                key={block.id}
                onClick={() => setStep(idx + 1)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border bg-card hover:bg-muted/20 transition-colors text-left press-scale shadow-card"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  blockCompletion[idx]
                    ? "bg-success/10 text-success"
                    : "bg-muted/60 text-muted-foreground"
                }`}>
                  {blockCompletion[idx] ? <CheckCircle className="w-5 h-5" /> : block.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[14px] text-foreground">
                    {block.number}. <VocabTitle title={block.title} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {block.guidePrompts[0]}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0" />
              </button>
            ))}

            {/* Review step */}
            <button
              onClick={() => setStep(10)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border bg-card hover:bg-muted/20 transition-colors text-left press-scale shadow-card"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                canvas.submitted
                  ? "bg-success/10 text-success"
                  : "bg-gold/10 text-gold"
              }`}>
                {canvas.submitted ? <CheckCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[14px] text-foreground">Review & Submit</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {canvas.submitted ? "Submitted ✓" : "View your full canvas and submit"}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              {completedBlocks}/9 blocks started · Progress saves automatically
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ── Render: Block detail (steps 1–9) ──
  if (step >= 1 && step <= 9) {
    const block = CANVAS_BLOCKS[step - 1];
    const data = canvas.blocks[block.id];

    return (
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <GameNav />
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <button onClick={() => setStep(0)} className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> All Blocks
              </button>
              <span className="text-xs text-muted-foreground font-semibold">Block {block.number} of 9</span>
            </div>
            <Progress value={progress} variant="success" className="h-2" />
          </div>

          {/* Block header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              {block.icon}
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight">
                {block.number}. <VocabTitle title={block.title} />
              </h1>
            </div>
          </div>

          {/* Concept explanation */}
          <Card className="p-5 rounded-2xl border shadow-card mb-6">
            <p className="text-[14px] text-foreground/80 leading-relaxed">{block.description}</p>
          </Card>

          {/* Guided prompts */}
          <div className="space-y-5">
            {block.guidePrompts.map((prompt, pIdx) => (
              <div key={pIdx}>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  {prompt}
                </label>
                <Textarea
                  placeholder="Type your answer…"
                  value={data.answers[pIdx]}
                  onChange={(e) => updateAnswer(block.id, pIdx, e.target.value)}
                  className="min-h-[80px] text-sm"
                />
              </div>
            ))}
          </div>

          {/* Reflection */}
          <Card className="mt-6 p-5 rounded-2xl border-primary/20 bg-primary/3 shadow-card">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">💡 Reflection</p>
            <p className="text-sm text-foreground/80 mb-3">{block.reflectionPrompt}</p>
            <Textarea
              placeholder="Share your thoughts…"
              value={data.reflection}
              onChange={(e) => updateReflection(block.id, e.target.value)}
              className="min-h-[70px] text-sm"
            />
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {step === 1 ? "Overview" : "Previous"}
            </Button>
            <Button
              onClick={() => setStep(step + 1)}
              className="gap-1.5 press-scale"
            >
              {step === 9 ? "Review Canvas" : "Next Block"} <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // ── Render: Review & Submit (step 10) ──
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setStep(0)} className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All Blocks
            </button>
            <span className="text-xs text-muted-foreground font-semibold">Review & Submit</span>
          </div>
          <Progress value={100} variant="success" className="h-2" />
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-extrabold tracking-tight mb-2">
            {canvas.businessName || "Your Business"} — Business Model Canvas
          </h1>
          <p className="text-muted-foreground text-sm">
            {completedBlocks}/9 blocks completed · Review your full canvas below
          </p>
          {canvas.submitted && (
            <Badge variant="success" className="mt-2">
              ✓ Submitted {canvas.submittedAt ? new Date(canvas.submittedAt).toLocaleDateString() : ""}
            </Badge>
          )}
        </div>

        {/* Canvas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CANVAS_BLOCKS.map((block, idx) => {
            const data = canvas.blocks[block.id];
            const hasContent = blockCompletion[idx];
            return (
              <Card
                key={block.id}
                className={`p-4 rounded-2xl border shadow-card cursor-pointer hover:bg-muted/20 transition-colors ${
                  hasContent ? "border-success/30" : "border-border"
                }`}
                onClick={() => setStep(idx + 1)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    hasContent ? "bg-success/10 text-success" : "bg-muted/60 text-muted-foreground"
                  }`}>
                    {hasContent ? <CheckCircle className="w-4 h-4" /> : block.icon}
                  </div>
                  <h3 className="font-bold text-sm">{block.number}. <VocabTitle title={block.title} /></h3>
                </div>
                <div className="space-y-1.5">
                  {data.answers.map((ans, aIdx) => (
                    ans.trim() ? (
                      <p key={aIdx} className="text-xs text-foreground/70 line-clamp-2">
                        • {ans.trim()}
                      </p>
                    ) : null
                  ))}
                  {!hasContent && (
                    <p className="text-xs text-muted-foreground italic">Not started yet</p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Submit / Reset */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {!canvas.submitted ? (
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={completedBlocks < 5}
              className="gap-2 press-scale"
            >
              <Send className="w-4 h-4" />
              Submit Canvas (+2,500 coins)
            </Button>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-sm text-success font-semibold">🎉 Canvas submitted! +2,500 InvestiCoins earned</p>
            </div>
          )}
          <Button variant="outline" onClick={handleReset} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>

        {completedBlocks < 5 && !canvas.submitted && (
          <p className="text-center text-xs text-muted-foreground mt-3">
            Complete at least 5 of 9 blocks to submit
          </p>
        )}
      </main>
    </div>
  );
}
