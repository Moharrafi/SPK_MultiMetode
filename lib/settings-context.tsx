"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/ios-toast"
import { useAuth } from "@/lib/auth-context"
import {
  AppSettings,
  BackupSettings,
  DashboardWidgets,
  ReportSettings,
  SettingsKey,
  SettingsSnapshot,
  calculateNextBackup,
  deserializeBackupSettings,
  getDefaultSettings,
  serializeBackupSettings,
  defaultAppSettings,
  defaultReportSettings,
  defaultDashboardWidgets,
  defaultBackupSettings,
} from "@/lib/settings-data"

type PerformBackupOptions = {
  download?: boolean
}

interface SettingsContextType {
  dashboardWidgets: DashboardWidgets
  backupSettings: BackupSettings
  reportSettings: ReportSettings
  appSettings: AppSettings
  updateDashboardWidgets: (widgets: Partial<DashboardWidgets>) => void
  updateBackupSettings: (settings: Partial<BackupSettings>) => void
  updateReportSettings: (settings: Partial<ReportSettings>) => void
  updateAppSettings: (settings: Partial<AppSettings>) => void
  performBackup: (options?: PerformBackupOptions) => Promise<void>
}

const SettingsContext = createContext<SettingsContextType | null>(null)

const SETTINGS_CACHE_KEY = "spk_settings_cache"

const getCachedSettings = (): Partial<SettingsSnapshot> | null => {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SETTINGS_CACHE_KEY)
    return raw ? (JSON.parse(raw) as Partial<SettingsSnapshot>) : null
  } catch (error) {
    console.error("Failed to read cached settings", error)
    return null
  }
}

const cacheSettingsSnapshot = (snapshot: Partial<SettingsSnapshot>) => {
  if (typeof window === "undefined") return
  try {
    const existing = getCachedSettings() || {}
    const merged = { ...existing, ...snapshot }
    localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(merged))
  } catch (error) {
    console.error("Failed to cache settings", error)
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const defaults = getDefaultSettings()

  const [dashboardWidgets, setDashboardWidgets] = useState<DashboardWidgets>(defaultDashboardWidgets)
  const [backupSettings, setBackupSettings] = useState<BackupSettings>(defaultBackupSettings)
  const [reportSettings, setReportSettings] = useState<ReportSettings>(defaultReportSettings)
  const [appSettings, setAppSettings] = useState<AppSettings>(defaultAppSettings)
  const { showToast } = useToast()
  const { logActivity } = useAuth()

  const applySettingsSnapshot = (snapshot: Partial<SettingsSnapshot>) => {
    if (snapshot.dashboardWidgets) {
      setDashboardWidgets((prev) => ({ ...prev, ...snapshot.dashboardWidgets! }))
    }
    if (snapshot.reportSettings) {
      setReportSettings((prev) => ({ ...prev, ...snapshot.reportSettings! }))
    }
    if (snapshot.appSettings) {
      setAppSettings((prev) => ({ ...prev, ...snapshot.appSettings! }))
    }
    if (snapshot.backupSettings) {
      let mergedBackup = deserializeBackupSettings(snapshot.backupSettings)
      if (mergedBackup.enabled && !mergedBackup.nextBackup) {
        mergedBackup = { ...mergedBackup, nextBackup: calculateNextBackup(mergedBackup.frequency) }
      }
      setBackupSettings(mergedBackup)
    }
  }

  useEffect(() => {
    const cached = getCachedSettings()
    if (cached) {
      applySettingsSnapshot(cached)
    }

    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings", { cache: "no-store" })
        if (!response.ok) throw new Error("Failed to load settings")
        const data = await response.json()

        applySettingsSnapshot({
          dashboardWidgets: { ...defaults.dashboardWidgets, ...(data.dashboardWidgets || {}) },
          reportSettings: { ...defaults.reportSettings, ...(data.reportSettings || {}) },
          appSettings: { ...defaults.appSettings, ...(data.appSettings || {}) },
          backupSettings: data.backupSettings || defaults.backupSettings,
        })
        cacheSettingsSnapshot(data)
      } catch (error) {
        console.warn("Failed to fetch settings, using cached values", error)
        const cachedFallback = getCachedSettings()
        if (cachedFallback) {
          applySettingsSnapshot({
            dashboardWidgets: cachedFallback.dashboardWidgets || defaults.dashboardWidgets,
            reportSettings: cachedFallback.reportSettings || defaults.reportSettings,
            appSettings: cachedFallback.appSettings || defaults.appSettings,
            backupSettings: cachedFallback.backupSettings || defaults.backupSettings,
          })
        }
      }
    }

    fetchSettings()
  }, [])

  const persistSetting = async (key: SettingsKey, data: unknown) => {
    try {
      await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, data }),
      })
    } catch (error) {
      console.warn("Failed to persist setting", error)
      showToast("Gagal menyimpan pengaturan ke server", "error")
    }
  }

  useEffect(() => {
    if (!backupSettings.enabled || !backupSettings.nextBackup) return

    const checkBackup = () => {
      const now = new Date()
      if (backupSettings.nextBackup && now >= backupSettings.nextBackup) {
        void performBackup()
      }
    }

    const interval = setInterval(checkBackup, 60000)
    return () => clearInterval(interval)
  }, [backupSettings.enabled, backupSettings.nextBackup])

  const guardedUpdate = <T extends SettingsKey>(
    key: T,
    updater: (prev: SettingsSnapshot[T]) => SettingsSnapshot[T],
  ) => {
    switch (key) {
      case "dashboardWidgets":
        setDashboardWidgets((prev) => {
          const updated = updater(prev)
          void persistSetting("dashboardWidgets", updated)
          cacheSettingsSnapshot({ dashboardWidgets: updated })
          return updated
        })
        break
      case "backupSettings":
        setBackupSettings((prev) => {
          const updated = updater(prev)
          void persistSetting("backupSettings", serializeBackupSettings(updated))
          cacheSettingsSnapshot({ backupSettings: updated })
          return updated
        })
        break
      case "reportSettings":
        setReportSettings((prev) => {
          const updated = updater(prev)
          void persistSetting("reportSettings", updated)
          cacheSettingsSnapshot({ reportSettings: updated })
          return updated
        })
        break
      case "appSettings":
        setAppSettings((prev) => {
          const updated = updater(prev)
          void persistSetting("appSettings", updated)
          cacheSettingsSnapshot({ appSettings: updated })
          return updated
        })
        break
    }
  }

  const updateDashboardWidgets = (widgets: Partial<DashboardWidgets>) => {
    guardedUpdate("dashboardWidgets", (prev) => ({ ...prev, ...widgets }))
  }

  const updateBackupSettings = (settings: Partial<BackupSettings>) => {
    guardedUpdate("backupSettings", (prev) => {
      const updated = { ...prev, ...settings }
      if (settings.frequency && settings.frequency !== prev.frequency) {
        updated.nextBackup = calculateNextBackup(settings.frequency)
      }
      if (updated.enabled && !updated.nextBackup) {
        updated.nextBackup = calculateNextBackup(updated.frequency)
      }
      if (!updated.enabled) {
        updated.nextBackup = null
      }
      return updated
    })
  }

  const updateReportSettings = (settings: Partial<ReportSettings>) => {
    guardedUpdate("reportSettings", (prev) => ({ ...prev, ...settings }))
    logActivity("activity.settings_updated")
  }

  const updateAppSettings = (settings: Partial<AppSettings>) => {
    guardedUpdate("appSettings", (prev) => ({ ...prev, ...settings }))
    logActivity("activity.settings_updated")
  }

  const performBackup = async (options?: PerformBackupOptions) => {
    try {
      const response = await fetch("/api/backup", { method: "POST" })
      if (!response.ok) {
        throw new Error("Backup request failed")
      }

      const payload = (await response.json()) as {
        fileName: string
        contents: { generatedAt: string; [key: string]: unknown }
      }

      const backupTime = payload.contents.generatedAt ? new Date(payload.contents.generatedAt) : new Date()

      guardedUpdate("backupSettings", (prev) => ({
        ...prev,
        lastBackup: backupTime,
        nextBackup: calculateNextBackup(prev.frequency, backupTime),
      }))

      if (options?.download) {
        const blob = new Blob([JSON.stringify(payload.contents, null, 2)], {
          type: "application/json",
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = payload.fileName
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)
      }

      showToast("Backup berhasil dilakukan", "success")
      logActivity("activity.backup_complete")
    } catch (error) {
      console.error("Failed to perform backup", error)
      showToast("Gagal melakukan backup", "error")
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        dashboardWidgets,
        backupSettings,
        reportSettings,
        appSettings,
        updateDashboardWidgets,
        updateBackupSettings,
        updateReportSettings,
        updateAppSettings,
        performBackup,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider")
  }
  return context
}
