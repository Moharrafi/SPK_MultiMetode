module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
// Sample users for demo
const sampleUsers = [
    {
        id: "1",
        nama: "Administrator",
        email: "admin@spk.com",
        password: "admin123",
        role: "admin",
        createdAt: new Date()
    },
    {
        id: "2",
        nama: "Analis SPK",
        email: "analis@spk.com",
        password: "analis123",
        role: "analis",
        createdAt: new Date()
    },
    {
        id: "3",
        nama: "Viewer SPK",
        email: "viewer@spk.com",
        password: "viewer123",
        role: "viewer",
        createdAt: new Date()
    }
];
// Sample notifications
const sampleNotifications = [
    {
        id: "1",
        title: "Perhitungan Selesai",
        message: "Perhitungan SAW telah selesai dengan 5 alternatif",
        type: "success",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
        id: "2",
        title: "Data Baru Ditambahkan",
        message: "3 alternatif baru telah ditambahkan ke sistem",
        type: "info",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
        id: "3",
        title: "Peringatan Konsistensi",
        message: "Matriks perbandingan AHP tidak konsisten (CR > 0.1)",
        type: "warning",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60)
    },
    {
        id: "4",
        title: "Backup Otomatis",
        message: "Data telah di-backup secara otomatis",
        type: "info",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
    }
];
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(sampleNotifications);
    const [appName, setAppName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("SPK Multi-Metode");
    const [appSubtitle, setAppSubtitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("SAW | AHP | TOPSIS");
    const [appLogoUrl, setAppLogoUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [sidebarCollapsed, setSidebarCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reportSettings, setReportSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        organizationName: "Sistem Pendukung Keputusan Multi Metode",
        location: "Jakarta",
        leaderName: "Nama Ketua",
        leaderTitle: "NIP. 123456789"
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check for saved session
        const savedUser = localStorage.getItem("spk_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        const savedAppSettings = localStorage.getItem("spk_app_settings");
        if (savedAppSettings) {
            const parsed = JSON.parse(savedAppSettings);
            setAppName(parsed.appName || "SPK Multi-Metode");
            setAppSubtitle(parsed.appSubtitle || "SAW | AHP | TOPSIS");
            setAppLogoUrl(parsed.appLogoUrl || "");
        }
        const savedSidebarCollapsed = localStorage.getItem("spk_sidebar_collapsed");
        const savedReportSettings = localStorage.getItem("spk_report_settings");
        if (savedSidebarCollapsed) setSidebarCollapsed(savedSidebarCollapsed === "true");
        if (savedReportSettings) setReportSettings(JSON.parse(savedReportSettings));
        setIsLoading(false);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleStorageChange = (e)=>{
            if (e.key === "spk_app_settings" && e.newValue) {
                const parsed = JSON.parse(e.newValue);
                setAppName(parsed.appName || "SPK Multi-Metode");
                setAppSubtitle(parsed.appSubtitle || "SAW | AHP | TOPSIS");
                setAppLogoUrl(parsed.appLogoUrl || "");
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return ()=>window.removeEventListener("storage", handleStorageChange);
    }, []);
    const login = async (email, password)=>{
        const foundUser = sampleUsers.find((u)=>u.email === email && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("spk_user", JSON.stringify(foundUser));
            return true;
        }
        return false;
    };
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("spk_user");
    };
    const updateProfile = (data)=>{
        if (user) {
            const updated = {
                ...user,
                ...data
            };
            setUser(updated);
            localStorage.setItem("spk_user", JSON.stringify(updated));
        }
    };
    const updateAppSettings = (name, subtitle, logoUrl)=>{
        setAppName(name);
        setAppSubtitle(subtitle);
        setAppLogoUrl(logoUrl);
        localStorage.setItem("spk_app_settings", JSON.stringify({
            appName: name,
            appSubtitle: subtitle,
            appLogoUrl: logoUrl
        }));
    };
    const updateReportSettings = (settings)=>{
        setReportSettings(settings);
        localStorage.setItem("spk_report_settings", JSON.stringify(settings));
    };
    const handleSetSidebarCollapsed = (collapsed)=>{
        setSidebarCollapsed(collapsed);
        localStorage.setItem("spk_sidebar_collapsed", String(collapsed));
    };
    const markNotificationRead = (id)=>{
        setNotifications((prev)=>prev.map((n)=>n.id === id ? {
                    ...n,
                    read: true
                } : n));
    };
    const markAllNotificationsRead = ()=>{
        setNotifications((prev)=>prev.map((n)=>({
                    ...n,
                    read: true
                })));
    };
    const deleteNotification = (id)=>{
        setNotifications((prev)=>prev.filter((n)=>n.id !== id));
    };
    const clearAllNotifications = ()=>{
        setNotifications([]);
    };
    const addNotification = (notification)=>{
        const newNotif = {
            ...notification,
            id: Date.now().toString(),
            read: false,
            createdAt: new Date()
        };
        setNotifications((prev)=>[
                newNotif,
                ...prev
            ]);
    };
    const hasPermission = (permission)=>{
        if (!user) return false;
        const rolePermissions = {
            admin: [
                "view",
                "edit",
                "delete",
                "manage_users"
            ],
            analis: [
                "view",
                "edit"
            ],
            viewer: [
                "view"
            ]
        };
        return rolePermissions[user.role]?.includes(permission) ?? false;
    };
    const unreadCount = notifications.filter((n)=>!n.read).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isAuthenticated: !!user,
            isLoading,
            notifications,
            unreadCount,
            appName,
            appSubtitle,
            appLogoUrl,
            sidebarCollapsed,
            reportSettings,
            login,
            logout,
            updateProfile,
            updateAppSettings,
            updateReportSettings,
            setSidebarCollapsed: handleSetSidebarCollapsed,
            markNotificationRead,
            markAllNotificationsRead,
            addNotification,
            deleteNotification,
            clearAllNotifications,
            hasPermission
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth-context.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$4$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@3.4.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$4$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/ui/ios-toast.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useIOSToast",
    ()=>useIOSToast,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useToast() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
function useIOSToast() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error("useIOSToast must be used within a ToastProvider");
    }
    return context;
}
const icons = {
    success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
    info: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"],
    warning: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
};
const styles = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-amber-500"
};
function ToastProvider({ children }) {
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const showToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((options, type = "success")=>{
        const id = Math.random().toString(36).substr(2, 9);
        let toast;
        if (typeof options === "string") {
            toast = {
                id,
                message: options,
                type
            };
        } else {
            toast = {
                id,
                title: options.title,
                message: options.message,
                type: options.type || "success"
            };
        }
        setToasts((prev)=>[
                ...prev,
                toast
            ]);
        setTimeout(()=>{
            setToasts((prev)=>prev.filter((t)=>t.id !== id));
        }, 3000);
    }, []);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            showToast
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none px-4 w-full max-w-md",
                children: toasts.map((toast, index)=>{
                    const Icon = icons[toast.type];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("pointer-events-auto flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-2xl md:rounded-full shadow-2xl", "animate-in fade-in slide-in-from-top-4 duration-300", "backdrop-blur-xl bg-foreground/90 text-background", "w-full"),
                        style: {
                            animationDelay: `${index * 50}ms`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-1 rounded-full flex-shrink-0", styles[toast.type]),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: "h-3.5 w-3.5 md:h-4 md:w-4 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ios-toast.tsx",
                                    lineNumber: 104,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ui/ios-toast.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0 text-center",
                                children: [
                                    toast.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs md:text-sm font-semibold",
                                        children: toast.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/ios-toast.tsx",
                                        lineNumber: 107,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-xs md:text-sm block", toast.title ? "font-normal opacity-90" : "font-medium"),
                                        children: toast.message
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/ios-toast.tsx",
                                        lineNumber: 108,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/ios-toast.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this)
                        ]
                    }, toast.id, true, {
                        fileName: "[project]/components/ui/ios-toast.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/ui/ios-toast.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/ios-toast.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/language-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const translations = {
    // Navigation
    "nav.dashboard": {
        id: "Dashboard",
        en: "Dashboard"
    },
    "nav.data_master": {
        id: "Data Master",
        en: "Master Data"
    },
    "nav.alternatif": {
        id: "Data Alternatif",
        en: "Alternatives"
    },
    "nav.kriteria": {
        id: "Data Kriteria",
        en: "Criteria"
    },
    "nav.sub_kriteria": {
        id: "Sub-Kriteria",
        en: "Sub-Criteria"
    },
    "nav.skala": {
        id: "Skala Penilaian",
        en: "Rating Scale"
    },
    "nav.metode": {
        id: "Manajemen Metode",
        en: "Method Management"
    },
    "nav.penilaian": {
        id: "Penilaian",
        en: "Assessment"
    },
    "nav.perhitungan": {
        id: "Perhitungan",
        en: "Calculation"
    },
    "nav.modul_saw": {
        id: "Modul SAW",
        en: "SAW Module"
    },
    "nav.modul_ahp": {
        id: "Modul AHP",
        en: "AHP Module"
    },
    "nav.modul_topsis": {
        id: "Modul TOPSIS",
        en: "TOPSIS Module"
    },
    "nav.hasil": {
        id: "Hasil & Ranking",
        en: "Results & Ranking"
    },
    "nav.hasil_per_metode": {
        id: "Hasil per Metode",
        en: "Results by Method"
    },
    "nav.perbandingan": {
        id: "Perbandingan Metode",
        en: "Method Comparison"
    },
    "nav.ranking_gabungan": {
        id: "Ranking Gabungan",
        en: "Combined Ranking"
    },
    "nav.laporan": {
        id: "Laporan",
        en: "Reports"
    },
    "nav.pengguna": {
        id: "Manajemen Pengguna",
        en: "User Management"
    },
    "nav.profil": {
        id: "Profil Saya",
        en: "My Profile"
    },
    "nav.pengaturan": {
        id: "Pengaturan",
        en: "Settings"
    },
    // Dashboard
    "dashboard.title": {
        id: "Dashboard",
        en: "Dashboard"
    },
    "dashboard.welcome": {
        id: "Selamat datang di Sistem Pendukung Keputusan Multi-Metode",
        en: "Welcome to Multi-Method Decision Support System"
    },
    "dashboard.total_alternatif": {
        id: "Total Alternatif",
        en: "Total Alternatives"
    },
    "dashboard.total_kriteria": {
        id: "Total Kriteria",
        en: "Total Criteria"
    },
    "dashboard.metode_aktif": {
        id: "Metode Aktif",
        en: "Active Methods"
    },
    "dashboard.total_metode": {
        id: "Total Metode",
        en: "Total Methods"
    },
    "dashboard.quick_actions": {
        id: "Aksi Cepat",
        en: "Quick Actions"
    },
    "dashboard.top_ranking": {
        id: "Peringkat Teratas",
        en: "Top Ranking"
    },
    "dashboard.top_ranking_per_metode": {
        id: "Peringkat Tertinggi per Metode",
        en: "Top Ranking by Method"
    },
    "dashboard.method_comparison": {
        id: "Perbandingan Metode",
        en: "Method Comparison"
    },
    "dashboard.method_value_comparison": {
        id: "Perbandingan Nilai Antar Metode",
        en: "Method Value Comparison"
    },
    "dashboard.recent_activity": {
        id: "Aktivitas Terbaru",
        en: "Recent Activity"
    },
    "dashboard.system_status": {
        id: "Status Sistem",
        en: "System Status"
    },
    "dashboard.new": {
        id: "baru",
        en: "new"
    },
    "dashboard.weight": {
        id: "Bobot",
        en: "Weight"
    },
    "dashboard.value": {
        id: "Nilai",
        en: "Score"
    },
    // Quick Actions
    "quick.penilaian": {
        id: "Penilaian",
        en: "Assessment"
    },
    "quick.penilaian_desc": {
        id: "Input nilai alternatif",
        en: "Input alternative values"
    },
    "quick.metode": {
        id: "Manajemen Metode",
        en: "Method Management"
    },
    "quick.metode_desc": {
        id: "Atur metode SPK",
        en: "Configure DSS methods"
    },
    "quick.perhitungan": {
        id: "Perhitungan",
        en: "Calculation"
    },
    "quick.perhitungan_desc": {
        id: "Proses kalkulasi",
        en: "Process calculations"
    },
    "quick.laporan": {
        id: "Laporan",
        en: "Reports"
    },
    "quick.laporan_desc": {
        id: "Export hasil",
        en: "Export results"
    },
    // Stats
    "stats.from_last_month": {
        id: "dari bulan lalu",
        en: "from last month"
    },
    "stats.data_ready": {
        id: "data siap diproses",
        en: "data ready to process"
    },
    "stats.calculation_done": {
        id: "perhitungan selesai",
        en: "calculations completed"
    },
    "stats.consistency_level": {
        id: "tingkat konsistensi",
        en: "consistency level"
    },
    // Common
    "common.save": {
        id: "Simpan",
        en: "Save"
    },
    "common.cancel": {
        id: "Batal",
        en: "Cancel"
    },
    "common.delete": {
        id: "Hapus",
        en: "Delete"
    },
    "common.edit": {
        id: "Edit",
        en: "Edit"
    },
    "common.add": {
        id: "Tambah",
        en: "Add"
    },
    "common.search": {
        id: "Cari",
        en: "Search"
    },
    "common.filter": {
        id: "Filter",
        en: "Filter"
    },
    "common.export": {
        id: "Ekspor",
        en: "Export"
    },
    "common.import": {
        id: "Impor",
        en: "Import"
    },
    "common.actions": {
        id: "Aksi",
        en: "Actions"
    },
    "common.name": {
        id: "Nama",
        en: "Name"
    },
    "common.value": {
        id: "Nilai",
        en: "Value"
    },
    "common.status": {
        id: "Status",
        en: "Status"
    },
    "common.date": {
        id: "Tanggal",
        en: "Date"
    },
    "common.no_data": {
        id: "Tidak ada data",
        en: "No data"
    },
    "common.loading": {
        id: "Memuat...",
        en: "Loading..."
    },
    "common.success": {
        id: "Berhasil",
        en: "Success"
    },
    "common.error": {
        id: "Gagal",
        en: "Error"
    },
    "common.warning": {
        id: "Peringatan",
        en: "Warning"
    },
    "common.info": {
        id: "Informasi",
        en: "Information"
    },
    "common.confirm": {
        id: "Konfirmasi",
        en: "Confirm"
    },
    "common.yes": {
        id: "Ya",
        en: "Yes"
    },
    "common.no": {
        id: "Tidak",
        en: "No"
    },
    "common.close": {
        id: "Tutup",
        en: "Close"
    },
    "common.back": {
        id: "Kembali",
        en: "Back"
    },
    "common.next": {
        id: "Selanjutnya",
        en: "Next"
    },
    "common.previous": {
        id: "Sebelumnya",
        en: "Previous"
    },
    "common.finish": {
        id: "Selesai",
        en: "Finish"
    },
    "common.view_all": {
        id: "Lihat Semua",
        en: "View All"
    },
    "common.version": {
        id: "Versi",
        en: "Version"
    },
    // Settings
    "settings.title": {
        id: "Pengaturan",
        en: "Settings"
    },
    "settings.subtitle": {
        id: "Kelola preferensi dan pengaturan akun",
        en: "Manage preferences and account settings"
    },
    "settings.app_name": {
        id: "Nama Aplikasi",
        en: "Application Name"
    },
    "settings.app_name_desc": {
        id: "Ubah nama dan subtitle aplikasi",
        en: "Change app name and subtitle"
    },
    "settings.app_subtitle": {
        id: "Subtitle",
        en: "Subtitle"
    },
    "settings.save_app_name": {
        id: "Simpan Nama Aplikasi",
        en: "Save App Name"
    },
    "settings.appearance": {
        id: "Tampilan",
        en: "Appearance"
    },
    "settings.appearance_desc": {
        id: "Sesuaikan tampilan aplikasi",
        en: "Customize app appearance"
    },
    "settings.dark_mode": {
        id: "Mode Gelap",
        en: "Dark Mode"
    },
    "settings.dark_mode_desc": {
        id: "Aktifkan tema gelap",
        en: "Enable dark theme"
    },
    "settings.language": {
        id: "Bahasa",
        en: "Language"
    },
    "settings.language_desc": {
        id: "Pilih bahasa tampilan",
        en: "Select display language"
    },
    "settings.notifications": {
        id: "Notifikasi",
        en: "Notifications"
    },
    "settings.notifications_desc": {
        id: "Atur preferensi notifikasi",
        en: "Set notification preferences"
    },
    "settings.enable_notifications": {
        id: "Aktifkan Notifikasi",
        en: "Enable Notifications"
    },
    "settings.enable_notifications_desc": {
        id: "Terima notifikasi dari sistem",
        en: "Receive system notifications"
    },
    "settings.sound": {
        id: "Suara Notifikasi",
        en: "Notification Sound"
    },
    "settings.sound_desc": {
        id: "Putar suara saat ada notifikasi",
        en: "Play sound for notifications"
    },
    "settings.data_privacy": {
        id: "Data & Privasi",
        en: "Data & Privacy"
    },
    "settings.data_privacy_desc": {
        id: "Kelola data dan privasi Anda",
        en: "Manage your data and privacy"
    },
    "settings.auto_backup": {
        id: "Backup Otomatis",
        en: "Auto Backup"
    },
    "settings.auto_backup_desc": {
        id: "Backup data secara otomatis",
        en: "Automatically backup data"
    },
    "settings.backup_frequency": {
        id: "Frekuensi Backup",
        en: "Backup Frequency"
    },
    "settings.security": {
        id: "Keamanan",
        en: "Security"
    },
    "settings.security_desc": {
        id: "Kelola keamanan akun",
        en: "Manage account security"
    },
    "settings.change_password": {
        id: "Ubah Password",
        en: "Change Password"
    },
    "settings.old_password": {
        id: "Password Lama",
        en: "Old Password"
    },
    "settings.new_password": {
        id: "Password Baru",
        en: "New Password"
    },
    "settings.confirm_password": {
        id: "Konfirmasi Password",
        en: "Confirm Password"
    },
    "settings.dashboard_widgets": {
        id: "Widget Dashboard",
        en: "Dashboard Widgets"
    },
    "settings.customize_dashboard": {
        id: "Sesuaikan tampilan dashboard",
        en: "Customize dashboard display"
    },
    "settings.report_settings": {
        id: "Pengaturan Laporan PDF",
        en: "PDF Report Settings"
    },
    "settings.report_settings_desc": {
        id: "Konfigurasi header dan footer laporan",
        en: "Configure report header and footer"
    },
    "settings.org_name": {
        id: "Nama Organisasi/Project",
        en: "Organization/Project Name"
    },
    "settings.location": {
        id: "Lokasi",
        en: "Location"
    },
    "settings.leader_name": {
        id: "Nama Ketua/Penanggung Jawab",
        en: "Leader/Responsible Person Name"
    },
    "settings.leader_title": {
        id: "Jabatan/NIP",
        en: "Position/ID"
    },
    "settings.save_report": {
        id: "Simpan Pengaturan Laporan",
        en: "Save Report Settings"
    },
    // Widgets
    "widget.stats_cards": {
        id: "Kartu Statistik",
        en: "Stats Cards"
    },
    "widget.method_chart": {
        id: "Grafik Perbandingan Metode",
        en: "Method Comparison Chart"
    },
    "widget.quick_actions": {
        id: "Aksi Cepat",
        en: "Quick Actions"
    },
    "widget.top_ranking": {
        id: "Peringkat Teratas",
        en: "Top Ranking"
    },
    "widget.recent_activity": {
        id: "Aktivitas Terbaru",
        en: "Recent Activity"
    },
    "widget.system_status": {
        id: "Status Sistem",
        en: "System Status"
    },
    // Auth
    "auth.login": {
        id: "Masuk",
        en: "Login"
    },
    "auth.logout": {
        id: "Keluar",
        en: "Logout"
    },
    "auth.email": {
        id: "Email",
        en: "Email"
    },
    "auth.password": {
        id: "Password",
        en: "Password"
    },
    "auth.welcome": {
        id: "Selamat Datang",
        en: "Welcome"
    },
    "auth.login_subtitle": {
        id: "Masuk ke akun Anda untuk melanjutkan",
        en: "Sign in to your account to continue"
    },
    "auth.demo_accounts": {
        id: "Akun Demo",
        en: "Demo Accounts"
    },
    "auth.logout_confirm": {
        id: "Anda akan keluar dari akun Anda. Pastikan semua perubahan telah tersimpan sebelum melanjutkan.",
        en: "You will be logged out of your account. Make sure all changes have been saved before continuing."
    },
    "auth.logout_title": {
        id: "Keluar dari Sistem?",
        en: "Log Out of System?"
    },
    "auth.yes_logout": {
        id: "Ya, Keluar",
        en: "Yes, Log Out"
    },
    // Backup
    "backup.daily": {
        id: "Harian",
        en: "Daily"
    },
    "backup.weekly": {
        id: "Mingguan",
        en: "Weekly"
    },
    "backup.monthly": {
        id: "Bulanan",
        en: "Monthly"
    },
    "backup.last_backup": {
        id: "Backup Terakhir",
        en: "Last Backup"
    },
    "backup.next_backup": {
        id: "Backup Selanjutnya",
        en: "Next Backup"
    },
    "backup.backup_now": {
        id: "Backup Sekarang",
        en: "Backup Now"
    },
    "backup.success": {
        id: "Backup berhasil dilakukan",
        en: "Backup completed successfully"
    },
    "backup.never": {
        id: "Belum pernah",
        en: "Never"
    },
    // Profile
    "profile.title": {
        id: "Profil Saya",
        en: "My Profile"
    },
    "profile.subtitle": {
        id: "Kelola informasi profil akun Anda",
        en: "Manage your account profile information"
    },
    "profile.personal_info": {
        id: "Informasi Pribadi",
        en: "Personal Information"
    },
    "profile.personal_info_desc": {
        id: "Ubah informasi profil Anda",
        en: "Update your profile information"
    },
    "profile.full_name": {
        id: "Nama Lengkap",
        en: "Full Name"
    },
    "profile.role": {
        id: "Role",
        en: "Role"
    },
    "profile.role_note": {
        id: "Role tidak dapat diubah sendiri",
        en: "Role cannot be changed by yourself"
    },
    "profile.registered_since": {
        id: "Terdaftar Sejak",
        en: "Registered Since"
    },
    "profile.save_changes": {
        id: "Simpan Perubahan",
        en: "Save Changes"
    },
    // Header dropdown
    "header.profile": {
        id: "Profil Saya",
        en: "My Profile"
    },
    "header.settings": {
        id: "Pengaturan",
        en: "Settings"
    },
    "header.logout": {
        id: "Keluar",
        en: "Logout"
    },
    // System Status
    "system.server_status": {
        id: "Status Server",
        en: "Server Status"
    },
    "system.online": {
        id: "Online",
        en: "Online"
    },
    "system.database": {
        id: "Database",
        en: "Database"
    },
    "system.connected": {
        id: "Terhubung",
        en: "Connected"
    },
    "system.last_sync": {
        id: "Sinkronisasi Terakhir",
        en: "Last Sync"
    },
    "system.just_now": {
        id: "Baru saja",
        en: "Just now"
    },
    "system.backup_status": {
        id: "Status Backup",
        en: "Backup Status"
    },
    "system.active": {
        id: "Aktif",
        en: "Active"
    },
    "system.inactive": {
        id: "Nonaktif",
        en: "Inactive"
    },
    // Recent Activity
    "activity.calculation_complete": {
        id: "Perhitungan selesai",
        en: "Calculation complete"
    },
    "activity.data_added": {
        id: "Data ditambahkan",
        en: "Data added"
    },
    "activity.backup_complete": {
        id: "Backup selesai",
        en: "Backup complete"
    },
    "activity.settings_updated": {
        id: "Pengaturan diperbarui",
        en: "Settings updated"
    },
    "activity.minutes_ago": {
        id: "menit yang lalu",
        en: "minutes ago"
    },
    "activity.hours_ago": {
        id: "jam yang lalu",
        en: "hours ago"
    },
    // Toasts
    "toast.dark_mode_enabled": {
        id: "Mode gelap diaktifkan",
        en: "Dark mode enabled"
    },
    "toast.light_mode_enabled": {
        id: "Mode terang diaktifkan",
        en: "Light mode enabled"
    },
    "toast.language_changed_id": {
        id: "Bahasa diubah ke Indonesia",
        en: "Language changed to Indonesian"
    },
    "toast.language_changed_en": {
        id: "Bahasa diubah ke English",
        en: "Language changed to English"
    },
    "toast.password_changed": {
        id: "Password berhasil diubah",
        en: "Password changed successfully"
    },
    "toast.all_fields_required": {
        id: "Semua field harus diisi",
        en: "All fields are required"
    },
    "toast.password_mismatch": {
        id: "Password baru tidak cocok",
        en: "New passwords don't match"
    },
    "toast.password_min_length": {
        id: "Password minimal 6 karakter",
        en: "Password must be at least 6 characters"
    },
    "toast.app_name_saved": {
        id: "Nama aplikasi berhasil diubah",
        en: "App name updated successfully"
    },
    "toast.report_settings_saved": {
        id: "Pengaturan laporan berhasil disimpan",
        en: "Report settings saved successfully"
    },
    "toast.settings_saved": {
        id: "Pengaturan berhasil disimpan",
        en: "Settings saved successfully"
    },
    "toast.login_success": {
        id: "Login berhasil! Selamat datang kembali.",
        en: "Login successful! Welcome back."
    }
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function LanguageProvider({ children }) {
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("id");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedLang = localStorage.getItem("spk_language");
        if (savedLang && (savedLang === "id" || savedLang === "en")) {
            setLanguageState(savedLang);
        }
    }, []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        localStorage.setItem("spk_language", lang);
    };
    const t = (key)=>{
        const translation = translations[key];
        if (!translation) return key;
        return translation[language] || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/language-context.tsx",
        lineNumber: 264,
        columnNumber: 10
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
}),
"[project]/lib/settings-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsProvider",
    ()=>SettingsProvider,
    "useSettings",
    ()=>useSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ios$2d$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/ios-toast.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const SettingsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const defaultWidgets = {
    statsCards: true,
    methodChart: true,
    quickActions: true,
    topRanking: true,
    recentActivity: true,
    systemStatus: true
};
const defaultBackupSettings = {
    enabled: true,
    frequency: "weekly",
    lastBackup: null,
    nextBackup: null
};
const defaultReportSettings = {
    organizationName: "Sistem Pendukung Keputusan Multi Metode",
    location: "Jakarta",
    leaderName: "Nama Ketua",
    leaderTitle: "NIP. 123456789",
    logoUrl: ""
};
const defaultAppSettings = {
    appName: "SPK Multi-Metode",
    appSubtitle: "SAW | AHP | TOPSIS",
    appLogoUrl: ""
};
function calculateNextBackup(frequency, from = new Date()) {
    const next = new Date(from);
    switch(frequency){
        case "daily":
            next.setDate(next.getDate() + 1);
            break;
        case "weekly":
            next.setDate(next.getDate() + 7);
            break;
        case "monthly":
            next.setMonth(next.getMonth() + 1);
            break;
    }
    return next;
}
function SettingsProvider({ children }) {
    const [dashboardWidgets, setDashboardWidgets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultWidgets);
    const [backupSettings, setBackupSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultBackupSettings);
    const [reportSettings, setReportSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultReportSettings);
    const [appSettings, setAppSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultAppSettings);
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ios$2d$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load saved settings
        const savedWidgets = localStorage.getItem("spk_dashboard_widgets");
        const savedBackup = localStorage.getItem("spk_backup_settings");
        const savedReport = localStorage.getItem("spk_report_settings");
        const savedApp = localStorage.getItem("spk_app_settings");
        if (savedWidgets) {
            setDashboardWidgets(JSON.parse(savedWidgets));
        }
        if (savedBackup) {
            const parsed = JSON.parse(savedBackup);
            setBackupSettings({
                ...parsed,
                lastBackup: parsed.lastBackup ? new Date(parsed.lastBackup) : null,
                nextBackup: parsed.nextBackup ? new Date(parsed.nextBackup) : null
            });
        } else {
            // Set initial next backup
            setBackupSettings((prev)=>({
                    ...prev,
                    nextBackup: calculateNextBackup(prev.frequency)
                }));
        }
        if (savedReport) {
            setReportSettings(JSON.parse(savedReport));
        }
        if (savedApp) {
            setAppSettings(JSON.parse(savedApp));
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!backupSettings.enabled || !backupSettings.nextBackup) return;
        const checkBackup = ()=>{
            const now = new Date();
            if (backupSettings.nextBackup && now >= backupSettings.nextBackup) {
                performBackup();
            }
        };
        // Check every minute
        const interval = setInterval(checkBackup, 60000);
        return ()=>clearInterval(interval);
    }, [
        backupSettings.enabled,
        backupSettings.nextBackup
    ]);
    const updateDashboardWidgets = (widgets)=>{
        setDashboardWidgets((prev)=>{
            const updated = {
                ...prev,
                ...widgets
            };
            localStorage.setItem("spk_dashboard_widgets", JSON.stringify(updated));
            return updated;
        });
    };
    const updateBackupSettings = (settings)=>{
        setBackupSettings((prev)=>{
            const updated = {
                ...prev,
                ...settings
            };
            // Recalculate next backup if frequency changed
            if (settings.frequency && settings.frequency !== prev.frequency) {
                updated.nextBackup = calculateNextBackup(settings.frequency);
            }
            localStorage.setItem("spk_backup_settings", JSON.stringify(updated));
            return updated;
        });
    };
    const updateReportSettings = (settings)=>{
        setReportSettings((prev)=>{
            const updated = {
                ...prev,
                ...settings
            };
            localStorage.setItem("spk_report_settings", JSON.stringify(updated));
            return updated;
        });
    };
    const updateAppSettings = (settings)=>{
        setAppSettings((prev)=>{
            const updated = {
                ...prev,
                ...settings
            };
            localStorage.setItem("spk_app_settings", JSON.stringify(updated));
            return updated;
        });
    };
    const performBackup = ()=>{
        // Simulate backup process
        const now = new Date();
        const backupData = {
            timestamp: now.toISOString(),
            widgets: dashboardWidgets,
            reportSettings
        };
        localStorage.setItem("spk_backup_data", JSON.stringify(backupData));
        const newSettings = {
            ...backupSettings,
            lastBackup: now,
            nextBackup: calculateNextBackup(backupSettings.frequency, now)
        };
        setBackupSettings(newSettings);
        localStorage.setItem("spk_backup_settings", JSON.stringify(newSettings));
        showToast("Backup berhasil dilakukan", "success");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsContext.Provider, {
        value: {
            dashboardWidgets,
            backupSettings,
            reportSettings,
            appSettings,
            updateDashboardWidgets,
            updateBackupSettings,
            updateReportSettings,
            updateAppSettings,
            performBackup
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/settings-context.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, this);
}
function useSettings() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within SettingsProvider");
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3a120892._.js.map