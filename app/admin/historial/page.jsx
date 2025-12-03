// app/admin/historial/page.jsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function HistorialAdminPage() {
  const [historial, setHistorial] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTecnico, setFiltroTecnico] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
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

      // Cargar historial
      let query = supabase
        .from("historial_trabajos")
        .select("*")
        .order("created_at", { ascending: false });

      // Filtrar por técnico
      if (filtroTecnico !== "todos") {
        query = query.eq("tecnico_id", filtroTecnico);
      }

      // Filtrar por fecha
      if (filtroFecha === "ultima_semana") {
        const hace7dias = new Date();
        hace7dias.setDate(hace7dias.getDate() - 7);
        query = query.gte("created_at", hace7dias.toISOString());
      } else if (filtroFecha === "ultimo_mes") {
        const hace30dias = new Date();
        hace30dias.setDate(hace30dias.getDate() - 30);
        query = query.gte("created_at", hace30dias.toISOString());
      } else if (filtroFecha === "ultimo_trimestre") {
        const hace90dias = new Date();
        hace90dias.setDate(hace90dias.getDate() - 90);
        query = query.gte("created_at", hace90dias.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      // Cargar datos relacionados
      const historialConDatos = await Promise.all(
        (data || []).map(async (trabajo) => {
          // Cargar técnico
          const { data: tecnico } = await supabase
            .from("usuarios")
            .select("nombre, email")
            .eq("id", trabajo.tecnico_id)
            .maybeSingle();

          // Cargar máquina
          const { data: maquina } = await supabase
            .from("maquinas")
            .select("codigo, marca, modelo, foto_url, cliente_id")
            .eq("id", trabajo.maquina_id)
            .maybeSingle();

          // Cargar cliente
          let cliente = null;
          if (maquina?.cliente_id) {
            const { data: clienteData } = await supabase
              .from("clientes")
              .select("nombre")
              .eq("id", maquina.cliente_id)
              .maybeSingle();
            cliente = clienteData;
          }

          return {
            ...trabajo,
            tecnico,
            maquina: maquina ? { ...maquina, cliente } : null
          };
        })
      );

      setHistorial(historialConDatos);
    } catch (error) {
      console.error("Error al cargar historial:", error);
    } finally {
      setLoading(false);
    }
  }

  function calcularEstadisticas() {
    const trabajosFiltrados = historial.filter(t => 
      busqueda === "" || 
      t.maquina?.codigo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.maquina?.cliente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.tecnico?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const total = trabajosFiltrados.length;
    const tiempoTotal = trabajosFiltrados.reduce((sum, t) => sum + (t.duracion_minutos || 0), 0);
    const promedio = total > 0 ? Math.round(tiempoTotal / total) : 0;

    // Contar por tipo
    const porTipo = trabajosFiltrados.reduce((acc, t) => {
      acc[t.tipo] = (acc[t.tipo] || 0) + 1;
      return acc;
    }, {});

    return { total, tiempoTotal, promedio, porTipo };
  }

  function formatearDuracion(minutos) {
    if (!minutos) return "N/A";
    
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    
    if (horas === 0) return `${mins} min`;
    return `${horas}h ${mins}min`;
  }

  function exportarCSV() {
    const csv = [
      ["Fecha", "Técnico", "Máquina", "Cliente", "Tipo", "Duración (min)", "Estado"],
      ...historial.map(t => [
        new Date(t.created_at).toLocaleDateString("es-ES"),
        t.tecnico?.nombre || "N/A",
        t.maquina?.codigo || "N/A",
        t.maquina?.cliente?.nombre || "N/A",
        t.tipo,
        t.duracion_minutos || 0,
        t.estado
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando historial...</p>
        </div>
      </div>
    );
  }

  const stats = calcularEstadisticas();
  const trabajosFiltrados = historial.filter(t => 
    busqueda === "" || 
    t.maquina?.codigo?.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.maquina?.cliente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.tecnico?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">📚 Historial de Trabajos</h1>
            <p className="text-gray-600">Registro completo de mantenimientos realizados</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportarCSV}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              📥 Exportar CSV
            </button>
            <button
              onClick={() => router.push("/admin")}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
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
            <p className="text-3xl font-bold text-green-600">{formatearDuracion(stats.tiempoTotal)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-2">Promedio</p>
            <p className="text-3xl font-bold text-purple-600">{formatearDuracion(stats.promedio)}</p>
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
              Mostrando {trabajosFiltrados.length} de {historial.length} resultados
            </p>
          )}
        </div>

        {/* Lista de Trabajos */}
        {trabajosFiltrados.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-600 text-lg">No se encontraron trabajos con los filtros aplicados</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left border">Fecha</th>
                  <th className="p-3 text-left border">Técnico</th>
                  <th className="p-3 text-left border">Máquina/Cliente</th>
                  <th className="p-3 text-left border">Tipo</th>
                  <th className="p-3 text-center border">Duración</th>
                  <th className="p-3 text-center border">Evidencias</th>
                  <th className="p-3 text-center border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {trabajosFiltrados.map(trabajo => (
                  <tr key={trabajo.id} className="hover:bg-gray-50 transition">
                    <td className="border p-3 text-sm">
                      {new Date(trabajo.created_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                    <td className="border p-3">
                      <p className="font-medium">{trabajo.tecnico?.nombre || "N/A"}</p>
                      <p className="text-xs text-gray-600">{trabajo.tecnico?.email}</p>
                    </td>
                    <td className="border p-3">
                      <p className="font-medium">{trabajo.maquina?.codigo || "N/A"}</p>
                      <p className="text-xs text-gray-600">{trabajo.maquina?.cliente?.nombre || "Sin cliente"}</p>
                    </td>
                    <td className="border p-3 text-sm capitalize">{trabajo.tipo}</td>
                    <td className="border p-3 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {formatearDuracion(trabajo.duracion_minutos)}
                      </span>
                    </td>
                    <td className="border p-3 text-center">
                      {trabajo.evidencias && trabajo.evidencias.length > 0 ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          📸 {trabajo.evidencias.length}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Sin fotos</span>
                      )}
                    </td>
                    <td className="border p-3 text-center">
                      <button
                        onClick={() => router.push(`/admin/historial/${trabajo.id}`)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}