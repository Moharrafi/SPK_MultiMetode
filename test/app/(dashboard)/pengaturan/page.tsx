"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { useSettings } from "@/lib/settings-context"
import { useToast } from "@/components/ui/ios-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  Moon,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Save,
  Shield,
  Palette,
  Type,
  FileText,
  LayoutDashboard,
  Download,
  Clock,
  X,
  Upload,
} from "lucide-react"
import { format } from "date-fns"
import { id as idLocale, enUS } from "date-fns/locale"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function PengaturanPage() {
  const { user } = useAuth()
  const { language, setLanguage } = useLanguage() // Declare setLanguage here
  const {
    dashboardWidgets,
    backupSettings,
    reportSettings,
    appSettings,
    updateDashboardWidgets,
    updateBackupSettings,
    updateReportSettings,
    updateAppSettings,
    performBackup,
  } = useSettings()
  const { showToast } = useToast()

  const [isDark, setIsDark] = useState(false)
  const [notifEnabled, setNotifEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const [localAppName, setLocalAppName] = useState(appSettings.appName)
  const [localAppSubtitle, setLocalAppSubtitle] = useState(appSettings.appSubtitle)
  const [localAppLogo, setLocalAppLogo] = useState(appSettings.appLogoUrl)
  const [localReportSettings, setLocalReportSettings] = useState(reportSettings)
  const [logoPreview, setLogoPreview] = useState(reportSettings.logoUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOldPass, setShowOldPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  useEffect(() => {
    setLocalAppName(appSettings.appName)
    setLocalAppSubtitle(appSettings.appSubtitle)
    setLocalAppLogo(appSettings.appLogoUrl)
  }, [appSettings])

  useEffect(() => {
    setLocalReportSettings(reportSettings)
    setLogoPreview(reportSettings.logoUrl)
  }, [reportSettings])

  const handleThemeChange = (dark: boolean) => {
    setIsDark(dark)
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    showToast(
      language === "id" ? `Mode ${dark ? "gelap" : "terang"} diaktifkan` : `${dark ? "Dark" : "Light"} mode enabled`,
      "success",
    )
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as "id" | "en")
    showToast(lang === "id" ? "Bahasa diubah ke Indonesia" : "Language changed to English", "success")
  }

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showToast(language === "id" ? "Semua field harus diisi" : "All fields are required", "error")
      return
    }
    if (newPassword !== confirmPassword) {
      showToast(language === "id" ? "Password baru tidak cocok" : "New passwords don't match", "error")
      return
    }
    if (newPassword.length < 6) {
      showToast(language === "id" ? "Password minimal 6 karakter" : "Password must be at least 6 characters", "error")
      return
    }
    showToast(language === "id" ? "Password berhasil diubah" : "Password changed successfully", "success")
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleSaveAppSettings = () => {
    updateAppSettings({
      appName: localAppName,
      appSubtitle: localAppSubtitle,
      appLogoUrl: localAppLogo,
    })
    showToast(
      language === "id" ? "Pengaturan aplikasi berhasil disimpan" : "App settings saved successfully",
      "success",
    )
  }

  const handleSaveReportSettings = () => {
    updateReportSettings(localReportSettings)
    showToast(
      language === "id" ? "Pengaturan laporan berhasil disimpan" : "Report settings saved successfully",
      "success",
    )
  }

  const handleBackupNow = () => {
    void performBackup({ download: true })
  }

  const handleSaveSettings = () => {
    showToast(language === "id" ? "Pengaturan berhasil disimpan" : "Settings saved successfully", "success")
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        showToast(language === "id" ? "File harus berupa gambar" : "File must be an image", "error")
        return
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        showToast(language === "id" ? "Ukuran file maksimal 2MB" : "Maximum file size is 2MB", "error")
        return
      }

      // Convert to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setLogoPreview(base64String)
        setLocalReportSettings({ ...localReportSettings, logoUrl: base64String })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    setLogoPreview("")
    setLocalReportSettings({ ...localReportSettings, logoUrl: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAppLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.match(/image\/(png|jpg|jpeg)/)) {
      showToast(
        language === "id" ? "Format file harus PNG, JPG, atau JPEG" : "File format must be PNG, JPG, or JPEG",
        "error",
      )
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast(language === "id" ? "Ukuran file maksimal 2MB" : "Maximum file size is 2MB", "error")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setLocalAppLogo(base64String)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveAppLogo = () => {
    setLocalAppLogo("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{language === "id" ? "Pengaturan" : "Settings"}</h1>
        <p className="text-muted-foreground">
          {language === "id" ? "Kelola pengaturan aplikasi Anda" : "Manage your app settings"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900/30 p-2">
                  <Type className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">{language === "id" ? "Nama Aplikasi" : "App Name"}</CardTitle>
                  <CardDescription>
                    {language === "id" ? "Ubah nama dan subtitle aplikasi" : "Change app name and subtitle"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{language === "id" ? "Logo Aplikasi" : "Application Logo"}</Label>
                {localAppLogo && (
                  <div className="relative inline-block">
                    <img
                      src={localAppLogo || "/placeholder.svg"}
                      alt="App Logo"
                      className="h-20 w-20 rounded-lg border object-contain"
                    />
                    <button
                      onClick={handleRemoveAppLogo}
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={handleAppLogoUpload}
                    className="hidden"
                    id="app-logo-upload"
                  />
                  <label htmlFor="app-logo-upload">
                    <Button type="button" variant="outline" className="cursor-pointer bg-transparent" asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        {language === "id" ? "Upload Logo" : "Upload Logo"}
                      </span>
                    </Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === "id" ? "Format: PNG, JPG, JPEG (Maks. 2MB)" : "Format: PNG, JPG, JPEG (Max. 2MB)"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{language === "id" ? "Nama Aplikasi" : "App Name"}</Label>
                <Input
                  value={localAppName}
                  onChange={(e) => setLocalAppName(e.target.value)}
                  placeholder="SPK Multi-Metode"
                />
              </div>
              <div className="space-y-2">
                <Label>{language === "id" ? "Subtitle Aplikasi" : "App Subtitle"}</Label>
                <Input
                  value={localAppSubtitle}
                  onChange={(e) => setLocalAppSubtitle(e.target.value)}
                  placeholder="SAW | AHP | TOPSIS"
                />
              </div>
              <Button onClick={handleSaveAppSettings} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {language === "id" ? "Simpan Nama Aplikasi" : "Save App Name"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-100 dark:bg-cyan-900/30 p-2">
                  <FileText className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {language === "id" ? "Pengaturan Laporan PDF" : "PDF Report Settings"}
                  </CardTitle>
                  <CardDescription>
                    {language === "id" ? "Konfigurasi header dan footer laporan" : "Configure report header and footer"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{language === "id" ? "Logo Laporan" : "Report Logo"}</Label>
                <div className="flex items-start gap-4">
                  {logoPreview && (
                    <div className="relative">
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo Preview"
                        className="h-20 w-20 object-contain border rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={handleRemoveLogo}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {language === "id" ? "Upload Logo" : "Upload Logo"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      {language === "id" ? "Format: PNG, JPG, JPEG. Maksimal 2MB" : "Format: PNG, JPG, JPEG. Max 2MB"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{language === "id" ? "Nama Organisasi/Project" : "Organization/Project Name"}</Label>
                <Input
                  value={localReportSettings.organizationName}
                  onChange={(e) => setLocalReportSettings({ ...localReportSettings, organizationName: e.target.value })}
                  placeholder="Sistem Pendukung Keputusan Multi Metode"
                />
              </div>
              <div className="space-y-2">
                <Label>{language === "id" ? "Lokasi" : "Location"}</Label>
                <Input
                  value={localReportSettings.location}
                  onChange={(e) => setLocalReportSettings({ ...localReportSettings, location: e.target.value })}
                  placeholder="Jakarta"
                />
              </div>
              <div className="space-y-2">
                <Label>{language === "id" ? "Nama Ketua/Penanggung Jawab" : "Leader/Responsible Person Name"}</Label>
                <Input
                  value={localReportSettings.leaderName}
                  onChange={(e) => setLocalReportSettings({ ...localReportSettings, leaderName: e.target.value })}
                  placeholder="Nama Ketua"
                />
              </div>
              <div className="space-y-2">
                <Label>{language === "id" ? "Jabatan/NIP" : "Position/ID"}</Label>
                <Input
                  value={localReportSettings.leaderTitle}
                  onChange={(e) => setLocalReportSettings({ ...localReportSettings, leaderTitle: e.target.value })}
                  placeholder="NIP. 123456789"
                />
              </div>
              <Button onClick={handleSaveReportSettings} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {language === "id" ? "Simpan Pengaturan Laporan" : "Save Report Settings"}
              </Button>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                  <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">{language === "id" ? "Penampilan" : "Appearance"}</CardTitle>
                  <CardDescription>
                    {language === "id" ? "Sesuaikan tampilan aplikasi" : "Customize app appearance"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    {language === "id" ? "Mode Gelap" : "Dark Mode"}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === "id" ? "Aktifkan tema gelap" : "Enable dark theme"}
                  </p>
                </div>
                <Switch checked={isDark} onCheckedChange={handleThemeChange} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {language === "id" ? "Bahasa" : "Language"}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === "id" ? "Pilih bahasa tampilan" : "Select display language"}
                  </p>
                </div>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Widgets */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 dark:bg-orange-900/30 p-2">
                  <LayoutDashboard className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {language === "id" ? "Widget Dashboard" : "Dashboard Widgets"}
                  </CardTitle>
                  <CardDescription>
                    {language === "id" ? "Kustomisasi widget dashboard" : "Customize dashboard widgets"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>{language === "id" ? "Kartu Statistik" : "Stats Cards"}</Label>
                <Switch
                  checked={dashboardWidgets.statsCards}
                  onCheckedChange={(checked) => updateDashboardWidgets({ statsCards: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>{language === "id" ? "Grafik Metode" : "Method Chart"}</Label>
                <Switch
                  checked={dashboardWidgets.methodChart}
                  onCheckedChange={(checked) => updateDashboardWidgets({ methodChart: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>{language === "id" ? "Tindakan Cepat" : "Quick Actions"}</Label>
                <Switch
                  checked={dashboardWidgets.quickActions}
                  onCheckedChange={(checked) => updateDashboardWidgets({ quickActions: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>{language === "id" ? "Peringkat Teratas" : "Top Ranking"}</Label>
                <Switch
                  checked={dashboardWidgets.topRanking}
                  onCheckedChange={(checked) => updateDashboardWidgets({ topRanking: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>{language === "id" ? "Aktivitas Terbaru" : "Recent Activity"}</Label>
                <Switch
                  checked={dashboardWidgets.recentActivity}
                  onCheckedChange={(checked) => updateDashboardWidgets({ recentActivity: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>{language === "id" ? "Status Sistem" : "System Status"}</Label>
                <Switch
                  checked={dashboardWidgets.systemStatus}
                  onCheckedChange={(checked) => updateDashboardWidgets({ systemStatus: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                  <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">{language === "id" ? "Notifikasi" : "Notifications"}</CardTitle>
                  <CardDescription>
                    {language === "id" ? "Atur preferensi notifikasi" : "Set notification preferences"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{language === "id" ? "Aktifkan Notifikasi" : "Enable Notifications"}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === "id" ? "Terima notifikasi dari sistem" : "Receive system notifications"}
                  </p>
                </div>
                <Switch checked={notifEnabled} onCheckedChange={setNotifEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{language === "id" ? "Suara" : "Sound"}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === "id" ? "Putar suara saat ada notifikasi" : "Play sound for notifications"}
                  </p>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-2">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">{language === "id" ? "Data & Privasi" : "Data & Privacy"}</CardTitle>
                  <CardDescription>
                    {language === "id" ? "Kelola data dan privasi Anda" : "Manage your data and privacy"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{language === "id" ? "Backup Otomatis" : "Auto Backup"}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === "id" ? "Backup data secara otomatis" : "Automatically backup data"}
                  </p>
                </div>
                <Switch
                  checked={backupSettings.enabled}
                  onCheckedChange={(checked) => updateBackupSettings({ enabled: checked })}
                />
              </div>

              {backupSettings.enabled && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {language === "id" ? "Frekuensi Backup" : "Backup Frequency"}
                      </Label>
                    </div>
                    <Select
                      value={backupSettings.frequency}
                      onValueChange={(value) =>
                        updateBackupSettings({ frequency: value as "daily" | "weekly" | "monthly" })
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">{language === "id" ? "Harian" : "Daily"}</SelectItem>
                        <SelectItem value="weekly">{language === "id" ? "Mingguan" : "Weekly"}</SelectItem>
                        <SelectItem value="monthly">{language === "id" ? "Bulanan" : "Monthly"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {language === "id" ? "Backup Terakhir" : "Last Backup"}:
                      </span>
                      <span>
                        {backupSettings.lastBackup
                          ? format(backupSettings.lastBackup, "dd MMM yyyy, HH:mm", {
                              locale: language === "id" ? idLocale : enUS,
                            })
                          : language === "id"
                            ? "Belum pernah"
                            : "Never"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {language === "id" ? "Backup Berikutnya" : "Next Backup"}:
                      </span>
                      <span>
                        {backupSettings.nextBackup
                          ? format(backupSettings.nextBackup, "dd MMM yyyy, HH:mm", {
                              locale: language === "id" ? idLocale : enUS,
                            })
                          : "-"}
                      </span>
                    </div>
                  </div>

                  <Button onClick={handleBackupNow} variant="outline" className="w-full bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    {language === "id" ? "Backup Sekarang" : "Backup Now"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                  <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">{language === "id" ? "Keamanan" : "Security"}</CardTitle>
                  <CardDescription>
                    {language === "id" ? "Ubah password akun Anda" : "Change your account password"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{language === "id" ? "Password Lama" : "Old Password"}</Label>
                <div className="relative">
                  <Input
                    type={showOldPass ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder={language === "id" ? "Masukkan password lama" : "Enter old password"}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowOldPass(!showOldPass)}
                  >
                    {showOldPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{language === "id" ? "Password Baru" : "New Password"}</Label>
                <div className="relative">
                  <Input
                    type={showNewPass ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={language === "id" ? "Masukkan password baru" : "Enter new password"}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowNewPass(!showNewPass)}
                  >
                    {showNewPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{language === "id" ? "Konfirmasi Password Baru" : "Confirm New Password"}</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={language === "id" ? "Konfirmasi password baru" : "Confirm new password"}
                />
              </div>

              <Button onClick={handlePasswordChange} variant="outline" className="w-full bg-transparent">
                <Lock className="mr-2 h-4 w-4" />
                {language === "id" ? "Ubah Password" : "Change Password"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
        <Save className="mr-2 h-4 w-4" />
        {language === "id" ? "Simpan Semua Pengaturan" : "Save All Settings"}
      </Button>
    </div>
  )
}
