import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

export async function GET() {
  const alternatif = await prisma.alternatif.findMany({ orderBy: { createdAt: 'asc' } })
  return NextResponse.json(alternatif)
}

export async function POST(request: Request) {
  const body = await request.json()

  const alternatif = await prisma.alternatif.create({
    data: {
      kode: body.kode,
      nama: body.nama,
      nomorHp: body.nomorHp ?? null,
      alamat: body.alamat ?? null,
      kategori: body.kategori ?? null,
    },
  })

  return NextResponse.json(alternatif, { status: 201 })
}
