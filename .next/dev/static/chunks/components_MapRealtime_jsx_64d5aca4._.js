(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/MapRealtime.jsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  {
    "path": "static/chunks/node_modules_leaflet_dist_leaflet_ef5f0413.css",
    "included": [
      "[project]/node_modules/leaflet/dist/leaflet.css [app-client] (css)"
    ]
  },
  "static/chunks/node_modules_react-leaflet_lib_index_d690dee8.js",
  "static/chunks/node_modules_5238e98e._.js",
  "static/chunks/_df451110._.js",
  "static/chunks/components_MapRealtime_jsx_928f43d4._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/components/MapRealtime.jsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);