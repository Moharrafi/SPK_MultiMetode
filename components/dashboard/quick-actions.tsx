"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { ClipboardList, Settings2, FileText, Calculator } from "lucide-react"

export function QuickActions() {
  const { t } = useLanguage()

  const actions = [
    {
      titleKey: "quick.penilaian",
      descKey: "quick.penilaian_desc",
      href: "/penilaian",
      icon: ClipboardList,
      color: "bg-chart-1 hover:bg-chart-1/90",
    },
    {
      titleKey: "quick.metode",
      descKey: "quick.metode_desc",
      href: "/metode",
      icon: Settings2,
      color: "bg-chart-2 hover:bg-chart-2/90",
    },
    {
      titleKey: "quick.perhitungan",
      descKey: "quick.perhitungan_desc",
      href: "/perhitungan/saw",
      icon: Calculator,
      color: "bg-chart-3 hover:bg-chart-3/90",
    },
    {
      titleKey: "quick.laporan",
      descKey: "quick.laporan_desc",
      href: "/laporan",
      icon: FileText,
      color: "bg-chart-4 hover:bg-chart-4/90",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("dashboard.quick_actions")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.href} href={action.href}>
                <Button
                  variant="ghost"
                  className={`h-auto w-full justify-start gap-3 ${action.color} p-4 text-primary-foreground`}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">{t(action.titleKey)}</p>
                    <p className="text-xs opacity-80">{t(action.descKey)}</p>
                  </div>
                </Button>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
