"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

export default function ContactCard() {
  return (
    <motion.div
      className="bg-white shadow rounded p-8 flex flex-col gap-4 max-w-md mx-auto items-start"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="font-serif text-2xl font-bold text-marron mb-4">Contact</h3>
      <div className="flex items-center gap-3 text-marron-fonce">
        <FaMapMarkerAlt className="text-ocre text-xl" />
        <span>12 rue des Gourmets, 30000 Nîmes</span>
      </div>
      <div className="flex items-center gap-3 text-marron-fonce">
        <FaPhoneAlt className="text-ocre text-xl" />
        <span>04 66 00 00 00</span>
      </div>
      <div className="flex items-center gap-3 text-marron-fonce">
        <FaClock className="text-ocre text-xl" />
        <span>Mar–Sam : 9h–19h</span>
      </div>
    </motion.div>
  );
} 