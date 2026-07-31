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
import { lessons } from "@/data/lessons"
import {
  Plus,
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
  return f || l ? `${f || ""} ${l || ""}`.trim() : "Unknown Student"
}

export default function TeacherDashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [classes, setClasses] = useState<Class[]>([])
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [classMembers, setClassMembers] = useState<ClassMember[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [newClassDescription, setNewClassDescription] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [assigning, setAssigning] = useState<string | null>(null) // user_id currently being assigned
  const [classWideLessonId, setClassWideLessonId] = useState<string>("")
  const [assigningAll, setAssigningAll] = useState(false)

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
        })

      if (error && error.code !== "23505") throw error

      toast({
        title: error?.code === "23505" ? "Already assigned" : `Assigned "${title}" to class`,
        description: error?.code === "23505"
          ? "This lesson is already assigned to the class."
          : "Every student in this class now has this lesson.",
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

  const selectClass = async (cls: Class) => {
    if (sampleMode) {
      setSelectedClass(cls)
      setClassMembers(sampleMembersRef.current[cls.id] || [])
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
    return lessons.filter(l => !assignedIds.has(l.id))
  }

  // ── Derived analytics for the charts ──
  const totalStudents = classes.reduce((s, c) => s + (c.student_count || 0), 0)
  const assignments = classMembers[0]?.assignedLessons ?? []

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
          </div>
        </div>
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
                            {/* Micro-business writing workload - per-class word-count control */}
                            <div className="mt-3">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                                Micro-business word count
                              </p>
                              <div className="inline-flex items-center rounded-lg bg-muted/60 p-0.5 border border-border/40">
                                {WRITING_LEVELS.map(lvl => {
                                  const active = (cls.writing_scale ?? 1) === lvl.value
                                  return (
                                    <button
                                      key={lvl.value}
                                      title={lvl.hint}
                                      onClick={(e) => { e.stopPropagation(); setWritingScale(cls.id, lvl.value) }}
                                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                                        active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                      }`}
                                    >
                                      {lvl.label}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
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
                  <CardContent>
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Assign a lesson to the entire class
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Pick any lesson - every student in this class will be required to complete it.
                      </p>
                      <div className="flex gap-2">
                        <Select value={classWideLessonId} onValueChange={setClassWideLessonId} disabled={assigningAll}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Choose a lesson..." />
                          </SelectTrigger>
                          <SelectContent className="max-h-[400px]">
                            {lessons.map((lesson) => (
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
                  </CardContent>
                </Card>

                {/* Analytics */}
                {classMembers.length > 0 && (
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
                )}

                {/* Students roster */}
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
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
