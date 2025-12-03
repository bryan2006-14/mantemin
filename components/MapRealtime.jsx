"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { supabase } from "@/lib/supabaseClient";

// Importación dinámica correcta de react-leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function MapRealtime() {
  const [tecnicos, setTecnicos] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [isClient, setIsClient] = useState(false);

  async function cargar() {
    const { data: t } = await supabase
      .from("tecnicos")
      .select("id, ubicacion_lat, ubicacion_lng, disponible, usuarios (nombre)")
      .order("id");
    const { data: m } = await supabase
      .from("maquinas")
      .select("id, codigo, foto_url, horometro, ubicacion_lat, ubicacion_lng");
    setTecnicos(t || []);
    setMaquinas(m || []);
  }

  useEffect(() => {
    setIsClient(true);
    
    // Fix para los iconos de Leaflet
    if (typeof window !== "undefined") {
      const L = require("leaflet");
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    }

    cargar();

    const ch1 = supabase
      .channel("ubicaciones")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tecnicos" },
        (payload) => {
          cargar();
        }
      )
      .subscribe();

    const ch2 = supabase
      .channel("maquinas")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "maquinas" },
        (payload) => {
          cargar();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ch1);
      supabase.removeChannel(ch2);
    };
  }, []);

  // Center default (Lima)
  const center = [-12.0464, -77.0428];

  if (!isClient) {
    return (
      <div className="h-[620px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="h-[620px]">
      <MapContainer center={center} zoom={12} className="h-full w-full rounded-lg shadow-lg">
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marcadores de técnicos */}
        {tecnicos
          .filter((t) => t.ubicacion_lat && t.ubicacion_lng)
          .map((t) => (
            <Marker key={`tecnico-${t.id}`} position={[t.ubicacion_lat, t.ubicacion_lng]}>
              <Popup>
                <div className="p-2">
                  <b className="text-lg">{t.usuarios?.nombre || "Técnico"}</b>
                  <br />
                  <span className={t.disponible ? "text-green-600" : "text-red-600"}>
                    Disponible: {t.disponible ? "Sí" : "No"}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        
        {/* Marcadores de máquinas */}
        {maquinas
          .filter((m) => m.ubicacion_lat && m.ubicacion_lng)
          .map((m) => (
            <Marker key={`maquina-${m.id}`} position={[m.ubicacion_lat, m.ubicacion_lng]}>
              <Popup>
                <div className="p-2">
                  <b className="text-lg">{m.codigo}</b>
                  <br />
                  Horómetro: {m.horometro || "N/A"} hrs
                  {m.foto_url && (
                    <img 
                      src={m.foto_url} 
                      alt={m.codigo} 
                      className="mt-2 w-32 h-32 object-cover rounded"
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}