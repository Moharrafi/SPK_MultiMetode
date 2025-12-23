import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

interface Params {
  params: { nama: 'SAW' | 'AHP' | 'TOPSIS' }
}

export async function PATCH(request: Request, { params }: Params) {
  const body = await request.json()

  const updated = await prisma.metodeConfig.update({
    where: { nama: params.nama },
    data: {
      aktif: typeof body.aktif === 'boolean' ? body.aktif : undefined,
      bobot: typeof body.bobot === 'number' ? body.bobot : undefined,
    },
  })

  return NextResponse.json(updated)
}
