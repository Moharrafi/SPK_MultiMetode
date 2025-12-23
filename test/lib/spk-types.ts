// Types for SPK System

export interface Alternatif {
  id: string
  kode: string
  nama: string
  nomorHp?: string
  alamat?: string
  kategori?: string
  createdAt: Date
}

export interface Kriteria {
  id: string
  kode: string
  nama: string
  bobot: number
  jenis: "benefit" | "cost"
  createdAt: Date
}

export interface SubKriteria {
  id: string
  kriteriaId: string
  nama: string
  nilai: number
}

export interface Penilaian {
  id: string
  alternatifId: string
  kriteriaId: string
  nilai: number
}

export interface MetodeConfig {
  id: string
  nama: "SAW" | "AHP" | "TOPSIS"
  aktif: boolean
  bobot: number
}

export interface HasilPerhitungan {
  alternatifId: string
  alternatifNama: string
  nilai: number
  ranking: number
}

export interface HasilGabungan {
  alternatifId: string
  alternatifNama: string
  nilaiSAW?: number
  nilaiAHP?: number
  nilaiTOPSIS?: number
  nilaiGabungan: number
  ranking: number
}

// AHP specific types
export interface PairwiseComparison {
  kriteria1Id: string
  kriteria2Id: string
  nilai: number
}

export interface AHPResult {
  bobotKriteria: { kriteriaId: string; bobot: number }[]
  consistencyRatio: number
  isConsistent: boolean
}

// User and Notification types
export interface User {
  id: string
  nama: string
  email: string
  password: string
  role: "admin" | "analis" | "viewer"
  avatar?: string
  createdAt: Date
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
}
