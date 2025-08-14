"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type ProductCardProps = {
  image: string;
  title: string;
  description: string;
  price: string;
  onMore?: () => void;
};

export default function ProductCard({ image, title, description, price, onMore }: ProductCardProps) {
  return (
    <motion.div
      className="bg-white shadow rounded p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Image src={image} alt={title} width={220} height={160} className="rounded mb-4 object-cover" />
      <h3 className="font-serif text-xl font-bold text-marron mb-2 text-center">{title}</h3>
      <p className="text-marron-fonce text-center mb-2">{description}</p>
      <span className="text-ocre font-semibold text-lg mb-4">{price}</span>
      <button
        onClick={onMore}
        className="mt-auto px-6 py-2 rounded-full bg-ocre text-marron-fonce font-semibold shadow hover:bg-marron hover:text-beige transition-colors duration-200"
      >
        En savoir plus
      </button>
    </motion.div>
  );
} 