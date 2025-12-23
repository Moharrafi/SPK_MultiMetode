export interface DashboardWidgets {
  statsCards: boolean
  methodChart: boolean
  quickActions: boolean
  topRanking: boolean
  recentActivity: boolean
  systemStatus: boolean
}

export interface BackupSettings {
  enabled: boolean
  frequency: 'daily' | 'weekly' | 'monthly'
  lastBackup: Date | string | null
  nextBackup: Date | string | null
}

export interface ReportSettings {
  organizationName: string
  location: string
  leaderName: string
  leaderTitle: string
  logoUrl: string
}

export interface AppSettings {
  appName: string
  appSubtitle: string
  appLogoUrl: string
}

export interface SettingsSnapshot {
  dashboardWidgets: DashboardWidgets
  backupSettings: BackupSettings
  reportSettings: ReportSettings
  appSettings: AppSettings
}

export type SettingsKey = keyof SettingsSnapshot

export const SETTINGS_KEYS: SettingsKey[] = ['dashboardWidgets', 'backupSettings', 'reportSettings', 'appSettings']

export const defaultDashboardWidgets: DashboardWidgets = {
  statsCards: true,
  methodChart: true,
  quickActions: true,
  topRanking: true,
  recentActivity: true,
  systemStatus: true,
}

export const defaultBackupSettings: BackupSettings = {
  enabled: true,
  frequency: 'weekly',
  lastBackup: null,
  nextBackup: null,
}

export const defaultReportSettings: ReportSettings = {
  organizationName: 'Sistem Pendukung Keputusan Multi Metode',
  location: 'Jakarta',
  leaderName: 'Nama Ketua',
  leaderTitle: 'NIP. 123456789',
  logoUrl: '',
}

export const defaultAppSettings: AppSettings = {
  appName: 'SPK Multi-Metode',
  appSubtitle: 'SAW | AHP | TOPSIS',
  appLogoUrl: '',
}

export function getDefaultSettings(): SettingsSnapshot {
  return {
    dashboardWidgets: { ...defaultDashboardWidgets },
    backupSettings: { ...defaultBackupSettings },
    reportSettings: { ...defaultReportSettings },
    appSettings: { ...defaultAppSettings },
  }
}

export function calculateNextBackup(frequency: BackupSettings['frequency'], from: Date = new Date()): Date {
  const next = new Date(from)
  switch (frequency) {
    case 'daily':
      next.setDate(next.getDate() + 1)
      break
    case 'weekly':
      next.setDate(next.getDate() + 7)
      break
    case 'monthly':
      next.setMonth(next.getMonth() + 1)
      break
  }
  return next
}

export function deserializeBackupSettings(data?: Partial<BackupSettings> | null): BackupSettings {
  const merged = { ...defaultBackupSettings, ...(data || {}) }
  return {
    ...merged,
    lastBackup: merged.lastBackup ? new Date(merged.lastBackup) : null,
    nextBackup: merged.nextBackup ? new Date(merged.nextBackup) : null,
  }
}

export function serializeBackupSettings(settings: BackupSettings) {
  return {
    ...settings,
    lastBackup: settings.lastBackup ? new Date(settings.lastBackup).toISOString() : null,
    nextBackup: settings.nextBackup ? new Date(settings.nextBackup).toISOString() : null,
  }
}
