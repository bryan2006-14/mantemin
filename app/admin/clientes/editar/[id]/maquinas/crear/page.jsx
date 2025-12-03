// app/admin/clientes/[id]/maquinas/crear/page.jsx
'use client'
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"

export default function CrearMaquinaPage() {
  const [cliente, setCliente] = useState(null)
  const [formData, setFormData] = useState({
    codigo: "",
    marca: "",
    modelo: "",
    serie: "",
    horometro: 0,
    estado: "operativa",
    foto_url: "",
    ubicacion_lat: null,
    ubicacion_lng: null
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    cargarCliente()
  }, [])

  async function cargarCliente() {
    const { data } = await supabase
      .from("clientes")
      .select("*")
      .eq("id", params.id)
      .single()
    
    setCliente(data)
  }

  function handleChange(e) {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from("maquinas")
        .insert([{
          ...formData,
          cliente_id: params.id
        }])

      if (error) throw error

      alert("Máquina registrada correctamente")
      router.push(`/admin/clientes/${params.id}`)
    } catch (error) {
      alert("Error al crear máquina: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!cliente) return <div className="p-10 text-center">Cargando...</div>

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Registrar Nueva Máquina</h1>
        <p className="text-gray-600">Cliente: {cliente.nombre}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Código *</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              placeholder="Ej: EXC-001"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              placeholder="Ej: Caterpillar"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              placeholder="Ej: 320D"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Serie</label>
            <input
              type="text"
              name="serie"
              value={formData.serie}
              onChange={handleChange}
              placeholder="Número de serie"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Horómetro (hrs)</label>
            <input
              type="number"
              name="horometro"
              value={formData.horometro}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="operativa">Operativa</option>
              <option value="mantenimiento">En Mantenimiento</option>
              <option value="fuera_servicio">Fuera de Servicio</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL de Foto</label>
          <input
            type="url"
            name="foto_url"
            value={formData.foto_url}
            onChange={handleChange}
            placeholder="https://ejemplo.com/foto.jpg"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {formData.foto_url && (
            <img src={formData.foto_url} alt="Preview" className="mt-2 h-32 object-cover rounded" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Latitud</label>
            <input
              type="number"
              name="ubicacion_lat"
              value={formData.ubicacion_lat || ''}
              onChange={handleChange}
              step="0.0001"
              placeholder="-12.0464"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Longitud</label>
            <input
              type="number"
              name="ubicacion_lng"
              value={formData.ubicacion_lng || ''}
              onChange={handleChange}
              step="0.0001"
              placeholder="-77.0428"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Guardando..." : "Guardar Máquina"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/admin/clientes/${params.id}`)}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}