import type { Product } from '@/types/product'
import { Link } from 'react-router-dom'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="card bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <figure className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-square w-full object-cover"
        />
        <span className="badge badge-secondary absolute left-3 top-3">Nouveau</span>
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-base">{product.name}</h3>
        <div className="flex items-center gap-1 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-warning" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-base-content/60">(4.5)</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-primary">
            {Math.round(product.price).toLocaleString('fr-FR')} FCFA
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
    </Link>
  )
}