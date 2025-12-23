import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

interface Params {
  params: { id: string }
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json()
  const updated = await prisma.subKriteria.update({
    where: { id: params.id },
    data: {
      nama: body.nama,
      nilai: body.nilai,
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, { params }: Params) {
  await prisma.subKriteria.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
