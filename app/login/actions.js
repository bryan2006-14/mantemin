"use server"

import { supabase } from "@/lib/supabase"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { redirect } from "next/navigation"

export async function loginAction(formData) {
  const email = formData.get("email")
  const password = formData.get("password")

  // 1. AUTH
  const { data: auth, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return { error: "Credenciales incorrectas" }
  }

  // 2. GET PROFILE
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", auth.user.id)
    .single()

  if (!profile) {
    return { error: "No existe el perfil del usuario" }
  }

  // 3. REDIRECT BY ROLE
  if (profile.role === "admin") {
    redirect("/admin")
  }

  if (profile.role === "tecnico") {
    redirect("/tecnico")
  }

  return { error: "Rol inválido" }
}
