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
import { Plus, Pencil, Trash2, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DeleteDialog } from "@/components/ui/delete-dialog"
import { useToast } from "@/components/ui/ios-toast"

export default function SubKriteriaPage() {
  const { kriteria, subKriteria, addSubKriteria, updateSubKriteria, deleteSubKriteria } = useSPK()
  const { hasPermission } = useAuth()
  const canEdit = hasPermission("edit")
  const canDelete = hasPermission("delete")
  const { showToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingItem, setDeletingItem] = useState<{ id: string; nama: string } | null>(null)
  const [formData, setFormData] = useState({
    kriteriaId: "",
    nama: "",
    nilai: 0,
  })

  const handleSubmit = () => {
    if (editingId) {
      updateSubKriteria(editingId, formData)
      showToast("Sub-kriteria berhasil diupdate", "success")
    } else {
      addSubKriteria(formData)
      showToast("Sub-kriteria berhasil ditambahkan", "success")
    }
    setIsOpen(false)
    setEditingId(null)
    setFormData({ kriteriaId: "", nama: "", nilai: 0 })
  }

  const handleEdit = (sub: (typeof subKriteria)[0]) => {
    setFormData({
      kriteriaId: sub.kriteriaId,
      nama: sub.nama,
      nilai: sub.nilai,
    })
    setEditingId(sub.id)
    setIsOpen(true)
  }

  const handleDeleteClick = (id: string, nama: string) => {
    setDeletingItem({ id, nama })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      deleteSubKriteria(deletingItem.id)
      showToast("Sub-kriteria berhasil dihapus", "success")
      setDeleteDialogOpen(false)
      setDeletingItem(null)
    }
  }

  // Group sub-kriteria by kriteria
  const groupedSubKriteria = kriteria.map((krit) => ({
    kriteria: krit,
    subKriteria: subKriteria.filter((s) => s.kriteriaId === krit.id),
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sub-Kriteria</h1>
          <p className="text-muted-foreground">Konversi nilai kualitatif ke numerik</p>
        </div>
        {canEdit && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingId(null)
                  setFormData({ kriteriaId: "", nama: "", nilai: 0 })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Sub-Kriteria
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit" : "Tambah"} Sub-Kriteria</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="kriteria">Kriteria</Label>
                  <Select
                    value={formData.kriteriaId}
                    onValueChange={(value) => setFormData({ ...formData, kriteriaId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kriteria" />
                    </SelectTrigger>
                    <SelectContent>
                      {kriteria.map((k) => (
                        <SelectItem key={k.id} value={k.id}>
                          {k.kode} - {k.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Sub-Kriteria</Label>
                  <Input
                    id="nama"
                    placeholder="Contoh: Sangat Baik"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nilai">Nilai</Label>
                  <Input
                    id="nilai"
                    type="number"
                    placeholder="5"
                    value={formData.nilai}
                    onChange={(e) => setFormData({ ...formData, nilai: Number.parseInt(e.target.value) || 0 })}
                  />
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

      {groupedSubKriteria.map((group) => (
        <Card key={group.kriteria.id}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-chart-3 p-2">
                <Layers className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">
                  {group.kriteria.kode} - {group.kriteria.nama}
                </CardTitle>
                <CardDescription>{group.subKriteria.length} sub-kriteria</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {group.subKriteria.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead className="w-24 text-center">Nilai</TableHead>
                    {(canEdit || canDelete) && <TableHead className="w-24 text-right">Aksi</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.subKriteria
                    .sort((a, b) => b.nilai - a.nilai)
                    .map((sub, idx) => (
                      <TableRow key={sub.id}>
                        <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                        <TableCell className="font-medium">{sub.nama}</TableCell>
                        <TableCell className="text-center">
                          <Badge>{sub.nilai}</Badge>
                        </TableCell>
                        {(canEdit || canDelete) && (
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              {canEdit && (
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(sub)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              )}
                              {canDelete && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleDeleteClick(sub.id, sub.nama)}
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
            ) : (
              <p className="text-center text-sm text-muted-foreground py-4">
                Belum ada sub-kriteria untuk kriteria ini
              </p>
            )}
          </CardContent>
        </Card>
      ))}

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Hapus Sub-Kriteria"
        itemName={deletingItem?.nama}
        description="Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
