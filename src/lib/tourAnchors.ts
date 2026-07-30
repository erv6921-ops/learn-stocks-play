// Lightweight anchor registry for the Jeff tour.
//
// Instead of the tour searching the DOM for each step (querySelector + polling,
// which lagged a step behind and made page changes feel like they were hunting
// for the element), every tour target registers its own DOM node here via the
// `anchor(id)` ref helper. The tour just reads the node it needs and is notified
// the moment a not-yet-mounted target (e.g. on a freshly navigated page) appears.

type Listener = () => void

class TourAnchorRegistry {
  private nodes = new Map<string, Set<HTMLElement>>()
  private listeners = new Set<Listener>()

  add(id: string, el: HTMLElement) {
    let set = this.nodes.get(id)
    if (!set) { set = new Set(); this.nodes.set(id, set) }
    if (!set.has(el)) { set.add(el); this.emit() }
  }

  // First on-screen node for an id. Skips hidden duplicates (e.g. the desktop vs.
  // mobile nav share an id - only one is visible) and purges unmounted nodes.
  get(id: string): HTMLElement | null {
    const set = this.nodes.get(id)
    if (!set) return null
    let visible: HTMLElement | null = null
    for (const el of set) {
      if (!el.isConnected) { set.delete(el); continue }
      if (!visible) {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && r.height > 0) visible = el
      }
    }
    return visible
  }

  subscribe(cb: Listener) { this.listeners.add(cb); return () => { this.listeners.delete(cb) } }
  private emit() { this.listeners.forEach(cb => cb()) }
}

export const tourAnchors = new TourAnchorRegistry()

// Ref helper: <div ref={anchor("nav-stocks")} />
export const anchor = (id: string) => (el: HTMLElement | null) => { if (el) tourAnchors.add(id, el) }
