import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import NotFound from "./pages/NotFound";
import ProgressPage from "./pages/Progress";
import Leaderboard from "./pages/Leaderboard";
import AppliedFinanceLab from "./pages/AppliedFinanceLab";
import Daily from "./pages/Daily";
import LabDocument from "./pages/LabDocument";
import BusinessCanvas from "./pages/BusinessCanvas";
import FinancialAdvisor from "./pages/FinancialAdvisor";
import { AssignmentNotifications } from "./components/AssignmentNotifications";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, authReady } = useApp();
  const homeTarget = user?.onboardingComplete ? "/dashboard" : "/onboarding";

  if (!authReady && !user) return null;
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to={homeTarget} replace />} />
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
      <Route path="/business" element={<MicroBusiness />} />
      <Route path="/tokens" element={<MicroBusiness />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/daily" element={<Daily />} />
      <Route path="/lab" element={<AppliedFinanceLab />} />
      <Route path="/lab/:docId" element={<LabDocument />} />
      <Route path="/business-canvas" element={<BusinessCanvas />} />
      <Route path="/financial-advisor" element={<FinancialAdvisor />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <AssignmentNotifications />
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
