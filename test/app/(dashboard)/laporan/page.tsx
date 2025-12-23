"use client"

import { useState } from "react"
import { useSPK } from "@/lib/spk-context"
import { generateExcelReport, generatePDFReport } from "@/lib/report-generator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useIOSToast } from "@/components/ui/ios-toast"
import {
  FileText,
  Download,
  FileSpreadsheet,
  Users,
  ListChecks,
  Calculator,
  Trophy,
  GitCompare,
  Loader2,
  CheckCircle,
  FileDown,
} from "lucide-react"

export default function LaporanPage() {
  const { alternatif, kriteria, penilaian, metodeConfig } = useSPK()
  const { showToast } = useIOSToast()
  const [loading, setLoading] = useState<string | null>(null)

  const handleExport = async (reportType: string, format: "excel" | "pdf") => {
    setLoading(`${reportType}-${format}`)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate processing

      const data = { alternatif, kriteria, penilaian, metodeConfig }

      if (format === "excel") {
        generateExcelReport(data, reportType)
      } else {
        generatePDFReport(data, reportType)
      }

      showToast({
        title: "Export Berhasil",
        message: `Laporan ${reportType} berhasil di-export ke ${format.toUpperCase()}`,
        type: "success",
      })
    } catch {
      showToast({
        title: "Export Gagal",
        message: "Terjadi kesalahan saat mengexport laporan",
        type: "error",
      })
    } finally {
      setLoading(null)
    }
  }

  const handleExportAll = async (format: "excel" | "pdf") => {
    setLoading(`all-${format}`)

    try {
      const reportTypes = ["data-master", "penilaian", "saw", "ahp", "topsis", "perbandingan", "gabungan"]
      const data = { alternatif, kriteria, penilaian, metodeConfig }

      for (const type of reportTypes) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        if (format === "excel") {
          generateExcelReport(data, type)
        } else {
          generatePDFReport(data, type)
        }
      }

      showToast({
        title: "Export Semua Berhasil",
        message: `Semua laporan berhasil di-export ke ${format.toUpperCase()}`,
        type: "success",
      })
    } catch {
      showToast({
        title: "Export Gagal",
        message: "Terjadi kesalahan saat mengexport laporan",
        type: "error",
      })
    } finally {
      setLoading(null)
    }
  }

  const reports = [
    {
      id: "data-master",
      title: "Laporan Data Master",
      description: "Data alternatif, kriteria, dan sub-kriteria",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500",
      items: [`${alternatif.length} Alternatif`, `${kriteria.length} Kriteria`],
    },
    {
      id: "penilaian",
      title: "Laporan Penilaian",
      description: "Matriks penilaian alternatif terhadap kriteria",
      icon: ListChecks,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-500",
      items: ["Matriks Keputusan", "Rekap Penilaian"],
    },
    {
      id: "saw",
      title: "Laporan SAW",
      description: "Perhitungan dan hasil metode SAW",
      icon: Calculator,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500",
      items: ["Normalisasi", "Nilai Preferensi", "Ranking"],
    },
    {
      id: "ahp",
      title: "Laporan AHP",
      description: "Perhitungan dan hasil metode AHP",
      icon: Calculator,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500",
      items: ["Perbandingan Berpasangan", "Bobot Kriteria", "Consistency Ratio", "Ranking"],
    },
    {
      id: "topsis",
      title: "Laporan TOPSIS",
      description: "Perhitungan dan hasil metode TOPSIS",
      icon: Calculator,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500",
      items: ["Normalisasi", "Terbobot", "Solusi Ideal", "Jarak", "Ranking"],
    },
    {
      id: "perbandingan",
      title: "Laporan Perbandingan Metode",
      description: "Perbandingan hasil antar metode",
      icon: GitCompare,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-500",
      items: ["Grafik Perbandingan", "Tabel Perbandingan", "Indikator Stabilitas"],
    },
    {
      id: "gabungan",
      title: "Laporan Ranking Gabungan",
      description: "Hasil agregasi multi-metode",
      icon: Trophy,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-500",
      items: ["Rumus Agregasi", "Nilai Gabungan", "Ranking Final"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Laporan</h1>
          <p className="text-muted-foreground">Export laporan untuk dokumentasi skripsi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportAll("excel")} disabled={loading !== null}>
            {loading === "all-excel" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileSpreadsheet className="mr-2 h-4 w-4" />
            )}
            Export All (Excel)
          </Button>
          <Button
            onClick={() => handleExportAll("pdf")}
            disabled={loading !== null}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            {loading === "all-pdf" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export All (PDF)
          </Button>
        </div>
      </div>

      {/* Quick Export */}
      <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gradient-to-br from-primary to-blue-600 p-3">
                <FileDown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Export Cepat</h3>
                <p className="text-sm text-muted-foreground">Download semua laporan sekaligus untuk lampiran skripsi</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>7 jenis laporan tersedia</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => {
          const Icon = report.icon
          const isLoading = loading?.startsWith(report.id)

          return (
            <Card key={report.id} className="overflow-hidden transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`rounded-xl bg-gradient-to-br ${report.color} p-2.5 shadow-sm`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{report.title}</CardTitle>
                    <CardDescription className="mt-0.5">{report.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {report.items.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs font-normal">
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-border bg-transparent"
                    onClick={() => handleExport(report.id, "excel")}
                    disabled={loading !== null}
                  >
                    {loading === `${report.id}-excel` ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                    )}
                    Excel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-border bg-transparent"
                    onClick={() => handleExport(report.id, "pdf")}
                    disabled={loading !== null}
                  >
                    {loading === `${report.id}-pdf` ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FileText className="mr-2 h-4 w-4 text-red-600" />
                    )}
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Format Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Format Laporan</CardTitle>
          <CardDescription>Spesifikasi format untuk keperluan akademik</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
              <div className="flex items-center gap-2 mb-3">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-700 dark:text-green-400">Excel / CSV</h4>
              </div>
              <ul className="text-sm text-green-700/80 dark:text-green-300/80 space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-green-500" />
                  Multiple sheets per perhitungan
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-green-500" />
                  Formula dapat diedit
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-green-500" />
                  Cocok untuk analisis lanjutan
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-green-500" />
                  Format .csv (dapat dibuka di Excel)
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-red-700 dark:text-red-400">PDF</h4>
              </div>
              <ul className="text-sm text-red-700/80 dark:text-red-300/80 space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-red-500" />
                  Format A4, margin standar
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-red-500" />
                  Font Times New Roman 12pt
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-red-500" />
                  Tabel dengan border
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-red-500" />
                  Siap cetak untuk lampiran skripsi
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
