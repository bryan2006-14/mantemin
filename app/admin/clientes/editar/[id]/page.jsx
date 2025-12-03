// app/admin/clientes/[id]/page.jsx
'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"

export default function DetalleClientePage() {
  const [cliente, setCliente] = useState(null)
  const [maquinas, setMaquinas] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    try {
      // Cargar cliente
      const { data: clienteData, error: clienteError } = await supabase
        .from("clientes")
        .select("*")
        .eq("id", params.id)
        .single()

      if (clienteError) throw clienteError

      // Cargar máquinas del cliente
      const { data: maquinasData, error: maquinasError } = await supabase
        .from("maquinas")
        .select("*")
        .eq("cliente_id", params.id)
        .order("codigo")

      if (maquinasError) throw maquinasError

      setCliente(clienteData)
      setMaquinas(maquinasData || [])
    } catch (error) {
      console.error("Error:", error)
      alert("Error al cargar datos")
    } finally {
      setLoading(false)
    }
  }

  async function eliminarMaquina(id, codigo) {
    if (!confirm(`¿Eliminar máquina ${codigo}?`)) return

    try {
      const { error } = await supabase
        .from("maquinas")
        .delete()
        .eq("id", id)

      if (error) throw error
      alert("Máquina eliminada")
      cargarDatos()
    } catch (error) {
      alert("Error: " + error.message)
    }
  }

  if (loading) {
    return <div className="p-10 text-center">Cargando...</div>
  }

  if (!cliente) {
    return <div className="p-10 text-center">Cliente no encontrado</div>
  }

  return (
    <div className="p-10 max-w-7xl mx-auto">
      {/* Información del Cliente */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{cliente.nombre}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/admin/clientes/${cliente.id}/editar`)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Editar Cliente
            </button>
            <button
              onClick={() => router.push("/admin/clientes")}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              ← Volver
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">RUC:</p>
            <p className="font-medium">{cliente.ruc || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">Teléfono:</p>
            <p className="font-medium">{cliente.telefono || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-medium">{cliente.email || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">Dirección:</p>
            <p className="font-medium">{cliente.direccion || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Máquinas del Cliente */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Máquinas ({maquinas.length})</h2>
          <button
            onClick={() => router.push(`/admin/clientes/${cliente.id}/maquinas/crear`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Agregar Máquina
          </button>
        </div>

        {maquinas.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No hay máquinas registradas</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {maquinas.map(maquina => (
              <div key={maquina.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                {maquina.foto_url && (
                  <img
                    src={maquina.foto_url}
                    alt={maquina.codigo}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="font-bold text-lg mb-2">{maquina.codigo}</h3>
                <div className="text-sm space-y-1 mb-3">
                  <p><span className="text-gray-600">Marca:</span> {maquina.marca || "N/A"}</p>
                  <p><span className="text-gray-600">Modelo:</span> {maquina.modelo || "N/A"}</p>
                  <p><span className="text-gray-600">Horómetro:</span> {maquina.horometro} hrs</p>
                  <p>
                    <span className={`px-2 py-1 rounded text-xs ${
                      maquina.estado === 'operativa' ? 'bg-green-100 text-green-800' :
                      maquina.estado === 'mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {maquina.estado}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/ordenes/crear?maquina=${maquina.id}`)}
                    className="flex-1 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
                  >
                    Crear OT
                  </button>
                  <button
                    onClick={() => router.push(`/admin/maquinas/${maquina.id}/editar`)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarMaquina(maquina.id, maquina.codigo)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}