import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

import { SETTINGS_KEYS, SettingsKey, SettingsSnapshot, getDefaultSettings } from '@/lib/settings-data'

const SETTINGS_FILE = path.join(process.cwd(), 'settings-cache.json')

const readSettingsFile = async () => {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, 'utf8')
    return JSON.parse(raw) as Record<string, unknown>
  } catch (error) {
    return null
  }
}

const writeSettingsFile = async (data: Record<string, unknown>) => {
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf8')
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export async function GET() {
  try {
    const defaults = getDefaultSettings()
    const stored = (await readSettingsFile()) || {}
    const response = { ...defaults }

    for (const key of SETTINGS_KEYS) {
      if (stored[key]) {
        response[key as SettingsKey] = stored[key] as (typeof defaults)[SettingsKey]
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Failed to load settings from file', error)
    return NextResponse.json(getDefaultSettings())
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const key = body?.key as SettingsKey
    const settingData = body?.data

    if (!key || settingData === undefined) {
      return NextResponse.json({ error: 'Key and data are required' }, { status: 400 })
    }

    if (!SETTINGS_KEYS.includes(key)) {
      return NextResponse.json({ error: 'Invalid setting key' }, { status: 400 })
    }

    const defaults = getDefaultSettings()
    const stored = ((await readSettingsFile()) || {}) as Partial<SettingsSnapshot>
    const merged: SettingsSnapshot = { ...defaults, ...stored }
    const currentValue = merged[key]
    const nextValue =
      isRecord(currentValue) && isRecord(settingData) ? { ...currentValue, ...settingData } : settingData

    const next: SettingsSnapshot = { ...merged, [key]: nextValue as SettingsSnapshot[typeof key] }
    await writeSettingsFile(next as Record<string, unknown>)

    return NextResponse.json(nextValue)
  } catch (error) {
    console.error('Failed to update settings file', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
