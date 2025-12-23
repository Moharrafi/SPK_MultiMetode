import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"

const PROFILE_FILE = path.join(process.cwd(), "profiles-cache.json")

const readProfiles = async (): Promise<Record<string, any>> => {
  try {
    const data = await fs.readFile(PROFILE_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    return {}
  }
}

const writeProfiles = async (profiles: Record<string, any>) => {
  await fs.writeFile(PROFILE_FILE, JSON.stringify(profiles, null, 2), "utf8")
}

export async function GET(_: Request, { params }: { params: { userId: string } }) {
  const profiles = await readProfiles()
  const profile = profiles[params.userId] || null
  return NextResponse.json(profile ?? {})
}

export async function PATCH(request: Request, { params }: { params: { userId: string } }) {
  try {
    const body = await request.json()
    const { nama, email, avatar } = body as { nama?: string; email?: string; avatar?: string }
    const profiles = await readProfiles()
    profiles[params.userId] = {
      ...(profiles[params.userId] || {}),
      ...(nama !== undefined ? { nama } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(avatar !== undefined ? { avatar } : {}),
    }
    await writeProfiles(profiles)
    return NextResponse.json(profiles[params.userId])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
