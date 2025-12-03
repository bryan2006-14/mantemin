(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/chat/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://aysoiacdxglzsuhtrfnp.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5c29pYWNkeGdsenN1aHRyZm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NDk2MjIsImV4cCI6MjA4MDAyNTYyMn0.5agJq8Jn_o2Mdwylq7LOHO0B8TAw2jJoJwnEjOsB950"));
function ChatAdminTechnician() {
    _s();
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [technicians, setTechnicians] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedConversation, setSelectedConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Cargar usuario actual
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatAdminTechnician.useEffect": ()=>{
            loadCurrentUser();
        }
    }["ChatAdminTechnician.useEffect"], []);
    // Cargar conversaciones y técnicos
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
            }
        }
    }["ChatAdminTechnician.useEffect"], [
        selectedConversation
    ]);
    // Suscripción en tiempo real a mensajes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatAdminTechnician.useEffect": ()=>{
            if (selectedConversation) {
                const channel = supabase.channel(`messages:${selectedConversation}`).on("postgres_changes", {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                    filter: `conversation_id=eq.${selectedConversation}`
                }, {
                    "ChatAdminTechnician.useEffect.channel": (payload)=>{
                        console.log("📩 Nuevo mensaje recibido:", payload.new);
                        setMessages({
                            "ChatAdminTechnician.useEffect.channel": (prev)=>[
                                    ...prev,
                                    payload.new
                                ]
                        }["ChatAdminTechnician.useEffect.channel"]);
                        scrollToBottom();
                    }
                }["ChatAdminTechnician.useEffect.channel"]).subscribe();
                return ({
                    "ChatAdminTechnician.useEffect": ()=>{
                        supabase.removeChannel(channel);
                    }
                })["ChatAdminTechnician.useEffect"];
            }
        }
    }["ChatAdminTechnician.useEffect"], [
        selectedConversation
    ]);
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatAdminTechnician.useEffect": ()=>{
            scrollToBottom();
        }
    }["ChatAdminTechnician.useEffect"], [
        messages
    ]);
    const loadCurrentUser = async ()=>{
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                setError("❌ No hay usuario autenticado");
                setLoading(false);
                return;
            }
            console.log("🔐 Auth user:", user.id);
            // Buscar en tabla usuarios
            const { data: usuario, error: usuarioError } = await supabase.from("usuarios").select("*").eq("id", user.id).single();
            if (usuarioError || !usuario) {
                console.error("❌ Error loading usuario:", usuarioError);
                setError("No se encontró el usuario en la base de datos");
                setLoading(false);
                return;
            }
            console.log("✅ Usuario cargado:", usuario);
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
            console.log("🔧 Cargando técnicos...");
            const { data, error } = await supabase.from("usuarios").select("*").eq("rol", "tecnico");
            if (error) {
                console.error("❌ Error loading technicians:", error);
                return;
            }
            console.log("✅ Técnicos cargados:", data?.length || 0);
            if (data) {
                setTechnicians(data);
            }
        } catch (err) {
            console.error("❌ Error:", err);
        }
    };
    const loadConversations = async ()=>{
        if (!currentUser) return;
        try {
            console.log("💬 Cargando conversaciones para:", currentUser.rol);
            let query;
            if (currentUser.rol === "admin") {
                query = supabase.from("conversations").select("*").eq("admin_id", currentUser.id);
            } else {
                query = supabase.from("conversations").select("*").eq("technician_id", currentUser.id);
            }
            const { data, error } = await query;
            if (error) {
                console.error("❌ Error loading conversations:", error);
                return;
            }
            console.log("✅ Conversaciones encontradas:", data?.length || 0);
            if (data && data.length > 0) {
                // Cargar nombres del otro usuario
                const conversationsWithNames = await Promise.all(data.map(async (conv)=>{
                    const otherId = currentUser.rol === "admin" ? conv.technician_id : conv.admin_id;
                    const { data: otherUser } = await supabase.from("usuarios").select("nombre, email").eq("id", otherId).single();
                    return {
                        ...conv,
                        other_user_name: otherUser?.nombre || otherUser?.email || "Usuario"
                    };
                }));
                setConversations(conversationsWithNames);
            } else {
                setConversations([]);
            }
        } catch (err) {
            console.error("❌ Error:", err);
        }
    };
    const loadMessages = async (conversationId)=>{
        try {
            console.log("📨 Cargando mensajes de conversación:", conversationId);
            const { data, error } = await supabase.from("messages").select("*").eq("conversation_id", conversationId).order("created_at", {
                ascending: true
            });
            if (error) {
                console.error("❌ Error loading messages:", error);
                return;
            }
            console.log("✅ Mensajes cargados:", data?.length || 0);
            if (data) setMessages(data);
        } catch (err) {
            console.error("❌ Error:", err);
        }
    };
    const markMessagesAsRead = async (conversationId)=>{
        if (!currentUser) return;
        const senderType = currentUser.rol === "admin" ? "admin" : "technician";
        await supabase.from("messages").update({
            read: true
        }).eq("conversation_id", conversationId).neq("sender_type", senderType);
    };
    const startConversation = async (technicianId)=>{
        if (!currentUser) return;
        try {
            console.log("🆕 Iniciando conversación con técnico:", technicianId);
            // Verificar si ya existe conversación
            const { data: existing, error: searchError } = await supabase.from("conversations").select("*").eq("admin_id", currentUser.id).eq("technician_id", technicianId).maybeSingle();
            if (searchError) {
                console.error("❌ Error buscando conversación:", searchError);
                return;
            }
            if (existing) {
                console.log("✅ Conversación ya existe:", existing.id);
                setSelectedConversation(existing.id);
                return;
            }
            // Crear nueva conversación
            console.log("🆕 Creando nueva conversación...");
            const { data: newConv, error: insertError } = await supabase.from("conversations").insert({
                admin_id: currentUser.id,
                technician_id: technicianId,
                last_message: ""
            }).select().single();
            if (insertError) {
                console.error("❌ Error creando conversación:", insertError);
                setError("Error al crear conversación: " + insertError.message);
                return;
            }
            console.log("✅ Conversación creada:", newConv.id);
            if (newConv) {
                loadConversations();
                setSelectedConversation(newConv.id);
            }
        } catch (err) {
            console.error("❌ Error:", err);
            setError("Error: " + err.message);
        }
    };
    const sendMessage = async (e)=>{
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation || !currentUser) return;
        const senderType = currentUser.rol === "admin" ? "admin" : "technician";
        console.log("📤 Enviando mensaje...", {
            senderType,
            sender_id: currentUser.id
        });
        const { error } = await supabase.from("messages").insert({
            conversation_id: selectedConversation,
            sender_id: currentUser.id,
            sender_type: senderType,
            message: newMessage.trim()
        });
        if (error) {
            console.error("❌ Error enviando mensaje:", error);
            setError("Error al enviar mensaje: " + error.message);
            return;
        }
        console.log("✅ Mensaje enviado");
        // Actualizar última mensaje en conversación
        await supabase.from("conversations").update({
            last_message: newMessage.trim(),
            updated_at: new Date().toISOString()
        }).eq("id", selectedConversation);
        setNewMessage("");
        loadConversations();
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-gray-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 341,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Cargando chat..."
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 342,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/chat/page.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/admin/chat/page.tsx",
            lineNumber: 339,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-gray-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-md w-full bg-white rounded-lg shadow-lg p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-6xl",
                            children: "⚠️"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/chat/page.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 352,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-red-600 mb-4",
                        children: "Error"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 355,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-700 mb-4",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
                        children: "Recargar página"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/chat/page.tsx",
                lineNumber: 351,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/admin/chat/page.tsx",
            lineNumber: 350,
            columnNumber: 7
        }, this);
    }
    if (!currentUser) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-gray-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center bg-white p-8 rounded-lg shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-6xl mb-4 block",
                        children: "🔒"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 372,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-2",
                        children: "No autenticado"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 373,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Por favor inicia sesión"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 374,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/chat/page.tsx",
                lineNumber: 371,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/admin/chat/page.tsx",
            lineNumber: 370,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-80 bg-white border-r border-gray-200 flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-white",
                                children: "💬 Mensajes"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/chat/page.tsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-blue-100",
                                children: currentUser?.rol === "admin" ? "Chat con Técnicos" : "Chat con Admin"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/chat/page.tsx",
                                lineNumber: 386,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-blue-200 mt-1",
                                children: [
                                    "👤 ",
                                    currentUser.nombre
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/chat/page.tsx",
                                lineNumber: 389,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this),
                    currentUser?.rol === "admin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-gray-200",
                        children: technicians.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center p-4 bg-yellow-50 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-yellow-700",
                                children: "⚠️ No hay técnicos disponibles"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/chat/page.tsx",
                                lineNumber: 399,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/chat/page.tsx",
                            lineNumber: 398,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            onChange: (e)=>{
                                if (e.target.value) startConversation(e.target.value);
                            },
                            value: "",
                            className: "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: [
                                        "➕ Nueva conversación (",
                                        technicians.length,
                                        " técnicos)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/chat/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 17
                                }, this),
                                technicians.map((tech)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: tech.id,
                                        children: tech.nombre
                                    }, tech.id, false, {
                                        fileName: "[project]/app/admin/chat/page.tsx",
                                        lineNumber: 411,
                                        columnNumber: 19
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/chat/page.tsx",
                            lineNumber: 402,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 396,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto",
                        children: conversations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 text-center text-gray-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-4xl mb-2",
                                    children: "💬"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/chat/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold",
                                    children: "No hay conversaciones"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/chat/page.tsx",
                                    lineNumber: 425,
                                    columnNumber: 15
                                }, this),
                                currentUser.rol === "admin" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mt-2",
                                    children: "Selecciona un técnico arriba"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/chat/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mt-2",
                                    children: "Espera a que el admin te contacte"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/chat/page.tsx",
                                    lineNumber: 429,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/chat/page.tsx",
                            lineNumber: 423,
                            columnNumber: 13
                        }, this) : conversations.map((conv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelectedConversation(conv.id),
                                className: `p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition ${selectedConversation === conv.id ? "bg-blue-50 border-l-4 border-l-blue-600" : ""}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg",
                                            children: conv.other_user_name?.charAt(0).toUpperCase()
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/chat/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-semibold text-gray-900 truncate",
                                                    children: conv.other_user_name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/chat/page.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500 truncate",
                                                    children: conv.last_message || "Sin mensajes"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/chat/page.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/chat/page.tsx",
                                            lineNumber: 445,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/chat/page.tsx",
                                    lineNumber: 441,
                                    columnNumber: 17
                                }, this)
                            }, conv.id, false, {
                                fileName: "[project]/app/admin/chat/page.tsx",
                                lineNumber: 434,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/chat/page.tsx",
                lineNumber: 383,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col",
                children: selectedConversation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-white border-b border-gray-200 shadow-sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold",
                                        children: conversations.find((c)=>c.id === selectedConversation)?.other_user_name?.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/chat/page.tsx",
                                        lineNumber: 467,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-gray-900",
                                                children: conversations.find((c)=>c.id === selectedConversation)?.other_user_name
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/chat/page.tsx",
                                                lineNumber: 474,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-green-500 flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/chat/page.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 21
                                                    }, this),
                                                    "En línea"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/chat/page.tsx",
                                                lineNumber: 477,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/chat/page.tsx",
                                        lineNumber: 473,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/chat/page.tsx",
                                lineNumber: 466,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/chat/page.tsx",
                            lineNumber: 465,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50",
                            children: [
                                messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center h-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center text-gray-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-4xl mb-2",
                                                children: "👋"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/chat/page.tsx",
                                                lineNumber: 490,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "¡Inicia la conversación!"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/chat/page.tsx",
                                                lineNumber: 491,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/chat/page.tsx",
                                        lineNumber: 489,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/chat/page.tsx",
                                    lineNumber: 488,
                                    columnNumber: 17
                                }, this) : messages.map((msg)=>{
                                    const isOwn = msg.sender_id === currentUser?.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex ${isOwn ? "justify-end" : "justify-start"}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isOwn ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-900 rounded-bl-none shadow"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "break-words",
                                                    children: msg.message
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/chat/page.tsx",
                                                    lineNumber: 509,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `text-xs mt-1 ${isOwn ? "text-blue-200" : "text-gray-400"}`,
                                                    children: new Date(msg.created_at).toLocaleTimeString("es-PE", {
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/chat/page.tsx",
                                                    lineNumber: 510,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/chat/page.tsx",
                                            lineNumber: 502,
                                            columnNumber: 23
                                        }, this)
                                    }, msg.id, false, {
                                        fileName: "[project]/app/admin/chat/page.tsx",
                                        lineNumber: 498,
                                        columnNumber: 21
                                    }, this);
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: messagesEndRef
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/chat/page.tsx",
                                    lineNumber: 525,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/chat/page.tsx",
                            lineNumber: 486,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: sendMessage,
                            className: "p-4 bg-white border-t border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: newMessage,
                                        onChange: (e)=>setNewMessage(e.target.value),
                                        placeholder: "Escribe un mensaje...",
                                        className: "flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/chat/page.tsx",
                                        lineNumber: 531,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: !newMessage.trim(),
                                        className: "px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-bold",
                                        children: "Enviar 🚀"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/chat/page.tsx",
                                        lineNumber: 538,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/chat/page.tsx",
                                lineNumber: 530,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/chat/page.tsx",
                            lineNumber: 529,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex items-center justify-center bg-gray-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mb-4",
                                children: "💬"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/chat/page.tsx",
                                lineNumber: 551,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-gray-900 mb-2",
                                children: "Selecciona una conversación"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/chat/page.tsx",
                                lineNumber: 552,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500",
                                children: currentUser.rol === "admin" ? "Elige un técnico para empezar a chatear" : "Espera a que el administrador inicie una conversación"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/chat/page.tsx",
                                lineNumber: 555,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/chat/page.tsx",
                        lineNumber: 550,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/chat/page.tsx",
                    lineNumber: 549,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/chat/page.tsx",
                lineNumber: 461,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/chat/page.tsx",
        lineNumber: 381,
        columnNumber: 5
    }, this);
}
_s(ChatAdminTechnician, "evk1FZ6HAe1/WnpGR8YuOap1PEU=");
_c = ChatAdminTechnician;
var _c;
__turbopack_context__.k.register(_c, "ChatAdminTechnician");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_admin_chat_page_tsx_ecae8f24._.js.map