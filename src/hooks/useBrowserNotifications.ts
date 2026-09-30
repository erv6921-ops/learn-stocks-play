import { useSyncExternalStore } from "react"
import {
  subscribe,
  getSnapshot,
  isSupported,
  getPermission,
  enableWithPermission,
  disable,
  type PushPermission,
} from "@/lib/browserNotifications"

interface BrowserNotificationsState {
  /** The browser exposes the Notification API at all. */
  supported: boolean
  /** Current OS permission: default / granted / denied / unsupported. */
  permission: PushPermission
  /** Opted-in AND permission still granted. */
  enabled: boolean
  /** Prompt for permission and, if granted, turn notifications on. */
  enable: () => Promise<PushPermission>
  /** Turn notifications off (no prompt). */
  disable: () => void
}

// Reactive view of the browser-notification preference for the Settings toggle.
export function useBrowserNotifications(): BrowserNotificationsState {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return {
    supported: isSupported(),
    permission: getPermission(),
    enabled,
    enable: enableWithPermission,
    disable,
  }
}
