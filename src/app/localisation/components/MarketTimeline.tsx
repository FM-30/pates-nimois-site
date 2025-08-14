"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const markets = [
  { day: "Mardi", place: "Marché des Halles", hours: "7h-13h", address: "Place des Halles", isToday: false },
  { day: "Jeudi", place: "Marché Jean Jaurès", hours: "7h-13h", address: "Av. Jean Jaurès", isToday: false },
  { day: "Samedi", place: "Marché du Centre", hours: "7h-13h", address: "Centre-ville", isToday: true },
];

export default function MarketTimeline() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-8 min-w-[600px] justify-center">
        {markets.map((mkt, idx) => (
          <motion.div
            key={mkt.day}
            className={`relative flex flex-col items-center bg-white/80 rounded-2xl shadow-lg px-8 py-6 min-w-[200px] border-2 ${mkt.isToday ? 'border-[#D4AF37]' : 'border-transparent'} transition-all duration-300`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.7 }}
          >
            <span className="text-lg font-bold text-[#8B4513] mb-2 font-serif">{mkt.day}</span>
            <span className="text-[#2F1B14] font-semibold mb-1 flex items-center gap-2"><FaMapMarkerAlt className="text-[#D4AF37]" /> {mkt.place}</span>
            <span className="text-xs text-[#CD853F] mb-1">{mkt.hours}</span>
            <span className="text-xs text-[#8B4513]">{mkt.address}</span>
            {mkt.isToday && <span className="absolute -top-3 right-4 bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full shadow animate-bounce">Aujourd'hui</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 