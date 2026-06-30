// Maps the icon-name strings used in bizLab.ts data to lucide-react components,
// so content can stay as plain data while the UI renders real icons.
import {
  Lightbulb,
  ClipboardList,
  Palette,
  Clapperboard,
  Globe,
  Trophy,
  Crown,
  type LucideIcon,
} from "lucide-react"

const ICONS: Record<string, LucideIcon> = {
  Lightbulb,
  ClipboardList,
  Palette,
  Clapperboard,
  Globe,
  Trophy,
  Crown,
}

export function bizIcon(name: string): LucideIcon {
  return ICONS[name] ?? Lightbulb
}
