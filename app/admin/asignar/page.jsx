"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"

export default function AsignarOT() {
  const [tecnicos, setTecnicos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [tecnicoId, setTecnicoId] = useState("");
  const [ordenId, setOrdenId] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    cargarTecnicos();
    cargarOrdenes();
  }, []);

  async function cargarTecnicos() {
    const { data } = await supabase.from("usuarios").select("*").eq("rol", "tecnico");
    setTecnicos(data);
  }

  async function cargarOrdenes() {
    const { data } = await supabase.from("ordenes").select("*").eq("estado", "pendiente");
    setOrdenes(data);
  }

  async function asignar(e) {
    e.preventDefault();

    await supabase.from("ordenes")
      .update({ tecnico_id: tecnicoId, estado: "asignada" })
      .eq("id", ordenId);

    setMsg("OT asignada ✔");
  }

  return (
    <div className="p-6 max-w-lg mx-auto">

      <h1 className="text-xl font-bold mb-4">Asignar OT a Técnico</h1>

      <form onSubmit={asignar} className="flex flex-col gap-4">

        <select className="border p-2 rounded"
          value={ordenId} onChange={e => setOrdenId(e.target.value)}>
          <option>Selecciona OT</option>
          {ordenes.map(o => <option key={o.id} value={o.id}>OT #{o.id}</option>)}
        </select>

        <select className="border p-2 rounded"
          value={tecnicoId} onChange={e => setTecnicoId(e.target.value)}>
          <option>Selecciona técnico</option>
          {tecnicos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
        </select>

        <button className="bg-blue-600 text-white py-2 rounded">
          Asignar
        </button>

        {msg && <p className="text-green-600">{msg}</p>}
      </form>
    </div>
  );
}
