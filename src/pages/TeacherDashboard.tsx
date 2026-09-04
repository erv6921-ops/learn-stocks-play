import React, { useState, useEffect, useMemo, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { JeffMascot } from "@/components/JeffMascot"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { cn } from "@/lib/utils"
import { fmtDue } from "@/lib/dueDate"
import { useToast } from "@/hooks/use-toast"
import TeacherPredictionView from "@/components/StockPredictionDraft/TeacherPredictionView"
import { lessons, getLessonsByTrack } from "@/data/lessons"
import { useApp } from "@/contexts/AppContext"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScenarioReviewTab } from "@/components/teacher/ScenarioReviewTab"
import {
  ClassSettings,
  DEFAULT_CLASS_SETTINGS,
  CONTROLLABLE_PAGES,
  TOGGLEABLE_TRACKS, // MODIFIED: per-class curriculum track toggles
  normalizeClassSettings,
} from "@/lib/classSettings"
import {
  Plus,
  UserPlus,
  Users,
  Copy,
  Trash2,
  LogOut,
  GraduationCap,
  Loader2,
  RefreshCw,
  BookOpen,
  CheckCircle2,
  FileText,
  Save,
  Percent,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Sparkles,
  Settings,
  ChevronsUpDown,
  Check,
} from "lucide-react"

// ── Chart palette (kept in the app's teal / gold / green family) ──
const C = {
  green: "var(--brand)",
  blue: "#3B82C4",
  gold: "#EF9F27",
  purple: "#9B59B6",
  grey: "#E5E1D8",
  grid: "#EFECE4",
}

interface Class {
  id: string
  name: string
  description: string | null
  join_code: string
  created_at: string
  student_count?: number
  /** Micro-business writing workload multiplier: 0.5 Light / 1 Standard / 1.5 Extended */
  writing_scale?: number
}

// Word-count options teachers can pick per class. Scales every micro-business
// write-up minimum (e.g. a 50-word answer becomes 25 on Light, 75 on Extended).
const WRITING_LEVELS = [
  { value: 0.5, label: "Light", hint: "≈ half the words" },
  { value: 1, label: "Standard", hint: "authored minimums" },
  { value: 1.5, label: "Extended", hint: "≈ 1.5× the words" },
] as const

interface AssignedLesson {
  id: string
  lesson_id: string
  assigned_at: string
  assignment_type?: string
  due_date?: string | null
  due_time?: string | null
}

interface ClassMember {
  id: string
  user_id: string
  joined_at: string
  profile?: {
    first_name: string | null
    last_name: string | null
    email: string
    school_name: string | null
    grade: number | null
  }
  assignedLessons: AssignedLesson[]
  completedLessonIds: string[]
  // lesson_id -> how far the student has gotten (0-100). Present for any lesson
  // the student has opened, whether or not they finished it.
  progressByLesson: Record<string, number>
}

const shorten = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s)
const memberName = (m: ClassMember) => {
  const f = m.profile?.first_name?.trim()
  const l = m.profile?.last_name?.trim()
  if (f || l) return `${f || ""} ${l || ""}`.trim()
  // No name on file (or the profile row wasn't readable) - fall back to the
  // email's local part so the student is still identifiable, then a generic.
  const email = m.profile?.email?.trim()
  if (email) return email.split("@")[0]
  return "Student"
}

// Searchable lesson picker. Replaces a plain <Select> for assigning lessons:
// the assignable list can run to ~300 lessons, and a Radix Select renders every
// item inside a MODAL overlay that locks body scroll (pointer-events: none on
// <body>). On touch devices that lock could strand the whole page frozen and
// unclickable. This Popover + Command combobox is non-modal (no scroll lock) and
// filters as you type, so it stays fast and never freezes.
function LessonPicker({
  lessons: opts,
  value,
  onSelect,
  placeholder = "Choose a lesson...",
  disabled,
}: {
  lessons: { id: string; title: string }[]
  value?: string
  onSelect: (id: string) => void
  placeholder?: string
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const selected = opts.find((l) => l.id === value)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="flex-1 justify-between font-normal min-w-0"
        >
          <span className="truncate">{selected?.title ?? placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[260px]" align="start">
        <Command>
          <CommandInput placeholder="Search lessons..." />
          <CommandList>
            <CommandEmpty>No lesson found.</CommandEmpty>
            <CommandGroup>
              {opts.map((l) => (
                <CommandItem
                  key={l.id}
                  // Include the id so lessons that share a title stay unique to
                  // cmdk; typing the title still matches (substring filter).
                  value={`${l.title}::${l.id}`}
                  onSelect={() => { onSelect(l.id); setOpen(false) }}
                >
                  <Check className={cn("mr-2 h-4 w-4 shrink-0", value === l.id ? "opacity-100" : "opacity-0")} />
                  <span className="truncate">{l.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function TeacherDashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user: appUser } = useApp()

  // Scope the assignable-lesson list to the teacher's program. A Gulliver Intro
  // teacher only assigns the 8 LO lessons; every other track keeps the full
  // curriculum. (CourseTrack "gulliver-intro" vs the enrollment "gulliver_intro".)
  const assignableLessons = appUser?.assigned_track === "gulliver_intro"
    ? getLessonsByTrack("gulliver-intro")
    : lessons

  const [classes, setClasses] = useState<Class[]>([])
  // Unclaimed classes (teacher_id null) left behind when their teacher deleted
  // their account; any teacher can take one over. See loadClasses / claimClass.
  const [unclaimed, setUnclaimed] = useState<Class[]>([])
  const [claimingId, setClaimingId] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [classMembers, setClassMembers] = useState<ClassMember[]>([])
  // Class-level assignments, held independently of students so they still show
  // (and count) when a class has no members yet. Previously these were only
  // reachable via classMembers[0], so assigning to an empty class looked like a
  // no-op.
  const [classAssignments, setClassAssignments] = useState<AssignedLesson[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [newClassDescription, setNewClassDescription] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [assigning, setAssigning] = useState<string | null>(null) // user_id currently being assigned
  const [classWideLessonId, setClassWideLessonId] = useState<string>("")
  // Classwork forces a lock-in pop-up; homework offers "Do now / Do later".
  const [classWideType, setClassWideType] = useState<"classwork" | "homework">("classwork")
  // Optional due date (YYYY-MM-DD) + time (HH:MM) for homework - shown to
  // students on their Homework page and used to flag overdue work.
  const [classWideDueDate, setClassWideDueDate] = useState<string>("")
  const [classWideDueTime, setClassWideDueTime] = useState<string>("")
  const [assigningAll, setAssigningAll] = useState(false)
  // Teacher-controlled settings for the selected class (page access, timers…).
  const [classSettings, setClassSettings] = useState<ClassSettings>(DEFAULT_CLASS_SETTINGS)
  const [savingSettings, setSavingSettings] = useState(false)

  // ── Demo mode: load sample classes/students into local state so the
  //    dashboard and its charts can be shown off without real data. Nothing is
  //    written to the database; data-changing actions are disabled while on. ──
  const [sampleMode, setSampleMode] = useState(false)
  const sampleMembersRef = useRef<Record<string, ClassMember[]>>({})

  const loadDemoData = () => {
    const aLessons = lessons.slice(0, 4)
    const firstNames = ["Ava", "Liam", "Maya", "Noah", "Sofia", "Ethan", "Zoe", "Lucas", "Emma", "Diego"]
    const mkMembers = (classId: string, n: number): ClassMember[] =>
      Array.from({ length: n }, (_, i) => {
        const assigned: AssignedLesson[] = aLessons.map((l) => ({ id: `${classId}-a-${l.id}`, lesson_id: l.id, assigned_at: new Date().toISOString() }))
        const k = Math.floor(Math.random() * (assigned.length + 1))
        const completedIds = assigned.slice(0, k).map((a) => a.lesson_id)
        const progressByLesson: Record<string, number> = {}
        assigned.forEach((a, idx) => {
          if (completedIds.includes(a.lesson_id)) progressByLesson[a.lesson_id] = 100
          else if (idx === k) progressByLesson[a.lesson_id] = [20, 40, 60, 80][i % 4] // one lesson mid-flight
        })
        return {
          id: `${classId}-m${i}`,
          user_id: `${classId}-u${i}`,
          joined_at: new Date().toISOString(),
          profile: { first_name: firstNames[i % firstNames.length], last_name: `${String.fromCharCode(65 + i)}.`, email: "", school_name: "Demo High", grade: 10 },
          assignedLessons: assigned,
          completedLessonIds: completedIds,
          progressByLesson,
        }
      })
    const cls: Class[] = [
      { id: "c1", name: "Finance 101 - Period 3", description: "Intro personal finance", join_code: "ABC123", created_at: new Date().toISOString(), student_count: 6 },
      { id: "c2", name: "Economics - Period 5", description: "AP Micro elective", join_code: "XYZ789", created_at: new Date().toISOString(), student_count: 4 },
      { id: "c3", name: "Money Club", description: null, join_code: "MNY555", created_at: new Date().toISOString(), student_count: 8 },
    ]
    sampleMembersRef.current = { c1: mkMembers("c1", 6), c2: mkMembers("c2", 4), c3: mkMembers("c3", 8) }
    setSampleMode(true)
    setClasses(cls)
    setSelectedClass(cls[0])
    setClassMembers(sampleMembersRef.current["c1"])
    setClassAssignments(sampleMembersRef.current["c1"]?.[0]?.assignedLessons ?? [])
    setLoading(false)
    toast({ title: "Demo mode on", description: "Showing sample classes & students. Refresh to exit." })
  }

  // Guard for data-changing actions while demo data is loaded.
  const blockedInDemo = (): boolean => {
    if (!sampleMode) return false
    toast({ title: "Demo mode", description: "This is sample data - exit demo to make changes." })
    return true
  }

  const assignLessonToClass = async () => {
    if (!selectedClass || !classWideLessonId) return
    if (blockedInDemo()) return
    setAssigningAll(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const title = lessons.find(l => l.id === classWideLessonId)?.title

      // One class-level assignment - every member (current and future) inherits it.
      const { error } = await supabase
        .from("assigned_lessons")
        .insert({
          class_id: selectedClass.id,
          lesson_id: classWideLessonId,
          assigned_by: user.id,
          assignment_type: classWideType,
          // Due date/time only apply to homework; classwork is do-it-now. A time
          // without a date is meaningless, so it's dropped unless a date is set.
          due_date: classWideType === "homework" && classWideDueDate ? classWideDueDate : null,
          due_time: classWideType === "homework" && classWideDueDate && classWideDueTime ? classWideDueTime : null,
        })

      if (error && error.code !== "23505") throw error

      const kind = classWideType === "homework" ? "homework" : "classwork"
      toast({
        title: error?.code === "23505" ? "Already assigned" : `Assigned "${title}" to class`,
        description: error?.code === "23505"
          ? "This lesson is already assigned to the class."
          : `Every student in this class now has this ${kind}.`,
      })
      setClassWideLessonId("")
      setClassWideDueDate("")
      setClassWideDueTime("")
      await loadClassMembers(selectedClass.id)
    } catch (error: any) {
      toast({ title: "Failed to assign", description: error.message, variant: "destructive" })
    } finally {
      setAssigningAll(false)
    }
  }

  useEffect(() => {
    checkAuthAndLoadClasses()
  }, [])

  const checkAuthAndLoadClasses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate("/auth")
        return
      }

      await loadClasses()
    } catch (error) {
      console.error("Auth check failed:", error)
      navigate("/auth")
    }
  }

  const loadClasses = async () => {
    setSampleMode(false) // leaving demo (or initial real load)
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("teacher_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      // Get student counts for each class
      const classesWithCounts = await Promise.all(
        (data || []).map(async (cls) => {
          const { count } = await supabase
            .from("class_members")
            .select("*", { count: "exact", head: true })
            .eq("class_id", cls.id)

          return { ...cls, student_count: count || 0 }
        })
      )

      setClasses(classesWithCounts)

      // Unclaimed classes: orphaned when their teacher deleted their account.
      // RLS (see 20260817000000_orphan_class_takeover.sql) exposes teacher_id=null
      // rows to any teacher so they can adopt one. No student count here; the
      // class_members policy hides members until you own the class.
      const { data: orphans } = await supabase
        .from("classes")
        .select("*")
        .is("teacher_id", null)
        .order("created_at", { ascending: false })
      setUnclaimed(orphans || [])
    } catch (error: any) {
      toast({
        title: "Failed to load classes",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Take over an unclaimed class: assign yourself as its teacher. The UPDATE is
  // allowed by the "claim unclaimed classes" RLS policy; students ride along.
  const claimClass = async (cls: Class) => {
    setClaimingId(cls.id)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { error } = await supabase
        .from("classes")
        .update({ teacher_id: user.id })
        .eq("id", cls.id)
      if (error) throw error
      toast({ title: `You now own "${cls.name}"`, description: "The class and its students are on your dashboard." })
      await loadClasses()
    } catch (e: any) {
      toast({ title: "Couldn't take over the class", description: e?.message || "Please try again.", variant: "destructive" })
    } finally {
      setClaimingId(null)
    }
  }

  const loadClassMembers = async (classId: string) => {
    try {
      const { data, error } = await supabase
        .from("class_members")
        .select("id, user_id, joined_at")
        .eq("class_id", classId)
        .order("joined_at", { ascending: false })

      if (error) throw error

      // Assignments are class-level - load once and share across members.
      const { data: assignmentData } = await supabase
        .from("assigned_lessons")
        .select("id, lesson_id, assigned_at, assignment_type, due_date, due_time")
        .eq("class_id", classId)
        .order("assigned_at", { ascending: false })
      const classAssignments = (assignmentData || []) as AssignedLesson[]
      setClassAssignments(classAssignments)

      const membersWithProfiles = await Promise.all(
        (data || []).map(async (member) => {
          const [profileRes, progressRes] = await Promise.all([
            supabase
              .from("profiles")
              .select("first_name, last_name, email, school_name, grade")
              .eq("id", member.user_id)
              .single(),
            supabase
              .from("lesson_progress")
              .select("lesson_id, completed, progress_percent")
              .eq("user_id", member.user_id)
          ])

          const progressRows = (progressRes.data || []) as any[]
          const progressByLesson: Record<string, number> = {}
          progressRows.forEach((p) => {
            // A completed lesson is 100% even on older rows with a null percent.
            progressByLesson[p.lesson_id] = p.completed ? 100 : (p.progress_percent ?? 0)
          })

          return {
            ...member,
            profile: profileRes.data,
            assignedLessons: classAssignments,
            completedLessonIds: progressRows.filter((p) => p.completed).map((p) => p.lesson_id),
            progressByLesson,
          }
        })
      )

      setClassMembers(membersWithProfiles)
    } catch (error: any) {
      toast({
        title: "Failed to load students",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  // Live lesson progress: when any of this teacher's students advances through a
  // lesson, refresh the selected class so the progress bars move without a
  // refresh. RLS already limits realtime events to this teacher's own students,
  // and lesson_progress is in the supabase_realtime publication. Skipped in demo
  // mode (fake user_ids would just clear the sample data). Coalesced so a burst
  // of section advances triggers at most one reload.
  useEffect(() => {
    if (!selectedClass) return
    if (sampleMembersRef.current[selectedClass.id]) return // demo class
    const classId = selectedClass.id
    let timer: ReturnType<typeof setTimeout> | null = null
    const scheduleReload = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => { loadClassMembers(classId) }, 400)
    }
    const channel = supabase
      .channel(`lesson-progress-${classId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lesson_progress" },
        scheduleReload
      )
      .subscribe()
    return () => {
      if (timer) clearTimeout(timer)
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass?.id])

  // Load the selected class's teacher-controlled settings. Fails soft (defaults)
  // if the class_settings table isn't migrated yet.
  useEffect(() => {
    if (!selectedClass) { setClassSettings(DEFAULT_CLASS_SETTINGS); return }
    let cancelled = false
    ;(async () => {
      const { data, error } = await (supabase as any)
        .from("class_settings")
        .select("settings")
        .eq("class_id", selectedClass.id)
        .maybeSingle()
      if (cancelled) return
      setClassSettings(error || !data ? DEFAULT_CLASS_SETTINGS : normalizeClassSettings(data.settings))
    })()
    return () => { cancelled = true }
  }, [selectedClass])

  // Persist a settings change (optimistic) to class_settings.
  const saveClassSettings = async (next: ClassSettings) => {
    if (!selectedClass) return
    const prev = classSettings
    setClassSettings(next)
    setSavingSettings(true)
    const { error } = await (supabase as any)
      .from("class_settings")
      .upsert(
        { class_id: selectedClass.id, settings: next, updated_at: new Date().toISOString() },
        { onConflict: "class_id" }
      )
    setSavingSettings(false)
    if (error) {
      setClassSettings(prev) // roll back
      toast({ title: "Couldn't save settings", description: error.message, variant: "destructive" })
    }
  }

  const assignLesson = async (studentUserId: string, lessonId: string) => {
    if (!selectedClass) return
    if (blockedInDemo()) return
    setAssigning(studentUserId)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase
        .from("assigned_lessons")
        .insert({
          class_id: selectedClass.id,
          lesson_id: lessonId,
          assigned_by: user.id,
        })

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already assigned",
            description: "This lesson is already assigned to the class.",
            variant: "destructive",
          })
          return
        }
        throw error
      }

      toast({
        title: "Lesson assigned!",
        description: `Assigned "${lessons.find(l => l.id === lessonId)?.title}" to the class.`,
      })

      await loadClassMembers(selectedClass.id)
    } catch (error: any) {
      toast({
        title: "Failed to assign lesson",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setAssigning(null)
    }
  }

  const removeAssignment = async (assignmentId: string) => {
    if (!selectedClass) return
    if (blockedInDemo()) return
    if (!confirm("Are you sure you want to delete this lesson? This removes it from the class.")) {
      return
    }

    try {
      const { error } = await supabase
        .from("assigned_lessons")
        .delete()
        .eq("id", assignmentId)

      if (error) throw error

      toast({ title: "Assignment removed" })
      await loadClassMembers(selectedClass.id)
    } catch (error: any) {
      toast({
        title: "Failed to remove assignment",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const generateJoinCode = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }

  const createClass = async (e: React.FormEvent) => {
    e.preventDefault()
    if (blockedInDemo()) return
    setCreating(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const joinCode = generateJoinCode()

      const { data, error } = await supabase
        .from("classes")
        .insert({
          name: newClassName,
          description: newClassDescription || null,
          teacher_id: user.id,
          join_code: joinCode,
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Class created!",
        description: `Join code: ${joinCode}`,
      })

      setNewClassName("")
      setNewClassDescription("")
      setDialogOpen(false)
      await loadClasses()
    } catch (error: any) {
      toast({
        title: "Failed to create class",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setCreating(false)
    }
  }

  const deleteClass = async (classId: string) => {
    if (blockedInDemo()) return
    if (!confirm("Are you sure you want to delete this class? All students will be removed.")) {
      return
    }

    try {
      const { error } = await supabase
        .from("classes")
        .delete()
        .eq("id", classId)

      if (error) throw error

      toast({ title: "Class deleted" })

      if (selectedClass?.id === classId) {
        setSelectedClass(null)
        setClassMembers([])
        setClassAssignments([])
      }

      await loadClasses()
    } catch (error: any) {
      toast({
        title: "Failed to delete class",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const removeStudent = async (memberId: string) => {
    if (blockedInDemo()) return
    if (!confirm("Remove this student from the class?")) {
      return
    }

    try {
      const { error } = await supabase
        .from("class_members")
        .delete()
        .eq("id", memberId)

      if (error) throw error

      toast({ title: "Student removed" })

      if (selectedClass) {
        await loadClassMembers(selectedClass.id)
        await loadClasses()
      }
    } catch (error: any) {
      toast({
        title: "Failed to remove student",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const copyJoinCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied!",
      description: "Join code copied to clipboard",
    })
  }

  // Set how much writing the micro-business activities require for a class.
  const setWritingScale = async (classId: string, scale: number) => {
    const prev = classes
    setClasses(cs => cs.map(c => c.id === classId ? { ...c, writing_scale: scale } : c))
    const { error } = await (supabase as any)
      .from("classes")
      .update({ writing_scale: scale })
      .eq("id", classId)
    if (error) {
      setClasses(prev)
      toast({ title: "Couldn't save writing level", description: error.message, variant: "destructive" })
    } else {
      const lvl = WRITING_LEVELS.find(l => l.value === scale)
      toast({ title: `Writing level: ${lvl?.label}`, description: "Students see the new word minimums next time they open Micro-Business." })
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/auth")
  }

  // ── Delete-account (self-service, permanent) ──
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false)
  const [deleteAccountConfirm, setDeleteAccountConfirm] = useState("")
  const [deletingAccount, setDeletingAccount] = useState(false)

  const handleDeleteAccount = async () => {
    setDeletingAccount(true)
    try {
      // Deletes the caller's own account (identified from their JWT) via the
      // delete-account edge function; same flow the student Profile page uses.
      const { error } = await supabase.functions.invoke("delete-account")
      if (error) {
        // invoke() reports non-2xx responses with a generic message; pull the
        // edge function's real error out of the response body so failures
        // (e.g. a foreign-key block) are actually diagnosable.
        let detail = error.message
        try {
          const body = await (error as any)?.context?.json?.()
          if (body?.error) detail = body.error
        } catch { /* body already consumed or not JSON */ }
        throw new Error(detail)
      }
      toast({ title: "Your account has been deleted." })
      await supabase.auth.signOut()
      navigate("/auth", { replace: true })
    } catch (e: any) {
      toast({ title: "Couldn't delete your account", description: e?.message || "Please try again.", variant: "destructive" })
      setDeletingAccount(false)
    }
  }

  const selectClass = async (cls: Class) => {
    if (sampleMode) {
      setSelectedClass(cls)
      setClassMembers(sampleMembersRef.current[cls.id] || [])
      setClassAssignments(sampleMembersRef.current[cls.id]?.[0]?.assignedLessons ?? [])
      return
    }
    setSelectedClass(cls)
    await loadClassMembers(cls.id)
  }

  const getStudentProgress = (member: ClassMember) => {
    const completed = member.assignedLessons.filter(a => member.completedLessonIds.includes(a.lesson_id)).length
    const total = member.assignedLessons.length
    return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }

  const getUnassignedLessons = (member: ClassMember) => {
    const assignedIds = new Set(member.assignedLessons.map(a => a.lesson_id))
    return assignableLessons.filter(l => !assignedIds.has(l.id))
  }

  // ── Derived analytics for the charts ──
  const totalStudents = classes.reduce((s, c) => s + (c.student_count || 0), 0)
  const assignments = classAssignments

  const studentChartData = useMemo(
    () => classMembers
      .map((m) => {
        const p = getStudentProgress(m)
        return { name: shorten(memberName(m), 12), percent: p.percent, completed: p.completed, total: p.total }
      })
      .sort((a, b) => b.percent - a.percent),
    [classMembers]
  )

  const lessonChartData = useMemo(
    () => assignments.map((a) => {
      const lesson = lessons.find(l => l.id === a.lesson_id)
      const title = lesson?.title ?? a.lesson_id
      const done = classMembers.filter(m => m.completedLessonIds.includes(a.lesson_id)).length
      return { name: shorten(title, 14), full: title, Completed: done, Remaining: Math.max(0, classMembers.length - done) }
    }),
    [assignments, classMembers]
  )

  const classCompletion = useMemo(() => {
    let done = 0, total = 0
    classMembers.forEach((m) => { const p = getStudentProgress(m); done += p.completed; total += p.total })
    return { done, total, remaining: Math.max(0, total - done), pct: total > 0 ? Math.round((done / total) * 100) : 0 }
  }, [classMembers])

  const avgCompletion = useMemo(() => {
    const withWork = studentChartData.filter((s) => s.total > 0)
    if (!withWork.length) return 0
    return Math.round(withWork.reduce((s, x) => s + x.percent, 0) / withWork.length)
  }, [studentChartData])

  // MODIFIED: Lesson-completion analytics for the Student Progress card. Counts
  // each student's completed lessons (lesson_progress.completed === true) that
  // fall inside the tracks currently ENABLED for this class, out of the total
  // lessons in those tracks - so a disabled track drops out of both numbers.
  const enabledTrackLessonIds = useMemo(() => {
    const ids = new Set<string>()
    TOGGLEABLE_TRACKS.forEach((t) => {
      if (classSettings.tracksEnabled[t.key] !== false) {
        getLessonsByTrack(t.track).forEach((l) => ids.add(l.id))
      }
    })
    return ids
  }, [classSettings])

  const studentLessonCompletion = useMemo(() => {
    const total = enabledTrackLessonIds.size
    return classMembers
      .map((m) => {
        const completed = m.completedLessonIds.filter((id) => enabledTrackLessonIds.has(id)).length
        return {
          id: m.id,
          name: memberName(m),
          completed,
          total,
          percent: total > 0 ? Math.round((completed / total) * 100) : 0,
        }
      })
      .sort((a, b) => b.completed - a.completed)
  }, [classMembers, enabledTrackLessonIds])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  // Global at-a-glance stats for the sidebar. Class-scoped numbers live in the
  // selected class's summary strip instead, so nothing shifts under you when you
  // switch which class is active.
  const globalStats = [
    { label: "Classes", value: String(classes.length), icon: GraduationCap, color: C.green },
    { label: "Students", value: String(totalStudents), icon: Users, color: C.blue },
  ]

  // Stat pills shown in the selected class's summary strip.
  const classStats = selectedClass ? [
    { label: "Students", value: String(classMembers.length), icon: Users, color: C.blue },
    { label: "Assignments", value: String(assignments.length), icon: ClipboardList, color: C.purple },
    { label: "Avg completion", value: `${avgCompletion}%`, icon: Percent, color: C.gold },
    { label: "Class done", value: `${classCompletion.pct}%`, icon: CheckCircle2, color: C.green },
  ] : []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <JeffMascot size="sm" mood="happy" />
            <div>
              <h1 className="font-display text-xl font-bold flex items-center gap-2">
                Teacher Dashboard
                {sampleMode && <Badge variant="secondary" className="gap-1"><Sparkles className="w-3 h-3" /> Demo</Badge>}
              </h1>
              <p className="text-sm text-muted-foreground">{selectedClass ? selectedClass.name : "Manage your classes"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={sampleMode ? "default" : "outline"}
              onClick={sampleMode ? loadClasses : loadDemoData}
              title={sampleMode ? "Exit demo and load your real classes" : "Preview the dashboard with sample data"}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {sampleMode ? "Exit demo" : "Demo"}
            </Button>
            <Button variant="outline" size="icon" onClick={loadClasses} title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
            <Button
              variant="outline"
              onClick={() => { setDeleteAccountConfirm(""); setDeleteAccountOpen(true) }}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/40"
              title="Permanently delete your account"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>

        {/* Permanent self-service account deletion (typed confirmation). */}
        <Dialog open={deleteAccountOpen} onOpenChange={(o) => { if (!deletingAccount) setDeleteAccountOpen(o) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete your account?</DialogTitle>
              <DialogDescription>
                This permanently deletes your teacher account and sign-in, and cannot be undone. Your classes and their data may be removed with it.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="delete-account-confirm">Type <span className="font-bold">DELETE</span> to confirm</Label>
              <Input
                id="delete-account-confirm"
                value={deleteAccountConfirm}
                autoComplete="off"
                onChange={(e) => setDeleteAccountConfirm(e.target.value)}
                placeholder="DELETE"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDeleteAccountOpen(false)} disabled={deletingAccount}>Cancel</Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deletingAccount || deleteAccountConfirm.trim().toUpperCase() !== "DELETE"}
              >
                {deletingAccount ? "Deleting…" : "Delete account"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* When a class is open, the only navigation is this one button back to
            the classroom blocks - no competing sidebar list to click. */}
        {selectedClass && (
          <Button
            variant="ghost"
            className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground"
            onClick={() => { setSelectedClass(null); setClassMembers([]); setClassAssignments([]) }}
          >
            <ChevronLeft className="w-4 h-4" /> All classrooms
          </Button>
        )}

        {/* ── Landing: at-a-glance stats + New Class (only when no class open) ── */}
        {!selectedClass && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="grid grid-cols-2 gap-3">
              {globalStats.map((k) => (
                <Card key={k.label} variant="elevated">
                  <CardContent className="p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${k.color}1a` }}>
                      <k.icon className="w-5 h-5" style={{ color: k.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xl font-extrabold leading-none tabular-nums">{k.value}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{k.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Class
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Class</DialogTitle>
                    <DialogDescription>
                      Create a class and share the join code with your students.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={createClass} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="className">Class Name</Label>
                      <Input
                        id="className"
                        placeholder="e.g., Finance 101 - Period 3"
                        value={newClassName}
                        onChange={e => setNewClassName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classDescription">Description (optional)</Label>
                      <Input
                        id="classDescription"
                        placeholder="Brief description of the class"
                        value={newClassDescription}
                        onChange={e => setNewClassDescription(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={creating}>
                      {creating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Create Class
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
        )}

        {/* Classroom blocks (landing) or the selected class's detail. */}
        <div className="space-y-6 min-w-0">
            {!selectedClass ? (
              classes.length > 0 ? (
                <>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-lg font-bold">Your classrooms</h2>
                    <span className="text-sm text-muted-foreground">Tap a classroom to open it</span>
                  </div>
                  {/* Classroom blocks - a big, glanceable tile per class (name + how
                      many students), styled like the stock tiles. Opens the class. */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {classes.map((cls) => (
                      <button
                        key={cls.id}
                        onClick={() => selectClass(cls)}
                        className="group relative text-left rounded-2xl border border-border bg-card p-6 hover:shadow-card hover:border-primary/40 transition-all hover:-translate-y-0.5 overflow-hidden"
                      >
                        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-primary/5 blur-xl pointer-events-none" />
                        <div className="relative flex items-start justify-between gap-3 mb-5">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 grid place-items-center shrink-0">
                            <span className="font-display font-extrabold text-primary text-lg tracking-tight">
                              {cls.name.trim().slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <Badge variant="secondary" className="font-mono shrink-0">{cls.join_code}</Badge>
                        </div>
                        <h3 className="relative font-display text-2xl font-extrabold tracking-tight leading-tight line-clamp-2">
                          {cls.name}
                        </h3>
                        {cls.description && (
                          <p className="relative text-sm text-muted-foreground line-clamp-1 mt-1">{cls.description}</p>
                        )}
                        <div className="relative flex items-center justify-between gap-2 mt-5 pt-4 border-t border-border/60">
                          <span className="flex items-baseline gap-1.5">
                            <span className="font-display text-3xl font-extrabold tabular-nums leading-none">{cls.student_count ?? 0}</span>
                            <span className="text-sm text-muted-foreground">
                              {cls.student_count === 1 ? "student" : "students"}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-primary shrink-0 group-hover:gap-1.5 transition-all">
                            Open <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <Card variant="elevated">
                  <CardContent className="p-12 text-center">
                    <JeffMascot size="lg" mood="teaching" message="Create a class to get started, then tap it to view students & analytics" />
                  </CardContent>
                </Card>
              )
            ) : (
              <>
                {/* ── Class summary: identity, join code, at-a-glance stats ── */}
                <Card variant="elevated" className="overflow-hidden">
                  <div className="p-5 border-b bg-muted/20">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <h2 className="font-display text-xl font-bold truncate">{selectedClass.name}</h2>
                        {selectedClass.description && (
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{selectedClass.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5">
                          <span className="text-xs text-muted-foreground">Join code</span>
                          <span className="font-mono font-bold text-primary tracking-wide">{selectedClass.join_code}</span>
                        </div>
                        <Button variant="outline" size="icon" onClick={() => copyJoinCode(selectedClass.join_code)} title="Copy join code">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0">
                    {classStats.map((s) => (
                      <div key={s.label} className="flex items-center gap-2.5 p-4">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.color}1a` }}>
                          <s.icon className="w-4 h-4" style={{ color: s.color }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-lg font-extrabold leading-none tabular-nums">{s.value}</p>
                          <p className="text-[11px] text-muted-foreground mt-1 truncate">{s.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Tabs defaultValue="students" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="assign">Assign</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="draft">Stock Draft</TabsTrigger>
                  </TabsList>

                  {/* ── Assign a lesson to the whole class ── */}
                  <TabsContent value="assign" className="mt-4">
                    <Card variant="elevated">
                      <CardContent className="pt-6">
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Assign a lesson to the entire class
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Pick any lesson, then choose how it's assigned. <strong>Classwork</strong> locks
                        students into a do-it-now pop-up; <strong>homework</strong> lets them choose "Do now"
                        or "Do later" and shows up on their Homework page.
                      </p>
                      {/* Classwork vs. homework toggle */}
                      <div className="grid grid-cols-2 gap-2 mb-3 max-w-sm">
                        {([
                          { key: "classwork", label: "Classwork", hint: "Do it now" },
                          { key: "homework", label: "Homework", hint: "Do now or later" },
                        ] as const).map((opt) => {
                          const active = classWideType === opt.key
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => setClassWideType(opt.key)}
                              disabled={assigningAll}
                              className={`rounded-lg border-2 px-3 py-2 text-left transition ${
                                active
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-card hover:border-primary/40"
                              }`}
                            >
                              <span className="block text-sm font-semibold">{opt.label}</span>
                              <span className="block text-xs text-muted-foreground">{opt.hint}</span>
                            </button>
                          )
                        })}
                      </div>
                      {/* Due date + optional time - homework only (classwork is
                          do-it-now). The time is disabled until a date is set. */}
                      {classWideType === "homework" && (
                        <div className="mb-3 flex flex-wrap gap-4">
                          <div>
                            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                              Due date <span className="font-normal">(optional)</span>
                            </label>
                            <Input
                              type="date"
                              value={classWideDueDate}
                              onChange={(e) => setClassWideDueDate(e.target.value)}
                              disabled={assigningAll}
                              className="w-[170px]"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                              Due time <span className="font-normal">(optional)</span>
                            </label>
                            <Input
                              type="time"
                              value={classWideDueTime}
                              onChange={(e) => setClassWideDueTime(e.target.value)}
                              disabled={assigningAll || !classWideDueDate}
                              className="w-[140px]"
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <LessonPicker
                          lessons={assignableLessons}
                          value={classWideLessonId}
                          onSelect={setClassWideLessonId}
                          disabled={assigningAll}
                        />
                        <Button onClick={assignLessonToClass} disabled={!classWideLessonId || assigningAll}>
                          {assigningAll ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Plus className="w-4 h-4 mr-2" />
                          )}
                          Assign to Class
                        </Button>
                      </div>
                    </div>

                    {/* Currently-assigned lessons - visible feedback that an
                        assignment landed, even before any student has joined. */}
                    <div className="mt-4">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Assigned to this class ({assignments.length})
                      </p>
                      {assignments.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">
                          No lessons assigned yet. Pick one above to get started.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {assignments.map((a) => {
                            const lesson = lessons.find((l) => l.id === a.lesson_id)
                            return (
                              <div key={a.id} className="flex items-center justify-between gap-2 p-3 rounded-lg border bg-card">
                                <span className="flex items-center gap-2 min-w-0">
                                  <BookOpen className="w-4 h-4 text-primary shrink-0" />
                                  <span className="min-w-0">
                                    <span className="block truncate font-medium">{lesson?.title || a.lesson_id}</span>
                                    <span className="block text-xs text-muted-foreground">
                                      {a.assignment_type === "homework" ? "Homework" : "Classwork"}
                                      {a.due_date && <> · Due {fmtDue(a.due_date, a.due_time)}</>}
                                    </span>
                                  </span>
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="shrink-0"
                                  onClick={() => removeAssignment(a.id)}
                                  title="Remove assignment from class"
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* ── Stock Prediction Draft ── */}
                  <TabsContent value="draft" className="mt-4">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" /> Stock Prediction Draft
                    </CardTitle>
                    <CardDescription>
                      Every student's semester stock pick, ranked by return since pick day.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TeacherPredictionView classId={selectedClass.id} />
                  </CardContent>
                </Card>
                  </TabsContent>

                  {/* ── Class controls / settings ── */}
                  <TabsContent value="settings" className="mt-4">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Settings className="w-4 h-4 text-primary" /> Class controls
                    </CardTitle>
                    <CardDescription>
                      Turn student features on or off and set limits. Changes apply live to every student in this class.
                      {savingSettings && <span className="ml-2 text-primary">Saving…</span>}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Page access */}
                    <div>
                      <p className="text-sm font-semibold mb-2">Pages students can open</p>
                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                        {CONTROLLABLE_PAGES.map((page) => {
                          const allowed = !classSettings.lockedPages.includes(page.key)
                          return (
                            <div key={page.key} className="flex items-center justify-between py-1.5">
                              <Label htmlFor={`pg-${page.key}`} className="text-sm cursor-pointer">{page.label}</Label>
                              <Switch
                                id={`pg-${page.key}`}
                                checked={allowed}
                                onCheckedChange={(on) => {
                                  const locked = new Set(classSettings.lockedPages)
                                  if (on) locked.delete(page.key); else locked.add(page.key)
                                  saveClassSettings({ ...classSettings, lockedPages: Array.from(locked) })
                                }}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Per-question time limit */}
                    <div className="flex items-center justify-between gap-4 border-t pt-4">
                      <div>
                        <p className="text-sm font-semibold">Time limit per question</p>
                        <p className="text-xs text-muted-foreground">Seconds a student gets to answer each quiz question. Blank = no limit.</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Input
                          type="number"
                          min={0}
                          className="w-24"
                          placeholder="none"
                          value={classSettings.secondsPerQuestion ?? ""}
                          onChange={(e) => {
                            const n = parseInt(e.target.value, 10)
                            saveClassSettings({ ...classSettings, secondsPerQuestion: Number.isFinite(n) && n > 0 ? n : null })
                          }}
                        />
                        <span className="text-sm text-muted-foreground">sec</span>
                      </div>
                    </div>

                    {/* MODIFIED: Curriculum tracks students in this class can see. */}
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold mb-1">Curriculum tracks</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Turn a track off and its lessons disappear from every student in this class.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                        {TOGGLEABLE_TRACKS.map((t) => {
                          const enabled = classSettings.tracksEnabled[t.key] !== false
                          return (
                            <div key={t.key} className="flex items-center justify-between py-1.5">
                              <Label htmlFor={`trk-${t.key}`} className="text-sm cursor-pointer">{t.label}</Label>
                              <Switch
                                id={`trk-${t.key}`}
                                checked={enabled}
                                onCheckedChange={(on) =>
                                  saveClassSettings({
                                    ...classSettings,
                                    tracksEnabled: { ...classSettings.tracksEnabled, [t.key]: on },
                                  })
                                }
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                  </CardContent>
                </Card>
                  </TabsContent>

                  {/* ── Analytics ── */}
                  <TabsContent value="analytics" className="space-y-4 mt-4">
                {classMembers.length > 0 ? (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Completion donut */}
                      <Card variant="elevated">
                        <CardHeader className="pb-0">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Percent className="w-4 h-4 text-primary" /> Class completion
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {classCompletion.total === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-12">
                              Assign a lesson to start tracking completion.
                            </p>
                          ) : (
                            <div className="relative">
                              <ResponsiveContainer width="100%" height={190}>
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: "Completed", value: classCompletion.done },
                                      { name: "Remaining", value: classCompletion.remaining },
                                    ]}
                                    dataKey="value"
                                    innerRadius={58}
                                    outerRadius={82}
                                    startAngle={90}
                                    endAngle={-270}
                                    stroke="none"
                                  >
                                    <Cell fill={C.green} />
                                    <Cell fill={C.grey} />
                                  </Pie>
                                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }} />
                                </PieChart>
                              </ResponsiveContainer>
                              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-extrabold" style={{ color: C.green }}>{classCompletion.pct}%</span>
                                <span className="text-xs text-muted-foreground">{classCompletion.done}/{classCompletion.total} done</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Per-student progress */}
                      <Card variant="elevated">
                        <CardHeader className="pb-0">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" /> Per-student progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={Math.max(150, studentChartData.length * 34)}>
                            <BarChart data={studentChartData} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                              <CartesianGrid horizontal={false} stroke={C.grid} />
                              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                              <YAxis type="category" dataKey="name" width={74} tick={{ fontSize: 11 }} />
                              <Tooltip formatter={(v: number) => [`${v}%`, "Complete"]} contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }} />
                              <Bar dataKey="percent" fill={C.green} radius={[0, 6, 6, 0]} barSize={16} />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>

                    {/* MODIFIED: Student Progress - lessons completed per student. */}
                    <Card variant="elevated">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-primary" /> Student progress
                        </CardTitle>
                        <CardDescription>
                          Lessons each student has completed across the enabled tracks
                          ({enabledTrackLessonIds.size} total).
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {enabledTrackLessonIds.size === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-6">
                            All curriculum tracks are turned off for this class. Enable a track in Settings to track progress.
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {studentLessonCompletion.map((s) => (
                              <div key={s.id} className="flex items-center gap-3">
                                <span className="text-sm font-medium w-32 shrink-0 truncate" title={s.name}>{s.name}</span>
                                <Progress value={s.percent} className="h-2 flex-1" />
                                <span className="text-xs text-muted-foreground tabular-nums w-20 text-right shrink-0">
                                  {s.completed}/{s.total} lessons
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Lesson completion */}
                    {lessonChartData.length > 0 && (
                      <Card variant="elevated">
                        <CardHeader className="pb-0">
                          <CardTitle className="text-base flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" /> Lesson completion across the class
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={lessonChartData} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
                              <CartesianGrid vertical={false} stroke={C.grid} />
                              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-18} textAnchor="end" height={56} />
                              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }} />
                              <Legend wrapperStyle={{ fontSize: 12 }} />
                              <Bar dataKey="Completed" stackId="a" fill={C.green} radius={[0, 0, 0, 0]} />
                              <Bar dataKey="Remaining" stackId="a" fill={C.grey} radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <Card variant="elevated">
                    <CardContent className="p-8 text-center text-muted-foreground text-sm">
                      Analytics show up once students join and you've assigned a lesson.
                    </CardContent>
                  </Card>
                )}
                  </TabsContent>

                  {/* ── Scenario free-response review (ungraded, teacher-only) ── */}
                  <TabsContent value="scenarios" className="mt-4">
                    <ScenarioReviewTab members={classMembers} />
                  </TabsContent>

                  {/* ── Students roster ── */}
                  <TabsContent value="students" className="mt-4">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" /> Students
                      <Badge variant="secondary" className="ml-1">{classMembers.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {classMembers.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          No students have joined yet. Share the join code with your students!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {classMembers.map((member) => {
                          const progress = getStudentProgress(member)
                          const unassigned = getUnassignedLessons(member)
                          const name = memberName(member)

                          return (
                            <Card key={member.id} className="border">
                              <CardContent className="p-4">
                                {/* Student Info Row */}
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                      <GraduationCap className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">{name}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        {member.profile?.grade ? `Grade ${member.profile.grade}` : "No grade set"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-1.5"
                                      onClick={() => navigate(`/teacher/student/${member.user_id}`, {
                                        state: { name: memberName(member), className: selectedClass?.name },
                                      })}
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                      View work
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeStudent(member.id)}
                                    >
                                      <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Progress */}
                                {progress.total > 0 && (
                                  <div className="mb-3">
                                    <div className="flex items-center justify-between text-sm mb-1">
                                      <span className="text-muted-foreground">Lesson Progress</span>
                                      <span className="font-medium">{progress.completed}/{progress.total} completed</span>
                                    </div>
                                    <Progress value={progress.percent} variant={progress.percent === 100 ? "success" : "default"} />
                                  </div>
                                )}

                                {/* Assigned Lessons */}
                                {member.assignedLessons.length > 0 && (
                                  <div className="mb-3">
                                    <p className="text-sm font-medium mb-2 flex items-center gap-1">
                                      <BookOpen className="w-3.5 h-3.5" />
                                      Assigned Lessons
                                    </p>
                                    <div className="flex flex-col gap-1.5">
                                      {member.assignedLessons.map((assignment) => {
                                        const lesson = lessons.find(l => l.id === assignment.lesson_id)
                                        const done = member.completedLessonIds.includes(assignment.lesson_id)
                                        const pct = done ? 100 : (member.progressByLesson[assignment.lesson_id] ?? 0)
                                        const status = done ? "Completed" : pct > 0 ? `${pct}%` : "Not started"
                                        return (
                                          <div key={assignment.id} className="flex items-center gap-2">
                                            <Badge
                                              variant={done ? "default" : pct > 0 ? "secondary" : "outline"}
                                              className="flex items-center gap-1 cursor-pointer shrink-0"
                                              onClick={() => removeAssignment(assignment.id)}
                                              title="Click to remove assignment from class"
                                            >
                                              {done && <CheckCircle2 className="w-3 h-3" />}
                                              {lesson?.title || assignment.lesson_id}
                                              <Trash2 className="w-3 h-3 ml-1 opacity-50 hover:opacity-100" />
                                            </Badge>
                                            <Progress
                                              value={pct}
                                              variant={done ? "success" : "default"}
                                              className="h-1.5 flex-1 min-w-[40px]"
                                            />
                                            <span className={`text-[11px] tabular-nums shrink-0 w-16 text-right ${done ? "text-green-600" : pct > 0 ? "text-foreground" : "text-muted-foreground"}`}>
                                              {status}
                                            </span>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Assign Lesson Dropdown */}
                                {unassigned.length > 0 && (
                                  <div className="flex items-center gap-2">
                                    <LessonPicker
                                      lessons={unassigned}
                                      placeholder="Assign a lesson..."
                                      onSelect={(lessonId) => assignLesson(member.user_id, lessonId)}
                                      disabled={assigning === member.user_id}
                                    />
                                    {assigning === member.user_id && (
                                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                                    )}
                                  </div>
                                )}

                                {member.assignedLessons.length === 0 && (
                                  <p className="text-sm text-muted-foreground italic">
                                    No lessons assigned yet
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}

            {/* Unclaimed classes: adopt a class left behind by a departed teacher.
                Landing-only, below the classroom blocks. */}
            {!selectedClass && unclaimed.length > 0 && (
              <div>
                <h2 className="font-display text-lg font-bold mb-1">Unclaimed classes</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Left behind when a teacher deleted their account. Take one over to become its teacher, and the students come with it.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {unclaimed.map((cls) => (
                    <Card key={cls.id} variant="default" className="border-dashed border-warning/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{cls.name}</h3>
                            {cls.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{cls.description}</p>
                            )}
                            <Badge variant="secondary" className="font-mono mt-2">{cls.join_code}</Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={claimingId === cls.id}
                            onClick={() => claimClass(cls)}
                          >
                            {claimingId === cls.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <UserPlus className="w-4 h-4 mr-2" />
                            )}
                            Take over
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
      </main>
    </div>
  )
}
