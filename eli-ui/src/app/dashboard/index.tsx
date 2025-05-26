"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  FileText,
  Home,
  MessageSquare,
  PanelLeft,
  Settings,
  Users,
  AlertTriangle,
  History,
  Layers,
  Inbox,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import RiskInsightsOverview from "@/components/risk-insights-overview"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Risk Insights",
      icon: AlertTriangle,
      href: "/insights",
      active: pathname === "/insights",
    },
    {
      label: "Delinquency Analysis",
      icon: BarChart3,
      href: "/delinquency",
      active: pathname === "/delinquency",
    },
    {
      label: "Underwriting Performance",
      icon: Layers,
      href: "/underwriting",
      active: pathname === "/underwriting",
    },
    {
      label: "Reports",
      icon: FileText,
      href: "/reports",
      active: pathname === "/reports",
    },
    {
      label: "Actions",
      icon: Inbox,
      href: "/actions",
      active: pathname === "/actions",
    },
    {
      label: "Collaboration",
      icon: Users,
      href: "/collaboration",
      active: pathname === "/collaboration",
    },
    {
      label: "Audit Trail",
      icon: History,
      href: "/audit",
      active: pathname === "/audit",
    },
    {
      label: "Integrations",
      icon: MessageSquare,
      href: "/integrations",
      active: pathname === "/integrations",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1 overflow-auto">
          <RiskInsightsOverview />
        </main>
      </div>
    </div>
  )
}

