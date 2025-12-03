'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"

export default function EditarTecnicoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    async function loadTecnico() {
      try {
        const { data, error } = await supabase
          .from("usuarios")
          .select("nombre, email")
          .eq("id", params.id)
          .eq("rol", "tecnico")
          .single()

        if (error) throw error

        setFormData({
          nombre: data.nombre || "",
          email: data.email || "",
          password: "" // No mostramos la contraseña actual
        })
      } catch (error) {
        alert("Error al cargar técnico: " + error.message)
      } finally {
        setLoading(false)
      }
    }
    loadTecnico()
  }, [params.id])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    try {
      // Preparar datos para actualizar
      const updateData = {
        nombre: formData.nombre,
        email: formData.email
      }

      // Solo actualizar contraseña si se ingresó una nueva
      if (formData.password.trim()) {
        updateData.password = formData.password
      }

      const { error } = await supabase
        .from("usuarios")
        .update(updateData)
        .eq("id", params.id)

      if (error) throw error

      alert("Técnico actualizado correctamente")
      router.push("/admin/tecnicos")
    } catch (error) {
      alert("Error al actualizar técnico: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-10">Cargando...</div>
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Técnico</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nueva Contraseña (dejar vacío si no desea cambiarla)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Solo si desea cambiarla"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/tecnicos")}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}