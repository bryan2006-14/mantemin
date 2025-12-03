"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CrearMaquinaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [clientes, setClientes] = useState([]);
  
  const [formData, setFormData] = useState({
    codigo: "",
    marca: "",
    modelo: "",
    cliente_id: "",
    descripcion: "",
    estado: "operativo",
    foto_url: ""
  });

  // Cargar clientes al iniciar
  useEffect(() => {
    cargarClientes();
  }, []);

  async function cargarClientes() {
    const { data, error } = await supabase
      .from('clientes')
      .select('id, nombre')
      .order('nombre');
    
    if (!error && data) {
      setClientes(data);
    } else {
      console.error('Error al cargar clientes:', error);
    }
  }

  // Generar código automático
  const generarCodigoAutomatico = async () => {
    try {
      const { data, error } = await supabase
        .from('maquinas')
        .select('codigo')
        .order('id', { ascending: false })
        .limit(1);
      
      if (!error && data && data.length > 0) {
        const ultimoCodigo = data[0].codigo;
        const numeros = ultimoCodigo.replace(/\D/g, '');
        const numero = parseInt(numeros) || 0;
        const nuevoCodigo = `MAQ-${String(numero + 1).padStart(4, '0')}`;
        setFormData(prev => ({ ...prev, codigo: nuevoCodigo }));
      } else {
        setFormData(prev => ({ ...prev, codigo: 'MAQ-0001' }));
      }
    } catch (error) {
      console.error('Error al generar código:', error);
      const timestamp = Date.now().toString().slice(-6);
      setFormData(prev => ({ ...prev, codigo: `MAQ-${timestamp}` }));
    }
  };

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Subir imagen a Supabase Storage
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar los 5MB');
      return;
    }

    try {
      setUploading(true);

      // Crear nombre único para el archivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `maquinas/${fileName}`;

      // Subir a Supabase Storage
      const { data, error } = await supabase.storage
        .from('imagenes') // Nombre de tu bucket
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error al subir imagen:', error);
        
        // Mensajes de error más específicos
        if (error.message.includes('Bucket not found')) {
          alert('❌ Error: El bucket "imagenes" no existe en Supabase.\n\n' +
                '📝 Pasos para solucionarlo:\n' +
                '1. Ve a tu proyecto en Supabase\n' +
                '2. Abre Storage en el menú lateral\n' +
                '3. Crea un nuevo bucket llamado "imagenes"\n' +
                '4. Márcalo como público (Public bucket)\n' +
                '5. Guarda y vuelve a intentar');
        } else {
          alert('Error al subir la imagen: ' + error.message);
        }
        return;
      }

      // Obtener URL pública
      const { data: publicData } = supabase.storage
        .from('imagenes')
        .getPublicUrl(filePath);

      const publicUrl = publicData.publicUrl;
      
      console.log('Imagen subida exitosamente:', publicUrl);

      // Actualizar formulario y preview
      setFormData(prev => ({ ...prev, foto_url: publicUrl }));
      setPreviewUrl(URL.createObjectURL(file));

    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la imagen');
    } finally {
      setUploading(false);
    }
  };

  // Eliminar imagen
  const removeImage = () => {
    setFormData(prev => ({ ...prev, foto_url: "" }));
    setPreviewUrl(null);
  };

  // Verificar si el código ya existe
  const verificarCodigoExiste = async (codigo) => {
    const { data, error } = await supabase
      .from('maquinas')
      .select('id')
      .eq('codigo', codigo)
      .single();
    
    return data !== null;
  };

  // Guardar máquina
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.codigo || !formData.marca) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      // Verificar si el código ya existe
      const codigoExiste = await verificarCodigoExiste(formData.codigo);
      if (codigoExiste) {
        alert(`❌ El código "${formData.codigo}" ya está en uso.\n\nPor favor usa un código diferente.`);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('maquinas')
        .insert([{
          codigo: formData.codigo,
          marca: formData.marca,
          modelo: formData.modelo,
          cliente_id: formData.cliente_id || null,
          descripcion: formData.descripcion,
          estado: formData.estado,
          foto_url: formData.foto_url || null
        }])
        .select();

      if (error) {
        console.error('Error al crear máquina:', error);
        
        // Mensajes de error específicos
        if (error.message.includes('duplicate key')) {
          alert('❌ El código ya existe. Por favor usa uno diferente.');
        } else if (error.message.includes('foreign key')) {
          alert('❌ El cliente seleccionado no existe.');
        } else {
          alert('❌ Error al crear la máquina: ' + error.message);
        }
        return;
      }

      console.log('Máquina creada:', data);
      alert('✅ ¡Máquina creada exitosamente!');
      router.push('/admin/maquinas');
      
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error al guardar la máquina');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nueva Máquina</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
        
        {/* SUBIR IMAGEN */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Foto de la máquina
          </label>
          
          {previewUrl || formData.foto_url ? (
            <div className="relative inline-block">
              <img 
                src={previewUrl || formData.foto_url} 
                alt="Preview" 
                className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 shadow-lg"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="cursor-pointer"
              >
                {uploading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-sm text-gray-600">Subiendo imagen...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700 mb-1">Haz clic para subir una imagen</p>
                    <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                  </div>
                )}
              </label>
            </div>
          )}
        </div>

        {/* CÓDIGO */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Código <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: MAQ-001"
            />
            <button
              type="button"
              onClick={generarCodigoAutomatico}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
              title="Generar código automático"
            >
              🔄 Auto
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            El código debe ser único. Usa el botón "Auto" para generar uno automáticamente.
          </p>
        </div>

        {/* MARCA */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Marca <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Caterpillar"
          />
        </div>

        {/* MODELO */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Modelo
          </label>
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: 320D"
          />
        </div>

        {/* CLIENTE */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cliente
          </label>
          <select
            name="cliente_id"
            value={formData.cliente_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">Seleccionar cliente (opcional)</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
          {clientes.length === 0 && (
            <p className="text-xs text-amber-600 mt-1">
              ⚠️ No hay clientes registrados. 
              <a href="/admin/clientes/crear" className="underline ml-1">Crear uno aquí</a>
            </p>
          )}
        </div>

        {/* DESCRIPCIÓN */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe las características de la máquina..."
          />
        </div>

        {/* ESTADO */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estado
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="operativo">Operativo</option>
            <option value="en mantenimiento">En Mantenimiento</option>
            <option value="fuera de servicio">Fuera de Servicio</option>
          </select>
        </div>

        {/* BOTONES */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? 'Guardando...' : 'Guardar Máquina'}
          </button>
          
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}