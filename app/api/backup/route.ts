import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

import { prisma } from '@/lib/db'
import { SETTINGS_KEYS, SettingsKey, getDefaultSettings } from '@/lib/settings-data'

const SETTINGS_FILE = path.join(process.cwd(), 'settings-cache.json')

const readSettingsFile = async () => {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, 'utf8')
    return JSON.parse(raw) as Partial<Record<SettingsKey, unknown>>
  } catch {
    return null
  }
}

const defaultMetodeConfig = [
  { nama: 'SAW', aktif: true, bobot: 1 },
  { nama: 'AHP', aktif: true, bobot: 1 },
  { nama: 'TOPSIS', aktif: true, bobot: 1 },
]

export async function POST() {
  try {
    const timestamp = new Date()
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

    const defaults = getDefaultSettings()
    const cached = (await readSettingsFile()) as Partial<typeof defaults> | null
    const settingSnapshot: typeof defaults = { ...defaults }

    if (cached) {
      for (const key of SETTINGS_KEYS) {
        if (cached[key]) {
          settingSnapshot[key] = cached[key] as (typeof defaults)[SettingsKey]
        }
      }
    }

    const contents = {
      generatedAt: timestamp.toISOString(),
      metadata: {
        alternatifCount: alternatif.length,
        kriteriaCount: kriteria.length,
        penilaianCount: penilaian.length,
        metodeCount: metodeConfig.length,
      },
      data: {
        alternatif,
        kriteria,
        subKriteria,
        penilaian,
        pairwiseComparisons,
        metodeConfig,
        settings: settingSnapshot,
      },
    }

    const fileName = `backup-spk-${timestamp.toISOString().replace(/[:.]/g, '-')}.json`

    return NextResponse.json({ fileName, contents })
  } catch (error) {
    console.error('Failed to generate backup', error)
    return NextResponse.json({ error: 'Gagal membuat backup' }, { status: 500 })
  }
}
