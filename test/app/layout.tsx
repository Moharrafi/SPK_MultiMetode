import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ToastProvider } from "@/components/ui/ios-toast"
import { LanguageProvider } from "@/lib/language-context"
import { SettingsProvider } from "@/lib/settings-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SPK Multi-Metode | Sistem Pendukung Keputusan",
  description: "Sistem Pendukung Keputusan dengan metode SAW, AHP, dan TOPSIS",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <ToastProvider>
            <LanguageProvider>
              <SettingsProvider>{children}</SettingsProvider>
            </LanguageProvider>
          </ToastProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
