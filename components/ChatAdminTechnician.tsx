"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { RealtimeChannel } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_type: string;
  message: string;
  created_at: string;
  read: boolean;
}

interface Conversation {
  id: string;
  admin_id: string;
  technician_id: string;
  last_message: string;
  updated_at: string;
  other_user_name?: string;
  unread_count: number;
}

interface Usuario {
  id: string;
  email: string;
  nombre: string;
  rol: string;
}

// Helper functions para formatear fechas
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-PE', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
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

const formatConversationTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
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
const MessageItem = ({ 
  msg, 
  currentUser, 
  onEdit, 
  onDelete,
  isEditing,
  editText,
  onSaveEdit,
  onCancelEdit,
  onSetEditText
}: {
  msg: Message;
  currentUser: Usuario | null;
  onEdit: (msg: Message) => void;
  onDelete: (messageId: string) => void;
  isEditing: boolean;
  editText: string;
  onSaveEdit: (messageId: string) => void;
  onCancelEdit: () => void;
  onSetEditText: (text: string) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isOwn = msg.sender_id === currentUser?.id;

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isEditing) {
    return (
      <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
        <div className="max-w-xs lg:max-w-md w-full">
          <div className="bg-blue-50 p-3 rounded-2xl rounded-br-none border border-blue-100">
            <textarea
              value={editText}
              onChange={(e) => onSetEditText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              rows={3}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSaveEdit(msg.id);
                }
                if (e.key === 'Escape') {
                  onCancelEdit();
                }
              }}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => onSaveEdit(msg.id)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                disabled={!editText.trim()}
              >
                ✓ Guardar
              </button>
              <button
                onClick={onCancelEdit}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
              >
                ✕ Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2 group`}>
      <div className="relative max-w-xs lg:max-w-md" ref={menuRef}>
        <div
          className={`px-4 py-3 rounded-2xl ${isOwn
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-gray-900 rounded-bl-none shadow-sm"
            } hover:shadow-md transition-shadow`}
        >
          <p className="break-words whitespace-pre-wrap">{msg.message}</p>
          <div className="flex items-center justify-end mt-1">
            <span className={`text-xs ${isOwn ? "text-blue-200" : "text-gray-400"}`}>
              {formatDate(msg.created_at)}
              {msg.read && isOwn && " ✓✓"}
            </span>
          </div>
        </div>

        {/* Botón de opciones - disponible para todos los mensajes */}
        <div className={`absolute top-0 ${isOwn ? '-left-8' : '-right-8'} opacity-0 group-hover:opacity-100 transition-opacity`}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {menuOpen && (
            <div className={`absolute ${isOwn ? 'left-0' : 'right-0'} mt-1 bg-white shadow-lg rounded-lg py-1 z-50 w-40 border border-gray-100`}>
              {/* Solo el remitente puede editar */}
              {isOwn && (
                <button
                  onClick={() => {
                    onEdit(msg);
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 flex items-center space-x-2 text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Editar</span>
                </button>
              )}
              
              {/* Todos pueden eliminar */}
              <button
                onClick={() => {
                  if (confirm("¿Estás seguro de eliminar este mensaje para todos?")) {
                    onDelete(msg.id);
                  }
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center space-x-2 text-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Eliminar para todos</span>
              </button>
              
              {/* Opción de responder/citar mensaje */}
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-gray-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span>Responder</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ChatAdminTechnician() {
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [technicians, setTechnicians] = useState<Usuario[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationListRef = useRef<HTMLDivElement>(null);
  const realtimeChannels = useRef<RealtimeChannel[]>([]);

  // Cargar usuario actual
  useEffect(() => {
    loadCurrentUser();

    // Limpiar canales al desmontar
    return () => {
      realtimeChannels.current.forEach(channel => {
        supabase.removeChannel(channel);
      });
    };
  }, []);

  // Suscripción global a todas las conversaciones del usuario
  useEffect(() => {
    if (!currentUser) return;

    // Limpiar canales anteriores
    realtimeChannels.current.forEach(channel => {
      supabase.removeChannel(channel);
    });
    realtimeChannels.current = [];

    // Canal 1: Suscripción a mensajes de TODAS las conversaciones del usuario
    const messagesChannel = supabase
      .channel(`global-messages-${currentUser.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `sender_id=neq.${currentUser.id}`, // Solo mensajes de otros
        },
        async (payload) => {
          console.log("🌍 Evento global de mensaje:", payload.eventType, payload.new);
          
          // Si es un INSERT, actualizar conversaciones
          if (payload.eventType === "INSERT") {
            const newMsg = payload.new as Message;
            
            // Si estamos viendo esta conversación, agregar mensaje
            if (selectedConversation === newMsg.conversation_id) {
              setMessages(prev => {
                if (prev.some(msg => msg.id === newMsg.id)) return prev;
                return [...prev, newMsg];
              });
              scrollToBottom();
              markMessagesAsRead(newMsg.conversation_id);
            }
            
            // Recargar conversaciones para actualizar orden y contador
            await loadConversations();
          }
        }
      )
      .subscribe();

    realtimeChannels.current.push(messagesChannel);

    // Canal 2: Suscripción a conversaciones
    const conversationsChannel = supabase
      .channel(`global-conversations-${currentUser.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: currentUser.rol === "admin" 
            ? `admin_id=eq.${currentUser.id}` 
            : `technician_id=eq.${currentUser.id}`,
        },
        async (payload) => {
          console.log("🔄 Evento global de conversación:", payload.eventType, payload.new);
          
          // Recargar conversaciones cuando hay cambios
          await loadConversations();
        }
      )
      .subscribe();

    realtimeChannels.current.push(conversationsChannel);

    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(conversationsChannel);
    };
  }, [currentUser, selectedConversation]);

  // Cargar conversaciones y técnicos cuando cambia el usuario
  useEffect(() => {
    if (currentUser) {
      console.log("✅ Current user:", currentUser);
      if (currentUser.rol === "admin") {
        loadTechnicians();
      }
      loadConversations();
    }
  }, [currentUser]);

  // Cargar mensajes cuando se selecciona conversación
  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
      markMessagesAsRead(selectedConversation);
      
      // Suscripción específica para esta conversación
      const conversationChannel = supabase
        .channel(`specific-conversation-${selectedConversation}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${selectedConversation}`,
          },
          (payload) => {
            handleRealtimeMessage(payload);
          }
        )
        .subscribe();

      realtimeChannels.current.push(conversationChannel);

      return () => {
        supabase.removeChannel(conversationChannel);
      };
    }
  }, [selectedConversation]);

  // Configurar intervalo para actualizaciones periódicas
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentUser) {
        loadConversations();
      }
    }, 15000); // Actualizar cada 15 segundos

    return () => clearInterval(interval);
  }, [currentUser]);

  const handleRealtimeMessage = useCallback((payload: any) => {
    console.log("📨 Evento específico de mensaje:", payload.eventType, payload.new);
    
    switch (payload.eventType) {
      case "INSERT":
        setMessages(prev => {
          if (prev.some(msg => msg.id === payload.new.id)) return prev;
          return [...prev, payload.new as Message];
        });
        scrollToBottom();
        break;
        
      case "UPDATE":
        setMessages(prev =>
          prev.map(msg => (msg.id === payload.new.id ? payload.new as Message : msg))
        );
        break;
        
      case "DELETE":
        setMessages(prev => prev.filter(msg => msg.id !== payload.old.id));
        break;
    }
  }, []);

  // Detectar cuando el usuario está escribiendo
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setTyping(false);
    }, 1500);

    return () => clearTimeout(typingTimeout);
  }, [newMessage]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const scrollConversationToTop = () => {
    if (conversationListRef.current) {
      conversationListRef.current.scrollTop = 0;
    }
  };

  const loadCurrentUser = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        setError("❌ No hay usuario autenticado");
        setLoading(false);
        return;
      }

      let { data: usuario, error: usuarioError } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      
      if (!usuario) {
        console.log("⚠️ Usuario no existe en tabla usuarios, creando...");
        
        const { data: nuevoUsuario, error: insertError } = await supabase
          .from("usuarios")
          .insert({
            id: user.id,
            email: user.email,
            nombre: user.email?.split('@')[0] || 'Usuario',
            rol: 'tecnico',
            activo: true
          })
          .select()
          .single();

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
    } catch (err: any) {
      console.error("❌ Error:", err);
      setError("Error general: " + err.message);
      setLoading(false);
    }
  };

  const loadTechnicians = async () => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("rol", "tecnico")
        .order("nombre", { ascending: true });
      
      if (error) throw error;
      setTechnicians(data || []);
    } catch (err: any) {
      console.error("❌ Error cargando técnicos:", err);
    }
  };

  const loadConversations = async () => {
    if (!currentUser) return;

    try {
      let query;
      if (currentUser.rol === "admin") {
        query = supabase
          .from("conversations")
          .select("*")
          .eq("admin_id", currentUser.id)
          .order("updated_at", { ascending: false });
      } else {
        query = supabase
          .from("conversations")
          .select("*")
          .eq("technician_id", currentUser.id)
          .order("updated_at", { ascending: false });
      }

      const { data, error } = await query;
      
      if (error) throw error;

      if (data && data.length > 0) {
        const conversationsWithNames = await Promise.all(
          data.map(async (conv) => {
            const otherId = currentUser.rol === "admin" ? conv.technician_id : conv.admin_id;
            
            const { data: otherUser } = await supabase
              .from("usuarios")
              .select("nombre, email")
              .eq("id", otherId)
              .single();
            
            // Calcular mensajes no leídos
            const { count } = await supabase
              .from("messages")
              .select("*", { count: "exact", head: true })
              .eq("conversation_id", conv.id)
              .neq("sender_id", currentUser.id)
              .eq("read", false);

            return {
              ...conv,
              other_user_name: otherUser?.nombre || otherUser?.email || "Usuario",
              unread_count: count || 0
            };
          })
        );
        
        setConversations(conversationsWithNames);
      } else {
        setConversations([]);
      }
    } catch (err: any) {
      console.error("❌ Error cargando conversaciones:", err);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      setMessages(data || []);
      setTimeout(scrollToBottom, 100);
    } catch (err) {
      console.error("❌ Error cargando mensajes:", err);
    }
  };

  const markMessagesAsRead = async (conversationId: string) => {
    if (!currentUser) return;

    try {
      await supabase
        .from("messages")
        .update({ read: true })
        .eq("conversation_id", conversationId)
        .neq("sender_id", currentUser.id)
        .eq("read", false);
      
      // Actualizar contador en conversaciones
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId ? { ...conv, unread_count: 0 } : conv
        )
      );
    } catch (err) {
      console.error("❌ Error marcando mensajes como leídos:", err);
    }
  };

  const startConversation = async (technicianId: string) => {
    if (!currentUser) return;

    try {
      const { data: existing, error: searchError } = await supabase
        .from("conversations")
        .select("*")
        .eq("admin_id", currentUser.id)
        .eq("technician_id", technicianId)
        .maybeSingle();

      if (searchError) throw searchError;

      if (existing) {
        setSelectedConversation(existing.id);
        return;
      }

      const { data: newConv, error: insertError } = await supabase
        .from("conversations")
        .insert({
          admin_id: currentUser.id,
          technician_id: technicianId,
          last_message: "",
        })
        .select()
        .single();

      if (insertError) throw insertError;

      if (newConv) {
        await loadConversations();
        setSelectedConversation(newConv.id);
        scrollConversationToTop();
      }
    } catch (err: any) {
      console.error("❌ Error creando conversación:", err);
      setError("Error al crear conversación: " + err.message);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
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
        message: messageToSend,
      });

      if (error) throw error;

      // Actualizar conversación
      await supabase
        .from("conversations")
        .update({
          last_message: messageToSend,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedConversation);

      // Actualizar UI inmediatamente
      setNewMessage("");
      setTyping(false);
      
      // Forzar recarga de conversaciones para actualizar orden
      await loadConversations();
      
    } catch (err: any) {
      console.error("❌ Error enviando mensaje:", err);
      alert("Error al enviar mensaje: " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;
      
      console.log("✅ Mensaje eliminado para todos");
    } catch (err: any) {
      console.error("❌ Error eliminando mensaje:", err);
      alert("Error al eliminar mensaje: " + err.message);
    }
  };

  const startEdit = (message: Message) => {
    setEditingMessage(message.id);
    setEditText(message.message);
  };

  const saveEdit = async (messageId: string) => {
    if (!editText.trim()) return;

    try {
      const { error } = await supabase
        .from("messages")
        .update({ message: editText.trim() })
        .eq("id", messageId);

      if (error) throw error;
      
      setEditingMessage(null);
      setEditText("");
    } catch (err: any) {
      console.error("❌ Error editando mensaje:", err);
      alert("Error al editar mensaje: " + err.message);
    }
  };

  const cancelEdit = () => {
    setEditingMessage(null);
    setEditText("");
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    setTyping(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando chat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Recargar página
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">No autenticado</h2>
          <p className="text-gray-600 mb-6">Por favor inicia sesión</p>
          <button
            onClick={() => window.location.href = "/login"}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Ir a login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar - Lista de conversaciones */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-lg">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">💬 Mensajes</h2>
            <button
              onClick={loadConversations}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              title="Actualizar conversaciones"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-blue-100 mb-2">
            {currentUser?.rol === "admin" ? "Chat con Técnicos" : "Chat con Admin"}
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {currentUser.nombre?.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-white">{currentUser.nombre}</span>
            <span className="px-2 py-0.5 bg-white/30 text-xs text-white rounded-full">
              {currentUser.rol}
            </span>
          </div>
        </div>

        {currentUser?.rol === "admin" && (
          <div className="p-4 border-b border-gray-200">
            {technicians.length === 0 ? (
              <div className="text-center p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                <p className="text-sm text-yellow-700 font-medium">⚠️ No hay técnicos disponibles</p>
              </div>
            ) : (
              <select
                onChange={(e) => {
                  if (e.target.value) startConversation(e.target.value);
                }}
                value=""
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white hover:border-gray-400"
              >
                <option value="">➕ Nueva conversación</option>
                {technicians.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    👨‍🔧 {tech.nombre}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto" ref={conversationListRef}>
          {conversations.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <p className="font-semibold text-gray-700 mb-2">No hay conversaciones</p>
              {currentUser.rol === "admin" ? (
                <p className="text-sm text-gray-500">Selecciona un técnico arriba</p>
              ) : (
                <p className="text-sm text-gray-500">Espera a que el admin te contacte</p>
              )}
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 active:bg-gray-100
                  ${selectedConversation === conv.id 
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500" 
                    : ""}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {conv.other_user_name?.charAt(0).toUpperCase()}
                    </div>
                    {conv.unread_count > 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{conv.unread_count}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {conv.other_user_name}
                      </h4>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatConversationTime(conv.updated_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {conv.last_message || "Sin mensajes"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Panel de chat principal */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {conversations
                        .find((c) => c.id === selectedConversation)
                        ?.other_user_name?.charAt(0)
                        .toUpperCase()}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {conversations.find((c) => c.id === selectedConversation)?.other_user_name}
                    </h3>
                    <p className="text-sm text-green-600 font-medium flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      En línea • Activo ahora
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {typing && (
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm animate-pulse">
                      Escribiendo...
                    </div>
                  )}
                  <button
                    onClick={() => loadMessages(selectedConversation)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                    title="Actualizar mensajes"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-blue-50">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl">👋</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">¡Inicia la conversación!</h3>
                    <p className="text-gray-500">Envía tu primer mensaje</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <MessageItem
                      key={msg.id}
                      msg={msg}
                      currentUser={currentUser}
                      onEdit={startEdit}
                      onDelete={deleteMessage}
                      isEditing={editingMessage === msg.id}
                      editText={editText}
                      onSaveEdit={saveEdit}
                      onCancelEdit={cancelEdit}
                      onSetEditText={setEditText}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200 shadow-lg">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleTyping}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  disabled={isSending}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center space-x-2"
                >
                  {isSending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="text-center max-w-md">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-6xl">💬</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Bienvenido al chat
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                {currentUser.rol === "admin" 
                  ? "Selecciona un técnico para empezar a conversar" 
                  : "Espera a que el administrador inicie una conversación contigo"}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl mb-2">🚀</div>
                  <p className="font-medium">Chat en tiempo real</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl mb-2">📱</div>
                  <p className="font-medium">Responsive design</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl mb-2">🔔</div>
                  <p className="font-medium">Notificaciones</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl mb-2">✏️</div>
                  <p className="font-medium">Editar mensajes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}