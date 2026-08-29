import { Link } from 'react-router-dom'

export default function OrderConfirmationPage() {
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
          <span className="font-bold text-primary">#CMD-2026-0842</span>
        </div>
      </div>

      {/* Détails */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {/* Adresse de livraison */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-base">
              Adresse de livraison
            </h2>
            <div className="mt-2 space-y-1 text-sm text-base-content/70">
              <p className="font-semibold text-base-content">Awa Koné</p>
              <p>+225 07 00 00 00 00</p>
              <p>Cocody, Riviera 3</p>
              <p>Abidjan, Côte d'Ivoire</p>
            </div>
          </div>
        </div>

        {/* Mode de paiement */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-base">
              Mode de paiement
            </h2>
            <div className="mt-2 space-y-1 text-sm text-base-content/70">
              <p className="font-semibold text-base-content">Mobile Money</p>
              <p>Orange Money</p>
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
            <div className="flex items-center gap-3">
              <img
                src="https://picsum.photos/seed/phone/60"
                alt="Smartphone X200"
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">Smartphone X200</p>
                <p className="text-xs text-base-content/60">x1 · TechWorld</p>
              </div>
              <span className="text-sm font-bold">299 990 FCFA</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://picsum.photos/seed/headset/60"
                alt="Casque Bluetooth"
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">Casque Bluetooth</p>
                <p className="text-xs text-base-content/60">x2 · TechWorld</p>
              </div>
              <span className="text-sm font-bold">99 980 FCFA</span>
            </div>
          </div>

          <div className="divider" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/60">Sous-total</span>
              <span className="font-semibold">399 970 FCFA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Livraison</span>
              <span className="font-semibold">5 990 FCFA</span>
            </div>
          </div>
          <div className="divider" />
          <div className="flex items-center justify-between">
            <span className="font-bold">Total payé</span>
            <span className="text-xl font-black text-primary">405 960 FCFA</span>
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