"use client";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import Image from "next/image";

type Produit = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image: string;
  categorie: string;
  badge?: string;
};

const productImages = [
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80"
];

function getProductImage(idx: number) {
  return productImages[idx % productImages.length];
}

type ProductListProps = {
  produits: Produit[];
};

export default function ProductList({ produits }: ProductListProps) {
  const [modal, setModal] = useState<Produit | null>(null);
  const [favoris, setFavoris] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favoris") || "[]");
    }
    return [];
  });

  const toggleFavori = (id: number) => {
    setFavoris(favs => {
      const next = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
      if (typeof window !== "undefined") localStorage.setItem("favoris", JSON.stringify(next));
      return next;
    });
  };

  const share = (produit: Produit) => {
    if (navigator.share) {
      navigator.share({
        title: produit.nom,
        text: produit.description,
        url: window.location.href + "#produit-" + produit.id,
      });
    } else {
      window.alert("Partage non supporté sur ce navigateur.");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {produits.map((produit, idx) => (
          <div key={produit.id} id={`produit-${produit.id}`} className="relative bg-white shadow rounded p-4 flex flex-col group transition-transform duration-300 hover:scale-105">
            {produit.badge && <span className="absolute top-4 left-4 bg-ocre text-beige text-xs font-bold px-3 py-1 rounded-full shadow">{produit.badge}</span>}
            <button className="absolute top-4 right-4" aria-label="Ajouter aux favoris" onClick={() => toggleFavori(produit.id)}>
              {favoris.includes(produit.id) ? <FaHeart className="text-ocre text-xl" /> : <FaRegHeart className="text-marron text-xl" />}
            </button>
            <Image src={getProductImage(idx)} alt={produit.nom} width={320} height={220} className="rounded w-full h-40 object-cover mb-4" loading="lazy" />
            <h3 className="font-serif text-lg font-bold text-marron mb-1">{produit.nom}</h3>
            <p className="text-marron-fonce text-sm mb-2 flex-1">{produit.description}</p>
            <span className="text-ocre font-semibold text-lg mb-2">{produit.prix.toFixed(2)} €</span>
            <div className="flex gap-2 mt-auto">
              <button onClick={() => setModal(produit)} className="px-4 py-2 rounded-full bg-ocre text-marron-fonce font-semibold shadow hover:bg-marron hover:text-beige transition-colors duration-200">Nous contacter</button>
              <button onClick={() => share(produit)} className="px-3 py-2 rounded-full bg-beige text-marron hover:bg-ocre/10 transition-colors" aria-label="Partager"><FaShareAlt /></button>
            </div>
          </div>
        ))}
      </div>
      {modal && <ProductModal produit={modal} onClose={() => setModal(null)} produits={produits} />}
    </>
  );
} 