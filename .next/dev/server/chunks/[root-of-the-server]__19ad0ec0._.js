module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        'query',
        'error',
        'warn'
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
}),
"[project]/lib/settings-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/app/api/settings/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/settings-data.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        const defaults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultSettings"])();
        const records = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].setting.findMany();
        const data = {
            ...defaults
        };
        for (const record of records){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SETTINGS_KEYS"].includes(record.key)) {
                data[record.key] = record.data;
            }
        }
        const missingKeys = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SETTINGS_KEYS"].filter((key)=>!records.some((record)=>record.key === key));
        if (missingKeys.length) {
            await Promise.all(missingKeys.map((key)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].setting.create({
                    data: {
                        key,
                        data: defaults[key]
                    }
                })));
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (error) {
        console.error('Failed to load settings from database', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to load settings'
        }, {
            status: 500
        });
    }
}
async function PATCH(request) {
    try {
        const body = await request.json();
        const key = body?.key;
        const settingData = body?.data;
        if (!key || settingData === undefined) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Key and data are required'
            }, {
                status: 400
            });
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SETTINGS_KEYS"].includes(key)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid setting key'
            }, {
                status: 400
            });
        }
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].setting.upsert({
            where: {
                key
            },
            update: {
                data: settingData
            },
            create: {
                key,
                data: settingData
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updated.data);
    } catch (error) {
        console.error('Failed to update settings', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update settings'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__19ad0ec0._.js.map