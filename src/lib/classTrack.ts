import { supabase } from "@/integrations/supabase/client"
import type { EnrollmentTrack } from "@/types"

// After a student joins a class, copy the class's track onto their profile.
//
// This is the ONLY path by which a student may end up on a non-default (locked)
// track - Biz Lab or Gulliver Intro. The caller must have already inserted the
// class_members row: the server-side lock trigger (see /sql/track_locking.sql)
// only permits profiles.track to move to a locked value when a matching class
// membership already exists.
//
// A "regular" class track is a no-op on curriculum but still records
// assigned_track so the teacher-assigned value is explicit. The choice is also
// mirrored into the localStorage view-state the Missions page reads, so the
// student lands on the right course tab immediately.
export async function applyClassTrack(
  uid: string,
  classTrack: EnrollmentTrack | null | undefined,
): Promise<EnrollmentTrack> {
  const track: EnrollmentTrack =
    classTrack === "biz_lab" || classTrack === "gulliver_intro" ? classTrack : "regular"

  const { error } = await supabase
    .from("profiles")
    .update({ track, assigned_track: track, biz_lab_enrolled: track === "biz_lab" })
    .eq("id", uid)
  if (error) console.error("[applyClassTrack] profile update failed", error)

  try {
    const view =
      track === "biz_lab" ? "gulliver-biz-lab" : track === "gulliver_intro" ? "gulliver-intro" : "regular"
    localStorage.setItem("investiplay_active_track", view)
    localStorage.setItem("investiplay_track_pending", track)
    localStorage.removeItem("investiplay_ib_econ_enrolled")
  } catch {
    /* storage unavailable */
  }

  return track
}
