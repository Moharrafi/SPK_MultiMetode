import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")

const sanitizeExtension = (mimeType: string) => {
  const ext = mimeType.split("/")[1]?.toLowerCase()
  if (ext === "jpeg") return "jpg"
  if (ext === "png" || ext === "jpg" || ext === "webp") return ext
  return null
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 })
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    const extension = sanitizeExtension(file.type)
    if (!extension) {
      return NextResponse.json({ error: "Unsupported image type" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `logo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`

    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)

    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (error) {
    console.error("Failed to upload image", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
