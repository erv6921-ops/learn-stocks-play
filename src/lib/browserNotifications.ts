// ───────────────────────────────────────────────────────────
// Browser (OS-level) notifications - student opt-in.
//
// A thin wrapper over the Web Notification API. Students opt in from the
// Settings card on their profile; once the OS grants permission, live events
// (a lesson/business grade posted, new classwork/homework, a friend request)
// fire a native notification WHEN THE APP ISN'T THE FOCUSED WINDOW - so they
// hear about it without staring at the app. The in-app modals + notification
// bell still
// handle everything while the tab is focused; this only adds an alert for when
// InvestiPlay isn't the tab the student is looking at.
//
// Notifications are posted through the app's existing (PWA/Workbox) service
// worker via registration.showNotification() - the same path WhatsApp/Snapchat
// use, which browsers show reliably where the older `new Notification()`
// constructor is quietly dropped. Clicks are handled by a notificationclick
// listener imported into that SW (public/notif-sw.js). There's still no push
// SERVER, so notifications fire only while a tab is open (foreground or
// backgrounded); true closed-tab push would need a backend push service (VAPID
// keys + an edge function to send) - tracked as a follow-up, out of scope here.
//
// Plain external store + useSyncExternalStore so the Settings toggle can
// reflect the on/off state without a provider. The preference persists to
// localStorage; "enabled" always means opted-in AND permission still granted.
// ───────────────────────────────────────────────────────────

const PREF_KEY = "investiplay_push_enabled"

export type PushPermission = "default" | "granted" | "denied" | "unsupported"

export function isSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window
}

export function getPermission(): PushPermission {
  if (!isSupported()) return "unsupported"
  return Notification.permission as PushPermission
}

function loadPref(): boolean {
  try {
    return localStorage.getItem(PREF_KEY) === "true"
  } catch {
    return false
  }
}

let optedIn = loadPref()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(PREF_KEY, optedIn ? "true" : "false")
  } catch {
    /* ignore quota / private-mode errors */
  }
}

function emit() {
  persist()
  listeners.forEach((l) => l())
}

export function subscribe(cb: () => void): () => void {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

// Enabled = the student turned it on AND the OS still grants permission. If they
// revoke permission in browser settings this flips back to false on its own.
export function isEnabled(): boolean {
  return optedIn && getPermission() === "granted"
}

// Boolean primitive - stable by value for useSyncExternalStore.
export function getSnapshot(): boolean {
  return isEnabled()
}

// Turn the preference off. No permission prompt involved.
export function disable() {
  if (!optedIn) return
  optedIn = false
  emit()
}

// Ask the OS for permission and, if granted, flip the preference on. Returns the
// resulting permission so the caller can tell the student what happened
// (granted / denied / unsupported).
export async function enableWithPermission(): Promise<PushPermission> {
  if (!isSupported()) return "unsupported"
  let perm = Notification.permission
  if (perm === "default") {
    try {
      perm = await Notification.requestPermission()
    } catch {
      // Very old browsers only expose the callback form - fall back to it.
      perm = await new Promise<NotificationPermission>((resolve) => {
        try {
          Notification.requestPermission(resolve)
        } catch {
          resolve(Notification.permission)
        }
      })
    }
  }
  optedIn = perm === "granted"
  emit()
  return perm as PushPermission
}

export interface NotifyOptions {
  title: string
  body?: string
  tag?: string // collapse repeats of the same kind (e.g. one grade notice)
  url?: string // focus the tab and navigate here when the notification is clicked
  force?: boolean // fire even when the app is focused (default: only when unfocused)
}

// Fire a native notification - but only when it actually helps: supported,
// opted-in, permission granted, and (unless forced) the app window isn't
// focused, so we never double up with the on-screen modal/toast a student
// who's actively looking at InvestiPlay is already seeing.
//
// We gate on document.hasFocus() rather than visibilityState on purpose:
// visibilityState only goes "hidden" when the tab is fully out of view (another
// tab active, window minimised), so two windows side by side - a common way to
// use a second account - would both read "visible" and suppress the alert.
// hasFocus() is false whenever InvestiPlay isn't the focused window, which is
// exactly "the tab isn't focused".
export function notify(opts: NotifyOptions): void {
  if (!isEnabled()) return
  if (!opts.force && typeof document !== "undefined" && document.hasFocus()) return

  const options: NotificationOptions = {
    body: opts.body,
    tag: opts.tag,
    icon: "/icons/jeff-192.png",
    badge: "/icons/jeff-badge.png",
    // The service worker's notificationclick handler (public/notif-sw.js) reads
    // this to focus/navigate the right tab.
    data: opts.url ? { url: opts.url } : undefined,
  }

  // Prefer the service worker's showNotification(): browsers treat it as a
  // first-class notification (the same path WhatsApp/Snapchat use) and several
  // quietly drop the older `new Notification()` constructor even when
  // permission is granted. Fall back to the constructor only if there's no SW.
  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((reg) => reg.showNotification(opts.title, options))
      .catch(() => fallbackNotify(opts, options))
    return
  }
  fallbackNotify(opts, options)
}

// Last-resort path when no service worker is available. The constructor form
// handles its own click (focus + navigate) since there's no SW to do it.
function fallbackNotify(opts: NotifyOptions, options: NotificationOptions): void {
  try {
    const n = new Notification(opts.title, options)
    n.onclick = () => {
      try {
        window.focus()
        if (opts.url && window.location.pathname !== opts.url) {
          window.location.href = opts.url
        }
      } catch {
        /* ignore */
      }
      n.close()
    }
  } catch {
    // Some engines throw if a Notification is constructed without an active
    // service worker; swallow so a notification failure never breaks the app.
  }
}
