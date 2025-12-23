"use client"

import { useSPK } from "@/lib/spk-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Settings2, Info, Calculator, Scale, Target, AlertCircle } from "lucide-react"

export default function MetodePage() {
  const { metodeConfig, toggleMetode, updateMetodeBobot } = useSPK()

  const activeMetode = metodeConfig.filter((m) => m.aktif)
  const totalBobot = activeMetode.reduce((sum, m) => sum + m.bobot, 0)
  const isBobotValid = activeMetode.length === 0 || Math.abs(totalBobot - 1) < 0.01

  const metodeInfo = {
    SAW: {
      icon: Calculator,
      color: "bg-chart-1",
      description: "Simple Additive Weighting - Metode penjumlahan terbobot sederhana",
      kelebihan: ["Sederhana dan mudah dipahami", "Cocok untuk kasus umum", "Proses cepat"],
    },
    AHP: {
      icon: Scale,
      color: "bg-chart-2",
      description: "Analytic Hierarchy Process - Metode perbandingan berpasangan",
      kelebihan: ["Bobot dihitung sistematis", "Ada uji konsistensi", "Cocok untuk kriteria kompleks"],
    },
    TOPSIS: {
      icon: Target,
      color: "bg-chart-3",
      description: "Technique for Order Preference by Similarity to Ideal Solution",
      kelebihan: ["Mempertimbangkan solusi ideal", "Hasil lebih objektif", "Cocok untuk banyak alternatif"],
    },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manajemen Metode SPK</h1>
        <p className="text-muted-foreground">Pilih dan atur metode yang akan digunakan</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Aktifkan metode yang ingin digunakan. Jika mengaktifkan lebih dari satu metode, atur bobot antar metode untuk
          menghasilkan ranking gabungan.
        </AlertDescription>
      </Alert>

      {/* Bobot Progress */}
      {activeMetode.length > 1 && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Total Bobot Metode Aktif</span>
                <span className={isBobotValid ? "text-green-600" : "text-destructive"}>
                  {totalBobot.toFixed(2)} / 1.00
                </span>
              </div>
              <Progress value={totalBobot * 100} className="h-2" />
              {!isBobotValid && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Total bobot metode aktif harus sama dengan 1</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Method Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {metodeConfig.map((metode) => {
          const info = metodeInfo[metode.nama]
          const Icon = info.icon

          return (
            <Card key={metode.id} className={metode.aktif ? "ring-2 ring-primary" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg ${info.color} p-2`}>
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{metode.nama}</CardTitle>
                      <Badge variant={metode.aktif ? "default" : "secondary"}>
                        {metode.aktif ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                  </div>
                  <Switch checked={metode.aktif} onCheckedChange={() => toggleMetode(metode.nama)} />
                </div>
                <CardDescription className="mt-2">{info.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Kelebihan:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {info.kelebihan.map((k, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {metode.aktif && activeMetode.length > 1 && (
                    <div className="space-y-2 pt-4 border-t">
                      <Label htmlFor={`bobot-${metode.id}`}>Bobot Metode</Label>
                      <Input
                        id={`bobot-${metode.id}`}
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={metode.bobot}
                        onChange={(e) => updateMetodeBobot(metode.nama, Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Plugin Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-muted p-2">
              <Settings2 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Konsep Plugin Metode</CardTitle>
              <CardDescription>Sistem dirancang untuk mudah menambah metode baru</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Arsitektur sistem menggunakan konsep modular/plugin, sehingga metode SPK baru (seperti ELECTRE, PROMETHEE,
            MOORA, dll) dapat ditambahkan dengan mudah di masa depan tanpa mengubah struktur sistem yang sudah ada.
            Setiap metode memiliki modul perhitungan independen yang dapat dipanggil sesuai kebutuhan.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
