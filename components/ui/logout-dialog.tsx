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
import { LogOut } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface LogoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function LogoutDialog({ open, onOpenChange, onConfirm }: LogoutDialogProps) {
  const { t } = useLanguage()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
            <LogOut className="h-7 w-7 text-red-600 dark:text-red-400" />
          </div>
          <AlertDialogTitle className="text-xl">{t("auth.logout_title")}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">{t("auth.logout_confirm")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-3 mt-2">
          <AlertDialogCancel className="mt-0">{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">
            {t("auth.yes_logout")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
