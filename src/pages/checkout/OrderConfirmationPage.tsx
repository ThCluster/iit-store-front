import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

interface LastCommande {
  number: string
  destination: string
  mode: string
  total: number
  items: { name: string; quantity: number; price: string | number; image: string }[]
}

function loadCommande(): LastCommande | null {
  try {
    const raw = sessionStorage.getItem('last_commande')
    return raw ? (JSON.parse(raw) as LastCommande) : null
  } catch {
    return null
  }
}

export default function OrderConfirmationPage() {
  const { profil } = useAuth()
  const commande = loadCommande()
  const profileName = profil
    ? `${profil.first_name || ''} ${profil.last_name || ''}`.trim() || profil.username
    : 'Client'
  const profilePhone = profil?.telephone ?? ''

  const subtotal = commande?.items.reduce(
    (sum, it) => sum + Number(it.price ?? 0) * it.quantity,
    0,
  ) ?? 0
  const livraison = 5990
  const total = commande?.total ?? subtotal + livraison

  if (!commande) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-2xl font-black">Aucune commande récente</h1>
        <p className="mt-2 text-base-content/60">
          Passez une commande pour voir la confirmation ici.
        </p>
        <Link to="/products" className="btn btn-primary mt-6">
          Découvrir les produits
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {/* Succès */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-black">Commande confirmée !</h1>
        <p className="mt-2 text-base-content/60">
          Merci pour votre achat. Votre commande a bien été enregistrée.
        </p>
        <div className="mt-4 rounded-xl bg-base-100 px-6 py-3">
          <span className="text-sm text-base-content/60">Numéro de commande : </span>
          <span className="font-bold text-primary">#{commande.number}</span>
        </div>
      </div>

      {/* Détails */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {/* Adresse de livraison */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-base">Adresse de livraison</h2>
            <div className="mt-2 space-y-1 text-sm text-base-content/70">
              <p className="font-semibold text-base-content">{profileName}</p>
              {profilePhone && <p>{profilePhone}</p>}
              <p>{commande.destination}</p>
            </div>
          </div>
        </div>

        {/* Mode de paiement */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-base">Mode de paiement</h2>
            <div className="mt-2 space-y-1 text-sm text-base-content/70">
              <p className="font-semibold text-base-content">
                {commande.mode === 'mobile_money'
                  ? 'Mobile Money'
                  : commande.mode === 'card'
                    ? 'Carte bancaire'
                    : commande.mode === 'cash'
                      ? 'Espèces à la livraison'
                      : 'Virement bancaire'}
              </p>
              <p className="mt-2 text-xs text-base-content/50">
                Un SMS de confirmation vous sera envoyé
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Récapitulatif */}
      <div className="card mt-6 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-base">Récapitulatif</h2>
          <div className="mt-4 space-y-3">
            {commande.items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {it.image ? (
                  <img
                    src={it.image}
                    alt={it.name}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-base-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-semibold">{it.name}</p>
                  <p className="text-xs text-base-content/60">x{it.quantity}</p>
                </div>
                <span className="text-sm font-bold">
                  {Math.round(Number(it.price ?? 0)).toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            ))}
          </div>

          <div className="divider" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/60">Sous-total</span>
              <span className="font-semibold">{Math.round(subtotal).toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Livraison</span>
              <span className="font-semibold">{livraison.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>
          <div className="divider" />
          <div className="flex items-center justify-between">
            <span className="font-bold">Total payé</span>
            <span className="text-xl font-black text-primary">
              {Math.round(total).toLocaleString('fr-FR')} FCFA
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/products" className="btn btn-primary">
          Continuer mes achats
        </Link>
        <Link to="/" className="btn btn-outline">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}