import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProduct } from '@/features/products'
import { addToPanier } from '@/services/store'
import { addFavori } from '@/services/favoris'
import { useAuth } from '@/features/auth/AuthContext'
import { useCart } from '@/features/cart/CartContext'
import { useFavoris } from '@/features/favoris/FavorisContext'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading } = useProduct(id!)
  const [added, setAdded] = useState(false)
  const [fav, setFav] = useState(false)
  const { isLoggedIn } = useAuth()
  const { refresh } = useCart()
  const { refresh: refreshFav } = useFavoris()
  const navigate = useNavigate()

  if (isLoading) return <p className="container mx-auto px-4 py-8">Chargement...</p>
  if (!product) return <p className="container mx-auto px-4 py-8">Produit introuvable</p>

  function handleAdd() {
    addToPanier(product!.id)
      .then(() => {
        setAdded(true)
        refresh()
        setTimeout(() => setAdded(false), 2000)
      })
      .catch(() => void 0)
  }

  function handleFavorite() {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    addFavori(product!.id)
      .then(() => {
        setFav(true)
        refreshFav()
        setTimeout(() => setFav(false), 2000)
      })
      .catch(() => void 0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Fil d'ariane */}
      <nav className="mb-6 text-sm text-base-content/60">
        <Link to="/products" className="hover:text-primary">
          Produits
        </Link>
        <span className="mx-2">/</span>
        <span>{product.categorie?.name ?? 'Produit'}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="flex items-center justify-center rounded-2xl bg-base-200 p-8">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[28rem] w-full rounded-xl object-contain"
            />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
          )}
        </div>

        {/* Infos */}
        <div>
          <span className="badge badge-ghost">{product.categorie?.name ?? 'Produit'}</span>
          <h1 className="mt-3 text-3xl font-black leading-tight">{product.name}</h1>

          {product.vendeur_nom && (
            <p className="mt-2 text-sm text-base-content/60">
              Vendu par <span className="font-semibold text-base-content">{product.vendeur_nom}</span>
            </p>
          )}

          <p className="mt-4 text-3xl font-black text-primary">
            {Math.round(Number(product.price)).toLocaleString('fr-FR')} FCFA
          </p>

          <p className="mt-6 text-base-content/80">{product.description}</p>

          {/* Étiquettes */}
          {product.etiquettes && product.etiquettes.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.etiquettes.map((tag) => (
                <span key={tag.id} className="badge badge-outline">
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={handleAdd} className="btn btn-primary btn-lg flex-1">
              {added ? 'Ajouté au panier' : 'Ajouter au panier'}
            </button>
            <button onClick={handleFavorite} className="btn btn-outline btn-lg">
              {fav ? 'Ajouté aux favoris' : 'Ajouter aux favoris'}
            </button>
            <Link to="/cart" className="btn btn-ghost btn-lg">
              Voir le panier
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}