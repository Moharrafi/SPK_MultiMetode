"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { PlusCircle, Edit3, Trash2, Calculator } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id, enUS } from "date-fns/locale"

interface Activity {
  id: string
  type: "create" | "update" | "delete" | "calculate"
  titleKey: string
  descKey: string
  timestamp: Date
}

const iconMap = {
  create: PlusCircle,
  update: Edit3,
  delete: Trash2,
  calculate: Calculator,
}

const colorMap = {
  create: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
  update: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
  delete: "text-red-500 bg-red-50 dark:bg-red-950/30",
  calculate: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
}

export function RecentActivity() {
  const { language, t } = useLanguage()

  const sampleActivities: Activity[] = [
    {
      id: "1",
      type: "calculate",
      titleKey: "activity.saw_calculation",
      descKey: "activity.saw_calculation_desc",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "2",
      type: "create",
      titleKey: "activity.new_alternative",
      descKey: "activity.new_alternative_desc",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: "3",
      type: "update",
      titleKey: "activity.update_criteria",
      descKey: "activity.update_criteria_desc",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "4",
      type: "delete",
      titleKey: "activity.delete_data",
      descKey: "activity.delete_data_desc",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
  ]

  // Helper function to get activity text
  const getActivityText = (key: string): string => {
    const texts: Record<string, { id: string; en: string }> = {
      "activity.saw_calculation": { id: "Perhitungan SAW", en: "SAW Calculation" },
      "activity.saw_calculation_desc": {
        id: "Perhitungan selesai dengan 5 alternatif",
        en: "Calculation completed with 5 alternatives",
      },
      "activity.new_alternative": { id: "Alternatif Baru", en: "New Alternative" },
      "activity.new_alternative_desc": {
        id: "Menambahkan alternatif 'Kandidat E'",
        en: "Added alternative 'Candidate E'",
      },
      "activity.update_criteria": { id: "Update Kriteria", en: "Update Criteria" },
      "activity.update_criteria_desc": {
        id: "Mengubah bobot kriteria 'Pendidikan'",
        en: "Changed weight of 'Education' criteria",
      },
      "activity.delete_data": { id: "Hapus Data", en: "Delete Data" },
      "activity.delete_data_desc": { id: "Menghapus alternatif 'Kandidat X'", en: "Deleted alternative 'Candidate X'" },
    }
    return texts[key]?.[language] || key
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("dashboard.recent_activity")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sampleActivities.map((activity) => {
            const Icon = iconMap[activity.type]
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`rounded-lg p-2 ${colorMap[activity.type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{getActivityText(activity.titleKey)}</p>
                  <p className="text-xs text-muted-foreground truncate">{getActivityText(activity.descKey)}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(activity.timestamp, {
                    addSuffix: true,
                    locale: language === "id" ? id : enUS,
                  })}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
