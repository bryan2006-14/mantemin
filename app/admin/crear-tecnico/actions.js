"use server"

import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function crearTecnico(formData) {
  const nombre = formData.get("nombre")
  const email = formData.get("email")
  const password = formData.get("password")

  if (!nombre || !email || !password) {
    return { error: "Todos los campos son obligatorios" }
  }

  // 1) Verificar si existe
  const { data: existente } = await supabaseAdmin
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .maybeSingle()

  if (existente) {
    return { error: "El correo ya está registrado" }
  }

  // 2) Insertar usuario
  const { error: errInsert } = await supabaseAdmin
    .from("usuarios")
    .insert([
      { nombre, email, password, rol: "tecnico" }
    ])

  if (errInsert) {
    return { error: "Error al crear técnico" }
  }

  return { ok: "Técnico registrado correctamente" }
}
