"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/components/ui/ios-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Shield, Calendar, Save, Camera, Activity, Clock } from "lucide-react"

export default function ProfilPage() {
  const { user, updateProfile } = useAuth()
  const { t, language } = useLanguage()
  const { showToast } = useToast()
  const [nama, setNama] = useState(user?.nama || "")
  const [email, setEmail] = useState(user?.email || "")

  const handleSave = () => {
    updateProfile({ nama, email })
    showToast(language === "id" ? "Profil berhasil diperbarui" : "Profile updated successfully", "success")
  }

  const roleColors = {
    admin: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    analis: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    viewer: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
  }

  const roleLabels = {
    admin: "Administrator",
    analis: language === "id" ? "Analis" : "Analyst",
    viewer: "Viewer",
  }

  const activities =
    language === "id"
      ? [
          { action: "Login ke sistem", time: "5 menit yang lalu" },
          { action: "Mengubah data alternatif", time: "1 jam yang lalu" },
          { action: "Melakukan perhitungan SAW", time: "2 jam yang lalu" },
          { action: "Export laporan PDF", time: "1 hari yang lalu" },
        ]
      : [
          { action: "Logged into system", time: "5 minutes ago" },
          { action: "Modified alternative data", time: "1 hour ago" },
          { action: "Performed SAW calculation", time: "2 hours ago" },
          { action: "Exported PDF report", time: "1 day ago" },
        ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("profile.title")}</h1>
        <p className="text-muted-foreground">{t("profile.subtitle")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Avatar & Quick Info */}
        <div className="space-y-6">
          {/* Avatar Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="h-28 w-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {user?.nama?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full shadow-md"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold">{user?.nama}</h2>
                <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
                <Badge className={roleColors[user?.role || "viewer"]}>{roleLabels[user?.role || "viewer"]}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4" />
                {language === "id" ? "Statistik Akun" : "Account Statistics"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("common.status")}</span>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                >
                  {language === "id" ? "Aktif" : "Active"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === "id" ? "Total Login" : "Total Logins"}
                </span>
                <span className="text-sm font-medium">{language === "id" ? "24 kali" : "24 times"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === "id" ? "Terakhir Login" : "Last Login"}
                </span>
                <span className="text-sm font-medium">{language === "id" ? "Hari ini" : "Today"}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                {t("profile.personal_info")}
              </CardTitle>
              <CardDescription>{t("profile.personal_info_desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nama" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t("profile.full_name")}
                  </Label>
                  <Input
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder={language === "id" ? "Masukkan nama lengkap" : "Enter full name"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t("auth.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === "id" ? "Masukkan email" : "Enter email"}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {t("profile.role")}
                  </Label>
                  <Input value={roleLabels[user?.role || "viewer"]} disabled />
                  <p className="text-xs text-muted-foreground">{t("profile.role_note")}</p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {t("profile.registered_since")}
                  </Label>
                  <Input
                    value={
                      user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "-"
                    }
                    disabled
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full sm:w-auto">
                <Save className="mr-2 h-4 w-4" />
                {t("profile.save_changes")}
              </Button>
            </CardContent>
          </Card>

          {/* Activity Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {language === "id" ? "Aktivitas Terakhir" : "Recent Activity"}
              </CardTitle>
              <CardDescription>
                {language === "id" ? "Riwayat aktivitas akun Anda" : "Your account activity history"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm">{activity.action}</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
