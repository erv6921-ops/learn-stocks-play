import { useLocation } from "react-router-dom"
import { PopupCoordinatorProvider } from "./PopupCoordinator"
import { AssignmentNotifications } from "@/components/AssignmentNotifications"
import { HomeworkReminder } from "@/components/HomeworkReminder"
import { GradeNotifications } from "@/components/GradeNotifications"
import { LessonGradeNotifications } from "@/components/LessonGradeNotifications"
import { FriendRequestNotifications } from "@/components/FriendRequestNotifications"
import { StockDraftNotification } from "@/components/StockPredictionDraft/StockDraftNotification"

// All of the app's forcing / celebratory pop-ups live here and ONLY mount on the
// dashboard. That guarantees none of them appear on the auth or onboarding
// screens, and remounting on each dashboard visit resets the pop-up slot so at
// most one shows at a time (see PopupCoordinator).
export function DashboardPopups() {
  const { pathname } = useLocation()
  if (pathname !== "/dashboard") return null

  return (
    <PopupCoordinatorProvider>
      <AssignmentNotifications />
      <HomeworkReminder />
      <GradeNotifications />
      <LessonGradeNotifications />
      <FriendRequestNotifications />
      <StockDraftNotification />
    </PopupCoordinatorProvider>
  )
}
