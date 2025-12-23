"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useSPK } from "@/lib/spk-context"
import { useLanguage } from "@/lib/language-context"
import { Users, ListChecks, Calculator, Trophy } from "lucide-react"

export function StatsCards() {
  const { alternatif, kriteria, metodeConfig } = useSPK()
  const { t } = useLanguage()

  const activeMetode = metodeConfig.filter((m) => m.aktif).length

  const stats = [
    {
      titleKey: "dashboard.total_alternatif",
      value: alternatif.length,
      icon: Users,
      color: "bg-chart-1",
      change: `+2 ${t("dashboard.new")}`,
    },
    {
      titleKey: "dashboard.total_kriteria",
      value: kriteria.length,
      icon: ListChecks,
      color: "bg-chart-2",
      change: `${t("dashboard.weight")}: ${kriteria.reduce((sum, k) => sum + k.bobot, 0).toFixed(2)}`,
    },
    {
      titleKey: "dashboard.metode_aktif",
      value: activeMetode,
      icon: Calculator,
      color: "bg-chart-3",
      change: metodeConfig
        .filter((m) => m.aktif)
        .map((m) => m.nama)
        .join(", "),
    },
    {
      titleKey: "dashboard.total_metode",
      value: metodeConfig.length,
      icon: Trophy,
      color: "bg-chart-4",
      change: "SAW, AHP, TOPSIS",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.titleKey} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t(stat.titleKey)}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div className={`rounded-lg ${stat.color} p-3`}>
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
