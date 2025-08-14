"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Notre histoire', href: '/histoire', submenu: [
    { label: 'Timeline', href: '/histoire#timeline' },
    { label: 'Valeurs', href: '/histoire#valeurs' },
  ] },
  { label: 'Produits', href: '/produits' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        <Link href="/" className="text-2xl font-serif font-bold text-marron tracking-tight">Petits Pâtés Nîmois</Link>
        {/* Desktop nav */}
        <ul className="hidden lg:flex gap-8 text-base font-medium text-marron items-center">
          {navLinks.map((link, i) => (
            <li key={link.label} className="relative group">
              <Link href={link.href} className="hover:text-ocre transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-ocre/40">
                {link.label}
              </Link>
              {link.submenu && (
                <div className="absolute left-0 top-full mt-2 hidden group-hover:block min-w-[180px] bg-white shadow rounded-lg py-2 z-20">
                  {link.submenu.map((sublink) => (
                    <Link key={sublink.label} href={sublink.href} className="block px-4 py-2 text-marron hover:bg-ocre/10 hover:text-ocre focus:bg-ocre/20 focus:text-ocre rounded-md">{sublink.label}</Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* Burger menu */}
        <button className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Ouvrir le menu" onClick={() => setMobileOpen(v => !v)}>
          <span className={`block w-7 h-0.5 bg-marron transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-7 h-0.5 bg-marron transition-all ${mobileOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-7 h-0.5 bg-marron transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-beige shadow-lg z-50 flex flex-col p-8 gap-6"
            >
              <button className="self-end mb-4" aria-label="Fermer le menu" onClick={() => setMobileOpen(false)}>
                <span className="text-3xl text-marron">&times;</span>
              </button>
              <ul className="flex flex-col gap-4 text-lg font-medium text-marron">
                {navLinks.map((link, i) => (
                  <li key={link.label}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="block px-2 py-2 rounded hover:bg-ocre/10 focus:bg-ocre/20 focus:text-ocre">{link.label}</Link>
                    {link.submenu && (
                      <ul className="ml-4 mt-1 flex flex-col gap-1">
                        {link.submenu.map((sublink) => (
                          <li key={sublink.label}>
                            <Link href={sublink.href} onClick={() => setMobileOpen(false)} className="block px-2 py-1 text-marron-fonce hover:text-ocre">{sublink.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
} 