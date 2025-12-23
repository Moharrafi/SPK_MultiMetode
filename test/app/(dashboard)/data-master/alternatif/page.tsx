"use client"

import { useState } from "react"
import { useSPK } from "@/lib/spk-context"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Upload, Download, Users, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DeleteDialog } from "@/components/ui/delete-dialog"
import { useToast } from "@/components/ui/ios-toast"

export default function AlternatifPage() {
  const { alternatif, addAlternatif, updateAlternatif, deleteAlternatif } = useSPK()
  const { hasPermission } = useAuth()
  const canEdit = hasPermission("edit")
  const canDelete = hasPermission("delete")
  const { showToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingItem, setDeletingItem] = useState<{ id: string; nama: string } | null>(null)
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    nomorHp: "",
    alamat: "",
    kategori: "",
  })

  const handleSubmit = () => {
    if (editingId) {
      updateAlternatif(editingId, formData)
      showToast("Alternatif berhasil diupdate", "success")
    } else {
      addAlternatif(formData)
      showToast("Alternatif berhasil ditambahkan", "success")
    }
    setIsOpen(false)
    setEditingId(null)
    setFormData({ kode: "", nama: "", nomorHp: "", alamat: "", kategori: "" })
  }

  const handleEdit = (alt: (typeof alternatif)[0]) => {
    setFormData({
      kode: alt.kode,
      nama: alt.nama,
      nomorHp: alt.nomorHp || "",
      alamat: alt.alamat || "",
      kategori: alt.kategori || "",
    })
    setEditingId(alt.id)
    setIsOpen(true)
  }

  const handleDeleteClick = (id: string, nama: string) => {
    setDeletingItem({ id, nama })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      deleteAlternatif(deletingItem.id)
      showToast("Alternatif berhasil dihapus", "success")
      setDeleteDialogOpen(false)
      setDeletingItem(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Alternatif</h1>
          <p className="text-muted-foreground">Kelola data alternatif/peserta yang akan dinilai</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import Excel
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {canEdit && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ kode: "", nama: "", nomorHp: "", alamat: "", kategori: "" })
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Alternatif
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingId ? "Edit" : "Tambah"} Alternatif</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="kode">Kode</Label>
                    <Input
                      id="kode"
                      placeholder="A1"
                      value={formData.kode}
                      onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama</Label>
                    <Input
                      id="nama"
                      placeholder="Nama alternatif"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nomorHp">Nomor HP</Label>
                    <Input
                      id="nomorHp"
                      placeholder="08xxxxxxxxxx"
                      value={formData.nomorHp}
                      onChange={(e) => setFormData({ ...formData, nomorHp: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alamat">Alamat</Label>
                    <Input
                      id="alamat"
                      placeholder="Alamat (opsional)"
                      value={formData.alamat}
                      onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kategori">Kategori</Label>
                    <Select
                      value={formData.kategori}
                      onValueChange={(value) => setFormData({ ...formData, kategori: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Internal">Internal</SelectItem>
                        <SelectItem value="Eksternal">Eksternal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleSubmit}>{editingId ? "Update" : "Simpan"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-1 p-2">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Daftar Alternatif</CardTitle>
              <CardDescription>Total {alternatif.length} alternatif terdaftar</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">No</TableHead>
                <TableHead className="w-20">Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead className="w-36">Nomor HP</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead className="w-28 text-center">Kategori</TableHead>
                {(canEdit || canDelete) && <TableHead className="w-24 text-right">Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {alternatif.map((alt, idx) => (
                <TableRow key={alt.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{alt.kode}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{alt.nama}</TableCell>
                  <TableCell>
                    {alt.nomorHp ? (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{alt.nomorHp}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{alt.alamat || "-"}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        alt.kategori === "Internal"
                          ? "bg-sky-100 text-sky-700 hover:bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400"
                          : "bg-violet-100 text-violet-700 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-400"
                      }
                    >
                      {alt.kategori || "-"}
                    </Badge>
                  </TableCell>
                  {(canEdit || canDelete) && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {canEdit && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(alt)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDeleteClick(alt.id, alt.nama)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Hapus Alternatif"
        itemName={deletingItem?.nama}
        description="Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data penilaian terkait."
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
