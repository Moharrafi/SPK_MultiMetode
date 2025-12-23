"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSPK } from "@/lib/spk-context"
import { useLanguage } from "@/lib/language-context"
import { calculateSAW, calculateTOPSIS, calculateAHPRanking } from "@/lib/spk-calculations"
import { Trophy, Medal, Award } from "lucide-react"

export function TopRanking() {
  const { alternatif, kriteria, penilaian } = useSPK()
  const { t } = useLanguage()

  const sawResult = calculateSAW(alternatif, kriteria, penilaian)
  const topsisResult = calculateTOPSIS(alternatif, kriteria, penilaian)
  const ahpBobot = kriteria.map((k) => ({ kriteriaId: k.id, bobot: k.bobot }))
  const ahpResult = calculateAHPRanking(alternatif, kriteria, penilaian, ahpBobot)

  const rankings = [
    { metode: "SAW", top: sawResult.hasilAkhir[0], color: "bg-chart-1" },
    { metode: "AHP", top: ahpResult[0], color: "bg-chart-2" },
    { metode: "TOPSIS", top: topsisResult.hasilAkhir[0], color: "bg-chart-3" },
  ]

  const icons = [Trophy, Medal, Award]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("dashboard.top_ranking_per_metode")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rankings.map((rank, idx) => {
            const Icon = icons[idx]
            return (
              <div key={rank.metode} className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
                <div className={`rounded-full ${rank.color} p-2`}>
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{rank.metode}</Badge>
                    <span className="font-semibold">{rank.top?.alternatifNama || "-"}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("dashboard.value")}: {rank.top?.nilai.toFixed(4) || "0"}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
