import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

interface Params {
  params: { id: string }
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json()
  const updated = await prisma.kriteria.update({
    where: { id: params.id },
    data: {
      kode: body.kode,
      nama: body.nama,
      bobot: body.bobot,
      jenis: body.jenis,
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, { params }: Params) {
  await prisma.kriteria.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
