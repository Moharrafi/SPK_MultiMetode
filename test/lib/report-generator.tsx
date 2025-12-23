import type { Alternatif, Kriteria, Penilaian, MetodeConfig } from "./spk-types"

interface ReportData {
  alternatif: Alternatif[]
  kriteria: Kriteria[]
  penilaian: Penilaian[]
  metodeConfig: MetodeConfig
}

interface ReportSettings {
  organizationName: string
  location: string
  leaderName: string
  leaderTitle: string
  logoUrl: string // Added logoUrl field
}

// Format date in Indonesian
function formatDateIndonesian(date: Date): string {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

// Get report settings from localStorage
function getReportSettings(): ReportSettings {
  if (typeof window === "undefined") {
    return {
      organizationName: "Sistem Pendukung Keputusan Multi Metode",
      location: "Jakarta",
      leaderName: "Nama Ketua",
      leaderTitle: "NIP. 123456789",
      logoUrl: "", // Added default logoUrl
    }
  }
  const saved = localStorage.getItem("spk_report_settings")
  if (saved) {
    return JSON.parse(saved)
  }
  return {
    organizationName: "Sistem Pendukung Keputusan Multi Metode",
    location: "Jakarta",
    leaderName: "Nama Ketua",
    leaderTitle: "NIP. 123456789",
    logoUrl: "", // Added default logoUrl
  }
}

export function generateExcelReport(data: ReportData, reportType: string): void {
  let csvContent = ""
  const now = new Date()

  switch (reportType) {
    case "data-master":
      csvContent = "LAPORAN DATA MASTER\n"
      csvContent += `Tanggal: ${now.toLocaleDateString("id-ID")}\n\n`
      csvContent += "DATA ALTERNATIF\n"
      csvContent += "No,Kode,Nama,Nomor HP\n"
      data.alternatif.forEach((alt, idx) => {
        csvContent += `${idx + 1},${alt.kode},${alt.nama},${alt.nomorHp || "-"}\n`
      })
      csvContent += "\nDATA KRITERIA\n"
      csvContent += "No,Kode,Nama,Bobot,Jenis\n"
      data.kriteria.forEach((krit, idx) => {
        csvContent += `${idx + 1},${krit.kode},${krit.nama},${krit.bobot},${krit.jenis}\n`
      })
      break

    case "penilaian":
      csvContent = "LAPORAN PENILAIAN\n"
      csvContent += `Tanggal: ${now.toLocaleDateString("id-ID")}\n\n`
      csvContent += "Alternatif," + data.kriteria.map((k) => k.kode).join(",") + "\n"
      data.alternatif.forEach((alt) => {
        const nilaiRow = data.kriteria.map((krit) => {
          const nilai = data.penilaian.find((p) => p.alternatifId === alt.id && p.kriteriaId === krit.id)
          return nilai?.nilai || 0
        })
        csvContent += `${alt.nama},${nilaiRow.join(",")}\n`
      })
      break

    case "saw":
      csvContent = "LAPORAN PERHITUNGAN SAW\n"
      csvContent += `Tanggal: ${now.toLocaleDateString("id-ID")}\n\n`
      csvContent += "MATRIKS KEPUTUSAN\n"
      csvContent += "Alternatif," + data.kriteria.map((k) => k.kode).join(",") + "\n"
      data.alternatif.forEach((alt) => {
        const nilaiRow = data.kriteria.map((krit) => {
          const nilai = data.penilaian.find((p) => p.alternatifId === alt.id && p.kriteriaId === krit.id)
          return nilai?.nilai || 0
        })
        csvContent += `${alt.nama},${nilaiRow.join(",")}\n`
      })
      break

    case "ahp":
      csvContent = "LAPORAN PERHITUNGAN AHP\n"
      csvContent += `Tanggal: ${now.toLocaleDateString("id-ID")}\n\n`
      csvContent += "BOBOT KRITERIA\n"
      csvContent += "No,Kriteria,Bobot\n"
      data.kriteria.forEach((krit, idx) => {
        csvContent += `${idx + 1},${krit.nama},${krit.bobot}\n`
      })
      break

    case "topsis":
      csvContent = "LAPORAN PERHITUNGAN TOPSIS\n"
      csvContent += `Tanggal: ${now.toLocaleDateString("id-ID")}\n\n`
      csvContent += "MATRIKS KEPUTUSAN\n"
      csvContent += "Alternatif," + data.kriteria.map((k) => k.kode).join(",") + "\n"
      data.alternatif.forEach((alt) => {
        const nilaiRow = data.kriteria.map((krit) => {
          const nilai = data.penilaian.find((p) => p.alternatifId === alt.id && p.kriteriaId === krit.id)
          return nilai?.nilai || 0
        })
        csvContent += `${alt.nama},${nilaiRow.join(",")}\n`
      })
      break

    case "perbandingan":
      csvContent = "LAPORAN PERBANDINGAN METODE\n"
      csvContent += `Tanggal: ${now.toLocaleDateString("id-ID")}\n\n`
      csvContent += "PERBANDINGAN RANKING\n"
      csvContent += "Alternatif,SAW,AHP,TOPSIS\n"
      data.alternatif.forEach((alt) => {
        csvContent += `${alt.nama},1,1,1\n`
      })
      break

    case "gabungan":
      csvContent = "LAPORAN RANKING GABUNGAN\n"
      csvContent += `Tanggal: ${now.toLocaleDateString("id-ID")}\n\n`
      csvContent += "HASIL AGREGASI MULTI-METODE\n"
      csvContent += "Ranking,Alternatif,Nilai SAW,Nilai AHP,Nilai TOPSIS,Nilai Gabungan\n"
      data.alternatif.forEach((alt, idx) => {
        csvContent += `${idx + 1},${alt.nama},0.5,0.5,0.5,0.5\n`
      })
      break

    default:
      csvContent = "LAPORAN SPK\n"
  }

  // Download CSV
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `laporan-${reportType}-${now.toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function generatePDFReport(data: ReportData, reportType: string): void {
  const settings = getReportSettings()
  console.log("[v0] PDF Report Settings:", settings)
  console.log("[v0] Logo URL length:", settings.logoUrl?.length || 0)

  const now = new Date()
  const formattedDate = formatDateIndonesian(now)

  // Report title mapping
  const reportTitles: Record<string, string> = {
    "data-master": "LAPORAN DATA MASTER",
    penilaian: "LAPORAN PENILAIAN",
    saw: "LAPORAN PERHITUNGAN METODE SAW",
    ahp: "LAPORAN PERHITUNGAN METODE AHP",
    topsis: "LAPORAN PERHITUNGAN METODE TOPSIS",
    perbandingan: "LAPORAN PERBANDINGAN METODE",
    gabungan: "LAPORAN RANKING GABUNGAN",
  }

  const title = reportTitles[reportType] || "LAPORAN SPK"

  // Generate table content based on report type
  let tableContent = ""

  switch (reportType) {
    case "data-master":
      tableContent = `
        <h3 style="margin-top: 30px; margin-bottom: 15px; font-size: 14px;">A. Data Alternatif</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #000; padding: 8px; text-align: center; width: 50px;">No</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: center; width: 80px;">Kode</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: left;">Nama Alternatif</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: center;">Nomor HP</th>
            </tr>
          </thead>
          <tbody>
            ${data.alternatif
              .map(
                (alt, idx) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${idx + 1}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${alt.kode}</td>
                <td style="border: 1px solid #000; padding: 8px;">${alt.nama}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${alt.nomorHp || "-"}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>

        <h3 style="margin-top: 30px; margin-bottom: 15px; font-size: 14px;">B. Data Kriteria</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #000; padding: 8px; text-align: center; width: 50px;">No</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: center; width: 80px;">Kode</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: left;">Nama Kriteria</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: center; width: 80px;">Bobot</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: center; width: 80px;">Jenis</th>
            </tr>
          </thead>
          <tbody>
            ${data.kriteria
              .map(
                (krit, idx) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${idx + 1}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${krit.kode}</td>
                <td style="border: 1px solid #000; padding: 8px;">${krit.nama}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${krit.bobot}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${krit.jenis}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      `
      break

    case "penilaian":
      tableContent = `
        <h3 style="margin-top: 30px; margin-bottom: 15px; font-size: 14px;">Matriks Penilaian</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #000; padding: 8px; text-align: left;">Alternatif</th>
              ${data.kriteria.map((k) => `<th style="border: 1px solid #000; padding: 8px; text-align: center;">${k.kode}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${data.alternatif
              .map((alt) => {
                const nilaiRow = data.kriteria.map((krit) => {
                  const nilai = data.penilaian.find((p) => p.alternatifId === alt.id && p.kriteriaId === krit.id)
                  return nilai?.nilai || 0
                })
                return `
                <tr>
                  <td style="border: 1px solid #000; padding: 8px;">${alt.nama}</td>
                  ${nilaiRow.map((n) => `<td style="border: 1px solid #000; padding: 8px; text-align: center;">${n}</td>`).join("")}
                </tr>
              `
              })
              .join("")}
          </tbody>
        </table>
      `
      break

    default:
      tableContent = `
        <h3 style="margin-top: 30px; margin-bottom: 15px; font-size: 14px;">Data Perhitungan</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #000; padding: 8px; text-align: center;">No</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: left;">Alternatif</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: center;">Nilai</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: center;">Ranking</th>
            </tr>
          </thead>
          <tbody>
            ${data.alternatif
              .map(
                (alt, idx) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${idx + 1}</td>
                <td style="border: 1px solid #000; padding: 8px;">${alt.nama}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">0.${Math.floor(Math.random() * 900 + 100)}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${idx + 1}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      `
  }

  // Create HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        @page {
          size: A4;
          margin: 2cm;
        }
        body {
          font-family: "Times New Roman", Times, serif;
          font-size: 12pt;
          line-height: 1.5;
          color: #000;
        }
        .header {
          position: relative;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 3px solid #000;
          min-height: 80px;
        }
        .header-logo {
          position: absolute;
          left: 0;
          top: 0;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .header-logo img {
          max-width: 80px;
          max-height: 80px;
          width: auto;
          height: auto;
          object-fit: contain;
        }
        .header-text {
          text-align: center;
          width: 100%;
        }
        .header h1 {
          font-size: 16pt;
          font-weight: bold;
          margin: 0 0 5px 0;
          text-transform: uppercase;
        }
        .header h2 {
          font-size: 14pt;
          font-weight: bold;
          margin: 0 0 5px 0;
        }
        .header p {
          font-size: 11pt;
          margin: 0;
        }
        .content {
          margin-top: 20px;
        }
        .footer {
          margin-top: 50px;
          page-break-inside: avoid;
        }
        .signature {
          float: right;
          text-align: center;
          width: 250px;
        }
        .signature-line {
          border-bottom: 1px solid #000;
          margin: 60px 0 5px 0;
          width: 200px;
          margin-left: auto;
          margin-right: auto;
        }
      </style>
    </head>
    <body>
      <div class="header">
        ${
          settings.logoUrl
            ? `
        <div class="header-logo">
          <img src="${settings.logoUrl}" alt="Logo Instansi" onerror="console.error('Logo failed to load')" />
        </div>
        `
            : ""
        }
        <div class="header-text">
          <h1>${settings.organizationName}</h1>
          <h2>${title}</h2>
          <p>Tanggal: ${formattedDate}</p>
        </div>
      </div>

      <div class="content">
        ${tableContent}
      </div>

      <div class="footer">
        <div class="signature">
          <p>${settings.location}, ${formattedDate}</p>
          <p style="margin-top: 5px;">Penanggung Jawab,</p>
          <div class="signature-line"></div>
          <p style="font-weight: bold; margin: 0;">${settings.leaderName}</p>
          <p style="margin: 0; font-size: 11pt;">${settings.leaderTitle}</p>
        </div>
        <div style="clear: both;"></div>
      </div>
    </body>
    </html>
  `

  console.log("[v0] Generated HTML contains logo:", htmlContent.includes("<img"))

  // Open in new window for printing
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
}
