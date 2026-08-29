import { Link } from 'react-router-dom'

export function SellerFooter() {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Logo + description */}
          <div className="max-w-xs text-center md:text-left">
            <Link to="/seller-dashboard" className="flex items-center justify-center gap-2 md:justify-start">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e63946] text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </span>
              <span className="text-xl font-black tracking-tight">
                IIT<span className="text-[#e63946]">_STORE</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-base-content/60">
              Espace vendeur. Gérez votre boutique et vos produits en toute simplicité.
            </p>
          </div>

          {/* Liens utiles */}
          <div className="flex gap-12">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/50">
                Ma boutique
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/seller-dashboard" className="text-base-content/70 transition hover:text-primary">
                    Tableau de bord
                  </Link>
                </li>
                <li>
                  <Link to="/seller-dashboard" className="text-base-content/70 transition hover:text-primary">
                    Mes produits
                  </Link>
                </li>
                <li>
                  <Link to="/seller-dashboard" className="text-base-content/70 transition hover:text-primary">
                    Commandes reçues
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/50">
                Aide
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/seller-dashboard" className="text-base-content/70 transition hover:text-primary">
                    Réglages boutique
                  </Link>
                </li>
                <li>
                  <Link to="/seller-dashboard" className="text-base-content/70 transition hover:text-primary">
                    Réglages compte
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Barre de copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-base-300 pt-6 text-sm text-base-content/50 sm:flex-row">
          <p>© {new Date().getFullYear()} IIT_STORE. Tous droits réservés.</p>
          <p>Espace vendeur</p>
        </div>
      </div>
    </footer>
  )
}