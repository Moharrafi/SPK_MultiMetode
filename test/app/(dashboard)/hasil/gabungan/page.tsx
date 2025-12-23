"use client"

import { useSPK } from "@/lib/spk-context"
import { calculateSAW, calculateTOPSIS, calculateAHPRanking, calculateCombinedRanking } from "@/lib/spk-calculations"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Trophy, Info, Calculator } from "lucide-react"

const CHART_COLORS = [
  "#3b82f6", // blue
  "#14b8a6", // teal
  "#22c55e", // green
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
]

export default function GabunganPage() {
  const { alternatif, kriteria, penilaian, metodeConfig } = useSPK()

  const sawResult = calculateSAW(alternatif, kriteria, penilaian)
  const topsisResult = calculateTOPSIS(alternatif, kriteria, penilaian)
  const ahpBobot = kriteria.map((k) => ({ kriteriaId: k.id, bobot: k.bobot }))
  const ahpResult = calculateAHPRanking(alternatif, kriteria, penilaian, ahpBobot)

  const bobotSAW = metodeConfig.find((m) => m.nama === "SAW")?.bobot || 0
  const bobotAHP = metodeConfig.find((m) => m.nama === "AHP")?.bobot || 0
  const bobotTOPSIS = metodeConfig.find((m) => m.nama === "TOPSIS")?.bobot || 0

  const combined = calculateCombinedRanking(
    sawResult.hasilAkhir,
    ahpResult,
    topsisResult.hasilAkhir,
    bobotSAW,
    bobotAHP,
    bobotTOPSIS,
  )

  const chartData = combined
    .sort((a, b) => b.nilaiGabungan - a.nilaiGabungan)
    .map((c, index) => ({
      name: alternatif.find((a) => a.id === c.alternatifId)?.kode || "",
      fullName: c.alternatifNama,
      nilai: c.nilaiGabungan,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ranking Gabungan</h1>
        <p className="text-muted-foreground">Hasil agregasi dari semua metode yang aktif</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Ranking gabungan dihitung menggunakan metode rata-rata tertimbang (weighted average) dengan bobot: SAW (
          {(bobotSAW * 100).toFixed(0)}%), AHP ({(bobotAHP * 100).toFixed(0)}%), TOPSIS (
          {(bobotTOPSIS * 100).toFixed(0)}%)
        </AlertDescription>
      </Alert>

      {/* Formula */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500 p-2">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">Rumus Agregasi</CardTitle>
              <CardDescription>Metode rata-rata tertimbang</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4 font-mono text-sm">
            <p>
              Nilai Gabungan = (W<sub>SAW</sub> × V<sub>SAW</sub>) + (W<sub>AHP</sub> × V<sub>AHP</sub>) + (W
              <sub>TOPSIS</sub> × V<sub>TOPSIS</sub>)
            </p>
            <p className="mt-2 text-muted-foreground">
              = ({bobotSAW} × V<sub>SAW</sub>) + ({bobotAHP} × V<sub>AHP</sub>) + ({bobotTOPSIS} × V<sub>TOPSIS</sub>)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Grafik Nilai Gabungan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} />
                <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: number, name: string, props: { payload: { fullName: string } }) => [
                    value.toFixed(4),
                    props.payload.fullName,
                  ]}
                />
                <Bar dataKey="nilai" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Result Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-teal-500 p-2">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">Tabel Ranking Gabungan</CardTitle>
              <CardDescription>Hasil akhir agregasi multi-metode</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ranking</TableHead>
                <TableHead>Kode</TableHead>
                <TableHead>Nama Alternatif</TableHead>
                <TableHead className="text-center">Nilai SAW</TableHead>
                <TableHead className="text-center">Nilai AHP</TableHead>
                <TableHead className="text-center">Nilai TOPSIS</TableHead>
                <TableHead className="text-right">Nilai Gabungan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {combined.map((c, index) => (
                <TableRow key={c.alternatifId} className={c.ranking === 1 ? "bg-primary/5" : ""}>
                  <TableCell>
                    <Badge
                      variant={c.ranking === 1 ? "default" : c.ranking <= 3 ? "secondary" : "outline"}
                      style={{
                        backgroundColor: c.ranking <= 3 ? CHART_COLORS[index] : undefined,
                        color: c.ranking <= 3 ? "white" : undefined,
                      }}
                    >
                      #{c.ranking}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{alternatif.find((a) => a.id === c.alternatifId)?.kode}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{c.alternatifNama}</TableCell>
                  <TableCell className="text-center font-mono">{c.nilaiSAW.toFixed(4)}</TableCell>
                  <TableCell className="text-center font-mono">{c.nilaiAHP.toFixed(4)}</TableCell>
                  <TableCell className="text-center font-mono">{c.nilaiTOPSIS.toFixed(4)}</TableCell>
                  <TableCell className="text-right font-mono font-bold">{c.nilaiGabungan.toFixed(4)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Winner */}
      {combined.length > 0 && (
        <Card className="border-primary bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-4 shadow-lg">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alternatif Terbaik</p>
                <p className="text-2xl font-bold">{combined[0]?.alternatifNama}</p>
                <p className="text-sm text-muted-foreground">
                  Nilai Gabungan:{" "}
                  <span className="font-mono font-bold text-primary">{combined[0]?.nilaiGabungan.toFixed(4)}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
