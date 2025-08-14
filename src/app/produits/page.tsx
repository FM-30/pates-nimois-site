"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ProductModal from "./components/ProductModal";
import Image from "next/image";
import { FaStar, FaLeaf, FaHandHoldingHeart } from "react-icons/fa";

const categories = ["Tous", "Traditionnels", "Créatifs", "Plateaux"];

const produits = [
  {
    id: 1,
    nom: "Petit pâté veau et porc",
    description: "La recette classique, pâte dorée, farce veau et porc, épices douces.",
    prix: 2.5,
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
    badge: "Fait main",
    categorie: "Traditionnels",
  },
  {
    id: 2,
    nom: "Petit pâté à la brandade",
    description: "Alliance de la brandade de Nîmes et de la pâte feuilletée artisanale.",
    prix: 2.8,
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?auto=format&fit=crop&w=600&q=80",
    badge: "Recette 1890",
    categorie: "Traditionnels",
  },
  {
    id: 3,
    nom: "Assortiment découverte",
    description: "Un coffret de 6 petits pâtés variés pour découvrir toutes nos saveurs.",
    prix: 14.0,
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
    badge: "Fait main",
    categorie: "Plateaux",
  },
  {
    id: 4,
    nom: "Petit pâté au taureau",
    description: "Farce de taureau AOP, épices du sud, pâte croustillante.",
    prix: 3.2,
    image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=600&q=80",
    badge: "Nouveau",
    categorie: "Créatifs",
  },
  {
    id: 5,
    nom: "Version au chorizo",
    description: "Une touche ibérique, chorizo doux et viande de porc.",
    prix: 2.9,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
    badge: "Créatif",
    categorie: "Créatifs",
  },
  {
    id: 6,
    nom: "Édition limitée saisonnière",
    description: "Recette créative selon la saison, ingrédients locaux.",
    prix: 3.5,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
    badge: "Saison",
    categorie: "Créatifs",
  },
];

export default function ProduitsPage() {
  const [categorie, setCategorie] = useState("Tous");
  const [modal, setModal] = useState<typeof produits[0] | null>(null);

  const produitsFiltres = produits.filter(p =>
    categorie === "Tous" || p.categorie === categorie
  );

  return (
    <main className="bg-[#FFFEF7] min-h-screen pb-16">
      {/* Header section */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold text-[#8B4513] mb-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Nos Produits
        </motion.h2>
        <motion.p
          className="text-xl text-[#2F1B14] mb-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Découvrez l'excellence de la tradition nîmoise, du feuilleté doré aux créations gourmandes.
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategorie(cat)}
              className={`px-6 py-2 rounded-full font-semibold border-2 border-[#D4AF37] text-[#8B4513] bg-white hover:bg-[#D4AF37] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${categorie === cat ? 'bg-[#D4AF37] text-white' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
      {/* Masonry grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {produitsFiltres.map((produit, idx) => (
            <motion.div
              key={produit.id}
              className="relative mb-6 break-inside-avoid rounded-2xl shadow-lg overflow-hidden group bg-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <Image
                  src={produit.image}
                  alt={produit.nom}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="inline-block bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full shadow mb-2 animate-bounce" title={produit.badge}>
                    {produit.badge === "Fait main" ? <FaHandHoldingHeart className="inline mr-1" /> : <FaStar className="inline mr-1" />}
                    {produit.badge}
                  </span>
                  <span className="text-white text-sm">{produit.description}</span>
                </div>
              </div>
              <div className="p-4 bg-white/80 backdrop-blur rounded-b-2xl">
                <h3 className="font-serif text-xl font-bold text-[#8B4513] mb-1">{produit.nom}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#CD853F]">{produit.prix.toFixed(2)} €</span>
                  <button
                    className="relative px-5 py-2 rounded-full bg-[#8B4513] text-white font-semibold shadow hover:bg-[#D4AF37] hover:text-[#2F1B14] transition-all duration-200 overflow-hidden"
                    onClick={() => setModal(produit)}
                  >
                    Commander
                    <span className="absolute left-0 top-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="absolute left-[-75%] top-0 w-1/2 h-full bg-white/40 blur-lg rotate-12 animate-shine" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Modal produit */}
      {modal && <ProductModal produit={modal} onClose={() => setModal(null)} produits={produitsFiltres} />}
      {/* Animation brillance bouton */}
      <style>{`
        .animate-shine {
          animation: shine 1.2s linear forwards;
        }
        @keyframes shine {
          0% { left: -75%; opacity: 0; }
          50% { left: 100%; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </main>
  );
} 