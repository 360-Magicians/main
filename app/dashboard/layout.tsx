import type React from "react"
import type { Metadata } from "next"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { AccessibilityMenu } from "@/components/accessibility-menu"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Dashboard | 360 Magicians Platform",
  description: "Manage your profile and access services",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold">360 Magicians</span>
          </div>
          <div className="flex items-center gap-4">
            <AccessibilityMenu />
            <ModeToggle />
            <UserAccountNav />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}
