"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardTecnico() {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [detallesOrden, setDetallesOrden] = useState({ maquina: null, cliente: null });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [iniciandoTrabajo, setIniciandoTrabajo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    verificarSesionYCargarOrdenes();
  }, []);

  // Suscripción en tiempo real para nuevas órdenes
  useEffect(() => {
    if (user) {
      const channel = supabase
        .channel('ordenes-tecnico')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'ordenes',
            filter: `tecnico_id=eq.${user.id}`
          },
          (payload) => {
            console.log('🆕 Nueva orden asignada:', payload.new);
            setOrdenes(prev => [payload.new, ...prev]);
            alert('🎯 ¡Tienes una nueva orden asignada!');
          }
        )
        .subscribe();

      return () => supabase.removeChannel(channel);
    }
  }, [user]);

  async function verificarSesionYCargarOrdenes() {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        router.push("/login");
        return;
      }

      setUser(session.user);
      await cargarOrdenesDelTecnico(session.user);
    } catch (err) {
      console.error("Error:", err);
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }

  async function cargarOrdenesDelTecnico(usuario) {
    try {
      console.time("⏱️ Tiempo de carga");
      
      // Buscar el técnico en la tabla usuarios
      const { data: tecnicoBD } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", usuario.email)
        .eq("rol", "tecnico")
        .maybeSingle();

      const tecnicoId = tecnicoBD?.id || usuario.id;
      
      if (tecnicoBD) {
        console.log("✅ Técnico encontrado:", tecnicoBD.nombre);
      }

      // 🚀 Cargar SOLO órdenes activas (asignada o en_progreso)
      const { data: ordenesData, error: ordenesError } = await supabase
        .from("ordenes")
        .select(`
          *,
          maquinas:maquina_id (
            *,
            clientes:cliente_id (*)
          )
        `)
        .eq("tecnico_id", tecnicoId)
        .in("estado", ["asignada", "en_progreso"])
        .order("created_at", { ascending: false })
        .limit(50);

      if (ordenesError) {
        throw ordenesError;
      }

      console.log(`📋 ${ordenesData?.length || 0} órdenes activas encontradas`);
      console.timeEnd("⏱️ Tiempo de carga");
      
      setOrdenes(ordenesData || []);

    } catch (error) {
      console.error("Error al cargar órdenes:", error);
      setError("Error al cargar órdenes: " + error.message);
    }
  }

  async function verDetallesOrden(orden) {
    setOrdenSeleccionada(orden);
    
    // Los datos ya vienen cargados de la consulta optimizada
    setDetallesOrden({
      maquina: orden.maquinas || null,
      cliente: orden.maquinas?.clientes || null
    });

    // Scroll hacia los detalles
    setTimeout(() => {
      document.getElementById('detalles-orden')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  }

  async function iniciarTrabajo() {
    if (!ordenSeleccionada || !user) {
      alert("Selecciona una orden primero");
      return;
    }

    if (ordenSeleccionada.estado !== "asignada") {
      alert("Esta orden ya fue iniciada o completada");
      return;
    }

    setIniciandoTrabajo(true);

    try {
      const ahora = new Date().toISOString();

      // 1. Actualizar el estado de la orden
      const { error: updateError } = await supabase
        .from("ordenes")
        .update({ 
          estado: "en_progreso",
          fecha_inicio: ahora
        })
        .eq("id", ordenSeleccionada.id);

      if (updateError) throw updateError;

      // 2. Crear registro en el historial
      const { error: historialError } = await supabase
        .from("historial")
        .insert({
          orden_id: ordenSeleccionada.id,
          tecnico_id: user.id,
          accion: "iniciar_trabajo",
          detalles: `Trabajo iniciado el ${new Date().toLocaleString("es-ES")}`,
          fecha: ahora
        });

      if (historialError) {
        console.warn("⚠️ No se pudo crear historial:", historialError);
      }

      // 3. Actualizar la lista local
      setOrdenes(prev => 
        prev.map(o => 
          o.id === ordenSeleccionada.id 
            ? { ...o, estado: "en_progreso", fecha_inicio: ahora }
            : o
        )
      );

      setOrdenSeleccionada(prev => ({ 
        ...prev, 
        estado: "en_progreso", 
        fecha_inicio: ahora 
      }));

      alert("✅ ¡Trabajo iniciado correctamente!\n\nPuedes empezar a trabajar en la orden.");

      // Redirigir a la página de trabajo actual
      router.push(`/tecnico/trabajo-actual?orden=${ordenSeleccionada.id}`);

    } catch (error) {
      console.error("❌ Error al iniciar trabajo:", error);
      alert("❌ Error al iniciar trabajo: " + error.message);
    } finally {
      setIniciandoTrabajo(false);
    }
  }

  async function cerrarSesion() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando panel del técnico...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded max-w-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const ordenesAsignadas = ordenes.filter(o => o.estado === "asignada");
  const ordenesEnProgreso = ordenes.filter(o => o.estado === "en_progreso");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🔧 Panel del Técnico</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              🔄 Actualizar
            </button>
            <button
              onClick={() => router.push("/tecnico/historial")}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              📚 Historial
            </button>
            <button
              onClick={cerrarSesion}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded shadow">
            <p className="text-sm text-gray-600">Pendientes</p>
            <p className="text-3xl font-bold text-yellow-700">{ordenesAsignadas.length}</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow">
            <p className="text-sm text-gray-600">En Progreso</p>
            <p className="text-3xl font-bold text-blue-700">{ordenesEnProgreso.length}</p>
          </div>
        </div>

        {/* Lista de Órdenes */}
        {ordenes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-bold mb-2">No tienes órdenes activas</h2>
            <p className="text-gray-600">Las nuevas órdenes aparecerán aquí automáticamente.</p>
            <button
              onClick={() => router.push("/tecnico/historial")}
              className="mt-4 px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              📚 Ver Historial de Trabajos
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Órdenes Pendientes */}
            {ordenesAsignadas.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  ⚠️ Órdenes Pendientes
                  <span className="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">
                    {ordenesAsignadas.length}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ordenesAsignadas.map(orden => (
                    <OrdenCard 
                      key={orden.id} 
                      orden={orden} 
                      onVerDetalles={verDetallesOrden}
                      seleccionada={ordenSeleccionada?.id === orden.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Órdenes En Progreso */}
            {ordenesEnProgreso.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  🔄 En Progreso
                  <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                    {ordenesEnProgreso.length}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ordenesEnProgreso.map(orden => (
                    <OrdenCard 
                      key={orden.id} 
                      orden={orden} 
                      onVerDetalles={verDetallesOrden}
                      seleccionada={ordenSeleccionada?.id === orden.id}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detalles de la Orden Seleccionada */}
        {ordenSeleccionada && (
          <div id="detalles-orden" className="mt-8 space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">📋 Detalles de la Orden</h2>
                  <p className="opacity-90">ID: #{ordenSeleccionada.id}</p>
                </div>
                <button
                  onClick={() => setOrdenSeleccionada(null)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition"
                >
                  ✕ Cerrar
                </button>
              </div>
            </div>

            {/* Información de la Orden */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">Información del Trabajo</h3>
                  <p className="text-sm text-gray-600">
                    Creada: {new Date(ordenSeleccionada.created_at).toLocaleString("es-ES")}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  ordenSeleccionada.prioridad === 'urgente' ? 'bg-red-100 text-red-800' :
                  ordenSeleccionada.prioridad === 'alta' ? 'bg-orange-100 text-orange-800' :
                  ordenSeleccionada.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {ordenSeleccionada.prioridad}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Tipo de Trabajo</p>
                  <p className="font-medium capitalize">{ordenSeleccionada.tipo}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Estado</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    ordenSeleccionada.estado === 'asignada' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {ordenSeleccionada.estado === 'asignada' ? 'Pendiente' : 'En Progreso'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">📝 Descripción</p>
                <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                  <p className="text-gray-800">{ordenSeleccionada.descripcion || "Sin descripción"}</p>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-3 mt-6">
                {ordenSeleccionada.estado === "asignada" && (
                  <button
                    onClick={iniciarTrabajo}
                    disabled={iniciandoTrabajo}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold shadow-lg hover:shadow-xl disabled:bg-gray-400"
                  >
                    {iniciandoTrabajo ? "⏳ Iniciando..." : "🚀 Iniciar Trabajo"}
                  </button>
                )}
                
                {ordenSeleccionada.estado === "en_progreso" && (
                  <button
                    onClick={() => router.push(`/tecnico/trabajo-actual?orden=${ordenSeleccionada.id}`)}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold shadow-lg hover:shadow-xl"
                  >
                    ▶️ Continuar Trabajo
                  </button>
                )}
              </div>
            </div>

            {/* Cliente */}
            {detallesOrden.cliente && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4">👤 Información del Cliente</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="font-medium">{detallesOrden.cliente.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">RUC</p>
                    <p className="font-medium">{detallesOrden.cliente.ruc || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-medium">{detallesOrden.cliente.telefono || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{detallesOrden.cliente.email || "N/A"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Máquina */}
            {detallesOrden.maquina && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4">🚜 Perfil de la Máquina</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {detallesOrden.maquina.foto_url && (
                    <div className="md:col-span-1">
                      <img
                        src={detallesOrden.maquina.foto_url}
                        alt={detallesOrden.maquina.codigo}
                        className="w-full h-48 object-cover rounded-lg shadow"
                      />
                    </div>
                  )}

                  <div className={detallesOrden.maquina.foto_url ? "md:col-span-2" : "md:col-span-3"}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Código</p>
                        <p className="font-bold text-lg">{detallesOrden.maquina.codigo}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Estado</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          detallesOrden.maquina.estado === 'operativa' ? 'bg-green-100 text-green-800' :
                          detallesOrden.maquina.estado === 'mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {detallesOrden.maquina.estado}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Marca</p>
                        <p className="font-medium">{detallesOrden.maquina.marca || "N/A"}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Modelo</p>
                        <p className="font-medium">{detallesOrden.maquina.modelo || "N/A"}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Serie</p>
                        <p className="font-medium">{detallesOrden.maquina.serie || "N/A"}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Horómetro</p>
                        <p className="font-bold text-green-700">{detallesOrden.maquina.horometro || 0} hrs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para cada card de orden
function OrdenCard({ orden, onVerDetalles, seleccionada }) {
  const estadoConfig = {
    asignada: { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800', badge: 'bg-yellow-500' },
    en_progreso: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', badge: 'bg-blue-500' }
  };

  const config = estadoConfig[orden.estado] || estadoConfig.asignada;

  return (
    <div 
      className={`${config.bg} border-2 ${seleccionada ? 'border-blue-500' : config.border} rounded-lg p-4 hover:shadow-lg transition cursor-pointer`}
      onClick={() => onVerDetalles(orden)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-xs text-gray-500">Orden #{orden.id}</p>
          <h3 className="font-bold text-lg capitalize">{orden.tipo}</h3>
        </div>
        <span className={`${config.badge} text-white text-xs px-2 py-1 rounded-full`}>
          {orden.prioridad}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-3 line-clamp-2">
        {orden.descripcion || "Sin descripción"}
      </p>

      <div className="flex justify-between items-center">
        <span className={`text-xs font-medium ${config.text}`}>
          {orden.estado === 'asignada' ? '⏳ Pendiente' : '🔄 En Progreso'}
        </span>
        <button
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            onVerDetalles(orden);
          }}
        >
          Ver Detalles →
        </button>
      </div>
    </div>
  );
}