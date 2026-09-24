import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// i18n must initialise before any component calls t(); see src/i18n/index.ts.
import "./i18n";
import { initAccent } from "@/lib/accentTheme";

// Apply the saved accent theme before first paint.
initAccent();

async function clearStaleClientCaches() {
  if (typeof window === "undefined") return;

  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }

    if ("caches" in window) {
      const cacheKeys = await window.caches.keys();
      await Promise.all(cacheKeys.map((key) => window.caches.delete(key)));
    }
  } catch (error) {
    console.warn("[App] Failed to clear stale caches", error);
  }
}

void clearStaleClientCaches();

createRoot(document.getElementById("root")!).render(<App />);
