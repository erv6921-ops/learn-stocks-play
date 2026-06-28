import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useApp } from "@/contexts/AppContext"
import { JeffMascot } from "@/components/JeffMascot"
import { Wordmark } from "@/components/Wordmark"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Shown right after a user confirms their email. A warm landing, then it sends
// them into the app: onboarding for new accounts (which ends on the dashboard,
// where Jeff's tour explains everything), or straight to the dashboard if the
// account is already set up.
export default function Welcome() {
  const navigate = useNavigate()
  const { user } = useApp()
  const onboarded = !!user?.onboardingComplete

  const start = () => navigate(onboarded ? "/dashboard" : "/onboarding", { replace: true })

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#0a3d2e,#06291f)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(820px 520px at 50% 38%, rgba(43,182,115,.18), transparent)" }} />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg text-center flex flex-col items-center gap-5"
      >
        <div className="w-28 h-28">
          <JeffMascot size="xl" mood="celebrating" animate />
        </div>
        <Wordmark className="text-2xl" />
        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#eafff5]">
          Welcome to InvestiPlay! 🎉
        </h1>
        <p className="text-base md:text-lg text-[#9cc4b3] max-w-md leading-relaxed">
          Your email's confirmed and your account is ready. Let's get you set up — then I'll
          walk you through the whole app.
        </p>
        <Button size="lg" onClick={start} className="press-scale mt-2 h-12 px-7 text-base">
          Let's go <ArrowRight className="w-5 h-5 ml-1.5" />
        </Button>
      </motion.div>
    </div>
  )
}
