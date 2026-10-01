// Multi-select lesson bank for the teacher dashboard. Lessons are grouped by
// unit (built-in) plus a "Jeff-built" group; each row has a checkbox and each
// group header can select/clear all of its lessons. A sticky action bar at the
// bottom shows the selection count and the batch actions.

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { SearchableLesson } from "@/lib/lessonSearch"
import { rankLessons } from "@/lib/lessonSearch"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Presentation,
  ClipboardList,
  Plus,
  X,
  Loader2,
  Search,
} from "lucide-react"

export interface LessonGroup {
  key: string
  title: string
  generated?: boolean
  lessons: SearchableLesson[]
}

interface Props {
  groups: LessonGroup[]
  selected: Set<string>
  cap: number
  busy?: boolean
  /** Shown next to a spinner while a batch action runs (assign/generate). */
  busyLabel?: string
  onToggle: (id: string) => void
  onSetGroup: (ids: string[], select: boolean) => void
  onClear: () => void
  onAssignAll: () => void
  onMakePresentation: () => void
  onMakeActivity: () => void
}

export function TeacherLessonBank({
  groups,
  selected,
  cap,
  busy,
  busyLabel,
  onToggle,
  onSetGroup,
  onClear,
  onAssignAll,
  onMakePresentation,
  onMakeActivity,
}: Props) {
  const { t } = useTranslation()
  const [query, setQuery] = useState("")
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  // Filter within each group by the same topic search the finder uses.
  const shownGroups = useMemo(() => {
    const q = query.trim()
    if (!q) return groups
    return groups
      .map((g) => ({ ...g, lessons: rankLessons(g.lessons, q).map((r) => r.lesson) }))
      .filter((g) => g.lessons.length > 0)
  }, [groups, query])

  const count = selected.size
  const overCap = count > cap

  const toggleCollapse = (key: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  return (
    <div className="relative">
      <div className="mb-3 relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("materials.searchPlaceholder")}
          className="pl-8"
        />
      </div>

      <div className="space-y-4 pb-24">
        {shownGroups.length === 0 && (
          <p className="text-sm text-muted-foreground italic py-6 text-center">
            {t("materials.noLessons")}
          </p>
        )}
        {shownGroups.map((g) => {
          const ids = g.lessons.map((l) => l.id)
          const selectedInGroup = ids.filter((id) => selected.has(id)).length
          const allSelected = selectedInGroup === ids.length && ids.length > 0
          const isCollapsed = collapsed.has(g.key)
          return (
            <div key={g.key} className="rounded-lg border bg-card">
              <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/30">
                <button
                  type="button"
                  onClick={() => toggleCollapse(g.key)}
                  className="text-muted-foreground hover:text-foreground shrink-0"
                  aria-label={isCollapsed ? t("materials.expand") : t("materials.collapse")}
                >
                  {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <span className="font-semibold text-sm min-w-0 truncate flex-1">
                  {g.generated && (
                    <span className="mr-1.5 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-px text-[10px] font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                      {t("materials.jeffBuilt")}
                    </span>
                  )}
                  {g.title}
                </span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {selectedInGroup > 0 ? `${selectedInGroup}/${ids.length}` : ids.length}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs shrink-0"
                  onClick={() => onSetGroup(ids, !allSelected)}
                >
                  {allSelected ? t("materials.clearUnit") : t("materials.selectAllUnit")}
                </Button>
              </div>
              {!isCollapsed && (
                <ul>
                  {g.lessons.map((l) => {
                    const isSel = selected.has(l.id)
                    return (
                      <li key={l.id}>
                        <label
                          className={cn(
                            "flex items-start gap-3 px-3 py-2 cursor-pointer border-b last:border-b-0 hover:bg-muted/40 transition-colors",
                            isSel && "bg-primary/5",
                          )}
                        >
                          <Checkbox
                            checked={isSel}
                            onCheckedChange={() => onToggle(l.id)}
                            className="mt-0.5 shrink-0"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium truncate">{l.title}</span>
                            {l.description && (
                              <span className="block text-xs text-muted-foreground truncate">
                                {l.description}
                              </span>
                            )}
                          </span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </div>

      {/* Sticky action bar */}
      {count > 0 && (
        <div className="sticky bottom-0 left-0 right-0 z-10 mt-2 rounded-xl border bg-background/95 backdrop-blur shadow-lg p-3">
          {busy && busyLabel && (
            <div className="mb-2 flex items-center gap-2 text-sm text-primary">
              <Loader2 className="h-4 w-4 animate-spin" />
              {busyLabel}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <BookOpen className="h-3.5 w-3.5 mr-1" />
              {t("materials.selectedCount", { count })}
            </Badge>
            {overCap && (
              <span className="text-xs text-amber-600 dark:text-amber-400">
                {t("materials.overCap", { cap })}
              </span>
            )}
            <div className="flex-1" />
            <Button size="sm" variant="outline" onClick={onAssignAll} disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Plus className="h-4 w-4 mr-1.5" />}
              {t("materials.assignAll")}
            </Button>
            <Button size="sm" onClick={onMakePresentation} disabled={busy || overCap}>
              <Presentation className="h-4 w-4 mr-1.5" />
              {t("materials.makePresentation")}
            </Button>
            <Button size="sm" onClick={onMakeActivity} disabled={busy || overCap}>
              <ClipboardList className="h-4 w-4 mr-1.5" />
              {t("materials.makeActivity")}
            </Button>
            <Button size="sm" variant="ghost" onClick={onClear} disabled={busy}>
              <X className="h-4 w-4 mr-1.5" />
              {t("materials.clear")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeacherLessonBank
