// Helpers for reconciling GENERATED curriculum lessons (DB `lessons` rows, keyed
// by UUID) with the app's regular assignment plumbing, which stores a text
// `lesson_id` in `assigned_lessons` / `lesson_progress` and resolves titles from
// the static `lessons` registry + routes to `/lessons/:id`.
//
// A generated lesson's id is a UUID (regular lesson ids look like "1.1",
// "gulliver-lo-1", etc.), so the UUID shape is a reliable discriminator.

import { supabase } from "@/integrations/supabase/client";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** True if this assigned lesson_id refers to a generated curriculum lesson. */
export const isGeneratedLessonId = (id: string): boolean => UUID_RE.test(id);

/** Correct player route for either lesson kind. */
export const lessonRoute = (id: string): string =>
  isGeneratedLessonId(id) ? `/student/lesson/${id}` : `/lessons/${id}`;

/**
 * Fetch display names for the generated (UUID) lesson ids in `ids` from the DB
 * `lessons` table. Regular ids are ignored (resolve those via the static
 * registry as before). Returns id -> name.
 */
export async function fetchGeneratedLessonNames(ids: string[]): Promise<Map<string, string>> {
  const gen = Array.from(new Set(ids.filter(isGeneratedLessonId)));
  if (gen.length === 0) return new Map();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any).from("lessons").select("id, name").in("id", gen);
  return new Map(((data ?? []) as { id: string; name: string }[]).map((r) => [r.id, r.name]));
}
