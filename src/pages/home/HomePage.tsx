import { Link } from 'react-router-dom'
import { useProducts, ProductCard, CategoryIcon } from '@/features/products'
import { demoCategories, demoSellers, demoReviews } from '@/features/products/demoData'

export default function HomePage() {
  const { data: products, isLoading } = useProducts()

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
          {demoCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className={`card ${cat.color} shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="card-body items-center text-center">
                <CategoryIcon icon={cat.icon} className="h-10 w-10 text-primary" />
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

      {/* ===== AVIS CLIENTS ===== */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Avis clients</h2>
          <p className="mt-2 text-base-content/60">Ce que pensent nos clients de la marketplace</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demoReviews.map((review) => (
            <div key={review.id} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="w-12 rounded-full bg-primary/10 text-lg font-bold text-primary">
                      {review.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{review.author}</h3>
                    <div className="flex items-center gap-1 text-warning">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${i < review.rating ? '' : 'opacity-30'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-base-content/70">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== VENDEURS DE CONFIANCE ===== */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Nos vendeurs de confiance</h2>
          <p className="mt-2 text-base-content/60">Des marchands vérifiés et notés par la communauté</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {demoSellers.map((seller) => (
            <div key={seller.id} className="card bg-base-100 shadow-sm">
              <div className="card-body items-center text-center">
                <div className="avatar placeholder">
                  <div className="w-16 rounded-full bg-primary/10 text-3xl">
                    {seller.logo}
                  </div>
                </div>
                <h3 className="card-title">{seller.name}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-warning" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">{seller.rating}</span>
                  <span className="text-base-content/50">· {seller.productsCount} produits</span>
                </div>
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