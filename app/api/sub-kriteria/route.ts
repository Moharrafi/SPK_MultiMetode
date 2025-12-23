import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

export async function GET() {
  const data = await prisma.subKriteria.findMany()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const created = await prisma.subKriteria.create({
    data: {
      kriteriaId: body.kriteriaId,
      nama: body.nama,
      nilai: body.nilai,
    },
  })
  return NextResponse.json(created, { status: 201 })
}
