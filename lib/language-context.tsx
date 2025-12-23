"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "id" | "en"

interface Translations {
  [key: string]: {
    id: string
    en: string
  }
}

const translations: Translations = {
  // Navigation
  "nav.dashboard": { id: "Dashboard", en: "Dashboard" },
  "nav.data_master": { id: "Data Master", en: "Master Data" },
  "nav.alternatif": { id: "Data Alternatif", en: "Alternatives" },
  "nav.kriteria": { id: "Data Kriteria", en: "Criteria" },
  "nav.sub_kriteria": { id: "Sub-Kriteria", en: "Sub-Criteria" },
  "nav.skala": { id: "Skala Penilaian", en: "Rating Scale" },
  "nav.metode": { id: "Manajemen Metode", en: "Method Management" },
  "nav.penilaian": { id: "Penilaian", en: "Assessment" },
  "nav.perhitungan": { id: "Perhitungan", en: "Calculation" },
  "nav.modul_saw": { id: "Modul SAW", en: "SAW Module" },
  "nav.modul_ahp": { id: "Modul AHP", en: "AHP Module" },
  "nav.modul_topsis": { id: "Modul TOPSIS", en: "TOPSIS Module" },
  "nav.hasil": { id: "Hasil & Ranking", en: "Results & Ranking" },
  "nav.hasil_per_metode": { id: "Hasil per Metode", en: "Results by Method" },
  "nav.perbandingan": { id: "Perbandingan Metode", en: "Method Comparison" },
  "nav.ranking_gabungan": { id: "Ranking Gabungan", en: "Combined Ranking" },
  "nav.laporan": { id: "Laporan", en: "Reports" },
  "nav.pengguna": { id: "Manajemen Pengguna", en: "User Management" },
  "nav.profil": { id: "Profil Saya", en: "My Profile" },
  "nav.pengaturan": { id: "Pengaturan", en: "Settings" },

  // Dashboard
  "dashboard.title": { id: "Dashboard", en: "Dashboard" },
  "dashboard.welcome": {
    id: "Selamat datang di Sistem Pendukung Keputusan Multi-Metode",
    en: "Welcome to Multi-Method Decision Support System",
  },
  "dashboard.total_alternatif": { id: "Total Alternatif", en: "Total Alternatives" },
  "dashboard.total_kriteria": { id: "Total Kriteria", en: "Total Criteria" },
  "dashboard.metode_aktif": { id: "Metode Aktif", en: "Active Methods" },
  "dashboard.total_metode": { id: "Total Metode", en: "Total Methods" },
  "dashboard.quick_actions": { id: "Aksi Cepat", en: "Quick Actions" },
  "dashboard.top_ranking": { id: "Peringkat Teratas", en: "Top Ranking" },
  "dashboard.top_ranking_per_metode": { id: "Peringkat Tertinggi per Metode", en: "Top Ranking by Method" },
  "dashboard.method_comparison": { id: "Perbandingan Metode", en: "Method Comparison" },
  "dashboard.method_value_comparison": { id: "Perbandingan Nilai Antar Metode", en: "Method Value Comparison" },
  "dashboard.recent_activity": { id: "Aktivitas Terbaru", en: "Recent Activity" },
  "dashboard.system_status": { id: "Status Sistem", en: "System Status" },
  "dashboard.new": { id: "baru", en: "new" },
  "dashboard.weight": { id: "Bobot", en: "Weight" },
  "dashboard.value": { id: "Nilai", en: "Score" },

  // Quick Actions
  "quick.penilaian": { id: "Penilaian", en: "Assessment" },
  "quick.penilaian_desc": { id: "Input nilai alternatif", en: "Input alternative values" },
  "quick.metode": { id: "Manajemen Metode", en: "Method Management" },
  "quick.metode_desc": { id: "Atur metode SPK", en: "Configure DSS methods" },
  "quick.perhitungan": { id: "Perhitungan", en: "Calculation" },
  "quick.perhitungan_desc": { id: "Proses kalkulasi", en: "Process calculations" },
  "quick.laporan": { id: "Laporan", en: "Reports" },
  "quick.laporan_desc": { id: "Export hasil", en: "Export results" },

  // Stats
  "stats.from_last_month": { id: "dari bulan lalu", en: "from last month" },
  "stats.data_ready": { id: "data siap diproses", en: "data ready to process" },
  "stats.calculation_done": { id: "perhitungan selesai", en: "calculations completed" },
  "stats.consistency_level": { id: "tingkat konsistensi", en: "consistency level" },

  // Common
  "common.save": { id: "Simpan", en: "Save" },
  "common.cancel": { id: "Batal", en: "Cancel" },
  "common.delete": { id: "Hapus", en: "Delete" },
  "common.edit": { id: "Edit", en: "Edit" },
  "common.add": { id: "Tambah", en: "Add" },
  "common.search": { id: "Cari", en: "Search" },
  "common.filter": { id: "Filter", en: "Filter" },
  "common.export": { id: "Ekspor", en: "Export" },
  "common.import": { id: "Impor", en: "Import" },
  "common.actions": { id: "Aksi", en: "Actions" },
  "common.name": { id: "Nama", en: "Name" },
  "common.value": { id: "Nilai", en: "Value" },
  "common.status": { id: "Status", en: "Status" },
  "common.date": { id: "Tanggal", en: "Date" },
  "common.no_data": { id: "Tidak ada data", en: "No data" },
  "common.loading": { id: "Memuat...", en: "Loading..." },
  "common.success": { id: "Berhasil", en: "Success" },
  "common.error": { id: "Gagal", en: "Error" },
  "common.warning": { id: "Peringatan", en: "Warning" },
  "common.info": { id: "Informasi", en: "Information" },
  "common.confirm": { id: "Konfirmasi", en: "Confirm" },
  "common.yes": { id: "Ya", en: "Yes" },
  "common.no": { id: "Tidak", en: "No" },
  "common.close": { id: "Tutup", en: "Close" },
  "common.back": { id: "Kembali", en: "Back" },
  "common.next": { id: "Selanjutnya", en: "Next" },
  "common.previous": { id: "Sebelumnya", en: "Previous" },
  "common.finish": { id: "Selesai", en: "Finish" },
  "common.view_all": { id: "Lihat Semua", en: "View All" },
  "common.version": { id: "Versi", en: "Version" },

  // Settings
  "settings.title": { id: "Pengaturan", en: "Settings" },
  "settings.subtitle": { id: "Kelola preferensi dan pengaturan akun", en: "Manage preferences and account settings" },
  "settings.app_name": { id: "Nama Aplikasi", en: "Application Name" },
  "settings.app_name_desc": { id: "Ubah nama dan subtitle aplikasi", en: "Change app name and subtitle" },
  "settings.app_subtitle": { id: "Subtitle", en: "Subtitle" },
  "settings.save_app_name": { id: "Simpan Nama Aplikasi", en: "Save App Name" },
  "settings.appearance": { id: "Tampilan", en: "Appearance" },
  "settings.appearance_desc": { id: "Sesuaikan tampilan aplikasi", en: "Customize app appearance" },
  "settings.dark_mode": { id: "Mode Gelap", en: "Dark Mode" },
  "settings.dark_mode_desc": { id: "Aktifkan tema gelap", en: "Enable dark theme" },
  "settings.language": { id: "Bahasa", en: "Language" },
  "settings.language_desc": { id: "Pilih bahasa tampilan", en: "Select display language" },
  "settings.notifications": { id: "Notifikasi", en: "Notifications" },
  "settings.notifications_desc": { id: "Atur preferensi notifikasi", en: "Set notification preferences" },
  "settings.enable_notifications": { id: "Aktifkan Notifikasi", en: "Enable Notifications" },
  "settings.enable_notifications_desc": { id: "Terima notifikasi dari sistem", en: "Receive system notifications" },
  "settings.sound": { id: "Suara Notifikasi", en: "Notification Sound" },
  "settings.sound_desc": { id: "Putar suara saat ada notifikasi", en: "Play sound for notifications" },
  "settings.data_privacy": { id: "Data & Privasi", en: "Data & Privacy" },
  "settings.data_privacy_desc": { id: "Kelola data dan privasi Anda", en: "Manage your data and privacy" },
  "settings.auto_backup": { id: "Backup Otomatis", en: "Auto Backup" },
  "settings.auto_backup_desc": { id: "Backup data secara otomatis", en: "Automatically backup data" },
  "settings.backup_frequency": { id: "Frekuensi Backup", en: "Backup Frequency" },
  "settings.security": { id: "Keamanan", en: "Security" },
  "settings.security_desc": { id: "Kelola keamanan akun", en: "Manage account security" },
  "settings.change_password": { id: "Ubah Password", en: "Change Password" },
  "settings.old_password": { id: "Password Lama", en: "Old Password" },
  "settings.new_password": { id: "Password Baru", en: "New Password" },
  "settings.confirm_password": { id: "Konfirmasi Password", en: "Confirm Password" },
  "settings.dashboard_widgets": { id: "Widget Dashboard", en: "Dashboard Widgets" },
  "settings.customize_dashboard": { id: "Sesuaikan tampilan dashboard", en: "Customize dashboard display" },
  "settings.report_settings": { id: "Pengaturan Laporan PDF", en: "PDF Report Settings" },
  "settings.report_settings_desc": {
    id: "Konfigurasi header dan footer laporan",
    en: "Configure report header and footer",
  },
  "settings.org_name": { id: "Nama Organisasi/Project", en: "Organization/Project Name" },
  "settings.location": { id: "Lokasi", en: "Location" },
  "settings.leader_name": { id: "Nama Ketua/Penanggung Jawab", en: "Leader/Responsible Person Name" },
  "settings.leader_title": { id: "Jabatan/NIP", en: "Position/ID" },
  "settings.save_report": { id: "Simpan Pengaturan Laporan", en: "Save Report Settings" },

  // Widgets
  "widget.stats_cards": { id: "Kartu Statistik", en: "Stats Cards" },
  "widget.method_chart": { id: "Grafik Perbandingan Metode", en: "Method Comparison Chart" },
  "widget.quick_actions": { id: "Aksi Cepat", en: "Quick Actions" },
  "widget.top_ranking": { id: "Peringkat Teratas", en: "Top Ranking" },
  "widget.recent_activity": { id: "Aktivitas Terbaru", en: "Recent Activity" },
  "widget.system_status": { id: "Status Sistem", en: "System Status" },

  // Auth
  "auth.login": { id: "Masuk", en: "Login" },
  "auth.logout": { id: "Keluar", en: "Logout" },
  "auth.register": { id: "Daftar", en: "Register" },
  "auth.email": { id: "Email", en: "Email" },
  "auth.password": { id: "Password", en: "Password" },
  "auth.full_name": { id: "Nama Lengkap", en: "Full Name" },
  "auth.confirm_password": { id: "Konfirmasi Password", en: "Confirm Password" },
  "auth.welcome": { id: "Selamat Datang", en: "Welcome" },
  "auth.register_title": { id: "Buat Akun Baru", en: "Create New Account" },
  "auth.register_subtitle": { id: "Daftar untuk mengakses sistem", en: "Sign up to access the system" },
  "auth.login_subtitle": { id: "Masuk ke akun Anda untuk melanjutkan", en: "Sign in to your account to continue" },
  "auth.demo_accounts": { id: "Akun Demo", en: "Demo Accounts" },
  "auth.back_to_login": { id: "Kembali ke Login", en: "Back to Login" },
  "auth.already_have_account": { id: "Sudah punya akun?", en: "Already have an account?" },
  "auth.dont_have_account": { id: "Belum punya akun?", en: "Don't have an account?" },
  "auth.sign_in_here": { id: "Masuk di sini", en: "Sign in here" },
  "auth.register_here": { id: "Daftar di sini", en: "Register here" },
  "auth.logout_confirm": {
    id: "Anda akan keluar dari akun Anda. Pastikan semua perubahan telah tersimpan sebelum melanjutkan.",
    en: "You will be logged out of your account. Make sure all changes have been saved before continuing.",
  },
  "auth.logout_title": { id: "Keluar dari Sistem?", en: "Log Out of System?" },
  "auth.yes_logout": { id: "Ya, Keluar", en: "Yes, Log Out" },

  // Backup
  "backup.daily": { id: "Harian", en: "Daily" },
  "backup.weekly": { id: "Mingguan", en: "Weekly" },
  "backup.monthly": { id: "Bulanan", en: "Monthly" },
  "backup.last_backup": { id: "Backup Terakhir", en: "Last Backup" },
  "backup.next_backup": { id: "Backup Selanjutnya", en: "Next Backup" },
  "backup.backup_now": { id: "Backup Sekarang", en: "Backup Now" },
  "backup.success": { id: "Backup berhasil dilakukan", en: "Backup completed successfully" },
  "backup.never": { id: "Belum pernah", en: "Never" },

  // Profile
  "profile.title": { id: "Profil Saya", en: "My Profile" },
  "profile.subtitle": { id: "Kelola informasi profil akun Anda", en: "Manage your account profile information" },
  "profile.personal_info": { id: "Informasi Pribadi", en: "Personal Information" },
  "profile.personal_info_desc": { id: "Ubah informasi profil Anda", en: "Update your profile information" },
  "profile.full_name": { id: "Nama Lengkap", en: "Full Name" },
  "profile.role": { id: "Role", en: "Role" },
  "profile.role_note": { id: "Role tidak dapat diubah sendiri", en: "Role cannot be changed by yourself" },
  "profile.registered_since": { id: "Terdaftar Sejak", en: "Registered Since" },
  "profile.save_changes": { id: "Simpan Perubahan", en: "Save Changes" },

  // Header dropdown
  "header.profile": { id: "Profil Saya", en: "My Profile" },
  "header.settings": { id: "Pengaturan", en: "Settings" },
  "header.logout": { id: "Keluar", en: "Logout" },

  // System Status
  "system.server_status": { id: "Status Server", en: "Server Status" },
  "system.online": { id: "Online", en: "Online" },
  "system.database": { id: "Database", en: "Database" },
  "system.connected": { id: "Terhubung", en: "Connected" },
  "system.last_sync": { id: "Sinkronisasi Terakhir", en: "Last Sync" },
  "system.just_now": { id: "Baru saja", en: "Just now" },
  "system.backup_status": { id: "Status Backup", en: "Backup Status" },
  "system.active": { id: "Aktif", en: "Active" },
  "system.inactive": { id: "Nonaktif", en: "Inactive" },

  // Recent Activity
  "activity.calculation_complete": { id: "Perhitungan selesai", en: "Calculation complete" },
  "activity.data_added": { id: "Data ditambahkan", en: "Data added" },
  "activity.backup_complete": { id: "Backup selesai", en: "Backup complete" },
  "activity.settings_updated": { id: "Pengaturan diperbarui", en: "Settings updated" },
  "activity.login": { id: "Login ke sistem", en: "Logged into system" },
  "activity.logout": { id: "Logout dari sistem", en: "Logged out" },
  "activity.register": { id: "Registrasi akun", en: "Registered account" },
  "activity.profile_updated": { id: "Profil diperbarui", en: "Profile updated" },
  "activity.report_exported_pdf": { id: "Export laporan PDF", en: "Exported PDF report" },
  "activity.report_exported_excel": { id: "Export laporan Excel", en: "Exported Excel report" },
  "activity.report_exported_all_pdf": { id: "Export semua laporan PDF", en: "Exported all PDF reports" },
  "activity.report_exported_all_excel": { id: "Export semua laporan Excel", en: "Exported all Excel reports" },
  "activity.alternative_added": { id: "Menambahkan alternatif", en: "Added alternative" },
  "activity.alternative_updated": { id: "Mengubah data alternatif", en: "Updated alternative data" },
  "activity.alternative_deleted": { id: "Menghapus alternatif", en: "Deleted alternative" },
  "activity.criteria_added": { id: "Menambahkan kriteria", en: "Added criteria" },
  "activity.criteria_updated": { id: "Mengubah kriteria", en: "Updated criteria" },
  "activity.criteria_deleted": { id: "Menghapus kriteria", en: "Deleted criteria" },
  "activity.subcriteria_added": { id: "Menambahkan sub-kriteria", en: "Added sub-criteria" },
  "activity.subcriteria_updated": { id: "Mengubah sub-kriteria", en: "Updated sub-criteria" },
  "activity.subcriteria_deleted": { id: "Menghapus sub-kriteria", en: "Deleted sub-criteria" },
  "activity.penilaian_updated": { id: "Memperbarui penilaian", en: "Updated assessments" },
  "activity.minutes_ago": { id: "menit yang lalu", en: "minutes ago" },
  "activity.hours_ago": { id: "jam yang lalu", en: "hours ago" },

  // Toasts
  "toast.dark_mode_enabled": { id: "Mode gelap diaktifkan", en: "Dark mode enabled" },
  "toast.light_mode_enabled": { id: "Mode terang diaktifkan", en: "Light mode enabled" },
  "toast.language_changed_id": { id: "Bahasa diubah ke Indonesia", en: "Language changed to Indonesian" },
  "toast.language_changed_en": { id: "Bahasa diubah ke English", en: "Language changed to English" },
  "toast.password_changed": { id: "Password berhasil diubah", en: "Password changed successfully" },
  "toast.all_fields_required": { id: "Semua field harus diisi", en: "All fields are required" },
  "toast.password_mismatch": { id: "Password baru tidak cocok", en: "New passwords don't match" },
  "toast.password_min_length": { id: "Password minimal 6 karakter", en: "Password must be at least 6 characters" },
  "toast.app_name_saved": { id: "Nama aplikasi berhasil diubah", en: "App name updated successfully" },
  "toast.report_settings_saved": {
    id: "Pengaturan laporan berhasil disimpan",
    en: "Report settings saved successfully",
  },
  "toast.settings_saved": { id: "Pengaturan berhasil disimpan", en: "Settings saved successfully" },
  "toast.login_success": { id: "Login berhasil! Selamat datang kembali.", en: "Login successful! Welcome back." },
  "toast.register_success": {
    id: "Registrasi berhasil! Akun Anda telah dibuat.",
    en: "Registration successful! Your account has been created.",
  },
  "toast.email_already_registered": { id: "Email sudah terdaftar", en: "Email already registered" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id")

  useEffect(() => {
    const savedLang = localStorage.getItem("spk_language") as Language
    if (savedLang && (savedLang === "id" || savedLang === "en")) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("spk_language", lang)
  }

  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) return key
    return translation[language] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
