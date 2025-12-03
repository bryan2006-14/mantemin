"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"

export default function PerfilMaquina() {
  const { id } = useParams();
  const router = useRouter();
  const [maquina, setMaquina] = useState(null);

  async function cargar() {
    const { data } = await supabase
      .from("maquinas")
      .select("*, clientes(nombre, direccion, telefono)")
      .eq("id", id)
      .single();

    setMaquina(data);
  }

  useEffect(() => {
    cargar();
  }, []);

  if (!maquina) return <p>Cargando...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">

      {/* FOTO */}
      <img
        src={maquina.foto_url || "/noimage.png"}
        className="w-full h-64 object-cover rounded-lg border"
      />

      <h1 className="text-2xl font-bold mt-4">{maquina.codigo}</h1>
      <p className="text-gray-600">{maquina.descripcion}</p>

      <div className="mt-4 border p-4 rounded-md">
        <h2 className="font-semibold">Datos Técnicos</h2>
        <p><b>Marca:</b> {maquina.marca}</p>
        <p><b>Modelo:</b> {maquina.modelo}</p>
        <p><b>Serie:</b> {maquina.serie}</p>
        <p><b>Horómetro:</b> {maquina.horometro}</p>
        <p><b>Estado:</b> {maquina.estado}</p>
      </div>

      <div className="mt-4 border p-4 rounded-md">
        <h2 className="font-semibold">Cliente</h2>
        <p><b>Nombre:</b> {maquina.clientes?.nombre}</p>
        <p><b>Dirección:</b> {maquina.clientes?.direccion}</p>
        <p><b>Tel:</b> {maquina.clientes?.telefono}</p>
      </div>

      <button
        onClick={() => router.push(`/admin/maquinas/editar/${id}`)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Editar Máquina
      </button>

    </div>
  );
}
