// Client API for teacher materials: generate (edge functions), and CRUD on
// public.teacher_materials (RLS scopes rows to the signed-in teacher).

import { supabase } from "@/integrations/supabase/client"
import { db } from "@/components/teacher/curation/api"
import type { SearchableLesson } from "@/lib/lessonSearch"
import { buildLessonPayloads } from "@/lib/materials/lessonSource"
import type {
  ActivityContent,
  ActivityFormat,
  DeckContent,
  MaterialContent,
  MaterialType,
  TeacherMaterialRow,
} from "@/types/materials"

/** Generate a presentation from the selected lessons. Throws on failure. */
export async function generateDeck(
  lessonIds: string[],
  lessons: SearchableLesson[],
  title?: string,
): Promise<DeckContent> {
  const payloads = buildLessonPayloads(lessonIds, lessons)
  const { data, error } = await supabase.functions.invoke("generate-deck", {
    body: { title, lessons: payloads },
  })
  const err = error?.message || (data as { errors?: string[] })?.errors?.join(" ")
  if (err || !(data as { deck?: DeckContent })?.deck) {
    throw new Error(err || "Could not build the presentation.")
  }
  return (data as { deck: DeckContent }).deck
}

/** Generate a class activity from the selected lessons. Throws on failure. */
export async function generateActivity(
  lessonIds: string[],
  lessons: SearchableLesson[],
  format: ActivityFormat,
  title?: string,
): Promise<ActivityContent> {
  const payloads = buildLessonPayloads(lessonIds, lessons)
  const { data, error } = await supabase.functions.invoke("generate-activity", {
    body: { title, format, lessons: payloads },
  })
  const err = error?.message || (data as { errors?: string[] })?.errors?.join(" ")
  if (err || !(data as { activity?: ActivityContent })?.activity) {
    throw new Error(err || "Could not build the activity.")
  }
  return (data as { activity: ActivityContent }).activity
}

/** Insert a new material row and return it. */
export async function saveMaterial(
  type: MaterialType,
  title: string,
  lessonIds: string[],
  content: MaterialContent,
): Promise<TeacherMaterialRow> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")
  const { data, error } = await db
    .from("teacher_materials")
    .insert({ teacher_id: user.id, type, title, lesson_ids: lessonIds, content })
    .select("*")
    .single()
  if (error) throw new Error(error.message)
  return data as TeacherMaterialRow
}

/** List the signed-in teacher's materials, newest first. */
export async function listMaterials(): Promise<TeacherMaterialRow[]> {
  const { data, error } = await db
    .from("teacher_materials")
    .select("*")
    .order("updated_at", { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []) as TeacherMaterialRow[]
}

/** Update a material's title and/or content. */
export async function updateMaterial(
  id: string,
  patch: { title?: string; content?: MaterialContent },
): Promise<void> {
  const { error } = await db.from("teacher_materials").update(patch).eq("id", id)
  if (error) throw new Error(error.message)
}

export async function deleteMaterial(id: string): Promise<void> {
  const { error } = await db.from("teacher_materials").delete().eq("id", id)
  if (error) throw new Error(error.message)
}
