import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Store } from "lucide-react";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { ClassSettingsProvider, useClassSettings } from "@/contexts/ClassSettingsContext";
import { isPageLocked } from "@/lib/classSettings";
import { useAuth } from "@/hooks/useAuth";
import { logActivity } from "@/lib/analytics";
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
import Homework from "./pages/Homework";
import Partners from "./pages/Partners";
import MissionsPreview from "./pages/MissionsPreview";
import CoasterJourney from "./pages/CoasterJourney";
import { DashboardPopups } from "./components/popups/DashboardPopups";
import { JeffProvider } from "@/contexts/JeffContext";
import { JeffWidget } from "@/components/Jeff";
import JeffTour from "@/components/JeffTour";
import ReportBugButton from "@/components/ReportBugButton";
import LeagueUpWatcher from "@/components/gamification/LeagueUpOverlay";
import { ComingSoon, CoinsGate } from "@/components/LockScreen";
import ErrorBoundary from "@/components/ErrorBoundary";
import { installErrorLog } from "@/lib/errorLog";

// Start capturing console errors/warnings + uncaught errors as early as
// possible, so the in-app bug reporter can attach them to a report.
installErrorLog();

const queryClient = new QueryClient();

// Redirects a student off any page their teacher has locked (covers direct-URL
// access, not just hidden nav). Teachers/unrestricted students get the
// permissive default, so this never fires for them.
function LockedRouteWatcher() {
  const settings = useClassSettings();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isPageLocked(settings, location.pathname)) {
      navigate("/dashboard", { replace: true });
    }
  }, [settings, location.pathname, navigate]);
  return null;
}

// Logs student activity for the teacher analytics view: dwell time on each page
// as they navigate, plus a periodic "still active" ping so long single-page
// sessions still register time and the teacher can see WHEN they were on. No-ops
// for teachers and (via logActivity) under the dev bypass / when signed out.
function ActivityTracker() {
  const { user, isTeacher } = useAuth();
  const location = useLocation();
  const lastRef = useRef<{ path: string; t: number } | null>(null);

  useEffect(() => {
    if (!user || isTeacher) return;
    const now = Date.now();
    const prev = lastRef.current;
    if (prev && prev.path !== location.pathname) {
      logActivity(user.id, "page_view", { route: prev.path, durationMs: now - prev.t });
    }
    if (!prev || prev.path !== location.pathname) lastRef.current = { path: location.pathname, t: now };
  }, [location.pathname, user, isTeacher]);

  useEffect(() => {
    if (!user || isTeacher) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        logActivity(user.id, "session_ping", { route: location.pathname });
      }
    }, 60000);
    return () => clearInterval(id);
  }, [user, isTeacher, location.pathname]);

  return null;
}

function AppRoutes() {
  const { user, authReady } = useApp();
  const location = useLocation();
  // Home ("/") routing. Teachers must land on their dashboard, not the student
  // one - otherwise a page refresh or typing the base URL (no fresh SIGNED_IN
  // event to trigger AppContext's role routing) drops them on /dashboard.
  const homeTarget = user?.role === "teacher"
    ? "/teacher-dashboard"
    : user?.onboardingComplete ? "/dashboard" : "/onboarding";

  // Micro Business is locked (a blurred "Coming Soon" teaser) in production. On
  // localhost it's unlocked for development - append ?locked=1 to any of its
  // routes to preview the locked teaser without a production build.
  const mbLocked = !import.meta.env.DEV || new URLSearchParams(location.search).has("locked");
  const microBusinessEl = mbLocked
    ? <ComingSoon title="Micro Business" icon={Store} />
    : <MicroBusiness />;

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
      <Route path="/micro-business" element={microBusinessEl} />
      <Route path="/bank" element={<Bank />} />
      <Route path="/business" element={microBusinessEl} />
      <Route path="/tokens" element={microBusinessEl} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/daily" element={<Daily />} />
      <Route path="/lab" element={<CoinsGate required={600} title="Lab"><AppliedFinanceLab /></CoinsGate>} />
      <Route path="/lab/:docId" element={<CoinsGate required={600} title="Lab"><LabDocument /></CoinsGate>} />
      <Route path="/business-canvas" element={<BusinessCanvas />} />
      <Route path="/financial-advisor" element={<FinancialAdvisor />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/homework" element={<Homework />} />
      <Route path="/challenges" element={<CoinsGate required={1000} title="Challenges"><Challenges /></CoinsGate>} />
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
            <ClassSettingsProvider>
            <JeffProvider>
              {/* All forcing / celebratory pop-ups - only ever shown on the
                  dashboard, one at a time (see DashboardPopups). */}
              <DashboardPopups />
              <LockedRouteWatcher />
              <ActivityTracker />
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
              </ErrorBoundary>
            </JeffProvider>
            </ClassSettingsProvider>
          </AppProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
