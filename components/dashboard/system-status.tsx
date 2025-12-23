"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useSettings } from "@/lib/settings-context"
import { Clock, Database, Server, Shield } from "lucide-react"
import { format } from "date-fns"
import { id as idLocale, enUS } from "date-fns/locale"

export function SystemStatus() {
  const { language, t } = useLanguage()
  const { backupSettings } = useSettings()

  const statusItems = [
    {
      icon: Server,
      label: t("system.server_status"),
      status: "online",
      statusText: t("system.online"),
    },
    {
      icon: Database,
      label: t("system.database"),
      status: "online",
      statusText: t("system.connected"),
    },
    {
      icon: Shield,
      label: t("settings.security"),
      status: "online",
      statusText: t("system.active"),
    },
    {
      icon: Clock,
      label: t("backup.last_backup"),
      status: backupSettings.lastBackup ? "online" : "warning",
      statusText: backupSettings.lastBackup
        ? format(backupSettings.lastBackup, "dd MMM yyyy, HH:mm", {
            locale: language === "id" ? idLocale : enUS,
          })
        : t("backup.never"),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("dashboard.system_status")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {statusItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.status === "online"
                        ? "bg-emerald-500"
                        : item.status === "warning"
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs text-muted-foreground">{item.statusText}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
