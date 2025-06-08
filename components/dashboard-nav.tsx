"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUser } from "@/components/user-provider"
import {
  Briefcase,
  Building,
  Calendar,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  roles?: string[]
}

export function DashboardNav() {
  const pathname = usePathname()
  const { user } = useUser()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Job Magician",
      href: "/dashboard/job-magician",
      icon: <Briefcase className="mr-2 h-4 w-4" />,
      roles: ["professional", "admin"],
    },
    {
      title: "Business Magician",
      href: "/dashboard/business-magician",
      icon: <Building className="mr-2 h-4 w-4" />,
      roles: ["entrepreneur", "admin"],
    },
    {
      title: "Appointments",
      href: "/dashboard/appointments",
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      title: "Resources",
      href: "/dashboard/resources",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Learning",
      href: "/dashboard/learning",
      icon: <GraduationCap className="mr-2 h-4 w-4" />,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Network",
      href: "/dashboard/network",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => !item.roles || !user?.role || item.roles.includes(user.role))

  return (
    <nav className="grid items-start gap-2 py-4">
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}
