import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-base-100 px-4">
      <div className="text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary/20 bg-white shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <span className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-black text-white shadow-lg">
            404
          </span>
        </div>

        {/* Titre */}
        <h1 className="text-5xl font-black text-base-content md:text-6xl">
          Oups ! Page introuvable
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-base-content/60">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Pas de panique, nos rayons sont toujours ouverts !
        </p>

        {/* Boutons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/products" className="btn btn-primary btn-lg shadow-lg shadow-primary/20">
            Aller à la boutique
          </Link>
          <Link to="/" className="btn btn-outline btn-lg">
            Retour à l'accueil
          </Link>
        </div>

        {/* Suggestions */}
        <div className="mx-auto mt-12 max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-wide text-base-content/50">
            Vous cherchez peut-être
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {['Électronique', 'Mode', 'Maison', 'Sport', 'Beauté', 'Jouets'].map((cat) => (
              <Link
                key={cat}
                to="/products"
                className="badge badge-outline badge-lg gap-1 px-4 py-3 transition hover:border-primary hover:text-primary"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}