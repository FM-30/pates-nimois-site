"use client";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, MarkerClusterer } from "@react-google-maps/api";
import { useState, useRef } from "react";
import Image from "next/image";

const mapStyleLight = [
  { elementType: "geometry", stylers: [{ color: "#FFFEF7" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8B4513" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", stylers: [{ color: "#D4AF37" }] },
];
const mapStyleDark = [
  { elementType: "geometry", stylers: [{ color: "#2F1B14" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#D4AF37" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", stylers: [{ color: "#8B4513" }] },
];

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapSection({ stores }: { stores: any[] }) {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "" });
  const [selected, setSelected] = useState<any | null>(null);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [map, setMap] = useState<any>(null);
  const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const style = prefersDark ? mapStyleDark : mapStyleLight;

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(coords);
        if (map) map.panTo(coords);
      });
    }
  };

  const handleClosest = () => {
    if (!userPos) return;
    let minDist = Infinity;
    let closest = null;
    for (const store of stores) {
      const d = getDistance(userPos.lat, userPos.lng, store.position.lat, store.position.lng);
      if (d < minDist) {
        minDist = d;
        closest = store;
      }
    }
    if (closest && map) {
      map.panTo(closest.position);
      setSelected(closest);
    }
  };

  if (!isLoaded) return <div className="flex items-center justify-center h-full">Chargement de la carte...</div>;

  return (
    <div className="relative w-full h-full min-h-[350px]">
      <GoogleMap
        mapContainerClassName="w-full h-full min-h-[350px] rounded-l-2xl"
        center={{ lat: 43.834, lng: 4.36 }}
        zoom={13}
        options={{ styles: style, disableDefaultUI: true }}
        onLoad={setMap}
      >
        <MarkerClusterer>
          {(clusterer) => (
            <>
              {stores.map((store) => (
                <Marker
                  key={store.id}
                  position={store.position}
                  icon={{ url: "/logo-marker.svg", scaledSize: { width: 40, height: 40 } as any }}
                  clusterer={clusterer}
                  onClick={() => setSelected(store)}
                />
              ))}
              {userPos && (
                <Marker
                  position={userPos}
                  icon={{ url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", scaledSize: { width: 40, height: 40 } as any }}
                  zIndex={999}
                />
              )}
            </>
          )}
        </MarkerClusterer>
        {selected && (
          <InfoWindow position={selected.position} onCloseClick={() => setSelected(null)}>
            <div className="p-2 min-w-[180px]">
              <Image src={selected.photo} alt={selected.name} width={120} height={80} className="rounded mb-2 object-cover" />
              <div className="font-bold text-[#8B4513]">{selected.name}</div>
              <div className="text-xs text-[#2F1B14]">{selected.address}</div>
              <div className="text-xs text-[#CD853F] mb-1">{selected.hours}</div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selected.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 px-3 py-1 rounded bg-[#D4AF37] text-white text-xs font-semibold"
              >
                Itinéraire
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      {/* Boutons géoloc */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
        <button onClick={handleLocate} className="px-4 py-2 rounded-full bg-[#D4AF37] text-white font-semibold shadow hover:bg-[#8B4513] transition-colors">Me localiser</button>
        <button onClick={handleClosest} className="px-4 py-2 rounded-full bg-[#8B4513] text-white font-semibold shadow hover:bg-[#D4AF37] transition-colors">Trouver le plus proche</button>
      </div>
    </div>
  );
} 