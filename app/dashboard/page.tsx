import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UserWelcome } from "@/components/user-welcome"
import { RecentActivity } from "@/components/recent-activity"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { ResourcesCard } from "@/components/resources-card"
import { ProgressTracker } from "@/components/progress-tracker"

export const metadata: Metadata = {
  title: "Dashboard | 360 Magicians Platform",
  description: "Manage your profile and access services",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to your 360 Magicians dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <UserWelcome className="col-span-2" />
        <RecentActivity className="col-span-2" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <UpcomingAppointments className="col-span-4" />
        <div className="col-span-3 grid gap-4">
          <ResourcesCard />
          <ProgressTracker />
        </div>
      </div>
    </DashboardShell>
  )
}
