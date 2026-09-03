import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavoris, removeFavori, type Favori } from '@/services/favoris'
import { useAuth } from '@/features/auth/AuthContext'

export default function FavoritesPage() {
  const { isLoggedIn } = useAuth()
  const [favorites, setFavorites] = useState<Favori[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false)
      return
    }
    getFavoris()
      .then(setFavorites)
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false))
  }, [isLoggedIn])

  function removeFavorite(id: number) {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
    removeFavori(id).catch(() => void 0)
  }

  if (loading) {
    return <p className="container mx-auto px-4 py-8">Chargement...</p>
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-black">Connexion requise</h1>
        <p className="mt-2 text-base-content/60">
          Connectez-vous pour voir vos favoris.
        </p>
        <Link to="/login" className="btn btn-primary mt-6">
          Se connecter
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Mes favoris</h1>
          <p className="mt-1 text-sm text-base-content/60">
            {favorites.length} produit{favorites.length > 1 ? 's' : ''} enregistré{favorites.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/products" className="btn btn-ghost btn-sm">
          Explorer les produits
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 bg-base-100 py-20 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2 className="mt-6 text-xl font-bold">Aucun favori</h2>
          <p className="mt-2 max-w-sm text-base-content/60">
            Ajoutez des produits à vos favoris pour les retrouver facilement
          </p>
          <Link to="/products" className="btn btn-primary mt-6">
            Découvrir les produits
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="card overflow-hidden bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <Link to={`/products/${item.produit_id}`} className="relative block">
                {item.produit_image ? (
                  <img
                    src={item.produit_image}
                    alt={item.produit_name}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center bg-base-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                  </div>
                )}
                {/* Bouton retirer */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    removeFavorite(item.id)
                  }}
                  className="btn btn-circle btn-sm absolute right-3 top-3 bg-white/90 shadow-sm backdrop-blur hover:bg-error hover:text-white"
                  aria-label="Retirer des favoris"
                  title="Retirer des favoris"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </Link>

              {/* Contenu */}
              <div className="card-body p-4">
                <Link to={`/products/${item.produit_id}`}>
                  <h3 className="card-title text-sm leading-tight">{item.produit_name}</h3>
                </Link>

                {/* Prix + action */}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-base font-bold text-primary">
                    {Math.round(Number(item.produit_price)).toLocaleString('fr-FR')} FCFA
                  </p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}