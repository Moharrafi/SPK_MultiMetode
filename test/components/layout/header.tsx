"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, LogOut, Settings, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { NotificationPanel } from "./notification-panel"
import { GlobalSearch } from "./global-search"
import { LogoutDialog } from "@/components/ui/logout-dialog"
import Link from "next/link"

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const handleThemeToggle = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleLogoutClick = () => {
    setShowLogoutDialog(true)
  }

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false)
    logout()
    router.push("/login")
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
        <div className="flex flex-1 items-center gap-4 pl-12 lg:pl-0">
          <div className="hidden w-full max-w-md md:block">
            <GlobalSearch />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <NotificationPanel />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                  {user?.nama?.charAt(0).toUpperCase() || "U"}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{user?.nama || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || "user@spk.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profil" className="flex items-center cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" />
                  {t("header.profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/pengaturan" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  {t("header.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogoutClick} className="text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                {t("header.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <LogoutDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog} onConfirm={handleLogoutConfirm} />
    </>
  )
}
