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
import MissionsPreview from "./pages/MissionsPreview";
import CoasterJourney from "./pages/CoasterJourney";
import { AssignmentNotifications } from "./components/AssignmentNotifications";
import { GradeNotifications } from "./components/GradeNotifications";
import { JeffProvider } from "@/contexts/JeffContext";
import { JeffWidget } from "@/components/Jeff";
import JeffTour from "@/components/JeffTour";

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
    <Routes location={location}>
      <Route path="/" element={import.meta.env.VITE_COASTER_ONLY ? <CoasterJourney /> : <Navigate to={homeTarget} replace />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
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
      <Route path="/missions-preview" element={<MissionsPreview />} />
      <Route path="/coaster-journey" element={<CoasterJourney />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
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
              <AppRoutes />
              {/* Persistent animated mascot — z-40 (below modals). Hides itself on
                  auth/onboarding routes and when signed out. */}
              <JeffWidget />
              {/* One-time guided tour Jeff gives right after onboarding. */}
              <JeffTour />
            </JeffProvider>
          </AppProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
