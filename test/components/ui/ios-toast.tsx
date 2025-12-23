"use client"

import type * as React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
  id: string
  title?: string
  message: string
  type: ToastType
}

interface ToastOptions {
  title?: string
  message: string
  type?: ToastType
}

interface ToastContextType {
  showToast: (options: ToastOptions | string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function useIOSToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useIOSToast must be used within a ToastProvider")
  }
  return context
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const styles = {
  success: "bg-emerald-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-amber-500",
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((options: ToastOptions | string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substr(2, 9)

    let toast: Toast
    if (typeof options === "string") {
      toast = { id, message: options, type }
    } else {
      toast = { id, title: options.title, message: options.message, type: options.type || "success" }
    }

    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container - iPhone style centered */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none px-4 w-full max-w-md">
        {toasts.map((toast, index) => {
          const Icon = icons[toast.type]
          return (
            <div
              key={toast.id}
              className={cn(
                "pointer-events-auto flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-2xl md:rounded-full shadow-2xl",
                "animate-in fade-in slide-in-from-top-4 duration-300",
                "backdrop-blur-xl bg-foreground/90 text-background",
                "w-full",
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className={cn("p-1 rounded-full flex-shrink-0", styles[toast.type])}>
                <Icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-center">
                {toast.title && <p className="text-xs md:text-sm font-semibold">{toast.title}</p>}
                <span
                  className={cn("text-xs md:text-sm block", toast.title ? "font-normal opacity-90" : "font-medium")}
                >
                  {toast.message}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
