import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `# Robots.txt pour Petits Pâtés Nîmois
# https://patenimes.fr

User-agent: *
Allow: /

# Sitemap
Sitemap: https://patenimes.fr/sitemap.xml

# Crawl-delay pour être respectueux
Crawl-delay: 1

# Bloquer les pages privées
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Autoriser les ressources importantes
Allow: /images/
Allow: /fonts/
Allow: /css/
Allow: /js/

# Règles spécifiques pour Google
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Règles spécifiques pour Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Règles pour les images
User-agent: Googlebot-Image
Allow: /images/
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.gif$
Allow: /*.png$
Allow: /*.webp$

# Règles pour les mobiles
User-agent: *
Allow: /
Crawl-delay: 1

# Host
Host: https://patenimes.fr
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
} 