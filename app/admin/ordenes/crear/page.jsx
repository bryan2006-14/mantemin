'use client'
import { useState, useEffect, Suspense } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useSearchParams } from "next/navigation"

// Componente principal envuelto en Suspense
export default function CrearOrdenPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CrearOrdenContent />
    </Suspense>
  )
}

// Componente de carga
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando...</p>
      </div>
    </div>
  )
}

// Componente de contenido que usa useSearchParams
function CrearOrdenContent() {
  const [maquinas, setMaquinas] = useState([])
  const [tecnicos, setTecnicos] = useState([])
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null)
  const [formData, setFormData] = useState({
    maquina_id: "",
    tecnico_id: "",
    descripcion: "",
    tipo: "preventivo",
    prioridad: "media",
    fecha_programada: ""
  })
  const [loading, setLoading] = useState(false)
  const [cargandoDatos, setCargandoDatos] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    cargarDatos()
    
    const maquinaId = searchParams.get('maquina')
    if (maquinaId) {
      setFormData(prev => ({ ...prev, maquina_id: maquinaId }))
    }
  }, [searchParams])

  useEffect(() => {
    if (formData.maquina_id) {
      cargarDetallesMaquina(formData.maquina_id)
    }
  }, [formData.maquina_id])

  async function cargarDatos() {
    try {
      console.log("🔄 Cargando datos...")
      
      // Cargar máquinas
      const { data: maquinasData, error: maquinasError } = await supabase
        .from("maquinas")
        .select("*")
        .order("codigo")

      console.log("✅ Máquinas cargadas:", maquinasData)
      
      if (maquinasError) {
        console.error("❌ Error al cargar máquinas:", maquinasError)
        alert("Error al cargar máquinas: " + maquinasError.message)
        return
      }

      // Cargar clientes
      const { data: clientesData, error: clientesError } = await supabase
        .from("clientes")
        .select("id, nombre")

      console.log("✅ Clientes cargados:", clientesData)

      if (clientesError) {
        console.error("❌ Error al cargar clientes:", clientesError)
      }

      // Combinar máquinas con clientes
      const maquinasConClientes = (maquinasData || []).map(maquina => {
        const cliente = clientesData?.find(c => c.id === maquina.cliente_id)
        return {
          ...maquina,
          cliente_nombre: cliente?.nombre || "Sin cliente"
        }
      })

      console.log("✅ Máquinas con clientes:", maquinasConClientes)
      setMaquinas(maquinasConClientes)

      // Cargar técnicos
      const { data: tecnicosData, error: tecnicosError } = await supabase
        .from("usuarios")
        .select("id, nombre, email, rol")
        .eq("rol", "tecnico")
        .order("nombre")

      console.log("✅ Técnicos cargados:", tecnicosData)

      if (tecnicosError) {
        console.error("❌ Error al cargar técnicos:", tecnicosError)
        alert("Error al cargar técnicos: " + tecnicosError.message)
        return
      }

      setTecnicos(tecnicosData || [])
    } catch (error) {
      console.error("❌ Error general:", error)
      alert("Error al cargar datos: " + error.message)
    } finally {
      setCargandoDatos(false)
    }
  }

  async function cargarDetallesMaquina(maquinaId) {
    try {
      const { data: maquina, error } = await supabase
        .from("maquinas")
        .select("*")
        .eq("id", maquinaId)
        .single()

      if (error) throw error

      // Cargar cliente
      if (maquina?.cliente_id) {
        const { data: cliente } = await supabase
          .from("clientes")
          .select("*")
          .eq("id", maquina.cliente_id)
          .single()

        setMaquinaSeleccionada({
          ...maquina,
          cliente
        })
      } else {
        setMaquinaSeleccionada(maquina)
      }
    } catch (error) {
      console.error("Error al cargar detalles:", error)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    console.log(`Campo ${name} cambiado a:`, value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!formData.maquina_id) {
      alert("Por favor selecciona una máquina")
      return
    }

    if (!formData.tecnico_id) {
      alert("Por favor selecciona un técnico")
      return
    }

    if (!formData.descripcion.trim()) {
      alert("Por favor describe el trabajo a realizar")
      return
    }

    setLoading(true)

    try {
      const ordenData = {
        maquina_id: parseInt(formData.maquina_id),
        tecnico_id: formData.tecnico_id,
        descripcion: formData.descripcion.trim(),
        tipo: formData.tipo,
        prioridad: formData.prioridad,
        estado: "asignada",
        fecha_programada: formData.fecha_programada || null
      }

      console.log("📤 Enviando orden:", ordenData)

      const { data, error } = await supabase
        .from("ordenes")
        .insert([ordenData])
        .select()

      if (error) {
        console.error("❌ Error al crear orden:", error)
        throw error
      }

      console.log("✅ Orden creada exitosamente:", data)

      const tecnicoNombre = tecnicos.find(t => t.id === formData.tecnico_id)?.nombre
      alert(`✅ Orden de trabajo creada y asignada a ${tecnicoNombre}\n\nEl técnico ya puede verla en su panel.`)
      router.push("/admin/ordenes")
    } catch (error) {
      console.error("❌ Error completo:", error)
      alert("Error al crear orden: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (cargandoDatos) {
    return <LoadingSpinner />
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Crear Orden de Trabajo</h1>
        <p className="text-gray-600">Asignar tarea de mantenimiento a un técnico</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-6 rounded-lg shadow space-y-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">Máquina *</label>
            <select
              name="maquina_id"
              value={formData.maquina_id}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">-- Seleccionar máquina --</option>
              {maquinas.map(m => (
                <option key={m.id} value={m.id}>
                  {m.codigo} - {m.cliente_nombre} ({m.marca} {m.modelo})
                </option>
              ))}
            </select>
            {maquinas.length === 0 && (
              <div className="mt-2 text-sm">
                <p className="text-red-600">⚠️ No hay máquinas disponibles</p>
                <button
                  type="button"
                  onClick={() => router.push("/admin/clientes")}
                  className="text-blue-600 underline mt-1"
                >
                  → Crear cliente y máquinas
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Técnico Asignado *</label>
            <select
              name="tecnico_id"
              value={formData.tecnico_id}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">-- Seleccionar técnico --</option>
              {tecnicos.map(t => (
                <option key={t.id} value={t.id}>
                  {t.nombre} - {t.email}
                </option>
              ))}
            </select>
            {tecnicos.length === 0 && (
              <div className="mt-2 text-sm">
                <p className="text-red-600">⚠️ No hay técnicos disponibles</p>
                <button
                  type="button"
                  onClick={() => router.push("/admin/tecnicos")}
                  className="text-blue-600 underline mt-1"
                >
                  → Registrar técnicos
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Trabajo *</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="preventivo">Mantenimiento Preventivo</option>
                <option value="correctivo">Mantenimiento Correctivo</option>
                <option value="emergencia">Emergencia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Prioridad *</label>
              <select
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fecha Programada</label>
            <input
              type="datetime-local"
              name="fecha_programada"
              value={formData.fecha_programada}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción del Trabajo *</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              placeholder="Detalla las actividades a realizar, repuestos necesarios, etc..."
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {formData.tecnico_id && formData.maquina_id && (
            <div className="bg-green-50 border border-green-200 p-3 rounded">
              <p className="text-sm text-green-800">
                ✓ Asignando trabajo de <strong>{maquinas.find(m => m.id == formData.maquina_id)?.codigo}</strong> a{" "}
                <strong>{tecnicos.find(t => t.id === formData.tecnico_id)?.nombre}</strong>
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || tecnicos.length === 0 || maquinas.length === 0}
              className="flex-1 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-400 font-medium"
            >
              {loading ? "Creando orden..." : "✓ Crear y Asignar Orden"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/ordenes")}
              className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </form>

        <div className="lg:col-span-1">
          {maquinaSeleccionada ? (
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <h3 className="font-bold text-lg mb-4">📋 Información de la Máquina</h3>
              
              {maquinaSeleccionada.foto_url && (
                <img
                  src={maquinaSeleccionada.foto_url}
                  alt={maquinaSeleccionada.codigo}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}

              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Código</p>
                  <p className="font-bold text-lg">{maquinaSeleccionada.codigo}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Cliente</p>
                  <p className="font-medium">{maquinaSeleccionada.cliente?.nombre || "Sin cliente"}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-600">Marca</p>
                    <p className="font-medium">{maquinaSeleccionada.marca || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Modelo</p>
                    <p className="font-medium">{maquinaSeleccionada.modelo || "N/A"}</p>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Horómetro</p>
                  <p className="font-bold text-green-700">{maquinaSeleccionada.horometro || 0} hrs</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Estado</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    maquinaSeleccionada.estado === 'operativa' ? 'bg-green-100 text-green-800' :
                    maquinaSeleccionada.estado === 'mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {maquinaSeleccionada.estado}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-600 sticky top-4">
              <div className="text-4xl mb-2">🚜</div>
              <p className="text-sm">Selecciona una máquina para ver sus detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}