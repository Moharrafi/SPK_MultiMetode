"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, Notification, ActivityEntry } from "./spk-types"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  notifications: Notification[]
  activities: ActivityEntry[]
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
  logActivity: (actionKey: string, userIdOverride?: string) => void
  deleteNotification: (id: string) => void
  clearAllNotifications: () => void
  hasPermission: (permission: "view" | "edit" | "delete" | "manage_users") => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const NOTIFICATIONS_STORAGE_KEY = "spk_notifications"
const USER_PROFILES_STORAGE_KEY = "spk_user_profiles"
const ACTIVITIES_STORAGE_KEY = "spk_activities"
const MAX_ACTIVITY_ENTRIES = 50

type StoredNotification = Omit<Notification, "createdAt"> & { createdAt: string }
type StoredActivity = Omit<ActivityEntry, "createdAt"> & { createdAt: string }

const deserializeNotifications = (value: string): Notification[] => {
  try {
    const parsed = JSON.parse(value) as StoredNotification[]
    return parsed.map((notif) => ({
      ...notif,
      createdAt: notif.createdAt ? new Date(notif.createdAt) : new Date(),
    }))
  } catch (error) {
    console.error("Failed to parse notifications", error)
    return []
  }
}

const deserializeActivities = (value: string): ActivityEntry[] => {
  try {
    const parsed = JSON.parse(value) as StoredActivity[]
    return parsed.map((item) => ({
      ...item,
      createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
    }))
  } catch (error) {
    console.error("Failed to parse activities", error)
    return []
  }
}

type ProfileOverrides = Record<
  string,
  {
    nama?: string
    email?: string
  }
>

const getUserAvatarKey = (userId: string) => `spk_user_avatar_${userId}`

const loadUserAvatar = (userId: string): string | null => {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(getUserAvatarKey(userId))
  } catch (error) {
    console.error("Failed to load user avatar", error)
    return null
  }
}

const saveUserAvatar = (userId: string, avatar?: string) => {
  try {
    const key = getUserAvatarKey(userId)
    if (!avatar) {
      localStorage.removeItem(key)
      return
    }
    const maxSize = 512 * 1024 // 512KB
    if (avatar.length > maxSize) {
      console.warn("Avatar too large, skipping save")
      return
    }
    localStorage.setItem(key, avatar)
  } catch (error) {
    console.error("Failed to save avatar", error)
  }
}

const loadProfileOverrides = (): ProfileOverrides => {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(USER_PROFILES_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProfileOverrides) : {}
  } catch (error) {
    console.error("Failed to load profile overrides", error)
    return {}
  }
}

const saveProfileOverrides = (overrides: ProfileOverrides) => {
  try {
    const stringified = JSON.stringify(overrides)
    if (stringified.length > 2 * 1024 * 1024) {
      console.warn("Profile overrides payload is too large, clearing storage")
      localStorage.removeItem(USER_PROFILES_STORAGE_KEY)
      return
    }
    localStorage.setItem(USER_PROFILES_STORAGE_KEY, stringified)
  } catch (error) {
    console.error("Failed to save profile overrides", error)
    try {
      localStorage.removeItem(USER_PROFILES_STORAGE_KEY)
    } catch (removeError) {
      console.error("Failed to clear profile overrides storage", removeError)
    }
  }
}

const parseStoredUser = (value: string | null): User | null => {
  if (!value) return null
  try {
    const parsed = JSON.parse(value) as User
    if (parsed.createdAt) {
      parsed.createdAt = new Date(parsed.createdAt)
    }
    if (parsed.id) {
      const avatar = loadUserAvatar(parsed.id)
      if (avatar) {
        parsed.avatar = avatar
      }
    }
    return parsed
  } catch (error) {
    console.error("Failed to parse stored user", error)
    return null
  }
}

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activities, setActivities] = useState<ActivityEntry[]>([])
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

  const persistCurrentUser = (value: User | null) => {
    if (!value) return
    if (value.avatar) {
      saveUserAvatar(value.id, value.avatar)
    } else {
      saveUserAvatar(value.id, undefined)
    }
    const { avatar: _avatar, ...rest } = value
    const serialized = {
      ...rest,
      createdAt: value.createdAt ? new Date(value.createdAt).toISOString() : new Date().toISOString(),
    }
    try {
      localStorage.setItem("spk_user", JSON.stringify(serialized))
    } catch (error) {
      console.warn("Failed to persist user", error)
      try {
        localStorage.removeItem("spk_user")
      } catch (removeError) {
        console.warn("Failed to clear user storage", removeError)
      }
    }
  }

  useEffect(() => {
    // Check for saved session
    const savedUser = parseStoredUser(localStorage.getItem("spk_user"))
    if (savedUser) {
      setUser(savedUser)
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
    const savedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY)

    if (savedSidebarCollapsed) setSidebarCollapsed(savedSidebarCollapsed === "true")
    if (savedReportSettings) setReportSettings(JSON.parse(savedReportSettings))
    if (savedNotifications) {
      setNotifications(deserializeNotifications(savedNotifications))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const savedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY)
    if (savedActivities) {
      setActivities(deserializeActivities(savedActivities))
    }
  }, [])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "spk_app_settings" && e.newValue) {
        const parsed = JSON.parse(e.newValue)
        setAppName(parsed.appName || "SPK Multi-Metode")
        setAppSubtitle(parsed.appSubtitle || "SAW | AHP | TOPSIS")
        setAppLogoUrl(parsed.appLogoUrl || "")
      }
      if (e.key === NOTIFICATIONS_STORAGE_KEY) {
        if (e.newValue) {
          setNotifications(deserializeNotifications(e.newValue))
        } else {
          setNotifications([])
        }
      }
      if (e.key === USER_PROFILES_STORAGE_KEY && user) {
        const overrides = loadProfileOverrides()[user.id]
        if (overrides) {
          setUser((prev) => (prev ? { ...prev, ...overrides } : prev))
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [user])


  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = sampleUsers.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      const overrides = loadProfileOverrides()[foundUser.id]
      const mergedUser: User = {
        ...foundUser,
        ...(overrides || {}),
        avatar: loadUserAvatar(foundUser.id) || foundUser.avatar,
      }
      setUser(mergedUser)
      persistCurrentUser(mergedUser)
      void syncProfileFromServer(foundUser.id)
      logActivity("activity.login", foundUser.id)
      return true
    }
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const existingUser = sampleUsers.find((u) => u.email === email)
    if (existingUser) {
      return false
    }

    const newUser: User = {
      id: Date.now().toString(),
      nama: name,
      email,
      password,
      role: "viewer",
      createdAt: new Date(),
    }

    sampleUsers.push(newUser)
    setUser(newUser)
    persistCurrentUser(newUser)
    void syncProfileFromServer(newUser.id)
    logActivity("activity.register", newUser.id)
    return true
  }

  const logout = () => {
    if (user?.id) {
      logActivity("activity.logout", user.id)
    }
    setUser(null)
    localStorage.removeItem("spk_user")
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data }
      setUser(updated)
      persistCurrentUser(updated)
      const overrides = loadProfileOverrides()
      overrides[updated.id] = {
        ...(overrides[updated.id] || {}),
        ...(data.nama !== undefined ? { nama: data.nama } : {}),
        ...(data.email !== undefined ? { email: data.email } : {}),
      }
      if (data.avatar !== undefined) {
        saveUserAvatar(updated.id, data.avatar || undefined)
      }
      saveProfileOverrides(overrides)
      void persistProfileToServer(updated.id, {
        nama: data.nama,
        email: data.email,
        avatar: data.avatar,
      })
      logActivity("activity.profile_updated", updated.id)
      const sampleIdx = sampleUsers.findIndex((u) => u.id === updated.id)
      if (sampleIdx !== -1) {
        sampleUsers[sampleIdx] = { ...sampleUsers[sampleIdx], ...overrides[updated.id] }
        if (data.avatar !== undefined) {
          sampleUsers[sampleIdx].avatar = data.avatar
        }
      }
    }
  }

  async function syncProfileFromServer(userId: string) {
    try {
      const response = await fetch(`/api/profile/${userId}`)
      if (!response.ok) return
      const data = (await response.json()) as Partial<User>
      if (!data) return
      setUser((prev) => {
        if (!prev || prev.id !== userId) return prev
        const merged = { ...prev, ...data }
        if (data.avatar !== undefined) {
          saveUserAvatar(userId, data.avatar || undefined)
        }
        return merged
      })
      const overrides = loadProfileOverrides()
      overrides[userId] = {
        ...(overrides[userId] || {}),
        ...(data.nama ? { nama: data.nama } : {}),
        ...(data.email ? { email: data.email } : {}),
      }
      saveProfileOverrides(overrides)
    } catch (error) {
      console.error("Failed to sync profile from server", error)
    }
  }

  async function persistProfileToServer(
    userId: string,
    data: { nama?: string; email?: string; avatar?: string },
  ) {
    try {
      await fetch(`/api/profile/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error("Failed to save profile overrides", error)
    }
  }

  useEffect(() => {
    if (user?.id) {
      void syncProfileFromServer(user.id)
    }
  }, [user?.id])

  const updateAppSettings = (name: string, subtitle: string, logoUrl: string) => {
    setAppName(name)
    setAppSubtitle(subtitle)
    setAppLogoUrl(logoUrl)
    localStorage.setItem(
      "spk_app_settings",
      JSON.stringify({ appName: name, appSubtitle: subtitle, appLogoUrl: logoUrl }),
    )
    logActivity("activity.settings_updated")
  }

  const updateReportSettings = (settings: typeof reportSettings) => {
    setReportSettings(settings)
    localStorage.setItem("spk_report_settings", JSON.stringify(settings))
    logActivity("activity.settings_updated")
  }

  const handleSetSidebarCollapsed = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
    localStorage.setItem("spk_sidebar_collapsed", String(collapsed))
  }

  const persistNotifications = (items: Notification[]) => {
    try {
      if (items.length === 0) {
        localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY)
      } else {
        localStorage.setItem(
          NOTIFICATIONS_STORAGE_KEY,
          JSON.stringify(items.map((notif) => ({ ...notif, createdAt: notif.createdAt.toISOString() }))),
        )
      }
    } catch (error) {
      console.error("Failed to save notifications", error)
    }
  }

  const persistActivities = (items: ActivityEntry[]) => {
    try {
      if (items.length === 0) {
        localStorage.removeItem(ACTIVITIES_STORAGE_KEY)
      } else {
        localStorage.setItem(
          ACTIVITIES_STORAGE_KEY,
          JSON.stringify(items.map((item) => ({ ...item, createdAt: item.createdAt.toISOString() }))),
        )
      }
    } catch (error) {
      console.error("Failed to save activities", error)
    }
  }

  const logActivity = (actionKey: string, userIdOverride?: string) => {
    const targetUserId = userIdOverride || user?.id
    if (!targetUserId) return
    const newActivity: ActivityEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      userId: targetUserId,
      actionKey,
      createdAt: new Date(),
    }
    setActivities((prev) => {
      const next = [newActivity, ...prev].slice(0, MAX_ACTIVITY_ENTRIES)
      persistActivities(next)
      return next
    })
  }

  const updateNotificationsState = (updater: (prev: Notification[]) => Notification[]) => {
    setNotifications((prev) => {
      const next = updater(prev)
      persistNotifications(next)
      return next
    })
  }

  const markNotificationRead = (id: string) => {
    updateNotificationsState((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllNotificationsRead = () => {
    updateNotificationsState((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    updateNotificationsState((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAllNotifications = () => {
    updateNotificationsState(() => [])
  }

  const addNotification = (notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotif: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date(),
    }
    updateNotificationsState((prev) => [newNotif, ...prev])
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
        activities,
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
        logActivity,
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
