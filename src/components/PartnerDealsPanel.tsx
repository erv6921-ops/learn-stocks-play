import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Handshake, Plus, CheckCircle2, XCircle, Clock, Zap, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type BizType, type BizBonus, generateDeal, BIZ_TYPE_LABELS } from "@/lib/bizDealSynergy";
import { useBizDeals, type PartnerWithBiz } from "@/hooks/useBizDeals";

// ── helpers ────────────────────────────────────────────────────────────────────

function daysLeft(expiresAt: string | null): number {
  if (!expiresAt) return 0;
  return Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000));
}

function bonusPills(bonus: BizBonus) {
  const pills: { text: string; color: string }[] = [];
  if (bonus.revenuePct > 0) pills.push({ text: `+${bonus.revenuePct}% revenue`, color: "#1D9E75" });
  if (bonus.customers > 0) pills.push({ text: `+${bonus.customers} customers`, color: "#3BA7C4" });
  if (bonus.reputation > 0) pills.push({ text: `+${bonus.reputation} rep`, color: "#8B5CF6" });
  return pills;
}

// ── Propose flow ───────────────────────────────────────────────────────────────

function ProposalPreview({
  partner,
  myBizType,
  onSend,
  onCancel,
}: {
  partner: PartnerWithBiz;
  myBizType: BizType;
  onSend: () => void;
  onCancel: () => void;
}) {
  const deal = generateDeal(myBizType, partner.bizType);
  const [sending, setSending] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: "#e0e8e3", background: "#f8fdfb" }}
    >
      {/* header */}
      <div className="px-4 py-3 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg,#0f3d2a,#06291f)" }}>
        <span className="text-2xl">{deal.emoji}</span>
        <div className="min-w-0">
          <p className="font-display font-extrabold text-white text-base leading-tight">{deal.title}</p>
          <p className="text-[11px] text-white/50 mt-0.5">
            {BIZ_TYPE_LABELS[myBizType]} × {BIZ_TYPE_LABELS[partner.bizType]}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{deal.description}</p>

        {/* bonuses */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl p-3" style={{ background: "#1D9E750a", border: "1px solid #1D9E7520" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Your monthly boost</p>
            {bonusPills(deal.proposerBonus).map((p) => (
              <span key={p.text} className="block text-[12px] font-extrabold" style={{ color: p.color }}>{p.text}</span>
            ))}
          </div>
          <div className="rounded-xl p-3" style={{ background: "#3BA7C40a", border: "1px solid #3BA7C420" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">{partner.firstName}'s boost</p>
            {bonusPills(deal.receiverBonus).map((p) => (
              <span key={p.text} className="block text-[12px] font-extrabold" style={{ color: p.color }}>{p.text}</span>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          Active for 6 months · bonuses apply each time you advance a sim month
        </p>

        <div className="flex gap-2 pt-1">
          <Button size="sm" variant="ghost" className="flex-1" onClick={onCancel}>Cancel</Button>
          <Button
            size="sm"
            className="flex-1 font-bold"
            style={{ background: "linear-gradient(135deg,#2FD39B,#0F7E5C)" }}
            disabled={sending}
            onClick={async () => {
              setSending(true);
              await onSend();
              setSending(false);
            }}
          >
            {sending ? "Sending…" : `Send to ${partner.firstName} →`}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main panel ─────────────────────────────────────────────────────────────────

export default function PartnerDealsPanel({ bizType }: { bizType: BizType | null }) {
  const { deals, partners, loading, incomingPending, activeDeals, totalBonus, proposeDeal, respondToDeal } = useBizDeals(bizType);
  const [proposingTo, setProposingTo] = useState<PartnerWithBiz | null>(null);
  const [showPropose, setShowPropose] = useState(false);
  const [responding, setResponding] = useState<Record<string, boolean>>({});

  if (!bizType) return null;

  const pendingOutgoing = deals.filter((d) => d.direction === "outgoing" && d.status === "pending");
  const hasPendingWith = (userId: string) => deals.some(
    (d) => d.partnerId === userId && d.status === "pending"
  );

  const handlePropose = async () => {
    if (!proposingTo) return;
    const { ok, error } = await proposeDeal(proposingTo.userId, proposingTo.bizType);
    if (ok) {
      toast.success("Proposal sent!", { description: `${proposingTo.firstName} will see it in their Collab tab.` });
      setProposingTo(null);
      setShowPropose(false);
    } else {
      toast.error(error ?? "Failed to send proposal");
    }
  };

  const handleRespond = async (dealId: string, accept: boolean) => {
    setResponding((r) => ({ ...r, [dealId]: true }));
    const { ok, error } = await respondToDeal(dealId, accept);
    setResponding((r) => ({ ...r, [dealId]: false }));
    if (ok) {
      toast.success(accept ? "Deal accepted! Bonuses now apply each sim month." : "Deal declined.");
    } else {
      toast.error(error ?? "Something went wrong");
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Handshake className="w-4 h-4" style={{ color: "#1D9E75" }} />
          <p className="font-display font-extrabold text-base">Live Partner Deals</p>
          {incomingPending.length > 0 && (
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full text-white"
              style={{ background: "#EF4444" }}>
              {incomingPending.length} new
            </span>
          )}
        </div>
        {partners.length > 0 && !showPropose && (
          <button
            onClick={() => setShowPropose(true)}
            className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full press-scale"
            style={{ background: "#1D9E7514", color: "#1D9E75", border: "1px solid #1D9E7530" }}
          >
            <Plus className="w-3.5 h-3.5" /> Propose Deal
          </button>
        )}
      </div>

      {/* active deal bonus banner */}
      {totalBonus.dealCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-3 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg,#1D9E7520,#3BA7C410)", border: "1px solid #1D9E7530" }}
        >
          <Zap className="w-4 h-4 shrink-0" style={{ color: "#1D9E75" }} />
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold" style={{ color: "#1D9E75" }}>
              {totalBonus.dealCount} active deal{totalBonus.dealCount > 1 ? "s" : ""} boosting your business
            </p>
            <p className="text-[11px] text-muted-foreground">
              {[
                totalBonus.revenuePct > 0 && `+${totalBonus.revenuePct}% revenue`,
                totalBonus.customers > 0 && `+${totalBonus.customers} customers/month`,
                totalBonus.reputation > 0 && `+${totalBonus.reputation} rep/month`,
              ].filter(Boolean).join(" · ")}
            </p>
          </div>
        </motion.div>
      )}

      {/* propose deal UI */}
      <AnimatePresence>
        {showPropose && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {!proposingTo ? (
              <div className="rounded-2xl border p-4 space-y-3" style={{ borderColor: "#e0e8e3" }}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">Select a partner to propose to:</p>
                  <button onClick={() => setShowPropose(false)} className="text-muted-foreground hover:text-foreground">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading partners…</p>
                ) : partners.length === 0 ? (
                  <p className="text-sm text-muted-foreground">None of your partners have started a business yet.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {partners.map((p) => {
                      const pending = hasPendingWith(p.userId);
                      const deal = generateDeal(bizType, p.bizType);
                      return (
                        <button
                          key={p.userId}
                          disabled={pending}
                          onClick={() => setProposingTo(p)}
                          className="rounded-xl p-3 text-left transition-all press-scale disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ background: "#f8fdfb", border: `1px solid ${pending ? "#e0e8e3" : "#1D9E7530"}` }}
                        >
                          <p className="font-bold text-sm">{p.firstName} {p.lastName}</p>
                          <p className="text-[11px] text-muted-foreground">{BIZ_TYPE_LABELS[p.bizType]}</p>
                          <p className="text-[11px] font-bold mt-1" style={{ color: "#1D9E75" }}>
                            {pending ? "Proposal pending" : `${deal.emoji} ${deal.title}`}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <ProposalPreview
                partner={proposingTo}
                myBizType={bizType}
                onSend={handlePropose}
                onCancel={() => { setProposingTo(null); setShowPropose(false); }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* incoming pending */}
      {incomingPending.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Incoming proposals</p>
          {incomingPending.map((d) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border overflow-hidden"
              style={{ border: "1.5px solid #EF9F2740", background: "#FFF9F0" }}
            >
              <div className="px-4 py-3 flex items-start gap-3">
                <span className="text-xl mt-0.5">{d.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-extrabold text-sm">{d.title}</p>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: "#EF9F2720", color: "#EF9F27" }}>from {d.partnerFirstName}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{BIZ_TYPE_LABELS[d.partnerBizType]} business</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {bonusPills(d.myBonus).map((p) => (
                      <span key={p.text} className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${p.color}14`, color: p.color }}>
                        {p.text}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs text-destructive hover:bg-destructive/10"
                      disabled={responding[d.id]}
                      onClick={() => handleRespond(d.id, false)}
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Decline
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg,#2FD39B,#0F7E5C)" }}
                      disabled={responding[d.id]}
                      onClick={() => handleRespond(d.id, true)}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Accept
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* active deals */}
      {activeDeals.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active deals</p>
          {activeDeals.map((d) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border overflow-hidden"
              style={{ border: "1.5px solid #1D9E7530", background: "#f8fdfb" }}
            >
              <div className="px-4 py-3 flex items-start gap-3">
                <span className="text-xl mt-0.5">{d.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-extrabold text-sm">{d.title}</p>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: "#1D9E7520", color: "#1D9E75" }}>
                      with {d.partnerFirstName}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {bonusPills(d.myBonus).map((p) => (
                      <span key={p.text} className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${p.color}14`, color: p.color }}>
                        {p.text}
                      </span>
                    ))}
                  </div>
                  {d.expiresAt && (
                    <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {daysLeft(d.expiresAt)} days remaining
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* pending outgoing */}
      {pendingOutgoing.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sent proposals</p>
          {pendingOutgoing.map((d) => (
            <div
              key={d.id}
              className="rounded-xl border px-4 py-3 flex items-center gap-3"
              style={{ borderColor: "#e0e8e3", background: "#fafafa" }}
            >
              <span className="text-lg">{d.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold">{d.title}</p>
                <p className="text-[11px] text-muted-foreground">Awaiting {d.partnerFirstName}'s response</p>
              </div>
              <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          ))}
        </div>
      )}

      {/* empty state */}
      {!loading && deals.length === 0 && partners.length === 0 && (
        <div className="rounded-2xl border border-dashed p-6 text-center" style={{ borderColor: "#1D9E7530" }}>
          <Users className="w-8 h-8 mx-auto mb-2" style={{ color: "#1D9E7540" }} />
          <p className="text-sm font-bold text-muted-foreground">No partners with businesses yet</p>
          <p className="text-xs text-muted-foreground mt-1">When a partner starts their business, you can propose a deal here.</p>
        </div>
      )}

      {!loading && deals.length === 0 && partners.length > 0 && !showPropose && (
        <div className="rounded-2xl border border-dashed p-6 text-center" style={{ borderColor: "#1D9E7530" }}>
          <Handshake className="w-8 h-8 mx-auto mb-2" style={{ color: "#1D9E7540" }} />
          <p className="text-sm font-bold text-muted-foreground">No deals yet</p>
          <p className="text-xs text-muted-foreground mt-1">You have partners with businesses - propose a deal to unlock real bonuses.</p>
          <button
            onClick={() => setShowPropose(true)}
            className="mt-3 text-sm font-bold px-4 py-2 rounded-full press-scale"
            style={{ background: "#1D9E7514", color: "#1D9E75" }}
          >
            + Propose a Deal
          </button>
        </div>
      )}
    </div>
  );
}
