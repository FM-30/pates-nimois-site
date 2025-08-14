"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-[#FFFEF7] via-[#F5F5DC] to-[#FFFEF7] z-50 flex items-center justify-center"
    >
      <div className="text-center">
        {/* Logo animé */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-[#D4AF37] to-[#8B4513] rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <span className="text-3xl font-bold text-white">🍰</span>
          </div>
        </motion.div>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl font-bold text-[#8B4513] mb-4"
        >
          Petits Pâtés Nîmois
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[#2F1B14] mb-8"
        >
          Chargement de l'authenticité...
        </motion.p>

        {/* Barre de progression */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto mb-4"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#8B4513] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Pourcentage */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-sm text-[#8B4513] font-medium"
        >
          {Math.round(progress)}%
        </motion.span>

        {/* Éléments décoratifs */}
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 bg-[#D4AF37] rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-12 h-12 bg-[#8B4513] rounded-full opacity-20"
          animate={{
            y: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </motion.div>
  );
}

// Composant Skeleton pour les cartes
export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
};

// Composant Skeleton pour la grille
export const GridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}; 