import { Link } from 'react-router-dom'
import { useProducts } from '@/features/products'

export default function HomePage() {
  const { data: products, isLoading } = useProducts()

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="hero min-h-[70vh] bg-gradient-to-br from-primary to-secondary text-primary-content">
        <div className="hero-content flex-col gap-8 text-center lg:flex-row lg:text-left">
          <div className="max-w-xl">
            <span className="badge badge-outline mb-4">Nouvelle collection 2026</span>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Bienvenue sur <span className="underline decoration-accent decoration-4">iit-store</span>
            </h1>
            <p className="py-6 text-lg opacity-90">
              Découvrez notre sélection de produits soigneusement choisis pour vous.
              Qualité, style et prix imbattables.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/products" className="btn btn-accent btn-lg">
                Explorer les produits
              </Link>
              <Link to="/products" className="btn btn-outline btn-lg btn-primary-content">
                Voir les nouveautés
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AVANTAGES ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body items-center text-center">
              <div className="text-4xl">🚚</div>
              <h3 className="card-title">Livraison rapide</h3>
              <p>Expédition sous 24h partout dans le monde.</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body items-center text-center">
              <div className="text-4xl">🛡️</div>
              <h3 className="card-title">Paiement sécurisé</h3>
              <p>Transactions 100% protégées et chiffrées.</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body items-center text-center">
              <div className="text-4xl">↩️</div>
              <h3 className="card-title">Retour gratuit</h3>
              <p>30 jours pour changer d'avis, sans frais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUITS EN VEDETTE ===== */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Produits en vedette</h2>
            <p className="mt-2 text-base-content/60">Les coups de cœur de la boutique</p>
          </div>
          <Link to="/products" className="btn btn-ghost btn-sm">
            Tout voir →
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
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="card bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <figure>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-base">{product.name}</h3>
                  <p className="text-lg font-semibold text-primary">
                    {product.price.toFixed(2)} €
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
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