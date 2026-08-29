import type { Product } from '@/types/product'
import { Link } from 'react-router-dom'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="block rounded-lg border p-4 transition hover:shadow-md"
    >
      <img src={product.imageUrl} alt={product.name} className="mb-2 aspect-square w-full object-cover" />
      <h3 className="font-medium">{product.name}</h3>
      <p className="text-gray-600">{product.price.toFixed(2)} €</p>
    </Link>
  )
}