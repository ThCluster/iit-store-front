import { useState } from 'react'
import { Link } from 'react-router-dom'

interface FavoriteItem {
  id: string
  name: string
  price: number
  imageUrl: string
  seller: string
  rating: number
}

// Données de démonstration (à remplacer par l'API favoris)
const demoFavorites: FavoriteItem[] = [
  {
    id: 'p1',
    name: 'Smartphone X200',
    price: 299990,
    imageUrl: 'https://picsum.photos/seed/phone/400',
    seller: 'TechWorld',
    rating: 4.5,
  },
  {
    id: 'p2',
    name: 'Casque Bluetooth',
    price: 49990,
    imageUrl: 'https://picsum.photos/seed/headset/400',
    seller: 'TechWorld',
    rating: 4.2,
  },
  {
    id: 'p3',
    name: 'Robe élégante',
    price: 39990,
    imageUrl: 'https://picsum.photos/seed/dress/400',
    seller: 'FashionHub',
    rating: 4.8,
  },
  {
    id: 'p4',
    name: 'Canapé moderne',
    price: 450000,
    imageUrl: 'https://picsum.photos/seed/sofa/400',
    seller: 'HomeDecor',
    rating: 4.6,
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(demoFavorites)

  function removeFavorite(id: string) {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
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
              <Link to={`/products/${item.id}`} className="relative block">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="aspect-square w-full object-cover"
                />
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
                {/* Badge vendeur */}
                <span className="badge badge-ghost absolute left-3 top-3 bg-white/90 backdrop-blur">
                  {item.seller}
                </span>
              </Link>

              {/* Contenu */}
              <div className="card-body p-4">
                <Link to={`/products/${item.id}`}>
                  <h3 className="card-title text-sm leading-tight">{item.name}</h3>
                </Link>

                {/* Note */}
                <div className="flex items-center gap-1 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-warning" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">{item.rating}</span>
                </div>

                {/* Prix + action */}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-base font-bold text-primary">
                    {item.price.toLocaleString('fr-FR')} FCFA
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