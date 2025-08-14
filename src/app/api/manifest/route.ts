import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: "Petits Pâtés Nîmois - Spécialité Traditionnelle",
    short_name: "Pâtés Nîmois",
    description: "Découvrez l'authenticité des petits pâtés nîmois, une tradition culinaire séculaire qui fait la fierté de la région.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFEF7",
    theme_color: "#8B4513",
    orientation: "portrait-primary",
    scope: "/",
    lang: "fr",
    dir: "ltr",
    categories: ["food", "business", "lifestyle"],
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    screenshots: [
      {
        src: "/screenshot-desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Page d'accueil sur desktop"
      },
      {
        src: "/screenshot-mobile.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "Page d'accueil sur mobile"
      }
    ],
    shortcuts: [
      {
        name: "Nos Produits",
        short_name: "Produits",
        description: "Découvrir nos petits pâtés nîmois",
        url: "/produits",
        icons: [
          {
            src: "/icon-96x96.png",
            sizes: "96x96"
          }
        ]
      },
      {
        name: "Nous Contacter",
        short_name: "Contact",
        description: "Nous joindre directement",
        url: "/contact",
        icons: [
          {
            src: "/icon-96x96.png",
            sizes: "96x96"
          }
        ]
      },
      {
        name: "Où Nous Trouver",
        short_name: "Localisation",
        description: "Trouver nos points de vente",
        url: "/localisation",
        icons: [
          {
            src: "/icon-96x96.png",
            sizes: "96x96"
          }
        ]
      }
    ],
    related_applications: [],
    prefer_related_applications: false,
    edge_side_panel: {
      preferred_width: 400
    },
    launch_handler: {
      client_mode: "navigate-existing"
    },
    handle_links: "preferred",
    capture_links: "existing-client-navigate",
    file_handlers: [],
    protocol_handlers: [],
    share_target: {
      action: "/share",
      method: "POST",
      enctype: "multipart/form-data",
      params: {
        title: "title",
        text: "text",
        url: "url"
      }
    }
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
} 