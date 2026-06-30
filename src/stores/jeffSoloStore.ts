import { create } from "zustand"

// Ephemeral (non-persisted) flag: true while the Gulliver Biz Lab shows its own
// large side-rail Jeff. The global corner JeffWidget reads this and hides itself
// so there is only ever one Jeff on screen at a time.
interface JeffSoloState {
  sidekickActive: boolean
  setSidekickActive: (v: boolean) => void
}

export const useJeffSolo = create<JeffSoloState>(set => ({
  sidekickActive: false,
  setSidekickActive: sidekickActive => set({ sidekickActive }),
}))
