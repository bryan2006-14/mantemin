// app/admin/historial/[id]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";

export default function DetalleHistorialAdminPage() {
  const [trabajo, setTrabajo] = useState(null);
  const [tecnico, setTecnico] = useState(null);
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
      // Cargar trabajo
      const { data: trabajoData } = await supabase
        .from("historial_trabajos")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!trabajoData) {
        alert("Trabajo no encontrado");
        router.push("/admin/historial");
        return;
      }

      setTrabajo(trabajoData);

      // Cargar técnico
      const { data: tecnicoData } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", trabajoData.tecnico_id)
        .maybeSingle();

      setTecnico(tecnicoData);

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

  function imprimirReporte() {
    window.print();
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
      <div className="max-w-6xl mx-auto">
        {/* Header con acciones */}
        <div className="flex justify-between items-center mb-6 no-print">
          <h1 className="text-2xl font-bold">Reporte de Trabajo</h1>
          <div className="flex gap-3">
            <button
              onClick={imprimirReporte}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              🖨️ Imprimir
            </button>
            <button
              onClick={() => router.push("/admin/historial")}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Encabezado del Reporte */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <div className="text-center mb-6 pb-6 border-b">
            <h2 className="text-3xl font-bold text-gray-800">REPORTE DE MANTENIMIENTO</h2>
            <p className="text-gray-600 mt-2">ID: #{trabajo.id.slice(0, 8).toUpperCase()}</p>
            <p className="text-sm text-gray-500">
              Fecha de generación: {new Date().toLocaleDateString("es-ES", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Información del Trabajo */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-blue-600">Información del Servicio</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Tipo de Trabajo:</span>
                  <span className="font-medium capitalize">{trabajo.tipo}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Estado:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {trabajo.estado}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Duración:</span>
                  <span className="font-bold text-blue-600">
                    {formatearDuracion(trabajo.duracion_minutos)}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Fecha Inicio:</span>
                  <span className="font-medium">
                    {new Date(trabajo.inicio).toLocaleString("es-ES")}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Fecha Fin:</span>
                  <span className="font-medium">
                    {new Date(trabajo.fin).toLocaleString("es-ES")}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-blue-600">Técnico Responsable</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-medium">{tecnico?.nombre || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-sm">{tecnico?.email || "N/A"}</span>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-4 mt-6 text-blue-600">Cliente</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Razón Social:</span>
                  <span className="font-medium">{cliente?.nombre || "N/A"}</span>
                </div>
                {cliente?.ruc && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">RUC:</span>
                    <span className="font-medium">{cliente.ruc}</span>
                  </div>
                )}
                {cliente?.telefono && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Teléfono:</span>
                    <span className="font-medium">{cliente.telefono}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Información de la Máquina */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-blue-600">Equipo Intervenido</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-gray-600 mb-1">Código</p>
                <p className="font-bold text-lg">{maquina?.codigo || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-gray-600 mb-1">Marca</p>
                <p className="font-medium">{maquina?.marca || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-gray-600 mb-1">Modelo</p>
                <p className="font-medium">{maquina?.modelo || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-gray-600 mb-1">Horómetro</p>
                <p className="font-bold text-blue-600">{maquina?.horometro || 0} hrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción del Problema */}
        {trabajo.descripcion && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="font-bold text-lg mb-3">PROBLEMA REPORTADO</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-gray-700">{trabajo.descripcion}</p>
            </div>
          </div>
        )}

        {/* Observaciones del Técnico */}
        {trabajo.observaciones && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="font-bold text-lg mb-3">TRABAJO REALIZADO</h3>
            <div className="bg-gray-50 p-4 rounded border">
              <p className="text-gray-700 whitespace-pre-wrap">{trabajo.observaciones}</p>
            </div>
          </div>
        )}

        {/* Evidencias Fotográficas */}
        {trabajo.evidencias && trabajo.evidencias.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="font-bold text-lg mb-4">
              EVIDENCIAS FOTOGRÁFICAS ({trabajo.evidencias.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {trabajo.evidencias.map((ev, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <img
                    src={ev.url}
                    alt={`Evidencia ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2 bg-gray-50">
                    {ev.descripcion && (
                      <p className="text-xs text-gray-700 mb-1">{ev.descripcion}</p>
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

        {/* Firmas (para imprimir) */}
        <div className="bg-white rounded-lg shadow p-8 print-only">
          <div className="grid grid-cols-2 gap-16 mt-16">
            <div className="text-center">
              <div className="border-t-2 border-gray-400 pt-2 mt-16">
                <p className="font-bold">{tecnico?.nombre}</p>
                <p className="text-sm text-gray-600">Técnico Responsable</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t-2 border-gray-400 pt-2 mt-16">
                <p className="font-bold">Cliente</p>
                <p className="text-sm text-gray-600">Firma y Sello</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
        }
        @media screen {
          .print-only {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}