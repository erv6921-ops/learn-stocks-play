import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GameNav from "@/components/GameNav";
import taxDocIcon from "@/assets/icons/tax-document.png";
import employmentIcon from "@/assets/icons/employment-briefcase.png";
import bankingIcon from "@/assets/icons/banking-building.png";
import creditCardIcon from "@/assets/icons/credit-card.png";
import insuranceShieldIcon from "@/assets/icons/insurance-shield.png";
import investingChartIcon from "@/assets/icons/investing-chart.png";
import retirementBeachIcon from "@/assets/icons/retirement-beach.png";
import estateScrollIcon from "@/assets/icons/estate-scroll.png";
import governmentBuildingIcon from "@/assets/icons/government-building.png";
import smallBusinessIcon from "@/assets/icons/small-business.png";
import advancedWealthIcon from "@/assets/icons/advanced-wealth.png";
import realEstateIcon from "@/assets/icons/real-estate-house.png";
import { labCategories } from "@/data/labDocuments";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Coins, Clock, FlaskConical } from "lucide-react";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "text-success",
  intermediate: "text-warning",
  advanced: "text-destructive"
};

export default function AppliedFinanceLab() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <GameNav />

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-10">
        {/* Hero */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-8 border border-white/[0.06] relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(170 72% 12%) 0%, hsl(170 55% 18%) 50%, hsl(168 50% 22%) 100%)"
          }}>

          <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(42 85% 48% / 0.15), hsl(42 85% 48% / 0.05))", border: "1px solid hsl(42 85% 48% / 0.12)" }}>

                <FlaskConical className="w-5 h-5" style={{ color: "hsl(42 85% 48% / 0.8)" }} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Applied Finance Lab</h1>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Educational Simulation</p>
              </div>
            </div>
            <p className="text-white/50 text-sm max-w-xl leading-relaxed">
              Practice filling out real-world financial documents in a safe, guided environment.
              Learn what each field means, why it matters, and how mistakes can cost you.
            </p>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labCategories.map((cat) => {
            const availableCount = cat.documents.filter((d) => d.available).length;
            const totalReward = cat.documents.reduce((s, d) => s + d.reward, 0);

            return (
              <Card key={cat.id} variant="elevated" className="overflow-hidden group hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    {cat.id === "taxes" ?
                    <img src={taxDocIcon} alt="Tax document" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "employment" ?
                    <img src={employmentIcon} alt="Employment" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "banking" ?
                    <img src={bankingIcon} alt="Banking" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "credit-loans" ?
                    <img src={creditCardIcon} alt="Credit Card" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "insurance" ?
                    <img src={insuranceShieldIcon} alt="Insurance" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "investing" ?
                    <img src={investingChartIcon} alt="Investing" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "retirement" ?
                    <img src={retirementBeachIcon} alt="Retirement" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "estate" ?
                    <img src={estateScrollIcon} alt="Estate Planning" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "government" ?
                    <img src={governmentBuildingIcon} alt="Government Benefits" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "small-business" ?
                    <img src={smallBusinessIcon} alt="Small Business" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "advanced-wealth" ?
                    <img src={advancedWealthIcon} alt="Advanced Wealth" className="w-8 h-8 rounded-md object-cover" /> :
                    cat.id === "real-estate" ?
                    <img src={realEstateIcon} alt="Real Estate" className="w-8 h-8 rounded-md object-cover" /> :
                    <span className="text-2xl">{cat.icon}</span>
                    }
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-sm">{cat.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gold font-semibold">
                      <Coins className="w-3 h-3" />
                      {totalReward.toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {cat.documents.map((doc) =>
                    <div
                      key={doc.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      doc.available ?
                      "border-border hover:border-primary/40 hover:bg-muted/30 cursor-pointer" :
                      "border-border/50 opacity-50"}`
                      }
                      onClick={() => doc.available && navigate(`/lab/${doc.id}`)}>

                        {!doc.available && <Lock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{doc.title}</p>
                          <p className="text-xs text-muted-foreground">{doc.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-semibold uppercase ${DIFFICULTY_COLORS[doc.difficulty]}`}>
                            {doc.difficulty}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />{doc.estimatedMinutes}m
                          </span>
                          {doc.available && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>);

          })}
        </div>
      </main>
    </div>);

}