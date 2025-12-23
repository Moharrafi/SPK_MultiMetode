# Sistem Pendukung Keputusan (SPK Multi-Metode)

Aplikasi sistem pendukung keputusan berbasis web yang mengimplementasikan SAW, AHP, dan TOPSIS dengan dashboard, data master, penilaian, modul perhitungan, pelaporan, dan manajemen pengaturan.

## Tech Stack
- Bahasa: TypeScript
- Framework: Next.js 16 (App Router), React 19
- UI: Tailwind CSS v4, Radix UI, Lucide Icons
- Form/Validasi: React Hook Form, Zod
- Grafik: Recharts
- Tanggal/Waktu: date-fns
- ORM/DB: Prisma + MySQL

## Fitur Utama
- Autentikasi, manajemen profil, dan peran pengguna (admin/analis/viewer)
- Widget dashboard: statistik, aksi cepat, peringkat teratas, aktivitas terbaru, status sistem
- Manajemen data master: Alternatif, Kriteria, Sub-Kriteria
- Penilaian (assessment) matriks alternatif vs kriteria
- Modul perhitungan: SAW, AHP, TOPSIS
- Hasil & ranking: per metode dan ranking gabungan
- Laporan/ekspor: PDF & Excel (per laporan dan ekspor semua)
- Pengaturan: branding aplikasi, header/footer laporan PDF, bahasa, tema, backup
- Pencatatan aktivitas berdasarkan aksi pengguna
- Persistensi lokal untuk pengaturan dan log aktivitas; cache pengaturan di server

## Struktur Proyek (ringkas)
- `app/`: halaman App Router Next.js dan API routes
- `components/`: komponen UI dan fitur
- `lib/`: logika bersama (contexts, kalkulasi, report generator, utilities)
- `prisma/`: skema Prisma dan seed
- `public/`: aset statis dan gambar upload


## Catatan
- Pengaturan dicache di `settings-cache.json` dan dapat diperbarui via `/api/settings`.
- Gambar upload disimpan di `public/uploads` via `/api/upload`.
- Log aktivitas dipersist di localStorage untuk browser saat ini.

## Lisensi
Proyek privat.
