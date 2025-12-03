(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ChatAdminTechnician.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatAdminTechnician
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://aysoiacdxglzsuhtrfnp.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5c29pYWNkeGdsenN1aHRyZm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NDk2MjIsImV4cCI6MjA4MDAyNTYyMn0.5agJq8Jn_o2Mdwylq7LOHO0B8TAw2jJoJwnEjOsB950"));
// Helper functions para formatear fechas
const formatTime = (dateString)=>{
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};
const formatDate = (dateString)=>{
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const daysOfWeek = [
        'Dom',
        'Lun',
        'Mar',
        'Mié',
        'Jue',
        'Vie',
        'Sáb'
    ];
    const months = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic'
    ];
    if (diffInDays === 0) {
        return formatTime(dateString);
    } else if (diffInDays === 1) {
        return `Ayer ${formatTime(dateString)}`;
    } else if (diffInDays < 7) {
        return `${daysOfWeek[date.getDay()]} ${formatTime(dateString)}`;
    } else {
        return `${date.getDate()}/${months[date.getMonth()]} ${formatTime(dateString)}`;
    }
};
const formatConversationTime = (dateString)=>{
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const daysOfWeek = [
        'Dom',
        'Lun',
        'Mar',
        'Mié',
        'Jue',
        'Vie',
        'Sáb'
    ];
    if (diffInDays === 0) {
        return formatTime(dateString);
    } else if (diffInDays === 1) {
        return "Ayer";
    } else if (diffInDays < 7) {
        return daysOfWeek[date.getDay()];
    } else {
        return `${date.getDate()}/${date.getMonth() + 1}`;
    }
};
// Componente de mensaje individual
const MessageItem = ({ msg, currentUser, onEdit, onDelete, isEditing, editText, onSaveEdit, onCancelEdit, onSetEditText })=>{
    _s();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isOwn = msg.sender_id === currentUser?.id;
    // Cerrar menú al hacer clic fuera
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageItem.useEffect": ()=>{
            const handleClickOutside = {
                "MessageItem.useEffect.handleClickOutside": (event)=>{
                    if (menuRef.current && !menuRef.current.contains(event.target)) {
                        setMenuOpen(false);
                    }
                }
            }["MessageItem.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "MessageItem.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["MessageItem.useEffect"];
        }
    }["MessageItem.useEffect"], []);
    if (isEditing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex ${isOwn ? "justify-end" : "justify-start"} mb-2`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-xs lg:max-w-md w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-blue-50 p-3 rounded-2xl rounded-br-none border border-blue-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: editText,
                            onChange: (e)=>onSetEditText(e.target.value),
                            className: "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none",
                            rows: 3,
                            autoFocus: true,
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onSaveEdit(msg.id);
                                }
                                if (e.key === 'Escape') {
                                    onCancelEdit();
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 129,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end space-x-2 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onSaveEdit(msg.id),
                                    className: "px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors",
                                    disabled: !editText.trim(),
                                    children: "✓ Guardar"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onCancelEdit,
                                    className: "px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors",
                                    children: "✕ Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/ChatAdminTechnician.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/ChatAdminTechnician.tsx",
            lineNumber: 126,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex ${isOwn ? "justify-end" : "justify-start"} mb-2 group`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative max-w-xs lg:max-w-md",
            ref: menuRef,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `px-4 py-3 rounded-2xl ${isOwn ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-900 rounded-bl-none shadow-sm"} hover:shadow-md transition-shadow`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "break-words whitespace-pre-wrap",
                            children: msg.message
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-end mt-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs ${isOwn ? "text-blue-200" : "text-gray-400"}`,
                                children: [
                                    formatDate(msg.created_at),
                                    msg.read && isOwn && " ✓✓"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `absolute top-0 ${isOwn ? '-left-8' : '-right-8'} opacity-0 group-hover:opacity-100 transition-opacity`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMenuOpen(!menuOpen),
                            className: "p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shadow-sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 text-gray-600",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 191,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `absolute ${isOwn ? 'left-0' : 'right-0'} mt-1 bg-white shadow-lg rounded-lg py-1 z-50 w-40 border border-gray-100`,
                            children: [
                                isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        onEdit(msg);
                                        setMenuOpen(false);
                                    },
                                    className: "w-full px-4 py-2 text-left text-sm hover:bg-blue-50 flex items-center space-x-2 text-gray-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 207,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 206,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Editar"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 209,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (confirm("¿Estás seguro de eliminar este mensaje para todos?")) {
                                            onDelete(msg.id);
                                        }
                                        setMenuOpen(false);
                                    },
                                    className: "w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center space-x-2 text-red-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 224,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 223,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Eliminar para todos"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 226,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-gray-100 my-1"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setMenuOpen(false);
                                    },
                                    className: "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-gray-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 238,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 237,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Responder"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 240,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/ChatAdminTechnician.tsx",
            lineNumber: 168,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ChatAdminTechnician.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MessageItem, "m+Bw3p56aCldBbEoFNtGoL2OdKs=");
_c = MessageItem;
function ChatAdminTechnician() {
    _s1();
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [technicians, setTechnicians] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedConversation, setSelectedConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingMessage, setEditingMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editText, setEditText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSending, setIsSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [typing, setTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const conversationListRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const realtimeChannels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Cargar usuario actual
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatAdminTechnician.useEffect": ()=>{
            loadCurrentUser();
            // Limpiar canales al desmontar
            return ({
                "ChatAdminTechnician.useEffect": ()=>{
                    realtimeChannels.current.forEach({
                        "ChatAdminTechnician.useEffect": (channel)=>{
                            supabase.removeChannel(channel);
                        }
                    }["ChatAdminTechnician.useEffect"]);
                }
            })["ChatAdminTechnician.useEffect"];
        }
    }["ChatAdminTechnician.useEffect"], []);
    // Suscripción global a todas las conversaciones del usuario
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatAdminTechnician.useEffect": ()=>{
            if (!currentUser) return;
            // Limpiar canales anteriores
            realtimeChannels.current.forEach({
                "ChatAdminTechnician.useEffect": (channel)=>{
                    supabase.removeChannel(channel);
                }
            }["ChatAdminTechnician.useEffect"]);
            realtimeChannels.current = [];
            // Canal 1: Suscripción a mensajes de TODAS las conversaciones del usuario
            const messagesChannel = supabase.channel(`global-messages-${currentUser.id}`).on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "messages",
                filter: `sender_id=neq.${currentUser.id}`
            }, {
                "ChatAdminTechnician.useEffect.messagesChannel": async (payload)=>{
                    console.log("🌍 Evento global de mensaje:", payload.eventType, payload.new);
                    // Si es un INSERT, actualizar conversaciones
                    if (payload.eventType === "INSERT") {
                        const newMsg = payload.new;
                        // Si estamos viendo esta conversación, agregar mensaje
                        if (selectedConversation === newMsg.conversation_id) {
                            setMessages({
                                "ChatAdminTechnician.useEffect.messagesChannel": (prev)=>{
                                    if (prev.some({
                                        "ChatAdminTechnician.useEffect.messagesChannel": (msg)=>msg.id === newMsg.id
                                    }["ChatAdminTechnician.useEffect.messagesChannel"])) return prev;
                                    return [
                                        ...prev,
                                        newMsg
                                    ];
                                }
                            }["ChatAdminTechnician.useEffect.messagesChannel"]);
                            scrollToBottom();
                            markMessagesAsRead(newMsg.conversation_id);
                        }
                        // Recargar conversaciones para actualizar orden y contador
                        await loadConversations();
                    }
                }
            }["ChatAdminTechnician.useEffect.messagesChannel"]).subscribe();
            realtimeChannels.current.push(messagesChannel);
            // Canal 2: Suscripción a conversaciones
            const conversationsChannel = supabase.channel(`global-conversations-${currentUser.id}`).on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "conversations",
                filter: currentUser.rol === "admin" ? `admin_id=eq.${currentUser.id}` : `technician_id=eq.${currentUser.id}`
            }, {
                "ChatAdminTechnician.useEffect.conversationsChannel": async (payload)=>{
                    console.log("🔄 Evento global de conversación:", payload.eventType, payload.new);
                    // Recargar conversaciones cuando hay cambios
                    await loadConversations();
                }
            }["ChatAdminTechnician.useEffect.conversationsChannel"]).subscribe();
            realtimeChannels.current.push(conversationsChannel);
            return ({
                "ChatAdminTechnician.useEffect": ()=>{
                    supabase.removeChannel(messagesChannel);
                    supabase.removeChannel(conversationsChannel);
                }
            })["ChatAdminTechnician.useEffect"];
        }
    }["ChatAdminTechnician.useEffect"], [
        currentUser,
        selectedConversation
    ]);
    // Cargar conversaciones y técnicos cuando cambia el usuario
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatAdminTechnician.useEffect": ()=>{
            if (currentUser) {
                console.log("✅ Current user:", currentUser);
                if (currentUser.rol === "admin") {
                    loadTechnicians();
                }
                loadConversations();
            }
        }
    }["ChatAdminTechnician.useEffect"], [
        currentUser
    ]);
    // Cargar mensajes cuando se selecciona conversación
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatAdminTechnician.useEffect": ()=>{
            if (selectedConversation) {
                loadMessages(selectedConversation);
                markMessagesAsRead(selectedConversation);
                // Suscripción específica para esta conversación
                const conversationChannel = supabase.channel(`specific-conversation-${selectedConversation}`).on("postgres_changes", {
                    event: "*",
                    schema: "public",
                    table: "messages",
                    filter: `conversation_id=eq.${selectedConversation}`
                }, {
                    "ChatAdminTechnician.useEffect.conversationChannel": (payload)=>{
                        handleRealtimeMessage(payload);
                    }
                }["ChatAdminTechnician.useEffect.conversationChannel"]).subscribe();
                realtimeChannels.current.push(conversationChannel);
                return ({
                    "ChatAdminTechnician.useEffect": ()=>{
                        supabase.removeChannel(conversationChannel);
                    }
                })["ChatAdminTechnician.useEffect"];
            }
        }
    }["ChatAdminTechnician.useEffect"], [
        selectedConversation
    ]);
    // Configurar intervalo para actualizaciones periódicas
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatAdminTechnician.useEffect": ()=>{
            const interval = setInterval({
                "ChatAdminTechnician.useEffect.interval": ()=>{
                    if (currentUser) {
                        loadConversations();
                    }
                }
            }["ChatAdminTechnician.useEffect.interval"], 15000); // Actualizar cada 15 segundos
            return ({
                "ChatAdminTechnician.useEffect": ()=>clearInterval(interval)
            })["ChatAdminTechnician.useEffect"];
        }
    }["ChatAdminTechnician.useEffect"], [
        currentUser
    ]);
    const handleRealtimeMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatAdminTechnician.useCallback[handleRealtimeMessage]": (payload)=>{
            console.log("📨 Evento específico de mensaje:", payload.eventType, payload.new);
            switch(payload.eventType){
                case "INSERT":
                    setMessages({
                        "ChatAdminTechnician.useCallback[handleRealtimeMessage]": (prev)=>{
                            if (prev.some({
                                "ChatAdminTechnician.useCallback[handleRealtimeMessage]": (msg)=>msg.id === payload.new.id
                            }["ChatAdminTechnician.useCallback[handleRealtimeMessage]"])) return prev;
                            return [
                                ...prev,
                                payload.new
                            ];
                        }
                    }["ChatAdminTechnician.useCallback[handleRealtimeMessage]"]);
                    scrollToBottom();
                    break;
                case "UPDATE":
                    setMessages({
                        "ChatAdminTechnician.useCallback[handleRealtimeMessage]": (prev)=>prev.map({
                                "ChatAdminTechnician.useCallback[handleRealtimeMessage]": (msg)=>msg.id === payload.new.id ? payload.new : msg
                            }["ChatAdminTechnician.useCallback[handleRealtimeMessage]"])
                    }["ChatAdminTechnician.useCallback[handleRealtimeMessage]"]);
                    break;
                case "DELETE":
                    setMessages({
                        "ChatAdminTechnician.useCallback[handleRealtimeMessage]": (prev)=>prev.filter({
                                "ChatAdminTechnician.useCallback[handleRealtimeMessage]": (msg)=>msg.id !== payload.old.id
                            }["ChatAdminTechnician.useCallback[handleRealtimeMessage]"])
                    }["ChatAdminTechnician.useCallback[handleRealtimeMessage]"]);
                    break;
            }
        }
    }["ChatAdminTechnician.useCallback[handleRealtimeMessage]"], []);
    // Detectar cuando el usuario está escribiendo
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatAdminTechnician.useEffect": ()=>{
            const typingTimeout = setTimeout({
                "ChatAdminTechnician.useEffect.typingTimeout": ()=>{
                    setTyping(false);
                }
            }["ChatAdminTechnician.useEffect.typingTimeout"], 1500);
            return ({
                "ChatAdminTechnician.useEffect": ()=>clearTimeout(typingTimeout)
            })["ChatAdminTechnician.useEffect"];
        }
    }["ChatAdminTechnician.useEffect"], [
        newMessage
    ]);
    const scrollToBottom = ()=>{
        setTimeout(()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }, 100);
    };
    const scrollConversationToTop = ()=>{
        if (conversationListRef.current) {
            conversationListRef.current.scrollTop = 0;
        }
    };
    const loadCurrentUser = async ()=>{
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                setError("❌ No hay usuario autenticado");
                setLoading(false);
                return;
            }
            let { data: usuario, error: usuarioError } = await supabase.from("usuarios").select("*").eq("id", user.id).maybeSingle();
            if (!usuario) {
                console.log("⚠️ Usuario no existe en tabla usuarios, creando...");
                const { data: nuevoUsuario, error: insertError } = await supabase.from("usuarios").insert({
                    id: user.id,
                    email: user.email,
                    nombre: user.email?.split('@')[0] || 'Usuario',
                    rol: 'tecnico',
                    activo: true
                }).select().single();
                if (insertError) {
                    console.error("❌ Error creando usuario:", insertError);
                    setError("No se pudo crear el usuario en la base de datos. Error: " + insertError.message);
                    setLoading(false);
                    return;
                }
                usuario = nuevoUsuario;
            }
            setCurrentUser(usuario);
            setLoading(false);
        } catch (err) {
            console.error("❌ Error:", err);
            setError("Error general: " + err.message);
            setLoading(false);
        }
    };
    const loadTechnicians = async ()=>{
        try {
            const { data, error } = await supabase.from("usuarios").select("*").eq("rol", "tecnico").order("nombre", {
                ascending: true
            });
            if (error) throw error;
            setTechnicians(data || []);
        } catch (err) {
            console.error("❌ Error cargando técnicos:", err);
        }
    };
    const loadConversations = async ()=>{
        if (!currentUser) return;
        try {
            let query;
            if (currentUser.rol === "admin") {
                query = supabase.from("conversations").select("*").eq("admin_id", currentUser.id).order("updated_at", {
                    ascending: false
                });
            } else {
                query = supabase.from("conversations").select("*").eq("technician_id", currentUser.id).order("updated_at", {
                    ascending: false
                });
            }
            const { data, error } = await query;
            if (error) throw error;
            if (data && data.length > 0) {
                const conversationsWithNames = await Promise.all(data.map(async (conv)=>{
                    const otherId = currentUser.rol === "admin" ? conv.technician_id : conv.admin_id;
                    const { data: otherUser } = await supabase.from("usuarios").select("nombre, email").eq("id", otherId).single();
                    // Calcular mensajes no leídos
                    const { count } = await supabase.from("messages").select("*", {
                        count: "exact",
                        head: true
                    }).eq("conversation_id", conv.id).neq("sender_id", currentUser.id).eq("read", false);
                    return {
                        ...conv,
                        other_user_name: otherUser?.nombre || otherUser?.email || "Usuario",
                        unread_count: count || 0
                    };
                }));
                setConversations(conversationsWithNames);
            } else {
                setConversations([]);
            }
        } catch (err) {
            console.error("❌ Error cargando conversaciones:", err);
        }
    };
    const loadMessages = async (conversationId)=>{
        try {
            const { data, error } = await supabase.from("messages").select("*").eq("conversation_id", conversationId).order("created_at", {
                ascending: true
            });
            if (error) throw error;
            setMessages(data || []);
            setTimeout(scrollToBottom, 100);
        } catch (err) {
            console.error("❌ Error cargando mensajes:", err);
        }
    };
    const markMessagesAsRead = async (conversationId)=>{
        if (!currentUser) return;
        try {
            await supabase.from("messages").update({
                read: true
            }).eq("conversation_id", conversationId).neq("sender_id", currentUser.id).eq("read", false);
            // Actualizar contador en conversaciones
            setConversations((prev)=>prev.map((conv)=>conv.id === conversationId ? {
                        ...conv,
                        unread_count: 0
                    } : conv));
        } catch (err) {
            console.error("❌ Error marcando mensajes como leídos:", err);
        }
    };
    const startConversation = async (technicianId)=>{
        if (!currentUser) return;
        try {
            const { data: existing, error: searchError } = await supabase.from("conversations").select("*").eq("admin_id", currentUser.id).eq("technician_id", technicianId).maybeSingle();
            if (searchError) throw searchError;
            if (existing) {
                setSelectedConversation(existing.id);
                return;
            }
            const { data: newConv, error: insertError } = await supabase.from("conversations").insert({
                admin_id: currentUser.id,
                technician_id: technicianId,
                last_message: ""
            }).select().single();
            if (insertError) throw insertError;
            if (newConv) {
                await loadConversations();
                setSelectedConversation(newConv.id);
                scrollConversationToTop();
            }
        } catch (err) {
            console.error("❌ Error creando conversación:", err);
            setError("Error al crear conversación: " + err.message);
        }
    };
    const sendMessage = async (e)=>{
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation || !currentUser || isSending) return;
        setIsSending(true);
        const messageToSend = newMessage.trim();
        const senderType = currentUser.rol === "admin" ? "admin" : "tecnico";
        try {
            // Enviar mensaje
            const { error } = await supabase.from("messages").insert({
                conversation_id: selectedConversation,
                sender_id: currentUser.id,
                sender_type: senderType,
                message: messageToSend
            });
            if (error) throw error;
            // Actualizar conversación
            await supabase.from("conversations").update({
                last_message: messageToSend,
                updated_at: new Date().toISOString()
            }).eq("id", selectedConversation);
            // Actualizar UI inmediatamente
            setNewMessage("");
            setTyping(false);
            // Forzar recarga de conversaciones para actualizar orden
            await loadConversations();
        } catch (err) {
            console.error("❌ Error enviando mensaje:", err);
            alert("Error al enviar mensaje: " + err.message);
        } finally{
            setIsSending(false);
        }
    };
    const deleteMessage = async (messageId)=>{
        try {
            const { error } = await supabase.from("messages").delete().eq("id", messageId);
            if (error) throw error;
            console.log("✅ Mensaje eliminado para todos");
        } catch (err) {
            console.error("❌ Error eliminando mensaje:", err);
            alert("Error al eliminar mensaje: " + err.message);
        }
    };
    const startEdit = (message)=>{
        setEditingMessage(message.id);
        setEditText(message.message);
    };
    const saveEdit = async (messageId)=>{
        if (!editText.trim()) return;
        try {
            const { error } = await supabase.from("messages").update({
                message: editText.trim()
            }).eq("id", messageId);
            if (error) throw error;
            setEditingMessage(null);
            setEditText("");
        } catch (err) {
            console.error("❌ Error editando mensaje:", err);
            alert("Error al editar mensaje: " + err.message);
        }
    };
    const cancelEdit = ()=>{
        setEditingMessage(null);
        setEditText("");
    };
    const handleTyping = (e)=>{
        setNewMessage(e.target.value);
        setTyping(true);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                        lineNumber: 754,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 font-medium",
                        children: "Cargando chat..."
                    }, void 0, false, {
                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                        lineNumber: 755,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatAdminTechnician.tsx",
                lineNumber: 753,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ChatAdminTechnician.tsx",
            lineNumber: 752,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-md w-full bg-white rounded-2xl shadow-xl p-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-3xl",
                                children: "⚠️"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 767,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 766,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-red-600 mb-2",
                            children: "Error"
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 769,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700 mb-6",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 770,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.location.reload(),
                            className: "w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium",
                            children: "Recargar página"
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 771,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                    lineNumber: 765,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ChatAdminTechnician.tsx",
                lineNumber: 764,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ChatAdminTechnician.tsx",
            lineNumber: 763,
            columnNumber: 7
        }, this);
    }
    if (!currentUser) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center bg-white p-10 rounded-2xl shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-4xl",
                            children: "🔒"
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 788,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                        lineNumber: 787,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-2",
                        children: "No autenticado"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                        lineNumber: 790,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-6",
                        children: "Por favor inicia sesión"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                        lineNumber: 791,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.href = "/login",
                        className: "px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all",
                        children: "Ir a login"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                        lineNumber: 792,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatAdminTechnician.tsx",
                lineNumber: 786,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ChatAdminTechnician.tsx",
            lineNumber: 785,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-gradient-to-br from-gray-50 to-blue-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-80 bg-white border-r border-gray-200 flex flex-col shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-white",
                                        children: "💬 Mensajes"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 809,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: loadConversations,
                                        className: "p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors",
                                        title: "Actualizar conversaciones",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5 text-white",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 816,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 815,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 810,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 808,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-blue-100 mb-2",
                                children: currentUser?.rol === "admin" ? "Chat con Técnicos" : "Chat con Admin"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 820,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 bg-white/20 rounded-full flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white font-bold text-sm",
                                            children: currentUser.nombre?.charAt(0).toUpperCase()
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 825,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 824,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-white",
                                        children: currentUser.nombre
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 829,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2 py-0.5 bg-white/30 text-xs text-white rounded-full",
                                        children: currentUser.rol
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 830,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 823,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                        lineNumber: 807,
                        columnNumber: 9
                    }, this),
                    currentUser?.rol === "admin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-gray-200",
                        children: technicians.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center p-3 bg-yellow-50 rounded-xl border border-yellow-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-yellow-700 font-medium",
                                children: "⚠️ No hay técnicos disponibles"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 840,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 839,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            onChange: (e)=>{
                                if (e.target.value) startConversation(e.target.value);
                            },
                            value: "",
                            className: "w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white hover:border-gray-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "➕ Nueva conversación"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 850,
                                    columnNumber: 17
                                }, this),
                                technicians.map((tech)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: tech.id,
                                        children: [
                                            "👨‍🔧 ",
                                            tech.nombre
                                        ]
                                    }, tech.id, true, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 852,
                                        columnNumber: 19
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 843,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                        lineNumber: 837,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto",
                        ref: conversationListRef,
                        children: conversations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-3xl",
                                        children: "💬"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 865,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 864,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-gray-700 mb-2",
                                    children: "No hay conversaciones"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 867,
                                    columnNumber: 15
                                }, this),
                                currentUser.rol === "admin" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: "Selecciona un técnico arriba"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 869,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: "Espera a que el admin te contacte"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 871,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 863,
                            columnNumber: 13
                        }, this) : conversations.map((conv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelectedConversation(conv.id),
                                className: `p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 active:bg-gray-100
                  ${selectedConversation === conv.id ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500" : ""}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg",
                                                    children: conv.other_user_name?.charAt(0).toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                    lineNumber: 886,
                                                    columnNumber: 21
                                                }, this),
                                                conv.unread_count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold text-white",
                                                        children: conv.unread_count
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                        lineNumber: 891,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                    lineNumber: 890,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 885,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-semibold text-gray-900 truncate",
                                                            children: conv.other_user_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                            lineNumber: 897,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-400 whitespace-nowrap",
                                                            children: formatConversationTime(conv.updated_at)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                            lineNumber: 900,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                    lineNumber: 896,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500 truncate mt-1",
                                                    children: conv.last_message || "Sin mensajes"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                    lineNumber: 904,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 895,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 884,
                                    columnNumber: 17
                                }, this)
                            }, conv.id, false, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 876,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                        lineNumber: 861,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatAdminTechnician.tsx",
                lineNumber: 806,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col",
                children: selectedConversation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-white border-b border-gray-200 shadow-sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg",
                                                        children: conversations.find((c)=>c.id === selectedConversation)?.other_user_name?.charAt(0).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                        lineNumber: 923,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                        lineNumber: 929,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 922,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-gray-900 text-lg",
                                                        children: conversations.find((c)=>c.id === selectedConversation)?.other_user_name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                        lineNumber: 932,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-green-600 font-medium flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                                lineNumber: 936,
                                                                columnNumber: 23
                                                            }, this),
                                                            "En línea • Activo ahora"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                        lineNumber: 935,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 931,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 921,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            typing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm animate-pulse",
                                                children: "Escribiendo..."
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 943,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>loadMessages(selectedConversation),
                                                className: "p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors",
                                                title: "Actualizar mensajes",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                        lineNumber: 953,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                    lineNumber: 952,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 947,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 941,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 920,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 919,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-blue-50",
                            children: messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center h-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-4xl",
                                                children: "👋"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 965,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 964,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-gray-700 mb-2",
                                            children: "¡Inicia la conversación!"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 967,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500",
                                            children: "Envía tu primer mensaje"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 968,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 963,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 962,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageItem, {
                                            msg: msg,
                                            currentUser: currentUser,
                                            onEdit: startEdit,
                                            onDelete: deleteMessage,
                                            isEditing: editingMessage === msg.id,
                                            editText: editText,
                                            onSaveEdit: saveEdit,
                                            onCancelEdit: cancelEdit,
                                            onSetEditText: setEditText
                                        }, msg.id, false, {
                                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                                            lineNumber: 974,
                                            columnNumber: 21
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: messagesEndRef
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 987,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 972,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 960,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: sendMessage,
                            className: "p-4 bg-white border-t border-gray-200 shadow-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: newMessage,
                                        onChange: handleTyping,
                                        placeholder: "Escribe un mensaje...",
                                        className: "flex-1 p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all",
                                        disabled: isSending
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 994,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: !newMessage.trim() || isSending,
                                        className: "px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center space-x-2",
                                        children: isSending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                    lineNumber: 1009,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Enviando..."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                    lineNumber: 1010,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Enviar"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                    lineNumber: 1014,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                        lineNumber: 1016,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                    lineNumber: 1015,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 1002,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 993,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ChatAdminTechnician.tsx",
                            lineNumber: 992,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-6xl",
                                    children: "💬"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                                    lineNumber: 1028,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 1027,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl font-bold text-gray-900 mb-4",
                                children: "Bienvenido al chat"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 1030,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 text-lg mb-8",
                                children: currentUser.rol === "admin" ? "Selecciona un técnico para empezar a conversar" : "Espera a que el administrador inicie una conversación contigo"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 1033,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-white rounded-xl shadow-sm border border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl mb-2",
                                                children: "🚀"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 1040,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium",
                                                children: "Chat en tiempo real"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 1041,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 1039,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-white rounded-xl shadow-sm border border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl mb-2",
                                                children: "📱"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 1044,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium",
                                                children: "Responsive design"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 1045,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 1043,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-white rounded-xl shadow-sm border border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl mb-2",
                                                children: "🔔"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 1048,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium",
                                                children: "Notificaciones"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 1049,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 1047,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-white rounded-xl shadow-sm border border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl mb-2",
                                                children: "✏️"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 1052,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium",
                                                children: "Editar mensajes"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                                lineNumber: 1053,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                                        lineNumber: 1051,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatAdminTechnician.tsx",
                                lineNumber: 1038,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatAdminTechnician.tsx",
                        lineNumber: 1026,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ChatAdminTechnician.tsx",
                    lineNumber: 1025,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ChatAdminTechnician.tsx",
                lineNumber: 916,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatAdminTechnician.tsx",
        lineNumber: 804,
        columnNumber: 5
    }, this);
}
_s1(ChatAdminTechnician, "+RazOEIt6KJ7ZuD2ZdRs7dgs7JI=");
_c1 = ChatAdminTechnician;
var _c, _c1;
__turbopack_context__.k.register(_c, "MessageItem");
__turbopack_context__.k.register(_c1, "ChatAdminTechnician");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_ChatAdminTechnician_tsx_4b51b638._.js.map