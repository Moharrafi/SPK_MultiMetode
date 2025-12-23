"use client"

import { useSPK } from "@/lib/spk-context"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ClipboardList, Info, Upload, Download, Lock } from "lucide-react"
import { SmartNumberInput } from "@/components/ui/smart-number-input"
import { useToast } from "@/components/ui/ios-toast"

export default function PenilaianPage() {
  const { alternatif, kriteria, subKriteria, penilaian, updatePenilaian } = useSPK()
  const { hasPermission } = useAuth()
  const canEdit = hasPermission("edit")
  const { showToast } = useToast()

  const getNilai = (alternatifId: string, kriteriaId: string) => {
    const p = penilaian.find((p) => p.alternatifId === alternatifId && p.kriteriaId === kriteriaId)
    return p?.nilai || 0
  }

  const getSubKriteriaForKriteria = (kriteriaId: string) => {
    return subKriteria.filter((s) => s.kriteriaId === kriteriaId)
  }

  const handleNilaiChange = (alternatifId: string, kriteriaId: string, nilai: number) => {
    if (!canEdit) {
      showToast("Anda tidak memiliki izin untuk mengubah data", "error")
      return
    }
    updatePenilaian(alternatifId, kriteriaId, nilai)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Penilaian</h1>
          <p className="text-muted-foreground">Input nilai alternatif terhadap kriteria</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import Excel
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {!canEdit && (
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Anda dalam mode lihat saja. Hubungi administrator untuk mengubah data penilaian.
          </AlertDescription>
        </Alert>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Data penilaian ini akan digunakan oleh semua metode (SAW, AHP, TOPSIS), sehingga tidak perlu input berulang
          untuk setiap metode.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-1 p-2">
              <ClipboardList className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Matriks Penilaian</CardTitle>
              <CardDescription>
                {alternatif.length} alternatif × {kriteria.length} kriteria
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-card z-10 min-w-[150px]">Alternatif</TableHead>
                  {kriteria.map((k) => (
                    <TableHead key={k.id} className="text-center min-w-[140px]">
                      <div className="py-2">
                        <Badge variant="outline">{k.kode}</Badge>
                        <p className="mt-1.5 text-xs font-normal">{k.nama}</p>
                        <Badge
                          className={`mt-2 text-xs ${
                            k.jenis === "benefit"
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {k.jenis}
                        </Badge>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {alternatif.map((alt) => (
                  <TableRow key={alt.id}>
                    <TableCell className="sticky left-0 bg-card z-10 font-medium">
                      <div>
                        <Badge variant="outline" className="mr-2">
                          {alt.kode}
                        </Badge>
                        {alt.nama}
                      </div>
                    </TableCell>
                    {kriteria.map((krit) => {
                      const subs = getSubKriteriaForKriteria(krit.id)
                      const currentValue = getNilai(alt.id, krit.id)

                      return (
                        <TableCell key={krit.id} className="text-center">
                          {subs.length > 0 ? (
                            <Select
                              value={currentValue.toString()}
                              onValueChange={(value) => handleNilaiChange(alt.id, krit.id, Number.parseInt(value))}
                              disabled={!canEdit}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih" />
                              </SelectTrigger>
                              <SelectContent>
                                {subs
                                  .sort((a, b) => b.nilai - a.nilai)
                                  .map((sub) => (
                                    <SelectItem key={sub.id} value={sub.nilai.toString()}>
                                      {sub.nama} ({sub.nilai})
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <SmartNumberInput
                              className="w-20 mx-auto"
                              value={currentValue}
                              onChange={(value) => handleNilaiChange(alt.id, krit.id, value)}
                              disabled={!canEdit}
                            />
                          )}
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

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rekap Penilaian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Total Data</p>
              <p className="text-2xl font-bold">{penilaian.length}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Terisi</p>
              <p className="text-2xl font-bold text-green-600">{penilaian.filter((p) => p.nilai > 0).length}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Belum Terisi</p>
              <p className="text-2xl font-bold text-amber-600">
                {alternatif.length * kriteria.length - penilaian.filter((p) => p.nilai > 0).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
