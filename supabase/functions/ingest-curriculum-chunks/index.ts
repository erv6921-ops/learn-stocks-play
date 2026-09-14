// ingest-curriculum-chunks — splits a teacher upload's extracted text into
// retrieval chunks for the "Chat with Jeff" tutor (see jeff-chat tutor mode).
//
// Input:  { upload_id: string, class_id: string, track?: string | null, action?: "ingest" | "remove" }
// Output (ingest):  { success: true, upload_id, class_id, track, chunks, chunk_count, ingested_at }
// Output (remove):  { success: true, upload_id, action: "remove", removed: number }
//
// - action:"remove" deletes every chunk for the upload and nulls the upload's
//   jeff_chunk_count / jeff_ingested_at (same ownership check; class_id not
//   needed). This is how a teacher pulls material back out of the tutor.
// - A successful ingest stamps curriculum_uploads.jeff_chunk_count and
//   jeff_ingested_at so the teacher dashboard can show "In Jeff · N sections"
//   without reading curriculum_chunks (which has no client read access).
//
// - Loads curriculum_uploads.extracted_text for the upload.
// - Splits it into ~800-token chunks (≈4 chars/token) on paragraph/heading
//   boundaries with ~100 tokens of overlap, carrying the nearest heading into
//   the `heading` column.
// - Deletes any existing curriculum_chunks rows for the upload first, so
//   re-running is idempotent.
// - Inserts into public.curriculum_chunks (upload_id, class_id, track, heading,
//   content). search_vector is a generated column and fills itself.
//
// curriculum_uploads has no class_id / track column, so scoping comes from the
// request body. `class_id` is REQUIRED and must be a class the caller teaches:
// search_curriculum_chunks() treats a NULL class_id as visible to every class,
// so class-less rows would leak one teacher's material to every student.
// `track` (regular | biz_lab | gulliver_intro) is optional; null means the
// material applies to every track in that class.
//
// Auth: the caller must present a valid JWT for a teacher (user_roles.role or
// profiles.role = 'teacher'; there is no admin role in app_role) and must own
// the upload (curriculum_uploads.teacher_id). All DB access uses the service
// role — the anon client is used only to identify the caller.
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------------------------------------------------------------------------
// Chunking constants
// ---------------------------------------------------------------------------

/** Rough chars-per-token for English prose. */
const CHARS_PER_TOKEN = 4;
/** Target chunk size (~800 tokens). */
const TARGET_CHARS = 800 * CHARS_PER_TOKEN;
/** Hard ceiling per chunk before a single oversized block is sentence-split. */
const MAX_CHARS = 1000 * CHARS_PER_TOKEN;
/** Overlap carried from the end of one chunk into the start of the next (~100 tokens). */
const OVERLAP_CHARS = 100 * CHARS_PER_TOKEN;
/** Skip chunks that end up shorter than this (stray fragments). */
const MIN_CHUNK_CHARS = 40;
/** Rows per insert batch. */
const INSERT_BATCH = 100;

const VALID_TRACKS = new Set(["regular", "biz_lab", "gulliver_intro"]);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface Body {
  upload_id?: unknown;
  class_id?: unknown;
  track?: unknown;
  action?: unknown;
}

interface Block {
  text: string;
  isHeading: boolean;
}

interface Chunk {
  heading: string | null;
  content: string;
}

function respond(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

const fail = (error: string, status: number) => respond({ success: false, error }, status);

// ---------------------------------------------------------------------------
// Text → blocks
// ---------------------------------------------------------------------------

/**
 * A line reads as a heading when it is short, has few words, is not a bullet
 * or a sentence, and either is markdown-style (#), ends with ":", starts with a
 * "Chapter 3" / "Unit 2" / "1.2" label, or has no terminal punctuation at all.
 */
function looksLikeHeading(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 90) return false;
  if (/^#{1,6}\s+\S/.test(t)) return true;
  if (/^[-*•·▪●○]\s/.test(t) || /^\d+[.)]\s+\S.{40,}/.test(t)) return false;
  const words = t.split(/\s+/).length;
  if (words > 12) return false;
  if (/^(chapter|unit|lesson|section|module|part|topic)\s+\d+/i.test(t)) return true;
  if (/^\d+(\.\d+)*\s+[A-Z]/.test(t)) return true;
  if (/:$/.test(t)) return true;
  if (/[.!?…]["')\]]?$/.test(t)) return false;
  // Title-case-ish or ALL CAPS short line with no sentence punctuation.
  const letters = t.replace(/[^A-Za-z]/g, "");
  if (letters.length >= 3 && letters === letters.toUpperCase()) return true;
  const capWords = t.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).length;
  return capWords / words >= 0.5;
}

function cleanHeading(line: string): string {
  return line.trim().replace(/^#{1,6}\s+/, "").replace(/\s+/g, " ").slice(0, 200);
}

/** Paragraph blocks, with short heading-ish lines pulled out as their own blocks. */
function splitIntoBlocks(text: string): Block[] {
  const normalized = text.replace(/\r\n?/g, "\n").replace(/\t/g, " ");
  const paragraphs = normalized.split(/\n[ \t]*\n+/);
  const blocks: Block[] = [];
  for (const para of paragraphs) {
    const lines = para.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    // Leading heading lines become their own blocks; the remaining lines form
    // one paragraph.
    let i = 0;
    while (i < lines.length && looksLikeHeading(lines[i]) && (lines.length > 1 || i === 0)) {
      blocks.push({ text: cleanHeading(lines[i]), isHeading: true });
      i++;
    }
    const rest = lines.slice(i).join(" ").replace(/\s+/g, " ").trim();
    if (rest) blocks.push({ text: rest, isHeading: false });
  }
  return blocks;
}

/** Split an oversized paragraph on sentence boundaries into pieces <= maxChars. */
function splitLongParagraph(text: string, maxChars: number): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+["')\]]?\s*|[^.!?]+$/g) ?? [text];
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if (cur && cur.length + s.length > maxChars) {
      out.push(cur.trim());
      cur = "";
    }
    if (s.length > maxChars) {
      // Pathological run-on: hard-split on whitespace.
      const words = s.split(/\s+/);
      let piece = "";
      for (const w of words) {
        if (piece && piece.length + w.length + 1 > maxChars) {
          out.push(piece.trim());
          piece = "";
        }
        piece += w + " ";
      }
      cur = piece;
    } else {
      cur += s;
    }
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** Tail of `text` of roughly `chars` length, snapped forward to a sentence start. */
function overlapTail(text: string, chars: number): string {
  if (text.length <= chars) return text;
  const tail = text.slice(text.length - chars);
  const m = tail.match(/[.!?]["')\]]?\s+/);
  if (m && m.index !== undefined && m.index + m[0].length < tail.length) {
    return tail.slice(m.index + m[0].length).trim();
  }
  const ws = tail.indexOf(" ");
  return (ws >= 0 ? tail.slice(ws + 1) : tail).trim();
}

// ---------------------------------------------------------------------------
// Blocks → chunks
// ---------------------------------------------------------------------------

function buildChunks(text: string): Chunk[] {
  const blocks = splitIntoBlocks(text);
  const chunks: Chunk[] = [];

  let currentHeading: string | null = null; // most recent heading seen in the stream
  let chunkHeading: string | null = null; // heading in force when the open chunk began
  let parts: string[] = []; // paragraphs in the open chunk
  let size = 0;
  let carry = ""; // overlap text to prepend to the next chunk

  const flush = () => {
    const body = parts.join("\n\n").trim();
    if (body.length >= MIN_CHUNK_CHARS) {
      chunks.push({ heading: chunkHeading, content: body });
      carry = overlapTail(body, OVERLAP_CHARS);
    }
    parts = [];
    size = 0;
    chunkHeading = null;
  };

  const open = (first: string) => {
    chunkHeading = currentHeading;
    parts = [];
    size = 0;
    if (carry && !first.startsWith(carry)) {
      parts.push(carry);
      size += carry.length;
    }
    parts.push(first);
    size += first.length + 2;
  };

  for (const block of blocks) {
    if (block.isHeading) {
      currentHeading = block.text;
      // A heading is a natural boundary: close the open chunk if it is already
      // a reasonable size, so the next chunk starts under the new heading.
      if (size >= TARGET_CHARS * 0.6) flush();
      // Keep the heading text inside the content too, so full-text search on
      // the chunk still matches its title even without the heading column.
      if (parts.length === 0) open(block.text);
      else {
        parts.push(block.text);
        size += block.text.length + 2;
      }
      continue;
    }

    const pieces = block.text.length > MAX_CHARS
      ? splitLongParagraph(block.text, TARGET_CHARS)
      : [block.text];

    for (const piece of pieces) {
      if (parts.length === 0) {
        open(piece);
      } else if (size + piece.length + 2 > TARGET_CHARS) {
        flush();
        open(piece);
      } else {
        parts.push(piece);
        size += piece.length + 2;
      }
      if (size >= TARGET_CHARS) flush();
    }
  }
  if (parts.length > 0) flush();
  return chunks;
}

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

async function isTeacher(db: SupabaseClient, userId: string): Promise<boolean> {
  const { data: roleRow } = await db
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "teacher")
    .maybeSingle();
  if (roleRow) return true;
  const { data: profile } = await db
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  return profile?.role === "teacher";
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return fail("Use POST.", 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return fail("Server misconfiguration: missing env vars.", 500);
  }

  // --- Who is calling? ------------------------------------------------------
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return fail("Missing authorization header.", 401);
  const caller = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });
  const { data: { user }, error: userErr } = await caller.auth.getUser();
  if (userErr || !user) return fail("Unauthorized.", 401);

  const db = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  if (!(await isTeacher(db, user.id))) return fail("Teacher account required.", 403);

  // --- Validate body ---------------------------------------------------------
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail("Body must be JSON.", 400);
  }
  const uploadId = typeof body?.upload_id === "string" ? body.upload_id.trim() : "";
  if (!UUID_RE.test(uploadId)) return fail("`upload_id` must be a UUID.", 400);

  const action = body.action === undefined || body.action === null || body.action === "ingest"
    ? "ingest"
    : body.action === "remove" ? "remove" : null;
  if (!action) return fail("`action` must be \"ingest\" or \"remove\".", 400);

  const classId = typeof body.class_id === "string" ? body.class_id.trim() : "";
  if (action === "ingest" && !UUID_RE.test(classId)) {
    return fail("`class_id` is required and must be a UUID.", 400);
  }
  let track: string | null = null;
  if (body.track != null) {
    if (typeof body.track !== "string" || !VALID_TRACKS.has(body.track)) {
      return fail("`track` must be one of regular | biz_lab | gulliver_intro, or null.", 400);
    }
    track = body.track;
  }
  const tag = `ingest][${uploadId}`;

  // --- Load the upload and check ownership -----------------------------------
  const { data: upload, error: upErr } = await db
    .from("curriculum_uploads")
    .select("id, teacher_id, extracted_text, status, file_name")
    .eq("id", uploadId)
    .maybeSingle();
  if (upErr) return fail(`Load upload: ${upErr.message}`, 500);
  if (!upload) return fail("Upload not found.", 404);
  if (upload.teacher_id !== user.id) return fail("You can only ingest your own uploads.", 403);

  // --- Remove mode: pull the material back out of the tutor -------------------
  if (action === "remove") {
    const { data: removed, error: rmErr } = await db
      .from("curriculum_chunks")
      .delete()
      .eq("upload_id", uploadId)
      .select("id");
    if (rmErr) return fail(`Remove chunks: ${rmErr.message}`, 500);
    const { error: stampErr } = await db
      .from("curriculum_uploads")
      .update({ jeff_chunk_count: null, jeff_ingested_at: null })
      .eq("id", uploadId);
    if (stampErr) return fail(`Update upload: ${stampErr.message}`, 500);
    console.log(`[${tag}] removed ${removed?.length ?? 0} chunks from Jeff`);
    return respond({ success: true, upload_id: uploadId, action: "remove", removed: removed?.length ?? 0 });
  }

  if (upload.status === "deleted") return fail("Upload has been deleted.", 410);

  const text = typeof upload.extracted_text === "string" ? upload.extracted_text.trim() : "";
  if (!text) return fail("Upload has no extracted text yet.", 422);

  // The caller must teach this class (classes.teacher_id). Checked before any
  // row is written so a teacher can never attach material to another class.
  const { data: cls, error: clsErr } = await db
    .from("classes")
    .select("id")
    .eq("id", classId)
    .eq("teacher_id", user.id)
    .maybeSingle();
  if (clsErr) return fail(`Load class: ${clsErr.message}`, 500);
  if (!cls) return fail("`class_id` is not a class you teach.", 403);

  // --- Chunk -----------------------------------------------------------------
  const chunks = buildChunks(text);
  console.log(`[${tag}] ${text.length} chars -> ${chunks.length} chunks (class=${classId}, track=${track ?? "all"})`);
  if (chunks.length === 0) return fail("No usable text to chunk.", 422);

  // --- Replace existing rows (idempotent re-ingest) ----------------------------
  const { error: delErr } = await db.from("curriculum_chunks").delete().eq("upload_id", uploadId);
  if (delErr) return fail(`Clear old chunks: ${delErr.message}`, 500);

  const rows = chunks.map((c) => ({
    upload_id: uploadId,
    class_id: classId,
    track,
    heading: c.heading,
    content: c.content,
  }));
  for (let i = 0; i < rows.length; i += INSERT_BATCH) {
    const { error: insErr } = await db.from("curriculum_chunks").insert(rows.slice(i, i + INSERT_BATCH));
    if (insErr) {
      console.error(`[${tag}] insert failed at batch ${i / INSERT_BATCH}:`, insErr.message);
      return fail(`Insert chunks: ${insErr.message}`, 500);
    }
  }

  // --- Stamp the upload so the dashboard can show Jeff status ----------------
  const ingestedAt = new Date().toISOString();
  const { error: stampErr } = await db
    .from("curriculum_uploads")
    .update({ jeff_chunk_count: rows.length, jeff_ingested_at: ingestedAt })
    .eq("id", uploadId);
  if (stampErr) {
    // The chunks are in and searchable; only the status stamp failed.
    console.error(`[${tag}] could not stamp upload:`, stampErr.message);
    return fail(`Chunks saved, but the upload status could not be updated: ${stampErr.message}`, 500);
  }

  return respond({
    success: true,
    upload_id: uploadId,
    class_id: classId,
    track,
    chunks: rows.length,
    chunk_count: rows.length,
    ingested_at: ingestedAt,
  });
});
