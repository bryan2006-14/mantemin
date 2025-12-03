module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/admin/ordenes/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*#__PURE__*/ const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
_jsxDEV("td", {
    className: "border p-3 text-center",
    children: /*#__PURE__*/ _jsxDEV("div", {
        className: "flex gap-2 justify-center",
        children: [
            /*#__PURE__*/ _jsxDEV("button", {
                onClick: ()=>router.push(`/admin/ordenes/${orden.id}`),
                className: "px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-1",
                title: "Ver detalles",
                children: "👁️ Ver"
            }, void 0, false, {
                fileName: "[project]/app/admin/ordenes/page.jsx",
                lineNumber: 3,
                columnNumber: 5
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
            /*#__PURE__*/ _jsxDEV("button", {
                onClick: ()=>eliminarOrden(orden.id),
                disabled: eliminandoId === orden.id,
                className: `px-3 py-1 text-white rounded text-sm flex items-center gap-1 ${eliminandoId === orden.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`,
                title: "Eliminar orden",
                children: eliminandoId === orden.id ? "🗑️ Eliminando..." : "🗑️ Eliminar"
            }, void 0, false, {
                fileName: "[project]/app/admin/ordenes/page.jsx",
                lineNumber: 10,
                columnNumber: 5
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/ordenes/page.jsx",
        lineNumber: 2,
        columnNumber: 3
    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
}, void 0, false, {
    fileName: "[project]/app/admin/ordenes/page.jsx",
    lineNumber: 1,
    columnNumber: 1
}, /*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/app/admin/ordenes/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/admin/ordenes/page.jsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e6be0895._.js.map