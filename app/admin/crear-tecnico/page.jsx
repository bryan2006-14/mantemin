'use client'

import { useState } from "react"
import { crearTecnico } from "./actions"

export default function CrearTecnico() {
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const form = new FormData(e.target)
    const res = await crearTecnico(form)

    if (res.error) {
      setError(res.error)
      setMensaje("")
      return
    }

    setMensaje(res.ok)
    setError("")
    e.target.reset()
  }

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Registrar Técnico</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {mensaje && <p className="text-green-600 mb-3">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">

        <input name="nombre" type="text" placeholder="Nombre"
          className="w-full p-2 border rounded" />

        <input name="email" type="email" placeholder="Correo"
          className="w-full p-2 border rounded" />

        <input name="password" type="password" placeholder="Contraseña"
          className="w-full p-2 border rounded" />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Registrar Técnico
        </button>
      </form>
    </div>
  )
}
