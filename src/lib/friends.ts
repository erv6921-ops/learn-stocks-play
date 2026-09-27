// Client API for the Friends feature. Everything routes through the SECURITY
// DEFINER RPCs in sql/friends_chat.sql (roster reads, requests, sends, blocks,
// reports) except reading conversation messages, which is a direct RLS-guarded
// select so Supabase Realtime can stream new ones. The generated Supabase types
// predate these tables (see CLAUDE.md), so we talk to a loosely-typed client.

import { supabase } from "@/integrations/supabase/client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any

export type ShareType = "lesson" | "jeff_prompt" | "stock" | "note"
export type FriendStatus = "none" | "pending_out" | "pending_in" | "accepted"

export interface ClassmateRow {
  user_id: string
  first_name: string | null
  last_name: string | null
  school_name: string | null
  grade: number | null
  status: FriendStatus
}

export interface FriendRow {
  user_id: string
  first_name: string | null
  last_name: string | null
  school_name: string | null
  grade: number | null
  unread: number
  last_message_at: string | null
}

export interface RequestRow {
  user_id: string
  first_name: string | null
  last_name: string | null
  school_name: string | null
  grade: number | null
}

export interface FriendMessage {
  id: string
  sender_id: string
  recipient_id: string
  type: ShareType
  reference_id: string | null
  reference_label: string | null
  note: string | null
  read_at: string | null
  created_at: string
}

export interface TeacherReportRow {
  id: string
  reporter_id: string
  reporter_name: string
  reported_id: string
  reported_name: string
  reason: string
  note: string | null
  message_id: string | null
  message_type: ShareType | null
  message_note: string | null
  created_at: string
}

/** The payload a "Send to a friend" button hands to the picker dialog. */
export interface SharePayload {
  type: Exclude<ShareType, "note">
  referenceId: string
  referenceLabel?: string
}

export const fullName = (r: { first_name: string | null; last_name: string | null }): string =>
  [r.first_name, r.last_name].filter(Boolean).join(" ").trim() || "Student"

// ── Roster ────────────────────────────────────────────────────────────────

export async function listClassmates(): Promise<ClassmateRow[]> {
  const { data, error } = await db.rpc("friends_list_classmates")
  if (error) throw error
  return (data ?? []) as ClassmateRow[]
}

export async function listFriends(): Promise<FriendRow[]> {
  const { data, error } = await db.rpc("friends_list")
  if (error) throw error
  return (data ?? []) as FriendRow[]
}

export async function listRequests(): Promise<RequestRow[]> {
  const { data, error } = await db.rpc("friends_list_requests")
  if (error) throw error
  return (data ?? []) as RequestRow[]
}

// ── Friendship mutations ────────────────────────────────────────────────────

export async function sendRequest(to: string): Promise<"accepted" | "pending"> {
  const { data, error } = await db.rpc("friends_send_request", { _to: to })
  if (error) throw error
  return data === "accepted" ? "accepted" : "pending"
}

export async function respondRequest(from: string, accept: boolean): Promise<void> {
  const { error } = await db.rpc("friends_respond_request", { _from: from, _accept: accept })
  if (error) throw error
}

export async function removeFriend(other: string): Promise<void> {
  const { error } = await db.rpc("friends_remove", { _other: other })
  if (error) throw error
}

// ── Messages ────────────────────────────────────────────────────────────────

export async function sendMessage(args: {
  to: string
  type: ShareType
  referenceId?: string | null
  referenceLabel?: string | null
  note?: string | null
}): Promise<string> {
  const { data, error } = await db.rpc("friends_send_message", {
    _to: args.to,
    _type: args.type,
    _reference_id: args.referenceId ?? null,
    _reference_label: args.referenceLabel ?? null,
    _note: args.note ?? null,
  })
  if (error) throw error
  return data as string
}

/** Both directions of a conversation, oldest first. Direct RLS select. */
export async function getConversation(me: string, other: string): Promise<FriendMessage[]> {
  const { data, error } = await db
    .from("friend_messages")
    .select("*")
    .or(
      `and(sender_id.eq.${me},recipient_id.eq.${other}),and(sender_id.eq.${other},recipient_id.eq.${me})`,
    )
    .order("created_at", { ascending: true })
  if (error) throw error
  return (data ?? []) as FriendMessage[]
}

export async function markRead(other: string): Promise<void> {
  const { error } = await db.rpc("friends_mark_read", { _other: other })
  if (error) throw error
}

export async function unreadCount(): Promise<number> {
  const { data, error } = await db.rpc("friends_unread_count")
  if (error) throw error
  return Number(data ?? 0)
}

// ── Safety ──────────────────────────────────────────────────────────────────

export async function blockUser(other: string): Promise<void> {
  const { error } = await db.rpc("friends_block", { _other: other })
  if (error) throw error
}

export async function unblockUser(other: string): Promise<void> {
  const { error } = await db.rpc("friends_unblock", { _other: other })
  if (error) throw error
}

export async function reportUser(args: {
  reported: string
  reason: string
  note?: string | null
  messageId?: string | null
}): Promise<void> {
  const { error } = await db.rpc("friends_report", {
    _reported: args.reported,
    _reason: args.reason,
    _note: args.note ?? null,
    _message_id: args.messageId ?? null,
  })
  if (error) throw error
}

// ── Teacher ──────────────────────────────────────────────────────────────────

export async function listReports(): Promise<TeacherReportRow[]> {
  const { data, error } = await db.rpc("friends_list_reports")
  if (error) throw error
  return (data ?? []) as TeacherReportRow[]
}

// ── Jeff prompt hand-off ─────────────────────────────────────────────────────

export const OPEN_JEFF_EVENT = "investiplay:ask-jeff"

/** Opens the "Chat with Jeff" tutor with a prompt prefilled (see JeffWidget). */
export function openJeffWithPrompt(prompt: string): void {
  window.dispatchEvent(new CustomEvent(OPEN_JEFF_EVENT, { detail: { prompt } }))
}
