"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  FileText,
  Home,
  Settings,
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
  Briefcase,
  Shield,
  Eye,
  PanelLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UserNav } from "@/components/user-nav"
import { TeamSwitcher } from "@/components/team-switcher"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const updateNavIcons = () => {
      const navItems = document.querySelectorAll(".nav-item-icon")
    }

    updateNavIcons()
  }, [isSidebarOpen])

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/insights", label: "Insights", icon: FileText },
    { href: "/dashboard/alerts", label: "Risk Alerts", icon: Bell },
    { href: "/dashboard/filing-reporting", label: "Risk Ops", icon: Briefcase },
    { href: "/dashboard/underwriting", label: "Underwriting", icon: Shield },
    { href: "/dashboard/manual-reviews", label: "Manual Review", icon: Eye },
    { href: "/dashboard/admin", label: "Admin Console", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform bg-card transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isSidebarOpen ? "w-64" : "w-28",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Button
              variant="outline"
              size="icon"
              className="mr-2 hidden md:flex"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <PanelLeft className="h-4 w-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <Link href="/dashboard" className="flex items-center space-x-2">
              <TeamSwitcher />
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="md:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 border-r">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {isSidebarOpen && item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="border-t p-4 border-r">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b px-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative h-8 w-8 rounded-full bg-primary">
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary-foreground">
                <UserNav />
              </span>
            </div>
          </div>
        </header>
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
