import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = pathname.split('/').filter(Boolean);
  return (
    <nav aria-label="Fil d'Ariane" className="py-2 px-4 text-sm text-marron-fonce">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-ocre">Accueil</Link>
        </li>
        {crumbs.map((crumb, idx) => {
          const href = '/' + crumbs.slice(0, idx + 1).join('/');
          return (
            <li key={href} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <Link href={href} className="capitalize hover:text-ocre">{decodeURIComponent(crumb.replace(/-/g, ' '))}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 