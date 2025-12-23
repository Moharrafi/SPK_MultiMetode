import { PrismaClient } from '@prisma/client'
import { getDefaultSettings } from '../lib/settings-data'

const prisma = new PrismaClient()

async function main() {
  await prisma.penilaian.deleteMany()
  await prisma.subKriteria.deleteMany()
  await prisma.kriteria.deleteMany()
  await prisma.alternatif.deleteMany()
  await prisma.metodeConfig.deleteMany()
  await prisma.setting.deleteMany()

  const alternatif = await prisma.alternatif.createMany({
    data: [
      { kode: 'A1', nama: 'Kandidat Ahmad Ridwan', nomorHp: '081234567890', alamat: 'Jakarta', kategori: 'Internal' },
      { kode: 'A2', nama: 'Kandidat Budi Santoso', nomorHp: '082345678901', alamat: 'Bandung', kategori: 'Eksternal' },
      { kode: 'A3', nama: 'Kandidat Citra Dewi', nomorHp: '083456789012', alamat: 'Surabaya', kategori: 'Internal' },
      { kode: 'A4', nama: 'Kandidat Dimas Prasetyo', nomorHp: '084567890123', alamat: 'Yogyakarta', kategori: 'Eksternal' },
      { kode: 'A5', nama: 'Kandidat Eka Putri', nomorHp: '085678901234', alamat: 'Semarang', kategori: 'Internal' },
    ],
  })

  const kriteriaData = [
    { kode: 'C1', nama: 'Pendidikan', bobot: 0.25, jenis: 'benefit' as const },
    { kode: 'C2', nama: 'Pengalaman Kerja', bobot: 0.30, jenis: 'benefit' as const },
    { kode: 'C3', nama: 'Usia', bobot: 0.15, jenis: 'cost' as const },
    { kode: 'C4', nama: 'Kemampuan Komunikasi', bobot: 0.20, jenis: 'benefit' as const },
    { kode: 'C5', nama: 'Gaji yang Diharapkan', bobot: 0.10, jenis: 'cost' as const },
  ]

  const kriteria = await Promise.all(
    kriteriaData.map((kriteria) =>
      prisma.kriteria.create({
        data: kriteria,
      }),
    ),
  )

  await prisma.subKriteria.createMany({
    data: [
      ...kriteria.map((k) => ({ kriteriaId: k.id, nama: 'Sangat Baik', nilai: 5 })),
      ...kriteria.map((k) => ({ kriteriaId: k.id, nama: 'Baik', nilai: 4 })),
      ...kriteria.map((k) => ({ kriteriaId: k.id, nama: 'Cukup', nilai: 3 })),
      ...kriteria.map((k) => ({ kriteriaId: k.id, nama: 'Kurang', nilai: 2 })),
      ...kriteria.map((k) => ({ kriteriaId: k.id, nama: 'Sangat Kurang', nilai: 1 })),
    ],
  })

  await prisma.metodeConfig.createMany({
    data: [
      { nama: 'SAW', aktif: true, bobot: 1 },
      { nama: 'AHP', aktif: true, bobot: 1 },
      { nama: 'TOPSIS', aktif: true, bobot: 1 },
    ],
  })

  const alternatifIds = await prisma.alternatif.findMany({ select: { id: true } })
  const kriteriaIds = await prisma.kriteria.findMany({ select: { id: true } })

  const penilaianData = alternatifIds.flatMap((alt, altIndex) =>
    kriteriaIds.map((krit, kritIndex) => ({
      alternatifId: alt.id,
      kriteriaId: krit.id,
      nilai: ((altIndex + kritIndex) % 5) + 1,
    })),
  )

  await prisma.penilaian.createMany({ data: penilaianData })

  const defaultSettings = getDefaultSettings()
  await Promise.all(
    Object.entries(defaultSettings).map(([key, value]) =>
      prisma.setting.create({
        data: {
          key,
          data: value,
        },
      }),
    ),
  )
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
