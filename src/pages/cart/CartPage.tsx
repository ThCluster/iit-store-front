import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getPanier,
  addToPanier,
  removeFromPanier,
} from '@/services/store'
import { useCart } from '@/features/cart/CartContext'
import type { PanierItem } from '@/types/store'

export default function CartPage() {
  const [items, setItems] = useState<PanierItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const { refresh } = useCart()

  useEffect(() => {
    getPanier()
      .then((panier) => setItems(panier.items ?? []))
      .catch(() => setError('Impossible de charger votre panier.'))
      .finally(() => setLoading(false))
  }, [])

  function updateQuantity(id: number, delta: number) {
    const item = items.find((i) => i.id === id)
    if (!item) return
    // Pas d'endpoint de patch par article : ajout/retrait par produit
    if (delta > 0) {
      addToPanier(item.product, delta).then((panier) => {
        setItems(panier.items ?? [])
        refresh()
      })
    } else {
      removeFromPanier(item.product, -delta).then((panier) => {
        setItems(panier.items ?? [])
        refresh()
      })
    }
  }

  function removeItem(id: number) {
    const item = items.find((i) => i.id === id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    if (item) {
      removeFromPanier(item.product, item.quantity)
        .then(() => refresh())
        .catch(() => setError("Erreur lors de la suppression."))
    }
  }

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.sub_total ?? item.product_price ?? 0),
    0,
  )
  const shipping = subtotal > 0 ? 5.99 : 0
  const total = subtotal + shipping

  if (loading) {
    return <p className="container mx-auto px-4 py-8">Chargement du panier...</p>
  }

  if (error && items.length === 0) {
    return <p className="container mx-auto px-4 py-8">{error}</p>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Mon panier</h1>
          <p className="mt-1 text-sm text-base-content/60">
            {items.length} article{items.length > 1 ? 's' : ''} dans votre panier
          </p>
        </div>
        <Link to="/products" className="btn btn-ghost btn-sm">
          Continuer mes achats
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 bg-base-100 py-20 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h2 className="mt-6 text-xl font-bold">Votre panier est vide</h2>
          <p className="mt-2 max-w-sm text-base-content/60">
            Découvrez nos produits et ajoutez-les à votre panier
          </p>
          <Link to="/products" className="btn btn-primary mt-6">
            Découvrir les produits
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Liste des articles */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="card card-side overflow-hidden bg-base-100 shadow-sm transition hover:shadow-md"
              >
                <figure className="w-28 shrink-0 sm:w-40">
                  {item.product_image ? (
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-base-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                      </svg>
                    </div>
                  )}
                </figure>
                <div className="card-body p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{item.product_name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">
                          {Math.round(Number(item.product_price)).toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn btn-ghost btn-circle btn-sm hover:bg-error/10"
                      aria-label="Supprimer"
                      title="Supprimer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-base-200 pt-3">
                    {/* Quantité */}
                    <div className="join">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="btn btn-outline btn-sm join-item"
                        aria-label="Diminuer"
                      >
                        -
                      </button>
                      <span className="btn btn-sm join-item no-animation">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="btn btn-outline btn-sm join-item"
                        aria-label="Augmenter"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-lg font-black text-primary">
                      {Math.round(Number(item.sub_total ?? item.product_price ?? 0) * item.quantity).toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Résumé */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-sm lg:sticky lg:top-24">
              <div className="card-body">
                <h2 className="card-title text-lg">Résumé de la commande</h2>

                {/* Code promo */}
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Code promo"
                    className="input input-bordered input-sm w-full"
                  />
                  <button className="btn btn-outline btn-sm">Appliquer</button>
                </div>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Sous-total</span>
                    <span className="font-semibold">{Math.round(subtotal).toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Livraison</span>
                    <span className="font-semibold">{Math.round(shipping).toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="divider my-1" />
                  <div className="flex items-center justify-between text-lg font-black">
                    <span>Total</span>
                    <span className="text-primary">{Math.round(total).toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>

                <Link to="/checkout" className="btn btn-primary btn-block mt-6">
                  Passer la commande
                </Link>
                <p className="mt-3 text-center text-xs text-base-content/50">
                  Paiement sécurisé · Livraison rapide
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}