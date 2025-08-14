"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const subjects = [
  "Commande en ligne",
  "Demande de devis",
  "Partenariat",
  "Réclamation",
  "Autre"
];

const openingHours = [
  { day: "Lundi", hours: "Fermé", special: false },
  { day: "Mardi", hours: "09:00 - 19:00", special: false },
  { day: "Mercredi", hours: "09:00 - 19:00", special: false },
  { day: "Jeudi", hours: "09:00 - 19:00", special: false },
  { day: "Vendredi", hours: "09:00 - 19:00", special: false },
  { day: "Samedi", hours: "09:00 - 18:00", special: false },
  { day: "Dimanche", hours: "10:00 - 17:00", special: true }
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const today = new Date();
    setCurrentDay(days[today.getDay()]);
    
    const hour = today.getHours();
    const dayOfWeek = today.getDay();
    setIsOpen(dayOfWeek >= 1 && dayOfWeek <= 6 && hour >= 9 && hour < 19);
  }, []);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Le nom doit contenir au moins 2 caractères" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Email invalide" : "";
      case "phone":
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        return value && !phoneRegex.test(value) ? "Numéro de téléphone invalide" : "";
      case "subject":
        return !value ? "Veuillez sélectionner un sujet" : "";
      case "message":
        return value.length < 10 ? "Le message doit contenir au moins 10 caractères" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName: string) => {
    setFocusedField("");
    const error = validateField(fieldName, formData[fieldName as keyof FormData]);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.honeypot) {
      return;
    }

    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== "honeypot") {
        const error = validateField(key, formData[key as keyof FormData]);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      honeypot: ""
    });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#FFFEF7] via-[#F5F5DC] to-[#FFFEF7] overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-4">
            Contactez-nous
          </h2>
          <p className="text-lg text-[#2F1B14] max-w-2xl mx-auto">
            Une question ? Un projet ? Nous sommes là pour vous accompagner dans votre découverte des petits pâtés nîmois.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-[#8B4513] mb-8">Envoyez-nous un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  className="absolute left-[-9999px]"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                    className={`w-full px-4 py-4 border-2 rounded-lg transition-all duration-300 ${
                      focusedField === "name" || formData.name
                        ? "border-[#D4AF37] bg-white"
                        : "border-gray-200 bg-gray-50"
                    } ${errors.name ? "border-red-500" : ""}`}
                    placeholder=" "
                  />
                  <label className={`absolute left-4 transition-all duration-300 ${
                    focusedField === "name" || formData.name
                      ? "top-2 text-xs text-[#D4AF37] font-medium"
                      : "top-4 text-base text-gray-500"
                  }`}>
                    Nom complet *
                  </label>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      className={`w-full px-4 py-4 border-2 rounded-lg transition-all duration-300 ${
                        focusedField === "email" || formData.email
                          ? "border-[#D4AF37] bg-white"
                          : "border-gray-200 bg-gray-50"
                      } ${errors.email ? "border-red-500" : ""}`}
                      placeholder=" "
                    />
                    <label className={`absolute left-4 transition-all duration-300 ${
                      focusedField === "email" || formData.email
                        ? "top-2 text-xs text-[#D4AF37] font-medium"
                        : "top-4 text-base text-gray-500"
                    }`}>
                      Email *
                    </label>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("phone")}
                      onBlur={() => handleBlur("phone")}
                      className={`w-full px-4 py-4 border-2 rounded-lg transition-all duration-300 ${
                        focusedField === "phone" || formData.phone
                          ? "border-[#D4AF37] bg-white"
                          : "border-gray-200 bg-gray-50"
                      } ${errors.phone ? "border-red-500" : ""}`}
                      placeholder=" "
                    />
                    <label className={`absolute left-4 transition-all duration-300 ${
                      focusedField === "phone" || formData.phone
                        ? "top-2 text-xs text-[#D4AF37] font-medium"
                        : "top-4 text-base text-gray-500"
                    }`}>
                      Téléphone
                    </label>
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("subject")}
                    onBlur={() => handleBlur("subject")}
                    className={`w-full px-4 py-4 border-2 rounded-lg transition-all duration-300 appearance-none ${
                      focusedField === "subject" || formData.subject
                        ? "border-[#D4AF37] bg-white"
                        : "border-gray-200 bg-gray-50"
                    } ${errors.subject ? "border-red-500" : ""}`}
                  >
                    <option value="">Sélectionnez un sujet</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                    rows={5}
                    className={`w-full px-4 py-4 border-2 rounded-lg transition-all duration-300 resize-none ${
                      focusedField === "message" || formData.message
                        ? "border-[#D4AF37] bg-white"
                        : "border-gray-200 bg-gray-50"
                    } ${errors.message ? "border-red-500" : ""}`}
                    placeholder=" "
                  />
                  <label className={`absolute left-4 top-4 transition-all duration-300 ${
                    focusedField === "message" || formData.message
                      ? "top-2 text-xs text-[#D4AF37] font-medium"
                      : "text-base text-gray-500"
                  }`}>
                    Votre message *
                  </label>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-8 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#D4AF37] to-[#8B4513] hover:from-[#8B4513] hover:to-[#D4AF37]"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    "Envoyer le message"
                  )}
                </motion.button>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800"
                  >
                    ✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#D4AF37] to-[#8B4513] rounded-full flex items-center justify-center mr-4">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <h4 className="text-lg font-semibold text-[#8B4513]">Téléphone</h4>
                </div>
                <a
                  href="tel:+33466123456"
                  className="text-lg text-[#2F1B14] hover:text-[#D4AF37] transition-colors"
                >
                  +33 4 66 12 34 56
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#D4AF37] to-[#8B4513] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-[#8B4513]">Email</h4>
                </div>
                <a
                  href="mailto:contact@patenimes.fr"
                  className="text-lg text-[#2F1B14] hover:text-[#D4AF37] transition-colors"
                >
                  contact@patenimes.fr
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#D4AF37] to-[#8B4513] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-[#8B4513]">Adresse</h4>
                </div>
                <a
                  href="https://maps.google.com/?q=Place+de+la+Maison+Carrée,+Nîmes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[#2F1B14] hover:text-[#D4AF37] transition-colors"
                >
                  1 Place de la Maison Carrée<br />
                  30000 Nîmes, France
                </a>
              </motion.div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-lg font-semibold text-[#8B4513] mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Horaires d'ouverture
              </h4>
              
              <div className="space-y-2">
                {openingHours.map((day, index) => (
                  <div
                    key={day.day}
                    className={`flex justify-between items-center py-2 px-3 rounded-lg transition-colors ${
                      day.day === currentDay
                        ? "bg-[#D4AF37] text-white font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center">
                      {day.day}
                      {day.special && (
                        <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                          Spécial
                        </span>
                      )}
                    </span>
                    <span className={day.hours === "Fermé" ? "text-red-500" : ""}>
                      {day.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Aujourd'hui ({currentDay})</span>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${isOpen ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className={`text-sm font-semibold ${isOpen ? "text-green-600" : "text-red-600"}`}>
                      {isOpen ? "Ouvert" : "Fermé"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-lg font-semibold text-[#8B4513] mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                {[
                  { name: "Facebook", icon: "📘", color: "hover:bg-blue-500" },
                  { name: "Instagram", icon: "📷", color: "hover:bg-pink-500" },
                  { name: "Twitter", icon: "🐦", color: "hover:bg-blue-400" }
                ].map(social => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl transition-colors ${social.color}`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 