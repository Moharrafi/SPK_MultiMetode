"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Users, Shield, UserCheck, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DeleteDialog } from "@/components/ui/delete-dialog"
import { useToast } from "@/components/ui/ios-toast"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface User {
  id: string
  nama: string
  email: string
  role: "Admin" | "Analis" | "Viewer"
  status: "Aktif" | "Nonaktif"
  lastLogin: Date
}

const sampleUsers: User[] = [
  {
    id: "1",
    nama: "Admin Utama",
    email: "admin@spk.com",
    role: "Admin",
    status: "Aktif",
    lastLogin: new Date(),
  },
  {
    id: "2",
    nama: "Analis Data",
    email: "analis@spk.com",
    role: "Analis",
    status: "Aktif",
    lastLogin: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    nama: "Viewer",
    email: "viewer@spk.com",
    role: "Viewer",
    status: "Aktif",
    lastLogin: new Date(Date.now() - 172800000),
  },
]

export default function PenggunaPage() {
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const { showToast } = useToast()
  const { hasPermission, user: currentUser } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingItem, setDeletingItem] = useState<{ id: string; nama: string } | null>(null)
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    role: "Viewer" as User["role"],
    status: "Aktif" as User["status"],
  })

  useEffect(() => {
    if (!hasPermission("manage_users")) {
      router.push("/dashboard")
    }
  }, [hasPermission, router])

  const canEdit = hasPermission("manage_users")
  const canDelete = hasPermission("manage_users")

  const handleSubmit = () => {
    if (!canEdit) {
      showToast("Anda tidak memiliki izin untuk mengedit pengguna", "error")
      return
    }

    if (editingId) {
      setUsers((prev) => prev.map((u) => (u.id === editingId ? { ...u, ...formData } : u)))
      showToast("Pengguna berhasil diupdate", "success")
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...formData,
          lastLogin: new Date(),
        },
      ])
      showToast("Pengguna berhasil ditambahkan", "success")
    }
    setIsOpen(false)
    setEditingId(null)
    setFormData({ nama: "", email: "", role: "Viewer", status: "Aktif" })
  }

  const handleEdit = (user: User) => {
    if (!canEdit) {
      showToast("Anda tidak memiliki izin untuk mengedit pengguna", "error")
      return
    }
    setFormData({
      nama: user.nama,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setEditingId(user.id)
    setIsOpen(true)
  }

  const handleDeleteClick = (id: string, nama: string) => {
    if (!canDelete) {
      showToast("Anda tidak memiliki izin untuk menghapus pengguna", "error")
      return
    }
    setDeletingItem({ id, nama })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      setUsers((prev) => prev.filter((u) => u.id !== deletingItem.id))
      showToast("Pengguna berhasil dihapus", "success")
      setDeleteDialogOpen(false)
      setDeletingItem(null)
    }
  }

  const getRoleIcon = (role: User["role"]) => {
    switch (role) {
      case "Admin":
        return <Shield className="h-4 w-4" />
      case "Analis":
        return <UserCheck className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getRoleBadgeVariant = (role: User["role"]) => {
    switch (role) {
      case "Admin":
        return "default"
      case "Analis":
        return "secondary"
      default:
        return "outline"
    }
  }

  if (!hasPermission("manage_users")) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Akses Ditolak</AlertTitle>
          <AlertDescription>
            Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini hanya dapat diakses oleh Administrator.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
          <p className="text-muted-foreground">Kelola akses pengguna sistem SPK</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null)
                setFormData({ nama: "", email: "", role: "Viewer", status: "Aktif" })
              }}
              disabled={!canEdit}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Tambah"} Pengguna</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  placeholder="Nama lengkap"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: User["role"]) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Analis">Analis</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: User["status"]) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Nonaktif">Nonaktif</SelectItem>
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
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-500 p-2">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pengguna</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-purple-500 p-2">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admin</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.role === "Admin").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-500 p-2">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aktif</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "Aktif").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
          <CardDescription>Semua pengguna yang terdaftar di sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Login Terakhir</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user.nama
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.nama}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)} className="gap-1">
                      {getRoleIcon(user.role)}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === "Aktif"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-gray-400 hover:bg-gray-500 text-white"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{user.lastLogin.toLocaleDateString("id-ID")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(user)} disabled={!canEdit}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(user.id, user.nama)}
                        disabled={!canDelete}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hak Akses Role</CardTitle>
          <CardDescription>Deskripsi hak akses untuk setiap role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Admin</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- Akses penuh ke semua fitur</li>
                <li>- Kelola pengguna</li>
                <li>- Kelola data master</li>
                <li>- Lihat & export laporan</li>
              </ul>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="h-4 w-4" />
                <span className="font-medium">Analis</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- Input penilaian</li>
                <li>- Lihat perhitungan</li>
                <li>- Lihat & export laporan</li>
                <li>- Tidak bisa kelola pengguna</li>
              </ul>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">Viewer</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- Lihat dashboard</li>
                <li>- Lihat hasil perhitungan</li>
                <li>- Lihat laporan</li>
                <li>- Tidak bisa edit data</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Hapus Pengguna"
        itemName={deletingItem?.nama}
        description="Tindakan ini tidak dapat dibatalkan. Pengguna tidak akan bisa mengakses sistem lagi."
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
