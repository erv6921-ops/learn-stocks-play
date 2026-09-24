/**
 * ShareLessonDialog — share one of the teacher's own lessons with other
 * teachers by email (public.lesson_shares).
 *
 * Recipients get read + assign access only (see the lesson_shares migration):
 * they can preview the lesson under "Shared with me" and assign it to their
 * classes, but never edit or delete the original.
 */
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { db } from "@/components/teacher/curation/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Share2, X } from "lucide-react";

interface ShareRow {
  id: string;
  shared_with_email: string;
  created_at: string;
}

export interface ShareLessonDialogProps {
  lessonId: string;
  lessonName: string;
  open: boolean;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Split "a@x.com, b@y.com c@z.com" into normalized, de-duplicated emails. */
const parseEmails = (raw: string): { valid: string[]; invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];
  for (const part of raw.split(/[\s,;]+/)) {
    const e = part.trim().toLowerCase();
    if (!e) continue;
    if (EMAIL_RE.test(e)) {
      if (!valid.includes(e)) valid.push(e);
    } else {
      invalid.push(part.trim());
    }
  }
  return { valid, invalid };
};

export const ShareLessonDialog: React.FC<ShareLessonDialogProps> = ({ lessonId, lessonName, open, onClose }) => {
  const { toast } = useToast();
  const [shares, setShares] = useState<ShareRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await db
      .from("lesson_shares")
      .select("id, shared_with_email, created_at")
      .eq("lesson_id", lessonId)
      .order("created_at", { ascending: true });
    if (error) {
      toast({ title: "Couldn't load shares", description: error.message, variant: "destructive" });
    }
    setShares((data as ShareRow[] | null) ?? []);
    setLoading(false);
  }, [lessonId, toast]);

  useEffect(() => {
    if (open) void load();
    else setInput("");
  }, [open, load]);

  const add = async () => {
    const { valid, invalid } = parseEmails(input);
    if (invalid.length > 0) {
      toast({
        title: "Check the email address",
        description: `Not a valid email: ${invalid.join(", ")}`,
        variant: "destructive",
      });
      return;
    }
    if (valid.length === 0) return;
    const already = new Set(shares.map((s) => s.shared_with_email));
    const fresh = valid.filter((e) => !already.has(e));
    if (fresh.length === 0) {
      toast({ title: "Already shared", description: "This lesson is already shared with everyone you entered." });
      setInput("");
      return;
    }
    setAdding(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");
      const rows = fresh.map((email) => ({ lesson_id: lessonId, owner_id: userData.user.id, shared_with_email: email }));
      const { error } = await db.from("lesson_shares").insert(rows);
      if (error && error.code !== "23505") throw new Error(error.message);
      toast({
        title: fresh.length === 1 ? `Shared with ${fresh[0]}` : `Shared with ${fresh.length} people`,
        description: "They'll find it under \"Shared with me\" in their Curriculum tab and can assign it to their classes.",
      });
      setInput("");
      await load();
    } catch (err) {
      toast({
        title: "Couldn't share lesson",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  const remove = async (row: ShareRow) => {
    setRemovingId(row.id);
    try {
      const { error } = await db.from("lesson_shares").delete().eq("id", row.id);
      if (error) throw new Error(error.message);
      setShares((prev) => prev.filter((s) => s.id !== row.id));
      toast({ title: "Access removed", description: `${row.shared_with_email} can no longer see this lesson.` });
    } catch (err) {
      toast({
        title: "Couldn't remove access",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-emerald-600" /> Share lesson
          </DialogTitle>
          <DialogDescription className="break-words">
            Share &ldquo;{lessonName}&rdquo; with other teachers. They can preview it and assign it to their
            classes, but not change it.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex items-center gap-2"
          onSubmit={(e) => { e.preventDefault(); void add(); }}
        >
          <Input
            type="text"
            inputMode="email"
            autoComplete="off"
            placeholder="teacher@school.org (separate several with commas)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={adding}
            aria-label="Email address to share with"
          />
          <Button type="submit" disabled={adding || !input.trim()} className="shrink-0 bg-emerald-600 text-white hover:bg-emerald-700">
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
          </Button>
        </form>

        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Shared with</p>
          {loading ? (
            <p className="flex items-center gap-2 py-2 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</p>
          ) : shares.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-200 p-3 text-xs text-slate-500 dark:border-slate-700">
              Not shared with anyone yet.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-700">
              {shares.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-2 px-3 py-2">
                  <span className="flex min-w-0 items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{s.shared_with_email}</span>
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => void remove(s)}
                    disabled={removingId === s.id}
                    className="h-7 shrink-0 px-2 text-xs text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                    aria-label={`Remove ${s.shared_with_email}`}
                  >
                    {removingId === s.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><X className="mr-1 h-3.5 w-3.5" /> Remove</>}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLessonDialog;
