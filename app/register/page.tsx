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
import { Eye, EyeOff, Loader2, Mail, Lock, User, ChevronRight, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { register } = useAuth()
  const { language } = useLanguage()
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (name.trim().length < 3) {
      setError(language === "id" ? "Nama minimal 3 karakter" : "Name must be at least 3 characters")
      return
    }

    if (password.length < 6) {
      setError(language === "id" ? "Password minimal 6 karakter" : "Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError(language === "id" ? "Password tidak cocok" : "Passwords do not match")
      return
    }

    setIsLoading(true)

    const success = await register(name, email, password)

    if (success) {
      showToast({
        title: language === "id" ? "Registrasi Berhasil" : "Registration Successful",
        message: language === "id" ? "Akun Anda telah dibuat!" : "Your account has been created!",
        type: "success",
      })
      router.push("/dashboard")
    } else {
      setError(language === "id" ? "Email sudah terdaftar" : "Email already registered")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-sm p-8">
        {/* Back to Login Link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "id" ? "Kembali ke Login" : "Back to Login"}
        </Link>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {language === "id" ? "Buat Akun Baru" : "Create New Account"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {language === "id" ? "Daftar untuk mengakses sistem" : "Sign up to access the system"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              {language === "id" ? "Nama Lengkap" : "Full Name"}
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder={language === "id" ? "Masukkan nama lengkap" : "Enter your full name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 pl-10 bg-slate-50 dark:bg-slate-900 border-border rounded-xl"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              {language === "id" ? "Email" : "Email"}
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
              {language === "id" ? "Password" : "Password"}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={language === "id" ? "Minimal 6 karakter" : "Minimum 6 characters"}
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

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              {language === "id" ? "Konfirmasi Password" : "Confirm Password"}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={language === "id" ? "Ulangi password" : "Re-enter password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 pl-10 pr-11 bg-slate-50 dark:bg-slate-900 border-border rounded-xl"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
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
                {language === "id" ? "Daftar" : "Register"}
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {language === "id" ? "Sudah punya akun?" : "Already have an account?"}{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              {language === "id" ? "Masuk di sini" : "Sign in here"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
