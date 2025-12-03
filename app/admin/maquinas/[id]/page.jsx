"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function MaquinaPerfilPage() {
  const { id } = useParams(); // /admin/maquinas/[id]
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function cargar() {
    const { data: maquina } = await supabase
      .from("maquinas")
      .select("*, clientes(*)")
      .eq("id", id)
      .single();

    setData(maquina);
    setLoading(false);
  }

  useEffect(() => {
    cargar();
  }, []);

  if (loading) return <div className="p-6">Cargando...</div>;
  if (!data) return <div className="p-6">No se encontró la máquina.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/admin/maquinas" className="text-blue-600">← Volver</Link>

      <div className="mt-4 bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Perfil de Máquina</h1>

        {/* FOTO */}
        <div className="w-full flex justify-center mb-4">
          <Image
            src={data.foto_url || "/noimage.png"}
            width={250}
            height={250}
            alt="Foto de la máquina"
            className="rounded-lg border object-cover"
          />
        </div>

        {/* INFO PRINCIPAL */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Código</p>
            <p className="font-semibold">{data.codigo}</p>
          </div>

          <div>
            <p className="text-gray-500">Cliente</p>
            <p className="font-semibold">{data.clientes?.nombre || "—"}</p>
          </div>

          <div>
            <p className="text-gray-500">Marca</p>
            <p className="font-semibold">{data.marca}</p>
          </div>

          <div>
            <p className="text-gray-500">Modelo</p>
            <p className="font-semibold">{data.modelo}</p>
          </div>

          <div>
            <p className="text-gray-500">Serie</p>
            <p className="font-semibold">{data.serie}</p>
          </div>

          <div>
            <p className="text-gray-500">Horómetro</p>
            <p className="font-semibold">{data.horometro || "—"}</p>
          </div>

          <div>
            <p className="text-gray-500">Estado</p>
            <p className="font-semibold capitalize">{data.estado}</p>
          </div>

          <div>
            <p className="text-gray-500">Fecha Registro</p>
            <p className="font-semibold">{new Date(data.creado).toLocaleString()}</p>
          </div>
        </div>

        {/* DESCRIPCIÓN */}
        <div className="mt-6">
          <p className="text-gray-500 mb-1">Descripción</p>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {data.descripcion || "Sin descripción"}
          </p>
        </div>

        {/* BOTONES */}
        <div className="mt-6 flex gap-3">
          <Link
            href={`/admin/maquinas/editar/${data.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Editar
          </Link>

          <Link
            href={`/admin/ordenes/crear?maquina=${data.id}`}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Crear OT
          </Link>
        </div>
      </div>
    </div>
  );
}
