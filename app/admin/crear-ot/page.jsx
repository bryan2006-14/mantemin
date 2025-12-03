"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"

export default function CrearOT() {
  const [descripcion, setDescripcion] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [maquinaId, setMaquinaId] = useState("");
  const [clientes, setClientes] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    cargarClientes();
    cargarMaquinas();
  }, []);

  async function cargarClientes() {
    const { data } = await supabase.from("clientes").select("*");
    setClientes(data);
  }

  async function cargarMaquinas() {
    const { data } = await supabase.from("maquinas").select("*");
    setMaquinas(data);
  }

  async function crearOT(e) {
    e.preventDefault();

    await supabase.from("ordenes").insert({
      cliente_id: clienteId,
      maquina_id: maquinaId,
      descripcion,
      estado: "pendiente",
      fecha: new Date()
    });

    setMsg("Orden creada ✔");
  }

  return (
    <div className="p-6 max-w-lg mx-auto">

      <h1 className="text-xl font-bold mb-4">Crear Orden de Trabajo</h1>

      <form onSubmit={crearOT} className="flex flex-col gap-4">

        <select value={clienteId}
          onChange={e => setClienteId(e.target.value)}
          className="border p-2 rounded">
          <option>Selecciona cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>

        <select value={maquinaId}
          onChange={e => setMaquinaId(e.target.value)}
          className="border p-2 rounded">
          <option>Selecciona máquina</option>
          {maquinas.map(m => <option key={m.id} value={m.id}>{m.codigo}</option>)}
        </select>

        <textarea rows="3" placeholder="Descripción"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          className="border p-2 rounded" />

        <button className="bg-blue-600 text-white py-2 rounded">
          Crear OT
        </button>

        {msg && <p className="text-green-600">{msg}</p>}
      </form>

    </div>
  );
}
