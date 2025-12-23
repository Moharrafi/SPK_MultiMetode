"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSPK } from "@/lib/spk-context"
import { Search, X, Users, ListChecks, Calculator, FileText, Settings, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface SearchResult {
  id: string
  title: string
  subtitle: string
  type: "alternatif" | "kriteria" | "metode" | "halaman"
  url: string
  icon: typeof Users
}

const staticPages: SearchResult[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    subtitle: "Halaman utama sistem",
    type: "halaman",
    url: "/dashboard",
    icon: FileText,
  },
  {
    id: "alternatif",
    title: "Data Alternatif",
    subtitle: "Kelola data alternatif",
    type: "halaman",
    url: "/data-master/alternatif",
    icon: Users,
  },
  {
    id: "kriteria",
    title: "Data Kriteria",
    subtitle: "Kelola data kriteria",
    type: "halaman",
    url: "/data-master/kriteria",
    icon: ListChecks,
  },
  {
    id: "sub-kriteria",
    title: "Sub Kriteria",
    subtitle: "Kelola sub kriteria",
    type: "halaman",
    url: "/data-master/sub-kriteria",
    icon: ListChecks,
  },
  {
    id: "penilaian",
    title: "Penilaian",
    subtitle: "Input matriks penilaian",
    type: "halaman",
    url: "/penilaian",
    icon: Calculator,
  },
  {
    id: "metode",
    title: "Pengaturan Metode",
    subtitle: "Konfigurasi metode SPK",
    type: "halaman",
    url: "/metode",
    icon: Settings,
  },
  {
    id: "saw",
    title: "Perhitungan SAW",
    subtitle: "Simple Additive Weighting",
    type: "metode",
    url: "/perhitungan/saw",
    icon: Calculator,
  },
  {
    id: "ahp",
    title: "Perhitungan AHP",
    subtitle: "Analytic Hierarchy Process",
    type: "metode",
    url: "/perhitungan/ahp",
    icon: Calculator,
  },
  {
    id: "topsis",
    title: "Perhitungan TOPSIS",
    subtitle: "Technique for Order Preference",
    type: "metode",
    url: "/perhitungan/topsis",
    icon: Calculator,
  },
  {
    id: "per-metode",
    title: "Hasil Per Metode",
    subtitle: "Hasil perhitungan per metode",
    type: "halaman",
    url: "/hasil/per-metode",
    icon: FileText,
  },
  {
    id: "perbandingan",
    title: "Perbandingan Metode",
    subtitle: "Bandingkan hasil antar metode",
    type: "halaman",
    url: "/hasil/perbandingan",
    icon: FileText,
  },
  {
    id: "gabungan",
    title: "Ranking Gabungan",
    subtitle: "Hasil agregasi multi-metode",
    type: "halaman",
    url: "/hasil/gabungan",
    icon: FileText,
  },
  {
    id: "laporan",
    title: "Laporan",
    subtitle: "Export laporan Excel/PDF",
    type: "halaman",
    url: "/laporan",
    icon: FileText,
  },
  {
    id: "pengguna",
    title: "Manajemen Pengguna",
    subtitle: "Kelola akun pengguna",
    type: "halaman",
    url: "/pengguna",
    icon: Users,
  },
  {
    id: "profil",
    title: "Profil Saya",
    subtitle: "Edit profil pengguna",
    type: "halaman",
    url: "/profil",
    icon: Users,
  },
  {
    id: "pengaturan",
    title: "Pengaturan",
    subtitle: "Pengaturan sistem",
    type: "halaman",
    url: "/pengaturan",
    icon: Settings,
  },
]

const typeColors = {
  alternatif: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  kriteria: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  metode: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  halaman: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { alternatif, kriteria } = useSPK()

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
    } else {
      setQuery("")
      setResults([])
      setSelectedIndex(0)
    }
  }, [open])

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults(staticPages.slice(0, 6))
      return
    }

    const q = query.toLowerCase()
    const searchResults: SearchResult[] = []

    // Search alternatif
    alternatif
      .filter((a) => a.nama.toLowerCase().includes(q) || a.kode.toLowerCase().includes(q))
      .slice(0, 3)
      .forEach((a) => {
        searchResults.push({
          id: `alt-${a.id}`,
          title: a.nama,
          subtitle: `Kode: ${a.kode}`,
          type: "alternatif",
          url: "/data-master/alternatif",
          icon: Users,
        })
      })

    // Search kriteria
    kriteria
      .filter((k) => k.nama.toLowerCase().includes(q) || k.kode.toLowerCase().includes(q))
      .slice(0, 3)
      .forEach((k) => {
        searchResults.push({
          id: `krit-${k.id}`,
          title: k.nama,
          subtitle: `Kode: ${k.kode} | ${k.jenis}`,
          type: "kriteria",
          url: "/data-master/kriteria",
          icon: ListChecks,
        })
      })

    // Search static pages
    staticPages
      .filter((p) => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q))
      .slice(0, 5)
      .forEach((p) => searchResults.push(p))

    setResults(searchResults.slice(0, 10))
    setSelectedIndex(0)
  }, [query, alternatif, kriteria])

  const handleSelect = (result: SearchResult) => {
    router.push(result.url)
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex])
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <>
      {/* Search Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex w-full max-w-md items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:border-border/80"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Cari alternatif, kriteria, atau metode...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
          {/* Search Input */}
          <div className="flex items-center border-b px-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Cari alternatif, kriteria, halaman..."
              className="flex-1 border-0 bg-transparent px-3 py-4 text-base focus-visible:ring-0"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Search className="mx-auto mb-2 h-8 w-8 opacity-50" />
                <p>Tidak ada hasil untuk "{query}"</p>
              </div>
            ) : (
              <div className="space-y-1">
                {results.map((result, index) => {
                  const Icon = result.icon
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        index === selectedIndex ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <div
                        className={`rounded-md p-1.5 ${index === selectedIndex ? "bg-primary-foreground/20" : "bg-muted"}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{result.title}</p>
                        <p
                          className={`text-xs truncate ${index === selectedIndex ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                        >
                          {result.subtitle}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${index === selectedIndex ? "border-primary-foreground/30 text-primary-foreground/80" : typeColors[result.type]}`}
                      >
                        {result.type}
                      </Badge>
                      <ArrowRight
                        className={`h-4 w-4 ${index === selectedIndex ? "text-primary-foreground/70" : "text-muted-foreground/50"}`}
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-background px-1.5 py-0.5">↑↓</kbd> navigasi
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-background px-1.5 py-0.5">↵</kbd> pilih
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-background px-1.5 py-0.5">esc</kbd> tutup
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
