// app/admin/ordenes/page.jsx
'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function OrdenesPage() {
  const [ordenes, setOrdenes] = useState([])
  const [filtro, setFiltro] = useState("todas")
  const [loading, setLoading] = useState(true)
  const [eliminandoId, setEliminandoId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    cargarOrdenes()
  }, [filtro])

  async function cargarOrdenes() {
    try {
      let query = supabase
        .from("ordenes")
        .select("*")

      if (filtro !== "todas") {
        query = query.eq("estado", filtro)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error detallado:", error)
        throw error
      }

      // Cargar datos relacionados manualmente
      const ordenesConDatos = await Promise.all(
        (data || []).map(async (orden) => {
          // Cargar máquina
          const { data: maquina } = await supabase
            .from("maquinas")
            .select("codigo, marca, modelo, cliente_id")
            .eq("id", orden.maquina_id)
            .maybeSingle()

          // Cargar cliente
          let cliente = null
          if (maquina?.cliente_id) {
            const { data: clienteData } = await supabase
              .from("clientes")
              .select("nombre")
              .eq("id", maquina.cliente_id)
              .maybeSingle()
            cliente = clienteData
          }

          // Cargar técnico
          const { data: tecnico } = await supabase
            .from("usuarios")
            .select("nombre, email")
            .eq("id", orden.tecnico_id)
            .maybeSingle()

          return {
            ...orden,
            maquinas: maquina ? { ...maquina, clientes: cliente } : null,
            usuarios: tecnico
          }
        })
      )

      setOrdenes(ordenesConDatos)
    } catch (error) {
      console.error("Error al cargar órdenes:", error)
      alert("Error al cargar órdenes: " + (error.message || "Error desconocido"))
    } finally {
      setLoading(false)
    }
  }

  async function eliminarOrden(id) {
    if (!confirm("¿Estás seguro de eliminar esta orden? Esta acción no se puede deshacer.")) {
      return
    }

    setEliminandoId(id)
    
    try {
      const { error } = await supabase
        .from("ordenes")
        .delete()
        .eq("id", id)

      if (error) {
        throw error
      }

      // Actualizar lista localmente
      setOrdenes(ordenes.filter(orden => orden.id !== id))
      
      alert("✅ Orden eliminada correctamente")
    } catch (error) {
      console.error("Error al eliminar:", error)
      alert("Error al eliminar orden: " + error.message)
    } finally {
      setEliminandoId(null)
    }
  }

  function obtenerColorPrioridad(prioridad) {
    const colores = {
      baja: "bg-blue-100 text-blue-800",
      media: "bg-yellow-100 text-yellow-800",
      alta: "bg-orange-100 text-orange-800",
      urgente: "bg-red-100 text-red-800"
    }
    return colores[prioridad] || "bg-gray-100 text-gray-800"
  }

  function obtenerColorEstado(estado) {
    const colores = {
      pendiente: "bg-gray-100 text-gray-800",
      asignada: "bg-blue-100 text-blue-800",
      en_progreso: "bg-yellow-100 text-yellow-800",
      completada: "bg-green-100 text-green-800",
      cancelada: "bg-red-100 text-red-800"
    }
    return colores[estado] || "bg-gray-100 text-gray-800"
  }

  function formatearFecha(fecha) {
    if (!fecha) return "No programada"
    return new Date(fecha).toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando órdenes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Órdenes de Trabajo</h1>
        
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/ordenes/crear")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Nueva Orden
          </button>
          <button
            onClick={() => router.push("/admin")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            ← Volver
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-2 flex-wrap">
          {["todas", "pendiente", "asignada", "en_progreso", "completada", "cancelada"].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded transition ${
                filtro === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1).replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-600 text-sm">Total</p>
          <p className="text-2xl font-bold">{ordenes.length}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow text-center">
          <p className="text-gray-600 text-sm">Asignadas</p>
          <p className="text-2xl font-bold text-blue-600">
            {ordenes.filter(o => o.estado === "asignada").length}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow text-center">
          <p className="text-gray-600 text-sm">En Progreso</p>
          <p className="text-2xl font-bold text-yellow-600">
            {ordenes.filter(o => o.estado === "en_progreso").length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow text-center">
          <p className="text-gray-600 text-sm">Completadas</p>
          <p className="text-2xl font-bold text-green-600">
            {ordenes.filter(o => o.estado === "completada").length}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow text-center">
          <p className="text-gray-600 text-sm">Pendientes</p>
          <p className="text-2xl font-bold text-gray-600">
            {ordenes.filter(o => o.estado === "pendiente").length}
          </p>
        </div>
      </div>

      {/* Lista de Órdenes */}
      {ordenes.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No hay órdenes {filtro !== "todas" ? `con estado "${filtro}"` : "registradas"}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left border">Máquina/Cliente</th>
                <th className="p-3 text-left border">Técnico</th>
                <th className="p-3 text-left border">Tipo</th>
                <th className="p-3 text-center border">Prioridad</th>
                <th className="p-3 text-center border">Estado</th>
                <th className="p-3 text-left border">Programada</th>
                <th className="p-3 text-center border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map(orden => (
                <tr key={orden.id} className="hover:bg-gray-50 transition">
                  <td className="border p-3">
                    <p className="font-medium">{orden.maquinas?.codigo || "Sin máquina"}</p>
                    <p className="text-xs text-gray-600">
                      {orden.maquinas?.clientes?.nombre || "Sin cliente"}
                    </p>
                  </td>
                  <td className="border p-3 text-sm">{orden.usuarios?.nombre || "Sin asignar"}</td>
                  <td className="border p-3 text-sm capitalize">{orden.tipo || "N/A"}</td>
                  <td className="border p-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${obtenerColorPrioridad(orden.prioridad)}`}>
                      {orden.prioridad || "media"}
                    </span>
                  </td>
                  <td className="border p-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${obtenerColorEstado(orden.estado)}`}>
                      {orden.estado?.replace("_", " ") || "pendiente"}
                    </span>
                  </td>
                  <td className="border p-3 text-xs">
                    {formatearFecha(orden.fecha_programada)}
                  </td>
                  <td className="border p-3 text-center space-x-2">
                    <button
                      onClick={() => router.push(`/admin/ordenes/${orden.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => eliminarOrden(orden.id)}
                      disabled={eliminandoId === orden.id}
                      className={`px-3 py-1 text-white rounded text-sm ${
                        eliminandoId === orden.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {eliminandoId === orden.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}