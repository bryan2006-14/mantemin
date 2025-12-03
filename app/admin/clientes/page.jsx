// app/admin/clientes/page.jsx
'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function ClientesPage() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    cargarClientes()
  }, [])

  async function cargarClientes() {
    try {
      const { data, error } = await supabase
        .from("clientes")
        .select(`
          *,
          maquinas (count)
        `)
        .order("nombre")

      if (error) throw error
      setClientes(data || [])
    } catch (error) {
      console.error("Error al cargar clientes:", error)
    } finally {
      setLoading(false)
    }
  }

  async function eliminarCliente(id, nombre) {
    if (!confirm(`¿Estás seguro de eliminar a ${nombre}? Esto eliminará todas sus máquinas.`)) return

    try {
      const { error } = await supabase
        .from("clientes")
        .delete()
        .eq("id", id)

      if (error) throw error
      alert("Cliente eliminado correctamente")
      cargarClientes()
    } catch (error) {
      alert("Error al eliminar: " + error.message)
    }
  }

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center">
        <p className="text-gray-600">Cargando clientes...</p>
      </div>
    )
  }

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/clientes/crear")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Nuevo Cliente
          </button>
          <button
            onClick={() => router.push("/admin")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            ← Volver
          </button>
        </div>
      </div>

      {clientes.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No hay clientes registrados</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left border">Nombre</th>
                <th className="p-3 text-left border">RUC</th>
                <th className="p-3 text-left border">Teléfono</th>
                <th className="p-3 text-left border">Email</th>
                <th className="p-3 text-center border">Máquinas</th>
                <th className="p-3 text-center border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id} className="hover:bg-gray-50 transition">
                  <td className="border p-3 font-medium">{cliente.nombre}</td>
                  <td className="border p-3">{cliente.ruc || "N/A"}</td>
                  <td className="border p-3">{cliente.telefono || "N/A"}</td>
                  <td className="border p-3">{cliente.email || "N/A"}</td>
                  <td className="border p-3 text-center">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {cliente.maquinas?.[0]?.count || 0}
                    </span>
                  </td>
                  <td className="border p-3">
                    <div className="flex gap-2 justify-center">
                     
                      <button
                        onClick={() => eliminarCliente(cliente.id, cliente.nombre)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
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