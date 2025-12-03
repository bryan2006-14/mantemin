"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

// Componente para manejar imágenes con fallback
function ImagenMaquina({ url, alt = "foto máquina" }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Debug: ver qué URL llega
  useEffect(() => {
    console.log("URL de imagen recibida:", url);
  }, [url]);

  // Validar que la URL sea válida
  const isValidUrl = url && url.trim() !== "" && (url.startsWith("http://") || url.startsWith("https://"));

  if (!isValidUrl || error) {
    return (
      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
        <svg 
          className="w-8 h-8 text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-16 h-16">
      {loading && (
        <div className="absolute inset-0 bg-gray-100 rounded flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={url}
        alt={alt}
        className="w-16 h-16 object-cover rounded"
        onLoad={() => {
          console.log("Imagen cargada correctamente:", url);
          setLoading(false);
        }}
        onError={(e) => {
          console.error("Error al cargar imagen:", url, e);
          setError(true);
          setLoading(false);
        }}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
}

export default function MaquinasPage() {
  const [maquinas, setMaquinas] = useState([]);
  const [loading, setLoading] = useState(true);

  async function cargar() {
    setLoading(true);
    const { data, error } = await supabase
      .from("maquinas")
      .select("*, clientes(nombre)")
      .order("id");

    if (!error) {
      // Debug: ver toda la data que llega
      console.log("=== DATOS DE MÁQUINAS ===");
      console.log("Total máquinas:", data?.length);
      data?.forEach((m, i) => {
        console.log(`Máquina ${i + 1}:`, {
          id: m.id,
          codigo: m.codigo,
          foto_url: m.foto_url,
          tipo_foto_url: typeof m.foto_url
        });
      });
      console.log("=========================");
      
      setMaquinas(data || []);
    } else {
      console.error("Error al cargar máquinas:", error);
    }
    setLoading(false);
  }

  async function eliminar(id) {
    const maquina = maquinas.find(m => m.id === id);
    const nombreMaquina = maquina?.codigo || `ID ${id}`;
    
    console.log("=== INTENTANDO ELIMINAR ===");
    console.log("ID:", id);
    console.log("Máquina:", maquina);
    
    if (!confirm(`¿Estás seguro de eliminar la máquina "${nombreMaquina}"?\n\nEsta acción no se puede deshacer.`)) {
      return;
    }

    try {
      console.log("Ejecutando delete para ID:", id);
      
      const { data, error } = await supabase
        .from("maquinas")
        .delete()
        .eq("id", id)
        .select(); // Agregado para ver qué se eliminó

      console.log("Respuesta de Supabase:");
      console.log("- Data:", data);
      console.log("- Error:", error);
      console.log("- Error code:", error?.code);
      console.log("- Error message:", error?.message);
      console.log("- Error details:", error?.details);

      if (error) {
        console.error("❌ ERROR COMPLETO:", JSON.stringify(error, null, 2));
        
        // Mensajes de error más específicos
        if (error.code === '23503') {
          alert(
            `❌ No se puede eliminar la máquina "${nombreMaquina}"\n\n` +
            `Esta máquina tiene registros relacionados.\n\n` +
            `Detalles: ${error.details || error.message}`
          );
        } else if (error.code === '42501') {
          alert(
            `❌ No tienes permisos para eliminar esta máquina\n\n` +
            `Verifica las políticas RLS en Supabase.`
          );
        } else if (error.message) {
          alert(`❌ Error al eliminar: ${error.message}\n\nCódigo: ${error.code || 'N/A'}`);
        } else {
          alert(`❌ Error desconocido al eliminar\n\nRevisa la consola del navegador (F12)`);
        }
        return;
      }

      console.log("✅ Eliminación exitosa");
      alert(`✅ Máquina "${nombreMaquina}" eliminada correctamente`);
      cargar();
      
    } catch (error) {
      console.error("❌ ERROR EN CATCH:", error);
      alert(`❌ Error inesperado: ${error.message || 'Error desconocido'}`);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando máquinas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Máquinas</h1>
        <Link
          href="/admin/maquinas/crear"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Máquina
        </Link>
      </div>

      {maquinas.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg 
            className="w-20 h-20 text-gray-300 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
            />
          </svg>
          <p className="text-gray-500 text-lg font-medium mb-2">No hay máquinas registradas</p>
          <p className="text-gray-400 text-sm mb-4">Crea una nueva máquina para comenzar</p>
          <Link
            href="/admin/maquinas/crear"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Crear primera máquina
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Foto</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Código</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Marca</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Modelo</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Descripción</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {maquinas.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    {/* FOTO */}
                    <td className="px-4 py-3">
                      <ImagenMaquina url={m.foto_url} alt={`Foto de ${m.codigo}`} />
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{m.codigo || "—"}</span>
                    </td>
                    
                    <td className="px-4 py-3 text-gray-700">{m.marca || "—"}</td>
                    <td className="px-4 py-3 text-gray-700">{m.modelo || "—"}</td>
                    <td className="px-4 py-3 text-gray-700">{m.clientes?.nombre || "—"}</td>

                    {/* DESCRIPCIÓN */}
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {m.descripcion || "Sin descripción"}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        m.estado === 'operativo' 
                          ? 'bg-green-100 text-green-800' 
                          : m.estado === 'en mantenimiento'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {m.estado || "—"}
                      </span>
                    </td>

                    {/* ACCIONES */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Link
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                          href={`/admin/maquinas/editar/${m.id}`}
                          title="Editar"
                        >
                          ✏️
                        </Link>

                        <button
                          className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                          onClick={() => eliminar(m.id)}
                          title="Eliminar"
                        >
                          🗑️
                        </button>

                        <Link
                          className="text-green-600 hover:text-green-800 font-medium text-sm transition-colors"
                          href={`/admin/maquinas/${m.id}`}
                          title="Ver Perfil"
                        >
                          👁️
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Info de debug */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        Total de máquinas: {maquinas.length} | Abre la consola (F12) para ver detalles de las URLs
      </div>
    </div>
  );
}