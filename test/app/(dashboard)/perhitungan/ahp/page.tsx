"use client"

import { useState, useEffect } from "react"
import { useSPK } from "@/lib/spk-context"
import { calculateAHP, calculateAHPRanking } from "@/lib/spk-calculations"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, Trophy, ArrowRight, CheckCircle, XCircle, Info } from "lucide-react"
import type { PairwiseComparison } from "@/lib/spk-types"

export default function AHPPage() {
  const { alternatif, kriteria, penilaian, pairwiseComparisons, updatePairwiseComparison } = useSPK()
  const [localComparisons, setLocalComparisons] = useState<PairwiseComparison[]>([])

  // Initialize pairwise comparisons
  useEffect(() => {
    const initial: PairwiseComparison[] = []
    for (let i = 0; i < kriteria.length; i++) {
      for (let j = i + 1; j < kriteria.length; j++) {
        const existing = pairwiseComparisons.find(
          (p) => p.kriteria1Id === kriteria[i].id && p.kriteria2Id === kriteria[j].id,
        )
        initial.push({
          kriteria1Id: kriteria[i].id,
          kriteria2Id: kriteria[j].id,
          nilai: existing?.nilai || 1,
        })
      }
    }
    setLocalComparisons(initial)
  }, [kriteria, pairwiseComparisons])

  const handleComparisonChange = (k1Id: string, k2Id: string, nilai: number) => {
    setLocalComparisons((prev) =>
      prev.map((p) => (p.kriteria1Id === k1Id && p.kriteria2Id === k2Id ? { ...p, nilai } : p)),
    )
    updatePairwiseComparison(k1Id, k2Id, nilai)
  }

  const ahpResult = calculateAHP(kriteria, localComparisons)
  const ranking = calculateAHPRanking(alternatif, kriteria, penilaian, ahpResult.bobotKriteria)

  const getComparisonValue = (k1Id: string, k2Id: string): number => {
    const comp = localComparisons.find((p) => p.kriteria1Id === k1Id && p.kriteria2Id === k2Id)
    if (comp) return comp.nilai

    const reverse = localComparisons.find((p) => p.kriteria1Id === k2Id && p.kriteria2Id === k1Id)
    return reverse ? 1 / reverse.nilai : 1
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Modul AHP</h1>
        <p className="text-muted-foreground">Analytic Hierarchy Process - Perbandingan Berpasangan</p>
      </div>

      {/* Steps */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Badge variant="outline">1. Perbandingan Berpasangan</Badge>
        <ArrowRight className="h-4 w-4" />
        <Badge variant="outline">2. Eigen Vector</Badge>
        <ArrowRight className="h-4 w-4" />
        <Badge variant="outline">3. Uji Konsistensi</Badge>
        <ArrowRight className="h-4 w-4" />
        <Badge>4. Ranking</Badge>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Bandingkan kepentingan antar kriteria menggunakan skala Saaty (1-9). Jika kriteria A lebih penting dari B,
          pilih nilai {">"} 1 pada baris A-B.
        </AlertDescription>
      </Alert>

      {/* Pairwise Comparison Input */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-2 p-2">
              <Scale className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Input Perbandingan Berpasangan</CardTitle>
              <CardDescription>Pilih tingkat kepentingan relatif antar kriteria</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kriteria 1</TableHead>
                  <TableHead className="text-center">Skala</TableHead>
                  <TableHead>Kriteria 2</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kriteria.map((k1, i) =>
                  kriteria.slice(i + 1).map((k2) => (
                    <TableRow key={`${k1.id}-${k2.id}`}>
                      <TableCell className="font-medium">
                        <Badge variant="outline" className="mr-2">
                          {k1.kode}
                        </Badge>
                        {k1.nama}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={getComparisonValue(k1.id, k2.id).toString()}
                          onValueChange={(v) => handleComparisonChange(k1.id, k2.id, Number.parseFloat(v))}
                        >
                          <SelectTrigger className="w-[200px] mx-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1 / 9, 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                              (val) => (
                                <SelectItem key={val} value={val.toString()}>
                                  {val < 1 ? `1/${Math.round(1 / val)}` : val} -{" "}
                                  {val < 1
                                    ? `${k2.nama} lebih penting`
                                    : val === 1
                                      ? "Sama penting"
                                      : `${k1.nama} lebih penting`}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Badge variant="outline" className="mr-2">
                          {k2.kode}
                        </Badge>
                        {k2.nama}
                      </TableCell>
                    </TableRow>
                  )),
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pairwise Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Matriks Perbandingan Berpasangan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  {kriteria.map((k) => (
                    <TableHead key={k.id} className="text-center">
                      {k.kode}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {kriteria.map((k1, i) => (
                  <TableRow key={k1.id}>
                    <TableCell className="font-medium">{k1.kode}</TableCell>
                    {kriteria.map((k2, j) => {
                      let val = 1
                      if (i === j) val = 1
                      else if (i < j) val = getComparisonValue(k1.id, k2.id)
                      else val = 1 / getComparisonValue(k2.id, k1.id)

                      return (
                        <TableCell key={k2.id} className="text-center font-mono">
                          {val.toFixed(4)}
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

      {/* AHP Weights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bobot Kriteria (Eigen Vector)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama Kriteria</TableHead>
                <TableHead className="text-right">Bobot AHP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ahpResult.bobotKriteria.map((b) => {
                const krit = kriteria.find((k) => k.id === b.kriteriaId)
                return (
                  <TableRow key={b.kriteriaId}>
                    <TableCell>
                      <Badge variant="outline">{krit?.kode}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{krit?.nama}</TableCell>
                    <TableCell className="text-right font-mono">{b.bobot.toFixed(4)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Consistency Check */}
      <Card className={ahpResult.isConsistent ? "border-green-500" : "border-destructive"}>
        <CardHeader>
          <div className="flex items-center gap-3">
            {ahpResult.isConsistent ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-destructive" />
            )}
            <div>
              <CardTitle className="text-base">Uji Konsistensi</CardTitle>
              <CardDescription>
                CR = {ahpResult.consistencyRatio.toFixed(4)}
                {ahpResult.isConsistent ? " ≤ 0.1 (Konsisten)" : " > 0.1 (Tidak Konsisten)"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!ahpResult.isConsistent && (
            <Alert variant="destructive">
              <AlertDescription>
                Perbandingan tidak konsisten. Silakan periksa kembali nilai perbandingan berpasangan. Consistency Ratio
                harus ≤ 0.1 agar hasil dapat diterima.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Final Ranking */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-3 p-2">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Hasil Akhir & Ranking AHP</CardTitle>
              <CardDescription>Menggunakan bobot dari eigen vector</CardDescription>
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
              {ranking.map((h) => (
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
