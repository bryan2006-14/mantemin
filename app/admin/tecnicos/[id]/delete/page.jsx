'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"

export default function EliminarTecnicoPage() {
  const [tecnico, setTecnico] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    async function loadTecnico() {
      try {
        const { data, error } = await supabase
          .from("usuarios")
          .select("id, nombre, email")
          .eq("id", params.id)
          .eq("rol", "tecnico")
          .single()

        if (error) throw error
        setTecnico(data)
      } catch (error) {
        alert("Error al cargar técnico: " + error.message)
        router.push("/admin/tecnicos")
      } finally {
        setLoading(false)
      }
    }
    loadTecnico()
  }, [params.id, router])

  async function handleDelete() {
    if (!confirm("¿Estás seguro de eliminar este técnico? Esta acción no se puede deshacer.")) {
      return
    }

    setDeleting(true)

    try {
      const { error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", params.id)

      if (error) throw error

      alert("Técnico eliminado correctamente")
      router.push("/admin/tecnicos")
    } catch (error) {
      alert("Error al eliminar técnico: " + error.message)
      setDeleting(false)
    }
  }

  if (loading) {
    return <div className="p-10">Cargando...</div>
  }

  if (!tecnico) {
    return <div className="p-10">Técnico no encontrado</div>
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-red-600">⚠️ Eliminar Técnico</h1>
        
        <div className="bg-red-50 border border-red-200 p-4 rounded mb-6">
          <p className="text-sm text-red-800 mb-2">
            Estás a punto de eliminar al siguiente técnico:
          </p>
          <div className="space-y-1">
            <p className="font-semibold">{tecnico.nombre}</p>
            <p className="text-gray-600">{tecnico.email}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          Esta acción eliminará permanentemente este técnico del sistema. 
          No podrás recuperar esta información.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:bg-gray-400"
          >
            {deleting ? "Eliminando..." : "Sí, eliminar técnico"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/tecnicos")}
            disabled={deleting}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition disabled:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}