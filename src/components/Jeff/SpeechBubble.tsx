import React from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

/**
 * Dark rounded speech bubble that appears above Jeff with a downward arrow.
 * Presentational: the message and lifecycle (auto-dismiss after 4s) are owned by
 * JeffContext; this just renders + offers a manual close.
 */
export function SpeechBubble({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.22 }}
      className="relative mb-2 max-w-[220px] rounded-2xl px-3.5 py-2.5 pr-7 text-sm font-medium text-white shadow-lg"
      style={{ backgroundColor: "#1e293b" }}
    >
      {message}
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
      {/* Arrow pointing down toward Jeff */}
      <span
        className="absolute -bottom-1.5 right-8 w-3 h-3 rotate-45"
        style={{ backgroundColor: "#1e293b" }}
      />
    </motion.div>
  )
}

export default SpeechBubble
