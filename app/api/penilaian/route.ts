import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

export async function GET() {
  const data = await prisma.penilaian.findMany()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const upserted = await prisma.penilaian.upsert({
    where: {
      alternatifId_kriteriaId: {
        alternatifId: body.alternatifId,
        kriteriaId: body.kriteriaId,
      },
    },
    update: { nilai: body.nilai },
    create: {
      alternatifId: body.alternatifId,
      kriteriaId: body.kriteriaId,
      nilai: body.nilai,
    },
  })
  return NextResponse.json(upserted)
}
