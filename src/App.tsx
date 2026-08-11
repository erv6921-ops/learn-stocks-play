import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AppProvider, useApp } from "@/contexts/AppContext";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentWork from "./pages/StudentWork";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import UnitTest from "./pages/UnitTest";
import Stocks from "./pages/Stocks";
import StockDetail from "./pages/StockDetail";
import MicroBusiness from "./pages/MicroBusiness";
import Bank from "./pages/Bank";
import NotFound from "./pages/NotFound";
import ProgressPage from "./pages/Progress";
import Leaderboard from "./pages/Leaderboard";
import AppliedFinanceLab from "./pages/AppliedFinanceLab";
import Daily from "./pages/Daily";
import LabDocument from "./pages/LabDocument";
import BusinessCanvas from "./pages/BusinessCanvas";
import FinancialAdvisor from "./pages/FinancialAdvisor";
import Profile from "./pages/Profile";
import Challenges from "./pages/Challenges";
import Partners from "./pages/Partners";
import MissionsPreview from "./pages/MissionsPreview";
import CoasterJourney from "./pages/CoasterJourney";
import { AssignmentNotifications } from "./components/AssignmentNotifications";
import { GradeNotifications } from "./components/GradeNotifications";
import { FriendRequestNotifications } from "./components/FriendRequestNotifications";
import { JeffProvider } from "@/contexts/JeffContext";
import { JeffWidget } from "@/components/Jeff";
import JeffTour from "@/components/JeffTour";
import ReportBugButton from "@/components/ReportBugButton";
import LeagueUpWatcher from "@/components/gamification/LeagueUpOverlay";
import LevelUpWatcher from "@/components/gamification/LevelUpOverlay";
import ErrorBoundary from "@/components/ErrorBoundary";
import { installErrorLog } from "@/lib/errorLog";

// Start capturing console errors/warnings + uncaught errors as early as
// possible, so the in-app bug reporter can attach them to a report.
installErrorLog();

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, authReady } = useApp();
  const location = useLocation();
  const homeTarget = user?.onboardingComplete ? "/dashboard" : "/onboarding";

  if (!authReady && !user) return null;

  return (
    // Gentle cross-fade between pages. Opacity-only (no transform) so it never
    // breaks position:fixed elements like the mobile nav or modals.
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
    {/* Contain crashes to the current page: a thrown component shows the
        fallback here instead of blanking the whole app. Keyed by pathname so
        navigating to another route clears any caught error. */}
    <ErrorBoundary key={location.pathname}>
    <Routes location={location}>
      <Route path="/" element={import.meta.env.VITE_COASTER_ONLY ? <CoasterJourney /> : <Navigate to={homeTarget} replace />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher/student/:userId" element={<StudentWork />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/lessons/:id" element={<LessonDetail />} />
      <Route path="/unit-test/:category" element={<UnitTest />} />
      <Route path="/stocks" element={<Stocks />} />
      <Route path="/stocks/:symbol" element={<StockDetail />} />
      <Route path="/micro-business" element={<MicroBusiness />} />
      <Route path="/bank" element={<Bank />} />
      <Route path="/business" element={<MicroBusiness />} />
      <Route path="/tokens" element={<MicroBusiness />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/daily" element={<Daily />} />
      <Route path="/lab" element={<AppliedFinanceLab />} />
      <Route path="/lab/:docId" element={<LabDocument />} />
      <Route path="/business-canvas" element={<BusinessCanvas />} />
      <Route path="/financial-advisor" element={<FinancialAdvisor />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/missions-preview" element={<MissionsPreview />} />
      <Route path="/coaster-journey" element={<CoasterJourney />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </ErrorBoundary>
    </motion.div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppProvider>
            <JeffProvider>
              <AssignmentNotifications />
              <GradeNotifications />
              <FriendRequestNotifications />
              <AppRoutes />
              {/* Non-essential global widgets. Wrapped in a silent error
                  boundary (fallback=null) so a hiccup in any of them - e.g. the
                  level-up overlay reacting to a coin change on lesson finish -
                  can never blank the whole app (the old "white screen"). */}
              <ErrorBoundary fallback={null}>
                {/* Persistent animated mascot - z-40 (below modals). Hides itself on
                    auth/onboarding routes and when signed out. */}
                <JeffWidget />
                {/* Global "Report a bug" button - files a GitHub issue via the
                    report-bug edge function; shows on every page. */}
                <ReportBugButton />
                {/* One-time guided tour Jeff gives right after onboarding. */}
                <JeffTour />
                {/* Big celebration + pick-one gift when the coin balance crosses
                    into a new league (Bronze → Silver → Gold → …). */}
                <LeagueUpWatcher />
                {/* Fires the full-screen LEVEL UP! moment when the coin balance
                    crosses the next level boundary. */}
                <LevelUpWatcher />
              </ErrorBoundary>
            </JeffProvider>
          </AppProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
