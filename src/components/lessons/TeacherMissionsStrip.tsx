import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, ChevronRight } from "lucide-react";

// Self-contained: teacher-added ("Missions"-placed) generated lessons for the
// currently-viewed unit. Isolated on purpose — it loads its own RLS-scoped data
// and routes to the generated-lesson player, WITHOUT touching the Missions
// coaster/unlock/adaptive engine (see ROUTING-NOTES.md for why full in-sequence
// insertion is deferred). Renders nothing when there are none for this unit.
export const TeacherMissionsStrip: React.FC<{ unitId: string }> = ({ unitId }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (!unitId) return;
    let cancelled = false;
    (async () => {
      // RLS ("Students see assigned lessons") scopes this to lessons assigned to
      // a class the student belongs to; we filter to Missions placement + unit.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from("lessons")
        .select("id, name, placement, mission_unit_id, status")
        .eq("placement", "missions")
        .eq("mission_unit_id", unitId)
        .eq("status", "published")
        .order("mission_sort", { ascending: true });
      if (!cancelled) setItems(((data ?? []) as { id: string; name: string }[]).map((r) => ({ id: r.id, name: r.name })));
    })();
    return () => { cancelled = true; };
  }, [unitId]);

  if (items.length === 0) return null;

  return (
    <div className="mx-auto mb-3 w-full max-w-2xl rounded-2xl border border-indigo-200 bg-indigo-50/50 p-3">
      <p className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-indigo-800">
        <BookOpen className="h-4 w-4" /> From your teacher · this unit
      </p>
      <div className="space-y-2">
        {items.map((l) => (
          <button
            key={l.id}
            onClick={() => navigate(`/student/lesson/${l.id}`)}
            className="flex w-full items-center gap-3 rounded-xl border border-indigo-200 bg-white p-3 text-left transition-colors hover:bg-indigo-50"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
              <BookOpen className="h-4 w-4 text-indigo-600" />
            </div>
            <span className="min-w-0 flex-1 truncate font-bold leading-tight">{l.name}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-indigo-500" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeacherMissionsStrip;
