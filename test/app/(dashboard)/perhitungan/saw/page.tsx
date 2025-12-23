"use client"

import { useSPK } from "@/lib/spk-context"
import { calculateSAW } from "@/lib/spk-calculations"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calculator, Trophy, ArrowRight } from "lucide-react"

export default function SAWPage() {
  const { alternatif, kriteria, penilaian } = useSPK()
  const result = calculateSAW(alternatif, kriteria, penilaian)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Modul SAW</h1>
        <p className="text-muted-foreground">Simple Additive Weighting - Penjumlahan Terbobot</p>
      </div>

      {/* Steps */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Badge variant="outline">1. Matriks Keputusan</Badge>
        <ArrowRight className="h-4 w-4" />
        <Badge variant="outline">2. Normalisasi</Badge>
        <ArrowRight className="h-4 w-4" />
        <Badge variant="outline">3. Nilai Preferensi (V)</Badge>
        <ArrowRight className="h-4 w-4" />
        <Badge>4. Ranking</Badge>
      </div>

      {/* Original Matrix */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-1 p-2">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Matriks Keputusan</CardTitle>
              <CardDescription>Data penilaian awal</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alternatif</TableHead>
                  {kriteria.map((k) => (
                    <TableHead key={k.id} className="text-center">
                      {k.kode}
                      <Badge variant="outline" className="ml-1 text-xs">
                        {k.jenis === "benefit" ? "B" : "C"}
                      </Badge>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {alternatif.map((alt, i) => (
                  <TableRow key={alt.id}>
                    <TableCell className="font-medium">{alt.kode}</TableCell>
                    {kriteria.map((k, j) => {
                      const nilai = penilaian.find((p) => p.alternatifId === alt.id && p.kriteriaId === k.id)
                      return (
                        <TableCell key={k.id} className="text-center">
                          {nilai?.nilai || 0}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Normalized Matrix */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-2 p-2">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Matriks Normalisasi</CardTitle>
              <CardDescription>Benefit: Xij / Max(Xj) | Cost: Min(Xj) / Xij</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alternatif</TableHead>
                  {kriteria.map((k) => (
                    <TableHead key={k.id} className="text-center">
                      {k.kode} (W={k.bobot})
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {alternatif.map((alt, i) => (
                  <TableRow key={alt.id}>
                    <TableCell className="font-medium">{alt.kode}</TableCell>
                    {kriteria.map((k, j) => (
                      <TableCell key={k.id} className="text-center">
                        {result.normalisasi[i]?.[j]?.toFixed(4) || "0"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Final Result */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-3 p-2">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Hasil Akhir & Ranking SAW</CardTitle>
              <CardDescription>V = Σ (Wj × Rij)</CardDescription>
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
                <TableHead className="text-right">Nilai Preferensi (V)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.hasilAkhir.map((h) => (
                <TableRow key={h.alternatifId} className={h.ranking === 1 ? "bg-primary/5" : ""}>
                  <TableCell>
                    <Badge variant={h.ranking === 1 ? "default" : "outline"}>#{h.ranking}</Badge>
                  </TableCell>
                  <TableCell>{alternatif.find((a) => a.id === h.alternatifId)?.kode}</TableCell>
                  <TableCell className="font-medium">{h.alternatifNama}</TableCell>
                  <TableCell className="text-right font-mono">{h.nilai.toFixed(4)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
