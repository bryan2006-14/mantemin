"use client";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";

// Componente principal envuelto en Suspense
export default function TrabajoActualPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TrabajoActualContent />
    </Suspense>
  );
}

// Componente de carga
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando trabajo actual...</p>
      </div>
    </div>
  );
}

// Componente de contenido que usa useSearchParams
function TrabajoActualContent() {
  const [orden, setOrden] = useState(null);
  const [maquina, setMaquina] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [observaciones, setObservaciones] = useState("");
  const [finalizando, setFinalizando] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    cargarTrabajoActual();
  }, [searchParams]);

  async function cargarTrabajoActual() {
    try {
      // Verificar sesión
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      setUser(session.user);

      // Buscar técnico en BD
      const { data: tecnicoBD } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", session.user.email)
        .eq("rol", "tecnico")
        .maybeSingle();

      const tecnicoId = tecnicoBD?.id || session.user.id;
      const ordenId = searchParams.get('orden');
      
      // Buscar orden en progreso
      let ordenData;
      
      if (ordenId) {
        // Buscar por ID específico
        const { data } = await supabase
          .from("ordenes")
          .select("*")
          .eq("id", ordenId)
          .eq("tecnico_id", tecnicoId)
          .single();
        
        ordenData = data;
      } else {
        // Buscar la última orden en progreso
        const { data } = await supabase
          .from("ordenes")
          .select("*")
          .eq("tecnico_id", tecnicoId)
          .eq("estado", "en_progreso")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        
        ordenData = data;
      }

      if (!ordenData) {
        alert("No tienes trabajos en progreso");
        router.push("/tecnico");
        return;
      }

      setOrden(ordenData);

      // Cargar detalles de la máquina
      const { data: maquinaData } = await supabase
        .from("maquinas")
        .select("*")
        .eq("id", ordenData.maquina_id)
        .single();

      if (maquinaData) {
        setMaquina(maquinaData);
        
        // Cargar cliente
        if (maquinaData.cliente_id) {
          const { data: clienteData } = await supabase
            .from("clientes")
            .select("*")
            .eq("id", maquinaData.cliente_id)
            .single();
          
          setCliente(clienteData);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cargar trabajo: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function finalizarTrabajo() {
    if (!orden || !observaciones.trim()) {
      alert("⚠️ Por favor ingresa observaciones antes de finalizar");
      return;
    }

    const confirmacion = confirm(`¿Estás seguro de finalizar este trabajo?

Orden: #${orden.id}
Tipo: ${orden.tipo}

Esto marcará el trabajo como completado.`);
    
    if (!confirmacion) return;

    setFinalizando(true);
    
    try {
      const ahora = new Date().toISOString();

      // 1. Actualizar orden a completada
      const { error: ordenError } = await supabase
        .from("ordenes")
        .update({ 
          estado: "completada",
          fecha_fin: ahora,
          observaciones: observaciones
        })
        .eq("id", orden.id);

      if (ordenError) throw ordenError;

      // 2. Registrar en historial
      const { error: historialError } = await supabase
        .from("historial")
        .insert({
          orden_id: orden.id,
          tecnico_id: user.id,
          accion: "finalizar_trabajo",
          detalles: `Trabajo completado. Observaciones: ${observaciones}`,
          fecha: ahora
        });

      if (historialError) {
        console.warn("⚠️ No se pudo crear historial:", historialError);
      }

      console.log("✅ Trabajo finalizado correctamente");
      console.log("📋 Orden ID:", orden.id);
      console.log("📝 Observaciones:", observaciones);
      
      alert("✅ ¡Trabajo finalizado correctamente!\n\nLa orden se ha movido al historial.");
      
      // Redirigir al dashboard (la orden ya no aparecerá)
      router.push("/tecnico");
      
    } catch (error) {
      console.error("❌ Error al finalizar:", error);
      alert("❌ Error al finalizar: " + error.message);
    } finally {
      setFinalizando(false);
    }
  }

  async function cancelarTrabajo() {
    const confirmacion = confirm(`⚠️ ¿Estás seguro de cancelar este trabajo?

Esto devolverá la orden al estado "Pendiente" y podrás iniciarla nuevamente después.`);
    
    if (!confirmacion) return;
    
    try {
      const { error } = await supabase
        .from("ordenes")
        .update({ 
          estado: "asignada",
          fecha_inicio: null
        })
        .eq("id", orden.id);

      if (error) throw error;

      // Registrar en historial
      await supabase
        .from("historial")
        .insert({
          orden_id: orden.id,
          tecnico_id: user.id,
          accion: "cancelar_trabajo",
          detalles: "Trabajo cancelado por el técnico",
          fecha: new Date().toISOString()
        });
      
      alert("⏸️ Trabajo cancelado. La orden volverá a estar disponible.");
      router.push("/tecnico");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cancelar: " + error.message);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">🚀 Trabajo en Progreso</h1>
            <p className="text-gray-600">Orden #{orden?.id}</p>
          </div>
          <button
            onClick={() => router.push("/tecnico")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ← Volver al Panel
          </button>
        </div>

        {/* Información Principal */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">📝 Descripción del Trabajo</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-800">{orden?.descripcion || "Sin descripción"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Tipo</p>
              <p className="font-medium capitalize">{orden?.tipo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Prioridad</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                orden?.prioridad === 'urgente' ? 'bg-red-100 text-red-800' :
                orden?.prioridad === 'alta' ? 'bg-orange-100 text-orange-800' :
                orden?.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {orden?.prioridad}
              </span>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>🕐 Iniciado: {new Date(orden?.fecha_inicio || orden?.created_at).toLocaleString("es-ES")}</p>
          </div>
        </div>

        {/* Información de la Máquina */}
        {maquina && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="font-bold text-lg mb-4">🚜 Máquina</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Código</p>
                <p className="font-bold">{maquina.codigo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Marca/Modelo</p>
                <p>{maquina.marca} {maquina.modelo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Horómetro</p>
                <p className="font-bold text-green-700">{maquina.horometro || 0} hrs</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  maquina.estado === 'operativa' ? 'bg-green-100 text-green-800' :
                  maquina.estado === 'mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {maquina.estado}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Información del Cliente */}
        {cliente && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="font-bold text-lg mb-4">👤 Cliente</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nombre</p>
                <p className="font-medium">{cliente.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p>{cliente.telefono || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p>{cliente.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">RUC</p>
                <p>{cliente.ruc || "N/A"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Formulario para finalizar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">📋 Registrar Finalización</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Observaciones / Trabajo Realizado * <span className="text-red-500">Requerido</span>
            </label>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Describe detalladamente:
• Actividades realizadas
• Repuestos o piezas utilizadas
• Problemas encontrados y solucionados
• Recomendaciones para el cliente
• Cualquier observación importante..."
              rows="6"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Mínimo 20 caracteres • {observaciones.length} caracteres escritos
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={finalizarTrabajo}
              disabled={finalizando || observaciones.trim().length < 20}
              className={`flex-1 py-3 text-white rounded font-bold transition ${
                finalizando || observaciones.trim().length < 20
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {finalizando ? "⏳ Finalizando..." : "✅ Finalizar Trabajo"}
            </button>
            
            <button
              onClick={cancelarTrabajo}
              disabled={finalizando}
              className="px-6 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-400"
            >
              ⏸️ Cancelar
            </button>
          </div>
          
          {observaciones.trim().length < 20 && observaciones.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              ⚠️ Las observaciones deben tener al menos 20 caracteres
            </p>
          )}
        </div>
      </div>
    </div>
  );
}