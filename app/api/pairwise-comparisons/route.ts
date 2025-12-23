import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

export async function GET() {
  const data = await prisma.pairwiseComparison.findMany()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const upserted = await prisma.pairwiseComparison.upsert({
    where: {
      kriteria1Id_kriteria2Id: {
        kriteria1Id: body.kriteria1Id,
        kriteria2Id: body.kriteria2Id,
      },
    },
    update: { nilai: body.nilai },
    create: {
      kriteria1Id: body.kriteria1Id,
      kriteria2Id: body.kriteria2Id,
      nilai: body.nilai,
    },
  })
  return NextResponse.json(upserted)
}
