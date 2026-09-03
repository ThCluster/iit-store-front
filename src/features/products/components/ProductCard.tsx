import type { Product } from '@/types/product'
import { Link, useNavigate } from 'react-router-dom'
import { addToPanier } from '@/services/store'
import { addFavori } from '@/services/favoris'
import { useAuth } from '@/features/auth/AuthContext'
import { useCart } from '@/features/cart/CartContext'
import { useFavoris } from '@/features/favoris/FavorisContext'

export function ProductCard({ product }: { product: Product }) {
  const { isLoggedIn } = useAuth()
  const { refresh } = useCart()
  const { refresh: refreshFav } = useFavoris()
  const navigate = useNavigate()

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    addFavori(product.id)
      .then(() => refreshFav())
      .catch(() => void 0)
  }

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addToPanier(product.id)
      .then(() => refresh())
      .catch(() => void 0)
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="card bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <figure className="relative flex h-40 items-center justify-center bg-base-200">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
        )}
        <span className="badge badge-secondary absolute left-3 top-3">Nouveau</span>
        <button
          onClick={handleFavorite}
          className="btn btn-circle btn-sm absolute right-3 top-3 bg-white/90 shadow-sm backdrop-blur hover:bg-error hover:text-white"
          aria-label="Ajouter aux favoris"
          title="Ajouter aux favoris"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-base line-clamp-1">{product.name}</h3>
        {product.vendeur_nom && (
          <p className="text-xs text-base-content/60">{product.vendeur_nom}</p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-primary">
            {Math.round(Number(product.price)).toLocaleString('fr-FR')} FCFA
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAdd}
          >
            Ajouter
          </button>
        </div>
      </div>
    </Link>
  )
}