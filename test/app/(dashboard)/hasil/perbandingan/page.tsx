"use client"

import { useSPK } from "@/lib/spk-context"
import { calculateSAW, calculateTOPSIS, calculateAHPRanking } from "@/lib/spk-calculations"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { GitCompare, CheckCircle } from "lucide-react"

const CHART_COLORS = {
  SAW: "#3b82f6", // blue-500
  AHP: "#14b8a6", // teal-500
  TOPSIS: "#22c55e", // green-500
}

export default function PerbandinganPage() {
  const { alternatif, kriteria, penilaian, metodeConfig } = useSPK()

  const sawResult = calculateSAW(alternatif, kriteria, penilaian)
  const topsisResult = calculateTOPSIS(alternatif, kriteria, penilaian)
  const ahpBobot = kriteria.map((k) => ({ kriteriaId: k.id, bobot: k.bobot }))
  const ahpResult = calculateAHPRanking(alternatif, kriteria, penilaian, ahpBobot)

  // Combined data for comparison
  const comparisonData = alternatif.map((alt) => {
    const saw = sawResult.hasilAkhir.find((h) => h.alternatifId === alt.id)
    const topsis = topsisResult.hasilAkhir.find((h) => h.alternatifId === alt.id)
    const ahp = ahpResult.find((h) => h.alternatifId === alt.id)

    return {
      kode: alt.kode,
      nama: alt.nama,
      nilaiSAW: saw?.nilai || 0,
      rankSAW: saw?.ranking || 0,
      nilaiAHP: ahp?.nilai || 0,
      rankAHP: ahp?.ranking || 0,
      nilaiTOPSIS: topsis?.nilai || 0,
      rankTOPSIS: topsis?.ranking || 0,
    }
  })

  // Check stability (consistently in top 3 across all methods)
  const stableAlternatif = comparisonData.filter((d) => d.rankSAW <= 3 && d.rankAHP <= 3 && d.rankTOPSIS <= 3)

  // Chart data
  const barChartData = comparisonData.map((d) => ({
    name: d.kode,
    SAW: d.nilaiSAW,
    AHP: d.nilaiAHP,
    TOPSIS: d.nilaiTOPSIS,
  }))

  const radarData = comparisonData.map((d) => ({
    subject: d.kode,
    SAW: d.nilaiSAW * 100,
    AHP: d.nilaiAHP * 100,
    TOPSIS: d.nilaiTOPSIS * 100,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Perbandingan Antar Metode</h1>
        <p className="text-muted-foreground">Bandingkan hasil dari semua metode yang aktif</p>
      </div>

      {/* Stability Indicator */}
      {stableAlternatif.length > 0 && (
        <Card className="border-green-500">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <CardTitle className="text-base">Alternatif Stabil</CardTitle>
                <CardDescription>Alternatif yang konsisten masuk top 3 di semua metode</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stableAlternatif.map((alt) => (
                <Badge key={alt.kode} className="bg-green-500 text-white">
                  {alt.kode} - {alt.nama}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bar Chart Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500 p-2">
              <GitCompare className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">Grafik Perbandingan Nilai</CardTitle>
              <CardDescription>Bar chart perbandingan nilai antar metode</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Radar Chart Perbandingan</CardTitle>
          <CardDescription>Visualisasi multi-dimensi hasil perhitungan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#6b7280" }} />
                <PolarRadiusAxis tick={{ fill: "#6b7280" }} />
                {metodeConfig.find((m) => m.nama === "SAW")?.aktif && (
                  <Radar name="SAW" dataKey="SAW" stroke={CHART_COLORS.SAW} fill={CHART_COLORS.SAW} fillOpacity={0.3} />
                )}
                {metodeConfig.find((m) => m.nama === "AHP")?.aktif && (
                  <Radar name="AHP" dataKey="AHP" stroke={CHART_COLORS.AHP} fill={CHART_COLORS.AHP} fillOpacity={0.3} />
                )}
                {metodeConfig.find((m) => m.nama === "TOPSIS")?.aktif && (
                  <Radar
                    name="TOPSIS"
                    dataKey="TOPSIS"
                    stroke={CHART_COLORS.TOPSIS}
                    fill={CHART_COLORS.TOPSIS}
                    fillOpacity={0.3}
                  />
                )}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tabel Perbandingan Lengkap</CardTitle>
          <CardDescription>Nilai dan ranking dari semua metode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2}>Kode</TableHead>
                  <TableHead rowSpan={2}>Nama Alternatif</TableHead>
                  {metodeConfig.find((m) => m.nama === "SAW")?.aktif && (
                    <TableHead colSpan={2} className="text-center border-l">
                      SAW
                    </TableHead>
                  )}
                  {metodeConfig.find((m) => m.nama === "AHP")?.aktif && (
                    <TableHead colSpan={2} className="text-center border-l">
                      AHP
                    </TableHead>
                  )}
                  {metodeConfig.find((m) => m.nama === "TOPSIS")?.aktif && (
                    <TableHead colSpan={2} className="text-center border-l">
                      TOPSIS
                    </TableHead>
                  )}
                </TableRow>
                <TableRow>
                  {metodeConfig.find((m) => m.nama === "SAW")?.aktif && (
                    <>
                      <TableHead className="text-center border-l">Nilai</TableHead>
                      <TableHead className="text-center">Rank</TableHead>
                    </>
                  )}
                  {metodeConfig.find((m) => m.nama === "AHP")?.aktif && (
                    <>
                      <TableHead className="text-center border-l">Nilai</TableHead>
                      <TableHead className="text-center">Rank</TableHead>
                    </>
                  )}
                  {metodeConfig.find((m) => m.nama === "TOPSIS")?.aktif && (
                    <>
                      <TableHead className="text-center border-l">Nilai</TableHead>
                      <TableHead className="text-center">Rank</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((d) => (
                  <TableRow key={d.kode}>
                    <TableCell>
                      <Badge variant="outline">{d.kode}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{d.nama}</TableCell>
                    {metodeConfig.find((m) => m.nama === "SAW")?.aktif && (
                      <>
                        <TableCell className="text-center font-mono border-l">{d.nilaiSAW.toFixed(4)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={d.rankSAW === 1 ? "default" : "outline"}>#{d.rankSAW}</Badge>
                        </TableCell>
                      </>
                    )}
                    {metodeConfig.find((m) => m.nama === "AHP")?.aktif && (
                      <>
                        <TableCell className="text-center font-mono border-l">{d.nilaiAHP.toFixed(4)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={d.rankAHP === 1 ? "default" : "outline"}>#{d.rankAHP}</Badge>
                        </TableCell>
                      </>
                    )}
                    {metodeConfig.find((m) => m.nama === "TOPSIS")?.aktif && (
                      <>
                        <TableCell className="text-center font-mono border-l">{d.nilaiTOPSIS.toFixed(4)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={d.rankTOPSIS === 1 ? "default" : "outline"}>#{d.rankTOPSIS}</Badge>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
