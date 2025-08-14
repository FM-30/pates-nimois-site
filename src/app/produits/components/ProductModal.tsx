import { FaTimes, FaShareAlt } from "react-icons/fa";
import { useState } from "react";

type Produit = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image: string;
  categorie: string;
  badge?: string;
};

type ProductModalProps = {
  produit: Produit;
  onClose: () => void;
  produits: Produit[];
};

export default function ProductModal({ produit, onClose, produits }: ProductModalProps) {
  const [imgIdx, setImgIdx] = useState(0);
  // Pour l'aperçu, on affiche un carré ocre à la place de l'image
  const images = [null, null, null];
  const suggestions = produits.filter(p => p.categorie === produit.categorie && p.id !== produit.id).slice(0,2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded shadow-lg max-w-lg w-full p-6 relative animate-fade-in-up">
        <button className="absolute top-4 right-4 text-2xl text-marron" aria-label="Fermer" onClick={onClose}><FaTimes /></button>
        <div className="mb-4">
          <div className="relative w-full h-56 mb-2 bg-ocre rounded" />
          <div className="flex gap-2 justify-center mb-2">
            {images.map((_, i) => (
              <button key={i} className={`w-12 h-12 rounded border-2 ${i===imgIdx?'border-ocre':'border-transparent'} bg-ocre`} onClick={()=>setImgIdx(i)} />
            ))}
          </div>
        </div>
        <h2 className="font-serif text-2xl font-bold text-marron mb-2">{produit.nom}</h2>
        {produit.badge && <span className="inline-block bg-ocre text-beige text-xs font-bold px-3 py-1 rounded-full shadow mb-2">{produit.badge}</span>}
        <p className="text-marron-fonce mb-2">{produit.description}</p>
        <span className="text-ocre font-semibold text-lg mb-4 block">{produit.prix.toFixed(2)} €</span>
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 rounded-full bg-ocre text-marron-fonce font-semibold shadow hover:bg-marron hover:text-beige transition-colors duration-200">Nous contacter</button>
          <button className="px-3 py-2 rounded-full bg-beige text-marron hover:bg-ocre/10 transition-colors" aria-label="Partager"><FaShareAlt /></button>
        </div>
        {suggestions.length > 0 && (
          <div className="mt-4">
            <h3 className="font-serif text-lg font-bold text-marron mb-2">Suggestions similaires</h3>
            <div className="flex gap-4">
              {suggestions.map(s => (
                <div key={s.id} className="flex-1 bg-beige rounded p-2 flex flex-col items-center">
                  <div className="rounded mb-1 object-cover w-[60px] h-[40px] bg-ocre" />
                  <span className="text-marron text-sm font-semibold text-center">{s.nom}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 