"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useAuth } from "@/lib/auth-context"
import type { Alternatif, Kriteria, SubKriteria, Penilaian, MetodeConfig, PairwiseComparison } from "./spk-types"
import { sampleAlternatif, sampleKriteria, sampleSubKriteria, samplePenilaian, sampleMetodeConfig } from "./spk-data"

interface SPKContextType {
  // Data
  alternatif: Alternatif[]
  kriteria: Kriteria[]
  subKriteria: SubKriteria[]
  penilaian: Penilaian[]
  metodeConfig: MetodeConfig[]
  pairwiseComparisons: PairwiseComparison[]

  // Actions
  setAlternatif: (data: Alternatif[]) => void
  addAlternatif: (data: Omit<Alternatif, "id" | "createdAt">) => void
  updateAlternatif: (id: string, data: Partial<Alternatif>) => void
  deleteAlternatif: (id: string) => void

  setKriteria: (data: Kriteria[]) => void
  addKriteria: (data: Omit<Kriteria, "id" | "createdAt">) => void
  updateKriteria: (id: string, data: Partial<Kriteria>) => void
  deleteKriteria: (id: string) => void

  setSubKriteria: (data: SubKriteria[]) => void
  addSubKriteria: (data: Omit<SubKriteria, "id">) => void
  updateSubKriteria: (id: string, data: Partial<SubKriteria>) => void
  deleteSubKriteria: (id: string) => void

  setPenilaian: (data: Penilaian[]) => void
  updatePenilaian: (alternatifId: string, kriteriaId: string, nilai: number) => void

  setMetodeConfig: (data: MetodeConfig[]) => void
  toggleMetode: (nama: "SAW" | "AHP" | "TOPSIS") => void
  updateMetodeBobot: (nama: "SAW" | "AHP" | "TOPSIS", bobot: number) => void

  setPairwiseComparisons: (data: PairwiseComparison[]) => void
  updatePairwiseComparison: (kriteria1Id: string, kriteria2Id: string, nilai: number) => void
}

const SPKContext = createContext<SPKContextType | null>(null)

export function SPKProvider({ children }: { children: ReactNode }) {
  const { logActivity } = useAuth()
  const [alternatif, setAlternatif] = useState<Alternatif[]>(sampleAlternatif)
  const [kriteria, setKriteria] = useState<Kriteria[]>(sampleKriteria)
  const [subKriteria, setSubKriteria] = useState<SubKriteria[]>(sampleSubKriteria)
  const [penilaian, setPenilaian] = useState<Penilaian[]>(samplePenilaian)
  const [metodeConfig, setMetodeConfig] = useState<MetodeConfig[]>(sampleMetodeConfig)
  const [pairwiseComparisons, setPairwiseComparisons] = useState<PairwiseComparison[]>([])

  const generateKode = (prefix: string, existing: string[]): string => {
    let counter = existing.length + 1
    let kode = `${prefix}${counter}`
    const existingSet = new Set(existing)
    while (existingSet.has(kode)) {
      counter += 1
      kode = `${prefix}${counter}`
    }
    return kode
  }

  const addAlternatif = (data: Omit<Alternatif, "id" | "createdAt">) => {
    const kode =
      data.kode?.trim() && !alternatif.some((a) => a.kode === data.kode)
        ? data.kode
        : generateKode("A", alternatif.map((a) => a.kode))
    const newAlternatif: Alternatif = {
      ...data,
      kode,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setAlternatif((prev) => [...prev, newAlternatif])
    logActivity("activity.alternative_added")
  }

  const updateAlternatif = (id: string, data: Partial<Alternatif>) => {
    setAlternatif((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)))
    logActivity("activity.alternative_updated")
  }

  const deleteAlternatif = (id: string) => {
    setAlternatif((prev) => prev.filter((a) => a.id !== id))
    setPenilaian((prev) => prev.filter((p) => p.alternatifId !== id))
    logActivity("activity.alternative_deleted")
  }

  const addKriteria = (data: Omit<Kriteria, "id" | "createdAt">) => {
    const kode =
      data.kode?.trim() && !kriteria.some((k) => k.kode === data.kode)
        ? data.kode
        : generateKode("C", kriteria.map((k) => k.kode))
    const newKriteria: Kriteria = {
      ...data,
      kode,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setKriteria((prev) => [...prev, newKriteria])
    logActivity("activity.criteria_added")
  }

  const updateKriteria = (id: string, data: Partial<Kriteria>) => {
    setKriteria((prev) => prev.map((k) => (k.id === id ? { ...k, ...data } : k)))
    logActivity("activity.criteria_updated")
  }

  const deleteKriteria = (id: string) => {
    setKriteria((prev) => prev.filter((k) => k.id !== id))
    setSubKriteria((prev) => prev.filter((s) => s.kriteriaId !== id))
    setPenilaian((prev) => prev.filter((p) => p.kriteriaId !== id))
    logActivity("activity.criteria_deleted")
  }

  const addSubKriteria = (data: Omit<SubKriteria, "id">) => {
    const newSubKriteria: SubKriteria = {
      ...data,
      id: Date.now().toString(),
    }
    setSubKriteria((prev) => [...prev, newSubKriteria])
    logActivity("activity.subcriteria_added")
  }

  const updateSubKriteria = (id: string, data: Partial<SubKriteria>) => {
    setSubKriteria((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)))
    logActivity("activity.subcriteria_updated")
  }

  const deleteSubKriteria = (id: string) => {
    setSubKriteria((prev) => prev.filter((s) => s.id !== id))
    logActivity("activity.subcriteria_deleted")
  }

  const updatePenilaian = (alternatifId: string, kriteriaId: string, nilai: number) => {
    setPenilaian((prev) => {
      const existing = prev.find((p) => p.alternatifId === alternatifId && p.kriteriaId === kriteriaId)
      if (existing) {
        return prev.map((p) => (p.alternatifId === alternatifId && p.kriteriaId === kriteriaId ? { ...p, nilai } : p))
      }
      return [...prev, { id: Date.now().toString(), alternatifId, kriteriaId, nilai }]
    })
    logActivity("activity.penilaian_updated")
  }

  const toggleMetode = (nama: "SAW" | "AHP" | "TOPSIS") => {
    setMetodeConfig((prev) => prev.map((m) => (m.nama === nama ? { ...m, aktif: !m.aktif } : m)))
  }

  const updateMetodeBobot = (nama: "SAW" | "AHP" | "TOPSIS", bobot: number) => {
    setMetodeConfig((prev) => prev.map((m) => (m.nama === nama ? { ...m, bobot } : m)))
  }

  const updatePairwiseComparison = (kriteria1Id: string, kriteria2Id: string, nilai: number) => {
    setPairwiseComparisons((prev) => {
      const existing = prev.find((p) => p.kriteria1Id === kriteria1Id && p.kriteria2Id === kriteria2Id)
      if (existing) {
        return prev.map((p) => (p.kriteria1Id === kriteria1Id && p.kriteria2Id === kriteria2Id ? { ...p, nilai } : p))
      }
      return [...prev, { kriteria1Id, kriteria2Id, nilai }]
    })
  }

  return (
    <SPKContext.Provider
      value={{
        alternatif,
        kriteria,
        subKriteria,
        penilaian,
        metodeConfig,
        pairwiseComparisons,
        setAlternatif,
        addAlternatif,
        updateAlternatif,
        deleteAlternatif,
        setKriteria,
        addKriteria,
        updateKriteria,
        deleteKriteria,
        setSubKriteria,
        addSubKriteria,
        updateSubKriteria,
        deleteSubKriteria,
        setPenilaian,
        updatePenilaian,
        setMetodeConfig,
        toggleMetode,
        updateMetodeBobot,
        setPairwiseComparisons,
        updatePairwiseComparison,
      }}
    >
      {children}
    </SPKContext.Provider>
  )
}

export function useSPK() {
  const context = useContext(SPKContext)
  if (!context) {
    throw new Error("useSPK must be used within SPKProvider")
  }
  return context
}
