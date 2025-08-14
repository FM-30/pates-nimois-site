"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [legalType, setLegalType] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const openLegalModal = (type: string) => {
    setLegalType(type);
    setShowLegalModal(true);
  };

  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "Notre Histoire", href: "#histoire" },
    { name: "Nos Produits", href: "/produits" },
    { name: "Points de Vente", href: "/localisation" },
    { name: "Contact", href: "#contact" }
  ];

  const legalLinks = [
    { name: "Mentions légales", type: "mentions" },
    { name: "CGV", type: "cgv" },
    { name: "Politique de confidentialité", type: "privacy" },
    { name: "Cookies", type: "cookies" }
  ];

  return (
    <>
      <footer className="bg-gradient-to-br from-[#2F1B14] via-[#8B4513] to-[#2F1B14] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">
                    Petits Pâtés Nîmois
                  </h3>
                  <div className="w-16 h-1 bg-[#D4AF37] rounded-full"></div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Découvrez l'authenticité des petits pâtés nîmois, une tradition culinaire 
                  séculaire qui fait la fierté de notre région.
                </p>

                <div className="flex space-x-4">
                  {[
                    { name: "Facebook", icon: "📘", color: "hover:bg-blue-600" },
                    { name: "Instagram", icon: "📷", color: "hover:bg-pink-600" },
                    { name: "Twitter", icon: "🐦", color: "hover:bg-blue-500" }
                  ].map(social => (
                    <motion.a
                      key={social.name}
                      href="#"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 bg-[#8B4513] rounded-full flex items-center justify-center text-lg transition-colors ${social.color}`}
                      title={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="text-xl font-semibold text-[#D4AF37] mb-6">Navigation</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-xl font-semibold text-[#D4AF37] mb-6">Contact</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">+33 4 66 12 34 56</p>
                      <p className="text-sm text-gray-400">Lun-Sam 9h-19h</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">contact@patenimes.fr</p>
                      <p className="text-sm text-gray-400">Réponse sous 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">1 Place de la Maison Carrée</p>
                      <p className="text-sm text-gray-400">30000 Nîmes, France</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="text-xl font-semibold text-[#D4AF37] mb-6">Newsletter</h4>
                <p className="text-gray-300 mb-4">
                  Restez informé de nos nouveautés, recettes et événements.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email"
                      className="w-full px-4 py-3 bg-[#8B4513] border border-[#D4AF37] rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-6 bg-[#D4AF37] text-white font-semibold rounded-lg hover:bg-[#8B4513] transition-colors duration-300"
                  >
                    S'abonner
                  </motion.button>

                  {isSubscribed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-600 text-white p-3 rounded-lg text-sm"
                    >
                      ✅ Merci ! Vous êtes maintenant inscrit à notre newsletter.
                    </motion.div>
                  )}
                </form>

                <div className="mt-4 p-3 bg-[#8B4513] rounded-lg">
                  <h5 className="text-sm font-semibold text-[#D4AF37] mb-2">Prochaines newsletters :</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Recette traditionnelle du mois</li>
                    <li>• Événements gastronomiques</li>
                    <li>• Nouveautés produits</li>
                    <li>• Histoire et traditions</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#8B4513]">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2024 Petits Pâtés Nîmois. Tous droits réservés.
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm">
                {legalLinks.map(link => (
                  <button
                    key={link.type}
                    onClick={() => openLegalModal(link.type)}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showLegalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#8B4513]">
                  {legalType === "mentions" && "Mentions légales"}
                  {legalType === "cgv" && "Conditions générales de vente"}
                  {legalType === "privacy" && "Politique de confidentialité"}
                  {legalType === "cookies" && "Politique des cookies"}
                </h3>
                <button
                  onClick={() => setShowLegalModal(false)}
                  className="text-gray-400 hover:text-[#8B4513] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="prose prose-lg max-w-none">
                {legalType === "mentions" && (
                  <div>
                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Éditeur</h4>
                    <p className="text-gray-700 mb-4">
                      Petits Pâtés Nîmois<br />
                      1 Place de la Maison Carrée<br />
                      30000 Nîmes, France<br />
                      Téléphone : +33 4 66 12 34 56<br />
                      Email : contact@patenimes.fr
                    </p>

                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Hébergement</h4>
                    <p className="text-gray-700 mb-4">
                      Ce site est hébergé par Vercel Inc.<br />
                      340 S Lemon Ave #4133<br />
                      Walnut, CA 91789<br />
                      États-Unis
                    </p>

                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Propriété intellectuelle</h4>
                    <p className="text-gray-700">
                      L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                    </p>
                  </div>
                )}

                {legalType === "cgv" && (
                  <div>
                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Article 1 - Objet</h4>
                    <p className="text-gray-700 mb-4">
                      Les présentes conditions régissent les ventes par la société Petits Pâtés Nîmois de ses produits commercialisés sur son site Internet.
                    </p>

                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Article 2 - Prix</h4>
                    <p className="text-gray-700 mb-4">
                      Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d'expédition.
                    </p>

                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Article 3 - Commandes</h4>
                    <p className="text-gray-700">
                      Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.
                    </p>
                  </div>
                )}

                {legalType === "privacy" && (
                  <div>
                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Collecte des données</h4>
                    <p className="text-gray-700 mb-4">
                      Nous collectons les informations que vous nous fournissez directement, notamment lors de la création de votre compte, de l'achat de nos produits ou de l'utilisation de nos services.
                    </p>

                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Utilisation des données</h4>
                    <p className="text-gray-700 mb-4">
                      Vos données personnelles sont utilisées pour traiter vos commandes, vous fournir un service client de qualité et vous informer de nos nouveautés.
                    </p>

                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Vos droits</h4>
                    <p className="text-gray-700">
                      Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                    </p>
                  </div>
                )}

                {legalType === "cookies" && (
                  <div>
                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Qu'est-ce qu'un cookie ?</h4>
                    <p className="text-gray-700 mb-4">
                      Un cookie est un petit fichier texte stocké sur votre ordinateur lors de la visite d'un site web. Il permet de mémoriser vos préférences et d'améliorer votre expérience de navigation.
                    </p>

                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Types de cookies utilisés</h4>
                    <p className="text-gray-700 mb-4">
                      • Cookies techniques : nécessaires au fonctionnement du site<br />
                      • Cookies analytiques : pour analyser l'audience du site<br />
                      • Cookies de personnalisation : pour mémoriser vos préférences
                    </p>

                    <h4 className="text-xl font-semibold text-[#8B4513] mb-4">Gestion des cookies</h4>
                    <p className="text-gray-700">
                      Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur. Cependant, certaines fonctionnalités du site pourraient ne plus être disponibles.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowLegalModal(false)}
                  className="px-6 py-3 bg-[#D4AF37] text-white font-semibold rounded-lg hover:bg-[#8B4513] transition-colors duration-300"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
} 