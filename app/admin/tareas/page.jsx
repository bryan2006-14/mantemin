// app/admin/tareas/page.jsx
'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function TareasPage() {
  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    cargarTareas()
  }, [])

  async function cargarTareas() {
    try {
      const { data, error } = await supabase
        .from("tareas")
        .select(`
          *,
          usuarios:tecnico_id (nombre, email),
          ordenes:orden_id (id, descripcion)
        `)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error al cargar tareas:", error)
      } else {
        setTareas(data || [])
      }
    } catch (error) {
      console.error("Error inesperado:", error)
    } finally {
      setLoading(false)
    }
  }

  function formatearFecha(fecha) {
    if (!fecha) return "N/A"
    return new Date(fecha).toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  function obtenerColorEstado(estado) {
    const colores = {
      "trabajando": "bg-yellow-100 text-yellow-800",
      "completada": "bg-green-100 text-green-800",
      "pausada": "bg-orange-100 text-orange-800",
      "cancelada": "bg-red-100 text-red-800"
    }
    return colores[estado] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center">
        <p className="text-gray-600">Cargando tareas...</p>
      </div>
    )
  }

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Tareas</h1>
        
        <button
          onClick={() => router.push("/admin")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          ← Volver al Dashboard
        </button>
      </div>

      {tareas.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No hay tareas registradas</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left border">ID</th>
                <th className="p-3 text-left border">Técnico</th>
                <th className="p-3 text-left border">Orden</th>
                <th className="p-3 text-left border">Estado</th>
                <th className="p-3 text-left border">Inicio</th>
                <th className="p-3 text-left border">Fin</th>
                <th className="p-3 text-center border">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {tareas.map(tarea => (
                <tr key={tarea.id} className="hover:bg-gray-50 transition">
                  <td className="border p-3">#{tarea.id}</td>
                  <td className="border p-3">
                    {tarea.usuarios?.nombre || "Sin asignar"}
                  </td>
                  <td className="border p-3">
                    OT #{tarea.orden_id}
                  </td>
                  <td className="border p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${obtenerColorEstado(tarea.estado)}`}>
                      {tarea.estado}
                    </span>
                  </td>
                  <td className="border p-3 text-sm">
                    {formatearFecha(tarea.inicio)}
                  </td>
                  <td className="border p-3 text-sm">
                    {formatearFecha(tarea.fin)}
                  </td>
                  <td className="border p-3 text-center">
                    <button
                      onClick={() => router.push(`/admin/tareas/${tarea.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Resumen</h3>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Total tareas:</p>
            <p className="text-xl font-bold">{tareas.length}</p>
          </div>
          <div>
            <p className="text-gray-600">En progreso:</p>
            <p className="text-xl font-bold text-yellow-600">
              {tareas.filter(t => t.estado === "trabajando").length}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Completadas:</p>
            <p className="text-xl font-bold text-green-600">
              {tareas.filter(t => t.estado === "completada").length}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Canceladas:</p>
            <p className="text-xl font-bold text-red-600">
              {tareas.filter(t => t.estado === "cancelada").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
