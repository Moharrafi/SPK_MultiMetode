"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle, AlertCircle, X, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

const typeConfig = {
  info: {
    icon: Info,
    bg: "bg-slate-50 dark:bg-slate-900/50",
    iconBg: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-600 dark:text-slate-300",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
    iconBg: "bg-emerald-100 dark:bg-emerald-900",
    iconColor: "text-emerald-600 dark:text-emerald-300",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/50",
    iconBg: "bg-amber-100 dark:bg-amber-900",
    iconColor: "text-amber-600 dark:text-amber-300",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-red-50 dark:bg-red-950/50",
    iconBg: "bg-red-100 dark:bg-red-900",
    iconColor: "text-red-600 dark:text-red-300",
  },
}

export function NotificationPanel() {
  const {
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    clearAllNotifications,
  } = useAuth()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[380px] p-0 shadow-xl border-border">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">Notifikasi</h4>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-medium">
                {unreadCount} baru
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-950/50"
              onClick={markAllNotificationsRead}
            >
              <CheckCheck className="mr-1 h-3.5 w-3.5" />
              Tandai dibaca
            </Button>
          )}
        </div>

        {/* Notification List */}
        <ScrollArea className="h-[340px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="rounded-full bg-muted p-3 mb-3">
                <Bell className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-foreground">Tidak ada notifikasi</p>
              <p className="text-xs text-muted-foreground mt-0.5">Aktivitas sistem akan muncul di sini</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notif) => {
                const config = typeConfig[notif.type]
                const Icon = config.icon
                return (
                  <div
                    key={notif.id}
                    className={`
                      relative group px-4 py-3.5 transition-colors cursor-pointer
                      ${!notif.read ? config.bg : "hover:bg-muted/50"}
                    `}
                    onClick={() => markNotificationRead(notif.id)}
                  >
                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notif.id)
                      }}
                      className="absolute right-3 top-3 p-1.5 rounded-md opacity-0 group-hover:opacity-100 bg-muted hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                      title="Hapus"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>

                    <div className="flex gap-3 pr-6">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${config.iconBg}`}
                      >
                        <Icon className={`h-4 w-4 ${config.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium leading-tight text-foreground">{notif.title}</p>
                          {!notif.read && <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{notif.message}</p>
                        <p className="text-[11px] text-muted-foreground/70">
                          {formatDistanceToNow(new Date(notif.createdAt), {
                            addSuffix: true,
                            locale: id,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>

        {/* Footer - Red color for delete all button */}
        {notifications.length > 0 && (
          <div className="border-t px-4 py-3 flex items-center justify-between bg-muted/30">
            <p className="text-xs text-muted-foreground">{notifications.length} notifikasi</p>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={clearAllNotifications}
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Hapus semua
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
