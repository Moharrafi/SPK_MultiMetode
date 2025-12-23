import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

export async function GET() {
  const data = await prisma.kriteria.findMany({ orderBy: { createdAt: 'asc' } })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const created = await prisma.kriteria.create({
    data: {
      kode: body.kode,
      nama: body.nama,
      bobot: body.bobot,
      jenis: body.jenis,
    },
  })
  return NextResponse.json(created, { status: 201 })
}
