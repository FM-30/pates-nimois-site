"use client";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, GlassCard, FloatingElement } from "./AnimatedComponents";

const timelineData = [
  {
    year: "1874",
    title: "Les Origines",
    description: "Création de la première recette traditionnelle des petits pâtés nîmois par la famille Martin.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    position: "left"
  },
  {
    year: "1920",
    title: "L'Expansion",
    description: "Ouverture du premier atelier de production et début de la commercialisation dans la région.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    position: "right"
  },
  {
    year: "1950",
    title: "La Reconnaissance",
    description: "Obtention du label de qualité et reconnaissance nationale de notre savoir-faire.",
    image: "https://images.unsplash.com/photo-1504674900240-9a9049b7c63e?w=400&h=300&fit=crop",
    position: "left"
  },
  {
    year: "1980",
    title: "L'Innovation",
    description: "Modernisation des techniques de production tout en préservant l'authenticité de la recette.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    position: "right"
  },
  {
    year: "2024",
    title: "L'Avenir",
    description: "Continuation de la tradition avec de nouvelles saveurs et une présence digitale renforcée.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    position: "left"
  }
];

export default function TimelineSection() {
  return (
    <section id="histoire" className="py-20 bg-gradient-to-br from-[#FFFEF7] via-[#F5F5DC] to-[#FFFEF7] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-4">
            Notre Histoire
          </h2>
          <p className="text-lg text-[#2F1B14] max-w-2xl mx-auto">
            Une tradition culinaire transmise de génération en génération, 
            préservant l'authenticité et le savoir-faire ancestral.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne centrale */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#D4AF37] to-[#8B4513] h-full hidden lg:block"
          />

          <StaggerContainer className="space-y-12 lg:space-y-0">
            {timelineData.map((item, index) => (
              <StaggerItem key={index}>
                <div className={`flex flex-col lg:flex-row items-center gap-8 ${
                  item.position === "right" ? "lg:flex-row-reverse" : ""
                }`}>
                  {/* Contenu */}
                  <motion.div
                    initial={{ opacity: 0, x: item.position === "right" ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`flex-1 ${item.position === "right" ? "lg:text-right" : ""}`}
                  >
                    <GlassCard className="p-8">
                      <div className="mb-4">
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                          className="inline-block px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#8B4513] text-white font-bold rounded-full text-lg"
                        >
                          {item.year}
                        </motion.span>
                      </div>
                      
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                        className="text-2xl font-bold text-[#8B4513] mb-4"
                      >
                        {item.title}
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                        className="text-[#2F1B14] leading-relaxed"
                      >
                        {item.description}
                      </motion.p>
                    </GlassCard>
                  </motion.div>

                  {/* Point central sur mobile */}
                  <div className="lg:hidden">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className="w-4 h-4 bg-[#D4AF37] rounded-full border-4 border-white shadow-lg"
                    />
                  </div>

                  {/* Point central sur desktop */}
                  <div className="hidden lg:block">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className="w-6 h-6 bg-[#D4AF37] rounded-full border-4 border-white shadow-lg relative z-10"
                    />
                  </div>

                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
                    className="flex-1"
                  >
                    <FloatingElement className="rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover image-hover"
                      />
                    </FloatingElement>
                  </motion.div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <GlassCard className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4">
              Découvrez notre savoir-faire
            </h3>
            <p className="text-[#2F1B14] mb-6">
              Visitez notre atelier et découvrez les secrets de fabrication 
              de nos petits pâtés nîmois traditionnels.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#8B4513] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Réserver une visite
            </motion.button>
          </GlassCard>
        </motion.div>
      </div>

      {/* Éléments décoratifs */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-[#D4AF37] rounded-full opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 bg-[#8B4513] rounded-full opacity-10"
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </section>
  );
} 