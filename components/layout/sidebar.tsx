"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { useSettings } from "@/lib/settings-context"
import {
  LayoutDashboard,
  Database,
  Users,
  ListChecks,
  Layers,
  Star,
  Settings2,
  ClipboardList,
  Calculator,
  BarChart3,
  GitCompare,
  Trophy,
  FileText,
  UserCog,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, setSidebarCollapsed, hasPermission } = useAuth()
  const { t } = useLanguage()
  const { appSettings } = useSettings()
  const { appName, appSubtitle, appLogoUrl } = appSettings
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Data Master", "Perhitungan", "Hasil & Ranking"])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const menuItems = [
    {
      titleKey: "nav.dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      permission: "view" as const,
    },
    {
      titleKey: "nav.data_master",
      icon: Database,
      permission: "view" as const,
      children: [
        { titleKey: "nav.alternatif", href: "/data-master/alternatif", icon: Users, permission: "view" as const },
        { titleKey: "nav.kriteria", href: "/data-master/kriteria", icon: ListChecks, permission: "view" as const },
        { titleKey: "nav.sub_kriteria", href: "/data-master/sub-kriteria", icon: Layers, permission: "view" as const },
        { titleKey: "nav.skala", href: "/data-master/skala", icon: Star, permission: "view" as const },
      ],
    },
    {
      titleKey: "nav.metode",
      href: "/metode",
      icon: Settings2,
      permission: "view" as const,
    },
    {
      titleKey: "nav.penilaian",
      href: "/penilaian",
      icon: ClipboardList,
      permission: "edit" as const,
    },
    {
      titleKey: "nav.perhitungan",
      icon: Calculator,
      permission: "view" as const,
      children: [
        { titleKey: "nav.modul_saw", href: "/perhitungan/saw", icon: Calculator, permission: "view" as const },
        { titleKey: "nav.modul_ahp", href: "/perhitungan/ahp", icon: Calculator, permission: "view" as const },
        { titleKey: "nav.modul_topsis", href: "/perhitungan/topsis", icon: Calculator, permission: "view" as const },
      ],
    },
    {
      titleKey: "nav.hasil",
      icon: BarChart3,
      permission: "view" as const,
      children: [
        { titleKey: "nav.hasil_per_metode", href: "/hasil/per-metode", icon: BarChart3, permission: "view" as const },
        { titleKey: "nav.perbandingan", href: "/hasil/perbandingan", icon: GitCompare, permission: "view" as const },
        { titleKey: "nav.ranking_gabungan", href: "/hasil/gabungan", icon: Trophy, permission: "view" as const },
      ],
    },
    {
      titleKey: "nav.laporan",
      href: "/laporan",
      icon: FileText,
      permission: "view" as const,
    },
    {
      titleKey: "nav.pengguna",
      href: "/pengguna",
      icon: UserCog,
      permission: "manage_users" as const,
    },
  ]

  const toggleMenu = (titleKey: string) => {
    setExpandedMenus((prev) => (prev.includes(titleKey) ? prev.filter((t) => t !== titleKey) : [...prev, titleKey]))
  }

  const isActive = (href: string) => pathname === href

  const filteredMenuItems = menuItems.filter((item) => hasPermission(item.permission))

  const renderMenuItem = (item: (typeof menuItems)[0], collapsed: boolean) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedMenus.includes(item.titleKey)
    const Icon = item.icon
    const title = t(item.titleKey)

    const filteredChildren = item.children?.filter((child) => hasPermission(child.permission))

    if (hasChildren && filteredChildren && filteredChildren.length > 0) {
      if (collapsed) {
        return (
          <TooltipProvider key={item.titleKey} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => toggleMenu(item.titleKey)}
                  className="flex w-full items-center justify-center rounded-lg p-2.5 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Icon className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex flex-col gap-1 p-2">
                <span className="font-medium">{title}</span>
                {filteredChildren.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "text-sm px-2 py-1 rounded hover:bg-accent",
                      isActive(child.href) && "bg-accent font-medium",
                    )}
                  >
                    {t(child.titleKey)}
                  </Link>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }

      return (
        <div key={item.titleKey}>
          <button
            onClick={() => toggleMenu(item.titleKey)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{title}</span>
            </div>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
              {filteredChildren.map((child) => {
                const ChildIcon = child.icon
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive(child.href)
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <ChildIcon className="h-4 w-4" />
                    <span>{t(child.titleKey)}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )
    }

    if (collapsed) {
      return (
        <TooltipProvider key={item.href} delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item.href!}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center justify-center rounded-lg p-2.5 transition-colors",
                  isActive(item.href!)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return (
      <Link
        key={item.href}
        href={item.href!}
        onClick={() => setIsMobileOpen(false)}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
          isActive(item.href!)
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="text-sm font-medium">{title}</span>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          sidebarCollapsed ? "w-16" : "w-64",
        )}
      >
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            "absolute -right-3 top-[3.25rem] z-50 hidden lg:flex",
            "h-6 w-6 items-center justify-center rounded-full",
            "bg-sidebar-primary text-sidebar-primary-foreground",
            "shadow-md hover:bg-sidebar-primary/90 transition-colors",
            "border-2 border-background",
          )}
        >
          <ChevronLeft className={cn("h-3.5 w-3.5 transition-transform", sidebarCollapsed && "rotate-180")} />
        </button>

        <div className="flex h-full flex-col">
          {/* Logo */}
          <div
            className={cn(
              "flex items-center gap-3 border-b border-sidebar-border px-3 py-3",
              sidebarCollapsed && "justify-center px-2",
            )}
          >
            {appLogoUrl ? (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                <img
                  src={appLogoUrl || "/placeholder.svg"}
                  alt="App Logo"
                  className="h-9 w-9 rounded-lg object-contain"
                />
              </div>
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
                <Calculator className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
            )}
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <h1 className="text-base font-bold text-sidebar-foreground leading-tight break-words">{appName}</h1>
                <p className="text-xs text-sidebar-foreground/60 mt-0.5">{appSubtitle}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className={cn("flex-1 space-y-1 overflow-y-auto p-2", sidebarCollapsed && "px-1.5")}>
            {filteredMenuItems.map((item) => renderMenuItem(item, sidebarCollapsed))}
          </nav>

          {!sidebarCollapsed && (
            <div className="border-t border-sidebar-border p-3">
              <p className="text-xs text-sidebar-foreground/50 text-center">{t("common.version")} 1.0.0 | © 2025</p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
