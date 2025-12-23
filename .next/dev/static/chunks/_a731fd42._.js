(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const NOTIFICATIONS_STORAGE_KEY = "spk_notifications";
const USER_PROFILES_STORAGE_KEY = "spk_user_profiles";
const ACTIVITIES_STORAGE_KEY = "spk_activities";
const MAX_ACTIVITY_ENTRIES = 50;
const deserializeNotifications = (value)=>{
    try {
        const parsed = JSON.parse(value);
        return parsed.map((notif)=>({
                ...notif,
                createdAt: notif.createdAt ? new Date(notif.createdAt) : new Date()
            }));
    } catch (error) {
        console.error("Failed to parse notifications", error);
        return [];
    }
};
const deserializeActivities = (value)=>{
    try {
        const parsed = JSON.parse(value);
        return parsed.map((item)=>({
                ...item,
                createdAt: item.createdAt ? new Date(item.createdAt) : new Date()
            }));
    } catch (error) {
        console.error("Failed to parse activities", error);
        return [];
    }
};
const getUserAvatarKey = (userId)=>`spk_user_avatar_${userId}`;
const loadUserAvatar = (userId)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return localStorage.getItem(getUserAvatarKey(userId));
    } catch (error) {
        console.error("Failed to load user avatar", error);
        return null;
    }
};
const saveUserAvatar = (userId, avatar)=>{
    try {
        const key = getUserAvatarKey(userId);
        if (!avatar) {
            localStorage.removeItem(key);
            return;
        }
        const maxSize = 512 * 1024 // 512KB
        ;
        if (avatar.length > maxSize) {
            console.warn("Avatar too large, skipping save");
            return;
        }
        localStorage.setItem(key, avatar);
    } catch (error) {
        console.error("Failed to save avatar", error);
    }
};
const loadProfileOverrides = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(USER_PROFILES_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (error) {
        console.error("Failed to load profile overrides", error);
        return {};
    }
};
const saveProfileOverrides = (overrides)=>{
    try {
        const stringified = JSON.stringify(overrides);
        if (stringified.length > 2 * 1024 * 1024) {
            console.warn("Profile overrides payload is too large, clearing storage");
            localStorage.removeItem(USER_PROFILES_STORAGE_KEY);
            return;
        }
        localStorage.setItem(USER_PROFILES_STORAGE_KEY, stringified);
    } catch (error) {
        console.error("Failed to save profile overrides", error);
        try {
            localStorage.removeItem(USER_PROFILES_STORAGE_KEY);
        } catch (removeError) {
            console.error("Failed to clear profile overrides storage", removeError);
        }
    }
};
const parseStoredUser = (value)=>{
    if (!value) return null;
    try {
        const parsed = JSON.parse(value);
        if (parsed.createdAt) {
            parsed.createdAt = new Date(parsed.createdAt);
        }
        if (parsed.id) {
            const avatar = loadUserAvatar(parsed.id);
            if (avatar) {
                parsed.avatar = avatar;
            }
        }
        return parsed;
    } catch (error) {
        console.error("Failed to parse stored user", error);
        return null;
    }
};
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
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activities, setActivities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [appName, setAppName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("SPK Multi-Metode");
    const [appSubtitle, setAppSubtitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("SAW | AHP | TOPSIS");
    const [appLogoUrl, setAppLogoUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sidebarCollapsed, setSidebarCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reportSettings, setReportSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        organizationName: "Sistem Pendukung Keputusan Multi Metode",
        location: "Jakarta",
        leaderName: "Nama Ketua",
        leaderTitle: "NIP. 123456789"
    });
    const persistCurrentUser = (value)=>{
        if (!value) return;
        if (value.avatar) {
            saveUserAvatar(value.id, value.avatar);
        } else {
            saveUserAvatar(value.id, undefined);
        }
        const { avatar: _avatar, ...rest } = value;
        const serialized = {
            ...rest,
            createdAt: value.createdAt ? new Date(value.createdAt).toISOString() : new Date().toISOString()
        };
        try {
            localStorage.setItem("spk_user", JSON.stringify(serialized));
        } catch (error) {
            console.warn("Failed to persist user", error);
            try {
                localStorage.removeItem("spk_user");
            } catch (removeError) {
                console.warn("Failed to clear user storage", removeError);
            }
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Check for saved session
            const savedUser = parseStoredUser(localStorage.getItem("spk_user"));
            if (savedUser) {
                setUser(savedUser);
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
            const savedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
            if (savedSidebarCollapsed) setSidebarCollapsed(savedSidebarCollapsed === "true");
            if (savedReportSettings) setReportSettings(JSON.parse(savedReportSettings));
            if (savedNotifications) {
                setNotifications(deserializeNotifications(savedNotifications));
            }
            setIsLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const savedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
            if (savedActivities) {
                setActivities(deserializeActivities(savedActivities));
            }
        }
    }["AuthProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const handleStorageChange = {
                "AuthProvider.useEffect.handleStorageChange": (e)=>{
                    if (e.key === "spk_app_settings" && e.newValue) {
                        const parsed = JSON.parse(e.newValue);
                        setAppName(parsed.appName || "SPK Multi-Metode");
                        setAppSubtitle(parsed.appSubtitle || "SAW | AHP | TOPSIS");
                        setAppLogoUrl(parsed.appLogoUrl || "");
                    }
                    if (e.key === NOTIFICATIONS_STORAGE_KEY) {
                        if (e.newValue) {
                            setNotifications(deserializeNotifications(e.newValue));
                        } else {
                            setNotifications([]);
                        }
                    }
                    if (e.key === USER_PROFILES_STORAGE_KEY && user) {
                        const overrides = loadProfileOverrides()[user.id];
                        if (overrides) {
                            setUser({
                                "AuthProvider.useEffect.handleStorageChange": (prev)=>prev ? {
                                        ...prev,
                                        ...overrides
                                    } : prev
                            }["AuthProvider.useEffect.handleStorageChange"]);
                        }
                    }
                }
            }["AuthProvider.useEffect.handleStorageChange"];
            window.addEventListener("storage", handleStorageChange);
            return ({
                "AuthProvider.useEffect": ()=>window.removeEventListener("storage", handleStorageChange)
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        user
    ]);
    const login = async (email, password)=>{
        const foundUser = sampleUsers.find((u)=>u.email === email && u.password === password);
        if (foundUser) {
            const overrides = loadProfileOverrides()[foundUser.id];
            const mergedUser = {
                ...foundUser,
                ...overrides || {},
                avatar: loadUserAvatar(foundUser.id) || foundUser.avatar
            };
            setUser(mergedUser);
            persistCurrentUser(mergedUser);
            void syncProfileFromServer(foundUser.id);
            logActivity("activity.login", foundUser.id);
            return true;
        }
        return false;
    };
    const register = async (name, email, password)=>{
        const existingUser = sampleUsers.find((u)=>u.email === email);
        if (existingUser) {
            return false;
        }
        const newUser = {
            id: Date.now().toString(),
            nama: name,
            email,
            password,
            role: "viewer",
            createdAt: new Date()
        };
        sampleUsers.push(newUser);
        setUser(newUser);
        persistCurrentUser(newUser);
        void syncProfileFromServer(newUser.id);
        logActivity("activity.register", newUser.id);
        return true;
    };
    const logout = ()=>{
        if (user?.id) {
            logActivity("activity.logout", user.id);
        }
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
            persistCurrentUser(updated);
            const overrides = loadProfileOverrides();
            overrides[updated.id] = {
                ...overrides[updated.id] || {},
                ...data.nama !== undefined ? {
                    nama: data.nama
                } : {},
                ...data.email !== undefined ? {
                    email: data.email
                } : {}
            };
            if (data.avatar !== undefined) {
                saveUserAvatar(updated.id, data.avatar || undefined);
            }
            saveProfileOverrides(overrides);
            void persistProfileToServer(updated.id, {
                nama: data.nama,
                email: data.email,
                avatar: data.avatar
            });
            logActivity("activity.profile_updated", updated.id);
            const sampleIdx = sampleUsers.findIndex((u)=>u.id === updated.id);
            if (sampleIdx !== -1) {
                sampleUsers[sampleIdx] = {
                    ...sampleUsers[sampleIdx],
                    ...overrides[updated.id]
                };
                if (data.avatar !== undefined) {
                    sampleUsers[sampleIdx].avatar = data.avatar;
                }
            }
        }
    };
    async function syncProfileFromServer(userId) {
        try {
            const response = await fetch(`/api/profile/${userId}`);
            if (!response.ok) return;
            const data = await response.json();
            if (!data) return;
            setUser((prev)=>{
                if (!prev || prev.id !== userId) return prev;
                const merged = {
                    ...prev,
                    ...data
                };
                if (data.avatar !== undefined) {
                    saveUserAvatar(userId, data.avatar || undefined);
                }
                return merged;
            });
            const overrides = loadProfileOverrides();
            overrides[userId] = {
                ...overrides[userId] || {},
                ...data.nama ? {
                    nama: data.nama
                } : {},
                ...data.email ? {
                    email: data.email
                } : {}
            };
            saveProfileOverrides(overrides);
        } catch (error) {
            console.error("Failed to sync profile from server", error);
        }
    }
    async function persistProfileToServer(userId, data) {
        try {
            await fetch(`/api/profile/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error("Failed to save profile overrides", error);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (user?.id) {
                void syncProfileFromServer(user.id);
            }
        }
    }["AuthProvider.useEffect"], [
        user?.id
    ]);
    const updateAppSettings = (name, subtitle, logoUrl)=>{
        setAppName(name);
        setAppSubtitle(subtitle);
        setAppLogoUrl(logoUrl);
        localStorage.setItem("spk_app_settings", JSON.stringify({
            appName: name,
            appSubtitle: subtitle,
            appLogoUrl: logoUrl
        }));
        logActivity("activity.settings_updated");
    };
    const updateReportSettings = (settings)=>{
        setReportSettings(settings);
        localStorage.setItem("spk_report_settings", JSON.stringify(settings));
        logActivity("activity.settings_updated");
    };
    const handleSetSidebarCollapsed = (collapsed)=>{
        setSidebarCollapsed(collapsed);
        localStorage.setItem("spk_sidebar_collapsed", String(collapsed));
    };
    const persistNotifications = (items)=>{
        try {
            if (items.length === 0) {
                localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
            } else {
                localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(items.map((notif)=>({
                        ...notif,
                        createdAt: notif.createdAt.toISOString()
                    }))));
            }
        } catch (error) {
            console.error("Failed to save notifications", error);
        }
    };
    const persistActivities = (items)=>{
        try {
            if (items.length === 0) {
                localStorage.removeItem(ACTIVITIES_STORAGE_KEY);
            } else {
                localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(items.map((item)=>({
                        ...item,
                        createdAt: item.createdAt.toISOString()
                    }))));
            }
        } catch (error) {
            console.error("Failed to save activities", error);
        }
    };
    const logActivity = (actionKey, userIdOverride)=>{
        const targetUserId = userIdOverride || user?.id;
        if (!targetUserId) return;
        const newActivity = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            userId: targetUserId,
            actionKey,
            createdAt: new Date()
        };
        setActivities((prev)=>{
            const next = [
                newActivity,
                ...prev
            ].slice(0, MAX_ACTIVITY_ENTRIES);
            persistActivities(next);
            return next;
        });
    };
    const updateNotificationsState = (updater)=>{
        setNotifications((prev)=>{
            const next = updater(prev);
            persistNotifications(next);
            return next;
        });
    };
    const markNotificationRead = (id)=>{
        updateNotificationsState((prev)=>prev.map((n)=>n.id === id ? {
                    ...n,
                    read: true
                } : n));
    };
    const markAllNotificationsRead = ()=>{
        updateNotificationsState((prev)=>prev.map((n)=>({
                    ...n,
                    read: true
                })));
    };
    const deleteNotification = (id)=>{
        updateNotificationsState((prev)=>prev.filter((n)=>n.id !== id));
    };
    const clearAllNotifications = ()=>{
        updateNotificationsState(()=>[]);
    };
    const addNotification = (notification)=>{
        const newNotif = {
            ...notification,
            id: Date.now().toString(),
            read: false,
            createdAt: new Date()
        };
        updateNotificationsState((prev)=>[
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isAuthenticated: !!user,
            isLoading,
            notifications,
            activities,
            unreadCount,
            appName,
            appSubtitle,
            appLogoUrl,
            sidebarCollapsed,
            reportSettings,
            login,
            register,
            logout,
            updateProfile,
            updateAppSettings,
            updateReportSettings,
            setSidebarCollapsed: handleSetSidebarCollapsed,
            markNotificationRead,
            markAllNotificationsRead,
            addNotification,
            logActivity,
            deleteNotification,
            clearAllNotifications,
            hasPermission
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth-context.tsx",
        lineNumber: 537,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "70mGfC6QEBQSRUFy+fHMwSvgF5E=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$4$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@3.4.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$4$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/ios-toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useIOSToast",
    ()=>useIOSToast,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useToast() {
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
_s(useToast, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function useIOSToast() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error("useIOSToast must be used within a ToastProvider");
    }
    return context;
}
_s1(useIOSToast, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const icons = {
    success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
    info: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"],
    warning: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
};
const styles = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-amber-500"
};
function ToastProvider({ children }) {
    _s2();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const showToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[showToast]": (options, type = "success")=>{
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
            setToasts({
                "ToastProvider.useCallback[showToast]": (prev)=>[
                        ...prev,
                        toast
                    ]
            }["ToastProvider.useCallback[showToast]"]);
            setTimeout({
                "ToastProvider.useCallback[showToast]": ()=>{
                    setToasts({
                        "ToastProvider.useCallback[showToast]": (prev)=>prev.filter({
                                "ToastProvider.useCallback[showToast]": (t)=>t.id !== id
                            }["ToastProvider.useCallback[showToast]"])
                    }["ToastProvider.useCallback[showToast]"]);
                }
            }["ToastProvider.useCallback[showToast]"], 3000);
        }
    }["ToastProvider.useCallback[showToast]"], []);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[removeToast]": (id)=>{
            setToasts({
                "ToastProvider.useCallback[removeToast]": (prev)=>prev.filter({
                        "ToastProvider.useCallback[removeToast]": (t)=>t.id !== id
                    }["ToastProvider.useCallback[removeToast]"])
            }["ToastProvider.useCallback[removeToast]"]);
        }
    }["ToastProvider.useCallback[removeToast]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            showToast
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none px-4 w-full max-w-md",
                children: toasts.map((toast, index)=>{
                    const Icon = icons[toast.type];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-auto flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-2xl md:rounded-full shadow-2xl", "animate-in fade-in slide-in-from-top-4 duration-300", "backdrop-blur-xl bg-foreground/90 text-background", "w-full"),
                        style: {
                            animationDelay: `${index * 50}ms`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1 rounded-full flex-shrink-0", styles[toast.type]),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0 text-center",
                                children: [
                                    toast.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs md:text-sm font-semibold",
                                        children: toast.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/ios-toast.tsx",
                                        lineNumber: 107,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs md:text-sm block", toast.title ? "font-normal opacity-90" : "font-medium"),
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
_s2(ToastProvider, "pXAZjnBFZY5Qx0ETgnygSV3ABdc=");
_c = ToastProvider;
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/language-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
    "auth.register": {
        id: "Daftar",
        en: "Register"
    },
    "auth.email": {
        id: "Email",
        en: "Email"
    },
    "auth.password": {
        id: "Password",
        en: "Password"
    },
    "auth.full_name": {
        id: "Nama Lengkap",
        en: "Full Name"
    },
    "auth.confirm_password": {
        id: "Konfirmasi Password",
        en: "Confirm Password"
    },
    "auth.welcome": {
        id: "Selamat Datang",
        en: "Welcome"
    },
    "auth.register_title": {
        id: "Buat Akun Baru",
        en: "Create New Account"
    },
    "auth.register_subtitle": {
        id: "Daftar untuk mengakses sistem",
        en: "Sign up to access the system"
    },
    "auth.login_subtitle": {
        id: "Masuk ke akun Anda untuk melanjutkan",
        en: "Sign in to your account to continue"
    },
    "auth.demo_accounts": {
        id: "Akun Demo",
        en: "Demo Accounts"
    },
    "auth.back_to_login": {
        id: "Kembali ke Login",
        en: "Back to Login"
    },
    "auth.already_have_account": {
        id: "Sudah punya akun?",
        en: "Already have an account?"
    },
    "auth.dont_have_account": {
        id: "Belum punya akun?",
        en: "Don't have an account?"
    },
    "auth.sign_in_here": {
        id: "Masuk di sini",
        en: "Sign in here"
    },
    "auth.register_here": {
        id: "Daftar di sini",
        en: "Register here"
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
    "activity.login": {
        id: "Login ke sistem",
        en: "Logged into system"
    },
    "activity.logout": {
        id: "Logout dari sistem",
        en: "Logged out"
    },
    "activity.register": {
        id: "Registrasi akun",
        en: "Registered account"
    },
    "activity.profile_updated": {
        id: "Profil diperbarui",
        en: "Profile updated"
    },
    "activity.report_exported_pdf": {
        id: "Export laporan PDF",
        en: "Exported PDF report"
    },
    "activity.report_exported_excel": {
        id: "Export laporan Excel",
        en: "Exported Excel report"
    },
    "activity.report_exported_all_pdf": {
        id: "Export semua laporan PDF",
        en: "Exported all PDF reports"
    },
    "activity.report_exported_all_excel": {
        id: "Export semua laporan Excel",
        en: "Exported all Excel reports"
    },
    "activity.alternative_added": {
        id: "Menambahkan alternatif",
        en: "Added alternative"
    },
    "activity.alternative_updated": {
        id: "Mengubah data alternatif",
        en: "Updated alternative data"
    },
    "activity.alternative_deleted": {
        id: "Menghapus alternatif",
        en: "Deleted alternative"
    },
    "activity.criteria_added": {
        id: "Menambahkan kriteria",
        en: "Added criteria"
    },
    "activity.criteria_updated": {
        id: "Mengubah kriteria",
        en: "Updated criteria"
    },
    "activity.criteria_deleted": {
        id: "Menghapus kriteria",
        en: "Deleted criteria"
    },
    "activity.subcriteria_added": {
        id: "Menambahkan sub-kriteria",
        en: "Added sub-criteria"
    },
    "activity.subcriteria_updated": {
        id: "Mengubah sub-kriteria",
        en: "Updated sub-criteria"
    },
    "activity.subcriteria_deleted": {
        id: "Menghapus sub-kriteria",
        en: "Deleted sub-criteria"
    },
    "activity.penilaian_updated": {
        id: "Memperbarui penilaian",
        en: "Updated assessments"
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
    },
    "toast.register_success": {
        id: "Registrasi berhasil! Akun Anda telah dibuat.",
        en: "Registration successful! Your account has been created."
    },
    "toast.email_already_registered": {
        id: "Email sudah terdaftar",
        en: "Email already registered"
    }
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function LanguageProvider({ children }) {
    _s();
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("id");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            const savedLang = localStorage.getItem("spk_language");
            if (savedLang && (savedLang === "id" || savedLang === "en")) {
                setLanguageState(savedLang);
            }
        }
    }["LanguageProvider.useEffect"], []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        localStorage.setItem("spk_language", lang);
    };
    const t = (key)=>{
        const translation = translations[key];
        if (!translation) return key;
        return translation[language] || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/language-context.tsx",
        lineNumber: 297,
        columnNumber: 10
    }, this);
}
_s(LanguageProvider, "LC0mck84Qniu6bPmQ7Ho4a3Op9U=");
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/settings-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SETTINGS_KEYS",
    ()=>SETTINGS_KEYS,
    "calculateNextBackup",
    ()=>calculateNextBackup,
    "defaultAppSettings",
    ()=>defaultAppSettings,
    "defaultBackupSettings",
    ()=>defaultBackupSettings,
    "defaultDashboardWidgets",
    ()=>defaultDashboardWidgets,
    "defaultReportSettings",
    ()=>defaultReportSettings,
    "deserializeBackupSettings",
    ()=>deserializeBackupSettings,
    "getDefaultSettings",
    ()=>getDefaultSettings,
    "serializeBackupSettings",
    ()=>serializeBackupSettings
]);
const SETTINGS_KEYS = [
    'dashboardWidgets',
    'backupSettings',
    'reportSettings',
    'appSettings'
];
const defaultDashboardWidgets = {
    statsCards: true,
    methodChart: true,
    quickActions: true,
    topRanking: true,
    recentActivity: true,
    systemStatus: true
};
const defaultBackupSettings = {
    enabled: true,
    frequency: 'weekly',
    lastBackup: null,
    nextBackup: null
};
const defaultReportSettings = {
    organizationName: 'Sistem Pendukung Keputusan Multi Metode',
    location: 'Jakarta',
    leaderName: 'Nama Ketua',
    leaderTitle: 'NIP. 123456789',
    logoUrl: ''
};
const defaultAppSettings = {
    appName: 'SPK Multi-Metode',
    appSubtitle: 'SAW | AHP | TOPSIS',
    appLogoUrl: ''
};
function getDefaultSettings() {
    return {
        dashboardWidgets: {
            ...defaultDashboardWidgets
        },
        backupSettings: {
            ...defaultBackupSettings
        },
        reportSettings: {
            ...defaultReportSettings
        },
        appSettings: {
            ...defaultAppSettings
        }
    };
}
function calculateNextBackup(frequency, from = new Date()) {
    const next = new Date(from);
    switch(frequency){
        case 'daily':
            next.setDate(next.getDate() + 1);
            break;
        case 'weekly':
            next.setDate(next.getDate() + 7);
            break;
        case 'monthly':
            next.setMonth(next.getMonth() + 1);
            break;
    }
    return next;
}
function deserializeBackupSettings(data) {
    const merged = {
        ...defaultBackupSettings,
        ...data || {}
    };
    return {
        ...merged,
        lastBackup: merged.lastBackup ? new Date(merged.lastBackup) : null,
        nextBackup: merged.nextBackup ? new Date(merged.nextBackup) : null
    };
}
function serializeBackupSettings(settings) {
    return {
        ...settings,
        lastBackup: settings.lastBackup ? new Date(settings.lastBackup).toISOString() : null,
        nextBackup: settings.nextBackup ? new Date(settings.nextBackup).toISOString() : null
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/settings-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsProvider",
    ()=>SettingsProvider,
    "useSettings",
    ()=>useSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ios$2d$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/ios-toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/settings-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const SettingsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const SETTINGS_CACHE_KEY = "spk_settings_cache";
const getCachedSettings = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(SETTINGS_CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.error("Failed to read cached settings", error);
        return null;
    }
};
const cacheSettingsSnapshot = (snapshot)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const existing = getCachedSettings() || {};
        const merged = {
            ...existing,
            ...snapshot
        };
        localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(merged));
    } catch (error) {
        console.error("Failed to cache settings", error);
    }
};
function SettingsProvider({ children }) {
    _s();
    const defaults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultSettings"])();
    const [dashboardWidgets, setDashboardWidgets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultDashboardWidgets"]);
    const [backupSettings, setBackupSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultBackupSettings"]);
    const [reportSettings, setReportSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultReportSettings"]);
    const [appSettings, setAppSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAppSettings"]);
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ios$2d$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { logActivity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const applySettingsSnapshot = (snapshot)=>{
        if (snapshot.dashboardWidgets) {
            setDashboardWidgets((prev)=>({
                    ...prev,
                    ...snapshot.dashboardWidgets
                }));
        }
        if (snapshot.reportSettings) {
            setReportSettings((prev)=>({
                    ...prev,
                    ...snapshot.reportSettings
                }));
        }
        if (snapshot.appSettings) {
            setAppSettings((prev)=>({
                    ...prev,
                    ...snapshot.appSettings
                }));
        }
        if (snapshot.backupSettings) {
            let mergedBackup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deserializeBackupSettings"])(snapshot.backupSettings);
            if (mergedBackup.enabled && !mergedBackup.nextBackup) {
                mergedBackup = {
                    ...mergedBackup,
                    nextBackup: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateNextBackup"])(mergedBackup.frequency)
                };
            }
            setBackupSettings(mergedBackup);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsProvider.useEffect": ()=>{
            const cached = getCachedSettings();
            if (cached) {
                applySettingsSnapshot(cached);
            }
            const fetchSettings = {
                "SettingsProvider.useEffect.fetchSettings": async ()=>{
                    try {
                        const response = await fetch("/api/settings", {
                            cache: "no-store"
                        });
                        if (!response.ok) throw new Error("Failed to load settings");
                        const data = await response.json();
                        applySettingsSnapshot({
                            dashboardWidgets: {
                                ...defaults.dashboardWidgets,
                                ...data.dashboardWidgets || {}
                            },
                            reportSettings: {
                                ...defaults.reportSettings,
                                ...data.reportSettings || {}
                            },
                            appSettings: {
                                ...defaults.appSettings,
                                ...data.appSettings || {}
                            },
                            backupSettings: data.backupSettings || defaults.backupSettings
                        });
                        cacheSettingsSnapshot(data);
                    } catch (error) {
                        console.warn("Failed to fetch settings, using cached values", error);
                        const cachedFallback = getCachedSettings();
                        if (cachedFallback) {
                            applySettingsSnapshot({
                                dashboardWidgets: cachedFallback.dashboardWidgets || defaults.dashboardWidgets,
                                reportSettings: cachedFallback.reportSettings || defaults.reportSettings,
                                appSettings: cachedFallback.appSettings || defaults.appSettings,
                                backupSettings: cachedFallback.backupSettings || defaults.backupSettings
                            });
                        }
                    }
                }
            }["SettingsProvider.useEffect.fetchSettings"];
            fetchSettings();
        }
    }["SettingsProvider.useEffect"], []);
    const persistSetting = async (key, data)=>{
        try {
            await fetch("/api/settings", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    key,
                    data
                })
            });
        } catch (error) {
            console.warn("Failed to persist setting", error);
            showToast("Gagal menyimpan pengaturan ke server", "error");
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsProvider.useEffect": ()=>{
            if (!backupSettings.enabled || !backupSettings.nextBackup) return;
            const checkBackup = {
                "SettingsProvider.useEffect.checkBackup": ()=>{
                    const now = new Date();
                    if (backupSettings.nextBackup && now >= backupSettings.nextBackup) {
                        void performBackup();
                    }
                }
            }["SettingsProvider.useEffect.checkBackup"];
            const interval = setInterval(checkBackup, 60000);
            return ({
                "SettingsProvider.useEffect": ()=>clearInterval(interval)
            })["SettingsProvider.useEffect"];
        }
    }["SettingsProvider.useEffect"], [
        backupSettings.enabled,
        backupSettings.nextBackup
    ]);
    const guardedUpdate = (key, updater)=>{
        switch(key){
            case "dashboardWidgets":
                setDashboardWidgets((prev)=>{
                    const updated = updater(prev);
                    void persistSetting("dashboardWidgets", updated);
                    cacheSettingsSnapshot({
                        dashboardWidgets: updated
                    });
                    return updated;
                });
                break;
            case "backupSettings":
                setBackupSettings((prev)=>{
                    const updated = updater(prev);
                    void persistSetting("backupSettings", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeBackupSettings"])(updated));
                    cacheSettingsSnapshot({
                        backupSettings: updated
                    });
                    return updated;
                });
                break;
            case "reportSettings":
                setReportSettings((prev)=>{
                    const updated = updater(prev);
                    void persistSetting("reportSettings", updated);
                    cacheSettingsSnapshot({
                        reportSettings: updated
                    });
                    return updated;
                });
                break;
            case "appSettings":
                setAppSettings((prev)=>{
                    const updated = updater(prev);
                    void persistSetting("appSettings", updated);
                    cacheSettingsSnapshot({
                        appSettings: updated
                    });
                    return updated;
                });
                break;
        }
    };
    const updateDashboardWidgets = (widgets)=>{
        guardedUpdate("dashboardWidgets", (prev)=>({
                ...prev,
                ...widgets
            }));
    };
    const updateBackupSettings = (settings)=>{
        guardedUpdate("backupSettings", (prev)=>{
            const updated = {
                ...prev,
                ...settings
            };
            if (settings.frequency && settings.frequency !== prev.frequency) {
                updated.nextBackup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateNextBackup"])(settings.frequency);
            }
            if (updated.enabled && !updated.nextBackup) {
                updated.nextBackup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateNextBackup"])(updated.frequency);
            }
            if (!updated.enabled) {
                updated.nextBackup = null;
            }
            return updated;
        });
    };
    const updateReportSettings = (settings)=>{
        guardedUpdate("reportSettings", (prev)=>({
                ...prev,
                ...settings
            }));
        logActivity("activity.settings_updated");
    };
    const updateAppSettings = (settings)=>{
        guardedUpdate("appSettings", (prev)=>({
                ...prev,
                ...settings
            }));
        logActivity("activity.settings_updated");
    };
    const performBackup = async (options)=>{
        try {
            const response = await fetch("/api/backup", {
                method: "POST"
            });
            if (!response.ok) {
                throw new Error("Backup request failed");
            }
            const payload = await response.json();
            const backupTime = payload.contents.generatedAt ? new Date(payload.contents.generatedAt) : new Date();
            guardedUpdate("backupSettings", (prev)=>({
                    ...prev,
                    lastBackup: backupTime,
                    nextBackup: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateNextBackup"])(prev.frequency, backupTime)
                }));
            if (options?.download) {
                const blob = new Blob([
                    JSON.stringify(payload.contents, null, 2)
                ], {
                    type: "application/json"
                });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = payload.fileName;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(url);
            }
            showToast("Backup berhasil dilakukan", "success");
            logActivity("activity.backup_complete");
        } catch (error) {
            console.error("Failed to perform backup", error);
            showToast("Gagal melakukan backup", "error");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsContext.Provider, {
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
        lineNumber: 270,
        columnNumber: 5
    }, this);
}
_s(SettingsProvider, "dsoE5BCgVawo0SywRj9lQy/GeaI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ios$2d$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = SettingsProvider;
function useSettings() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within SettingsProvider");
    }
    return context;
}
_s1(useSettings, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "SettingsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_a731fd42._.js.map