'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function TecnicosPage() {
  const [tecnicos, setTecnicos] = useState([])

  useEffect(() => {
    async function load() {
      let { data } = await supabase
        .from("usuarios")
        .select("id, nombre, email, rol")
        .eq("rol", "tecnico")
      setTecnicos(data || [])
    }
    load()
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Técnicos Registrados</h1>

      <a 
        href="/admin/crear-tecnico"
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4 inline-block"
      >
        + Registrar nuevo técnico
      </a>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tecnicos.map(t => (
            <tr key={t.id}>
              <td className="border p-2">{t.nombre}</td>
              <td className="border p-2">{t.email}</td>
              <td className="border p-2 space-x-2">
                <a 
                  className="px-2 py-1 bg-green-600 text-white rounded"
                  href={`/admin/tecnicos/${t.id}`}
                >
                  Editar
                </a>

                <a 
                  className="px-2 py-1 bg-red-600 text-white rounded"
                  href={`/admin/tecnicos/${t.id}/delete`}
                >
                  Eliminar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
