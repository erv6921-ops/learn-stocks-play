import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { JeffMascot } from "@/components/JeffMascot"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  CheckCircle2
} from "lucide-react"

interface Class {
  id: string
  name: string
  description: string | null
  join_code: string
  created_at: string
  student_count?: number
}

interface AssignedLesson {
  id: string
  lesson_id: string
  completed: boolean
  completed_at: string | null
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

  const assignLessonToClass = async () => {
    if (!selectedClass || !classWideLessonId) return
    if (classMembers.length === 0) {
      toast({ title: "No students in this class yet", variant: "destructive" })
      return
    }
    setAssigningAll(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const rows = classMembers.map(m => ({
        class_id: selectedClass.id,
        student_user_id: m.user_id,
        lesson_id: classWideLessonId,
        assigned_by: user.id,
      }))

      // Insert each — ignore duplicates (unique violations)
      const results = await Promise.all(
        rows.map(r =>
          supabase.from("assigned_lessons").insert(r).then(res => res)
        )
      )
      const inserted = results.filter(r => !r.error).length
      const dupes = results.filter(r => r.error?.code === "23505").length
      const failed = results.length - inserted - dupes

      const title = lessons.find(l => l.id === classWideLessonId)?.title
      toast({
        title: `Assigned "${title}" to class`,
        description: `${inserted} new · ${dupes} already had it${failed ? ` · ${failed} failed` : ""}`,
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

      // Check if user is a teacher
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single()

      if (userRole?.role !== "teacher") {
        navigate("/dashboard")
        return
      }

      await loadClasses()
    } catch (error) {
      console.error("Auth check failed:", error)
      navigate("/auth")
    }
  }

  const loadClasses = async () => {
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

      const membersWithProfiles = await Promise.all(
        (data || []).map(async (member) => {
          const [profileRes, assignmentsRes] = await Promise.all([
            supabase
              .from("profiles")
              .select("first_name, last_name, email, school_name, grade")
              .eq("id", member.user_id)
              .single(),
            supabase
              .from("assigned_lessons")
              .select("id, lesson_id, completed, completed_at")
              .eq("class_id", classId)
              .eq("student_user_id", member.user_id)
          ])

          return {
            ...member,
            profile: profileRes.data,
            assignedLessons: (assignmentsRes.data || []) as AssignedLesson[]
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
    setAssigning(studentUserId)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase
        .from("assigned_lessons")
        .insert({
          class_id: selectedClass.id,
          student_user_id: studentUserId,
          lesson_id: lessonId,
          assigned_by: user.id,
        })

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already assigned",
            description: "This lesson is already assigned to this student.",
            variant: "destructive",
          })
          return
        }
        throw error
      }

      toast({
        title: "Lesson assigned!",
        description: `Assigned "${lessons.find(l => l.id === lessonId)?.title}" successfully.`,
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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/auth")
  }

  const selectClass = async (cls: Class) => {
    setSelectedClass(cls)
    await loadClassMembers(cls.id)
  }

  const getStudentProgress = (member: ClassMember) => {
    const completed = member.assignedLessons.filter(a => a.completed).length
    const total = member.assignedLessons.length
    return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }

  const getUnassignedLessons = (member: ClassMember) => {
    const assignedIds = new Set(member.assignedLessons.map(a => a.lesson_id))
    return lessons.filter(l => !assignedIds.has(l.id))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <JeffMascot size="sm" mood="happy" />
            <div>
              <h1 className="font-display text-xl font-bold">Teacher Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your classes</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Classes List */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold">Your Classes</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={loadClasses}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
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
                {classes.map((cls) => (
                  <Card
                    key={cls.id}
                    variant={selectedClass?.id === cls.id ? "elevated" : "default"}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass?.id === cls.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => selectClass(cls)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{cls.name}</h3>
                          {cls.description && (
                            <p className="text-sm text-muted-foreground mt-1">
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
                ))}
              </div>
            )}
          </div>

          {/* Student List */}
          <div className="lg:col-span-2">
            {selectedClass ? (
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedClass.name}</CardTitle>
                      <CardDescription>
                        Share code <strong className="font-mono text-primary">{selectedClass.join_code}</strong> with students to join
                      </CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => copyJoinCode(selectedClass.join_code)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Class-wide assign */}
                  <div className="mb-6 p-4 rounded-lg border bg-muted/30">
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Assign a lesson to the entire class
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Pick any lesson — every student in this class will be required to complete it.
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
                      <Button
                        onClick={assignLessonToClass}
                        disabled={!classWideLessonId || assigningAll || classMembers.length === 0}
                      >
                        {assigningAll ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4 mr-2" />
                        )}
                        Assign to Class
                      </Button>
                    </div>
                  </div>

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
                        const name = member.profile?.first_name || member.profile?.last_name
                          ? `${member.profile.first_name || ""} ${member.profile.last_name || ""}`.trim()
                          : "Unknown Student"

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
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeStudent(member.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
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
                                      return (
                                        <Badge
                                          key={assignment.id}
                                          variant={assignment.completed ? "default" : "secondary"}
                                          className="flex items-center gap-1 cursor-pointer"
                                          onClick={() => removeAssignment(assignment.id)}
                                          title="Click to remove assignment"
                                        >
                                          {assignment.completed && <CheckCircle2 className="w-3 h-3" />}
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
            ) : (
              <Card variant="elevated">
                <CardContent className="p-12 text-center">
                  <JeffMascot size="lg" mood="teaching" message="Select a class to view students" />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
