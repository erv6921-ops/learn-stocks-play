import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"
import { toast } from "sonner"
import { BookOpen } from "lucide-react"

export function AssignmentNotifications() {
  const { user, isStudent } = useAuth()
  const navigate = useNavigate()
  const hasChecked = useRef(false)

  useEffect(() => {
    if (!user || !isStudent || hasChecked.current) {
      if (!user) console.log('[AssignmentNotifications] No auth user — skipping');
      return;
    }
    hasChecked.current = true

    async function checkAssignments() {
      const { data, error } = await supabase
        .from('assigned_lessons')
        .select('id, lesson_id, assigned_at')
        .eq('student_user_id', user!.id)
        .eq('completed', false)

      if (error || !data || data.length === 0) return

      // Show a single toast summarizing pending assignments
      const lessonNames = data.map(a => {
        const lesson = lessons.find(l => l.id === a.lesson_id)
        return lesson?.title || a.lesson_id
      })

      if (data.length === 1) {
        toast.info(`📚 You have an assignment!`, {
          description: `"${lessonNames[0]}" — assigned by your teacher.`,
          duration: 8000,
          action: {
            label: "Go to Lessons",
            onClick: () => navigate("/lessons"),
          },
        })
      } else {
        toast.info(`📚 You have ${data.length} assignments!`, {
          description: `${lessonNames.slice(0, 2).join(", ")}${data.length > 2 ? ` and ${data.length - 2} more` : ""} — assigned by your teacher.`,
          duration: 8000,
          action: {
            label: "Go to Lessons",
            onClick: () => navigate("/lessons"),
          },
        })
      }
    }

    checkAssignments()
  }, [user, isStudent, navigate])

  return null
}
