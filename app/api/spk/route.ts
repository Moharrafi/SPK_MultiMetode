import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import {
  sampleAlternatif,
  sampleKriteria,
  sampleSubKriteria,
  samplePenilaian,
  sampleMetodeConfig,
} from '@/lib/spk-data'

const defaultMetodeConfig = [
  { nama: 'SAW', aktif: true, bobot: 1 },
  { nama: 'AHP', aktif: true, bobot: 1 },
  { nama: 'TOPSIS', aktif: true, bobot: 1 },
]

export async function GET() {
  try {
    const [alternatif, kriteria, subKriteria, penilaian, pairwiseComparisons] = await Promise.all([
      prisma.alternatif.findMany({ orderBy: { createdAt: 'asc' } }),
      prisma.kriteria.findMany({ orderBy: { createdAt: 'asc' } }),
      prisma.subKriteria.findMany(),
      prisma.penilaian.findMany(),
      prisma.pairwiseComparison.findMany(),
    ])

    let metodeConfig = await prisma.metodeConfig.findMany({ orderBy: { nama: 'asc' } })
    if (metodeConfig.length === 0) {
      metodeConfig = await prisma.$transaction(
        defaultMetodeConfig.map((config) => prisma.metodeConfig.create({ data: config })),
      )
    }

    return NextResponse.json({
      alternatif,
      kriteria,
      subKriteria,
      penilaian,
      metodeConfig,
      pairwiseComparisons,
    })
  } catch (error) {
    console.error('Gagal mengambil data dari database, menggunakan data fallback', error)
    return NextResponse.json({
      alternatif: sampleAlternatif,
      kriteria: sampleKriteria,
      subKriteria: sampleSubKriteria,
      penilaian: samplePenilaian,
      metodeConfig: sampleMetodeConfig,
      pairwiseComparisons: [],
    })
  }
}
