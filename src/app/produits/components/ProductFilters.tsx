type ProductFiltersProps = {
  categories: string[];
  value: string;
  onChange: (cat: string) => void;
  recherche: string;
  onRecherche: (val: string) => void;
  tris: { value: string; label: string }[];
  tri: string;
  onTri: (val: string) => void;
};

export default function ProductFilters({ categories, value, onChange, recherche, onRecherche, tris, tri, onTri }: ProductFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
      <div>
        <label className="block text-marron-fonce mb-1 font-semibold">Catégorie</label>
        <select value={value} onChange={e => onChange(e.target.value)} className="rounded border-marron px-3 py-2 focus:ring-ocre">
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-marron-fonce mb-1 font-semibold">Recherche</label>
        <input type="text" value={recherche} onChange={e => onRecherche(e.target.value)} placeholder="Rechercher un produit..." className="w-full rounded border-marron px-3 py-2 focus:ring-ocre" />
      </div>
      <div>
        <label className="block text-marron-fonce mb-1 font-semibold">Trier par</label>
        <select value={tri} onChange={e => onTri(e.target.value)} className="rounded border-marron px-3 py-2 focus:ring-ocre">
          {tris.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>
    </div>
  );
} 