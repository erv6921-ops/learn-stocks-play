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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useToast } from "@/hooks/use-toast"
import TeacherPredictionView from "@/components/StockPredictionDraft/TeacherPredictionView"
import { lessons, getLessonsByTrack } from "@/data/lessons"
import { useApp } from "@/contexts/AppContext"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ClassSettings,
  DEFAULT_CLASS_SETTINGS,
  CONTROLLABLE_PAGES,
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
  BarChart3,
  TrendingUp,
  Sparkles,
  Settings,
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

export default function TeacherDashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user: appUser } = useApp()

  // Scope the assignable-lesson list to the teacher's program. A Gulliver Intro
  // teacher only assigns the 8 LO lessons; every other track keeps the full
  // curriculum. (CourseTrack "gulliver-intro" vs the enrollment "gulliver_intro".)
  const assignableLessons = appUser?.track === "gulliver_intro"
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
        return {
          id: `${classId}-m${i}`,
          user_id: `${classId}-u${i}`,
          joined_at: new Date().toISOString(),
          profile: { first_name: firstNames[i % firstNames.length], last_name: `${String.fromCharCode(65 + i)}.`, email: "", school_name: "Demo High", grade: 10 },
          assignedLessons: assigned,
          completedLessonIds: assigned.slice(0, k).map((a) => a.lesson_id),
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
        .select("id, lesson_id, assigned_at")
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
              .select("lesson_id")
              .eq("user_id", member.user_id)
              .eq("completed", true)
          ])

          return {
            ...member,
            profile: profileRes.data,
            assignedLessons: classAssignments,
            completedLessonIds: (progressRes.data || []).map((p: any) => p.lesson_id),
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

  const studentsPerClass = useMemo(
    () => classes.map((c) => ({ name: shorten(c.name, 16), students: c.student_count || 0 })),
    [classes]
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const kpis = [
    { label: "Classes", value: String(classes.length), icon: GraduationCap, color: C.green },
    { label: "Students", value: String(totalStudents), icon: Users, color: C.blue },
    { label: "Avg completion", value: selectedClass ? `${avgCompletion}%` : "-", icon: Percent, color: C.gold },
    { label: "Assignments", value: selectedClass ? String(assignments.length) : "-", icon: ClipboardList, color: C.purple },
  ]

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

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <Card key={k.label} variant="elevated">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${k.color}1a` }}>
                  <k.icon className="w-5 h-5" style={{ color: k.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-extrabold leading-none tabular-nums">{k.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{k.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Classes List */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold">Your Classes</h2>
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

            {classes.length === 0 ? (
              <Card variant="elevated">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No classes yet. Create your first class to get started!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {classes.map((cls) => {
                  const active = selectedClass?.id === cls.id
                  return (
                    <Card
                      key={cls.id}
                      variant={active ? "elevated" : "default"}
                      className={`cursor-pointer transition-all hover:shadow-md ${active ? "ring-2 ring-primary" : ""}`}
                      onClick={() => selectClass(cls)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{cls.name}</h3>
                            {cls.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {cls.description}
                              </p>
                            )}
                            <div className="flex items-center gap-3 mt-2">
                              <Badge variant="secondary" className="font-mono">
                                {cls.join_code}
                              </Badge>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {cls.student_count} students
                              </span>
                            </div>
                            {/* Micro-business word-count control temporarily hidden
                                (feature still in progress). Restore this block to
                                bring back the per-class Light/Standard/Extended
                                writing-workload picker. */}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                copyJoinCode(cls.join_code)
                              }}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteClass(cls.id)
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Unclaimed classes: adopt a class left behind by a departed teacher. */}
            {unclaimed.length > 0 && (
              <div className="mt-6">
                <h2 className="font-display text-lg font-bold mb-1">Unclaimed classes</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Left behind when a teacher deleted their account. Take one over to become its teacher, and the students come with it.
                </p>
                <div className="space-y-3">
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

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            {!selectedClass ? (
              <>
                {classes.length > 0 && (
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-primary" /> Students per class
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={Math.max(180, studentsPerClass.length * 42)}>
                        <BarChart data={studentsPerClass} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                          <CartesianGrid horizontal={false} stroke={C.grid} />
                          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                          <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
                          <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }} />
                          <Bar dataKey="students" fill={C.blue} radius={[0, 6, 6, 0]} barSize={18} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}
                <Card variant="elevated">
                  <CardContent className="p-12 text-center">
                    <JeffMascot size="lg" mood="teaching" message="Select a class to view students & analytics" />
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Class header + class-wide assign */}
                <Card variant="elevated">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <CardTitle className="truncate">{selectedClass.name}</CardTitle>
                        <CardDescription>
                          Share code <strong className="font-mono text-primary">{selectedClass.join_code}</strong> with students to join
                        </CardDescription>
                      </div>
                      <Button variant="outline" onClick={() => copyJoinCode(selectedClass.join_code)} className="shrink-0">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Code
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                <Tabs defaultValue="students" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="assign">Assign</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                      <div className="flex gap-2">
                        <Select value={classWideLessonId} onValueChange={setClassWideLessonId} disabled={assigningAll}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Choose a lesson..." />
                          </SelectTrigger>
                          <SelectContent className="max-h-[400px]">
                            {assignableLessons.map((lesson) => (
                              <SelectItem key={lesson.id} value={lesson.id}>
                                {lesson.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                                  <span className="truncate font-medium">{lesson?.title || a.lesson_id}</span>
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
                                    <div className="flex flex-wrap gap-2">
                                      {member.assignedLessons.map((assignment) => {
                                        const lesson = lessons.find(l => l.id === assignment.lesson_id)
                                        const done = member.completedLessonIds.includes(assignment.lesson_id)
                                        return (
                                          <Badge
                                            key={assignment.id}
                                            variant={done ? "default" : "secondary"}
                                            className="flex items-center gap-1 cursor-pointer"
                                            onClick={() => removeAssignment(assignment.id)}
                                            title="Click to remove assignment from class"
                                          >
                                            {done && <CheckCircle2 className="w-3 h-3" />}
                                            {lesson?.title || assignment.lesson_id}
                                            <Trash2 className="w-3 h-3 ml-1 opacity-50 hover:opacity-100" />
                                          </Badge>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Assign Lesson Dropdown */}
                                {unassigned.length > 0 && (
                                  <div className="flex items-center gap-2">
                                    <Select
                                      onValueChange={(lessonId) => assignLesson(member.user_id, lessonId)}
                                      disabled={assigning === member.user_id}
                                    >
                                      <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Assign a lesson..." />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {unassigned.map((lesson) => (
                                          <SelectItem key={lesson.id} value={lesson.id}>
                                            {lesson.title}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
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
          </div>
        </div>
      </main>
    </div>
  )
}
