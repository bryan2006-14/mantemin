// app/login/page.jsx
'use client'
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Iniciar sesión con Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        console.error("Error de autenticación:", authError)
        setError("Credenciales incorrectas")
        setLoading(false)
        return
      }

      console.log("Autenticación exitosa:", authData.user.email)

      // Obtener el rol del usuario desde tu tabla usuarios
      const { data: userData, error: userError } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .single()

      console.log("Datos del usuario:", userData)
      console.log("Error al obtener usuario:", userError)

      if (userError || !userData) {
        setError(`Usuario no encontrado en el sistema. Email: ${email}`)
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      console.log("Rol del usuario:", userData.rol)

      // Redirigir según rol
      if (userData.rol === "admin") {
        console.log("Redirigiendo a /admin")
        router.push("/admin")
      } else if (userData.rol === "tecnico") {
        console.log("Redirigiendo a /tecnico")
        router.push("/tecnico/dashboard")
      } else {
        setError(`Rol no válido: ${userData.rol}`)
        await supabase.auth.signOut()
      }
    } catch (err) {
      setError("Error al iniciar sesión: " + err.message)
      console.error("Error completo:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-xl w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          Iniciar Sesión
        </h1>

        {error && (
          <div className="text-red-600 text-sm mb-3 bg-red-50 p-3 rounded border border-red-200">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Iniciando..." : "Entrar"}
        </button>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Admin: brayan@admin.com</p>
          <p>Técnico: tecnico1@ejemplo.com</p>
        </div>
      </form>
    </div>
  )
}