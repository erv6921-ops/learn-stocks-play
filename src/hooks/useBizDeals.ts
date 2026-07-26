import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type BizType, type BizBonus, generateDeal } from "@/lib/bizDealSynergy";

export interface PartnerWithBiz {
  userId: string;
  firstName: string;
  lastName: string;
  bizType: BizType;
}

export interface PartnerDeal {
  id: string;
  direction: "incoming" | "outgoing";
  partnerId: string;
  partnerFirstName: string;
  partnerLastName: string;
  partnerBizType: BizType;
  title: string;
  description: string;
  emoji: string;
  myBonus: BizBonus;
  status: "pending" | "accepted";
  createdAt: string;
  respondedAt: string | null;
  expiresAt: string | null;
}

export interface TotalDealBonus {
  revenuePct: number;
  customers: number;
  reputation: number;
  dealCount: number;
}

function isExpired(deal: PartnerDeal): boolean {
  if (!deal.expiresAt) return false;
  return new Date(deal.expiresAt) < new Date();
}

export function useBizDeals(myBizType: BizType | null) {
  const [deals, setDeals] = useState<PartnerDeal[]>([]);
  const [partners, setPartners] = useState<PartnerWithBiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await (supabase as any).rpc("get_my_partner_deals");
      if (err) throw err;
      const rows = (data || []) as any[];
      setDeals(rows.map((r) => ({
        id: r.id,
        direction: r.direction,
        partnerId: r.partner_id,
        partnerFirstName: r.partner_first_name ?? "",
        partnerLastName: r.partner_last_name ?? "",
        partnerBizType: r.partner_biz_type as BizType,
        title: r.title,
        description: r.description,
        emoji: r.emoji,
        myBonus: {
          revenuePct: r.my_revenue_pct ?? 0,
          customers: r.my_customers_bonus ?? 0,
          reputation: r.my_reputation_bonus ?? 0,
        },
        status: r.status,
        createdAt: r.created_at,
        respondedAt: r.responded_at ?? null,
        expiresAt: r.expires_at ?? null,
      })));
    } catch (e: any) {
      setError(e?.message ?? "Failed to load deals");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPartners = useCallback(async () => {
    try {
      const { data, error: err } = await (supabase as any).rpc("get_partners_with_biz");
      if (err) throw err;
      const rows = (data || []) as any[];
      setPartners(rows.map((r) => ({
        userId: r.user_id,
        firstName: r.first_name ?? "",
        lastName: r.last_name ?? "",
        bizType: r.biz_type as BizType,
      })));
    } catch {
      setPartners([]);
    }
  }, []);

  useEffect(() => {
    loadDeals();
    loadPartners();
  }, [loadDeals, loadPartners]);

  const proposeDeal = useCallback(async (
    receiverId: string,
    receiverBizType: BizType,
  ): Promise<{ ok: boolean; error?: string }> => {
    if (!myBizType) return { ok: false, error: "You need a business first" };
    const deal = generateDeal(myBizType, receiverBizType);
    try {
      const { error: err } = await (supabase as any).rpc("propose_partner_deal", {
        _receiver_id: receiverId,
        _proposer_biz_type: myBizType,
        _receiver_biz_type: receiverBizType,
        _title: deal.title,
        _description: deal.description,
        _emoji: deal.emoji,
        _proposer_revenue_pct: deal.proposerBonus.revenuePct,
        _proposer_customers_bonus: deal.proposerBonus.customers,
        _proposer_reputation_bonus: deal.proposerBonus.reputation,
        _receiver_revenue_pct: deal.receiverBonus.revenuePct,
        _receiver_customers_bonus: deal.receiverBonus.customers,
        _receiver_reputation_bonus: deal.receiverBonus.reputation,
      });
      if (err) {
        if (err.message?.includes("pending_exists")) return { ok: false, error: "You already have a pending proposal with this partner" };
        if (err.message?.includes("not_a_partner")) return { ok: false, error: "This person isn't in your partners list" };
        throw err;
      }
      await loadDeals();
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e?.message ?? "Failed to send proposal" };
    }
  }, [myBizType, loadDeals]);

  const respondToDeal = useCallback(async (
    dealId: string,
    accept: boolean,
  ): Promise<{ ok: boolean; error?: string }> => {
    try {
      const { error: err } = await (supabase as any).rpc("respond_to_partner_deal", {
        _deal_id: dealId,
        _accept: accept,
      });
      if (err) throw err;
      await loadDeals();
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e?.message ?? "Failed to respond" };
    }
  }, [loadDeals]);

  // Compute combined bonuses from all active (non-expired) deals
  const totalBonus: TotalDealBonus = deals
    .filter((d) => d.status === "accepted" && !isExpired(d))
    .reduce(
      (acc, d) => ({
        revenuePct: acc.revenuePct + d.myBonus.revenuePct,
        customers: acc.customers + d.myBonus.customers,
        reputation: acc.reputation + d.myBonus.reputation,
        dealCount: acc.dealCount + 1,
      }),
      { revenuePct: 0, customers: 0, reputation: 0, dealCount: 0 },
    );

  const incomingPending = deals.filter((d) => d.direction === "incoming" && d.status === "pending");
  const activeDeals = deals.filter((d) => d.status === "accepted" && !isExpired(d));

  return {
    deals,
    partners,
    loading,
    error,
    totalBonus,
    incomingPending,
    activeDeals,
    proposeDeal,
    respondToDeal,
    reload: loadDeals,
  };
}
