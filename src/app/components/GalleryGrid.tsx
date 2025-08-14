"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
];

export default function GalleryGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-marron mb-10 text-center">Galerie de nos produits</h2>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((src, idx) => (
          <motion.div
            key={src}
            className="mb-4 break-inside-avoid shadow rounded overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
          >
            <Image src={src} alt="Produit pâté nîmois" width={400} height={300} className="w-full h-auto object-cover rounded" />
          </motion.div>
        ))}
      </div>
    </section>
  );
} 