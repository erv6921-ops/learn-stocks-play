// Topic-based lesson picker for the teacher dashboard.
//
// The teacher describes what they want to teach ("how compound interest
// grows savings") and the list narrows to matching lessons, ranked by
// relevance (src/lib/lessonSearch.ts), so the wording never has to match a
// title exactly. When nothing fits (or whenever they like) they can hand the
// description to Jeff and have a lesson created from it (`onCreate`).
//
// Non-modal Popover + Command, same as the picker it replaces: the list can
// run to ~300 lessons and a modal Select would lock body scroll on touch
// devices. Filtering is ours (shouldFilter=false), not cmdk's substring match.
import React, { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { isMeaningfulQuery, rankLessons, type SearchableLesson } from "@/lib/lessonSearch"
import { Check, ChevronsUpDown, Sparkles } from "lucide-react"

const MAX_RESULTS = 15

export interface LessonFinderProps<T extends SearchableLesson> {
  lessons: T[]
  value?: string
  onSelect: (id: string) => void
  placeholder?: string
  disabled?: boolean
  /** When given, the list offers "Create a lesson about ..." (always, and front and center when nothing matches). */
  onCreate?: (description: string) => void
  className?: string
}

export function LessonFinder<T extends SearchableLesson>({
  lessons,
  value,
  onSelect,
  placeholder = "Describe the topic you want to teach...",
  disabled,
  onCreate,
  className,
}: LessonFinderProps<T>) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const selected = lessons.find((l) => l.id === value)

  const results = useMemo(() => {
    const ranked = rankLessons(lessons, query)
    return query.trim() ? ranked.slice(0, MAX_RESULTS) : ranked
  }, [lessons, query])
  const searching = isMeaningfulQuery(query)
  const trimmed = query.trim()

  const pick = (id: string) => {
    onSelect(id)
    setOpen(false)
  }
  const create = () => {
    if (!onCreate) return
    setOpen(false)
    onCreate(trimmed)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("flex-1 justify-between font-normal min-w-0", className)}
        >
          <span className="truncate">{selected?.title ?? placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[300px]" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Describe the topic, e.g. how credit scores work"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {results.length === 0 ? (
              <div className="px-3 py-4 text-sm">
                <p className="text-muted-foreground">
                  {searching ? "No lesson covers that yet." : "No lessons to choose from."}
                </p>
                {onCreate && searching && (
                  <Button type="button" size="sm" className="mt-3 w-full" onClick={create}>
                    <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                    Have Jeff create this lesson
                  </Button>
                )}
              </div>
            ) : (
              <CommandGroup heading={searching ? `Best matches for "${trimmed}"` : "All lessons"}>
                {results.map(({ lesson }) => {
                  const sub = lesson.generated
                    ? "Built by Jeff for your class"
                    : [lesson.unitTitle, lesson.description].filter(Boolean).join(" · ")
                  return (
                    <CommandItem key={lesson.id} value={lesson.id} onSelect={() => pick(lesson.id)} className="items-start">
                      <Check className={cn("mr-2 mt-0.5 h-4 w-4 shrink-0", value === lesson.id ? "opacity-100" : "opacity-0")} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">
                          {lesson.title}
                          {lesson.generated && (
                            <span className="ml-1.5 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-px text-[10px] font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                              Jeff-built
                            </span>
                          )}
                        </span>
                        {sub && <span className="block truncate text-xs text-muted-foreground">{sub}</span>}
                      </span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )}
            {onCreate && results.length > 0 && (
              <CommandGroup heading="Not what you need?">
                <CommandItem value="__create__" onSelect={create} className="text-primary">
                  <Sparkles className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {searching ? `Have Jeff create a lesson about "${trimmed}"` : "Have Jeff create a new lesson from a description"}
                  </span>
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default LessonFinder
