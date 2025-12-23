"use client"

import { useSPK } from "@/lib/spk-context"
import { calculateSAW, calculateTOPSIS, calculateAHPRanking } from "@/lib/spk-calculations"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { BarChart3, Trophy } from "lucide-react"

const methodColors = {
  SAW: "#3b82f6", // blue
  AHP: "#14b8a6", // teal
  TOPSIS: "#22c55e", // green
}

const barGradients = {
  SAW: ["#3b82f6", "#1d4ed8"],
  AHP: ["#14b8a6", "#0d9488"],
  TOPSIS: ["#22c55e", "#16a34a"],
}

export default function HasilPerMetodePage() {
  const { alternatif, kriteria, penilaian, metodeConfig } = useSPK()

  const sawResult = calculateSAW(alternatif, kriteria, penilaian)
  const topsisResult = calculateTOPSIS(alternatif, kriteria, penilaian)
  const ahpBobot = kriteria.map((k) => ({ kriteriaId: k.id, bobot: k.bobot }))
  const ahpResult = calculateAHPRanking(alternatif, kriteria, penilaian, ahpBobot)

  const results = {
    SAW: sawResult.hasilAkhir,
    AHP: ahpResult,
    TOPSIS: topsisResult.hasilAkhir,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hasil per Metode</h1>
        <p className="text-muted-foreground">Lihat hasil ranking dari masing-masing metode</p>
      </div>

      <Tabs defaultValue="SAW" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="SAW" disabled={!metodeConfig.find((m) => m.nama === "SAW")?.aktif}>
            SAW
          </TabsTrigger>
          <TabsTrigger value="AHP" disabled={!metodeConfig.find((m) => m.nama === "AHP")?.aktif}>
            AHP
          </TabsTrigger>
          <TabsTrigger value="TOPSIS" disabled={!metodeConfig.find((m) => m.nama === "TOPSIS")?.aktif}>
            TOPSIS
          </TabsTrigger>
        </TabsList>

        {(["SAW", "AHP", "TOPSIS"] as const).map((metode) => (
          <TabsContent key={metode} value={metode} className="space-y-6">
            {/* Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg p-2" style={{ backgroundColor: `${methodColors[metode]}20` }}>
                    <BarChart3 className="h-5 w-5" style={{ color: methodColors[metode] }} />
                  </div>
                  <div>
                    <CardTitle className="text-base">Grafik Nilai {metode}</CardTitle>
                    <CardDescription>Visualisasi hasil perhitungan</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={results[metode].map((r) => ({
                        name: alternatif.find((a) => a.id === r.alternatifId)?.kode || "",
                        nilai: r.nilai,
                        ranking: r.ranking,
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                      <YAxis tick={{ fill: "#6b7280" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                        formatter={(value: number) => [value.toFixed(4), "Nilai"]}
                      />
                      <Bar dataKey="nilai" radius={[4, 4, 0, 0]}>
                        {results[metode].map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={methodColors[metode]}
                            opacity={1 - (entry.ranking - 1) * 0.12}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg p-2" style={{ backgroundColor: `${methodColors[metode]}20` }}>
                    <Trophy className="h-5 w-5" style={{ color: methodColors[metode] }} />
                  </div>
                  <div>
                    <CardTitle className="text-base">Ranking {metode}</CardTitle>
                    <CardDescription>Urutan alternatif berdasarkan nilai preferensi</CardDescription>
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
                      <TableHead className="text-right">Nilai</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results[metode].map((h) => (
                      <TableRow key={h.alternatifId} className={h.ranking === 1 ? "bg-primary/5" : ""}>
                        <TableCell>
                          <Badge
                            variant={h.ranking === 1 ? "default" : h.ranking <= 3 ? "secondary" : "outline"}
                            style={h.ranking === 1 ? { backgroundColor: methodColors[metode] } : {}}
                          >
                            #{h.ranking}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{alternatif.find((a) => a.id === h.alternatifId)?.kode}</Badge>
                        </TableCell>
                        <TableCell className="text-foreground">{h.alternatifNama}</TableCell>
                        <TableCell className="text-right font-mono">{h.nilai.toFixed(4)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
