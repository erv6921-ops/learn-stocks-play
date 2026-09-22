import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import { useAuth } from "@/hooks/useAuth"
import { useJeff, JeffActivity } from "@/contexts/JeffContext"
import { useJeffSolo } from "@/stores/jeffSoloStore"
import { JeffMascot } from "./JeffMascot"
import { SpeechBubble } from "./SpeechBubble"
import { JeffTutorPanel } from "./JeffTutorPanel"

const HIDDEN_ROUTES = ["/auth", "/login", "/signup", "/onboarding", "/reset-password", "/forgot-password"]

// Ask Jeff pricing, mirrored from the jeff-chat edge function (JEFF_CHAT_COST).
const ASK_JEFF_COST = 200
// localStorage flag: the one-time "each question costs coins" note was seen.
const COST_NOTE_KEY = "ip_jeff_cost_note_seen"

function costNoteSeen(): boolean {
  try { return localStorage.getItem(COST_NOTE_KEY) === "1" } catch { return true }
}
function markCostNoteSeen() {
  try { localStorage.setItem(COST_NOTE_KEY, "1") } catch { /* ignore */ }
}

// How the whole widget moves for roaming activities.
function containerAnim(activity: JeffActivity, w: number, h: number) {
  const distX = Math.min(w * 0.62, 360)
  const distY = Math.min(h * 0.55, 320)
  switch (activity) {
    case "walkAcross":
      return { animate: { x: [0, -distX, -distX, 0], y: 0 }, transition: { duration: 8, times: [0, 0.45, 0.55, 1], ease: "easeInOut" as const } }
    case "walkSide":
      return { animate: { x: 0, y: [0, -distY, -distY, 0] }, transition: { duration: 8, times: [0, 0.45, 0.55, 1], ease: "easeInOut" as const } }
    case "jump":
      return { animate: { x: 0, y: [0, -46, 0, -28, 0] }, transition: { duration: 1.3, times: [0, 0.3, 0.55, 0.8, 1], ease: "easeOut" as const } }
    default:
      return { animate: { x: 0, y: 0 }, transition: { type: "spring" as const, stiffness: 120, damping: 18 } }
  }
}

// Little props/scene that accompany an activity, drawn around Jeff.
// Exported so other Jeff stages (e.g. the lesson classroom) can reuse them.
export function JeffScene({ activity }: { activity: JeffActivity }) {
  if (activity === "nap") {
    return (
      <div
        className="absolute left-0 right-0 -bottom-0.5 h-5 md:h-7 rounded-full"
        style={{ background: "#f3ead2", boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.08)", transform: "rotate(-4deg)" }}
        aria-hidden
      />
    )
  }
  if (activity === "cook") {
    return (
      <div className="absolute right-full bottom-0 mr-0.5 flex flex-col items-center pointer-events-none" aria-hidden>
        <div className="relative leading-none">
          {[0, 0.5, 1].map((d, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 -translate-x-1/2 -top-3 text-[8px] md:text-[10px] text-slate-400"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.8, 0], y: [-2, -12, -18] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: d, ease: "easeOut" }}
              style={{ left: `${40 + i * 12}%` }}
            >
              ∿
            </motion.span>
          ))}
          <span className="text-base md:text-2xl">🍳</span>
        </div>
      </div>
    )
  }
  if (activity === "pack") {
    return (
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 flex items-end pointer-events-none" aria-hidden>
        <div className="relative">
          {["🍎", "🧭", "🗺️"].map((it, i) => (
            <motion.span
              key={it}
              className="absolute left-1/2 -translate-x-1/2 text-[10px] md:text-sm"
              initial={{ opacity: 0, y: -22 }}
              animate={{ opacity: [0, 1, 1, 0], y: [-22, -4, -4, -2] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: "easeIn" }}
            >
              {it}
            </motion.span>
          ))}
          <span className="text-base md:text-2xl">🎒</span>
        </div>
      </div>
    )
  }
  return null
}

export function JeffWidget() {
  const location = useLocation()
  const { user } = useApp()
  // Server-side role (user_roles) - the same check App.tsx and the global
  // notification widgets use. Resolves a beat after mount, so the cached
  // profile role below covers the first render.
  const { isTeacher: hasTeacherRole } = useAuth()
  const { mood, message, visible, activity, nudge, dismiss } = useJeff()
  const sidekickActive = useJeffSolo(s => s.sidekickActive)
  const [hovered, setHovered] = useState(false)
  // "Chat with Jeff" tutor panel (JeffTutorPanel). Lives here so the launcher
  // shares the widget's visibility rules: signed-in only, hidden on auth /
  // onboarding routes, and gone while the Biz Lab sidekick owns the screen.
  const [chatOpen, setChatOpen] = useState(false)
  // One-time inline note next to the launcher explaining the coin cost. Goes
  // away for good the first time the chat is opened (or when dismissed).
  const [showCostNote, setShowCostNote] = useState(() => !costNoteSeen())
  const dismissCostNote = () => { setShowCostNote(false); markCostNoteSeen() }
  const openChat = () => { setChatOpen(true); if (showCostNote) dismissCostNote() }
  const [dims, setDims] = useState({ w: typeof window !== "undefined" ? window.innerWidth : 1200, h: typeof window !== "undefined" ? window.innerHeight : 800 })

  useEffect(() => {
    const on = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener("resize", on)
    return () => window.removeEventListener("resize", on)
  }, [])

  if (!user) return null
  if (HIDDEN_ROUTES.some(r => location.pathname.startsWith(r))) return null
  // Hide the global corner Jeff while the Biz Lab's own large side Jeff is up,
  // so there's only ever one Jeff on screen.
  if (sidekickActive) return null

  // The tutor is a student feature (coins, class material, daily limit).
  // Teachers keep the roaming mascot but never see the launcher. Either
  // signal hides it: the user_roles row (useAuth) or the profile role that
  // AppRoutes uses for teacher routing.
  const isTeacher = hasTeacherRole || user.role === "teacher"

  const cont = containerAnim(activity, dims.w, dims.h)
  const isFlip = activity === "flip"
  const isParty = activity === "party"
  const facing = activity === "walkAcross"
    ? { animate: { scaleX: [-1, -1, 1, 1] }, transition: { duration: 8, times: [0, 0.48, 0.52, 1] } }
    : { animate: { scaleX: 1 }, transition: { duration: 0.3 } }
  // Backflip: a quick jump + full backward rotation on the mascot itself (the
  // speech bubble, above, stays upright).
  const flipAnim = { animate: { y: [0, -64, -64, 0], rotate: [0, -360, -360, 0], scaleX: 1 }, transition: { duration: 1.2, times: [0, 0.45, 0.55, 1], ease: "easeInOut" as const } }
  // Party: a jolly bounce-dance with a backflip in the middle and a couple of
  // facing flips, played while he's parked center-stage.
  const danceAnim = { animate: { y: [0, -26, 0, -18, 0, -34, 0], rotate: [0, -10, 10, -360, 0, 10, 0], scaleX: [1, -1, 1, 1, -1, 1, 1] }, transition: { duration: 3.4, times: [0, 0.14, 0.28, 0.55, 0.7, 0.86, 1], ease: "easeInOut" as const } }
  const innerAnim = isParty ? danceAnim : isFlip ? flipAnim : facing
  // When Jeff is actively reacting (talking or flipping) he scales up so he
  // pops off the corner and grabs attention.
  const prominent = (visible && message != null) || isFlip
  // Center-stage: translate from the bottom-right anchor to the viewport middle.
  const partyTx = 72 - dims.w / 2
  const partyTy = 72 - dims.h / 2
  const containerAnimate = isParty ? { x: partyTx, y: partyTy } : cont.animate
  const containerTransition = isParty ? ({ type: "spring" as const, stiffness: 80, damping: 14 }) : cont.transition
  const boxScale = isParty ? 2.1 : prominent ? 1.3 : 1

  return (
    <>
    {/* Chat launcher - parked to Jeff's LEFT (his speech bubble pops up above
        him, so above would get covered). Stays put while he roams. z-40 like
        the mascot: above page content, below the z-50 sheet/dialog layer.
        Students only: the panel is not mounted at all for teachers. */}
    {!isTeacher && (
    <>
    {showCostNote && !chatOpen && (
      <div
        role="note"
        className="fixed right-24 bottom-[calc(5rem+env(safe-area-inset-bottom))] md:right-32 md:bottom-[6.5rem] z-40 flex max-w-[15rem] items-start gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs text-card-foreground shadow-lg"
      >
        <span>Each question costs {ASK_JEFF_COST} coins. If Jeff can't answer, you get them back.</span>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={dismissCostNote}
          className="-mr-1 -mt-0.5 rounded-full p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    )}
    <motion.button
      type="button"
      aria-label={`Ask Jeff, ${ASK_JEFF_COST} coins per question`}
      onClick={openChat}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: chatOpen ? 0 : 1, y: chatOpen ? 8 : 0 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed right-24 bottom-[calc(2.25rem+env(safe-area-inset-bottom))] md:right-32 md:bottom-14 z-40 flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
    >
      <MessageCircle className="w-4 h-4" />
      Ask Jeff
    </motion.button>
    <JeffTutorPanel open={chatOpen} onOpenChange={setChatOpen} />
    </>
    )}

    <motion.div
      className={`fixed bottom-6 right-6 flex flex-col items-end pointer-events-none ${isParty ? "z-50" : "z-40"}`}
      animate={containerAnimate}
      transition={containerTransition}
    >
      {/* Speech bubble above */}
      <div className="pointer-events-auto">
        <AnimatePresence>
          {visible && message && <SpeechBubble key={message} message={message} onClose={dismiss} />}
        </AnimatePresence>
      </div>

      {/* Scene + Jeff */}
      <motion.div
        className="relative w-16 md:w-24 h-16 md:h-24"
        animate={{ scale: boxScale }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{ transformOrigin: isParty ? "center" : "bottom right" }}
      >
        <JeffScene activity={activity} />
        <motion.button
          type="button"
          aria-label="Jeff says hi"
          onClick={nudge}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="absolute inset-0 pointer-events-auto cursor-pointer select-none"
          style={{ filter: "drop-shadow(0 6px 14px rgba(6,41,31,0.25))" }}
        >
          <motion.div className="w-full h-full" animate={innerAnim.animate} transition={innerAnim.transition}>
            <JeffMascot mood={mood} waving={hovered} activity={activity} />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
    </>
  )
}

export default JeffWidget
