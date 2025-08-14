"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedTitle, AnimatedCounter, MagneticButton, ParallaxImage } from "./AnimatedComponents";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.1]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        {/* Dégradé doux + vignette pour le contraste */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFFEF7] via-[#F7F2DF] to-[#FFF8E8]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
        <ParallaxImage
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1920&h=1080&fit=crop"
          alt="Petits pâtés nîmois traditionnels"
          className="w-full h-full opacity-35"
          speed={0.25}
        />
      </motion.div>

      {/* Overlay pattern léger */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.12'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Contenu principal */}
      <motion.div 
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        {/* Badge flottant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center px-5 py-2.5 bg-ocre/90 text-white rounded-full mb-7 shadow-md backdrop-blur-sm"
        >
          <span className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></span>
          Tradition depuis 1874
        </motion.div>

        {/* Titre principal */}
        <AnimatedTitle className="mb-4 text-marron" >
          Les Petits Pâtés Nîmois
        </AnimatedTitle>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-lg md:text-2xl text-marron-fonce/90 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Découvrez l'authenticité d'une tradition culinaire séculaire qui fait la fierté de notre région
        </motion.p>

        {/* Statistiques animées en cartes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto"
        >
          {[
            { end: 150, label: "Années d'histoire" },
            { end: 1000, label: "Clients satisfaits" },
            { end: 50, label: "Points de vente" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/60 backdrop-blur-sm border border-ocre/20 px-6 py-6 shadow-sm hover:shadow-md transition">
              <AnimatedCounter end={stat.end} className="block text-3xl md:text-4xl font-extrabold text-ocre" />
              <span className="block mt-1 text-sm md:text-base text-marron-fonce font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            className="btn-primary"
            onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Découvrir nos produits
          </MagneticButton>
          
          <MagneticButton
            className="btn-secondary"
            onClick={() => document.getElementById('histoire')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Notre histoire
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#8B4513] rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-[#8B4513] rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Éléments décoratifs adoucis */}
      <motion.div
        className="absolute top-24 left-8 w-14 h-14 bg-[#D4AF37] rounded-full opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 160, 320] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-16 right-8 w-12 h-12 bg-[#8B4513] rounded-full opacity-20"
        animate={{ y: [0, 14, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </section>
  );
} 