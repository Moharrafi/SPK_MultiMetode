"use client"

import { useSPK } from "@/lib/spk-context"
import { calculateTOPSIS } from "@/lib/spk-calculations"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Target, Trophy, ArrowRight } from "lucide-react"

export default function TOPSISPage() {
  const { alternatif, kriteria, penilaian } = useSPK()
  const result = calculateTOPSIS(alternatif, kriteria, penilaian)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Modul TOPSIS</h1>
        <p className="text-muted-foreground">Technique for Order Preference by Similarity to Ideal Solution</p>
      </div>

      {/* Steps */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Badge variant="outline">1. Matriks Keputusan</Badge>
        <ArrowRight className="h-4 w-4" />
        <Badge variant="outline">2. Normalisasi</Badge>
        <ArrowRight className="h-4 w-4" />
        <Badge variant="outline">3. Terbobot</Badge>
        <ArrowRight className="h-4 w-4" />
        <Badge variant="outline">4. Solusi Ideal</Badge>
        <ArrowRight className="h-4 w-4" />
        <Badge>5. Ranking</Badge>
      </div>

      {/* Decision Matrix */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-1 p-2">
              <Target className="h-5 w-5 text-primary-foreground" />
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
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {alternatif.map((alt, i) => (
                  <TableRow key={alt.id}>
                    <TableCell className="font-medium">{alt.kode}</TableCell>
                    {result.matriksKeputusan[i]?.map((val, j) => (
                      <TableCell key={j} className="text-center">
                        {val}
                      </TableCell>
                    ))}
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
              <Target className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Matriks Ternormalisasi</CardTitle>
              <CardDescription>Rij = Xij / √(Σ Xij²)</CardDescription>
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
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {alternatif.map((alt, i) => (
                  <TableRow key={alt.id}>
                    <TableCell className="font-medium">{alt.kode}</TableCell>
                    {result.matriksNormalisasi[i]?.map((val, j) => (
                      <TableCell key={j} className="text-center font-mono">
                        {val.toFixed(4)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Weighted Normalized Matrix */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-3 p-2">
              <Target className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Matriks Ternormalisasi Terbobot</CardTitle>
              <CardDescription>Yij = Wj × Rij</CardDescription>
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
                    {result.matriksTerbobot[i]?.map((val, j) => (
                      <TableCell key={j} className="text-center font-mono">
                        {val.toFixed(4)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Ideal Solutions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Solusi Ideal Positif (A+)</CardTitle>
            <CardDescription>Max untuk Benefit, Min untuk Cost</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {kriteria.map((k, i) => (
                <Badge key={k.id} variant="outline" className="font-mono">
                  {k.kode}: {result.solusiIdealPositif[i]?.toFixed(4)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Solusi Ideal Negatif (A-)</CardTitle>
            <CardDescription>Min untuk Benefit, Max untuk Cost</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {kriteria.map((k, i) => (
                <Badge key={k.id} variant="secondary" className="font-mono">
                  {k.kode}: {result.solusiIdealNegatif[i]?.toFixed(4)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Jarak ke Solusi Ideal</CardTitle>
          <CardDescription>D+ = √Σ(Yij - A+j)² | D- = √Σ(Yij - A-j)²</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alternatif</TableHead>
                <TableHead className="text-center">D+ (Jarak ke Ideal Positif)</TableHead>
                <TableHead className="text-center">D- (Jarak ke Ideal Negatif)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alternatif.map((alt, i) => (
                <TableRow key={alt.id}>
                  <TableCell className="font-medium">{alt.kode}</TableCell>
                  <TableCell className="text-center font-mono">{result.jarakPositif[i]?.toFixed(4)}</TableCell>
                  <TableCell className="text-center font-mono">{result.jarakNegatif[i]?.toFixed(4)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Final Ranking */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-4 p-2">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Hasil Akhir & Ranking TOPSIS</CardTitle>
              <CardDescription>V = D- / (D+ + D-)</CardDescription>
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
