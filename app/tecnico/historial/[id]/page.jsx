// app/tecnico/historial/[id]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";

export default function DetalleHistorialPage() {
  const [trabajo, setTrabajo] = useState(null);
  const [maquina, setMaquina] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    cargarDetalle();
  }, []);

  async function cargarDetalle() {
    try {
      const { data: trabajoData } = await supabase
        .from("historial_trabajos")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!trabajoData) {
        alert("Trabajo no encontrado");
        router.push("/tecnico/historial");
        return;
      }

      setTrabajo(trabajoData);

      // Cargar máquina
      const { data: maquinaData } = await supabase
        .from("maquinas")
        .select("*")
        .eq("id", trabajoData.maquina_id)
        .maybeSingle();

      setMaquina(maquinaData);

      // Cargar cliente
      if (maquinaData?.cliente_id) {
        const { data: clienteData } = await supabase
          .from("clientes")
          .select("*")
          .eq("id", maquinaData.cliente_id)
          .maybeSingle();
        setCliente(clienteData);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatearDuracion(minutos) {
    if (!minutos) return "N/A";
    
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    
    if (horas === 0) return `${mins} minutos`;
    return `${horas} hora${horas > 1 ? 's' : ''} ${mins} minutos`;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!trabajo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Trabajo no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Detalle del Trabajo</h1>
          <button
            onClick={() => router.push("/tecnico/historial")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ← Volver al Historial
          </button>
        </div>

        {/* Información General */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Información General</h2>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
              ✅ Completado
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Máquina</p>
                <p className="font-bold text-lg">{maquina?.codigo || "N/A"}</p>
                <p className="text-sm text-gray-600">{maquina?.marca} {maquina?.modelo}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Cliente</p>
                <p className="font-medium">{cliente?.nombre || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Tipo de Trabajo</p>
                <p className="font-medium capitalize">{trabajo.tipo}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-600">Duración Total</p>
                <p className="font-bold text-2xl text-blue-600">
                  {formatearDuracion(trabajo.duracion_minutos)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Inicio</p>
                  <p className="font-medium text-sm">
                    {new Date(trabajo.inicio).toLocaleString("es-ES")}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Finalización</p>
                  <p className="font-medium text-sm">
                    {new Date(trabajo.fin).toLocaleString("es-ES")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción del Problema */}
        {trabajo.descripcion && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="font-bold text-lg mb-3">📋 Problema Reportado</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-gray-700">{trabajo.descripcion}</p>
            </div>
          </div>
        )}

        {/* Observaciones del Técnico */}
        {trabajo.observaciones && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="font-bold text-lg mb-3">📝 Observaciones del Técnico</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-700 whitespace-pre-wrap">{trabajo.observaciones}</p>
            </div>
          </div>
        )}

        {/* Evidencias Fotográficas */}
        {trabajo.evidencias && trabajo.evidencias.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4">📸 Evidencias Fotográficas ({trabajo.evidencias.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trabajo.evidencias.map((ev, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img
                    src={ev.url}
                    alt={`Evidencia ${index + 1}`}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => window.open(ev.url, '_blank')}
                  />
                  <div className="p-3">
                    {ev.descripcion && (
                      <p className="text-sm text-gray-700 mb-2">{ev.descripcion}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(ev.fecha).toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}