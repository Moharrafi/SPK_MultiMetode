"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { skalaAHP } from "@/lib/spk-data"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SkalaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Skala Penilaian</h1>
        <p className="text-muted-foreground">Skala yang digunakan untuk metode AHP dan penilaian umum</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Skala Saaty (1-9) digunakan untuk perbandingan berpasangan pada metode AHP. Skala ini menunjukkan tingkat
          kepentingan relatif antara dua kriteria.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-4 p-2">
              <Star className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Skala AHP (Saaty)</CardTitle>
              <CardDescription>Skala perbandingan berpasangan 1-9</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Nilai</TableHead>
                <TableHead>Definisi</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skalaAHP.map((skala) => (
                <TableRow key={skala.nilai}>
                  <TableCell>
                    <Badge variant="outline" className="text-lg">
                      {skala.nilai}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{skala.keterangan}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {skala.nilai === 1 && "Kedua kriteria memiliki kepentingan yang sama"}
                    {skala.nilai === 3 && "Kriteria satu sedikit lebih penting dari kriteria lainnya"}
                    {skala.nilai === 5 && "Kriteria satu jelas lebih penting dari kriteria lainnya"}
                    {skala.nilai === 7 && "Kriteria satu sangat jelas lebih penting dari kriteria lainnya"}
                    {skala.nilai === 9 && "Kriteria satu mutlak lebih penting dari kriteria lainnya"}
                    {[2, 4, 6, 8].includes(skala.nilai) && "Nilai tengah antara dua skala"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-5 p-2">
              <Star className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Skala Penilaian Umum</CardTitle>
              <CardDescription>Skala untuk konversi nilai kualitatif</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Nilai</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Badge>5</Badge>
                </TableCell>
                <TableCell>Sangat Baik</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>4</Badge>
                </TableCell>
                <TableCell>Baik</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>3</Badge>
                </TableCell>
                <TableCell>Cukup</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>2</Badge>
                </TableCell>
                <TableCell>Kurang</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>1</Badge>
                </TableCell>
                <TableCell>Sangat Kurang</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
