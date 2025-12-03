"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function OrdenPerfil() {
  const { id } = useParams();
  const router = useRouter();
  const [orden, setOrden] = useState(null);
  const [fileAntes, setFileAntes] = useState(null);
  const [fileDespues, setFileDespues] = useState(null);

  async function cargar() {
    const { data } = await supabase.from("ordenes")
      .select("*, maquinas(*), usuarios(nombre), clientes(*)")
      .eq("id", id)
      .single();
    setOrden(data);
  }

  useEffect(() => { cargar(); }, []);

  async function subirFoto(file, tipo) {
    if (!file) return;
    const nombre = `ordenes/${id}/${tipo}-${Date.now()}-${file.name}`;
    const { error: uploadErr } = await supabase.storage.from("fotos").upload(nombre, file);
    if (uploadErr) return alert("Error upload");
    const { publicUrl } = supabase.storage.from("fotos").getPublicUrl(nombre);
    // Insertar en tabla fotos
    await supabase.from("fotos").insert({ tarea_id: null, url: publicUrl.publicUrl, tipo: tipo, orden_id: id });
    cargar();
  }

  async function cambiarEstado(nuevo) {
    await supabase.from("ordenes").update({ estado: nuevo }).eq("id", id);
    cargar();
  }

  if (!orden) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold">OT #{orden.id}</h1>
      <p className="text-gray-600">{orden.descripcion}</p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Antes</p>
          <input type="file" onChange={e=>setFileAntes(e.target.files?.[0]||null)} />
          <button onClick={()=>subirFoto(fileAntes, "antes")} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Subir foto antes</button>
        </div>

        <div>
          <p className="font-semibold">Después</p>
          <input type="file" onChange={e=>setFileDespues(e.target.files?.[0]||null)} />
          <button onClick={()=>subirFoto(fileDespues, "despues")} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Subir foto después</button>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-semibold">Fotos</p>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {/* obtener fotos relacionadas a esta orden */}
          <FotosOrden ordenId={id} reload={() => cargar()} />
        </div>
      </div>

      <div className="mt-6 space-x-2">
        <button onClick={() => cambiarEstado("en_proceso")} className="bg-yellow-500 px-3 py-1 rounded">Marcar en proceso</button>
        <button onClick={() => cambiarEstado("finalizada")} className="bg-green-600 px-3 py-1 rounded">Marcar finalizada</button>
      </div>
    </div>
  );
}

// Componente pequeño para mostrar fotos
function FotosOrden({ ordenId }) {
  const [fotos, setFotos] = useState([]);
  useEffect(()=>{ (async()=>{
    const { data } = await supabase.from("fotos").select("*").eq("orden_id", ordenId);
    setFotos(data || []);
  })(); }, [ordenId]);

  return fotos.map(f => (
    <div key={f.id} className="border rounded overflow-hidden">
      <img src={f.url} alt={f.tipo} className="w-full h-36 object-cover" />
      <div className="p-2 text-sm">
        <div>Tipo: {f.tipo}</div>
      </div>
    </div>
  ));
}
