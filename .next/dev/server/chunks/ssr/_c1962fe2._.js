module.exports = [
"[project]/lib/supabaseAdmin.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabaseAdmin",
    ()=>supabaseAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
;
const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://aysoiacdxglzsuhtrfnp.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        persistSession: false
    }
});
}),
"[project]/app/admin/crear-tecnico/actions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"408fb336cc735ac5ceeb888b1fa6796aed89d782ee":"crearTecnico"},"",""] */ __turbopack_context__.s([
    "crearTecnico",
    ()=>crearTecnico
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseAdmin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseAdmin.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function crearTecnico(formData) {
    const nombre = formData.get("nombre");
    const email = formData.get("email");
    const password = formData.get("password");
    if (!nombre || !email || !password) {
        return {
            error: "Todos los campos son obligatorios"
        };
    }
    // 1) Verificar si existe
    const { data: existente } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseAdmin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from("usuarios").select("*").eq("email", email).maybeSingle();
    if (existente) {
        return {
            error: "El correo ya está registrado"
        };
    }
    // 2) Insertar usuario
    const { error: errInsert } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseAdmin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from("usuarios").insert([
        {
            nombre,
            email,
            password,
            rol: "tecnico"
        }
    ]);
    if (errInsert) {
        return {
            error: "Error al crear técnico"
        };
    }
    return {
        ok: "Técnico registrado correctamente"
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    crearTecnico
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(crearTecnico, "408fb336cc735ac5ceeb888b1fa6796aed89d782ee", null);
}),
"[project]/.next-internal/server/app/admin/crear-tecnico/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/admin/crear-tecnico/actions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$crear$2d$tecnico$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/crear-tecnico/actions.js [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/admin/crear-tecnico/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/admin/crear-tecnico/actions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "408fb336cc735ac5ceeb888b1fa6796aed89d782ee",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$crear$2d$tecnico$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["crearTecnico"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$crear$2d$tecnico$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$admin$2f$crear$2d$tecnico$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/crear-tecnico/page/actions.js { ACTIONS_MODULE0 => "[project]/app/admin/crear-tecnico/actions.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$crear$2d$tecnico$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/crear-tecnico/actions.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_c1962fe2._.js.map