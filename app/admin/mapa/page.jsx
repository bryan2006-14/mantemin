"use client";

import dynamic from "next/dynamic";

const MapRealtime = dynamic(() => import("@/components/MapRealtime"), {
  ssr: false,
});

export default function MapaAdmin() {
  return (
    <div className="h-screen">
      <MapRealtime />
    </div>
  );
}
