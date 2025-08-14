"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "Qu'est-ce qu'un petit pâté nîmois ?",
    answer: "Le petit pâté nîmois est une spécialité culinaire traditionnelle de Nîmes, dans le Gard. C'est un petit pâté feuilleté fourré à la viande de bœuf, aux oignons et aux herbes de Provence, cuit au four jusqu'à obtenir une croûte dorée et croustillante. Cette recette ancestrale remonte à 1874 et fait la fierté de notre région.",
    keywords: ["petit pâté nîmois", "spécialité nîmoise", "recette traditionnelle", "pâté feuilleté"]
  },
  {
    question: "Depuis quand fabriquez-vous les petits pâtés nîmois ?",
    answer: "Notre famille fabrique les petits pâtés nîmois depuis 1874, soit plus de 150 ans de tradition. La recette a été transmise de génération en génération, préservant l'authenticité et le savoir-faire ancestral qui font la réputation de nos produits.",
    keywords: ["tradition familiale", "1874", "savoir-faire ancestral", "générations"]
  },
  {
    question: "Où puis-je acheter vos petits pâtés nîmois ?",
    answer: "Nos petits pâtés nîmois sont disponibles dans notre boutique au 1 Place de la Maison Carrée à Nîmes, ainsi que dans plus de 50 points de vente partenaires dans la région Gard et l'Occitanie. Nous proposons également la livraison à domicile dans un rayon de 30km autour de Nîmes.",
    keywords: ["points de vente", "Nîmes", "Gard", "Occitanie", "livraison", "boutique"]
  },
  {
    question: "Vos produits sont-ils artisanaux ?",
    answer: "Absolument ! Tous nos petits pâtés nîmois sont fabriqués artisanalement dans notre atelier de Nîmes. Nous utilisons uniquement des ingrédients locaux et de qualité, et chaque pâté est façonné à la main selon les méthodes traditionnelles transmises depuis 1874.",
    keywords: ["artisanal", "fabrication manuelle", "ingrédients locaux", "qualité", "méthodes traditionnelles"]
  },
  {
    question: "Quels sont vos horaires d'ouverture ?",
    answer: "Notre boutique est ouverte du mardi au vendredi de 9h à 19h, le samedi de 9h à 18h, et le dimanche de 10h à 17h. Nous sommes fermés le lundi. Pendant les jours fériés, nous appliquons des horaires spéciaux que vous pouvez consulter sur notre site ou nous contacter directement.",
    keywords: ["horaires d'ouverture", "boutique", "jours fériés", "contact"]
  },
  {
    question: "Proposez-vous des visites de votre atelier ?",
    answer: "Oui ! Nous organisons des visites guidées de notre atelier pour découvrir les secrets de fabrication de nos petits pâtés nîmois. Ces visites sont disponibles sur réservation pour les groupes de 5 à 20 personnes. C'est l'occasion de voir nos artisans à l'œuvre et de déguster nos produits frais.",
    keywords: ["visite atelier", "réservation", "groupes", "dégustation", "artisans"]
  },
  {
    question: "Vos produits contiennent-ils des allergènes ?",
    answer: "Nos petits pâtés nîmois contiennent du gluten (farine de blé), des œufs, du lait et de la viande de bœuf. Nous proposons également une version végétarienne sur commande. Tous nos allergènes sont clairement indiqués sur nos emballages et notre équipe est formée pour répondre à vos questions.",
    keywords: ["allergènes", "gluten", "œufs", "lait", "végétarien", "emballages"]
  },
  {
    question: "Pouvez-vous livrer pour des événements spéciaux ?",
    answer: "Bien sûr ! Nous proposons un service de livraison spéciale pour les événements : mariages, baptêmes, anniversaires, séminaires d'entreprise... Nous pouvons adapter nos quantités et créer des présentations personnalisées. Contactez-nous au moins 48h à l'avance pour organiser votre commande.",
    keywords: ["livraison événements", "mariages", "baptêmes", "séminaires", "commandes spéciales"]
  },
  {
    question: "Comment conserver vos petits pâtés nîmois ?",
    answer: "Nos petits pâtés nîmois se conservent 3 jours au réfrigérateur dans leur emballage d'origine. Pour une conservation optimale, nous recommandons de les consommer dans les 24h suivant l'achat. Vous pouvez également les congeler jusqu'à 3 mois. Pour les réchauffer, 5 minutes au four à 180°C suffisent.",
    keywords: ["conservation", "réfrigérateur", "congélation", "réchauffage", "durée de vie"]
  },
  {
    question: "Proposez-vous des recettes pour accompagner vos produits ?",
    answer: "Oui ! Nous partageons régulièrement des recettes traditionnelles et des idées d'accompagnement sur notre blog et nos réseaux sociaux. Nos petits pâtés nîmois se dégustent traditionnellement avec une salade verte, mais nous proposons aussi des suggestions plus créatives pour les moderniser.",
    keywords: ["recettes", "accompagnements", "blog", "réseaux sociaux", "traditions culinaires"]
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#FFFEF7] via-[#F5F5DC] to-[#FFFEF7]">
      <div className="container mx-auto px-4">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-[#2F1B14] max-w-3xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes sur nos petits pâtés nîmois, 
            notre histoire et nos services.
          </p>
        </motion.div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-inset"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-[#8B4513] pr-4">
                    {item.question}
                  </h3>
                  <motion.svg
                    className="w-5 h-5 text-[#8B4513] flex-shrink-0"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-[#2F1B14] leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-[#2F1B14] mb-6">
              Notre équipe est là pour vous aider. Contactez-nous directement 
              et nous vous répondrons dans les plus brefs délais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+33466123456"
                className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#8B4513] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Appelez-nous
              </a>
              <a
                href="mailto:contact@patenimes.fr"
                className="px-6 py-3 border-2 border-[#8B4513] text-[#8B4513] font-semibold rounded-lg hover:bg-[#8B4513] hover:text-white transition-all duration-300"
              >
                Envoyez un email
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Schema.org FAQ markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </section>
  );
} 