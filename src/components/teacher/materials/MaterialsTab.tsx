// Orchestrates the multi-select lesson bank, generation (deck / activity),
// saving to public.teacher_materials, and the "My presentations & activities"
// list with reopen/edit/delete. Lives inside a class detail so "Assign all"
// has a class to assign to.

import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { SearchableLesson } from "@/lib/lessonSearch"
import type {
  ActivityContent,
  ActivityFormat,
  DeckContent,
  MaterialContent,
  TeacherMaterialRow,
} from "@/types/materials"
import {
  generateDeck,
  generateActivity,
  saveMaterial,
  listMaterials,
  updateMaterial,
  deleteMaterial,
} from "@/lib/materials/api"
import { TeacherLessonBank, type LessonGroup } from "./TeacherLessonBank"
import { ActivityFormatDialog } from "./ActivityFormatDialog"
import { DeckViewer } from "./DeckViewer"
import { ActivityViewer } from "./ActivityViewer"
import { MyMaterials } from "./MyMaterials"
import { Presentation } from "lucide-react"

const CAP = 12

interface Props {
  /** Built-in + approved generated lessons (the finder's list). */
  lessons: SearchableLesson[]
  /** Assign each id to the current class using the existing assign flow. */
  onAssignMany: (ids: string[]) => Promise<{ assigned: number; skipped: number }>
  /** Blocked (e.g. demo mode) - disables write actions. */
  blocked?: boolean
}

export function MaterialsTab({ lessons, onAssignMany, blocked }: Props) {
  const { t } = useTranslation()
  const { toast } = useToast()

  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [busy, setBusy] = useState(false)
  const [busyLabel, setBusyLabel] = useState("")
  const [formatOpen, setFormatOpen] = useState(false)

  const [materials, setMaterials] = useState<TeacherMaterialRow[]>([])
  const [loadingMaterials, setLoadingMaterials] = useState(true)

  // The material currently open in a viewer (existing row or freshly generated).
  const [editing, setEditing] = useState<{ row: TeacherMaterialRow; content: MaterialContent } | null>(null)
  const [savingEdit, setSavingEdit] = useState(false)

  const groups = useMemo<LessonGroup[]>(() => buildGroups(lessons, t("materials.otherUnit")), [lessons, t])

  const refreshMaterials = async () => {
    try {
      setMaterials(await listMaterials())
    } catch (e) {
      console.warn("load materials failed:", (e as Error).message)
    } finally {
      setLoadingMaterials(false)
    }
  }
  useEffect(() => {
    refreshMaterials()
  }, [])

  // ── selection ──
  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const setGroup = (ids: string[], select: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => (select ? next.add(id) : next.delete(id)))
      return next
    })
  const clear = () => setSelected(new Set())
  const selectedIds = () => Array.from(selected)

  // ── actions ──
  const handleAssignAll = async () => {
    if (blocked) return
    setBusy(true)
    setBusyLabel(t("materials.assigning"))
    try {
      const { assigned, skipped } = await onAssignMany(selectedIds())
      toast({
        title: t("materials.assignedToast", { count: assigned }),
        description: skipped > 0 ? t("materials.assignedSkipped", { count: skipped }) : undefined,
      })
      clear()
    } catch (e) {
      toast({ title: t("materials.assignFailed"), description: (e as Error).message, variant: "destructive" })
    } finally {
      setBusy(false)
    }
  }

  const openFreshMaterial = async (type: "deck" | "activity", content: MaterialContent) => {
    const ids = selectedIds()
    const row = await saveMaterial(type, content.title, ids, content)
    setMaterials((prev) => [row, ...prev])
    setEditing({ row, content })
    clear()
  }

  const handleMakePresentation = async () => {
    if (blocked || selected.size === 0 || selected.size > CAP) return
    setBusy(true)
    setBusyLabel(t("materials.buildingDeck"))
    try {
      const deck: DeckContent = await generateDeck(selectedIds(), lessons)
      await openFreshMaterial("deck", deck)
    } catch (e) {
      toast({ title: t("materials.generateFailed"), description: (e as Error).message, variant: "destructive" })
    } finally {
      setBusy(false)
    }
  }

  const handlePickFormat = async (format: ActivityFormat) => {
    setFormatOpen(false)
    if (blocked || selected.size === 0 || selected.size > CAP) return
    setBusy(true)
    setBusyLabel(t("materials.buildingActivity"))
    try {
      const activity: ActivityContent = await generateActivity(selectedIds(), lessons, format)
      await openFreshMaterial("activity", activity)
    } catch (e) {
      toast({ title: t("materials.generateFailed"), description: (e as Error).message, variant: "destructive" })
    } finally {
      setBusy(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editing) return
    setSavingEdit(true)
    try {
      await updateMaterial(editing.row.id, { title: editing.content.title, content: editing.content })
      setMaterials((prev) =>
        prev.map((m) => (m.id === editing.row.id ? { ...m, title: editing.content.title, content: editing.content } : m)),
      )
      toast({ title: t("materials.savedToast") })
    } catch (e) {
      toast({ title: t("materials.saveFailed"), description: (e as Error).message, variant: "destructive" })
    } finally {
      setSavingEdit(false)
    }
  }

  const handleDelete = async (row: TeacherMaterialRow) => {
    if (!window.confirm(t("materials.confirmDelete", { title: row.title }))) return
    try {
      await deleteMaterial(row.id)
      setMaterials((prev) => prev.filter((m) => m.id !== row.id))
      if (editing?.row.id === row.id) setEditing(null)
    } catch (e) {
      toast({ title: t("materials.deleteFailed"), description: (e as Error).message, variant: "destructive" })
    }
  }

  const closeViewer = () => setEditing(null)
  const editingIsDeck = editing?.content.kind === "deck"

  return (
    <div className="space-y-6">
      {/* Saved materials first, so a freshly generated deck/activity shows at
          the top of the tab (not scrolled off the bottom). Hidden until the
          teacher has at least one, to keep the bank front-and-center at first. */}
      {(loadingMaterials || materials.length > 0) && (
        <Card variant="elevated">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Presentation className="w-4 h-4 text-primary" />
              {t("materials.savedTitle")}
            </p>
            <MyMaterials
              materials={materials}
              loading={loadingMaterials}
              onOpen={(row) => setEditing({ row, content: row.content })}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      )}

      <Card variant="elevated">
        <CardContent className="pt-6">
          <p className="text-sm font-semibold mb-1 flex items-center gap-2">
            <Presentation className="w-4 h-4" />
            {t("materials.bankTitle")}
          </p>
          <p className="text-xs text-muted-foreground mb-4">{t("materials.bankHelp", { cap: CAP })}</p>
          <TeacherLessonBank
            groups={groups}
            selected={selected}
            cap={CAP}
            busy={busy}
            busyLabel={busyLabel}
            onToggle={toggle}
            onSetGroup={setGroup}
            onClear={clear}
            onAssignAll={handleAssignAll}
            onMakePresentation={handleMakePresentation}
            onMakeActivity={() => setFormatOpen(true)}
          />
        </CardContent>
      </Card>

      <ActivityFormatDialog open={formatOpen} onOpenChange={setFormatOpen} onPick={handlePickFormat} />

      {editing && editingIsDeck && (
        <DeckViewer
          open
          onOpenChange={(o) => !o && closeViewer()}
          deck={editing.content as DeckContent}
          onDeckChange={(deck) => setEditing((e) => (e ? { ...e, content: deck } : e))}
          onSave={handleSaveEdit}
          saving={savingEdit}
        />
      )}
      {editing && !editingIsDeck && (
        <ActivityViewer
          open
          onOpenChange={(o) => !o && closeViewer()}
          activity={editing.content as ActivityContent}
          onActivityChange={(a) => setEditing((e) => (e ? { ...e, content: a } : e))}
          onSave={handleSaveEdit}
          saving={savingEdit}
        />
      )}
    </div>
  )
}

/** Group built-in lessons by unit (curriculum order) + a Jeff-built group. */
function buildGroups(lessons: SearchableLesson[], otherLabel: string): LessonGroup[] {
  const generated = lessons.filter((l) => l.generated)
  const builtIn = lessons.filter((l) => !l.generated)
  const groups: LessonGroup[] = []
  const byUnit = new Map<string, LessonGroup>()
  for (const l of builtIn) {
    const title = l.unitTitle || otherLabel
    let g = byUnit.get(title)
    if (!g) {
      g = { key: `unit:${title}`, title, lessons: [] }
      byUnit.set(title, g)
      groups.push(g)
    }
    g.lessons.push(l)
  }
  if (generated.length) {
    groups.unshift({ key: "generated", title: "Jeff-built lessons", generated: true, lessons: generated })
  }
  return groups
}

export default MaterialsTab
