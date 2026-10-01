// "My presentations & activities": the teacher's saved materials, newest
// first, each openable/deletable. Presentational - the parent owns the list.

import React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import type { TeacherMaterialRow } from "@/types/materials"
import { Presentation, ClipboardList, Trash2, Loader2, Pencil } from "lucide-react"

interface Props {
  materials: TeacherMaterialRow[]
  loading?: boolean
  onOpen: (row: TeacherMaterialRow) => void
  onDelete: (row: TeacherMaterialRow) => void
}

export function MyMaterials({ materials, loading, onOpen, onDelete }: Props) {
  const { t } = useTranslation()

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-6 justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t("common.loading", "Loading…")}
      </div>
    )
  }

  if (materials.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic py-6 text-center">
        {t("materials.emptySaved")}
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {materials.map((m) => {
        const isDeck = m.type === "deck"
        const count = isDeck
          ? (m.content as { slides?: unknown[] }).slides?.length ?? 0
          : m.lesson_ids.length
        return (
          <li
            key={m.id}
            className="flex items-center justify-between gap-2 p-3 rounded-lg border bg-card"
          >
            <button
              type="button"
              onClick={() => onOpen(m)}
              className="flex items-center gap-2 min-w-0 flex-1 text-left"
            >
              {isDeck ? (
                <Presentation className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <ClipboardList className="h-4 w-4 text-primary shrink-0" />
              )}
              <span className="min-w-0">
                <span className="block truncate font-medium">{m.title}</span>
                <span className="block text-xs text-muted-foreground">
                  {isDeck
                    ? t("materials.slidesCount", { count })
                    : t(`materials.format.${(m.content as { format?: string }).format ?? "team-challenge"}.title`)}
                  {" · "}
                  {t("materials.lessonsCount", { count: m.lesson_ids.length })}
                </span>
              </span>
            </button>
            <span className="flex shrink-0 items-center gap-1">
              <Button size="sm" variant="ghost" onClick={() => onOpen(m)}>
                <Pencil className="h-4 w-4 mr-1.5" />
                {t("materials.open")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive"
                onClick={() => onDelete(m)}
                aria-label={t("materials.delete")}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default MyMaterials
