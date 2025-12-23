// Sample data and state management for SPK System
import type { Alternatif, Kriteria, SubKriteria, Penilaian, MetodeConfig } from "./spk-types"

// Sample Alternatif Data
export const sampleAlternatif: Alternatif[] = [
  {
    id: "1",
    kode: "A1",
    nama: "Kandidat Ahmad Ridwan",
    nomorHp: "081234567890",
    alamat: "Jakarta",
    kategori: "Internal",
    createdAt: new Date(),
  },
  {
    id: "2",
    kode: "A2",
    nama: "Kandidat Budi Santoso",
    nomorHp: "082345678901",
    alamat: "Bandung",
    kategori: "Eksternal",
    createdAt: new Date(),
  },
  {
    id: "3",
    kode: "A3",
    nama: "Kandidat Citra Dewi",
    nomorHp: "083456789012",
    alamat: "Surabaya",
    kategori: "Internal",
    createdAt: new Date(),
  },
  {
    id: "4",
    kode: "A4",
    nama: "Kandidat Dimas Prasetyo",
    nomorHp: "084567890123",
    alamat: "Yogyakarta",
    kategori: "Eksternal",
    createdAt: new Date(),
  },
  {
    id: "5",
    kode: "A5",
    nama: "Kandidat Eka Putri",
    nomorHp: "085678901234",
    alamat: "Semarang",
    kategori: "Internal",
    createdAt: new Date(),
  },
]

// Sample Kriteria Data
export const sampleKriteria: Kriteria[] = [
  { id: "1", kode: "C1", nama: "Pendidikan", bobot: 0.25, jenis: "benefit", createdAt: new Date() },
  { id: "2", kode: "C2", nama: "Pengalaman Kerja", bobot: 0.3, jenis: "benefit", createdAt: new Date() },
  { id: "3", kode: "C3", nama: "Usia", bobot: 0.15, jenis: "cost", createdAt: new Date() },
  { id: "4", kode: "C4", nama: "Kemampuan Komunikasi", bobot: 0.2, jenis: "benefit", createdAt: new Date() },
  { id: "5", kode: "C5", nama: "Gaji yang Diharapkan", bobot: 0.1, jenis: "cost", createdAt: new Date() },
]

// Sample Sub-Kriteria Data
export const sampleSubKriteria: SubKriteria[] = [
  // Pendidikan
  { id: "1", kriteriaId: "1", nama: "S3", nilai: 5 },
  { id: "2", kriteriaId: "1", nama: "S2", nilai: 4 },
  { id: "3", kriteriaId: "1", nama: "S1", nilai: 3 },
  { id: "4", kriteriaId: "1", nama: "D3", nilai: 2 },
  { id: "5", kriteriaId: "1", nama: "SMA", nilai: 1 },
  // Pengalaman Kerja
  { id: "6", kriteriaId: "2", nama: "> 10 Tahun", nilai: 5 },
  { id: "7", kriteriaId: "2", nama: "5-10 Tahun", nilai: 4 },
  { id: "8", kriteriaId: "2", nama: "3-5 Tahun", nilai: 3 },
  { id: "9", kriteriaId: "2", nama: "1-3 Tahun", nilai: 2 },
  { id: "10", kriteriaId: "2", nama: "< 1 Tahun", nilai: 1 },
  // Kemampuan Komunikasi
  { id: "11", kriteriaId: "4", nama: "Sangat Baik", nilai: 5 },
  { id: "12", kriteriaId: "4", nama: "Baik", nilai: 4 },
  { id: "13", kriteriaId: "4", nama: "Cukup", nilai: 3 },
  { id: "14", kriteriaId: "4", nama: "Kurang", nilai: 2 },
  { id: "15", kriteriaId: "4", nama: "Sangat Kurang", nilai: 1 },
]

// Sample Penilaian Data
export const samplePenilaian: Penilaian[] = [
  // A1
  { id: "1", alternatifId: "1", kriteriaId: "1", nilai: 4 },
  { id: "2", alternatifId: "1", kriteriaId: "2", nilai: 5 },
  { id: "3", alternatifId: "1", kriteriaId: "3", nilai: 35 },
  { id: "4", alternatifId: "1", kriteriaId: "4", nilai: 4 },
  { id: "5", alternatifId: "1", kriteriaId: "5", nilai: 15 },
  // A2
  { id: "6", alternatifId: "2", kriteriaId: "1", nilai: 3 },
  { id: "7", alternatifId: "2", kriteriaId: "2", nilai: 4 },
  { id: "8", alternatifId: "2", kriteriaId: "3", nilai: 28 },
  { id: "9", alternatifId: "2", kriteriaId: "4", nilai: 5 },
  { id: "10", alternatifId: "2", kriteriaId: "5", nilai: 12 },
  // A3
  { id: "11", alternatifId: "3", kriteriaId: "1", nilai: 5 },
  { id: "12", alternatifId: "3", kriteriaId: "2", nilai: 3 },
  { id: "13", alternatifId: "3", kriteriaId: "3", nilai: 30 },
  { id: "14", alternatifId: "3", kriteriaId: "4", nilai: 4 },
  { id: "15", alternatifId: "3", kriteriaId: "5", nilai: 18 },
  // A4
  { id: "16", alternatifId: "4", kriteriaId: "1", nilai: 3 },
  { id: "17", alternatifId: "4", kriteriaId: "2", nilai: 5 },
  { id: "18", alternatifId: "4", kriteriaId: "3", nilai: 40 },
  { id: "19", alternatifId: "4", kriteriaId: "4", nilai: 3 },
  { id: "20", alternatifId: "4", kriteriaId: "5", nilai: 10 },
  // A5
  { id: "21", alternatifId: "5", kriteriaId: "1", nilai: 4 },
  { id: "22", alternatifId: "5", kriteriaId: "2", nilai: 4 },
  { id: "23", alternatifId: "5", kriteriaId: "3", nilai: 32 },
  { id: "24", alternatifId: "5", kriteriaId: "4", nilai: 5 },
  { id: "25", alternatifId: "5", kriteriaId: "5", nilai: 14 },
]

// Sample Metode Config
export const sampleMetodeConfig: MetodeConfig[] = [
  { id: "1", nama: "SAW", aktif: true, bobot: 0.4 },
  { id: "2", nama: "AHP", aktif: true, bobot: 0.3 },
  { id: "3", nama: "TOPSIS", aktif: true, bobot: 0.3 },
]

// AHP Saaty Scale
export const skalaAHP = [
  { nilai: 1, keterangan: "Sama Penting" },
  { nilai: 2, keterangan: "Mendekati Sedikit Lebih Penting" },
  { nilai: 3, keterangan: "Sedikit Lebih Penting" },
  { nilai: 4, keterangan: "Mendekati Lebih Penting" },
  { nilai: 5, keterangan: "Lebih Penting" },
  { nilai: 6, keterangan: "Mendekati Sangat Penting" },
  { nilai: 7, keterangan: "Sangat Penting" },
  { nilai: 8, keterangan: "Mendekati Mutlak Lebih Penting" },
  { nilai: 9, keterangan: "Mutlak Lebih Penting" },
]
