"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { SPKProvider } from "@/lib/spk-context"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, sidebarCollapsed } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <SPKProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className={cn("transition-all duration-300", sidebarCollapsed ? "lg:pl-16" : "lg:pl-64")}>
          <Header />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </SPKProvider>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardContent>{children}</DashboardContent>
}
