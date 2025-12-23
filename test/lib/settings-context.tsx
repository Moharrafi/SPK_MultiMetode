"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/ios-toast"

interface DashboardWidgets {
  statsCards: boolean
  methodChart: boolean
  quickActions: boolean
  topRanking: boolean
  recentActivity: boolean
  systemStatus: boolean
}

interface BackupSettings {
  enabled: boolean
  frequency: "daily" | "weekly" | "monthly"
  lastBackup: Date | null
  nextBackup: Date | null
}

interface ReportSettings {
  organizationName: string
  location: string
  leaderName: string
  leaderTitle: string
  logoUrl: string // Logo URL for PDF reports
}

interface AppSettings {
  appName: string
  appSubtitle: string
  appLogoUrl: string // Logo URL for application
}

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

const defaultWidgets: DashboardWidgets = {
  statsCards: true,
  methodChart: true,
  quickActions: true,
  topRanking: true,
  recentActivity: true,
  systemStatus: true,
}

const defaultBackupSettings: BackupSettings = {
  enabled: true,
  frequency: "weekly",
  lastBackup: null,
  nextBackup: null,
}

const defaultReportSettings: ReportSettings = {
  organizationName: "Sistem Pendukung Keputusan Multi Metode",
  location: "Jakarta",
  leaderName: "Nama Ketua",
  leaderTitle: "NIP. 123456789",
  logoUrl: "",
}

const defaultAppSettings: AppSettings = {
  appName: "SPK Multi-Metode",
  appSubtitle: "SAW | AHP | TOPSIS",
  appLogoUrl: "",
}

function calculateNextBackup(frequency: "daily" | "weekly" | "monthly", from: Date = new Date()): Date {
  const next = new Date(from)
  switch (frequency) {
    case "daily":
      next.setDate(next.getDate() + 1)
      break
    case "weekly":
      next.setDate(next.getDate() + 7)
      break
    case "monthly":
      next.setMonth(next.getMonth() + 1)
      break
  }
  return next
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [dashboardWidgets, setDashboardWidgets] = useState<DashboardWidgets>(defaultWidgets)
  const [backupSettings, setBackupSettings] = useState<BackupSettings>(defaultBackupSettings)
  const [reportSettings, setReportSettings] = useState<ReportSettings>(defaultReportSettings)
  const [appSettings, setAppSettings] = useState<AppSettings>(defaultAppSettings)
  const { showToast } = useToast()

  useEffect(() => {
    // Load saved settings
    const savedWidgets = localStorage.getItem("spk_dashboard_widgets")
    const savedBackup = localStorage.getItem("spk_backup_settings")
    const savedReport = localStorage.getItem("spk_report_settings")
    const savedApp = localStorage.getItem("spk_app_settings")

    if (savedWidgets) {
      setDashboardWidgets(JSON.parse(savedWidgets))
    }

    if (savedBackup) {
      const parsed = JSON.parse(savedBackup)
      setBackupSettings({
        ...parsed,
        lastBackup: parsed.lastBackup ? new Date(parsed.lastBackup) : null,
        nextBackup: parsed.nextBackup ? new Date(parsed.nextBackup) : null,
      })
    } else {
      // Set initial next backup
      setBackupSettings((prev) => ({
        ...prev,
        nextBackup: calculateNextBackup(prev.frequency),
      }))
    }

    if (savedReport) {
      setReportSettings(JSON.parse(savedReport))
    }

    if (savedApp) {
      setAppSettings(JSON.parse(savedApp))
    }
  }, [])

  useEffect(() => {
    if (!backupSettings.enabled || !backupSettings.nextBackup) return

    const checkBackup = () => {
      const now = new Date()
      if (backupSettings.nextBackup && now >= backupSettings.nextBackup) {
        void performBackup()
      }
    }

    // Check every minute
    const interval = setInterval(checkBackup, 60000)
    return () => clearInterval(interval)
  }, [backupSettings.enabled, backupSettings.nextBackup])

  const updateDashboardWidgets = (widgets: Partial<DashboardWidgets>) => {
    setDashboardWidgets((prev) => {
      const updated = { ...prev, ...widgets }
      localStorage.setItem("spk_dashboard_widgets", JSON.stringify(updated))
      return updated
    })
  }

  const updateBackupSettings = (settings: Partial<BackupSettings>) => {
    setBackupSettings((prev) => {
      const updated = { ...prev, ...settings }

      // Recalculate next backup if frequency changed
      if (settings.frequency && settings.frequency !== prev.frequency) {
        updated.nextBackup = calculateNextBackup(settings.frequency)
      }

      localStorage.setItem("spk_backup_settings", JSON.stringify(updated))
      return updated
    })
  }

  const updateReportSettings = (settings: Partial<ReportSettings>) => {
    setReportSettings((prev) => {
      const updated = { ...prev, ...settings }
      localStorage.setItem("spk_report_settings", JSON.stringify(updated))
      return updated
    })
  }

  const updateAppSettings = (settings: Partial<AppSettings>) => {
    setAppSettings((prev) => {
      const updated = { ...prev, ...settings }
      localStorage.setItem("spk_app_settings", JSON.stringify(updated))
      return updated
    })
  }

  const performBackup = async () => {
    // Simulate backup process
    const now = new Date()
    const backupData = {
      timestamp: now.toISOString(),
      widgets: dashboardWidgets,
      reportSettings,
    }

    localStorage.setItem("spk_backup_data", JSON.stringify(backupData))

    const newSettings = {
      ...backupSettings,
      lastBackup: now,
      nextBackup: calculateNextBackup(backupSettings.frequency, now),
    }

    setBackupSettings(newSettings)
    localStorage.setItem("spk_backup_settings", JSON.stringify(newSettings))

    showToast("Backup berhasil dilakukan", "success")
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
