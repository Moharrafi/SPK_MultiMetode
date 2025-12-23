"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react"

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  itemName?: string
  onConfirm: () => void
}

export function DeleteDialog({
  open,
  onOpenChange,
  title = "Hapus Data",
  description = "Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
  itemName,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-lg">{title}</AlertDialogTitle>
              <AlertDialogDescription className="mt-1">
                {itemName ? (
                  <>
                    Anda akan menghapus <span className="font-semibold text-foreground">"{itemName}"</span>.{" "}
                    {description}
                  </>
                ) : (
                  description
                )}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex gap-2 sm:gap-2">
          <AlertDialogCancel className="flex-1 sm:flex-none">Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white">
            Ya, Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
