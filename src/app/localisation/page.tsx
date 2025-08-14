"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaMapMarkerAlt, FaStar, FaStore, FaBreadSlice, FaShoppingBasket, FaRoute, FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";

const MapSection = dynamic(() => import("./components/MapSection"), { ssr: false });
const MarketTimeline = dynamic(() => import("./components/MarketTimeline"), { ssr: false });

const stores = [
  {
    id: 1,
    name: "Boulangerie du Marché",
    type: "Boulangerie",
    position: { lat: 43.834, lng: 4.360 },
    address: "12 rue des Gourmets, Nîmes",
    hours: "7h-19h",
    photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    specialties: "Pâtés nîmois, pain artisanal",
    distance: 1.2,
  },
  {
    id: 2,
    name: "Maison Traiteur Dupont",
    type: "Traiteur",
    position: { lat: 43.838, lng: 4.355 },
    address: "5 avenue Jean Jaurès, Nîmes",
    hours: "8h-20h",
    photo: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    specialties: "Pâtés, charcuterie maison",
    distance: 2.1,
  },
  {
    id: 3,
    name: "Marché des Halles",
    type: "Marché",
    position: { lat: 43.836, lng: 4.364 },
    address: "Place des Halles, Nîmes",
    hours: "Mar, Jeu, Sam 7h-13h",
    photo: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    specialties: "Marché couvert, produits locaux",
    distance: 0.8,
  },
];

const types = ["Tous", "Boulangerie", "Traiteur", "Marché"];

export default function LocalisationPage() {
  const [type, setType] = useState("Tous");
  const filteredStores = stores.filter(s => type === "Tous" || s.type === type);

  return (
    <main className="min-h-screen bg-[#FFFEF7]">
      <section className="flex flex-col md:flex-row min-h-[80vh]">
        {/* Carte interactive */}
        <div className="md:w-1/2 w-full h-[350px] md:h-auto relative">
          <MapSection stores={filteredStores} />
        </div>
        {/* Infos points de vente */}
        <div className="md:w-1/2 w-full bg-white/80 backdrop-blur-lg p-8 flex flex-col gap-8 justify-center">
          <h2 className="text-3xl font-serif font-bold text-[#8B4513] mb-2">Où nous trouver</h2>
          <p className="text-[#2F1B14] mb-4">Retrouvez nos petits pâtés nîmois chez nos partenaires et sur les marchés locaux.</p>
          <div className="flex flex-wrap gap-3 mb-4">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full font-semibold border-2 border-[#D4AF37] text-[#8B4513] bg-white hover:bg-[#D4AF37] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${type === t ? 'bg-[#D4AF37] text-white' : ''}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-6 overflow-y-auto max-h-[60vh] pr-2">
            {filteredStores.map(store => (
              <div key={store.id} className="flex gap-4 items-center bg-white rounded-xl shadow p-4 hover:scale-105 transition-transform duration-200">
                <Image src={store.photo} alt={store.name} width={80} height={60} className="rounded-lg object-cover w-20 h-16" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[#8B4513] text-lg font-serif">{store.name}</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold ml-2">{store.type}</span>
                  </div>
                  <div className="text-[#2F1B14] text-sm">{store.specialties}</div>
                  <div className="text-xs text-[#8B4513]">{store.address}</div>
                  <div className="text-xs text-[#CD853F]">{store.hours}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <FaStar className="text-[#D4AF37]" /> <span className="text-xs text-[#8B4513]">{store.rating}</span>
                    <FaRoute className="ml-4 text-[#8B4513]" />
                    <span className="text-xs text-[#2F1B14]">{store.distance} km</span>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 px-3 py-1 rounded bg-[#D4AF37] text-white text-xs font-semibold hover:bg-[#8B4513] transition-colors"
                    >
                      Itinéraire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Timeline marchés */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-serif font-bold text-[#8B4513] mb-6 flex items-center gap-2"><FaCalendarAlt className="text-[#D4AF37]" /> Marchés hebdomadaires</h3>
        <MarketTimeline />
      </section>
    </main>
  );
} 