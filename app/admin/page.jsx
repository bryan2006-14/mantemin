// app/admin/page.jsx
'use client'
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    clientes: 0,
    maquinas: 0,
    tecnicos: 0,
    ordenes: 0
  })

  useEffect(() => {
    cargarEstadisticas()
  }, [])

  async function cargarEstadisticas() {
    const { count: clientes } = await supabase.from("clientes").select("*", { count: "exact", head: true })
    const { count: maquinas } = await supabase.from("maquinas").select("*", { count: "exact", head: true })
    const { count: tecnicos } = await supabase.from("usuarios").select("*", { count: "exact", head: true }).eq("rol", "tecnico")
    const { count: ordenes } = await supabase.from("ordenes").select("*", { count: "exact", head: true })

    setStats({ clientes, maquinas, tecnicos, ordenes })
  }

  async function cerrarSesion() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const menuItems = [
    { title: "Clientes", icon: "👥", route: "/admin/clientes", count: stats.clientes, color: "bg-blue-500" },
    { title: "Máquinas", icon: "🚜", route: "/admin/maquinas", count: stats.maquinas, color: "bg-green-500" },
    { title: "Técnicos", icon: "👷", route: "/admin/tecnicos", count: stats.tecnicos, color: "bg-purple-500" },
    { title: "Órdenes", icon: "📋", route: "/admin/ordenes", count: stats.ordenes, color: "bg-orange-500" },
    { title: "Mapa", icon: "🗺️", route: "/admin/mapa", count: null, color: "bg-red-500" },
    { 
  title: "Historial", 
  icon: "📚", 
  route: "/admin/historial", 
  count: null, 
  color: "bg-indigo-500" 
}
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="text-gray-600 mt-1">Sistema de Gestión de Mantenimiento</p>
          </div>
          <button
            onClick={cerrarSesion}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.route)}
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`text-4xl ${item.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                  {item.icon}
                </div>
                {item.count !== null && (
                  <span className="text-3xl font-bold text-gray-700">{item.count}</span>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <p className="text-gray-600 text-sm mt-1">Gestionar {item.title.toLowerCase()}</p>
            </button>
          ))}
        </div>

        {/* Accesos Rápidos */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Accesos Rápidos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => router.push("/admin/clientes/crear")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              + Nuevo Cliente
            </button>
            <button
              onClick={() => router.push("/admin/ordenes/crear")}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm"
            >
              + Nueva Orden
            </button>
            <button
              onClick={() => router.push("/admin/crear-tecnico")}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
            >
              + Nuevo Técnico
            </button>
            <button
              onClick={() => router.push("/admin/mapa")}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Ver Mapa en Tiempo Real
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}