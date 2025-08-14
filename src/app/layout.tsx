import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ProgressBar, BackToTop } from "./components/AnimatedComponents";
import CustomCursorComponent from "./components/CustomCursor";
import ClientLayout from "./components/ClientLayout";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import AccessibilityChecker from "./components/AccessibilityChecker";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: "Petits Pâtés Nîmois Artisanaux | Spécialité Traditionnelle depuis 1874",
    template: "%s | Petits Pâtés Nîmois"
  },
  description: "Découvrez nos authentiques petits pâtés nîmois faits main. Tradition familiale, recettes d'époque et saveurs d'exception. Livraison Nîmes et région Gard. Produits artisanaux de qualité.",
  keywords: [
    "petits pâtés nîmois",
    "spécialité nîmoise",
    "tradition culinaire",
    "pâtisserie artisanale",
    "gastronomie française",
    "produits locaux",
    "Nîmes",
    "Gard",
    "Occitanie",
    "recette traditionnelle",
    "pâté feuilleté",
    "artisanat alimentaire"
  ],
  authors: [{ name: "Petits Pâtés Nîmois", url: "https://patenimes.fr" }],
  creator: "Petits Pâtés Nîmois",
  publisher: "Petits Pâtés Nîmois",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://patenimes.fr'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://patenimes.fr',
    siteName: 'Petits Pâtés Nîmois',
    title: 'Petits Pâtés Nîmois Artisanaux | Spécialité Traditionnelle depuis 1874',
    description: 'Découvrez nos authentiques petits pâtés nîmois faits main. Tradition familiale, recettes d\'époque et saveurs d\'exception. Livraison Nîmes et région Gard.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Petits pâtés nîmois artisanaux traditionnels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@patenimes',
    creator: '@patenimes',
    title: 'Petits Pâtés Nîmois Artisanaux | Spécialité Traditionnelle',
    description: 'Découvrez nos authentiques petits pâtés nîmois faits main. Tradition familiale depuis 1874.',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'food',
  classification: 'business',
  other: {
    'geo.region': 'FR-30',
    'geo.placename': 'Nîmes',
    'geo.position': '43.8345;4.3601',
    'ICBM': '43.8345, 4.3601',
    'DC.title': 'Petits Pâtés Nîmois Artisanaux',
    'DC.creator': 'Petits Pâtés Nîmois',
    'DC.subject': 'Pâtisserie artisanale, Gastronomie française',
    'DC.description': 'Spécialité traditionnelle nîmoise depuis 1874',
    'DC.publisher': 'Petits Pâtés Nîmois',
    'DC.contributor': 'Famille Martin',
    'DC.date': '2024',
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': 'https://patenimes.fr',
    'DC.language': 'fr',
    'DC.coverage': 'Nîmes, Gard, Occitanie',
    'DC.rights': '© 2024 Petits Pâtés Nîmois. Tous droits réservés.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Preconnect pour les ressources externes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        
        {/* DNS Prefetch pour les CDN */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Preload des ressources critiques */}
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop" />
        
        {/* Preload des polices critiques */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Manifest pour PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon et icônes */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Thème et couleurs */}
        <meta name="theme-color" content="#8B4513" />
        <meta name="msapplication-TileColor" content="#8B4513" />
        
        {/* Viewport optimisé */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Petits Pâtés Nîmois",
              "description": "Spécialité traditionnelle nîmoise depuis 1874. Petits pâtés artisanaux faits main selon les recettes d'époque.",
              "url": "https://patenimes.fr",
              "logo": "https://patenimes.fr/logo.png",
              "image": "https://patenimes.fr/hero-image.jpg",
              "telephone": "+33466123456",
              "email": "contact@patenimes.fr",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1 Place de la Maison Carrée",
                "addressLocality": "Nîmes",
                "postalCode": "30000",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.8345,
                "longitude": 4.3601
              },
              "openingHours": [
                "Mo-Tu 09:00-19:00",
                "We-Th 09:00-19:00",
                "Fr 09:00-19:00",
                "Sa 09:00-18:00",
                "Su 10:00-17:00"
              ],
              "priceRange": "€€",
              "servesCuisine": "Française",
              "hasMenu": "https://patenimes.fr/produits",
              "sameAs": [
                "https://www.facebook.com/patenimes",
                "https://www.instagram.com/patenimes",
                "https://twitter.com/patenimes"
              ],
              "foundingDate": "1874",
              "founder": {
                "@type": "Person",
                "name": "Famille Martin"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Nîmes"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Gard"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Occitanie"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Marie Dupont"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "reviewBody": "Les meilleurs petits pâtés nîmois que j'ai jamais goûtés ! Authenticité et tradition au rendez-vous."
                }
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          <PerformanceOptimizer />
          <AccessibilityChecker />
          <ProgressBar />
          <CustomCursorComponent />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <BackToTop />
        </ClientLayout>
      </body>
    </html>
  );
}
