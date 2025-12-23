"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, Notification } from "./spk-types"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  notifications: Notification[]
  unreadCount: number
  appName: string
  appSubtitle: string
  appLogoUrl: string
  sidebarCollapsed: boolean
  reportSettings: {
    organizationName: string
    location: string
    leaderName: string
    leaderTitle: string
  }
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  updateAppSettings: (name: string, subtitle: string, logoUrl: string) => void
  updateReportSettings: (settings: AuthContextType["reportSettings"]) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
  deleteNotification: (id: string) => void
  clearAllNotifications: () => void
  hasPermission: (permission: "view" | "edit" | "delete" | "manage_users") => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Sample users for demo
const sampleUsers: User[] = [
  {
    id: "1",
    nama: "Administrator",
    email: "admin@spk.com",
    password: "admin123",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: "2",
    nama: "Analis SPK",
    email: "analis@spk.com",
    password: "analis123",
    role: "analis",
    createdAt: new Date(),
  },
  {
    id: "3",
    nama: "Viewer SPK",
    email: "viewer@spk.com",
    password: "viewer123",
    role: "viewer",
    createdAt: new Date(),
  },
]

// Sample notifications
const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "Perhitungan Selesai",
    message: "Perhitungan SAW telah selesai dengan 5 alternatif",
    type: "success",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    title: "Data Baru Ditambahkan",
    message: "3 alternatif baru telah ditambahkan ke sistem",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "3",
    title: "Peringatan Konsistensi",
    message: "Matriks perbandingan AHP tidak konsisten (CR > 0.1)",
    type: "warning",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "4",
    title: "Backup Otomatis",
    message: "Data telah di-backup secara otomatis",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
  const [appName, setAppName] = useState("SPK Multi-Metode")
  const [appSubtitle, setAppSubtitle] = useState("SAW | AHP | TOPSIS")
  const [appLogoUrl, setAppLogoUrl] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [reportSettings, setReportSettings] = useState({
    organizationName: "Sistem Pendukung Keputusan Multi Metode",
    location: "Jakarta",
    leaderName: "Nama Ketua",
    leaderTitle: "NIP. 123456789",
  })

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem("spk_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    const savedAppSettings = localStorage.getItem("spk_app_settings")
    if (savedAppSettings) {
      const parsed = JSON.parse(savedAppSettings)
      setAppName(parsed.appName || "SPK Multi-Metode")
      setAppSubtitle(parsed.appSubtitle || "SAW | AHP | TOPSIS")
      setAppLogoUrl(parsed.appLogoUrl || "")
    }

    const savedSidebarCollapsed = localStorage.getItem("spk_sidebar_collapsed")
    const savedReportSettings = localStorage.getItem("spk_report_settings")

    if (savedSidebarCollapsed) setSidebarCollapsed(savedSidebarCollapsed === "true")
    if (savedReportSettings) setReportSettings(JSON.parse(savedReportSettings))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "spk_app_settings" && e.newValue) {
        const parsed = JSON.parse(e.newValue)
        setAppName(parsed.appName || "SPK Multi-Metode")
        setAppSubtitle(parsed.appSubtitle || "SAW | AHP | TOPSIS")
        setAppLogoUrl(parsed.appLogoUrl || "")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = sampleUsers.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("spk_user", JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if email already exists
    const existingUser = sampleUsers.find((u) => u.email === email)
    if (existingUser) {
      return false
    }

    // Create new user with viewer role by default
    const newUser: User = {
      id: Date.now().toString(),
      nama: name,
      email,
      password,
      role: "viewer",
      createdAt: new Date(),
    }

    // Add to sample users
    sampleUsers.push(newUser)

    // Auto login after registration
    setUser(newUser)
    localStorage.setItem("spk_user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("spk_user")
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data }
      setUser(updated)
      localStorage.setItem("spk_user", JSON.stringify(updated))
    }
  }

  const updateAppSettings = (name: string, subtitle: string, logoUrl: string) => {
    setAppName(name)
    setAppSubtitle(subtitle)
    setAppLogoUrl(logoUrl)
    localStorage.setItem(
      "spk_app_settings",
      JSON.stringify({ appName: name, appSubtitle: subtitle, appLogoUrl: logoUrl }),
    )
  }

  const updateReportSettings = (settings: typeof reportSettings) => {
    setReportSettings(settings)
    localStorage.setItem("spk_report_settings", JSON.stringify(settings))
  }

  const handleSetSidebarCollapsed = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
    localStorage.setItem("spk_sidebar_collapsed", String(collapsed))
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const addNotification = (notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotif: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date(),
    }
    setNotifications((prev) => [newNotif, ...prev])
  }

  const hasPermission = (permission: "view" | "edit" | "delete" | "manage_users"): boolean => {
    if (!user) return false

    const rolePermissions = {
      admin: ["view", "edit", "delete", "manage_users"],
      analis: ["view", "edit"],
      viewer: ["view"],
    }

    return rolePermissions[user.role]?.includes(permission) ?? false
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        notifications,
        unreadCount,
        appName,
        appSubtitle,
        appLogoUrl,
        sidebarCollapsed,
        reportSettings,
        login,
        register,
        logout,
        updateProfile,
        updateAppSettings,
        updateReportSettings,
        setSidebarCollapsed: handleSetSidebarCollapsed,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        deleteNotification,
        clearAllNotifications,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
