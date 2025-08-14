import Image from "next/image";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import ProductCard from "./components/ProductCard";
import GalleryGrid from "./components/GalleryGrid";
import ContactCard from "./components/ContactCard";
import ContactSection from "./components/ContactSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Hero Section - Section principale */}
      <section aria-labelledby="hero-title">
        <HeroSection />
      </section>

      {/* Histoire Section */}
      <section id="histoire" aria-labelledby="histoire-title">
        <TimelineSection />
      </section>

      {/* Produits Section */}
      <section id="produits" aria-labelledby="produits-title">
        <div className="bg-beige py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-marron mb-10 text-center">Nos produits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <ProductCard image="/pate-classique.jpg" title="Le Classique" description="Recette traditionnelle, pâte dorée, farce veau et porc, épices douces." price="2,50€" />
              <ProductCard image="/pate-vegetarien.jpg" title="Le Végétarien" description="Farce légumes du soleil, herbes de Provence, pâte croustillante." price="2,80€" />
              <ProductCard image="/pate-epice.jpg" title="Le Pimenté" description="Farce relevée au piment d'Espelette, pour amateurs de sensations." price="2,90€" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Card Section */}
      <section aria-labelledby="contact-card-title">
        <ContactCard />
      </section>

      {/* FAQ Section */}
      <section id="faq" aria-labelledby="faq-title">
        <FAQSection />
      </section>

      {/* Contact Section */}
      <section id="contact" aria-labelledby="contact-title">
        <ContactSection />
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
