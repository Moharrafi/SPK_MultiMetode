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
import { Plus, Pencil, Trash2, ListChecks, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { DeleteDialog } from "@/components/ui/delete-dialog"
import { useToast } from "@/components/ui/ios-toast"

export default function KriteriaPage() {
  const { kriteria, addKriteria, updateKriteria, deleteKriteria } = useSPK()
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
    bobot: 0,
    jenis: "benefit" as "benefit" | "cost",
  })

  const totalBobot = kriteria.reduce((sum, k) => sum + k.bobot, 0)
  const isBobotValid = Math.abs(totalBobot - 1) < 0.01

  const handleSubmit = () => {
    if (editingId) {
      updateKriteria(editingId, formData)
      showToast("Kriteria berhasil diupdate", "success")
    } else {
      addKriteria(formData)
      showToast("Kriteria berhasil ditambahkan", "success")
    }
    setIsOpen(false)
    setEditingId(null)
    setFormData({ kode: "", nama: "", bobot: 0, jenis: "benefit" })
  }

  const handleEdit = (krit: (typeof kriteria)[0]) => {
    setFormData({
      kode: krit.kode,
      nama: krit.nama,
      bobot: krit.bobot,
      jenis: krit.jenis,
    })
    setEditingId(krit.id)
    setIsOpen(true)
  }

  const handleDeleteClick = (id: string, nama: string) => {
    setDeletingItem({ id, nama })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      deleteKriteria(deletingItem.id)
      showToast("Kriteria berhasil dihapus", "success")
      setDeleteDialogOpen(false)
      setDeletingItem(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Kriteria</h1>
          <p className="text-muted-foreground">Kelola kriteria penilaian dan bobot</p>
        </div>
        {canEdit && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingId(null)
                  setFormData({ kode: "", nama: "", bobot: 0, jenis: "benefit" })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Kriteria
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit" : "Tambah"} Kriteria</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="kode">Kode</Label>
                  <Input
                    id="kode"
                    placeholder="C1"
                    value={formData.kode}
                    onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Kriteria</Label>
                  <Input
                    id="nama"
                    placeholder="Nama kriteria"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bobot">Bobot (0-1)</Label>
                  <Input
                    id="bobot"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    placeholder="0.25"
                    value={formData.bobot}
                    onChange={(e) => setFormData({ ...formData, bobot: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jenis">Jenis</Label>
                  <Select
                    value={formData.jenis}
                    onValueChange={(value: "benefit" | "cost") => setFormData({ ...formData, jenis: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="benefit">Benefit (Semakin tinggi semakin baik)</SelectItem>
                      <SelectItem value="cost">Cost (Semakin rendah semakin baik)</SelectItem>
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

      {/* Bobot Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Total Bobot</span>
              <span className={isBobotValid ? "text-success" : "text-destructive"}>{totalBobot.toFixed(2)} / 1.00</span>
            </div>
            <Progress value={totalBobot * 100} className="h-2" />
            {!isBobotValid && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Total bobot harus sama dengan 1. Saat ini: {totalBobot.toFixed(2)}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-2 p-2">
              <ListChecks className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Daftar Kriteria</CardTitle>
              <CardDescription>Total {kriteria.length} kriteria</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">No</TableHead>
                <TableHead className="w-20">Kode</TableHead>
                <TableHead>Nama Kriteria</TableHead>
                <TableHead className="w-20 text-center">Bobot</TableHead>
                <TableHead className="w-28 text-center px-4">Jenis</TableHead>
                {(canEdit || canDelete) && <TableHead className="w-24 text-right">Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {kriteria.map((krit, idx) => (
                <TableRow key={krit.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{krit.kode}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{krit.nama}</TableCell>
                  <TableCell className="text-center">{krit.bobot.toFixed(2)}</TableCell>
                  <TableCell className="text-center px-4">
                    <Badge
                      className={
                        krit.jenis === "benefit"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                      }
                    >
                      {krit.jenis === "benefit" ? "Benefit" : "Cost"}
                    </Badge>
                  </TableCell>
                  {(canEdit || canDelete) && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {canEdit && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(krit)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDeleteClick(krit.id, krit.nama)}
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
        title="Hapus Kriteria"
        itemName={deletingItem?.nama}
        description="Tindakan ini tidak dapat dibatalkan dan akan menghapus semua sub-kriteria dan penilaian terkait."
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
