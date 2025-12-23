import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

interface Params {
  params: { id: string }
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json()

  const alternatif = await prisma.alternatif.update({
    where: { id: params.id },
    data: {
      kode: body.kode,
      nama: body.nama,
      nomorHp: body.nomorHp ?? null,
      alamat: body.alamat ?? null,
      kategori: body.kategori ?? null,
    },
  })

  return NextResponse.json(alternatif)
}

export async function DELETE(_request: Request, { params }: Params) {
  await prisma.alternatif.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
