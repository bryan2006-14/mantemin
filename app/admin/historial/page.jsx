"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function HistorialAdminPage() {
  const [ordenes, setOrdenes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTecnico, setFiltroTecnico] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const router = useRouter();

  useEffect(() => {
    cargarDatos();
  }, [filtroTecnico, filtroFecha]);

  async function cargarDatos() {
    try {
      // Cargar lista de técnicos
      const { data: tecnicosData } = await supabase
        .from("usuarios")
        .select("id, nombre, email")
        .eq("rol", "tecnico")
        .order("nombre");

      setTecnicos(tecnicosData || []);

      // Construir query base - IGUAL QUE EL TÉCNICO
      let query = supabase
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
        .eq("estado", "completada")
        .order("fecha_fin", { ascending: false });

      // Filtrar por técnico
      if (filtroTecnico !== "todos") {
        query = query.eq("tecnico_id", filtroTecnico);
      }

      // Filtrar por fecha
      if (filtroFecha === "ultima_semana") {
        const hace7dias = new Date();
        hace7dias.setDate(hace7dias.getDate() - 7);
        query = query.gte("fecha_fin", hace7dias.toISOString());
      } else if (filtroFecha === "ultimo_mes") {
        const hace30dias = new Date();
        hace30dias.setDate(hace30dias.getDate() - 30);
        query = query.gte("fecha_fin", hace30dias.toISOString());
      } else if (filtroFecha === "ultimo_trimestre") {
        const hace90dias = new Date();
        hace90dias.setDate(hace90dias.getDate() - 90);
        query = query.gte("fecha_fin", hace90dias.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      // Cargar el nombre del técnico para cada orden
      const ordenesConTecnico = await Promise.all(
        (data || []).map(async (orden) => {
          const { data: tecnico } = await supabase
            .from("usuarios")
            .select("nombre, email")
            .eq("id", orden.tecnico_id)
            .maybeSingle();
          
          return {
            ...orden,
            tecnico_nombre: tecnico?.nombre || "Sin asignar"
          };
        })
      );

      console.log(`📚 ${ordenesConTecnico?.length || 0} trabajos completados`);
      setOrdenes(ordenesConTecnico);
    } catch (error) {
      console.error("Error al cargar historial:", error);
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

  function calcularEstadisticas() {
    const trabajosFiltrados = ordenes.filter(o => 
      busqueda === "" || 
      o.maquinas?.codigo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.maquinas?.clientes?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.tecnico_nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const total = trabajosFiltrados.length;
    
    // Calcular tiempo total
    let tiempoTotalMs = 0;
    trabajosFiltrados.forEach(o => {
      if (o.fecha_inicio && o.fecha_fin) {
        const inicio = new Date(o.fecha_inicio);
        const fin = new Date(o.fecha_fin);
        tiempoTotalMs += (fin - inicio);
      }
    });
    
    const tiempoTotalHoras = Math.floor(tiempoTotalMs / (1000 * 60 * 60));
    const promedioHoras = total > 0 ? Math.round(tiempoTotalHoras / total) : 0;

    // Contar por tipo
    const porTipo = trabajosFiltrados.reduce((acc, o) => {
      acc[o.tipo] = (acc[o.tipo] || 0) + 1;
      return acc;
    }, {});

    return { total, tiempoTotalHoras, promedioHoras, porTipo };
  }

  function exportarCSV() {
    const csv = [
      ["Fecha", "Técnico", "Máquina", "Cliente", "Tipo", "Prioridad", "Duración", "Estado"],
      ...ordenes.map(o => [
        new Date(o.fecha_fin).toLocaleDateString("es-ES"),
        o.tecnico_nombre,
        o.maquinas?.codigo || "N/A",
        o.maquinas?.clientes?.nombre || "N/A",
        o.tipo,
        o.prioridad,
        calcularDuracion(o.fecha_inicio, o.fecha_fin),
        o.estado
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `historial_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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

  const stats = calcularEstadisticas();
  const trabajosFiltrados = ordenes.filter(o => 
    busqueda === "" || 
    o.maquinas?.codigo?.toLowerCase().includes(busqueda.toLowerCase()) ||
    o.maquinas?.clientes?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    o.tecnico_nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">📚 Historial de Trabajos</h1>
            <p className="text-gray-600">Registro completo de mantenimientos realizados</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportarCSV}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              📥 Exportar CSV
            </button>
            <button
              onClick={() => router.push("/admin")}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-2">Total Trabajos</p>
            <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-2">Tiempo Total</p>
            <p className="text-3xl font-bold text-green-600">{stats.tiempoTotalHoras}h</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-2">Promedio</p>
            <p className="text-3xl font-bold text-purple-600">{stats.promedioHoras}h</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2 text-sm">Por Tipo</p>
            <div className="space-y-1 text-sm">
              <p>Preventivo: <strong>{stats.porTipo.preventivo || 0}</strong></p>
              <p>Correctivo: <strong>{stats.porTipo.correctivo || 0}</strong></p>
              <p>Emergencia: <strong>{stats.porTipo.emergencia || 0}</strong></p>
            </div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium mb-1">Buscar</label>
              <input
                type="text"
                placeholder="Máquina, cliente o técnico..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Filtro por Técnico */}
            <div>
              <label className="block text-sm font-medium mb-1">Técnico</label>
              <select
                value={filtroTecnico}
                onChange={(e) => setFiltroTecnico(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="todos">Todos los técnicos</option>
                {tecnicos.map(t => (
                  <option key={t.id} value={t.id}>{t.nombre}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Fecha */}
            <div>
              <label className="block text-sm font-medium mb-1">Período</label>
              <select
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="todos">Todos los períodos</option>
                <option value="ultima_semana">Última Semana</option>
                <option value="ultimo_mes">Último Mes</option>
                <option value="ultimo_trimestre">Último Trimestre</option>
              </select>
            </div>
          </div>

          {busqueda && (
            <p className="mt-3 text-sm text-gray-600">
              Mostrando {trabajosFiltrados.length} de {ordenes.length} resultados
            </p>
          )}
        </div>

        {/* Lista de Trabajos */}
        {trabajosFiltrados.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-bold mb-2">No se encontraron trabajos</h2>
            <p className="text-gray-600">Los trabajos finalizados aparecerán aquí.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trabajosFiltrados.map(orden => (
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
                    <p className="text-sm text-blue-600 font-medium mt-1">
                      👤 {orden.tecnico_nombre}
                    </p>
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
                    <p className="text-sm opacity-75 mt-1">
                      👤 Técnico: {ordenSeleccionada.tecnico_nombre}
                    </p>
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

                <div>
                  <h3 className="font-bold mb-2">🔧 Información de Máquina</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <p><strong>Código:</strong> {ordenSeleccionada.maquinas?.codigo || "N/A"}</p>
                    <p><strong>Marca:</strong> {ordenSeleccionada.maquinas?.marca || "N/A"}</p>
                    <p><strong>Modelo:</strong> {ordenSeleccionada.maquinas?.modelo || "N/A"}</p>
                    <p><strong>Cliente:</strong> {ordenSeleccionada.maquinas?.clientes?.nombre || "N/A"}</p>
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