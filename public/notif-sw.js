// Imported into the generated Workbox service worker (see vite.config.ts →
// workbox.importScripts). Handles clicks on notifications posted via
// registration.showNotification() from src/lib/browserNotifications.ts.
//
// Focuses an already-open InvestiPlay tab (navigating it to the notification's
// target) or opens a new one. The target url is carried on notification.data.url.
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  const url = (event.notification.data && event.notification.data.url) || "/"
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            client.focus()
            if ("navigate" in client && url) {
              client.navigate(url).catch(() => {
                /* cross-origin / detached client - ignore */
              })
            }
            return
          }
        }
        if (self.clients.openWindow) return self.clients.openWindow(url)
      }),
  )
})
