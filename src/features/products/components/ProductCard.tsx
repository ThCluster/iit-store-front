import type { Product } from '@/types/product'
import { Link } from 'react-router-dom'
import { addToPanier } from '@/services/store'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="card bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <figure className="relative flex h-40 items-center justify-center bg-base-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
        <span className="badge badge-secondary absolute left-3 top-3">Nouveau</span>
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
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addToPanier(product.id).catch(() => void e)
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </Link>
  )
}