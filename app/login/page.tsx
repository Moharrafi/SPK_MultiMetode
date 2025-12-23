"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/components/ui/ios-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, Mail, Lock, Shield, Users, BarChart3, ChevronRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()
  const { t, language } = useLanguage()
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(email, password)

    if (success) {
      showToast({
        title: language === "id" ? "Login Berhasil" : "Login Successful",
        message: language === "id" ? "Selamat datang kembali!" : "Welcome back!",
        type: "success",
      })
      router.push("/dashboard")
    } else {
      setError(language === "id" ? "Email atau password salah" : "Invalid email or password")
    }
    setIsLoading(false)
  }

  const demoAccounts = [
    { label: "Admin", email: "admin@spk.com", password: "admin123", icon: Shield },
    {
      label: language === "id" ? "Analis" : "Analyst",
      email: "analis@spk.com",
      password: "analis123",
      icon: BarChart3,
    },
    { label: "Viewer", email: "viewer@spk.com", password: "viewer123", icon: Users },
  ]

  const fillDemoAccount = (email: string, pass: string) => {
    setEmail(email)
    setPassword(pass)
    setError("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-sm p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">{t("auth.welcome")}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t("auth.login_subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              {t("auth.email")}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder={language === "id" ? "nama@email.com" : "name@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 pl-10 bg-slate-50 dark:bg-slate-900 border-border rounded-xl"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              {t("auth.password")}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={language === "id" ? "Masukkan password" : "Enter password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 pl-10 pr-11 bg-slate-50 dark:bg-slate-900 border-border rounded-xl"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 rounded-xl gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {language === "id" ? "Memproses..." : "Processing..."}
              </>
            ) : (
              <>
                {t("auth.login")}
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-8">
          <p className="text-xs text-muted-foreground mb-3 text-center">{t("auth.demo_accounts")}</p>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemoAccount(account.email, account.password)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all text-left"
              >
                <account.icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <span className="text-sm font-medium block">{account.label}</span>
                  <span className="text-xs text-muted-foreground">{account.email}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {language === "id" ? "Belum punya akun?" : "Don't have an account?"}{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              {language === "id" ? "Daftar di sini" : "Register here"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
