import { Link } from 'react-router-dom'
import { useProducts, useCategories, ProductCard, CategoryIcon } from '@/features/products'

export default function HomePage() {
  const { data: products, isLoading } = useProducts()
  const { data: categories } = useCategories()

  // Vendeurs dérivés des produits réels (dédoublonnés par nom)
  const sellers = (products ?? [])
    .map((p) => p.vendeur_nom)
    .filter((n): n is string => Boolean(n))
  const uniqueSellers = sellers.filter(
    (name, i, arr) => arr.findIndex((x) => x === name) === i,
  )

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-base-100">
        {/* Décorations */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-16 lg:px-6">
          {/* Texte */}
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl font-black leading-tight text-base-content md:text-6xl">
              Tout ce dont vous avez besoin,{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                au même endroit
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-base-content/70">
              Découvrez des milliers de produits venant de vendeurs de confiance.
              Qualité, style et prix imbattables.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/register" className="btn btn-primary btn-lg shadow-lg shadow-primary/20">
                Devenir vendeur
              </Link>
              <Link to="/products" className="btn btn-outline btn-lg">
                Découvrir les offres
              </Link>
            </div>

            {/* Statistiques */}
            <div className="mt-10 flex items-center justify-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-black text-primary">10k+</p>
                <p className="text-sm text-base-content/60">Produits</p>
              </div>
              <div className="h-10 w-px bg-base-content/20" />
              <div className="text-center">
                <p className="text-2xl font-black text-primary">500+</p>
                <p className="text-sm text-base-content/60">Vendeurs</p>
              </div>
              <div className="h-10 w-px bg-base-content/20" />
              <div className="text-center">
                <p className="text-2xl font-black text-primary">50k+</p>
                <p className="text-sm text-base-content/60">Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATÉGORIES VEDETTE ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Catégories vedette</h2>
            <p className="mt-2 text-base-content/60">Les catégories les plus populaires de la marketplace</p>
          </div>
          <Link to="/products" className="btn btn-ghost btn-sm">
            Tout voir
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {(categories ?? []).map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="card bg-base-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="card-body items-center text-center">
                <CategoryIcon icon={cat.slug} className="h-10 w-10 text-primary" />
                <h3 className="card-title text-sm">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== PRODUITS EN VEDETTE ===== */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Produits en vedette</h2>
            <p className="mt-2 text-base-content/60">Les coups de cœur de la marketplace</p>
          </div>
          <Link to="/products" className="btn btn-ghost btn-sm">
            Tout voir
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card bg-base-200 shadow-sm">
                <div className="skeleton h-40 w-full rounded-t-2xl" />
                <div className="card-body">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {products?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ===== VENDEURS DE CONFIANCE ===== */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Nos vendeurs de confiance</h2>
          <p className="mt-2 text-base-content/60">Des marchands vérifiés et notés par la communauté</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {uniqueSellers.map((sellerName) => (
            <div key={sellerName} className="card bg-base-100 shadow-sm">
              <div className="card-body items-center text-center">
                <div className="avatar placeholder">
                  <div className="w-16 rounded-full bg-primary/10 text-3xl">
                    {sellerName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <h3 className="card-title">{sellerName}</h3>
                <Link to="/products" className="btn btn-outline btn-sm mt-2">
                  Voir la boutique
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== APPEL À L'ACTION ===== */}
      <section className="bg-base-200">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Prêt à faire vos achats ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base-content/70">
            Rejoignez des milliers de clients satisfaits. Créez votre compte et
            profitez d'offres exclusives dès aujourd'hui.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/register" className="btn btn-primary btn-lg">
              Créer un compte
            </Link>
            <Link to="/products" className="btn btn-outline btn-lg">
              Continuer sans compte
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}