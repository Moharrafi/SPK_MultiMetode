// SPK Calculation Functions
import type { Kriteria, Penilaian, Alternatif, HasilPerhitungan, PairwiseComparison, AHPResult } from "./spk-types"

// ==================== SAW CALCULATIONS ====================
export function calculateSAW(
  alternatif: Alternatif[],
  kriteria: Kriteria[],
  penilaian: Penilaian[],
): { normalisasi: number[][]; hasilAkhir: HasilPerhitungan[] } {
  const n = alternatif.length
  const m = kriteria.length

  // Create decision matrix
  const matrix: number[][] = []
  for (let i = 0; i < n; i++) {
    matrix[i] = []
    for (let j = 0; j < m; j++) {
      const nilai = penilaian.find((p) => p.alternatifId === alternatif[i].id && p.kriteriaId === kriteria[j].id)
      matrix[i][j] = nilai?.nilai || 0
    }
  }

  // Normalization
  const normalisasi: number[][] = []
  for (let i = 0; i < n; i++) {
    normalisasi[i] = []
    for (let j = 0; j < m; j++) {
      const columnValues = matrix.map((row) => row[j])
      const maxVal = Math.max(...columnValues)
      const minVal = Math.min(...columnValues.filter((v) => v > 0))

      if (kriteria[j].jenis === "benefit") {
        normalisasi[i][j] = maxVal > 0 ? matrix[i][j] / maxVal : 0
      } else {
        normalisasi[i][j] = matrix[i][j] > 0 ? minVal / matrix[i][j] : 0
      }
    }
  }

  // Calculate preference value (V)
  const hasilAkhir: HasilPerhitungan[] = []
  for (let i = 0; i < n; i++) {
    let nilai = 0
    for (let j = 0; j < m; j++) {
      nilai += normalisasi[i][j] * kriteria[j].bobot
    }
    hasilAkhir.push({
      alternatifId: alternatif[i].id,
      alternatifNama: alternatif[i].nama,
      nilai: Math.round(nilai * 10000) / 10000,
      ranking: 0,
    })
  }

  // Sort and assign ranking
  hasilAkhir.sort((a, b) => b.nilai - a.nilai)
  hasilAkhir.forEach((h, idx) => (h.ranking = idx + 1))

  return { normalisasi, hasilAkhir }
}

// ==================== AHP CALCULATIONS ====================
export function calculateAHP(kriteria: Kriteria[], pairwiseComparisons: PairwiseComparison[]): AHPResult {
  const n = kriteria.length

  // Create pairwise comparison matrix
  const matrix: number[][] = []
  for (let i = 0; i < n; i++) {
    matrix[i] = []
    for (let j = 0; j < n; j++) {
      if (i === j) {
        matrix[i][j] = 1
      } else {
        const comparison = pairwiseComparisons.find(
          (c) => c.kriteria1Id === kriteria[i].id && c.kriteria2Id === kriteria[j].id,
        )
        if (comparison) {
          matrix[i][j] = comparison.nilai
        } else {
          const reverseComparison = pairwiseComparisons.find(
            (c) => c.kriteria1Id === kriteria[j].id && c.kriteria2Id === kriteria[i].id,
          )
          matrix[i][j] = reverseComparison ? 1 / reverseComparison.nilai : 1
        }
      }
    }
  }

  // Calculate column sums
  const columnSums: number[] = []
  for (let j = 0; j < n; j++) {
    let sum = 0
    for (let i = 0; i < n; i++) {
      sum += matrix[i][j]
    }
    columnSums[j] = sum
  }

  // Normalize matrix
  const normalizedMatrix: number[][] = []
  for (let i = 0; i < n; i++) {
    normalizedMatrix[i] = []
    for (let j = 0; j < n; j++) {
      normalizedMatrix[i][j] = matrix[i][j] / columnSums[j]
    }
  }

  // Calculate priority vector (bobot)
  const bobotKriteria: { kriteriaId: string; bobot: number }[] = []
  for (let i = 0; i < n; i++) {
    let sum = 0
    for (let j = 0; j < n; j++) {
      sum += normalizedMatrix[i][j]
    }
    bobotKriteria.push({
      kriteriaId: kriteria[i].id,
      bobot: Math.round((sum / n) * 10000) / 10000,
    })
  }

  // Calculate Consistency Ratio
  // Calculate weighted sum vector
  const weightedSum: number[] = []
  for (let i = 0; i < n; i++) {
    let sum = 0
    for (let j = 0; j < n; j++) {
      sum += matrix[i][j] * bobotKriteria[j].bobot
    }
    weightedSum[i] = sum
  }

  // Calculate lambda max
  let lambdaMax = 0
  for (let i = 0; i < n; i++) {
    lambdaMax += weightedSum[i] / bobotKriteria[i].bobot
  }
  lambdaMax /= n

  // Calculate CI and CR
  const CI = (lambdaMax - n) / (n - 1)
  const RI = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49][n] || 1.49
  const CR = RI > 0 ? CI / RI : 0

  return {
    bobotKriteria,
    consistencyRatio: Math.round(CR * 10000) / 10000,
    isConsistent: CR <= 0.1,
  }
}

export function calculateAHPRanking(
  alternatif: Alternatif[],
  kriteria: Kriteria[],
  penilaian: Penilaian[],
  ahpBobot: { kriteriaId: string; bobot: number }[],
): HasilPerhitungan[] {
  const n = alternatif.length
  const m = kriteria.length

  // Create decision matrix
  const matrix: number[][] = []
  for (let i = 0; i < n; i++) {
    matrix[i] = []
    for (let j = 0; j < m; j++) {
      const nilai = penilaian.find((p) => p.alternatifId === alternatif[i].id && p.kriteriaId === kriteria[j].id)
      matrix[i][j] = nilai?.nilai || 0
    }
  }

  // Normalize and calculate
  const hasilAkhir: HasilPerhitungan[] = []
  for (let i = 0; i < n; i++) {
    let nilai = 0
    for (let j = 0; j < m; j++) {
      const columnValues = matrix.map((row) => row[j])
      const maxVal = Math.max(...columnValues)
      const minVal = Math.min(...columnValues.filter((v) => v > 0))

      let normalizedValue: number
      if (kriteria[j].jenis === "benefit") {
        normalizedValue = maxVal > 0 ? matrix[i][j] / maxVal : 0
      } else {
        normalizedValue = matrix[i][j] > 0 ? minVal / matrix[i][j] : 0
      }

      const bobot = ahpBobot.find((b) => b.kriteriaId === kriteria[j].id)?.bobot || kriteria[j].bobot
      nilai += normalizedValue * bobot
    }
    hasilAkhir.push({
      alternatifId: alternatif[i].id,
      alternatifNama: alternatif[i].nama,
      nilai: Math.round(nilai * 10000) / 10000,
      ranking: 0,
    })
  }

  hasilAkhir.sort((a, b) => b.nilai - a.nilai)
  hasilAkhir.forEach((h, idx) => (h.ranking = idx + 1))

  return hasilAkhir
}

// ==================== TOPSIS CALCULATIONS ====================
export function calculateTOPSIS(
  alternatif: Alternatif[],
  kriteria: Kriteria[],
  penilaian: Penilaian[],
): {
  matriksKeputusan: number[][]
  matriksNormalisasi: number[][]
  matriksTerbobot: number[][]
  solusiIdealPositif: number[]
  solusiIdealNegatif: number[]
  jarakPositif: number[]
  jarakNegatif: number[]
  hasilAkhir: HasilPerhitungan[]
} {
  const n = alternatif.length
  const m = kriteria.length

  // Create decision matrix
  const matriksKeputusan: number[][] = []
  for (let i = 0; i < n; i++) {
    matriksKeputusan[i] = []
    for (let j = 0; j < m; j++) {
      const nilai = penilaian.find((p) => p.alternatifId === alternatif[i].id && p.kriteriaId === kriteria[j].id)
      matriksKeputusan[i][j] = nilai?.nilai || 0
    }
  }

  // Normalize matrix (vector normalization)
  const matriksNormalisasi: number[][] = []
  for (let i = 0; i < n; i++) {
    matriksNormalisasi[i] = []
    for (let j = 0; j < m; j++) {
      const columnValues = matriksKeputusan.map((row) => row[j])
      const sumSquares = columnValues.reduce((sum, val) => sum + val * val, 0)
      const divisor = Math.sqrt(sumSquares)
      matriksNormalisasi[i][j] = divisor > 0 ? matriksKeputusan[i][j] / divisor : 0
    }
  }

  // Weighted normalized matrix
  const matriksTerbobot: number[][] = []
  for (let i = 0; i < n; i++) {
    matriksTerbobot[i] = []
    for (let j = 0; j < m; j++) {
      matriksTerbobot[i][j] = matriksNormalisasi[i][j] * kriteria[j].bobot
    }
  }

  // Ideal positive and negative solutions
  const solusiIdealPositif: number[] = []
  const solusiIdealNegatif: number[] = []
  for (let j = 0; j < m; j++) {
    const columnValues = matriksTerbobot.map((row) => row[j])
    if (kriteria[j].jenis === "benefit") {
      solusiIdealPositif[j] = Math.max(...columnValues)
      solusiIdealNegatif[j] = Math.min(...columnValues)
    } else {
      solusiIdealPositif[j] = Math.min(...columnValues)
      solusiIdealNegatif[j] = Math.max(...columnValues)
    }
  }

  // Distance to ideal solutions
  const jarakPositif: number[] = []
  const jarakNegatif: number[] = []
  for (let i = 0; i < n; i++) {
    let sumPositif = 0
    let sumNegatif = 0
    for (let j = 0; j < m; j++) {
      sumPositif += Math.pow(matriksTerbobot[i][j] - solusiIdealPositif[j], 2)
      sumNegatif += Math.pow(matriksTerbobot[i][j] - solusiIdealNegatif[j], 2)
    }
    jarakPositif[i] = Math.sqrt(sumPositif)
    jarakNegatif[i] = Math.sqrt(sumNegatif)
  }

  // Calculate preference value
  const hasilAkhir: HasilPerhitungan[] = []
  for (let i = 0; i < n; i++) {
    const divisor = jarakPositif[i] + jarakNegatif[i]
    const nilai = divisor > 0 ? jarakNegatif[i] / divisor : 0
    hasilAkhir.push({
      alternatifId: alternatif[i].id,
      alternatifNama: alternatif[i].nama,
      nilai: Math.round(nilai * 10000) / 10000,
      ranking: 0,
    })
  }

  hasilAkhir.sort((a, b) => b.nilai - a.nilai)
  hasilAkhir.forEach((h, idx) => (h.ranking = idx + 1))

  return {
    matriksKeputusan,
    matriksNormalisasi,
    matriksTerbobot,
    solusiIdealPositif,
    solusiIdealNegatif,
    jarakPositif,
    jarakNegatif,
    hasilAkhir,
  }
}

// ==================== COMBINED RANKING ====================
export function calculateCombinedRanking(
  hasilSAW: HasilPerhitungan[],
  hasilAHP: HasilPerhitungan[],
  hasilTOPSIS: HasilPerhitungan[],
  bobotSAW: number,
  bobotAHP: number,
  bobotTOPSIS: number,
): {
  alternatifId: string
  alternatifNama: string
  nilaiSAW: number
  nilaiAHP: number
  nilaiTOPSIS: number
  nilaiGabungan: number
  ranking: number
}[] {
  const combined: {
    alternatifId: string
    alternatifNama: string
    nilaiSAW: number
    nilaiAHP: number
    nilaiTOPSIS: number
    nilaiGabungan: number
    ranking: number
  }[] = []

  const allIds = new Set([
    ...hasilSAW.map((h) => h.alternatifId),
    ...hasilAHP.map((h) => h.alternatifId),
    ...hasilTOPSIS.map((h) => h.alternatifId),
  ])

  allIds.forEach((id) => {
    const saw = hasilSAW.find((h) => h.alternatifId === id)
    const ahp = hasilAHP.find((h) => h.alternatifId === id)
    const topsis = hasilTOPSIS.find((h) => h.alternatifId === id)

    const nilaiSAW = saw?.nilai || 0
    const nilaiAHP = ahp?.nilai || 0
    const nilaiTOPSIS = topsis?.nilai || 0

    const nilaiGabungan = nilaiSAW * bobotSAW + nilaiAHP * bobotAHP + nilaiTOPSIS * bobotTOPSIS

    combined.push({
      alternatifId: id,
      alternatifNama: saw?.alternatifNama || ahp?.alternatifNama || topsis?.alternatifNama || "",
      nilaiSAW,
      nilaiAHP,
      nilaiTOPSIS,
      nilaiGabungan: Math.round(nilaiGabungan * 10000) / 10000,
      ranking: 0,
    })
  })

  combined.sort((a, b) => b.nilaiGabungan - a.nilaiGabungan)
  combined.forEach((c, idx) => (c.ranking = idx + 1))

  return combined
}
