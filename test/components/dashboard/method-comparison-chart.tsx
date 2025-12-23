"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSPK } from "@/lib/spk-context"
import { useLanguage } from "@/lib/language-context"
import { calculateSAW, calculateTOPSIS, calculateAHPRanking } from "@/lib/spk-calculations"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const CHART_COLORS = {
  SAW: "#3b82f6",
  AHP: "#14b8a6",
  TOPSIS: "#22c55e",
}

export function MethodComparisonChart() {
  const { alternatif, kriteria, penilaian, metodeConfig } = useSPK()
  const { t } = useLanguage()

  const sawResult = calculateSAW(alternatif, kriteria, penilaian)
  const topsisResult = calculateTOPSIS(alternatif, kriteria, penilaian)
  const ahpBobot = kriteria.map((k) => ({ kriteriaId: k.id, bobot: k.bobot }))
  const ahpResult = calculateAHPRanking(alternatif, kriteria, penilaian, ahpBobot)

  const chartData = alternatif.map((alt) => {
    const saw = sawResult.hasilAkhir.find((h) => h.alternatifId === alt.id)
    const topsis = topsisResult.hasilAkhir.find((h) => h.alternatifId === alt.id)
    const ahp = ahpResult.find((h) => h.alternatifId === alt.id)

    return {
      name: alt.kode,
      SAW: saw?.nilai || 0,
      TOPSIS: topsis?.nilai || 0,
      AHP: ahp?.nilai || 0,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("dashboard.method_value_comparison")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              {metodeConfig.find((m) => m.nama === "SAW")?.aktif && (
                <Bar dataKey="SAW" fill={CHART_COLORS.SAW} radius={[4, 4, 0, 0]} />
              )}
              {metodeConfig.find((m) => m.nama === "AHP")?.aktif && (
                <Bar dataKey="AHP" fill={CHART_COLORS.AHP} radius={[4, 4, 0, 0]} />
              )}
              {metodeConfig.find((m) => m.nama === "TOPSIS")?.aktif && (
                <Bar dataKey="TOPSIS" fill={CHART_COLORS.TOPSIS} radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
