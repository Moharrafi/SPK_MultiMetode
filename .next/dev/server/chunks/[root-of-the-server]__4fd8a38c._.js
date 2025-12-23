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
"[project]/lib/spk-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Sample data and state management for SPK System
__turbopack_context__.s([
    "sampleAlternatif",
    ()=>sampleAlternatif,
    "sampleKriteria",
    ()=>sampleKriteria,
    "sampleMetodeConfig",
    ()=>sampleMetodeConfig,
    "samplePenilaian",
    ()=>samplePenilaian,
    "sampleSubKriteria",
    ()=>sampleSubKriteria,
    "skalaAHP",
    ()=>skalaAHP
]);
const sampleAlternatif = [
    {
        id: "1",
        kode: "A1",
        nama: "Kandidat Ahmad Ridwan",
        nomorHp: "081234567890",
        alamat: "Jakarta",
        kategori: "Internal",
        createdAt: new Date()
    },
    {
        id: "2",
        kode: "A2",
        nama: "Kandidat Budi Santoso",
        nomorHp: "082345678901",
        alamat: "Bandung",
        kategori: "Eksternal",
        createdAt: new Date()
    },
    {
        id: "3",
        kode: "A3",
        nama: "Kandidat Citra Dewi",
        nomorHp: "083456789012",
        alamat: "Surabaya",
        kategori: "Internal",
        createdAt: new Date()
    },
    {
        id: "4",
        kode: "A4",
        nama: "Kandidat Dimas Prasetyo",
        nomorHp: "084567890123",
        alamat: "Yogyakarta",
        kategori: "Eksternal",
        createdAt: new Date()
    },
    {
        id: "5",
        kode: "A5",
        nama: "Kandidat Eka Putri",
        nomorHp: "085678901234",
        alamat: "Semarang",
        kategori: "Internal",
        createdAt: new Date()
    }
];
const sampleKriteria = [
    {
        id: "1",
        kode: "C1",
        nama: "Pendidikan",
        bobot: 0.25,
        jenis: "benefit",
        createdAt: new Date()
    },
    {
        id: "2",
        kode: "C2",
        nama: "Pengalaman Kerja",
        bobot: 0.3,
        jenis: "benefit",
        createdAt: new Date()
    },
    {
        id: "3",
        kode: "C3",
        nama: "Usia",
        bobot: 0.15,
        jenis: "cost",
        createdAt: new Date()
    },
    {
        id: "4",
        kode: "C4",
        nama: "Kemampuan Komunikasi",
        bobot: 0.2,
        jenis: "benefit",
        createdAt: new Date()
    },
    {
        id: "5",
        kode: "C5",
        nama: "Gaji yang Diharapkan",
        bobot: 0.1,
        jenis: "cost",
        createdAt: new Date()
    }
];
const sampleSubKriteria = [
    // Pendidikan
    {
        id: "1",
        kriteriaId: "1",
        nama: "S3",
        nilai: 5
    },
    {
        id: "2",
        kriteriaId: "1",
        nama: "S2",
        nilai: 4
    },
    {
        id: "3",
        kriteriaId: "1",
        nama: "S1",
        nilai: 3
    },
    {
        id: "4",
        kriteriaId: "1",
        nama: "D3",
        nilai: 2
    },
    {
        id: "5",
        kriteriaId: "1",
        nama: "SMA",
        nilai: 1
    },
    // Pengalaman Kerja
    {
        id: "6",
        kriteriaId: "2",
        nama: "> 10 Tahun",
        nilai: 5
    },
    {
        id: "7",
        kriteriaId: "2",
        nama: "5-10 Tahun",
        nilai: 4
    },
    {
        id: "8",
        kriteriaId: "2",
        nama: "3-5 Tahun",
        nilai: 3
    },
    {
        id: "9",
        kriteriaId: "2",
        nama: "1-3 Tahun",
        nilai: 2
    },
    {
        id: "10",
        kriteriaId: "2",
        nama: "< 1 Tahun",
        nilai: 1
    },
    // Kemampuan Komunikasi
    {
        id: "11",
        kriteriaId: "4",
        nama: "Sangat Baik",
        nilai: 5
    },
    {
        id: "12",
        kriteriaId: "4",
        nama: "Baik",
        nilai: 4
    },
    {
        id: "13",
        kriteriaId: "4",
        nama: "Cukup",
        nilai: 3
    },
    {
        id: "14",
        kriteriaId: "4",
        nama: "Kurang",
        nilai: 2
    },
    {
        id: "15",
        kriteriaId: "4",
        nama: "Sangat Kurang",
        nilai: 1
    }
];
const samplePenilaian = [
    // A1
    {
        id: "1",
        alternatifId: "1",
        kriteriaId: "1",
        nilai: 4
    },
    {
        id: "2",
        alternatifId: "1",
        kriteriaId: "2",
        nilai: 5
    },
    {
        id: "3",
        alternatifId: "1",
        kriteriaId: "3",
        nilai: 35
    },
    {
        id: "4",
        alternatifId: "1",
        kriteriaId: "4",
        nilai: 4
    },
    {
        id: "5",
        alternatifId: "1",
        kriteriaId: "5",
        nilai: 15
    },
    // A2
    {
        id: "6",
        alternatifId: "2",
        kriteriaId: "1",
        nilai: 3
    },
    {
        id: "7",
        alternatifId: "2",
        kriteriaId: "2",
        nilai: 4
    },
    {
        id: "8",
        alternatifId: "2",
        kriteriaId: "3",
        nilai: 28
    },
    {
        id: "9",
        alternatifId: "2",
        kriteriaId: "4",
        nilai: 5
    },
    {
        id: "10",
        alternatifId: "2",
        kriteriaId: "5",
        nilai: 12
    },
    // A3
    {
        id: "11",
        alternatifId: "3",
        kriteriaId: "1",
        nilai: 5
    },
    {
        id: "12",
        alternatifId: "3",
        kriteriaId: "2",
        nilai: 3
    },
    {
        id: "13",
        alternatifId: "3",
        kriteriaId: "3",
        nilai: 30
    },
    {
        id: "14",
        alternatifId: "3",
        kriteriaId: "4",
        nilai: 4
    },
    {
        id: "15",
        alternatifId: "3",
        kriteriaId: "5",
        nilai: 18
    },
    // A4
    {
        id: "16",
        alternatifId: "4",
        kriteriaId: "1",
        nilai: 3
    },
    {
        id: "17",
        alternatifId: "4",
        kriteriaId: "2",
        nilai: 5
    },
    {
        id: "18",
        alternatifId: "4",
        kriteriaId: "3",
        nilai: 40
    },
    {
        id: "19",
        alternatifId: "4",
        kriteriaId: "4",
        nilai: 3
    },
    {
        id: "20",
        alternatifId: "4",
        kriteriaId: "5",
        nilai: 10
    },
    // A5
    {
        id: "21",
        alternatifId: "5",
        kriteriaId: "1",
        nilai: 4
    },
    {
        id: "22",
        alternatifId: "5",
        kriteriaId: "2",
        nilai: 4
    },
    {
        id: "23",
        alternatifId: "5",
        kriteriaId: "3",
        nilai: 32
    },
    {
        id: "24",
        alternatifId: "5",
        kriteriaId: "4",
        nilai: 5
    },
    {
        id: "25",
        alternatifId: "5",
        kriteriaId: "5",
        nilai: 14
    }
];
const sampleMetodeConfig = [
    {
        id: "1",
        nama: "SAW",
        aktif: true,
        bobot: 0.4
    },
    {
        id: "2",
        nama: "AHP",
        aktif: true,
        bobot: 0.3
    },
    {
        id: "3",
        nama: "TOPSIS",
        aktif: true,
        bobot: 0.3
    }
];
const skalaAHP = [
    {
        nilai: 1,
        keterangan: "Sama Penting"
    },
    {
        nilai: 2,
        keterangan: "Mendekati Sedikit Lebih Penting"
    },
    {
        nilai: 3,
        keterangan: "Sedikit Lebih Penting"
    },
    {
        nilai: 4,
        keterangan: "Mendekati Lebih Penting"
    },
    {
        nilai: 5,
        keterangan: "Lebih Penting"
    },
    {
        nilai: 6,
        keterangan: "Mendekati Sangat Penting"
    },
    {
        nilai: 7,
        keterangan: "Sangat Penting"
    },
    {
        nilai: 8,
        keterangan: "Mendekati Mutlak Lebih Penting"
    },
    {
        nilai: 9,
        keterangan: "Mutlak Lebih Penting"
    }
];
}),
"[project]/app/api/spk/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$spk$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/spk-data.ts [app-route] (ecmascript)");
;
;
;
const defaultMetodeConfig = [
    {
        nama: 'SAW',
        aktif: true,
        bobot: 1
    },
    {
        nama: 'AHP',
        aktif: true,
        bobot: 1
    },
    {
        nama: 'TOPSIS',
        aktif: true,
        bobot: 1
    }
];
async function GET() {
    try {
        const [alternatif, kriteria, subKriteria, penilaian, pairwiseComparisons] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].alternatif.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].kriteria.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].subKriteria.findMany(),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].penilaian.findMany(),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].pairwiseComparison.findMany()
        ]);
        let metodeConfig = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].metodeConfig.findMany({
            orderBy: {
                nama: 'asc'
            }
        });
        if (metodeConfig.length === 0) {
            metodeConfig = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(defaultMetodeConfig.map((config)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].metodeConfig.create({
                    data: config
                })));
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            alternatif,
            kriteria,
            subKriteria,
            penilaian,
            metodeConfig,
            pairwiseComparisons
        });
    } catch (error) {
        console.error('Gagal mengambil data dari database, menggunakan data fallback', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            alternatif: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$spk$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sampleAlternatif"],
            kriteria: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$spk$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sampleKriteria"],
            subKriteria: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$spk$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sampleSubKriteria"],
            penilaian: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$spk$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["samplePenilaian"],
            metodeConfig: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$spk$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sampleMetodeConfig"],
            pairwiseComparisons: []
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4fd8a38c._.js.map