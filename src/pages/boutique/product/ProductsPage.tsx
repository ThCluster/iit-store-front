import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts, ProductCard, CategoryIcon } from '@/features/products'
import { demoCategories } from '@/features/products/demoData'

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('relevance')

  const activeCategory = searchParams.get('category') ?? ''
  const query = searchParams.get('q') ?? ''

  function setCategory(categoryId: string) {
    const next = new URLSearchParams(searchParams)
    if (categoryId) next.set('category', categoryId)
    else next.delete('category')
    setSearchParams(next)
  }

  // Filtrage par catégorie et recherche
  let filtered = products ?? []
  if (activeCategory) {
    filtered = filtered.filter((p) => p.id.includes(activeCategory))
  }
  if (query) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    )
  }

  // Tri
  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  if (isLoading) return <p className="container mx-auto px-4 py-8">Chargement...</p>
  if (error) return <p className="container mx-auto px-4 py-8">Erreur de chargement</p>

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-3xl font-black">Nos produits</h1>
        <p className="mt-1 text-sm text-base-content/60">
          {filtered.length} produit{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Barre latérale : catégories */}
        <aside className="lg:col-span-1">
          <div className="card bg-base-100 shadow-sm lg:sticky lg:top-24">
            <div className="card-body">
              <h2 className="card-title text-base">Catégories</h2>
              <div className="mt-2 space-y-1">
                <button
                  onClick={() => setCategory('')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    activeCategory === ''
                      ? 'bg-primary/10 font-semibold text-primary'
                      : 'hover:bg-base-200'
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </span>
                  Tous les produits
                </button>
                {demoCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      activeCategory === cat.id
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'hover:bg-base-200'
                    }`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200">
                      <CategoryIcon icon={cat.icon} className="h-4 w-4" />
                    </span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          {/* Barre d'outils */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-base-content/60">
              {activeCategory
                ? demoCategories.find((c) => c.id === activeCategory)?.name
                : 'Tous les produits'}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="select select-bordered select-sm"
              aria-label="Trier"
            >
              <option value="relevance">Pertinence</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>

          {/* Grille de produits */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 bg-base-100 py-16 text-center">
              <p className="text-lg font-semibold">Aucun produit trouvé</p>
              <p className="mt-1 text-sm text-base-content/60">
                Essayez une autre recherche ou catégorie
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}