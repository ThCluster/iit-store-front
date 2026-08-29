import { useState } from 'react'
import { Link } from 'react-router-dom'

interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  seller: string
}

// Données de démonstration (à remplacer par le contexte panier)
const demoCartItems: CartItem[] = [
  {
    id: 'p1',
    name: 'Smartphone X200',
    price: 299.99,
    imageUrl: 'https://picsum.photos/seed/phone/200',
    quantity: 1,
    seller: 'TechWorld',
  },
  {
    id: 'p2',
    name: 'Casque Bluetooth',
    price: 49.99,
    imageUrl: 'https://picsum.photos/seed/headset/200',
    quantity: 2,
    seller: 'TechWorld',
  },
  {
    id: 'p3',
    name: 'Robe élégante',
    price: 39.99,
    imageUrl: 'https://picsum.photos/seed/dress/200',
    quantity: 1,
    seller: 'FashionHub',
  },
]

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(demoCartItems)
  const [promoCode, setPromoCode] = useState('')

  function updateQuantity(id: string, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    )
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const total = subtotal + shipping

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
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </figure>
                <div className="card-body p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="badge badge-ghost badge-sm">
                          {item.seller}
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {Math.round(item.price).toLocaleString('fr-FR')} FCFA
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
                      {Math.round(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
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