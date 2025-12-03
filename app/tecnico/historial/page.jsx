"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function HistorialPage() {
  const [ordenesCompletadas, setOrdenesCompletadas] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const router = useRouter();

  useEffect(() => {
    cargarHistorial();
  }, []);

  async function cargarHistorial() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
        return;
      }

      setUser(session.user);

      // Buscar técnico en BD
      const { data: tecnicoBD } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", session.user.email)
        .eq("rol", "tecnico")
        .maybeSingle();

      const tecnicoId = tecnicoBD?.id || session.user.id;

      // Cargar órdenes completadas con datos relacionados
      const { data: ordenesData, error } = await supabase
        .from("ordenes")
        .select(`
          *,
          maquinas:maquina_id (
            codigo,
            marca,
            modelo,
            clientes:cliente_id (
              nombre
            )
          )
        `)
        .eq("tecnico_id", tecnicoId)
        .eq("estado", "completada")
        .order("fecha_fin", { ascending: false });

      if (error) throw error;

      console.log(`📚 ${ordenesData?.length || 0} trabajos completados`);
      setOrdenesCompletadas(ordenesData || []);

    } catch (error) {
      console.error("Error:", error);
      alert("Error al cargar historial: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  function calcularDuracion(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) return "N/A";
    
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diffMs = fin - inicio;
    
    const horas = Math.floor(diffMs / (1000 * 60 * 60));
    const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (horas > 24) {
      const dias = Math.floor(horas / 24);
      return `${dias}d ${horas % 24}h`;
    }
    
    return `${horas}h ${minutos}m`;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando historial...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">📚 Historial de Trabajos</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/tecnico/dashboard")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              ← Volver al Panel
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded shadow">
            <p className="text-sm text-gray-600">Trabajos Completados</p>
            <p className="text-3xl font-bold text-green-700">{ordenesCompletadas.length}</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow">
            <p className="text-sm text-gray-600">Este Mes</p>
            <p className="text-3xl font-bold text-blue-700">
              {ordenesCompletadas.filter(o => {
                const fecha = new Date(o.fecha_fin);
                const ahora = new Date();
                return fecha.getMonth() === ahora.getMonth() && 
                       fecha.getFullYear() === ahora.getFullYear();
              }).length}
            </p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded shadow">
            <p className="text-sm text-gray-600">Hoy</p>
            <p className="text-3xl font-bold text-purple-700">
              {ordenesCompletadas.filter(o => {
                const fecha = new Date(o.fecha_fin);
                const hoy = new Date();
                return fecha.toDateString() === hoy.toDateString();
              }).length}
            </p>
          </div>
        </div>

        {/* Lista de órdenes completadas */}
        {ordenesCompletadas.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-bold mb-2">No hay trabajos completados</h2>
            <p className="text-gray-600">Los trabajos finalizados aparecerán aquí.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ordenesCompletadas.map(orden => (
              <div
                key={orden.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer"
                onClick={() => setOrdenSeleccionada(orden)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">Orden #{orden.id}</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Completada
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        orden.prioridad === 'urgente' ? 'bg-red-100 text-red-800' :
                        orden.prioridad === 'alta' ? 'bg-orange-100 text-orange-800' :
                        orden.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {orden.prioridad}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 capitalize">
                      {orden.tipo} - {orden.maquinas?.codigo} ({orden.maquinas?.marca})
                    </p>
                    {orden.maquinas?.clientes?.nombre && (
                      <p className="text-sm text-gray-500">
                        Cliente: {orden.maquinas.clientes.nombre}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Finalizado</p>
                    <p className="font-medium">
                      {new Date(orden.fecha_fin).toLocaleDateString("es-ES")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(orden.fecha_fin).toLocaleTimeString("es-ES")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-600">Duración</p>
                    <p className="font-medium text-sm">
                      {calcularDuracion(orden.fecha_inicio, orden.fecha_fin)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-600">Iniciado</p>
                    <p className="font-medium text-sm">
                      {new Date(orden.fecha_inicio).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-600">Completado</p>
                    <p className="font-medium text-sm">
                      {new Date(orden.fecha_fin).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>

                {orden.observaciones && (
                  <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                    <p className="text-xs text-gray-600 mb-1">Observaciones:</p>
                    <p className="text-sm text-gray-800 line-clamp-2">
                      {orden.observaciones}
                    </p>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOrdenSeleccionada(orden);
                  }}
                  className="mt-3 text-blue-600 text-sm hover:underline"
                >
                  Ver detalles completos →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal de detalles */}
        {ordenSeleccionada && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setOrdenSeleccionada(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Orden #{ordenSeleccionada.id}</h2>
                    <p className="opacity-90">Trabajo Completado</p>
                  </div>
                  <button
                    onClick={() => setOrdenSeleccionada(null)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold mb-2">📝 Descripción</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">
                    {ordenSeleccionada.descripcion || "Sin descripción"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Tipo</p>
                    <p className="font-medium capitalize">{ordenSeleccionada.tipo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Prioridad</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ordenSeleccionada.prioridad === 'urgente' ? 'bg-red-100 text-red-800' :
                      ordenSeleccionada.prioridad === 'alta' ? 'bg-orange-100 text-orange-800' :
                      ordenSeleccionada.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ordenSeleccionada.prioridad}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duración Total</p>
                    <p className="font-medium">
                      {calcularDuracion(ordenSeleccionada.fecha_inicio, ordenSeleccionada.fecha_fin)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Completada
                    </span>
                  </div>
                </div>

                {ordenSeleccionada.observaciones && (
                  <div>
                    <h3 className="font-bold mb-2">📋 Observaciones / Trabajo Realizado</h3>
                    <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {ordenSeleccionada.observaciones}
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-bold mb-2">🕐 Línea de Tiempo</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Creada:</span>
                      <span className="font-medium">
                        {new Date(ordenSeleccionada.created_at).toLocaleString("es-ES")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Iniciada:</span>
                      <span className="font-medium">
                        {new Date(ordenSeleccionada.fecha_inicio).toLocaleString("es-ES")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Finalizada:</span>
                      <span className="font-medium text-green-700">
                        {new Date(ordenSeleccionada.fecha_fin).toLocaleString("es-ES")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}